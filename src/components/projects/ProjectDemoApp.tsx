import type { Project } from "@/lib/constants/projects";
import styles from "./ProjectDemoApp.module.css";

interface ProjectDemoAppProps {
  project: Project;
}

const DEMO_NAV: Record<string, string[]> = {
  trancatto: ["Início", "Produtos", "Cores", "Contato"],
  "nilo-consultor-grafico": ["Início", "Serviços", "Projetos", "Contato"],
  forma: ["Início", "Treinos", "Social", "Perfil"],
  b6pay: ["Visão Geral", "Boletos", "PIX", "Financeiro"],
  "thora-orcamentos": ["Dashboard", "Análise", "Curva ABC", "Exportar"],
  rastrek: ["Dashboard", "Mapa", "Alertas", "Histórico"],
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
  forma: [
    { label: "Treinos na semana", value: "1/3" },
    { label: "Sequência", value: "0 sem." },
    { label: "Recorde", value: "0 sem." },
  ],
  b6pay: [
    { label: "Boletos processados", value: "R$ 50k+" },
    { label: "Comissões", value: "R$ 1,2k" },
    { label: "Clientes", value: "57" },
  ],
  "thora-orcamentos": [
    { label: "Valor consolidado", value: "R$ 7,5M" },
    { label: "Itens analisados", value: "66" },
    { label: "Orçamentos", value: "1" },
  ],
  rastrek: [
    { label: "Veículos", value: "Ao vivo" },
    { label: "Cercas", value: "Geo" },
    { label: "Alertas", value: "24/7" },
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
  forma: [
    { primary: "A — Peito e tríceps", secondary: "Último treino hoje às 19:58" },
    { primary: "Consistência semanal", secondary: "Faltam 2 treinos para a sequência" },
    { primary: "Feed social", secondary: "Atletas compartilhando evoluções" },
  ],
  b6pay: [
    { primary: "Gestão de PIX", secondary: "Links e registros de pagamento" },
    { primary: "Pagamento de boletos", secondary: "Débitos veiculares processados" },
    { primary: "Consulta de veículos", secondary: "Débitos e simulações em tempo real" },
  ],
  "thora-orcamentos": [
    { primary: "Análise com IA", secondary: "Relatório concluído e pronto para uso" },
    { primary: "Curva ABC", secondary: "Priorização de itens do orçamento" },
    { primary: "Exportar PDF", secondary: "Relatórios para construtoras" },
  ],
  rastrek: [
    { primary: "Mapa ao vivo", secondary: "Rastreio em tempo real da frota" },
    { primary: "Áreas geográficas", secondary: "Cercas e zonas de alerta no mapa" },
    { primary: "Status da frota", secondary: "Ligado, parado, em movimento e alertas" },
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
