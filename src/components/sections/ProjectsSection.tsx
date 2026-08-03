import dynamic from "next/dynamic";
import { PROJECTS } from "@/lib/constants/projects";
import styles from "./ProjectsSection.module.css";

const ProjectsCarousel = dynamic(
  () => import("./ProjectsCarousel").then((mod) => mod.ProjectsCarousel),
  {
    loading: () => (
      <div className={styles.section} aria-busy="true">
        <h2 id="projects-heading" className={styles.title}>
          Projetos Entregues.
        </h2>
        <p className={styles.subtitle}>Carregando portfólio…</p>
      </div>
    ),
  },
);

export function ProjectsSection() {
  return (
    <section id="projetos" className={styles.section} aria-labelledby="projects-heading">
      <ProjectsCarousel projects={PROJECTS} />
    </section>
  );
}
