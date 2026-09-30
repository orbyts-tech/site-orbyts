import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ModelPageView } from "@/components/marketing/ModelPageView";
import { createPageMetadata } from "@/lib/seo/metadata";
import { getModelPage, MODEL_PAGES } from "@/lib/seo/model-pages";

interface ModelPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return MODEL_PAGES.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: ModelPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getModelPage(slug);

  if (!page) return { title: "Modelo não encontrado" };

  return createPageMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: `/modelos/${page.slug}`,
  });
}

export default async function ModelPage({ params }: ModelPageProps) {
  const { slug } = await params;
  const page = getModelPage(slug);

  if (!page) notFound();

  return <ModelPageView page={page} />;
}
