"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  to: number;
  durationMs?: number;
  startDelayMs?: number;
}

function easeOutExpo(progress: number): number {
  return progress >= 1 ? 1 : 1 - 2 ** (-10 * progress);
}

/** Renderiza o valor final no servidor (SEO/sem JS) e anima de 0 ao entrar na tela. */
export function CountUp({ to, durationMs = 1800, startDelayMs = 0 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayedValue, setDisplayedValue] = useState(to);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let delayTimer = 0;

    const animate = () => {
      const startTime = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - startTime) / durationMs, 1);
        setDisplayedValue(Math.round(easeOutExpo(progress) * to));
        if (progress < 1) frame = window.requestAnimationFrame(tick);
      };
      frame = window.requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        delayTimer = window.setTimeout(animate, startDelayMs);
      },
      { threshold: 0.4 },
    );

    // Visível no load: mantém o valor do SSR até o primeiro frame da animação (evita "0" se o rAF não rodar).
    const rect = element.getBoundingClientRect();
    const isVisibleOnMount = rect.top < window.innerHeight && rect.bottom > 0;
    if (!isVisibleOnMount) setDisplayedValue(0);

    observer.observe(element);

    return () => {
      observer.disconnect();
      window.clearTimeout(delayTimer);
      window.cancelAnimationFrame(frame);
    };
  }, [to, durationMs, startDelayMs]);

  return <span ref={ref}>{displayedValue}</span>;
}
