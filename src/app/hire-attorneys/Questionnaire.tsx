"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { people } from "@/data";

export interface IntakeData {
  // Step 1: Position & Location
  practiceArea: string;
  customPracticeArea?: string;
  level: string;
  location: string;
  customLocation?: string;

  // Step 2: Timeline & Firm Profile
  timing: string;
  firmSize: string;
  feeConfirmed: boolean;

  // Step 3: Contact & Delivery
  firmName: string;
  firmWebsite: string;
  contactName: string;
  email: string;
  phone: string;
}

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

const EXPERIENCE_LEVELS = [
  { id: "junior", label: "Junior Associate", sub: "1–3 years post-bar" },
  { id: "mid", label: "Mid-Level Associate", sub: "4–7 years post-bar" },
  { id: "senior", label: "Senior Associate", sub: "8+ years post-bar" },
  { id: "partner", label: "Partner Track / Counsel", sub: "Portable book or leadership" },
];

const QUICK_LOCATIONS = [
  "Houston, TX",
  "Austin, TX",
  "Dallas-Fort Worth, TX",
  "San Antonio, TX",
  "Statewide / Remote TX",
  "Other Location",
];

const START_TIMELINES = [
  { id: "immediate", label: "Immediately", sub: "Ready to interview this week" },
  { id: "30days", label: "Within 30–60 Days", sub: "Active lateral transition" },
  { id: "quarter", label: "1–3 Months", sub: "Upcoming strategic expansion" },
  { id: "exploring", label: "Confidential Inquiry", sub: "Reviewing qualified talent" },
];

const FIRM_SIZES = [
  "Solo Practice",
  "2–5 Attorneys",
  "6–20 Attorneys",
  "21–50 Attorneys",
  "50+ Attorneys",
];

const TIME_SLOTS = [
  "9:00 AM",
  "10:00 AM",
  "11:30 AM",
  "1:00 PM",
  "2:30 PM",
  "4:00 PM",
];

