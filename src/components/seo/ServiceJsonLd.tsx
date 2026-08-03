import { absoluteUrl, SITE } from "@/config/site";

interface ServiceJsonLdProps {
  serviceName: string;
  description: string;
  path: string;
}

export function ServiceJsonLd({ serviceName, description, path }: ServiceJsonLdProps) {
  const url = absoluteUrl(path);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: serviceName,
    description,
    url,
    provider: {
      "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
      "@id": `${SITE.url}/#organization`,
      name: SITE.legalName,
      url: SITE.url,
      telephone: SITE.contact.phone,
      email: SITE.contact.email,
      address: {
        "@type": "PostalAddress",
        addressLocality: SITE.location.city,
        addressRegion: SITE.location.region,
        addressCountry: SITE.location.country,
      },
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
    serviceType: serviceName,
    termsOfService: `${SITE.url}/#contato`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
