import { INVESTMENT_RANGES } from "@/lib/constants/proposal";
import type { ProposalFormData } from "@/lib/types/proposal";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateProposalField(
  field: keyof ProposalFormData,
  value: string,
): string | null {
  const trimmed = value.trim();

  switch (field) {
    case "fullName":
      return trimmed.length < 3 ? "Informe seu nome completo (mínimo 3 caracteres)." : null;
    case "phone":
      return trimmed.length < 10 || trimmed.length > 20
        ? "Informe um telefone válido com DDD."
        : null;
    case "email":
      return EMAIL_PATTERN.test(trimmed) ? null : "Informe um e-mail válido.";
    case "scope":
      return trimmed.length === 0 ? "Conte um pouco sobre o projeto." : null;
    case "investment":
      return INVESTMENT_RANGES.some((range) => range.value === value)
        ? null
        : "Selecione uma faixa de investimento.";
    default:
      return null;
  }
}

export function getInvestmentLabel(value: string): string {
  return INVESTMENT_RANGES.find((range) => range.value === value)?.label ?? value;
}
