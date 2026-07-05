import { NextResponse } from "next/server";

function isEmbeddable(
  xFrameOptions: string | null,
  csp: string | null,
  targetUrl: URL,
): { embeddable: boolean; reason?: string } {
  if (xFrameOptions) {
    const value = xFrameOptions.toLowerCase();
    if (value === "deny") {
      return {
        embeddable: false,
        reason: "O sistema bloqueia exibição em iframe (X-Frame-Options: DENY).",
      };
    }
    if (value === "sameorigin") {
      return {
        embeddable: false,
        reason:
          "O sistema só permite iframe no próprio domínio (X-Frame-Options: SAMEORIGIN). Sites como Google, Facebook e a maioria dos SaaS fazem isso por segurança.",
      };
    }
  }

  if (csp) {
    const frameAncestors = csp
      .split(";")
      .map((part) => part.trim())
      .find((part) => part.toLowerCase().startsWith("frame-ancestors"));

    if (frameAncestors) {
      const directive = frameAncestors.toLowerCase();
      if (directive.includes("'none'")) {
        return {
          embeddable: false,
          reason: "O sistema bloqueia iframe via Content-Security-Policy (frame-ancestors 'none').",
        };
      }
      if (directive.includes("'self'") && !directive.includes("*")) {
        return {
          embeddable: false,
          reason:
            "O sistema só permite iframe no próprio domínio (CSP frame-ancestors 'self').",
        };
      }
    }
  }

  void targetUrl;
  return { embeddable: true };
}

export async function GET(request: Request) {
  const urlParam = new URL(request.url).searchParams.get("url");

  if (!urlParam) {
    return NextResponse.json({ error: "URL obrigatória." }, { status: 400 });
  }

  let targetUrl: URL;
  try {
    targetUrl = new URL(urlParam);
  } catch {
    return NextResponse.json({ error: "URL inválida." }, { status: 400 });
  }

  if (!["http:", "https:"].includes(targetUrl.protocol)) {
    return NextResponse.json({ error: "Protocolo não suportado." }, { status: 400 });
  }

  if (
    (targetUrl.hostname === "codepen.io" && targetUrl.pathname.includes("/embed/")) ||
    (targetUrl.hostname === "www.google.com" && targetUrl.pathname.startsWith("/maps/embed")) ||
    (targetUrl.hostname === "www.openstreetmap.org" &&
      targetUrl.pathname.includes("/export/embed"))
  ) {
    return NextResponse.json({ embeddable: true });
  }

  try {
    const response = await fetch(targetUrl.href, {
      method: "HEAD",
      redirect: "follow",
      signal: AbortSignal.timeout(8000),
    });

    const result = isEmbeddable(
      response.headers.get("x-frame-options"),
      response.headers.get("content-security-policy"),
      targetUrl,
    );

    return NextResponse.json(result);
  } catch {
    return NextResponse.json({
      embeddable: true,
      reason: "Não foi possível verificar os headers. Tentando carregar mesmo assim.",
    });
  }
}
