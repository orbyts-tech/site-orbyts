export const TECHNOLOGIES = [
  "React Native",
  "Next.js",
  "Supabase",
  "PostgreSQL",
  "TypeScript",
  "Node.js",
  "Tailwind CSS",
  "AWS",
] as const;

export type Technology = (typeof TECHNOLOGIES)[number];
