"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { formatBrazilianPhone } from "@/lib/formatters/phone";
import {
  BUDGET_OPTIONS,
  CONTACT_OPTIONS,
  DECISION_OPTIONS,
  LP_CONFIG,
  SERVICE_OPTIONS,
  TIMELINE_OPTIONS,
} from "./content";
import { leadStep1Schema, leadStep2Schema, zodFieldErrors } from "./lead.schema";
import { useServiceSelection } from "./ServiceSelection";
import { newEventId, readAttribution, trackConfirmedLead, trackEvent } from "./tracking";
import styles from "./landing.module.css";

type Status = "idle" | "sending" | "success" | "error";

interface FormValues {
  name: string;
  email: string;
  company: string;
  service: string;
  description: string;
  budget: string;
  timeline: string;
  decision: string;
  contact: string;
  phone: string;
  consent: boolean;
  website: string;
}

const EMPTY: FormValues = {
  name: "",
  email: "",
  company: "",
  service: "",
  description: "",
  budget: "",
  timeline: "",
  decision: "",
  contact: "",
  phone: "",
  consent: false,
  website: "",
};

const STEP1_ORDER = ["name", "email", "company", "service", "description"] as const;
const STEP2_ORDER = ["budget", "timeline", "decision", "contact", "phone", "consent"] as const;

function focusById(id: string) {
  window.setTimeout(() => document.getElementById(id)?.focus(), 30);
}

function ErrorText({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className={styles.fieldError}>
      <svg width="15" height="15" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <circle cx="7" cy="7" r="6" />
        <path d="M7 4v3.5M7 9.6v.1" />
      </svg>
      {message}
    </p>
  );
}

