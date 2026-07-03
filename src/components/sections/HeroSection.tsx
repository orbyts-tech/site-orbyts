import { Button } from "@/components/ui/Button";
import buttonStyles from "@/components/ui/Button.module.css";
import { FadeUp } from "@/components/ui/FadeUp";import { ArrowRightIcon } from "@/components/ui/Icons";
import { HERO_STATS } from "@/lib/constants/content";
import styles from "./HeroSection.module.css";

export function HeroSection() {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.content}>
        <FadeUp>
          <div className={styles.eyebrow}>
            <div className={styles.eyebrowDot} aria-hidden="true" />
            Disponível para novos projetos
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <h1 id="hero-heading" className={styles.title}>
            Software que entrega <br />
            <span className={styles.accent}>no prazo.</span> Sempre.
          </h1>
        </FadeUp>

        <FadeUp delay={0.2}>
          <p className={styles.subtitle}>
            Construímos sistemas web e apps mobile com arquitetura escalável, código limpo e
            cronograma blindado. Sem surpresas no meio do caminho.
          </p>
        </FadeUp>

        <FadeUp delay={0.3}>
          <div className={styles.actions}>
            <Button href="#projetos" className={buttonStyles.fullWidth}>
              Explorar Projetos
              <ArrowRightIcon />
            </Button>
            <Button href="#processo" variant="ghost" className={buttonStyles.fullWidth}>              Como trabalhamos
            </Button>
          </div>
        </FadeUp>

        <FadeUp delay={0.4}>
          <div className={styles.stats} role="list" aria-label="Métricas da ORBYTS">
            {HERO_STATS.map((stat) => (
              <div key={stat.label} className={styles.stat} role="listitem">
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
