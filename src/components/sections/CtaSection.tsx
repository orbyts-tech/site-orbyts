import { FadeUp } from "@/components/ui/FadeUp";
import { ProposalForm } from "@/components/proposal/ProposalForm";
import styles from "./CtaSection.module.css";

export function CtaSection() {
  return (
    <FadeUp>
      <section id="contato" className={styles.section} aria-labelledby="cta-heading">
        <h2 id="cta-heading" className={styles.title}>
          O seu próximo projeto, <br />
          <span className={styles.accent}>entregue no prazo.</span>
        </h2>
        <p className={styles.subtitle}>
          Preencha o formulário e conte qual é o seu desafio. Em até 24h retornamos com uma
          avaliação técnica e estimativa financeira.
        </p>
        <ProposalForm />
      </section>
    </FadeUp>
  );
}
