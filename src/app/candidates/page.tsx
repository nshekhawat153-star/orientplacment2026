"use client";

import React from "react";
import Link from "next/link";
import { TrustBar, RatingBadge, TrustLine } from "@/components/Rating";
import { ReviewsSection } from "@/components/ReviewCard";
import { ResumeSheet } from "@/components/ResumeSheet";
import { Mark } from "@/components/Mark";
import { jobs, fmt, trust } from "@/data";

export default function CandidatesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.orionplacement.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Candidates",
        item: "https://www.orionplacement.com/candidates/",
      },
    ],
  };

  const CITY = "houston-tx";
  const hou = jobs
    .filter((j) => j.city === CITY)
    .sort((a, b) => b.band[1] - a.band[1]);

  const ep = jobs.filter((j) => j.city === CITY && j.role === "estate-planning-attorney");
  const re = hou.filter((j) => j.role === "real-estate-attorney")[0];
  const pl = hou.filter((j) => j.role === "estate-planning-paralegal")[0];
  const featuredJobs = [ep[0], re, pl].filter(Boolean);

  return (
    <div style={{ background: "#FAF9F5", minHeight: "100vh", color: "#08142A" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <style>{`
        .cand-steps-3 {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 24px;
        }
        .cand-step-box {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 14px;
          padding: 32px 26px;
          box-shadow: 0 4px 16px rgba(8, 20, 42, 0.03);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .cand-step-box:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 30px rgba(8, 20, 42, 0.08);
        }
        .cand-roles-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 24px;
        }
        .cand-card-job {
          background: #FFFFFF;
          border: 1.5px solid #E2E8F0;
          border-radius: 14px;
          padding: 28px 24px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: 0 4px 16px rgba(8, 20, 42, 0.03);
          transition: all 0.2s ease;
        }
        .cand-card-job:hover {
          transform: translateY(-4px);
          border-color: #1D4ED8;
          box-shadow: 0 16px 36px -8px rgba(29, 78, 216, 0.12);
        }
        .cand-promise-split {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 48px;
          align-items: center;
        }
        .cand-faq-split {
          display: grid;
          grid-template-columns: 1fr 1.35fr;
          gap: 48px;
          align-items: start;
        }
        .cand-faq-item {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 10px;
          padding: 18px 22px;
          margin-bottom: 12px;
        }
        .cand-faq-item summary {
          font-weight: 700;
          color: #08142A;
          cursor: pointer;
          font-size: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .cand-faq-item p {
          margin: 12px 0 0;
          font-size: 0.92rem;
          color: #475569;
          line-height: 1.6;
        }
        @media (max-width: 960px) {
          .cand-steps-3 { grid-template-columns: 1fr; }
          .cand-roles-grid { grid-template-columns: 1fr; }
          .cand-promise-split { grid-template-columns: 1fr; }
          .cand-faq-split { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* 1. LUXURY DARK HERO WITH SPLASH VIDEO */}
      <section
        className="emp-luxury-hero-sec cand-hero"
        style={{
          position: "relative",
          background: "radial-gradient(ellipse 90% 80% at 50% -20%, rgba(29, 78, 216, 0.28) 0%, rgba(8, 20, 42, 0.98) 75%, #08142A 100%)",
          color: "#FFFFFF",
          padding: "124px 0 76px",
          overflow: "hidden",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.16,
            pointerEvents: "none",
            zIndex: 0,
          }}
        >
          <source src="/media/splash.mp4" type="video/mp4" />
          <source src="/videos/hero-water-splash.mp4" type="video/mp4" />
        </video>

        <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1, textAlign: "center" }}>
          <div>
            <div
              className="hero-eyebrow-capsule"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(29, 78, 216, 0.15)",
                border: "1px solid rgba(96, 165, 250, 0.3)",
                borderRadius: "100px",
                padding: "7px 18px",
                fontFamily: "var(--mono)",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#93C5FD",
                marginBottom: "24px",
              }}
            >
              <span className="hero-eyebrow-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#60A5FA" }} />
              <span className="hero-eyebrow-desktop hidden-mobile">Candidate Portal · 100% Confidential &amp; Free</span>
              <span className="hero-eyebrow-mobile only-mobile">100% CONFIDENTIAL &amp; FREE</span>
            </div>

            {/* Centered Display Heading - Prominent Executive Scale */}
            <h1
              className="cand-hero-h1"
              style={{
                fontSize: "clamp(40px, 5.2vw, 64px)",
                fontFamily: "var(--display)",
                fontWeight: 500,
                lineHeight: 1.10,
                color: "#FFFFFF",
                letterSpacing: "-0.025em",
                margin: "0 auto 22px",
                maxWidth: "920px",
                textAlign: "center",
                textWrap: "balance",
                textShadow: "0 2px 16px rgba(0, 0, 0, 0.45)",
              }}
            >
              Confidential legal jobs, <br />
              <span className="serif-accent" style={{ color: "#60A5FA", fontStyle: "italic" }}>with the pay shown.</span>
            </h1>

            <p
              style={{
                fontSize: "clamp(18px, 1.8vw, 21px)",
                lineHeight: 1.65,
                color: "rgba(255, 255, 255, 0.88)",
                maxWidth: "760px",
                margin: "0 auto 34px",
                textShadow: "0 1px 8px rgba(0, 0, 0, 0.4)",
              }}
            >
              Direct lateral opportunities at leading boutique and mid-size law firms across Texas. Always 100% free for candidates. No firm ever sees your name until you specifically say yes.
            </p>

            <div className="cand-hero-actions hero-actions-group" style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap", marginBottom: 34 }}>
              <Link
                href="/upload-resume"
                style={{
                  background: "#1D4ED8",
                  color: "#FFFFFF",
                  padding: "15px 32px",
                  borderRadius: 7,
                  fontWeight: 600,
                  fontSize: "16px",
                  textDecoration: "none",
                  boxShadow: "0 8px 20px rgba(29, 78, 216, 0.35)",
                  transition: "all 0.2s ease",
                }}
              >
                Upload Your Resume Confidentially →
              </Link>
              <Link
                href="/jobs"
                style={{
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  color: "#FFFFFF",
                  padding: "15px 28px",
                  borderRadius: 7,
                  fontWeight: 600,
                  fontSize: "16px",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
              >
                Browse Open Roles With Pay →
              </Link>
            </div>

            {/* Micro Reassurances */}
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap", gap: "16px 28px", color: "#CBD5E1", fontSize: "14.5px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ color: "#60A5FA" }}>✓</span> 100% confidential representation
              </div>
              <span>•</span>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ color: "#60A5FA" }}>✓</span> Exact base salary &amp; bonus disclosed upfront
              </div>
              <span>•</span>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ color: "#60A5FA" }}>✓</span> Zero contact with your current firm
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST BAR STRIP */}
      <section style={{ background: "#FFFFFF", borderBottom: "1px solid #E2E8F0", padding: "28px 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <TrustBar kind="candidate" />
        </div>
      </section>

      {/* 3. CONFIDENTIAL 3-STEP WORKFLOW */}
      <section style={{ maxWidth: "1200px", margin: "80px auto 0", padding: "0 24px" }} id="how-it-works">
        <div style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto 40px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(29, 78, 216, 0.08)",
              border: "1px solid rgba(29, 78, 216, 0.2)",
              borderRadius: "100px",
              padding: "4px 12px",
              fontSize: "0.78rem",
              fontWeight: 600,
              color: "#1D4ED8",
              marginBottom: "10px",
            }}
          >
            Confidential 3-Step Protocol
          </div>
          <h2 style={{ fontSize: "2.2rem", fontWeight: 700, color: "#08142A", margin: "0 0 10px", fontFamily: "var(--font-serif, Georgia, serif)" }}>
            Three Steps, and You Stay in <span style={{ color: "#1D4ED8", fontStyle: "italic" }}>Complete Control</span>
          </h2>
          <p style={{ margin: 0, color: "#64748B", fontSize: "1.02rem" }}>
            Nothing is ever submitted to any law firm until you explicitly greenlight it. Jon personally reviews every resume and discusses lateral opportunities directly.
          </p>
        </div>

        <div className="cand-steps-3">
          <div className="cand-step-box">
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <span style={{ fontFamily: "monospace", fontSize: "1.2rem", fontWeight: 800, color: "#1D4ED8" }}>01</span>
                <span style={{ fontSize: "0.75rem", background: "#EFF6FF", color: "#1D4ED8", fontWeight: 700, padding: "3px 8px", borderRadius: 4 }}>
                  Day 0
                </span>
              </div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#08142A", margin: "0 0 10px" }}>
                Send Your Resume Confidentially
              </h3>
              <p style={{ fontSize: "0.9rem", color: "#64748B", lineHeight: 1.6, margin: 0 }}>
                Upload or paste your resume. We extract your practice mix, bar admissions, and target compensation. Your identity is fully redacted into an anonymous candidate code.
              </p>
            </div>
            <div style={{ marginTop: 24, paddingTop: 16, borderTop: "1px solid #F1F5F9", fontSize: "0.82rem", color: "#059669", fontWeight: 600 }}>
              ✓ Anonymous Dossier Created
            </div>
          </div>

          <div className="cand-step-box">
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <span style={{ fontFamily: "monospace", fontSize: "1.2rem", fontWeight: 800, color: "#1D4ED8" }}>02</span>
                <span style={{ fontSize: "0.75rem", background: "#EFF6FF", color: "#1D4ED8", fontWeight: 700, padding: "3px 8px", borderRadius: 4 }}>
                  Within 48 Hours
                </span>
              </div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#08142A", margin: "0 0 10px" }}>
                Review Roles With Pay Disclosed
              </h3>
              <p style={{ fontSize: "0.9rem", color: "#64748B", lineHeight: 1.6, margin: 0 }}>
                Jon schedules a brief private call to share matching boutique openings. Every single seat includes verified base salary, expected bonus structure, and billable hour targets.
              </p>
            </div>
            <div style={{ marginTop: 24, paddingTop: 16, borderTop: "1px solid #F1F5F9", fontSize: "0.82rem", color: "#1D4ED8", fontWeight: 600 }}>
              ✓ Transparent Pay Bands Shared
            </div>
          </div>

          <div className="cand-step-box">
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <span style={{ fontFamily: "monospace", fontSize: "1.2rem", fontWeight: 800, color: "#1D4ED8" }}>03</span>
                <span style={{ fontSize: "0.75rem", background: "#EFF6FF", color: "#1D4ED8", fontWeight: 700, padding: "3px 8px", borderRadius: 4 }}>
                  When You Say Yes
                </span>
              </div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#08142A", margin: "0 0 10px" }}>
                Meet the Law Firm on Your Terms
              </h3>
              <p style={{ fontSize: "0.9rem", color: "#64748B", lineHeight: 1.6, margin: 0 }}>
                We introduce you only to the specific managing partners you select. You interview knowing exactly what the seat pays. Orion&apos;s representation is 100% free for you.
              </p>
            </div>
            <div style={{ marginTop: 24, paddingTop: 16, borderTop: "1px solid #F1F5F9", fontSize: "0.82rem", color: "#15803D", fontWeight: 600 }}>
              ✓ Zero Candidate Fees Ever
            </div>
          </div>
        </div>
      </section>

      {/* 4. ACTIVE ROLES WITH BASE PAY ON EVERY CARD */}
      <section style={{ maxWidth: "1200px", margin: "90px auto 0", padding: "0 24px" }} id="open-roles">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32, flexWrap: "wrap", gap: 14 }}>
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(29, 78, 216, 0.08)",
                border: "1px solid rgba(29, 78, 216, 0.2)",
                borderRadius: "100px",
                padding: "4px 12px",
                fontSize: "0.78rem",
                fontWeight: 600,
                color: "#1D4ED8",
                marginBottom: "10px",
              }}
            >
              Active Searches · Pay Disclosed
            </div>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 700, color: "#08142A", margin: 0, fontFamily: "var(--font-serif, Georgia, serif)" }}>
              Featured Lateral Roles With Pay Disclosed
            </h2>
          </div>
          <Link
            href="/jobs"
            style={{
              background: "#1D4ED8",
              color: "#FFFFFF",
              padding: "10px 20px",
              borderRadius: 7,
              fontWeight: 600,
              fontSize: "0.9rem",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span>View All Active Roles</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="cand-roles-grid">
          {featuredJobs.map((j) => (
            <article key={j.id} className="cand-card-job">
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#1D4ED8", background: "#EFF6FF", padding: "3px 8px", borderRadius: 4 }}>
                    {j.mode === "on-site" ? "On-site" : "Hybrid"}
                  </span>
                  <span style={{ fontSize: "0.78rem", color: "#64748B" }}>
                    Posted {fmt.date(j.posted)}
                  </span>
                </div>

                <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#08142A", margin: "0 0 10px", lineHeight: 1.3 }}>
                  <Mark>{j.title}</Mark>
                </h3>

                <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "#1D4ED8", marginBottom: 16 }}>
                  <Mark>{fmt.range(j.band)}</Mark>
                  <span style={{ fontSize: "0.78rem", color: "#64748B", fontWeight: 500, marginLeft: 6, textTransform: "uppercase" }}>Base Target</span>
                </div>

                <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 8, padding: "12px 14px", display: "grid", gap: 8, fontSize: "0.85rem", marginBottom: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#64748B" }}>Firm Profile</span>
                    <span style={{ fontWeight: 600, color: "#08142A" }}>{j.firmType}, {j.firmSize}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#64748B" }}>Practice Focus</span>
                    <span style={{ fontWeight: 600, color: "#08142A" }}>{j.mix}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#64748B" }}>Location</span>
                    <span style={{ fontWeight: 600, color: "#08142A" }}>{j.area}, Houston</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#64748B" }}>Experience</span>
                    <span style={{ fontWeight: 600, color: "#08142A" }}>{j.years} Years</span>
                  </div>
                </div>
              </div>

              <Link
                href={`/jobs?q=${encodeURIComponent(j.title)}`}
                style={{
                  display: "block",
                  textAlign: "center",
                  background: "#08142A",
                  color: "#FFFFFF",
                  padding: "11px 16px",
                  borderRadius: 7,
                  fontWeight: 600,
                  fontSize: "0.88rem",
                  textDecoration: "none",
                  transition: "background 0.15s ease",
                }}
              >
                Explore Confidential Opening →
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* 5. DARK SECTION: CANDIDATE PRIVACY PROMISE ("What a firm sees before your yes") */}
      <section
        id="privacy-promise"
        style={{
          background: "#08142A",
          color: "#FFFFFF",
          padding: "96px 0",
          marginTop: "90px",
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <div className="cand-promise-split">
            {/* Left Column: Guarantees */}
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "rgba(29, 78, 216, 0.2)",
                  border: "1px solid rgba(96, 165, 250, 0.3)",
                  borderRadius: "100px",
                  padding: "4px 12px",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  color: "#93C5FD",
                  marginBottom: "16px",
                }}
              >
                Anonymity Guarantee · Zero Risk
              </div>

              <h2
                style={{
                  fontSize: "2.4rem",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  margin: "0 0 16px",
                  fontFamily: "var(--font-serif, Georgia, serif)",
                }}
              >
                What a law firm sees before your <span style={{ color: "#60A5FA", fontStyle: "italic" }}>yes.</span>
              </h2>

              <p style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "1.05rem", lineHeight: 1.6, margin: "0 0 28px" }}>
                We never contact your current law firm, partners, or colleagues. Your name, current employer, and law school stay 100% hidden until you specifically greenlight an interview.
              </p>

              <div style={{ display: "grid", gap: 14 }}>
                {[
                  {
                    title: "No unsolicited submissions",
                    desc: "Your resume and identity are shared only with the specific firms you explicitly choose.",
                  },
                  {
                    title: "Zero contact with your current firm",
                    desc: "We never reach out to your managing partner, colleagues, or HR under any circumstance.",
                  },
                  {
                    title: "Upfront salary disclosure",
                    desc: "Every single opportunity includes verified base compensation and bonus structure upfront.",
                  },
                  {
                    title: "Right to be forgotten",
                    desc: "Ask us to delete your dossier at any time and we purge all records within 24 hours.",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: "rgba(255, 255, 255, 0.04)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: 10,
                      padding: "16px 18px",
                      display: "flex",
                      gap: 12,
                      alignItems: "flex-start",
                    }}
                  >
                    <span style={{ color: "#60A5FA", fontWeight: 700, fontSize: "1rem" }}>✓</span>
                    <div>
                      <strong style={{ color: "#FFFFFF", fontSize: "0.95rem" }}>{item.title}: </strong>
                      <span style={{ color: "rgba(255, 255, 255, 0.75)", fontSize: "0.9rem" }}>{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Redacted Dossier Preview Shell */}
            <div
              style={{
                background: "#FFFFFF",
                borderRadius: 14,
                padding: "28px 24px",
                color: "#08142A",
                boxShadow: "0 20px 48px rgba(0, 0, 0, 0.4)",
              }}
            >
              <div style={{ marginBottom: 14, display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #E2E8F0", paddingBottom: 10 }}>
                <span style={{ fontFamily: "monospace", fontSize: "0.75rem", fontWeight: 700, color: "#1D4ED8", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  Redacted Dossier Preview
                </span>
                <span style={{ fontSize: "0.75rem", color: "#059669", fontWeight: 600 }}>
                  ● 100% Anonymized
                </span>
              </div>
              <ResumeSheet candidateId="EP-TX-0412" />
            </div>
          </div>
        </div>
      </section>

      {/* 6. VERIFIED CANDIDATE REVIEWS */}
      <section style={{ maxWidth: "1200px", margin: "90px auto 0", padding: "0 24px" }} id="reviews">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32, flexWrap: "wrap", gap: 14 }}>
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(29, 78, 216, 0.08)",
                border: "1px solid rgba(29, 78, 216, 0.2)",
                borderRadius: "100px",
                padding: "4px 12px",
                fontSize: "0.78rem",
                fontWeight: 600,
                color: "#1D4ED8",
                marginBottom: "10px",
              }}
            >
              Verified Google 5.0 Rating
            </div>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 700, color: "#08142A", margin: 0, fontFamily: "var(--font-serif, Georgia, serif)" }}>
              What Attorneys &amp; Paralegals Say
            </h2>
          </div>
          <RatingBadge link />
        </div>

        <ReviewsSection kind="candidate" />
      </section>

      {/* 7. CANDIDATE FAQ */}
      <section style={{ maxWidth: "1200px", margin: "90px auto 0", padding: "0 24px" }} id="faq">
        <div className="cand-faq-split">
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(29, 78, 216, 0.08)",
                border: "1px solid rgba(29, 78, 216, 0.2)",
                borderRadius: "100px",
                padding: "4px 12px",
                fontSize: "0.78rem",
                fontWeight: 600,
                color: "#1D4ED8",
                marginBottom: "10px",
              }}
            >
              Questions &amp; Answers · For Candidates
            </div>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 700, color: "#08142A", margin: "0 0 14px", fontFamily: "var(--font-serif, Georgia, serif)" }}>
              What Candidates Ask First
            </h2>
            <p style={{ color: "#64748B", fontSize: "1rem", lineHeight: 1.6, margin: "0 0 24px" }}>
              Confidentiality, compensation transparency, and how representation works with zero obligations.
            </p>

            <div style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 12, padding: "24px 22px", boxShadow: "0 2px 10px rgba(8, 20, 42, 0.03)" }}>
              <p style={{ fontWeight: 700, color: "#08142A", fontSize: "0.95rem", margin: "0 0 14px" }}>
                Prefer to speak confidentially after business hours?
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <Link
                  href="/upload-resume"
                  style={{
                    background: "#08142A",
                    color: "#FFFFFF",
                    padding: "11px 18px",
                    borderRadius: 7,
                    fontWeight: 600,
                    fontSize: "0.88rem",
                    textDecoration: "none",
                    textAlign: "center",
                  }}
                >
                  Upload Resume Privately →
                </Link>
                <a
                  href={trust.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: "#F1F5F9",
                    color: "#08142A",
                    padding: "11px 18px",
                    borderRadius: 7,
                    fontWeight: 600,
                    fontSize: "0.88rem",
                    textDecoration: "none",
                    textAlign: "center",
                    border: "1px solid #CBD5E1",
                  }}
                >
                  Schedule Confidential Call
                </a>
              </div>
              <div style={{ fontSize: "0.8rem", color: "#059669", marginTop: 14, fontWeight: 600 }}>
                ✓ 100% free representation for all candidates
              </div>
            </div>
          </div>

          <div>
            <details className="cand-faq-item" open>
              <summary>
                <span>Will my current firm find out?</span>
                <span style={{ color: "#1D4ED8", fontSize: "1.2rem" }}>+</span>
              </summary>
              <p>
                No. We never contact your firm, and <Mark>no employer sees your name or resume</Mark> until you explicitly say yes to that specific role. Profiles we share before that show firm type, practice mix, and seniority tier only.
              </p>
            </details>

            <details className="cand-faq-item">
              <summary>
                <span>Do I pay anything for Orion&apos;s representation?</span>
                <span style={{ color: "#1D4ED8", fontSize: "1.2rem" }}>+</span>
              </summary>
              <p>
                No. Orion&apos;s fee is paid entirely by the hiring law firm upon your start date. Your compensation offer is <Mark>never reduced</Mark> to cover our contingency fee.
              </p>
            </details>

            <details className="cand-faq-item">
              <summary>
                <span>Are the posted salary bands real?</span>
                <span style={{ color: "#1D4ED8", fontSize: "1.2rem" }}>+</span>
              </summary>
              <p>
                Yes. Each band reflects the verified base range agreed directly with managing partners. Bonus potential, benefits, and originations are shared on your initial private briefing call with Jon.
              </p>
            </details>

            <details className="cand-faq-item">
              <summary>
                <span>What if nothing listed fits my practice area right now?</span>
                <span style={{ color: "#1D4ED8", fontSize: "1.2rem" }}>+</span>
              </summary>
              <p>
                Upload your resume anyway. Over 60% of our lateral placements are made for confidential, unposted mandates. Jon proactively reaches out as matching boutique seats open.
              </p>
            </details>

            <details className="cand-faq-item">
              <summary>
                <span>Can I speak confidentially after work hours?</span>
                <span style={{ color: "#1D4ED8", fontSize: "1.2rem" }}>+</span>
              </summary>
              <p>
                Yes. Calls before 8:00 AM, in the evenings after 6:00 PM, or on weekends can easily be arranged. Simply note your preferred time window when you submit your resume.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* 8. BOTTOM MIDNIGHT NAVY CTA BAND */}
      <section
        style={{
          position: "relative",
          background: "#08142A",
          color: "#FFFFFF",
          padding: "88px 0",
          marginTop: "90px",
          overflow: "hidden",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 24px", textAlign: "center", position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(29, 78, 216, 0.2)",
              border: "1px solid rgba(96, 165, 250, 0.3)",
              borderRadius: "100px",
              padding: "4px 12px",
              fontSize: "0.78rem",
              fontWeight: 600,
              color: "#93C5FD",
              marginBottom: "16px",
            }}
          >
            Confidential Candidate Transition
          </div>

          <h2
            style={{
              fontSize: "clamp(28px, 3.8vw, 42px)",
              fontWeight: 500,
              color: "#FFFFFF",
              margin: "0 0 16px",
              fontFamily: "var(--display)",
              lineHeight: 1.15,
            }}
          >
            See the roles that fit you,{" "}
            <span className="serif-accent" style={{ color: "#60A5FA", fontStyle: "italic" }}>
              with the pay.
            </span>
          </h2>

          <p
            style={{
              color: "rgba(255, 255, 255, 0.8)",
              fontSize: "1.08rem",
              lineHeight: 1.6,
              margin: "0 0 32px",
            }}
          >
            Upload your resume confidentially. Zero fee for candidates, and no law firm ever sees your name until you say yes.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
            <Link
              href="/upload-resume"
              style={{
                background: "#1D4ED8",
                color: "#FFFFFF",
                padding: "14px 32px",
                borderRadius: 7,
                fontWeight: 600,
                fontSize: "0.98rem",
                textDecoration: "none",
                boxShadow: "0 4px 16px rgba(29, 78, 216, 0.4)",
              }}
            >
              Upload Your Resume Confidentially →
            </Link>
            <Link
              href="/jobs"
              style={{
                background: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                color: "#FFFFFF",
                padding: "14px 24px",
                borderRadius: 7,
                fontWeight: 600,
                fontSize: "0.98rem",
                textDecoration: "none",
              }}
            >
              Browse All Open Roles
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
