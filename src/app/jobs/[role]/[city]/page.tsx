import { jobs, bands, roles, cities } from "@/data";
import JobsClient from "./client";

export async function generateStaticParams() {
  const pairs = new Set<string>();
  for (const j of jobs) pairs.add(`${j.role}:::${j.city}`);
  for (const [c, rMap] of Object.entries(bands)) {
    for (const r of Object.keys(rMap)) {
      pairs.add(`${r}:::${c}`);
    }
  }
  for (const r of roles) pairs.add(`${r.slug}:::houston-tx`);
  for (const c of cities) pairs.add(`estate-planning-attorney:::${c.slug}`);

  return Array.from(pairs).map((p) => {
    const [role, city] = p.split(":::");
    return { role, city };
  });
}

export default async function JobsPage({
  params,
}: {
  params: Promise<{ role: string; city: string }>;
}) {
  const { role, city } = await params;
  return <JobsClient roleParam={role} cityParam={city} />;
}
