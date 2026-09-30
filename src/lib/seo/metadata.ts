import type { Metadata } from "next";
import { absoluteUrl, SITE } from "@/config/site";

interface PageMetadataOptions {
  title?: string;
  /** Ignora o template "%s | Orbyts" — usado na home, que já carrega a marca no título. */
  isAbsoluteTitle?: boolean;
  description?: string;
  path?: string;
  noIndex?: boolean;
  ogImage?: string;
}

export function createPageMetadata({
  title = SITE.title,
  isAbsoluteTitle = false,
  description = SITE.description,
  path = "/",
  noIndex = false,
  ogImage = SITE.ogImagePath,
}: PageMetadataOptions = {}): Metadata {
  const canonicalPath = path.startsWith("/") ? path : `/${path}`;
  const pageUrl = absoluteUrl(canonicalPath);
  const ogImageUrl = absoluteUrl(ogImage);

  return {
    title: isAbsoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: canonicalPath,
      languages: {
        [SITE.language]: canonicalPath,
        "x-default": canonicalPath,
      },
      types: {
        "text/plain": [{ url: "/llms.txt", title: `Resumo da ${SITE.name} para IAs (llms.txt)` }],
      },
    },
    openGraph: {
      type: "website",
      locale: SITE.locale,
      url: pageUrl,
      siteName: SITE.name,
      title,
      description,
      images: [
        {
          url: ogImageUrl,
          width: SITE.ogImageWidth,
          height: SITE.ogImageHeight,
          alt: `${SITE.name} — Software House em Porto Alegre`,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
    ...(noIndex
      ? {
          robots: {
            index: false,
            follow: false,
          },
        }
      : {}),
  };
}

export const DEFAULT_ROBOTS: Metadata["robots"] = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
};
