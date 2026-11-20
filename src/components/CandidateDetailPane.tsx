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
    <article className="indeed-clean-detail-pane cand-clean-pane" aria-labelledby="cand-title">
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

      {/* TOP HEADER (CLEAN INDEED STYLE) */}
      <div className="clean-detail-header">
        <div className="detail-meta-top" style={{ marginBottom: 6 }}>
          <span className="confidential-pill">
            <Icon name="shield" className="conf-ico" />
            Verified &amp; Pre-Screened
          </span>
          <span className="candidate-id-badge">{c.id}</span>
        </div>

        <h2 id="cand-title" className="clean-job-title">
          {c.headline}
        </h2>

        <div className="clean-firm-line">
          <span className="firm-name-link">{c.years} yrs experience · {c.firmType}</span>
          <span className="firm-rating">5.0 <span style={{ color: "#F59E0B" }}>★</span></span>
        </div>

        <div className="clean-location-line">
          <span>{c.area} · {bars}</span>
        </div>

        <div className="clean-work-type">
          <span className="feed-tag feed-tag-pay" style={{ marginRight: 6 }}>
            {fmt.range(c.pay)} expected
          </span>
          <span>{c.modes.includes("hybrid") ? "Hybrid / On-site" : "On-site"} · Available: {c.availability}</span>
        </div>

        {/* PRIMARY ACTION BAR */}
        <div className="clean-action-bar">
          {onRequestProfile ? (
            <button
              type="button"
              className="btn btn-primary clean-apply-btn"
              onClick={() => onRequestProfile(c.id)}
            >
              Request Full Resume ({c.id})
            </button>
          ) : (
            <Link
              href={`/candidate/${c.id.toLowerCase()}`}
              className="btn btn-primary clean-apply-btn"
            >
              View Full Profile
            </Link>
          )}

          <a
            href={justin.calendly || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="clean-icon-btn"
            title="Book Call with Justin"
            aria-label="Book Call with Justin"
            style={{ width: "auto", padding: "0 14px", gap: 6, fontSize: 13.5, fontWeight: 500 }}
          >
            <Icon name="calendar" className="ico-clean" />
            <span>Book Call</span>
          </a>
        </div>
      </div>

      <hr className="detail-clean-hr" />

      {/* CANDIDATE DETAILS BODY */}
      <div className="clean-detail-body" style={{ overflowY: "visible", maxHeight: "none" }}>
        {/* STRUCTURED SPECS LIST */}
        <section className="clean-job-details-block">
          <h3 className="clean-subhead">Candidate details</h3>
          <p className="clean-subhead-note">
            Key qualifications verified directly by Orion Placement.
          </p>

          <div className="clean-facts-list">
            <div className="fact-item">
              <span className="fact-icon">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </span>
              <div className="fact-content">
                <span className="fact-title">Expected compensation</span>
                <span className="fact-value fact-pay-highlight">
                  {fmt.range(c.pay)} base salary
                </span>
              </div>
            </div>

            <div className="fact-item">
              <span className="fact-icon">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
              </span>
              <div className="fact-content">
                <span className="fact-title">Current firm background</span>
                <span className="fact-value">
                  {c.years} years practice at a {c.firmType.toLowerCase()} of {c.firmSize}
                </span>
              </div>
            </div>

            <div className="fact-item">
              <span className="fact-icon">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </span>
              <div className="fact-content">
                <span className="fact-title">Location &amp; Bar status</span>
                <span className="fact-value">
                  {c.area} · {bars}
                  {c.relocate && c.relocate.length > 0 ? ` (Open to ${c.relocate.join(", ")})` : ""}
                </span>
              </div>
            </div>

            <div className="fact-item">
              <span className="fact-icon">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </span>
              <div className="fact-content">
                <span className="fact-title">Availability</span>
                <span className="fact-value">{c.availability}</span>
              </div>
            </div>
          </div>
        </section>

        <hr className="detail-clean-hr" />
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
                Verified during screening call with Justin Sofman.
              </span>
            </div>
          </section>
        )}

        {/* SECTION 4: CAREER TIMELINE */}
        {c.timeline && c.timeline.length > 0 && (
          <section className="detail-section">
            <h3 className="detail-sec-h">Career Progression</h3>
            <ol
              className="dossier-timeline"
              style={{
                listStyle: "none",
                padding: 0,
                margin: "14px 0 0",
                borderLeft: "2px solid #E2E8F0",
                paddingLeft: 18,
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              {c.timeline.map(([yearsSpan, titleRole, firmSummary], idx) => (
                <li
                  key={idx}
                  className="dossier-timeline-item"
                  style={{
                    position: "relative",
                    width: "100%",
                    maxWidth: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      left: -23,
                      top: 5,
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "#1D4ED8",
                      border: "2px solid #FFFFFF",
                      boxShadow: "0 0 0 2px #E2E8F0",
                    }}
                    aria-hidden="true"
                  />
                  <span
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#1D4ED8",
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                    }}
                  >
                    {yearsSpan}
                  </span>
                  <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <b style={{ fontSize: 14.5, fontWeight: 600, color: "#08142A" }}>
                      {titleRole}
                    </b>
                    <span style={{ fontSize: 13, color: "#475569", lineHeight: 1.5 }}>
                      {firmSummary}
                    </span>
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
                No retainer. You owe <b>23% of candidate&apos;s compensation</b> only if you hire {c.id},
                backed by our <b>90-day replacement guarantee</b>. You keep all your other
                recruiting channels open.
              </p>
              <div className="trust-mini-strip">
                <span>Direct Contact: Justin Sofman</span>
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

