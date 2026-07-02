export const SITE = {
  name: "ORBYTS",
  legalName: "ORBYTS",
  url: import.meta.env.VITE_SITE_URL ?? "https://orbyts.com.br",
  locale: "pt_BR",
  language: "pt-BR",
  title:
    "ORBYTS | Desenvolvimento de Software em Porto Alegre — Sistemas Web, Apps & E-commerce",
  description:
    "ORBYTS é uma software house em Porto Alegre especializada em desenvolvimento de software sob medida: sistemas web, aplicativos mobile e e-commerce. Ciclos de entrega fixos, contrato PJ e squad dedicado.",
  keywords: [
    "desenvolvimento de software",
    "software house",
    "desenvolvimento de sistemas",
    "desenvolvimento web",
    "aplicativos mobile",
    "e-commerce sob medida",
    "Porto Alegre",
    "React",
    "TypeScript",
    "React Native",
  ],
  location: {
    city: "Porto Alegre",
    region: "RS",
    country: "BR",
  },
  services: [
    "Desenvolvimento de sistemas web",
    "Desenvolvimento de aplicativos mobile",
    "Desenvolvimento de e-commerce",
    "Desenvolvimento de software sob medida",
  ],
  themeColor: "#349860",
  logoPath: "/logo-orbyts.png",
} as const;

export function absoluteUrl(path: string): string {
  return new URL(path, SITE.url).href;
}
