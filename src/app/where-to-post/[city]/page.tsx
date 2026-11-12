import { Suspense } from "react";
import { WhereToPostClient } from "./WhereToPostClient";

export function generateStaticParams() {
  return [{ city: "houston-tx" }];
}

export function generateMetadata() {
  return {
    title: "Where to post a legal job in Houston | Orion Placement",
    description: "Houston Bar Association, State Bar of Texas, law school boards, LinkedIn, Indeed and your own site, compared on cost, reach and time to first applicant.",
  };
}

export default async function WhereToPostPage({
  params
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;

  return (
    <Suspense fallback={null}>
      <WhereToPostClient cityParam={city} />
    </Suspense>
  );
}
