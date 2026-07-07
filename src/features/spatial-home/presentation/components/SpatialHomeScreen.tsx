import Image from "next/image";
import type { SpatialHomeContent } from "../../domain/spatialHome.schema";
import { SpatialHomeHeader } from "./SpatialHomeHeader";
import { SpatialHomeHero } from "./SpatialHomeHero";

interface SpatialHomeScreenProps {
  content: SpatialHomeContent;
}

export function SpatialHomeScreen({ content }: SpatialHomeScreenProps) {
  return (
    <div
      className="spatial:relative spatial:min-h-screen spatial:overflow-hidden spatial:bg-orbyts-bg"
      /*
       * Figma frame: 1440×810, fill #303436 (mapeado para --color-orbyts-bg #0D0D0D)
       * BREAKPOINTS: design só em desktop 1440 — mobile/tablet inferidos com clamp/grid
       */
    >
      {/* Background — Figma node 20001:28 (image 1) */}
      <div className="spatial:pointer-events-none spatial:absolute spatial:inset-0">
        <Image
          src="/spatial-home/hero-bg.png"
          alt=""
          fill
          priority
          className="spatial:object-cover"
          sizes="100vw"
        />
        {/* Overlay para aproximar fundo Orbyts (#0D0D0D) do #303436 do Figma */}
        <div className="spatial:absolute spatial:inset-0 spatial:bg-orbyts-bg/55" aria-hidden="true" />
      </div>

      <SpatialHomeHeader navLinks={content.navLinks} ctaLabel={content.ctaLabel} />

      <main>
        <SpatialHomeHero content={content} />
      </main>
    </div>
  );
}
