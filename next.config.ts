import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "fastly.picsum.photos",
      },
    ],
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90, 100],
  },
  poweredByHeader: false,
};

export default nextConfig;
