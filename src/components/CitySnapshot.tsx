import React from "react";
import { findCity, snapshots, findBand, matchCandidates, jobs, fmt, plural, asOf } from "@/data";
import { Mark } from "./Mark";

export function CitySnapshot({
  city: passedCity,
  citySlug,
}: {
  city?: string;
  citySlug?: string;
}) {
  const effectiveCity = citySlug || passedCity || "houston-tx";
  const c = findCity(effectiveCity);
  const s = snapshots[effectiveCity] || {};
  const b = findBand(effectiveCity, "estate-planning-attorney");
  const candidatesInCity = matchCandidates({ city: effectiveCity }).filter((r) => r.inCity).length;
  const jobsInCity = jobs.filter((x) => x.city === effectiveCity).length;

  if (!c) return null;

  return (
    <div className="snapshot">
      <div className="snap-h">
        <span className="eyebrow">{c.name} snapshot</span>
        <span className="small muted">
          <Mark>{asOf}</Mark>
        </span>
      </div>
      <div className="snap-grid">
        <div>
          <b>
            <Mark>{candidatesInCity}</Mark>
          </b>
          <span>{plural(candidatesInCity, "candidate")} available now</span>
        </div>
        <div>
          <b>{b ? <Mark>{fmt.k(b.median)}</Mark> : null}</b>
          <span>median base, estate planning attorney</span>
        </div>
        <div>
          <b>
            <Mark>{jobsInCity}</Mark>
          </b>
          <span>confidential {plural(jobsInCity, "role")} open</span>
        </div>
        <div>
          <b>
            <Mark>{s.shortlistDays || "5 days"}</Mark>
          </b>
          <span>to a first shortlist</span>
        </div>
      </div>
    </div>
  );
}
