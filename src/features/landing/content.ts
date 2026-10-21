import { SITE } from "@/config/site";

/**
 * Landing page de campanhas (/lp).
 * Toda informação institucional vem daqui ou de `SITE` — use somente dados oficiais confirmados.
 * Campo vazio = não aparece na página.
 */
export const LP_CONFIG = {
  company: SITE.name === "ORBYTS" ? "Orbyts" : SITE.name,
  email: SITE.contact.email,
  /** CNPJ oficial (ex.: "00.000.000/0001-00"). Vazio = linha oculta. */
  cnpj: "",
  /** URL da política de privacidade. Vazio = texto sem link (pendente antes de anunciar). */
  privacyUrl: "",
  /** Prazo de retorno que a equipe garante (ex.: "em até 1 dia útil"). Vazio = omitido. */
  responseTime: "",
  /** Perfis oficiais — reaproveita `SITE.socialProfiles`. */
  socialProfiles: SITE.socialProfiles,
  /** Endpoint que recebe o lead e só responde ok após registrar/enviar. */
  leadEndpoint: "/api/lead",
} as const;

export const SERVICE_OPTIONS = [
  { value: "site", label: "Site profissional ou landing page" },
  { value: "sistema", label: "Sistema de gestão ou software sob medida" },
  { value: "plataforma", label: "Plataforma, portal ou aplicação" },
  { value: "automacao", label: "Automação ou integração" },
  { value: "indefinido", label: "Ainda não sei qual é a melhor solução" },
] as const;

export type ServiceValue = (typeof SERVICE_OPTIONS)[number]["value"];

export const BUDGET_OPTIONS = [
  "Até R$ 5 mil",
  "R$ 5 mil a R$ 15 mil",
  "R$ 15 mil a R$ 30 mil",
  "Acima de R$ 30 mil",
  "Ainda preciso entender o investimento",
] as const;

export const TIMELINE_OPTIONS = [
  "Próximos 15 dias",
  "Próximos 30 dias",
  "Próximos 1 a 3 meses",
  "Estou pesquisando possibilidades",
] as const;

export const DECISION_OPTIONS = [
  "Sou responsável pela decisão",
  "Decido junto com outras pessoas",
  "Estou pesquisando para outra pessoa",
] as const;

export const CONTACT_OPTIONS = ["E-mail", "WhatsApp"] as const;

export function getServiceLabel(value: string): string {
  return SERVICE_OPTIONS.find((option) => option.value === value)?.label ?? value;
}

export const PROBLEMS = [
  {
    title: "Processos manuais demais.",
    text: "Sua equipe perde horas com tarefas que poderiam ser simplificadas ou automatizadas.",
    icon: "clock",
  },
  {
    title: "Ferramentas que não se conectam.",
    text: "Informações ficam espalhadas entre planilhas, sistemas e conversas.",
    icon: "link",
  },
  {
    title: "Uma presença digital que não acompanha o negócio.",
    text: "Seu site não transmite o valor da sua empresa ou não ajuda a gerar oportunidades.",
    icon: "window",
  },
  {
    title: "Ideias que nunca saem do papel.",
    text: "Você sabe o que precisa melhorar, mas ainda não encontrou o caminho para transformar essa necessidade em uma solução.",
    icon: "path",
  },
] as const;

export const SERVICES = [
  {
    id: "site",
    value: "site",
    title: "Sites profissionais",
    text: "Sites institucionais e landing pages que apresentam sua empresa com clareza e ajudam a gerar contatos.",
    when: "o site atual não reflete o negócio ou não gera oportunidades.",
    art: "site",
  },
  {
    id: "sistema",
    value: "sistema",
    title: "Sistemas de gestão",
    text: "Ferramentas internas para organizar pedidos, clientes, estoque, agenda ou financeiro em um só lugar.",
    when: "a operação depende de planilhas e controles paralelos.",
    art: "sistema",
  },
  {
    id: "plataforma",
    value: "plataforma",
    title: "Plataformas e software sob medida",
    text: "Portais, áreas do cliente e produtos digitais construídos a partir das regras do seu negócio.",
    when: "nenhuma ferramenta pronta atende ao seu processo.",
    art: "plataforma",
  },
  {
    id: "automacao",
    value: "automacao",
    title: "Automações e integrações",
    text: "Conectamos sistemas e eliminamos etapas manuais repetitivas entre as ferramentas que sua equipe já usa.",
    when: "a equipe copia dados de um lugar para outro.",
    art: "automacao",
  },
  {
    id: "aplicacao",
    value: "plataforma",
    title: "Aplicações e experiências digitais",
    text: "Aplicações web responsivas para clientes, parceiros ou equipes em campo, no computador e no celular.",
    when: "sua ideia precisa virar um produto que as pessoas usem.",
    art: "aplicacao",
  },
] as const satisfies ReadonlyArray<{ value: ServiceValue } & Record<string, string>>;

