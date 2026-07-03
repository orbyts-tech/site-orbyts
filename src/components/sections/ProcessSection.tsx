"use client";

import { useCallback, useState } from "react";
import { PROCESS_STEPS } from "@/lib/constants/process";
import { FadeUp } from "@/components/ui/FadeUp";
import styles from "./ProcessSection.module.css";

export function ProcessSection() {
  const [isAnimated, setIsAnimated] = useState(false);
  const handleVisible = useCallback(() => setIsAnimated(true), []);

  return (
    <div
      id="processo"
      className={styles.wrapper}
      aria-labelledby="process-heading"
    >
      <div className={styles.section}>
        <FadeUp className={styles.intro}>
          <h2 id="process-heading" className={styles.title}>
            Engenharia Previsível.
          </h2>
          <p className={styles.subtitle}>
            Do discovery ao deploy, sem adivinhação. Etapas rigorosas que garantem a entrega no
            dia acordado.
          </p>
        </FadeUp>

        <FadeUp
          id="tlOuter"
          className={styles.timeline}
          delay={0.1}
          onVisible={handleVisible}
        >
          <div className={styles.rail} aria-hidden="true">
            <div className={`${styles.railFill} ${isAnimated ? styles.animated : ""}`} />
          </div>

          <ol className={styles.steps}>
            {PROCESS_STEPS.map((step) => (
              <li
                key={step.phase}
                className={`${styles.step} ${styles[step.status]}`}
              >
                <div className={styles.node}>
                  <span className={styles.nodeNum}>{step.nodeLabel}</span>
                </div>
                <div className={styles.card}>
                  <div className={styles.tag}>{step.phase}</div>
                  <h3 className={styles.cardTitle}>{step.title}</h3>
                  <p className={styles.cardText}>{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </FadeUp>
      </div>
    </div>
  );
}
