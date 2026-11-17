import { bands } from "@/data";
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

export default async function SalaryLeafPage({
  params,
}: {
  params: Promise<{ role: string; city: string }>;
}) {
  const { role, city } = await params;
  return <SalaryLeafClient roleParam={role} cityParam={city} />;
}
