import Image from "next/image";
import { CountUp } from "@/components/motion/CountUp";
import { ParallaxLayer } from "@/components/motion/ParallaxLayer";
import { OpenProposalButton } from "@/components/proposal/OpenProposalButton";
import { HERO_STATS } from "@/lib/constants/content";
import { enterDelay } from "@/lib/motion";
import styles from "./HeroSection.module.css";

type HeroStat = (typeof HERO_STATS)[number];

const STATS_ENTER_DELAY_MS = 520;

function renderStatPart(stat: HeroStat, part: HeroStat["countedPart"], text: string) {
  if (stat.countedPart !== part) return text;
  return <CountUp to={stat.countTo} startDelayMs={STATS_ENTER_DELAY_MS} />;
}

export function HeroSection() {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.background} aria-hidden="true">
        <ParallaxLayer className={styles.backgroundParallax}>
          <div className={styles.backgroundZoom}>
            <Image
              src="/hero-team-bg.webp"
              alt=""
              fill
              priority
              fetchPriority="high"
              sizes="100vw"
              className={styles.backgroundImage}
            />
          </div>
        </ParallaxLayer>
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
            <div className={`${styles.eyebrow} ${styles.enter}`} style={enterDelay(0)}>
              <div className={styles.eyebrowDot} aria-hidden="true" />
              Disponível para novos projetos
            </div>

            <div className={styles.titleWrap}>
              <h1 id="hero-heading" className={styles.title}>
                <span className={`${styles.titleLead} ${styles.enterLine}`} style={enterDelay(90)}>
                  Software que entrega
                </span>
                <span className={`${styles.titleFocus} ${styles.enterLine}`} style={enterDelay(190)}>
                  <span className={styles.accent}>no prazo.</span>
                  <span className={styles.titleCloser}> Sempre.</span>
                </span>
              </h1>
            </div>

            <p className={`${styles.subtitle} ${styles.enter}`} style={enterDelay(300)}>
              Sistemas web e apps com arquitetura sólida, cronograma blindado e entrega previsível.
            </p>

            <div className={`${styles.ctaGroup} ${styles.enter}`} style={enterDelay(400)}>
              <OpenProposalButton className={styles.ctaPrimary}>Solicitar proposta</OpenProposalButton>
              <a href="#projetos" className={styles.ctaSecondary}>
                Ver projetos
              </a>
            </div>
          </div>
        </div>

        <div className={styles.stats} role="list" aria-label="Métricas da ORBYTS">
          {HERO_STATS.map((stat, index) => (
            <div
              key={stat.label}
              className={`${styles.statCard} ${styles.enter} ${index === 1 ? styles.statCardSolid : ""}`}
              style={enterDelay(STATS_ENTER_DELAY_MS + index * 90)}
              role="listitem"
            >
              <span className="sr-only">{stat.value}</span>
              <div className={styles.statNum} aria-hidden="true">
                <span className={styles.statHighlight}>
                  {renderStatPart(stat, "prefix", stat.highlightPrefix)}
                </span>
                {renderStatPart(stat, "suffix", stat.highlightSuffix)}
              </div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
