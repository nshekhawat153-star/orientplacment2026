"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Job, findCity, findRole, findBand, fmt, people, trust } from "@/data";
import { JobApplyModal } from "@/components/JobApplyModal";
import { practiceLabel, modeLabel } from "./jobUtils";

/* Detail pane for one job on /jobs. Desktop: sticky right column.
   Mobile: rendered inside a full-screen sheet (onClose shows the back bar). */

interface JobSeatPaneProps {
  job: Job;
  onClose?: () => void;
}

const Arrow = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const Check = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="3.5 8.5 6.5 11.5 12.5 4.5" />
  </svg>
);

export function JobSeatPane({ job, onClose }: JobSeatPaneProps) {
  const [applyOpen, setApplyOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const city = findCity(job.city);
  const role = findRole(job.role);
  const band = findBand(job.city, job.role);
  const justin = people.find((p) => p.id === "justin") || people[0];
  const cityName = city ? city.name : job.city;
  const mid = (job.band[0] + job.band[1]) / 2;

  // Market comparison: this seat's range against the city's band for the role
  let cmp: { lo: number; hi: number; median: number; x: (v: number) => number; diff: number } | null = null;
  if (band) {
    const lo = Math.min(band.b1[0], job.band[0]) - 5;
    const hi = Math.max(band.b3[1], job.band[1]) + 5;
    cmp = {
      lo,
      hi,
      median: band.median,
      x: (v: number) => Math.max(0, Math.min(100, ((v - lo) / (hi - lo)) * 100)),
      diff: Math.round(mid - band.median),
    };
  }

  const share = () => {
    if (typeof window === "undefined") return;
    const url = `${window.location.origin}/jobs?job=${encodeURIComponent(job.id)}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(
        () => {
          setCopied(true);
          window.setTimeout(() => setCopied(false), 2000);
        },
        () => undefined
      );
    }
  };

  return (
    <article className="js" aria-labelledby="js-title">
      {onClose && (
        <div className="js-mbar">
          <button type="button" className="js-back" onClick={onClose}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M19 12H5M11 18l-6-6 6-6" />
            </svg>
            All jobs
          </button>
        </div>
      )}

      {/* HEADER */}
      <header className="js-head">
        <div className="js-tags">
          <span className="js-practice">{practiceLabel(job.role)}</span>
          {job.urgentlyHiring && (
            <span className="js-urgent">
              <span aria-hidden="true" />
              Hiring now
            </span>
          )}
          <span className="js-posted">Posted {fmt.date(job.posted)}</span>
        </div>
        <h2 id="js-title" className="js-title">
          {job.title}
        </h2>
        <p className="js-firm">
          {job.firmType} · {job.firmSize}
          <span className="js-conf">
            <svg viewBox="0 0 16 16" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="6.5" width="10" height="7.5" rx="1.5" />
              <path d="M5.5 6.5V4.5a2.5 2.5 0 0 1 5 0v2" />
            </svg>
            Confidential employer
          </span>
        </p>

        <div className="js-paycard">
          <div>
            <span className="js-pay-k">Base salary</span>
            <span className="js-pay">{fmt.range(job.band)}</span>
            <span className="js-pay-sub">a year · Full-time</span>
          </div>
          {cmp && (
            <span className={`js-pay-vs${cmp.diff >= 0 ? " is-up" : ""}`}>
              {cmp.diff === 0
                ? `At the ${cityName} median`
                : `${fmt.k(Math.abs(cmp.diff))} ${cmp.diff > 0 ? "above" : "below"} the ${cityName} median`}
            </span>
          )}
        </div>

        <div className="js-actions">
          <button type="button" className="js-apply" onClick={() => setApplyOpen(true)}>
            Apply confidentially <Arrow />
          </button>
          <button
            type="button"
            className={`js-icon${saved ? " is-on" : ""}`}
            onClick={() => setSaved((s) => !s)}
            aria-pressed={saved}
            aria-label={saved ? "Saved" : "Save job"}
            title={saved ? "Saved" : "Save job"}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </button>
          <button type="button" className="js-icon" onClick={share} aria-label="Copy link to this job" title="Copy link">
            {copied ? (
              <Check />
            ) : (
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7" />
                <path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" />
              </svg>
            )}
          </button>
          {copied && (
            <span className="js-copied" role="status">
              Link copied
            </span>
          )}
        </div>
      </header>

      <div className="js-body">
        {/* AT A GLANCE */}
        <section className="js-sec" aria-label="At a glance">
          <dl className="js-facts">
            <div>
              <dt>Experience</dt>
              <dd>{job.years}</dd>
            </div>
            <div>
              <dt>Work arrangement</dt>
              <dd>{job.mode === "on-site" ? "On-site, Monday to Friday" : "Hybrid with set WFH days"}</dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>
                {job.area}, {cityName}
              </dd>
            </div>
            <div>
              <dt>Firm</dt>
              <dd>
                {job.firmType}, {job.firmSize}
              </dd>
            </div>
            <div className="is-wide">
              <dt>Practice focus</dt>
              <dd>{job.mix}</dd>
            </div>
          </dl>
        </section>

        {/* DESCRIPTION */}
        <section className="js-sec">
          <h3 className="js-h3">About the seat</h3>
          <p className="js-p">
            A small-to-midsize firm in <b>{job.area}</b> is hiring a <b>{job.title}</b> ({job.years}) to run an active
            caseload in <b>{job.mix.toLowerCase()}</b>.
          </p>
          <h4 className="js-h4">What this seat offers</h4>
          <ul className="js-list">
            <li>
              <Check />
              <span>
                <b>Manageable billable targets.</b> Focus on work quality and client relationships, without 2,000+ hour
                pressure.
              </span>
            </li>
            <li>
              <Check />
              <span>
                <b>Direct partner mentorship.</b> Work alongside senior partners with dedicated paralegal support.
              </span>
            </li>
            <li>
              <Check />
              <span>
                <b>Merit-based origination.</b> Structured bonus model with transparent numbers.
              </span>
            </li>
            <li>
              <Check />
              <span>
                <b>Fully confidential.</b> Managed by Orion Placement. Your current firm is never contacted without your
                written approval.
              </span>
            </li>
          </ul>
        </section>

        {/* MARKET COMPARISON */}
        {cmp && (
          <section className="js-sec">
            <div className="js-sec-head">
              <h3 className="js-h3">How the pay compares</h3>
              <Link href={`/salaries/${job.role}/${job.city}`} className="js-link">
                {cityName} salary guide <Arrow />
              </Link>
            </div>
            <p className="js-p js-muted">
              {role ? role.name : practiceLabel(job.role)} base salaries in {cityName}, all experience levels.
            </p>
            <div className="js-band" role="img" aria-label={`This seat pays ${fmt.range(job.band)}. ${cityName} median is ${fmt.k(cmp.median)}.`}>
              <div className="js-band-track">
                <span
                  className="js-band-market"
                  style={{ left: `${cmp.x(band!.b1[0])}%`, width: `${cmp.x(band!.b3[1]) - cmp.x(band!.b1[0])}%` }}
                />
                <span
                  className="js-band-seat"
                  style={{ left: `${cmp.x(job.band[0])}%`, width: `${cmp.x(job.band[1]) - cmp.x(job.band[0])}%` }}
                />
                <span className="js-band-med" style={{ left: `${cmp.x(cmp.median)}%` }} />
              </div>
              <div className="js-band-axis">
                <span>{fmt.k(band!.b1[0])}</span>
                <span>{fmt.k(band!.b3[1])}</span>
              </div>
              <div className="js-band-key">
                <span className="k-seat">This seat {fmt.range(job.band)}</span>
                <span className="k-med">Median {fmt.k(cmp.median)}</span>
                <span className="k-mkt">Market range</span>
              </div>
            </div>
          </section>
        )}

        {/* JUSTIN */}
        <section className="js-justin">
          <Image src={justin.photo} alt={justin.name} width={56} height={56} className="js-justin-photo" />
          <div>
            <h3>Screened by {justin.name}</h3>
            <p>He speaks with you privately before your profile goes to any firm.</p>
            <div className="js-justin-meta">
              <span>
                <span className="js-star" aria-hidden="true">★</span> {trust.rating} · {trust.reviews} Google reviews
              </span>
              <a href={trust.calendly} target="_blank" rel="noopener noreferrer">
                Book 15 min →
              </a>
            </div>
          </div>
        </section>

        {/* CLOSING APPLY */}
        <section className="js-close">
          <h3>Interested in this seat?</h3>
          <p>Send your resume, bar status and pay expectations. Nothing goes to the firm without your yes.</p>
          <button type="button" className="js-apply" onClick={() => setApplyOpen(true)}>
            Apply confidentially <Arrow />
          </button>
        </section>
      </div>

      {/* Mobile: apply always reachable */}
      {onClose && (
        <div className="js-sticky">
          <div>
            <strong>{fmt.range(job.band)}</strong>
            <span>
              {modeLabel(job.mode)} · {cityName}
            </span>
          </div>
          <button type="button" className="js-apply" onClick={() => setApplyOpen(true)}>
            Apply
          </button>
        </div>
      )}

      <JobApplyModal job={job} isOpen={applyOpen} onClose={() => setApplyOpen(false)} />
    </article>
  );
}
