"use client";

import Image from "next/image";
import {
  LiveIframeViewport,
  MOBILE_VIEWPORT_HEIGHT,
  MOBILE_VIEWPORT_WIDTH,
} from "./LiveIframeViewport";
import styles from "./LiveEmbedGate.module.css";

interface LiveEmbedGateProps {
  src: string;
  title: string;
  viewportWidth?: number;
  viewportHeight?: number;
  fallbackImageSrc?: string;
  fallbackImageAlt?: string;
  canEmbed?: boolean;
  onLoad?: () => void;
}

export function LiveEmbedGate({
  src,
  title,
  viewportWidth = MOBILE_VIEWPORT_WIDTH,
  viewportHeight = MOBILE_VIEWPORT_HEIGHT,
  fallbackImageSrc,
  fallbackImageAlt,
  canEmbed = true,
  onLoad,
}: LiveEmbedGateProps) {
  if (!canEmbed) {
    return (
      <div className={styles.viewport}>
        <div className={styles.blocked}>
          {fallbackImageSrc ? (
            <Image
              src={fallbackImageSrc}
              alt={fallbackImageAlt ?? title}
              fill
              sizes="720px"
              className={styles.blockedImage}
            />
          ) : null}
          <div className={styles.blockedOverlay}>
            <p className={styles.blockedTitle}>Teste em nova aba</p>
            <p className={styles.blockedText}>
              Este projeto bloqueia exibição em iframe. Abra o sistema para testar de verdade.
            </p>
            <a
              href={src}
              className={styles.blockedLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Testar projeto ↗
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <LiveIframeViewport
      src={src}
      title={title}
      viewportWidth={viewportWidth}
      viewportHeight={viewportHeight}
      onLoad={onLoad}
    />
  );
}
