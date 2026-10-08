import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { TechMarquee } from "@/components/sections/TechMarquee";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ModelsSection } from "@/components/sections/ModelsSection";
import { CtaSection } from "@/components/sections/CtaSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { PortfolioJsonLd } from "@/components/seo/PortfolioJsonLd";
import { WebPageJsonLd } from "@/components/seo/WebPageJsonLd";
import { SITE } from "@/config/site";
import { PROJECTS } from "@/lib/constants/projects";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({ title: SITE.homeTitle, isAbsoluteTitle: true });

export default function HomePage() {
  return (
    <>
      <WebPageJsonLd title={SITE.homeTitle} />
      <PortfolioJsonLd projects={PROJECTS} />
      <Navbar />
      <main id="conteudo-principal">
        <HeroSection />
        <TechMarquee />
        <ProjectsSection />
        <ProcessSection />
        <ModelsSection />
        <AboutSection />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
