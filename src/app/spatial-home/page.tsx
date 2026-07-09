import type { Metadata } from "next";
import { Outfit, Jura } from "next/font/google";
import { spatialHomeContent, SpatialHomeScreen } from "@/features/spatial-home";
import { createPageMetadata } from "@/lib/seo/metadata";
import "@/features/spatial-home/presentation/spatial-home.css";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});

const jura = Jura({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jura",
});

export const metadata: Metadata = createPageMetadata({
  title: "Spatial Home — Preview Figma",
  description: "Preview interno de layout Figma.",
  path: "/spatial-home",
  noIndex: true,
});

export default function SpatialHomePage() {
  return (
    <div className={`${outfit.variable} ${jura.variable}`}>
      <SpatialHomeScreen content={spatialHomeContent} />
    </div>
  );
}
