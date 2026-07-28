import Image from "next/image";
import { FadeUp } from "@/components/ui/FadeUp";
import { HERO_STATS } from "@/lib/constants/content";
import styles from "./HeroSection.module.css";

export function HeroSection() {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.background} aria-hidden="true">
        <Image
          src="/hero-team-bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className={styles.backgroundImage}
        />
        <div className={styles.backgroundOverlay} />
      </div>

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
                <span className={styles.titleLead}>Software que entrega</span>
                <span className={styles.titleFocus}>
                  <span className={styles.accent}>no prazo.</span>
                  <span className={styles.titleCloser}> Sempre.</span>
                </span>
              </h1>
            </FadeUp>
          </div>
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
