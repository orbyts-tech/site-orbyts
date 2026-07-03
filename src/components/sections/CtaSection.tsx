import { FadeUp } from "@/components/ui/FadeUp";
import { CtaSectionActions } from "./CtaSectionActions";
import styles from "./CtaSection.module.css";

export function CtaSection() {
  return (
    <FadeUp>
      <section id="contato" className={styles.section} aria-labelledby="cta-heading">
        <h2 id="cta-heading" className={styles.title}>
          O seu próximo projeto, <br />
          <span className={styles.accent}>entregue no prazo.</span>
        </h2>
        <p className={styles.subtitle}>
          Deixe-nos entender seu desafio. Em 24h retornamos com uma avaliação técnica e estimativa
          financeira.
        </p>
        <CtaSectionActions />
      </section>
    </FadeUp>
  );
}
