import { HOME_FAQS } from "@/lib/constants/faq";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { FadeUp } from "@/components/ui/FadeUp";
import styles from "./FaqSection.module.css";

export function FaqSection() {
  return (
    <section id="faq" className={styles.section} aria-labelledby="faq-heading">
      <FaqJsonLd items={HOME_FAQS} />
      <FadeUp>
        <div className={styles.intro}>
          <h2 id="faq-heading" className={styles.title}>
            Perguntas frequentes
          </h2>
          <p className={styles.subtitle}>
            Respostas diretas para quem está avaliando uma software house para web, mobile ou SaaS.
          </p>
        </div>
      </FadeUp>

      <div className={styles.list}>
        {HOME_FAQS.map((item, index) => (
          <FadeUp key={item.question} delay={0.04 * index}>
            <details className={styles.item}>
              <summary className={styles.question}>{item.question}</summary>
              <p className={styles.answer}>{item.answer}</p>
            </details>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
