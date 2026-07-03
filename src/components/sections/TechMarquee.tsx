import { TECHNOLOGIES } from "@/lib/constants/technologies";
import styles from "./TechMarquee.module.css";

export function TechMarquee() {
  const items = [...TECHNOLOGIES, ...TECHNOLOGIES];

  return (
    <div className={styles.wrap} aria-hidden="true">
      <div className={styles.track}>
        {items.map((tech, index) => (
          <span key={`${tech}-${index}`} className={styles.item}>
            {tech}
            <span className={styles.dot} />
          </span>
        ))}
      </div>
    </div>
  );
}
