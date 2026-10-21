import { trackLeadConversion } from "@/lib/analytics/trackLeadConversion";
import { ATTRIBUTION_KEYS } from "./lead.schema";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

type EventParams = Record<string, string | number | boolean>;

/**
 * Eventos de mensuração da landing. Vão para o `dataLayer` (GTM/GA4) e, quando houver
 * gtag carregado, para o GA4 também. Nunca envie dados pessoais (nome, e-mail, telefone, descrição).
 */
export function trackEvent(event: string, params: EventParams = {}): void {
  if (typeof window === "undefined") return;
  try {
    (window.dataLayer = window.dataLayer || []).push({ event, ...params });
  } catch {
    /* sem mensuração não bloqueia a página */
  }
}

/** Conversão de lead: chamar SOMENTE após o backend confirmar o recebimento. */
export function trackConfirmedLead(params: { eventId: string; leadId: string; service: string; budget: string }): void {
  trackEvent("generate_lead", {
    event_id: params.eventId,
    lead_id: params.leadId,
    service: params.service,
    budget_range: params.budget,
  });
  // Conversão do Google Ads já configurada no site (SITE.analytics).
  trackLeadConversion();
}

const STORAGE_KEY = "orbyts_lp_attribution";

/** Lê UTMs/click IDs da URL e preserva na sessão (as âncoras internas não mudam a URL). */
export function readAttribution(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const fromUrl: Record<string, string> = {};
  try {
    const params = new URLSearchParams(window.location.search);
    for (const key of ATTRIBUTION_KEYS) {
      const value = params.get(key);
      if (value) fromUrl[key] = value.slice(0, 200);
    }
  } catch {
    return fromUrl;
  }
  try {
    if (Object.keys(fromUrl).length) {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(fromUrl));
      return fromUrl;
    }
    const stored = window.sessionStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as Record<string, string>) : {};
  } catch {
    return fromUrl;
  }
}

export function newEventId(): string {
  try {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  } catch {
    /* fallback abaixo */
  }
  return `lead-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}
