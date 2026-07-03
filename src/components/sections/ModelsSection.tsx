import { FadeUp } from "@/components/ui/FadeUp";
import { CheckCircleIcon, CheckIcon } from "@/components/ui/Icons";
import { OpenProposalButton } from "@/components/proposal/OpenProposalButton";
import buttonStyles from "@/components/ui/Button.module.css";
import { COMMERCIAL_MODELS } from "@/lib/constants/content";
import styles from "./ModelsSection.module.css";

export function ModelsSection() {
  return (
    <section id="modelos" className={styles.section} aria-labelledby="models-heading">
      <FadeUp>
        <h2 id="models-heading" className={styles.title}>
          Como Estruturamos Parcerias.
        </h2>
        <p className={styles.subtitle}>
          Dois caminhos, sem letras miúdas. Transparência financeira total.
        </p>
      </FadeUp>

      <FadeUp className={styles.grid} delay={0.1}>
        {COMMERCIAL_MODELS.map((model) => (
          <article
            key={model.id}
            className={`${styles.card} ${model.featured ? styles.featured : ""}`}
          >
            <h3 className={styles.name}>{model.name}</h3>
            <p className={styles.desc}>{model.description}</p>
            <ul className={styles.features}>
              {model.features.map((feature) => (
                <li key={feature.text} className={styles.feature}>
                  {feature.variant === "check-circle" ? (
                    <CheckCircleIcon />
                  ) : (
                    <CheckIcon />
                  )}
                  {feature.text}
                </li>
              ))}
            </ul>
            {model.featured ? (
              <OpenProposalButton className={buttonStyles.fullWidth}>
                {model.ctaLabel}
              </OpenProposalButton>
            ) : (
              <OpenProposalButton variant="ghost" className={buttonStyles.fullWidth}>
                {model.ctaLabel}
              </OpenProposalButton>
            )}
          </article>
        ))}
      </FadeUp>
    </section>
  );
}
