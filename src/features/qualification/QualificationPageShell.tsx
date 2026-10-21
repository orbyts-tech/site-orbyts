import type { QualificationConfig } from "./content";
import { QualificationForm } from "./QualificationForm";

const ROUTE_STYLES = `
  body { background: #0f1714; color-scheme: dark; }
  body .scroll-progress,
  body > .skip-link,
  body a[aria-label="Fale conosco pelo WhatsApp"],
  body a[aria-label="Solicitar orçamento pelo WhatsApp"] { display: none !important; }
`;

export function QualificationPageShell({ config }: { config: QualificationConfig }) {
  return (
    <>
      <style>{ROUTE_STYLES}</style>
      <QualificationForm config={config} />
    </>
  );
}
