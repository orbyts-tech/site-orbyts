import "server-only";

import nodemailer from "nodemailer";

const PROPOSAL_NOTIFICATION_EMAIL = "gestao.orbytstech@gmail.com";

function getSmtpConfig() {
  const host = process.env.SMTP_HOST ?? "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT ?? "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    return null;
  }

  return {
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  };
}

export function getProposalNotificationEmail(): string {
  return process.env.PROPOSAL_NOTIFICATION_EMAIL ?? PROPOSAL_NOTIFICATION_EMAIL;
}

export function getMailTransporter() {
  const config = getSmtpConfig();

  if (!config) {
    return null;
  }

  return nodemailer.createTransport(config);
}
