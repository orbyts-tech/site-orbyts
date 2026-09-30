import { COMPANY_FACTS } from "@/config/site";
import type { FaqItem } from "@/lib/constants/faq";

export interface ModelPageStep {
  title: string;
  description: string;
}

export interface ModelPageContent {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  heading: string;
  summary: string;
  intro: string;
  idealFor: string[];
  steps: ModelPageStep[];
  includes: string[];
  faqs: FaqItem[];
  ctaLabel: string;
}

const { squadCycleDays, supportDaysAfterDelivery } = COMPANY_FACTS;

export const MODEL_PAGES: ModelPageContent[] = [
  {
    slug: "escopo-fechado",
    name: "Escopo Fechado",
    metaTitle: "Escopo Fechado: software com prazo e orçamento definidos",
    metaDescription:
      "Modelo Escopo Fechado da ORBYTS: projeto documentado, orçamento único e cronograma definido para sistemas web, apps e SaaS com mais de 3 meses de duração.",
    heading: "Escopo Fechado: prazo e orçamento definidos antes da primeira linha de código.",
    summary:
      "Modelo para projetos maiores (acima de 3 meses) com escopo documentado, orçamento único e cronograma com data de entrega.",
    intro:
      "No Escopo Fechado, a ORBYTS documenta todas as funcionalidades, regras de negócio e integrações antes do contrato. Você recebe um orçamento único e um cronograma com data de entrega, e acompanha cada sprint com repositório aberto.",
    idealFor: [
      "Projetos com duração acima de 3 meses",
      "Empresas que precisam de orçamento aprovado antes de começar",
      "Sistemas com regras de negócio e integrações complexas",
      "Times que exigem previsibilidade de prazo e custo",
    ],
    steps: [
      {
        title: "Mapeamento de escopo",
        description:
          "Documentamos cada funcionalidade, regra de negócio e integração necessária antes do contrato.",
      },
      {
        title: "UI/UX e prototipagem",
        description:
          "Você aprova as telas no Figma. O desenvolvimento só começa quando o design estiver aprovado.",
      },
      {
        title: "Sprints de código",
        description:
          "Atualizações semanais e repositório aberto: você acompanha o software tomando forma em tempo real.",
      },
      {
        title: "Handover e deploy",
        description: `Código-fonte 100% seu, documentação técnica e suporte contínuo nos primeiros ${supportDaysAfterDelivery} dias.`,
      },
    ],
    includes: [
      "Projeto todo documentado",
      "Qualidade na infraestrutura e segurança",
      "Time de desenvolvimento focado full-time",
      "Código-fonte 100% do cliente",
      `Suporte nos primeiros ${supportDaysAfterDelivery} dias após a entrega`,
    ],
    faqs: [
      {
        question: "O que é desenvolvimento de software em Escopo Fechado?",
        answer:
          "É um modelo em que todo o escopo do sistema é documentado antes do contrato. Com isso, a ORBYTS define um orçamento único e um cronograma com data de entrega, o que dá previsibilidade de prazo e custo ao cliente.",
      },
      {
        question: "Para que tipo de projeto o Escopo Fechado é indicado?",
        answer:
          "Para projetos maiores, com duração acima de 3 meses, prazo definido e necessidade de orçamento aprovado antes de começar — como sistemas web, apps mobile e plataformas SaaS B2B com regras de negócio complexas.",
      },
      {
        question: "De quem é o código-fonte no final do projeto?",
        answer: `O código-fonte é 100% do cliente. No handover a ORBYTS entrega o repositório, a documentação técnica e oferece suporte contínuo nos primeiros ${supportDaysAfterDelivery} dias.`,
      },
    ],
    ctaLabel: "Solicitar orçamento em Escopo Fechado",
  },
  {
    slug: "squad-as-a-service",
    name: "Squad as a Service",
    metaTitle: `Squad as a Service: MVP em ${squadCycleDays} dias`,
    metaDescription: `Squad as a Service da ORBYTS: um squad de desenvolvimento entrega o MVP do seu produto em ciclos de ${squadCycleDays} dias, com investimento menor e retorno mais rápido.`,
    heading: `Squad as a Service: seu MVP em ${squadCycleDays} dias.`,
    summary: `Modelo para validar ideias: um squad da ORBYTS desenvolve o MVP em ciclos de ${squadCycleDays} dias, com investimento menor e retorno mais rápido.`,
    intro: `Para ideias que ainda estão nascendo. Um squad da ORBYTS desenvolve o MVP em ciclos de ${squadCycleDays} dias, para você validar com clientes reais e ter retorno antes de investir mais.`,
    idealFor: [
      "Founders validando uma ideia de produto",
      "Empresas testando um novo produto digital",
      "Quem quer começar com um investimento menor",
      "Produtos que precisam chegar rápido ao mercado",
    ],
    steps: [
      {
        title: "Recorte do MVP",
        description:
          "Definimos juntos o menor escopo capaz de validar a ideia com clientes reais.",
      },
      {
        title: `${squadCycleDays} dias de desenvolvimento`,
        description:
          "O squad trabalha focado no MVP, com atualizações semanais e repositório aberto.",
      },
      {
        title: "Lançamento e validação",
        description:
          "O MVP vai para as mãos dos usuários para você medir interesse e começar a ter retorno.",
      },
      {
        title: "Próximo passo",
        description:
          "Com a ideia validada, você evolui com novos ciclos, migra para Escopo Fechado ou para o SaaS Full Cycle.",
      },
    ],
    includes: [
      `${squadCycleDays} dias de desenvolvimento`,
      "MVP completo para você já ter retorno do investimento",
      "Investimento menor e retorno mais rápido",
      "Código-fonte 100% do cliente",
    ],
    faqs: [
      {
        question: "O que é Squad as a Service?",
        answer: `É um modelo em que um squad de desenvolvimento da ORBYTS trabalha em ciclos de ${squadCycleDays} dias para entregar o MVP de um produto. É indicado para validar ideias com investimento menor antes de comprometer um orçamento maior.`,
      },
      {
        question: `É possível desenvolver um MVP em ${squadCycleDays} dias?`,
        answer: `Sim. O ciclo do Squad as a Service é de ${squadCycleDays} dias de desenvolvimento focados no menor escopo que valida a ideia. Funcionalidades adicionais entram em ciclos seguintes, depois da validação com usuários reais.`,
      },
      {
        question: "Qual a diferença entre Squad as a Service e Escopo Fechado?",
        answer:
          "O Squad as a Service trabalha em ciclos curtos para validar um MVP com investimento menor. O Escopo Fechado é para projetos maiores (acima de 3 meses), com todo o escopo documentado, orçamento único e cronograma definido.",
      },
    ],
    ctaLabel: "Quero validar meu MVP",
  },
  {
    slug: "saas-full-cycle",
    name: "SaaS Full Cycle",
    metaTitle: "SaaS Full Cycle: desenvolvimento, marketing e operação do seu SaaS",
    metaDescription:
      "SaaS Full Cycle da ORBYTS: desenvolvemos o seu SaaS e cuidamos de todo o ciclo — ICP, marketing, tráfego pago e orgânico, atendimento, manutenção e suporte.",
    heading: "SaaS Full Cycle: a ORBYTS desenvolve e opera o seu SaaS.",
    summary:
      "Modelo para founders sem time: a ORBYTS desenvolve o SaaS e cuida de todo o ciclo — ICP, marketing, tráfego pago e orgânico, atendimento, manutenção e suporte.",
    intro:
      "Muitos founders têm a ideia do SaaS, mas não têm quem desenvolva o sistema — e, depois do lançamento, ainda precisariam contratar marketing, tráfego pago, atendimento e suporte separados. No SaaS Full Cycle, a ORBYTS cuida de todo o ciclo do seu SaaS em um só parceiro.",
    idealFor: [
      "Founders com a ideia de um SaaS e sem time técnico",
      "Quem não quer contratar marketing, tráfego e atendimento separados",
      "Empreendedores que querem focar no negócio e nos clientes",
      "SaaS B2B em fase de lançamento e crescimento",
    ],
    steps: [
      {
        title: "Estratégia",
        description:
          "Definimos o cliente ideal (ICP), o posicionamento e a proposta de valor do seu SaaS.",
      },
      {
        title: "Produto",
        description:
          "Desenvolvemos o SaaS com arquitetura escalável, pronto para receber os primeiros clientes.",
      },
      {
        title: "Aquisição",
        description:
          "Planejamos e executamos as estratégias de marketing, tráfego pago e tráfego orgânico.",
      },
      {
        title: "Operação",
        description:
          "Assumimos o atendimento ao cliente, a manutenção e o suporte contínuo do sistema.",
      },
    ],
    includes: [
      "Desenvolvimento, manutenção e suporte do sistema",
      "Definição do cliente ideal (ICP) e posicionamento",
      "Estratégia de marketing, tráfego pago e orgânico",
      "Atendimento ao cliente do seu SaaS",
    ],
    faqs: [
      {
        question: "O que é o modelo SaaS Full Cycle?",
        answer:
          "É um modelo para founders que têm a ideia de um SaaS, mas não têm time. A ORBYTS desenvolve o sistema e cuida de todo o ciclo: definição do cliente ideal (ICP), estratégia de marketing, tráfego pago e orgânico, atendimento ao cliente, manutenção e suporte.",
      },
      {
        question: "Preciso contratar equipe de marketing, tráfego ou suporte à parte?",
        answer:
          "Não. No SaaS Full Cycle a ORBYTS assume essas frentes junto com o desenvolvimento, para que o founder não precise montar e coordenar várias equipes separadas.",
      },
      {
        question: "O que é ICP e por que ele importa para um SaaS?",
        answer:
          "ICP (Ideal Customer Profile) é o perfil do cliente ideal do seu SaaS. Defini-lo antes de investir em marketing e tráfego direciona o produto, a mensagem e a verba para quem tem mais chance de comprar e permanecer.",
      },
    ],
    ctaLabel: "Quero tirar meu SaaS do papel",
  },
];

export function getModelPage(slug: string): ModelPageContent | undefined {
  return MODEL_PAGES.find((page) => page.slug === slug);
}
