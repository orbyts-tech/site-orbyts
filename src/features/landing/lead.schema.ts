import { z } from "zod";
import {
  BUDGET_OPTIONS,
  CONTACT_OPTIONS,
  DECISION_OPTIONS,
  SERVICE_OPTIONS,
  TIMELINE_OPTIONS,
} from "./content";

const serviceValues = SERVICE_OPTIONS.map((option) => option.value) as [string, ...string[]];

const pick = (values: readonly string[], message: string) =>
  z.string({ required_error: message }).refine((value) => values.includes(value), message);

export const ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
] as const;

export const leadStep1Schema = z.object({
  name: z
    .string()
    .trim()
    .max(120, "Use no máximo 120 caracteres.")
    .refine((value) => value.split(/\s+/).filter(Boolean).length >= 2, "Informe nome e sobrenome."),
  email: z
    .string()
    .trim()
    .max(160, "E-mail muito longo.")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "Informe um e-mail válido, como nome@empresa.com.br."),
  company: z.string().trim().min(1, "Informe o nome da empresa.").max(120, "Use no máximo 120 caracteres."),
  service: z.enum(serviceValues, { errorMap: () => ({ message: "Selecione o serviço de interesse." }) }),
  description: z
    .string()
    .trim()
    .min(20, "Conte um pouco mais sobre o desafio (mínimo de 20 caracteres).")
    .max(2000, "Use no máximo 2000 caracteres."),
});

const leadStep2Base = z.object({
  budget: pick(BUDGET_OPTIONS, "Selecione uma faixa de investimento."),
  timeline: pick(TIMELINE_OPTIONS, "Selecione quando pretende começar."),
  decision: pick(DECISION_OPTIONS, "Selecione sua participação na decisão."),
  contact: pick(CONTACT_OPTIONS, "Escolha um canal de contato."),
  phone: z.string().trim().max(30).optional().default(""),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Para enviarmos uma resposta, é preciso concordar com o uso dos dados." }),
  }),
});

function phoneRule<T extends { contact: string; phone?: string }>(data: T, ctx: z.RefinementCtx) {
  if (data.contact === "WhatsApp" && (data.phone ?? "").replace(/\D/g, "").length < 10) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["phone"],
      message: "Informe um número com DDD, como (11) 91234-5678.",
    });
  }
}

export const leadStep2Schema = leadStep2Base.superRefine(phoneRule);

export const leadRequestSchema = z.object({
  lead: leadStep1Schema.merge(leadStep2Base).superRefine(phoneRule),
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
  /** Honeypot: campo invisível que só bots preenchem. */
  website: z.string().max(200).optional().default(""),
});

export type LeadRequest = z.output<typeof leadRequestSchema>;
export type LeadData = LeadRequest["lead"];

export function zodFieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[issue.path.length - 1] ?? "");
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}
