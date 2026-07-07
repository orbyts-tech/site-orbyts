import Image from "next/image";
import { SITE } from "@/config/site";

/** Dimensões nativas do wordmark (735×134 px, proporção ~5,49:1) */
export const ORBYTS_LOGO_WIDTH = 735;
export const ORBYTS_LOGO_HEIGHT = 134;

interface OrbytsLogoProps {
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

/** Logo oficial ORBYTS — wordmark verde, fundo transparente */
export function OrbytsLogo({
  className,
  width = ORBYTS_LOGO_WIDTH,
  height = ORBYTS_LOGO_HEIGHT,
  priority = false,
}: OrbytsLogoProps) {
  return (
    <Image
      src={SITE.logoPath}
      alt={`${SITE.name} — Software House`}
      width={width}
      height={height}
      className={className}
      priority={priority}
    />
  );
}
