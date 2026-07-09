import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectLiveShell } from "@/components/projects/ProjectLiveShell";
import {
  getProjectById,
  PROJECTS,
  resolveProjectAppUrl,
} from "@/lib/constants/projects";
import { createPageMetadata } from "@/lib/seo/metadata";

interface ProjectLivePageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({ id: project.id }));
}

export const dynamicParams = true;

export async function generateMetadata({ params }: ProjectLivePageProps): Promise<Metadata> {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    return { title: "Projeto não encontrado" };
  }

  return createPageMetadata({
    title: `${project.title} — Demo ao vivo`,
    description: project.description,
    path: `/projetos/${project.id}`,
    noIndex: true,
  });
}

export default async function ProjectLivePage({ params }: ProjectLivePageProps) {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) notFound();

  const { url, source } = resolveProjectAppUrl(project);

  return <ProjectLiveShell project={project} appUrl={url} urlSource={source} />;
}
