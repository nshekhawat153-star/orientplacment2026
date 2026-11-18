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

export function HeroLeadForm() {
  const [practiceArea, setPracticeArea] = useState("Estate Planning / Probate");
  const [location, setLocation] = useState("Houston, TX");
  const [level, setLevel] = useState("Mid-Level Associate (4–7 yrs)");
  const [firmName, setFirmName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firmName.trim() || !contactName.trim()) {
      setError("Please provide your firm name and contact name.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email.trim())) {
      setError("Please provide a valid work email (e.g. name@yourfirm.com).");
      return;
    }
    if (phone.replace(/\D/g, "").length < 7) {
      setError("Please provide a valid direct phone number.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    // Simulate fast dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <>
      <style>{`
        .ha-hero-form-card {
          position: relative;
          background: #FFFFFF;
          border-radius: 20px;
          padding: 28px 26px 22px;
          box-shadow: 0 25px 65px -10px rgba(0, 10, 30, 0.65), 0 0 0 1px rgba(255, 255, 255, 0.16), 0 0 40px -10px rgba(29, 78, 216, 0.25);
          border: 1px solid rgba(255, 255, 255, 0.3);
          overflow: hidden;
          color: #08142A;
          text-align: left;
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
        .ha-form-select {
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
        .ha-form-input::placeholder {
          color: #94A3B8;
          font-weight: 400;
        }
        .ha-form-input:hover,
        .ha-form-select:hover {
          border-color: #CBD5E1;
          background: #FFFFFF;
        }
        .ha-form-input:focus,
        .ha-form-select:focus {
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
          height: 48px;
          border-radius: 10px;
          background: linear-gradient(135deg, #1D4ED8 0%, #1E40AF 100%);
          color: #FFFFFF;
          border: 0;
          font-size: 14.5px;
          font-weight: 600;
          letter-spacing: 0.01em;
          cursor: pointer;
          box-shadow: 0 6px 18px rgba(29, 78, 216, 0.35);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .ha-form-submit-btn:hover:not(:disabled) {
          transform: translateY(-1.5px);
          box-shadow: 0 10px 24px rgba(29, 78, 216, 0.45);
          background: linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%);
        }
        .ha-form-submit-btn:active:not(:disabled) {
          transform: translateY(0);
          box-shadow: 0 4px 12px rgba(29, 78, 216, 0.3);
        }
        @media (max-width: 640px) {
          .ha-hero-form-card {
            padding: 22px 18px 18px;
            border-radius: 16px;
          }
          .ha-form-row-2 {
            grid-template-columns: 1fr !important;
            gap: 10px !important;
          }
        }
      `}</style>

      {isSubmitted ? (
        <div className="ha-hero-form-card" style={{ textAlign: "center", padding: "34px 26px" }}>
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
            INTAKE RECEIVED · SEARCH ACTIVE
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
              margin: "0 0 22px",
            }}
          >
            We are reviewing our confidential Texas candidate radar for <b>{firmName}</b> ({practiceArea} in {location}). Justin will contact you directly within one business day.
          </p>

          <a
            href="https://calendly.com/orionplacement/call-with-justin"
            target="_blank"
            rel="noopener noreferrer"
            className="ha-form-submit-btn"
            style={{
              textDecoration: "none",
              marginBottom: 14,
            }}
          >
            <span>Book 15-Min Briefing with Justin</span>
            <span aria-hidden="true">→</span>
          </a>

          <a
            href="#questionnaire"
            style={{
              display: "inline-block",
              fontSize: 13,
              color: "#64748B",
              textDecoration: "underline",
              textUnderlineOffset: 3,
              cursor: "pointer",
            }}
          >
            Or refine full seat questionnaire below ↓
          </a>
        </div>
      ) : (
        <div className="ha-hero-form-card">
          {/* CARD HEADER */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 10.5,
                  fontWeight: 700,
                  color: "#1D4ED8",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  background: "#EFF6FF",
                  border: "1px solid #DBEAFE",
                  padding: "3.5px 9px",
                  borderRadius: 6,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
                FAST INTAKE · 48H DOSSIERS
              </span>

              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11.5, color: "#059669", fontWeight: 600 }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#10B981", boxShadow: "0 0 8px #10B981" }} />
                Confidential
              </div>
            </div>

            <h3
              style={{
                fontFamily: "var(--display)",
                fontSize: 23,
                fontWeight: 500,
                color: "#08142A",
                margin: "0 0 5px",
                lineHeight: 1.25,
                letterSpacing: "-0.015em",
              }}
            >
              Request Attorney Candidates
            </h3>

            <p style={{ fontSize: 13, color: "#64748B", margin: 0, lineHeight: 1.45 }}>
              Specify your open seat to receive pre-screened lateral attorney dossiers.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* ROW 1: PRACTICE AREA & MARKET */}
            <div className="ha-form-row-2" style={{ display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: 10, marginBottom: 11 }}>
              <div>
                <label htmlFor="h-practice" className="ha-form-label">
                  Practice Area
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
                <label htmlFor="h-location" className="ha-form-label">
                  Texas Market
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
            </div>

            {/* ROW 2: SENIORITY / LEVEL */}
            <div style={{ marginBottom: 11 }}>
              <label htmlFor="h-level" className="ha-form-label">
                Target Seniority Level
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

            {/* ROW 3: FIRM NAME & YOUR NAME */}
            <div className="ha-form-row-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 11 }}>
              <div>
                <label htmlFor="h-firm" className="ha-form-label">
                  Law Firm Name
                </label>
                <input
                  id="h-firm"
                  type="text"
                  required
                  placeholder="e.g. Baker & Sterling LLP"
                  value={firmName}
                  onChange={(e) => setFirmName(e.target.value)}
                  className="ha-form-input"
                />
              </div>

              <div>
                <label htmlFor="h-contact" className="ha-form-label">
                  Your Name
                </label>
                <input
                  id="h-contact"
                  type="text"
                  required
                  placeholder="Full name"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="ha-form-input"
                />
              </div>
            </div>

            {/* ROW 4: WORK EMAIL & PHONE */}
            <div className="ha-form-row-2" style={{ display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: 10, marginBottom: 15 }}>
              <div>
                <label htmlFor="h-email" className="ha-form-label">
                  Work Email
                </label>
                <input
                  id="h-email"
                  type="email"
                  required
                  placeholder="name@yourfirm.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="ha-form-input"
                />
              </div>

              <div>
                <label htmlFor="h-phone" className="ha-form-label">
                  Direct Phone
                </label>
                <input
                  id="h-phone"
                  type="tel"
                  required
                  placeholder="(713) 555-0100"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="ha-form-input"
                />
              </div>
            </div>

            {error && (
              <div
                style={{
                  background: "#FEF2F2",
                  border: "1px solid #FCA5A5",
                  borderRadius: 8,
                  padding: "8px 12px",
                  color: "#B91C1C",
                  fontSize: 12.5,
                  marginBottom: 12,
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

            <button
              type="submit"
              disabled={isSubmitting}
              className="ha-form-submit-btn"
            >
              <span>{isSubmitting ? "Dispatching Seat Brief…" : "Request Attorney Dossiers"}</span>
              <span aria-hidden="true" style={{ fontSize: 16 }}>→</span>
            </button>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                fontSize: 11.5,
                color: "#64748B",
                textAlign: "center",
                marginTop: 11,
                lineHeight: 1.4,
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span>100% Confidential · Zero retainer · 23% flat contingency</span>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
