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
export const PROJECT_EMBED_PREVIEW_URLS: Record<string, string> = {};

export type ProjectAppUrlSource = "env" | "project" | "preview" | "demo";

export interface ResolvedProjectAppUrl {
  url: string;
  source: ProjectAppUrlSource;
}
