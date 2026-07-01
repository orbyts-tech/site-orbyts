import { useState, useEffect, useRef, useCallback } from "react";

const CSS = `
  :root {
    --bg: #FFFFFF;
    --bg-subtle: #FAFAFA;
    --s1: #F7F7F8;
    --s2: #F0F0F2;
    --bd: rgba(0,0,0,.07);
    --bd-strong: rgba(0,0,0,.12);
    --ac: #3D9668;
    --ac-hover: #358A5C;
    --ac-bg: rgba(61,150,104,.07);
    --ac-bd: rgba(61,150,104,.22);
    --ac-glow: rgba(61,150,104,.14);
    --tx: #0A0A0A;
    --mu: rgba(0,0,0,.48);
    --sf: rgba(0,0,0,.72);
    --shadow-sm: 0 1px 2px rgba(0,0,0,.04), 0 4px 16px rgba(0,0,0,.04);
    --shadow-md: 0 4px 24px rgba(0,0,0,.06), 0 12px 48px rgba(0,0,0,.04);
    --shadow-nav: 0 8px 32px rgba(0,0,0,.06);
  }

  @keyframes orb0 {
    from { transform: rotateX(72deg) rotateZ(0deg); }
    to   { transform: rotateX(72deg) rotateZ(360deg); }
  }
  @keyframes orb1 {
    from { transform: rotateY(60deg) rotateX(72deg) rotateZ(0deg); }
    to   { transform: rotateY(60deg) rotateX(72deg) rotateZ(360deg); }
  }
  @keyframes orb2 {
    from { transform: rotateY(120deg) rotateX(72deg) rotateZ(0deg); }
    to   { transform: rotateY(120deg) rotateX(72deg) rotateZ(360deg); }
  }
  @keyframes npulse {
    0%,100% { box-shadow: 0 0 0 0 rgba(61,150,104,.35), 0 0 12px rgba(61,150,104,.2); }
    50%     { box-shadow: 0 0 0 12px rgba(61,150,104,0), 0 0 28px rgba(61,150,104,.3); }
  }
  @keyframes orbyts-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  @keyframes orbyts-fadeup { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }

  .orbyts-fu {
    opacity: 0;
    transform: translateY(18px);
    transition: opacity .7s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1);
  }
  .orbyts-fu.in { opacity: 1; transform: translateY(0); }

  .orbyts-scene {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 680px;
    height: 680px;
    transform: translate(-50%,-50%);
    perspective: 700px;
    transform-style: preserve-3d;
    pointer-events: none;
    opacity: .85;
  }
  .orbyts-ring { position: absolute; border-radius: 50%; transform-style: preserve-3d; top: 50%; left: 50%; }
  .orbyts-r0 { width: 680px; height: 680px; margin: -340px 0 0 -340px; border: 1px solid rgba(61,150,104,.18); animation: orb0 12s linear infinite; }
  .orbyts-r1 { width: 480px; height: 480px; margin: -240px 0 0 -240px; border: 1px solid rgba(61,150,104,.12); animation: orb1 16s linear infinite reverse; }
  .orbyts-r2 { width: 300px; height: 300px; margin: -150px 0 0 -150px; border: 1.5px solid rgba(61,150,104,.28); animation: orb2 22s linear infinite; }
  .orbyts-nucleus {
    position: absolute; top: 50%; left: 50%; width: 8px; height: 8px;
    border-radius: 50%; background: var(--ac); transform: translate(-50%,-50%);
    animation: npulse 3.5s ease-in-out infinite;
  }

  .orbyts-hero-grid {
    position: absolute; inset: 0; pointer-events: none;
    background-image:
      radial-gradient(circle at 1px 1px, rgba(0,0,0,.04) 1px, transparent 0);
    background-size: 32px 32px;
    mask-image: radial-gradient(ellipse 70% 60% at 50% 45%, black 20%, transparent 75%);
  }

  .orbyts-mq { display: flex; width: max-content; animation: orbyts-marquee 28s linear infinite; }
  .orbyts-mq:hover { animation-play-state: paused; }

  .orbyts-svc { transition: background .25s; border-radius: 12px; margin: 0 -16px; padding-left: 16px !important; padding-right: 16px !important; }
  .orbyts-svc:hover { background: var(--s1); }
  .orbyts-svc:hover .svc-num-el { color: var(--ac); }
  .orbyts-svc:hover .svc-arr-el { transform: translate(4px,-4px); color: var(--ac); }
  .svc-arr-el { display: inline-block; transition: transform .3s cubic-bezier(.16,1,.3,1), color .22s; color: var(--mu); }
  .svc-num-el { transition: color .22s; color: var(--mu); }
  .orbyts-svc-body { animation: orbyts-fadeup .28s ease; }

  .orbyts-pc {
    transition: border-color .3s, transform .4s cubic-bezier(.16,1,.3,1), box-shadow .4s;
    box-shadow: var(--shadow-sm);
  }
  .orbyts-pc:hover {
    border-color: var(--ac-bd);
    transform: translateY(-3px);
    box-shadow: var(--shadow-md);
  }

  .orbyts-wrd { opacity: .12; transition: opacity .4s, color .4s; }
  .orbyts-wrd.lit { opacity: 1; color: var(--tx); }

  .orbyts-nav-link { color: var(--mu); text-decoration: none; font-size: 14px; font-family: 'Jura', sans-serif; transition: color .2s; }
  .orbyts-nav-link:hover { color: var(--tx); }

  .orbyts-btn-primary {
    display: inline-flex; align-items: center; gap: 8px;
    background: var(--ac); color: #fff;
    font-family: 'Outfit', sans-serif; font-weight: 600; font-size: 15px;
    padding: 14px 32px; border-radius: 100px; text-decoration: none;
    border: none; cursor: pointer;
    transition: background .2s, transform .2s, box-shadow .2s;
    box-shadow: 0 2px 8px rgba(61,150,104,.22);
  }
  .orbyts-btn-primary:hover { background: var(--ac-hover); transform: translateY(-1px); box-shadow: 0 4px 16px rgba(61,150,104,.28); }

  .orbyts-btn-ghost {
    display: inline-flex; align-items: center; gap: 8px;
    background: #fff; color: var(--tx);
    font-family: 'Outfit', sans-serif; font-weight: 500; font-size: 15px;
    padding: 14px 32px; border-radius: 100px; text-decoration: none;
    border: 1px solid var(--bd-strong); cursor: pointer;
    transition: border-color .2s, transform .2s, background .2s;
  }
  .orbyts-btn-ghost:hover { border-color: rgba(0,0,0,.2); background: var(--s1); transform: translateY(-1px); }

  .orbyts-step {
    position: relative; padding: 28px; border-radius: 20px;
    background: #fff; border: 1px solid var(--bd);
    transition: border-color .3s, box-shadow .3s;
  }
  .orbyts-step:hover { border-color: var(--ac-bd); box-shadow: var(--shadow-sm); }

  .orbyts-mobile-menu { display: none; }
  @media (max-width: 860px) {
    .orbyts-nav-links, .orbyts-nav-cta { display: none !important; }
    .orbyts-mobile-menu { display: flex; }
    .orbyts-stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
    .orbyts-about-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
    .orbyts-works-grid { grid-template-columns: 1fr !important; grid-template-rows: auto !important; }
    .orbyts-pc { grid-column: span 1 !important; grid-row: span 1 !important; min-height: 200px; }
    .orbyts-footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
    .orbyts-process-steps { grid-template-columns: 1fr !important; }
    .orbyts-scene { width: 420px; height: 420px; opacity: .6; }
    .orbyts-r0 { width: 420px; height: 420px; margin: -210px 0 0 -210px; }
    .orbyts-r1 { width: 300px; height: 300px; margin: -150px 0 0 -150px; }
    .orbyts-r2 { width: 190px; height: 190px; margin: -95px 0 0 -95px; }
  }
  @media (max-width: 480px) {
    .orbyts-stats-grid { grid-template-columns: 1fr !important; }
    .orbyts-footer-grid { grid-template-columns: 1fr !important; }
    .orbyts-hero-btns { flex-direction: column; align-items: stretch !important; }
    .orbyts-hero-btns a { justify-content: center; }
  }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(61,150,104,.25); border-radius: 4px; }
`;

