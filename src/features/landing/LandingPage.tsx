import Image from "next/image";
import { OrbytsLogo } from "@/components/ui/OrbytsLogo";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SITE } from "@/config/site";
import {
  AUTHORITY,
  DIFFERENTIALS,
  LP_CONFIG,
  LP_FAQ,
  PROBLEMS,
  SERVICES,
  STEPS,
} from "./content";
import { LandingHeader } from "./LandingHeader";
import { ArrowIcon, LeadForm } from "./LeadForm";
import { CtaLink, SelectServiceLink, ServiceSelectionProvider } from "./ServiceSelection";
import styles from "./landing.module.css";

const pad = (n: number) => String(n).padStart(2, "0");

function ProblemIcon({ name }: { name: string }) {
  const common = {
    width: 28,
    height: 28,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    "aria-hidden": true,
    className: styles.problemIcon,
  } as const;
  if (name === "clock")
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7.5V12l3 2" />
      </svg>
    );
  if (name === "link")
    return (
      <svg {...common}>
        <rect x="2.5" y="8" width="7" height="8" rx="1.5" />
        <rect x="14.5" y="8" width="7" height="8" rx="1.5" />
        <path d="M9.5 12h1.5M13 12h1.5" />
      </svg>
    );
  if (name === "window")
    return (
      <svg {...common}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 9h18M7 13h6" />
      </svg>
    );
  return (
    <svg {...common}>
      <circle cx="6" cy="17" r="2.2" />
      <circle cx="18" cy="7" r="2.2" />
      <path d="M7.8 15.6 16.2 8.4" strokeDasharray="2 2.6" />
    </svg>
  );
}

function ServiceArt({ name }: { name: string }) {
  const svg = { viewBox: "0 0 160 96", fill: "none", "aria-hidden": true, className: styles.serviceArt } as const;
  switch (name) {
    case "site":
      return (
        <svg {...svg}>
          <rect x="1" y="1" width="158" height="94" rx="6" stroke="#454E57" />
          <path d="M1 18h158" stroke="#454E57" />
          <circle cx="12" cy="9.5" r="2" fill="#454E57" />
          <circle cx="20" cy="9.5" r="2" fill="#454E57" />
          <path d="M14 36h70M14 46h52" stroke="#8D959F" strokeWidth="3" strokeLinecap="round" />
          <rect x="14" y="60" width="34" height="12" rx="3" fill="currentColor" />
          <rect x="104" y="30" width="42" height="50" rx="4" stroke="#454E57" />
        </svg>
      );
    case "sistema":
      return (
        <svg {...svg}>
          <rect x="1" y="1" width="158" height="94" rx="6" stroke="#454E57" />
          <path d="M38 1v94" stroke="#454E57" />
          <path d="M10 16h18M10 28h18M10 40h18" stroke="#8D959F" strokeWidth="3" strokeLinecap="round" />
          <path d="M50 22h96M50 42h96M50 62h96M50 82h96" stroke="#2E353C" />
          <path d="M54 32h40M54 52h52M54 72h30" stroke="#8D959F" strokeWidth="3" strokeLinecap="round" />
          <circle cx="138" cy="52" r="4" fill="currentColor" />
        </svg>
      );
    case "plataforma":
      return (
        <svg {...svg}>
          <rect x="1" y="10" width="52" height="40" rx="5" stroke="#454E57" />
          <rect x="107" y="10" width="52" height="40" rx="5" stroke="#454E57" />
          <rect x="54" y="54" width="52" height="40" rx="5" stroke="#8D959F" />
          <path d="M27 50v22h27M133 50v22h-27" stroke="#454E57" />
          <circle cx="80" cy="74" r="5" fill="currentColor" />
          <path d="M10 22h24M116 22h24" stroke="#8D959F" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case "automacao":
      return (
        <svg {...svg}>
          <circle cx="16" cy="48" r="10" stroke="#454E57" />
          <circle cx="80" cy="48" r="12" fill="currentColor" />
          <circle cx="144" cy="22" r="10" stroke="#454E57" />
          <circle cx="144" cy="74" r="10" stroke="#454E57" />
          <path d="M26 48h42M91 42l43-16M91 54l43 16" stroke="#8D959F" />
          <path d="M62 44l6 4-6 4" stroke="#8D959F" />
        </svg>
      );
    default:
      return (
        <svg {...svg}>
          <rect x="1" y="6" width="118" height="76" rx="6" stroke="#454E57" />
          <path d="M12 22h50M12 34h34" stroke="#8D959F" strokeWidth="3" strokeLinecap="round" />
          <rect x="12" y="48" width="44" height="22" rx="3" stroke="#2E353C" />
          <rect x="62" y="48" width="44" height="22" rx="3" stroke="#2E353C" />
          <rect x="118" y="30" width="40" height="64" rx="7" fill="#090B0D" stroke="#8D959F" />
          <path d="M126 46h24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <path d="M126 58h16M126 68h20" stroke="#454E57" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
  }
}

function CheckCircle() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.tableCheck}>
      <circle cx="8" cy="8" r="6.5" />
      <path d="M5.2 8.2l1.9 1.9 3.7-4" />
    </svg>
  );
}

