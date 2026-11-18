"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DATA, matchCandidates } from "@/data";
import { TrustLine } from "@/components/Rating";
import { CandidateCard } from "@/components/CandidateCard";
import { GateForm } from "@/components/GateForm";
import { Icon } from "@/components/icons";

export function WhereToPostClient({
  cityParam,
}: {
  cityParam: string;
}) {
  const city = DATA.cities.find((c) => c.slug === cityParam);

  const [seatFilter, setSeatFilter] = useState<string>("all");

  if (!city) {
    notFound();
  }

  const places = DATA.placesToPost[city.slug] || [];
  const fitMap = DATA.placesToPostFit[city.slug] || [];

  const candidateIds = ["EP-TX-0412", "LIT-TX-0390", "PL-TX-0611"];
  const candidates = candidateIds.map((id) => DATA.candidates.find((c) => c.id === id)).filter(Boolean);

  const screenedCount = matchCandidates({ city: city.slug }).filter((r) => r.inCity).length;

  return (
    <div style={{ background: "#FFFFFF", minHeight: "100vh", color: "#08142A" }}>
      <style>{`
        .wtp-table-wrap {
          background: #FFFFFF;
          border: 1.5px solid #E2E8F0;
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(8, 20, 42, 0.04);
        }
        .wtp-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 0.92rem;
        }
        .wtp-table th {
          padding: 16px 20px;
          background: #F8FAFC;
          border-bottom: 2px solid #E2E8F0;
          color: #08142A;
          font-size: 0.82rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .wtp-table td {
          padding: 18px 20px;
          border-bottom: 1px solid #F1F5F9;
        }
        .wtp-split-grid {
          display: grid;
          grid-template-columns: 1.25fr 0.75fr;
          gap: 36px;
          align-items: start;
        }
        .wtp-checklist-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
        }
        .wtp-candidates-row {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 22px;
          align-items: stretch;
        }
        .wtp-roi-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 20px;
        }
        @media (max-width: 960px) {
          .wtp-split-grid { grid-template-columns: 1fr; }
          .wtp-checklist-grid { grid-template-columns: 1fr; }
          .wtp-candidates-row { grid-template-columns: 1fr; }
          .wtp-roi-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .wtp-filter-pills {
            display: flex !important;
            flex-wrap: nowrap !important;
            overflow-x: auto !important;
            -webkit-overflow-scrolling: touch !important;
            justify-content: flex-start !important;
            padding: 5px !important;
            gap: 6px !important;
            width: 100% !important;
            max-width: 100% !important;
            border-radius: 10px !important;
            scrollbar-width: none !important;
            margin: 0 auto 20px !important;
          }
          .wtp-filter-pills::-webkit-scrollbar {
            display: none !important;
          }
          .wtp-filter-btn {
            flex: 0 0 auto !important;
            white-space: nowrap !important;
            padding: 8px 14px !important;
            font-size: 0.82rem !important;
            border-radius: 7px !important;
          }
          .wtp-table-scroll {
            overflow-x: auto !important;
            -webkit-overflow-scrolling: touch !important;
          }
          .wtp-table {
            min-width: 720px !important;
            font-size: 0.85rem !important;
          }
          .wtp-table th {
            padding: 12px 14px !important;
            font-size: 0.74rem !important;
            white-space: nowrap !important;
          }
          .wtp-table td {
            padding: 13px 14px !important;
          }
        }
      `}</style>

      {/* =========================================================================
          HERO SECTION: Centered Luxury Showcase (No Card, High-Contrast Typography)
          ========================================================================= */}
      <section
        className="emp-luxury-hero-sec wtp-luxury-hero-sec"
        style={{
          position: "relative",
          background: "radial-gradient(ellipse 90% 80% at 50% -20%, rgba(29, 78, 216, 0.28) 0%, rgba(8, 20, 42, 0.98) 75%, #08142A 100%)",
          color: "#FFFFFF",
          padding: "112px 0 84px",
          overflow: "hidden",
          borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
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

        <div style={{ maxWidth: "1080px", margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1, textAlign: "center" }}>
          {/* Eyebrow Badge */}
          <div
            className="hero-eyebrow-capsule"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(29, 78, 216, 0.2)",
              border: "1px solid rgba(96, 165, 250, 0.35)",
              borderRadius: "100px",
              padding: "6px 16px",
              fontSize: "0.78rem",
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "#93C5FD",
              marginBottom: "20px",
            }}
          >
            <span className="hero-eyebrow-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#60A5FA" }} />
            <span className="hero-eyebrow-desktop hidden-mobile">Legal Recruitment Benchmark · {city.name.toUpperCase()}, {city.state.toUpperCase()}</span>
            <span className="hero-eyebrow-mobile only-mobile">RECRUITMENT BENCHMARK · {city.name.toUpperCase()}</span>
          </div>

          {/* Heading */}
          <h1
            style={{
              fontSize: "clamp(2.4rem, 4.6vw, 3.8rem)",
              fontFamily: "var(--font-serif, 'Playfair Display', Georgia, serif)",
              fontWeight: 700,
              lineHeight: 1.15,
              color: "#FFFFFF",
              letterSpacing: "-0.02em",
              margin: "0 auto 20px",
              maxWidth: "880px",
            }}
          >
            Where to post a legal job in{" "}
            <span className="serif-accent" style={{ color: "#60A5FA", fontStyle: "italic" }}>
              {city.name}
            </span>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "1.12rem",
              lineHeight: 1.65,
              color: "#CBD5E1",
              maxWidth: "740px",
              margin: "0 auto 34px",
            }}
          >
            An objective breakdown of six major legal recruitment channels across {city.name} — comparing upfront posting costs, verified audience reach, and time to first applicant. Or meet pre-screened lateral legal talent today with zero public listing spend.
          </p>

          {/* Action CTAs */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", justifyContent: "center", alignItems: "center", marginBottom: "40px" }}>
            <Link
              href={`/find-candidates#city=${city.slug}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "#1D4ED8",
                color: "#FFFFFF",
                padding: "13px 26px",
                borderRadius: 7,
                fontWeight: 600,
                fontSize: "0.95rem",
                textDecoration: "none",
                boxShadow: "0 4px 14px rgba(29, 78, 216, 0.4)",
                transition: "all 0.2s ease",
              }}
            >
              <span>See {city.name} Candidates ({screenedCount})</span>
              <span>→</span>
            </Link>

            <a
              href="#compare"
              style={{
                background: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.22)",
                color: "#FFFFFF",
                padding: "13px 22px",
                borderRadius: 7,
                fontWeight: 600,
                fontSize: "0.95rem",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 0.2s ease",
              }}
            >
              Compare All 6 Job Boards ↓
            </a>
          </div>

          <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.12)", paddingTop: 20 }}>
            <TrustLine />
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 1: Side-by-Side Platform Analysis
          ========================================================================= */}
      <section
        id="compare"
        style={{
          background: "#FFFFFF",
          padding: "84px 0 96px",
          borderBottom: "1px solid #E2E8F0",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto 36px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(29, 78, 216, 0.08)",
                border: "1px solid rgba(29, 78, 216, 0.2)",
                borderRadius: "100px",
                padding: "5px 14px",
                fontSize: "0.78rem",
                fontWeight: 700,
                color: "#1D4ED8",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: "14px",
              }}
            >
              STEP 01 · SIDE-BY-SIDE PLATFORM BENCHMARK
            </div>
            <h2
              style={{
                fontSize: "clamp(2rem, 3.2vw, 2.6rem)",
                fontWeight: 700,
                color: "#08142A",
                margin: "0 0 12px",
                fontFamily: "var(--font-serif, Georgia, serif)",
                lineHeight: 1.2,
              }}
            >
              Six Places to Post Legal Jobs,{" "}
              <span className="serif-accent" style={{ color: "#1D4ED8", fontStyle: "italic" }}>
                Side by Side
              </span>
            </h2>
            <p style={{ margin: 0, color: "#64748B", fontSize: "1.05rem", lineHeight: 1.6 }}>
              Filter by target role to highlight the highest-converting recruitment channels in {city.name}.
            </p>
          </div>

          {/* Filter Pills */}
          <div
            className="wtp-filter-pills"
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: 8,
              background: "#FAF9F5",
              border: "1.5px solid #EAE7DC",
              borderRadius: 12,
              padding: "6px",
              maxWidth: "680px",
              margin: "0 auto 32px",
            }}
          >
            {[
              { id: "all", label: "All Target Roles" },
              { id: "attorney", label: "Lateral Attorneys" },
              { id: "paralegal", label: "Senior Paralegals" },
              { id: "staff", label: "Legal Assistants & Staff" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                className="wtp-filter-btn"
                onClick={() => setSeatFilter(tab.id)}
                style={{
                  padding: "10px 18px",
                  borderRadius: 7,
                  fontSize: "0.9rem",
                  fontWeight: seatFilter === tab.id ? 700 : 500,
                  cursor: "pointer",
                  background: seatFilter === tab.id ? "#08142A" : "transparent",
                  color: seatFilter === tab.id ? "#FFFFFF" : "#475569",
                  border: "none",
                  boxShadow: seatFilter === tab.id ? "0 2px 8px rgba(8, 20, 42, 0.2)" : "none",
                  transition: "all 0.15s ease",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Matrix Table */}
          <div className="wtp-table-wrap">
            <div className="wtp-table-scroll" style={{ overflowX: "auto" }}>
              <table className="wtp-table">
                <thead>
                  <tr>
                    <th>Platform / Board</th>
                    <th>Standard Cost</th>
                    <th>Audience &amp; Reach</th>
                    <th>Speed to 1st Applicant</th>
                    <th>Optimal Strategic Fit</th>
                  </tr>
                </thead>
                <tbody>
                  {places.map((p, i) => {
                    const fit = fitMap[i] || [];
                    const isHit = seatFilter !== "all" && fit.includes(seatFilter);
                    const isDim = seatFilter !== "all" && !isHit;

                    return (
                      <tr
                        key={i}
                        style={{
                          background: isHit ? "rgba(240, 253, 244, 0.8)" : "transparent",
                          opacity: isDim ? 0.35 : 1,
                          transition: "all 0.15s ease",
                        }}
                      >
                        <td style={{ fontWeight: 700, color: isHit ? "#15803D" : "#08142A" }}>
                          {p.name}
                        </td>
                        <td style={{ color: "#475569", fontWeight: 600 }}>
                          {p.cost}
                        </td>
                        <td style={{ color: "#334155" }}>
                          {p.reach}
                        </td>
                        <td style={{ color: "#059669", fontWeight: 700 }}>
                          {p.firstApplicant}
                        </td>
                        <td style={{ color: "#475569" }}>
                          {p.bestFor}
                        </td>
                      </tr>
                    );
                  })}

                  {/* Orion Placement Row */}
                  <tr style={{ background: "#EFF6FF", borderTop: "2px solid #1D4ED8" }}>
                    <td style={{ fontWeight: 800, color: "#1D4ED8", fontSize: "1rem" }}>
                      Orion Placement
                    </td>
                    <td style={{ fontWeight: 700, color: "#059669" }}>
                      $0 Upfront · 23% Fee Due Only If You Hire
                    </td>
                    <td style={{ color: "#08142A", fontWeight: 600 }}>
                      {screenedCount} Screened {city.name} Legal Professionals
                    </td>
                    <td style={{ color: "#1D4ED8", fontWeight: 800 }}>
                      Dossiers Within 1 Hour
                    </td>
                    <td>
                      <Link
                        href={`/find-candidates#city=${city.slug}`}
                        style={{
                          color: "#1D4ED8",
                          fontWeight: 700,
                          textDecoration: "none",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        Browse {city.name} Candidates →
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: Active Candidates Ready Now
          ========================================================================= */}
      <section
        id="candidates"
        style={{
          background: "#FAF9F5",
          padding: "88px 0 96px",
          borderBottom: "1px solid #E2E8F0",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 36, flexWrap: "wrap", gap: 16 }}>
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "rgba(29, 78, 216, 0.08)",
                  border: "1px solid rgba(29, 78, 216, 0.2)",
                  borderRadius: "100px",
                  padding: "5px 14px",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  color: "#1D4ED8",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  marginBottom: "12px",
                }}
              >
                STEP 02 · ORION LATERAL TALENT PIPELINE
              </div>
              <h2 style={{ fontSize: "clamp(1.9rem, 3vw, 2.4rem)", fontWeight: 700, color: "#08142A", margin: "0 0 8px", fontFamily: "var(--font-serif, Georgia, serif)" }}>
                Before You Pay to Post:{" "}
                <span className="serif-accent" style={{ color: "#1D4ED8", fontStyle: "italic" }}>
                  {city.name} Candidates
                </span>{" "}
                Looking Now
              </h2>
              <p style={{ margin: 0, color: "#64748B", fontSize: "1.02rem" }}>
                Redacted candidate dossiers already active in {city.name}. Available to interview today without public listing fees.
              </p>
            </div>

            <Link
              href="/submit-job"
              style={{
                fontSize: "0.95rem",
                fontWeight: 600,
                color: "#1D4ED8",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span>Or paste your posting text</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="wtp-candidates-row">
            {candidates.map((candidate) => candidate && (
              <CandidateCard key={candidate.id} candidate={candidate} />
            ))}
          </div>

          <div
            style={{
              marginTop: 28,
              padding: "20px 24px",
              background: "#FFFFFF",
              border: "1.5px solid #E2E8F0",
              borderRadius: 12,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 14,
              boxShadow: "0 4px 16px rgba(8, 20, 42, 0.03)",
            }}
          >
            <div>
              <b style={{ color: "#08142A", fontSize: "0.95rem" }}>
                Need candidates in a different practice area or seniority in {city.name}?
              </b>
              <p style={{ margin: "4px 0 0", fontSize: "0.88rem", color: "#64748B" }}>
                Justin maintains confidential relationships with off-market lateral attorneys across the state.
              </p>
            </div>
            <Link
              href={`/find-candidates#city=${city.slug}`}
              style={{
                color: "#1D4ED8",
                fontWeight: 700,
                fontSize: "0.92rem",
                textDecoration: "none",
              }}
            >
              View All {screenedCount} {city.name} Candidates →
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: The 6 Essential Elements of a High-Converting Posting
          ========================================================================= */}
      <section
        id="checklist"
        style={{
          background: "#FFFFFF",
          padding: "88px 0 96px",
          borderBottom: "1px solid #E2E8F0",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <div className="wtp-split-grid">
            <div>
              <div style={{ marginBottom: 32 }}>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "rgba(29, 78, 216, 0.08)",
                    border: "1px solid rgba(29, 78, 216, 0.2)",
                    borderRadius: "100px",
                    padding: "5px 14px",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    color: "#1D4ED8",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    marginBottom: "12px",
                  }}
                >
                  STEP 03 · POSTING ARCHITECTURE
                </div>
                <h2
                  style={{
                    fontSize: "clamp(1.9rem, 3vw, 2.5rem)",
                    fontWeight: 700,
                    color: "#08142A",
                    margin: "0 0 12px",
                    fontFamily: "var(--font-serif, Georgia, serif)",
                    lineHeight: 1.2,
                  }}
                >
                  Six Elements Every{" "}
                  <span className="serif-accent" style={{ color: "#1D4ED8", fontStyle: "italic" }}>
                    High-Converting Legal Posting
                  </span>{" "}
                  Requires
                </h2>
                <p style={{ color: "#64748B", fontSize: "1.02rem", lineHeight: 1.6, margin: 0 }}>
                  Law firm postings with transparent compensation and clear practice distribution receive 3.4x more qualified lateral associate and senior paralegal applicants.
                </p>
              </div>

              <div className="wtp-checklist-grid">
                {[
                  {
                    num: "01",
                    title: "Transparent Base Pay Band",
                    desc: "Publishing verified salary ranges immediately filters unqualified applicants and signals firm credibility.",
                  },
                  {
                    num: "02",
                    title: "Exact Work Model",
                    desc: "Disclose required in-office vs hybrid days and office submarket location (e.g. Downtown vs Galleria).",
                  },
                  {
                    num: "03",
                    title: "Practice Breakdown",
                    desc: "Itemize substantive work split (e.g. 60% high-net-worth estate planning, 40% probate administration).",
                  },
                  {
                    num: "04",
                    title: "State Bar Licensure",
                    desc: "Explicitly state Texas Bar admission in good standing or specific reciprocal eligibility expectations.",
                  },
                  {
                    num: "05",
                    title: "Billable Hour Target",
                    desc: "State realistic annual billable expectations (e.g. 1,400 to 1,750 hrs) to attract lateral attorneys seeking balance.",
                  },
                  {
                    num: "06",
                    title: "Confidentiality Guarantee",
                    desc: "Assure candidates that resumes are reviewed by named hiring partners and never circulated publicly.",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: "#FAF9F5",
                      border: "1.5px solid #EAE7DC",
                      borderRadius: 12,
                      padding: "22px 20px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 8 }}>
                      <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.85rem", fontWeight: 800, color: "#1D4ED8" }}>
                        {item.num}
                      </span>
                      <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "#08142A", margin: 0 }}>
                        {item.title}
                      </h4>
                    </div>
                    <p style={{ fontSize: "0.88rem", color: "#64748B", lineHeight: 1.55, margin: 0 }}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: GateForm for Legal Posting Kit */}
            <div
              style={{
                background: "#FFFFFF",
                border: "1.5px solid #E2E8F0",
                borderRadius: 14,
                padding: "32px 28px",
                boxShadow: "0 8px 30px rgba(15, 23, 42, 0.05)",
                position: "sticky",
                top: 100,
              }}
            >
              <GateForm
                eyebrow="COMPLIMENTARY TEMPLATES"
                title="Download Pre-Formatted Legal Job Posting Package"
                intro={`Customized Word (.docx) & PDF templates for ${city.name} boutique law firms.`}
                button="Email Me the Posting Kit"
                preset="kit"
                role="estate-planning-attorney"
                city={city.slug}
                review="daffner-law"
                fine="Delivered as editable Word and PDF files. Zero spam or unwanted calls."
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: Law Firm Recruiting Economics & ROI Comparison
          ========================================================================= */}
      <section
        id="roi"
        style={{
          background: "#FAF9F5",
          padding: "88px 0 96px",
          borderBottom: "1px solid #E2E8F0",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto 40px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(29, 78, 216, 0.08)",
                border: "1px solid rgba(29, 78, 216, 0.2)",
                borderRadius: "100px",
                padding: "5px 14px",
                fontSize: "0.78rem",
                fontWeight: 700,
                color: "#1D4ED8",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: "12px",
              }}
            >
              STEP 04 · ECONOMICS &amp; EFFICIENCY
            </div>
            <h2
              style={{
                fontSize: "clamp(2rem, 3.2vw, 2.6rem)",
                fontWeight: 700,
                color: "#08142A",
                margin: "0 0 12px",
                fontFamily: "var(--font-serif, Georgia, serif)",
                lineHeight: 1.2,
              }}
            >
              Why Top Texas Firms Choose Orion Over{" "}
              <span className="serif-accent" style={{ color: "#1D4ED8", fontStyle: "italic" }}>
                Public Job Boards
              </span>
            </h2>
            <p style={{ margin: 0, color: "#64748B", fontSize: "1.05rem", lineHeight: 1.6 }}>
              The hidden billable cost of job boards vs. dedicated contingency lateral legal recruiting.
            </p>
          </div>

          <div className="wtp-roi-grid">
            <div style={{ background: "#FFFFFF", border: "1.5px solid #FECDD3", borderRadius: 14, padding: "30px 26px", boxShadow: "0 4px 20px rgba(8, 20, 42, 0.03)" }}>
              <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#E11D48", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Public Job Boards
              </span>
              <div style={{ fontSize: "2rem", fontWeight: 800, color: "#9F1239", margin: "10px 0 6px", fontFamily: "var(--font-serif, Georgia, serif)" }}>
                $500–$1,500+
              </div>
              <div style={{ fontWeight: 700, color: "#08142A", fontSize: "1.05rem", marginBottom: 8 }}>
                Upfront Ad Spend + Lost Billables
              </div>
              <p style={{ fontSize: "0.9rem", color: "#64748B", lineHeight: 1.6, margin: 0 }}>
                Partners spend 15–20 billable hours ($5,000+ opportunity cost) reviewing hundreds of unqualified resumes, out-of-state candidates, and recruiters pitching unauthorized profiles.
              </p>
            </div>

            <div style={{ background: "#FFFFFF", border: "1.5px solid #CBD5E1", borderRadius: 14, padding: "30px 26px", boxShadow: "0 4px 20px rgba(8, 20, 42, 0.03)" }}>
              <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Average Time to Hire
              </span>
              <div style={{ fontSize: "2rem", fontWeight: 800, color: "#08142A", margin: "10px 0 6px", fontFamily: "var(--font-serif, Georgia, serif)" }}>
                60–90 Days
              </div>
              <div style={{ fontWeight: 700, color: "#08142A", fontSize: "1.05rem", marginBottom: 8 }}>
                Open Seat Production Void
              </div>
              <p style={{ fontSize: "0.9rem", color: "#64748B", lineHeight: 1.6, margin: 0 }}>
                Prolonged vacancies burden remaining partners, delay client filings, and result in substantial lost firm fee revenue while waiting for viable applicants.
              </p>
            </div>

            <div style={{ background: "#F0FDF4", border: "1.5px solid #86EFAC", borderRadius: 14, padding: "30px 26px", boxShadow: "0 4px 20px rgba(8, 20, 42, 0.03)" }}>
              <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#15803D", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Orion Contingency Model
              </span>
              <div style={{ fontSize: "2rem", fontWeight: 800, color: "#166534", margin: "10px 0 6px", fontFamily: "var(--font-serif, Georgia, serif)" }}>
                $0 Upfront
              </div>
              <div style={{ fontWeight: 700, color: "#14532D", fontSize: "1.05rem", marginBottom: 8 }}>
                23% Fee Only If You Hire
              </div>
              <p style={{ fontSize: "0.9rem", color: "#166534", lineHeight: 1.6, margin: 0 }}>
                Curated, pre-screened candidate dossiers delivered in days. No upfront cost, non-exclusive agreement, and backed by a 90-day replacement warranty.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: Closing Midnight Navy Executive CTA
          ========================================================================= */}
      <section
        style={{
          position: "relative",
          background: "#08142A",
          color: "#FFFFFF",
          padding: "96px 0 108px",
          borderTop: "1px solid rgba(255, 255, 255, 0.12)",
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
              border: "1px solid rgba(96, 165, 250, 0.35)",
              borderRadius: "100px",
              padding: "5px 14px",
              fontSize: "0.78rem",
              fontWeight: 600,
              color: "#93C5FD",
              marginBottom: "18px",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            Executive Talent Sourcing · {city.name.toUpperCase()}
          </div>

          {/* Explicit color: #FFFFFF so it never inherits dark ink */}
          <h2
            style={{
              fontSize: "clamp(2rem, 3.4vw, 2.75rem)",
              fontWeight: 700,
              color: "#FFFFFF",
              margin: "0 0 18px",
              fontFamily: "var(--font-serif, Georgia, serif)",
              lineHeight: 1.18,
            }}
          >
            See {city.name} legal talent{" "}
            <span className="serif-accent" style={{ color: "#60A5FA", fontStyle: "italic" }}>
              before you pay to post.
            </span>
          </h2>

          <p
            style={{
              color: "#CBD5E1",
              fontSize: "1.08rem",
              lineHeight: 1.6,
              margin: "0 0 34px",
            }}
          >
            Access confidential lateral attorney and paralegal dossiers today. Zero retainer, non-exclusive terms, and our 23% fee is payable only if you decide to hire.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap", marginBottom: "36px" }}>
            <Link
              href={`/find-candidates#city=${city.slug}`}
              style={{
                background: "#1D4ED8",
                color: "#FFFFFF",
                padding: "13px 28px",
                borderRadius: 7,
                fontWeight: 600,
                fontSize: "0.95rem",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                boxShadow: "0 4px 14px rgba(29, 78, 216, 0.4)",
              }}
            >
              Browse {city.name} Candidates ({screenedCount}) →
            </Link>
            <Link
              href="/submit-job"
              style={{
                background: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.22)",
                color: "#FFFFFF",
                padding: "13px 24px",
                borderRadius: 7,
                fontWeight: 600,
                fontSize: "0.95rem",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              Send Mandate to Justin →
            </Link>
          </div>

          <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.12)", paddingTop: "20px", fontSize: "0.85rem", color: "#94A3B8" }}>
            Zero upfront retainer · 23% contingency fee only upon hire · 90-day replacement guarantee
          </div>
        </div>
      </section>
    </div>
  );
}