function OrbytesLogoIcon({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none" aria-hidden="true">
      <circle cx="22" cy="22" r="19.5" stroke="#3D9668" strokeWidth="1.6" />
      <circle
        cx="22"
        cy="22"
        r="12.5"
        stroke="#3D9668"
        strokeWidth="1.6"
        strokeDasharray="65 13"
        strokeDashoffset="-8"
        strokeLinecap="round"
      />
      <circle cx="22" cy="22" r="5.5" stroke="#3D9668" strokeWidth="1.6" />
    </svg>
  );
}

const SERVICES = [
  {
    n: "MVPs & Produtos Digitais",
    d: "Da ideia ao produto validado em semanas. Priorizamos velocidade e aprendizado real de mercado antes de escalar.",
    tags: ["React 19", "Node.js", "Supabase", "TypeScript"],
  },
  {
    n: "Plataformas SaaS",
    d: "Arquitetura multi-tenant, billing recorrente e dashboards que os seus clientes vão usar todo dia.",
    tags: ["Multi-tenant", "Stripe", "Auth", "Analytics"],
  },
  {
    n: "Apps Mobile",
    d: "Experiências nativas para iOS e Android com uma única codebase. Do protótipo às stores.",
    tags: ["React Native", "Expo", "Push", "App Store"],
  },
  {
    n: "Automações & Integrações",
    d: "Conectamos seus sistemas, eliminamos retrabalho e entregamos pipelines que rodam sozinhos.",
    tags: ["n8n", "Webhooks", "OpenAI", "Zapier"],
  },
] as const;

