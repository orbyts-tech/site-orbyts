"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const DotGridBackground = dynamic(
  () => import("./DotGridBackground").then((mod) => mod.DotGridBackground),
  { ssr: false },
);

/** Rotas com fundo próprio, sem a grade animada do site institucional. */
const ROUTES_WITHOUT_DOT_GRID = ["/lp"];

export function DotGridLazy() {
  const pathname = usePathname();
  // Sem pathname ainda (1º paint) ou rota de campanha: não monta a grade — evita mismatch de hidratação.
  if (
    !pathname ||
    ROUTES_WITHOUT_DOT_GRID.some((route) => pathname === route || pathname.startsWith(`${route}/`))
  ) {
    return null;
  }
  return <DotGridBackground />;
}