/** Painel ilustrativo do hero — composição demonstrativa, sem métricas. */
function HeroVisual() {
  return (
    <div
      className={styles.visual}
      role="img"
      aria-label="Ilustração de um sistema de gestão com fluxo de etapas de pedidos e painel de integrações entre site, CRM e ERP"
    >
      <div className={styles.visMain} aria-hidden="true">
        <div className={styles.visTop}>
          <div className={styles.visCrumb}>
            <span className={styles.visAppIcon} />
            Operação<span className={styles.visSep}>/</span>
            <strong>Pedidos</strong>
          </div>
          <span className={styles.visTag}>Ilustrativo</span>
        </div>
        <div className={styles.visRow}>
          <div className={styles.visSide}>
            <div className={styles.visSideLabel}>Operação</div>
            <div className={styles.visSideItem}>Visão geral</div>
            <div className={`${styles.visSideItem} ${styles.visSideActive}`}>
              Pedidos<span className={styles.dot} />
            </div>
            <div className={styles.visSideItem}>Clientes</div>
            <div className={styles.visSideItem}>Processos</div>
            <div className={styles.visSideLabel}>Sistema</div>
            <div className={styles.visSideItem}>Integrações</div>
            <div className={styles.visSideItem}>Configurações</div>
          </div>
          <div className={styles.visBody}>
            <div className={styles.visHead}>
              <div>
                <div className={styles.visTitle}>Fluxo de pedidos</div>
                <div className={styles.visSub}>Etapas configuradas para a sua operação</div>
              </div>
              <span className={styles.visButton}>Editar fluxo</span>
            </div>
            <div className={styles.visTabs}>
              <span className={styles.visTabActive}>Todas as etapas</span>
              <span>Em andamento</span>
              <span>Concluídas</span>
            </div>
            <div className={`${styles.tblRow} ${styles.tblHead}`}>
              <span>Etapa</span>
              <span className={styles.colResp}>Responsável</span>
              <span>Status</span>
            </div>
            <div className={styles.tblRow}>
              <span className={styles.tblStep}>
                <CheckCircle />
                Pedido recebido
              </span>
              <span className={styles.colResp}>Site</span>
              <span className={styles.chip}>Automático</span>
            </div>
            <div className={styles.tblRow}>
              <span className={styles.tblStep}>
                <CheckCircle />
                Validação de dados
              </span>
              <span className={styles.colResp}>Integração</span>
              <span className={styles.chip}>Concluída</span>
            </div>
            <div className={`${styles.tblRow} ${styles.tblActive}`}>
              <span className={styles.tblStep}>
                <span className={styles.activeDot}>
                  <span />
                </span>
                Aprovação interna
              </span>
              <span className={styles.colResp}>Comercial</span>
              <span className={`${styles.chip} ${styles.chipActive}`}>Em andamento</span>
            </div>
            <div className={`${styles.tblRow} ${styles.tblMuted}`}>
              <span className={styles.tblStep}>
                <span className={styles.pendingDot} />
                Faturamento e envio
              </span>
              <span className={styles.colResp}>Financeiro</span>
              <span className={styles.chip}>Próxima etapa</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.visSub2} aria-hidden="true">
        <div className={styles.visSub2Head}>
          <strong>Integrações</strong>
          <span>
            <span className={styles.dot} />
            Ativa
          </span>
        </div>
        <div className={styles.visNodes}>
          <span>Site</span>
          <i />
          <span className={styles.visNodeActive}>CRM</span>
          <i />
          <span>ERP</span>
        </div>
        <p>Dados registrados uma vez, disponíveis em todas as ferramentas.</p>
      </div>
    </div>
  );
}

