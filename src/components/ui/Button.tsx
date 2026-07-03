import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./Button.module.css";

type ButtonVariant = "primary" | "ghost";

interface ButtonProps {
  href: string;
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}

function isExternalHref(href: string): boolean {
  return href.startsWith("http") || href.startsWith("mailto:");
}

export function Button({
  href,
  variant = "primary",
  children,
  className = "",
  ariaLabel,
}: ButtonProps) {
  const classNames = [
    variant === "primary" ? styles.primary : styles.ghost,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (isExternalHref(href)) {
    return (
      <a
        href={href}
        className={classNames}
        aria-label={ariaLabel}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classNames} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
