"use client";

import React, { useState } from "react";

interface HeroLuxuryAskSectionProps {
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

export function HeroLuxuryAskSection({
  initialText,
  isReading,
  onSubmitPrompt,
}: HeroLuxuryAskSectionProps) {
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
    <section
      className="emp-luxury-hero-sec fc-luxury-hero-sec"
      style={{
        position: "relative",
        background: "#08142A",
        color: "#FFFFFF",
        padding: "128px 0 72px",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      {/* Background Splash Video */}
      <div className="emp-hero-video-wrap" aria-hidden="true">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="emp-hero-video"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.22,
          }}
        >
          <source src="/media/splash.mp4" type="video/mp4" />
        </video>
        <div
          className="emp-hero-overlay"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(180deg, rgba(8,20,42,0.85) 0%, rgba(8,20,42,0.96) 100%)",
          }}
        />
      </div>

      <div
        className="wrap"
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 960,
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        {/* Eyebrow Badge Capsule */}
        <div style={{ marginBottom: 18 }}>
          <div className="hero-eyebrow-capsule">
            <span className="hero-eyebrow-dot" aria-hidden="true" />
            <span className="hero-eyebrow-desktop hidden-mobile">PRE-SCREENED TALENT · 100% CONTINGENCY</span>
            <span className="hero-eyebrow-mobile only-mobile">SCREENED TALENT · 100% CONTINGENCY</span>
          </div>
        </div>

        {/* Main Title */}
        <h1 id="fc-hero-h1" className="hero-display-h1">
          Find candidates for your{" "}
          <span className="hero-accent-serif">
            open seat
          </span>
        </h1>

        {/* Clean Subtext */}
        <p
          className="hero-lead-p"
          style={{
            maxWidth: 640,
            margin: "0 auto 32px",
          }}
        >
          Describe your seat or paste a job link to view screened candidate dossiers.
        </p>

        {/* THE NEW SMART ASK BOX IN PLACE OF OLD SEARCH CONSOLE */}
        <div style={{ maxWidth: 880, margin: "0 auto 20px", width: "100%" }}>
          <form
            onSubmit={handleSubmit}
            role="search"
            aria-label="Describe your seat"
            style={{
              background: "#FFFFFF",
              border: "1.5px solid rgba(255, 255, 255, 0.25)",
              borderRadius: 14,
              boxShadow: "0 20px 50px -10px rgba(0, 0, 0, 0.55)",
              padding: "14px 16px 12px",
              textAlign: "left",
              transition: "border-color 0.2s, box-shadow 0.2s",
            }}
          >
            <textarea
              id="fc-hero-prompt-q"
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
              style={{
                width: "100%",
                border: 0,
                background: "transparent",
                resize: "none",
                fontFamily: "inherit",
                fontSize: 16,
                lineHeight: 1.45,
                minHeight: 52,
                outline: "none",
                color: "#08142A",
              }}
            />
            <div
              className="fc-hero-prompt-footer"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 12,
                marginTop: 8,
                borderTop: "1px solid #F1F5F9",
                paddingTop: 10,
              }}
            >
              <span className="fc-hero-prompt-hint hide-sm" style={{ fontSize: 13, color: "#64748B" }}>
                A sentence is enough. We detect role, Texas market, years, pay cap, and office mode.
              </span>
              <button
                type="submit"
                disabled={!text.trim() || isReading}
                aria-label="Find candidates"
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  background: text.trim() ? "#1D4ED8" : "#E2E8F0",
                  color: text.trim() ? "#FFFFFF" : "#94A3B8",
                  border: 0,
                  cursor: text.trim() ? "pointer" : "not-allowed",
                  display: "grid",
                  placeItems: "center",
                  flexShrink: 0,
                  marginLeft: "auto",
                  boxShadow: text.trim()
                    ? "0 4px 14px rgba(29, 78, 216, 0.4)"
                    : "none",
                  transition: "all 0.15s ease",
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
            </div>
          </form>
        </div>

        {/* QUICK EXAMPLE CHIPS ON HERO */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            justifyContent: "center",
            margin: "0 auto 28px",
            maxWidth: 880,
          }}
          aria-label="Example candidate prompts"
        >
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              type="button"
              onClick={() => handleChipClick(ex)}
              style={{
                background: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.16)",
                borderRadius: 999,
                padding: "6px 14px",
                fontSize: 12.5,
                fontWeight: 500,
                color: "#E2E8F0",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(29, 78, 216, 0.4)";
                e.currentTarget.style.borderColor = "#60A5FA";
                e.currentTarget.style.color = "#FFFFFF";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.16)";
                e.currentTarget.style.color = "#E2E8F0";
              }}
            >
              {ex.startsWith("http")
                ? ex.replace(/^https?:\/\//, "").slice(0, 36) + "…"
                : ex}
            </button>
          ))}
        </div>

        {/* AI READING PULSE (IF ACTIVE) */}
        {isReading && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              justifyContent: "center",
              color: "#93C5FD",
              margin: "0 auto 24px",
              fontSize: 14.5,
              fontWeight: 600,
            }}
            role="status"
            aria-live="polite"
          >
            <span className="fc-dot" style={{ background: "#60A5FA" }} />
            <span className="fc-dot" style={{ background: "#60A5FA" }} />
            <span className="fc-dot" style={{ background: "#60A5FA" }} />
            <span>
              {isLink
                ? "Reading your job posting…"
                : "Analyzing your seat requirements…"}
            </span>
          </div>
        )}

        {/* MICRO REASSURANCES */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: 16,
            fontSize: 13,
            color: "#94A3B8",
          }}
        >
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <svg
              viewBox="0 0 16 16"
              width="14"
              height="14"
              fill="none"
              stroke="#60A5FA"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="3.5 8.5 6.5 11.5 12.5 4.5" />
            </svg>
            <span>Zero upfront retainer</span>
          </div>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <svg
              viewBox="0 0 16 16"
              width="14"
              height="14"
              fill="none"
              stroke="#60A5FA"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="3.5 8.5 6.5 11.5 12.5 4.5" />
            </svg>
            <span>23% flat contingency</span>
          </div>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <svg
              viewBox="0 0 16 16"
              width="14"
              height="14"
              fill="none"
              stroke="#60A5FA"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="3.5 8.5 6.5 11.5 12.5 4.5" />
            </svg>
            <span>90-day replacement warranty</span>
          </div>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <svg
              viewBox="0 0 16 16"
              width="14"
              height="14"
              fill="none"
              stroke="#60A5FA"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="3.5 8.5 6.5 11.5 12.5 4.5" />
            </svg>
            <span>100% confidential</span>
          </div>
        </div>
      </div>
    </section>
  );
}

