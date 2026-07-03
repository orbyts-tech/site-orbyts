import Link from "next/link";
import { FOOTER_LINKS } from "@/lib/constants/content";
import { OrbytsLogoMark } from "@/components/ui/Icons";
import styles from "./Footer.module.css";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <div className={styles.logoMark}>
            <OrbytsLogoMark size={14} />
          </div>
          <h3 className={styles.brandName}>ORBYTS</h3>
          <p className={styles.tagline}>
            Engenharia de software previsível no Rio Grande do Sul. Transformando escopos
            complexos em código de produção.
          </p>
        </div>

        <div className={styles.linksCol}>
          <h4>Serviços</h4>
          <ul>
            {FOOTER_LINKS.services.map((link) => (
              <li key={link.label}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.linksCol}>
          <h4>Empresa</h4>
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
  );
}
