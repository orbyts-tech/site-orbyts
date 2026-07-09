import { Button } from "@/components/ui/Button";
import buttonStyles from "@/components/ui/Button.module.css";
import { FadeUp } from "@/components/ui/FadeUp";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { HERO_STATS } from "@/lib/constants/content";
import styles from "./HeroSection.module.css";

const TITLE_LINES = ["Software que", "entrega", "no prazo.", "Sempre."] as const;

export function HeroSection() {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.decorative} aria-hidden="true">
        <div className={styles.decorativeRing} />
        <div className={styles.decorativeOrb} />
        <div className={styles.decorativeOrbSecondary} />
      </div>

      <div className={styles.inner}>
        <div className={styles.mainGrid}>
          <div className={styles.headlineCol}>
            <FadeUp>
              <div className={styles.eyebrow}>
                <div className={styles.eyebrowDot} aria-hidden="true" />
                Disponível para novos projetos
              </div>
            </FadeUp>

            <FadeUp delay={0.08} className={styles.titleWrap}>
              <h1 id="hero-heading" className={styles.title}>
                {TITLE_LINES.map((line) => (
                  <span key={line} className={styles.titleLine}>
                    {line === "no prazo." ? (
                      <span className={styles.accent}>no prazo.</span>
                    ) : (
                      line
                    )}
                  </span>
                ))}
              </h1>
            </FadeUp>
          </div>

          <FadeUp delay={0.16} className={styles.aside}>
            <h2 className={styles.asideTitle}>Engenharia previsível</h2>
            <p className={styles.subtitle}>
              Construímos sistemas web e apps mobile com arquitetura escalável, código limpo e
              cronograma blindado. Sem surpresas no meio do caminho.
            </p>
            <div className={styles.actions}>
              <Button href="#projetos" className={buttonStyles.fullWidth}>
                Explorar Projetos
                <ArrowRightIcon />
              </Button>
              <Button href="#processo" variant="ghost" className={buttonStyles.fullWidth}>
                Como trabalhamos
              </Button>
            </div>
          </FadeUp>
        </div>

        <FadeUp delay={0.24}>
          <div className={styles.stats} role="list" aria-label="Métricas da ORBYTS">
            {HERO_STATS.map((stat, index) => (
              <div
                key={stat.label}
                className={`${styles.statCard} ${index === 1 ? styles.statCardSolid : ""}`}
                role="listitem"
              >
                <div className={styles.statNum} aria-hidden="true">
                  <span>{stat.highlightPrefix}</span>
                  {stat.highlightSuffix}
                </div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
