import { Suspense } from "react";
import { HiringKitClient } from "./HiringKitClient";

export function generateStaticParams() {
  return [{ role: "estate-planning-attorney" }];
}

export function generateMetadata() {
  return {
    title: "Estate planning attorney job description and kit | Orion",
    description: "An estate planning attorney job description you can edit and copy, with interview questions, a scorecard, an offer-letter outline and pay models.",
  };
}

export default async function HiringKitPage({
  params
}: {
  params: Promise<{ role: string }>;
}) {
  const { role } = await params;

  return (
    <Suspense fallback={null}>
      <HiringKitClient roleParam={role} />
    </Suspense>
  );
}
