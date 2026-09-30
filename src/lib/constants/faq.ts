import { COMPANY_FACTS, SITE } from "@/config/site";

export interface FaqItem {
  question: string;
  answer: string;
}

const { projectsDelivered, onTimeDeliveryRate, squadCycleDays, supportDaysAfterDelivery } =
  COMPANY_FACTS;

/** Perguntas alinhadas a buscas orgânicas e a perguntas feitas a assistentes de IA */
export const HOME_FAQS: FaqItem[] = [
  {
    question: "Quanto custa contratar uma software house?",
    answer:
      "O investimento depende do escopo, prazo e modelo comercial. Na ORBYTS trabalhamos com Escopo Fechado (orçamento único e cronograma definido), Squad as a Service (ciclos curtos para validar MVP) e SaaS Full Cycle (desenvolvimento, marketing, suporte e operação do seu SaaS). Em até 24h enviamos uma proposta formal com valor, prazo e entregáveis.",
  },
  {
    question: "Vocês desenvolvem sistemas web e aplicativos mobile?",
    answer:
      "Sim. Entregamos sistemas web (React, Next.js, TypeScript) e apps mobile (React Native e PWA), além de SaaS B2B. O foco é arquitetura escalável, código limpo e entrega no prazo.",
  },
  {
    question: "Quanto tempo leva para desenvolver um MVP?",
    answer: `No modelo Squad as a Service, a ORBYTS desenvolve o MVP em ciclos de ${squadCycleDays} dias, focados no menor escopo capaz de validar a ideia com clientes reais. Projetos maiores, acima de 3 meses, seguem o modelo Escopo Fechado, com cronograma definido em contrato.`,
  },
  {
    question: "A ORBYTS atende empresas fora de Porto Alegre?",
    answer:
      "Sim. Somos uma software house em Porto Alegre (RS) e atendemos clientes em todo o Brasil de forma remota, com rituais claros de acompanhamento e transparência no cronograma.",
  },
  {
    question: "Qual a diferença entre Escopo Fechado, Squad as a Service e SaaS Full Cycle?",
    answer: `Escopo Fechado é ideal para projetos maiores com prazo e orçamento definidos. Squad as a Service é indicado para validar ideias com ciclos curtos (a partir de ${squadCycleDays} dias), investimento menor e retorno mais rápido. SaaS Full Cycle é para founders sem time: a ORBYTS desenvolve o SaaS e cuida de marketing, tráfego, atendimento, manutenção e suporte.`,
  },
  {
    question: "O que é o modelo SaaS Full Cycle?",
    answer:
      "É para founders que têm a ideia de um SaaS, mas não têm time. A ORBYTS desenvolve o sistema e cuida de todo o ciclo: definição do cliente ideal (ICP), estratégia de marketing, tráfego pago e orgânico, atendimento ao cliente, manutenção e suporte. Você não precisa contratar equipes separadas.",
  },
  {
    question: "O código-fonte fica com o cliente?",
    answer: `Sim. Ao final do projeto o código-fonte é 100% do cliente, junto com a documentação técnica. A ORBYTS também oferece suporte contínuo nos primeiros ${supportDaysAfterDelivery} dias após a entrega.`,
  },
  {
    question: "Quais tecnologias a ORBYTS usa?",
    answer: `Trabalhamos principalmente com ${SITE.technologies.join(", ")}. A escolha final depende do produto: priorizamos tecnologias maduras, escaláveis e fáceis de manter.`,
  },
  {
    question: "Vocês realmente entregam no prazo?",
    answer: `Sim. Trabalhamos com cronograma blindado, documentação e checkpoints com o cliente. Nossa operação é orientada a previsibilidade: +${projectsDelivered} projetos entregues com ${onTimeDeliveryRate}% das entregas no prazo.`,
  },
  {
    question: "Como contratar a ORBYTS?",
    answer: `Pelo formulário de proposta no site, pelo WhatsApp ${SITE.contact.phoneDisplay} ou pelo e-mail ${SITE.contact.email}. Em até 24h retornamos com uma avaliação técnica e estimativa financeira.`,
  },
];
