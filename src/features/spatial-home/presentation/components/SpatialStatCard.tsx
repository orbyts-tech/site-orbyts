import type { SpatialStat } from "../../domain/spatialHome.schema";

interface SpatialStatCardProps {
  stat: SpatialStat;
}

export function SpatialStatCard({ stat }: SpatialStatCardProps) {
  const isSolid = stat.variant === "solid";

  return (
    <article
      className={[
        "spatial:relative spatial:overflow-hidden spatial:rounded-[40px] spatial:p-6",
        isSolid
          ? "spatial:bg-spatial-card-solid" /* Figma #323843 — próximo de superfície escura Orbyts */
          : "spatial:border spatial:border-white/10 spatial:bg-white/10",
        "spatial:min-h-[152px] spatial:min-w-[168px]",
      ].join(" ")}
    >
      <p
        className={[
          "spatial:text-[40px] spatial:leading-9 spatial:tracking-[-0.4px]",
          isSolid ? "spatial:text-spatial-text-muted" : "spatial:text-white",
        ].join(" ")}
        style={{ fontFamily: "var(--font-jura)" }}
      >
        {stat.value}
      </p>
      <p
        className={[
          "spatial:mt-2 spatial:text-sm spatial:leading-[18.2px]",
          isSolid ? "spatial:text-spatial-text-muted" : "spatial:text-white",
        ].join(" ")}
        style={{ fontFamily: "var(--font-outfit)" }}
      >
        {stat.label}
      </p>
    </article>
  );
}
