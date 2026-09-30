import type { MetadataRoute } from "next";
import { CONTENT_LAST_UPDATED, SITE } from "@/config/site";
import { MODEL_PAGES } from "@/lib/seo/model-pages";
import { SERVICE_PAGES } from "@/lib/seo/service-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(CONTENT_LAST_UPDATED);

  return [
    {
      url: SITE.url,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...SERVICE_PAGES.map((page) => ({
      url: `${SITE.url}/${page.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    ...MODEL_PAGES.map((page) => ({
      url: `${SITE.url}/modelos/${page.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    {
      url: `${SITE.url}/portfolio`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
