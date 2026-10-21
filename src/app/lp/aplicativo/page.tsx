import type { Metadata, Viewport } from "next";
import { APP_QUALIFICATION } from "@/features/qualification/content";
import { QualificationPageShell } from "@/features/qualification/QualificationPageShell";
import { absoluteUrl } from "@/config/site";

const TITLE = `${APP_QUALIFICATION.title} | Orbyts`;
const DESCRIPTION = APP_QUALIFICATION.intro;

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: absoluteUrl(APP_QUALIFICATION.path) },
  robots: { index: false, follow: true },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: absoluteUrl(APP_QUALIFICATION.path),
    type: "website",
    locale: "pt_BR",
  },
};

export const viewport: Viewport = {
  themeColor: "#0f1714",
  colorScheme: "dark",
};

export default function AppQualificationPage() {
  return <QualificationPageShell config={APP_QUALIFICATION} />;
}
