import "server-only";

import { SITE } from "@/config/site";
import { getInvestmentLabel, getSolutionLabel } from "@/lib/constants/proposal";
import { formatBrazilianPhone } from "@/lib/formatters/phone";
import type { ProposalPayload } from "@/lib/schemas/proposal.schema";
import {
  getMailFromAddress,
  getMailTransporter,
  getProposalNotificationEmail,
  getResendClient,
  isEmailConfigured,
} from "@/lib/email/getMailTransporter";

type ProposalLead = Omit<ProposalPayload, "website">;

const HTML_ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => HTML_ESCAPES[character] ?? character);
}

function buildProposalEmailContent(lead: ProposalLead) {
  const whatsappDisplay = formatBrazilianPhone(lead.whatsapp);
  const whatsappLink = `https://wa.me/55${lead.whatsapp}`;
  const details = lead.details || "Não informado.";

  const rows: ReadonlyArray<readonly [string, string]> = [
    ["Nome", lead.fullName],
    ["E-mail", lead.email],
    ["WhatsApp", whatsappDisplay],
    ["Empresa", lead.company],
    ["Cargo", lead.jobTitle],
    ["Solução", getSolutionLabel(lead.solution)],
    ["Investimento", getInvestmentLabel(lead.investment)],
  ];

  const text = [
    "Nova solicitação de proposta pelo site:",
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    `Link WhatsApp: ${whatsappLink}`,
    "",
    "Detalhes do projeto:",
    details,
  ].join("\n");

  const html = `
    <h2>Nova solicitação de proposta pelo site</h2>
    ${rows.map(([label, value]) => `<p><strong>${label}:</strong> ${escapeHtml(value)}</p>`).join("\n")}
    <p><a href="${whatsappLink}">Abrir conversa no WhatsApp</a></p>
    <h3>Detalhes do projeto</h3>
    <p>${escapeHtml(details).replace(/\n/g, "<br>")}</p>
  `.trim();

  return { text, html };
}

export async function sendProposalNotification(lead: ProposalLead): Promise<void> {
  if (!isEmailConfigured()) {
    throw new Error(
      "E-mail não configurado. Defina RESEND_API_KEY no .env.local.",
    );
  }

  const { text, html } = buildProposalEmailContent(lead);
  const to = getProposalNotificationEmail();
  const from = getMailFromAddress();
  const subject = `[Proposta] ${lead.fullName} — ${lead.company}`;

  const resend = getResendClient();
  if (resend) {
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: lead.email,
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
    replyTo: lead.email,
    subject,
    text,
    html,
  });
}
