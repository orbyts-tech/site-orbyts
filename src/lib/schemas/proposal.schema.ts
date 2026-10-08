import { z } from "zod";
import {
  INVESTMENT_RANGES,
  SOLUTION_OPTIONS,
  type InvestmentRange,
  type SolutionOption,
} from "@/lib/constants/proposal";
import { BRAZILIAN_PHONE_MAX_DIGITS, extractDigits } from "@/lib/formatters/phone";

const BRAZILIAN_PHONE_MIN_DIGITS = 10;

function toEnumValues<TValue extends string>(
  options: readonly { value: TValue }[],
): [TValue, ...TValue[]] {
  const [first, ...rest] = options.map((option) => option.value);
  if (!first) {
    throw new Error("Lista de opções vazia.");
  }
  return [first, ...rest];
}

const requiredText = (message: string, minLength: number, maxLength: number) =>
  z
    .string({ required_error: message })
    .trim()
    .min(minLength, message)
    .max(maxLength, `Use no máximo ${maxLength} caracteres.`);

export const proposalSchema = z.object({
  fullName: requiredText("Informe seu nome completo.", 3, 120),
  email: z
    .string({ required_error: "Informe um e-mail válido." })
    .trim()
    .email("Informe um e-mail válido.")
    .max(160, "E-mail muito longo."),
  whatsapp: z
    .string({ required_error: "Informe um WhatsApp válido com DDD." })
    .transform(extractDigits)
    .pipe(
      z
        .string()
        .min(BRAZILIAN_PHONE_MIN_DIGITS, "Informe um WhatsApp válido com DDD.")
        .max(BRAZILIAN_PHONE_MAX_DIGITS, "Informe um WhatsApp válido com DDD."),
    ),
  company: requiredText("Informe o nome da sua empresa.", 2, 120),
  jobTitle: requiredText("Informe seu cargo na empresa.", 2, 120),
  solution: z.enum(toEnumValues<SolutionOption>(SOLUTION_OPTIONS), {
    errorMap: () => ({ message: "Selecione a solução que você precisa." }),
  }),
  investment: z.enum(toEnumValues<InvestmentRange>(INVESTMENT_RANGES), {
    errorMap: () => ({ message: "Selecione o investimento esperado." }),
  }),
  details: z
    .string()
    .trim()
    .max(2000, "Use no máximo 2000 caracteres.")
    .optional()
    .default(""),
  /** Honeypot: campo invisível que só bots preenchem. */
  website: z.string().max(200).optional().default(""),
});

export type ProposalFormValues = z.input<typeof proposalSchema>;
export type ProposalPayload = z.output<typeof proposalSchema>;
export type ProposalField = keyof ProposalFormValues;
export type ProposalFieldErrors = Partial<Record<ProposalField, string>>;

export function getProposalFieldErrors(error: z.ZodError<ProposalFormValues>): ProposalFieldErrors {
  const fieldErrors = error.flatten().fieldErrors;

  return Object.fromEntries(
    Object.entries(fieldErrors)
      .map(([field, messages]) => [field, messages?.[0]] as const)
      .filter((entry): entry is readonly [string, string] => Boolean(entry[1])),
  ) as ProposalFieldErrors;
}
