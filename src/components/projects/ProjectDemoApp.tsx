import type { Project } from "@/lib/constants/projects";
import styles from "./ProjectDemoApp.module.css";

interface ProjectDemoAppProps {
  project: Project;
}

const DEMO_NAV: Record<string, string[]> = {
  "orb-run": ["Dashboard", "Mapa ao vivo", "Rankings", "Territórios"],
  "recebi-fintech": ["Dashboard", "Cobranças", "Clientes", "Réguas"],
  clinicflow: ["Dashboard", "Agenda", "Prontuários", "Pacientes"],
  "ffit-academia": ["Início", "Treinos", "Check-in", "Alunos"],
};

const DEMO_METRICS: Record<string, Array<{ label: string; value: string }>> = {
  "orb-run": [
    { label: "Corredores ativos", value: "1.284" },
    { label: "Territórios hoje", value: "342" },
    { label: "Km registrados", value: "18.9k" },
  ],
  "recebi-fintech": [
    { label: "MRR monitorado", value: "R$ 2.4M" },
    { label: "Inadimplência", value: "3.1%" },
    { label: "Cobranças ativas", value: "8.920" },
  ],
  clinicflow: [
    { label: "Consultas hoje", value: "126" },
    { label: "Leitos ocupados", value: "78%" },
    { label: "Agendamentos IA", value: "41" },
  ],
  "ffit-academia": [
    { label: "Alunos ativos", value: "842" },
    { label: "Check-ins hoje", value: "196" },
    { label: "Treinos concluídos", value: "73%" },
  ],
};

const DEMO_ROWS: Record<string, Array<{ primary: string; secondary: string }>> = {
  "orb-run": [
    { primary: "Zona Sul — POA", secondary: "47 corredores online" },
    { primary: "Centro Histórico", secondary: "Território disputado" },
    { primary: "Orla Menino Deus", secondary: "Recorde de km/dia" },
  ],
  "recebi-fintech": [
    { primary: "Fatura #9821 — SaaS B2B", secondary: "Régua D+3 acionada" },
    { primary: "Cliente Acme Ltda", secondary: "Score 92 · adimplente" },
    { primary: "Assinatura anual", secondary: "Renovação em 12 dias" },
  ],
  clinicflow: [
    { primary: "Dr. Martins — Cardio", secondary: "Próximo slot 14:30" },
    { primary: "UTI — Leito 12", secondary: "Alta prevista amanhã" },
    { primary: "Paciente #4482", secondary: "Prontuário atualizado" },
  ],
  "ffit-academia": [
    { primary: "Turma HIIT — 18h", secondary: "32 alunos confirmados" },
    { primary: "João Silva", secondary: "Check-in realizado às 07:12" },
    { primary: "Plano Premium", secondary: "12 renovações esta semana" },
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
