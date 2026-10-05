import type { CSSProperties } from "react";

/** Posição do item na sequência escalonada (`reveal-item` dentro de `FadeUp stagger`). */
export function staggerIndex(index: number): CSSProperties {
  return { "--i": index } as CSSProperties;
}

/** Atraso das animações de entrada em CSS (`enter-up`, hero). */
export function enterDelay(milliseconds: number): CSSProperties {
  return { "--enter-delay": `${milliseconds}ms` } as CSSProperties;
}
