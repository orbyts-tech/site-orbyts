import { z } from "zod";

export const spatialNavLinkSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
  isActive: z.boolean(),
});

export const spatialStatSchema = z.object({
  value: z.string().min(1),
  label: z.string().min(1),
  variant: z.enum(["glass", "solid"]),
});

export const spatialHomeContentSchema = z.object({
  navLinks: z.array(spatialNavLinkSchema).min(1),
  headlineLines: z.array(z.string().min(1)).min(1),
  featureTitle: z.string().min(1),
  featureDescription: z.string().min(1),
  stats: z.array(spatialStatSchema).length(3),
  ctaLabel: z.string().min(1),
});

export type SpatialNavLink = z.infer<typeof spatialNavLinkSchema>;
export type SpatialStat = z.infer<typeof spatialStatSchema>;
export type SpatialHomeContent = z.infer<typeof spatialHomeContentSchema>;
