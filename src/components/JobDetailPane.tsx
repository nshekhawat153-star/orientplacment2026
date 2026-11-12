"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Job, findCity, findRole, fmt, trust } from "@/data";
import { Mark } from "./Mark";
import { Icon } from "./icons";
import { SalaryBandBar } from "./SalaryBand";

interface JobDetailPaneProps {
  job: Job | null;
  onCloseMobile?: () => void;
}

export function JobDetailPane({ job, onCloseMobile }: JobDetailPaneProps) {
  const [applied, setApplied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [applicantName, setApplicantName] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [applicantPhone, setApplicantPhone] = useState("");
  const [applicantNote, setApplicantNote] = useState("");
  const [submitting, setSubmitting] = useState(false);

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

  const handleQuickApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantEmail) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setApplied(true);
    }, 600);
  };

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
          <span className="firm-name-link">{job.firmType} ({job.firmSize})</span>
          <span className="firm-rating">5.0 ★</span>
        </div>

        <div className="clean-location-line">
          <span>{job.area}, {cityObj?.name || job.city}</span>
        </div>

        <div className="clean-work-type">
          <span>Full-time · {job.mode === "on-site" ? "On-site" : "Hybrid"}</span>
        </div>

        {/* PRIMARY ACTION BAR */}
        <div className="clean-action-bar">
          <a
            href="#quick-apply"
            className="btn btn-primary clean-apply-btn"
          >
            Apply Confidentially
          </a>

          <button
            type="button"
            className={`clean-icon-btn ${saved ? "saved" : ""}`}
            onClick={() => setSaved(!saved)}
            title={saved ? "Job saved" : "Save job"}
            aria-label="Save job"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.75">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </button>

          <Link
            href={`/upload-resume#role=${job.role}&city=${job.city}&job=${job.id}`}
            className="clean-icon-btn"
            title="Upload resume for match"
            aria-label="Upload resume"
          >
            <Icon name="upload" className="ico-clean" />
          </Link>
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
              <span className="fact-icon">💵</span>
              <div className="fact-content">
                <span className="fact-title">Pay</span>
                <span className="fact-value fact-pay-highlight">
                  {fmt.range(job.band)} a year <span className="fact-sub">(first-year base)</span>
                </span>
              </div>
            </div>

            <div className="fact-item">
              <span className="fact-icon">💼</span>
              <div className="fact-content">
                <span className="fact-title">Job type</span>
                <span className="fact-value">Full-time</span>
              </div>
            </div>

            <div className="fact-item">
              <span className="fact-icon">📍</span>
              <div className="fact-content">
                <span className="fact-title">Location</span>
                <span className="fact-value">{job.area}, {cityObj?.name || job.city}</span>
              </div>
            </div>

            <div className="fact-item">
              <span className="fact-icon">🏢</span>
              <div className="fact-content">
                <span className="fact-title">Work arrangement</span>
                <span className="fact-value">
                  {job.mode === "on-site" ? "On-site, Monday to Friday" : "Hybrid with set WFH days"}
                </span>
              </div>
            </div>

            <div className="fact-item">
              <span className="fact-icon">⚖️</span>
              <div className="fact-content">
                <span className="fact-title">Practice focus</span>
                <span className="fact-value">{job.mix}</span>
              </div>
            </div>

            <div className="fact-item">
              <span className="fact-icon">🎓</span>
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

        {/* JON SCREENING TRUST CARD */}
        <section className="clean-trust-card">
          <div className="trust-avatar">JM</div>
          <div className="trust-text">
            <h4>Screened by Jon Missirlian</h4>
            <p>
              Head of Screening at Orion. Jon speaks with you privately before any profile
              is shared with a firm.
            </p>
            <div className="trust-links">
              <span>⭐ 5.0 Google Rating (60 reviews)</span>
              <span>·</span>
              <a href={trust.calendly} target="_blank" rel="noopener noreferrer">
                Book 15 mins with Jon
              </a>
            </div>
          </div>
        </section>

        {/* QUICK APPLICATION BOX */}
        <section className="clean-apply-box" id="quick-apply">
          <h3 className="clean-subhead">Apply Confidentially</h3>
          <p className="muted" style={{ fontSize: "13.5px", margin: "4px 0 16px" }}>
            Submit your information directly to Jon. No one at your current firm will ever know.
          </p>

          {applied ? (
            <div className="clean-success-alert">
              <Icon name="check" className="alert-ico" />
              <div>
                <b>Application received confidentially.</b>
                <p>Jon Missirlian will review your note and contact you at {applicantEmail}.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleQuickApply} className="clean-apply-form">
              <div className="form-row-2">
                <div className="field">
                  <label htmlFor="qa-name">Full name</label>
                  <input
                    id="qa-name"
                    type="text"
                    required
                    placeholder="Your name"
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                  />
                </div>
                <div className="field">
                  <label htmlFor="qa-email">Personal email</label>
                  <input
                    id="qa-email"
                    type="email"
                    required
                    placeholder="personal@gmail.com"
                    value={applicantEmail}
                    onChange={(e) => setApplicantEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div className="field">
                  <label htmlFor="qa-phone">Phone number</label>
                  <input
                    id="qa-phone"
                    type="tel"
                    placeholder="(555) 000-0000"
                    value={applicantPhone}
                    onChange={(e) => setApplicantPhone(e.target.value)}
                  />
                </div>
                <div className="field">
                  <label htmlFor="qa-note">State Bar / Experience</label>
                  <input
                    id="qa-note"
                    type="text"
                    placeholder="e.g. TX Bar 2021, 4 yrs exp"
                    value={applicantNote}
                    onChange={(e) => setApplicantNote(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-actions-clean">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={submitting}
                >
                  {submitting ? "Submitting..." : "Submit Confidential Application"}
                </button>
                <span className="privacy-badge">
                  <Icon name="lock" className="lock-ico-sm" /> 100% Confidential
                </span>
              </div>
            </form>
          )}
        </section>
      </div>
    </article>
  );
}
