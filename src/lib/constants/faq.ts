export interface FaqItem {
  question: string;
  answer: string;
}

/** Perguntas alinhadas a buscas orgânicas de software house no Brasil */
export const HOME_FAQS: FaqItem[] = [
  {
    question: "Quanto custa contratar uma software house?",
    answer:
      "O investimento depende do escopo, prazo e modelo comercial. Na ORBYTS trabalhamos com Escopo Fechado (orçamento único e cronograma definido) e Squad as a Service (ciclos curtos para validar MVP). Em até 24h enviamos uma proposta formal com valor, prazo e entregáveis.",
  },
  {
    question: "Vocês desenvolvem sistemas web e aplicativos mobile?",
    answer:
      "Sim. Entregamos sistemas web (React, Next.js, TypeScript) e apps mobile (React Native e PWA), além de SaaS B2B. O foco é arquitetura escalável, código limpo e entrega no prazo.",
  },
  {
    question: "A ORBYTS atende empresas fora de Porto Alegre?",
    answer:
      "Sim. Somos uma software house em Porto Alegre (RS) e atendemos clientes em todo o Brasil de forma remota, com rituais claros de acompanhamento e transparência no cronograma.",
  },
  {
    question: "Qual a diferença entre Escopo Fechado e Squad as a Service?",
    answer:
      "Escopo Fechado é ideal para projetos maiores com prazo e orçamento definidos. Squad as a Service é indicado para validar ideias com ciclos curtos (a partir de 15 dias), investimento menor e retorno mais rápido.",
  },
  {
    question: "Vocês realmente entregam no prazo?",
    answer:
      "Sim. Trabalhamos com cronograma blindado, documentação e checkpoints com o cliente. Nossa operação é orientada a previsibilidade: +100 projetos entregues com 100% das entregas no prazo.",
  },
];
