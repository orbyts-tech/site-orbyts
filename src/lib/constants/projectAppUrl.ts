import type { Project } from "./projects";
import {
  PROJECT_EMBED_PREVIEW_URLS,
  type ProjectAppUrlSource,
  type ResolvedProjectAppUrl,
} from "./projectEmbedUrls";

const PROJECT_APP_URLS: Record<string, string | undefined> = {
  trancatto: process.env.NEXT_PUBLIC_PROJECT_TRANCATTO_URL,
  "nilo-consultor-grafico": process.env.NEXT_PUBLIC_PROJECT_NILO_URL,
  "ffit-academia": process.env.NEXT_PUBLIC_PROJECT_FFIT_URL,
  "conecta-condo": process.env.NEXT_PUBLIC_PROJECT_CONECTA_CONDO_URL,
};

export function resolveProjectAppUrl(project: Project): ResolvedProjectAppUrl {
  const fromEnv = PROJECT_APP_URLS[project.id]?.trim();
  if (fromEnv) return { url: fromEnv, source: "env" };

  const fromProject = project.appUrl?.trim();
  if (fromProject) return { url: fromProject, source: "project" };

  const preview = PROJECT_EMBED_PREVIEW_URLS[project.id];
  if (preview) return { url: preview, source: "preview" };

  return { url: `/demo/${project.id}`, source: "demo" };
}

export function getProjectAppUrl(project: Project): string {
  return resolveProjectAppUrl(project).url;
}

export function getProjectAppUrlSource(project: Project): ProjectAppUrlSource {
  return resolveProjectAppUrl(project).source;
}

export function isExternalProjectUrl(url: string): boolean {
  return url.startsWith("http://") || url.startsWith("https://");
}

export function opensProjectExternally(project: Project): boolean {
  return project.embedMode === "external";
}

export function canEmbedProject(project: Project): boolean {
  return project.embedMode !== "external";
}

/** Hosts/rotas pensadas para iframe — pula verificação HEAD */
export function isKnownEmbeddableUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    if (parsed.hostname === "codepen.io" && parsed.pathname.includes("/embed/")) return true;
    if (parsed.hostname === "www.google.com" && parsed.pathname.startsWith("/maps/embed")) {
      return true;
    }
    if (
      parsed.hostname === "www.openstreetmap.org" &&
      parsed.pathname.includes("/export/embed")
    ) {
      return true;
    }
    if (parsed.hostname.endsWith(".netlify.app")) return true;
    return false;
  } catch {
    return false;
  }
}

export function hasProjectLiveApp(_project: Project): boolean {
  return true;
}
