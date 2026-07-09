"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./IPhoneFrame.module.css";

export const MOBILE_VIEWPORT_WIDTH = 390;
export const MOBILE_VIEWPORT_HEIGHT = 844;

interface LiveIframeViewportProps {
  src: string;
  title: string;
  onLoad?: () => void;
}

export function LiveIframeViewport({ src, title, onLoad }: LiveIframeViewportProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const updateScale = () => {
      const { width, height } = node.getBoundingClientRect();
      if (width === 0 || height === 0) return;

      setScale(
        Math.min(width / MOBILE_VIEWPORT_WIDTH, height / MOBILE_VIEWPORT_HEIGHT),
      );
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={styles.liveViewport}>
      <div
        className={styles.liveFrameScaler}
        style={{
          width: MOBILE_VIEWPORT_WIDTH * scale,
          height: MOBILE_VIEWPORT_HEIGHT * scale,
        }}
      >
        <iframe
          src={src}
          title={title}
          className={styles.liveFrame}
          width={MOBILE_VIEWPORT_WIDTH}
          height={MOBILE_VIEWPORT_HEIGHT}
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