export function Questionnaire() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [viewState, setViewState] = useState<"form" | "booking" | "done">("form");

  // Form State
  const [data, setData] = useState<IntakeData>({
    practiceArea: "Estate Planning / Probate",
    customPracticeArea: "",
    level: "Mid-Level Associate",
    location: "Houston, TX",
    customLocation: "",
    timing: "Immediately",
    firmSize: "6–20 Attorneys",
    feeConfirmed: true,
    firmName: "",
    firmWebsite: "",
    contactName: "",
    email: "",
    phone: "",
  });

  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Calendar booking state
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const cardRef = useRef<HTMLDivElement>(null);
  const justin = people.find((p) => p.id === "justin") || people[0];

  // Generate next 10 business days for instant booking
  const [businessDays, setBusinessDays] = useState<Date[]>([]);
  useEffect(() => {
    const list: Date[] = [];
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    while (list.length < 10) {
      d.setDate(d.getDate() + 1);
      const day = d.getDay();
      if (day !== 0 && day !== 6) {
        list.push(new Date(d));
      }
    }
    setBusinessDays(list);
  }, []);

  const scrollToCard = () => {
    if (cardRef.current) {
      const section = document.getElementById("questionnaire");
      const target = section || cardRef.current;
      const top = target.getBoundingClientRect().top + window.scrollY - 85;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const handleStepChange = (newStep: 1 | 2 | 3) => {
    setStep(newStep);
    scrollToCard();
  };

  // Step 1 Validation
  const isStep1Valid = Boolean(
    data.practiceArea &&
      (data.practiceArea !== "Other Practice Area" || data.customPracticeArea?.trim()) &&
      data.level &&
      data.location &&
      (data.location !== "Other Location" || data.customLocation?.trim())
  );

  // Step 2 Validation
  const isStep2Valid = Boolean(data.timing && data.firmSize && data.feeConfirmed);

  // Step 3 Validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const isNameValid = data.contactName.trim().length >= 2;
  const isEmailValid = emailRegex.test(data.email.trim());
  const isPhoneValid = data.phone.replace(/\D/g, "").length >= 7;
  const isFirmValid = data.firmName.trim().length >= 2;
  const isStep3Valid = isNameValid && isEmailValid && isPhoneValid && isFirmValid;

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    if (isStep3Valid) {
      setViewState("booking");
      scrollToCard();
    }
  };

  // BOOKING / CONFIRMATION SCREENS
  if (viewState === "booking") {
    return (
      <div ref={cardRef} className="q-card-box step-in" style={{ background: "#FFFFFF", borderRadius: 16, border: "1.5px solid #E2E8F0", padding: "40px 32px", boxShadow: "0 20px 50px -15px rgba(8, 20, 42, 0.08)" }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 56, height: 56, borderRadius: "50%", background: "#EFF6FF", color: "#1D4ED8", margin: "0 auto 16px" }}>
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <div style={{ fontFamily: "var(--mono)", fontSize: 11.5, color: "#1D4ED8", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 700, marginBottom: 8 }}>
            BRIEF RECEIVED · MATCHING IN PROGRESS
          </div>
          <h3 style={{ fontFamily: "var(--display)", fontSize: "clamp(26px, 3.2vw, 34px)", color: "#08142A", fontWeight: 500, margin: "0 0 10px", lineHeight: 1.2 }}>
            Your candidate search is now active!
          </h3>
          <p style={{ color: "#475569", fontSize: 15.5, lineHeight: 1.6, maxWidth: 640, margin: "0 auto" }}>
            We are curating pre-screened lateral attorney dossiers for <b>{data.firmName}</b>. Pick an optional 15-minute slot to confirm your seat parameters with Justin Sofman:
          </p>
        </div>

        {/* STEP 1: CHOOSE A DAY */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <b style={{ fontSize: 14, color: "#08142A" }}>1. Select a date for your 15-min call:</b>
            <span style={{ fontSize: 12, color: "#64748B", fontFamily: "var(--mono)" }}>Next 10 business days</span>
          </div>
          <div className="q-days-scroll">
            {businessDays.map((d) => {
              const isSelected = selectedDate?.toDateString() === d.toDateString();
              return (
                <button
                  key={d.toISOString()}
                  type="button"
                  onClick={() => {
                    setSelectedDate(d);
                    setSelectedTime(null);
                  }}
                  className={`q-day-pill ${isSelected ? "selected" : ""}`}
                  aria-pressed={isSelected}
                  style={{
                    borderRadius: 10,
                    padding: "12px 10px",
                    textAlign: "center",
                    border: isSelected ? "2px solid #1D4ED8" : "1.5px solid #E2E8F0",
                    background: isSelected ? "#1D4ED8" : "#FFFFFF",
                    color: isSelected ? "#FFFFFF" : "#08142A",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  <span style={{ display: "block", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: isSelected ? "#93C5FD" : "#64748B" }}>
                    {d.toLocaleDateString("en-US", { weekday: "short" })}
                  </span>
                  <span style={{ display: "block", fontSize: 20, fontWeight: 700, margin: "2px 0" }}>
                    {d.getDate()}
                  </span>
                  <span style={{ display: "block", fontSize: 11, color: isSelected ? "rgba(255,255,255,0.85)" : "#64748B" }}>
                    {d.toLocaleDateString("en-US", { month: "short" })}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* STEP 2: CHOOSE A TIME */}
        {selectedDate && (
          <div style={{ marginBottom: 28 }} className="step-in">
            <b style={{ display: "block", fontSize: 14, color: "#08142A", marginBottom: 12 }}>
              2. Select time slot on {selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}:
            </b>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))", gap: 10 }}>
              {TIME_SLOTS.map((t) => {
                const isSelected = selectedTime === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setSelectedTime(t)}
                    style={{
                      padding: "12px 14px",
                      borderRadius: 8,
                      border: isSelected ? "2px solid #1D4ED8" : "1.5px solid #E2E8F0",
                      background: isSelected ? "#1D4ED8" : "#FAF9F5",
                      color: isSelected ? "#FFFFFF" : "#08142A",
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                    }}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
            <p style={{ marginTop: 8, fontSize: 12, color: "#64748B" }}>Central Time (CT) / US Eastern</p>
          </div>
        )}

        {/* CTA BUTTONS */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <button
            type="button"
            disabled={!selectedDate || !selectedTime}
            onClick={() => {
              setViewState("done");
              scrollToCard();
            }}
            style={{
              width: "100%",
              padding: "16px 28px",
              borderRadius: 7,
              background: selectedDate && selectedTime ? "#1D4ED8" : "#E2E8F0",
              color: selectedDate && selectedTime ? "#FFFFFF" : "#94A3B8",
              fontSize: 16,
              fontWeight: 600,
              border: "none",
              cursor: selectedDate && selectedTime ? "pointer" : "not-allowed",
              boxShadow: selectedDate && selectedTime ? "0 8px 20px rgba(29, 78, 216, 0.3)" : "none",
              transition: "all 0.2s ease",
            }}
          >
            {selectedDate && selectedTime
              ? `Confirm Call: ${selectedDate.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })} at ${selectedTime}`
              : "Select a date and time above"}
          </button>

          <div style={{ textAlign: "center", paddingTop: 8 }}>
            <span style={{ fontSize: 13, color: "#64748B" }}>Prefer to skip the call? </span>
            <button
              type="button"
              onClick={() => {
                setViewState("done");
                scrollToCard();
              }}
              style={{ background: "none", border: "none", color: "#1D4ED8", fontSize: 13, fontWeight: 600, textDecoration: "underline", cursor: "pointer" }}
            >
              Skip call and just email me dossiers →
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (viewState === "done") {
    return (
      <div ref={cardRef} className="q-card-box step-in" style={{ background: "#FFFFFF", borderRadius: 16, border: "1.5px solid #E2E8F0", padding: "44px 34px", boxShadow: "0 20px 50px -15px rgba(8, 20, 42, 0.08)" }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 60, height: 60, borderRadius: "50%", background: "#DCFCE7", color: "#166534", margin: "0 auto 16px" }}>
            <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <div style={{ fontFamily: "var(--mono)", fontSize: 11.5, color: "#166534", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 700, marginBottom: 8 }}>
            SEARCH ACTIVE · 48H DOSSIER DELIVERY
          </div>
          <h3 style={{ fontFamily: "var(--display)", fontSize: "clamp(26px, 3.4vw, 36px)", color: "#08142A", fontWeight: 500, margin: "0 0 12px" }}>
            Your seat brief is officially registered!
          </h3>
          <p style={{ color: "#475569", fontSize: 16, lineHeight: 1.6, maxWidth: 640, margin: "0 auto" }}>
            We have begun screening lateral candidates for <b>{data.firmName || "your firm"}</b>. An executive confirmation and initial matching dossiers will be delivered to <b>{data.email}</b>.
          </p>
        </div>

        {/* SUMMARY CARD */}
        <div style={{ background: "#FAF9F5", border: "1.5px solid #E2E8F0", borderRadius: 12, padding: "24px 22px", marginBottom: 24 }}>
          <div style={{ fontFamily: "var(--mono)", fontSize: 11.5, color: "#1D4ED8", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>
            SEAT BRIEF SUMMARY
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14, fontSize: 14 }}>
            <div>
              <span style={{ color: "#64748B", display: "block", fontSize: 12 }}>Practice Area</span>
              <b style={{ color: "#08142A" }}>{data.practiceArea === "Other Practice Area" ? data.customPracticeArea : data.practiceArea}</b>
            </div>
            <div>
              <span style={{ color: "#64748B", display: "block", fontSize: 12 }}>Experience Level</span>
              <b style={{ color: "#08142A" }}>{data.level}</b>
            </div>
            <div>
              <span style={{ color: "#64748B", display: "block", fontSize: 12 }}>Location</span>
              <b style={{ color: "#08142A" }}>{data.location === "Other Location" ? data.customLocation : data.location}</b>
            </div>
            <div>
              <span style={{ color: "#64748B", display: "block", fontSize: 12 }}>Target Timeline</span>
              <b style={{ color: "#08142A" }}>{data.timing}</b>
            </div>
          </div>
        </div>

        {/* DIRECT CONTACT NOTIFICATION */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, background: "#EFF6FF", border: "1px solid #DBEAFE", borderRadius: 10, padding: "14px 18px", color: "#1E40AF", fontSize: 14 }}>
          <span style={{ fontSize: 18, flexShrink: 0 }}>✓</span>
          <div>
            <b>100% Contingency Guarantee:</b> Zero upfront cost. 23% fee is due only 15 days after your hire starts, backed by our 90-day replacement warranty.
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: 28 }}>
          <Link href="/" style={{ color: "#1D4ED8", fontSize: 14, fontWeight: 600, textDecoration: "underline" }}>
            ← Return to Orion Placement home
          </Link>
        </div>
      </div>
    );
  }

  // 3-STEP INTAKE FLOW
  return (
    <div
      ref={cardRef}
      className="q-card-box step-in"
      style={{
        background: "#FFFFFF",
        borderRadius: 16,
        padding: "36px 30px",
        border: "1.5px solid #E2E8F0",
        boxShadow: "0 20px 50px -15px rgba(8, 20, 42, 0.08)",
      }}
    >
      {/* 3-STEP PROGRESS HEADER */}
      <div style={{ marginBottom: 30 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                fontFamily: "var(--mono)",
                fontSize: 11,
                fontWeight: 700,
                color: "#1D4ED8",
                background: "#EFF6FF",
                border: "1px solid #DBEAFE",
                borderRadius: 6,
                padding: "4px 10px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Step {step} of 3
            </span>
            <span style={{ fontSize: 13, color: "#64748B", fontWeight: 500 }}>
              {step === 1 && "Role & Practice Area"}
              {step === 2 && "Timeline & Firm Parameters"}
              {step === 3 && "Contact & Dossier Delivery"}
            </span>
          </div>
          <span style={{ fontFamily: "var(--mono)", fontSize: 12, fontWeight: 700, color: "#1D4ED8" }}>
            {step === 1 && "33% Complete"}
            {step === 2 && "66% Complete"}
            {step === 3 && "100% Final Step"}
          </span>
        </div>

        {/* Stepper bar */}
        <div style={{ width: "100%", height: 6, background: "#F1F5F9", borderRadius: 999, overflow: "hidden" }}>
          <div
            style={{
              height: "100%",
              width: step === 1 ? "33%" : step === 2 ? "66%" : "100%",
              background: "linear-gradient(90deg, #1D4ED8 0%, #3B82F6 100%)",
              borderRadius: 999,
              transition: "width 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
        </div>
      </div>

      {/* STEP 1: ROLE & PRACTICE AREA */}
      {step === 1 && (
        <div className="step-in">
          <div style={{ marginBottom: 24 }}>
            <h3 style={{ fontFamily: "var(--display)", fontSize: "clamp(24px, 2.6vw, 30px)", color: "#08142A", fontWeight: 500, margin: "0 0 8px", lineHeight: 1.25 }}>
              Who are you looking to hire?
            </h3>
            <p style={{ color: "#64748B", fontSize: 15, margin: 0 }}>
              Select the practice area, seniority level, and target Texas market for your open seat.
            </p>
          </div>

          {/* 1. Practice Area */}
          <div style={{ marginBottom: 26 }}>
            <label style={{ display: "block", fontFamily: "var(--mono)", fontSize: 11.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#08142A", marginBottom: 10 }}>
              1. Primary Practice Area
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 10 }}>
              {PRACTICE_AREAS.map((pa) => {
                const isSelected = data.practiceArea === pa;
                return (
                  <button
                    key={pa}
                    type="button"
                    onClick={() => setData((prev) => ({ ...prev, practiceArea: pa }))}
                    style={{
                      padding: "12px 14px",
                      borderRadius: 8,
                      border: isSelected ? "1.5px solid #1D4ED8" : "1.5px solid #E2E8F0",
                      background: isSelected ? "#EFF6FF" : "#FFFFFF",
                      color: isSelected ? "#1D4ED8" : "#08142A",
                      fontSize: 13.5,
                      fontWeight: isSelected ? 600 : 500,
                      textAlign: "left",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <span>{pa}</span>
                    <span
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: "50%",
                        border: isSelected ? "4px solid #1D4ED8" : "1.5px solid #CBD5E1",
                        background: "#FFFFFF",
                        flexShrink: 0,
                      }}
                    />
                  </button>
                );
              })}
            </div>

            {data.practiceArea === "Other Practice Area" && (
              <div style={{ marginTop: 10 }}>
                <input
                  type="text"
                  placeholder="Specify practice area (e.g. Healthcare Regulatory, Immigration, IP)"
                  value={data.customPracticeArea}
                  onChange={(e) => setData((prev) => ({ ...prev, customPracticeArea: e.target.value }))}
                  className="q-input"
                  style={{ width: "100%", padding: "12px 16px", borderRadius: 8, border: "1.5px solid #1D4ED8", fontSize: 14 }}
                  autoFocus
                />
              </div>
            )}
          </div>

          {/* 2. Experience Level */}
          <div style={{ marginBottom: 26 }}>
            <label style={{ display: "block", fontFamily: "var(--mono)", fontSize: 11.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#08142A", marginBottom: 10 }}>
              2. Attorney Seniority Level
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10 }}>
              {EXPERIENCE_LEVELS.map((lvl) => {
                const isSelected = data.level === lvl.label;
                return (
                  <button
                    key={lvl.id}
                    type="button"
                    onClick={() => setData((prev) => ({ ...prev, level: lvl.label }))}
                    style={{
                      padding: "12px 14px",
                      borderRadius: 8,
                      border: isSelected ? "1.5px solid #1D4ED8" : "1.5px solid #E2E8F0",
                      background: isSelected ? "#EFF6FF" : "#FFFFFF",
                      textAlign: "left",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <b style={{ display: "block", fontSize: 14, color: isSelected ? "#1D4ED8" : "#08142A" }}>
                      {lvl.label}
                    </b>
                    <span style={{ fontSize: 12, color: "#64748B" }}>{lvl.sub}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Hiring Location */}
          <div style={{ marginBottom: 30 }}>
            <label style={{ display: "block", fontFamily: "var(--mono)", fontSize: 11.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#08142A", marginBottom: 10 }}>
              3. Target Market / City
            </label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {QUICK_LOCATIONS.map((loc) => {
                const isSelected = data.location === loc;
                return (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => setData((prev) => ({ ...prev, location: loc }))}
                    style={{
                      padding: "9px 18px",
                      borderRadius: 999,
                      border: isSelected ? "1.5px solid #1D4ED8" : "1.5px solid #E2E8F0",
                      background: isSelected ? "#1D4ED8" : "#FAF9F5",
                      color: isSelected ? "#FFFFFF" : "#08142A",
                      fontSize: 13.5,
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                    }}
                  >
                    {loc}
                  </button>
                );
              })}
            </div>

            {data.location === "Other Location" && (
              <div style={{ marginTop: 10 }}>
                <input
                  type="text"
                  placeholder="Specify city or state (e.g. Plano, TX or Remote across Texas)"
                  value={data.customLocation}
                  onChange={(e) => setData((prev) => ({ ...prev, customLocation: e.target.value }))}
                  className="q-input"
                  style={{ width: "100%", padding: "12px 16px", borderRadius: 8, border: "1.5px solid #1D4ED8", fontSize: 14 }}
                  autoFocus
                />
              </div>
            )}
          </div>

          {/* Continue Action */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1.5px solid #F1F5F9", paddingTop: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#64748B", fontSize: 13 }}>
              <span style={{ color: "#166534", fontWeight: 700 }}>✓</span>
              <span>100% Contingency · Zero upfront retainer</span>
            </div>
            <button
              type="button"
              disabled={!isStep1Valid}
              onClick={() => handleStepChange(2)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: isStep1Valid ? "#1D4ED8" : "#E2E8F0",
                color: isStep1Valid ? "#FFFFFF" : "#94A3B8",
                padding: "14px 28px",
                borderRadius: 7,
                fontSize: 15.5,
                fontWeight: 600,
                border: "none",
                cursor: isStep1Valid ? "pointer" : "not-allowed",
                boxShadow: isStep1Valid ? "0 6px 16px rgba(29, 78, 216, 0.3)" : "none",
                transition: "all 0.15s ease",
              }}
            >
              <span>Continue to Timeline</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: TIMELINE & FIRM PARAMETERS */}
      {step === 2 && (
        <div className="step-in">
          <div style={{ marginBottom: 24 }}>
            <h3 style={{ fontFamily: "var(--display)", fontSize: "clamp(24px, 2.6vw, 30px)", color: "#08142A", fontWeight: 500, margin: "0 0 8px", lineHeight: 1.25 }}>
              When do you need this person to start?
            </h3>
            <p style={{ color: "#64748B", fontSize: 15, margin: 0 }}>
              Help us align candidate availability and match your firm&apos;s hiring schedule.
            </p>
          </div>

          {/* 1. Target Start Timing */}
          <div style={{ marginBottom: 26 }}>
            <label style={{ display: "block", fontFamily: "var(--mono)", fontSize: 11.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#08142A", marginBottom: 10 }}>
              1. Desired Start Date
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10 }}>
              {START_TIMELINES.map((tm) => {
                const isSelected = data.timing === tm.label;
                return (
                  <button
                    key={tm.id}
                    type="button"
                    onClick={() => setData((prev) => ({ ...prev, timing: tm.label }))}
                    style={{
                      padding: "14px 16px",
                      borderRadius: 8,
                      border: isSelected ? "1.5px solid #1D4ED8" : "1.5px solid #E2E8F0",
                      background: isSelected ? "#EFF6FF" : "#FFFFFF",
                      textAlign: "left",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <b style={{ display: "block", fontSize: 14.5, color: isSelected ? "#1D4ED8" : "#08142A" }}>
                      {tm.label}
                    </b>
                    <span style={{ fontSize: 12, color: "#64748B" }}>{tm.sub}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Firm Size */}
          <div style={{ marginBottom: 26 }}>
            <label style={{ display: "block", fontFamily: "var(--mono)", fontSize: 11.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#08142A", marginBottom: 10 }}>
              2. Total Attorneys in Your Firm
            </label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {FIRM_SIZES.map((fs) => {
                const isSelected = data.firmSize === fs;
                return (
                  <button
                    key={fs}
                    type="button"
                    onClick={() => setData((prev) => ({ ...prev, firmSize: fs }))}
                    style={{
                      padding: "9px 18px",
                      borderRadius: 999,
                      border: isSelected ? "1.5px solid #1D4ED8" : "1.5px solid #E2E8F0",
                      background: isSelected ? "#1D4ED8" : "#FAF9F5",
                      color: isSelected ? "#FFFFFF" : "#08142A",
                      fontSize: 13.5,
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                    }}
                  >
                    {fs}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Transparent Contingency Terms Box */}
          <div style={{ background: "#FAF9F5", border: "1.5px solid #E2E8F0", borderRadius: 12, padding: "20px 22px", marginBottom: 30 }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#EFF6FF", border: "1px solid #DBEAFE", color: "#1D4ED8", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <b style={{ display: "block", fontSize: 15, color: "#08142A", marginBottom: 4 }}>
                  Zero Upfront Cost · Standard 23% Contingency
                </b>
                <p style={{ fontSize: 13.5, color: "#475569", lineHeight: 1.55, margin: "0 0 10px" }}>
                  Orion works on 100% contingency. There are no retainers or exclusivity requirements. A placement fee is payable only when a candidate you interview starts at your firm, backed by our 90-day replacement warranty.
                </p>
                <label style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13.5, fontWeight: 600, color: "#08142A", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={data.feeConfirmed}
                    onChange={(e) => setData((prev) => ({ ...prev, feeConfirmed: e.target.checked }))}
                    style={{ width: 17, height: 17, accentColor: "#1D4ED8", cursor: "pointer" }}
                  />
                  <span>I agree to Orion&apos;s contingency placement model</span>
                </label>
              </div>
            </div>
          </div>

          {/* Continue / Back Actions */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1.5px solid #F1F5F9", paddingTop: 20 }}>
            <button
              type="button"
              onClick={() => handleStepChange(1)}
              style={{
                background: "none",
                border: "none",
                color: "#64748B",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                padding: "8px 12px",
              }}
            >
              ← Back
            </button>
            <button
              type="button"
              disabled={!isStep2Valid}
              onClick={() => handleStepChange(3)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: isStep2Valid ? "#1D4ED8" : "#E2E8F0",
                color: isStep2Valid ? "#FFFFFF" : "#94A3B8",
                padding: "14px 28px",
                borderRadius: 7,
                fontSize: 15.5,
                fontWeight: 600,
                border: "none",
                cursor: isStep2Valid ? "pointer" : "not-allowed",
                boxShadow: isStep2Valid ? "0 6px 16px rgba(29, 78, 216, 0.3)" : "none",
                transition: "all 0.15s ease",
              }}
            >
              <span>Continue to Contact</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: CONTACT & DOSSIER DELIVERY */}
      {step === 3 && (
        <form onSubmit={handleFinalSubmit} className="step-in">
          <div style={{ marginBottom: 24 }}>
            <h3 style={{ fontFamily: "var(--display)", fontSize: "clamp(24px, 2.6vw, 30px)", color: "#08142A", fontWeight: 500, margin: "0 0 8px", lineHeight: 1.25 }}>
              Where should we send candidate profiles?
            </h3>
            <p style={{ color: "#64748B", fontSize: 15, margin: 0 }}>
              Screened attorney dossiers matched to your brief will be delivered straight to your inbox within 48–72 hours.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: "block", fontFamily: "var(--mono)", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#08142A", marginBottom: 6 }}>
                Firm Legal Name *
              </label>
              <input
                type="text"
                placeholder="e.g. Apex Legal Group, PLLC"
                value={data.firmName}
                onChange={(e) => setData((prev) => ({ ...prev, firmName: e.target.value }))}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: 8,
                  border: contactSubmitted && !isFirmValid ? "1.5px solid #EF4444" : "1.5px solid #CBD5E1",
                  fontSize: 14.5,
                  outline: "none",
                }}
                required
              />
            </div>

            <div>
              <label style={{ display: "block", fontFamily: "var(--mono)", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#08142A", marginBottom: 6 }}>
                Firm Website <span style={{ color: "#94A3B8", fontWeight: 400 }}>(Optional)</span>
              </label>
              <input
                type="text"
                placeholder="e.g. apexlegal.com"
                value={data.firmWebsite}
                onChange={(e) => setData((prev) => ({ ...prev, firmWebsite: e.target.value }))}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: 8,
                  border: "1.5px solid #CBD5E1",
                  fontSize: 14.5,
                  outline: "none",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontFamily: "var(--mono)", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#08142A", marginBottom: 6 }}>
                Your Name &amp; Role *
              </label>
              <input
                type="text"
                placeholder="e.g. Jane Doe · Managing Partner"
                value={data.contactName}
                onChange={(e) => setData((prev) => ({ ...prev, contactName: e.target.value }))}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: 8,
                  border: contactSubmitted && !isNameValid ? "1.5px solid #EF4444" : "1.5px solid #CBD5E1",
                  fontSize: 14.5,
                  outline: "none",
                }}
                required
              />
            </div>

            <div>
              <label style={{ display: "block", fontFamily: "var(--mono)", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#08142A", marginBottom: 6 }}>
                Work Email Address *
              </label>
              <input
                type="email"
                placeholder="e.g. jdoe@apexlegal.com"
                value={data.email}
                onChange={(e) => setData((prev) => ({ ...prev, email: e.target.value }))}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: 8,
                  border: contactSubmitted && !isEmailValid ? "1.5px solid #EF4444" : "1.5px solid #CBD5E1",
                  fontSize: 14.5,
                  outline: "none",
                }}
                required
              />
            </div>

            <div style={{ gridColumn: "1 / -1" }}>
              <label style={{ display: "block", fontFamily: "var(--mono)", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#08142A", marginBottom: 6 }}>
                Direct Phone Number *
              </label>
              <input
                type="tel"
                placeholder="e.g. (512) 555-0199"
                value={data.phone}
                onChange={(e) => setData((prev) => ({ ...prev, phone: e.target.value }))}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: 8,
                  border: contactSubmitted && !isPhoneValid ? "1.5px solid #EF4444" : "1.5px solid #CBD5E1",
                  fontSize: 14.5,
                  outline: "none",
                }}
                required
              />
            </div>
          </div>

          {/* Privacy & Assurance Banner */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, background: "#FAF9F5", border: "1px solid #E2E8F0", borderRadius: 8, padding: "12px 16px", color: "#475569", fontSize: 13, marginBottom: 28 }}>
            <span style={{ color: "#166534", fontWeight: 700 }}>🔒</span>
            <span>100% Confidential. No public job posting. No candidate or unsolicited sales spam.</span>
          </div>

          {/* Final Submit / Back Actions */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1.5px solid #F1F5F9", paddingTop: 20 }}>
            <button
              type="button"
              onClick={() => handleStepChange(2)}
              style={{
                background: "none",
                border: "none",
                color: "#64748B",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                padding: "8px 12px",
              }}
            >
              ← Back
            </button>
            <button
              type="submit"
              disabled={contactSubmitted && !isStep3Valid}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#1D4ED8",
                color: "#FFFFFF",
                padding: "15px 32px",
                borderRadius: 7,
                fontSize: 16,
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
                boxShadow: "0 8px 20px rgba(29, 78, 216, 0.35)",
                transition: "all 0.15s ease",
              }}
            >
              <span>Submit Brief &amp; Receive Candidate Dossiers</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
