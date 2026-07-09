import "server-only";

import type { z } from "zod";
import { proposalSchema } from "@/lib/schemas/proposal.server";
import { getInvestmentLabel } from "@/lib/validation/validateProposalStep";
import {
  getMailTransporter,
  getProposalNotificationEmail,
} from "@/lib/email/getMailTransporter";

type ProposalPayload = z.infer<typeof proposalSchema>;

function buildProposalEmailContent(data: ProposalPayload) {
  const investmentLabel = getInvestmentLabel(data.investment);

  const text = [
    "Nova solicitação de proposta pelo site:",
    "",
    `Nome: ${data.fullName}`,
    `Telefone: ${data.phone}`,
    `E-mail: ${data.email}`,
    `Investimento: ${investmentLabel}`,
    "",
    "Escopo do projeto:",
    data.scope,
  ].join("\n");

  const html = `
    <h2>Nova solicitação de proposta pelo site</h2>
    <p><strong>Nome:</strong> ${data.fullName}</p>
    <p><strong>Telefone:</strong> ${data.phone}</p>
    <p><strong>E-mail:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
    <p><strong>Investimento:</strong> ${investmentLabel}</p>
    <h3>Escopo do projeto</h3>
    <p>${data.scope.replace(/\n/g, "<br>")}</p>
  `.trim();

  return { text, html, investmentLabel };
}

export async function sendProposalNotification(
  data: ProposalPayload,
): Promise<void> {
  const transporter = getMailTransporter();

  if (!transporter) {
    throw new Error("Configuração SMTP ausente.");
  }

  const from = process.env.SMTP_FROM ?? process.env.SMTP_USER;
  if (!from) {
    throw new Error("Remetente SMTP não configurado.");
  }

  const { text, html } = buildProposalEmailContent(data);

  await transporter.sendMail({
    from: `ORBYTS Site <${from}>`,
    to: getProposalNotificationEmail(),
    replyTo: data.email,
    subject: `[Proposta] ${data.fullName}`,
    text,
    html,
  });
}