const STATS = [
  { v: "50+", l: "Projetos entregues" },
  { v: "R$2M+", l: "Receita gerada para clientes" },
  { v: "3 sem", l: "Tempo médio de MVP" },
  { v: "98%", l: "Satisfação dos clientes" },
];

const WORKS = [
  {
    title: "ClinicAI",
    cat: "SaaS · Saúde",
    desc: "Gestão clínica com IA integrada e prontuário digital",
    accent: "#E8F5EE",
    col: 2,
    row: 2,
  },
  {
    title: "PagFlow",
    cat: "Fintech",
    desc: "Pagamentos recorrentes e split inteligente",
    accent: "#EDF0F8",
    col: 1,
    row: 1,
  },
  {
    title: "StockBot",
    cat: "Automação",
    desc: "Estoque em tempo real com alertas",
    accent: "#F5EDE8",
    col: 1,
    row: 1,
  },
  {
    title: "Imovix",
    cat: "PropTech · CRM",
    desc: "Plataforma mobile-first para imobiliárias",
    accent: "#E8F2ED",
    col: 2,
    row: 1,
  },
  {
    title: "EduLaunch",
    cat: "EdTech",
    desc: "Cursos ao vivo gamificados",
    accent: "#F0E8F5",
    col: 1,
    row: 1,
  },
];

const PROCESS_STEPS = [
  { n: "01", title: "Descoberta", desc: "Entendemos o problema, o mercado e o que sucesso significa para você." },
  { n: "02", title: "Arquitetura", desc: "Definimos escopo, stack e fases com prazo e custo transparentes." },
  { n: "03", title: "Construção", desc: "Sprints curtos com entregas visíveis e feedback contínuo." },
  { n: "04", title: "Lançamento", desc: "Deploy, métricas e iteração até o produto gerar resultado real." },
];

const MQ_WORDS = ["Construir", "Lançar", "Escalar", "Inovar", "Automatizar", "Crescer"];
const REVEAL_TEXT =
  "Você traz a ideia. Nós fazemos as perguntas certas, desenhamos a arquitetura ideal, entregamos em fases com código limpo — e só paramos quando o produto está gerando resultado real para o seu negócio.";

const NAV_LINKS = [
  { label: "Serviços", href: "#servicos" },
  { label: "Trabalhos", href: "#trabalhos" },
  { label: "Processo", href: "#processo" },
  { label: "Contato", href: "#contato" },
] as const;

