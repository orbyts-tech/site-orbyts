import Link from "next/link";
import { FOOTER_LINKS } from "@/lib/constants/content";
import { OrbytsLogo } from "@/components/ui/OrbytsLogo";
import { SITE } from "@/config/site";
import { WhatsAppFloatingButton } from "./WhatsAppFloatingButton";
import styles from "./Footer.module.css";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.inner}>
          <div className={styles.brand}>
            <OrbytsLogo className={styles.logoImage} />
            <p className={styles.tagline}>{SITE.tagline}</p>
          </div>

          <div className={styles.linksCol}>
            <p className={styles.colTitle}>Serviços</p>
            <ul>
              {FOOTER_LINKS.services.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.linksCol}>
            <p className={styles.colTitle}>Empresa</p>
            <ul>
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>© {year} ORBYTS Tecnologia. Todos os direitos reservados.</span>
          <span>Feito com precisão.</span>
        </div>
      </footer>
      <WhatsAppFloatingButton />
    </>
  );
}
