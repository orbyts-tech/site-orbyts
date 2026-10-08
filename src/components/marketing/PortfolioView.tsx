import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/constants/projects";
import { getProjectImageUrl, isExternalProjectUrl } from "@/lib/constants/projects";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { OpenProposalButton } from "@/components/proposal/OpenProposalButton";
import { CtaSection } from "@/components/sections/CtaSection";
import { FadeUp } from "@/components/ui/FadeUp";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { PortfolioJsonLd } from "@/components/seo/PortfolioJsonLd";
import { WebPageJsonLd } from "@/components/seo/WebPageJsonLd";
import { COMPANY_FACTS, SITE } from "@/config/site";
import { enterDelay } from "@/lib/motion";
import serviceStyles from "./ServicePageView.module.css";
import styles from "./PortfolioView.module.css";

interface PortfolioViewProps {
  projects: Project[];
  title: string;
  description: string;
}

export function PortfolioView({ projects, title, description }: PortfolioViewProps) {
  return (
    <>
      <WebPageJsonLd path="/portfolio" title={title} description={description} />
      <PortfolioJsonLd projects={projects} />
      <BreadcrumbJsonLd
        items={[
          { name: "Início", path: "/" },
          { name: "Portfólio", path: "/portfolio" },
        ]}
      />
      <Navbar />
      <main id="conteudo-principal" className={serviceStyles.main}>
        <div className={styles.container}>
          <nav className={serviceStyles.breadcrumb} aria-label="Breadcrumb">
            <ol>
              <li>
                <Link href="/">Início</Link>
              </li>
              <li aria-current="page">Portfólio</li>
            </ol>
          </nav>

          <header className={styles.header}>
            <p className={`${serviceStyles.eyebrow} enter-up`}>{SITE.legalName}</p>
            <h1 className={`${serviceStyles.title} enter-up`} style={enterDelay(80)}>
              Portfólio de projetos entregues.
            </h1>
            <p className={`${serviceStyles.intro} enter-up`} style={enterDelay(160)}>
              Sites institucionais, sistemas web, apps mobile e plataformas SaaS desenvolvidos pela
              ORBYTS. São mais de {COMPANY_FACTS.projectsDelivered} projetos entregues, com{" "}
              {COMPANY_FACTS.onTimeDeliveryRate}% das entregas no prazo — abaixo, uma seleção.
            </p>
          </header>

          <ul className={styles.grid}>
            {projects.map((project, index) => {
              const imageSrc = getProjectImageUrl(project);
              const liveUrl =
                project.appUrl && isExternalProjectUrl(project.appUrl) ? project.appUrl : null;

              return (
                <li key={project.id}>
                  <FadeUp className={styles.cardReveal} delay={(index % 3) * 0.08}>
                    <article className={styles.card} data-spotlight>
                      <div className={styles.media}>
                        <Image
                          src={imageSrc}
                          alt={project.imageAlt}
                          fill
                          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 600px"
                          className={project.hasDeviceFrame ? styles.imageContain : styles.imageCover}
                          unoptimized={imageSrc.startsWith("http")}
                          quality={75}
                        />
                      </div>
                      <div className={styles.body}>
                        <p className={styles.tag}>{project.tag}</p>
                        <h2 className={styles.cardTitle}>{project.title}</h2>
                        <p className={styles.cardDesc}>{project.description}</p>
                        <ul className={styles.stack} aria-label="Tecnologias">
                          {project.stack.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                        {liveUrl ? (
                          <a
                            href={liveUrl}
                            className={`${styles.liveLink} animated-underline`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Ver projeto ao vivo <span aria-hidden="true">↗</span>
                          </a>
                        ) : null}
                      </div>
                    </article>
                  </FadeUp>
                </li>
              );
            })}
          </ul>

          <div className={`${serviceStyles.actions} ${styles.actions}`}>
            <OpenProposalButton>Quero um projeto assim</OpenProposalButton>
            <Link href="/#modelos" className={serviceStyles.secondaryLink}>
              Ver modelos de parceria
            </Link>
          </div>
        </div>
        <div className={serviceStyles.contact}>
          <CtaSection />
        </div>
      </main>
      <Footer />
    </>
  );
}
