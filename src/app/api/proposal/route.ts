import { NextResponse } from "next/server";
import { isEmailConfigured } from "@/lib/email/getMailTransporter";
import { sendProposalNotification } from "@/lib/email/sendProposalNotification";
import { proposalSchema } from "@/lib/schemas/proposal.server";

export async function POST(request: Request) {
  try {
    if (!isEmailConfigured()) {
      console.error(
        "Error submitting proposal: RESEND_API_KEY ausente no .env.local.",
      );
      return NextResponse.json(
        {
          error:
            "Serviço de e-mail não configurado. Defina RESEND_API_KEY no .env.local (resend.com).",
        },
        { status: 503 },
      );
    }

    const body: unknown = await request.json();
    const parsed = proposalSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Dados inválidos.", issues: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    await sendProposalNotification(parsed.data);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error submitting proposal:", error);

    const message =
      error instanceof Error ? error.message : "Não foi possível enviar sua solicitação.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
