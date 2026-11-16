"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DATA, matchCandidates } from "@/data";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Mark } from "@/components/Mark";
import { TrustLine } from "@/components/Rating";
import { CandidateCard } from "@/components/CandidateCard";
import { GateForm } from "@/components/GateForm";

export function WhereToHireClient({
  cityParam,
}: {
  cityParam: string;
}) {
  const city = DATA.cities.find((c) => c.slug === cityParam);

  const [kindFilter, setKindFilter] = useState<string>("all");

  if (!city) {
    notFound();
  }

  const places = (DATA.placesToHire[city.slug] || []).concat(DATA.placesToHireExtra[city.slug] || []);
  const lateralSources = DATA.lateralSources[city.slug] || [];

  const candidateIds = ["EP-TX-0476", "EP-TX-0388", "PL-TX-0640"];
  const candidates = candidateIds.map((id) => DATA.candidates.find((c) => c.id === id)).filter(Boolean);

  const screenedCount = matchCandidates({ city: city.slug }).filter((r) => r.inCity).length;

  const nLawSchools = places.filter((p) => p.kind === "Law school").length;
  const nParalegal = places.filter((p) => p.kind === "Paralegal programme").length;
  const nAssoc = places.filter((p) => /association/i.test(p.kind)).length;

  const filteredPlaces = places.filter((p) => {
    if (kindFilter === "all") return true;
    if (kindFilter === "assoc") return /association/i.test(p.kind);
    return p.kind === kindFilter;
  });

  return (
    <div className="where-to-hire-page">
      {/* 1. LUXURY HERO WITH VIDEO & SNAPSHOT */}
      <section className="emp-luxury-hero-sec wth-luxury-hero" aria-labelledby="wth-hero-h1">
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
              <span>REGIONAL HIRING DIRECTORY · {city.name.toUpperCase()}, {city.state.toUpperCase()}</span>
            </div>
          </div>

          <h1 id="wth-hero-h1" className="emp-hero-h1">
            Where to hire attorneys and paralegals in <span className="serif-accent">{city.name}</span>
          </h1>

          <p className="emp-hero-lead">
            The accredited law schools, certified paralegal programmes, and local bar associations that {city.name} firms recruit from. Direct career office contacts, graduation hiring cycles, and pre-screened lateral candidates.
          </p>

          <div className="emp-reassurance-row" style={{ marginBottom: 32 }}>
            <div className="emp-reassurance-item">
              <span className="check" aria-hidden="true">✓</span>
              <span>Verified career office contacts</span>
            </div>
            <div className="emp-reassurance-item">
              <span className="check" aria-hidden="true">✓</span>
              <span>Active lateral attorney &amp; paralegal pool</span>
            </div>
            <div className="emp-reassurance-item">
              <span className="check" aria-hidden="true">✓</span>
              <span>23% contingency fee due only if you hire</span>
            </div>
          </div>

          <div className="emp-hero-actions" style={{ marginBottom: 32 }}>
            <Link className="btn-emp-primary" href={`/find-candidates#city=${city.slug}`}>
              <span>See {city.name} candidates ({screenedCount})</span>
              <span aria-hidden="true">→</span>
            </Link>
            <a className="btn-emp-ghost" href="#sources">
              <span>View institutional directory</span>
              <span aria-hidden="true">↓</span>
            </a>
          </div>

          {/* Elevated Statistics Snapshot Card */}
          <div style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 14, padding: "28px 24px", boxShadow: "0 20px 48px -12px rgba(0, 0, 0, 0.45)", color: "#08142A", textAlign: "left" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderBottom: "1px solid #E2E8F0", paddingBottom: 12, marginBottom: 18 }}>
              <span style={{ fontFamily: "var(--display)", fontSize: 18, color: "#08142A", fontWeight: 500 }}>
                {city.name} Talent Pipeline Snapshot
              </span>
              <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "#1D4ED8", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                UPDATED {DATA.asOf}
              </span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
              <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 10, padding: "14px 16px" }}>
                <div style={{ fontFamily: "var(--display)", fontSize: 28, color: "#08142A", fontWeight: 500 }}>
                  {nLawSchools}
                </div>
                <div style={{ fontSize: 12.5, color: "#64748B", marginTop: 2 }}>
                  Law schools with career offices
                </div>
              </div>

              <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 10, padding: "14px 16px" }}>
                <div style={{ fontFamily: "var(--display)", fontSize: 28, color: "#08142A", fontWeight: 500 }}>
                  {nParalegal}
                </div>
                <div style={{ fontSize: 12.5, color: "#64748B", marginTop: 2 }}>
                  Paralegal degree programmes
                </div>
              </div>

              <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 10, padding: "14px 16px" }}>
                <div style={{ fontFamily: "var(--display)", fontSize: 28, color: "#08142A", fontWeight: 500 }}>
                  {nAssoc}
                </div>
                <div style={{ fontSize: 12.5, color: "#64748B", marginTop: 2 }}>
                  Bar &amp; professional associations
                </div>
              </div>

              <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 10, padding: "14px 16px" }}>
                <div style={{ fontFamily: "var(--display)", fontSize: 28, color: "#1D4ED8", fontWeight: 500 }}>
                  {screenedCount}
                </div>
                <div style={{ fontSize: 12.5, color: "#64748B", marginTop: 2 }}>
                  Candidates open to moves now
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INSTITUTIONAL SOURCES TABLE */}
      <section className="emp-process-sec" id="sources" style={{ background: "#FAF9F5", padding: "96px 0 108px", borderBottom: "1px solid #EAE7DC" }}>
        <div className="wrap">
          <div className="sec-head" style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 40px" }}>
            <span className="eyebrow" style={{ color: "#1D4ED8", fontWeight: 700 }}>TALENT CHANNELS</span>
            <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(28px, 3.6vw, 42px)", color: "#08142A", margin: "10px 0 14px" }}>
              Who to contact, and when they recruit
            </h2>
            <p style={{ color: "#64748B", fontSize: 16 }}>
              Filter by institution type. Direct career service office contacts and critical hiring calendar cycles for {city.name}.
            </p>
          </div>

          {/* Filter Chips */}
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
            <button
              type="button"
              onClick={() => setKindFilter("all")}
              style={{
                padding: "8px 18px",
                borderRadius: 999,
                fontSize: 13.5,
                fontWeight: 600,
                cursor: "pointer",
                background: kindFilter === "all" ? "#1D4ED8" : "#FFFFFF",
                color: kindFilter === "all" ? "#FFFFFF" : "#334155",
                border: `1.5px solid ${kindFilter === "all" ? "#1D4ED8" : "#E2E8F0"}`,
              }}
            >
              All sources
            </button>
            <button
              type="button"
              onClick={() => setKindFilter("Law school")}
              style={{
                padding: "8px 18px",
                borderRadius: 999,
                fontSize: 13.5,
                fontWeight: 600,
                cursor: "pointer",
                background: kindFilter === "Law school" ? "#1D4ED8" : "#FFFFFF",
                color: kindFilter === "Law school" ? "#FFFFFF" : "#334155",
                border: `1.5px solid ${kindFilter === "Law school" ? "#1D4ED8" : "#E2E8F0"}`,
              }}
            >
              Law schools
            </button>
            <button
              type="button"
              onClick={() => setKindFilter("Paralegal programme")}
              style={{
                padding: "8px 18px",
                borderRadius: 999,
                fontSize: 13.5,
                fontWeight: 600,
                cursor: "pointer",
                background: kindFilter === "Paralegal programme" ? "#1D4ED8" : "#FFFFFF",
                color: kindFilter === "Paralegal programme" ? "#FFFFFF" : "#334155",
                border: `1.5px solid ${kindFilter === "Paralegal programme" ? "#1D4ED8" : "#E2E8F0"}`,
              }}
            >
              Paralegal programmes
            </button>
            <button
              type="button"
              onClick={() => setKindFilter("assoc")}
              style={{
                padding: "8px 18px",
                borderRadius: 999,
                fontSize: 13.5,
                fontWeight: 600,
                cursor: "pointer",
                background: kindFilter === "assoc" ? "#1D4ED8" : "#FFFFFF",
                color: kindFilter === "assoc" ? "#FFFFFF" : "#334155",
                border: `1.5px solid ${kindFilter === "assoc" ? "#1D4ED8" : "#E2E8F0"}`,
              }}
            >
              Bar &amp; associations
            </button>
          </div>

          {/* Directory Listings Table */}
          <div style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 14, overflow: "hidden", boxShadow: "0 4px 16px rgba(15, 23, 42, 0.04)" }}>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: 14 }}>
                <thead>
                  <tr style={{ background: "#F8FAFC", borderBottom: "1.5px solid #E2E8F0", color: "#64748B", fontFamily: "var(--mono)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    <th style={{ padding: "16px 20px" }}>Institution / Source</th>
                    <th style={{ padding: "16px 20px" }}>Type</th>
                    <th style={{ padding: "16px 20px" }}>Direct Contact</th>
                    <th style={{ padding: "16px 20px" }}>Active Recruitment Windows</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPlaces.map((p, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid #F1F5F9" }}>
                      <td style={{ padding: "18px 20px", fontWeight: 600, color: "#08142A" }}>
                        {p.name}
                      </td>
                      <td style={{ padding: "18px 20px", color: "#1D4ED8", fontWeight: 500 }}>
                        {p.kind}
                      </td>
                      <td style={{ padding: "18px 20px", color: "#334155", fontFamily: "var(--mono)", fontSize: 13 }}>
                        {p.contact}
                      </td>
                      <td style={{ padding: "18px 20px", color: "#059669", fontWeight: 600 }}>
                        {p.cycle}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LATERAL TALENT SOURCE MATRIX */}
      <section className="emp-process-sec" style={{ background: "#FFFFFF", padding: "96px 0 108px" }}>
        <div className="wrap">
          <div className="sec-head" style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 48px" }}>
            <span className="eyebrow" style={{ color: "#1D4ED8", fontWeight: 700 }}>MARKET INTELLIGENCE</span>
            <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(28px, 3.6vw, 42px)", color: "#08142A", margin: "10px 0 14px" }}>
              Where lateral hires come from in {city.name}
            </h2>
            <p style={{ color: "#64748B", fontSize: 16 }}>
              Distribution of prior employer backgrounds for attorneys and paralegals successfully placed by Orion into {city.name} boutique law firms.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {lateralSources.map((s: [string, number], idx: number) => (
              <div key={idx} style={{ background: "#F8FAFC", border: "1.5px solid #E2E8F0", borderRadius: 14, padding: "26px 22px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
                  <span style={{ fontWeight: 600, color: "#08142A", fontSize: 16 }}>{s[0]}</span>
                  <span style={{ fontFamily: "var(--display)", fontSize: 26, fontWeight: 500, color: "#1D4ED8" }}>{s[1]}%</span>
                </div>
                <div style={{ background: "#E2E8F0", height: 8, borderRadius: 999, overflow: "hidden" }}>
                  <div style={{ width: `${s[1]}%`, height: "100%", background: "#1D4ED8", borderRadius: 999 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ACTIVE CANDIDATES READY NOW */}
      <section className="emp-process-sec" style={{ background: "#FAF9F5", padding: "96px 0 108px", borderTop: "1px solid #E2E8F0", borderBottom: "1px solid #EAE7DC" }}>
        <div className="wrap">
          <div className="sec-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 36, flexWrap: "wrap", gap: 14 }}>
            <div>
              <span className="eyebrow" style={{ color: "#1D4ED8", fontWeight: 700 }}>AVAILABLE CANDIDATES</span>
              <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(26px, 3.4vw, 38px)", color: "#08142A", margin: "8px 0 0" }}>
                Skip the recruiting calendar: {city.name} talent ready now
              </h2>
            </div>
            <Link
              className="more link-arrow hide-sm"
              href={`/find-candidates#city=${city.slug}`}
              style={{ fontSize: 14, fontWeight: 600, color: "#1D4ED8", textDecoration: "none" }}
            >
              <span>Explore all {city.name} dossiers</span>
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

      {/* 5. TURNKEY HIRING KIT GATE FORM */}
      <section className="emp-process-sec" id="kit" style={{ background: "#FFFFFF", padding: "96px 0 108px" }}>
        <div className="wrap split">
          <div>
            <div className="sec-head">
              <span className="eyebrow" style={{ color: "#1D4ED8", fontWeight: 700 }}>FIRM HIRING KIT</span>
              <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(28px, 3.6vw, 40px)", color: "#08142A", margin: "10px 0 14px" }}>
                Hiring on your own in {city.name}? Take the kit
              </h2>
              <p style={{ color: "#64748B", fontSize: 16, lineHeight: 1.6 }}>
                Standardize your recruitment process across local law schools and bar associations with our turnkey templates.
              </p>
            </div>
            <div style={{ display: "grid", gap: 14, marginTop: 24 }}>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ color: "#1D4ED8", fontWeight: 700 }}>✓</span>
                <span style={{ fontSize: 14, color: "#334155" }}>
                  <strong>Job Posting Template:</strong> Pre-formatted for law school and bar association job boards.
                </span>
              </div>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ color: "#1D4ED8", fontWeight: 700 }}>✓</span>
                <span style={{ fontSize: 14, color: "#334155" }}>
                  <strong>Interview Questions:</strong> Behavioral and technical diagnostic questions with evaluation rubrics.
                </span>
              </div>
            </div>
          </div>

          <div id="kit-gate">
            <GateForm
              eyebrow="FREE DOWNLOAD"
              title="Email me the complete hiring kit"
              button="Download the turnkey kit"
              preset="kit"
              role="estate-planning-attorney"
              city={city.slug}
              reviewSlug="brett-zimmerman"
              fine="Delivered immediately as an editable Word document and PDF. Zero spam."
            />
          </div>
        </div>
      </section>

      {/* 6. BOTTOM MIDNIGHT NAVY CTA */}
      <section className="emp-terms-dark-sec" style={{ background: "#08142A", padding: "100px 0 108px", textAlign: "center" }}>
        <div className="wrap" style={{ maxWidth: 760, margin: "0 auto" }}>
          <div className="badge-capsule" style={{ marginBottom: 18 }}>
            <span className="badge-dot" />
            <span>EXECUTIVE LEGAL PLACEMENT</span>
          </div>
          <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(32px, 4.2vw, 48px)", color: "#FFFFFF", margin: "0 0 16px" }}>
            Meet pre-screened {city.name} legal talent <span className="serif-accent" style={{ color: "#60A5FA" }}>without the wait.</span>
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
              <span>Submit your open seat</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
