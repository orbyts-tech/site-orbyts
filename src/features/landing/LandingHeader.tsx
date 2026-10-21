"use client";

import { useState } from "react";
import { OrbytsLogo } from "@/components/ui/OrbytsLogo";
import { CtaLink } from "./ServiceSelection";
import styles from "./landing.module.css";

const NAV = [
  { href: "#solucoes", label: "Soluções" },
  { href: "#projetos", label: "Projetos" },
  { href: "#como-funciona", label: "Como funciona" },
] as const;

export function LandingHeader() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className={styles.header}>
      <div className={`${styles.wrap} ${styles.headerBar}`}>
        <a href="#topo" aria-label="Orbyts — início" className={styles.logoLink}>
          <OrbytsLogo className={styles.logo} width={132} height={24} priority />
        </a>
        <nav aria-label="Principal" className={styles.navLinks}>
          {NAV.map((item) => (
            <a key={item.href} className={styles.navLink} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className={styles.headerActions}>
          <CtaLink location="header" className={`${styles.btn} ${styles.btnPrimary} ${styles.btnSmall} ${styles.headerCta}`}>
            Falar sobre meu projeto
          </CtaLink>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnSecondary} ${styles.menuButton}`}
            aria-expanded={open}
            aria-controls="lp-menu"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((current) => !current)}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              {open ? <path d="M4 4l10 10M14 4L4 14" /> : <path d="M2 5h14M2 9h14M2 13h14" />}
            </svg>
          </button>
        </div>
      </div>
      {open ? (
        <div id="lp-menu" className={`${styles.wrap} ${styles.mobileMenu}`}>
          {NAV.map((item) => (
            <a key={item.href} className={styles.navLink} href={item.href} onClick={close}>
              {item.label}
            </a>
          ))}
          <CtaLink location="mobile_menu" className={`${styles.btn} ${styles.btnPrimary}`} onNavigate={close}>
            Falar sobre meu projeto
          </CtaLink>
        </div>
      ) : null}
    </header>
  );
}
