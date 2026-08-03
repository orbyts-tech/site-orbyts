import Link from "next/link";
import type { ServicePageContent } from "@/lib/seo/service-pages";
import { ProposalFormProvider } from "@/components/proposal/ProposalFormContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { OpenProposalButton } from "@/components/proposal/OpenProposalButton";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { ServiceJsonLd } from "@/components/seo/ServiceJsonLd";
import { WebPageJsonLd } from "@/components/seo/WebPageJsonLd";
import { SITE } from "@/config/site";
import styles from "./ServicePageView.module.css";

interface ServicePageViewProps {
  page: ServicePageContent;
}

export function ServicePageView({ page }: ServicePageViewProps) {
  const path = `/${page.slug}`;

  return (
    <ProposalFormProvider>
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

          <p className={styles.eyebrow}>{SITE.legalName}</p>
          <h1 className={styles.title}>{page.heading}</h1>
          <p className={styles.intro}>{page.intro}</p>

          <ul className={styles.highlights}>
            {page.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className={styles.body}>
            {page.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className={styles.actions}>
            <OpenProposalButton>{page.ctaLabel}</OpenProposalButton>
            <Link href="/#projetos" className={styles.secondaryLink}>
              Ver projetos
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </ProposalFormProvider>
  );
}
