import { PROJECTS } from "@/lib/constants/projects";
import { ProjectsMacbookCarousel } from "./ProjectsMacbookCarousel";
import styles from "./ProjectsSection.module.css";

export function ProjectsSection() {
  return (
    <section id="projetos" className={styles.section} aria-labelledby="projects-heading">
      <ProjectsMacbookCarousel projects={PROJECTS} />
    </section>
  );
}
