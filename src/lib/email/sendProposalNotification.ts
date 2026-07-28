import "server-only";

import type { z } from "zod";
import { SITE } from "@/config/site";
import { proposalSchema } from "@/lib/schemas/proposal.server";
import { getInvestmentLabel } from "@/lib/validation/validateProposalStep";
import {
  getMailFromAddress,
  getMailTransporter,
  getProposalNotificationEmail,
  getResendClient,
  isEmailConfigured,
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
  if (!isEmailConfigured()) {
    throw new Error(
      "E-mail não configurado. Defina RESEND_API_KEY no .env.local.",
    );
  }

  const { text, html } = buildProposalEmailContent(data);
  const to = getProposalNotificationEmail();
  const from = getMailFromAddress();
  const subject = `[Proposta] ${data.fullName}`;

  const resend = getResendClient();
  if (resend) {
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: data.email,
      subject,
      text,
      html,
    });

    if (error) {
      throw new Error(error.message || "Falha ao enviar e-mail via Resend.");
    }
    return;
  }

  const transporter = getMailTransporter();
  if (!transporter) {
    throw new Error("Transportador de e-mail não configurado.");
  }

  await transporter.sendMail({
    from: from.includes("<") ? from : `${SITE.name} Site <${from}>`,
    to,
    replyTo: data.email,
    subject,
    text,
    html,
  });
}
