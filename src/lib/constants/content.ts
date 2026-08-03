export interface ModelFeature {
  text: string;
  variant: "check-circle" | "check";
}

export interface CommercialModel {
  id: string;
  name: string;
  description: string;
  features: ModelFeature[];
  ctaLabel: string;
  ctaHref: string;
  variant: "primary" | "ghost";
  featured?: boolean;
}

export const COMMERCIAL_MODELS: CommercialModel[] = [
  {
    id: "escopo-fechado",
    name: "Escopo Fechado",
    description:
      "Ideal para projetos maiores com duração acima de 3 meses, prazo definido e orçamento único.",
    features: [
      { text: "Projeto todo documentado", variant: "check-circle" },
      { text: "Qualidade na infraestrutura e segurança", variant: "check-circle" },
      { text: "Time de desenvolvimento focado full-time", variant: "check-circle" },
    ],
    ctaLabel: "Solicitar Orçamento",
    ctaHref: "#contato",
    variant: "primary",
    featured: true,
  },
  {
    id: "squad-as-a-service",
    name: "Squad as a Service",
    description:
      "Ideal para projetos que ainda estão nascendo junto com a ideia e precisam validar ela antes de investir mais.",
    features: [
      { text: "15 dias de desenvolvimento", variant: "check" },
      { text: "MVP completo para você já ter retorno do investimento", variant: "check" },
      { text: "Investimento menor e retorno mais rápido", variant: "check" },
    ],
    ctaLabel: "Conhecer Modelo",
    ctaHref: "#contato",
    variant: "ghost",
  },
];

export const HERO_STATS = [
  { value: "+100", label: "Projetos entregues", highlightPrefix: "+", highlightSuffix: "100" },
  { value: "100%", label: "Entregas no prazo", highlightPrefix: "100", highlightSuffix: "%" },
  { value: "24h", label: "Para proposta formal", highlightPrefix: "24", highlightSuffix: "h" },
] as const;

export const NAV_LINKS = [
  { href: "#projetos", label: "Projetos" },
  { href: "#processo", label: "Processo" },
  { href: "#modelos", label: "Modelos" },
] as const;

export const FOOTER_LINKS = {
  services: [
    { href: "/desenvolvimento-web", label: "Desenvolvimento Web" },
    { href: "/desenvolvimento-aplicativos", label: "Apps Mobile" },
    { href: "/software-house-porto-alegre", label: "Software House POA" },
    { href: "/#modelos", label: "Modelos comerciais" },
  ],
  company: [
    { href: "/#projetos", label: "Projetos" },
    { href: "/#processo", label: "Processo" },
    { href: "/#faq", label: "FAQ" },
    { href: "/#contato", label: "Contato" },
  ],
} as const;
