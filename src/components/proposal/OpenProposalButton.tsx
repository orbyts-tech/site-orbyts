"use client";

import type { ReactNode } from "react";
import { useProposalForm } from "./ProposalFormContext";
import buttonStyles from "@/components/ui/Button.module.css";

interface OpenProposalButtonProps {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "ghost" | "nav";
}

export function OpenProposalButton({
  children,
  className = "",
  variant = "primary",
}: OpenProposalButtonProps) {
  const { openProposalForm } = useProposalForm();

  const variantClass =
    variant === "ghost" || variant === "nav"
      ? buttonStyles.ghost
      : buttonStyles.primary;

  const extraClass =
    variant === "nav"
      ? `${buttonStyles.compact} ${className}`.trim()
      : className;

  return (
    <button
      type="button"
      className={`${variantClass} ${extraClass}`.trim()}
      onClick={openProposalForm}
    >
      {children}
    </button>
  );
}
