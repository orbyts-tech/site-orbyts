import { notFound } from "next/navigation";
import { ServicePageView } from "@/components/marketing/ServicePageView";
import { createPageMetadata } from "@/lib/seo/metadata";
import { getServicePage } from "@/lib/seo/service-pages";

const SLUG = "desenvolvimento-aplicativos";
const page = getServicePage(SLUG);

export const metadata = createPageMetadata({
  title: page?.title,
  description: page?.description,
  path: `/${SLUG}`,
});

export default function DesenvolvimentoAplicativosPage() {
  if (!page) notFound();
  return <ServicePageView page={page} />;
}
