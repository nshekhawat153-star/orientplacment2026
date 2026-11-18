import { Metadata } from "next";
import React, { Suspense } from "react";
import { FindCandidatesClient } from "./FindCandidatesClient";

export const metadata: Metadata = {
  title: "Find Candidates for Your Open Seat | Orion Placement",
  description:
    "Confidential candidate search for law firms in Texas. Browse pre-screened lateral attorney and paralegal dossiers with verified compensation and strict confidentiality.",
  alternates: {
    canonical: "https://www.orionplacement.com/find-candidates",
  },
};

export default function FindCandidatesPage() {
  return (
    <Suspense
      fallback={
        <div style={{ padding: "100px 20px", textAlign: "center", color: "#64748B" }}>
          Loading candidate matching engine...
        </div>
      }
    >
      <FindCandidatesClient />
    </Suspense>
  );
}
