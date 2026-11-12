import { Suspense } from "react";
import { BestFirmsClient } from "./BestFirmsClient";

export function generateStaticParams() {
  return [{ city: "houston-tx" }];
}

export function generateMetadata() {
  return {
    title: "Best small law firms to work for in Houston | Orion",
    description: "Small and mid-size Houston law firms by practice area, judged on focus, published pay, on-site or hybrid and public reviews. Criteria stated up front.",
  };
}

export default async function BestLawFirmsPage({
  params
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;

  return (
    <Suspense fallback={null}>
      <BestFirmsClient cityParam={city} />
    </Suspense>
  );
}
