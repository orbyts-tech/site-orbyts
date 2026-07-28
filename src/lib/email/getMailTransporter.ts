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
    // Domínio de teste do Resend — tende a cair em spam.
    // Depois de verificar orbytstech.com no Resend, use RESEND_FROM.
    return `${SITE.name} Site <onboarding@resend.dev>`;
  }

  if (process.env.SMTP_USER?.trim()) {
    return process.env.SMTP_USER.trim();
  }

  return `${SITE.name} Site <noreply@orbytstech.com>`;
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
