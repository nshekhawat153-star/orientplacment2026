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
  trust,
} from "@/data";
import { TrustLine } from "@/components/Rating";
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
    <div style={{ background: "#FAF9F5", minHeight: "100vh", color: "#08142A" }}>
      <style>{`
        .sc-hero-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 48px;
          align-items: center;
        }
        .sc-terminal-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 14px;
          padding: 30px 28px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.35);
          color: "#08142A";
        }
        .sc-metrics-row {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 20px;
          margin-bottom: 28px;
        }
        .sc-metric-box {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          padding: 24px 22px;
          box-shadow: 0 2px 10px rgba(8, 20, 42, 0.03);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .sc-split-grid {
          display: grid;
          grid-template-columns: 1.25fr 0.75fr;
          gap: 36px;
          align-items: start;
        }
        .sc-jobs-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 20px;
          align-items: stretch;
        }
        .sc-methodology-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: start;
        }
        .sc-faq-accordion {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          padding: 18px 22px;
          margin-bottom: 12px;
          box-shadow: 0 2px 8px rgba(8, 20, 42, 0.02);
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .sc-faq-accordion:hover {
          border-color: #CBD5E1;
          box-shadow: 0 4px 14px rgba(8, 20, 42, 0.04);
        }
        .sc-faq-accordion summary {
          font-weight: 700;
          color: #08142A;
          cursor: pointer;
          font-size: 0.98rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          list-style: none;
        }
        .sc-faq-accordion summary::-webkit-details-marker {
          display: none;
        }
        .sc-faq-accordion p {
          margin: 10px 0 0;
          font-size: 0.91rem;
          color: #475569;
          line-height: 1.6;
        }
        @media (max-width: 1024px) {
          .sc-jobs-grid { grid-template-columns: 1fr; }
          .sc-methodology-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 960px) {
          .sc-hero-grid { grid-template-columns: 1fr; }
          .sc-metrics-row { grid-template-columns: 1fr; }
          .sc-split-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* 1. LUXURY HERO WITH VIDEO & 2-COLUMN TERMINAL CONSOLE */}
      <section
        className="emp-luxury-hero-sec sc-luxury-hero-sec"
        style={{
          position: "relative",
          background: "#08142A",
          color: "#FFFFFF",
          padding: "124px 0 76px",
          overflow: "hidden",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        <div className="hero-video-wrap" aria-hidden="true">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="hero-video-el"
          >
            <source src="/videos/hero-water-splash.mp4" type="video/mp4" />
            <source src="/media/splash.mp4" type="video/mp4" />
          </video>
          <div className="hero-video-gradient" />
          <div className="hero-video-radial-aura" />
        </div>

        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 3 }}>
          <div className="sc-hero-grid">
            {/* Left Column: Heading & Value Props */}
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
                  padding: "6px 14px",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "#93C5FD",
                  marginBottom: "18px",
                }}
              >
                <span className="hero-eyebrow-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#60A5FA" }} />
                <span>COMPENSATION BENCHMARK<span className="eyebrow-sep"> · </span><br className="eyebrow-break" />100% PRIVATE IN BROWSER</span>
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
                Is your legal salary <br />
                <span className="serif-accent" style={{ color: "#60A5FA", fontStyle: "italic" }}>in line with the market?</span>
              </h1>

              <p
                style={{
                  fontSize: "1.12rem",
                  lineHeight: 1.6,
                  color: "rgba(255, 255, 255, 0.82)",
                  maxWidth: "540px",
                  margin: "0 0 28px",
                }}
              >
                {roleObj.name}s in {cityObj.name} with {expBandObj.label} earn{" "}
                <span style={{ color: "#93C5FD", fontWeight: 700 }}>{expRange ? fmt.range(expRange) : "market rates"}</span> base. Benchmark your current compensation against verified Texas law firm offers and active lateral placements.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.9rem", color: "rgba(255, 255, 255, 0.85)" }}>
                  <span style={{ color: "#60A5FA", fontWeight: 700 }}>✓</span> Runs 100% client-side in your browser — zero tracking
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.9rem", color: "rgba(255, 255, 255, 0.85)" }}>
                  <span style={{ color: "#60A5FA", fontWeight: 700 }}>✓</span> Calibrated quarterly with executed Texas lateral offer data
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.9rem", color: "rgba(255, 255, 255, 0.85)" }}>
                  <span style={{ color: "#60A5FA", fontWeight: 700 }}>✓</span> Nothing is ever logged or shared with any firm
                </div>
              </div>

              <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.12)", paddingTop: 18 }}>
                <TrustLine dark />
              </div>
            </div>

            {/* Right Column: High-End Interactive Calculator Card */}
            <div className="sc-terminal-card" id="sc">
              <form onSubmit={handleSubmit}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, borderBottom: "1px solid #E2E8F0", paddingBottom: 14 }}>
                  <div>
                    <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#1D4ED8", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                      Private Assessment
                    </span>
                    <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#08142A", margin: "2px 0 0" }}>
                      Enter Compensation Details
                    </h3>
                  </div>
                  <span style={{ fontSize: "0.75rem", background: "#EFF6FF", color: "#1D4ED8", padding: "4px 8px", borderRadius: 4, fontWeight: 700 }}>
                    Client-Side Only
                  </span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div>
                    <label htmlFor="s-role" style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#475569", marginBottom: 6 }}>
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
                      style={{ width: "100%", padding: "10px 12px", borderRadius: 7, border: "1.5px solid #CBD5E1", fontSize: "0.92rem", color: "#08142A", background: "#FFFFFF", fontWeight: 600 }}
                    >
                      {availableRoles.map((r) => (
                        <option key={r.slug} value={r.slug}>
                          {r.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div>
                      <label htmlFor="s-city" style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#475569", marginBottom: 6 }}>
                        Metro Market
                      </label>
                      <select
                        id="s-city"
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        style={{ width: "100%", padding: "10px 12px", borderRadius: 7, border: "1.5px solid #CBD5E1", fontSize: "0.92rem", color: "#08142A", background: "#FFFFFF", fontWeight: 600 }}
                      >
                        {availableCities.map((c) => (
                          <option key={c.slug} value={c.slug}>
                            {c.name}, {c.state}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="s-years" style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#475569", marginBottom: 6 }}>
                        Years Post-Bar
                      </label>
                      <input
                        id="s-years"
                        type="number"
                        min="0"
                        max="45"
                        value={years}
                        onChange={(e) => setYears(+e.target.value || 0)}
                        style={{ width: "100%", padding: "10px 12px", borderRadius: 7, border: "1.5px solid #CBD5E1", fontSize: "0.92rem", color: "#08142A", fontWeight: 600 }}
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 12 }}>
                    <div>
                      <label htmlFor="s-base" style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#475569", marginBottom: 6 }}>
                        Current Base ($/yr)
                      </label>
                      <div style={{ position: "relative" }}>
                        <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#94A3B8", fontWeight: 700 }}>$</span>
                        <input
                          id="s-base"
                          type="number"
                          step="1000"
                          placeholder="118000"
                          value={baseInput}
                          onChange={(e) => {
                            setBaseInput(e.target.value);
                            const k = toK(e.target.value);
                            if (k && k >= 20) setSubmittedBase(k);
                          }}
                          style={{ width: "100%", padding: "10px 12px 10px 28px", borderRadius: 7, border: "1.5px solid #CBD5E1", fontSize: "0.92rem", color: "#08142A", fontWeight: 600 }}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="s-bonus" style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#475569", marginBottom: 6 }}>
                        Bonus ($/yr)
                      </label>
                      <div style={{ position: "relative" }}>
                        <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#94A3B8", fontWeight: 700 }}>$</span>
                        <input
                          id="s-bonus"
                          type="number"
                          step="500"
                          placeholder="8000"
                          value={bonusInput}
                          onChange={(e) => {
                            setBonusInput(e.target.value);
                            setSubmittedBonus(toK(e.target.value));
                          }}
                          style={{ width: "100%", padding: "10px 12px 10px 28px", borderRadius: 7, border: "1.5px solid #CBD5E1", fontSize: "0.92rem", color: "#08142A", fontWeight: 600 }}
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    style={{
                      background: "#1D4ED8",
                      color: "#FFFFFF",
                      padding: "13px 24px",
                      borderRadius: 7,
                      fontWeight: 600,
                      fontSize: "0.95rem",
                      border: "none",
                      cursor: "pointer",
                      boxShadow: "0 4px 14px rgba(29, 78, 216, 0.35)",
                      marginTop: 6,
                    }}
                  >
                    Benchmark My Compensation →
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 2. RESULT ON BAND BAR & METRICS STUDIO */}
      <section style={{ maxWidth: "1200px", margin: "80px auto 0", padding: "0 24px" }} id="result">
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
            Verified Placement Distribution
          </div>
          <h2 style={{ fontSize: "2.2rem", fontWeight: 700, color: "#08142A", margin: "0 0 10px", fontFamily: "var(--font-serif, Georgia, serif)" }}>
            {roleObj.name} Pay in {cityObj.name}
          </h2>
          <p style={{ margin: 0, color: "#64748B", fontSize: "1.02rem" }}>
            Base salary distribution by years of practice. The <strong style={{ color: "#08142A" }}>{expBandObj.label}</strong> seniority tier is actively highlighted.
          </p>
        </div>

        {/* 3 Metric Cards */}
        <div className="sc-metrics-row">
          <div className="sc-metric-box">
            <div>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: 6 }}>
                Market Range (25th–75th)
              </span>
              <div style={{ fontSize: "2rem", fontWeight: 800, color: "#08142A", fontFamily: "var(--font-serif, Georgia, serif)" }}>
                {expRange ? fmt.range(expRange) : "N/A"}
              </div>
            </div>
            <span style={{ fontSize: "0.82rem", color: "#64748B", marginTop: 10 }}>
              Middle 50% of law firm placements for your level
            </span>
          </div>

          <div className="sc-metric-box">
            <div>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: 6 }}>
                Market Median
              </span>
              <div style={{ fontSize: "2rem", fontWeight: 800, color: "#08142A", fontFamily: "var(--font-serif, Georgia, serif)" }}>
                {band ? fmt.k(band.median) : "N/A"}
              </div>
            </div>
            <span style={{ fontSize: "0.82rem", color: "#64748B", marginTop: 10 }}>
              Across all seniority levels in {cityObj.name}
            </span>
          </div>

          <div className="sc-metric-box">
            <div>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: 6 }}>
                Your Current Position
              </span>
              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: 800,
                  fontFamily: "var(--font-serif, Georgia, serif)",
                  color: verdict?.status === "below" ? "#D97706" : verdict?.status === "above" ? "#059669" : "#1D4ED8",
                }}
              >
                {submittedBase ? fmt.k(submittedBase) : "Enter Base"}
              </div>
            </div>
            <span style={{ fontSize: "0.82rem", fontWeight: 600, color: verdict?.status === "above" ? "#059669" : verdict?.status === "below" ? "#D97706" : "#1D4ED8", marginTop: 10 }}>
              {verdict ? (verdict.status === "above" ? "Top quartile tier" : verdict.status === "below" ? "Below middle range" : "Within competitive band") : "Benchmark ready"}
            </span>
          </div>
        </div>

        {/* Graphical Salary Band Visualizer */}
        <div
          style={{
            background: "#FFFFFF",
            border: "1px solid #E2E8F0",
            borderRadius: 14,
            padding: "36px 32px",
            boxShadow: "0 4px 20px rgba(8, 20, 42, 0.04)",
          }}
        >
          <SalaryBandBar
            city={selectedCity}
            role={selectedRole}
            highlight={currentExpKey}
            marker={submittedBase ?? undefined}
          />

          <div style={{ fontSize: "0.85rem", color: "#64748B", marginTop: 28, paddingTop: 18, borderTop: "1px solid #E2E8F0", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
            <span>
              Source: Orion verified placements and regional legal offers. Updated Q1 2026. Base salary only.
            </span>
            <span style={{ fontWeight: 600, color: "#1D4ED8" }}>{bonusNormText}</span>
          </div>

          {/* Detailed Verdict Card */}
          {verdict && (
            <div
              style={{
                marginTop: 24,
                padding: "24px 26px",
                borderRadius: 12,
                background: verdict.status === "within" ? "#EFF6FF" : verdict.status === "above" ? "#F0FDF4" : "#FFFBEB",
                border: `1.5px solid ${verdict.status === "within" ? "#BFDBFE" : verdict.status === "above" ? "#BBF7D0" : "#FDE68A"}`,
              }}
            >
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", padding: "4px 10px", borderRadius: 100, marginBottom: 10, background: verdict.status === "within" ? "#DBEAFE" : verdict.status === "above" ? "#DCFCE7" : "#FEF3C7", color: verdict.status === "within" ? "#1E40AF" : verdict.status === "above" ? "#15803D" : "#B45309" }}>
                <span>●</span>
                <span>{verdict.status === "above" ? "Above Market Benchmark" : verdict.status === "below" ? "Below Market Median" : "Within Market Band"}</span>
              </div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#08142A", margin: "0 0 8px" }}>
                {verdict.head}
              </h3>
              <p style={{ fontSize: "0.95rem", color: "#334155", lineHeight: 1.6, margin: "0 0 14px" }}>
                {verdict.body}
              </p>
              {submittedBonus && submittedBase != null ? (
                <div style={{ background: "#FFFFFF", border: "1px solid #CBD5E1", borderRadius: 8, padding: "12px 16px", fontSize: "0.9rem", color: "#334155" }}>
                  With your reported annual bonus of <strong>{fmt.k(submittedBonus)}</strong>, your total cash compensation stands at <strong>{fmt.k(submittedBase + submittedBonus)}</strong>. {bonusNormText}
                </div>
              ) : null}
            </div>
          )}
        </div>
      </section>

      {/* 3. ROLES PAYING MORE */}
      <section style={{ maxWidth: "1200px", margin: "90px auto 0", padding: "0 24px" }} id="more-block">
        <div style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 36px" }}>
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
            VERIFIED HIGHER-PAYING SEATS · {cityObj.name.toUpperCase()}
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
            Confidential Lateral Seats{" "}
            <span className="serif-accent" style={{ color: "#1D4ED8", fontStyle: "italic" }}>
              Above Your Number
            </span>
          </h2>
          <p style={{ color: "#64748B", fontSize: "1.05rem", lineHeight: 1.6, margin: "0 0 16px" }}>
            Boutique and mid-size law firm openings offering verified compensation packages above your current benchmark.
          </p>
          <div>
            <Link
              href="/jobs"
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
              <span>Browse all {cityObj.name} lateral seats</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {rolesPayingMore.length > 0 ? (
          <div className="sc-jobs-grid">
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
          <div style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 14, padding: "36px 28px", textAlign: "center" }}>
            <p style={{ fontSize: "0.95rem", color: "#334155", margin: 0 }}>
              <b>Your compensation already tops standard public openings in {cityObj.name}.</b> Partner-track lateral seats and practice group transitions are handled confidentially off-market. Connect with Justin to explore unlisted opportunities.
            </p>
          </div>
        )}
      </section>

      {/* 4. EMAIL RESULT & CONFIDENTIAL CALL GATE FORM */}
      <section style={{ maxWidth: "1200px", margin: "90px auto 0", padding: "0 24px" }}>
        <div className="sc-split-grid">
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
                Official Market Report
              </div>
              <h2 style={{ fontSize: "2.2rem", fontWeight: 700, color: "#08142A", margin: "0 0 12px", fontFamily: "var(--font-serif, Georgia, serif)" }}>
                Receive Your Benchmark &amp; Quarterly Legal Salary Guide
              </h2>
              <p style={{ color: "#64748B", fontSize: "1.02rem", lineHeight: 1.6, margin: 0 }}>
                Retain this data for your next compensation review, or schedule a discreet 15-minute market debrief with Justin after business hours.
              </p>
            </div>

            <div style={{ display: "grid", gap: 14 }}>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ color: "#1D4ED8", fontWeight: 700 }}>✓</span>
                <span style={{ fontSize: "0.92rem", color: "#334155" }}>
                  <strong>Complete Regional Distribution Curve:</strong> 25th, 50th, and 75th percentiles for all practice areas in {cityObj.name}.
                </span>
              </div>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ color: "#1D4ED8", fontWeight: 700 }}>✓</span>
                <span style={{ fontSize: "0.92rem", color: "#334155" }}>
                  <strong>Official Legal Salary Guide (PDF):</strong> Comprehensive quarterly compensation analysis for boutique &amp; mid-size law firms.
                </span>
              </div>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ color: "#1D4ED8", fontWeight: 700 }}>✓</span>
                <span style={{ fontSize: "0.92rem", color: "#334155" }}>
                  <strong>100% Confidential:</strong> We never share your data with your employer or any third party.
                </span>
              </div>
            </div>
          </div>

          <div id="talk" style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 14, padding: "32px 28px", boxShadow: "0 4px 20px rgba(8, 20, 42, 0.04)" }}>
            <GateForm
              eyebrow="FREE CONFIDENTIAL REPORT"
              title="Email Me My Benchmark &amp; Salary Guide"
              audience="candidate"
              button="Send Confidential Report"
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

      {/* 5. DATA METHODOLOGY & FAQ */}
      <section style={{ maxWidth: "1200px", margin: "90px auto 0", padding: "0 24px" }}>
        <div className="sc-methodology-grid">
          <div>
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
              DATA METHODOLOGY · REAL-TIME VERIFICATION
            </div>
            <h2
              style={{
                fontFamily: "var(--font-serif, Georgia, serif)",
                fontSize: "clamp(2rem, 3.2vw, 2.6rem)",
                color: "#08142A",
                margin: "0 0 14px",
                fontWeight: 700,
                lineHeight: 1.2,
              }}
            >
              How Our Legal Salary Data{" "}
              <span className="serif-accent" style={{ color: "#1D4ED8", fontStyle: "italic" }}>
                Works
              </span>
            </h2>
            <p style={{ color: "#475569", fontSize: "1.02rem", lineHeight: 1.65, margin: "0 0 16px" }}>
              Transparent compensation intelligence specifically calibrated for boutique and mid-size law firms—eliminating BigLaw lockstep distortion and unverified crowd-sourced survey noise.
            </p>
            <p style={{ color: "#64748B", fontSize: "0.94rem", lineHeight: 1.6, margin: "0 0 24px" }}>
              Unlike generic salary aggregators that lump New York Cravath BigLaw lockstep salaries together with solo practitioners, Orion tracks authentic Texas small and mid-market economics. Every figure is calibrated against signed lateral offers, partner distributions, and active hiring search mandates.
            </p>

            <div style={{ display: "grid", gap: 12, marginBottom: 28 }}>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ color: "#1D4ED8", fontWeight: 700, marginTop: 1 }}>✓</span>
                <span style={{ fontSize: "0.92rem", color: "#334155" }}>
                  <strong>100% Client-Side Privacy:</strong> Zero compensation figures or personal identities are logged, transmitted, or stored.
                </span>
              </div>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ color: "#1D4ED8", fontWeight: 700, marginTop: 1 }}>✓</span>
                <span style={{ fontSize: "0.92rem", color: "#334155" }}>
                  <strong>Verified Lateral Contracts:</strong> Calibrated with executed offer letters from over 200 Texas boutique and mid-size firms.
                </span>
              </div>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ color: "#1D4ED8", fontWeight: 700, marginTop: 1 }}>✓</span>
                <span style={{ fontSize: "0.92rem", color: "#334155" }}>
                  <strong>Boutique Hour Targets:</strong> Grounded in realistic 1,600–1,900 billable hour targets, not 2,200+ BigLaw quotas.
                </span>
              </div>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
              <a
                href={trust.calendly}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#1D4ED8",
                  color: "#FFFFFF",
                  padding: "12px 22px",
                  borderRadius: 7,
                  fontWeight: 600,
                  fontSize: "0.92rem",
                  textDecoration: "none",
                  boxShadow: "0 4px 14px rgba(29, 78, 216, 0.35)",
                }}
              >
                <span>Book 15 Min Call with Justin</span>
                <span aria-hidden="true">→</span>
              </a>
              <Link
                href={`/salaries/estate-planning-attorney/${cityObj.slug}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  background: "#FFFFFF",
                  border: "1.5px solid #CBD5E1",
                  color: "#08142A",
                  padding: "11px 18px",
                  borderRadius: 7,
                  fontWeight: 600,
                  fontSize: "0.92rem",
                  textDecoration: "none",
                }}
              >
                <span>Explore {cityObj.name} Pay Guides</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <div>
            {/* Top Right Methodology & Context Card */}
            <div
              style={{
                background: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderRadius: 14,
                padding: "24px 26px",
                marginBottom: 16,
                boxShadow: "0 2px 10px rgba(8, 20, 42, 0.03)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#1D4ED8" }} />
                <span
                  style={{
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    color: "#1D4ED8",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  Compensation Integrity &amp; Verification Standards
                </span>
              </div>
              <p style={{ fontSize: "0.94rem", color: "#334155", lineHeight: 1.65, margin: "0 0 10px" }}>
                Orion benchmarks are compiled directly from executed boutique and mid-size Texas legal placement agreements, verified lateral offer letters, and active hiring search mandates. We eliminate unverified crowd-sourced survey noise and misleading BigLaw lockstep averages.
              </p>
              <p style={{ fontSize: "0.88rem", color: "#64748B", lineHeight: 1.55, margin: 0 }}>
                Every data point accounts for realistic billable hour targets (1,600 to 1,900 hours/year), base salary minimums, originations splits, and annual performance distributions across Texas metropolitan markets.
              </p>
            </div>

            <details className="sc-faq-accordion" open>
              <summary>
                <span>Is the compensation I enter saved or shared?</span>
                <span style={{ color: "#1D4ED8", fontSize: "1.2rem", fontWeight: 700 }}>+</span>
              </summary>
              <p>
                No. The benchmarking calculator operates purely in your local browser sandbox. Nothing is transmitted to external servers, logged into databases, or tracked across sessions.
              </p>
              <p style={{ marginTop: 8 }}>
                Your current managing partners, firm administrators, and colleagues have zero visibility into your benchmarking queries.
              </p>
            </details>

            <details className="sc-faq-accordion">
              <summary>
                <span>Where does Orion source this salary data?</span>
                <span style={{ color: "#1D4ED8", fontSize: "1.2rem", fontWeight: 700 }}>+</span>
              </summary>
              <p>
                Our numbers derive directly from executed employment contracts, verified lateral offer letters, and active mandates from small, boutique, and mid-size law firms across Texas.
              </p>
              <p style={{ marginTop: 8 }}>
                Unlike broad national surveys that average BigLaw 2,200-hour lockstep salaries together with solo practitioners, Orion isolates boutique and mid-size economics so you get an accurate comparison for realistic law firm environments.
              </p>
            </details>

            <details className="sc-faq-accordion">
              <summary>
                <span>How is the percentile distribution bar calculated?</span>
                <span style={{ color: "#1D4ED8", fontSize: "1.2rem", fontWeight: 700 }}>+</span>
              </summary>
              <p>
                The highlighted track represents the interquartile range (25th to 75th percentiles): 25% of attorneys earn below the left boundary, and 25% earn above the right boundary. The vertical marker illustrates your relative standing.
              </p>
              <p style={{ marginTop: 8 }}>
                The median represents the statistical midpoint, while the 75th percentile benchmark highlights firms offering premium base compensation in exchange for specialized niche expertise or portable origination.
              </p>
            </details>

            <details className="sc-faq-accordion">
              <summary>
                <span>What if my current salary is below the market range?</span>
                <span style={{ color: "#1D4ED8", fontSize: "1.2rem", fontWeight: 700 }}>+</span>
              </summary>
              <p>
                A below-market salary is frequently the consequence of rapid tenure at one firm without lateral market adjustments. Internal associate raises often lag lateral market bidding by 15% to 35%.
              </p>
              <p style={{ marginTop: 8 }}>
                Explore our matching openings or contact Justin to establish your realistic lateral value and explore unlisted opportunities.
              </p>
            </details>
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
            Confidential Lateral Opportunities
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
            Ready to explore roles that pay{" "}
            <span className="serif-accent" style={{ color: "#60A5FA", fontStyle: "italic" }}>
              what you are worth?
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
            Confidential openings with verified pay bands. Your current firm never knows you are looking.
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
              Upload Your Resume →
            </Link>
            <a
              href="#sc"
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
              Recalculate Compensation ↑
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
