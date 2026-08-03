import { absoluteUrl, SITE } from "@/config/site";

export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
        "@id": `${SITE.url}/#organization`,
        name: SITE.legalName,
        alternateName: SITE.name,
        url: SITE.url,
        logo: {
          "@type": "ImageObject",
          url: absoluteUrl("/icon.png"),
          width: 192,
          height: 192,
        },
        image: absoluteUrl(SITE.ogImagePath),
        description: SITE.description,
        email: SITE.contact.email,
        telephone: SITE.contact.phone,
        address: {
          "@type": "PostalAddress",
          addressLocality: SITE.location.city,
          addressRegion: SITE.location.region,
          addressCountry: SITE.location.country,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: -30.0346,
          longitude: -51.2177,
        },
        areaServed: [
          {
            "@type": "City",
            name: SITE.location.city,
          },
          {
            "@type": "AdministrativeArea",
            name: "Rio Grande do Sul",
          },
          {
            "@type": "Country",
            name: "Brasil",
          },
        ],
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "sales",
            email: SITE.contact.email,
            telephone: SITE.contact.phone,
            availableLanguage: ["Portuguese"],
            areaServed: "BR",
            url: SITE.contact.whatsapp,
          },
        ],
        knowsAbout: SITE.keywords,
        priceRange: "$$",
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
          name: `${SITE.location.city}, ${SITE.location.region}`,
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Modelos de parceria",
          itemListElement: SITE.services.map((service, index) => ({
            "@type": "Offer",
            position: index + 1,
            itemOffered: {
              "@type": "Service",
              name: service,
            },
          })),
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
