import React from "react";
import Link from "next/link";
import { Job, fmt, findCity } from "@/data";
import { Mark } from "./Mark";

export interface JobCardProps {
  job: Job;
  why?: string;
  onApply?: (jobId: string) => void;
  onSelect?: (job: Job) => void;
  selected?: boolean;
  outlined?: boolean;
  compact?: boolean;
}

export function JobCard({
  job: j,
  why,
  onApply,
  onSelect,
  selected,
  outlined,
  compact,
}: JobCardProps) {
  const city = findCity(j.city);

  const handleClick = (e: React.MouseEvent) => {
    // If the click is on an interactive link/button, don't trigger card selection
    if ((e.target as HTMLElement).closest("a, button")) {
      return;
    }
    if (onSelect) {
      onSelect(j);
    }
  };

  const articleClasses = [
    "job",
    selected ? "job-selected" : "",
    onSelect ? "job-clickable" : "",
    compact ? "job-compact" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article
      className={articleClasses}
      data-id={j.id}
      onClick={handleClick}
      role={onSelect ? "button" : undefined}
      tabIndex={onSelect ? 0 : undefined}
      onKeyDown={
        onSelect
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect(j);
              }
            }
          : undefined
      }
      aria-current={selected ? "true" : undefined}
    >
      <div className="job-top">
        <span className="job-conf-label">Confidential employer</span>
        <span className="job-posted-time">
          Posted <Mark>{fmt.date(j.posted)}</Mark>
        </span>
      </div>

      <h3 className="job-title-h3">
        <Mark>{j.title}</Mark>
      </h3>

      {/* INDEED-STYLE SALARY HIGHLIGHT */}
      <div className="indeed-card-pay-row">
        <span className="indeed-card-pay-pill">
          <Mark>{fmt.range(j.band)}</Mark>
        </span>
        <span className="pay-period-text">base per year</span>
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
            <span className={`work-mode-tag ${j.mode}`}>
              {j.mode === "on-site" ? "On-site" : "Hybrid"}
            </span>
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
            onClick={(e) => {
              e.stopPropagation();
              onApply(j.id);
            }}
            data-apply={j.id}
          >
            Apply confidentially
          </button>
        ) : (
          <Link
            href={`/upload-resume#role=${j.role}&city=${j.city}&job=${j.id}`}
            className={`btn ${outlined ? "btn-line" : "btn-primary"} btn-sm`}
            onClick={(e) => e.stopPropagation()}
          >
            Apply confidentially
          </Link>
        )}
        <Link
          href={`/upload-resume#role=${j.role}&city=${j.city}&job=${j.id}`}
          className="btn btn-ghost btn-sm"
          onClick={(e) => e.stopPropagation()}
        >
          Am I a fit?
        </Link>
      </div>
    </article>
  );
}
