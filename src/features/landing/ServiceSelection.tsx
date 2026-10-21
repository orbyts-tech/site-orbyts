"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { ServiceValue } from "./content";
import { trackEvent } from "./tracking";

interface ServiceSelectionValue {
  /** Serviço escolhido nos cards de Soluções (null = nenhum). */
  selected: ServiceValue | null;
  /** Incrementa a cada escolha, para o formulário reagir mesmo quando o valor se repete. */
  version: number;
  select: (value: ServiceValue) => void;
}

const ServiceSelectionContext = createContext<ServiceSelectionValue | null>(null);

export function ServiceSelectionProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<ServiceValue | null>(null);
  const [version, setVersion] = useState(0);

  const select = useCallback((value: ServiceValue) => {
    setSelected(value);
    setVersion((current) => current + 1);
  }, []);

  const value = useMemo(() => ({ selected, version, select }), [selected, version, select]);
  return <ServiceSelectionContext.Provider value={value}>{children}</ServiceSelectionContext.Provider>;
}

export function useServiceSelection(): ServiceSelectionValue {
  const context = useContext(ServiceSelectionContext);
  if (!context) throw new Error("useServiceSelection precisa de ServiceSelectionProvider.");
  return context;
}

/** Link de serviço: seleciona o serviço no formulário e leva até ele. */
export function SelectServiceLink({
  value,
  className,
  ariaLabel,
  children,
}: {
  value: ServiceValue;
  className?: string;
  ariaLabel?: string;
  children: ReactNode;
}) {
  const { select } = useServiceSelection();
  return (
    <a
      href="#formulario"
      className={className}
      aria-label={ariaLabel}
      onClick={() => {
        trackEvent("select_service", { service: value, source: "solucoes" });
        select(value);
      }}
    >
      {children}
    </a>
  );
}

/** CTA que leva ao formulário e registra a origem do clique. */
export function CtaLink({
  location,
  className,
  children,
  onNavigate,
}: {
  location: string;
  className?: string;
  children: ReactNode;
  onNavigate?: () => void;
}) {
  return (
    <a
      href="#formulario"
      className={className}
      onClick={() => {
        trackEvent("click_primary_cta", { cta_location: location });
        onNavigate?.();
      }}
    >
      {children}
    </a>
  );
}
