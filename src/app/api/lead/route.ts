import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { isEmailConfigured } from "@/lib/email/getMailTransporter";
import { sendLeadNotification } from "@/lib/email/sendLeadNotification";
import { leadRequestSchema, zodFieldErrors } from "@/features/landing/lead.schema";

/**
 * Recebe os leads da landing de campanhas (/lp).
 * Responde { ok: true, leadId } SOMENTE depois que o e-mail de notificação foi aceito pelo provedor.
 * O front só registra conversão (generate_lead / Google Ads) com essa confirmação.
 */
export async function POST(request: Request) {
  if (!isEmailConfigured()) {
    console.error("[api/lead] E-mail não configurado (RESEND_API_KEY ou SMTP_*).");
    return NextResponse.json({ ok: false, error: "Serviço de envio indisponível." }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Requisição inválida." }, { status: 400 });
  }

  const parsed = leadRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Dados inválidos.", fields: zodFieldErrors(parsed.error) },
      { status: 400 },
    );
  }

  // Honeypot preenchido = bot. Não envia e não confirma como lead.
  if (parsed.data.website) {
    return NextResponse.json({ ok: false, error: "Não foi possível processar." }, { status: 400 });
  }

  const leadId = randomUUID();
  try {
    await sendLeadNotification(parsed.data, leadId);
    return NextResponse.json({ ok: true, leadId });
  } catch (error) {
    console.error("[api/lead] Falha ao enviar lead:", error);
    return NextResponse.json({ ok: false, error: "Não foi possível registrar sua solicitação." }, { status: 502 });
  }
}
