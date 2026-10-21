import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { GoogleAdsTag } from "@/components/analytics/GoogleAdsTag";
import { MetaPixelTag } from "@/components/analytics/MetaPixelTag";
import { DotGridLazy } from "@/components/layout/DotGridLazy";
import { PointerEffects } from "@/components/motion/PointerEffects";
import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";
import { SITE } from "@/config/site";
import { DEFAULT_ROBOTS } from "@/lib/seo/metadata";
import "./globals.css";

/** Evita HTML pinado 1 ano no CDN da Hostinger (dessincroniza com /_next/static). */
export const revalidate = 60;

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plus-jakarta",
  weight: ["500", "600", "700"],
});

export const viewport: Viewport = {
  themeColor: SITE.themeColor,
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  applicationName: SITE.name,
  title: {
    default: SITE.title,
    template: `%s | ${SITE.title}`,
  },
  description: SITE.description,
  keywords: [...SITE.keywords],
  authors: [{ name: SITE.legalName, url: SITE.url }],
  creator: SITE.legalName,
  publisher: SITE.legalName,
  robots: DEFAULT_ROBOTS,
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  category: "technology",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
  other: {
    "geo.region": `${SITE.location.country}-${SITE.location.region}`,
    "geo.placename": SITE.location.city,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={SITE.language} className={`${inter.variable} ${plusJakarta.variable}`}>
      <body>
        <a href="#conteudo-principal" className="skip-link">
          Ir para o conteúdo principal
        </a>
        <div className="scroll-progress" aria-hidden="true" />
        <DotGridLazy />
        <OrganizationJsonLd />
        <PointerEffects />
        {children}
        <GoogleAdsTag />
        <MetaPixelTag />
      </body>
    </html>
  );
}
