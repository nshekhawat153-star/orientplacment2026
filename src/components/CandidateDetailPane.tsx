"use client";

import React from "react";
import Link from "next/link";
import { Candidate, findCity, findRole, fmt, people } from "@/data";
import { Mark } from "./Mark";
import { Icon } from "./icons";
import { SalaryBandBar } from "./SalaryBand";

interface CandidateDetailPaneProps {
  candidate: Candidate | null;
  onRequestProfile?: (id: string) => void;
  onCloseMobile?: () => void;
}

export function CandidateDetailPane({
  candidate: c,
  onRequestProfile,
  onCloseMobile,
}: CandidateDetailPaneProps) {
  const justin = people.find((p) => p.id === "justin") || people[0];

  if (!c) {
    return (
      <div className="indeed-empty-pane">
        <div className="indeed-empty-pane-content">
          <Icon name="user" className="empty-pane-ico" />
          <h3>Select a candidate to view dossier</h3>
          <p className="muted">
            Click on any candidate card on the left to inspect their practice mix,
            bar admissions, career timeline, and compensation expectations.
          </p>
        </div>
      </div>
    );
  }

  const roleObj = findRole(c.role);
  const cityObj = findCity(c.city);
  const bars = c.bars.length ? c.bars.join(", ") : "Active state bar in good standing";

  return (
    <article className="indeed-detail-pane cand-dossier-pane" aria-labelledby="cand-title">
      {/* MOBILE CLOSE */}
      {onCloseMobile && (
        <div className="mobile-pane-bar">
          <button
            type="button"
            className="mobile-pane-close"
            onClick={onCloseMobile}
            aria-label="Back to candidate results"
          >
            ← Back to candidates
          </button>
        </div>
      )}

      {/* STICKY DOSSIER HEADER */}
      <div className="detail-sticky-head">
        <div className="detail-meta-top">
          <span className="confidential-pill">
            <Icon name="shield" className="conf-ico" />
            Verified &amp; Pre-Screened Candidate
          </span>
          <span className="candidate-id-badge">{c.id}</span>
        </div>

        <h2 id="cand-title" className="detail-job-title">
          {c.headline}
        </h2>

        <p className="detail-firm-line">
          {c.years} years of legal practice · Now at a {c.firmType.toLowerCase()} of {c.firmSize} ·{" "}
          {c.area}
        </p>

        {/* PILLS ROW */}
        <div className="detail-pills-row">
          <div className="indeed-salary-pill">
            <span className="salary-fig">{fmt.range(c.pay)}</span>
            <span className="salary-label">expected base</span>
          </div>

          <span className="mode-pill-accent">
            {c.modes.includes("hybrid") ? "Open to Hybrid or On-site" : "On-site"}
          </span>

          <span className="exp-pill-accent">Available: {c.availability}</span>
        </div>

        {/* PRIMARY CTA */}
        <div className="detail-cta-actions">
          {onRequestProfile ? (
            <button
              type="button"
              className="btn btn-primary btn-lg detail-primary-btn"
              onClick={() => onRequestProfile(c.id)}
            >
              Request Full Resume for {c.id}
            </button>
          ) : (
            <Link
              href={`/candidate/${c.id.toLowerCase()}`}
              className="btn btn-primary btn-lg detail-primary-btn"
            >
              View Full Profile
            </Link>
          )}

          <a
            href={justin.calendly || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-line btn-lg"
          >
            Discuss with Justin
          </a>
        </div>
      </div>

      {/* SCROLL BODY */}
      <div className="detail-scroll-body">
        {/* SECTION 1: PRACTICE MIX BREAKDOWN */}
        <section className="detail-section">
          <h3 className="detail-sec-h">Practice Area Breakdown</h3>
          <div className="dossier-mix-container">
            <div className="mixbar large" aria-hidden="true">
              {c.mix.map((x, idx) => (
                <i key={idx} style={{ width: `${x[1]}%` }} />
              ))}
            </div>
            <div className="dossier-mix-legend">
              {c.mix.map(([area, pct]) => (
                <div key={area} className="mix-legend-item">
                  <span className="mix-legend-pct">{pct}%</span>
                  <span className="mix-legend-name">{area}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 2: QUALIFICATIONS GRID */}
        <section className="detail-section">
          <h3 className="detail-sec-h">Key Vetting Points</h3>
          <div className="detail-specs-grid">
            <div className="spec-card">
              <span className="spec-label">Bar Admissions</span>
              <b className="spec-val">{bars}</b>
            </div>
            <div className="spec-card">
              <span className="spec-label">Current Firm Size</span>
              <b className="spec-val">
                {c.firmType} ({c.firmSize})
              </b>
            </div>
            <div className="spec-card">
              <span className="spec-label">Notice Period</span>
              <b className="spec-val">{c.availability}</b>
            </div>
            <div className="spec-card">
              <span className="spec-label">Location / Relocation</span>
              <b className="spec-val">
                {c.area}
                {c.relocate && c.relocate.length > 0
                  ? ` (Open to ${c.relocate.join(", ")})`
                  : ""}
              </b>
            </div>
          </div>
        </section>

        {/* SECTION 3: CANDIDATE'S MOTIVATION FOR A MOVE */}
        {c.why && (
          <section className="detail-section">
            <h3 className="detail-sec-h">Why This Candidate Is Looking</h3>
            <div className="dossier-why-box">
              <p className="dossier-why-text">
                &ldquo;<Mark>{c.why}</Mark>&rdquo;
              </p>
              <span className="dossier-why-note">
                Verified during screening call with Jon Missirlian.
              </span>
            </div>
          </section>
        )}

        {/* SECTION 4: CAREER TIMELINE */}
        {c.timeline && c.timeline.length > 0 && (
          <section className="detail-section">
            <h3 className="detail-sec-h">Career Progression</h3>
            <ol className="dossier-timeline">
              {c.timeline.map(([yearsSpan, titleRole, firmSummary], idx) => (
                <li key={idx} className="timeline-node">
                  <span className="timeline-year">{yearsSpan}</span>
                  <div className="timeline-info">
                    <b className="timeline-title">{titleRole}</b>
                    <span className="timeline-firm">{firmSummary}</span>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* SECTION 5: SALARY CONTEXT */}
        <section className="detail-section">
          <h3 className="detail-sec-h">Local Salary Positioning</h3>
          <p className="detail-sub-note">
            Target base pay of <b>{fmt.range(c.pay)}</b> relative to the {roleObj?.name || c.role}{" "}
            market in {cityObj?.name || c.city}:
          </p>
          <div className="detail-band-container">
            <SalaryBandBar
              citySlug={c.city}
              roleSlug={c.role}
              marker={(c.pay[0] + c.pay[1]) / 2}
            />
          </div>
        </section>

        {/* SECTION 6: ORION CONTINGENCY GUARANTEE */}
        <section className="detail-trust-box">
          <div className="trust-box-content">
            <div className="trust-avatar-badge">
              <span>JS</span>
            </div>
            <div>
              <h4>Orion One-Fee Contingency Guarantee</h4>
              <p>
                No retainer. You owe <b>20% of first-year base</b> only if you hire {c.id},
                backed by our <b>90-day replacement guarantee</b>. You keep all your other
                recruiting channels open.
              </p>
              <div className="trust-mini-strip">
                <span>Direct Contact: Justin Sofman</span>
                <span>·</span>
                <span>(201) 572-9538</span>
                <span>·</span>
                <span>justin@orionplacement.com</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}

