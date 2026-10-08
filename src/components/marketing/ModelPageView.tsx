import Link from "next/link";
import type { ModelPageContent } from "@/lib/seo/model-pages";
import { MODEL_PAGES } from "@/lib/seo/model-pages";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { OpenProposalButton } from "@/components/proposal/OpenProposalButton";
import { CtaSection } from "@/components/sections/CtaSection";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { ServiceJsonLd } from "@/components/seo/ServiceJsonLd";
import { WebPageJsonLd } from "@/components/seo/WebPageJsonLd";
import { FadeUp } from "@/components/ui/FadeUp";
import { SITE } from "@/config/site";
import { enterDelay, staggerIndex } from "@/lib/motion";
import faqStyles from "@/components/sections/FaqSection.module.css";
import serviceStyles from "./ServicePageView.module.css";
import styles from "./ModelPageView.module.css";

interface ModelPageViewProps {
  page: ModelPageContent;
}

export function ModelPageView({ page }: ModelPageViewProps) {
  const path = `/modelos/${page.slug}`;
  const otherModels = MODEL_PAGES.filter((model) => model.slug !== page.slug);

  return (
    <>
      <WebPageJsonLd path={path} title={page.metaTitle} description={page.metaDescription} />
      <ServiceJsonLd serviceName={page.name} description={page.summary} path={path} />
      <FaqJsonLd items={page.faqs} />
      <BreadcrumbJsonLd
        items={[
          { name: "Início", path: "/" },
          { name: "Modelos", path: "/#modelos" },
          { name: page.name, path },
        ]}
      />
      <Navbar />
      <main id="conteudo-principal" className={serviceStyles.main}>
        <article className={serviceStyles.article}>
          <nav className={serviceStyles.breadcrumb} aria-label="Breadcrumb">
            <ol>
              <li>
                <Link href="/">Início</Link>
              </li>
              <li>
                <Link href="/#modelos">Modelos</Link>
              </li>
              <li aria-current="page">{page.name}</li>
            </ol>
          </nav>

          <p className={`${serviceStyles.eyebrow} enter-up`}>
            Modelo de parceria · {SITE.legalName}
          </p>
          <h1 className={`${serviceStyles.title} enter-up`} style={enterDelay(80)}>
            {page.heading}
          </h1>
          <p className={`${serviceStyles.intro} enter-up`} style={enterDelay(160)}>
            {page.intro}
          </p>

          <FadeUp>
            <section className={styles.block} aria-labelledby="ideal-para">
              <h2 id="ideal-para" className={styles.blockTitle}>
                Para quem é o {page.name}
              </h2>
              <ul className={serviceStyles.highlights}>
                {page.idealFor.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </FadeUp>

          <FadeUp stagger staggerCount={page.steps.length}>
            <section className={styles.block} aria-labelledby="como-funciona">
              <h2 id="como-funciona" className={styles.blockTitle}>
                Como funciona
              </h2>
              <ol className={styles.steps}>
                {page.steps.map((step, index) => (
                  <li
                    key={step.title}
                    className={`${styles.step} reveal-item`}
                    style={staggerIndex(index)}
                  >
                    <span className={styles.stepNumber} aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className={styles.stepTitle}>{step.title}</h3>
                      <p className={styles.stepText}>{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          </FadeUp>

          <FadeUp>
            <section className={styles.block} aria-labelledby="o-que-inclui">
              <h2 id="o-que-inclui" className={styles.blockTitle}>
                O que está incluído
              </h2>
              <ul className={serviceStyles.highlights}>
                {page.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </FadeUp>

          <FadeUp>
            <section className={styles.block} aria-labelledby="perguntas">
              <h2 id="perguntas" className={styles.blockTitle}>
                Perguntas frequentes sobre {page.name}
              </h2>
              <div className={styles.faqList}>
                {page.faqs.map((faq) => (
                  <details key={faq.question} className={faqStyles.item}>
                    <summary className={faqStyles.question}>{faq.question}</summary>
                    <p className={faqStyles.answer}>{faq.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          </FadeUp>

          <div className={serviceStyles.actions}>
            <OpenProposalButton>{page.ctaLabel}</OpenProposalButton>
            <Link href="/portfolio" className={serviceStyles.secondaryLink}>
              Ver portfólio
            </Link>
          </div>

          <nav className={styles.related} aria-label="Outros modelos">
            <p className={styles.relatedTitle}>Outros modelos de parceria</p>
            <ul>
              {otherModels.map((model) => (
                <li key={model.slug}>
                  <Link href={`/modelos/${model.slug}`}>{model.name}</Link>
                  <span>{model.summary}</span>
                </li>
              ))}
            </ul>
          </nav>
        </article>
        <div className={serviceStyles.contact}>
          <CtaSection />
        </div>
      </main>
      <Footer />
    </>
  );
}