export default function OrbytsLanding() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [openSvc, setOpenSvc] = useState<number | null>(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const wordRevRef = useRef<HTMLParagraphElement>(null);

  const initObserver = useCallback(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); }),
      { threshold: 0.1, rootMargin: "0px 0px -24px 0px" }
    );
    document.querySelectorAll(".orbyts-fu:not(.in)").forEach((el) => io.observe(el));
    return io;
  }, []);

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    const io = initObserver();

    if (wordRevRef.current) {
      const words = wordRevRef.current.querySelectorAll<HTMLSpanElement>(".orbyts-wrd");
      new IntersectionObserver(
        ([en]) => {
          if (en.isIntersecting) words.forEach((w, i) => setTimeout(() => w.classList.add("lit"), i * 55));
        },
        { threshold: 0.35 }
      ).observe(wordRevRef.current);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, [initObserver]);

  useEffect(() => {
    initObserver();
  }, [openSvc, initObserver]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const s = {
    wrap: { maxWidth: 1120, margin: "0 auto", padding: "0 24px" } as React.CSSProperties,
    eye: {
      fontSize: 12,
      color: "var(--ac)",
      letterSpacing: ".14em",
      textTransform: "uppercase" as const,
      fontFamily: "'Jura', sans-serif",
      fontWeight: 500,
      marginBottom: 20,
    } as React.CSSProperties,
    secTitle: {
      fontFamily: "'Outfit', sans-serif",
      fontWeight: 700,
      fontSize: "clamp(1.9rem,3.2vw,3rem)",
      lineHeight: 1.12,
      letterSpacing: "-.03em",
      color: "var(--tx)",
    } as React.CSSProperties,
    tag: {
      background: "var(--ac-bg)",
      color: "var(--ac)",
      border: "1px solid var(--ac-bd)",
      borderRadius: 100,
      padding: "5px 14px",
      fontSize: 12,
      fontFamily: "'Jura', sans-serif",
      fontWeight: 500,
    } as React.CSSProperties,
  };

  return (
    <>
      <style>{CSS}</style>
      <div
        style={{
          background: "var(--bg)",
          color: "var(--tx)",
          fontFamily: "'Jura', sans-serif",
          overflowX: "hidden",
        }}
      >
        {/* NAV */}
        <header>
          <nav
            aria-label="Principal"
            style={{
              position: "fixed",
              top: 16,
              left: "50%",
              transform: "translateX(-50%)",
              width: "calc(100% - 32px)",
              maxWidth: 1080,
              zIndex: 1000,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: navScrolled ? "rgba(255,255,255,.88)" : "rgba(255,255,255,.72)",
                backdropFilter: "blur(20px) saturate(180%)",
                WebkitBackdropFilter: "blur(20px) saturate(180%)",
                border: `1px solid ${navScrolled ? "var(--bd)" : "rgba(0,0,0,.05)"}`,
                borderRadius: 100,
                padding: "12px 22px",
                transition: "background .35s, box-shadow .35s, border-color .35s",
                boxShadow: navScrolled ? "var(--shadow-nav)" : "none",
              }}
            >
              <a href="#" style={{ display: "flex", alignItems: "center", textDecoration: "none" }} aria-label="ORBYTS — início">
                <img src="/logo-orbyts.png" alt="ORBYTS" style={{ height: 22, width: "auto" }} />
              </a>

              <div className="orbyts-nav-links" style={{ display: "flex", gap: 32 }}>
                {NAV_LINKS.map((l) => (
                  <a key={l.label} href={l.href} className="orbyts-nav-link">
                    {l.label}
                  </a>
                ))}
              </div>

              <a href="#contato" className="orbyts-nav-cta orbyts-btn-primary" style={{ fontSize: 13, padding: "9px 20px" }}>
                Iniciar Projeto →
              </a>

              <button
                type="button"
                className="orbyts-mobile-menu"
                aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen(!mobileOpen)}
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  border: "1px solid var(--bd)",
                  background: "#fff",
                  cursor: "pointer",
                  fontSize: 18,
                  color: "var(--tx)",
                }}
              >
                {mobileOpen ? "✕" : "☰"}
              </button>
            </div>
          </nav>

          {mobileOpen && (
            <div
              role="dialog"
              aria-modal="true"
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 999,
                background: "rgba(255,255,255,.97)",
                backdropFilter: "blur(12px)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 28,
              }}
            >
              {NAV_LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: 28,
                    fontWeight: 600,
                    color: "var(--tx)",
                    textDecoration: "none",
                    letterSpacing: "-.02em",
                  }}
                >
                  {l.label}
                </a>
              ))}
              <a href="#contato" className="orbyts-btn-primary" onClick={() => setMobileOpen(false)} style={{ marginTop: 12 }}>
                Iniciar Projeto →
              </a>
            </div>
          )}
        </header>

        {/* HERO */}
        <section
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
            padding: "120px 24px 88px",
            textAlign: "center",
            background: "linear-gradient(180deg, #fff 0%, var(--bg-subtle) 100%)",
          }}
        >
          <div className="orbyts-hero-grid" aria-hidden="true" />
          <div className="orbyts-scene" aria-hidden="true">
            <div className="orbyts-ring orbyts-r0" />
            <div className="orbyts-ring orbyts-r1" />
            <div className="orbyts-ring orbyts-r2" />
            <div className="orbyts-nucleus" />
          </div>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(ellipse 55% 50% at 50% 42%, transparent 10%, #fff 72%)",
              pointerEvents: "none",
            }}
          />

          <div style={{ position: "relative", zIndex: 2, maxWidth: 860 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "var(--ac-bg)",
                border: "1px solid var(--ac-bd)",
                borderRadius: 100,
                padding: "7px 18px",
                marginBottom: 32,
                fontSize: 13,
                color: "var(--ac)",
                fontFamily: "'Jura', sans-serif",
                fontWeight: 500,
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "var(--ac)",
                  flexShrink: 0,
                  boxShadow: "0 0 0 3px rgba(61,150,104,.2)",
                }}
              />
              Software house brasileira · Disponível para novos projetos
            </div>

            <h1
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(2.4rem,5.2vw,4.8rem)",
                lineHeight: 1.06,
                letterSpacing: "-.035em",
                marginBottom: 22,
                color: "var(--tx)",
              }}
            >
              Software que coloca
              <br />
              seu negócio <span style={{ color: "var(--ac)" }}>em órbita</span>
            </h1>

            <p
              style={{
                fontSize: "clamp(1rem,1.8vw,1.125rem)",
                color: "var(--sf)",
                maxWidth: 520,
                margin: "0 auto 40px",
                lineHeight: 1.75,
                fontWeight: 400,
              }}
            >
              MVPs, SaaS, apps e automações — da ideia ao produto em produção com código limpo, prazo real e resultado mensurável.
            </p>

            <div className="orbyts-hero-btns" style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="#trabalhos" className="orbyts-btn-primary">
                Ver nossos trabalhos
              </a>
              <a href="#contato" className="orbyts-btn-ghost">
                Falar com especialista →
              </a>
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              bottom: 36,
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: 11,
              letterSpacing: ".18em",
              textTransform: "uppercase",
              color: "var(--mu)",
              fontFamily: "'Jura', sans-serif",
            }}
            aria-hidden="true"
          >
            scroll ↓
          </div>
        </section>

        {/* STATS */}
        <div style={{ ...s.wrap, paddingBottom: 88 }}>
          <div className="orbyts-stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
            {STATS.map((st, i) => (
              <div
                key={st.l}
                className="orbyts-fu"
                style={{
                  background: "#fff",
                  border: "1px solid var(--bd)",
                  borderRadius: 20,
                  padding: "30px 26px",
                  transitionDelay: `${i * 0.07}s`,
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 800,
                    fontSize: "clamp(1.9rem,3.2vw,2.6rem)",
                    lineHeight: 1,
                    letterSpacing: "-.04em",
                    color: "var(--ac)",
                  }}
                >
                  {st.v}
                </div>
                <div style={{ fontSize: 14, color: "var(--mu)", marginTop: 10, fontWeight: 400 }}>{st.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ABOUT */}
        <div style={{ ...s.wrap, padding: "72px 24px" }}>
          <div className="orbyts-about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "start" }}>
            <div className="orbyts-fu">
              <div style={s.eye}>Quem somos</div>
              <h2 style={s.secTitle}>
                Da ideia ao produto.
                <br />
                Sem rodeios.
              </h2>
            </div>
            <div className="orbyts-fu" style={{ paddingTop: 36, transitionDelay: ".1s" }}>
              <p style={{ fontSize: 16, color: "var(--sf)", lineHeight: 1.8, fontWeight: 400, marginBottom: 20 }}>
                A ORBYTS é uma software house que transforma ideias em produtos digitais que funcionam — com velocidade de startup e consistência de time sênior.
              </p>
              <p style={{ fontSize: 16, color: "var(--mu)", lineHeight: 1.8, fontWeight: 400 }}>
                Atendemos founders e empresas de médio porte que precisam de execução técnica de alto nível, sem gerenciar time interno ou surpresas de prazo.
              </p>
            </div>
          </div>
        </div>

        {/* SERVICES */}
        <div id="servicos" style={{ ...s.wrap, padding: "72px 24px" }}>
          <div className="orbyts-fu" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 36, flexWrap: "wrap", gap: 12 }}>
            <h2 style={s.secTitle}>O que fazemos</h2>
            <span style={{ color: "var(--mu)", fontSize: 13, fontFamily: "'Jura', sans-serif" }}>4 serviços core</span>
          </div>
          {SERVICES.map((sv, i) => (
            <div
              key={sv.n}
              className="orbyts-svc orbyts-fu"
              role="button"
              tabIndex={0}
              aria-expanded={openSvc === i}
              style={{
                borderTop: "1px solid var(--bd)",
                ...(i === SERVICES.length - 1 ? { borderBottom: "1px solid var(--bd)" } : {}),
                padding: "24px 0",
                cursor: "pointer",
                transitionDelay: `${i * 0.06}s`,
              }}
              onClick={() => setOpenSvc(openSvc === i ? null : i)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setOpenSvc(openSvc === i ? null : i);
                }
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                  <span className="svc-num-el" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: ".08em", minWidth: 22 }}>
                    0{i + 1}
                  </span>
                  <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: "clamp(1.05rem,1.7vw,1.4rem)", letterSpacing: "-.02em", color: "var(--tx)" }}>
                    {sv.n}
                  </span>
                </div>
                <span className="svc-arr-el" style={{ fontSize: 18 }}>
                  {openSvc === i ? "↓" : "↗"}
                </span>
              </div>
              {openSvc === i && (
                <div className="orbyts-svc-body" style={{ marginLeft: 42, marginTop: 14, paddingBottom: 4 }}>
                  <p style={{ fontSize: 15, color: "var(--sf)", lineHeight: 1.75, marginBottom: 14, fontWeight: 400 }}>{sv.d}</p>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {sv.tags.map((t) => (
                      <span key={t} style={s.tag}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* WORKS */}
        <div id="trabalhos" style={{ ...s.wrap, padding: "72px 24px" }}>
          <div className="orbyts-fu" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32, flexWrap: "wrap", gap: 12 }}>
            <h2 style={s.secTitle}>Trabalhos</h2>
            <a href="#contato" style={{ color: "var(--ac)", fontSize: 14, textDecoration: "none", fontFamily: "'Jura', sans-serif", fontWeight: 500 }}>
              Ver todos →
            </a>
          </div>
          <div
            className="orbyts-works-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gridTemplateRows: "repeat(3,196px)",
              gap: 16,
              gridAutoFlow: "dense",
            }}
          >
            {WORKS.map((w, i) => (
              <div
                key={w.title}
                className="orbyts-pc orbyts-fu"
                style={{
                  gridColumn: `span ${w.col}`,
                  gridRow: `span ${w.row}`,
                  background: `linear-gradient(145deg, ${w.accent} 0%, #fff 60%)`,
                  borderRadius: 20,
                  border: "1px solid var(--bd)",
                  overflow: "hidden",
                  padding: 28,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  position: "relative",
                  cursor: "pointer",
                  transitionDelay: `${i * 0.05}s`,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 24,
                    right: 24,
                    opacity: 0.35,
                  }}
                  aria-hidden="true"
                >
                  <OrbytesLogoIcon size={w.col === 2 && w.row === 2 ? 48 : 32} />
                </div>
                <div>
                  <div style={{ fontSize: 11, color: "var(--ac)", fontFamily: "'Jura', sans-serif", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 8, fontWeight: 500 }}>
                    {w.cat}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 700,
                      fontSize: w.col === 2 && w.row === 2 ? 28 : 20,
                      letterSpacing: "-.02em",
                      marginBottom: 6,
                      color: "var(--tx)",
                    }}
                  >
                    {w.title}
                  </div>
                  <div style={{ fontSize: 13, color: "var(--mu)", fontFamily: "'Jura', sans-serif", lineHeight: 1.5 }}>{w.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MARQUEE */}
        <div style={{ borderTop: "1px solid var(--bd)", borderBottom: "1px solid var(--bd)", padding: "48px 0", overflow: "hidden", background: "var(--bg-subtle)" }} aria-hidden="true">
          <div className="orbyts-mq">
            {[...MQ_WORDS, ...MQ_WORDS].map((w, i) => (
              <div key={`${w}-${i}`} style={{ display: "flex", alignItems: "center", gap: 24, paddingRight: 24 }}>
                <span
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 700,
                    fontSize: "clamp(1.6rem,3.5vw,3.2rem)",
                    letterSpacing: "-.03em",
                    whiteSpace: "nowrap",
                    ...(i % 2 === 0
                      ? { color: "var(--tx)" }
                      : { color: "transparent", WebkitTextStroke: "1px rgba(0,0,0,.12)" }),
                  }}
                >
                  {w}
                </span>
                <span style={{ color: "var(--ac)", fontSize: 20, flexShrink: 0 }}>✦</span>
              </div>
            ))}
          </div>
        </div>

        {/* PROCESS STEPS */}
        <div id="processo" style={{ ...s.wrap, padding: "96px 24px 72px" }}>
          <div className="orbyts-fu" style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ ...s.eye, marginBottom: 16 }}>Como trabalhamos</div>
            <h2 style={{ ...s.secTitle, maxWidth: 520, margin: "0 auto" }}>Processo claro, entrega previsível</h2>
          </div>
          <div className="orbyts-process-steps orbyts-fu" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 72 }}>
            {PROCESS_STEPS.map((step) => (
              <div key={step.n} className="orbyts-step">
                <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 13, color: "var(--ac)", letterSpacing: ".06em", marginBottom: 12 }}>
                  {step.n}
                </div>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 18, letterSpacing: "-.02em", marginBottom: 8, color: "var(--tx)" }}>
                  {step.title}
                </div>
                <p style={{ fontSize: 14, color: "var(--mu)", lineHeight: 1.65, fontWeight: 400 }}>{step.desc}</p>
              </div>
            ))}
          </div>

          <p
            ref={wordRevRef}
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 500,
              fontSize: "clamp(1.2rem,2.4vw,2rem)",
              lineHeight: 1.6,
              letterSpacing: "-.02em",
              maxWidth: 780,
              margin: "0 auto",
              textAlign: "center",
              color: "var(--mu)",
            }}
          >
            {REVEAL_TEXT.split(" ").map((w, i) => (
              <span key={i} className="orbyts-wrd">
                {w}{" "}
              </span>
            ))}
          </p>
        </div>

        {/* TESTIMONIAL */}
        <div style={{ ...s.wrap, paddingBottom: 88 }}>
          <div
            className="orbyts-fu"
            style={{
              background: "#fff",
              border: "1px solid var(--bd)",
              borderRadius: 24,
              padding: "40px 44px",
              maxWidth: 680,
              margin: "0 auto",
              boxShadow: "var(--shadow-md)",
            }}
          >
            <div style={{ fontSize: 48, fontFamily: "'Outfit', sans-serif", lineHeight: 0.8, color: "var(--ac)", marginBottom: 20, opacity: 0.7 }}>"</div>
            <p style={{ fontSize: 18, lineHeight: 1.78, marginBottom: 28, fontWeight: 400, color: "var(--sf)" }}>
              A ORBYTS entregou nosso MVP em 3 semanas com código limpo e zero drama. O produto converteu desde o primeiro dia. É o time técnico que todo founder quer ter in-house.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, var(--ac), #2A6B47)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 800,
                  fontSize: 16,
                  color: "#fff",
                  flexShrink: 0,
                }}
              >
                M
              </div>
              <div>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: 15, color: "var(--tx)" }}>Marco Aurélio</div>
                <div style={{ color: "var(--mu)", fontSize: 13, marginTop: 2 }}>CEO, ClinicAI</div>
              </div>
              <div style={{ marginLeft: "auto", color: "var(--ac)", fontSize: 14, letterSpacing: 1 }}>★★★★★</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <section
          id="contato"
          style={{
            padding: "100px 24px 120px",
            textAlign: "center",
            position: "relative",
            background: "linear-gradient(180deg, var(--bg-subtle) 0%, #fff 100%)",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              width: 500,
              height: 240,
              background: "radial-gradient(ellipse, var(--ac-glow) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div style={{ maxWidth: 620, margin: "0 auto", position: "relative" }}>
            <div style={{ ...s.eye, marginBottom: 24 }}>Pronto para começar?</div>
            <h2
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(2.2rem,4.8vw,4.2rem)",
                letterSpacing: "-.04em",
                lineHeight: 1.05,
                marginBottom: 22,
                color: "var(--tx)",
              }}
            >
              Seu próximo produto
              <br />
              começa aqui.
            </h2>
            <p style={{ fontSize: 16, color: "var(--mu)", lineHeight: 1.75, marginBottom: 40, fontWeight: 400 }}>
              Conversa sem compromisso. Em 30 minutos entendemos sua ideia e te dizemos exatamente o que é possível construir.
            </p>
            <a href="mailto:contato@orbyts.com.br" className="orbyts-btn-primary" style={{ fontSize: 16, padding: "16px 44px" }}>
              Agendar conversa gratuita →
            </a>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{ borderTop: "1px solid var(--bd)", padding: "56px 0 32px", background: "#fff" }}>
          <div style={s.wrap}>
            <div className="orbyts-footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 48 }}>
              <div>
                <div style={{ marginBottom: 16 }}>
                  <img src="/logo-orbyts.png" alt="ORBYTS" style={{ height: 20, width: "auto" }} />
                </div>
                <p style={{ color: "var(--mu)", fontSize: 14, lineHeight: 1.75, maxWidth: 260, fontWeight: 400 }}>
                  Software house brasileira especializada em MVPs, SaaS e automações para founders e empresas de médio porte.
                </p>
              </div>
              {[
                { title: "Serviços", items: ["MVPs", "Plataformas SaaS", "Apps Mobile", "Automações"] },
                { title: "Empresa", items: ["Sobre nós", "Trabalhos", "Processo", "Blog"] },
                { title: "Contato", items: ["WhatsApp", "E-mail", "Instagram", "LinkedIn"] },
              ].map((col) => (
                <div key={col.title}>
                  <div
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 600,
                      fontSize: 11,
                      letterSpacing: ".12em",
                      textTransform: "uppercase",
                      color: "var(--mu)",
                      marginBottom: 16,
                    }}
                  >
                    {col.title}
                  </div>
                  {col.items.map((item) => (
                    <a key={item} href="#contato" className="orbyts-nav-link" style={{ display: "block", marginBottom: 10, fontSize: 14, color: "var(--sf)" }}>
                      {item}
                    </a>
                  ))}
                </div>
              ))}
            </div>
            <div style={{ paddingTop: 20, borderTop: "1px solid var(--bd)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
              <span style={{ color: "var(--mu)", fontSize: 13 }}>© 2026 ORBYTS — GL Tech Soluções Digitais. Todos os direitos reservados.</span>
              <span style={{ color: "var(--mu)", fontSize: 13 }}>Brasil 🇧🇷</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
