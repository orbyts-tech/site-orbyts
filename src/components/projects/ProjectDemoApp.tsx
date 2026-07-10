import type { Project } from "@/lib/constants/projects";
import styles from "./ProjectDemoApp.module.css";

interface ProjectDemoAppProps {
  project: Project;
}

const DEMO_NAV: Record<string, string[]> = {
  trancatto: ["Início", "Produtos", "Cores", "Contato"],
  "nilo-consultor-grafico": ["Início", "Serviços", "Projetos", "Contato"],
  "ffit-academia": ["Início", "Treinos", "Check-in", "Alunos"],
  "conecta-condo": ["Início", "Ocorrências", "Reservas", "Avisos"],
};

const DEMO_METRICS: Record<string, Array<{ label: string; value: string }>> = {
  trancatto: [
    { label: "Linhas no catálogo", value: "6" },
    { label: "Cores disponíveis", value: "12+" },
    { label: "Anos de produção", value: "15+" },
  ],
  "nilo-consultor-grafico": [
    { label: "Anos de experiência", value: "20+" },
    { label: "Projetos entregues", value: "200+" },
    { label: "Materiais atendidos", value: "Multi" },
  ],
  "ffit-academia": [
    { label: "Alunos ativos", value: "842" },
    { label: "Check-ins hoje", value: "196" },
    { label: "Treinos concluídos", value: "73%" },
  ],
  "conecta-condo": [
    { label: "Moradores ativos", value: "312" },
    { label: "Ocorrências abertas", value: "8" },
    { label: "Reservas hoje", value: "14" },
  ],
};

const DEMO_ROWS: Record<string, Array<{ primary: string; secondary: string }>> = {
  trancatto: [
    { primary: "Tricô náutico — Terracota", secondary: "Consulta de catálogo enviada" },
    { primary: "Corda com alma — Verde pinho", secondary: "Amostra solicitada via WhatsApp" },
    { primary: "Paleta Areia + Bronze", secondary: "Projeto moveleiro em andamento" },
  ],
  "nilo-consultor-grafico": [
    { primary: "Totens de papel — Varejo", secondary: "Orçamento aprovado e em produção" },
    { primary: "Displays em acrílico — PDV", secondary: "Consultoria de materiais concluída" },
    { primary: "Kit multi-material — Franquias", secondary: "Entrega prevista para esta semana" },
  ],
  "ffit-academia": [
    { primary: "Turma HIIT — 18h", secondary: "32 alunos confirmados" },
    { primary: "João Silva", secondary: "Check-in realizado às 07:12" },
    { primary: "Plano Premium", secondary: "12 renovações esta semana" },
  ],
  "conecta-condo": [
    { primary: "Vazamento — Bloco B", secondary: "Ocorrência aberta há 2h" },
    { primary: "Salão de festas", secondary: "Reserva confirmada para sábado" },
    { primary: "Aviso do síndico", secondary: "Manutenção do elevador amanhã" },
  ],
};

export function ProjectDemoApp({ project }: ProjectDemoAppProps) {
  const navItems = DEMO_NAV[project.id] ?? ["Dashboard"];
  const metrics = DEMO_METRICS[project.id] ?? [];
  const rows = DEMO_ROWS[project.id] ?? [];

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <p className={styles.brand}>
          {project.title.split(" ")[0]}
          <span>.</span>
        </p>
        <nav className={styles.nav} aria-label="Menu demo">
          {navItems.map((item, index) => (
            <div
              key={item}
              className={`${styles.navItem} ${index === 0 ? styles.navItemActive : ""}`}
            >
              {item}
            </div>
          ))}
        </nav>
        <p className={styles.note}>
          Demo interna ORBYTS — substitua por `appUrl` ou variável de ambiente quando o sistema
          real permitir iframe.
        </p>
      </aside>

      <main className={styles.main}>
        <div className={styles.topbar}>
          <h1 className={styles.pageTitle}>{project.title}</h1>
          <span className={styles.badge}>Demo ao vivo</span>
        </div>

        <div className={styles.grid}>
          {metrics.map((metric) => (
            <div key={metric.label} className={styles.card}>
              <p className={styles.cardLabel}>{metric.label}</p>
              <p className={styles.cardValue}>{metric.value}</p>
            </div>
          ))}
        </div>

        <section className={styles.panel}>
          <h2 className={styles.panelTitle}>Atividade recente</h2>
          {rows.map((row) => (
            <div key={row.primary} className={styles.row}>
              <div>
                <strong>{row.primary}</strong>
                <div>{row.secondary}</div>
              </div>
              <span className={styles.status}>ativo</span>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
