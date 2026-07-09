import type { MetadataRoute } from "next";
import { SITE } from "@/config/site";

const PRIVATE_PATHS = ["/api/", "/demo/", "/spatial-home/", "/projetos/"] as const;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [...PRIVATE_PATHS],
    },
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
