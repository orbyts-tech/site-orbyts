export const SITE = {
  name: "ORBYTS",
  legalName: "ORBYTS Tecnologia",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://orbyts.com.br",
  locale: "pt_BR",
  language: "pt-BR",
  title: "ORBYTS — Software que entrega no prazo",
  description:
    "Software house especializada em sistemas web e apps mobile com arquitetura escalável, código limpo e cronograma blindado. +100 projetos entregues, 100% no prazo.",
  ogImagePath: "/og-image.png",
  ogImageWidth: 1200,
  ogImageHeight: 630,
  keywords: [
    "software house",
    "desenvolvimento de software",
    "desenvolvimento web",
    "aplicativos mobile",
    "React Native",
    "Next.js",
    "TypeScript",
    "SaaS B2B",
    "Porto Alegre",
    "Rio Grande do Sul",
    "escopo fechado",
    "squad as a service",
  ],
  location: {
    city: "Porto Alegre",
    region: "RS",
    country: "BR",
  },
  contact: {
    email: "comercial@orbytstech.com",
    whatsapp: "https://wa.me/5551989573146",
  },
  services: [
    "Desenvolvimento de sistemas web",
    "Desenvolvimento de aplicativos mobile",
    "SaaS B2B",
    "Squad as a Service",
  ],
  themeColor: "#339A62",
  logoPath: "/logo-orbyts.png",
} as const;

export function absoluteUrl(path: string): string {
  return new URL(path, SITE.url).href;
}
