"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

/**
 * idle      — renderizado no servidor/sem JS: sempre visível.
 * armed     — abaixo da dobra, aguardando entrar na tela (oculto).
 * revealing — animando a entrada.
 * settled   — animação concluída; transições de reveal removidas para não afetar hovers.
 */
export type RevealState = "idle" | "armed" | "revealing" | "settled";

interface UseScrollRevealOptions {
  /** Tempo total da animação, incluindo escalonamento dos filhos. */
  settleAfterMs: number;
  onReveal?: () => void;
}

function isInViewport(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  return rect.top < viewportHeight * 0.92 && rect.bottom > 0;
}

export function useScrollReveal<T extends HTMLElement>({
  settleAfterMs,
  onReveal,
}: UseScrollRevealOptions): { ref: RefObject<T | null>; state: RevealState } {
  const ref = useRef<T>(null);
  const [state, setState] = useState<RevealState>("idle");
  const onRevealRef = useRef(onReveal);

  useEffect(() => {
    onRevealRef.current = onReveal;
  }, [onReveal]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canObserve = typeof IntersectionObserver !== "undefined";

    if (prefersReducedMotion || !canObserve || isInViewport(element)) {
      onRevealRef.current?.();
      return;
    }

    setState("armed");
    let settleTimer = 0;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        setState("revealing");
        onRevealRef.current?.();
        settleTimer = window.setTimeout(() => setState("settled"), settleAfterMs);
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      window.clearTimeout(settleTimer);
    };
  }, [settleAfterMs]);

  return { ref, state };
}
