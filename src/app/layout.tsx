import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { DotGridLazy } from "@/components/layout/DotGridLazy";
import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";
import { SITE } from "@/config/site";
import { DEFAULT_ROBOTS } from "@/lib/seo/metadata";
import "./globals.css";

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
    template: `%s | ${SITE.name}`,
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
        <DotGridLazy />
        <OrganizationJsonLd />
        {children}
      </body>
    </html>
  );
}
