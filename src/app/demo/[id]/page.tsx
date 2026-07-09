import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDemoApp } from "@/components/projects/ProjectDemoApp";
import { getProjectById, PROJECTS } from "@/lib/constants/projects";
import { createPageMetadata } from "@/lib/seo/metadata";

interface DemoPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({ id: project.id }));
}

export async function generateMetadata({ params }: DemoPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = getProjectById(id);
  if (!project) return { title: "Demo" };

  return createPageMetadata({
    title: `${project.title} — Demo`,
    description: project.description,
    path: `/demo/${project.id}`,
    noIndex: true,
  });
}

export default async function ProjectDemoPage({ params }: DemoPageProps) {
  const { id } = await params;
  const project = getProjectById(id);
  if (!project) notFound();

  return <ProjectDemoApp project={project} />;
}
