import styles from "./AmbientBackground.module.css";

export function AmbientBackground() {
  return (
    <div className={styles.ambient} aria-hidden="true">
      <div className={styles.mesh} />
      <div className={`${styles.ribbon} ${styles.ribbonOne}`} />
      <div className={`${styles.ribbon} ${styles.ribbonTwo}`} />
      <div className={`${styles.ribbon} ${styles.ribbonThree}`} />
      <div className={styles.shine} />
      <div className={styles.noise} />
    </div>
  );
}
