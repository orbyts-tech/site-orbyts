"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { INVESTMENT_RANGES } from "@/lib/constants/proposal";
import {
  PROPOSAL_CHAT_INTRO,
  PROPOSAL_CHAT_STEPS,
  PROPOSAL_CHAT_SUCCESS,
  type ProposalChatStep,
} from "@/lib/constants/proposalChat";
import type { ProposalFormData } from "@/lib/types/proposal";
import {
  getInvestmentLabel,
  validateProposalField,
} from "@/lib/validation/validateProposalStep";
import { OrbytsLogo } from "@/components/ui/OrbytsLogo";
import styles from "./ProposalChatModal.module.css";

interface ProposalChatModalProps {
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  role: "bot" | "user";
  text: string;
}

const EMPTY_FORM: ProposalFormData = {
  fullName: "",
  phone: "",
  email: "",
  scope: "",
  investment: "5000-15000",
};

let messageCounter = 0;

function createMessageId(): string {
  messageCounter += 1;
  return `msg-${messageCounter}`;
}

function getStepIndex(step: ProposalChatStep): number {
  return PROPOSAL_CHAT_STEPS.findIndex((item) => item.field === step);
}

export function ProposalChatModal({ onClose }: ProposalChatModalProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: createMessageId(), role: "bot", text: PROPOSAL_CHAT_INTRO },
  ]);
  const [currentStep, setCurrentStep] = useState<ProposalChatStep>("fullName");
  const [form, setForm] = useState<ProposalFormData>(EMPTY_FORM);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [inputError, setInputError] = useState<string | null>(null);

  const onCloseRef = useRef(onClose);
  const isSubmittingRef = useRef(isSubmitting);
  onCloseRef.current = onClose;
  isSubmittingRef.current = isSubmitting;

  const stepConfig = PROPOSAL_CHAT_STEPS.find((step) => step.field === currentStep);
  const isInvestmentStep = currentStep === "investment";
  const showInput = !isDone && !isSubmitting && !isInvestmentStep;

  const scrollToBottom = useCallback(() => {
    const container = messagesRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, []);

  const addBotMessage = useCallback(
    (text: string, delay = 500) => {
      setIsTyping(true);
      window.setTimeout(() => {
        setMessages((current) => [...current, { id: createMessageId(), role: "bot", text }]);
        setIsTyping(false);
      }, delay);
    },
    [],
  );

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isSubmittingRef.current) {
        onCloseRef.current();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    const introTimer = window.setTimeout(() => {
      const first = PROPOSAL_CHAT_STEPS[0];
      if (first) {
        setMessages((current) => [
          ...current,
          { id: createMessageId(), role: "bot", text: first.botPrompt },
        ]);
        setIsTyping(false);
      }
    }, 700);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      window.clearTimeout(introTimer);
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  useEffect(() => {
    if (showInput) {
      inputRef.current?.focus();
    }
  }, [currentStep, showInput, isTyping]);

  const submitProposal = useCallback(
    async (payload: ProposalFormData) => {
      setIsSubmitting(true);
      addBotMessage("Enviando sua solicitação...", 300);

      try {
        const response = await fetch("/api/proposal", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) throw new Error("Falha ao enviar");

        setIsDone(true);
        setCurrentStep("done");
        addBotMessage(PROPOSAL_CHAT_SUCCESS, 600);
      } catch {
        setIsSubmitting(false);
        addBotMessage(
          "Não consegui enviar agora. Tente novamente em instantes ou fale conosco por e-mail.",
          400,
        );
      }
    },
    [addBotMessage],
  );

  const advanceStep = useCallback(
    (field: keyof ProposalFormData, value: string, displayValue?: string) => {
      setMessages((current) => [
        ...current,
        { id: createMessageId(), role: "user", text: displayValue ?? value },
      ]);
      setInputValue("");
      setInputError(null);

      const updatedForm = { ...form, [field]: value } as ProposalFormData;
      setForm(updatedForm);

      const nextIndex = getStepIndex(field) + 1;
      const nextStep = PROPOSAL_CHAT_STEPS[nextIndex];

      if (nextStep) {
        setCurrentStep(nextStep.field);
        addBotMessage(nextStep.botPrompt);
        return;
      }

      void submitProposal(updatedForm);
    },
    [addBotMessage, form, submitProposal],
  );

  const handleSend = () => {
    if (!stepConfig || isTyping || isSubmitting || isDone) return;

    const error = validateProposalField(stepConfig.field as keyof ProposalFormData, inputValue);
    if (error) {
      setInputError(error);
      addBotMessage(error, 200);
      return;
    }

    advanceStep(stepConfig.field as keyof ProposalFormData, inputValue.trim());
  };

  const handleInvestmentSelect = (value: ProposalFormData["investment"]) => {
    if (isTyping || isSubmitting || isDone) return;
    advanceStep("investment", value, getInvestmentLabel(value));
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey && stepConfig?.inputType !== "textarea") {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose} role="presentation">
      <div
        ref={dialogRef}
        className={styles.chatWindow}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
      >
        <header className={styles.header}>
          <div className={styles.headerInfo}>
            <OrbytsLogo className={styles.headerLogo} />
            <div>
              <h2 id={titleId} className={styles.headerTitle}>
                Propostas
              </h2>
              <p className={styles.headerSubtitle}>Assistente comercial</p>
            </div>
          </div>
          <div className={styles.headerActions}>
            <span className={styles.statusBadge}>Online</span>
            <button
              type="button"
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Fechar chat"
            >
              ×
            </button>
          </div>
        </header>

        <div ref={messagesRef} className={styles.messages} aria-live="polite">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`${styles.messageRow} ${
                message.role === "user" ? styles.messageRowUser : styles.messageRowBot
              }`}
            >
              {message.role === "bot" ? (
                <div className={styles.botAvatar} aria-hidden="true">
                  <span className={styles.botAvatarMark}>O</span>
                </div>
              ) : null}
              <div
                className={`${styles.bubble} ${
                  message.role === "user" ? styles.bubbleUser : styles.bubbleBot
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}

          {isTyping ? (
            <div className={`${styles.messageRow} ${styles.messageRowBot}`}>
              <div className={styles.botAvatar} aria-hidden="true">
                <span className={styles.botAvatarMark}>O</span>
              </div>
              <div className={`${styles.bubble} ${styles.bubbleBot} ${styles.typing}`}>
                <span />
                <span />
                <span />
              </div>
            </div>
          ) : null}

          {isInvestmentStep && !isSubmitting && !isDone ? (
            <div className={styles.optionsWrap}>
              {INVESTMENT_RANGES.map((range) => (
                <button
                  key={range.value}
                  type="button"
                  className={styles.optionChip}
                  onClick={() => handleInvestmentSelect(range.value)}
                >
                  {range.label}
                </button>
              ))}
            </div>
          ) : null}
        </div>

        {isDone ? (
          <footer className={styles.footer}>
            <button type="button" className={styles.doneButton} onClick={onClose}>
              Entendi, obrigado!
            </button>
          </footer>
        ) : showInput ? (
          <footer className={styles.footer}>
            {inputError ? <p className={styles.inputError}>{inputError}</p> : null}
            <div className={styles.inputRow}>
              {stepConfig?.inputType === "textarea" ? (
                <textarea
                  ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                  className={styles.textarea}
                  value={inputValue}
                  onChange={(event) => {
                    setInputValue(event.target.value);
                    setInputError(null);
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder={stepConfig.inputPlaceholder}
                  rows={2}
                  disabled={isTyping || isSubmitting}
                />
              ) : (
                <input
                  ref={inputRef as React.RefObject<HTMLInputElement>}
                  className={styles.input}
                  type={stepConfig?.inputType ?? "text"}
                  value={inputValue}
                  onChange={(event) => {
                    setInputValue(event.target.value);
                    setInputError(null);
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder={stepConfig?.inputPlaceholder}
                  disabled={isTyping || isSubmitting}
                  autoComplete={
                    stepConfig?.field === "fullName"
                      ? "name"
                      : stepConfig?.field === "phone"
                        ? "tel"
                        : stepConfig?.field === "email"
                          ? "email"
                          : "off"
                  }
                />
              )}
              <button
                type="button"
                className={styles.sendButton}
                onClick={handleSend}
                disabled={!inputValue.trim() || isTyping || isSubmitting}
                aria-label="Enviar mensagem"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </footer>
        ) : isSubmitting ? (
          <footer className={styles.footer}>
            <p className={styles.footerHint}>Aguarde, estamos processando...</p>
          </footer>
        ) : null}
      </div>
    </div>
  );
}
