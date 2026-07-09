import type { Metadata } from "next";
import { absoluteUrl, SITE } from "@/config/site";

interface PageMetadataOptions {
  title?: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
  ogImage?: string;
}

export function createPageMetadata({
  title = SITE.title,
  description = SITE.description,
  path = "/",
  noIndex = false,
  ogImage = SITE.ogImagePath,
}: PageMetadataOptions = {}): Metadata {
  const canonicalPath = path.startsWith("/") ? path : `/${path}`;
  const pageUrl = absoluteUrl(canonicalPath);
  const ogImageUrl = absoluteUrl(ogImage);

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
      languages: {
        [SITE.language]: canonicalPath,
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
          alt: `${SITE.name} — Software House`,
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
