export type ProcessStepStatus = "done" | "active" | "pending";

export interface ProcessStep {
  phase: string;
  title: string;
  description: string;
  status: ProcessStepStatus;
  nodeLabel: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    phase: "Fase 01",
    title: "Mapeamento de Escopo",
    description:
      "Documentamos cada funcionalidade, regra de negócio e integração necessária antes do contrato.",
    status: "done",
    nodeLabel: "✓",
  },
  {
    phase: "Fase 02",
    title: "UI/UX & Prototipagem",
    description:
      "Você aprova as telas no Figma. O desenvolvimento só inicia quando o design estiver perfeito.",
    status: "done",
    nodeLabel: "✓",
  },
  {
    phase: "Fase 03",
    title: "Sprints de Código",
    description:
      "Atualizações semanais e repositório aberto. Você vê o software tomando forma em tempo real.",
    status: "active",
    nodeLabel: "3",
  },
  {
    phase: "Fase 04",
    title: "Handover & Deploy",
    description:
      "Código-fonte 100% seu, documentação técnica em mãos e suporte contínuo nos primeiros 30 dias.",
    status: "pending",
    nodeLabel: "4",
  },
];
