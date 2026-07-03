import { NextResponse } from "next/server";
import { SITE } from "@/config/site";
import { INVESTMENT_RANGES } from "@/lib/constants/proposal";
import { proposalSchema } from "@/lib/schemas/proposal.server";

function getInvestmentLabel(value: string): string {
  return INVESTMENT_RANGES.find((range) => range.value === value)?.label ?? value;
}

async function notifyTeam(data: {
  fullName: string;
  phone: string;
  email: string;
  scope: string;
  investment: string;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const investmentLabel = getInvestmentLabel(data.investment);

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM ?? "ORBYTS Site <noreply@orbyts.com.br>",
      to: SITE.contact.email,
      reply_to: data.email,
      subject: `[Proposta] ${data.fullName}`,
      text: [
        "Nova solicitação de proposta pelo site:",
        "",
        `Nome: ${data.fullName}`,
        `Telefone: ${data.phone}`,
        `E-mail: ${data.email}`,
        `Investimento: ${investmentLabel}`,
        "",
        "Escopo do projeto:",
        data.scope,
      ].join("\n"),
    }),
  });
}

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

    await notifyTeam(parsed.data);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Não foi possível enviar sua solicitação. Tente novamente." },
      { status: 500 },
    );
  }
}
