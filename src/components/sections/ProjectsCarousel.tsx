"use client";

import { useCallback, useState } from "react";
import type { Project } from "@/lib/constants/projects";
import { getProjectAppUrl, isExternalProjectUrl, opensProjectExternally, getProjectImageUrl, canEmbedProject, resolveProjectAppUrl } from "@/lib/constants/projects";
import { FadeUp } from "@/components/ui/FadeUp";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/Icons";
import sectionStyles from "./ProjectsSection.module.css";
import styles from "./ProjectsCarousel.module.css";

interface ProjectsCarouselProps {
  projects: Project[];
}

export function ProjectsCarousel({ projects }: ProjectsCarouselProps) {
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
          <div className={styles.carousel}>
            <button
              type="button"
              className={`${styles.navButton} ${styles.navPrev}`}
              onClick={goPrev}
              disabled={activeIndex === 0}
              aria-label="Projeto anterior"
            >
              <ChevronLeftIcon />
            </button>

            <div className={styles.layout}>
              <div
                className={`${styles.mockupCol} ${
                  activeProject.mockup === "iphone" ? styles.mockupColPhone : ""
                }`}
              >
                <div className={styles.mockupWrap}>
                  {projects.map((project, index) => {
                    const isActive = index === activeIndex;
                    const { url } = resolveProjectAppUrl(project);
                    const isPhone = project.mockup === "iphone";
                    const liveUrl = !isPhone && canEmbedProject(project) && isActive && isExternalProjectUrl(url) ? url : undefined;

                    return (
                      <div
                        key={project.id}
                        className={`${styles.slide} ${isActive ? styles.slideActive : ""} ${isPhone ? styles.slidePhone : ""}`}
                        aria-hidden={!isActive}
                      >
                        <div className={`${styles.imageContainer} ${isPhone ? styles.imageContainerPhone : ""}`}>
                          {!isPhone ? (
                            <>
                              <div className={styles.browserHeader}>
                                <span className={`${styles.browserDot} ${styles.dotRed}`} />
                                <span className={`${styles.browserDot} ${styles.dotYellow}`} />
                                <span className={`${styles.browserDot} ${styles.dotGreen}`} />
                              </div>
                              <div className={styles.browserContent}>
                                {liveUrl ? (
                                  <iframe
                                    src={liveUrl}
                                    title={`${project.title} preview`}
                                    className={styles.projectIframe}
                                    loading="lazy"
                                  />
                                ) : (
                                  /* eslint-disable-next-line @next/next/no-img-element */
                                  <img 
                                    src={getProjectImageUrl(project)} 
                                    alt={project.imageAlt} 
                                    className={styles.projectImage} 
                                  />
                                )}
                              </div>
                            </>
                          ) : (
                            <>
                              <div className={styles.phoneNotch} />
                              <div className={styles.phoneContent}>
                                {liveUrl ? (
                                  <iframe
                                    src={liveUrl}
                                    title={`${project.title} preview`}
                                    className={styles.projectIframe}
                                    loading="lazy"
                                  />
                                ) : (
                                  /* eslint-disable-next-line @next/next/no-img-element */
                                  <img 
                                    src={getProjectImageUrl(project)} 
                                    alt={project.imageAlt} 
                                    className={styles.projectImage} 
                                  />
                                )}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
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
                </div>
              </div>
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

          <div className={styles.dotsContainer}>
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
          </div>
        </div>
      </FadeUp>
    </>
  );
}
