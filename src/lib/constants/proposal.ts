export const INVESTMENT_RANGES = [
  { value: "5000-15000", label: "R$5.000 até R$15.000" },
  { value: "15000-50000", label: "R$15.000 até R$50.000" },
  { value: "50000+", label: "R$50.000+" },
] as const;

export type InvestmentRange = (typeof INVESTMENT_RANGES)[number]["value"];
