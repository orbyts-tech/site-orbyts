import Image from "next/image";
import { SITE } from "@/config/site";

interface OrbytsLogoProps {
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

/** Logo oficial ORBYTS — wordmark verde, fundo transparente */
export function OrbytsLogo({
  className,
  width = 330,
  height = 60,
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
