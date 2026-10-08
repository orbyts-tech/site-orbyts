import Link from "next/link";
import type { ServicePageContent } from "@/lib/seo/service-pages";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { OpenProposalButton } from "@/components/proposal/OpenProposalButton";
import { CtaSection } from "@/components/sections/CtaSection";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { ServiceJsonLd } from "@/components/seo/ServiceJsonLd";
import { WebPageJsonLd } from "@/components/seo/WebPageJsonLd";
import { FadeUp } from "@/components/ui/FadeUp";
import { SITE } from "@/config/site";
import { enterDelay, staggerIndex } from "@/lib/motion";
import styles from "./ServicePageView.module.css";

interface ServicePageViewProps {
  page: ServicePageContent;
}

export function ServicePageView({ page }: ServicePageViewProps) {
  const path = `/${page.slug}`;

  return (
    <>
      <WebPageJsonLd path={path} title={page.title} description={page.description} />
      <ServiceJsonLd serviceName={page.title} description={page.description} path={path} />
      <BreadcrumbJsonLd
        items={[
          { name: "Início", path: "/" },
          { name: page.title, path },
        ]}
      />
      <Navbar />
      <main id="conteudo-principal" className={styles.main}>
        <article className={styles.article}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <ol>
              <li>
                <Link href="/">Início</Link>
              </li>
              <li aria-current="page">{page.title}</li>
            </ol>
          </nav>

          <p className={`${styles.eyebrow} enter-up`}>{SITE.legalName}</p>
          <h1 className={`${styles.title} enter-up`} style={enterDelay(80)}>
            {page.heading}
          </h1>
          <p className={`${styles.intro} enter-up`} style={enterDelay(160)}>
            {page.intro}
          </p>

          <FadeUp stagger staggerCount={page.highlights.length}>
            <ul className={styles.highlights}>
              {page.highlights.map((item, index) => (
                <li key={item} className="reveal-item" style={staggerIndex(index)}>
                  {item}
                </li>
              ))}
            </ul>
          </FadeUp>

          <FadeUp className={styles.body}>
            {page.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </FadeUp>

          <div className={styles.actions}>
            <OpenProposalButton>{page.ctaLabel}</OpenProposalButton>
            <Link href="/portfolio" className={styles.secondaryLink}>
              Ver portfólio
            </Link>
          </div>
        </article>
        <div className={styles.contact}>
          <CtaSection />
        </div>
      </main>
      <Footer />
    </>
  );
}
