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
      "Ideal para construir do zero. Prazo, orçamento e entregáveis definidos contratualmente.",
    features: [
      { text: "Cláusula de multa por atraso", variant: "check-circle" },
      { text: "Pagamento parcelado por marcos", variant: "check-circle" },
      { text: "Design aprovado antecipadamente", variant: "check-circle" },
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
      "Ideal para produtos em evolução. Ciclos de desenvolvimento sob demanda para escalar seu app.",
    features: [
      { text: "Sprints ágeis de 14 dias úteis", variant: "check" },
      { text: "Flexibilidade total de backlog", variant: "check" },
      { text: "Alocação dedicada de engenharia", variant: "check" },
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
    { href: "#projetos", label: "Web Apps" },
    { href: "#projetos", label: "Mobile Apps" },
    { href: "#modelos", label: "SaaS B2B" },
  ],
  company: [
    { href: "#processo", label: "Sobre Nós" },
    { href: "#contato", label: "Carreiras" },
    { href: "#contato", label: "Contato" },
  ],
} as const;
