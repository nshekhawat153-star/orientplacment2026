import React from "react";
import Link from "next/link";
import { Job, fmt, findCity } from "@/data";
import { Mark } from "./Mark";

export interface JobCardProps {
  job: Job;
  why?: string;
  onApply?: (jobId: string) => void;
  outlined?: boolean;
}

export function JobCard({ job: j, why, onApply, outlined }: JobCardProps) {
  const city = findCity(j.city);
  return (
    <article className="job" data-id={j.id}>
      <div className="job-top">
        <span>Confidential employer</span>
        <span>
          Posted <Mark>{fmt.date(j.posted)}</Mark>
        </span>
      </div>
      <h3>
        <Mark>{j.title}</Mark>
      </h3>
      <div className="pay">
        <Mark>{fmt.range(j.band)}</Mark> <span className="small muted">base</span>
      </div>
      <dl className="facts">
        <div>
          <dt>Firm</dt>
          <dd>
            <Mark>
              {j.firmType}, {j.firmSize}
            </Mark>
          </dd>
        </div>
        <div>
          <dt>Practice</dt>
          <dd>
            <Mark>{j.mix}</Mark>
          </dd>
        </div>
        <div>
          <dt>Where</dt>
          <dd>
            <Mark>
              {j.area}, {city ? city.name : j.city}
            </Mark>
          </dd>
        </div>
        <div>
          <dt>Works</dt>
          <dd>
            <Mark>{j.mode === "on-site" ? "On-site" : "Hybrid"}</Mark>
          </dd>
        </div>
        <div>
          <dt>Experience</dt>
          <dd>
            <Mark>{j.years}</Mark>
          </dd>
        </div>
      </dl>
      {why && (
        <p className="why">
          <Mark>{why}</Mark>
        </p>
      )}
      <div className="actions">
        {onApply ? (
          <button
            type="button"
            className="btn btn-line btn-sm"
            onClick={() => onApply(j.id)}
            data-apply={j.id}
          >
            Apply confidentially
          </button>
        ) : (
          <Link
            href={`/upload-resume#role=${j.role}&city=${j.city}&job=${j.id}`}
            className={`btn ${outlined ? "btn-line" : "btn-primary"} btn-sm`}
          >
            Apply confidentially
          </Link>
        )}
        <Link
          href={`/upload-resume#role=${j.role}&city=${j.city}&job=${j.id}`}
          className="btn btn-ghost btn-sm"
        >
          Am I a fit?
        </Link>
      </div>
    </article>
  );
}
