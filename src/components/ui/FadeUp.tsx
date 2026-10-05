"use client";

import type { CSSProperties, ReactNode } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export type RevealVariant = "up" | "fade" | "scale" | "blur";

interface FadeUpProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  id?: string;
  variant?: RevealVariant;
  /** Anima os filhos marcados com `reveal-item` (e `--i`) em sequência, em vez do bloco inteiro. */
  stagger?: boolean;
  /** Quantidade aproximada de filhos escalonados — define quando a animação termina. */
  staggerCount?: number;
  onVisible?: () => void;
}

const BASE_DURATION_MS = 800;
const STAGGER_STEP_MS = 80;

export function FadeUp({
  children,
  className = "",
  delay = 0,
  id,
  variant = "up",
  stagger = false,
  staggerCount = 6,
  onVisible,
}: FadeUpProps) {
  const delayMs = Math.round(delay * 1000);
  const settleAfterMs =
    BASE_DURATION_MS + delayMs + (stagger ? staggerCount * STAGGER_STEP_MS : 0);

  const { ref, state } = useScrollReveal<HTMLDivElement>({ settleAfterMs, onReveal: onVisible });

  const classes = [
    "reveal",
    stagger ? "reveal--stagger" : "",
    state === "armed" ? "is-armed" : "",
    state === "revealing" ? "is-revealing" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const style = delayMs ? ({ "--reveal-delay": `${delayMs}ms` } as CSSProperties) : undefined;

  return (
    <div ref={ref} id={id} className={classes} data-variant={variant} style={style}>
      {children}
    </div>
  );
}