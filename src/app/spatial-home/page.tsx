import type { Metadata } from "next";
import { Outfit, Jura } from "next/font/google";
import { spatialHomeContent, SpatialHomeScreen } from "@/features/spatial-home";
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

export const metadata: Metadata = {
  title: "Spatial Home — Preview Figma",
  robots: { index: false, follow: false },
};

export default function SpatialHomePage() {
  return (
    <div className={`${outfit.variable} ${jura.variable}`}>
      <SpatialHomeScreen content={spatialHomeContent} />
    </div>
  );
}
