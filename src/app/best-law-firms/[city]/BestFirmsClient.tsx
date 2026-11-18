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
        .bf-tests-grid {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 16px;
        }
        .bf-jobs-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 20px;
        }
        .bf-test-card {
          background: #FFFFFF;
          border: 1.5px solid #E2E8F0;
          border-radius: 12px;
          padding: 22px 18px;
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
        @media (max-width: 1024px) {
          .bf-tests-grid { grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); }
          .bf-jobs-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 960px) {
          .bf-split-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* 1. LUXURY CENTERED HERO (NO CARD CLUTTER) */}
      <section
        style={{
          position: "relative",
          background: "radial-gradient(ellipse 90% 80% at 50% -20%, rgba(29, 78, 216, 0.28) 0%, rgba(8, 20, 42, 0.98) 75%, #08142A 100%)",
          color: "#FFFFFF",
          padding: "128px 0 84px",
          overflow: "hidden",
          textAlign: "center",
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
            opacity: 0.2,
            pointerEvents: "none",
            zIndex: 0,
          }}
        >
          <source src="/media/splash.mp4" type="video/mp4" />
        </video>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(8,20,42,0.85) 0%, rgba(8,20,42,0.96) 100%)",
            zIndex: 0,
          }}
        />

        <div style={{ maxWidth: "960px", margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1, textAlign: "center" }}>
          <div
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
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#60A5FA" }} />
            EDITORIAL RETENTION BENCHMARK · {city.name.toUpperCase()}, {city.state.toUpperCase()}
          </div>

          {/* Centered Display Heading - Prominent Executive Scale */}
          <h1
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
            Best small law firms to work for in{" "}
            <span className="serif-accent" style={{ color: "#60A5FA", fontStyle: "italic" }}>
              {city.name}
            </span>
          </h1>

          <p
            style={{
              fontSize: "clamp(18px, 1.8vw, 21px)",
              lineHeight: 1.65,
              color: "#CBD5E1",
              maxWidth: "780px",
              margin: "0 auto 34px",
              textAlign: "center",
              textShadow: "0 1px 8px rgba(0, 0, 0, 0.4)",
            }}
          >
            Boutique and mid-size law firms in {city.name} that pass all five rigorous retention and compensation standards. Completely independent editorial rankings: zero firms can sponsor placement or pay to be listed.
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 24,
              flexWrap: "wrap",
              marginBottom: 34,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "14.5px", color: "#E2E8F0" }}>
              <span style={{ color: "#60A5FA", fontWeight: 700 }}>✓</span>
              <span>Zero sponsored listings or paid placements</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "14.5px", color: "#E2E8F0" }}>
              <span style={{ color: "#60A5FA", fontWeight: 700 }}>✓</span>
              <span>5 objective associate retention benchmarks</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "14.5px", color: "#E2E8F0" }}>
              <span style={{ color: "#60A5FA", fontWeight: 700 }}>✓</span>
              <span>Confidential matching with zero current firm contact</span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: 14,
              marginBottom: 36,
            }}
          >
            <Link
              href={`/upload-resume#city=${city.slug}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
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
              <span>Upload Resume for Confidential Matching</span>
              <span aria-hidden="true">→</span>
            </Link>
            <a
              href="#firms"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.22)",
                color: "#FFFFFF",
                fontWeight: 600,
                fontSize: "16px",
                padding: "15px 28px",
                borderRadius: 7,
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
            >
              <span>View Qualifying Firms</span>
              <span aria-hidden="true">↓</span>
            </a>
          </div>

          <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.12)", paddingTop: 20, maxWidth: 640, margin: "0 auto" }}>
            <TrustLine />
          </div>
        </div>
      </section>

      {/* 2. THE FIVE EVALUATION TESTS */}
      <section style={{ maxWidth: "1200px", margin: "80px auto 0", padding: "0 24px" }}>
        <div style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto 40px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(29, 78, 216, 0.08)",
              border: "1px solid rgba(29, 78, 216, 0.2)",
              borderRadius: 100,
              padding: "5px 14px",
              fontSize: "0.78rem",
              fontWeight: 700,
              color: "#1D4ED8",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            EDITORIAL METHODOLOGY · 5 RETENTION PILLARS
          </div>
          <h2
            style={{
              fontFamily: "var(--font-serif, Georgia, serif)",
              fontSize: "clamp(2rem, 3.2vw, 2.6rem)",
              color: "#08142A",
              margin: "0 0 12px",
              fontWeight: 700,
              lineHeight: 1.2,
            }}
          >
            The Five Tests Every Listed Firm{" "}
            <span className="serif-accent" style={{ color: "#1D4ED8", fontStyle: "italic" }}>
              Must Pass
            </span>
          </h2>
          <p style={{ margin: 0, color: "#64748B", fontSize: "1.05rem", lineHeight: 1.6 }}>
            We evaluate small and mid-size law firms through the lens of lateral associate and partner career longevity. Zero sponsored listings or paid placements.
          </p>
        </div>

        <div className="bf-tests-grid">
          {criteria.map(([title, desc]: [string, string], i: number) => (
            <div key={i} className="bf-test-card">
              <span style={{ fontFamily: "monospace", fontSize: "0.82rem", fontWeight: 800, color: "#1D4ED8", marginBottom: 10 }}>
                TEST 0{i + 1}
              </span>
              <h3 style={{ fontSize: "1.08rem", fontWeight: 700, color: "#08142A", margin: "0 0 8px", lineHeight: 1.3 }}>
                {title}
              </h3>
              <p style={{ fontSize: "0.85rem", color: "#64748B", lineHeight: 1.5, margin: 0 }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. PRACTICE FILTER & FIRM DIRECTORY */}
      <section style={{ maxWidth: "1200px", margin: "90px auto 0", padding: "0 24px" }} id="firms">
        <div style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto 36px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(29, 78, 216, 0.08)",
              border: "1px solid rgba(29, 78, 216, 0.2)",
              borderRadius: 100,
              padding: "5px 14px",
              fontSize: "0.78rem",
              fontWeight: 700,
              color: "#1D4ED8",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            VERIFIED BOUTIQUE DIRECTORY
          </div>
          <h2
            style={{
              fontFamily: "var(--font-serif, Georgia, serif)",
              fontSize: "clamp(2rem, 3.2vw, 2.6rem)",
              color: "#08142A",
              margin: "0 0 12px",
              fontWeight: 700,
              lineHeight: 1.2,
            }}
          >
            {city.name} Boutique Firms{" "}
            <span className="serif-accent" style={{ color: "#1D4ED8", fontStyle: "italic" }}>
              Meeting All 5 Standards
            </span>
          </h2>
          <p style={{ margin: 0, color: "#64748B", fontSize: "1.05rem", lineHeight: 1.6 }}>
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
        <div style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto 36px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(29, 78, 216, 0.08)",
              border: "1px solid rgba(29, 78, 216, 0.2)",
              borderRadius: 100,
              padding: "5px 14px",
              fontSize: "0.78rem",
              fontWeight: 700,
              color: "#1D4ED8",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            VERIFIED OPENINGS · {city.name.toUpperCase()}
          </div>
          <h2
            style={{
              fontFamily: "var(--font-serif, Georgia, serif)",
              fontSize: "clamp(2rem, 3.2vw, 2.6rem)",
              color: "#08142A",
              margin: "0 0 12px",
              fontWeight: 700,
              lineHeight: 1.2,
            }}
          >
            Active Lateral Seats at Top{" "}
            <span className="serif-accent" style={{ color: "#1D4ED8", fontStyle: "italic" }}>
              {city.name} Firms
            </span>
          </h2>
          <p style={{ color: "#64748B", fontSize: "1.05rem", lineHeight: 1.6, margin: "0 0 16px" }}>
            Live, confirmed opportunities at boutique and mid-size firms passing our retention benchmark.
          </p>
          <div>
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
        </div>

        <div className="bf-jobs-grid">
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
                  gap: 8,
                  background: "rgba(29, 78, 216, 0.08)",
                  border: "1px solid rgba(29, 78, 216, 0.2)",
                  borderRadius: 100,
                  padding: "5px 14px",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  color: "#1D4ED8",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  marginBottom: 12,
                }}
              >
                CONFIDENTIAL PLACEMENT
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-serif, Georgia, serif)",
                  fontSize: "clamp(2rem, 3.2vw, 2.6rem)",
                  color: "#08142A",
                  margin: "0 0 12px",
                  fontWeight: 700,
                  lineHeight: 1.2,
                }}
              >
                Target Specific{" "}
                <span className="serif-accent" style={{ color: "#1D4ED8", fontStyle: "italic" }}>
                  {city.name} Boutique Firms
                </span>
              </h2>
              <p style={{ color: "#64748B", fontSize: "1.05rem", lineHeight: 1.6, margin: 0 }}>
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
