import type { SpatialHomeContent } from "../../domain/spatialHome.schema";
import { SpatialStatCard } from "./SpatialStatCard";

interface SpatialHomeHeroProps {
  content: Pick<
    SpatialHomeContent,
    "headlineLines" | "featureTitle" | "featureDescription" | "stats"
  >;
}

export function SpatialHomeHero({ content }: SpatialHomeHeroProps) {
  return (
    <div className="spatial:relative spatial:z-10 spatial:mx-auto spatial:grid spatial:max-w-[1440px] spatial:grid-cols-1 spatial:gap-10 spatial:px-6 spatial:pb-10 spatial:pt-[167px] spatial:lg:grid-cols-[1fr_auto] spatial:lg:gap-0">
      {/* Headline — Figma: 5 linhas, 60px / lh 54px, x=24 y=167 */}
      <div className="spatial:flex spatial:flex-col spatial:gap-[12px]">
        {content.headlineLines.map((line) => (
          <h1
            key={line}
            className="spatial:text-[clamp(2.5rem,5vw,3.75rem)] spatial:font-normal spatial:leading-[0.9] spatial:tracking-[-0.6px] spatial:text-white"
            style={{ fontFamily: "var(--font-jura)" }}
          >
            {line}
          </h1>
        ))}
      </div>

      {/* Feature copy — Figma Frame 25: 231×201 @ (1183, 200) */}
      <aside className="spatial:max-w-[231px] spatial:justify-self-end spatial:lg:pt-8">
        <h2
          className="spatial:text-[32px] spatial:font-medium spatial:leading-10 spatial:text-white"
          style={{ fontFamily: "var(--font-jura)" }}
        >
          {content.featureTitle}
        </h2>
        <p
          className="spatial:mt-[35px] spatial:text-xl spatial:leading-[26px] spatial:text-white"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          {content.featureDescription}
        </p>
      </aside>

      {/* Stats — Figma Frame 24 @ y≈585 */}
      <div className="spatial:col-span-1 spatial:flex spatial:flex-wrap spatial:items-end spatial:justify-center spatial:gap-4 spatial:lg:col-span-2 spatial:lg:justify-end spatial:lg:gap-5">
        {content.stats.map((stat) => (
          <SpatialStatCard key={stat.label} stat={stat} />
        ))}
      </div>
    </div>
  );
}
