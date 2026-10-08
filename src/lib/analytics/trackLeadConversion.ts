import { SITE } from "@/config/site";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackLeadConversion(): void {
  const { googleAdsId, leadConversionLabel } = SITE.analytics;

  if (!leadConversionLabel || typeof window.gtag !== "function") return;

  window.gtag("event", "conversion", {
    send_to: `${googleAdsId}/${leadConversionLabel}`,
  });
}
