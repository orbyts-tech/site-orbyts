"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/constants/content";
import { OrbytsLogo } from "@/components/ui/OrbytsLogo";
import {
  OpenProposalButton,
  PROPOSAL_SECTION_HREF,
} from "@/components/proposal/OpenProposalButton";
import { staggerIndex } from "@/lib/motion";
import { useNavbarScroll } from "@/hooks/useNavbarScroll";
import styles from "./Navbar.module.css";

function MenuIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      {isOpen ? (
        <>
          <line x1="6" y1="6" x2="18" y2="18" />
          <line x1="6" y1="18" x2="18" y2="6" />
        </>
      ) : (
        <>
          <line x1="4" y1="7" x2="20" y2="7" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="17" x2="20" y2="17" />
        </>
      )}
    </svg>
  );
}

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isScrolled, isHidden } = useNavbarScroll(isMenuOpen);

  const navClassName = [
    styles.nav,
    isScrolled ? "" : styles.navAtTop,
    isHidden ? styles.navHidden : "",
  ]
    .filter(Boolean)
    .join(" ");

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <nav className={navClassName} aria-label="Navegação principal">
        <Link className={styles.logo} href="/" onClick={closeMenu}>
          <OrbytsLogo className={styles.logoImage} priority />
        </Link>

        <ul className={styles.links}>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>

        <div className={styles.actions}>
          <OpenProposalButton variant="nav" className={styles.cta}>
            <span className={styles.ctaFull}>Solicitar Proposta</span>
            <span className={styles.ctaShort}>Proposta</span>
          </OpenProposalButton>

          <button
            type="button"
            className={styles.menuButton}
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            <MenuIcon isOpen={isMenuOpen} />
          </button>
        </div>
      </nav>

      {isMenuOpen ? (
        <div
          id="mobile-nav"
          className={styles.mobileMenu}
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navegação"
        >
          <div className={styles.mobileBackdrop} onClick={closeMenu} aria-hidden="true" />
          <div className={styles.mobilePanel}>
            <ul className={styles.mobileLinks}>
              {NAV_LINKS.map((link, index) => (
                <li key={link.href} style={staggerIndex(index)}>
                  <Link href={link.href} onClick={closeMenu}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <a href={PROPOSAL_SECTION_HREF} className={styles.mobileCta} onClick={closeMenu}>
              Solicitar Proposta
            </a>
          </div>
        </div>
      ) : null}
    </>
  );
}
