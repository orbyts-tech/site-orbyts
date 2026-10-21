import type { Metadata, Viewport } from "next";
import { WEB_SYSTEM_QUALIFICATION } from "@/features/qualification/content";
import { QualificationPageShell } from "@/features/qualification/QualificationPageShell";
import { absoluteUrl } from "@/config/site";

const TITLE = `${WEB_SYSTEM_QUALIFICATION.title} | Orbyts`;
const DESCRIPTION = WEB_SYSTEM_QUALIFICATION.intro;

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: absoluteUrl(WEB_SYSTEM_QUALIFICATION.path) },
  robots: { index: false, follow: true },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: absoluteUrl(WEB_SYSTEM_QUALIFICATION.path),
    type: "website",
    locale: "pt_BR",
  },
};

export const viewport: Viewport = {
  themeColor: "#0f1714",
  colorScheme: "dark",
};

export default function WebSystemQualificationPage() {
  return <QualificationPageShell config={WEB_SYSTEM_QUALIFICATION} />;
}
