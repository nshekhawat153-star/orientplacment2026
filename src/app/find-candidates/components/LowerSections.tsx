"use client";

import React from "react";
import Link from "next/link";
import { trust } from "@/data";

export function LowerSections() {
  return (
    <>
      {/* 1. 4-STEP WORKFLOW */}
      <section
        className="block alt"
        style={{
          background: "#FAF9F5",
          padding: "88px 0 96px",
          borderTop: "1px solid #EAE7DC",
          borderBottom: "1px solid #EAE7DC",
        }}
      >
        <div
          className="wrap"
          style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}
        >
          <div
            className="sec-head-premium"
            style={{ textAlign: "center", maxWidth: 740, margin: "0 auto 44px" }}
          >
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
                marginBottom: 14,
              }}
            >
              <span
                className="badge-dot"
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#1D4ED8",
                }}
              />
              <span>THE PROCESS · 4 EASY STEPS</span>
            </div>
            <h2
              className="sec-title-lg"
              style={{
                fontFamily: "var(--display)",
                fontSize: "clamp(26px, 3.2vw, 38px)",
                color: "#08142A",
                margin: "0 0 14px",
                fontWeight: 400,
              }}
            >
              From your request to a first{" "}
              <span
                className="serif-accent"
                style={{ fontStyle: "italic", color: "#1D4ED8" }}
              >
                interview
              </span>
            </h2>
            <p
              className="who-lede"
              style={{
                color: "#64748B",
                fontSize: 16,
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              Transparent, discreet candidate introductions with zero obligation
              and zero upfront retainers.
            </p>
          </div>

          <div
            className="terms-pillars-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 20,
            }}
          >
            <div
              className="terms-pillar"
              style={{
                background: "#FFFFFF",
                border: "1.5px solid #E2E8F0",
                borderRadius: 12,
                padding: "26px 22px",
              }}
            >
              <div
                className="pillar-kicker"
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 10.5,
                  color: "#1D4ED8",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: 8,
                }}
              >
                STEP 01 · REQUEST
              </div>
              <div
                className="pillar-val"
                style={{
                  fontFamily: "var(--display)",
                  fontSize: 22,
                  fontWeight: 400,
                  color: "#08142A",
                  marginBottom: 4,
                  lineHeight: 1.25,
                }}
              >
                One Email
              </div>
              <div
                className="pillar-label"
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#64748B",
                  marginBottom: 12,
                }}
              >
                Select candidate IDs
              </div>
              <p
                className="pillar-desc"
                style={{
                  fontSize: 13.5,
                  lineHeight: 1.55,
                  color: "#475569",
                  margin: 0,
                }}
              >
                No agreement and no fee to see candidate dossiers. Your firm identity stays completely confidential.
              </p>
            </div>

            <div
              className="terms-pillar"
              style={{
                background: "#FFFFFF",
                border: "1.5px solid #E2E8F0",
                borderRadius: 12,
                padding: "26px 22px",
              }}
            >
              <div
                className="pillar-kicker"
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 10.5,
                  color: "#1D4ED8",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: 8,
                }}
              >
                STEP 02 · 1 HOUR
              </div>
              <div
                className="pillar-val"
                style={{
                  fontFamily: "var(--display)",
                  fontSize: 22,
                  fontWeight: 400,
                  color: "#08142A",
                  marginBottom: 4,
                  lineHeight: 1.25,
                }}
              >
                Full Profiles
              </div>
              <div
                className="pillar-label"
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#64748B",
                  marginBottom: 12,
                }}
              >
                Dossiers delivered
              </div>
              <p
                className="pillar-desc"
                style={{
                  fontSize: 13.5,
                  lineHeight: 1.55,
                  color: "#475569",
                  margin: 0,
                }}
              >
                Redacted resumes for the candidates you choose, along with our simple one-page contingency agreement.
              </p>
            </div>

            <div
              className="terms-pillar"
              style={{
                background: "#FFFFFF",
                border: "1.5px solid #E2E8F0",
                borderRadius: 12,
                padding: "26px 22px",
              }}
            >
              <div
                className="pillar-kicker"
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 10.5,
                  color: "#1D4ED8",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: 8,
                }}
              >
                STEP 03 · 1 DAY
              </div>
              <div
                className="pillar-val"
                style={{
                  fontFamily: "var(--display)",
                  fontSize: 22,
                  fontWeight: 400,
                  color: "#08142A",
                  marginBottom: 4,
                  lineHeight: 1.25,
                }}
              >
                Interviews
              </div>
              <div
                className="pillar-label"
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#64748B",
                  marginBottom: 12,
                }}
              >
                Justin coordinates calls
              </div>
              <p
                className="pillar-desc"
                style={{
                  fontSize: 13.5,
                  lineHeight: 1.55,
                  color: "#475569",
                  margin: 0,
                }}
              >
                We coordinate interviews with the candidates you want to meet, strictly at dates and times that suit you.
              </p>
            </div>

            <div
              className="terms-pillar"
              style={{
                background: "#FFFFFF",
                border: "1.5px solid #E2E8F0",
                borderRadius: 12,
                padding: "26px 22px",
              }}
            >
              <div
                className="pillar-kicker"
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 10.5,
                  color: "#1D4ED8",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: 8,
                }}
              >
                STEP 04 · WHEN HIRED
              </div>
              <div
                className="pillar-val"
                style={{
                  fontFamily: "var(--display)",
                  fontSize: 22,
                  fontWeight: 400,
                  color: "#08142A",
                  marginBottom: 4,
                  lineHeight: 1.25,
                }}
              >
                Pay on Start
              </div>
              <div
                className="pillar-label"
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#64748B",
                  marginBottom: 12,
                }}
              >
                Net 15 Invoice
              </div>
              <p
                className="pillar-desc"
                style={{
                  fontSize: 13.5,
                  lineHeight: 1.55,
                  color: "#475569",
                  margin: 0,
                }}
              >
                Fee due 15 calendar days after candidate physically starts work. Covered by our 90-day replacement warranty.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE 4 TERMS PILLARS */}
      <section
        className="block"
        style={{
          background: "#FFFFFF",
          padding: "88px 0 96px",
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
              gap: 16,
              marginBottom: 40,
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
                  marginBottom: 10,
                }}
              >
                <span
                  className="badge-dot"
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#1D4ED8",
                  }}
                />
                <span>TERMS TRANSPARENCY</span>
              </div>
              <h2
                className="sec-title-lg"
                style={{
                  fontFamily: "var(--display)",
                  fontSize: "clamp(26px, 3.2vw, 38px)",
                  color: "#08142A",
                  margin: 0,
                  fontWeight: 400,
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
                borderRadius: 7,
                fontWeight: 600,
                padding: "11px 22px",
                border: "1.5px solid #CBD5E1",
                color: "#08142A",
                textDecoration: "none",
                fontSize: 14,
              }}
            >
              <span>Explore fee schedule &amp; calculator</span>
              <span aria-hidden="true"> →</span>
            </Link>
          </div>

          <div
            className="terms-pillars-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 20,
            }}
          >
            <div
              className="terms-pillar"
              style={{
                background: "#FAF9F5",
                border: "1.5px solid #EAE7DC",
                borderRadius: 12,
                padding: "26px 22px",
              }}
            >
              <div
                className="pillar-kicker"
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 10.5,
                  color: "#64748B",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: 8,
                }}
              >
                01 · CONTINGENCY FEE
              </div>
              <div
                className="pillar-val"
                style={{
                  fontFamily: "var(--display)",
                  fontSize: 32,
                  fontWeight: 400,
                  color: "#1D4ED8",
                  marginBottom: 4,
                  lineHeight: 1.1,
                }}
              >
                23%
              </div>
              <div
                className="pillar-label"
                style={{
                  fontSize: 13.5,
                  fontWeight: 500,
                  color: "#08142A",
                  marginBottom: 10,
                }}
              >
                Of first-year base pay
              </div>
              <p
                className="pillar-desc"
                style={{
                  fontSize: 13.5,
                  lineHeight: 1.55,
                  color: "#475569",
                  margin: 0,
                }}
              >
                Calculated strictly on base salary. Discretionary bonuses and health benefits are never included.
              </p>
            </div>

            <div
              className="terms-pillar"
              style={{
                background: "#FAF9F5",
                border: "1.5px solid #EAE7DC",
                borderRadius: 12,
                padding: "26px 22px",
              }}
            >
              <div
                className="pillar-kicker"
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 10.5,
                  color: "#64748B",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: 8,
                }}
              >
                02 · REPLACEMENT WARRANTY
              </div>
              <div
                className="pillar-val"
                style={{
                  fontFamily: "var(--display)",
                  fontSize: 32,
                  fontWeight: 400,
                  color: "#1D4ED8",
                  marginBottom: 4,
                  lineHeight: 1.1,
                }}
              >
                90 Days
              </div>
              <div
                className="pillar-label"
                style={{
                  fontSize: 13.5,
                  fontWeight: 500,
                  color: "#08142A",
                  marginBottom: 10,
                }}
              >
                Calendar day guarantee
              </div>
              <p
                className="pillar-desc"
                style={{
                  fontSize: 13.5,
                  lineHeight: 1.55,
                  color: "#475569",
                  margin: 0,
                }}
              >
                If the hire leaves or is let go within 90 days, we conduct a replacement search at zero extra fee.
              </p>
            </div>

            <div
              className="terms-pillar"
              style={{
                background: "#FAF9F5",
                border: "1.5px solid #EAE7DC",
                borderRadius: 12,
                padding: "26px 22px",
              }}
            >
              <div
                className="pillar-kicker"
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 10.5,
                  color: "#64748B",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: 8,
                }}
              >
                03 · CLIENT FREEDOM
              </div>
              <div
                className="pillar-val"
                style={{
                  fontFamily: "var(--display)",
                  fontSize: 32,
                  fontWeight: 400,
                  color: "#08142A",
                  marginBottom: 4,
                  lineHeight: 1.1,
                }}
              >
                Zero
              </div>
              <div
                className="pillar-label"
                style={{
                  fontSize: 13.5,
                  fontWeight: 500,
                  color: "#08142A",
                  marginBottom: 10,
                }}
              >
                Upfront retainer or lock-in
              </div>
              <p
                className="pillar-desc"
                style={{
                  fontSize: 13.5,
                  lineHeight: 1.55,
                  color: "#475569",
                  margin: 0,
                }}
              >
                No retainer and no exclusivity. Keep your internal pipeline and other recruiting sources active.
              </p>
            </div>

            <div
              className="terms-pillar"
              style={{
                background: "#FAF9F5",
                border: "1.5px solid #EAE7DC",
                borderRadius: 12,
                padding: "26px 22px",
              }}
            >
              <div
                className="pillar-kicker"
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 10.5,
                  color: "#64748B",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: 8,
                }}
              >
                04 · PAYMENT SCHEDULE
              </div>
              <div
                className="pillar-val"
                style={{
                  fontFamily: "var(--display)",
                  fontSize: 32,
                  fontWeight: 400,
                  color: "#1D4ED8",
                  marginBottom: 4,
                  lineHeight: 1.1,
                }}
              >
                Net 15
              </div>
              <div
                className="pillar-label"
                style={{
                  fontSize: 13.5,
                  fontWeight: 500,
                  color: "#08142A",
                  marginBottom: 10,
                }}
              >
                Invoice on physical start date
              </div>
              <p
                className="pillar-desc"
                style={{
                  fontSize: 13.5,
                  lineHeight: 1.55,
                  color: "#475569",
                  margin: 0,
                }}
              >
                We issue the invoice only when the candidate physically begins work, payable within 15 calendar days.
              </p>
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

