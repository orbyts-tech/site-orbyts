import { ProposalFormProvider } from "@/components/proposal/ProposalFormContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { TechMarquee } from "@/components/sections/TechMarquee";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ModelsSection } from "@/components/sections/ModelsSection";
import { CtaSection } from "@/components/sections/CtaSection";

export default function HomePage() {
  return (
    <ProposalFormProvider>
      <Navbar />
      <main>
        <HeroSection />
        <TechMarquee />
        <ProjectsSection />
        <ProcessSection />
        <ModelsSection />
        <CtaSection />
      </main>
      <Footer />
    </ProposalFormProvider>
  );
}
