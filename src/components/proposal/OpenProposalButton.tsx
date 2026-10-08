import type { ReactNode } from "react";
import buttonStyles from "@/components/ui/Button.module.css";

export const PROPOSAL_SECTION_HREF = "#contato";

interface OpenProposalButtonProps {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "ghost" | "nav";
  onClick?: () => void;
}

export function OpenProposalButton({
  children,
  className = "",
  variant = "primary",
  onClick,
}: OpenProposalButtonProps) {
  const variantClass =
    variant === "ghost" || variant === "nav"
      ? buttonStyles.ghost
      : buttonStyles.primary;

  const extraClass =
    variant === "nav"
      ? `${buttonStyles.compact} ${className}`.trim()
      : className;

  return (
    <a
      href={PROPOSAL_SECTION_HREF}
      className={`${variantClass} ${extraClass}`.trim()}
      data-magnetic={variant === "ghost" ? undefined : ""}
      onClick={onClick}
    >
      {children}
    </a>
  );
}