export function LandingPage() {
  const year = new Date().getFullYear();
  const mailto = `mailto:${LP_CONFIG.email}`;

  return (
    <ServiceSelectionProvider>
      <div className={styles.root}>
        <a href="#formulario" className={styles.skipToForm}>
          Ir para o formulário
        </a>
        <LandingHeader />

        <main id="topo">
          {/* 02 HERO */}
          <section aria-labelledby="hero-title" className={styles.heroSection}>
            <div className={`${styles.wrap} ${styles.hero}`}>
              <div>
                <p className={styles.heroEyebrow}>
                  <span className={styles.dot} aria-hidden="true" />
                  Tecnologia para empresas que querem evoluir
                </p>
                <h1 id="hero-title" className={styles.h1}>
                  <span>Sua empresa tem um desafio.</span>{" "}
                  <span>
                    <span className={styles.h1Muted}>Nós desenvolvemos</span> a solução.
                  </span>
                </h1>
                <p className={styles.lead}>
                  Da presença digital à gestão da operação, criamos sites, sistemas e automações sob medida para reduzir
                  trabalho manual, conectar processos e ajudar seu negócio a evoluir.
                </p>
                <div className={styles.heroCtas}>
                  <CtaLink location="hero" className={`${styles.btn} ${styles.btnPrimary}`}>
                    Quero apresentar meu projeto
                    <ArrowIcon />
                  </CtaLink>
                  <a className={`${styles.btn} ${styles.btnSecondary}`} href="#solucoes">
                    Conhecer nossas soluções
                  </a>
                </div>
                <p className={styles.heroServices}>
                  Sites profissionais <span aria-hidden="true">/</span> Sistemas de gestão{" "}
                  <span aria-hidden="true">/</span> Automações <span aria-hidden="true">/</span> Plataformas digitais
                </p>
              </div>
              <HeroVisual />
            </div>
          </section>

          {/* 03 PROBLEMA */}
          <section aria-labelledby="prob-title" className={styles.section}>
            <div className={styles.wrap}>
              <div className={styles.g22Head}>
                <h2 id="prob-title" className={`${styles.h2} ${styles.w16}`}>
                  O que está impedindo sua empresa de dar o próximo passo?
                </h2>
                <p className={styles.muted}>
                  À medida que um negócio cresce, processos improvisados começam a custar tempo, dinheiro e
                  oportunidades.
                </p>
              </div>
              <div className={styles.problems}>
                {PROBLEMS.map((problem, index) => (
                  <div key={problem.title} className={styles.problem}>
                    <span className={styles.num}>{pad(index + 1)}</span>
                    <div>
                      <ProblemIcon name={problem.icon} />
                      <h3 className={styles.h3}>{problem.title}</h3>
                      <p className={styles.muted}>{problem.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <CtaLink location="problema" className={`${styles.btn} ${styles.btnSecondary}`}>
                Quero resolver esse problema
                <ArrowIcon />
              </CtaLink>
            </div>
          </section>

          {/* 04 SOLUÇÕES */}
          <section id="solucoes" aria-labelledby="sol-title" className={`${styles.section} ${styles.sectionAlt}`}>
            <div className={styles.wrap}>
              <p className={styles.eyebrow}>Soluções</p>
              <div className={styles.g22Head}>
                <h2 id="sol-title" className={`${styles.h2} ${styles.w17}`}>
                  Tecnologia pensada para a realidade do seu negócio.
                </h2>
                <p className={styles.muted}>
                  Cada empresa tem necessidades diferentes. Por isso, entendemos o objetivo antes de definir a solução.
                </p>
              </div>
              <div className={styles.servicesTop}>
                {SERVICES.slice(0, 3).map((service) => (
                  <article key={service.id} className={styles.serviceCard}>
                    <ServiceArt name={service.art} />
                    <h3 className={styles.h3}>{service.title}</h3>
                    <p className={styles.muted}>{service.text}</p>
                    <p className={styles.serviceWhen}>
                      <strong>Para quando</strong> {service.when}
                    </p>
                    <SelectServiceLink
                      value={service.value}
                      className={styles.serviceLink}
                      ariaLabel={`Apresentar meu projeto de ${service.title}`}
                    >
                      Apresentar meu projeto <span aria-hidden="true">→</span>
                    </SelectServiceLink>
                  </article>
                ))}
              </div>
              <div className={styles.servicesBottom}>
                {SERVICES.slice(3).map((service) => (
                  <article key={service.id} className={`${styles.serviceCard} ${styles.serviceWide}`}>
                    <ServiceArt name={service.art} />
                    <div className={styles.serviceWideBody}>
                      <h3 className={styles.h3}>{service.title}</h3>
                      <p className={styles.muted}>{service.text}</p>
                      <p className={styles.serviceWhen}>
                        <strong>Para quando</strong> {service.when}
                      </p>
                      <SelectServiceLink
                        value={service.value}
                        className={styles.serviceLink}
                        ariaLabel={`Apresentar meu projeto de ${service.title}`}
                      >
                        Apresentar meu projeto <span aria-hidden="true">→</span>
                      </SelectServiceLink>
                    </div>
                  </article>
                ))}
              </div>
              <div className={styles.servicesFoot}>
                <p className={styles.muted}>
                  Não sabe qual categoria se encaixa? Descreva o problema — nós ajudamos a definir a solução.
                </p>
                <SelectServiceLink value="indefinido" className={`${styles.btn} ${styles.btnPrimary}`}>
                  Apresentar meu projeto à Orbyts
                </SelectServiceLink>
              </div>
            </div>
          </section>

          {/* 05 CASES — seção de projetos existente do site, mantida */}
          <div className={styles.casesTheme}>
            <ProjectsSection />
            <div className={`${styles.wrap} ${styles.casesCta}`}>
              <CtaLink location="portfolio" className={`${styles.btn} ${styles.btnSecondary}`}>
                Quero desenvolver uma solução para minha empresa
                <ArrowIcon />
              </CtaLink>
            </div>
          </div>

          {/* 06 DIFERENCIAIS */}
          <section aria-labelledby="dif-title" className={`${styles.section} ${styles.sectionLine}`}>
            <div className={`${styles.wrap} ${styles.split}`}>
              <div>
                <p className={styles.eyebrow}>Por que a Orbyts</p>
                <h2 id="dif-title" className={`${styles.h2} ${styles.w15}`}>
                  Mais clareza para decidir. Mais direção para desenvolver.
                </h2>
                <p className={`${styles.muted} ${styles.mt32}`}>
                  Não se trata apenas de colocar uma solução no ar. Trata-se de construir algo que faça sentido para a
                  operação e para os objetivos da sua empresa.
                </p>
              </div>
              <div className={styles.diffList}>
                {DIFFERENTIALS.map((item, index) => (
                  <div key={item.title} className={styles.diffItem}>
                    <span className={styles.numGreen}>{pad(index + 1)}</span>
                    <div>
                      <h3 className={styles.h3Small}>{item.title}</h3>
                      <p className={styles.muted}>{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 06b AUTORIDADE */}
          <section aria-labelledby="auth-title" className={`${styles.sectionCompact} ${styles.sectionLine}`}>
            <div className={styles.wrap}>
              <div className={styles.g22Head}>
                <h2 id="auth-title" className={`${styles.h2Small} ${styles.w20}`}>
                  Tecnologia construída com responsabilidade, do planejamento à entrega.
                </h2>
                <p className={styles.muted}>
                  Antes de escrever a primeira linha de código, registramos o que será feito, como será feito e o que
                  você recebe ao final de cada etapa.
                </p>
              </div>
              <div className={styles.auth}>
                {AUTHORITY.map((item) => (
                  <div key={item.title}>
                    <p className={styles.authWhen}>{item.when}</p>
                    <h3 className={styles.h3Small}>{item.title}</h3>
                    <p className={styles.mutedSmall}>{item.text}</p>
                  </div>
                ))}
              </div>
              <dl className={styles.facts}>
                <div>
                  <dt>Empresa</dt>
                  <dd className={styles.factStrong}>{LP_CONFIG.company}</dd>
                </div>
                <div>
                  <dt>Contato comercial</dt>
                  <dd>
                    <a className={styles.inlineLink} href={mailto}>
                      {LP_CONFIG.email}
                    </a>
                  </dd>
                </div>
                {LP_CONFIG.cnpj ? (
                  <div>
                    <dt>CNPJ</dt>
                    <dd className={styles.factStrong}>{LP_CONFIG.cnpj}</dd>
                  </div>
                ) : null}
              </dl>
            </div>
          </section>

          {/* 07 PROCESSO */}
          <section id="como-funciona" aria-labelledby="proc-title" className={`${styles.section} ${styles.sectionAlt}`}>
            <div className={styles.wrap}>
              <p className={styles.eyebrow}>Como funciona</p>
              <h2 id="proc-title" className={`${styles.h2} ${styles.w18}`}>
                Do problema à solução, com um caminho claro.
              </h2>
              <ol className={styles.steps}>
                {STEPS.map((step, index) => (
                  <li key={step.title}>
                    <div className={styles.stepHead}>
                      <span className={index === 0 ? styles.stepNumOn : styles.stepNum}>{pad(index + 1)}</span>
                      <span className={styles.stepLine} aria-hidden="true" />
                    </div>
                    <h3 className={styles.h3Small}>{step.title}</h3>
                    <p className={styles.mutedSmall}>{step.text}</p>
                  </li>
                ))}
              </ol>
              <CtaLink location="processo" className={`${styles.btn} ${styles.btnPrimary}`}>
                Vamos conversar sobre meu projeto
              </CtaLink>
            </div>
          </section>

          {/* 08 FORMULÁRIO */}
          <section id="formulario" aria-labelledby="form-title" className={styles.section}>
            <div className={`${styles.wrap} ${styles.split} ${styles.alignStart}`}>
              <div>
                <p className={styles.eyebrow}>Diagnóstico inicial</p>
                <h2 id="form-title" className={`${styles.h2} ${styles.w16}`}>
                  Conte seu desafio. Vamos encontrar o melhor caminho.
                </h2>
                <p className={`${styles.muted} ${styles.mt24}`}>
                  Descreva o que sua empresa precisa criar, melhorar ou automatizar. Nossa equipe avaliará sua
                  solicitação e entrará em contato para entender os próximos passos.
                </p>
                <ol className={styles.nextList}>
                  <li>
                    <span>1</span>Analisamos as informações enviadas sobre o seu projeto.
                  </li>
                  <li>
                    <span>2</span>Entramos em contato pelo canal que você escolher.
                  </li>
                  <li>
                    <span>3</span>Se fizer sentido para os dois lados, agendamos uma conversa de diagnóstico.
                  </li>
                </ol>
                <p className={styles.fine}>
                  Seus dados são usados apenas para responder à sua solicitação, conforme a LGPD.{" "}
                  {LP_CONFIG.privacyUrl ? (
                    <a className={styles.inlineLink} href={LP_CONFIG.privacyUrl}>
                      Política de privacidade
                    </a>
                  ) : null}
                </p>
              </div>
              <div className={styles.formCard}>
                <LeadForm />
              </div>
            </div>
          </section>

          {/* 09 FAQ */}
          <section aria-labelledby="faq-title" className={`${styles.section} ${styles.sectionLine}`}>
            <div className={`${styles.wrap} ${styles.split}`}>
              <div>
                <h2 id="faq-title" className={`${styles.h2} ${styles.w14}`}>
                  Algumas dúvidas antes de começar.
                </h2>
                <p className={`${styles.muted} ${styles.mt24}`}>
                  Não encontrou o que procurava? Escreva para{" "}
                  <a className={styles.inlineLink} href={mailto}>
                    {LP_CONFIG.email}
                  </a>
                  .
                </p>
              </div>
              <div className={styles.faq}>
                {LP_FAQ.map((item) => (
                  <details key={item.q} className={styles.faqItem}>
                    <summary className={styles.faqQ}>
                      <h3>{item.q}</h3>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" className={styles.faqIcon}>
                        <path d="M9 3v12M3 9h12" />
                      </svg>
                    </summary>
                    <p className={styles.faqA}>{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* 10 CTA FINAL */}
          <section aria-labelledby="cta-title" className={styles.finalCta}>
            <Image
              src="/lp/orbyts-symbol.png"
              alt=""
              aria-hidden="true"
              width={560}
              height={570}
              className={styles.finalSymbol}
              loading="lazy"
            />
            <div className={`${styles.wrap} ${styles.section} ${styles.finalInner}`}>
              <h2 id="cta-title" className={styles.h2Large}>
                O próximo passo da sua empresa pode começar com uma conversa.
              </h2>
              <p className={`${styles.muted} ${styles.mt28} ${styles.w54}`}>
                Conte-nos o que você precisa melhorar, criar ou automatizar. Vamos avaliar o cenário e identificar se a
                Orbyts é a parceira certa para desenvolver essa solução.
              </p>
              <CtaLink location="cta_final" className={`${styles.btn} ${styles.btnPrimary} ${styles.mt40}`}>
                Quero conversar sobre meu projeto
                <ArrowIcon />
              </CtaLink>
            </div>
          </section>
        </main>

        <footer className={styles.footer}>
          <div className={styles.wrap}>
            <div className={styles.footerTop}>
              <div className={styles.footerBrand}>
                <OrbytsLogo className={styles.logo} width={121} height={22} />
                <p>Desenvolvimento de sites, sistemas, plataformas e automações sob medida para empresas.</p>
              </div>
              <div className={styles.footerCols}>
                <nav aria-label="Rodapé">
                  <span className={styles.footerTitle}>Navegação</span>
                  <a href="#solucoes">Soluções</a>
                  <a href="#projetos">Projetos</a>
                  <a href="#como-funciona">Como funciona</a>
                  <CtaLink location="footer">Falar sobre meu projeto</CtaLink>
                </nav>
                <div>
                  <span className={styles.footerTitle}>Contato</span>
                  <a href={mailto}>{LP_CONFIG.email}</a>
                  <a href={SITE.contact.whatsapp} target="_blank" rel="noopener noreferrer">
                    WhatsApp {SITE.contact.phoneDisplay}
                  </a>
                  {LP_CONFIG.socialProfiles.map((url) => (
                    <a key={url} href={url} target="_blank" rel="noopener noreferrer">
                      {new URL(url).hostname.replace("www.", "")}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.footerBottom}>
              <span>
                © {year} {SITE.legalName}. Todos os direitos reservados.
              </span>
              {LP_CONFIG.privacyUrl ? <a href={LP_CONFIG.privacyUrl}>Política de privacidade</a> : null}
            </div>
          </div>
        </footer>
      </div>
    </ServiceSelectionProvider>
  );
}
