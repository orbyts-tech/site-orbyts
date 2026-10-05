"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface ParallaxLayerProps {
  children: ReactNode;
  className?: string;
  /** Fração do scroll aplicada como deslocamento (0.2 = move a 20% da velocidade). */
  speed?: number;
}

export function ParallaxLayer({ children, className, speed = 0.18 }: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;

    const applyOffset = () => {
      frame = 0;
      const scrollY = window.scrollY;
      if (scrollY > window.innerHeight * 1.2) return;
      element.style.transform = `translate3d(0, ${(scrollY * speed).toFixed(1)}px, 0)`;
    };

    const handleScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(applyOffset);
    };

    applyOffset();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.cancelAnimationFrame(frame);
    };
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
