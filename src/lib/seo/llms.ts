import { absoluteUrl, CONTENT_LAST_UPDATED, SITE } from "@/config/site";
import { ABOUT_FACTS, ABOUT_PARAGRAPHS } from "@/lib/constants/content";
import { HOME_FAQS, type FaqItem } from "@/lib/constants/faq";
import { PROJECTS } from "@/lib/constants/projects";
import { MODEL_PAGES } from "@/lib/seo/model-pages";
import { SERVICE_PAGES } from "@/lib/seo/service-pages";

function bulletList(items: readonly string[]): string {
  return items.map((item) => `- ${item}`).join("\n");
}

function faqBlock(items: FaqItem[]): string {
  return items.map((item) => `### ${item.question}\n\n${item.answer}`).join("\n\n");
}

function contactBlock(): string {
  return bulletList([
    `E-mail: ${SITE.contact.email}`,
    `WhatsApp: ${SITE.contact.phoneDisplay} (${SITE.contact.whatsapp})`,
    `Site: ${SITE.url}`,
    `Localização: ${SITE.location.city}, ${SITE.location.region}, Brasil — atendimento remoto em todo o país`,
  ]);
}

function header(): string {
  return [`# ${SITE.legalName} (${SITE.name})`, "", `> ${SITE.description}`].join("\n");
}

export function buildLlmsTxt(): string {
  return [
    header(),
    "",
    ...ABOUT_PARAGRAPHS.flatMap((paragraph) => [paragraph, ""]),
    "## Serviços",
    "",
    ...SERVICE_PAGES.map(
      (page) => `- [${page.title}](${absoluteUrl(`/${page.slug}`)}): ${page.description}`,
    ),
    "",
    "## Modelos de parceria",
    "",
    ...MODEL_PAGES.map(
      (page) => `- [${page.name}](${absoluteUrl(`/modelos/${page.slug}`)}): ${page.summary}`,
    ),
    "",
    "## Portfólio",
    "",
    `- [Portfólio completo](${absoluteUrl("/portfolio")}): ${PROJECTS.length} projetos em destaque, entre sites, sistemas web, apps e SaaS.`,
    "",
    "## Contato",
    "",
    contactBlock(),
    "",
    "## Optional",
    "",
    `- [Conteúdo completo para IAs](${absoluteUrl("/llms-full.txt")}): versão detalhada com modelos, portfólio e perguntas frequentes.`,
    `- [Página inicial](${SITE.url}): visão geral, projetos, processo, modelos e FAQ.`,
    "",
    `Última atualização: ${CONTENT_LAST_UPDATED}`,
    "",
  ].join("\n");
}

export function buildLlmsFullTxt(): string {
  const facts = ABOUT_FACTS.map((fact) => `${fact.label}: ${fact.value}`);

  const services = SERVICE_PAGES.map((page) =>
    [
      `### ${page.title}`,
      "",
      `URL: ${absoluteUrl(`/${page.slug}`)}`,
      "",
      page.intro,
      "",
      bulletList(page.highlights),
      "",
      ...page.body,
    ].join("\n"),
  );

  const models = MODEL_PAGES.map((page) =>
    [
      `### ${page.name}`,
      "",
      `URL: ${absoluteUrl(`/modelos/${page.slug}`)}`,
      "",
      page.intro,
      "",
      "Para quem é:",
      bulletList(page.idealFor),
      "",
      "Como funciona:",
      page.steps.map((step, index) => `${index + 1}. ${step.title}: ${step.description}`).join("\n"),
      "",
      "O que está incluído:",
      bulletList(page.includes),
      "",
      faqBlock(page.faqs).replaceAll("### ", "#### "),
    ].join("\n"),
  );

  const projects = PROJECTS.map((project) =>
    [
      `### ${project.title}`,
      "",
      `Tipo: ${project.tag}`,
      `Tecnologias: ${project.stack.join(", ")}`,
      ...(project.appUrl?.startsWith("http") ? [`Link: ${project.appUrl}`] : []),
      "",
      project.description,
    ].join("\n"),
  );

  return [
    header(),
    "",
    "## Sobre",
    "",
    ...ABOUT_PARAGRAPHS.flatMap((paragraph) => [paragraph, ""]),
    bulletList(facts),
    "",
    "## Serviços",
    "",
    services.join("\n\n"),
    "",
    "## Modelos de parceria",
    "",
    models.join("\n\n"),
    "",
    "## Portfólio",
    "",
    projects.join("\n\n"),
    "",
    "## Perguntas frequentes",
    "",
    faqBlock(HOME_FAQS),
    "",
    "## Contato",
    "",
    contactBlock(),
    "",
    `Última atualização: ${CONTENT_LAST_UPDATED}`,
    "",
  ].join("\n");
}
