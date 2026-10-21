import type { Metadata, Viewport } from "next";
import { APP_SYSTEM_QUALIFICATION } from "@/features/qualification/content";
import { QualificationPageShell } from "@/features/qualification/QualificationPageShell";
import { absoluteUrl } from "@/config/site";

const TITLE = `${APP_SYSTEM_QUALIFICATION.title} | Orbyts`;
const DESCRIPTION = APP_SYSTEM_QUALIFICATION.intro;

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: absoluteUrl(APP_SYSTEM_QUALIFICATION.path) },
  robots: { index: false, follow: true },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: absoluteUrl(APP_SYSTEM_QUALIFICATION.path),
    type: "website",
    locale: "pt_BR",
  },
};

export const viewport: Viewport = {
  themeColor: "#0f1714",
  colorScheme: "dark",
};

export default function AppSystemQualificationPage() {
  return <QualificationPageShell config={APP_SYSTEM_QUALIFICATION} />;
}
