import { NextResponse } from "next/server";
import { sendProposalNotification } from "@/lib/email/sendProposalNotification";
import { proposalSchema } from "@/lib/schemas/proposal.server";

export async function POST(request: Request) {
  try {
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
    return NextResponse.json(
      { error: "Não foi possível enviar sua solicitação. Tente novamente." },
      { status: 500 },
    );
  }
}
