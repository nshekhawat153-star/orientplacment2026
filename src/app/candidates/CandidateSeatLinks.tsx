"use client";

import React from "react";
import { useRouter } from "next/navigation";
import type { Job } from "@/data";
import { JobListCard } from "@/app/jobs/components/JobListCard";

/* Job cards that open the seat on /jobs. */
export function CandidateSeatLinks({ jobs }: { jobs: Job[] }) {
  const router = useRouter();
  return (
    <div className="cd-seat-grid">
      {jobs.map((j) => (
        <JobListCard key={j.id} job={j} selected={false} onSelect={(x) => router.push(`/jobs?job=${encodeURIComponent(x.id)}`)} />
      ))}
    </div>
  );
}
