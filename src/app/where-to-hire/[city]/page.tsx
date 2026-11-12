import { Suspense } from "react";
import { WhereToHireClient } from "./WhereToHireClient";

export function generateStaticParams() {
  return [{ city: "houston-tx" }];
}

export function generateMetadata() {
  return {
    title: "Where to hire attorneys and paralegals in Houston | Orion",
    description: "Houston law schools, paralegal programmes and bar groups: who to contact and when they hire. Plus where lateral hires come from, and candidates now.",
  };
}

export default async function WhereToHirePage({
  params
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;

  return (
    <Suspense fallback={null}>
      <WhereToHireClient cityParam={city} />
    </Suspense>
  );
}
