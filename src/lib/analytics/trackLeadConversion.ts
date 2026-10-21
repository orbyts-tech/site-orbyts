import { SITE } from "@/config/site";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

/** Dispara conversão de lead no Google Ads e no Meta Pixel (quando disponíveis). */
export function trackLeadConversion(params?: { contentName?: string }): void {
  const { googleAdsId, leadConversionLabel, metaPixelId } = SITE.analytics;

  if (leadConversionLabel && typeof window.gtag === "function") {
    window.gtag("event", "conversion", {
      send_to: `${googleAdsId}/${leadConversionLabel}`,
    });
  }

  if (metaPixelId && typeof window.fbq === "function") {
    window.fbq("track", "Lead", params?.contentName ? { content_name: params.contentName } : undefined);
  }
}
