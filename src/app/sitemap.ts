import type { MetadataRoute } from "next";
import { SITE } from "@/config/site";
import { SERVICE_PAGES } from "@/lib/seo/service-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: SITE.url,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...SERVICE_PAGES.map((page) => ({
      url: `${SITE.url}/${page.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
  ];
}
