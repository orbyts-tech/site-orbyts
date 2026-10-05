"use client";

import { useEffect, useState, type ReactNode } from "react";

let hasCompletedFirstRender = false;

/**
 * Remonta a cada navegação. Anima só a opacidade: `transform` num ancestral
 * quebraria elementos `position: fixed` (navbar, modais).
 * A primeira carga não anima para não atrasar o LCP.
 */
export default function Template({ children }: { children: ReactNode }) {
  const [isClientNavigation] = useState(() => hasCompletedFirstRender);

  useEffect(() => {
    hasCompletedFirstRender = true;
  }, []);

  return <div className={isClientNavigation ? "page-enter" : undefined}>{children}</div>;
}
