"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DATA, fmt, matchCandidates } from "@/data";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Mark } from "@/components/Mark";
import { TrustLine } from "@/components/Rating";
import { ShortlistDeck } from "@/components/ShortlistDeck";
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
  const bands = DATA.bands[city.slug] || {};

  const rolesToShow = [
    "estate-planning-attorney",
    "litigation-attorney",
    "estate-planning-paralegal",
    "legal-assistant",
  ];

  return (
    <div className="where-to-post-page">
      {/* 1. LUXURY HERO WITH VIDEO & SHORTLIST DECK */}
      <section className="emp-luxury-hero-sec wtp-luxury-hero" aria-labelledby="wtp-hero-h1">
        <div className="emp-hero-video-wrap" aria-hidden="true">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="emp-hero-video"
          >
            <source src="/media/splash.mp4" type="video/mp4" />
          </video>
          <div className="emp-hero-overlay" />
          <div className="emp-hero-glow" />
        </div>

        <div className="wrap emp-hero-content" style={{ maxWidth: 900 }}>
          <div className="emp-hero-badge-wrap">
            <div className="badge-capsule">
              <span className="badge-dot" />
              <span>LEGAL JOB BOARD GUIDE · {city.name.toUpperCase()}, {city.state.toUpperCase()}</span>
            </div>
          </div>

          <h1 id="wtp-hero-h1" className="emp-hero-h1">
            Where to post a legal job in <span className="serif-accent">{city.name}</span>
          </h1>

          <p className="emp-hero-lead">
            Six legal recruitment platforms compared on cost, candidate quality, and time to first applicant. Or review pre-screened {city.name} legal talent before paying up to $500+ for job postings.
          </p>

          <div className="emp-reassurance-row" style={{ marginBottom: 32 }}>
            <div className="emp-reassurance-item">
              <span className="check" aria-hidden="true">✓</span>
              <span>Objective price &amp; audience breakdown</span>
            </div>
            <div className="emp-reassurance-item">
              <span className="check" aria-hidden="true">✓</span>
              <span>Screened {city.name} candidates ready now</span>
            </div>
            <div className="emp-reassurance-item">
              <span className="check" aria-hidden="true">✓</span>
              <span>Zero retainer or upfront listing fee</span>
            </div>
          </div>

          <div className="emp-hero-actions" style={{ marginBottom: 32 }}>
            <Link className="btn-emp-primary" href={`/find-candidates#city=${city.slug}`}>
              <span>See {city.name} candidates</span>
              <span aria-hidden="true">→</span>
            </Link>
            <a className="btn-emp-ghost" href="#compare">
              <span>Compare the 6 job boards</span>
              <span aria-hidden="true">↓</span>
            </a>
          </div>

          {/* Elevated Candidate Deck Container */}
          <div style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 14, padding: "28px 24px", boxShadow: "0 20px 48px -12px rgba(0, 0, 0, 0.45)", color: "#08142A", textAlign: "left" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderBottom: "1px solid #E2E8F0", paddingBottom: 12, marginBottom: 18 }}>
              <span style={{ fontFamily: "var(--display)", fontSize: 18, color: "#08142A", fontWeight: 500 }}>
                Active Pre-Screened Talent in {city.name}
              </span>
              <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "#1D4ED8", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                NO POSTING FEE
              </span>
            </div>
            <ShortlistDeck candidateIds={["EP-TX-0412", "EP-TX-0388", "EP-TX-0451"]} />
          </div>
        </div>
      </section>

      {/* 2. JOB BOARDS COMPARISON MATRIX */}
      <section className="emp-process-sec" id="compare" style={{ background: "#FAF9F5", padding: "96px 0 108px", borderBottom: "1px solid #EAE7DC" }}>
        <div className="wrap">
          <div className="sec-head" style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 40px" }}>
            <span className="eyebrow" style={{ color: "#1D4ED8", fontWeight: 700 }}>HEAD-TO-HEAD MATRIX</span>
            <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(28px, 3.6vw, 42px)", color: "#08142A", margin: "10px 0 14px" }}>
              Six places to post legal jobs, side by side
            </h2>
            <p style={{ color: "#64748B", fontSize: 16 }}>
              Select your target role to highlight the highest-converting recruitment channels.
            </p>
          </div>

          {/* Filter Chips */}
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
            <button
              type="button"
              onClick={() => setSeatFilter("all")}
              style={{
                padding: "8px 18px",
                borderRadius: 999,
                fontSize: 13.5,
                fontWeight: 600,
                cursor: "pointer",
                background: seatFilter === "all" ? "#1D4ED8" : "#FFFFFF",
                color: seatFilter === "all" ? "#FFFFFF" : "#334155",
                border: `1.5px solid ${seatFilter === "all" ? "#1D4ED8" : "#E2E8F0"}`,
              }}
            >
              Any seat
            </button>
            <button
              type="button"
              onClick={() => setSeatFilter("attorney")}
              style={{
                padding: "8px 18px",
                borderRadius: 999,
                fontSize: 13.5,
                fontWeight: 600,
                cursor: "pointer",
                background: seatFilter === "attorney" ? "#1D4ED8" : "#FFFFFF",
                color: seatFilter === "attorney" ? "#FFFFFF" : "#334155",
                border: `1.5px solid ${seatFilter === "attorney" ? "#1D4ED8" : "#E2E8F0"}`,
              }}
            >
              Attorney
            </button>
            <button
              type="button"
              onClick={() => setSeatFilter("paralegal")}
              style={{
                padding: "8px 18px",
                borderRadius: 999,
                fontSize: 13.5,
                fontWeight: 600,
                cursor: "pointer",
                background: seatFilter === "paralegal" ? "#1D4ED8" : "#FFFFFF",
                color: seatFilter === "paralegal" ? "#FFFFFF" : "#334155",
                border: `1.5px solid ${seatFilter === "paralegal" ? "#1D4ED8" : "#E2E8F0"}`,
              }}
            >
              Paralegal
            </button>
            <button
              type="button"
              onClick={() => setSeatFilter("staff")}
              style={{
                padding: "8px 18px",
                borderRadius: 999,
                fontSize: 13.5,
                fontWeight: 600,
                cursor: "pointer",
                background: seatFilter === "staff" ? "#1D4ED8" : "#FFFFFF",
                color: seatFilter === "staff" ? "#FFFFFF" : "#334155",
                border: `1.5px solid ${seatFilter === "staff" ? "#1D4ED8" : "#E2E8F0"}`,
              }}
            >
              Legal assistant
            </button>
          </div>

          {/* Comparison Table */}
          <div style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 14, overflow: "hidden", boxShadow: "0 4px 16px rgba(15, 23, 42, 0.04)" }}>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: 14 }}>
                <thead>
                  <tr style={{ background: "#F8FAFC", borderBottom: "1.5px solid #E2E8F0", color: "#64748B", fontFamily: "var(--mono)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    <th style={{ padding: "16px 20px" }}>Channel</th>
                    <th style={{ padding: "16px 20px" }}>Standard Cost</th>
                    <th style={{ padding: "16px 20px" }}>Audience &amp; Reach</th>
                    <th style={{ padding: "16px 20px" }}>Time to First Applicant</th>
                    <th style={{ padding: "16px 20px" }}>Best Used For</th>
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
                          borderBottom: "1px solid #F1F5F9",
                          background: isHit ? "rgba(29, 78, 216, 0.04)" : "transparent",
                          opacity: isDim ? 0.45 : 1,
                        }}
                      >
                        <td style={{ padding: "18px 20px", fontWeight: 600, color: isHit ? "#1D4ED8" : "#08142A" }}>
                          {p.name}
                        </td>
                        <td style={{ padding: "18px 20px", color: "#475569" }}>
                          {p.cost}
                        </td>
                        <td style={{ padding: "18px 20px", color: "#334155" }}>
                          {p.reach}
                        </td>
                        <td style={{ padding: "18px 20px", color: "#059669", fontWeight: 600 }}>
                          {p.firstApplicant}
                        </td>
                        <td style={{ padding: "18px 20px", color: "#475569" }}>
                          {p.bestFor}
                        </td>
                      </tr>
                    );
                  })}
                  <tr style={{ background: "rgba(29, 78, 216, 0.08)", borderTop: "2px solid #1D4ED8" }}>
                    <td style={{ padding: "18px 20px", fontWeight: 700, color: "#1D4ED8" }}>
                      Orion Placement
                    </td>
                    <td style={{ padding: "18px 20px", fontWeight: 600, color: "#059669" }}>
                      $0 upfront · Pay only if you hire
                    </td>
                    <td style={{ padding: "18px 20px", color: "#08142A", fontWeight: 500 }}>
                      {screenedCount} screened {city.name} legal candidates
                    </td>
                    <td style={{ padding: "18px 20px", color: "#1D4ED8", fontWeight: 700 }}>
                      Dossiers today
                    </td>
                    <td style={{ padding: "18px 20px", fontWeight: 600 }}>
                      <Link href={`/find-candidates#city=${city.slug}`} style={{ color: "#1D4ED8", textDecoration: "underline" }}>
                        View matching candidates
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ACTIVE CANDIDATES READY NOW */}
      <section className="emp-process-sec" id="candidates" style={{ background: "#FFFFFF", padding: "96px 0 108px" }}>
        <div className="wrap">
          <div className="sec-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 36, flexWrap: "wrap", gap: 14 }}>
            <div>
              <span className="eyebrow" style={{ color: "#1D4ED8", fontWeight: 700 }}>ACTIVE {city.name.toUpperCase()} TALENT</span>
              <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(26px, 3.4vw, 38px)", color: "#08142A", margin: "8px 0 0" }}>
                Before you pay to post: {city.name} candidates looking now
              </h2>
            </div>
            <Link
              className="more link-arrow hide-sm"
              href="/submit-job"
              style={{ fontSize: 14, fontWeight: 600, color: "#1D4ED8", textDecoration: "none" }}
            >
              <span>Or paste your posting text</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="cards" style={{ display: "grid", gap: 20 }}>
            {candidates.map((candidate) => candidate && (
              <CandidateCard key={candidate.id} candidate={candidate} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. POSTING CHECKLIST & HIRING KIT GATE */}
      <section className="emp-process-sec" id="checklist" style={{ background: "#FAF9F5", padding: "96px 0 108px", borderTop: "1px solid #E2E8F0", borderBottom: "1px solid #EAE7DC" }}>
        <div className="wrap split">
          <div>
            <div className="sec-head">
              <span className="eyebrow" style={{ color: "#1D4ED8", fontWeight: 700 }}>POSTING OPTIMIZATION</span>
              <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(28px, 3.6vw, 40px)", color: "#08142A", margin: "10px 0 14px" }}>
                Six elements every successful legal job posting requires
              </h2>
              <p style={{ color: "#64748B", fontSize: 16, lineHeight: 1.6 }}>
                Law firm postings with transparent details attract 3x more qualified lateral associate and senior paralegal applicants.
              </p>
            </div>
            <div style={{ display: "grid", gap: 12, marginTop: 24 }}>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ color: "#1D4ED8", fontWeight: 700 }}>1.</span>
                <span style={{ fontSize: 14, color: "#334155" }}>
                  <strong>Publish Base Salary Range:</strong> Stating the pay upfront filters unqualified applicants immediately.
                </span>
              </div>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ color: "#1D4ED8", fontWeight: 700 }}>2.</span>
                <span style={{ fontSize: 14, color: "#334155" }}>
                  <strong>Disclose Arrangement &amp; Location:</strong> State exact on-site vs hybrid days and office submarket.
                </span>
              </div>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ color: "#1D4ED8", fontWeight: 700 }}>3.</span>
                <span style={{ fontSize: 14, color: "#334155" }}>
                  <strong>Specific Practice Distribution:</strong> Break down probate, estate planning, or litigation percentages.
                </span>
              </div>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ color: "#1D4ED8", fontWeight: 700 }}>4.</span>
                <span style={{ fontSize: 14, color: "#334155" }}>
                  <strong>State Required Bar Standing:</strong> Specify Texas bar admission or reciprocal eligibility.
                </span>
              </div>
            </div>
          </div>

          <div id="kit-gate">
            <GateForm
              eyebrow="FREE DOWNLOAD"
              title="Download pre-formatted legal job posting templates"
              button="Email me the posting kit"
              preset="kit"
              role="estate-planning-attorney"
              city={city.slug}
              reviewSlug="daffner-law"
              fine="Delivered as an editable Word document and PDF. Zero spam."
            />
          </div>
        </div>
      </section>

      {/* 5. BOTTOM MIDNIGHT NAVY CTA */}
      <section className="emp-terms-dark-sec" style={{ background: "#08142A", padding: "100px 0 108px", textAlign: "center" }}>
        <div className="wrap" style={{ maxWidth: 760, margin: "0 auto" }}>
          <div className="badge-capsule" style={{ marginBottom: 18 }}>
            <span className="badge-dot" />
            <span>EXECUTIVE TALENT SOURCING</span>
          </div>
          <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(32px, 4.2vw, 48px)", color: "#FFFFFF", margin: "0 0 16px" }}>
            See {city.name} legal talent <span className="serif-accent" style={{ color: "#60A5FA" }}>before you pay to post.</span>
          </h2>
          <p style={{ color: "#CBD5E1", fontSize: 17, lineHeight: 1.6, marginBottom: 32 }}>
            Access confidential lateral attorney and paralegal dossiers. Pay 23% only if you decide to hire.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            <Link href={`/find-candidates#city=${city.slug}`} className="btn-emp-primary" style={{ padding: "14px 34px", fontSize: 16 }}>
              <span>View {city.name} candidates</span>
              <span aria-hidden="true">→</span>
            </Link>
            <Link href="/submit-job" className="btn-emp-ghost" style={{ padding: "14px 34px", fontSize: 16 }}>
              <span>Paste your job posting</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
