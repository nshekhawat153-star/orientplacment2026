import type { Metadata } from "next";
import { bands, findRole, findCity } from "@/data";
import SalaryLeafClient from "./SalaryLeafClient";

export async function generateStaticParams() {
  const params: { role: string; city: string }[] = [];
  for (const [city, roleMap] of Object.entries(bands)) {
    for (const role of Object.keys(roleMap)) {
      params.push({ role, city });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ role: string; city: string }> }): Promise<Metadata> {
  const { role, city } = await params;
  const r = findRole(role);
  const c = findCity(city);
  const b = bands[city]?.[role];
  if (!r || !c || !b) return {};
  return {
    title: `${r.name} Salary in ${c.name}, ${c.state} | Orion Placement`,
    description: `${r.name} base salary in ${c.name}: median $${b.median}k. $${b.b1[0]}k–$${b.b1[1]}k with 1–3 years, $${b.b2[0]}k–$${b.b2[1]}k with 4–7, $${b.b3[0]}k–$${b.b3[1]}k with 8+.`,
    alternates: { canonical: `https://www.orionplacement.com/salaries/${role}/${city}` },
  };
}

export default async function SalaryLeafPage({
  params,
}: {
  params: Promise<{ role: string; city: string }>;
}) {
  const { role, city } = await params;
  return <SalaryLeafClient roleParam={role} cityParam={city} />;
}
