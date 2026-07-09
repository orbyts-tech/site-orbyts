import { absoluteUrl, SITE } from "@/config/site";

interface WebPageJsonLdProps {
  path?: string;
  title?: string;
  description?: string;
}

export function WebPageJsonLd({
  path = "/",
  title = SITE.title,
  description = SITE.description,
}: WebPageJsonLdProps) {
  const pageUrl = absoluteUrl(path);

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: title,
    description,
    isPartOf: { "@id": `${SITE.url}/#website` },
    about: { "@id": `${SITE.url}/#organization` },
    inLanguage: SITE.language,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
