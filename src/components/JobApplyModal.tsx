"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Job, findCity, fmt } from "@/data";

interface JobApplyModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
}

type ApplyStep = "resume" | "contact" | "compensation" | "agreement" | "review" | "success";

export function JobApplyModal({ job, isOpen, onClose }: JobApplyModalProps) {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState<ApplyStep>("resume");

  // Form State
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeName, setResumeName] = useState<string>("");
  const [isParsing, setIsParsing] = useState<boolean>(false);
  const [parseSuccess, setParseSuccess] = useState<boolean>(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("Houston, TX");
  const [currentFirm, setCurrentFirm] = useState("");

  const [targetSalary, setTargetSalary] = useState<number>(200000);
  const [barStatus, setBarStatus] = useState("Active & In Good Standing");
  const [availability, setAvailability] = useState("Standard 2 weeks notice");

  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);
  const [viewFullDesc, setViewFullDesc] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Initialize or reset when a job opens
  useEffect(() => {
    if (isOpen && job) {
      setStep("resume");
      setResumeFile(null);
      setResumeName("");
      setIsParsing(false);
      setParseSuccess(false);
      setAgreedToPrivacy(false);
      setViewFullDesc(false);
      setSubmitting(false);

      // Pre-fill target salary to mid-band
      if (job.band) {
        const mid = Math.round((job.band[0] + job.band[1]) / 2);
        setTargetSalary(mid);
      }
      const c = findCity(job.city);
      if (c) {
        setCity(`${c.name}, ${c.state}`);
      }
    }
  }, [isOpen, job]);

  // Lock body scroll when modal is open and listen for Escape key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen, onClose]);

  if (!isOpen || !job || !mounted) return null;

  const cityObj = findCity(job.city);

  // Progress computation
  const getProgress = () => {
    switch (step) {
      case "resume":
        return { percent: 25, label: "Resume" };
      case "contact":
        return { percent: 50, label: "Contact information" };
      case "compensation":
        return { percent: 75, label: "Compensation & availability" };
      case "agreement":
        return { percent: 86, label: "Confidentiality declaration" };
      case "review":
        return { percent: 100, label: "Review application" };
      case "success":
        return { percent: 100, label: "Complete" };
      default:
        return { percent: 25, label: "Resume" };
    }
  };

  const progress = getProgress();

  // Simulated Resume Upload & Intelligent Extraction
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setResumeFile(file);
    setResumeName(file.name);
    setIsParsing(true);
    setParseSuccess(false);

    // Realistic candidate parser simulation
    setTimeout(() => {
      setIsParsing(false);
      setParseSuccess(true);

      // If fields are empty, extract likely candidate details
      if (!fullName) {
        const cleanName = file.name
          .replace(/\.[^/.]+$/, "")
          .replace(/[_-]/g, " ")
          .replace(/(resume|cv|attorney|final|2026|2025)/gi, "")
          .trim();
        setFullName(cleanName ? cleanName.charAt(0).toUpperCase() + cleanName.slice(1) : "Lateral Candidate");
      }
      if (!email) {
        setEmail("candidate.counsel@gmail.com");
      }
      if (!phone) {
        setPhone("(713) 555-0194");
      }
    }, 1100);
  };

  const handleBack = () => {
    if (step === "contact") setStep("resume");
    else if (step === "compensation") setStep("contact");
    else if (step === "agreement") setStep("compensation");
    else if (step === "review") setStep("agreement");
  };

  const handleFinalSubmit = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setStep("success");
    }, 900);
  };

  return createPortal(
    <div
      className="job-apply-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="apply-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="job-apply-modal-card">
        {/* TOP BAR / PROGRESS HEADER (MATCHING USER SCREENSHOT) */}
        <header className="job-apply-header">
          <div className="job-apply-header-left">
            {step !== "resume" && step !== "success" ? (
              <button
                type="button"
                className="job-apply-back-btn"
                onClick={handleBack}
                aria-label="Back to previous step"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
              </button>
            ) : (
              <div style={{ width: 18 }} />
            )}

            {/* PROGRESS TRACKER */}
            <div className="job-apply-progress-track">
              <div
                className="job-apply-progress-bar"
                style={{ width: `${progress.percent}%` }}
              />
            </div>
            <span className="job-apply-progress-percent">{progress.percent}%</span>
          </div>

          <div className="job-apply-header-right">
            <button
              type="button"
              className="job-apply-close-text-btn"
              onClick={onClose}
            >
              Save and close
            </button>
            <button
              type="button"
              className="job-apply-close-icon-btn"
              onClick={onClose}
              aria-label="Close application modal"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </header>

        {/* MAIN BODY: 2-COLUMN SPLIT (FORM ON LEFT, JOB SUMMARY ON RIGHT) */}
        <div className="job-apply-body-split">
          {/* LEFT FORM COLUMN */}
          <main className="job-apply-form-col">
            {/* STEP 1: RESUME UPLOAD */}
            {step === "resume" && (
              <div className="job-apply-step-pane">
                <div className="job-apply-step-intro">
                  <div className="job-apply-badge">
                    <span className="job-apply-badge-dot" />
                    <span>STEP 1 OF 4 · RESUME INTAKE</span>
                  </div>
                  <h2 id="apply-modal-title" className="job-apply-h2">
                    Add a resume for <span className="serif-blue">{job.title}</span>
                  </h2>
                  <p className="job-apply-sub">
                    Upload your resume to automatically extract your practice mix, local Texas Bar admissions, and credentials.
                  </p>
                </div>

                {/* RESUME DROPZONE */}
                <div className="job-apply-dropzone">
                  <input
                    type="file"
                    id="resume-file-input"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="job-apply-file-input"
                  />
                  <label htmlFor="resume-file-input" className="job-apply-drop-label">
                    <div className="job-apply-drop-icon">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="12" y1="18" x2="12" y2="12" />
                        <polyline points="9 15 12 12 15 15" />
                      </svg>
                    </div>

                    <div className="job-apply-drop-text">
                      <b>Click to upload or drag &amp; drop</b>
                      <span>PDF, DOC, or DOCX (Max 10MB)</span>
                    </div>

                    <span className="job-apply-browse-btn">Browse file</span>
                  </label>
                </div>

                {/* PARSER STATUS INDICATOR */}
                {isParsing && (
                  <div className="job-apply-parse-banner parsing">
                    <div className="job-apply-spinner" />
                    <span>Extracting Texas Bar details &amp; credentials from {resumeName}...</span>
                  </div>
                )}

                {parseSuccess && (
                  <div className="job-apply-parse-banner success">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#15803D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <div>
                      <b>{resumeName}</b> parsed successfully.
                      <p>Name, contact info, and practice history pre-filled for next step.</p>
                    </div>
                  </div>
                )}

                {/* PRIVACY NOTICE */}
                <div className="job-apply-confidential-callout">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <span>
                    <b>Strict Attorney Privacy Protocol:</b> Orion never shares your name or identity with any firm without your explicit, written approval.
                  </span>
                </div>

                <div className="job-apply-footer-row">
                  <button
                    type="button"
                    className="job-apply-skip-btn"
                    onClick={() => setStep("contact")}
                  >
                    Enter manually without resume →
                  </button>

                  <button
                    type="button"
                    className="job-apply-primary-btn"
                    onClick={() => setStep("contact")}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: CONTACT INFORMATION */}
            {step === "contact" && (
              <div className="job-apply-step-pane">
                <div className="job-apply-step-intro">
                  <div className="job-apply-badge">
                    <span className="job-apply-badge-dot" />
                    <span>STEP 2 OF 4 · CANDIDATE CONTACT</span>
                  </div>
                  <h2 className="job-apply-h2">
                    Contact <span className="serif-blue">details</span>
                  </h2>
                  <p className="job-apply-sub">
                    Please provide your direct personal contact information so managing partner Justin Sofman can reach you privately.
                  </p>
                </div>

                <div className="job-apply-form-grid">
                  <div className="job-apply-field">
                    <label htmlFor="app-name">
                      Full legal name <span className="req">*</span>
                    </label>
                    <input
                      id="app-name"
                      type="text"
                      required
                      placeholder="e.g. Rachel Adams, Esq."
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>

                  <div className="job-apply-field">
                    <label htmlFor="app-email">
                      Personal email <span className="req">*</span>
                    </label>
                    <input
                      id="app-email"
                      type="email"
                      required
                      placeholder="personal.email@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <span className="field-hint">Never enter your current firm&apos;s email address.</span>
                  </div>

                  <div className="job-apply-field">
                    <label htmlFor="app-phone">
                      Mobile phone number <span className="req">*</span>
                    </label>
                    <input
                      id="app-phone"
                      type="tel"
                      required
                      placeholder="(713) 555-0142"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                  <div className="job-apply-field">
                    <label htmlFor="app-city">
                      Target Texas market / City <span className="req">*</span>
                    </label>
                    <input
                      id="app-city"
                      type="text"
                      required
                      placeholder="e.g. Houston, TX"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>

                  <div className="job-apply-field full-width">
                    <label htmlFor="app-current-firm">
                      Current law firm or organization <span className="opt">(Confidential)</span>
                    </label>
                    <input
                      id="app-current-firm"
                      type="text"
                      placeholder="e.g. AmLaw 200 Firm / Premier Texas Boutique"
                      value={currentFirm}
                      onChange={(e) => setCurrentFirm(e.target.value)}
                    />
                    <span className="field-hint">Kept strictly private by Orion Placement. Never disclosed without permission.</span>
                  </div>
                </div>

                <div className="job-apply-footer-row end">
                  <button
                    type="button"
                    className="job-apply-primary-btn"
                    disabled={!fullName.trim() || !email.trim() || !phone.trim()}
                    onClick={() => setStep("compensation")}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: COMPENSATION & AVAILABILITY */}
            {step === "compensation" && (
              <div className="job-apply-step-pane">
                <div className="job-apply-step-intro">
                  <div className="job-apply-badge">
                    <span className="job-apply-badge-dot" />
                    <span>STEP 3 OF 4 · COMPENSATION &amp; BAR</span>
                  </div>
                  <h2 className="job-apply-h2">
                    Salary expectation &amp; <span className="serif-blue">availability</span>
                  </h2>
                  <p className="job-apply-sub">
                    Texas law firms in Orion&apos;s network disclose verified base salary bands. Enter your target base compensation.
                  </p>
                </div>

                {/* POSTED BAND REFERENCE PILL */}
                <div className="job-apply-posted-band-card">
                  <div className="band-header">
                    <span className="band-dot" />
                    <span>VERIFIED COMPENSATION FOR THIS SEAT</span>
                  </div>
                  <div className="band-value">
                    {fmt.range(job.band)} <span className="band-unit">/ year base</span>
                  </div>
                  <div className="band-notes">
                    Full-time • {job.mode === "hybrid" ? "Hybrid schedule" : "On-site"} • Performance bonus &amp; partnership track
                  </div>
                </div>

                <div className="job-apply-form-grid">
                  <div className="job-apply-field full-width">
                    <label htmlFor="app-salary">
                      Desired target base salary <span className="req">*</span>
                    </label>
                    <div className="salary-input-wrap">
                      <span className="currency-prefix">$</span>
                      <input
                        id="app-salary"
                        type="number"
                        min="80000"
                        max="600000"
                        step="5000"
                        value={targetSalary}
                        onChange={(e) => setTargetSalary(Number(e.target.value))}
                      />
                      <span className="currency-suffix">USD / year</span>
                    </div>
                  </div>

                  <div className="job-apply-field full-width">
                    <label>
                      Texas Bar admission status <span className="req">*</span>
                    </label>
                    <div className="choice-pills-row">
                      {[
                        "Active & In Good Standing",
                        "Pending TX Bar / UBE Transfer",
                        "Licensed in Another State",
                      ].map((status) => (
                        <button
                          key={status}
                          type="button"
                          className={`choice-pill-btn ${barStatus === status ? "active" : ""}`}
                          onClick={() => setBarStatus(status)}
                        >
                          {barStatus === status && (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                          <span>{status}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="job-apply-field full-width">
                    <label>
                      Earliest availability / Notice period <span className="req">*</span>
                    </label>
                    <div className="choice-pills-row">
                      {[
                        "Immediate (Under 2 weeks)",
                        "Standard 2 weeks notice",
                        "30 days (Case transition)",
                        "Flexible / Exploring",
                      ].map((item) => (
                        <button
                          key={item}
                          type="button"
                          className={`choice-pill-btn ${availability === item ? "active" : ""}`}
                          onClick={() => setAvailability(item)}
                        >
                          {availability === item && (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                          <span>{item}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="job-apply-footer-row end">
                  <button
                    type="button"
                    className="job-apply-primary-btn"
                    onClick={() => setStep("agreement")}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: VOLUNTARY SELF IDENTIFICATION & AGREEMENT (MATCHING SCREENSHOT) */}
            {step === "agreement" && (
              <div className="job-apply-step-pane">
                <div className="job-apply-step-intro">
                  <h2 className="job-apply-h2 screenshot-style">
                    Voluntary self identification questions from the employer
                  </h2>
                  <p className="job-apply-sub">
                    Any questions you answer will be shared separately from your application and used for reporting only.{" "}
                    <a href="#learn-more" onClick={(e) => e.preventDefault()} className="inline-link">
                      Learn more
                    </a>
                  </p>
                  <p className="job-apply-req-note">
                    Fields marked with (*) are required.
                  </p>
                </div>

                {/* PRIVACY DECLARATION CARD (EXACT LAYOUT FROM SCREENSHOT) */}
                <div className="job-apply-declaration-section">
                  <p className="job-apply-declaration-text">
                    You declare that you have read and agree to the privacy notice of Orion Placement and the hiring firm. Here you can find details of our{" "}
                    <a href="#privacy" onClick={(e) => e.preventDefault()} className="inline-link">
                      privacy notice
                    </a>
                    .*
                  </p>

                  <div
                    className={`job-apply-agree-card ${agreedToPrivacy ? "checked" : ""}`}
                    onClick={() => setAgreedToPrivacy(!agreedToPrivacy)}
                  >
                    <div className="job-apply-checkbox-box">
                      {agreedToPrivacy && (
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </div>
                    <span className="job-apply-agree-label">Agree</span>
                  </div>
                </div>

                <div className="job-apply-footer-row end">
                  <button
                    type="button"
                    className="job-apply-primary-btn"
                    disabled={!agreedToPrivacy}
                    onClick={() => setStep("review")}
                  >
                    Review your application
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: REVIEW APPLICATION */}
            {step === "review" && (
              <div className="job-apply-step-pane">
                <div className="job-apply-step-intro">
                  <div className="job-apply-badge">
                    <span className="job-apply-badge-dot" />
                    <span>FINAL STEP · VERIFY &amp; SUBMIT</span>
                  </div>
                  <h2 className="job-apply-h2">
                    Review your <span className="serif-blue">application</span>
                  </h2>
                  <p className="job-apply-sub">
                    Please verify your details before submitting confidentially to Orion Placement.
                  </p>
                </div>

                {/* REVIEW SUMMARY CARDS */}
                <div className="job-apply-review-stack">
                  <div className="review-section-card">
                    <div className="review-section-header">
                      <b>Candidate &amp; Contact</b>
                      <button type="button" onClick={() => setStep("contact")} className="edit-link">
                        Edit
                      </button>
                    </div>
                    <div className="review-keyvals">
                      <div><span>Full Name:</span> <b>{fullName}</b></div>
                      <div><span>Email:</span> <b>{email}</b></div>
                      <div><span>Phone:</span> <b>{phone}</b></div>
                      <div><span>Market:</span> <b>{city}</b></div>
                      {currentFirm && <div><span>Current Organization:</span> <b>{currentFirm}</b></div>}
                    </div>
                  </div>

                  <div className="review-section-card">
                    <div className="review-section-header">
                      <b>Resume &amp; Credentials</b>
                      <button type="button" onClick={() => setStep("resume")} className="edit-link">
                        Change
                      </button>
                    </div>
                    <div className="review-keyvals">
                      <div><span>Resume:</span> <b>{resumeName || "Manual intake (No file attached)"}</b></div>
                      <div><span>Bar Status:</span> <b>{barStatus}</b></div>
                    </div>
                  </div>

                  <div className="review-section-card">
                    <div className="review-section-header">
                      <b>Compensation &amp; Notice</b>
                      <button type="button" onClick={() => setStep("compensation")} className="edit-link">
                        Edit
                      </button>
                    </div>
                    <div className="review-keyvals">
                      <div><span>Target Base Salary:</span> <b>${targetSalary.toLocaleString()} / year</b></div>
                      <div><span>Notice Period:</span> <b>{availability}</b></div>
                    </div>
                  </div>

                  <div className="review-section-card">
                    <div className="review-section-header">
                      <b>Confidentiality Declaration</b>
                      <span className="signed-tag">✓ Agreed &amp; Verified</span>
                    </div>
                    <p style={{ margin: 0, fontSize: 13, color: "#64748B" }}>
                      Protected by Orion&apos;s 100% Attorney Confidentiality protocol. No contact with current firm.
                    </p>
                  </div>
                </div>

                <div className="job-apply-footer-row end">
                  <button
                    type="button"
                    className="job-apply-primary-btn submit"
                    disabled={submitting}
                    onClick={handleFinalSubmit}
                  >
                    {submitting ? (
                      <>
                        <div className="job-apply-spinner white" />
                        <span>Submitting application...</span>
                      </>
                    ) : (
                      <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                        <span>Submit confidential application</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 6: SUCCESS CONFIRMATION */}
            {step === "success" && (
              <div className="job-apply-step-pane success-pane">
                <div className="success-badge-circle">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>

                <h2 className="success-h2">Application submitted confidentially</h2>

                <p className="success-sub">
                  Thank you, <b>{fullName}</b>. Your application for <b>{job.title}</b> has been received confidentially by Orion Placement.
                </p>

                <div className="success-timeline-box">
                  <b>What happens next:</b>
                  <ol>
                    <li>
                      <b>Confidential Dossier Review:</b> Managing Partner Justin Sofman will personally review your credentials against this firm&apos;s lateral requirements.
                    </li>
                    <li>
                      <b>Direct Private Briefing:</b> Justin will reach out to you at <b>{email}</b> within 24 hours to discuss compensation, firm culture, and partner team.
                    </li>
                    <li>
                      <b>Zero Employer Contact:</b> Your current firm will never receive inquiry. Submissions are only made with your explicit prior written consent.
                    </li>
                  </ol>
                </div>

                <div className="success-btn-row">
                  <button
                    type="button"
                    className="job-apply-primary-btn"
                    onClick={onClose}
                  >
                    Return to job search
                  </button>
                </div>
              </div>
            )}
          </main>

          {/* RIGHT COLUMN: JOB SUMMARY SIDEBAR (EXACT MATCHING SCREENSHOT) */}
          <aside className="job-apply-sidebar-col">
            <div className="job-apply-side-card">
              <div className="side-job-title">{job.title}</div>
              <div className="side-job-company">
                Confidential {job.firmType || "Law Firm"} • {job.area}, {cityObj?.name || job.city}
              </div>

              <div className="side-job-meta-pill">
                <span>{fmt.range(job.band)} / yr</span>
                <span>•</span>
                <span>{job.mode === "hybrid" ? "Hybrid" : "On-site"}</span>
              </div>

              <div className="side-divider" />

              <div className="side-section-label">Company / Practice Description</div>
              <p className="side-desc-text">
                Premier Texas legal practice seeking an experienced lateral attorney to advise on complex {job.mix} matters. High autonomy, transparent compensation bands, and direct partner track.
              </p>

              {viewFullDesc ? (
                <div className="side-expanded-desc">
                  <b>Key Focus:</b>
                  <ul>
                    <li>{job.mix} client advisement and active matter management</li>
                    <li>{job.years} years of active practice experience</li>
                    <li>Direct compensation: {fmt.range(job.band)} with full bonus participation</li>
                    <li>Zero candidate liability: any fee is payable exclusively by the hiring law firm</li>
                  </ul>
                  <button
                    type="button"
                    className="side-toggle-link"
                    onClick={() => setViewFullDesc(false)}
                  >
                    Hide full job description ∧
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="side-toggle-link"
                  onClick={() => setViewFullDesc(true)}
                >
                  View full job description ∨
                </button>
              )}

              <div className="side-trust-footer">
                <div className="trust-dot" />
                <span>Protected by Orion Placement Contingency Protocol</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>,
    document.body
  );
}

