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

  // When rendered in Indeed-style master-detail feed
  if (onSelect) {
    return (
      <article
        className={`indeed-feed-card ${selected ? "selected" : ""}`}
        data-id={j.id}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelect(j);
          }
        }}
        aria-current={selected ? "true" : undefined}
      >
        {/* TOP STATUS BADGES & ACTION ICONS */}
        <div className="feed-card-badge-row">
          <div className="feed-badges-left">
            {(j.easilyApply || true) && (
              <span className="indeed-badge-easily-apply">
                <svg viewBox="0 0 16 16" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="3.5 8.5 6.5 11.5 12.5 4.5" />
                </svg>
                Easily apply
              </span>
            )}
            {j.urgentlyHiring && (
              <span className="indeed-badge-urgently-hiring">
                <span className="urgent-dot" />
                Urgently hiring
              </span>
            )}
          </div>
          <div className="feed-card-actions-right">
            <button
              type="button"
              className="feed-icon-action-btn"
              aria-label="Save job"
              onClick={(e) => {
                e.stopPropagation();
              }}
              title="Save job"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
            </button>
            <button
              type="button"
              className="feed-icon-action-btn"
              aria-label="Not interested"
              onClick={(e) => {
                e.stopPropagation();
              }}
              title="Not interested"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17" />
              </svg>
            </button>
          </div>
        </div>

        {/* JOB TITLE */}
        <h3 className="feed-card-title">
          <Mark>{j.title}</Mark>
        </h3>

        {/* FIRM & RATING */}
        <div className="feed-card-firm">
          <span>{j.firmType} ({j.firmSize})</span>
          <span className="firm-star-rating">
            <svg viewBox="0 0 16 16" width="10.5" height="10.5" fill="currentColor" aria-hidden="true">
              <path d="M8 1.5l2 4.2 4.6.7-3.3 3.2.8 4.6L8 12l-4.1 2.2.8-4.6-3.3-3.2 4.6-.7L8 1.5z" />
            </svg>
            4.8
          </span>
        </div>

        {/* LOCATION */}
        <div className="feed-card-location">
          <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0, opacity: 0.75 }}>
            <path d="M8 1.5a4.5 4.5 0 0 0-4.5 4.5c0 3.375 4.5 8.5 4.5 8.5s4.5-5.125 4.5-8.5A4.5 4.5 0 0 0 8 1.5z" />
            <circle cx="8" cy="6" r="1.5" />
          </svg>
          <span>{j.mode === "hybrid" ? "Hybrid in " : ""}{j.area}, {city ? city.name : j.city}</span>
        </div>

        {/* SALARY & WORK TYPE PILLS */}
        <div className="feed-card-tags">
          <span className="feed-tag-salary-pill">
            <Mark>{fmt.range(j.band)}</Mark> <span className="feed-tag-yr">/yr</span>
          </span>
          <span className="feed-tag-pill">
            Full-time
          </span>
          <span className="feed-tag-pill">
            {j.mode === "on-site" ? "On-site" : "Hybrid work"}
          </span>
        </div>

        {/* FOOTER */}
        <div className="feed-card-footer">
          <span className="feed-posted">Active {fmt.date(j.posted)}</span>
          <span className="feed-dot">·</span>
          <span className="feed-confidential">
            <svg viewBox="0 0 16 16" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="6.5" width="10" height="7.5" rx="1.5" />
              <path d="M5.5 6.5V4.5a2.5 2.5 0 0 1 5 0v2" />
            </svg>
            Confidential employer
          </span>
        </div>
      </article>
    );
  }

  // Classic standalone card fallback for other pages
  return (
    <article
      className={articleClasses}
      data-id={j.id}
      onClick={handleClick}
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
