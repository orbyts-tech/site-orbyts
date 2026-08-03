"use client";

import dynamic from "next/dynamic";

const DotGridBackground = dynamic(
  () => import("./DotGridBackground").then((mod) => mod.DotGridBackground),
  { ssr: false },
);

export function DotGridLazy() {
  return <DotGridBackground />;
}
