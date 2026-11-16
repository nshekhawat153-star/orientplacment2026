"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  roles,
  cities,
  expBands,
  samplePosting,
  parsePosting,
  findCity,
  findRole,
  findBand,
  fmt,
  matchCandidates,
  mustHaves,
  trust,
} from "@/data";
import { CandidateCard } from "@/components/CandidateCard";
import { SalaryBandBar } from "@/components/SalaryBand";
import { GateForm } from "@/components/GateForm";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Mark } from "@/components/Mark";
import { useSite } from "@/context/SiteContext";

export default function SubmitJobPage() {
  const { unlocked } = useSite();
  const [postingText, setPostingText] = useState("");
  const [note, setNote] = useState("");
  const [selectedRole, setSelectedRole] = useState("estate-planning-attorney");
  const [selectedCity, setSelectedCity] = useState("houston-tx");
  const [selectedYears, setSelectedYears] = useState("any");
  const [selectedMode, setSelectedMode] = useState<"any" | "on-site" | "hybrid">("any");
  const [lo, setLo] = useState<number | null>(null);
  const [hi, setHi] = useState<number | null>(null);
  const [mustTags, setMustTags] = useState<string[]>([]);
  const [foundFields, setFoundFields] = useState<Record<string, boolean>>({});
  const [requestedId, setRequestedId] = useState<string | null>(null);

  // Initialize with sample posting
  useEffect(() => {
    setPostingText(samplePosting);
    handleReadPosting(samplePosting, true);
  }, []);

  function handleReadPosting(text: string, isSample = false) {
    const p = parsePosting(text);
    setFoundFields(p.found);
    if (p.role) setSelectedRole(p.role);
    if (p.city) setSelectedCity(p.city);
    if (p.years) setSelectedYears(p.years);
    if (p.mode) setSelectedMode(p.mode);
    if (p.found.pay) {
      setLo(p.lo ?? null);
      setHi(p.hi ?? null);
    }
    setMustTags(p.must);

    const count = Object.keys(p.found).length + (p.must.length ? 1 : 0);
    setNote(
      isSample
        ? "Displaying parsed Texas Estate Planning sample. Paste your posting above to analyze yours."
        : `Successfully extracted ${count} of 6 parameters. Verified fields highlighted below; feel free to adjust.`
    );
  }

  const roleObj = findRole(selectedRole) || roles[0];
  const cityObj = findCity(selectedCity) || cities[0];

  const availableMustTags = useMemo(() => {
    return mustHaves[selectedRole] || mustHaves[roleObj.kind] || [];
  }, [selectedRole, roleObj]);

  function toggleMustTag(tag: string) {
    setMustTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  // Pay check logic
  const band = findBand(selectedCity, selectedRole);
  const expBandKey = selectedYears === "any" ? "b2" : selectedYears;
  const expBandObj = expBands.find((e) => e.key === expBandKey);
  const expRange = band ? band[expBandKey as "b1" | "b2" | "b3"] : null;

  let payVerdict: { where: "below" | "above" | "in"; advice: string; rangeText: string } | null = null;
  if (expRange && (lo !== null || hi !== null)) {
    const minVal = lo ?? hi!;
    const maxVal = hi ?? lo!;
    const effectiveLo = Math.min(minVal, maxVal);
    const effectiveHi = Math.max(minVal, maxVal);

    let where: "below" | "above" | "in" = "in";
    if (effectiveHi < expRange[0]) where = "below";
    else if (effectiveLo > expRange[1]) where = "above";

    let advice = "Most lateral candidates at this seniority level will readily take an interview call.";
    if (where === "below") {
      advice = `Consider adjusting the ceiling to ${fmt.k(expRange[0])}+ to maximize candidate interest from top boutique firms.`;
    } else if (where === "above") {
      advice = "Strong candidate response expected. Your firm can comfortably target premium lateral pedigrees.";
    }

    payVerdict = {
      where,
      advice,
      rangeText: fmt.range([effectiveLo, effectiveHi]),
    };
  }

  // Matches
  const matches = useMemo(() => {
    return matchCandidates({
      role: selectedRole,
      city: selectedCity,
      years: selectedYears,
      mode: selectedMode,
      pay: hi || lo || null,
      must: mustTags,
    });
  }, [selectedRole, selectedCity, selectedYears, selectedMode, lo, hi, mustTags]);

  const candidateIds = requestedId ? [requestedId] : matches.map((m) => m.c.id);

  return (
    <div style={{ background: "#FAF9F5", minHeight: "100vh", color: "#08142A" }}>
      <style>{`
        .sj-console-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 14px;
          padding: 28px 32px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.28);
          margin-top: 32px;
          text-align: left;
        }
        .sj-param-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
        }
        .sj-param-card {
          background: #FFFFFF;
          border: 1.5px solid #E2E8F0;
          border-radius: 10px;
          padding: 14px 16px;
          transition: all 0.2s ease;
        }
        .sj-param-card.found {
          border-color: #2563EB;
          background: #F8FAFC;
          box-shadow: 0 0 0 1px #2563EB;
        }
        .sj-two-col {
          display: grid;
          grid-template-columns: 1.25fr 0.75fr;
          gap: 36px;
          align-items: start;
        }
        .sj-chip {
          padding: 8px 16px;
          border-radius: 100px;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s ease;
          border: 1.5px solid #CBD5E1;
          background: #FFFFFF;
          color: #334155;
        }
        .sj-chip.active {
          background: #08142A;
          color: #FFFFFF;
          border-color: #08142A;
          box-shadow: 0 2px 6px rgba(8, 20, 42, 0.2);
        }
        .sj-steps-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 20px;
        }
        .sj-step-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          padding: 28px 22px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 2px 10px rgba(8, 20, 42, 0.03);
        }
        .sj-faq-item {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 10px;
          padding: 18px 22px;
          margin-bottom: 12px;
          transition: border-color 0.15s ease;
        }
        .sj-faq-item summary {
          font-weight: 700;
          color: #08142A;
          cursor: pointer;
          font-size: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .sj-faq-item p {
          margin: 12px 0 0;
          font-size: 0.92rem;
          color: #475569;
          line-height: 1.6;
        }
        @media (max-width: 960px) {
          .sj-param-grid { grid-template-columns: 1fr; }
          .sj-two-col { grid-template-columns: 1fr; }
          .sj-steps-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 640px) {
          .sj-steps-grid { grid-template-columns: 1fr; }
          .sj-console-card { padding: 20px; }
        }
      `}</style>

      {/* 1. LUXURY HERO WITH WATER SPLASH VIDEO & INTAKE CONSOLE */}
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

        <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1, textAlign: "center" }}>
          <div style={{ display: "inline-block", marginBottom: 20 }}>
            <Breadcrumb
              crumbs={[
                { label: "Home", href: "/" },
                { label: "For Employers", href: "/employers" },
                { label: "Submit Mandate", current: true },
              ]}
            />
          </div>

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
              Direct Mandate Intake · 100% Confidential
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
              Paste your job posting, see <span style={{ color: "#93C5FD", fontStyle: "italic" }}>who fits.</span>
            </h1>

            <p
              style={{
                fontSize: "1.12rem",
                lineHeight: 1.6,
                color: "rgba(255, 255, 255, 0.82)",
                maxWidth: "720px",
                margin: "0 auto",
              }}
            >
              We instantly extract practice focus, market, experience requirements, and compensation band — check the pay against live Texas market data, and reveal pre-screened matching lateral attorneys. Your mandate is never published anywhere.
            </p>
          </div>

          {/* Interactive Job Mandate Parser Console Card */}
          <form
            className="sj-console-card"
            id="post-form"
            onSubmit={(e) => {
              e.preventDefault();
              if (!postingText.trim()) {
                setNote("Please paste your posting text or use the sample button below.");
                return;
              }
              handleReadPosting(postingText, false);
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div>
                <span style={{ fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#1D4ED8" }}>
                  Intelligent Mandate Parser
                </span>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#08142A", margin: "2px 0 0" }}>
                  Paste Job Mandate or Requirements
                </h3>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.78rem", color: "#059669", background: "#ECFDF5", padding: "4px 10px", borderRadius: 100, fontWeight: 600 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981" }} />
                Instant Local Market Match
              </div>
            </div>

            <textarea
              id="p-text"
              rows={5}
              placeholder="Paste full job description from your careers site, LinkedIn, or an internal hiring committee memo..."
              value={postingText}
              onChange={(e) => setPostingText(e.target.value)}
              style={{
                width: "100%",
                padding: "16px 18px",
                borderRadius: 8,
                border: "1.5px solid #CBD5E1",
                fontSize: "0.95rem",
                color: "#08142A",
                outline: "none",
                background: "#FFFFFF",
                resize: "vertical",
                lineHeight: 1.6,
                fontFamily: "inherit",
              }}
            />

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginTop: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <button
                  type="submit"
                  style={{
                    background: "#1D4ED8",
                    color: "#FFFFFF",
                    padding: "12px 24px",
                    borderRadius: 7,
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 4px 14px rgba(29, 78, 216, 0.35)",
                    transition: "all 0.15s ease",
                  }}
                >
                  Analyze &amp; Match Candidates →
                </button>
                <button
                  type="button"
                  id="p-sample"
                  onClick={() => {
                    setPostingText(samplePosting);
                    handleReadPosting(samplePosting, true);
                  }}
                  style={{
                    background: "#F1F5F9",
                    color: "#475569",
                    padding: "12px 18px",
                    borderRadius: 7,
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    border: "1.5px solid #E2E8F0",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  Load Sample Texas Mandate
                </button>
              </div>

              {note && (
                <div style={{ fontSize: "0.85rem", color: "#047857", fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
                  <span>✓</span> {note}
                </div>
              )}
            </div>
          </form>

          {/* Micro Reassurances */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap", gap: "16px 24px", marginTop: 24, color: "rgba(255, 255, 255, 0.75)", fontSize: "0.85rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ color: "#60A5FA" }}>✓</span> 100% confidential intake
            </div>
            <span>•</span>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ color: "#60A5FA" }}>✓</span> Zero upfront retainer
            </div>
            <span>•</span>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ color: "#60A5FA" }}>✓</span> Live market compensation check
            </div>
            <span>•</span>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ color: "#60A5FA" }}>✓</span> 90-day replacement warranty
            </div>
          </div>
        </div>
      </section>

      {/* 2. EXTRACTED PARAMETERS & LIVE ADJUSTABLE FILTERS */}
      <section style={{ maxWidth: "1200px", margin: "60px auto 0", padding: "0 24px" }} id="read">
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
            Intelligent Parameter Extraction
          </div>
          <h2 style={{ fontSize: "2.2rem", fontWeight: 700, color: "#08142A", margin: "0 0 10px", fontFamily: "var(--font-serif, Georgia, serif)" }}>
            Extracted Job Mandate Parameters
          </h2>
          <p style={{ margin: 0, color: "#64748B", fontSize: "1.02rem" }}>
            Highlighted parameters were extracted from your text. Adjust any field below — the compensation analysis and matching candidates update in real time.
          </p>
        </div>

        {/* Form parameters grid */}
        <div className="sj-param-grid">
          {/* Role */}
          <div className={`sj-param-card ${foundFields.role ? "found" : ""}`}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.06em" }}>Practice Role</span>
              {foundFields.role && (
                <span style={{ fontSize: "0.7rem", color: "#1D4ED8", background: "#EFF6FF", padding: "2px 6px", borderRadius: 4, fontWeight: 700 }}>
                  Parsed
                </span>
              )}
            </div>
            <select
              id="c-role"
              value={selectedRole}
              onChange={(e) => {
                setSelectedRole(e.target.value);
                setFoundFields((prev) => ({ ...prev, role: false }));
              }}
              style={{ width: "100%", padding: "10px 12px", border: "1px solid #CBD5E1", borderRadius: 6, fontWeight: 600, fontSize: "0.92rem", color: "#08142A", background: "#FFFFFF" }}
            >
              {roles.map((r) => (
                <option key={r.slug} value={r.slug}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>

          {/* City */}
          <div className={`sj-param-card ${foundFields.city ? "found" : ""}`}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.06em" }}>Target Market</span>
              {foundFields.city && (
                <span style={{ fontSize: "0.7rem", color: "#1D4ED8", background: "#EFF6FF", padding: "2px 6px", borderRadius: 4, fontWeight: 700 }}>
                  Parsed
                </span>
              )}
            </div>
            <select
              id="c-city"
              value={selectedCity}
              onChange={(e) => {
                setSelectedCity(e.target.value);
                setFoundFields((prev) => ({ ...prev, city: false }));
              }}
              style={{ width: "100%", padding: "10px 12px", border: "1px solid #CBD5E1", borderRadius: 6, fontWeight: 600, fontSize: "0.92rem", color: "#08142A", background: "#FFFFFF" }}
            >
              {cities.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}, {c.state}
                </option>
              ))}
            </select>
          </div>

          {/* Years */}
          <div className={`sj-param-card ${foundFields.years ? "found" : ""}`}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.06em" }}>Years of Practice</span>
              {foundFields.years && (
                <span style={{ fontSize: "0.7rem", color: "#1D4ED8", background: "#EFF6FF", padding: "2px 6px", borderRadius: 4, fontWeight: 700 }}>
                  Parsed
                </span>
              )}
            </div>
            <select
              id="c-years"
              value={selectedYears}
              onChange={(e) => {
                setSelectedYears(e.target.value);
                setFoundFields((prev) => ({ ...prev, years: false }));
              }}
              style={{ width: "100%", padding: "10px 12px", border: "1px solid #CBD5E1", borderRadius: 6, fontWeight: 600, fontSize: "0.92rem", color: "#08142A", background: "#FFFFFF" }}
            >
              <option value="any">Any Experience Level</option>
              {expBands.map((eb) => (
                <option key={eb.key} value={eb.key}>
                  {eb.label}
                </option>
              ))}
            </select>
          </div>

          {/* Pay Range */}
          <div className={`sj-param-card ${foundFields.pay ? "found" : ""}`} style={{ gridColumn: "span 2" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Posted Base Compensation ($ Thousands / yr)
              </span>
              {foundFields.pay && (
                <span style={{ fontSize: "0.7rem", color: "#1D4ED8", background: "#EFF6FF", padding: "2px 6px", borderRadius: 4, fontWeight: 700 }}>
                  Parsed
                </span>
              )}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", gap: 10 }}>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#94A3B8", fontWeight: 700 }}>$</span>
                <input
                  id="c-lo"
                  type="number"
                  inputMode="numeric"
                  placeholder="Min ($k e.g. 115)"
                  value={lo ?? ""}
                  onChange={(e) => {
                    let v = +e.target.value;
                    if (v > 1000) v = Math.round(v / 1000);
                    setLo(v || null);
                    setFoundFields((prev) => ({ ...prev, pay: false }));
                  }}
                  style={{ width: "100%", padding: "10px 12px 10px 28px", border: "1px solid #CBD5E1", borderRadius: 6, fontWeight: 600, fontSize: "0.92rem", color: "#08142A" }}
                />
              </div>
              <span style={{ color: "#94A3B8", fontWeight: 700 }}>–</span>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#94A3B8", fontWeight: 700 }}>$</span>
                <input
                  id="c-hi"
                  type="number"
                  inputMode="numeric"
                  placeholder="Max ($k e.g. 150)"
                  value={hi ?? ""}
                  onChange={(e) => {
                    let v = +e.target.value;
                    if (v > 1000) v = Math.round(v / 1000);
                    setHi(v || null);
                    setFoundFields((prev) => ({ ...prev, pay: false }));
                  }}
                  style={{ width: "100%", padding: "10px 12px 10px 28px", border: "1px solid #CBD5E1", borderRadius: 6, fontWeight: 600, fontSize: "0.92rem", color: "#08142A" }}
                />
              </div>
            </div>
          </div>

          {/* Work Model */}
          <div className={`sj-param-card ${foundFields.mode ? "found" : ""}`}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.06em" }}>Work Model</span>
              {foundFields.mode && (
                <span style={{ fontSize: "0.7rem", color: "#1D4ED8", background: "#EFF6FF", padding: "2px 6px", borderRadius: 4, fontWeight: 700 }}>
                  Parsed
                </span>
              )}
            </div>
            <select
              id="c-mode"
              value={selectedMode}
              onChange={(e) => {
                setSelectedMode(e.target.value as any);
                setFoundFields((prev) => ({ ...prev, mode: false }));
              }}
              style={{ width: "100%", padding: "10px 12px", border: "1px solid #CBD5E1", borderRadius: 6, fontWeight: 600, fontSize: "0.92rem", color: "#08142A", background: "#FFFFFF" }}
            >
              <option value="any">Either (On-site or Hybrid)</option>
              <option value="on-site">On-site (Mon–Fri)</option>
              <option value="hybrid">Hybrid (Designated Office Days)</option>
            </select>
          </div>
        </div>

        {/* Must-Haves Tags Card */}
        <div
          style={{
            background: "#FFFFFF",
            border: "1px solid #E2E8F0",
            borderRadius: 12,
            padding: "24px 28px",
            marginTop: 20,
            boxShadow: "0 2px 10px rgba(8, 20, 42, 0.03)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#1D4ED8" }}>
                Candidate Matching Tags
              </span>
              <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#08142A", margin: "2px 0 0" }}>
                Must-Have Practice Skills &amp; Credentials
              </h4>
            </div>
            <span style={{ fontSize: "0.82rem", color: "#64748B" }}>
              Click any chip to toggle filter
            </span>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {availableMustTags.map((tag) => {
              const active = mustTags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  className={`sj-chip ${active ? "active" : ""}`}
                  aria-pressed={active}
                  onClick={() => toggleMustTag(tag)}
                >
                  {active ? `✓ ${tag}` : `+ ${tag}`}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. PAY CHECK & MATCHED CANDIDATES (2-COLUMN ARCHITECTURE) */}
      <section style={{ maxWidth: "1200px", margin: "72px auto 0", padding: "0 24px" }} id="results">
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
            Live Market Benchmark · Pre-Screened Talent
          </div>
          <h2 style={{ fontSize: "2.2rem", fontWeight: 700, color: "#08142A", margin: "0 0 10px", fontFamily: "var(--font-serif, Georgia, serif)" }}>
            Market Pay Check &amp; Matching Candidates
          </h2>
          <p style={{ margin: 0, color: "#64748B", fontSize: "1.02rem" }}>
            Verified market compensation range for this seat and available pre-screened candidate dossiers.
          </p>
        </div>

        <div className="sj-two-col">
          {/* Left Column: Compensation Check & Candidate Dossiers */}
          <div>
            {/* Pay Check Card */}
            <div
              style={{
                background: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderRadius: 14,
                padding: "28px 30px",
                boxShadow: "0 4px 20px rgba(8, 20, 42, 0.04)",
                marginBottom: 32,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#1D4ED8" }}>
                    Compensation Benchmark
                  </span>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#08142A", margin: "2px 0 0" }}>
                    {roleObj.name} in {cityObj.name}
                  </h3>
                </div>
                <span style={{ fontSize: "0.78rem", background: "#EFF6FF", color: "#1D4ED8", padding: "4px 10px", borderRadius: 100, fontWeight: 700 }}>
                  Texas Market Data
                </span>
              </div>

              {!lo && !hi ? (
                <div style={{ padding: "20px", background: "#F8FAFC", borderRadius: 8, textAlign: "center", color: "#64748B", fontSize: "0.92rem" }}>
                  Enter your target base salary above to benchmark your mandate against current Texas law firm placements.
                </div>
              ) : !band ? (
                <div style={{ padding: "20px", background: "#F8FAFC", borderRadius: 8, color: "#475569", fontSize: "0.92rem" }}>
                  <b>Pay check for {roleObj.short} in {cityObj.name}</b><br />
                  Justin will include customized pay data for this specific market with your matches.
                </div>
              ) : (
                <>
                  <p style={{ fontSize: "0.88rem", color: "#64748B", margin: "0 0 16px" }}>
                    Base salary ranges across 25th, median (50th), and 75th percentiles:
                  </p>
                  <SalaryBandBar
                    city={selectedCity}
                    role={selectedRole}
                    highlight={expBandKey}
                    marker={lo && hi ? (lo + hi) / 2 : lo || hi || undefined}
                  />

                  {payVerdict && (
                    <div
                      style={{
                        marginTop: 20,
                        padding: "16px 20px",
                        borderRadius: 10,
                        background: payVerdict.where === "in" ? "#ECFDF5" : payVerdict.where === "above" ? "#EFF6FF" : "#FFFBEB",
                        border: `1.5px solid ${payVerdict.where === "in" ? "#A7F3D0" : payVerdict.where === "above" ? "#BFDBFE" : "#FDE68A"}`,
                        color: payVerdict.where === "in" ? "#065F46" : payVerdict.where === "above" ? "#1E40AF" : "#92400E",
                      }}
                    >
                      <div style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: 4 }}>
                        Your posted range ({payVerdict.rangeText}) is {payVerdict.where === "in" ? "in line with" : payVerdict.where} the Texas median.
                      </div>
                      <div style={{ fontSize: "0.88rem", lineHeight: 1.5 }}>
                        The market range for {expBandObj?.label} in {cityObj.name} is {fmt.range(expRange!)}. {payVerdict.advice}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Matched Candidate Dossiers */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 20 }}>
              <div>
                <h3 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#08142A", margin: 0, fontFamily: "var(--font-serif, Georgia, serif)" }}>
                  {matches.length ? (
                    <>
                      <span style={{ color: "#1D4ED8" }}>{matches.length} Candidates</span> Match This Mandate
                    </>
                  ) : (
                    "No Exact Matches in Current Immediate Pool"
                  )}
                </h3>
                <span style={{ fontSize: "0.88rem", color: "#64748B", display: "block", marginTop: 4 }}>
                  {matches.length
                    ? unlocked
                      ? "All matching profiles unlocked"
                      : `Top 3 candidates displayed below; additional profiles delivered via intake dossier`
                    : "We actively search our 100,000+ attorney network for specific requirements."}
                </span>
              </div>
            </div>

            {!matches.length ? (
              <div style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 12, padding: "36px", textAlign: "center" }}>
                <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#08142A", margin: "0 0 8px" }}>
                  Active Headhunting Pool Available
                </h4>
                <p style={{ color: "#64748B", fontSize: "0.92rem", lineHeight: 1.6, margin: "0 0 16px" }}>
                  We frequently source confidential lateral candidates beyond our published listings. Submit your mandate and Justin will reply with tailored profiles within 1 business day.
                </p>
                <a
                  href="#gate"
                  style={{
                    background: "#08142A",
                    color: "#FFFFFF",
                    padding: "10px 20px",
                    borderRadius: 7,
                    fontWeight: 600,
                    fontSize: "0.88rem",
                    textDecoration: "none",
                    display: "inline-block",
                  }}
                >
                  Send Mandate to Justin →
                </a>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {(unlocked ? matches : matches.slice(0, 4)).map((r, i) => (
                  <CandidateCard
                    key={r.c.id}
                    candidate={r.c}
                    result={r}
                    locked={!unlocked && i >= 3}
                    onRequest={(cid) => {
                      setRequestedId(cid);
                      const gateEl = document.getElementById("gate");
                      if (gateEl) gateEl.scrollIntoView({ behavior: "smooth" });
                    }}
                  />
                ))}

                {!unlocked && matches.length > 3 && (
                  <div style={{ padding: "16px", background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 8, textAlign: "center", color: "#1D4ED8", fontSize: "0.9rem", fontWeight: 600 }}>
                    + {matches.length - 3} more matching candidates will be included in your confidential dossier package.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column: Sticky Mandate Submission GateForm */}
          <div id="gate" style={{ position: "sticky", top: 100 }}>
            <div
              style={{
                background: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderRadius: 14,
                padding: "32px 28px",
                boxShadow: "0 10px 30px rgba(8, 20, 42, 0.08)",
              }}
            >
              <GateForm
                eyebrow={matches.length > 3 ? `Review All ${matches.length} Matches` : "Submit Mandate"}
                title={
                  requestedId
                    ? `Request Confidential Dossier for ${requestedId}`
                    : "Send Mandate to Justin Missirlian"
                }
                bullets={[
                  `Full redacted resumes for ${matches.length ? "every matching candidate" : "candidates in our active network"}`,
                  "Verified compensation expectations, notice periods, and bar admission standing",
                  "One-page contingency terms (23% fee due only if you hire). Zero upfront cost.",
                ]}
                button="Deliver Candidate Dossiers"
                candidateIds={candidateIds}
                role={selectedRole}
                city={selectedCity}
                reviewSlug="daffner-law"
                fine="Your mandate is strictly confidential and never published. Zero fee unless you extend an offer and hire."
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. WORKFLOW: 4 EASY STEPS */}
      <section style={{ maxWidth: "1200px", margin: "90px auto 0", padding: "0 24px" }}>
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
            Frictionless Recruiting Protocol
          </div>
          <h2 style={{ fontSize: "2.2rem", fontWeight: 700, color: "#08142A", margin: "0 0 10px", fontFamily: "var(--font-serif, Georgia, serif)" }}>
            From Mandate Submission to First Interview
          </h2>
          <p style={{ margin: 0, color: "#64748B", fontSize: "1.02rem" }}>
            A streamlined lateral attorney placement process engineered specifically for law firm managing partners.
          </p>
        </div>

        <div className="sj-steps-grid">
          <div className="sj-step-card">
            <span style={{ fontFamily: "monospace", fontSize: "0.82rem", fontWeight: 700, color: "#1D4ED8", marginBottom: 12 }}>
              STEP 01 · SUBMISSION
            </span>
            <h4 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#08142A", margin: "0 0 8px" }}>
              Submit Job Mandate
            </h4>
            <p style={{ fontSize: "0.88rem", color: "#64748B", lineHeight: 1.6, margin: 0 }}>
              Paste your posting or informal notes above. Zero agreement and zero fee to initiate talent search.
            </p>
          </div>

          <div className="sj-step-card">
            <span style={{ fontFamily: "monospace", fontSize: "0.82rem", fontWeight: 700, color: "#1D4ED8", marginBottom: 12 }}>
              STEP 02 · 1 HOUR
            </span>
            <h4 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#08142A", margin: "0 0 8px" }}>
              Full Dossier Review
            </h4>
            <p style={{ fontSize: "0.88rem", color: "#64748B", lineHeight: 1.6, margin: 0 }}>
              Receive redacted candidate profiles, verified compensation histories, and our simple one-page terms.
            </p>
          </div>

          <div className="sj-step-card">
            <span style={{ fontFamily: "monospace", fontSize: "0.82rem", fontWeight: 700, color: "#1D4ED8", marginBottom: 12 }}>
              STEP 03 · MUTUAL CONSENT
            </span>
            <h4 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#08142A", margin: "0 0 8px" }}>
              Mutual Opt-In
            </h4>
            <p style={{ fontSize: "0.88rem", color: "#64748B", lineHeight: 1.6, margin: 0 }}>
              Neither firm nor candidate identity is disclosed without mutual affirmative consent to interview.
            </p>
          </div>

          <div className="sj-step-card">
            <span style={{ fontFamily: "monospace", fontSize: "0.82rem", fontWeight: 700, color: "#1D4ED8", marginBottom: 12 }}>
              STEP 04 · ON START DATE
            </span>
            <h4 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#08142A", margin: "0 0 8px" }}>
              23% Success Fee
            </h4>
            <p style={{ fontSize: "0.88rem", color: "#64748B", lineHeight: 1.6, margin: 0 }}>
              One contingency invoice due 15 days after start date, fully protected by our 90-day replacement warranty.
            </p>
          </div>
        </div>
      </section>

      {/* 5. FAQ SECTION */}
      <section style={{ maxWidth: "1200px", margin: "90px auto 0", padding: "0 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "48px", alignItems: "start" }} className="sj-two-col">
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
              Partner Inquiries
            </div>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 700, color: "#08142A", margin: "0 0 14px", fontFamily: "var(--font-serif, Georgia, serif)" }}>
              Mandate Intake FAQ
            </h2>
            <p style={{ color: "#64748B", fontSize: "1rem", lineHeight: 1.6, margin: "0 0 24px" }}>
              Don&apos;t have a formal job posting drafted yet? Start with our{" "}
              <Link href="/hiring-kit/estate-planning-attorney" style={{ color: "#1D4ED8", fontWeight: 600 }}>
                Hiring Kit Template
              </Link>{" "}
              or schedule a brief call directly with Justin Missirlian.
            </p>
            <a
              href={trust.calendly}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#08142A",
                color: "#FFFFFF",
                padding: "12px 20px",
                borderRadius: 7,
                fontWeight: 600,
                fontSize: "0.9rem",
                textDecoration: "none",
              }}
            >
              Book 15 Min Call with Justin →
            </a>
          </div>

          <div>
            <details className="sj-faq-item" open>
              <summary>
                <span>Is my firm&apos;s posting published anywhere online?</span>
                <span style={{ color: "#1D4ED8", fontSize: "1.2rem" }}>+</span>
              </summary>
              <p>
                No. Your posting is held strictly confidential and never published on public boards. We use it solely to parse key parameters, calibrate our algorithmic matching engine, and brief Justin Missirlian on your exact practice requirements. Candidates only see a general, unbranded practice summary until you mutually agree to an interview.
              </p>
            </details>

            <details className="sj-faq-item">
              <summary>
                <span>Can we keep our posting active on other recruiting boards?</span>
                <span style={{ color: "#1D4ED8", fontSize: "1.2rem" }}>+</span>
              </summary>
              <p>
                Yes, absolutely. Orion operates on a completely non-exclusive basis. You are free to keep your listing on your law firm&apos;s website, LinkedIn, Indeed, or state bar association boards. Our contingency fee only applies if you hire a candidate introduced directly through Orion.
              </p>
            </details>

            <details className="sj-faq-item">
              <summary>
                <span>What happens if our posted pay is below the market median?</span>
                <span style={{ color: "#1D4ED8", fontSize: "1.2rem" }}>+</span>
              </summary>
              <p>
                You can still submit your mandate. Justin will review the local Texas market dynamics for your role and provide candid guidance on which candidates will consider the opportunity, plus what slight adjustments or bonus incentives could unlock premium lateral talent.
              </p>
            </details>

            <details className="sj-faq-item">
              <summary>
                <span>What are Orion&apos;s fees and terms?</span>
                <span style={{ color: "#1D4ED8", fontSize: "1.2rem" }}>+</span>
              </summary>
              <p>
                There is zero fee to submit a job, zero retainer, and zero fee to review candidate dossiers. Orion charges a flat 23% contingency fee calculated on the candidate&apos;s first-year base salary, invoiced 15 days after their first working day. Every placement is protected by our 90-day replacement warranty.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* 6. BOTTOM LUXURY DARK CTA SECTION */}
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
            Direct Mandate Intake · Rapid Turnaround
          </div>
          <h2
            style={{
              fontSize: "2.4rem",
              fontWeight: 700,
              margin: "0 0 16px",
              fontFamily: "var(--font-serif, Georgia, serif)",
            }}
          >
            Submit your job and meet the <span style={{ color: "#93C5FD", fontStyle: "italic" }}>matches.</span>
          </h2>
          <p
            style={{
              color: "rgba(255, 255, 255, 0.8)",
              fontSize: "1.08rem",
              lineHeight: 1.6,
              margin: "0 0 32px",
            }}
          >
            Curated lateral attorney dossiers delivered directly to your inbox within the hour. Zero upfront retainer, non-exclusive agreement, and no fee unless you hire.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
            <a
              href="#gate"
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
              Send Mandate to Justin →
            </a>
            <a
              href={trust.calendly}
              target="_blank"
              rel="noopener noreferrer"
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
              Book 15 Min Call
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
