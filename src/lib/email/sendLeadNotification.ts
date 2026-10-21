import "server-only";

import { SITE } from "@/config/site";
import { getServiceLabel } from "@/features/landing/content";
import type { LeadRequest } from "@/features/landing/lead.schema";
import { formatBrazilianPhone, extractDigits } from "@/lib/formatters/phone";
import {
  getMailFromAddress,
  getMailTransporter,
  getProposalNotificationEmail,
  getResendClient,
  isEmailConfigured,
} from "@/lib/email/getMailTransporter";

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

function buildContent({ lead, attribution, eventId }: LeadRequest, leadId: string) {
  const phoneDigits = extractDigits(lead.phone ?? "");
  const rows: Array<readonly [string, string]> = [
    ["Nome", lead.name],
    ["E-mail", lead.email],
    ["Empresa", lead.company],
    ["Serviço", getServiceLabel(lead.service)],
    ["Investimento", lead.budget],
    ["Prazo", lead.timeline],
    ["Decisão", lead.decision],
    ["Contato preferido", lead.contact],
  ];
  if (lead.contact === "WhatsApp" && phoneDigits) rows.push(["WhatsApp", formatBrazilianPhone(phoneDigits)]);
  rows.push(["Consentimento LGPD", "Aceito no envio do formulário"]);

  const attributionRows = Object.entries(attribution);
  const whatsappLink = phoneDigits ? `https://wa.me/55${phoneDigits}` : "";

  const text = [
    "Novo lead pela landing de campanhas (/lp):",
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    whatsappLink ? `Link WhatsApp: ${whatsappLink}` : "",
    "",
    "Desafio / projeto:",
    lead.description,
    "",
    attributionRows.length ? `Origem: ${attributionRows.map(([k, v]) => `${k}=${v}`).join(" · ")}` : "Origem: sem UTM",
    `ID do lead: ${leadId} · event_id: ${eventId}`,
  ]
    .filter((line) => line !== undefined)
    .join("\n");

  const html = `
    <h2>Novo lead pela landing de campanhas</h2>
    ${rows.map(([label, value]) => `<p><strong>${label}:</strong> ${escapeHtml(value)}</p>`).join("\n")}
    ${whatsappLink ? `<p><a href="${whatsappLink}">Abrir conversa no WhatsApp</a></p>` : ""}
    <h3>Desafio / projeto</h3>
    <p>${escapeHtml(lead.description).replace(/\n/g, "<br>")}</p>
    <hr>
    <p><small>Origem: ${
      attributionRows.length
        ? attributionRows.map(([k, v]) => `${escapeHtml(k)}=${escapeHtml(v)}`).join(" · ")
        : "sem UTM"
    }<br>ID do lead: ${escapeHtml(leadId)} · event_id: ${escapeHtml(eventId)}</small></p>
  `.trim();

  return { text, html };
}

/** Envia o lead por e-mail. Lança erro se o envio não for confirmado pelo provedor. */
export async function sendLeadNotification(request: LeadRequest, leadId: string): Promise<void> {
  if (!isEmailConfigured()) {
    throw new Error("E-mail não configurado. Defina RESEND_API_KEY (ou SMTP_*) nas variáveis de ambiente.");
  }

  const { lead } = request;
  const { text, html } = buildContent(request, leadId);
  const to = getProposalNotificationEmail();
  const from = getMailFromAddress();
  const subject = `[Lead LP] ${lead.name} — ${lead.company} (${getServiceLabel(lead.service)})`;

  const resend = getResendClient();
  if (resend) {
    const { error } = await resend.emails.send({ from, to: [to], replyTo: lead.email, subject, text, html });
    if (error) throw new Error(error.message || "Falha ao enviar e-mail via Resend.");
    return;
  }

  const transporter = getMailTransporter();
  if (!transporter) throw new Error("Transportador de e-mail não configurado.");

  await transporter.sendMail({
    from: from.includes("<") ? from : `${SITE.name} Site <${from}>`,
    to,
    replyTo: lead.email,
    subject,
    text,
    html,
  });
}
