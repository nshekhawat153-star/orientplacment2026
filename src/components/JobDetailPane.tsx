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
          <h3>Select a role to view details</h3>
          <p className="muted">
            Click on any job card on the left to inspect full seat specifications,
            confidential firm overview, and market compensation comparison.
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
    <article className="indeed-detail-pane" aria-labelledby="detail-title">
      {/* MOBILE CLOSE HEADER */}
      {onCloseMobile && (
        <div className="mobile-pane-bar">
          <button
            type="button"
            className="mobile-pane-close"
            onClick={onCloseMobile}
            aria-label="Back to job listings"
          >
            ← Back to listings
          </button>
        </div>
      )}

      {/* STICKY TOP ACTION HEADER */}
      <div className="detail-sticky-head">
        <div className="detail-meta-top">
          <span className="confidential-pill">
            <Icon name="lock" className="conf-ico" />
            Confidential Law Firm
          </span>
          <span className="posted-meta">
            Posted <Mark>{fmt.date(job.posted)}</Mark>
          </span>
        </div>

        <h2 id="detail-title" className="detail-job-title">
          {job.title}
        </h2>

        <p className="detail-firm-line">
          <b>{job.firmType}</b> ({job.firmSize}) · {job.area}, {cityObj?.name || job.city}
        </p>

        {/* INDEED-STYLE SALARY & MODE PILL GROUP */}
        <div className="detail-pills-row">
          <div className="indeed-salary-pill">
            <span className="salary-fig">{fmt.range(job.band)}</span>
            <span className="salary-label">first-year base pay</span>
          </div>

          <span className="mode-pill-accent">
            {job.mode === "on-site" ? "On-site · Monday to Friday" : "Hybrid · Set WFH days"}
          </span>

          <span className="exp-pill-accent">{job.years} experience</span>
        </div>

        {/* PRIMARY CTA BAR */}
        <div className="detail-cta-actions">
          <a
            href="#apply-box"
            className="btn btn-primary btn-lg detail-primary-btn"
          >
            Apply Confidentially
          </a>
          <Link
            href={`/upload-resume#role=${job.role}&city=${job.city}&job=${job.id}`}
            className="btn btn-line btn-lg"
          >
            Match My Resume
          </Link>
          <a
            href={trust.calendly}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost btn-lg detail-cal-btn"
            title="Book 15 minutes with Jon"
          >
            Ask Jon a Question
          </a>
        </div>
      </div>

      {/* DETAIL BODY SECTIONS */}
      <div className="detail-scroll-body">
        {/* SECTION 1: SEAT OVERVIEW */}
        <section className="detail-section">
          <h3 className="detail-sec-h">Role Overview & Firm Dynamics</h3>
          <div className="detail-specs-grid">
            <div className="spec-card">
              <span className="spec-label">Practice Focus</span>
              <b className="spec-val">{job.mix}</b>
            </div>
            <div className="spec-card">
              <span className="spec-label">Experience Level</span>
              <b className="spec-val">{job.years}</b>
            </div>
            <div className="spec-card">
              <span className="spec-label">Location / Work Mode</span>
              <b className="spec-val">
                {job.area} ({job.mode === "on-site" ? "On-site" : "Hybrid"})
              </b>
            </div>
            <div className="spec-card">
              <span className="spec-label">Firm Environment</span>
              <b className="spec-val">
                {job.firmType} ({job.firmSize})
              </b>
            </div>
          </div>
        </section>

        {/* SECTION 2: WHAT THIS FIRM OFFERS */}
        <section className="detail-section">
          <h3 className="detail-sec-h">What This Seat Offers</h3>
          <ul className="detail-bullet-list">
            <li>
              <b>Direct Partner Mentorship:</b> Work alongside established partners with
              collaborative caseload management and active paralegal support.
            </li>
            <li>
              <b>Realistic Billable Expectations:</b> Unlike mega-firms requiring 2,000+
              annual hours, boutique & mid-size seats focus on client retention, work
              quality, and work-life balance.
            </li>
            <li>
              <b>Clear Advancement:</b> Definite path to senior associate or partnership
              track with merit-based bonus origination structures.
            </li>
            <li>
              <b>Discretion & Confidentiality:</b> This search is exclusively handled by
              Orion. Your current firm is never contacted or informed.
            </li>
          </ul>
        </section>

        {/* SECTION 3: MARKET SALARY BENCHMARK */}
        <section className="detail-section">
          <div className="detail-sec-head-flex">
            <div>
              <h3 className="detail-sec-h" style={{ marginBottom: 2 }}>
                Market Compensation Benchmark
              </h3>
              <p className="detail-sub-note">
                How this base pay compares to {roleObj?.name || job.role} roles in{" "}
                {cityObj?.name || job.city}:
              </p>
            </div>
            <Link
              href={`/salaries/${job.role}/${job.city}`}
              className="detail-benchmark-link"
            >
              See full salary report →
            </Link>
          </div>

          <div className="detail-band-container">
            <SalaryBandBar
              citySlug={job.city}
              roleSlug={job.role}
              marker={(job.band[0] + job.band[1]) / 2}
            />
          </div>
        </section>

        {/* SECTION 4: TRUST & SCREENING PROMISE */}
        <section className="detail-trust-box">
          <div className="trust-box-content">
            <div className="trust-avatar-badge">
              <span>JM</span>
            </div>
            <div>
              <h4>Screened Personally by Jon Missirlian</h4>
              <p>
                Co-Founder & Head of Screening at Orion. Jon reviews every application
                confidentially. No resume is ever distributed without your prior
                written authorization.
              </p>
              <div className="trust-mini-strip">
                <span>⭐ 5.0 Google Rating</span>
                <span>·</span>
                <span>Named in 47 client reviews</span>
                <span>·</span>
                <span>Direct Line: (954) 859-9941</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: EMBEDDED CONFIDENTIAL INTAKE / APPLY BOX */}
        <section className="detail-section" id="apply-box">
          <div className="detail-intake-card">
            <span className="eyebrow">Quick Confidential Apply</span>
            <h3 style={{ margin: "6px 0 10px" }}>Apply for {job.title}</h3>
            <p className="muted" style={{ fontSize: "0.92rem", marginBottom: 18 }}>
              Send your contact info directly to Jon. We will get back to you within 24 hours.
            </p>

            {applied ? (
              <div className="apply-success-box">
                <Icon name="check" className="success-ico" />
                <div>
                  <h4>Application Received Confidentially</h4>
                  <p>
                    Jon Missirlian has received your interest in <b>{job.title}</b>. He will
                    review your note and reach out to <b>{applicantEmail}</b> directly.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleQuickApply} className="detail-quick-form">
                <div className="form-two-col">
                  <div className="field">
                    <label htmlFor="app-name">Your Full Name</label>
                    <input
                      id="app-name"
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="app-email">Confidential Email</label>
                    <input
                      id="app-email"
                      type="email"
                      required
                      placeholder="personal@gmail.com (not work)"
                      value={applicantEmail}
                      onChange={(e) => setApplicantEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-two-col">
                  <div className="field">
                    <label htmlFor="app-phone">Direct Mobile Phone</label>
                    <input
                      id="app-phone"
                      type="tel"
                      placeholder="(555) 000-0000"
                      value={applicantPhone}
                      onChange={(e) => setApplicantPhone(e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="app-note">Quick note / State Bar Admissions</label>
                    <input
                      id="app-note"
                      type="text"
                      placeholder="e.g. TX Bar 2021, 4 yrs estate planning"
                      value={applicantNote}
                      onChange={(e) => setApplicantNote(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-submit-row">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    disabled={submitting}
                  >
                    {submitting ? "Sending..." : "Submit Application to Jon"}
                  </button>
                  <span className="form-privacy-note">
                    <Icon name="lock" className="lock-sm" />
                    100% confidential · Never shared with your current firm
                  </span>
                </div>
              </form>
            )}
          </div>
        </section>
      </div>
    </article>
  );
}

