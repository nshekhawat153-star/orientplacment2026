"use client";

import React, { useState } from "react";

const PRACTICE_AREAS = [
  "Estate Planning / Probate",
  "Commercial Litigation",
  "Real Estate Law",
  "Corporate / M&A",
  "Labor & Employment",
  "Family Law",
  "Personal Injury",
  "Tax Law",
  "Other Practice Area",
];

const LOCATIONS = [
  "Houston, TX",
  "Austin, TX",
  "Dallas-Fort Worth, TX",
  "San Antonio, TX",
  "Statewide / Remote TX",
];

const LEVELS = [
  "Mid-Level Associate (4–7 yrs)",
  "Junior Associate (1–3 yrs)",
  "Senior Associate (8+ yrs)",
  "Partner Track / Counsel",
];

export function HeroLeadForm({
  isModal = false,
  onClose,
}: {
  isModal?: boolean;
  onClose?: () => void;
} = {}) {
  const [email, setEmail] = useState("");
  const [firmName, setFirmName] = useState("");
  const [contactName, setContactName] = useState("");
  const [phone, setPhone] = useState("");
  const [practiceArea, setPracticeArea] = useState("Estate Planning / Probate");
  const [location, setLocation] = useState("Houston, TX");
  const [level, setLevel] = useState("Mid-Level Associate (4–7 yrs)");
  const [shortJD, setShortJD] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState<1 | 2>(1);

  // Step 1 -> Step 2: validate contact details only
  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!contactName.trim()) {
      setError("Please provide your name.");
      return;
    }
    if (!emailRegex.test(email.trim())) {
      setError("Please provide a valid work email (e.g. name@yourfirm.com).");
      return;
    }
    if (!firmName.trim()) {
      setError("Please provide your law firm name.");
      return;
    }
    if (phone.replace(/\D/g, "").length < 7) {
      setError("Please provide a valid direct phone number.");
      return;
    }

    setError("");
    setStep(2);
  };

  // Step 2: submit the full brief (contact + candidate requirements)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    // Fast simulated submission dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <div id={isModal ? undefined : "intake-form"}>
      <style>{`
        .ha-hero-form-card {
          position: relative;
          background: #FFFFFF;
          border-radius: 20px;
          padding: 28px 24px 22px;
          box-shadow: 0 25px 65px -10px rgba(0, 10, 30, 0.65), 0 0 0 1px rgba(255, 255, 255, 0.16), 0 0 40px -10px rgba(29, 78, 216, 0.25);
          border: 1px solid rgba(255, 255, 255, 0.3);
          overflow: hidden;
          color: #08142A;
          text-align: left;
          width: 100%;
          box-sizing: border-box;
        }
        .ha-hero-form-card.is-modal {
          box-shadow: none !important;
          border: none !important;
          padding: 4px 0 0 !important;
          margin-top: 0 !important;
        }
        .ha-hero-form-card.is-modal::before {
          display: none !important;
        }
        .ha-hero-form-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3.5px;
          background: linear-gradient(90deg, #1D4ED8 0%, #60A5FA 50%, #1D4ED8 100%);
        }
        .ha-form-label {
          display: block;
          font-size: 11px;
          font-weight: 700;
          color: #475569;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 5px;
        }
        .ha-form-input,
        .ha-form-select,
        .ha-form-textarea {
          width: 100%;
          height: 41px;
          border: 1.5px solid #E2E8F0;
          border-radius: 9px;
          padding: 0 12px;
          font-size: 13.5px;
          font-weight: 500;
          color: #0F172A;
          background: #F8FAFC;
          transition: border-color 0.15s ease, background-color 0.15s ease, box-shadow 0.15s ease;
          outline: none;
          box-sizing: border-box;
          font-family: inherit;
        }
        .ha-form-textarea {
          height: auto;
          min-height: 58px;
          padding: 8px 12px;
          resize: vertical;
          line-height: 1.45;
        }
        .ha-form-input::placeholder,
        .ha-form-textarea::placeholder {
          color: #94A3B8;
          font-weight: 400;
          font-size: 13px;
        }
        .ha-form-input:hover,
        .ha-form-select:hover,
        .ha-form-textarea:hover {
          border-color: #CBD5E1;
          background: #FFFFFF;
        }
        .ha-form-input:focus,
        .ha-form-select:focus,
        .ha-form-textarea:focus {
          border-color: #1D4ED8;
          background: #FFFFFF;
          box-shadow: 0 0 0 3.5px rgba(29, 78, 216, 0.12);
        }
        .ha-form-select {
          cursor: pointer;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23475569' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
          background-size: 12px 12px;
          padding-right: 32px;
          appearance: none;
          -webkit-appearance: none;
        }
        .ha-form-submit-btn {
          width: 100%;
          min-height: 50px;
          border-radius: 10px;
          background: #2563EB;
          color: #FFFFFF;
          border: 0;
          font-size: 14.5px;
          font-weight: 600;
          letter-spacing: 0.01em;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(37, 99, 235, 0.35);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          padding: 12px 18px;
          text-align: center;
        }
        .ha-form-submit-btn:hover:not(:disabled) {
          transform: translateY(-1.5px);
          box-shadow: 0 8px 22px rgba(37, 99, 235, 0.45);
          background: #1D4ED8;
        }
        .ha-form-submit-btn:active:not(:disabled) {
          transform: translateY(0);
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
        }
        .ha-form-back-btn {
          flex: 0 0 32%;
          min-height: 50px;
          border-radius: 10px;
          background: #FFFFFF;
          color: #334155;
          border: 1.5px solid #CBD5E1;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.15s ease, border-color 0.15s ease;
        }
        .ha-form-back-btn:hover {
          background: #F1F5F9;
          border-color: #94A3B8;
        }
        @media (max-width: 640px) {
          .ha-hero-form-card {
            padding: 22px 16px 18px;
            border-radius: 16px;
            margin-top: 18px;
          }
          .ha-form-row-2 {
            grid-template-columns: 1fr !important;
            gap: 10px !important;
          }
        }
      `}</style>

      {isSubmitted ? (
        <div className={`ha-hero-form-card ${isModal ? "is-modal" : ""}`} style={{ textAlign: "center", padding: isModal ? "18px 4px 10px" : "34px 24px" }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: "#EFF6FF",
              color: "#1D4ED8",
              display: "grid",
              placeItems: "center",
              margin: "0 auto 16px",
              boxShadow: "0 4px 14px rgba(29, 78, 216, 0.15)",
            }}
          >
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>

          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: 11,
              fontWeight: 700,
              color: "#1D4ED8",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              background: "#EFF6FF",
              border: "1px solid #DBEAFE",
              padding: "4px 12px",
              borderRadius: 999,
              display: "inline-block",
              marginBottom: 12,
            }}
          >
            BRIEF REGISTERED · RADAR ACTIVE
          </span>

          <h3
            style={{
              fontFamily: "var(--display)",
              fontSize: 24,
              fontWeight: 500,
              color: "#08142A",
              margin: "0 0 10px",
              lineHeight: 1.25,
            }}
          >
            Thank you, {contactName.split(" ")[0]}!
          </h3>

          <p
            style={{
              fontSize: 14,
              color: "#475569",
              lineHeight: 1.55,
              margin: "0 0 20px",
            }}
          >
            We are curating pre-screened Texas lateral attorney dossiers for <b>{firmName}</b> ({practiceArea} · {location}). Pre-screened candidate profiles will be sent directly to <b>{email}</b> within 48–72 hours.
          </p>

          {/* Optional Direct Briefing with Justin (Post-submission upsell, not competing on page) */}
          <div
            style={{
              background: "#FAF9F5",
              border: "1px solid #E2E8F0",
              borderRadius: 12,
              padding: "16px 14px",
              marginBottom: 16,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 13, color: "#08142A", fontWeight: 600, marginBottom: 8 }}>
              Want to align on candidate parameters directly?
            </div>
            <a
              href="https://calendly.com/orionplacement/call-with-justin"
              target="_blank"
              rel="noopener noreferrer"
              className="ha-form-submit-btn"
              style={{
                textDecoration: "none",
                fontSize: 13.5,
                minHeight: 44,
                padding: "10px 16px",
              }}
            >
              <span>Book Optional 15-Min Call with Justin</span>
              <span aria-hidden="true">→</span>
            </a>
            <span style={{ display: "block", fontSize: 11.5, color: "#64748B", marginTop: 6 }}>
              Central Time (CT) · Justin Sofman, Managing Partner
            </span>
          </div>

          {isModal && onClose && (
            <button
              type="button"
              onClick={onClose}
              className="ha-form-submit-btn"
              style={{
                width: "100%",
                marginTop: 14,
                marginBottom: 8,
                background: "#08142A",
              }}
            >
              Done / Close
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              setIsSubmitted(false);
              setStep(1);
              setEmail("");
              setShortJD("");
            }}
            style={{
              background: "none",
              border: "none",
              color: "#64748B",
              fontSize: 12.5,
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            Submit another attorney seat request
          </button>
        </div>
      ) : (
        <div className={`ha-hero-form-card ${isModal ? "is-modal" : ""}`}>
          {/* CARD HEADER (Only when rendered inline on web) */}
          {!isModal && (
            <div style={{ marginBottom: 14 }}>
              <h3
                style={{
                  fontFamily: "var(--display)",
                  fontSize: 22,
                  fontWeight: 500,
                  color: "#08142A",
                  margin: "0 0 4px",
                  lineHeight: 1.25,
                  letterSpacing: "-0.015em",
                }}
              >
                {step === 1 ? "Where should we send candidate profiles?" : "Who are you looking to hire?"}
              </h3>

              <p style={{ fontSize: 12.5, color: "#64748B", margin: 0, lineHeight: 1.4 }}>
                {step === 1
                  ? "Screened attorneys matched to your brief, sent to your inbox."
                  : "Tell us the seat you need to fill and we'll match attorneys to your practice, market and seniority."}
              </p>
            </div>
          )}

          {/* STEP PROGRESS INDICATOR */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "var(--mono)", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#08142A", marginBottom: 7 }}>
              <span>Step {step} of 2: {step === 1 ? "Contact Details" : "Candidate Brief"}</span>
              <span style={{ color: "#1D4ED8" }}>{step === 1 ? "50%" : "100%"}</span>
            </div>
            <div style={{ width: "100%", height: 6, background: "#E2E8F0", borderRadius: 999, overflow: "hidden" }}>
              <div style={{ height: "100%", width: step === 1 ? "50%" : "100%", background: "linear-gradient(90deg, #1D4ED8 0%, #60A5FA 100%)", borderRadius: 999, transition: "width 0.3s ease-out" }} />
            </div>
          </div>

          <form onSubmit={step === 1 ? handleContinue : handleSubmit}>
            {step === 1 ? (
              <>
                {/* STEP 1: CONTACT DETAILS (one input per row) */}
                <div style={{ marginBottom: 10 }}>
                  <label htmlFor="h-contact" className="ha-form-label">
                    Your Name *
                  </label>
                  <input
                    id="h-contact"
                    type="text"
                    required
                    placeholder="e.g. Jane Doe"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="ha-form-input"
                  />
                </div>

                <div style={{ marginBottom: 10 }}>
                  <label htmlFor="h-email" className="ha-form-label">
                    Work Email Address *
                  </label>
                  <input
                    id="h-email"
                    type="email"
                    required
                    placeholder="e.g. jdoe@apexlegal.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="ha-form-input"
                  />
                </div>

                <div style={{ marginBottom: 10 }}>
                  <label htmlFor="h-firm" className="ha-form-label">
                    Firm Name *
                  </label>
                  <input
                    id="h-firm"
                    type="text"
                    required
                    placeholder="e.g. Apex Legal Group, PLLC"
                    value={firmName}
                    onChange={(e) => setFirmName(e.target.value)}
                    className="ha-form-input"
                  />
                </div>

                <div style={{ marginBottom: 14 }}>
                  <label htmlFor="h-phone" className="ha-form-label">
                    Direct Phone Number *
                  </label>
                  <input
                    id="h-phone"
                    type="tel"
                    required
                    placeholder="e.g. (512) 555-0199"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="ha-form-input"
                  />
                </div>

              </>
            ) : (
              <>
                {/* STEP 2: CANDIDATE BRIEF */}
                <div className="ha-form-row-2" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 10, marginBottom: 10 }}>
                  <div>
                    <label htmlFor="h-practice" className="ha-form-label">
                      Primary Practice Area
                    </label>
                    <select
                      id="h-practice"
                      value={practiceArea}
                      onChange={(e) => setPracticeArea(e.target.value)}
                      className="ha-form-select"
                    >
                      {PRACTICE_AREAS.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="h-level" className="ha-form-label">
                      Target Seniority
                    </label>
                    <select
                      id="h-level"
                      value={level}
                      onChange={(e) => setLevel(e.target.value)}
                      className="ha-form-select"
                    >
                      {LEVELS.map((lvl) => (
                        <option key={lvl} value={lvl}>
                          {lvl}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: 10 }}>
                  <label htmlFor="h-location" className="ha-form-label">
                    Target Market
                  </label>
                  <select
                    id="h-location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="ha-form-select"
                  >
                    {LOCATIONS.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ marginBottom: 13 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                    <label htmlFor="h-jd" className="ha-form-label" style={{ margin: 0 }}>
                      Short JD / Key Requirements <span style={{ color: "#94A3B8", fontWeight: 400 }}>(Optional)</span>
                    </label>
                    <span style={{ fontSize: 11, color: "#64748B" }}>Paste brief or notes</span>
                  </div>
                  <textarea
                    id="h-jd"
                    rows={2}
                    placeholder="e.g. Texas bar required, 4+ yrs estate planning / probate litigation, trial prep experience"
                    value={shortJD}
                    onChange={(e) => setShortJD(e.target.value)}
                    className="ha-form-textarea"
                  />
                </div>
              </>
            )}

            {error && (
              <div
                style={{
                  background: "#FEF2F2",
                  border: "1px solid #FCA5A5",
                  borderRadius: 8,
                  padding: "8px 12px",
                  color: "#B91C1C",
                  fontSize: 12.5,
                  marginBottom: 11,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
                role="alert"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            {step === 1 ? (
              <button type="submit" className="ha-form-submit-btn">
                <span>Continue</span>
                <span aria-hidden="true" style={{ fontSize: 16 }}>→</span>
              </button>
            ) : (
              <div style={{ display: "flex", gap: 10 }}>
                <button
                  type="button"
                  className="ha-form-back-btn"
                  onClick={() => {
                    setError("");
                    setStep(1);
                  }}
                >
                  ← Back
                </button>
                <button type="submit" disabled={isSubmitting} className="ha-form-submit-btn" style={{ flex: 1, width: "auto" }}>
                  <span>{isSubmitting ? "Dispatching Brief…" : "Get Candidate Dossiers"}</span>
                  <span aria-hidden="true" style={{ fontSize: 16 }}>→</span>
                </button>
              </div>
            )}

            {/* TRUST BADGE / TERMS MICRO-COPY */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                fontSize: 11.5,
                color: "#64748B",
                textAlign: "center",
                marginTop: 10,
                lineHeight: 1.4,
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#166534" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span>100% Confidential · Zero upfront retainer · Pay only if you hire</span>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
