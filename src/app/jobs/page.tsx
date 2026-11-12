import { Metadata } from "next";
import React, { Suspense } from "react";
import { JobsSearchClient } from "./JobsSearchClient";

export const metadata: Metadata = {
  title: "Legal Jobs in Texas | Orion Placement",
  description:
    "Confidential legal jobs across Texas including Austin, Houston, Dallas, and San Antonio. Screened roles with verified salary bands at small and mid-size law firms.",
  alternates: {
    canonical: "https://www.orionplacement.com/jobs",
  },
};

export default function JobsPage() {
  return (
    <Suspense
      fallback={
        <div style={{ padding: "80px 20px", textAlign: "center", color: "#666" }}>
          Loading legal job openings...
        </div>
      }
    >
      <JobsSearchClient />
    </Suspense>
  );
}

