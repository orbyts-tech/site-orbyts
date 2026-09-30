import { absoluteUrl, SITE } from "@/config/site";
import type { Project } from "@/lib/constants/projects";
import { getProjectImageUrl, isExternalProjectUrl } from "@/lib/constants/projects";

interface PortfolioJsonLdProps {
  projects: Project[];
}

export function PortfolioJsonLd({ projects }: PortfolioJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE.url}/portfolio#projetos`,
    name: `Portfólio de projetos entregues pela ${SITE.legalName}`,
    numberOfItems: projects.length,
    itemListElement: projects.map((project, index) => {
      const imageUrl = getProjectImageUrl(project);
      const liveUrl = project.appUrl && isExternalProjectUrl(project.appUrl) ? project.appUrl : undefined;

      return {
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: project.title,
          description: project.description,
          genre: project.tag,
          keywords: project.stack.join(", "),
          ...(imageUrl.startsWith("/") ? { image: absoluteUrl(imageUrl) } : {}),
          ...(liveUrl ? { url: liveUrl } : {}),
          creator: { "@id": `${SITE.url}/#organization` },
        },
      };
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
