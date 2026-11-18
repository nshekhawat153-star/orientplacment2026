"use client";

import React, { useState } from "react";

interface ScreenStartProps {
  initialText: string;
  isReading: boolean;
  onSubmitPrompt: (text: string) => void;
}

const EXAMPLES = [
  "Estate planning attorney in Houston, 3–5 years, up to $145k",
  "Paralegal for our estate planning team, Houston, hybrid",
  "PI associate, Dallas, on-site",
  "https://whitfieldlowe.com/careers/associate-attorney",
];

export function ScreenStart({
  initialText,
  isReading,
  onSubmitPrompt,
}: ScreenStartProps) {
  const [text, setText] = useState(initialText);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && !isReading) {
      onSubmitPrompt(text.trim());
    }
  };

  const handleChipClick = (ex: string) => {
    setText(ex);
    onSubmitPrompt(ex);
  };

  const isLink = /^https?:\/\//i.test(text.trim());

  return (
    <section className="fc-start-screen" style={{ padding: "40px 0 80px" }}>
      <div className="wrap" style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
        {/* Eyebrow Capsule */}
        <div style={{ marginBottom: 18 }}>
          <span
            className="badge-capsule"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "#EFF6FF",
              border: "1px solid #DBEAFE",
              borderRadius: 999,
              padding: "6px 16px",
              fontFamily: "var(--mono)",
              fontSize: 11,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#1D4ED8",
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#1D4ED8" }} />
            <span>FOR LAW FIRMS HIRING · 100% CONTINGENCY</span>
          </span>
        </div>

        {/* Title */}
        <h1
          style={{
            fontFamily: "var(--display)",
            fontSize: "clamp(34px, 4.4vw, 52px)",
            lineHeight: 1.15,
            fontWeight: 500,
            color: "#08142A",
            margin: "0 auto 18px",
          }}
        >
          Who are you{" "}
          <span className="serif-accent" style={{ color: "#1D4ED8", fontStyle: "italic" }}>
            hiring?
          </span>
        </h1>

        {/* Subhead */}
        <p
          className="hero-lead-p"
          style={{
            maxWidth: 640,
            margin: "0 auto 32px",
          }}
        >
          Describe your seat or paste a job link to view screened candidate dossiers.
        </p>

        {/* THE ASK BOX */}
        <form className="fc-askbox" onSubmit={handleSubmit} role="search" aria-label="Describe your hire">
          <label htmlFor="fc-prompt-q" style={{ position: "absolute", width: 1, height: 1, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0,0,0,0)", border: 0 }}>
            Describe your hire, or paste your job link
          </label>
          <textarea
            id="fc-prompt-q"
            rows={2}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (text.trim() && !isReading) onSubmitPrompt(text.trim());
              }
            }}
            placeholder="e.g. Estate planning attorney in Houston, 3–5 years, up to $145k, on-site"
          />
          <div className="fc-askbox-row">
            <span className="fc-hint fc-hero-prompt-hint hide-sm">
              A sentence is enough. We detect role, Texas market, years, pay cap, and office arrangement.
            </span>
            <button
              type="submit"
              className="fc-send-btn"
              disabled={!text.trim() || isReading}
              aria-label="Find candidates"
              style={{ marginLeft: "auto" }}
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </form>

        {/* QUICK EXAMPLES */}
        <div className="fc-examples" aria-label="Example prompts">
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              type="button"
              className="fc-chip"
              onClick={() => handleChipClick(ex)}
            >
              {ex.startsWith("http") ? ex.replace(/^https?:\/\//, "").slice(0, 36) + "…" : ex}
            </button>
          ))}
        </div>

        {/* AI READING ANIMATION */}
        {isReading && (
          <div className="fc-reading" role="status" aria-live="polite">
            <span className="fc-dot" />
            <span className="fc-dot" />
            <span className="fc-dot" />
            <span>{isLink ? "Reading your job posting…" : "Reading your seat criteria…"}</span>
          </div>
        )}

        {/* TRUST MICROCOPY */}
        <p style={{ fontSize: 13, color: "#64748B", marginTop: 24 }}>
          <span style={{ color: "#1D4ED8" }}>★★★★★</span> <b>5.0</b> from 60 Google reviews · No fee unless you hire · Your search mandate is strictly confidential
        </p>

        {/* 4 PROCESS PILLARS (Matching /jobs terms styling) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 16,
            marginTop: 48,
            textAlign: "left",
          }}
        >
          <div style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 12, padding: "20px 18px" }}>
            <span style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 700, color: "#1D4ED8", textTransform: "uppercase" }}>
              STEP 1
            </span>
            <h4 style={{ fontFamily: "var(--display)", fontSize: 18, color: "#08142A", margin: "6px 0 4px" }}>
              See Candidates
            </h4>
            <p style={{ fontSize: 13, color: "#64748B", margin: 0, lineHeight: 1.5 }}>
              Browse pre-screened anonymous dossiers with verified Texas bar standing.
            </p>
          </div>

          <div style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 12, padding: "20px 18px" }}>
            <span style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 700, color: "#1D4ED8", textTransform: "uppercase" }}>
              STEP 2
            </span>
            <h4 style={{ fontFamily: "var(--display)", fontSize: 18, color: "#08142A", margin: "6px 0 4px" }}>
              Full Resume
            </h4>
            <p style={{ fontSize: 13, color: "#64748B", margin: 0, lineHeight: 1.5 }}>
              Unlocked instantly with your firm email. Zero agreement required to read it.
            </p>
          </div>

          <div style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 12, padding: "20px 18px" }}>
            <span style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 700, color: "#1D4ED8", textTransform: "uppercase" }}>
              STEP 3
            </span>
            <h4 style={{ fontFamily: "var(--display)", fontSize: 18, color: "#08142A", margin: "6px 0 4px" }}>
              One-Page Terms
            </h4>
            <p style={{ fontSize: 13, color: "#64748B", margin: 0, lineHeight: 1.5 }}>
              Sign on the page in 60 seconds only when you decide you want to interview.
            </p>
          </div>

          <div style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 12, padding: "20px 18px" }}>
            <span style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 700, color: "#1D4ED8", textTransform: "uppercase" }}>
              STEP 4
            </span>
            <h4 style={{ fontFamily: "var(--display)", fontSize: 18, color: "#08142A", margin: "6px 0 4px" }}>
              Interview
            </h4>
            <p style={{ fontSize: 13, color: "#64748B", margin: 0, lineHeight: 1.5 }}>
              Candidate identity unlocked, pick a calendar slot, Justin confirms within 1 hour.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

