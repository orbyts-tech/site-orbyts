"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { ProposalChatModal } from "./ProposalChatModal";

interface ProposalFormContextValue {
  openProposalForm: () => void;
  closeProposalForm: () => void;
}

const ProposalFormContext = createContext<ProposalFormContextValue | null>(null);

export function ProposalFormProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openProposalForm = useCallback(() => setIsOpen(true), []);
  const closeProposalForm = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ openProposalForm, closeProposalForm }),
    [openProposalForm, closeProposalForm],
  );

  return (
    <ProposalFormContext.Provider value={value}>
      {children}
      {isOpen ? <ProposalChatModal onClose={closeProposalForm} /> : null}
    </ProposalFormContext.Provider>
  );
}

export function useProposalForm(): ProposalFormContextValue {
  const context = useContext(ProposalFormContext);
  if (!context) {
    throw new Error("useProposalForm deve ser usado dentro de ProposalFormProvider.");
  }
  return context;
}
