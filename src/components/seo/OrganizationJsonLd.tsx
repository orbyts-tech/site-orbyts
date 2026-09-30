import { absoluteUrl, COMPANY_FACTS, SITE } from "@/config/site";
import { MODEL_PAGES } from "@/lib/seo/model-pages";
import { SERVICE_PAGES } from "@/lib/seo/service-pages";

const AREA_SERVED = [
  { "@type": "City", name: SITE.location.city },
  { "@type": "AdministrativeArea", name: "Rio Grande do Sul" },
  { "@type": "Country", name: "Brasil" },
];

export function OrganizationJsonLd() {
  const organizationId = `${SITE.url}/#organization`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": organizationId,
        name: SITE.legalName,
        alternateName: [SITE.name, SITE.title],
        url: SITE.url,
        logo: {
          "@type": "ImageObject",
          url: absoluteUrl("/icon.png"),
          width: 192,
          height: 192,
        },
        image: absoluteUrl(SITE.ogImagePath),
        description: SITE.description,
        slogan: SITE.tagline,
        foundingDate: String(COMPANY_FACTS.foundingYear),
        foundingLocation: {
          "@type": "Place",
          name: `${SITE.location.city}, ${SITE.location.region}, Brasil`,
        },
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
        areaServed: AREA_SERVED,
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
        knowsAbout: [...SITE.services, ...SITE.technologies],
        knowsLanguage: "pt-BR",
        priceRange: "$$",
        ...(SITE.socialProfiles.length > 0 ? { sameAs: SITE.socialProfiles } : {}),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Serviços e modelos de parceria",
          itemListElement: [
            ...SERVICE_PAGES.map((page) => ({
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: page.title,
                description: page.description,
                url: absoluteUrl(`/${page.slug}`),
              },
            })),
            ...MODEL_PAGES.map((page) => ({
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: page.name,
                description: page.summary,
                url: absoluteUrl(`/modelos/${page.slug}`),
              },
            })),
          ],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        url: SITE.url,
        name: SITE.title,
        alternateName: SITE.legalName,
        description: SITE.description,
        publisher: { "@id": organizationId },
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
