import React, { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Questionnaire } from "./Questionnaire";
import { Stars, GMark } from "@/components/icons";
import { reviews } from "@/data";

export const metadata: Metadata = {
  title: "Hire Qualified Attorneys for Your Law Firm | Orion Placement",
  description:
    "Screened attorney candidates sent straight to your law firm. Pay only if you hire. Sign one simple agreement with zero upfront cost and a 90-day replacement guarantee.",
  alternates: {
    canonical: "https://www.orionplacement.com/hire-attorneys",
  },
};

export default function HireAttorneysLandingPage() {
  const clientReviews = reviews.filter((r) => r.kind === "employer").slice(0, 3);

  return (
    <div className="ha-page" style={{ background: "#FAF9F5", color: "#08142A" }}>
      <style>{`
        .ha-terms-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 18px;
        }
        .ha-reviews-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 24px;
        }
        .ha-steps-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 24px;
        }
        .ha-recruiter-split {
          display: grid;
          grid-template-columns: 360px 1fr;
          gap: 48px;
          align-items: center;
        }
        .ha-hover-lift {
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
        }
        .ha-hover-lift:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 30px rgba(8, 20, 42, 0.08);
          border-color: #1D4ED8;
        }
        @media (max-width: 1024px) {
          .ha-terms-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          .ha-reviews-grid {
            grid-template-columns: 1fr;
          }
          .ha-steps-grid {
            grid-template-columns: 1fr;
          }
          .ha-recruiter-split {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 640px) {
          .ha-terms-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* 1. LUXURY CENTERED DARK HERO WITH VIDEO BACKGROUND */}
      <section
        style={{
          position: "relative",
          background: "radial-gradient(ellipse 90% 80% at 50% -20%, rgba(29, 78, 216, 0.28) 0%, rgba(8, 20, 42, 0.98) 75%, #08142A 100%)",
          color: "#FFFFFF",
          padding: "124px 0 88px",
          overflow: "hidden",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          textAlign: "center",
        }}
      >
        {/* Background Video Layer */}
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.18,
            pointerEvents: "none",
            zIndex: 0,
          }}
        >
          <source src="/media/splash.mp4" type="video/mp4" />
          <source src="/videos/hero-water-splash.mp4" type="video/mp4" />
        </video>

        <div style={{ maxWidth: 1040, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
          {/* Centered Pill Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(29, 78, 216, 0.15)",
              border: "1px solid rgba(96, 165, 250, 0.3)",
              borderRadius: 999,
              padding: "6px 16px",
              fontSize: "0.78rem",
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "#93C5FD",
              marginBottom: 20,
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#60A5FA" }} />
            Direct Intake · Zero Retainer
          </div>

          {/* Centered Display Heading */}
          <h1
            style={{
              fontSize: "clamp(2.4rem, 4.4vw, 3.8rem)",
              fontFamily: "var(--display)",
              fontWeight: 500,
              lineHeight: 1.15,
              color: "#FFFFFF",
              letterSpacing: "-0.02em",
              margin: "0 0 18px",
            }}
          >
            Get qualified attorney candidates sent straight to <br />
            <span className="serif-accent" style={{ color: "#60A5FA", fontStyle: "italic" }}>
              your firm.
            </span>
          </h1>

          {/* Centered Subtitle */}
          <p
            style={{
              fontSize: "1.12rem",
              lineHeight: 1.6,
              color: "rgba(255, 255, 255, 0.82)",
              maxWidth: 720,
              margin: "0 auto 32px",
            }}
          >
            Sign one simple agreement. Pre-screened lateral attorneys matched to your exact
            practice mix, local bar admissions, and compensation band. You only pay if you hire.
          </p>

          {/* Centered CTA Buttons */}
          <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap", marginBottom: 32 }}>
            <a
              href="#questionnaire"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#1D4ED8",
                color: "#FFFFFF",
                fontWeight: 600,
                fontSize: 15,
                padding: "14px 28px",
                borderRadius: 7,
                textDecoration: "none",
                boxShadow: "0 8px 20px rgba(29, 78, 216, 0.35)",
              }}
            >
              <span>Launch 2-Minute Candidate Search</span>
              <span aria-hidden="true">↓</span>
            </a>
            <a
              href="https://calendly.com/orionplacement/call-with-justin"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                color: "#FFFFFF",
                fontWeight: 600,
                fontSize: 15,
                padding: "14px 26px",
                borderRadius: 7,
                textDecoration: "none",
              }}
            >
              <span>Book 15 Min with Justin</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>

          {/* Centered Micro-reassurances */}
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 24, fontSize: 13.5, color: "#CBD5E1" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: "#60A5FA", fontWeight: 700 }}>✓</span>
              <span>23% contingency fee — only pay if you hire</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: "#60A5FA", fontWeight: 700 }}>✓</span>
              <span>90-day replacement warranty</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: "#60A5FA", fontWeight: 700 }}>✓</span>
              <span>Fast turnaround with pre-screened dossiers</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DEDICATED ELEVATED TERMS STRIP (4 CARDS IN 1 BALANCED ROW) */}
      <section style={{ maxWidth: 1200, margin: "-32px auto 0", padding: "0 24px", position: "relative", zIndex: 10 }}>
        <div className="ha-terms-grid">
          {/* Card 1: Placement Fee */}
          <div
            className="ha-hover-lift"
            style={{
              background: "#FFFFFF",
              border: "1.5px solid #E2E8F0",
              borderRadius: 14,
              padding: "24px 22px",
              boxShadow: "0 10px 30px rgba(8, 20, 42, 0.08)",
            }}
          >
            <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>
              Placement Fee
            </div>
            <div style={{ fontFamily: "var(--display)", fontSize: 32, fontWeight: 600, color: "#08142A", lineHeight: 1.1 }}>
              23%
            </div>
            <div style={{ fontSize: 13, color: "#64748B", marginTop: 6, lineHeight: 1.4 }}>
              Net 15 upon candidate start date. Due only if you hire.
            </div>
          </div>

          {/* Card 2: Warranty Period */}
          <div
            className="ha-hover-lift"
            style={{
              background: "#FFFFFF",
              border: "1.5px solid #E2E8F0",
              borderRadius: 14,
              padding: "24px 22px",
              boxShadow: "0 10px 30px rgba(8, 20, 42, 0.08)",
            }}
          >
            <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>
              Warranty Period
            </div>
            <div style={{ fontFamily: "var(--display)", fontSize: 32, fontWeight: 600, color: "#1D4ED8", lineHeight: 1.1 }}>
              90 Days
            </div>
            <div style={{ fontSize: 13, color: "#64748B", marginTop: 6, lineHeight: 1.4 }}>
              100% replacement guarantee backed by contract credit.
            </div>
          </div>

          {/* Card 3: Upfront Cost */}
          <div
            className="ha-hover-lift"
            style={{
              background: "#FFFFFF",
              border: "1.5px solid #E2E8F0",
              borderRadius: 14,
              padding: "24px 22px",
              boxShadow: "0 10px 30px rgba(8, 20, 42, 0.08)",
            }}
          >
            <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>
              Upfront Retainer
            </div>
            <div style={{ fontFamily: "var(--display)", fontSize: 32, fontWeight: 600, color: "#08142A", lineHeight: 1.1 }}>
              $0
            </div>
            <div style={{ fontSize: 13, color: "#64748B", marginTop: 6, lineHeight: 1.4 }}>
              Zero upfront fees, retainers, or exclusivity lock-in.
            </div>
          </div>

          {/* Card 4: Turnaround */}
          <div
            className="ha-hover-lift"
            style={{
              background: "#FFFFFF",
              border: "1.5px solid #E2E8F0",
              borderRadius: 14,
              padding: "24px 22px",
              boxShadow: "0 10px 30px rgba(8, 20, 42, 0.08)",
            }}
          >
            <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>
              Candidate Turnaround
            </div>
            <div style={{ fontFamily: "var(--display)", fontSize: 32, fontWeight: 600, color: "#1D4ED8", lineHeight: 1.1 }}>
              48–72h
            </div>
            <div style={{ fontSize: 13, color: "#64748B", marginTop: 6, lineHeight: 1.4 }}>
              Pre-screened lateral attorney dossiers delivered directly.
            </div>
          </div>
        </div>
      </section>

      {/* 3. CLIENT RESULTS / FIRMS WE'VE HELPED HIRE (3 CARDS IN 1 ROW) */}
      <section style={{ background: "#FAF9F5", padding: "88px 0 96px", borderBottom: "1px solid #EAE7DC" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 44px" }}>
            <div
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
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#1D4ED8" }} />
              <span>CLIENT RESULTS · VERIFIED FEEDBACK</span>
            </div>
            <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(28px, 3.6vw, 42px)", color: "#08142A", margin: "0 0 14px", fontWeight: 500 }}>
              Firms we&apos;ve helped <span className="serif-accent" style={{ fontStyle: "italic", color: "#1D4ED8" }}>hire</span>
            </h2>
            <p style={{ color: "#64748B", fontSize: 16, lineHeight: 1.6, margin: 0 }}>
              Direct feedback from managing partners and firm administrators who hired through Orion.
            </p>
          </div>

          <div className="ha-reviews-grid">
            {clientReviews.map((rev) => (
              <figure
                key={rev.id}
                className="ha-hover-lift"
                style={{
                  background: "#FFFFFF",
                  border: "1.5px solid #E2E8F0",
                  borderRadius: 14,
                  padding: "28px 24px",
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 4px 16px rgba(8, 20, 42, 0.03)",
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                    <Stars />
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: "#64748B" }}>
                      <GMark /> Google review
                    </span>
                  </div>

                  <h3 style={{ fontFamily: "var(--display)", fontSize: 18, color: "#08142A", fontWeight: 600, margin: "0 0 12px", lineHeight: 1.35 }}>
                    {rev.name === "Travis Bowen"
                      ? "Placed 2 attorneys with fast turnaround"
                      : rev.name === "Lainie James"
                      ? "Consistent delivery of top-tier talent"
                      : "Found the perfect candidate for our firm"}
                  </h3>

                  <blockquote style={{ fontSize: 14, color: "#475569", lineHeight: 1.6, margin: "0 0 20px", fontStyle: "normal" }}>
                    &ldquo;{rev.quote}&rdquo;
                  </blockquote>
                </div>

                <figcaption style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 16, borderTop: "1px solid #F1F5F9" }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#EFF6FF", color: "#1D4ED8", display: "flex", alignItems: "center", justifyContent: "center" }} aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 3v18M3 7h18M6 7l-3 7h6L6 7zm12 0l-3 7h6l-3-7z" />
                    </svg>
                  </div>
                  <div>
                    <b style={{ display: "block", fontSize: 14, color: "#08142A" }}>{rev.name}</b>
                    <span style={{ fontSize: 12, color: "#64748B" }}>Law Firm Client</span>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS / CONTINGENCY MODEL (3 CARDS IN 1 ROW) */}
      <section style={{ background: "#FFFFFF", padding: "88px 0 96px", borderBottom: "1px solid #E2E8F0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 44px" }}>
            <div
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
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#1D4ED8" }} />
              <span>THE CONTINGENCY MODEL · ZERO RISK</span>
            </div>
            <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(28px, 3.6vw, 42px)", color: "#08142A", margin: "0 0 14px", fontWeight: 500 }}>
              You only pay if you <span className="serif-accent" style={{ fontStyle: "italic", color: "#1D4ED8" }}>hire.</span>
            </h2>
            <p style={{ color: "#64748B", fontSize: 16, lineHeight: 1.6, margin: 0 }}>
              Sign a simple agreement. We send pre-screened candidates. You interview the ones you like.
              A fee is due only if you hire one of them.
            </p>
          </div>

          <div className="ha-steps-grid">
            <div
              className="ha-hover-lift"
              style={{
                background: "#FAF9F5",
                border: "1.5px solid #EAE7DC",
                borderRadius: 14,
                padding: "32px 26px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <span style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 700, color: "#1D4ED8", textTransform: "uppercase", letterSpacing: "0.08em", display: "inline-block", background: "#EFF6FF", padding: "4px 10px", borderRadius: 4, marginBottom: 14 }}>
                  STEP 01
                </span>
                <h3 style={{ fontFamily: "var(--display)", fontSize: 22, color: "#08142A", fontWeight: 600, margin: "0 0 12px" }}>
                  No upfront cost
                </h3>
                <p style={{ fontSize: 14.5, color: "#475569", lineHeight: 1.6, margin: 0 }}>
                  No retainer and nothing to pay to get started. You see candidate dossiers before you spend a single dollar.
                </p>
              </div>
            </div>

            <div
              className="ha-hover-lift"
              style={{
                background: "#FAF9F5",
                border: "1.5px solid #EAE7DC",
                borderRadius: 14,
                padding: "32px 26px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <span style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 700, color: "#1D4ED8", textTransform: "uppercase", letterSpacing: "0.08em", display: "inline-block", background: "#EFF6FF", padding: "4px 10px", borderRadius: 4, marginBottom: 14 }}>
                  STEP 02
                </span>
                <h3 style={{ fontFamily: "var(--display)", fontSize: 22, color: "#08142A", fontWeight: 600, margin: "0 0 12px" }}>
                  Candidates who fit
                </h3>
                <p style={{ fontSize: 14.5, color: "#475569", lineHeight: 1.6, margin: 0 }}>
                  We pre-screen attorneys for your exact practice mix, local bar admissions, billable expectations, and compensation band.
                </p>
              </div>
            </div>

            <div
              className="ha-hover-lift"
              style={{
                background: "#FAF9F5",
                border: "1.5px solid #EAE7DC",
                borderRadius: 14,
                padding: "32px 26px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <span style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 700, color: "#1D4ED8", textTransform: "uppercase", letterSpacing: "0.08em", display: "inline-block", background: "#EFF6FF", padding: "4px 10px", borderRadius: 4, marginBottom: 14 }}>
                  STEP 03
                </span>
                <h3 style={{ fontFamily: "var(--display)", fontSize: 22, color: "#08142A", fontWeight: 600, margin: "0 0 12px" }}>
                  90-day guarantee
                </h3>
                <p style={{ fontSize: 14.5, color: "#475569", lineHeight: 1.6, margin: 0 }}>
                  You stay in full control. If a placed attorney leaves within 90 days, we conduct a replacement search at zero extra fee.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. MEET YOUR RECRUITER / FOUNDER SPOTLIGHT */}
      <section style={{ background: "#FAF9F5", padding: "88px 0 96px", borderBottom: "1px solid #EAE7DC" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div className="ha-recruiter-split">
            {/* Left Column: Executive Portrait Card */}
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  background: "#FFFFFF",
                  border: "1.5px solid #E2E8F0",
                  borderRadius: 16,
                  padding: "24px",
                  display: "inline-block",
                  boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05)",
                  maxWidth: 320,
                  width: "100%",
                }}
              >
                <div style={{ position: "relative", width: 260, height: 260, margin: "0 auto 16px", borderRadius: 12, overflow: "hidden", background: "#F1F5F9" }}>
                  <Image
                    src="/images/founders/justin-sofman.png"
                    alt="Justin Sofman"
                    fill
                    style={{ objectFit: "cover" }}
                    priority
                  />
                </div>
                <div>
                  <b style={{ display: "block", fontSize: 20, color: "#08142A", fontWeight: 600, fontFamily: "var(--display)" }}>Justin Sofman</b>
                  <span style={{ fontSize: 13, color: "#64748B", display: "block", marginTop: 2 }}>Co-Founder &amp; Managing Partner</span>
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 6, marginTop: 10, fontSize: 12, color: "#1D4ED8", fontWeight: 600 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#16A34A" }} />
                    <span>Active Placement Partner</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Recruiter Content */}
            <div>
              <div
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
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#1D4ED8" }} />
                <span>FOUNDER SPOTLIGHT</span>
              </div>

              <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(28px, 3.6vw, 42px)", color: "#08142A", margin: "0 0 6px", fontWeight: 500 }}>
                Hi, I&apos;m <span className="serif-accent" style={{ fontStyle: "italic", color: "#1D4ED8" }}>Justin Sofman.</span>
              </h2>

              <p style={{ fontSize: 15, color: "#64748B", margin: "0 0 20px" }}>
                Co-Founder &amp; Managing Partner, Orion Placement
              </p>

              <div style={{ display: "grid", gap: 14, fontSize: 15, color: "#475569", lineHeight: 1.6, marginBottom: 24 }}>
                <p style={{ margin: 0 }}>
                  I co-founded Orion Placement alongside Jon Missirlian to solve the biggest frustration law firms face: paying huge upfront retainers for resume spammers who have never even spoken to the attorney they&apos;re submitting.
                </p>
                <p style={{ margin: 0 }}>
                  With <b>11 years</b> of recruiting industry experience and Jon&apos;s <b>20 years</b> of talent acquisition expertise, we facilitate over <b>30 hires per month</b> for law firms across Texas and nationwide, backed by an active pool of <b>100,000+ legal professionals</b>.
                </p>
              </div>

              {/* Stats Highlight Bar */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                  gap: 12,
                  background: "#FFFFFF",
                  border: "1px solid #E2E8F0",
                  borderRadius: 12,
                  padding: "16px 20px",
                  marginBottom: 24,
                }}
              >
                <div>
                  <div style={{ fontFamily: "var(--display)", fontSize: 24, fontWeight: 700, color: "#08142A" }}>11+ Yrs</div>
                  <div style={{ fontSize: 12, color: "#64748B" }}>Legal Search Experience</div>
                </div>
                <div>
                  <div style={{ fontFamily: "var(--display)", fontSize: 24, fontWeight: 700, color: "#1D4ED8" }}>30+</div>
                  <div style={{ fontSize: 12, color: "#64748B" }}>Monthly Firm Placements</div>
                </div>
                <div>
                  <div style={{ fontFamily: "var(--display)", fontSize: 24, fontWeight: 700, color: "#08142A" }}>100k+</div>
                  <div style={{ fontSize: 12, color: "#64748B" }}>Legal Talent Network</div>
                </div>
              </div>

              <div style={{ background: "#FFFFFF", borderLeft: "3px solid #1D4ED8", padding: "14px 18px", borderRadius: "0 8px 8px 0", fontSize: 14.5, fontStyle: "italic", color: "#08142A", marginBottom: 24 }}>
                &ldquo;I only get paid when you find the right attorney, so I&apos;m 100% invested in sending people actually worth your time.&rdquo;
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
                <a
                  href="https://calendly.com/orionplacement/call-with-justin"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: "#1D4ED8",
                    color: "#FFFFFF",
                    borderRadius: 7,
                    fontWeight: 600,
                    padding: "12px 24px",
                    fontSize: 14.5,
                    textDecoration: "none",
                    boxShadow: "0 4px 14px rgba(29, 78, 216, 0.25)",
                  }}
                >
                  Book 15 min with Justin →
                </a>
                <a
                  href="#questionnaire"
                  style={{
                    background: "#FFFFFF",
                    border: "1.5px solid #CBD5E1",
                    color: "#08142A",
                    borderRadius: 7,
                    fontWeight: 600,
                    padding: "12px 22px",
                    fontSize: 14.5,
                    textDecoration: "none",
                  }}
                >
                  Check candidate availability
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. INTERACTIVE QUESTIONNAIRE */}
      <section id="questionnaire" style={{ background: "#FFFFFF", padding: "88px 0 96px", borderBottom: "1px solid #E2E8F0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 40px" }}>
            <div
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
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#1D4ED8" }} />
              <span>START YOUR SEARCH · 2 MINUTES</span>
            </div>
            <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(28px, 3.6vw, 42px)", color: "#08142A", margin: "0 0 14px", fontWeight: 500 }}>
              Tell us who you&apos;re looking <span className="serif-accent" style={{ fontStyle: "italic", color: "#1D4ED8" }}>for</span>
            </h2>
            <p style={{ color: "#64748B", fontSize: 16, lineHeight: 1.6, margin: 0 }}>
              A few quick questions. Takes 2 minutes. You only pay if you hire.
            </p>
          </div>

          <div style={{ maxWidth: 820, margin: "0 auto" }}>
            <Suspense fallback={<div className="q-card-box text-center py-12 text-[#5b6577]">Loading questionnaire...</div>}>
              <Questionnaire />
            </Suspense>
          </div>
        </div>
      </section>

      {/* 7. BOTTOM MIDNIGHT NAVY CTA SECTION */}
      <section
        style={{
          background: "radial-gradient(ellipse 90% 80% at 50% -20%, rgba(29, 78, 216, 0.28) 0%, rgba(8, 20, 42, 0.98) 75%, #08142A 100%)",
          padding: "96px 0 108px",
          textAlign: "center",
          color: "#FFFFFF",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ maxWidth: 780, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              borderRadius: 999,
              padding: "6px 16px",
              fontFamily: "var(--mono)",
              fontSize: 11,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#93C5FD",
              marginBottom: 18,
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#60A5FA" }} />
            <span>100% CONTINGENCY · ZERO RISK</span>
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
            Ready to see who&apos;s <span className="serif-accent" style={{ color: "#60A5FA", fontStyle: "italic" }}>available?</span>
          </h2>

          <p style={{ color: "#CBD5E1", fontSize: 17, lineHeight: 1.6, marginBottom: 34, maxWidth: 640, margin: "0 auto 34px" }}>
            One simple agreement. Pre-screened attorney dossiers sent to your inbox within days.
            No upfront cost, and you <b>only pay if you hire</b>.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            <a
              href="#questionnaire"
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
                boxShadow: "0 8px 24px rgba(29, 78, 216, 0.35)",
              }}
            >
              <span>Launch 2-Minute Candidate Search</span>
              <span aria-hidden="true">↓</span>
            </a>
            <a
              href="https://calendly.com/orionplacement/call-with-justin"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
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
          </div>
        </div>
      </section>
    </div>
  );
}
