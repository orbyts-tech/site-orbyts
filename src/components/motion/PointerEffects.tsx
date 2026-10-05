"use client";

import { useEffect } from "react";

const MAGNETIC_STRENGTH = 0.18;
const MAGNETIC_MAX_OFFSET_PX = 5;

function clamp(value: number, limit: number): number {
  return Math.max(-limit, Math.min(limit, value));
}

/**
 * Efeitos de ponteiro delegados no documento (um único listener para o site todo):
 * - `[data-spotlight]`: expõe `--spot-x`/`--spot-y` para o brilho radial do CSS.
 * - `[data-magnetic]`: desloca levemente o elemento na direção do cursor.
 */
export function PointerEffects() {
  useEffect(() => {
    const finePointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointerQuery.matches || reducedMotionQuery.matches) return;

    let activeMagnetic: HTMLElement | null = null;
    let pendingEvent: PointerEvent | null = null;
    let frame = 0;

    const releaseMagnetic = () => {
      if (!activeMagnetic) return;
      activeMagnetic.style.translate = "";
      activeMagnetic = null;
    };

    const applyPointer = () => {
      frame = 0;
      const event = pendingEvent;
      if (!event || !(event.target instanceof Element)) return;

      const spotlight = event.target.closest<HTMLElement>("[data-spotlight]");
      if (spotlight) {
        const rect = spotlight.getBoundingClientRect();
        spotlight.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
        spotlight.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
      }

      const magnetic = event.target.closest<HTMLElement>("[data-magnetic]");
      if (magnetic !== activeMagnetic) releaseMagnetic();
      if (!magnetic) return;

      const rect = magnetic.getBoundingClientRect();
      const offsetX = clamp((event.clientX - (rect.left + rect.width / 2)) * MAGNETIC_STRENGTH, MAGNETIC_MAX_OFFSET_PX);
      const offsetY = clamp((event.clientY - (rect.top + rect.height / 2)) * MAGNETIC_STRENGTH, MAGNETIC_MAX_OFFSET_PX);
      magnetic.style.translate = `${offsetX.toFixed(1)}px ${offsetY.toFixed(1)}px`;
      activeMagnetic = magnetic;
    };

    const handlePointerMove = (event: PointerEvent) => {
      pendingEvent = event;
      if (!frame) frame = window.requestAnimationFrame(applyPointer);
    };

    document.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", releaseMagnetic);

    return () => {
      document.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("pointerleave", releaseMagnetic);
      window.cancelAnimationFrame(frame);
      releaseMagnetic();
    };
  }, []);

  return null;
}
