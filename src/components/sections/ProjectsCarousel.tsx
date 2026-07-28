"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Project } from "@/lib/constants/projects";
import {
  canEmbedProject,
  getProjectImageUrl,
  isExternalProjectUrl,
  resolveProjectAppUrl,
} from "@/lib/constants/projects";
import { FadeUp } from "@/components/ui/FadeUp";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/Icons";
import sectionStyles from "./ProjectsSection.module.css";
import styles from "./ProjectsCarousel.module.css";

interface ProjectsCarouselProps {
  projects: Project[];
}

function ProjectPreview({
  project,
  allowLiveEmbed,
}: {
  project: Project;
  allowLiveEmbed: boolean;
}) {
  const isPhone = project.mockup === "iphone";
  const { url } = resolveProjectAppUrl(project);
  const liveUrl =
    allowLiveEmbed && !isPhone && canEmbedProject(project) && isExternalProjectUrl(url)
      ? url
      : undefined;
  const imageSrc = getProjectImageUrl(project);
  const isRemoteImage = imageSrc.startsWith("http");
  const imageSizes = isPhone
    ? "(max-width: 767px) 70vw, 420px"
    : "(max-width: 767px) 100vw, 70vw";

  const previewImage = (
    <Image
      src={imageSrc}
      alt={project.imageAlt}
      fill
      sizes={imageSizes}
      className={styles.projectImage}
      unoptimized={isRemoteImage}
      quality={90}
    />
  );

  if (project.hasDeviceFrame) {
    return (
      <div
        className={`${styles.deviceFrame} ${isPhone ? "" : styles.deviceFrameWide}`}
      >
        <Image
          src={imageSrc}
          alt={project.imageAlt}
          fill
          sizes={
            isPhone
              ? "(max-width: 767px) 70vw, 380px"
              : "(max-width: 767px) 100vw, 75vw"
          }
          className={styles.deviceFrameImage}
          quality={100}
          unoptimized
          priority={
            project.id === "forma" ||
            project.id === "b6pay" ||
            project.id === "thora-orcamentos" ||
            project.id === "rastrek"
          }
        />
      </div>
    );
  }

  if (!isPhone) {
    return (
      <div className={styles.imageContainer}>
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
            previewImage
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.imageContainer} ${styles.imageContainerPhone}`}>
      <div className={styles.phoneNotch} />
      <div className={styles.phoneContent}>{previewImage}</div>
    </div>
  );
}

export function ProjectsCarousel({ projects }: ProjectsCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  const activeProject = projects[activeIndex];
  const isPhone = activeProject.mockup === "iphone";

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "120px 0px", threshold: 0.15 },
    );

    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

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
        <div className={styles.stage} ref={stageRef}>
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
                  isPhone ? styles.mockupColPhone : styles.mockupColDesktop
                }`}
              >
                <div className={styles.mockupWrap}>
                  <div
                    key={activeProject.id}
                    className={`${styles.slide} ${styles.slideActive} ${
                      isPhone ? styles.slidePhone : ""
                    }`}
                  >
                    <ProjectPreview
                      project={activeProject}
                      allowLiveEmbed={isInView}
                    />
                  </div>
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
