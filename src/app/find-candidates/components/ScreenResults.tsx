"use client";

import React, { useState } from "react";
import {
  EnrichedCandidate,
  ParsedSeat,
  CandidateMatchResult,
  TERMS_DATA,
} from "../candidateData";
import { roles, cities } from "@/data";
import { CandidateDossierCard } from "@/components/CandidateDossierCard";

interface ScreenResultsProps {
  seat: ParsedSeat;
  promptText: string;
  isFromPosting: boolean;
  results: CandidateMatchResult[];
  unlockedIds: string[];
  activeCandidateId: string | null;
  onUpdateSeat: (updated: Partial<ParsedSeat>) => void;
  onSubmitPrompt: (newPrompt: string) => void;
  onSelectCandidate: (candidate: EnrichedCandidate) => void;
  onOpenGateModal: (candidate: EnrichedCandidate) => void;
  onOpenTermsModal: (candidate: EnrichedCandidate | null, readOnly?: boolean) => void;
}

const EXP_OPTIONS: Array<{ id: "any" | "1-3" | "3-6" | "6+"; label: string }> = [
  { id: "any", label: "Any Exp" },
  { id: "1-3", label: "1–3 years" },
  { id: "3-6", label: "3–6 years" },
  { id: "6+", label: "6+ years" },
];

const MODE_OPTIONS: Array<{ id: "any" | "on-site" | "hybrid" | "remote"; label: string }> = [
  { id: "any", label: "Any Office Mode" },
  { id: "on-site", label: "On-site" },
  { id: "hybrid", label: "Hybrid" },
  { id: "remote", label: "Remote" },
];

