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
  /** URL externa do projeto (quando disponível) */
  href?: string;
}

export function getProjectImageUrl(project: Project): string {
  return `https://picsum.photos/seed/${project.imageSeed}/1600/1000`;
}

export const PROJECTS: Project[] = [
  {
    id: "orb-run",
    index: 1,
    total: 3,
    tag: "Mobile App",
    title: "Orb Run",
    description:
      "App de corrida geolocalizada com conquista de territórios, mapas em tempo real e rankings globais.",
    stack: ["React Native", "PostGIS"],
    imageSeed: "tech1",
    imageAlt: "Orb Run — app mobile de corrida geolocalizada",
  },
  {
    id: "recebi-fintech",
    index: 2,
    total: 3,
    tag: "SaaS B2B",
    title: "Recebi Fintech",
    description:
      "Plataforma de billing recorrente com réguas de cobrança automatizadas e scoring de clientes.",
    stack: ["Next.js", "Supabase"],
    imageSeed: "tech2",
    imageAlt: "Recebi Fintech — plataforma de billing recorrente",
  },
  {
    id: "clinicflow",
    index: 3,
    total: 3,
    tag: "Health Tech",
    title: "ClinicFlow",
    description:
      "ERP hospitalar completo com prontuário eletrônico inteligente e agendamento preditivo.",
    stack: ["React", "Node.js"],
    imageSeed: "tech3",
    imageAlt: "ClinicFlow — ERP hospitalar com prontuário eletrônico",
  },
];
