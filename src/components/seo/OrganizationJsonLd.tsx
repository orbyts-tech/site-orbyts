import { absoluteUrl, SITE } from "@/config/site";

export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE.url}/#organization`,
        name: SITE.legalName,
        url: SITE.url,
        logo: absoluteUrl(SITE.logoPath),
        description: SITE.description,
        email: SITE.contact.email,
        areaServed: {
          "@type": "Place",
          name: `${SITE.location.city}, ${SITE.location.region}, ${SITE.location.country}`,
        },
        knowsAbout: SITE.keywords,
      },
      {
        "@type": "ProfessionalService",
        "@id": `${SITE.url}/#service`,
        name: SITE.name,
        url: SITE.url,
        description: SITE.description,
        provider: { "@id": `${SITE.url}/#organization` },
        serviceType: SITE.services,
        areaServed: {
          "@type": "AdministrativeArea",
          name: SITE.location.region,
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        url: SITE.url,
        name: SITE.title,
        description: SITE.description,
        publisher: { "@id": `${SITE.url}/#organization` },
        inLanguage: SITE.language,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
