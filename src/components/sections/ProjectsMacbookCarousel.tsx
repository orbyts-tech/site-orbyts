"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Project } from "@/lib/constants/projects";
import { getProjectImageUrl } from "@/lib/constants/projects";
import { MacbookFrame } from "@/components/ui/MacbookFrame";
import { FadeUp } from "@/components/ui/FadeUp";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/Icons";
import buttonStyles from "@/components/ui/Button.module.css";
import sectionStyles from "./ProjectsSection.module.css";
import styles from "./ProjectsMacbookCarousel.module.css";

interface ProjectsMacbookCarouselProps {
  projects: Project[];
}

export function ProjectsMacbookCarousel({ projects }: ProjectsMacbookCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [enteredProject, setEnteredProject] = useState<Project | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

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
    setEnteredProject(project);
  };

  const closeProject = () => setEnteredProject(null);

  useEffect(() => {
    if (!enteredProject) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeProject();
    };

    window.addEventListener("keydown", handleKeyDown);
    overlayRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [enteredProject]);

  return (
    <>
      <FadeUp className={sectionStyles.header}>
        <div className={sectionStyles.headerText}>
          <h2 id="projects-heading" className={sectionStyles.title}>
            Obras Entregues.
          </h2>
          <p className={sectionStyles.subtitle}>
            Escopo fechado, prazo garantido, cliente no controle.
          </p>
        </div>
        <div className={sectionStyles.controls}>
          <button
            type="button"
            className={`${buttonStyles.ghost} ${buttonStyles.icon}`}
            onClick={goPrev}
            disabled={activeIndex === 0}
            aria-label="Projeto anterior"
          >
            <ChevronLeftIcon />
          </button>
          <button
            type="button"
            className={`${buttonStyles.ghost} ${buttonStyles.icon}`}
            onClick={goNext}
            disabled={activeIndex === projects.length - 1}
            aria-label="Próximo projeto"
          >
            <ChevronRightIcon />
          </button>
        </div>
      </FadeUp>

      <FadeUp delay={0.1}>
        <div className={styles.stage}>
          <div className={styles.track}>
            {projects.map((project, index) => {
              const offset = index - activeIndex;
              return (
                <div
                  key={project.id}
                  className={styles.slide}
                  style={{
                    transform: `translateX(calc(-50% + ${offset * 108}%)) scale(${index === activeIndex ? 1 : 0.82})`,
                    zIndex: index === activeIndex ? 3 : 1,
                    opacity: Math.abs(offset) > 1 ? 0 : index === activeIndex ? 1 : 0.4,
                    pointerEvents: Math.abs(offset) > 1 ? "none" : "auto",
                  }}
                  aria-hidden={index !== activeIndex}
                >
                  <MacbookFrame
                    imageSrc={getProjectImageUrl(project)}
                    imageAlt={project.imageAlt}
                    title={project.title}
                    isActive={index === activeIndex}
                    onClick={() => {
                      if (index !== activeIndex) {
                        goTo(index);
                        return;
                      }
                      openProject(project);
                    }}
                  />
                </div>
              );
            })}
          </div>

          <div className={styles.meta}>
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
              Entrar no projeto
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
        </div>
      </FadeUp>

      {enteredProject ? (
        <div
          className={styles.overlay}
          role="presentation"
          onClick={closeProject}
        >
          <div
            ref={overlayRef}
            className={styles.entryPanel}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-entry-title"
            tabIndex={-1}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className={styles.backButton}
              onClick={closeProject}
              aria-label="Voltar ao carrossel"
            >
              ← Voltar
            </button>

            <div className={styles.entryMacbook}>
              <MacbookFrame
                imageSrc={getProjectImageUrl(enteredProject)}
                imageAlt={enteredProject.imageAlt}
                title={enteredProject.title}
                isActive
                showHint={false}
                size="large"
                interactive={false}
              />
            </div>

            <div className={styles.entryContent}>
              <p className={styles.entryEyebrow}>
                {String(enteredProject.index).padStart(2, "0")} /{" "}
                {String(enteredProject.total).padStart(2, "0")} · {enteredProject.tag}
              </p>
              <h3 id="project-entry-title" className={styles.entryTitle}>
                {enteredProject.title}
              </h3>
              <p className={styles.entryDesc}>{enteredProject.description}</p>
              <div className={styles.entryStack}>
                {enteredProject.stack.map((item) => (
                  <span key={item} className={styles.stackItem}>
                    {item}
                  </span>
                ))}
              </div>
              {enteredProject.href ? (
                <a
                  href={enteredProject.href}
                  className={styles.entryCta}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Acessar projeto ao vivo
                </a>
              ) : (
                <p className={styles.entryNote}>
                  Case em produção — solicite uma demo com nossa equipe comercial.
                </p>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