export function ScreenResults({
  seat,
  promptText,
  isFromPosting,
  results,
  unlockedIds,
  onUpdateSeat,
  onSubmitPrompt,
  onSelectCandidate,
  onOpenGateModal,
  onOpenTermsModal,
}: ScreenResultsProps) {
  const [editText, setEditText] = useState(promptText);
  const [skipQuestion, setSkipQuestion] = useState(false);
  const [noMatchEmail, setNoMatchEmail] = useState("");
  const [noMatchSent, setNoMatchSent] = useState(false);

  // Check if role or city is missing
  const missing =
    !skipQuestion && (!seat.role ? "role" : !seat.city ? "city" : null);

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editText.trim()) {
      onSubmitPrompt(editText.trim());
    }
  };

  const handleNoMatchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (noMatchEmail.trim()) {
      setNoMatchSent(true);
    }
  };

  const currentRoleObj = roles.find((r) => r.slug === seat.role);
  const currentCityObj = cities.find((c) => c.slug === seat.city);
  const roleLabel = currentRoleObj ? currentRoleObj.name : "candidate";
  const cityLabel = currentCityObj
    ? currentCityObj.name
    : seat.city === "any"
    ? "Texas"
    : "Texas";

  return (
    <section className="fc-results-screen" style={{ padding: "24px 0 80px" }}>
      <div className="wrap" style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
        {/* 1. COMPACT RE-SEARCH ASK BOX */}
        <form
          className="fc-askbox"
          onSubmit={handleEditSubmit}
          style={{ maxWidth: "100%", margin: "0 0 16px", padding: "8px 12px 8px 14px", borderRadius: 12 }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <textarea
              rows={1}
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              placeholder="Refine criteria or paste another job posting URL..."
              style={{ minHeight: 46, height: 46, fontSize: 14.5, padding: "4px 0", lineHeight: 1.35, width: "100%", border: 0, outline: "none", background: "transparent", resize: "none", color: "#08142A" }}
            />
            <button
              type="submit"
              className="fc-send-btn"
              style={{ width: 38, height: 38, borderRadius: 9, flexShrink: 0 }}
              aria-label="Re-run search"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </form>

        {/* 2. "WHAT WE UNDERSTOOD" LIVE TAG PILLS RAIL */}
        <div className="fc-understood">
          <p className="fc-understood-label">
            What we understood from your seat. Select any tag to adjust criteria in real time:
          </p>
          <div className="fc-tags-rail">
            {/* ROLE PILL */}
            <span className={`fc-tag-pill ${!seat.role ? "empty" : ""}`}>
              <span className="k">Role</span>
              <select
                value={seat.role || ""}
                onChange={(e) => onUpdateSeat({ role: e.target.value || null })}
                aria-label="Select role"
              >
                <option value="">Select Role</option>
                {roles.map((r) => (
                  <option key={r.slug} value={r.slug}>
                    {r.name}
                  </option>
                ))}
              </select>
              {isFromPosting && seat.role && <span className="src">from posting</span>}
            </span>

            {/* CITY PILL */}
            <span className={`fc-tag-pill ${!seat.city ? "empty" : ""}`}>
              <span className="k">City</span>
              <select
                value={seat.city || ""}
                onChange={(e) => onUpdateSeat({ city: e.target.value || null })}
                aria-label="Select Texas market"
              >
                <option value="">Select Market</option>
                <option value="any">Any Texas Market</option>
                {cities.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}, {c.state}
                  </option>
                ))}
              </select>
              {isFromPosting && seat.city && <span className="src">from posting</span>}
            </span>

            {/* EXPERIENCE PILL */}
            <span className={`fc-tag-pill ${seat.years === "any" ? "empty" : ""}`}>
              <span className="k">Experience</span>
              <select
                value={seat.years}
                onChange={(e) => onUpdateSeat({ years: e.target.value as ParsedSeat["years"] })}
                aria-label="Select experience level"
              >
                {EXP_OPTIONS.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.label}
                  </option>
                ))}
              </select>
            </span>

            {/* MODE PILL */}
            <span className={`fc-tag-pill ${seat.mode === "any" ? "empty" : ""}`}>
              <span className="k">Office</span>
              <select
                value={seat.mode}
                onChange={(e) => onUpdateSeat({ mode: e.target.value as ParsedSeat["mode"] })}
                aria-label="Select office arrangement"
              >
                {MODE_OPTIONS.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.label}
                  </option>
                ))}
              </select>
            </span>

            {/* PAY CAP PILL */}
            <span className={`fc-tag-pill ${!seat.pay ? "empty" : ""}`}>
              <span className="k">Max Base</span>
              <span style={{ color: "#1D4ED8", fontWeight: 700 }}>$</span>
              <input
                type="number"
                inputMode="numeric"
                placeholder="—"
                value={seat.pay ?? ""}
                onChange={(e) => {
                  const val = e.target.value ? Number(e.target.value) : null;
                  onUpdateSeat({ pay: val });
                }}
                aria-label="Top of pay band in thousands"
              />
              <span style={{ color: "#1D4ED8", fontWeight: 700 }}>k</span>
            </span>
          </div>

          {/* 3. "ONE QUESTION" CLARIFICATION WIDGET */}
          {missing && (
            <div className="fc-question-box" role="group" aria-label="Seat clarification">
              <p>
                {missing === "role"
                  ? "Which practice area or role is the seat for?"
                  : "Which Texas city or market is the seat located in?"}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {missing === "role"
                  ? roles.slice(0, 6).map((r) => (
                      <button
                        key={r.slug}
                        type="button"
                        className="fc-chip"
                        onClick={() => onUpdateSeat({ role: r.slug })}
                      >
                        {r.name}
                      </button>
                    ))
                  : cities.slice(0, 5).map((c) => (
                      <button
                        key={c.slug}
                        type="button"
                        className="fc-chip"
                        onClick={() => onUpdateSeat({ city: c.slug })}
                      >
                        {c.name}, TX
                      </button>
                    ))}
                <button
                  type="button"
                  className="fc-chip"
                  style={{ background: "#F1F5F9", borderColor: "#CBD5E1", fontWeight: 600 }}
                  onClick={() => {
                    setSkipQuestion(true);
                    if (!seat.city) onUpdateSeat({ city: "any" });
                  }}
                >
                  Skip, show all candidates →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 4. RESULTS SECTION HEAD */}
        {!missing && (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                flexWrap: "wrap",
                gap: 12,
                marginTop: 32,
                paddingBottom: 14,
                borderBottom: "1.5px solid #E2E8F0",
              }}
            >
              <div>
                <h2
                  style={{
                    fontFamily: "var(--display)",
                    fontSize: "clamp(22px, 2.6vw, 28px)",
                    color: "#08142A",
                    margin: 0,
                    fontWeight: 500,
                  }}
                >
                  {results.length}{" "}
                  <span style={{ color: "#1D4ED8" }}>{roleLabel}</span>
                  {results.length === 1 ? "" : "s"} open to {cityLabel} seats
                </h2>
                <p style={{ color: "#64748B", fontSize: 13.5, margin: "4px 0 0" }}>
                  Each attorney spoke with Justin in the last two weeks and agreed to be shown anonymously.
                </p>
              </div>

              <div style={{ fontFamily: "var(--mono)", fontSize: 11.5, color: "#1D4ED8", fontWeight: 700 }}>
                100% PRE-SCREENED · VERIFIED COMPENSATION
              </div>
            </div>

            {/* RESULTS CARDS GRID OR EMPTY STATE */}
            {results.length === 0 ? (
              <div
                style={{
                  background: "#FFFFFF",
                  border: "1.5px dashed #CBD5E1",
                  borderRadius: 14,
                  padding: "40px 24px",
                  textAlign: "center",
                  marginTop: 24,
                }}
              >
                <h3 style={{ fontFamily: "var(--display)", fontSize: 22, color: "#08142A", margin: "0 0 8px" }}>
                  No candidate fits this exact filter combination right now
                </h3>
                <p style={{ color: "#64748B", fontSize: 14.5, maxWidth: 540, margin: "0 auto 20px", lineHeight: 1.6 }}>
                  Justin maintains an active off-market network of lateral attorneys across Texas. Submit your seat details and he will review our confidential network within one business day.
                </p>

                {noMatchSent ? (
                  <div
                    style={{
                      background: "#EFF6FF",
                      border: "1px solid #DBEAFE",
                      color: "#1D4ED8",
                      padding: "12px 20px",
                      borderRadius: 8,
                      display: "inline-block",
                      fontWeight: 600,
                      fontSize: 14,
                    }}
                  >
                    ✓ Seat received. Justin will send you a first confidential shortlist within 48 hours.
                  </div>
                ) : (
                  <form
                    onSubmit={handleNoMatchSubmit}
                    style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap", maxWidth: 460, margin: "0 auto" }}
                  >
                    <input
                      type="email"
                      required
                      placeholder="you@yourfirm.com"
                      value={noMatchEmail}
                      onChange={(e) => setNoMatchEmail(e.target.value)}
                      style={{
                        flex: "1 1 220px",
                        height: 44,
                        border: "1.5px solid #CBD5E1",
                        borderRadius: 8,
                        padding: "0 14px",
                        fontSize: 14,
                      }}
                    />
                    <button
                      type="submit"
                      className="btn btn-primary fc-card-cta-btn"
                      style={{
                        height: 44,
                        borderRadius: 8,
                        padding: "0 20px",
                        background: "#2563EB",
                        color: "#FFFFFF",
                        border: 0,
                        fontWeight: 600,
                        cursor: "pointer",
                        boxShadow: "0 4px 14px rgba(37, 99, 235, 0.35)",
                      }}
                    >
                      Send me a shortlist
                    </button>
                  </form>
                )}
              </div>
            ) : (
              <div className="fc-cards-grid">
                {results.map(({ candidate: c, notes, warn }) => {
                  const isUnlocked = unlockedIds.includes(c.id);
                  return (
                    <CandidateDossierCard
                      key={c.id}
                      c={c}
                      notes={notes}
                      warn={warn}
                      quiet={isUnlocked}
                      actionLabel={isUnlocked ? "Open resume" : "Show full resume"}
                      action={{ onClick: () => (isUnlocked ? onSelectCandidate(c) : onOpenGateModal(c)) }}
                    />
                  );
                })}
              </div>
            )}

            {/* TRUST FOOTER & TERMS LINK */}
            <p
              style={{
                fontSize: 13,
                color: "#64748B",
                textAlign: "center",
                marginTop: 36,
                paddingTop: 18,
                borderTop: "1px solid #E2E8F0",
              }}
            >
              Zero fee unless you hire · No exclusivity required · {TERMS_DATA.guarantee} replacement warranty ·{" "}
              <button
                type="button"
                onClick={() => onOpenTermsModal(null, true)}
                style={{
                  background: "none",
                  border: 0,
                  color: "#1D4ED8",
                  textDecoration: "underline",
                  cursor: "pointer",
                  fontWeight: 600,
                  font: "inherit",
                }}
              >
                See the one-page terms →
              </button>
            </p>
          </>
        )}
      </div>
    </section>
  );
}

