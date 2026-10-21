"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { OrbytsLogo } from "@/components/ui/OrbytsLogo";
import { trackLeadConversion } from "@/lib/analytics/trackLeadConversion";
import { formatBrazilianPhone } from "@/lib/formatters/phone";
import { newEventId, readAttribution, trackEvent } from "@/features/landing/tracking";
import {
  AUDIENCE_OPTIONS,
  DECISION_OPTIONS,
  INVESTMENT_OPTIONS,
  TIMELINE_OPTIONS,
  type QualificationConfig,
} from "./content";
import {
  fieldErrors,
  qualificationAnswersSchema,
  type QualificationDraft,
} from "./schema";
import styles from "./qualification.module.css";

type StepId =
  | "welcome"
  | "audience"
  | "needs"
  | "timeline"
  | "investment"
  | "decision"
  | "contact"
  | "done";

const QUESTION_STEPS: StepId[] = [
  "audience",
  "needs",
  "timeline",
  "investment",
  "decision",
  "contact",
];

const EMPTY: QualificationDraft = {
  audience: "",
  needs: "",
  timeline: "",
  investment: "",
  decision: "",
  name: "",
  phone: "",
  email: "",
  website: "",
};

function questionNumber(step: StepId): number {
  return QUESTION_STEPS.indexOf(step) + 1;
}

