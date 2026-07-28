import "server-only";

import { z } from "zod";
import { INVESTMENT_RANGES } from "@/lib/constants/proposal";

const investmentValues = INVESTMENT_RANGES.map((range) => range.value) as [
  string,
  ...string[],
];

export const proposalSchema = z.object({
  fullName: z.string().trim().min(3, "Informe seu nome completo."),
  phone: z
    .string()
    .trim()
    .min(10, "Informe um telefone válido.")
    .max(20, "Telefone inválido."),
  email: z.string().trim().email("Informe um e-mail válido."),
  scope: z.string().trim().min(1, "Conte um pouco sobre o projeto."),
  investment: z.enum(investmentValues, {
    required_error: "Selecione uma faixa de investimento.",
    invalid_type_error: "Selecione uma faixa de investimento.",
  }),
});
