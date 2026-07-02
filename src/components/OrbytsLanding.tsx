import { useEffect, useRef } from "react";
import "./OrbytsLanding.css";

const NAV_LINKS = [
  { label: "Serviços", href: "#servicos" },
  { label: "Projetos", href: "#projetos" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Contato", href: "#contato" },
] as const;

const SERVICES = [
  {
    title: "Sistemas Web",
    desc: "Painéis internos, plataformas SaaS e sistemas sob medida com arquitetura escalável.",
    tags: ["React", "TypeScript", "Supabase"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="14" rx="2" />
        <path d="M8 21h8M12 18v3" />
      </svg>
    ),
  },
  {
    title: "Apps Mobile",
    desc: "Aplicativos nativos e híbridos com foco em performance e experiência real de uso.",
    tags: ["React Native", "Expo", "Mapbox"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="2" width="12" height="20" rx="2" />
        <path d="M11 18h2" />
      </svg>
    ),
  },
  {
    title: "E-commerce",
    desc: "Lojas e checkouts sob medida, integrados a gateway de pagamento e estoque.",
    tags: ["Next.js", "Postgres", "Edge Fn"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="20" r="1.4" />
        <circle cx="18" cy="20" r="1.4" />
        <path d="M2 3h2l2.6 12.4a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 2-1.6L21 7H5.2" />
      </svg>
    ),
  },
] as const;

const FLOW_STEPS = [
  {
    n: "1",
    title: "Você entra na fila",
    desc: "Contrata um pacote de dias prepago — escopo aberto ou fechado — e garante sua posição.",
    tag: "Pagamento antecipado",
  },
  {
    n: "2",
    title: "Execução em ciclos de 7 dias",
    desc: "Desenvolvimento roda em ciclos fixos, com checkpoints claros de acompanhamento.",
    tag: "Mecanismo formalizado em contrato",
  },
  {
    n: "3",
    title: "Aceite ao final do pacote",
    desc: "Você revisa, aprova, e a propriedade do que foi desenvolvido passa a ser sua.",
    tag: "IP transferido no pagamento integral",
  },
] as const;

const STACK_BADGES = [
  "React 19",
  "TypeScript",
  "Vite",
  "Tailwind v4",
  "Supabase",
  "React Native",
  "Zustand",
  "TanStack Query",
] as const;

const CHART_HEIGHTS = ["40%", "65%", "50%", "85%", "60%", "95%", "70%"] as const;

function BrowserMockup() {
  return (
    <div className="browser-mock">
      <div className="browser-bar">
        <div className="browser-dot" />
        <div className="browser-dot" />
        <div className="browser-dot" />
        <div className="browser-url">app.paymentgateway.com.br</div>
      </div>
      <div className="browser-body">
        <div className="b-sidebar">
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
        <div className="b-content">
          <div className="b-chart">
            {CHART_HEIGHTS.map((height) => (
              <span key={height} style={{ height }} />
            ))}
          </div>
          <div className="b-row" />
          <div className="b-row short" />
          <div className="b-row" />
        </div>
      </div>
    </div>
  );
}

function PhoneMockup() {
  return (
    <div className="phone-mock">
      <div className="phone-screen">
        <div className="phone-notch" />
        <svg className="phone-map" viewBox="0 0 200 410" width="100%" height="100%" aria-hidden="true">
          <line x1="0" y1="80" x2="200" y2="80" stroke="rgba(52,152,96,0.15)" strokeWidth="1" />
          <line x1="0" y1="160" x2="200" y2="160" stroke="rgba(52,152,96,0.15)" strokeWidth="1" />
          <line x1="0" y1="240" x2="200" y2="240" stroke="rgba(52,152,96,0.15)" strokeWidth="1" />
          <line x1="60" y1="0" x2="60" y2="410" stroke="rgba(52,152,96,0.15)" strokeWidth="1" />
          <line x1="140" y1="0" x2="140" y2="410" stroke="rgba(52,152,96,0.15)" strokeWidth="1" />
          <path
            d="M40 250 Q 80 180 60 120 T 140 60"
            fill="none"
            stroke="#349860"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.7"
          />
          <circle cx="40" cy="250" r="6" fill="#349860" />
          <circle cx="60" cy="120" r="6" fill="#349860" />
          <circle cx="140" cy="60" r="8" fill="#2a7548" />
        </svg>
        <div className="phone-hud">
          <div className="phone-hud-label">TERRITÓRIO CONQUISTADO</div>
          <div className="phone-hud-val">2,4 km²</div>
        </div>
      </div>
    </div>
  );
}

function CaseStats({ stats }: { stats: readonly { num: string; label: string }[] }) {
  return (
    <div className="case-stats">
      {stats.map((stat) => (
        <div key={stat.label}>
          <div className="case-stat-num">{stat.num}</div>
          <div className="case-stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}

export default function OrbytsLanding() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const revealEls = root.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealEls.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="orbyts-landing" ref={rootRef}>
      <a href="#conteudo-principal" className="skip-link">
        Ir para o conteúdo principal
      </a>

      <header className="site-header">
        <nav aria-label="Navegação principal">
          <div className="wrap">
            <a href="/" className="logo-mark" aria-label="ORBYTS — página inicial">
              <picture>
                <source srcSet="/logo-orbyts.webp" type="image/webp" />
                <img
                  src="/logo-orbyts.png"
                  alt="ORBYTS — empresa de desenvolvimento de software em Porto Alegre"
                  width={360}
                  height={72}
                  fetchPriority="high"
                  decoding="async"
                />
              </picture>
            </a>
            <div className="nav-links">
              {NAV_LINKS.map((link) => (
                <a key={link.href} href={link.href}>
                  {link.label}
                </a>
              ))}
            </div>
            <a href="#contato" className="nav-cta">
              Falar com a ORBYTS
            </a>
          </div>
        </nav>
      </header>

      <main id="conteudo-principal">
      <section className="hero" aria-labelledby="hero-title">
        <div className="wrap">
          <p className="eyebrow-pill">Software House · Porto Alegre, RS</p>
          <h1 id="hero-title">
            Desenvolvimento de software com entrega
            <br />
            <em>no prazo combinado.</em>
          </h1>
          <p className="hero-sub">
            Software house especializada em sistemas web, aplicativos mobile e e-commerce sob medida — com ciclos de
            entrega fixos desde o primeiro dia.
          </p>
          <div className="cta-row">
            <a href="#contato" className="btn-primary">
              Solicitar orçamento
            </a>
            <a href="#projetos" className="btn-link">
              Ver projetos
            </a>
          </div>

          <div className="orbit-stage reveal">
            <div className="orbit-card">
              <svg className="orbit-svg" viewBox="0 0 170 170" aria-hidden="true">
                <circle className="orbit-track" cx="85" cy="85" r="75" />
                <circle className="orbit-progress" cx="85" cy="85" r="75" transform="rotate(-90 85 85)" />
                <text x="85" y="80" className="orbit-center orbit-num">
                  14
                </text>
                <text x="85" y="99" className="orbit-center orbit-label">
                  DIAS
                </text>
              </svg>
              <div className="orbit-copy">
                <div className="orbit-copy-title">1 pacote, ciclos de 7 dias</div>
                <div className="orbit-copy-desc">Você acompanha cada ciclo de execução até o aceite final.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <aside className="trust-strip" aria-label="Diferenciais da ORBYTS">
        <div className="wrap trust-row">
          <div>
            <b>7 dias</b> por ciclo de execução
          </div>
          <div>
            <b>Fila prepaga</b> — sem risco de calote
          </div>
          <div>
            <b>Contrato PJ</b> formalizado
          </div>
          <div>
            <b>Escopo fechado</b> disponível
          </div>
        </div>
      </aside>

      <section className="quote-section" aria-label="Manifesto ORBYTS">
        <div className="wrap">
          <blockquote>
            <p className="quote-text">
              Entrega no prazo não é diferencial de marketing — é a arquitetura do nosso modelo de negócio.
            </p>
            <footer className="quote-attr">— ORBYTS</footer>
          </blockquote>
        </div>
      </section>

      <section className="section" id="servicos" aria-labelledby="servicos-title">
        <div className="wrap">
          <header className="sec-head reveal">
            <p className="sec-eyebrow">O que fazemos</p>
            <h2 className="sec-title" id="servicos-title">
              Desenvolvimento de software em três frentes, <em>um padrão de entrega.</em>
            </h2>
            <p className="sec-desc">
              Cada projeto entra na mesma fila prepaga, sem exceção — é isso que garante o prazo.
            </p>
          </header>
          <div className="services-grid">
            {SERVICES.map((service) => (
              <article key={service.title} className="service-card reveal">
                <div className="service-icon" aria-hidden="true">
                  {service.icon}
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-desc">{service.desc}</p>
                <div className="tag-row">
                  {service.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-soft" id="projetos" aria-labelledby="projetos-title">
        <div className="wrap">
          <header className="sec-head reveal">
            <p className="sec-eyebrow">Projetos</p>
            <h2 className="sec-title" id="projetos-title">
              Da ideia à entrega, <em>documentado passo a passo.</em>
            </h2>
            <p className="sec-desc">Dois cases recentes — do escopo fechado ao app em produção.</p>
          </header>

          <article className="case-feature reveal" aria-labelledby="case-payment-gateway">
            <div className="case-visual">
              <BrowserMockup />
            </div>
            <div className="case-copy">
              <p className="case-tag">Fintech · Escopo Fechado</p>
              <h3 className="case-title" id="case-payment-gateway">
                Payment Gateway
              </h3>
              <p className="case-desc">
                Plataforma de pagamentos sob medida, com quatro modalidades de cobrança e squad dedicado do discovery à
                entrega.
              </p>
              <CaseStats
                stats={[
                  { num: "R$180k+", label: "investimento" },
                  { num: "3 meses", label: "prazo de entrega" },
                  { num: "3", label: "pessoas no squad" },
                ]}
              />
              <div className="case-stack">
                <span className="tag">React</span>
                <span className="tag">Node.js</span>
                <span className="tag">Postgres</span>
              </div>
              <a href="#contato" className="btn-link">
                Falar sobre um projeto parecido
              </a>
            </div>
          </article>

          <article className="case-feature reverse reveal" aria-labelledby="case-orb-run">
            <div className="case-visual">
              <PhoneMockup />
            </div>
            <div className="case-copy">
              <p className="case-tag">Mobile · GPS &amp; Realtime</p>
              <h3 className="case-title" id="case-orb-run">
                Orb Run
              </h3>
              <p className="case-desc">
                App de conquista territorial via GPS — corredor percorre uma rota real e &ldquo;conquista&rdquo; a área
                no mapa, com backend realtime completo.
              </p>
              <CaseStats
                stats={[
                  { num: "8 sem", label: "guia técnico de build" },
                  { num: "15", label: "telas de UI/UX" },
                  { num: "100%", label: "arquitetura documentada" },
                ]}
              />
              <div className="case-stack">
                <span className="tag">Expo</span>
                <span className="tag">Supabase</span>
                <span className="tag">Mapbox</span>
              </div>
              <a href="#contato" className="btn-link">
                Falar sobre um projeto parecido
              </a>
            </div>
          </article>
        </div>
      </section>

      <section className="section" id="como-funciona" aria-labelledby="como-funciona-title">
        <div className="wrap">
          <header className="sec-head reveal">
            <p className="sec-eyebrow">Como funciona</p>
            <h2 className="sec-title" id="como-funciona-title">
              Da fila ao aceite, <em>em três movimentos.</em>
            </h2>
            <p className="sec-desc">Uma sequência real — cada etapa só começa quando a anterior termina.</p>
          </header>
          <div className="flow-grid">
            {FLOW_STEPS.map((step) => (
              <article key={step.n} className="flow-card reveal">
                <div className="flow-ring" aria-hidden="true">
                  {step.n}
                </div>
                <h3 className="flow-title">{step.title}</h3>
                <p className="flow-desc">{step.desc}</p>
                <span className="flow-tag">{step.tag}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <aside className="stack-strip" aria-label="Tecnologias utilizadas">
        <div className="wrap">
          <p className="stack-label">Stack em produção</p>
          <div className="stack-badges">
            {STACK_BADGES.map((badge) => (
              <span key={badge} className="stack-badge">
                {badge}
              </span>
            ))}
          </div>
        </div>
      </aside>

      <section className="final-cta" id="contato" aria-labelledby="contato-title">
        <div className="wrap">
          <div className="reveal">
            <h2 id="contato-title">
              Vamos colocar <em>seu projeto</em> na fila?
            </h2>
            <p>Pacotes a partir de 14 dias de desenvolvimento. Resposta em até 1 dia útil.</p>
            <div className="cta-row">
              <a href="#" className="btn-primary">
                Falar no WhatsApp
              </a>
              <a href="#" className="btn-link">
                Ver pacotes e preços
              </a>
            </div>
          </div>
        </div>
      </section>
      </main>

      <footer>
        <div className="wrap footer-row">
          <p className="footer-left">ORBYTS · Desenvolvimento de Software · Porto Alegre / RS</p>
          <nav className="footer-right" aria-label="Links do rodapé">
            <a href="#servicos">Serviços</a>
            <a href="#projetos">Projetos</a>
            <a href="#contato">Contato</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
