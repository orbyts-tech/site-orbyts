import Link from "next/link";
import { FadeUp } from "@/components/ui/FadeUp";
import { staggerIndex } from "@/lib/motion";
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
          Três caminhos, sem letras miúdas. Transparência financeira total.
        </p>
      </FadeUp>

      <FadeUp
        className={styles.grid}
        delay={0.1}
        variant="scale"
        stagger
        staggerCount={COMMERCIAL_MODELS.length}
      >
        {COMMERCIAL_MODELS.map((model, index) => (
          <article
            key={model.id}
            className={`${styles.card} ${model.featured ? styles.featured : ""} reveal-item`}
            style={staggerIndex(index)}
            data-spotlight={model.featured ? "light" : ""}
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
              <OpenProposalButton className={`${buttonStyles.fullWidth} ${styles.featuredCta}`}>
                {model.ctaLabel}
              </OpenProposalButton>
            ) : (
              <OpenProposalButton variant="ghost" className={buttonStyles.fullWidth}>
                {model.ctaLabel}
              </OpenProposalButton>
            )}
            <Link href={`/modelos/${model.slug}`} className={`${styles.learnMore} animated-underline`}>
              Saiba mais sobre {model.name}
              <span aria-hidden="true"> →</span>
            </Link>
          </article>
        ))}
      </FadeUp>
    </section>
  );
}
