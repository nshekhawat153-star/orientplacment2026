"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DATA } from "@/data";
import { Mark } from "@/components/Mark";
import { TrustLine } from "@/components/Rating";
import { JobCard } from "@/components/JobCard";
import { GateForm } from "@/components/GateForm";

export function BestFirmsClient({
  cityParam,
}: {
  cityParam: string;
}) {
  const city = DATA.cities.find((c) => c.slug === cityParam);

  const [currentPractice, setCurrentPractice] = useState<string>("All");

  if (!city) {
    notFound();
  }

  const firms = DATA.bestFirms[city.slug] || [];
  const criteria = DATA.bestFirmsCriteria || [];

  const practices = ["All", ...Array.from(new Set(firms.map((f) => f.practice)))];

  const filteredFirms = firms
    .filter((f) => currentPractice === "All" || f.practice === currentPractice)
    .sort((a, b) => {
      const pDiff = practices.indexOf(a.practice) - practices.indexOf(b.practice);
      if (pDiff !== 0) return pDiff;
      const rA = parseFloat(a.reviews) || 0;
      const rB = parseFloat(b.reviews) || 0;
      return rB - rA;
    });

  const cityJobs = DATA.jobs.filter((j) => j.city === city.slug).slice(0, 3);

  return (
    <div style={{ background: "#FAF9F5", minHeight: "100vh", color: "#08142A" }}>
      <style>{`
        .bf-hero-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 48px;
          align-items: center;
        }
        .bf-tests-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 20px;
        }
        .bf-test-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          padding: 26px 22px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 2px 10px rgba(8, 20, 42, 0.03);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .bf-test-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(8, 20, 42, 0.06);
        }
        .bf-table-wrap {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(8, 20, 42, 0.04);
        }
        .bf-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 0.92rem;
        }
        .bf-table th {
          padding: 16px 20px;
          background: #F8FAFC;
          border-bottom: 2px solid #E2E8F0;
          color: #08142A;
          font-size: 0.82rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .bf-table td {
          padding: 18px 20px;
          border-bottom: 1px solid #F1F5F9;
        }
        .bf-split-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 48px;
          align-items: start;
        }
        @media (max-width: 960px) {
          .bf-hero-grid { grid-template-columns: 1fr; }
          .bf-split-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* 1. LUXURY DARK HERO WITH VIDEO & EDITORIAL SNAPSHOT */}
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
          <div className="bf-hero-grid">
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
                Editorial Guide · {city.name.toUpperCase()}, {city.state.toUpperCase()}
              </div>

              <h1
                style={{
                  fontSize: "clamp(2.4rem, 4.4vw, 3.6rem)",
                  fontFamily: "var(--display)",
                  fontWeight: 500,
                  lineHeight: 1.15,
                  color: "#FFFFFF",
                  letterSpacing: "-0.02em",
                  margin: "0 0 16px",
                }}
              >
                Best small law firms to work for in <br />
                <span className="serif-accent" style={{ color: "#60A5FA", fontStyle: "italic" }}>{city.name}</span>
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
                Boutique and mid-size law firms in {city.name} that pass all five rigorous retention and compensation standards. Completely independent editorial rankings: zero firms can sponsor placement or pay to be listed.
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", alignItems: "center", marginBottom: "32px" }}>
                <Link
                  href={`/upload-resume#city=${city.slug}`}
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
                  Upload Resume for Confidential Matching →
                </Link>
                <a
                  href="#firms"
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
                  View Qualifying Firms ↓
                </a>
              </div>

              <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.12)", paddingTop: 18 }}>
                <TrustLine />
              </div>
            </div>

            {/* Elevated City Editorial Snapshot Card */}
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
                  {city.name} Editorial Index
                </span>
                <span style={{ fontSize: "0.75rem", background: "rgba(37, 99, 235, 0.3)", color: "#93C5FD", padding: "3px 8px", borderRadius: 4, fontWeight: 600 }}>
                  Updated {DATA.asOf}
                </span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 18 }}>
                <div style={{ background: "rgba(255, 255, 255, 0.04)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: 10, padding: "14px 16px" }}>
                  <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#FFFFFF", fontFamily: "var(--font-serif, Georgia, serif)" }}>
                    {firms.length}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "rgba(255, 255, 255, 0.7)", marginTop: 2 }}>
                    Firms pass all 5 standards
                  </div>
                </div>

                <div style={{ background: "rgba(255, 255, 255, 0.04)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: 10, padding: "14px 16px" }}>
                  <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#60A5FA", fontFamily: "var(--font-serif, Georgia, serif)" }}>
                    {practices.length - 1}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "rgba(255, 255, 255, 0.7)", marginTop: 2 }}>
                    Practice areas represented
                  </div>
                </div>

                <div style={{ background: "rgba(255, 255, 255, 0.04)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: 10, padding: "14px 16px" }}>
                  <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#34D399", fontFamily: "var(--font-serif, Georgia, serif)" }}>
                    4.5+
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "rgba(255, 255, 255, 0.7)", marginTop: 2 }}>
                    Min. verified review score
                  </div>
                </div>

                <div style={{ background: "rgba(255, 255, 255, 0.04)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: 10, padding: "14px 16px" }}>
                  <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#93C5FD", fontFamily: "var(--font-serif, Georgia, serif)" }}>
                    $0
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "rgba(255, 255, 255, 0.7)", marginTop: 2 }}>
                    Sponsored listing fee
                  </div>
                </div>
              </div>

              <div style={{ fontSize: "0.82rem", color: "rgba(255, 255, 255, 0.7)", lineHeight: 1.5, borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: 12 }}>
                Every firm is evaluated strictly on verified associate retention, market base salary transparency, and client peer standing. Zero advertising accepted.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE FIVE EVALUATION TESTS */}
      <section style={{ maxWidth: "1200px", margin: "80px auto 0", padding: "0 24px" }}>
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
            Editorial Methodology
          </div>
          <h2 style={{ fontSize: "2.2rem", fontWeight: 700, color: "#08142A", margin: "0 0 10px", fontFamily: "var(--font-serif, Georgia, serif)" }}>
            The Five Tests Every Listed Firm Must Pass
          </h2>
          <p style={{ margin: 0, color: "#64748B", fontSize: "1.02rem" }}>
            We evaluate small and mid-size law firms through the lens of lateral associate and partner career longevity.
          </p>
        </div>

        <div className="bf-tests-grid">
          {criteria.map(([title, desc]: [string, string], i: number) => (
            <div key={i} className="bf-test-card">
              <span style={{ fontFamily: "monospace", fontSize: "0.85rem", fontWeight: 800, color: "#1D4ED8", marginBottom: 10 }}>
                TEST 0{i + 1}
              </span>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#08142A", margin: "0 0 8px" }}>
                {title}
              </h3>
              <p style={{ fontSize: "0.88rem", color: "#64748B", lineHeight: 1.6, margin: 0 }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. PRACTICE FILTER & FIRM DIRECTORY */}
      <section style={{ maxWidth: "1200px", margin: "90px auto 0", padding: "0 24px" }} id="firms">
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
            Verified Boutique Directory
          </div>
          <h2 style={{ fontSize: "2.2rem", fontWeight: 700, color: "#08142A", margin: "0 0 10px", fontFamily: "var(--font-serif, Georgia, serif)" }}>
            {city.name} Boutique Firms Meeting All 5 Standards
          </h2>
          <p style={{ margin: 0, color: "#64748B", fontSize: "1.02rem" }}>
            Firm descriptors and practice parameters shown. Firm identities are revealed upon mutual candidate authorization.
          </p>
        </div>

        {/* Practice Filter Pills */}
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
          {practices.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setCurrentPractice(p)}
              style={{
                padding: "8px 18px",
                borderRadius: 7,
                fontSize: "0.9rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.15s ease",
                background: currentPractice === p ? "#08142A" : "#FFFFFF",
                color: currentPractice === p ? "#FFFFFF" : "#475569",
                border: `1.5px solid ${currentPractice === p ? "#08142A" : "#E2E8F0"}`,
                boxShadow: currentPractice === p ? "0 2px 8px rgba(8, 20, 42, 0.2)" : "none",
              }}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Directory Listings Table */}
        <div className="bf-table-wrap">
          <div style={{ overflowX: "auto" }}>
            <table className="bf-table">
              <thead>
                <tr>
                  <th>Firm Descriptor</th>
                  <th>Practice Area</th>
                  <th>Attorney Count</th>
                  <th>Location / Submarket</th>
                  <th>Published Base Band</th>
                  <th>Work Arrangement</th>
                  <th style={{ textAlign: "right" }}>Review Score</th>
                </tr>
              </thead>
              <tbody>
                {filteredFirms.map((f, i) => (
                  <tr key={i} style={{ transition: "background 0.15s" }}>
                    <td style={{ fontWeight: 700, color: "#08142A" }}>
                      {f.desc}
                    </td>
                    <td style={{ color: "#1D4ED8", fontWeight: 600 }}>
                      {f.practice}
                    </td>
                    <td style={{ color: "#475569" }}>
                      {f.size}
                    </td>
                    <td style={{ color: "#475569" }}>
                      {f.area}
                    </td>
                    <td style={{ fontFamily: "monospace", fontWeight: 700, color: "#08142A" }}>
                      {f.pay}
                    </td>
                    <td style={{ color: "#475569" }}>
                      {f.mode}
                    </td>
                    <td style={{ textAlign: "right", color: "#059669", fontWeight: 700 }}>
                      ★ {f.reviews}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. CURRENT ACTIVE ROLES IN CITY */}
      <section style={{ maxWidth: "1200px", margin: "90px auto 0", padding: "0 24px" }}>
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
              Verified Openings
            </div>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 700, color: "#08142A", margin: 0, fontFamily: "var(--font-serif, Georgia, serif)" }}>
              Active Lateral Seats at Top {city.name} Firms
            </h2>
          </div>
          <Link
            href={`/jobs/estate-planning-attorney/${city.slug}`}
            style={{
              fontSize: "0.95rem",
              fontWeight: 600,
              color: "#1D4ED8",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <span>Explore All {city.name} Openings</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div style={{ display: "grid", gap: 20 }}>
          {cityJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </section>

      {/* 5. CONFIDENTIAL REPRESENTATION GATE FORM */}
      <section style={{ maxWidth: "1200px", margin: "90px auto 0", padding: "0 24px" }}>
        <div className="bf-split-grid">
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
                Confidential Placement
              </div>
              <h2 style={{ fontSize: "2.2rem", fontWeight: 700, color: "#08142A", margin: "0 0 12px", fontFamily: "var(--font-serif, Georgia, serif)" }}>
                Target Specific {city.name} Boutique Firms
              </h2>
              <p style={{ color: "#64748B", fontSize: "1.02rem", lineHeight: 1.6, margin: 0 }}>
                Interested in discreetly exploring opportunities with one of our indexed firms? Orion founder Justin connects senior associates and partners off-market without public exposure.
              </p>
            </div>

            <div style={{ display: "grid", gap: 14 }}>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ color: "#1D4ED8", fontWeight: 700 }}>✓</span>
                <span style={{ fontSize: "0.92rem", color: "#334155" }}>
                  <strong>Zero Blind Submissions:</strong> No firm ever sees your identity without your explicit, prior consent.
                </span>
              </div>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ color: "#1D4ED8", fontWeight: 700 }}>✓</span>
                <span style={{ fontSize: "0.92rem", color: "#334155" }}>
                  <strong>Compensation Disclosed:</strong> Exact base pay, origination split, and partner track confirmed beforehand.
                </span>
              </div>
            </div>
          </div>

          <div style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 14, padding: "32px 28px", boxShadow: "0 4px 20px rgba(8, 20, 42, 0.04)" }}>
            <GateForm
              eyebrow="CONFIDENTIAL MATCH"
              title={`Connect With Top ${city.name} Firms`}
              audience="candidate"
              button="Explore Confidential Lateral Moves"
              reviewSlug="n-brown"
              city={city.slug}
              fine="Use a personal email. Your current law firm is never contacted under any circumstance."
              steps={[
                ["Immediate Profile Creation", `Your candidate profile is logged anonymously under an Orion ID.`, true],
                ["Within 24 Hours", `Justin reviews matching firms in ${city.name} and confirms pay bands.`],
                ["Prior Written Approval", "Only firms you explicitly approve receive your redacted credentials."],
              ]}
            />
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
            Executive Career Advancement
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
            Ready to evaluate top law firms in{" "}
            <span className="serif-accent" style={{ color: "#60A5FA", fontStyle: "italic" }}>
              {city.name}?
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
            Benchmark your pay or upload your resume confidentially to explore verified lateral seats.
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
              href="/salary-check"
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
              Check Your Pay First
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
