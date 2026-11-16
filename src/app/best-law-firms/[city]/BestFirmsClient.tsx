"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DATA } from "@/data";
import { Breadcrumb } from "@/components/Breadcrumb";
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
    <div className="best-firms-page">
      {/* 1. LUXURY HERO WITH VIDEO & 5-TEST STANDARDS */}
      <section className="emp-luxury-hero-sec best-firms-hero" aria-labelledby="bf-hero-h1">
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
              <span>EDITORIAL GUIDE · {city.name.toUpperCase()}, {city.state.toUpperCase()}</span>
            </div>
          </div>

          <h1 id="bf-hero-h1" className="emp-hero-h1">
            Best small law firms to work for in <span className="serif-accent">{city.name}</span>
          </h1>

          <p className="emp-hero-lead">
            Boutique and mid-size law firms in {city.name} that pass all five rigorous retention and compensation standards. Completely independent editorial rankings: zero firms can sponsor placement or pay to be listed.
          </p>

          <div className="emp-reassurance-row" style={{ marginBottom: 32 }}>
            <div className="emp-reassurance-item">
              <span className="check" aria-hidden="true">✓</span>
              <span>100% free of sponsored placement ($0 fee)</span>
            </div>
            <div className="emp-reassurance-item">
              <span className="check" aria-hidden="true">✓</span>
              <span>Transparent base salary disclosure required</span>
            </div>
            <div className="emp-reassurance-item">
              <span className="check" aria-hidden="true">✓</span>
              <span>4.5+ average verified public reviews</span>
            </div>
          </div>

          <div className="emp-hero-actions" style={{ marginBottom: 32 }}>
            <Link className="btn-emp-primary" href={`/upload-resume#city=${city.slug}`}>
              <span>Upload resume for confidential matching</span>
              <span aria-hidden="true">→</span>
            </Link>
            <a className="btn-emp-ghost" href="#firms">
              <span>View the qualifying firms</span>
              <span aria-hidden="true">↓</span>
            </a>
          </div>

          {/* Elevated City Statistics Snapshot Card */}
          <div style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 14, padding: "28px 24px", boxShadow: "0 20px 48px -12px rgba(0, 0, 0, 0.45)", color: "#08142A", textAlign: "left" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderBottom: "1px solid #E2E8F0", paddingBottom: 12, marginBottom: 18 }}>
              <span style={{ fontFamily: "var(--display)", fontSize: 18, color: "#08142A", fontWeight: 500 }}>
                {city.name} Editorial Index
              </span>
              <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "#1D4ED8", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                UPDATED {DATA.asOf}
              </span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16 }}>
              <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 10, padding: "14px 16px" }}>
                <div style={{ fontFamily: "var(--display)", fontSize: 28, color: "#08142A", fontWeight: 500 }}>
                  {firms.length}
                </div>
                <div style={{ fontSize: 12.5, color: "#64748B", marginTop: 2 }}>
                  Firms pass all 5 standards
                </div>
              </div>

              <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 10, padding: "14px 16px" }}>
                <div style={{ fontFamily: "var(--display)", fontSize: 28, color: "#08142A", fontWeight: 500 }}>
                  {practices.length - 1}
                </div>
                <div style={{ fontSize: 12.5, color: "#64748B", marginTop: 2 }}>
                  Practice areas represented
                </div>
              </div>

              <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 10, padding: "14px 16px" }}>
                <div style={{ fontFamily: "var(--display)", fontSize: 28, color: "#059669", fontWeight: 500 }}>
                  4.5+
                </div>
                <div style={{ fontSize: 12.5, color: "#64748B", marginTop: 2 }}>
                  Minimum public review score
                </div>
              </div>

              <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 10, padding: "14px 16px" }}>
                <div style={{ fontFamily: "var(--display)", fontSize: 28, color: "#1D4ED8", fontWeight: 500 }}>
                  $0
                </div>
                <div style={{ fontSize: 12.5, color: "#64748B", marginTop: 2 }}>
                  Zero sponsored placement fee
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE FIVE EVALUATION TESTS */}
      <section className="emp-process-sec" style={{ background: "#FAF9F5", padding: "96px 0 108px", borderBottom: "1px solid #EAE7DC" }}>
        <div className="wrap">
          <div className="sec-head" style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 48px" }}>
            <span className="eyebrow" style={{ color: "#1D4ED8", fontWeight: 700 }}>EVALUATION METHODOLOGY</span>
            <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(28px, 3.6vw, 42px)", color: "#08142A", margin: "10px 0 14px" }}>
              The five tests every listed firm must pass
            </h2>
            <p style={{ color: "#64748B", fontSize: 16 }}>
              We evaluate small and mid-size law firms through the lens of lateral associate and partner career longevity.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {criteria.map(([title, desc]: [string, string], i: number) => (
              <div key={i} style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 14, padding: "26px 22px", display: "flex", flexDirection: "column", gap: 8, boxShadow: "0 2px 8px rgba(15, 23, 42, 0.03)" }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 700, color: "#1D4ED8", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  Test {i + 1}
                </span>
                <h3 style={{ fontFamily: "var(--display)", fontSize: 20, color: "#08142A", margin: 0 }}>
                  {title}
                </h3>
                <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.55, margin: 0 }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PRACTICE FILTER & FIRM DIRECTORY */}
      <section className="emp-process-sec" id="firms" style={{ background: "#FFFFFF", padding: "96px 0 108px" }}>
        <div className="wrap">
          <div className="sec-head" style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 40px" }}>
            <span className="eyebrow" style={{ color: "#1D4ED8", fontWeight: 700 }}>VERIFIED DIRECTORY</span>
            <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(28px, 3.6vw, 42px)", color: "#08142A", margin: "10px 0 14px" }}>
              {city.name} boutique firms meeting all 5 standards
            </h2>
            <p style={{ color: "#64748B", fontSize: 16 }}>
              Firm descriptors and practice parameters shown. Firm identities are revealed upon mutual candidate authorization.
            </p>
          </div>

          {/* Filter Chips */}
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
            {practices.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setCurrentPractice(p)}
                style={{
                  padding: "8px 18px",
                  borderRadius: 999,
                  fontSize: 13.5,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  background: currentPractice === p ? "#1D4ED8" : "#F8FAFC",
                  color: currentPractice === p ? "#FFFFFF" : "#334155",
                  border: `1.5px solid ${currentPractice === p ? "#1D4ED8" : "#E2E8F0"}`,
                }}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Directory Listings Table */}
          <div style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 14, overflow: "hidden", boxShadow: "0 4px 16px rgba(15, 23, 42, 0.04)" }}>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: 14 }}>
                <thead>
                  <tr style={{ background: "#F8FAFC", borderBottom: "1.5px solid #E2E8F0", color: "#64748B", fontFamily: "var(--mono)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    <th style={{ padding: "16px 20px" }}>Firm Descriptor</th>
                    <th style={{ padding: "16px 20px" }}>Practice Focus</th>
                    <th style={{ padding: "16px 20px" }}>Attorneys</th>
                    <th style={{ padding: "16px 20px" }}>Metro Location</th>
                    <th style={{ padding: "16px 20px" }}>Published Base Band</th>
                    <th style={{ padding: "16px 20px" }}>Arrangement</th>
                    <th style={{ padding: "16px 20px", textAlign: "right" }}>Review Score</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFirms.map((f, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid #F1F5F9", transition: "background 0.15s" }}>
                      <td style={{ padding: "18px 20px", fontWeight: 600, color: "#08142A" }}>
                        {f.desc}
                      </td>
                      <td style={{ padding: "18px 20px", color: "#1D4ED8", fontWeight: 500 }}>
                        {f.practice}
                      </td>
                      <td style={{ padding: "18px 20px", color: "#475569" }}>
                        {f.size}
                      </td>
                      <td style={{ padding: "18px 20px", color: "#475569" }}>
                        {f.area}
                      </td>
                      <td style={{ padding: "18px 20px", fontFamily: "var(--mono)", fontWeight: 600, color: "#08142A" }}>
                        {f.pay}
                      </td>
                      <td style={{ padding: "18px 20px", color: "#475569" }}>
                        {f.mode}
                      </td>
                      <td style={{ padding: "18px 20px", textAlign: "right", color: "#059669", fontWeight: 700 }}>
                        ★ {f.reviews}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CURRENT ACTIVE ROLES IN CITY */}
      <section className="emp-process-sec" style={{ background: "#FAF9F5", padding: "96px 0 108px", borderTop: "1px solid #E2E8F0", borderBottom: "1px solid #EAE7DC" }}>
        <div className="wrap">
          <div className="sec-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 36, flexWrap: "wrap", gap: 14 }}>
            <div>
              <span className="eyebrow" style={{ color: "#1D4ED8", fontWeight: 700 }}>LIVE OPENINGS</span>
              <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(26px, 3.4vw, 38px)", color: "#08142A", margin: "8px 0 0" }}>
                Active lateral seats at top {city.name} firms
              </h2>
            </div>
            <Link
              className="more link-arrow hide-sm"
              href={`/jobs/estate-planning-attorney/${city.slug}`}
              style={{ fontSize: 14, fontWeight: 600, color: "#1D4ED8", textDecoration: "none" }}
            >
              <span>Explore all {city.name} openings</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="cards" style={{ display: "grid", gap: 20 }}>
            {cityJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. CONFIDENTIAL REPRESENTATION GATE FORM */}
      <section className="emp-process-sec" style={{ background: "#FFFFFF", padding: "96px 0 108px" }}>
        <div className="wrap split">
          <div>
            <div className="sec-head">
              <span className="eyebrow" style={{ color: "#1D4ED8", fontWeight: 700 }}>CONFIDENTIAL PLACEMENT</span>
              <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(28px, 3.6vw, 40px)", color: "#08142A", margin: "10px 0 14px" }}>
                Target specific {city.name} boutique firms
              </h2>
              <p style={{ color: "#64748B", fontSize: 16, lineHeight: 1.6 }}>
                Interested in discreetly exploring opportunities with one of our indexed firms? Orion founder Justin connects senior associates and partners off-market without public exposure.
              </p>
            </div>
            <div style={{ display: "grid", gap: 14, marginTop: 24 }}>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ color: "#1D4ED8", fontWeight: 700 }}>✓</span>
                <span style={{ fontSize: 14, color: "#334155" }}>
                  <strong>Zero Blind Submissions:</strong> No firm ever sees your identity without your explicit consent.
                </span>
              </div>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ color: "#1D4ED8", fontWeight: 700 }}>✓</span>
                <span style={{ fontSize: 14, color: "#334155" }}>
                  <strong>Compensation Disclosed:</strong> Exact base pay, origination split, and partner track confirmed beforehand.
                </span>
              </div>
            </div>
          </div>

          <div>
            <GateForm
              eyebrow="CONFIDENTIAL MATCH"
              title={`Connect with top ${city.name} firms`}
              audience="candidate"
              button="Explore confidential lateral moves"
              reviewSlug="n-brown"
              city={city.slug}
              fine="Use a personal email. Your current law firm is never contacted."
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
      <section className="emp-terms-dark-sec" style={{ background: "#08142A", padding: "100px 0 108px", textAlign: "center" }}>
        <div className="wrap" style={{ maxWidth: 760, margin: "0 auto" }}>
          <div className="badge-capsule" style={{ marginBottom: 18 }}>
            <span className="badge-dot" />
            <span>EXECUTIVE CAREER ADVANCEMENT</span>
          </div>
          <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(32px, 4.2vw, 48px)", color: "#FFFFFF", margin: "0 0 16px" }}>
            Ready to evaluate top law firms in <span className="serif-accent" style={{ color: "#60A5FA" }}>{city.name}?</span>
          </h2>
          <p style={{ color: "#CBD5E1", fontSize: 17, lineHeight: 1.6, marginBottom: 32 }}>
            Benchmark your pay or upload your resume confidentially to explore verified lateral seats.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            <Link href="/upload-resume" className="btn-emp-primary" style={{ padding: "14px 34px", fontSize: 16 }}>
              <span>Upload your resume</span>
              <span aria-hidden="true">→</span>
            </Link>
            <Link href="/salary-check" className="btn-emp-ghost" style={{ padding: "14px 34px", fontSize: 16 }}>
              <span>Check your pay first</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
