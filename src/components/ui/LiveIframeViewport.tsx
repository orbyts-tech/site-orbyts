"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./LiveIframeViewport.module.css";

export const MOBILE_VIEWPORT_WIDTH = 390;
export const MOBILE_VIEWPORT_HEIGHT = 844;

export const DESKTOP_VIEWPORT_WIDTH = 1280;
export const DESKTOP_VIEWPORT_HEIGHT = 800;

interface LiveIframeViewportProps {
  src: string;
  title: string;
  viewportWidth?: number;
  viewportHeight?: number;
  onLoad?: () => void;
}

export function LiveIframeViewport({
  src,
  title,
  viewportWidth = MOBILE_VIEWPORT_WIDTH,
  viewportHeight = MOBILE_VIEWPORT_HEIGHT,
  onLoad,
}: LiveIframeViewportProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const updateScale = () => {
      const { width, height } = node.getBoundingClientRect();
      if (width === 0 || height === 0) return;

      setScale(Math.min(width / viewportWidth, height / viewportHeight));
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(node);

    return () => observer.disconnect();
  }, [viewportWidth, viewportHeight]);

  return (
    <div ref={containerRef} className={styles.viewport}>
      <div
        className={styles.frameScaler}
        style={{
          width: viewportWidth * scale,
          height: viewportHeight * scale,
        }}
      >
        <iframe
          src={src}
          title={title}
          className={styles.frame}
          width={viewportWidth}
          height={viewportHeight}
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
          onLoad={onLoad}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; geolocation; gyroscope; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    </div>
  );
}
