import React, { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { Questionnaire } from "./Questionnaire";
import { Stars, GMark } from "@/components/icons";
import { reviews } from "@/data";
import { Breadcrumb } from "@/components/Breadcrumb";

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
      {/* 1. LUXURY HERO SECTION (2-Column with Water Splash Video & Glow) */}
      <section
        className="emp-luxury-hero-sec ha-luxury-hero-sec"
        style={{
          position: "relative",
          background: "#08142A",
          color: "#FFFFFF",
          padding: "124px 0 76px",
          overflow: "hidden",
        }}
      >
        {/* Background Video Layer */}
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
              background: "linear-gradient(180deg, rgba(8,20,42,0.85) 0%, rgba(8,20,42,0.96) 100%)",
            }}
          />
        </div>

        <div className="wrap" style={{ position: "relative", zIndex: 2, maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
          {/* Breadcrumb Navigation */}
          <div style={{ marginBottom: 20 }}>
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Employers", href: "/employers" },
                { label: "Hire Attorneys", current: true },
              ]}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 40, alignItems: "center" }}>
            {/* Left Column: Heading & Value Proposition */}
            <div>
              <div className="emp-hero-badge-wrap" style={{ marginBottom: 16 }}>
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
                  }}
                >
                  <span className="badge-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#60A5FA" }} />
                  <span>DIRECT INTAKE · ZERO RETAINER</span>
                </div>
              </div>

              <h1
                className="emp-hero-h1"
                style={{
                  fontFamily: "var(--display)",
                  fontSize: "clamp(34px, 4.4vw, 52px)",
                  lineHeight: 1.12,
                  fontWeight: 500,
                  color: "#FFFFFF",
                  margin: "0 0 18px",
                }}
              >
                Get qualified attorney candidates sent straight to{" "}
                <span className="serif-accent" style={{ color: "#60A5FA", fontStyle: "italic" }}>
                  your firm.
                </span>
              </h1>

              <p
                className="emp-hero-lead"
                style={{
                  fontSize: 17,
                  lineHeight: 1.6,
                  color: "#CBD5E1",
                  maxWidth: 580,
                  margin: "0 0 28px",
                }}
              >
                Sign one simple agreement. Pre-screened lateral attorneys matched to your exact
                practice mix, local bar admissions, and compensation band. You only pay if you hire.
              </p>

              <div style={{ display: "grid", gap: 10, marginBottom: 30 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "#E2E8F0" }}>
                  <span style={{ color: "#60A5FA", fontWeight: 700 }}>✓</span>
                  <span>Intake questionnaire takes ~2 minutes to launch your search</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "#E2E8F0" }}>
                  <span style={{ color: "#60A5FA", fontWeight: 700 }}>✓</span>
                  <span>Zero upfront retainer or exclusivity lock-in</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "#E2E8F0" }}>
                  <span style={{ color: "#60A5FA", fontWeight: 700 }}>✓</span>
                  <span>90-day replacement warranty backed by full contract refund/credit</span>
                </div>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
                <a
                  href="#questionnaire"
                  className="btn-emp-primary"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: "#1D4ED8",
                    color: "#FFFFFF",
                    fontWeight: 600,
                    fontSize: 15,
                    padding: "13px 26px",
                    borderRadius: 7,
                    textDecoration: "none",
                  }}
                >
                  <span>Check candidate availability</span>
                  <span aria-hidden="true">↓</span>
                </a>
                <a
                  href="https://calendly.com/orionplacement/call-with-justin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-emp-ghost"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.18)",
                    color: "#FFFFFF",
                    fontWeight: 600,
                    fontSize: 15,
                    padding: "13px 24px",
                    borderRadius: 7,
                    textDecoration: "none",
                  }}
                >
                  <span>Book 15 min with Justin</span>
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>

            {/* Right Column: Elevated Intake Quick Launch Terminal */}
            <div>
              <div
                style={{
                  background: "#FFFFFF",
                  border: "1.5px solid #E2E8F0",
                  borderRadius: 14,
                  padding: "28px 24px",
                  boxShadow: "0 24px 60px -12px rgba(0, 0, 0, 0.55)",
                  color: "#08142A",
                  textAlign: "left",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    borderBottom: "1.5px solid #E2E8F0",
                    paddingBottom: 14,
                    marginBottom: 20,
                  }}
                >
                  <div>
                    <span style={{ fontFamily: "var(--display)", fontSize: 20, color: "#08142A", fontWeight: 600, display: "block" }}>
                      Direct Intake Terminal
                    </span>
                    <span style={{ fontSize: 13, color: "#64748B" }}>
                      Active Texas &amp; National Placements
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 10.5,
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "#1D4ED8",
                      background: "#EFF6FF",
                      padding: "4px 8px",
                      borderRadius: 4,
                      border: "1px solid #DBEAFE",
                    }}
                  >
                    100% CONTINGENCY
                  </span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 20 }}>
                  <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 9, padding: "14px 16px" }}>
                    <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>
                      Placement Fee
                    </div>
                    <div style={{ fontFamily: "var(--display)", fontSize: 32, fontWeight: 600, color: "#08142A" }}>
                      23%
                    </div>
                    <div style={{ fontSize: 12, color: "#64748B", marginTop: 4 }}>
                      Net 15 upon start date
                    </div>
                  </div>

                  <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 9, padding: "14px 16px" }}>
                    <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>
                      Warranty Period
                    </div>
                    <div style={{ fontFamily: "var(--display)", fontSize: 32, fontWeight: 600, color: "#1D4ED8" }}>
                      90 Days
                    </div>
                    <div style={{ fontSize: 12, color: "#64748B", marginTop: 4 }}>
                      100% replacement guarantee
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    background: "#FAF9F5",
                    border: "1px solid #EAE7DC",
                    borderRadius: 8,
                    padding: "14px 16px",
                    marginBottom: 20,
                  }}
                >
                  <div style={{ fontSize: 12, fontFamily: "var(--mono)", color: "#1D4ED8", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>
                    Core Practice Groups
                  </div>
                  <div style={{ fontSize: 13, color: "#334155", lineHeight: 1.5 }}>
                    Estate Planning &amp; Wealth Transfer · Commercial Litigation · Corporate M&amp;A · Real Estate · Family Law · Labor &amp; Employment
                  </div>
                </div>

                <a
                  href="#questionnaire"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 8,
                    background: "#1D4ED8",
                    color: "#FFFFFF",
                    padding: "12px 20px",
                    borderRadius: 7,
                    fontWeight: 600,
                    fontSize: 14,
                    textDecoration: "none",
                  }}
                >
                  <span>Launch 2-Minute Candidate Search</span>
                  <span aria-hidden="true">↓</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CLIENT RESULTS / FIRMS WE'VE HELPED HIRE */}
      <section className="ha-sec ha-sec-tinted" style={{ background: "#FAF9F5", padding: "88px 0 96px", borderBottom: "1px solid #EAE7DC" }}>
        <div className="wrap" style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
          <div className="sec-head-premium" style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 44px" }}>
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
              <span className="badge-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#1D4ED8" }} />
              <span>CLIENT RESULTS · VERIFIED FEEDBACK</span>
            </div>
            <h2 className="sec-title-lg" style={{ fontFamily: "var(--display)", fontSize: "clamp(28px, 3.6vw, 42px)", color: "#08142A", margin: "0 0 14px", fontWeight: 500 }}>
              Firms we&apos;ve helped <span className="serif-accent" style={{ fontStyle: "italic" }}>hire</span>
            </h2>
            <p className="who-lede" style={{ color: "#64748B", fontSize: 16, lineHeight: 1.6, margin: 0 }}>
              Direct feedback from managing partners and firm administrators who hired through Orion.
            </p>
          </div>

          <div className="ha-cards-3" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20 }}>
            {clientReviews.map((rev) => (
              <figure key={rev.id} className="ha-card ha-review-card" style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 12, padding: "26px 22px", margin: 0, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div className="ha-review-card-top" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                    <Stars />
                    <span className="ha-star-badge" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: "#64748B" }}>
                      <GMark /> Google review
                    </span>
                  </div>

                  <h3 className="ha-review-headline" style={{ fontFamily: "var(--display)", fontSize: 18, color: "#08142A", fontWeight: 600, margin: "0 0 12px" }}>
                    {rev.name === "Travis Bowen"
                      ? "Placed 2 attorneys with fast turnaround"
                      : rev.name === "Lainie James"
                      ? "Consistent delivery of top-tier talent"
                      : "Found the perfect candidate for our firm"}
                  </h3>

                  <blockquote className="ha-review-quote" style={{ fontSize: 14, color: "#475569", lineHeight: 1.6, margin: "0 0 20px", fontStyle: "normal" }}>
                    &ldquo;{rev.quote}&rdquo;
                  </blockquote>
                </div>

                <figcaption className="ha-review-author" style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 14, borderTop: "1px solid #F1F5F9" }}>
                  <div className="ha-avatar-circle" aria-hidden="true" style={{ width: 38, height: 38, borderRadius: "50%", background: "#EFF6FF", color: "#1D4ED8", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 3v18M3 7h18M6 7l-3 7h6L6 7zm12 0l-3 7h6l-3-7z" />
                    </svg>
                  </div>
                  <div>
                    <b className="ha-author-name" style={{ display: "block", fontSize: 14, color: "#08142A" }}>{rev.name}</b>
                    <span className="ha-author-title" style={{ fontSize: 12, color: "#64748B" }}>Law Firm Client</span>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS */}
      <section className="ha-sec" style={{ background: "#FFFFFF", padding: "88px 0 96px", borderBottom: "1px solid #E2E8F0" }}>
        <div className="wrap" style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
          <div className="sec-head-premium" style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 44px" }}>
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
              <span className="badge-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#1D4ED8" }} />
              <span>THE CONTINGENCY MODEL · ZERO RISK</span>
            </div>
            <h2 className="sec-title-lg" style={{ fontFamily: "var(--display)", fontSize: "clamp(28px, 3.6vw, 42px)", color: "#08142A", margin: "0 0 14px", fontWeight: 500 }}>
              You only pay if you <span className="serif-accent" style={{ fontStyle: "italic" }}>hire.</span>
            </h2>
            <p className="who-lede" style={{ color: "#64748B", fontSize: 16, lineHeight: 1.6, margin: 0 }}>
              Sign a simple agreement. We send pre-screened candidates. You interview the ones you like.
              A fee is due only if you hire one of them.
            </p>
          </div>

          <div className="ha-cards-3" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            <div className="ha-card ha-step-card" style={{ background: "#FAF9F5", border: "1.5px solid #EAE7DC", borderRadius: 12, padding: "28px 24px" }}>
              <span className="ha-step-number" style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 700, color: "#1D4ED8", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: 8 }}>STEP 01</span>
              <h3 className="ha-step-title" style={{ fontFamily: "var(--display)", fontSize: 22, color: "#08142A", fontWeight: 600, margin: "0 0 10px" }}>No upfront cost</h3>
              <p className="ha-step-desc" style={{ fontSize: 14, color: "#475569", lineHeight: 1.6, margin: 0 }}>
                No retainer and nothing to pay to get started. You see candidate
                dossiers before you spend a single dollar.
              </p>
            </div>

            <div className="ha-card ha-step-card" style={{ background: "#FAF9F5", border: "1.5px solid #EAE7DC", borderRadius: 12, padding: "28px 24px" }}>
              <span className="ha-step-number" style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 700, color: "#1D4ED8", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: 8 }}>STEP 02</span>
              <h3 className="ha-step-title" style={{ fontFamily: "var(--display)", fontSize: 22, color: "#08142A", fontWeight: 600, margin: "0 0 10px" }}>Candidates who fit</h3>
              <p className="ha-step-desc" style={{ fontSize: 14, color: "#475569", lineHeight: 1.6, margin: 0 }}>
                We pre-screen attorneys for your exact practice mix, local bar
                admissions, billable expectations, and compensation band.
              </p>
            </div>

            <div className="ha-card ha-step-card" style={{ background: "#FAF9F5", border: "1.5px solid #EAE7DC", borderRadius: 12, padding: "28px 24px" }}>
              <span className="ha-step-number" style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 700, color: "#1D4ED8", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: 8 }}>STEP 03</span>
              <h3 className="ha-step-title" style={{ fontFamily: "var(--display)", fontSize: 22, color: "#08142A", fontWeight: 600, margin: "0 0 10px" }}>90-day guarantee</h3>
              <p className="ha-step-desc" style={{ fontSize: 14, color: "#475569", lineHeight: 1.6, margin: 0 }}>
                You stay in full control. If a placed attorney leaves within 90
                days, we conduct a replacement search at zero extra fee.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. MEET YOUR RECRUITER */}
      <section className="ha-sec ha-sec-tinted" style={{ background: "#FAF9F5", padding: "88px 0 96px", borderBottom: "1px solid #EAE7DC" }}>
        <div className="wrap" style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
          <div className="ha-recruiter-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 40, alignItems: "center" }}>
            {/* Recruiter Photo */}
            <div className="ha-recruiter-photo-wrap" style={{ textAlign: "center" }}>
              <div className="ha-recruiter-card" style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 14, padding: "24px", display: "inline-block", boxShadow: "0 4px 16px rgba(15,23,42,0.04)" }}>
                <Image
                  src="/images/founders/justin-sofman.png"
                  alt="Justin Sofman"
                  width={240}
                  height={240}
                  className="ha-recruiter-portrait"
                  style={{ borderRadius: 10, display: "block", margin: "0 auto 16px" }}
                  priority
                />
                <div className="ha-recruiter-card-info">
                  <b className="ha-recruiter-name-tag" style={{ display: "block", fontSize: 18, color: "#08142A", fontWeight: 600 }}>Justin Sofman</b>
                  <span className="ha-recruiter-role-tag" style={{ fontSize: 13, color: "#64748B" }}>Co-Founder &amp; Managing Partner</span>
                </div>
              </div>
            </div>

            {/* Recruiter Content */}
            <div className="ha-recruiter-content">
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
                <span className="badge-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#1D4ED8" }} />
                <span>FOUNDER SPOTLIGHT</span>
              </div>
              <h2 className="ha-recruiter-name" style={{ fontFamily: "var(--display)", fontSize: "clamp(28px, 3.6vw, 42px)", color: "#08142A", margin: "0 0 6px", fontWeight: 500 }}>
                Hi, I&apos;m <span className="serif-accent" style={{ fontStyle: "italic" }}>Justin Sofman.</span>
              </h2>
              <p className="ha-recruiter-sub" style={{ fontSize: 15, color: "#64748B", margin: "0 0 20px" }}>Co-Founder &amp; Managing Partner, Orion Placement</p>

              <div className="ha-recruiter-paragraphs" style={{ display: "grid", gap: 14, fontSize: 14.5, color: "#475569", lineHeight: 1.6, marginBottom: 24 }}>
                <p style={{ margin: 0 }}>
                  I co-founded Orion Placement alongside Jon Missirlian to solve the biggest frustration law firms face: paying huge upfront retainers for resume spammers who have never even spoken to the attorney they&apos;re submitting.
                </p>
                <p style={{ margin: 0 }}>
                  With <b>11 years</b> of recruiting industry experience and Jon&apos;s <b>20 years</b> of talent acquisition expertise, we facilitate over <b>30 hires per month</b> for law firms across Texas and nationwide, backed by an active pool of <b>100,000+ legal professionals</b>.
                </p>
                <p style={{ margin: 0 }}>
                  We specialize in Estate Planning &amp; Wealth Transfer, Commercial Litigation, Real Estate, Corporate M&amp;A, Family Law, and Employment.
                </p>
              </div>

              <div className="ha-recruiter-quote" style={{ background: "#FFFFFF", borderLeft: "3px solid #1D4ED8", padding: "14px 18px", borderRadius: "0 8px 8px 0", fontSize: 14.5, fontStyle: "italic", color: "#08142A", marginBottom: 24 }}>
                &ldquo;I only get paid when you find the right attorney, so I&apos;m 100% invested in sending people actually worth your time.&rdquo;
              </div>

              <div className="ha-recruiter-footer-actions" style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
                <a
                  href="https://calendly.com/orionplacement/call-with-justin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-emp-primary"
                  style={{
                    background: "#1D4ED8",
                    color: "#FFFFFF",
                    borderRadius: 7,
                    fontWeight: 600,
                    padding: "11px 22px",
                    fontSize: 14,
                    textDecoration: "none",
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
                    padding: "11px 20px",
                    fontSize: 14,
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

      {/* 5. INTERACTIVE QUESTIONNAIRE */}
      <section id="questionnaire" className="ha-sec" style={{ background: "#FFFFFF", padding: "88px 0 96px", borderBottom: "1px solid #E2E8F0" }}>
        <div className="wrap" style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
          <div className="sec-head-premium" style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 40px" }}>
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
              <span className="badge-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#1D4ED8" }} />
              <span>START YOUR SEARCH · 2 MINUTES</span>
            </div>
            <h2 className="sec-title-lg" style={{ fontFamily: "var(--display)", fontSize: "clamp(28px, 3.6vw, 42px)", color: "#08142A", margin: "0 0 14px", fontWeight: 500 }}>
              Tell us who you&apos;re looking <span className="serif-accent" style={{ fontStyle: "italic" }}>for</span>
            </h2>
            <p className="who-lede" style={{ color: "#64748B", fontSize: 16, lineHeight: 1.6, margin: 0 }}>
              A few quick questions. Takes 2 minutes. You only pay if you hire.
            </p>
          </div>

          <div className="ha-q-center-box" style={{ maxWidth: 800, margin: "0 auto" }}>
            <Suspense fallback={<div className="q-card-box text-center py-12 text-[#5b6577]">Loading questionnaire...</div>}>
              <Questionnaire />
            </Suspense>
          </div>
        </div>
      </section>

      {/* 6. BOTTOM DARK CTA SECTION */}
      <section className="emp-terms-dark-sec ha-terms-dark-sec" style={{ background: "#08142A", padding: "96px 0 108px", textAlign: "center" }}>
        <div className="wrap" style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px" }}>
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
            <span className="badge-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#60A5FA" }} />
            <span>100% CONTINGENCY · RISK REVERSAL</span>
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
              <span>Check candidate availability</span>
              <span aria-hidden="true">↓</span>
            </a>
            <a
              href="https://calendly.com/orionplacement/call-with-justin"
              target="_blank"
              rel="noopener noreferrer"
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
              <span>Book 15 min with Justin</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
