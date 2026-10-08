"use client";

import { useEffect, useId, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { SITE } from "@/config/site";
import { INVESTMENT_RANGES, SOLUTION_OPTIONS } from "@/lib/constants/proposal";
import type { ProposalField } from "@/lib/schemas/proposal.schema";
import {
  FormField,
  formControlClassName,
  getFieldErrorId,
} from "@/components/ui/FormField";
import buttonStyles from "@/components/ui/Button.module.css";
import { useProposalFormSubmission } from "./useProposalFormSubmission";
import styles from "./ProposalForm.module.css";

type FieldElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

export function ProposalForm() {
  const formId = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [invalidSubmitCount, setInvalidSubmitCount] = useState(0);
  const {
    draft,
    fieldErrors,
    status,
    submitError,
    isSubmitting,
    updateField,
    submit,
    resetForm,
  } = useProposalFormSubmission();

  const fieldId = (field: ProposalField) => `${formId}-${field}`;

  const getControlProps = (field: ProposalField) => ({
    id: fieldId(field),
    name: field,
    value: draft[field],
    disabled: isSubmitting,
    className: formControlClassName,
    "aria-invalid": fieldErrors[field] ? true : undefined,
    "aria-describedby": fieldErrors[field] ? getFieldErrorId(fieldId(field)) : undefined,
    onChange: (event: ChangeEvent<FieldElement>) => updateField(field, event.target.value),
  });

  useEffect(() => {
    if (invalidSubmitCount === 0) return;
    formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
  }, [invalidSubmitCount]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isSubmitted = await submit();
    if (!isSubmitted) {
      setInvalidSubmitCount((count) => count + 1);
    }
  };

  if (status === "success") {
    return (
      <div className={styles.success} role="status">
        <h3 className={styles.successTitle}>Solicitação enviada!</h3>
        <p className={styles.successText}>
          Recebemos seus dados. Nossa equipe vai entrar em contato pelo WhatsApp em até 24 horas
          com uma avaliação técnica e estimativa financeira.
        </p>
        <button type="button" className={buttonStyles.ghost} onClick={resetForm}>
          Enviar outra solicitação
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.grid}>
        <FormField id={fieldId("fullName")} label="Nome completo" error={fieldErrors.fullName}>
          <input
            {...getControlProps("fullName")}
            type="text"
            autoComplete="name"
            placeholder="Seu nome completo"
          />
        </FormField>

        <FormField id={fieldId("email")} label="E-mail" error={fieldErrors.email}>
          <input
            {...getControlProps("email")}
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="voce@empresa.com"
          />
        </FormField>

        <FormField id={fieldId("whatsapp")} label="WhatsApp" error={fieldErrors.whatsapp}>
          <input
            {...getControlProps("whatsapp")}
            type="tel"
            autoComplete="tel-national"
            inputMode="tel"
            placeholder="(51) 99999-9999"
          />
        </FormField>

        <FormField id={fieldId("company")} label="Empresa" error={fieldErrors.company}>
          <input
            {...getControlProps("company")}
            type="text"
            autoComplete="organization"
            placeholder="Nome da empresa"
          />
        </FormField>

        <FormField id={fieldId("jobTitle")} label="Cargo na empresa" error={fieldErrors.jobTitle}>
          <input
            {...getControlProps("jobTitle")}
            type="text"
            autoComplete="organization-title"
            placeholder="Ex.: CEO, Gerente de TI"
          />
        </FormField>

        <FormField
          id={fieldId("solution")}
          label="Solução que você precisa"
          error={fieldErrors.solution}
        >
          <select {...getControlProps("solution")}>
            <option value="" disabled>
              Selecione uma opção
            </option>
            {SOLUTION_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </FormField>

        <FormField
          id={fieldId("investment")}
          label="Investimento esperado"
          error={fieldErrors.investment}
          isFullWidth
        >
          <select {...getControlProps("investment")}>
            <option value="" disabled>
              Selecione uma faixa
            </option>
            {INVESTMENT_RANGES.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </FormField>

        <FormField
          id={fieldId("details")}
          label="Conte um pouco sobre o projeto"
          error={fieldErrors.details}
          isOptional
          isFullWidth
        >
          <textarea
            {...getControlProps("details")}
            rows={4}
            placeholder="Objetivo, prazo desejado, referências..."
          />
        </FormField>
      </div>

      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor={fieldId("website")}>Não preencha este campo</label>
        <input
          id={fieldId("website")}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={draft.website}
          onChange={(event) => updateField("website", event.target.value)}
        />
      </div>

      {submitError ? (
        <p className={styles.submitError} role="alert">
          {submitError}
        </p>
      ) : null}

      <div className={styles.footer}>
        <button
          type="submit"
          className={`${buttonStyles.primary} ${styles.submitButton}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Enviando..." : "Solicitar proposta"}
        </button>
        <p className={styles.footnote}>
          Prefere e-mail?{" "}
          <a href={`mailto:${SITE.contact.email}`} className={styles.link}>
            {SITE.contact.email}
          </a>
        </p>
      </div>
    </form>
  );
}
