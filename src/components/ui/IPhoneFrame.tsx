import Image from "next/image";
import styles from "./IPhoneFrame.module.css";

interface IPhoneFrameProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  liveUrl?: string;
  isActive?: boolean;
  showHint?: boolean;
  size?: "default" | "large";
  interactive?: boolean;
  onIframeLoad?: () => void;
}

export function IPhoneFrame({
  imageSrc,
  imageAlt,
  title,
  liveUrl,
  isActive = false,
  showHint = false,
  size = "default",
  interactive = false,
  onIframeLoad,
}: IPhoneFrameProps) {
  const showLiveEmbed = Boolean(liveUrl && isActive);
  const className = [
    styles.wrapper,
    size === "large" ? styles.large : "",
    isActive ? styles.active : "",
    showLiveEmbed ? styles.live : "",
    interactive ? styles.interactive : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={className} aria-label={`Projeto ${title}`}>
      <div className={styles.device}>
        <div className={styles.sideButton} aria-hidden="true" />
        <div className={styles.screen}>
          {showLiveEmbed ? (
            <iframe
              src={liveUrl}
              title={`${title} — app ao vivo`}
              className={styles.liveFrame}
              onLoad={onIframeLoad}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; geolocation; gyroscope; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          ) : (
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes={
                size === "large"
                  ? "(max-width: 768px) 90vw, 390px"
                  : "(max-width: 768px) 72vw, 280px"
              }
              className={styles.screenImage}
              priority={isActive || size === "large"}
            />
          )}
          <div className={styles.dynamicIsland} aria-hidden="true" />
          <div className={styles.screenGlare} aria-hidden="true" />
          <div className={styles.homeIndicator} aria-hidden="true" />
        </div>
      </div>
      {showHint ? (
        <span className={styles.hint}>
          {showLiveEmbed ? "Toque para interagir" : isActive ? "Selecionado" : "Selecionar"}
        </span>
      ) : null}
    </div>
  );
}
