import { z } from "zod";
import {
  AUDIENCE_OPTIONS,
  DECISION_OPTIONS,
  INVESTMENT_OPTIONS,
  QUALIFICATION_BY_PRODUCT,
  TIMELINE_OPTIONS,
  type QualificationProduct,
} from "./content";
import { BRAZILIAN_PHONE_MAX_DIGITS, extractDigits } from "@/lib/formatters/phone";
import { ATTRIBUTION_KEYS } from "@/features/landing/lead.schema";

function toEnumValues<TValue extends string>(
  options: readonly { value: TValue }[],
): [TValue, ...TValue[]] {
  const [first, ...rest] = options.map((option) => option.value);
  if (!first) throw new Error("Lista de opções vazia.");
  return [first, ...rest];
}

const PRODUCT_VALUES = Object.keys(QUALIFICATION_BY_PRODUCT) as [
  QualificationProduct,
  ...QualificationProduct[],
];

export const qualificationAnswersSchema = z.object({
  audience: z.enum(toEnumValues(AUDIENCE_OPTIONS), {
    errorMap: () => ({ message: "Selecione para quem será a solução." }),
  }),
  needs: z
    .string()
    .trim()
    .min(20, "Conte um pouco mais sobre o que você precisa.")
    .max(1000, "Use no máximo 1000 caracteres."),
  timeline: z.enum(toEnumValues(TIMELINE_OPTIONS), {
    errorMap: () => ({ message: "Selecione quando você precisa da solução." }),
  }),
  investment: z.enum(toEnumValues(INVESTMENT_OPTIONS), {
    errorMap: () => ({ message: "Selecione uma opção sobre o investimento." }),
  }),
  decision: z.enum(toEnumValues(DECISION_OPTIONS), {
    errorMap: () => ({ message: "Selecione sua participação na contratação." }),
  }),
  name: z
    .string()
    .trim()
    .min(2, "Informe seu nome.")
    .max(120, "Use no máximo 120 caracteres."),
  phone: z
    .string({ required_error: "Informe um telefone com DDD." })
    .transform(extractDigits)
    .pipe(
      z
        .string()
        .min(10, "Informe um telefone válido com DDD.")
        .max(BRAZILIAN_PHONE_MAX_DIGITS, "Informe um telefone válido com DDD."),
    ),
  email: z
    .string()
    .trim()
    .max(160, "E-mail muito longo.")
    .optional()
    .default("")
    .transform((value) => value ?? "")
    .refine(
      (value) => value === "" || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value),
      "Informe um e-mail válido.",
    ),
});

export const qualificationRequestSchema = z.object({
  product: z.enum(PRODUCT_VALUES, {
    errorMap: () => ({ message: "Produto de qualificação inválido." }),
  }),
  answers: qualificationAnswersSchema,
  eventId: z.string().trim().min(8).max(80),
  attribution: z
    .record(z.string().max(200))
    .optional()
    .default({})
    .transform((value) =>
      Object.fromEntries(
        Object.entries(value).filter(([key]) => (ATTRIBUTION_KEYS as readonly string[]).includes(key)),
      ),
    ),
  website: z.string().max(200).optional().default(""),
});

export type QualificationAnswers = z.output<typeof qualificationAnswersSchema>;
export type QualificationRequest = z.output<typeof qualificationRequestSchema>;
export type QualificationDraft = {
  audience: string;
  needs: string;
  timeline: string;
  investment: string;
  decision: string;
  name: string;
  phone: string;
  email: string;
  website: string;
};

export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[issue.path.length - 1] ?? "");
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}
