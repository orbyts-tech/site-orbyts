export interface ServicePageContent {
  slug: string;
  title: string;
  description: string;
  heading: string;
  intro: string;
  highlights: string[];
  body: string[];
  ctaLabel: string;
}

export const SERVICE_PAGES: ServicePageContent[] = [
  {
    slug: "desenvolvimento-web",
    title: "Desenvolvimento Web sob medida",
    description:
      "Software house em Porto Alegre especializada em sistemas web com React, Next.js e TypeScript. Escopo claro, arquitetura escalável e entrega no prazo.",
    heading: "Desenvolvimento web com prazo e qualidade.",
    intro:
      "Criamos sistemas web e plataformas SaaS para empresas que precisam de previsibilidade: do discovery ao deploy, com documentação e cronograma blindado.",
    highlights: [
      "React, Next.js e TypeScript em produção",
      "Arquitetura escalável e código revisável",
      "Integrações, painéis e fluxos B2B",
      "Proposta formal em até 24 horas",
    ],
    body: [
      "Se você busca uma software house para desenvolvimento web no Rio Grande do Sul ou remoto em todo o Brasil, a ORBYTS entrega sistemas pensados para crescer sem surpresa de prazo.",
      "Trabalhamos com Escopo Fechado para projetos maiores e Squad as a Service para validar MVPs com ciclos curtos — sempre com o cliente no controle.",
    ],
    ctaLabel: "Solicitar proposta de sistema web",
  },
  {
    slug: "desenvolvimento-aplicativos",
    title: "Desenvolvimento de Aplicativos Mobile",
    description:
      "Apps mobile e PWA com React Native. Software house ORBYTS: experiência nativa, performance e entrega previsível para o seu negócio.",
    heading: "Aplicativos mobile que saem do papel no prazo.",
    intro:
      "Desenvolvemos apps iOS/Android e PWAs com foco em usabilidade, performance e manutenção simples — do MVP ao produto em escala.",
    highlights: [
      "React Native e PWA",
      "MVP em ciclos curtos",
      "Integração com APIs e backoffice",
      "Publicação e evolução contínua",
    ],
    body: [
      "Empresas que precisam de aplicativo mobile encontram na ORBYTS um time acostumado a transformar escopo em produto publicado, com qualidade de engenharia e comunicação clara.",
      "Ideal para validar ideias com Squad as a Service ou estruturar um app completo em Escopo Fechado.",
    ],
    ctaLabel: "Solicitar proposta de app",
  },
  {
    slug: "software-house-porto-alegre",
    title: "Software House em Porto Alegre",
    description:
      "ORBYTS — software house em Porto Alegre (RS) para sistemas web, apps e SaaS B2B. +100 projetos, 100% das entregas no prazo.",
    heading: "Software house em Porto Alegre com entrega previsível.",
    intro:
      "Somos a ORBYTS Tecnologia: engenharia de software para empresas do RS e de todo o Brasil que não podem errar no prazo nem na qualidade.",
    highlights: [
      "Base em Porto Alegre, atendimento nacional",
      "+100 projetos entregues",
      "100% das entregas no prazo",
      "Web, mobile e SaaS B2B",
    ],
    body: [
      "Contratar uma software house em Porto Alegre significa ter proximidade cultural e fuso horário alinhado — com a maturidade de um time que já entregou dezenas de produtos digitais.",
      "Converse com nosso comercial e receba uma proposta objetiva: escopo, prazo, investimento e próximos passos.",
    ],
    ctaLabel: "Falar com a ORBYTS",
  },
];

export function getServicePage(slug: string): ServicePageContent | undefined {
  return SERVICE_PAGES.find((page) => page.slug === slug);
}
