"use client";

import { useCallback, useState } from "react";
import { trackLeadConversion } from "@/lib/analytics/trackLeadConversion";
import { formatBrazilianPhone } from "@/lib/formatters/phone";
import {
  getProposalFieldErrors,
  proposalSchema,
  type ProposalField,
  type ProposalFieldErrors,
} from "@/lib/schemas/proposal.schema";

export type ProposalFormDraft = Record<ProposalField, string>;
export type ProposalSubmissionStatus = "idle" | "submitting" | "success" | "error";

const SUBMIT_TIMEOUT_MS = 20000;

const EMPTY_DRAFT: ProposalFormDraft = {
  fullName: "",
  email: "",
  whatsapp: "",
  company: "",
  jobTitle: "",
  solution: "",
  investment: "",
  details: "",
  website: "",
};

const GENERIC_SUBMIT_ERROR = "Não conseguimos enviar agora. Tente novamente em instantes.";

async function postProposal(payload: unknown): Promise<void> {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), SUBMIT_TIMEOUT_MS);

  try {
    const response = await fetch("/api/proposal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (response.ok) return;

    const result = (await response.json().catch(() => null)) as { error?: string } | null;
    throw new Error(result?.error || GENERIC_SUBMIT_ERROR);
  } finally {
    window.clearTimeout(timeoutId);
  }
}

function getSubmitErrorMessage(error: unknown): string {
  if (error instanceof Error && error.name === "AbortError") {
    return "O envio demorou demais. Verifique sua conexão e tente novamente.";
  }
  return error instanceof Error ? error.message : GENERIC_SUBMIT_ERROR;
}

export function useProposalFormSubmission() {
  const [draft, setDraft] = useState<ProposalFormDraft>(EMPTY_DRAFT);
  const [fieldErrors, setFieldErrors] = useState<ProposalFieldErrors>({});
  const [status, setStatus] = useState<ProposalSubmissionStatus>("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const updateField = useCallback((field: ProposalField, value: string) => {
    const nextValue = field === "whatsapp" ? formatBrazilianPhone(value) : value;

    setDraft((current) => ({ ...current, [field]: nextValue }));
    setFieldErrors((current) => {
      if (!current[field]) return current;
      const { [field]: _removed, ...rest } = current;
      return rest;
    });
  }, []);

  const submit = useCallback(async (): Promise<boolean> => {
    if (status === "submitting") return false;

    const parsed = proposalSchema.safeParse(draft);
    if (!parsed.success) {
      setFieldErrors(getProposalFieldErrors(parsed.error));
      return false;
    }

    setFieldErrors({});
    setSubmitError(null);
    setStatus("submitting");

    try {
      await postProposal(parsed.data);
      trackLeadConversion();
      setStatus("success");
      setDraft(EMPTY_DRAFT);
      return true;
    } catch (error) {
      setSubmitError(getSubmitErrorMessage(error));
      setStatus("error");
      return false;
    }
  }, [draft, status]);

  const resetForm = useCallback(() => {
    setStatus("idle");
    setSubmitError(null);
  }, []);

  return {
    draft,
    fieldErrors,
    status,
    submitError,
    isSubmitting: status === "submitting",
    updateField,
    submit,
    resetForm,
  };
}
