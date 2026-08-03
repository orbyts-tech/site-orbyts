export const SITE = {
  name: "ORBYTS",
  legalName: "ORBYTS Tecnologia",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://orbyts.com.br",
  locale: "pt_BR",
  language: "pt-BR",
  title: "ORBYTS — Software House em Porto Alegre | Entrega no prazo",
  description:
    "Software house em Porto Alegre especializada em sistemas web, apps mobile e SaaS B2B. Arquitetura escalável, código limpo e cronograma blindado. +100 projetos, 100% no prazo.",
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
  },
  services: [
    "Desenvolvimento de sistemas web",
    "Desenvolvimento de aplicativos mobile",
    "SaaS B2B",
    "Squad as a Service",
  ],
  themeColor: "#339A62",
  logoPath: "/logo-orbyts.webp",
} as const;

export function absoluteUrl(path: string): string {
  return new URL(path, SITE.url).href;
}
