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
import {
  DESKTOP_VIEWPORT_HEIGHT,
  DESKTOP_VIEWPORT_WIDTH,
  LiveIframeViewport,
  MOBILE_VIEWPORT_HEIGHT,
  MOBILE_VIEWPORT_WIDTH,
} from "@/components/ui/LiveIframeViewport";
import { FadeUp } from "@/components/ui/FadeUp";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/Icons";
import sectionStyles from "./ProjectsSection.module.css";
import styles from "./ProjectsCarousel.module.css";

interface ProjectsCarouselProps {
  projects: Project[];
}

type ViewportMode = "mobile" | "desktop";

function useCarouselViewport(): ViewportMode | null {
  const [mode, setMode] = useState<ViewportMode | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const sync = () => setMode(mediaQuery.matches ? "mobile" : "desktop");
    sync();
    mediaQuery.addEventListener("change", sync);
    return () => mediaQuery.removeEventListener("change", sync);
  }, []);

  return mode;
}

function hasLiveEmbedUrl(project: Project): boolean {
  if (project.hasDeviceFrame) return false;
  if (!canEmbedProject(project)) return false;
  const { url } = resolveProjectAppUrl(project);
  return isExternalProjectUrl(url);
}

function ProjectPreview({
  project,
  allowLiveEmbed,
  viewportMode,
}: {
  project: Project;
  allowLiveEmbed: boolean;
  viewportMode: ViewportMode | null;
}) {
  const isPhone = project.mockup === "iphone";
  const { url } = resolveProjectAppUrl(project);
  const canShowLive = allowLiveEmbed && hasLiveEmbedUrl(project) && viewportMode !== null;
  const imageSrc = getProjectImageUrl(project);
  const isRemoteImage = imageSrc.startsWith("http");
  const imageSizes = isPhone
    ? "(max-width: 767px) 70vw, 420px"
    : "(max-width: 767px) 100vw, 70vw";

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
          quality={80}
          loading="lazy"
        />
      </div>
    );
  }

  if (canShowLive && viewportMode === "mobile") {
    return (
      <div className={styles.mobileLiveFrame}>
        <div className={styles.mobileLiveNotch} aria-hidden="true" />
        <div className={styles.mobileLiveScreen}>
          <LiveIframeViewport
            src={url}
            title={`${project.title} — preview mobile`}
            viewportWidth={MOBILE_VIEWPORT_WIDTH}
            viewportHeight={MOBILE_VIEWPORT_HEIGHT}
          />
        </div>
        <div className={styles.mobileLiveHome} aria-hidden="true" />
      </div>
    );
  }

  if (canShowLive && viewportMode === "desktop") {
    return (
      <div className={styles.imageContainer}>
        <div className={styles.browserHeader}>
          <span className={`${styles.browserDot} ${styles.dotRed}`} />
          <span className={`${styles.browserDot} ${styles.dotYellow}`} />
          <span className={`${styles.browserDot} ${styles.dotGreen}`} />
          <span className={styles.browserUrl}>{new URL(url).hostname}</span>
        </div>
        <div className={styles.browserContent}>
          <LiveIframeViewport
            src={url}
            title={`${project.title} — preview`}
            viewportWidth={DESKTOP_VIEWPORT_WIDTH}
            viewportHeight={DESKTOP_VIEWPORT_HEIGHT}
          />
        </div>
      </div>
    );
  }

  if (isPhone) {
    return (
      <div className={`${styles.imageContainer} ${styles.imageContainerPhone}`}>
        <div className={styles.phoneNotch} />
        <div className={styles.phoneContent}>
          <Image
            src={imageSrc}
            alt={project.imageAlt}
            fill
            sizes={imageSizes}
            className={styles.projectImage}
            unoptimized={isRemoteImage}
            quality={75}
            loading="lazy"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.imageContainer}>
      <div className={styles.browserHeader}>
        <span className={`${styles.browserDot} ${styles.dotRed}`} />
        <span className={`${styles.browserDot} ${styles.dotYellow}`} />
        <span className={`${styles.browserDot} ${styles.dotGreen}`} />
      </div>
      <div className={styles.browserContent}>
        <Image
          src={imageSrc}
          alt={project.imageAlt}
          fill
          sizes={imageSizes}
          className={styles.projectImage}
          unoptimized={isRemoteImage}
          quality={75}
          loading="lazy"
        />
      </div>
    </div>
  );
}

export function ProjectsCarousel({ projects }: ProjectsCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const viewportMode = useCarouselViewport();

  const activeProject = projects[activeIndex];
  const isPhone = activeProject.mockup === "iphone";
  const liveUrl = resolveProjectAppUrl(activeProject).url;
  const showOpenLink = isExternalProjectUrl(liveUrl);
  const usePhoneLayout =
    isPhone || (viewportMode === "mobile" && hasLiveEmbedUrl(activeProject));

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
      { rootMargin: "120px 0px", threshold: 0.1 },
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
                  usePhoneLayout ? styles.mockupColPhone : styles.mockupColDesktop
                }`}
              >
                <div className={styles.mockupWrap}>
                  <div
                    key={`${activeProject.id}-${viewportMode ?? "pending"}`}
                    className={`${styles.slide} ${styles.slideActive} ${
                      usePhoneLayout ? styles.slidePhone : ""
                    }`}
                  >
                    <ProjectPreview
                      project={activeProject}
                      allowLiveEmbed={isInView}
                      viewportMode={viewportMode}
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

                  {showOpenLink ? (
                    <a
                      href={liveUrl}
                      className={styles.openLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Abrir projeto
                      <span aria-hidden="true">↗</span>
                    </a>
                  ) : null}
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

          <div className={styles.mobileControls}>
            <button
              type="button"
              className={styles.mobileNavButton}
              onClick={goPrev}
              disabled={activeIndex === 0}
              aria-label="Projeto anterior"
            >
              <ChevronLeftIcon />
            </button>
            <p className={styles.mobileCounter} aria-live="polite">
              <span>{String(activeIndex + 1).padStart(2, "0")}</span>
              <span className={styles.mobileCounterSep}>/</span>
              <span>{String(projects.length).padStart(2, "0")}</span>
            </p>
            <button
              type="button"
              className={styles.mobileNavButton}
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
