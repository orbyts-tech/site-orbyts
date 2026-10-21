import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { isEmailConfigured } from "@/lib/email/getMailTransporter";
import { sendQualificationNotification } from "@/lib/email/sendQualificationNotification";
import { fieldErrors, qualificationRequestSchema } from "@/features/qualification/schema";

export async function POST(request: Request) {
  if (!isEmailConfigured()) {
    console.error("[api/qualification] E-mail não configurado.");
    return NextResponse.json({ ok: false, error: "Serviço de envio indisponível." }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Requisição inválida." }, { status: 400 });
  }

  const parsed = qualificationRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Dados inválidos.", fields: fieldErrors(parsed.error) },
      { status: 400 },
    );
  }

  if (parsed.data.website) {
    return NextResponse.json({ ok: true, leadId: "ignored" });
  }

  const leadId = randomUUID();
  try {
    await sendQualificationNotification(parsed.data, leadId);
    return NextResponse.json({ ok: true, leadId });
  } catch (error) {
    console.error("[api/qualification] Falha ao enviar:", error);
    return NextResponse.json(
      { ok: false, error: "Não foi possível registrar sua solicitação." },
      { status: 502 },
    );
  }
}