export const DIFFERENTIALS = [
  {
    title: "Entendemos antes de construir.",
    text: "Investigamos a necessidade e os objetivos do negócio antes de definir funcionalidades e tecnologias.",
  },
  {
    title: "Escopo alinhado às suas necessidades.",
    text: "Priorizamos o que realmente precisa ser desenvolvido, evitando complexidade desnecessária.",
  },
  {
    title: "Desenvolvimento com acompanhamento.",
    text: "Você acompanha a evolução do projeto e tem clareza sobre as etapas e decisões importantes.",
  },
  {
    title: "Soluções pensadas para evoluir.",
    text: "Consideramos manutenção, expansão e necessidades futuras desde o planejamento.",
  },
] as const;

export const AUTHORITY = [
  {
    when: "Antes",
    title: "Escopo e investimento por escrito",
    text: "Funcionalidades, etapas e investimento são definidos na proposta e aprovados antes do início do desenvolvimento.",
  },
  {
    when: "Durante",
    title: "Decisões técnicas a partir do problema",
    text: "Escolhemos ferramentas e tecnologias depois de entender a necessidade, e você acompanha as etapas combinadas.",
  },
  {
    when: "Sempre",
    title: "Dados tratados com cuidado",
    text: "As informações que você compartilha com a Orbyts são usadas apenas para o projeto e tratadas conforme a LGPD.",
  },
] as const;

export const STEPS = [
  { title: "Diagnóstico", text: "Entendemos seu negócio, o desafio atual e o que você espera alcançar." },
  {
    title: "Planejamento",
    text: "Definimos a solução mais adequada, as funcionalidades prioritárias, o escopo e o investimento.",
  },
  {
    title: "Desenvolvimento",
    text: "Construímos a solução de acordo com o escopo aprovado, com acompanhamento das etapas combinadas.",
  },
  {
    title: "Entrega e evolução",
    text: "Validamos a entrega e alinhamos os próximos passos, incluindo eventuais necessidades de suporte e evolução.",
  },
] as const;

export const LP_FAQ = [
  {
    q: "A Orbyts atende empresas de diferentes tamanhos?",
    a: "Sim. Trabalhamos com empreendedores, pequenas empresas e negócios já estabelecidos. O escopo é definido a partir da realidade e do momento de cada empresa.",
  },
  {
    q: "Quanto custa desenvolver um projeto?",
    a: "O investimento depende do escopo, da complexidade e das integrações necessárias. Depois do diagnóstico, apresentamos uma proposta com escopo, etapas e investimento definidos antes de qualquer desenvolvimento.",
  },
  {
    q: "Preciso saber exatamente o que quero desenvolver?",
    a: "Não. Basta descrever o problema ou o objetivo. O diagnóstico existe justamente para identificar qual solução faz sentido para o seu caso.",
  },
  {
    q: "A Orbyts desenvolve apenas sites?",
    a: "Não. Além de sites e landing pages, desenvolvemos sistemas de gestão, plataformas, portais, aplicações web, automações e integrações entre ferramentas.",
  },
  {
    q: "Quanto tempo leva para concluir um projeto?",
    a: "O prazo varia conforme o escopo. Ele é definido no planejamento e informado na proposta, junto com as etapas de acompanhamento.",
  },
  {
    q: "É possível evoluir a solução depois da entrega?",
    a: "Sim. Consideramos manutenção e expansão desde o planejamento, e alinhamos na entrega os próximos passos de suporte e evolução.",
  },
] as const;
