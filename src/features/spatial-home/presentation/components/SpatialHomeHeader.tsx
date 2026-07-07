import Image from "next/image";
import type { SpatialNavLink } from "../../domain/spatialHome.schema";
import { SpatialArrowIcon } from "./SpatialArrowIcon";

interface SpatialHomeHeaderProps {
  navLinks: SpatialNavLink[];
  ctaLabel: string;
}

export function SpatialHomeHeader({ navLinks, ctaLabel }: SpatialHomeHeaderProps) {
  return (
    <header className="spatial:absolute spatial:inset-x-0 spatial:top-0 spatial:z-20 spatial:flex spatial:items-center spatial:justify-between spatial:px-6 spatial:pt-6 spatial:lg:px-6">
      {/* Logo — Figma: image 6, 42.54×23px @ (24, 26.5) */}
      <div className="spatial:relative spatial:h-[23px] spatial:w-[43px]">
        <Image
          src="/spatial-home/logo.png"
          alt="Brand"
          fill
          className="spatial:object-contain"
          priority
        />
      </div>

      <nav
        className="spatial:hidden spatial:items-center spatial:gap-[60px] spatial:lg:flex"
        aria-label="Principal"
      >
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={[
              "spatial:text-xs spatial:leading-[10.8px] spatial:text-white spatial:transition-opacity",
              link.isActive ? "spatial:font-medium" : "spatial:font-light spatial:opacity-80",
              /* HOVER: não definido no Figma */
              "spatial:hover:opacity-100",
            ].join(" ")}
            style={{ fontFamily: "var(--font-outfit)" }}
            aria-current={link.isActive ? "page" : undefined}
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* CTA — Figma Frame 5: 116×43, radius 12, glass gradient */}
      <button
        type="button"
        className="spatial:flex spatial:h-[43px] spatial:items-center spatial:gap-2.5 spatial:rounded-xl spatial:border spatial:border-white/20 spatial:bg-linear-to-br spatial:from-white/30 spatial:to-white/[0.18] spatial:px-5 spatial:text-xs spatial:font-medium spatial:text-white spatial:backdrop-blur-md"
        style={{ fontFamily: "var(--font-outfit)" }}
      >
        {ctaLabel}
        <SpatialArrowIcon className="spatial:text-white" />
      </button>
    </header>
  );
}
