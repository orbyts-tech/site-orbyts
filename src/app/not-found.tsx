import Link from "next/link";
import { SITE } from "@/config/site";

export default function NotFound() {
  return (
    <main
      id="conteudo-principal"
      style={{
        minHeight: "100dvh",
        display: "grid",
        placeItems: "center",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: "28rem" }}>
        <p style={{ color: "var(--green-dark)", fontWeight: 600, marginBottom: "0.75rem" }}>
          {SITE.name}
        </p>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 5vw, 2.75rem)",
            letterSpacing: "-0.03em",
            marginBottom: "0.75rem",
          }}
        >
          Página não encontrada
        </h1>
        <p style={{ color: "var(--ink-2)", marginBottom: "1.5rem", lineHeight: 1.6 }}>
          O endereço pode ter mudado ou não existe. Volte para a página inicial e continue
          navegando.
        </p>
        <Link
          href="/"
          style={{
            display: "inline-flex",
            height: "48px",
            alignItems: "center",
            padding: "0 1.5rem",
            borderRadius: "var(--radius-control)",
            background: "var(--green)",
            color: "var(--on-green)",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          Ir para o início
        </Link>
      </div>
    </main>
  );
}
