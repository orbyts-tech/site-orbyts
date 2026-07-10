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
}

/**
 * URL da captura exibida no mockup quando o embed ao vivo não está ativo.
 * Trocar por assets locais definitivos (ex.: `/images/projects/${project.id}.webp`).
 */
export function getProjectImageUrl(project: Project): string {
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
    total: 4,
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
    total: 4,
    tag: "Site Institucional",
    title: "Consultoria Nilo",
    description:
      "Site de consultoria gráfica com apresentação de serviços, portfólio de projetos em múltiplos materiais e fluxo de orçamento integrado.",
    stack: ["React", "Netlify"],
    imageSeed: "nilo-consultor-grafico",
    imageAlt: "Jorge Nilo — consultoria gráfica e produção gráfica",
    mockup: "macbook",
    appUrl: "https://nilo-consultor-grafico.netlify.app/",
    embedMode: "external",
  },
  {
    id: "ffit-academia",
    index: 3,
    total: 4,
    tag: "Mobile App",
    title: "F Fit Academia",
    description:
      "App completo para academias com gestão de alunos, treinos, check-in e acompanhamento da rotina fitness.",
    stack: ["React", "Netlify"],
    imageSeed: "ffit-academia",
    imageAlt: "F Fit Academia — app de gestão para academias",
    mockup: "iphone",
    appUrl: "https://app-academia-orbyts.netlify.app/",
  },
  {
    id: "conecta-condo",
    index: 4,
    total: 4,
    tag: "Mobile App",
    title: "ConectaCondo",
    description:
      "App para condomínios com comunicação entre moradores, gestão de ocorrências, reservas de áreas comuns e avisos em tempo real.",
    stack: ["React", "Netlify"],
    imageSeed: "conecta-condo",
    imageAlt: "ConectaCondo — app de gestão para condomínios",
    mockup: "iphone",
    appUrl: "https://connect-condo-orbyts.netlify.app/",
  },
];
