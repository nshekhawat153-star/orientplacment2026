"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Job, findCity, findRole, fmt, trust } from "@/data";
import { Mark } from "./Mark";
import { Icon } from "./icons";
import { SalaryBandBar } from "./SalaryBand";
import { JobApplyModal } from "./JobApplyModal";

interface JobDetailPaneProps {
  job: Job | null;
  onCloseMobile?: () => void;
}

export function JobDetailPane({ job, onCloseMobile }: JobDetailPaneProps) {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!job) {
    return (
      <div className="indeed-empty-pane">
        <div className="indeed-empty-pane-content">
          <Icon name="brief" className="empty-pane-ico" />
          <h3>Select a job to view details</h3>
          <p className="muted">
            Click on any job card on the left to inspect full seat specifications,
            compensation details, and confidential firm overview.
          </p>
        </div>
      </div>
    );
  }

  const cityObj = findCity(job.city);
  const roleObj = findRole(job.role);

  return (
    <article className="indeed-clean-detail-pane" aria-labelledby="detail-title">
      {/* MOBILE CLOSE */}
      {onCloseMobile && (
        <div className="mobile-pane-bar">
          <button
            type="button"
            className="mobile-pane-close"
            onClick={onCloseMobile}
            aria-label="Back to job listings"
          >
            ← Back to jobs
          </button>
        </div>
      )}

      {/* TOP HEADER (MATCHING INDEED SCREENSHOT 2) */}
      <div className="clean-detail-header">
        <div className="detail-title-row">
          <h2 id="detail-title" className="clean-job-title">
            {job.title}
          </h2>
        </div>

        <div className="clean-firm-line">
          <span className="firm-name-link">
            {job.firmType} ({job.firmSize})
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: 4 }}>
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
            </svg>
          </span>
          <span className="firm-rating">4.8 <span style={{ color: "#F59E0B" }}>★</span></span>
        </div>

        <div className="clean-location-line">
          <span>{job.area}, {cityObj?.name || job.city} • {job.mode === "on-site" ? "On-site" : "Hybrid"}</span>
        </div>

        <div className="clean-work-type">
          <span>{fmt.range(job.band)} a year - Full-time</span>
        </div>

        {/* PRIMARY ACTION BAR MATCHING SCREENSHOT */}
        <div className="clean-action-bar">
          <button
            type="button"
            className="btn btn-primary clean-apply-btn"
            onClick={() => setIsApplyModalOpen(true)}
          >
            Apply now
          </button>

          <button
            type="button"
            className={`clean-icon-btn ${saved ? "saved" : ""}`}
            onClick={() => setSaved(!saved)}
            title={saved ? "Job saved" : "Save job"}
            aria-label="Save job"
          >
            <svg viewBox="0 0 24 24" width="19" height="19" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.75">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </button>

          <button
            type="button"
            className="clean-icon-btn"
            title="Not interested"
            aria-label="Not interested"
          >
            <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.75">
              <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17" />
            </svg>
          </button>

          <button
            type="button"
            className="clean-icon-btn"
            title="Share job"
            aria-label="Share job"
            onClick={() => {
              if (typeof navigator !== "undefined" && navigator.clipboard) {
                navigator.clipboard.writeText(window.location.href);
              }
            }}
          >
            <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.75">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13" />
            </svg>
          </button>
        </div>
      </div>

      <hr className="detail-clean-hr" />

      {/* JOB DETAILS SECTION (INDEED STYLE) */}
      <div className="clean-detail-body">
        <section className="clean-job-details-block">
          <h3 className="clean-subhead">Job details</h3>
          <p className="clean-subhead-note">
            Here&apos;s how the job details align with market requirements.
          </p>

          <div className="clean-facts-list">
            <div className="fact-item">
              <span className="fact-icon">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
              </span>
              <div className="fact-content">
                <span className="fact-title">Pay</span>
                <span className="fact-value fact-pay-highlight">
                  {fmt.range(job.band)} a year <span className="fact-sub">(first-year base)</span>
                </span>
              </div>
            </div>

            <div className="fact-item">
              <span className="fact-icon">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="7" width="20" height="14" rx="2" />
                  <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                </svg>
              </span>
              <div className="fact-content">
                <span className="fact-title">Job type</span>
                <span className="fact-value">Full-time</span>
              </div>
            </div>

            <div className="fact-item">
              <span className="fact-icon">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </span>
              <div className="fact-content">
                <span className="fact-title">Location</span>
                <span className="fact-value">{job.area}, {cityObj?.name || job.city}</span>
              </div>
            </div>

            <div className="fact-item">
              <span className="fact-icon">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="4" y="2" width="16" height="20" rx="2" />
                  <path d="M9 22v-4h6v4" />
                  <line x1="8" y1="6" x2="10" y2="6" />
                  <line x1="14" y1="6" x2="16" y2="6" />
                  <line x1="8" y1="10" x2="10" y2="10" />
                  <line x1="14" y1="10" x2="16" y2="10" />
                </svg>
              </span>
              <div className="fact-content">
                <span className="fact-title">Work arrangement</span>
                <span className="fact-value">
                  {job.mode === "on-site" ? "On-site, Monday to Friday" : "Hybrid with set WFH days"}
                </span>
              </div>
            </div>

            <div className="fact-item">
              <span className="fact-icon">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 3v18M3 7h18M6 7l-3 7h6L6 7zm12 0l-3 7h6l-3-7z" />
                </svg>
              </span>
              <div className="fact-content">
                <span className="fact-title">Practice focus</span>
                <span className="fact-value">{job.mix}</span>
              </div>
            </div>

            <div className="fact-item">
              <span className="fact-icon">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              </span>
              <div className="fact-content">
                <span className="fact-title">Experience level</span>
                <span className="fact-value">{job.years}</span>
              </div>
            </div>
          </div>
        </section>

        <hr className="detail-clean-hr" />

        {/* FULL JOB DESCRIPTION */}
        <section className="clean-description-block">
          <h3 className="clean-subhead">Full job description</h3>

          <div className="clean-desc-text">
            <p>
              A reputable small-to-midsize legal firm in <b>{job.area}</b> is seeking an
              experienced <b>{job.title}</b> ({job.years}) to handle active caseloads in{" "}
              <b>{job.mix}</b>.
            </p>

            <h4>What this seat offers:</h4>
            <ul>
              <li>
                <b>Manageable Billable Targets:</b> Focus on work quality and client relationships,
                avoiding 2,000+ annual hour pressure.
              </li>
              <li>
                <b>Direct Partner Mentorship:</b> Work collaboratively with senior partners and
                dedicated paralegal support.
              </li>
              <li>
                <b>Merit-Based Origination:</b> Structured bonus models with transparent financial metrics.
              </li>
              <li>
                <b>100% Confidential Representation:</b> Managed directly by Orion Placement.
                Your current firm is never notified without your prior written approval.
              </li>
            </ul>
          </div>
        </section>

        <hr className="detail-clean-hr" />

        {/* MARKET COMPENSATION BENCHMARK */}
        <section className="clean-benchmark-block">
          <div className="benchmark-head">
            <h3 className="clean-subhead">Market Compensation Benchmark</h3>
            <Link
              href={`/salaries/${job.role}/${job.city}`}
              className="benchmark-link"
            >
              See {cityObj?.name} salary guide →
            </Link>
          </div>
          <p className="muted" style={{ fontSize: "13px", margin: "2px 0 12px" }}>
            Where this seat sits relative to {roleObj?.name || job.role} base salaries:
          </p>

          <SalaryBandBar
            citySlug={job.city}
            roleSlug={job.role}
            marker={(job.band[0] + job.band[1]) / 2}
          />
        </section>

        <hr className="detail-clean-hr" />

        {/* JUSTIN SCREENING TRUST CARD */}
        <section className="clean-trust-card">
          <div className="trust-avatar">JS</div>
          <div className="trust-text">
            <h4>Screened by Justin Sofman</h4>
            <p>
              Managing Partner at Orion Placement. Justin speaks with you privately before any dossier
              is shared with a firm.
            </p>
            <div className="trust-links">
              <span><span style={{ color: "#F59E0B" }}>★</span> 5.0 Rating (60+ verified reviews)</span>
              <span>·</span>
              <a href={trust.calendly} target="_blank" rel="noopener noreferrer">
                Book 15 mins with Justin
              </a>
            </div>
          </div>
        </section>

        {/* BOTTOM ACTION & CONFIDENTIAL INTAKE BANNER */}
        <section className="clean-apply-box" style={{ textAlign: "center", padding: "32px 24px", background: "#FAF9F5", borderRadius: 10, border: "1px solid #E2E8F0" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 999, padding: "5px 14px", fontFamily: "var(--mono)", fontSize: 11, fontWeight: 700, color: "#1D4ED8", marginBottom: 12 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#1D4ED8" }} />
            <span>DIRECT CANDIDATE INTAKE · ZERO FIRM DISCLOSURE</span>
          </div>
          <h3 className="clean-subhead" style={{ fontSize: 20, marginBottom: 8, color: "#08142A" }}>
            Ready to explore this confidential seat?
          </h3>
          <p className="muted" style={{ fontSize: "14px", maxWidth: 520, margin: "0 auto 22px", lineHeight: 1.6, color: "#64748B" }}>
            Submit your resume, Texas Bar status, and compensation expectations through Orion&apos;s 100% confidential application flow.
          </p>

          <button
            type="button"
            className="btn btn-primary clean-apply-btn"
            style={{ minWidth: 260, margin: "0 auto", padding: "14px 28px", fontSize: 15 }}
            onClick={() => setIsApplyModalOpen(true)}
          >
            Apply now for this seat →
          </button>
        </section>
      </div>

      {/* INDEED-STYLE MULTI-STEP APPLICATION MODAL */}
      <JobApplyModal
        job={job}
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
      />
    </article>
  );
}
