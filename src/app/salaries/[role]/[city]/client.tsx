"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DATA, fmt, salaryPosition, inBandCandidates, matchCandidates } from "@/data";
import { useSite } from "@/context/SiteContext";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Mark } from "@/components/Mark";
import { TrustLine, RatingBadge } from "@/components/Rating";
import { SalaryBand } from "@/components/SalaryBand";
import { CandidateCard } from "@/components/CandidateCard";
import { JobCard } from "@/components/JobCard";
import { GateForm } from "@/components/GateForm";
import { Neighbours } from "@/components/PayTables";
import { ReviewCard } from "@/components/ReviewCard";

export default function SalaryLeafClient({
  roleParam,
  cityParam,
}: {
  roleParam: string;
  cityParam: string;
}) {
  const role = DATA.roles.find((r) => r.slug === roleParam);
  const city = DATA.cities.find((c) => c.slug === cityParam);

  const { door, setDoor } = useSite();

  const [payInput, setPayInput] = useState<string>("130000");
  const [expKey, setExpKey] = useState<string>("b2");
  const [marker, setMarker] = useState<number | null>(130);
  const [hasChecked, setHasChecked] = useState<boolean>(false);
  const [verdict, setVerdict] = useState<{
    employerVerdict: { title: string; desc: string; status: "in" | "above" | "below" };
    candidateVerdict: { title: string; desc: string; status: "in" | "above" | "below" };
  } | null>(null);

  if (!role || !city) {
    notFound();
  }

  const bandData = DATA.bands[city.slug]?.[role.slug];
  if (!bandData) {
    notFound();
  }

  const levers = DATA.payLevers[role.slug] || [];

  const handlePayChange = (val: string) => {
    setPayInput(val);
    const num = parseFloat(val);
    if (!isNaN(num)) {
      const k = num > 1000 ? num / 1000 : num;
      if (k >= 30) {
        setMarker(k);
      }
    }
  };

  const handleCheck = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const raw = parseFloat(payInput);
    if (isNaN(raw)) return;
    const k = raw > 1000 ? raw / 1000 : raw;
    setMarker(k);
    setHasChecked(true);

    const pos = salaryPosition(city.slug, role.slug, expKey, k);
    const expLabel = DATA.expBands.find((e) => e.key === expKey)?.label || expKey;
    const r = pos.range || [0, 0];
    const whereStatus = pos.where === "above" ? "above" : pos.where === "below" ? "below" : "in";

    setVerdict({
      employerVerdict: {
        title: `Your offer of ${fmt.k(k)} sits ${pos.where === "in" ? "inside" : pos.where} the standard market range.`,
        desc: `It is ${pos.text}. Most ${role.short}s at this seniority tier in ${city.name} expect ${fmt.range(r)} base.`,
        status: whereStatus,
      },
      candidateVerdict: {
        title: `Your base of ${fmt.k(k)} sits ${pos.where === "in" ? "inside" : pos.where} the usual market range for ${expLabel}.`,
        desc: `In ${city.name}, the competitive band spans ${fmt.range(r)} base. ${pos.where === "above" ? "Offers at this level reflect senior leadership or origination bonuses." : "Positions with higher compensation bands are actively open now."}`,
        status: whereStatus,
      },
    });
  };

  const currentK = parseFloat(payInput)
    ? parseFloat(payInput) > 1000
      ? parseFloat(payInput) / 1000
      : parseFloat(payInput)
    : 130;

  // Matched jobs for candidate door
  let moreJobs = DATA.jobs
    .filter((j) => j.role === role.slug && j.city === city.slug && j.band[1] > currentK)
    .sort((a, b) => b.band[1] - a.band[1]);
  if (moreJobs.length === 0) {
    moreJobs = DATA.jobs.filter((j) => j.role === role.slug && j.city === city.slug);
  }

  // Matched candidates for employer door
  let inBand = inBandCandidates(role.slug, city.slug, currentK).slice(0, 3);
  if (inBand.length === 0) {
    inBand = matchCandidates({ role: role.slug, city: city.slug }).slice(0, 3);
  }

  return (
    <div className="salary-leaf-page">
      {/* 1. LUXURY HERO WITH VIDEO, MEDIAN CALLOUT & SALARY BAND BAR */}
      <section className="emp-luxury-hero-sec salary-leaf-hero" aria-labelledby="salary-hero-h1">
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
              <span>LEGAL SALARY GUIDE · {city.name.toUpperCase()}, {city.state.toUpperCase()}</span>
            </div>
          </div>

          <h1 id="salary-hero-h1" className="emp-hero-h1">
            {role.name} salary in <span className="serif-accent">{city.name}</span>
          </h1>

          <p className="emp-hero-lead">
            Verified compensation benchmarks derived from executed boutique law firm offers and active lateral placements across {city.name}. Base salaries published transparently with quarterly market updates.
          </p>

          <div className="emp-reassurance-row" style={{ marginBottom: 28 }}>
            <div className="emp-reassurance-item">
              <span className="check" aria-hidden="true">✓</span>
              <span>Verified Texas boutique placements</span>
            </div>
            <div className="emp-reassurance-item">
              <span className="check" aria-hidden="true">✓</span>
              <span>Updated quarterly ({DATA.asOf})</span>
            </div>
            <div className="emp-reassurance-item">
              <span className="check" aria-hidden="true">✓</span>
              <span>Base salary disclosed upfront</span>
            </div>
          </div>

          {/* Interactive Role Mode Switcher */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(255, 255, 255, 0.08)", padding: "6px 14px", borderRadius: 999, border: "1px solid rgba(255, 255, 255, 0.16)", marginBottom: 28, backdropFilter: "blur(8px)" }}>
            <span style={{ fontSize: 13, color: "#94A3B8", fontWeight: 600 }}>I am:</span>
            <button
              type="button"
              onClick={() => setDoor("employer")}
              style={{
                background: door === "employer" ? "#1D4ED8" : "transparent",
                color: "#FFFFFF",
                border: "none",
                borderRadius: 999,
                padding: "6px 16px",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              Hiring for a firm
            </button>
            <button
              type="button"
              onClick={() => setDoor("candidate")}
              style={{
                background: door === "candidate" ? "#1D4ED8" : "transparent",
                color: "#FFFFFF",
                border: "none",
                borderRadius: 999,
                padding: "6px 16px",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              Evaluating my pay
            </button>
          </div>

          {/* Median Stat Banner */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "baseline", gap: 12, marginBottom: 32 }}>
            <span style={{ fontFamily: "var(--display)", fontSize: "clamp(44px, 5.5vw, 68px)", fontWeight: 500, color: "#FFFFFF", lineHeight: 1 }}>
              {fmt.k(bandData.median)}
            </span>
            <span style={{ fontFamily: "var(--mono)", fontSize: 13, color: "#93C5FD", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>
              Median Base Salary across all levels
            </span>
          </div>

          {/* Elevated Interactive Distribution Visualizer Card */}
          <div style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 14, padding: "32px 28px", boxShadow: "0 20px 48px -12px rgba(0, 0, 0, 0.45)", color: "#08142A", textAlign: "left" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderBottom: "1px solid #E2E8F0", paddingBottom: 14, marginBottom: 20 }}>
              <h2 style={{ fontFamily: "var(--display)", fontSize: 21, fontWeight: 500, color: "#08142A", margin: 0 }}>
                Base Salary by Years of Practice
              </h2>
              <span style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#1D4ED8" }}>
                INTERQUARTILE BANDS
              </span>
            </div>

            <SalaryBand
              citySlug={city.slug}
              roleSlug={role.slug}
              highlightKey={expKey}
              marker={marker ?? undefined}
            />

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, marginTop: 24, paddingTop: 16, borderTop: "1px solid #E2E8F0" }}>
              <span style={{ fontSize: 12.5, color: "#64748B" }}>
                Source: {DATA.source}. Updated {DATA.asOf}. Base salary only before discretionary bonus.
              </span>
              <a href="#check" className="btn-emp-primary" style={{ padding: "10px 22px", fontSize: 13.5 }}>
                <span>{door === "employer" ? "Benchmark an offer" : "Benchmark your pay"}</span>
                <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE COMPENSATION EVALUATION TOOL */}
      <section className="emp-process-sec" id="check" style={{ background: "#FAF9F5", padding: "96px 0 108px", borderBottom: "1px solid #EAE7DC" }}>
        <div className="wrap">
          <div className="sec-head" style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 40px" }}>
            <span className="eyebrow" style={{ color: "#1D4ED8", fontWeight: 700 }}>LIVE MARKET EVALUATION</span>
            <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(28px, 3.6vw, 42px)", color: "#08142A", margin: "10px 0 14px" }}>
              {door === "employer" ? "Benchmark your planned lateral offer" : "Check where your compensation sits"}
            </h2>
            <p style={{ color: "#64748B", fontSize: 16 }}>
              {door === "employer"
                ? "Enter the base compensation you plan to offer. Compare it against active candidate expectations and market median."
                : "Enter your current base salary. Compare where you stand against local peers and view matching lateral openings."}
            </p>
          </div>

          <div style={{ maxWidth: 680, margin: "0 auto", background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 14, padding: "32px 28px", boxShadow: "0 4px 16px rgba(15, 23, 42, 0.04)" }}>
            <form onSubmit={handleCheck}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
                <div className="field">
                  <label htmlFor="o-pay" style={{ fontSize: 13, fontWeight: 600, color: "#08142A", marginBottom: 6, display: "block" }}>
                    {door === "employer" ? "Base Salary Planned" : "Current Base Salary"} <span style={{ fontWeight: 400, color: "#64748B" }}>($/yr)</span>
                  </label>
                  <input
                    id="o-pay"
                    type="number"
                    inputMode="numeric"
                    min="30000"
                    max="400000"
                    step="1000"
                    value={payInput}
                    onChange={(e) => handlePayChange(e.target.value)}
                    placeholder="130000"
                    style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1.5px solid #CBD5E1", fontSize: 14, color: "#08142A" }}
                  />
                </div>

                <div className="field">
                  <label htmlFor="o-exp" style={{ fontSize: 13, fontWeight: 600, color: "#08142A", marginBottom: 6, display: "block" }}>
                    Seniority Level
                  </label>
                  <select
                    id="o-exp"
                    value={expKey}
                    onChange={(e) => {
                      setExpKey(e.target.value);
                      if (payInput) handleCheck();
                    }}
                    style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1.5px solid #CBD5E1", fontSize: 14, color: "#08142A" }}
                  >
                    {DATA.expBands.map((e) => (
                      <option key={e.key} value={e.key}>{e.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button className="btn-emp-primary" type="submit" style={{ width: "100%", padding: "14px 28px", fontSize: 15 }}>
                <span>{door === "employer" ? "Evaluate offer competitiveness" : "Benchmark my salary"}</span>
                <span aria-hidden="true">→</span>
              </button>
            </form>

            {hasChecked && verdict && (
              <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid #E2E8F0" }}>
                <div style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontFamily: "var(--mono)",
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  padding: "4px 12px",
                  borderRadius: 999,
                  marginBottom: 10,
                  background: (door === "employer" ? verdict.employerVerdict.status : verdict.candidateVerdict.status) === "above" ? "#ECFDF5" : (door === "employer" ? verdict.employerVerdict.status : verdict.candidateVerdict.status) === "below" ? "#FEF3C7" : "#EFF6FF",
                  color: (door === "employer" ? verdict.employerVerdict.status : verdict.candidateVerdict.status) === "above" ? "#059669" : (door === "employer" ? verdict.employerVerdict.status : verdict.candidateVerdict.status) === "below" ? "#D97706" : "#1D4ED8",
                  border: `1px solid ${(door === "employer" ? verdict.employerVerdict.status : verdict.candidateVerdict.status) === "above" ? "#A7F3D0" : (door === "employer" ? verdict.employerVerdict.status : verdict.candidateVerdict.status) === "below" ? "#FDE68A" : "#BFDBFE"}`,
                }}>
                  <span aria-hidden="true">●</span>
                  <span>{(door === "employer" ? verdict.employerVerdict.status : verdict.candidateVerdict.status) === "above" ? "Above Market Benchmark" : (door === "employer" ? verdict.employerVerdict.status : verdict.candidateVerdict.status) === "below" ? "Below Market Median" : "Within Market Band"}</span>
                </div>
                <h3 style={{ fontFamily: "var(--display)", fontSize: 19, color: "#08142A", margin: "0 0 6px" }}>
                  {door === "employer" ? verdict.employerVerdict.title : verdict.candidateVerdict.title}
                </h3>
                <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.55, margin: 0 }}>
                  {door === "employer" ? verdict.employerVerdict.desc : verdict.candidateVerdict.desc}
                </p>
              </div>
            )}
          </div>

          {/* Conditional Next Steps for Employer or Candidate */}
          {hasChecked && (
            <div style={{ marginTop: 48 }}>
              {door === "employer" ? (
                <div>
                  <div style={{ textAlign: "center", marginBottom: 28 }}>
                    <span className="eyebrow" style={{ color: "#1D4ED8", fontWeight: 700 }}>TALENT MATCH</span>
                    <h3 style={{ fontFamily: "var(--display)", fontSize: 26, color: "#08142A", margin: "6px 0 0" }}>
                      {inBand.length > 0 ? `${inBand.length} Pre-Screened Candidates in Your Target Band` : "Candidates Near Your Target Band"}
                    </h3>
                  </div>
                  <div className="cards" style={{ display: "grid", gap: 20 }}>
                    {inBand.map((r) => (
                      <CandidateCard key={r.c.id} candidate={r.c} />
                    ))}
                  </div>
                  <div style={{ marginTop: 32, maxWidth: 640, margin: "32px auto 0" }}>
                    <GateForm
                      title={inBand.length === 1 ? "Request this candidate's full profile" : `Request full profiles for these ${inBand.length} candidates`}
                      bullets={[
                        "Redacted resumes by email within one business hour",
                        "Disclosed pay expectation and notice window",
                        "Standard one-page terms. Zero fee unless you hire",
                      ]}
                      button="Send me the full profiles"
                      ids={inBand.map((r) => r.c.id)}
                      role={role.slug}
                      city={city.slug}
                      reviewSlug="brett-zimmerman"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ textAlign: "center", marginBottom: 28 }}>
                    <span className="eyebrow" style={{ color: "#1D4ED8", fontWeight: 700 }}>HIGHER PAYING OPENINGS</span>
                    <h3 style={{ fontFamily: "var(--display)", fontSize: 26, color: "#08142A", margin: "6px 0 0" }}>
                      {moreJobs.length > 0 ? `${moreJobs.length} ${city.name} Positions Paying Above ${fmt.k(currentK)}` : `${city.name} Openings Near Your Current Base`}
                    </h3>
                  </div>
                  <div className="cards" style={{ display: "grid", gap: 20 }}>
                    {moreJobs.slice(0, 3).map((j) => (
                      <JobCard key={j.id} job={j} />
                    ))}
                  </div>
                  <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 32, flexWrap: "wrap" }}>
                    <Link className="btn-emp-primary" href={`/jobs/${role.slug}/${city.slug}`}>
                      <span>Explore all {city.name} {role.short} seats</span>
                      <span aria-hidden="true">→</span>
                    </Link>
                    <Link className="btn-emp-ghost" href="/salary-check" style={{ color: "#08142A !important", borderColor: "#CBD5E1" }}>
                      <span>Run full salary check with bonus</span>
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* 3. THREE THINGS THAT MOVE AN OFFER */}
      <section className="emp-process-sec" style={{ background: "#FFFFFF", padding: "96px 0 108px" }}>
        <div className="wrap">
          <div className="sec-head" style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 48px" }}>
            <span className="eyebrow" style={{ color: "#1D4ED8", fontWeight: 700 }}>COMPENSATION LEVERS</span>
            <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(28px, 3.6vw, 42px)", color: "#08142A", margin: "10px 0 14px" }}>
              Three factors that move legal offers in {city.name}
            </h2>
            <p style={{ color: "#64748B", fontSize: 16 }}>
              Key negotiation levers verified across lateral placements at Texas boutique and mid-size law firms.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {levers.map((d, i) => (
              <div key={i} style={{ background: "#F8FAFC", border: "1.5px solid #E2E8F0", borderRadius: 14, padding: "28px 24px" }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#1D4ED8", display: "block", marginBottom: 8 }}>
                  {d.k}
                </span>
                <div style={{ fontFamily: "var(--display)", fontSize: 28, fontWeight: 500, color: "#08142A", marginBottom: 12 }}>
                  {d.fig}
                </div>
                <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.6, margin: 0 }}>
                  {d.v}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SALARY GUIDE PDF GATE SECTION */}
      <section className="emp-process-sec" style={{ background: "#FAF9F5", padding: "96px 0 108px", borderTop: "1px solid #E2E8F0", borderBottom: "1px solid #EAE7DC" }}>
        <div className="wrap split">
          <div>
            <div className="sec-head">
              <span className="eyebrow" style={{ color: "#1D4ED8", fontWeight: 700 }}>OFFICIAL MARKET GUIDE</span>
              <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(28px, 3.6vw, 40px)", color: "#08142A", margin: "10px 0 14px" }}>
                The {city.name} Legal Salary Guide (PDF)
              </h2>
              <p style={{ color: "#64748B", fontSize: 16, lineHeight: 1.6 }}>
                Every practice area we benchmark in {city.name}, consolidated into an executive one-page reference to evaluate partner draws, lateral offers, or your upcoming annual review.
              </p>
            </div>
            <div style={{ display: "grid", gap: 14, marginTop: 28 }}>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ color: "#1D4ED8", fontWeight: 700 }}>✓</span>
                <span style={{ fontSize: 14, color: "#334155" }}>
                  <strong>Practice Area Pay Bands:</strong> Full base salary curves for 10 legal specializations.
                </span>
              </div>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ color: "#1D4ED8", fontWeight: 700 }}>✓</span>
                <span style={{ fontSize: 14, color: "#334155" }}>
                  <strong>Bonus &amp; Arrangement Norms:</strong> Typical origination splits, collection incentives, and hybrid premiums.
                </span>
              </div>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ color: "#1D4ED8", fontWeight: 700 }}>✓</span>
                <span style={{ fontSize: 14, color: "#334155" }}>
                  <strong>Quarterly Updates:</strong> Fresh benchmark data delivered directly to your inbox every quarter.
                </span>
              </div>
            </div>
          </div>

          <div id="guide-gate">
            <GateForm
              eyebrow="FREE PDF REPORT"
              title={`Email me the ${city.name} Legal Salary Guide`}
              button="Send me the complete guide"
              preset="guide"
              city={city.slug}
              audience={door === "candidate" ? "candidate" : "employer"}
              reviewSlug={door === "candidate" ? "n-brown" : "daffner-law"}
              fine="Delivered instantly as a PDF. One email per quarter with updated benchmark figures. Unsubscribe anytime."
            />
          </div>
        </div>
      </section>

      {/* 5. METHODOLOGY STATBAND */}
      <section className="emp-process-sec" style={{ background: "#FFFFFF", padding: "96px 0 108px" }}>
        <div className="wrap">
          <div className="sec-head" style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 48px" }}>
            <span className="eyebrow" style={{ color: "#1D4ED8", fontWeight: 700 }}>DATA METHODOLOGY</span>
            <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(28px, 3.6vw, 42px)", color: "#08142A", margin: "10px 0 14px" }}>
              How Orion calculates legal compensation
            </h2>
            <p style={{ color: "#64748B", fontSize: 16 }}>
              Bands represent base salaries from verified offers and completed placements for {role.name.toLowerCase()}s in the {city.name} metro area.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 24, textAlign: "center" }}>
            <div style={{ background: "#F8FAFC", border: "1.5px solid #E2E8F0", borderRadius: 14, padding: "32px 24px" }}>
              <div style={{ fontFamily: "var(--display)", fontSize: 44, color: "#1D4ED8", fontWeight: 500, marginBottom: 8 }}>
                20+
              </div>
              <div style={{ fontWeight: 600, color: "#08142A", fontSize: 15, marginBottom: 4 }}>
                Data Points Per Band
              </div>
              <p style={{ fontSize: 13, color: "#64748B", margin: 0 }}>
                Every published tier is backed by verified legal offers and lateral contracts.
              </p>
            </div>

            <div style={{ background: "#F8FAFC", border: "1.5px solid #E2E8F0", borderRadius: 14, padding: "32px 24px" }}>
              <div style={{ fontFamily: "var(--display)", fontSize: 44, color: "#1D4ED8", fontWeight: 500, marginBottom: 8 }}>
                25–75th
              </div>
              <div style={{ fontWeight: 600, color: "#08142A", fontSize: 15, marginBottom: 4 }}>
                Interquartile Distribution
              </div>
              <p style={{ fontSize: 13, color: "#64748B", margin: 0 }}>
                Visual track reflects the competitive middle 50% of prevailing market offers.
              </p>
            </div>

            <div style={{ background: "#F8FAFC", border: "1.5px solid #E2E8F0", borderRadius: 14, padding: "32px 24px" }}>
              <div style={{ fontFamily: "var(--display)", fontSize: 44, color: "#1D4ED8", fontWeight: 500, marginBottom: 8 }}>
                Q1 2026
              </div>
              <div style={{ fontWeight: 600, color: "#08142A", fontSize: 15, marginBottom: 4 }}>
                Quarterly Refresh
              </div>
              <p style={{ fontSize: 13, color: "#64748B", margin: 0 }}>
                Continuously recalibrated to reflect current macroeconomic and legal talent shifts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. BOTTOM MIDNIGHT NAVY CTA */}
      <section className="emp-terms-dark-sec" style={{ background: "#08142A", padding: "100px 0 108px", textAlign: "center" }}>
        <div className="wrap" style={{ maxWidth: 760, margin: "0 auto" }}>
          <div className="badge-capsule" style={{ marginBottom: 18 }}>
            <span className="badge-dot" />
            <span>CONFIDENTIAL LATERAL INTELLIGENCE</span>
          </div>
          <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(32px, 4.2vw, 48px)", color: "#FFFFFF", margin: "0 0 16px" }}>
            {door === "employer"
              ? `Hire experienced ${role.short}s in ${city.name}`
              : `Explore confidential ${role.short} openings in ${city.name}`}
          </h2>
          <p style={{ color: "#CBD5E1", fontSize: 17, lineHeight: 1.6, marginBottom: 32 }}>
            {door === "employer"
              ? "Access pre-screened attorney dossiers. Pay 23% only if you decide to hire."
              : "Direct lateral seats with verified base compensation and partner track opportunities."}
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            {door === "employer" ? (
              <Link href={`/find-candidates#role=${role.slug}&city=${city.slug}`} className="btn-emp-primary" style={{ padding: "14px 34px", fontSize: 16 }}>
                <span>View candidates in this band</span>
                <span aria-hidden="true">→</span>
              </Link>
            ) : (
              <Link href={`/jobs/${role.slug}/${city.slug}`} className="btn-emp-primary" style={{ padding: "14px 34px", fontSize: 16 }}>
                <span>See {city.name} openings</span>
                <span aria-hidden="true">→</span>
              </Link>
            )}
            <a href="#check" className="btn-emp-ghost" style={{ padding: "14px 34px", fontSize: 16 }}>
              <span>Recalculate pay</span>
              <span aria-hidden="true">↑</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
