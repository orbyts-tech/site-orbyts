import type { InvestmentRange } from "@/lib/constants/proposal";

export interface ProposalFormData {
  fullName: string;
  phone: string;
  email: string;
  scope: string;
  investment: InvestmentRange;
}

export type ProposalFormErrors = Partial<Record<keyof ProposalFormData, string>>;
