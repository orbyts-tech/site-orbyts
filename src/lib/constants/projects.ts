export type ProjectMockup = "macbook" | "iphone";
export type ProjectEmbedMode = "iframe" | "external";

export interface Project {
  id: string;
  index: number;
  total: number;
  tag: string;
  title: string;
  description: string;
  stack: string[];
  imageSeed: string;
  imageAlt: string;
  mockup?: ProjectMockup;
  /**
   * iframe — testável dentro da ORBYTS.
   * external — abre o sistema em nova aba (site bloqueia iframe).
   */
  embedMode?: ProjectEmbedMode;
  /**
   * URL do sistema ao vivo (iframe). Sobrescreve o preview de teste.
   * Ex.: "https://app.seudominio.com.br"
   */
  appUrl?: string;
  /**
   * Caminho para a imagem local (ex.: "/projeto.png").
   * Se não for fornecida, usará o placeholder gerado pelo Picsum.
   */
  imageUrl?: string;
  /**
   * Quando true, a imagem já inclui o mockup do aparelho
   * e o carrossel não aplica a moldura CSS do iPhone.
   */
  hasDeviceFrame?: boolean;
}

/**
 * URL da captura exibida no mockup quando o embed ao vivo não está ativo.
 * Trocar por assets locais definitivos (ex.: `/images/projects/${project.id}.webp`).
 */
export function getProjectImageUrl(project: Project): string {
  if (project.imageUrl) {
    return project.imageUrl;
  }

  if (project.mockup === "iphone") {
    return `https://picsum.photos/seed/${project.imageSeed}/900/1950`;
  }

  return `https://picsum.photos/seed/${project.imageSeed}/1600/1000`;
}

export function getProjectById(id: string): Project | undefined {
  return PROJECTS.find((project) => project.id === id);
}

export {
  getProjectAppUrl,
  getProjectAppUrlSource,
  hasProjectLiveApp,
  isExternalProjectUrl,
  isKnownEmbeddableUrl,
  canEmbedProject,
  opensProjectExternally,
  resolveProjectAppUrl,
} from "./projectAppUrl";

export type { ProjectAppUrlSource, ResolvedProjectAppUrl } from "./projectEmbedUrls";

export const PROJECTS: Project[] = [
  {
    id: "trancatto",
    index: 1,
    total: 6,
    tag: "Site Institucional",
    title: "Trançatto",
    description:
      "Site institucional e catálogo digital de cordas e tricôs náuticos para móveis, com paleta de cores e contato integrado.",
    stack: ["React", "Netlify"],
    imageSeed: "trancatto",
    imageAlt: "Trançatto — cordas e tricôs náuticos para móveis",
    mockup: "macbook",
    appUrl: "https://trancatto-orbyts.netlify.app/",
  },
  {
    id: "nilo-consultor-grafico",
    index: 2,
    total: 6,
    tag: "Site Institucional",
    title: "Consultoria Nilo",
    description:
      "Site de consultoria gráfica com apresentação de serviços, portfólio de projetos em múltiplos materiais e fluxo de orçamento integrado.",
    stack: ["React", "Netlify"],
    imageSeed: "nilo-consultor-grafico",
    imageAlt: "Jorge Nilo — consultoria gráfica e produção gráfica",
    mockup: "macbook",
    appUrl: "https://nilo-consultor-grafico.netlify.app/",
  },
  {
    id: "forma",
    index: 3,
    total: 6,
    tag: "Mobile App · PWA",
    title: "Forma",
    description:
      "PWA em React Native com rede social focada em treino de musculação: treinos, consistência semanal, progresso e interação entre atletas.",
    stack: ["React Native", "PWA"],
    imageSeed: "forma",
    imageAlt: "Forma — app de rede social e treinos de musculação",
    mockup: "iphone",
    imageUrl: "/forma-app.png",
    hasDeviceFrame: true,
  },
  {
    id: "b6pay",
    index: 4,
    total: 6,
    tag: "Web · Mobile",
    title: "B6Pay",
    description:
      "Sistema web e mobile para gestão de pagamentos de débitos veiculares: boletos, PIX, comissões, links de pagamento e consulta de veículos.",
    stack: ["React", "React Native"],
    imageSeed: "b6pay",
    imageAlt: "B6Pay — gestão de pagamentos de débitos veiculares",
    mockup: "macbook",
    imageUrl: "/b6pay.png",
    hasDeviceFrame: true,
  },
  {
    id: "thora-orcamentos",
    index: 5,
    total: 6,
    tag: "SaaS · IA",
    title: "Thora Orçamentos",
    description:
      "Sistema com IA para análise de tabelas de orçamento e geração de curva ABC, voltado a construtoras: extração, consolidação e exportação de relatórios.",
    stack: ["React", "IA"],
    imageSeed: "thora-orcamentos",
    imageAlt: "Thora Orçamentos — análise de orçamentos com IA e curva ABC",
    mockup: "macbook",
    imageUrl: "/thora-orcamentos.png",
    hasDeviceFrame: true,
  },
  {
    id: "rastrek",
    index: 6,
    total: 6,
    tag: "SaaS · Frota",
    title: "Rastrek",
    description:
      "Sistema web para gestão de frota e rastreio em tempo real: mapa ao vivo, alertas, histórico, cercas geográficas e status dos veículos.",
    stack: ["React", "Python"],
    imageSeed: "rastrek",
    imageAlt: "Rastrek — gestão de frota e rastreio veicular em tempo real",
    mockup: "macbook",
    imageUrl: "/rastrek.png",
    hasDeviceFrame: true,
  },
];
