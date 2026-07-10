import Image from "next/image";
import {
  DESKTOP_VIEWPORT_HEIGHT,
  DESKTOP_VIEWPORT_WIDTH,
} from "./LiveIframeViewport";
import { LiveEmbedGate } from "./LiveEmbedGate";
import styles from "./MacbookFrame.module.css";

interface MacbookFrameProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  liveUrl?: string;
  canEmbed?: boolean;
  isActive?: boolean;
  onClick?: () => void;
  showHint?: boolean;
  size?: "default" | "large";
  interactive?: boolean;
  onIframeLoad?: () => void;
}

export function MacbookFrame({
  imageSrc,
  imageAlt,
  title,
  liveUrl,
  canEmbed = true,
  isActive = false,
  onClick,
  showHint = true,
  size = "default",
  interactive = true,
  onIframeLoad,
}: MacbookFrameProps) {
  const showLiveEmbed = Boolean(liveUrl && isActive);
  const className = [
    styles.wrapper,
    size === "large" ? styles.large : "",
    isActive ? styles.active : "",
    showLiveEmbed ? styles.live : "",
    !interactive ? styles.static : "",
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      <div className={styles.lid}>
        <div className={styles.bezel}>
          <div className={styles.screen}>
            {showLiveEmbed ? (
              <LiveEmbedGate
                src={liveUrl!}
                title={`${title} — site ao vivo`}
                viewportWidth={DESKTOP_VIEWPORT_WIDTH}
                viewportHeight={DESKTOP_VIEWPORT_HEIGHT}
                fallbackImageSrc={imageSrc}
                fallbackImageAlt={imageAlt}
                canEmbed={canEmbed}
                onLoad={onIframeLoad}
              />
            ) : (
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                sizes={
                  size === "large"
                    ? "(max-width: 768px) 100vw, 900px"
                    : "(max-width: 768px) 94vw, 720px"
                }
                className={styles.screenImage}
                priority={isActive || size === "large"}
              />
            )}
            <div className={styles.screenGlare} aria-hidden="true" />
          </div>
          <div className={styles.camera} aria-hidden="true" />
        </div>
      </div>
      <div className={styles.base}>
        <div className={styles.trackpad} aria-hidden="true" />
      </div>
      {showHint ? (
        <span className={styles.hint}>
          {showLiveEmbed ? "Role para explorar" : isActive ? "Clique para entrar" : "Selecionar"}
        </span>
      ) : null}
    </>
  );

  if (!interactive || showLiveEmbed) {
    return (
      <div className={className} aria-label={`Projeto ${title}`}>
        {content}
      </div>
    );
  }

  return (
    <button
      type="button"
      className={className}
      onClick={onClick}
      aria-label={`Abrir projeto ${title}`}
    >
      {content}
    </button>
  );
}
