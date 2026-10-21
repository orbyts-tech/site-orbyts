import "server-only";

import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import { Resend } from "resend";
import { SITE } from "@/config/site";

export function getProposalNotificationEmail(): string {
  return process.env.PROPOSAL_NOTIFICATION_EMAIL?.trim() || SITE.contact.email;
}

export function getResendApiKey(): string | null {
  return process.env.RESEND_API_KEY?.trim() || null;
}

export function getResendClient(): Resend | null {
  const apiKey = getResendApiKey();
  if (!apiKey) return null;
  return new Resend(apiKey);
}

export function getMailFromAddress(): string {
  const configuredFrom =
    process.env.RESEND_FROM?.trim() || process.env.SMTP_FROM?.trim();

  if (configuredFrom) {
    return configuredFrom;
  }

  if (getResendApiKey()) {
    // Domínio de teste do Resend — Gmail/Outlook marcam como spam com alta frequência.
    // Obrigatório em produção: verificar orbytstech.com no Resend e definir RESEND_FROM
    // (ex.: ORBYTS <noreply@orbytstech.com>).
    console.warn(
      "[email] RESEND_FROM ausente. Enviando via onboarding@resend.dev — alto risco de spam. " +
        "Verifique o domínio em https://resend.com/domains e defina RESEND_FROM.",
    );
    return `${SITE.name} <onboarding@resend.dev>`;
  }

  if (process.env.SMTP_USER?.trim()) {
    return process.env.SMTP_USER.trim();
  }

  return `${SITE.name} <noreply@orbytstech.com>`;
}

function getGenericSmtpConfig(): SMTPTransport.Options | null {
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim().replace(/\s+/g, "");

  if (!user || !pass) {
    return null;
  }

  const host = process.env.SMTP_HOST?.trim() || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT ?? "587");

  return {
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  };
}

export function isEmailConfigured(): boolean {
  return Boolean(getResendApiKey() || getGenericSmtpConfig());
}

/** @deprecated use isEmailConfigured */
export function isSmtpConfigured(): boolean {
  return isEmailConfigured();
}

export function getMailTransporter() {
  const config = getGenericSmtpConfig();
  if (!config) return null;
  return nodemailer.createTransport(config);
}