function ChoiceList({
  options,
  value,
  onSelect,
}: {
  options: ReadonlyArray<{ value: string; label: string }>;
  value: string;
  onSelect: (value: string) => void;
}) {
  return (
    <ul className={styles.options} role="listbox" aria-label="Opções">
      {options.map((option, index) => {
        const key = String.fromCharCode(65 + index);
        const isSelected = value === option.value;
        return (
          <li key={option.value}>
            <button
              type="button"
              role="option"
              aria-selected={isSelected}
              className={`${styles.option} ${isSelected ? styles.optionSelected : ""}`}
              onClick={() => onSelect(option.value)}
            >
              <span className={styles.optionKey} aria-hidden="true">
                {key}
              </span>
              <span>{option.label}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export function QualificationForm({ config }: { config: QualificationConfig }) {
  const [step, setStep] = useState<StepId>("welcome");
  const [draft, setDraft] = useState<QualificationDraft>(EMPTY);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const attributionRef = useRef<Record<string, string>>({});
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  useEffect(() => {
    attributionRef.current = readAttribution();
    trackEvent("qualification_view", { product: config.product });
  }, [config.product]);

  useEffect(() => {
    if (step === "needs" || step === "contact") {
      window.setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [step]);

  const progress = useMemo(() => {
    if (step === "welcome") return 0;
    if (step === "done") return 100;
    const index = QUESTION_STEPS.indexOf(step);
    return Math.round(((index + 1) / QUESTION_STEPS.length) * 100);
  }, [step]);

  const goNext = () => {
    const order: StepId[] = ["welcome", ...QUESTION_STEPS, "done"];
    const next = order[order.indexOf(step) + 1];
    if (next) setStep(next);
  };

  const goPrev = () => {
    if (step === "welcome" || step === "done") return;
    const order: StepId[] = ["welcome", ...QUESTION_STEPS];
    const prev = order[order.indexOf(step) - 1];
    if (prev) {
      setError(null);
      setStep(prev);
    }
  };

  const update = <K extends keyof QualificationDraft>(key: K, value: QualificationDraft[K]) => {
    setDraft((current) => ({ ...current, [key]: value }));
    setError(null);
  };

  const validateCurrent = (): boolean => {
    if (step === "audience" && !draft.audience) {
      setError("Selecione uma opção para continuar.");
      return false;
    }
    if (step === "needs") {
      const parsed = qualificationAnswersSchema.shape.needs.safeParse(draft.needs);
      if (!parsed.success) {
        setError(config.needsMinError);
        return false;
      }
    }
    if (step === "timeline" && !draft.timeline) {
      setError("Selecione uma opção para continuar.");
      return false;
    }
    if (step === "investment" && !draft.investment) {
      setError("Selecione uma opção para continuar.");
      return false;
    }
    if (step === "decision" && !draft.decision) {
      setError("Selecione uma opção para continuar.");
      return false;
    }
    if (step === "contact") {
      const parsed = qualificationAnswersSchema
        .pick({ name: true, phone: true, email: true })
        .safeParse({ name: draft.name, phone: draft.phone, email: draft.email });
      if (!parsed.success) {
        setError(Object.values(fieldErrors(parsed.error))[0] ?? "Revise seus dados de contato.");
        return false;
      }
    }
    setError(null);
    return true;
  };

  const submit = async () => {
    if (!validateCurrent()) return;
    setIsSubmitting(true);
    const eventId = newEventId();

    try {
      const response = await fetch("/api/qualification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product: config.product,
          answers: {
            audience: draft.audience,
            needs: draft.needs,
            timeline: draft.timeline,
            investment: draft.investment,
            decision: draft.decision,
            name: draft.name,
            phone: draft.phone,
            email: draft.email,
          },
          eventId,
          attribution: attributionRef.current,
          website: draft.website,
        }),
      });

      const result = (await response.json().catch(() => null)) as {
        ok?: boolean;
        leadId?: string;
        error?: string;
        fields?: Record<string, string>;
      } | null;

      if (!response.ok || !result?.ok) {
        const fieldMessage = result?.fields ? Object.values(result.fields)[0] : undefined;
        throw new Error(fieldMessage || result?.error || "Não foi possível enviar agora.");
      }

      trackEvent("generate_lead", {
        event_id: eventId,
        lead_id: result.leadId ?? "",
        service: config.product,
        form: "qualification",
      });
      trackLeadConversion();
      setStep("done");
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Não foi possível enviar agora. Tente novamente.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const advance = () => {
    if (step === "welcome") {
      trackEvent("qualification_start", { product: config.product });
      goNext();
      return;
    }
    if (step === "done") return;
    if (!validateCurrent()) return;
    if (step === "contact") {
      void submit();
      return;
    }
    goNext();
  };

  const selectChoice = (field: keyof QualificationDraft, value: string) => {
    update(field, value);
    window.setTimeout(() => {
      setStep((current) => {
        const order: StepId[] = ["welcome", ...QUESTION_STEPS, "done"];
        return order[order.indexOf(current) + 1] ?? current;
      });
    }, 220);
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (step === "done" || isSubmitting) return;
      if (event.key === "ArrowUp") {
        event.preventDefault();
        goPrev();
        return;
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();
        advance();
        return;
      }
      if (event.key === "Enter" && !event.shiftKey) {
        const tag = (event.target as HTMLElement | null)?.tagName;
        if (tag === "TEXTAREA") return;
        event.preventDefault();
        advance();
        return;
      }

      const options =
        step === "audience"
          ? AUDIENCE_OPTIONS
          : step === "timeline"
            ? TIMELINE_OPTIONS
            : step === "investment"
              ? INVESTMENT_OPTIONS
              : step === "decision"
                ? DECISION_OPTIONS
                : null;
      if (!options) return;
      const index = event.key.toUpperCase().charCodeAt(0) - 65;
      if (index >= 0 && index < options.length) {
        event.preventDefault();
        const field =
          step === "audience"
            ? "audience"
            : step === "timeline"
              ? "timeline"
              : step === "investment"
                ? "investment"
                : "decision";
        selectChoice(field, options[index]!.value);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  return (
    <div className={styles.shell}>
      <div className={styles.background} aria-hidden="true">
        <Image
          src="/hero-team-bg.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className={styles.backgroundImage}
        />
        <div className={styles.backgroundOverlay} />
      </div>

      <div className={styles.progress} aria-hidden="true">
        <div className={styles.progressFill} style={{ width: `${progress}%` }} />
      </div>

      <div className={styles.brand}>
        <OrbytsLogo className={styles.brandLogo} priority />
      </div>

      <main className={styles.screen}>
        {step === "welcome" ? (
          <section className={styles.panel} aria-labelledby="welcome-title">
            <h1 id="welcome-title" className={styles.welcomeTitle}>
              {config.title}
            </h1>
            <p className={styles.welcomeIntro}>{config.intro}</p>
            <p className={styles.helper}>{config.helper}</p>
            <button type="button" className={styles.startButton} onClick={advance}>
              {config.startLabel}
            </button>
          </section>
        ) : null}

        {step === "audience" ? (
          <section className={styles.panel}>
            <div className={styles.questionMeta}>
              <span className={styles.questionNumber}>{questionNumber(step)}</span>
              <span className={styles.questionArrow} aria-hidden="true">
                →
              </span>
            </div>
            <h2 className={styles.questionTitle}>
              {config.audienceQuestion} <span className={styles.requiredMark}>*</span>
            </h2>
            <ChoiceList
              options={AUDIENCE_OPTIONS}
              value={draft.audience}
              onSelect={(value) => selectChoice("audience", value)}
            />
            {error ? <p className={styles.error}>{error}</p> : null}
          </section>
        ) : null}

        {step === "needs" ? (
          <section className={styles.panel}>
            <div className={styles.questionMeta}>
              <span className={styles.questionNumber}>{questionNumber(step)}</span>
              <span className={styles.questionArrow} aria-hidden="true">
                →
              </span>
            </div>
            <h2 className={styles.questionTitle}>
              {config.needsQuestion} <span className={styles.requiredMark}>*</span>
            </h2>
            <p className={styles.support}>{config.needsSupport}</p>
            <label className={styles.underlineField}>
              <span className={styles.underlineLabel}>Sua resposta *</span>
              <textarea
                ref={inputRef as RefObject<HTMLTextAreaElement>}
                className={styles.underlineTextarea}
                rows={3}
                value={draft.needs}
                onChange={(event) => update("needs", event.target.value)}
                placeholder="Digite sua resposta aqui..."
                aria-invalid={error ? true : undefined}
              />
            </label>
            {error ? <p className={styles.error}>{error}</p> : null}
            <div className={styles.okRow}>
              <button type="button" className={styles.okButton} onClick={advance}>
                OK
              </button>
              <span className={styles.enterHint}>pressione Enter ↵</span>
            </div>
          </section>
        ) : null}

        {step === "timeline" ? (
          <section className={styles.panel}>
            <div className={styles.questionMeta}>
              <span className={styles.questionNumber}>{questionNumber(step)}</span>
              <span className={styles.questionArrow} aria-hidden="true">
                →
              </span>
            </div>
            <h2 className={styles.questionTitle}>
              {config.timelineQuestion} <span className={styles.requiredMark}>*</span>
            </h2>
            <ChoiceList
              options={TIMELINE_OPTIONS}
              value={draft.timeline}
              onSelect={(value) => selectChoice("timeline", value)}
            />
            {error ? <p className={styles.error}>{error}</p> : null}
          </section>
        ) : null}

        {step === "investment" ? (
          <section className={styles.panel}>
            <div className={styles.questionMeta}>
              <span className={styles.questionNumber}>{questionNumber(step)}</span>
              <span className={styles.questionArrow} aria-hidden="true">
                →
              </span>
            </div>
            <h2 className={styles.questionTitle}>
              {config.investmentQuestion} <span className={styles.requiredMark}>*</span>
            </h2>
            <ChoiceList
              options={INVESTMENT_OPTIONS}
              value={draft.investment}
              onSelect={(value) => selectChoice("investment", value)}
            />
            {error ? <p className={styles.error}>{error}</p> : null}
          </section>
        ) : null}

        {step === "decision" ? (
          <section className={styles.panel}>
            <div className={styles.questionMeta}>
              <span className={styles.questionNumber}>{questionNumber(step)}</span>
              <span className={styles.questionArrow} aria-hidden="true">
                →
              </span>
            </div>
            <h2 className={styles.questionTitle}>
              {config.decisionQuestion} <span className={styles.requiredMark}>*</span>
            </h2>
            <ChoiceList
              options={DECISION_OPTIONS}
              value={draft.decision}
              onSelect={(value) => selectChoice("decision", value)}
            />
            {error ? <p className={styles.error}>{error}</p> : null}
          </section>
        ) : null}

        {step === "contact" ? (
          <section className={styles.panel}>
            <div className={styles.questionMeta}>
              <span className={styles.questionNumber}>{questionNumber(step)}</span>
              <span className={styles.questionArrow} aria-hidden="true">
                →
              </span>
            </div>
            <h2 className={styles.questionTitle}>
              Seus dados de contato <span className={styles.requiredMark}>*</span>
            </h2>

            <label className={styles.underlineField}>
              <span className={styles.underlineLabel}>Nome *</span>
              <input
                ref={inputRef as RefObject<HTMLInputElement>}
                className={styles.underlineInput}
                type="text"
                autoComplete="name"
                value={draft.name}
                onChange={(event) => update("name", event.target.value)}
                placeholder="Digite sua resposta aqui..."
                aria-invalid={error ? true : undefined}
              />
            </label>

            <label className={styles.underlineField}>
              <span className={styles.underlineLabel}>Telefone com DDD (WhatsApp) *</span>
              <input
                className={styles.underlineInput}
                type="tel"
                inputMode="tel"
                autoComplete="tel-national"
                value={draft.phone}
                onChange={(event) => update("phone", formatBrazilianPhone(event.target.value))}
                placeholder="(51) 99999-9999"
              />
            </label>

            <label className={styles.underlineField}>
              <span className={styles.underlineLabel}>E-mail (opcional)</span>
              <input
                className={styles.underlineInput}
                type="email"
                autoComplete="email"
                value={draft.email}
                onChange={(event) => update("email", event.target.value)}
                placeholder="voce@empresa.com"
              />
            </label>

            <div className={styles.honeypot} aria-hidden="true">
              <label htmlFor={`q-website-${config.product}`}>Não preencha</label>
              <input
                id={`q-website-${config.product}`}
                tabIndex={-1}
                autoComplete="off"
                value={draft.website}
                onChange={(event) => update("website", event.target.value)}
              />
            </div>

            <p className={styles.notice}>{config.contactNotice}</p>
            {error ? <p className={styles.error}>{error}</p> : null}

            <div className={styles.okRow}>
              <button
                type="button"
                className={styles.okButton}
                onClick={advance}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Enviando..." : "Enviar"}
              </button>
              <span className={styles.enterHint}>pressione Enter ↵</span>
            </div>
          </section>
        ) : null}

        {step === "done" ? (
          <section className={styles.panel} role="status">
            <h2 className={styles.successTitle}>{config.successTitle}</h2>
            <p className={styles.successBody}>{config.successBody}</p>
          </section>
        ) : null}
      </main>

      {step !== "welcome" && step !== "done" ? (
        <div className={styles.nav}>
          <button
            type="button"
            className={styles.navButton}
            onClick={goPrev}
            aria-label="Pergunta anterior"
          >
            ▲
          </button>
          <button
            type="button"
            className={`${styles.navButton} ${styles.navButtonPrimary}`}
            onClick={advance}
            aria-label="Próxima pergunta"
            disabled={isSubmitting}
          >
            ▼
          </button>
        </div>
      ) : null}
    </div>
  );
}
