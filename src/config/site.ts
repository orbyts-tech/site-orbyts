export const COMPANY_FACTS = {
  foundingYear: 2023,
  yearsInMarket: 3,
  projectsDelivered: 100,
  onTimeDeliveryRate: 100,
  supportDaysAfterDelivery: 30,
  squadCycleDays: 30,
} as const;

export const SITE = {
  name: "ORBYTS",
  legalName: "ORBYTS Tecnologia",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://orbytstech.com",
  locale: "pt_BR",
  language: "pt-BR",
  title: "Orbyts",
  homeTitle: "Orbyts | Software House em Porto Alegre — Sistemas, Apps e SaaS",
  description: `Software house em Porto Alegre: sistemas web, apps mobile e SaaS B2B com arquitetura escalável e cronograma blindado. +${COMPANY_FACTS.projectsDelivered} projetos, ${COMPANY_FACTS.onTimeDeliveryRate}% no prazo.`,
  tagline:
    "Engenharia de software previsível no Rio Grande do Sul. Transformando escopos complexos em código de produção.",
  /** Perfis oficiais (LinkedIn, Instagram, GitHub...) — alimentam o `sameAs` do JSON-LD. */
  socialProfiles: [] as readonly string[],
  ogImagePath: "/og-image.png",
  ogImageWidth: 1200,
  ogImageHeight: 630,
  keywords: [
    "software house",
    "software house porto alegre",
    "desenvolvimento de software",
    "desenvolvimento web",
    "desenvolvimento de aplicativos",
    "aplicativos mobile",
    "React Native",
    "Next.js",
    "TypeScript",
    "SaaS B2B",
    "fábrica de software",
    "Porto Alegre",
    "Rio Grande do Sul",
    "escopo fechado",
    "squad as a service",
    "saas full cycle",
    "empresa de software RS",
  ],
  location: {
    city: "Porto Alegre",
    region: "RS",
    country: "BR",
  },
  contact: {
    email: "comercial@orbytstech.com",
    phone: "+5551989573146",
    phoneDisplay: "+55 51 98957-3146",
    whatsapp: "https://wa.me/5551989573146",
    whatsappQuoteMessage: "Vim do site de vocês, quero fazer o orçamento de um projeto!",
  },
  services: [
    "Desenvolvimento de sistemas web",
    "Desenvolvimento de aplicativos mobile",
    "SaaS B2B",
    "Squad as a Service",
    "SaaS Full Cycle",
  ],
  technologies: [
    "React",
    "Next.js",
    "TypeScript",
    "React Native",
    "Node.js",
    "Supabase",
    "PostgreSQL",
    "Tailwind CSS",
    "AWS",
  ],
  themeColor: "#339A62",
  logoPath: "/logo-orbyts.webp",
  analytics: {
    googleAdsId: "AW-18501575118",
    leadConversionLabel: process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_CONVERSION_LABEL ?? "",
    metaPixelId: "1768242021097933",
  },
} as const;

/** Data da última revisão relevante de conteúdo — usada no sitemap e no llms.txt. */
export const CONTENT_LAST_UPDATED = "2026-09-29";

export function absoluteUrl(path: string): string {
  return new URL(path, SITE.url).href;
}
