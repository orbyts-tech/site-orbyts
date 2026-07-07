import { spatialHomeContentSchema, type SpatialHomeContent } from "./spatialHome.schema";

/** Conteúdo extraído do frame Figma `home` (20001:27) */
const rawContent = {
  navLinks: [
    { label: "Overview", href: "#overview", isActive: true },
    { label: "Experience", href: "#experience", isActive: false },
    { label: "Technology", href: "#technology", isActive: false },
    { label: "Ecosystem", href: "#ecosystem", isActive: false },
  ],
  headlineLines: ["See", "Beyond", "Every", "Digital", "Screen"],
  featureTitle: "Spatial Computing",
  featureDescription:
    "Interact with apps, media, and tools directly within your physical environment.",
  stats: [
    { value: "1b", label: "Pixel Density", variant: "glass" as const },
    { value: "1ms", label: "Motion Accuracy", variant: "solid" as const },
    { value: "92%", label: "Light Transparency", variant: "glass" as const },
  ],
  ctaLabel: "Pre Order",
};

export const spatialHomeContent: SpatialHomeContent =
  spatialHomeContentSchema.parse(rawContent);