function RadioGroup({
  name,
  legend,
  options,
  value,
  error,
  onChange,
  columns = 2,
}: {
  name: keyof FormValues;
  legend: string;
  options: readonly string[];
  value: string;
  error?: string;
  onChange: (value: string) => void;
  columns?: 1 | 2;
}) {
  const errorId = `e-${name}`;
  return (
    <fieldset className={styles.fieldset} aria-describedby={error ? errorId : undefined}>
      <legend className={styles.label}>
        {legend} <span className={styles.req} aria-hidden="true">*</span>
      </legend>
      <div className={columns === 2 ? styles.options : styles.optionsSingle}>
        {options.map((option, index) => (
          <label key={option} className={styles.option}>
            <input
              id={`f-${name}-${index}`}
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={() => onChange(option)}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
      <ErrorText id={errorId} message={error} />
    </fieldset>
  );
}

export function LeadForm() {
  const { selected, version } = useServiceSelection();
  const [values, setValues] = useState<FormValues>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [step, setStep] = useState<1 | 2>(1);
  const [status, setStatus] = useState<Status>("idle");
  const [preselected, setPreselected] = useState(false);
  const [liveMessage, setLiveMessage] = useState("");
  const startedRef = useRef(false);
  const stepCompletedRef = useRef(false);
  const attributionRef = useRef<Record<string, string>>({});

  useEffect(() => {
    attributionRef.current = readAttribution();
  }, []);

  // Seleção vinda dos cards de Soluções: preenche o serviço, volta à etapa 1 e preserva o resto.
  useEffect(() => {
    if (!selected || version === 0) return;
    setValues((current) => {
      if (selected === "indefinido" && current.service) return current;
      return { ...current, service: selected };
    });
    setErrors((current) => ({ ...current, service: "" }));
    setPreselected(true);
    setStatus((current) => (current === "success" ? current : "idle"));
    setStep(1);
  }, [selected, version]);

  const update = <K extends keyof FormValues>(key: K, value: FormValues[K]) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => (current[key] ? { ...current, [key]: "" } : current));
    if (key === "service") setPreselected(false);
  };

  const validateField = (key: (typeof STEP1_ORDER)[number] | "phone") => {
    const value = values[key];
    if (!String(value).trim()) return;
    const result = key === "phone" ? leadStep2Schema.safeParse({ ...values, consent: true }) : leadStep1Schema.safeParse(values);
    if (!result.success) {
      const message = zodFieldErrors(result.error)[key];
      if (message) setErrors((current) => ({ ...current, [key]: message }));
    }
  };

  const handleFocus = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    trackEvent("form_start", { service: values.service || "" });
  };

  const goToStep2 = () => {
    const result = leadStep1Schema.safeParse(values);
    if (!result.success) {
      const fieldErrors = zodFieldErrors(result.error);
      setErrors(fieldErrors);
      setLiveMessage("Revise os campos destacados.");
      const first = STEP1_ORDER.find((key) => fieldErrors[key]);
      if (first) focusById(`f-${first}`);
      return;
    }
    setErrors({});
    setLiveMessage("");
    setStep(2);
    if (!stepCompletedRef.current) {
      stepCompletedRef.current = true;
      trackEvent("form_step_complete", { step: 1, service: values.service });
    }
    focusById("lead-step-title");
  };

  const goBack = () => {
    setStep(1);
    setStatus("idle");
    setLiveMessage("");
    focusById("lead-step-title");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (step === 1) {
      goToStep2();
      return;
    }
    if (status === "sending") return;

    const result = leadStep2Schema.safeParse(values);
    if (!result.success) {
      const fieldErrors = zodFieldErrors(result.error);
      setErrors(fieldErrors);
      setLiveMessage("Revise os campos destacados.");
      const first = STEP2_ORDER.find((key) => fieldErrors[key]);
      if (first) focusById(first === "phone" || first === "consent" ? `f-${first}` : `f-${first}-0`);
      return;
    }

    const eventId = newEventId();
    setErrors({});
    setStatus("sending");
    setLiveMessage("Enviando sua solicitação…");

    try {
      const response = await fetch(LP_CONFIG.leadEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId,
          attribution: attributionRef.current,
          website: values.website,
          lead: {
            name: values.name,
            email: values.email,
            company: values.company,
            service: values.service,
            description: values.description,
            budget: values.budget,
            timeline: values.timeline,
            decision: values.decision,
            contact: values.contact,
            phone: values.contact === "WhatsApp" ? values.phone : "",
            consent: values.consent,
          },
        }),
      });
      const data = (await response.json().catch(() => null)) as { ok?: boolean; leadId?: string } | null;
      // Só considera enviado quando o backend confirma explicitamente.
      if (!response.ok || !data?.ok) throw new Error(`lead-not-confirmed-${response.status}`);

      setStatus("success");
      setLiveMessage("");
      trackConfirmedLead({ eventId, leadId: data.leadId ?? "", service: values.service, budget: values.budget });
      focusById("lead-success");
    } catch {
      setStatus("error");
      setLiveMessage("Não foi possível enviar. Suas respostas foram mantidas.");
    }
  };

  if (status === "success") {
    const firstName = values.name.trim().split(" ")[0];
    const channel = values.contact === "WhatsApp" ? "WhatsApp" : "e-mail";
    return (
      <div id="lead-success" role="status" tabIndex={-1} className={styles.success}>
        <span className={styles.successIcon} aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M4.5 10.5l3.5 3.5 7.5-8" />
          </svg>
        </span>
        <h3 className={styles.successTitle}>Recebemos sua solicitação.</h3>
        <p className={styles.muted}>
          {firstName ? `Obrigado, ${firstName}.` : "Obrigado pelo contato."} Seu projeto já está com a equipe da Orbyts.
        </p>
        <ol className={styles.successSteps}>
          <li>
            <span>1</span>Analisamos as informações que você enviou.
          </li>
          <li>
            <span>2</span>Entramos em contato por {channel}
            {LP_CONFIG.responseTime ? ` ${LP_CONFIG.responseTime}` : ""}.
          </li>
          <li>
            <span>3</span>Se fizer sentido para os dois lados, combinamos uma conversa de diagnóstico.
          </li>
        </ol>
        <p className={styles.muted}>
          Quer complementar algo? Escreva para{" "}
          <a className={styles.inlineLink} href={`mailto:${LP_CONFIG.email}`}>
            {LP_CONFIG.email}
          </a>
          .
        </p>
      </div>
    );
  }

  const sending = status === "sending";
  const fieldClass = (key: string) => (errors[key] ? `${styles.input} ${styles.inputError}` : styles.input);
  const invalid = (key: string) => (errors[key] ? true : undefined);

  return (
    <form noValidate onSubmit={handleSubmit} onFocus={handleFocus} aria-labelledby="form-title">
      <div className={styles.progress}>
        <div className={styles.progressHead}>
          <span id="lead-step-title" tabIndex={-1}>
            {step === 1 ? "Sobre você e o projeto" : "Contexto comercial"}
          </span>
          <span className={styles.progressCount}>Etapa {step} de 2</span>
        </div>
        <div className={styles.progressBars} aria-hidden="true">
          <span className={`${styles.bar} ${styles.barOn}`} />
          <span className={step === 2 ? `${styles.bar} ${styles.barOn}` : styles.bar} />
        </div>
      </div>

      {/* Honeypot anti-spam */}
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="f-website">Site</label>
        <input
          id="f-website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(event) => update("website", event.target.value)}
        />
      </div>

      {step === 1 ? (
        <fieldset className={styles.stepFields}>
          <legend className="sr-only">Sobre você e o projeto</legend>
          <div className={styles.row2}>
            <div>
              <label className={styles.label} htmlFor="f-name">
                Nome completo <span className={styles.req} aria-hidden="true">*</span>
              </label>
              <input
                id="f-name"
                className={fieldClass("name")}
                type="text"
                name="name"
                autoComplete="name"
                required
                aria-required="true"
                aria-invalid={invalid("name")}
                aria-describedby="e-name"
                value={values.name}
                onChange={(event) => update("name", event.target.value)}
                onBlur={() => validateField("name")}
              />
              <ErrorText id="e-name" message={errors.name} />
            </div>
            <div>
              <label className={styles.label} htmlFor="f-email">
                E-mail profissional <span className={styles.req} aria-hidden="true">*</span>
              </label>
              <input
                id="f-email"
                className={fieldClass("email")}
                type="email"
                name="email"
                autoComplete="email"
                inputMode="email"
                required
                aria-required="true"
                aria-invalid={invalid("email")}
                aria-describedby="e-email"
                value={values.email}
                onChange={(event) => update("email", event.target.value)}
                onBlur={() => validateField("email")}
              />
              <ErrorText id="e-email" message={errors.email} />
            </div>
          </div>
          <div>
            <label className={styles.label} htmlFor="f-company">
              Nome da empresa <span className={styles.req} aria-hidden="true">*</span>
            </label>
            <input
              id="f-company"
              className={fieldClass("company")}
              type="text"
              name="company"
              autoComplete="organization"
              required
              aria-required="true"
              aria-invalid={invalid("company")}
              aria-describedby="e-company"
              value={values.company}
              onChange={(event) => update("company", event.target.value)}
              onBlur={() => validateField("company")}
            />
            <ErrorText id="e-company" message={errors.company} />
          </div>
          <div>
            <label className={styles.label} htmlFor="f-service">
              Serviço de interesse <span className={styles.req} aria-hidden="true">*</span>
            </label>
            <select
              id="f-service"
              className={`${fieldClass("service")} ${styles.select}`}
              name="service"
              required
              aria-required="true"
              aria-invalid={invalid("service")}
              aria-describedby="h-service e-service"
              value={values.service}
              onChange={(event) => update("service", event.target.value)}
            >
              <option value="">Selecione uma opção</option>
              {SERVICE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {preselected && values.service && !errors.service ? (
              <p id="h-service" className={styles.hint}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                  <path d="M2.5 7.3l2.8 2.8 6.2-6.6" />
                </svg>
                Selecionado a partir de Soluções. Você pode alterar.
              </p>
            ) : null}
            <ErrorText id="e-service" message={errors.service} />
          </div>
          <div>
            <label className={styles.label} htmlFor="f-description">
              Descreva o desafio ou projeto <span className={styles.req} aria-hidden="true">*</span>
            </label>
            <textarea
              id="f-description"
              className={`${fieldClass("description")} ${styles.textarea}`}
              name="description"
              rows={4}
              required
              aria-required="true"
              aria-invalid={invalid("description")}
              aria-describedby="h-description e-description"
              value={values.description}
              onChange={(event) => update("description", event.target.value)}
              onBlur={() => validateField("description")}
            />
            <p id="h-description" className={styles.helper}>
              O que precisa criar, melhorar ou automatizar? Não precisa ser técnico.
            </p>
            <ErrorText id="e-description" message={errors.description} />
          </div>
          <div className={styles.formActions}>
            <span className={styles.helper}>
              <span className={styles.req} aria-hidden="true">*</span> Campos obrigatórios
            </span>
            <button className={`${styles.btn} ${styles.btnPrimary}`} type="button" onClick={goToStep2}>
              Continuar
              <ArrowIcon />
            </button>
          </div>
        </fieldset>
      ) : (
        <div className={styles.stepFields}>
          <RadioGroup
            name="budget"
            legend="Faixa de investimento"
            options={BUDGET_OPTIONS}
            value={values.budget}
            error={errors.budget}
            onChange={(value) => update("budget", value)}
          />
          <RadioGroup
            name="timeline"
            legend="Quando pretende começar?"
            options={TIMELINE_OPTIONS}
            value={values.timeline}
            error={errors.timeline}
            onChange={(value) => update("timeline", value)}
          />
          <RadioGroup
            name="decision"
            legend="Sua participação na decisão"
            options={DECISION_OPTIONS}
            value={values.decision}
            error={errors.decision}
            onChange={(value) => update("decision", value)}
            columns={1}
          />
          <RadioGroup
            name="contact"
            legend="Como prefere ser contatado?"
            options={CONTACT_OPTIONS}
            value={values.contact}
            error={errors.contact}
            onChange={(value) => update("contact", value)}
          />
          {values.contact === "WhatsApp" ? (
            <div>
              <label className={styles.label} htmlFor="f-phone">
                WhatsApp com DDD <span className={styles.req} aria-hidden="true">*</span>
              </label>
              <input
                id="f-phone"
                className={fieldClass("phone")}
                type="tel"
                name="phone"
                autoComplete="tel"
                inputMode="tel"
                required
                aria-required="true"
                aria-invalid={invalid("phone")}
                aria-describedby="e-phone"
                value={values.phone}
                onChange={(event) => update("phone", formatBrazilianPhone(event.target.value))}
                onBlur={() => validateField("phone")}
              />
              <ErrorText id="e-phone" message={errors.phone} />
            </div>
          ) : null}
          <div className={styles.consentBox}>
            <label className={styles.consent}>
              <input
                id="f-consent"
                type="checkbox"
                name="consent"
                checked={values.consent}
                aria-invalid={invalid("consent")}
                aria-describedby="e-consent"
                onChange={(event) => update("consent", event.target.checked)}
              />
              <span>
                Concordo com o uso dos meus dados para que a Orbyts responda a esta solicitação, conforme a{" "}
                {LP_CONFIG.privacyUrl ? (
                  <a className={styles.inlineLink} href={LP_CONFIG.privacyUrl}>
                    Política de privacidade
                  </a>
                ) : (
                  "Política de privacidade"
                )}
                . <span className={styles.req} aria-hidden="true">*</span>
              </span>
            </label>
            <ErrorText id="e-consent" message={errors.consent} />
          </div>
          {status === "error" ? (
            <div role="alert" className={styles.formAlert}>
              <strong>Não foi possível enviar agora.</strong>
              <span>
                Suas respostas foram mantidas. Tente novamente em instantes ou escreva para{" "}
                <a className={styles.inlineLink} href={`mailto:${LP_CONFIG.email}`}>
                  {LP_CONFIG.email}
                </a>
                .
              </span>
            </div>
          ) : null}
          <div className={`${styles.formActions} ${styles.formActionsStep2}`}>
            <button className={`${styles.btn} ${styles.btnText}`} type="button" onClick={goBack}>
              ← Voltar
            </button>
            <button
              className={`${styles.btn} ${styles.btnPrimary}`}
              type="submit"
              disabled={sending}
              aria-busy={sending || undefined}
            >
              {sending ? "Enviando…" : status === "error" ? "Tentar enviar novamente" : "Enviar meu projeto para avaliação"}
            </button>
          </div>
        </div>
      )}
      <p role="status" aria-live="polite" className={styles.liveMessage}>
        {liveMessage}
      </p>
    </form>
  );
}

export function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}
