export const SOLUTION_OPTIONS = [
  { value: "web-system", label: "Sistema web" },
  { value: "mobile-app", label: "Aplicativo mobile" },
  { value: "saas-b2b", label: "SaaS B2B" },
  { value: "squad-as-a-service", label: "Squad as a Service" },
  { value: "other", label: "Outro" },
] as const;

export const INVESTMENT_RANGES = [
  { value: "up-to-5000", label: "até R$5.000" },
  { value: "5000-15000", label: "R$5.000 até R$15.000" },
  { value: "15000-50000", label: "R$15.000 até R$50.000" },
  { value: "50000+", label: "R$50.000+" },
] as const;

export type SolutionOption = (typeof SOLUTION_OPTIONS)[number]["value"];
export type InvestmentRange = (typeof INVESTMENT_RANGES)[number]["value"];

export function getSolutionLabel(value: string): string {
  return SOLUTION_OPTIONS.find((option) => option.value === value)?.label ?? value;
}

export function getInvestmentLabel(value: string): string {
  return INVESTMENT_RANGES.find((range) => range.value === value)?.label ?? value;
}
