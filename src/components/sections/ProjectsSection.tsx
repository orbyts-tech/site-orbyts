import { PROJECTS } from "@/lib/constants/projects";
import { ProjectsCarousel } from "./ProjectsCarousel";
import styles from "./ProjectsSection.module.css";

export function ProjectsSection() {
  return (
    <section id="projetos" className={styles.section} aria-labelledby="projects-heading">
      <ProjectsCarousel projects={PROJECTS} />
    </section>
  );
}
