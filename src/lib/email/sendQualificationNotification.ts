import "server-only";

import { SITE } from "@/config/site";
import {
  AUDIENCE_OPTIONS,
  DECISION_OPTIONS,
  getOptionLabel,
  INVESTMENT_OPTIONS,
  QUALIFICATION_BY_PRODUCT,
  TIMELINE_OPTIONS,
} from "@/features/qualification/content";
import type { QualificationRequest } from "@/features/qualification/schema";
import { formatBrazilianPhone } from "@/lib/formatters/phone";
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

export async function sendQualificationNotification(
  request: QualificationRequest,
  leadId: string,
): Promise<void> {
  if (!isEmailConfigured()) {
    throw new Error("E-mail não configurado. Defina RESEND_API_KEY (ou SMTP_*) nas variáveis de ambiente.");
  }

  const config = QUALIFICATION_BY_PRODUCT[request.product];
  const { answers, attribution, eventId } = request;
  const phoneDisplay = formatBrazilianPhone(answers.phone);
  const whatsappLink = `https://wa.me/55${answers.phone}`;
  const attributionRows = Object.entries(attribution);

  const rows: Array<readonly [string, string]> = [
    ["Produto", config.internalName],
    ["Nome", answers.name],
    ["Telefone / WhatsApp", phoneDisplay],
    ["E-mail", answers.email || "Não informado"],
    ["Para quem", getOptionLabel(AUDIENCE_OPTIONS, answers.audience)],
    ["Prazo", getOptionLabel(TIMELINE_OPTIONS, answers.timeline)],
    [config.investmentLabel, getOptionLabel(INVESTMENT_OPTIONS, answers.investment)],
    ["Participação", getOptionLabel(DECISION_OPTIONS, answers.decision)],
  ];

  const text = [
    `Nova qualificação (${config.path}):`,
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    `Link WhatsApp: ${whatsappLink}`,
    "",
    `${config.needsEmailHeading}:`,
    answers.needs,
    "",
    attributionRows.length
      ? `Origem: ${attributionRows.map(([k, v]) => `${k}=${v}`).join(" · ")}`
      : "Origem: sem UTM",
    `ID do lead: ${leadId} · event_id: ${eventId}`,
  ].join("\n");

  const html = `
    <h2>Nova qualificação — ${escapeHtml(config.internalName)}</h2>
    ${rows.map(([label, value]) => `<p><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}</p>`).join("\n")}
    <p><a href="${whatsappLink}">Abrir conversa no WhatsApp</a></p>
    <h3>${escapeHtml(config.needsEmailHeading)}</h3>
    <p>${escapeHtml(answers.needs).replace(/\n/g, "<br>")}</p>
    <hr>
    <p><small>Origem: ${
      attributionRows.length
        ? attributionRows.map(([k, v]) => `${escapeHtml(k)}=${escapeHtml(v)}`).join(" · ")
        : "sem UTM"
    }<br>ID do lead: ${escapeHtml(leadId)} · event_id: ${escapeHtml(eventId)}</small></p>
  `.trim();

  const to = getProposalNotificationEmail();
  const from = getMailFromAddress();
  const subject = `${config.emailSubjectPrefix} ${answers.name}`;
  const replyTo = answers.email || undefined;

  const resend = getResendClient();
  if (resend) {
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo,
      subject,
      text,
      html,
    });
    if (error) throw new Error(error.message || "Falha ao enviar e-mail via Resend.");
    return;
  }

  const transporter = getMailTransporter();
  if (!transporter) throw new Error("Transportador de e-mail não configurado.");

  await transporter.sendMail({
    from: from.includes("<") ? from : `${SITE.name} Site <${from}>`,
    to,
    replyTo,
    subject,
    text,
    html,
  });
}
