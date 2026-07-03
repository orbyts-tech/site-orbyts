import type { ProposalFormData } from "@/lib/types/proposal";

export type ProposalChatStep = keyof ProposalFormData | "done";

export interface ProposalChatStepConfig {
  field: ProposalChatStep;
  botPrompt: string;
  inputPlaceholder: string;
  inputType: "text" | "tel" | "email" | "textarea";
}

export const PROPOSAL_CHAT_STEPS: ProposalChatStepConfig[] = [
  {
    field: "fullName",
    botPrompt: "Para começar, qual é o seu nome completo?",
    inputPlaceholder: "Digite seu nome completo...",
    inputType: "text",
  },
  {
    field: "phone",
    botPrompt: "Ótimo! Qual telefone podemos usar para retornar o contato?",
    inputPlaceholder: "(51) 99999-9999",
    inputType: "tel",
  },
  {
    field: "email",
    botPrompt: "Perfeito. Qual é o seu e-mail?",
    inputPlaceholder: "seu@email.com",
    inputType: "email",
  },
  {
    field: "scope",
    botPrompt:
      "Agora conte sobre o projeto: o que precisa construir, integrações, prazos e objetivos.",
    inputPlaceholder: "Descreva o escopo do projeto...",
    inputType: "textarea",
  },
  {
    field: "investment",
    botPrompt: "Por último, qual faixa de investimento você está considerando?",
    inputPlaceholder: "",
    inputType: "text",
  },
];

export const PROPOSAL_CHAT_INTRO =
  "Olá! Sou o assistente da ORBYTS. Vou coletar algumas informações para nossa equipe montar sua proposta em até 24h.";

export const PROPOSAL_CHAT_SUCCESS =
  "Solicitação enviada! Nossa equipe já recebeu seus dados e entrará em contato por telefone em até 24 horas.";
