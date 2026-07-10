"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Project, ProjectAppUrlSource } from "@/lib/constants/projects";
import { canEmbedProject, isExternalProjectUrl, isKnownEmbeddableUrl } from "@/lib/constants/projects";
import styles from "./ProjectLiveShell.module.css";

interface ProjectLiveShellProps {
  project: Project;
  appUrl: string;
  urlSource: ProjectAppUrlSource;
}

type EmbedState = "checking" | "loading" | "ready" | "blocked";

const SOURCE_LABELS: Record<ProjectAppUrlSource, string | null> = {
  env: null,
  project: null,
  preview: "Preview externo · troque por sua URL",
  demo: "Demo interna ORBYTS",
};

export function ProjectLiveShell({ project, appUrl, urlSource }: ProjectLiveShellProps) {
  const router = useRouter();
  const isPhoneMockup = project.mockup === "iphone";
  const [embedState, setEmbedState] = useState<EmbedState>(() => {
    if (!canEmbedProject(project)) return "blocked";
    if (!isExternalProjectUrl(appUrl)) return "loading";
    if (isKnownEmbeddableUrl(appUrl)) return "loading";
    return "checking";
  });
  const [blockReason, setBlockReason] = useState<string | null>(null);

  const sourceLabel = SOURCE_LABELS[urlSource];

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    if (!isExternalProjectUrl(appUrl) || isKnownEmbeddableUrl(appUrl)) return;

    let cancelled = false;

    const checkEmbed = async () => {
      try {
        const response = await fetch(`/api/embed-check?url=${encodeURIComponent(appUrl)}`);
        const data = (await response.json()) as { embeddable?: boolean; reason?: string };

        if (cancelled) return;

        if (data.embeddable === false) {
          setBlockReason(
            data.reason ??
              "Este sistema não permite ser exibido dentro de outro site por políticas de segurança.",
          );
          setEmbedState("blocked");
          return;
        }

        setEmbedState("loading");
      } catch {
        if (!cancelled) setEmbedState("loading");
      }
    };

    void checkEmbed();

    return () => {
      cancelled = true;
    };
  }, [appUrl]);

  useEffect(() => {
    if (embedState !== "loading") return;

    const timeout = window.setTimeout(() => {
      setBlockReason(
        "O sistema demorou para responder ou bloqueou o iframe. Abra em nova aba para continuar.",
      );
      setEmbedState("blocked");
    }, 20000);

    return () => window.clearTimeout(timeout);
  }, [embedState]);

  const handleBack = () => {
    router.push("/#projetos");
  };

  const showIframe = embedState === "loading" || embedState === "ready";
  const showSpinner = embedState === "checking" || embedState === "loading";

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.headerStart}>
          <button type="button" className={styles.backButton} onClick={handleBack}>
            ← Voltar
          </button>
          <div className={styles.meta}>
            <p className={styles.eyebrow}>{project.tag}</p>
            <h1 className={styles.title}>{project.title}</h1>
            {sourceLabel ? <p className={styles.sourceBadge}>{sourceLabel}</p> : null}
          </div>
        </div>
        <div className={styles.headerActions}>
          {isExternalProjectUrl(appUrl) ? (
            <a
              href={appUrl}
              className={styles.externalLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Abrir em nova aba
            </a>
          ) : null}
        </div>
      </header>

      <div className={`${styles.frameWrap} ${isPhoneMockup ? styles.frameWrapPhone : ""}`}>
        {showSpinner ? (
          <div className={styles.loading} aria-live="polite">
            <div className={styles.spinner} aria-hidden="true" />
            <span>
              {embedState === "checking"
                ? "Verificando compatibilidade..."
                : `Carregando ${project.title}...`}
            </span>
          </div>
        ) : null}

        {embedState === "blocked" ? (
          <div className={styles.blocked} role="alert">
            <h2 className={styles.blockedTitle}>Não é possível embutir este sistema aqui</h2>
            <p className={styles.blockedText}>
              {blockReason ??
                "Sites como Google, bancos e a maioria dos SaaS bloqueiam iframe com X-Frame-Options ou CSP por segurança."}
            </p>
            <p className={styles.blockedHint}>
              Para funcionar dentro da ORBYTS, o sistema precisa permitir iframe no domínio{" "}
              <strong>orbyts.com.br</strong> (header{" "}
              <code>Content-Security-Policy: frame-ancestors</code> ou remover{" "}
              <code>X-Frame-Options</code>).
            </p>
            <div className={styles.blockedActions}>
              {isExternalProjectUrl(appUrl) ? (
                <a
                  href={appUrl}
                  className={styles.primaryAction}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Abrir sistema em nova aba
                </a>
              ) : null}
              <button type="button" className={styles.secondaryAction} onClick={handleBack}>
                Voltar aos projetos
              </button>
            </div>
          </div>
        ) : null}

        {showIframe ? (
          <div className={`${styles.browserWindow} ${isPhoneMockup ? styles.phoneWindow : ""}`}>
            <iframe
              src={appUrl}
              title={`${project.title} — sistema ao vivo`}
              className={styles.frame}
              onLoad={() => setEmbedState("ready")}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; geolocation; gyroscope; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
