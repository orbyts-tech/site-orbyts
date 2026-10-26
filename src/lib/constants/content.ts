import { COMPANY_FACTS, SITE } from "@/config/site";

export interface ModelFeature {
  text: string;
  variant: "check-circle" | "check";
}

export interface CommercialModel {
  id: string;
  slug: string;
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
    slug: "escopo-fechado",
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
    slug: "squad-as-a-service",
    name: "Squad as a Service",
    description:
      "Ideal para projetos que ainda estão nascendo junto com a ideia e precisam validar ela antes de investir mais.",
    features: [
      { text: "30 dias de desenvolvimento", variant: "check" },
      { text: "MVP completo para você já ter retorno do investimento", variant: "check" },
      { text: "Investimento menor e retorno mais rápido", variant: "check" },
    ],
    ctaLabel: "Conhecer Modelo",
    ctaHref: "#contato",
    variant: "ghost",
  },
  {
    id: "saas-full-cycle",
    slug: "saas-full-cycle",
    name: "SaaS Full Cycle",
    description:
      "Para founders com a ideia do SaaS, mas sem time. Cuidamos de todo o ciclo: do desenvolvimento à aquisição e retenção de clientes, sem você precisar contratar várias equipes.",
    features: [
      { text: "Desenvolvimento, manutenção e suporte do sistema", variant: "check" },
      { text: "Definição do cliente ideal (ICP) e posicionamento", variant: "check" },
      { text: "Estratégia de marketing, tráfego pago e orgânico", variant: "check" },
      { text: "Atendimento ao cliente do seu SaaS", variant: "check" },
    ],
    ctaLabel: "Conhecer Modelo",
    ctaHref: "#contato",
    variant: "ghost",
  },
];

const { projectsDelivered, onTimeDeliveryRate, yearsInMarket } = COMPANY_FACTS;

export const HERO_STATS = [
  {
    value: `+${projectsDelivered}`,
    label: "Projetos entregues",
    highlightPrefix: "+",
    highlightSuffix: String(projectsDelivered),
    countTo: projectsDelivered,
    countedPart: "suffix",
  },
  {
    value: `${onTimeDeliveryRate}%`,
    label: "Entregas no prazo",
    highlightPrefix: String(onTimeDeliveryRate),
    highlightSuffix: "%",
    countTo: onTimeDeliveryRate,
    countedPart: "prefix",
  },
  {
    value: `${yearsInMarket} anos`,
    label: "De mercado",
    highlightPrefix: String(yearsInMarket),
    highlightSuffix: " anos",
    countTo: yearsInMarket,
    countedPart: "prefix",
  },
] as const;

/** Frases autocontidas e factuais — formato que buscadores e IAs extraem e citam. */
export const ABOUT_PARAGRAPHS = [
  `A ${SITE.legalName} é uma software house fundada em ${COMPANY_FACTS.foundingYear} em ${SITE.location.city} (${SITE.location.region}) que desenvolve sistemas web, aplicativos mobile e plataformas SaaS B2B para empresas de todo o Brasil.`,
  `Em ${yearsInMarket} anos de mercado, a ${SITE.name} entregou mais de ${projectsDelivered} projetos, com ${onTimeDeliveryRate}% das entregas no prazo acordado.`,
  `O processo da ${SITE.name} tem quatro etapas: mapeamento de escopo, UI/UX aprovado no Figma, sprints com atualizações semanais e repositório aberto, e handover com código-fonte 100% do cliente e suporte nos primeiros ${COMPANY_FACTS.supportDaysAfterDelivery} dias.`,
  `A ${SITE.name} trabalha com três modelos de parceria: Escopo Fechado, para projetos maiores com orçamento único; Squad as a Service, para validar MVPs em ciclos de ${COMPANY_FACTS.squadCycleDays} dias; e SaaS Full Cycle, em que a ${SITE.name} desenvolve e opera o SaaS do cliente, do ICP ao marketing, tráfego, atendimento e suporte.`,
] as const;

export const ABOUT_FACTS = [
  { label: "Fundação", value: String(COMPANY_FACTS.foundingYear) },
  { label: "Sede", value: `${SITE.location.city}, ${SITE.location.region}` },
  { label: "Atendimento", value: "Todo o Brasil (remoto)" },
  { label: "Projetos entregues", value: `+${projectsDelivered}` },
  { label: "Entregas no prazo", value: `${onTimeDeliveryRate}%` },
  { label: "Especialidades", value: "Sistemas web, apps mobile e SaaS B2B" },
  { label: "Tecnologias", value: SITE.technologies.join(", ") },
] as const;

export const NAV_LINKS = [
  { href: "/#projetos", label: "Projetos" },
  { href: "/#processo", label: "Processo" },
  { href: "/#modelos", label: "Modelos" },
] as const;

export const FOOTER_LINKS = {
  services: [
    { href: "/desenvolvimento-web", label: "Desenvolvimento Web" },
    { href: "/desenvolvimento-aplicativos", label: "Apps Mobile" },
    { href: "/software-house-porto-alegre", label: "Software House POA" },
    { href: "/modelos/escopo-fechado", label: "Escopo Fechado" },
    { href: "/modelos/squad-as-a-service", label: "Squad as a Service" },
    { href: "/modelos/saas-full-cycle", label: "SaaS Full Cycle" },
  ],
  company: [
    { href: "/portfolio", label: "Portfólio" },
    { href: "/#sobre", label: "Sobre" },
    { href: "/#processo", label: "Processo" },
    { href: "/#faq", label: "FAQ" },
    { href: "/#contato", label: "Contato" },
    { href: "/politica-de-privacidade", label: "Privacidade" },
  ],
} as const;
