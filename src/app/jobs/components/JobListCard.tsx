import React from "react";
import { Job, fmt, findCity } from "@/data";
import { practiceLabel, modeLabel } from "./jobUtils";

/* Compact job card for the /jobs list (left column).
   Shows only what a candidate scans for: practice, title, firm, pay,
   experience, office and where. Full detail lives in the side pane. */

interface JobListCardProps {
  job: Job;
  selected: boolean;
  onSelect: (job: Job) => void;
}

export function JobListCard({ job: j, selected, onSelect }: JobListCardProps) {
  const city = findCity(j.city);

  return (
    <button
      type="button"
      className={`jl-card${selected ? " is-selected" : ""}`}
      onClick={() => onSelect(j)}
      aria-pressed={selected}
      data-id={j.id}
    >
      <span className="jl-top">
        <span className="jl-practice">{practiceLabel(j.role)}</span>
        {j.urgentlyHiring && (
          <span className="jl-urgent">
            <span aria-hidden="true" />
            Hiring now
          </span>
        )}
      </span>

      <span className="jl-title">{j.title}</span>
      <span className="jl-firm">
        {j.firmType} · {j.firmSize}
      </span>

      <span className="jl-pay">
        {fmt.range(j.band)}
        <small>base</small>
      </span>

      <span className="jl-facts">
        <span>{j.years}</span>
        <span>{modeLabel(j.mode)}</span>
        <span>
          {j.area}
          {city && !j.area.includes(city.name) ? `, ${city.name}` : ""}
        </span>
      </span>

      <span className="jl-foot">
        <span>Posted {fmt.date(j.posted)}</span>
        <span className="jl-view" aria-hidden="true">
          View seat
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </span>
    </button>
  );
}
