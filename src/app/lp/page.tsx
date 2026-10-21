import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { LandingPage } from "@/features/landing/LandingPage";
import { absoluteUrl } from "@/config/site";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700"],
});

const TITLE = "Desenvolvimento de Sites, Sistemas e Automações | Orbyts";
const DESCRIPTION =
  "A Orbyts desenvolve sites, sistemas, plataformas e automações sob medida para empresas que querem simplificar processos e crescer com tecnologia.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: absoluteUrl("/lp") },
  // Página de campanha: fora do índice para não competir com a home e as páginas de serviço.
  robots: { index: false, follow: true },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: absoluteUrl("/lp"),
    type: "website",
    locale: "pt_BR",
  },
};

export const viewport: Viewport = {
  themeColor: "#090b0d",
  colorScheme: "dark",
};

/** Ajustes globais só nesta rota: fundo escuro e elementos do site institucional ocultos. */
const ROUTE_STYLES = `
  body { background: #090b0d; color-scheme: dark; }
  body .scroll-progress, body > .skip-link { display: none; }
  html { scroll-padding-top: 96px; }
`;

export default function CampaignLandingPage() {
  return (
    <div className={manrope.variable}>
      <style>{ROUTE_STYLES}</style>
      <LandingPage />
    </div>
  );
}
