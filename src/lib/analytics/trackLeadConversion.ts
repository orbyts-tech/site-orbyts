import { SITE } from "@/config/site";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * Dispara conversão de lead no Google Ads e no Meta Pixel (quando disponíveis).
 * `eventId` é enviado ao Meta como eventID (deduplicação com a API de Conversões).
 */
export function trackLeadConversion(params?: { contentName?: string; eventId?: string }): void {
  const { googleAdsId, leadConversionLabel, metaPixelId } = SITE.analytics;

  if (leadConversionLabel && typeof window.gtag === "function") {
    window.gtag("event", "conversion", {
      send_to: `${googleAdsId}/${leadConversionLabel}`,
    });
  }

  if (metaPixelId && typeof window.fbq === "function") {
    const data = params?.contentName ? { content_name: params.contentName } : undefined;
    if (params?.eventId) {
      window.fbq("track", "Lead", data ?? {}, { eventID: params.eventId });
    } else {
      window.fbq("track", "Lead", data);
    }
  }
}

/**
 * Sinal de lead pré-qualificado pelas respostas do formulário (NÃO é confirmação comercial).
 * Evento personalizado, só para medir no Meta; a campanha continua otimizando em `Lead`.
 * Não envia dados pessoais: apenas o serviço de interesse.
 */
export function trackQualifiedLead(params: { contentName: string; eventId: string }): void {
  const { metaPixelId } = SITE.analytics;
  if (!metaPixelId || typeof window.fbq !== "function") return;
  window.fbq(
    "trackCustom",
    "LeadQualificado",
    { content_name: params.contentName },
    { eventID: `${params.eventId}-qualificado` },
  );
}
