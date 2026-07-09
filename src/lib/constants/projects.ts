export type ProjectMockup = "macbook" | "iphone";

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
  resolveProjectAppUrl,
} from "./projectAppUrl";

export type { ProjectAppUrlSource, ResolvedProjectAppUrl } from "./projectEmbedUrls";

export const PROJECTS: Project[] = [
  {
    id: "orb-run",
    index: 1,
    total: 5,
    tag: "Mobile App",
    title: "Orb Run",
    description:
      "App de corrida geolocalizada com conquista de territórios, mapas em tempo real e rankings globais.",
    stack: ["React Native", "PostGIS"],
    imageSeed: "tech1",
    imageAlt: "Orb Run — app mobile de corrida geolocalizada",
    mockup: "macbook",
    // appUrl: "https://app.orbrun.com.br",
  },
  {
    id: "recebi-fintech",
    index: 2,
    total: 5,
    tag: "SaaS B2B",
    title: "Recebi Fintech",
    description:
      "Plataforma de billing recorrente com réguas de cobrança automatizadas e scoring de clientes.",
    stack: ["Next.js", "Supabase"],
    imageSeed: "tech2",
    imageAlt: "Recebi Fintech — plataforma de billing recorrente",
    mockup: "macbook",
    // appUrl: "https://app.recebi.com.br",
  },
  {
    id: "clinicflow",
    index: 3,
    total: 5,
    tag: "Health Tech",
    title: "ClinicFlow",
    description:
      "ERP hospitalar completo com prontuário eletrônico inteligente e agendamento preditivo.",
    stack: ["React", "Node.js"],
    imageSeed: "tech3",
    imageAlt: "ClinicFlow — ERP hospitalar com prontuário eletrônico",
    mockup: "macbook",
    // appUrl: "https://app.clinicflow.com.br",
  },
  {
    id: "ffit-academia",
    index: 4,
    total: 5,
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
    index: 5,
    total: 5,
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
