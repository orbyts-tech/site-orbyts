export const AUDIENCE_OPTIONS = [
  { value: "empresa-funcionando", label: "Para uma empresa que já está funcionando." },
  { value: "negocio-criando", label: "Para um negócio que estou criando." },
  { value: "projeto-pessoal", label: "Para um projeto pessoal." },
] as const;

export const TIMELINE_OPTIONS = [
  { value: "ate-30", label: "Em até 30 dias." },
  { value: "31-60", label: "Entre 31 e 60 dias." },
  { value: "61-90", label: "Entre 61 e 90 dias." },
  { value: "depois-90", label: "Depois de 90 dias." },
  { value: "sem-data", label: "Ainda não tenho uma data definida." },
] as const;

export const INVESTMENT_OPTIONS = [
  { value: "dentro", label: "Sim, está dentro do que considero investir." },
  {
    value: "entender-escopo",
    label: "Preciso entender o escopo e as condições antes de decidir.",
  },
  { value: "acima", label: "Está acima do que posso investir neste momento." },
] as const;

export const DECISION_OPTIONS = [
  { value: "decido", label: "Eu decido a contratação." },
  { value: "junto", label: "Decido junto com um sócio ou outra pessoa." },
  { value: "pesquisando", label: "Estou pesquisando para apresentar a quem decide." },
] as const;

export type QualificationProduct = "aplicativo" | "sistema-web" | "app-sistema";

export interface QualificationConfig {
  product: QualificationProduct;
  path: string;
  internalName: string;
  title: string;
  intro: string;
  helper: string;
  startLabel: string;
  audienceQuestion: string;
  needsQuestion: string;
  needsSupport: string;
  needsMinError: string;
  timelineQuestion: string;
  investmentQuestion: string;
  decisionQuestion: string;
  contactNotice: string;
  successTitle: string;
  successBody: string;
  emailSubjectPrefix: string;
  investmentLabel: string;
  needsEmailHeading: string;
}

export const APP_QUALIFICATION: QualificationConfig = {
  product: "aplicativo",
  path: "/lp/aplicativo",
  internalName: "ORBYTS | APLICATIVO | QUALIFICAÇÃO",
  title: "Vamos entender seu aplicativo?",
  intro:
    "Conte sua ideia e quando precisa da solução. Desenvolvemos aplicativos sob medida, com condição anunciada de 3x de R$ 2.500 — total de R$ 7.500 — para o escopo definido na proposta.",
  helper: "Suas respostas ajudarão nossa equipe a avaliar o projeto e entrar em contato.",
  startLabel: "Iniciar qualificação",
  audienceQuestion: "Para quem será desenvolvido o aplicativo?",
  needsQuestion: "O que você precisa que o aplicativo faça?",
  needsSupport:
    "Conte quem vai usar e quais seriam as principais funções. Exemplo: meus clientes precisam consultar produtos e fazer pedidos pelo aplicativo.",
  needsMinError: "Conte um pouco mais sobre o que o aplicativo precisa fazer.",
  timelineQuestion: "Quando você precisa do aplicativo funcionando?",
  investmentQuestion:
    "A condição de 3x de R$ 2.500, total de R$ 7.500, está dentro do investimento que você considera para o projeto?",
  decisionQuestion: "Qual é sua participação na contratação?",
  contactNotice:
    "A Orbyts utilizará suas respostas e seus dados de contato para avaliar a solicitação e conversar com você sobre o projeto por telefone, WhatsApp ou e-mail.",
  successTitle: "Recebemos sua ideia!",
  successBody:
    "Vamos analisar suas respostas e entrar em contato para entender os detalhes e avaliar o escopo, o investimento e o prazo do projeto.",
  emailSubjectPrefix: "[App Qualificação]",
  investmentLabel: "Investimento 3x R$2.500",
  needsEmailHeading: "O que o aplicativo precisa fazer",
};

