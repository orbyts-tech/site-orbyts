"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import type { Project } from "@/lib/constants/projects";
import { getProjectImageUrl } from "@/lib/constants/projects";
import { MacbookFrame } from "@/components/ui/MacbookFrame";
import { FadeUp } from "@/components/ui/FadeUp";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/Icons";
import sectionStyles from "./ProjectsSection.module.css";
import styles from "./ProjectsMacbookCarousel.module.css";

interface ProjectsMacbookCarouselProps {
  projects: Project[];
}

export function ProjectsMacbookCarousel({ projects }: ProjectsMacbookCarouselProps) {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);

  const activeProject = projects[activeIndex];

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex(Math.min(Math.max(index, 0), projects.length - 1));
    },
    [projects.length],
  );

  const goPrev = () => goTo(activeIndex - 1);
  const goNext = () => goTo(activeIndex + 1);

  const openProject = (project: Project) => {
    router.push(`/projetos/${project.id}`);
  };

  return (
    <>
      <FadeUp className={sectionStyles.header}>
        <div className={sectionStyles.headerText}>
          <h2 id="projects-heading" className={sectionStyles.title}>
            Projetos Entregues.
          </h2>
          <p className={sectionStyles.subtitle}>
            Projeto iniciado, prazo garantido, cliente no controle.
          </p>
        </div>
      </FadeUp>

      <FadeUp delay={0.1}>
        <div className={styles.stage}>
          <div className={styles.layout}>
            <div className={styles.mockupCol}>
              <div className={styles.mockupWrap}>
                {projects.map((project, index) => (
                  <div
                    key={project.id}
                    className={`${styles.slide} ${index === activeIndex ? styles.slideActive : ""}`}
                    aria-hidden={index !== activeIndex}
                  >
                    <MacbookFrame
                      imageSrc={getProjectImageUrl(project)}
                      imageAlt={project.imageAlt}
                      title={project.title}
                      isActive
                      showHint={false}
                      interactive={false}
                    />
                  </div>
                ))}
              </div>

              <button
                type="button"
                className={`${styles.navButton} ${styles.navPrev}`}
                onClick={goPrev}
                disabled={activeIndex === 0}
                aria-label="Projeto anterior"
              >
                <ChevronLeftIcon />
              </button>
            </div>

            <div className={styles.detailsCol}>
              <div className={styles.meta} key={activeProject.id}>
                <div className={styles.metaTag}>
                  <span className={styles.tagDot} aria-hidden="true" />
                  {activeProject.tag}
                </div>
                <h3 className={styles.metaTitle}>{activeProject.title}</h3>
                <p className={styles.metaDesc}>{activeProject.description}</p>
                <div className={styles.stack}>
                  {activeProject.stack.map((item) => (
                    <span key={item} className={styles.stackItem}>
                      {item}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  className={styles.enterButton}
                  onClick={() => openProject(activeProject)}
                >
                  Entrar no sistema
                </button>
              </div>

              <div className={styles.dots} role="tablist" aria-label="Projetos">
                {projects.map((project, index) => (
                  <button
                    key={project.id}
                    type="button"
                    role="tab"
                    className={`${styles.dot} ${index === activeIndex ? styles.dotActive : ""}`}
                    aria-selected={index === activeIndex}
                    aria-label={`Ver ${project.title}`}
                    onClick={() => goTo(index)}
                  />
                ))}
              </div>

              <button
                type="button"
                className={`${styles.navButton} ${styles.navNext}`}
                onClick={goNext}
                disabled={activeIndex === projects.length - 1}
                aria-label="Próximo projeto"
              >
                <ChevronRightIcon />
              </button>
            </div>
          </div>
        </div>
      </FadeUp>
    </>
  );
}
