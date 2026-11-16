"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DATA, fmt, matchCandidates, trust } from "@/data";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Mark } from "@/components/Mark";
import { TrustLine } from "@/components/Rating";
import { CandidateCard } from "@/components/CandidateCard";
import { GateForm } from "@/components/GateForm";

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
    <div style={{ background: "#FAF9F5", minHeight: "100vh", color: "#08142A" }}>
      <style>{`
        .wtp-table-wrap {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
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
        .wtp-roi-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 20px;
        }
        @media (max-width: 960px) {
          .wtp-split-grid { grid-template-columns: 1fr; }
          .wtp-checklist-grid { grid-template-columns: 1fr; }
          .wtp-roi-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* 1. LUXURY HERO WITH VIDEO & EXECUTIVE SNAPSHOT */}
      <section
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

        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
          <div style={{ marginBottom: 20 }}>
            <Breadcrumb
              crumbs={[
                { label: "Home", href: "/" },
                { label: "Locations", href: "/jobs" },
                { label: city.name, href: `/locations/texas/${city.slug.replace("-tx", "")}` },
                { label: "Where to Post", current: true },
              ]}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "48px", alignItems: "center" }}>
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "rgba(29, 78, 216, 0.15)",
                  border: "1px solid rgba(96, 165, 250, 0.3)",
                  borderRadius: "100px",
                  padding: "6px 14px",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "#93C5FD",
                  marginBottom: "18px",
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#60A5FA" }} />
                Legal Recruitment Benchmark · {city.name.toUpperCase()}, {city.state.toUpperCase()}
              </div>

              <h1
                style={{
                  fontSize: "clamp(2.4rem, 4.4vw, 3.6rem)",
                  fontFamily: "var(--font-serif, 'Playfair Display', Georgia, serif)",
                  fontWeight: 700,
                  lineHeight: 1.15,
                  color: "#FFFFFF",
                  letterSpacing: "-0.02em",
                  margin: "0 0 16px",
                }}
              >
                Where to post a legal job in <br />
                <span style={{ color: "#93C5FD", fontStyle: "italic" }}>{city.name}</span>
              </h1>

              <p
                style={{
                  fontSize: "1.12rem",
                  lineHeight: 1.6,
                  color: "rgba(255, 255, 255, 0.82)",
                  maxWidth: "580px",
                  margin: "0 0 28px",
                }}
              >
                An objective breakdown of six legal recruitment channels across {city.name} — comparing upfront posting costs, candidate reach, and time to first applicant. Or review pre-screened {city.name} legal talent before committing $500+ to public boards.
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", alignItems: "center", marginBottom: "32px" }}>
                <Link
                  href={`/find-candidates#city=${city.slug}`}
                  style={{
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
                  See {city.name} Candidates ({screenedCount}) →
                </Link>
                <a
                  href="#compare"
                  style={{
                    background: "rgba(255, 255, 255, 0.08)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    color: "#FFFFFF",
                    padding: "13px 22px",
                    borderRadius: 7,
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                  }}
                >
                  Compare All 6 Job Boards ↓
                </a>
              </div>

              <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.12)", paddingTop: 18 }}>
                <TrustLine />
              </div>
            </div>

            {/* Elevated Pipeline Metrics Banner Card */}
            <div
              style={{
                background: "rgba(15, 23, 42, 0.75)",
                backdropFilter: "blur(14px)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                borderRadius: 14,
                padding: "28px 24px",
                boxShadow: "0 20px 48px rgba(0, 0, 0, 0.45)",
                color: "#FFFFFF",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderBottom: "1px solid rgba(255, 255, 255, 0.1)", paddingBottom: 12, marginBottom: 18 }}>
                <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#60A5FA", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  {city.name} Recruitment Benchmark
                </span>
                <span style={{ fontSize: "0.75rem", background: "rgba(37, 99, 235, 0.3)", color: "#93C5FD", padding: "3px 8px", borderRadius: 4, fontWeight: 600 }}>
                  v2026 Edition
                </span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 18 }}>
                <div style={{ background: "rgba(255, 255, 255, 0.04)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: 10, padding: "14px 16px" }}>
                  <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#FFFFFF", fontFamily: "var(--font-serif, Georgia, serif)" }}>
                    6
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "rgba(255, 255, 255, 0.7)", marginTop: 2 }}>
                    Major channels evaluated
                  </div>
                </div>

                <div style={{ background: "rgba(255, 255, 255, 0.04)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: 10, padding: "14px 16px" }}>
                  <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#60A5FA", fontFamily: "var(--font-serif, Georgia, serif)" }}>
                    $250–$500
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "rgba(255, 255, 255, 0.7)", marginTop: 2 }}>
                    Average board ad fee
                  </div>
                </div>

                <div style={{ background: "rgba(255, 255, 255, 0.04)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: 10, padding: "14px 16px" }}>
                  <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#34D399", fontFamily: "var(--font-serif, Georgia, serif)" }}>
                    {screenedCount}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "rgba(255, 255, 255, 0.7)", marginTop: 2 }}>
                    Pre-screened {city.name} talent
                  </div>
                </div>

                <div style={{ background: "rgba(255, 255, 255, 0.04)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: 10, padding: "14px 16px" }}>
                  <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#93C5FD", fontFamily: "var(--font-serif, Georgia, serif)" }}>
                    $0
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "rgba(255, 255, 255, 0.7)", marginTop: 2 }}>
                    Orion upfront retainer
                  </div>
                </div>
              </div>

              <div style={{ fontSize: "0.82rem", color: "rgba(255, 255, 255, 0.7)", lineHeight: 1.5, borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: 12 }}>
                Skip the high upfront listing fees and unqualified inbox spam. Orion delivers redacted candidate dossiers today with zero cost until you hire.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HEAD-TO-HEAD MATRIX */}
      <section id="compare" style={{ maxWidth: "1200px", margin: "80px auto 0", padding: "0 24px" }}>
        <div style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto 36px" }}>
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
            Side-by-Side Analysis
          </div>
          <h2 style={{ fontSize: "2.2rem", fontWeight: 700, color: "#08142A", margin: "0 0 10px", fontFamily: "var(--font-serif, Georgia, serif)" }}>
            Six Places to Post Legal Jobs, Side by Side
          </h2>
          <p style={{ margin: 0, color: "#64748B", fontSize: "1.02rem" }}>
            Filter by target role to highlight the highest-converting recruitment channels in {city.name}.
          </p>
        </div>

        {/* Filter Pills */}
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 10, marginBottom: 28 }}>
          {[
            { id: "all", label: "All Target Roles" },
            { id: "attorney", label: "Lateral Attorneys" },
            { id: "paralegal", label: "Senior Paralegals" },
            { id: "staff", label: "Legal Assistants & Staff" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSeatFilter(tab.id)}
              style={{
                padding: "9px 20px",
                borderRadius: 7,
                fontSize: "0.9rem",
                fontWeight: 600,
                cursor: "pointer",
                background: seatFilter === tab.id ? "#08142A" : "#FFFFFF",
                color: seatFilter === tab.id ? "#FFFFFF" : "#475569",
                border: `1.5px solid ${seatFilter === tab.id ? "#08142A" : "#E2E8F0"}`,
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
          <div style={{ overflowX: "auto" }}>
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
                        background: isHit ? "#F0FDF4" : "transparent",
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
      </section>

      {/* 3. ACTIVE CANDIDATES READY NOW */}
      <section style={{ maxWidth: "1200px", margin: "90px auto 0", padding: "0 24px" }} id="candidates">
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
              Active {city.name.toUpperCase()} Talent Pool
            </div>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 700, color: "#08142A", margin: 0, fontFamily: "var(--font-serif, Georgia, serif)" }}>
              Before You Pay to Post: {city.name} Candidates Looking Now
            </h2>
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

        <div style={{ display: "grid", gap: 20 }}>
          {candidates.map((candidate) => candidate && (
            <CandidateCard key={candidate.id} candidate={candidate} />
          ))}
        </div>

        <div style={{ marginTop: 24, padding: "18px 24px", background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 10, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontSize: "0.92rem", color: "#475569" }}>
            Looking for a specific practice area or seniority in {city.name}?
          </span>
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
      </section>

      {/* 4. THE 6 ESSENTIAL ELEMENTS OF A HIGH-CONVERTING POSTING */}
      <section style={{ maxWidth: "1200px", margin: "90px auto 0", padding: "0 24px" }} id="checklist">
        <div className="wtp-split-grid">
          <div>
            <div style={{ marginBottom: 28 }}>
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
                Posting Architecture
              </div>
              <h2 style={{ fontSize: "2.2rem", fontWeight: 700, color: "#08142A", margin: "0 0 12px", fontFamily: "var(--font-serif, Georgia, serif)" }}>
                Six Elements Every High-Converting Legal Posting Requires
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
                    background: "#FFFFFF",
                    border: "1px solid #E2E8F0",
                    borderRadius: 10,
                    padding: "20px 18px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 8 }}>
                    <span style={{ fontFamily: "monospace", fontSize: "0.85rem", fontWeight: 800, color: "#1D4ED8" }}>
                      {item.num}
                    </span>
                    <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "#08142A", margin: 0 }}>
                      {item.title}
                    </h4>
                  </div>
                  <p style={{ fontSize: "0.85rem", color: "#64748B", lineHeight: 1.5, margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: GateForm for Legal Posting Kit */}
          <div style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 14, padding: "32px 28px", boxShadow: "0 4px 20px rgba(8, 20, 42, 0.04)" }}>
            <GateForm
              eyebrow="COMPLIMENTARY TEMPLATES"
              title="Download Pre-Formatted Legal Job Posting Package"
              intro={`Customized Word (.docx) & PDF templates for ${city.name} boutique law firms.`}
              button="Email Me the Posting Kit"
              preset="kit"
              role="estate-planning-attorney"
              city={city.slug}
              reviewSlug="daffner-law"
              fine="Delivered as editable Word and PDF files. Zero spam or unwanted calls."
            />
          </div>
        </div>
      </section>

      {/* 5. LAW FIRM RECRUITING ROI COMPARISON */}
      <section style={{ maxWidth: "1200px", margin: "90px auto 0", padding: "0 24px" }}>
        <div style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto 36px" }}>
          <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#1D4ED8", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Economics &amp; Efficiency
          </span>
          <h2 style={{ fontSize: "2.2rem", fontWeight: 700, color: "#08142A", margin: "8px 0 10px", fontFamily: "var(--font-serif, Georgia, serif)" }}>
            Why Top Texas Firms Choose Orion Over Public Boards
          </h2>
          <p style={{ margin: 0, color: "#64748B", fontSize: "1.02rem" }}>
            The hidden cost of job boards vs. dedicated contingency lateral legal recruiting.
          </p>
        </div>

        <div className="wtp-roi-grid">
          <div style={{ background: "#FFFFFF", border: "1.5px solid #FECDD3", borderRadius: 12, padding: "28px 24px" }}>
            <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#E11D48", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Public Job Boards
            </span>
            <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#9F1239", margin: "10px 0 6px", fontFamily: "var(--font-serif, Georgia, serif)" }}>
              $500–$1,500+
            </div>
            <div style={{ fontWeight: 700, color: "#08142A", fontSize: "1rem", marginBottom: 8 }}>
              Upfront Ad Spend + Lost Billables
            </div>
            <p style={{ fontSize: "0.88rem", color: "#64748B", lineHeight: 1.6, margin: 0 }}>
              Partners spend 15–20 billable hours ($5,000+ opportunity cost) reviewing hundreds of unqualified resumes, out-of-state candidates, and recruiters pitching unauthorized profiles.
            </p>
          </div>

          <div style={{ background: "#FFFFFF", border: "1.5px solid #CBD5E1", borderRadius: 12, padding: "28px 24px" }}>
            <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Average Time to Hire
            </span>
            <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#08142A", margin: "10px 0 6px", fontFamily: "var(--font-serif, Georgia, serif)" }}>
              60–90 Days
            </div>
            <div style={{ fontWeight: 700, color: "#08142A", fontSize: "1rem", marginBottom: 8 }}>
              Open Seat Production Void
            </div>
            <p style={{ fontSize: "0.88rem", color: "#64748B", lineHeight: 1.6, margin: 0 }}>
              Prolonged vacancies burden remaining partners, delay client filings, and result in substantial lost firm fee revenue while waiting for viable applicants.
            </p>
          </div>

          <div style={{ background: "#F0FDF4", border: "1.5px solid #86EFAC", borderRadius: 12, padding: "28px 24px" }}>
            <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#15803D", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Orion Contingency Model
            </span>
            <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#166534", margin: "10px 0 6px", fontFamily: "var(--font-serif, Georgia, serif)" }}>
              $0 Upfront
            </div>
            <div style={{ fontWeight: 700, color: "#14532D", fontSize: "1rem", marginBottom: 8 }}>
              23% Fee Only If You Hire
            </div>
            <p style={{ fontSize: "0.88rem", color: "#166534", lineHeight: 1.6, margin: 0 }}>
              Curated, pre-screened candidate dossiers delivered in days. No upfront cost, non-exclusive agreement, and backed by a 90-day replacement warranty.
            </p>
          </div>
        </div>
      </section>

      {/* 6. BOTTOM MIDNIGHT NAVY CTA */}
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
            Executive Talent Sourcing · {city.name.toUpperCase()}
          </div>

          <h2
            style={{
              fontSize: "2.4rem",
              fontWeight: 700,
              margin: "0 0 16px",
              fontFamily: "var(--font-serif, Georgia, serif)",
            }}
          >
            See {city.name} legal talent <span style={{ color: "#93C5FD", fontStyle: "italic" }}>before you pay to post.</span>
          </h2>

          <p
            style={{
              color: "rgba(255, 255, 255, 0.8)",
              fontSize: "1.08rem",
              lineHeight: 1.6,
              margin: "0 0 32px",
            }}
          >
            Access confidential lateral attorney and paralegal dossiers today. Zero retainer, non-exclusive terms, and our 23% fee is payable only if you decide to hire.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
            <Link
              href={`/find-candidates#city=${city.slug}`}
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
              Browse {city.name} Candidates ({screenedCount}) →
            </Link>
            <Link
              href="/submit-job"
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
              Paste Your Job Mandate
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
