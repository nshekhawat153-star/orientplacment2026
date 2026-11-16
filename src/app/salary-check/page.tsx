"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  roles,
  cities,
  expBands,
  bonusNorms,
  jobs,
  findCity,
  findRole,
  findBand,
  fmt,
  expKey,
  toK,
  salaryPosition,
} from "@/data";
import { TrustLine } from "@/components/Rating";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SalaryBandBar } from "@/components/SalaryBand";
import { JobCard } from "@/components/JobCard";
import { GateForm } from "@/components/GateForm";
import { Mark } from "@/components/Mark";

export default function SalaryCheckPage() {
  // Roles with published bands
  const availableRoles = useMemo(() => {
    return roles.filter((r) => cities.some((c) => findBand(c.slug, r.slug)));
  }, []);

  const [selectedRole, setSelectedRole] = useState("estate-planning-attorney");
  const [selectedCity, setSelectedCity] = useState("houston-tx");
  const [years, setYears] = useState(5);
  const [baseInput, setBaseInput] = useState("118000");
  const [bonusInput, setBonusInput] = useState("8000");
  const [submittedBase, setSubmittedBase] = useState<number | null>(118);
  const [submittedBonus, setSubmittedBonus] = useState<number | null>(8);

  // Filter cities for selected role
  const availableCities = useMemo(() => {
    return cities.filter((c) => findBand(c.slug, selectedRole));
  }, [selectedRole]);

  const roleObj = findRole(selectedRole) || roles[0];
  const cityObj = findCity(selectedCity) || cities[0];

  const currentExpKey = expKey(years);
  const expBandObj = expBands.find((e) => e.key === currentExpKey) || expBands[1];
  const band = findBand(selectedCity, selectedRole);
  const expRange = band ? band[currentExpKey as "b1" | "b2" | "b3"] : null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const kBase = toK(baseInput);
    const kBonus = toK(bonusInput);
    setSubmittedBase(kBase && kBase >= 20 ? kBase : null);
    setSubmittedBonus(kBonus);

    const resultEl = document.getElementById("result");
    if (resultEl && kBase) {
      resultEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  // Verdict calculation
  const verdict = useMemo(() => {
    if (!submittedBase || !expRange) return null;
    const p = salaryPosition(selectedCity, selectedRole, currentExpKey, submittedBase);
    const who = `${roleObj.short}s with ${expBandObj.label} in ${cityObj.name}`;
    let head = "";
    let body = "";
    let status: "below" | "within" | "above" = "within";

    const pct = p.pct ?? 50;
    if (p.where === "below") {
      status = "below";
      head = `Your base of ${fmt.k(submittedBase)} is below the market range.`;
      body = `Most ${who} earn ${fmt.range(expRange)}. Approximately ${100 - pct}% of attorneys at your seniority earn more than you. The compensation gap to the market median is ${fmt.k((expRange[0] + expRange[1]) / 2 - submittedBase)}.`;
    } else if (p.where === "above") {
      status = "above";
      head = `Your base of ${fmt.k(submittedBase)} is above the typical market range.`;
      body = `You out-earn approximately ${pct}% of ${who} (usual market range: ${fmt.range(expRange)}). Further upward lateral moves typically require a portable book of business or an equity partnership track.`;
    } else {
      status = "within";
      head = `Your base of ${fmt.k(submittedBase)} sits directly inside the market range.`;
      body = `You earn more than ${pct}% of ${who}. The competitive middle band spans ${fmt.range(expRange)}, with the top tier paying ${fmt.k(expRange[1] - submittedBase)} above your current base.`;
    }

    return { head, body, p, status };
  }, [submittedBase, expRange, selectedCity, selectedRole, currentExpKey, expBandObj, roleObj, cityObj]);

  // Roles paying more
  const rolesPayingMore = useMemo(() => {
    if (!submittedBase) {
      return jobs
        .filter((j) => j.city === selectedCity && j.role === selectedRole)
        .sort((a, b) => b.band[1] - a.band[1]);
    }
    const same = jobs.filter(
      (j) => j.city === selectedCity && j.role === selectedRole && j.band[1] > submittedBase
    );
    const near = same.length
      ? []
      : jobs.filter(
          (j) =>
            j.city === selectedCity &&
            findRole(j.role)?.kind === roleObj.kind &&
            j.role !== selectedRole &&
            j.band[1] > submittedBase
        );
    return (same.length ? same : near).sort((a, b) => b.band[1] - a.band[1]);
  }, [submittedBase, selectedCity, selectedRole, roleObj]);

  const bonusNormText = bonusNorms[roleObj.kind] || bonusNorms.attorney;

  return (
    <div className="sc-page">
      {/* 1. LUXURY HERO WITH EMBEDDED COMPENSATION CALCULATOR */}
      <section className="emp-luxury-hero-sec sc-luxury-hero-sec" aria-labelledby="sc-hero-title">
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

        <div className="wrap emp-hero-content" style={{ maxWidth: 860 }}>
          <div className="emp-hero-badge-wrap">
            <div className="badge-capsule">
              <span className="badge-dot" />
              <span>COMPENSATION BENCHMARK · 100% PRIVATE IN-BROWSER</span>
            </div>
          </div>

          <h1 id="sc-hero-title" className="emp-hero-h1">
            Is your legal salary <span className="serif-accent">in line with the market?</span>
          </h1>

          <p className="emp-hero-lead">
            {roleObj.name}s in {cityObj.name} with {expBandObj.label} earn{" "}
            <span style={{ color: "#FFFFFF", fontWeight: 600 }}>{expRange ? fmt.range(expRange) : "market rates"}</span> base. Compare your salary against verified Texas law firm offers and active placements.
          </p>

          <div className="emp-reassurance-row" style={{ marginBottom: 32 }}>
            <div className="emp-reassurance-item">
              <span className="check" aria-hidden="true">✓</span>
              <span>Runs 100% client-side in your browser</span>
            </div>
            <div className="emp-reassurance-item">
              <span className="check" aria-hidden="true">✓</span>
              <span>Updated quarterly with verified offer data</span>
            </div>
            <div className="emp-reassurance-item">
              <span className="check" aria-hidden="true">✓</span>
              <span>Nothing is stored or shared with any firm</span>
            </div>
          </div>

          {/* Elevated Interactive Calculator Card */}
          <div className="sc-calc-card" id="sc">
            <form onSubmit={handleSubmit}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 20, borderBottom: "1px solid #E2E8F0", paddingBottom: 14 }}>
                <h2 style={{ fontFamily: "var(--display)", fontSize: 22, color: "#08142A", margin: 0 }}>
                  Enter Your Compensation
                </h2>
                <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "#1D4ED8", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  PRIVATE &amp; ANONYMOUS
                </span>
              </div>

              <div className="field" style={{ marginBottom: 18 }}>
                <label htmlFor="s-role" style={{ fontSize: 13, fontWeight: 600, color: "#08142A", marginBottom: 6, display: "block" }}>
                  Primary Practice Area
                </label>
                <select
                  id="s-role"
                  value={selectedRole}
                  onChange={(e) => {
                    setSelectedRole(e.target.value);
                    const validCities = cities.filter((c) => findBand(c.slug, e.target.value));
                    if (!validCities.some((c) => c.slug === selectedCity)) {
                      setSelectedCity(validCities[0]?.slug || "houston-tx");
                    }
                  }}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1.5px solid #CBD5E1", fontSize: 14, color: "#08142A" }}
                >
                  {availableRoles.map((r) => (
                    <option key={r.slug} value={r.slug}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sc-grid-pair" style={{ marginBottom: 18 }}>
                <div className="field">
                  <label htmlFor="s-city" style={{ fontSize: 13, fontWeight: 600, color: "#08142A", marginBottom: 6, display: "block" }}>
                    Metro Legal Market
                  </label>
                  <select
                    id="s-city"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1.5px solid #CBD5E1", fontSize: 14, color: "#08142A" }}
                  >
                    {availableCities.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.name}, {c.state}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="field">
                  <label htmlFor="s-years" style={{ fontSize: 13, fontWeight: 600, color: "#08142A", marginBottom: 6, display: "block" }}>
                    Years Post-Bar Admission
                  </label>
                  <input
                    id="s-years"
                    type="number"
                    inputMode="numeric"
                    min="0"
                    max="45"
                    value={years}
                    onChange={(e) => setYears(+e.target.value || 0)}
                    style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1.5px solid #CBD5E1", fontSize: 14, color: "#08142A" }}
                  />
                </div>
              </div>

              <div className="sc-grid-pair" style={{ marginBottom: 24 }}>
                <div className="field">
                  <label htmlFor="s-base" style={{ fontSize: 13, fontWeight: 600, color: "#08142A", marginBottom: 6, display: "block" }}>
                    Current Base Salary <span style={{ fontWeight: 400, color: "#64748B" }}>($/yr)</span>
                  </label>
                  <input
                    id="s-base"
                    type="number"
                    inputMode="numeric"
                    min="20000"
                    step="1000"
                    placeholder="118000"
                    value={baseInput}
                    onChange={(e) => {
                      setBaseInput(e.target.value);
                      const k = toK(e.target.value);
                      if (k && k >= 20) setSubmittedBase(k);
                    }}
                    style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1.5px solid #CBD5E1", fontSize: 14, color: "#08142A" }}
                  />
                </div>

                <div className="field">
                  <label htmlFor="s-bonus" style={{ fontSize: 13, fontWeight: 600, color: "#08142A", marginBottom: 6, display: "block" }}>
                    Annual Bonus <span style={{ fontWeight: 400, color: "#64748B" }}>(optional $/yr)</span>
                  </label>
                  <input
                    id="s-bonus"
                    type="number"
                    inputMode="numeric"
                    min="0"
                    step="500"
                    placeholder="8000"
                    value={bonusInput}
                    onChange={(e) => {
                      setBonusInput(e.target.value);
                      setSubmittedBonus(toK(e.target.value));
                    }}
                    style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1.5px solid #CBD5E1", fontSize: 14, color: "#08142A" }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14 }}>
                <button className="btn-emp-primary" type="submit" style={{ width: "100%", padding: "14px 28px", fontSize: 16 }}>
                  <span>Benchmark my salary now</span>
                  <span aria-hidden="true">↓</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* 2. RESULT ON BAND BAR & METRICS STUDIO */}
      <section className="sc-results-wrap" id="result">
        <div className="wrap">
          <div className="sec-head" style={{ textAlign: "center", maxWidth: 740, margin: "0 auto 40px" }}>
            <span className="eyebrow" style={{ color: "#1D4ED8", fontWeight: 700 }}>MARKET BENCHMARK REPORT</span>
            <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(28px, 3.6vw, 42px)", color: "#08142A", margin: "10px 0 14px" }}>
              {roleObj.name} pay in {cityObj.name}
            </h2>
            <p style={{ color: "#64748B", fontSize: 16 }}>
              Base salary distribution by years of practice. The <strong style={{ color: "#08142A" }}>{expBandObj.label}</strong> seniority tier is actively highlighted.
            </p>
          </div>

          {/* Three Key Benchmark Metric Cards */}
          <div className="sc-metrics-grid">
            <div className="sc-metric-card">
              <div>
                <span className="sc-metric-label">Market Range (25th–75th)</span>
                <div className="sc-metric-val">{expRange ? fmt.range(expRange) : "N/A"}</div>
              </div>
              <span className="sc-metric-sub">Middle 50% of law firm offers for your level</span>
            </div>

            <div className="sc-metric-card">
              <div>
                <span className="sc-metric-label">Market Median</span>
                <div className="sc-metric-val">{band ? fmt.k(band.median) : "N/A"}</div>
              </div>
              <span className="sc-metric-sub">Across all seniority levels in {cityObj.name}</span>
            </div>

            <div className="sc-metric-card">
              <div>
                <span className="sc-metric-label">Your Current Position</span>
                <div className="sc-metric-val" style={{ color: verdict?.status === "below" ? "#D97706" : verdict?.status === "above" ? "#059669" : "#1D4ED8" }}>
                  {submittedBase ? fmt.k(submittedBase) : "Enter base"}
                </div>
              </div>
              <span className="sc-metric-sub">
                {verdict ? (
                  <span style={{ fontWeight: 600 }}>
                    {verdict.status === "above" ? "Top quartile tier" : verdict.status === "below" ? "Below middle range" : "Within competitive band"}
                  </span>
                ) : (
                  "Benchmark ready"
                )}
              </span>
            </div>
          </div>

          {/* Graphical Visualizer Container */}
          <div style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 14, padding: "32px 28px", boxShadow: "0 4px 16px rgba(15, 23, 42, 0.04)" }}>
            <SalaryBandBar
              city={selectedCity}
              role={selectedRole}
              highlight={currentExpKey}
              marker={submittedBase ?? undefined}
            />

            <p style={{ fontSize: 12.5, color: "#64748B", marginTop: 24, paddingTop: 16, borderTop: "1px solid #E2E8F0", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
              <span>
                Source: Orion verified placements and regional legal offers. Updated Q1 2026. Base salary only.
              </span>
              <span style={{ fontWeight: 600, color: "#1D4ED8" }}>{bonusNormText}</span>
            </p>

            {/* In-depth Verdict Box */}
            <div id="verdict" aria-live="polite">
              {!submittedBase ? (
                <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 10, padding: "18px 20px", marginTop: 20, color: "#475569", fontSize: 14 }}>
                  Enter your current base salary above to place your position on the distribution curve. The typical market range for {expBandObj.label} in {cityObj.name} is <strong style={{ color: "#08142A" }}>{expRange ? fmt.range(expRange) : ""}</strong>.
                </div>
              ) : verdict ? (
                <div className="sc-verdict-box">
                  <div className={`sc-verdict-badge ${verdict.status}`}>
                    <span aria-hidden="true">●</span>
                    <span>{verdict.status === "above" ? "Above Market Benchmark" : verdict.status === "below" ? "Below Market Median" : "Within Market Band"}</span>
                  </div>
                  <h3 style={{ fontFamily: "var(--display)", fontSize: 21, color: "#08142A", margin: "0 0 8px" }}>
                    {verdict.head}
                  </h3>
                  <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.6, margin: "0 0 14px" }}>
                    {verdict.body}
                  </p>
                  {submittedBonus ? (
                    <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 8, padding: "12px 16px", fontSize: 13.5, color: "#334155" }}>
                      With your reported annual bonus of <strong>{fmt.k(submittedBonus)}</strong>, your total cash compensation stands at <strong>{fmt.k(submittedBase + submittedBonus)}</strong>. {bonusNormText}
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* 3. ROLES PAYING MORE */}
      <section className="emp-process-sec" id="more-block" style={{ background: "#FFFFFF", padding: "96px 0 108px" }}>
        <div className="wrap">
          <div className="sec-head" style={{ textAlign: "center", maxWidth: 740, margin: "0 auto 48px" }}>
            <span className="eyebrow" style={{ color: "#1D4ED8", fontWeight: 700 }}>VERIFIED HIGHER-PAYING OPENINGS</span>
            <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(28px, 3.6vw, 42px)", color: "#08142A", margin: "10px 0 14px" }}>
              Confidential lateral seats above your number
            </h2>
            <p style={{ color: "#64748B", fontSize: 16 }}>
              Law firms maintain confidentiality until your introductory discussion with Orion founder Justin. Verified base salary bands shown on every seat.
            </p>
          </div>

          <div id="more">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
              <div style={{ fontSize: 15, color: "#08142A", fontWeight: 600 }}>
                {submittedBase ? (
                  <>
                    <Mark>{String(rolesPayingMore.length)}</Mark> {rolesPayingMore.length === 1 ? "role" : "roles"} in {cityObj.name} paying more than your current base
                  </>
                ) : (
                  <>{rolesPayingMore.length} open roles in {cityObj.name}</>
                )}
              </div>
              <Link
                href={`/jobs`}
                style={{ fontSize: 14, fontWeight: 600, color: "#1D4ED8", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4 }}
              >
                <span>Browse all {cityObj.name} lateral seats</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            {rolesPayingMore.length > 0 ? (
              <div className="cards" style={{ display: "grid", gap: 20 }}>
                {rolesPayingMore.slice(0, 3).map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    why={
                      submittedBase
                        ? `Up to ${fmt.k(job.band[1])} base — ${fmt.k(job.band[1] - submittedBase)} higher than your current compensation.`
                        : undefined
                    }
                  />
                ))}
              </div>
            ) : (
              <div style={{ background: "#FAF9F5", border: "1.5px solid #E2E8F0", borderRadius: 14, padding: "36px 28px", textAlign: "center" }}>
                <p style={{ fontSize: 15, color: "#334155", margin: 0 }}>
                  <b>Your compensation already tops the standard public {cityObj.name} openings.</b> Partner-track lateral seats and practice group transitions are handled confidentially off-market. Connect with Justin to explore unlisted opportunities.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. EMAIL RESULT & CONFIDENTIAL CALL GATE FORM */}
      <section className="emp-process-sec" style={{ background: "#FAF9F5", padding: "96px 0 108px", borderTop: "1px solid #E2E8F0" }}>
        <div className="wrap split">
          <div>
            <div className="sec-head">
              <span className="eyebrow" style={{ color: "#1D4ED8", fontWeight: 700 }}>OFFICIAL MARKET GUIDE</span>
              <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(28px, 3.6vw, 40px)", color: "#08142A", margin: "10px 0 14px" }}>
                Receive your benchmark &amp; quarterly salary guide
              </h2>
              <p style={{ color: "#64748B", fontSize: 16, lineHeight: 1.6 }}>
                Retain this data for your next compensation review, or schedule a discreet 15-minute market debrief with Justin after business hours.
              </p>
            </div>

            <div style={{ display: "grid", gap: 16, marginTop: 28 }}>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ color: "#1D4ED8", fontWeight: 700, fontSize: 16 }}>✓</span>
                <span style={{ fontSize: 14.5, color: "#334155" }}>
                  <strong>Complete Regional Distribution Curve:</strong> 25th, 50th, 75th percentiles for all practice areas in {cityObj.name}.
                </span>
              </div>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ color: "#1D4ED8", fontWeight: 700, fontSize: 16 }}>✓</span>
                <span style={{ fontSize: 14.5, color: "#334155" }}>
                  <strong>Official Legal Salary Guide (PDF):</strong> Comprehensive quarterly compensation analysis for boutique &amp; mid-size law firms.
                </span>
              </div>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ color: "#1D4ED8", fontWeight: 700, fontSize: 16 }}>✓</span>
                <span style={{ fontSize: 14.5, color: "#334155" }}>
                  <strong>100% Confidential:</strong> We never share your data with your employer or any third party.
                </span>
              </div>
            </div>
          </div>

          <div id="talk">
            <GateForm
              eyebrow="FREE CONFIDENTIAL REPORT"
              title="Email me my benchmark &amp; city legal guide"
              audience="candidate"
              button="Send my confidential report"
              reviewSlug="vera-massey"
              fine="Always enter a personal email address. Your figures remain strictly confidential with Orion and are never shared with any employer."
              steps={[
                ["Immediate Delivery", `Your custom benchmark breakdown and the ${cityObj.name} Legal Salary Guide PDF will be sent to your inbox.`, true],
                ["Within 24 Hours", `Justin provides context on which firms in ${cityObj.name} pay in the top quartile for ${expBandObj.label} experience.`],
                ["Confidential Phone Debrief", "Optional 15-minute debrief after work hours to review your market leverage without any commitment."],
                ["Quarterly Updates", `Receive updated compensation benchmarks for ${roleObj.short}s in ${cityObj.name}. Cancel anytime.`],
              ]}
            />
          </div>
        </div>
      </section>

      {/* 5. METHODOLOGY & FAQ */}
      <section className="emp-process-sec" style={{ background: "#FFFFFF", padding: "96px 0 108px" }}>
        <div className="wrap split">
          <div className="sec-head">
            <span className="eyebrow" style={{ color: "#1D4ED8", fontWeight: 700 }}>DATA METHODOLOGY</span>
            <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(28px, 3.6vw, 40px)", color: "#08142A", margin: "10px 0 14px" }}>
              How our legal salary data works
            </h2>
            <p style={{ color: "#64748B", fontSize: 15 }}>
              Want to see detailed practice breakdowns? Explore{" "}
              <Link href="/salaries/estate-planning-attorney/houston-tx" style={{ color: "#1D4ED8", textDecoration: "underline" }}>
                Estate Planning Attorney Pay in Houston
              </Link>.
            </p>
          </div>

          <div className="faq" style={{ display: "grid", gap: 14 }}>
            <details style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 12, padding: "18px 22px" }}>
              <summary style={{ fontWeight: 600, color: "#08142A", cursor: "pointer", fontSize: 16 }}>
                Is the compensation I enter saved or shared?
              </summary>
              <p style={{ marginTop: 12, color: "#475569", lineHeight: 1.6, fontSize: 14.5 }}>
                No. The benchmarking calculator operates purely in your browser. Nothing is transmitted to external servers or logged unless you explicitly request the salary guide report by email.
              </p>
            </details>

            <details style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 12, padding: "18px 22px" }}>
              <summary style={{ fontWeight: 600, color: "#08142A", cursor: "pointer", fontSize: 16 }}>
                Where does Orion source this salary data?
              </summary>
              <p style={{ marginTop: 12, color: "#475569", lineHeight: 1.6, fontSize: 14.5 }}>
                Our numbers derive directly from executed employment contracts, verified lateral offer letters, and active mandates from small, boutique, and mid-size law firms across Texas.
              </p>
            </details>

            <details style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 12, padding: "18px 22px" }}>
              <summary style={{ fontWeight: 600, color: "#08142A", cursor: "pointer", fontSize: 16 }}>
                How is the percentile distribution bar calculated?
              </summary>
              <p style={{ marginTop: 12, color: "#475569", lineHeight: 1.6, fontSize: 14.5 }}>
                The highlighted track represents the interquartile range (25th to 75th percentiles): 25% of attorneys earn below the left boundary, and 25% earn above the right boundary. The vertical marker illustrates your relative standing.
              </p>
            </details>

            <details style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 12, padding: "18px 22px" }}>
              <summary style={{ fontWeight: 600, color: "#08142A", cursor: "pointer", fontSize: 16 }}>
                What if my current salary is below the market range?
              </summary>
              <p style={{ marginTop: 12, color: "#475569", lineHeight: 1.6, fontSize: 14.5 }}>
                A below-market salary is frequently the consequence of rapid tenure at one firm without lateral market adjustments. Explore our matching openings or contact Justin to establish your realistic lateral value.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* 6. BOTTOM MIDNIGHT NAVY CTA */}
      <section className="emp-terms-dark-sec" style={{ background: "#08142A", padding: "100px 0 108px", textAlign: "center" }}>
        <div className="wrap" style={{ maxWidth: 760, margin: "0 auto" }}>
          <div className="badge-capsule" style={{ marginBottom: 18 }}>
            <span className="badge-dot" />
            <span>CONFIDENTIAL LATERAL OPPORTUNITIES</span>
          </div>
          <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(32px, 4.2vw, 48px)", color: "#FFFFFF", margin: "0 0 16px" }}>
            Ready to explore roles that pay <span className="serif-accent" style={{ color: "#60A5FA" }}>what you are worth?</span>
          </h2>
          <p style={{ color: "#CBD5E1", fontSize: 17, lineHeight: 1.6, marginBottom: 32 }}>
            Confidential openings with verified pay bands. Your current firm never knows you are looking.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            <Link href="/upload-resume" className="btn-emp-primary" style={{ padding: "14px 34px", fontSize: 16 }}>
              <span>Upload your resume</span>
              <span aria-hidden="true">→</span>
            </Link>
            <a href="#sc" className="btn-emp-ghost" style={{ padding: "14px 34px", fontSize: 16 }}>
              <span>Recalculate your pay</span>
              <span aria-hidden="true">↑</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