export const WEB_SYSTEM_QUALIFICATION: QualificationConfig = {
  product: "sistema-web",
  path: "/lp/sistema-web",
  internalName: "ORBYTS | SISTEMA WEB | QUALIFICAÇÃO",
  title: "O que você precisa organizar na sua operação?",
  intro:
    "Conte o que sua empresa precisa controlar, organizar ou automatizar. Desenvolvemos sistemas web sob medida, com condição anunciada de 3x de R$ 1.750 — total de R$ 5.250 — para o escopo definido na proposta.",
  helper: "Suas respostas ajudarão nossa equipe a avaliar o projeto e entrar em contato.",
  startLabel: "Iniciar qualificação",
  audienceQuestion: "Para quem será desenvolvido o sistema?",
  needsQuestion: "Qual processo você precisa organizar ou automatizar com o sistema?",
  needsSupport:
    "Explique o que vocês fazem hoje e o que precisa melhorar. Exemplo: controlamos os pedidos em planilhas e precisamos acompanhar responsáveis, prazos e entregas em um único lugar.",
  needsMinError: "Conte um pouco mais sobre o processo que você precisa organizar.",
  timelineQuestion: "Quando você precisa do sistema funcionando?",
  investmentQuestion:
    "A condição de 3x de R$ 1.750, total de R$ 5.250, está dentro do investimento que você considera para o projeto?",
  decisionQuestion: "Qual é sua participação na contratação?",
  contactNotice:
    "A Orbyts utilizará suas respostas e seus dados de contato para avaliar a solicitação e conversar com você sobre o projeto por telefone, WhatsApp ou e-mail.",
  successTitle: "Recebemos sua solicitação!",
  successBody:
    "Vamos analisar suas respostas e entrar em contato para entender sua operação e avaliar o escopo, o investimento e o prazo do projeto.",
  emailSubjectPrefix: "[Sistema Web Qualificação]",
  investmentLabel: "Investimento 3x R$1.750",
  needsEmailHeading: "Processo a organizar ou automatizar",
};

export const APP_SYSTEM_QUALIFICATION: QualificationConfig = {
  product: "app-sistema",
  path: "/lp/app-sistema",
  internalName: "ORBYTS | APP + SISTEMA WEB | QUALIFICAÇÃO",
  title: "Vamos entender seu projeto de aplicativo + sistema?",
  intro:
    "Conte como o aplicativo e o sistema web precisam ajudar seu negócio. A condição anunciada para o conjunto é de 3x de R$ 3.400 — total de R$ 10.200 — para o escopo definido na proposta.",
  helper: "Suas respostas ajudarão nossa equipe a avaliar o projeto e entrar em contato.",
  startLabel: "Iniciar qualificação",
  audienceQuestion: "Para quem serão desenvolvidos o aplicativo e o sistema?",
  needsQuestion: "O que você precisa fazer no aplicativo e no sistema web?",
  needsSupport:
    "Conte quem vai usar cada um e quais funções precisa. Exemplo: clientes fazem pedidos no aplicativo e nossa equipe acompanha e gerencia os pedidos pelo computador. Se ainda não souber dividir as funções, descreva sua ideia.",
  needsMinError: "Conte um pouco mais sobre o que você precisa no aplicativo e no sistema.",
  timelineQuestion: "Quando você precisa da solução funcionando?",
  investmentQuestion:
    "A condição de 3x de R$ 3.400, total de R$ 10.200, está dentro do investimento que você considera para o projeto?",
  decisionQuestion: "Qual é sua participação na contratação?",
  contactNotice:
    "A Orbyts utilizará suas respostas e seus dados de contato para avaliar a solicitação e conversar com você sobre o projeto por telefone, WhatsApp ou e-mail.",
  successTitle: "Recebemos seu projeto!",
  successBody:
    "Vamos analisar suas respostas e entrar em contato para entender como o aplicativo e o sistema devem funcionar e avaliar o escopo, o investimento e o prazo.",
  emailSubjectPrefix: "[App + Sistema Qualificação]",
  investmentLabel: "Investimento 3x R$3.400",
  needsEmailHeading: "O que precisa no aplicativo e no sistema web",
};

export const QUALIFICATION_BY_PRODUCT: Record<QualificationProduct, QualificationConfig> = {
  aplicativo: APP_QUALIFICATION,
  "sistema-web": WEB_SYSTEM_QUALIFICATION,
  "app-sistema": APP_SYSTEM_QUALIFICATION,
};

export function getOptionLabel(
  options: ReadonlyArray<{ value: string; label: string }>,
  value: string,
): string {
  return options.find((option) => option.value === value)?.label ?? value;
}
