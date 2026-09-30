import { FadeUp } from "@/components/ui/FadeUp";
import { ABOUT_FACTS, ABOUT_PARAGRAPHS } from "@/lib/constants/content";
import styles from "./AboutSection.module.css";

export function AboutSection() {
  return (
    <section id="sobre" className={styles.section} aria-labelledby="about-heading">
      <FadeUp className={styles.layout}>
        <div className={styles.text}>
          <h2 id="about-heading" className={styles.title}>
            Sobre a ORBYTS
          </h2>
          {ABOUT_PARAGRAPHS.map((paragraph) => (
            <p key={paragraph} className={styles.paragraph}>
              {paragraph}
            </p>
          ))}
        </div>

        <dl className={styles.facts}>
          {ABOUT_FACTS.map((fact) => (
            <div key={fact.label} className={styles.fact}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </FadeUp>
    </section>
  );
}
