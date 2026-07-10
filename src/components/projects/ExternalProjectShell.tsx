"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Project } from "@/lib/constants/projects";
import styles from "./ProjectLiveShell.module.css";

interface ExternalProjectShellProps {
  project: Project;
  appUrl: string;
}

export function ExternalProjectShell({ project, appUrl }: ExternalProjectShellProps) {
  const router = useRouter();

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const handleBack = () => {
    router.push("/#projetos");
  };

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
          </div>
        </div>
      </header>

      <div className={styles.blocked}>
        <h2 className={styles.blockedTitle}>Este projeto abre em nova aba</h2>
        <p className={styles.blockedText}>
          O site de {project.title} bloqueia exibição em iframe por segurança. Para testar de
          verdade, abra o sistema completo em uma nova aba.
        </p>
        <div className={styles.blockedActions}>
          <a
            href={appUrl}
            className={styles.primaryAction}
            target="_blank"
            rel="noopener noreferrer"
          >
            Testar {project.title} ↗
          </a>
          <button type="button" className={styles.secondaryAction} onClick={handleBack}>
            Voltar aos projetos
          </button>
        </div>
      </div>
    </div>
  );
}
