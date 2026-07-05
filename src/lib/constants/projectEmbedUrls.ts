/**
 * URLs externas para testar o embed iframe na ORBYTS.
 *
 * Ordem de prioridade em `resolveProjectAppUrl()`:
 *  1. `NEXT_PUBLIC_PROJECT_*_URL` no `.env.local`  ← use em produção
 *  2. `appUrl` no objeto do projeto em `projects.ts`
 *  3. URLs abaixo (preview temático para testes)
 *  4. `/demo/[id]` (demo interna fallback)
 *
 * Sites como google.com bloqueiam iframe; use URLs pensadas para embed
 * (Google Maps /embed, CodePen /embed, seu app com CSP frame-ancestors).
 */
export const PROJECT_EMBED_PREVIEW_URLS: Record<string, string> = {
  /** Mapa interativo — simula geolocalização / territórios (Orb Run) */
  "orb-run":
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.021023684939!2d-51.230377!3d-30.034647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95197954980fb789%3A0x4418914349c01530!2sPorto%20Alegre%2C%20RS!5e0!3m2!1spt-BR!2sbr!4v1710000000000!5m2!1spt-BR!2sbr",

  /** Dashboard admin — simula painel SaaS / billing (Recebi Fintech) */
  "recebi-fintech":
    "https://codepen.io/wodny/embed/QxPGYx?default-tab=result&theme-id=dark",

  /** Painel médico — simula ERP / agenda clínica (ClinicFlow) */
  clinicflow:
    "https://codepen.io/alex-kendall/embed/WNbMjNW?default-tab=result&theme-id=light",
};

export type ProjectAppUrlSource = "env" | "project" | "preview" | "demo";

export interface ResolvedProjectAppUrl {
  url: string;
  source: ProjectAppUrlSource;
}
