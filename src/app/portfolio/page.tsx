import { PortfolioView } from "@/components/marketing/PortfolioView";
import { COMPANY_FACTS } from "@/config/site";
import { PROJECTS } from "@/lib/constants/projects";
import { createPageMetadata } from "@/lib/seo/metadata";

const TITLE = "Portfólio: sistemas web, apps e SaaS entregues";
const DESCRIPTION = `Conheça projetos desenvolvidos pela ORBYTS, software house em Porto Alegre: sites, sistemas web, apps mobile e SaaS. +${COMPANY_FACTS.projectsDelivered} projetos, ${COMPANY_FACTS.onTimeDeliveryRate}% no prazo.`;

export const metadata = createPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/portfolio",
});

export default function PortfolioPage() {
  return <PortfolioView projects={PROJECTS} title={TITLE} description={DESCRIPTION} />;
}
