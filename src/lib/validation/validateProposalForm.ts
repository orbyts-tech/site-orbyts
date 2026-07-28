import { INVESTMENT_RANGES } from "@/lib/constants/proposal";
import type { ProposalFormData, ProposalFormErrors } from "@/lib/types/proposal";

const VALID_INVESTMENTS = new Set(INVESTMENT_RANGES.map((range) => range.value));
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateProposalForm(data: ProposalFormData): ProposalFormErrors {
  const errors: ProposalFormErrors = {};

  const fullName = data.fullName.trim();
  const phone = data.phone.trim();
  const email = data.email.trim();
  const scope = data.scope.trim();

  if (fullName.length < 3) {
    errors.fullName = "Informe seu nome completo.";
  }

  if (phone.length < 10 || phone.length > 20) {
    errors.phone = "Informe um telefone válido.";
  }

  if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Informe um e-mail válido.";
  }

  if (scope.length === 0) {
    errors.scope = "Conte um pouco sobre o projeto.";
  }

  if (!VALID_INVESTMENTS.has(data.investment)) {
    errors.investment = "Selecione uma faixa de investimento.";
  }

  return errors;
}

export function hasValidationErrors(errors: ProposalFormErrors): boolean {
  return Object.keys(errors).length > 0;
}
