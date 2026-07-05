import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDemoApp } from "@/components/projects/ProjectDemoApp";
import { getProjectById, PROJECTS } from "@/lib/constants/projects";

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

  return {
    title: `${project.title} — Demo`,
    robots: { index: false, follow: false },
  };
}

export default async function ProjectDemoPage({ params }: DemoPageProps) {
  const { id } = await params;
  const project = getProjectById(id);
  if (!project) notFound();

  return <ProjectDemoApp project={project} />;
}
