"use client";

import React from "react";
import Link from "next/link";
import { trust } from "@/data";

export function LowerSections() {
  return (
    <>
      {/* 1. 4-STEP WORKFLOW - DARK LUXURY REDESIGN */}
      <section
        className="block fc-dark-workflow-sec"
        style={{
          position: "relative",
          background: "linear-gradient(180deg, #08142A 0%, #0F2042 50%, #08142A 100%)",
          padding: "96px 0 108px",
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          color: "#FFFFFF",
          overflow: "hidden",
        }}
      >
        {/* Subtle Ambient Radial Glowing Aura */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(circle at 80% 20%, rgba(37, 99, 235, 0.20) 0%, transparent 60%), radial-gradient(circle at 20% 80%, rgba(56, 189, 248, 0.12) 0%, transparent 55%)",
          }}
          aria-hidden="true"
        />

        <div
          className="wrap"
          style={{ position: "relative", zIndex: 1, maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}
        >
          <div
            className="sec-head-premium"
            style={{ textAlign: "center", maxWidth: 740, margin: "0 auto 48px" }}
          >
            <div
              className="badge-capsule"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(37, 99, 235, 0.18)",
                border: "1px solid rgba(96, 165, 250, 0.35)",
                borderRadius: 999,
                padding: "6px 16px",
                fontFamily: "var(--mono)",
                fontSize: 11,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#93C5FD",
                marginBottom: 16,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#60A5FA",
                  boxShadow: "0 0 8px rgba(96, 165, 250, 0.85)",
                  display: "inline-block",
                }}
              />
              <span>THE PROCESS · 4 EASY STEPS</span>
            </div>
            <h2
              className="sec-title-lg"
              style={{
                fontFamily: "var(--display)",
                fontSize: "clamp(28px, 3.4vw, 42px)",
                color: "#FFFFFF",
                margin: "0 0 14px",
                fontWeight: 500,
                letterSpacing: "-0.01em",
              }}
            >
              From your request to a first{" "}
              <span
                className="serif-accent"
                style={{ fontStyle: "italic", color: "#60A5FA" }}
              >
                interview
              </span>
            </h2>
            <p
              className="who-lede"
              style={{
                color: "#94A3B8",
                fontSize: 16.5,
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              Transparent, discreet candidate introductions with zero obligation
              and zero upfront retainers.
            </p>
          </div>

          <div
            className="fc-workflow-dark-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 22,
            }}
          >
            {/* Step 1 */}
            <div className="fc-workflow-card">
              <div className="fc-wf-kicker">STEP 01 · REQUEST</div>
              <div className="fc-wf-title">
                One <span style={{ color: "#60A5FA" }}>Email</span>
              </div>
              <div className="fc-wf-label">Select candidate IDs</div>
              <p className="fc-wf-desc">
                No agreement and no fee to see candidate dossiers. Your firm identity stays completely confidential.
              </p>
              <div className="fc-wf-badge">
                <span className="fc-wf-check">✓</span>
                <span>100% Confidential</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="fc-workflow-card">
              <div className="fc-wf-kicker">STEP 02 · 1 HOUR</div>
              <div className="fc-wf-title">
                Full <span style={{ color: "#60A5FA" }}>Profiles</span>
              </div>
              <div className="fc-wf-label">Dossiers delivered</div>
              <p className="fc-wf-desc">
                Redacted resumes for the candidates you choose, along with our simple one-page contingency agreement.
              </p>
              <div className="fc-wf-badge">
                <span className="fc-wf-check">⚡</span>
                <span>~1 Hour Response SLA</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="fc-workflow-card">
              <div className="fc-wf-kicker">STEP 03 · 1 DAY</div>
              <div className="fc-wf-title">
                Direct <span style={{ color: "#60A5FA" }}>Interviews</span>
              </div>
              <div className="fc-wf-label">Justin coordinates calls</div>
              <p className="fc-wf-desc">
                We coordinate interviews with the candidates you want to meet, strictly at dates and times that suit you.
              </p>
              <div className="fc-wf-badge">
                <span className="fc-wf-check">📅</span>
                <span>Direct Partner Scheduling</span>
              </div>
            </div>

            {/* Step 4 */}
            <div className="fc-workflow-card">
              <div className="fc-wf-kicker">STEP 04 · WHEN HIRED</div>
              <div className="fc-wf-title">
                Pay on <span style={{ color: "#60A5FA" }}>Start</span>
              </div>
              <div className="fc-wf-label">Net 15 Invoice</div>
              <p className="fc-wf-desc">
                Fee due 15 calendar days after candidate physically starts work. Covered by our 90-day replacement warranty.
              </p>
              <div className="fc-wf-badge">
                <span className="fc-wf-check">🛡️</span>
                <span>90-Day Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE 4 TERMS PILLARS - CLEAN HIGH-CONTRAST LIGHT THEME */}
      <section
        className="block fc-light-terms-sec"
        style={{
          background: "#FFFFFF",
          padding: "96px 0 108px",
          borderBottom: "1px solid #E2E8F0",
        }}
      >
        <div
          className="wrap"
          style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}
        >
          <div
            className="sec-head-premium"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: 20,
              marginBottom: 44,
            }}
          >
            <div>
              <div
                className="badge-capsule"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#EFF6FF",
                  border: "1px solid #DBEAFE",
                  borderRadius: 999,
                  padding: "6px 14px",
                  fontFamily: "var(--mono)",
                  fontSize: 11,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#1D4ED8",
                  marginBottom: 12,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#1D4ED8",
                    display: "inline-block",
                  }}
                />
                <span>TERMS TRANSPARENCY</span>
              </div>
              <h2
                className="sec-title-lg"
                style={{
                  fontFamily: "var(--display)",
                  fontSize: "clamp(28px, 3.4vw, 42px)",
                  color: "#08142A",
                  margin: 0,
                  fontWeight: 500,
                  letterSpacing: "-0.01em",
                }}
              >
                One fee, and only if you{" "}
                <span
                  className="serif-accent"
                  style={{ fontStyle: "italic", color: "#1D4ED8" }}
                >
                  hire
                </span>
              </h2>
            </div>
            <Link
              className="btn btn-outline btn-sm"
              href="/fees"
              style={{
                borderRadius: 8,
                fontWeight: 600,
                padding: "12px 24px",
                border: "1.5px solid #CBD5E1",
                color: "#08142A",
                textDecoration: "none",
                fontSize: 14.5,
                background: "#FFFFFF",
                boxShadow: "0 2px 8px rgba(15, 23, 42, 0.04)",
                transition: "all 0.2s ease",
              }}
            >
              <span>Explore fee schedule &amp; terms</span>
              <span aria-hidden="true"> →</span>
            </Link>
          </div>

          <div
            className="fc-light-terms-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 22,
            }}
          >
            {/* Pillar 1 */}
            <div className="fc-light-terms-card">
              <div className="fc-terms-kicker">01 · CONTINGENCY FEE</div>
              <div className="fc-terms-val">On hire</div>
              <div className="fc-terms-label">Fee (contingency only)</div>
              <p className="fc-terms-desc">
                One fee, as set out in your one-page agreement. Nothing is due unless you hire.
              </p>
              <div className="fc-terms-badge">
                <span className="fc-terms-check">✓</span>
                <span>Contingency Only</span>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="fc-light-terms-card">
              <div className="fc-terms-kicker">02 · REPLACEMENT WARRANTY</div>
              <div className="fc-terms-val">90 Days</div>
              <div className="fc-terms-label">Replacement guarantee</div>
              <p className="fc-terms-desc">
                If the hire leaves or is let go within 90 days, we conduct a replacement search at zero extra fee.
              </p>
              <div className="fc-terms-badge">
                <span className="fc-terms-check">✓</span>
                <span>100% Free Replacement</span>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="fc-light-terms-card">
              <div className="fc-terms-kicker">03 · CLIENT FREEDOM</div>
              <div className="fc-terms-val">$0</div>
              <div className="fc-terms-label">Upfront retainer or lock-in</div>
              <p className="fc-terms-desc">
                No retainer and no exclusivity. Keep your internal pipeline and other recruiting sources active.
              </p>
              <div className="fc-terms-badge">
                <span className="fc-terms-check">✓</span>
                <span>Non-Exclusive</span>
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="fc-light-terms-card">
              <div className="fc-terms-kicker">04 · PAYMENT SCHEDULE</div>
              <div className="fc-terms-val">Net 15</div>
              <div className="fc-terms-label">Invoice when hire starts</div>
              <p className="fc-terms-desc">
                We issue the invoice only when the candidate physically begins work, payable within 15 calendar days.
              </p>
              <div className="fc-terms-badge">
                <span className="fc-terms-check">✓</span>
                <span>Start Date Invoice</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BOTTOM DARK CTA SECTION */}
      <section
        className="emp-terms-dark-sec"
        style={{
          background: "#08142A",
          padding: "96px 0 108px",
          textAlign: "center",
        }}
      >
        <div
          className="wrap"
          style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px" }}
        >
          <div
            className="badge-capsule"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 999,
              padding: "6px 14px",
              fontFamily: "var(--mono)",
              fontSize: 11,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#93C5FD",
              marginBottom: 18,
            }}
          >
            <span
              className="badge-dot"
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#60A5FA",
              }}
            />
            <span>DIRECT MANDATE ADVISORY</span>
          </div>

          <h2
            style={{
              fontFamily: "var(--display)",
              fontSize: "clamp(32px, 4.2vw, 48px)",
              color: "#FFFFFF",
              margin: "0 0 16px",
              fontWeight: 500,
              lineHeight: 1.15,
            }}
          >
            Rather talk the seat through{" "}
            <span
              className="serif-accent"
              style={{ color: "#60A5FA", fontStyle: "italic" }}
            >
              first?
            </span>
          </h2>

          <p
            style={{
              color: "#CBD5E1",
              fontSize: 17,
              lineHeight: 1.6,
              marginBottom: 34,
              maxWidth: 640,
              margin: "0 auto 34px",
            }}
          >
            Book a 15-minute briefing directly with founder Justin Sofman: the seat, current Texas market compensation bands, and who is available right now.
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <a
              href={
                trust.calendly ||
                "https://calendly.com/orionplacement/call-with-justin"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="btn-emp-primary"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#1D4ED8",
                color: "#FFFFFF",
                fontWeight: 600,
                fontSize: 16,
                padding: "14px 34px",
                borderRadius: 7,
                textDecoration: "none",
              }}
            >
              <span>Book 15 min with Justin</span>
              <span aria-hidden="true">→</span>
            </a>
            <Link
              href="/submit-job"
              className="btn-emp-ghost"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.18)",
                color: "#FFFFFF",
                fontWeight: 600,
                fontSize: 16,
                padding: "14px 34px",
                borderRadius: 7,
                textDecoration: "none",
              }}
            >
              <span>Submit open job</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

