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
        : `Successfully extracted ${count} parameters. Verified fields highlighted below; feel free to adjust.`
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
    <div style={{ background: "#08142A", minHeight: "100vh", color: "#08142A" }}>
      <style>{`
        /* 1. Hero Section */
        .sj-hero-sec {
          position: relative;
          background: #08142A;
          color: #FFFFFF;
          padding: 128px 0 84px;
          overflow: hidden;
          text-align: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.12);
        }
        @media (max-width: 768px) {
          .sj-hero-sec {
            padding: 92px 0 48px;
          }
        }
        .sj-hero-wrap {
          position: relative;
          z-index: 2;
          max-width: 840px;
          margin: 0 auto;
          padding: 0 24px;
        }
        @media (max-width: 640px) {
          .sj-hero-wrap {
            padding: 0 16px;
          }
        }
        .sj-hero-h1 {
          font-family: var(--display);
          font-size: clamp(32px, 4.8vw, 54px);
          line-height: 1.15;
          font-weight: 500;
          color: #FFFFFF;
          margin: 0 auto 20px;
          max-width: 780px;
        }
        @media (max-width: 640px) {
          .sj-hero-h1 {
            font-size: 29px;
            line-height: 1.2;
            margin-bottom: 14px;
          }
        }
        .sj-hero-lead {
          font-size: clamp(15px, 1.8vw, 18px);
          line-height: 1.6;
          color: #CBD5E1;
          max-width: 640px;
          margin: 0 auto 34px;
        }
        @media (max-width: 640px) {
          .sj-hero-lead {
            font-size: 14.5px;
            margin-bottom: 24px;
          }
        }
        .sj-hero-actions {
          display: flex;
          justify-content: center;
          gap: 14px;
          flex-wrap: wrap;
          margin-bottom: 34px;
        }
        @media (max-width: 640px) {
          .sj-hero-actions {
            flex-direction: column;
            align-items: stretch;
            max-width: 330px;
            margin: 0 auto 26px;
            gap: 10px;
          }
          .sj-hero-actions a {
            width: 100%;
            justify-content: center;
            box-sizing: border-box;
          }
        }
        .sj-reassurances {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: 16px;
          font-size: 13px;
          color: #94A3B8;
        }
        .sj-reassurance-dot {
          color: rgba(255, 255, 255, 0.2);
        }
        @media (max-width: 640px) {
          .sj-reassurance-dot {
            display: none;
          }
          .sj-reassurances {
            display: grid !important;
            grid-template-columns: 1fr 1fr;
            gap: 10px 14px !important;
            max-width: 330px;
            margin: 0 auto;
            text-align: left;
            font-size: 12px;
          }
        }

        /* 2. Common Section Wrappers */
        .sj-section-wrap {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }
        @media (max-width: 640px) {
          .sj-section-wrap {
            padding: 0 16px;
          }
        }
        .sj-section-header {
          text-align: center;
          max-width: 760px;
          margin: 0 auto 36px;
        }
        @media (max-width: 640px) {
          .sj-section-header {
            margin: 0 auto 24px;
          }
        }

        /* 3. Mandate Intake Console */
        .sj-section-intake {
          background: #FFFFFF;
          padding: 84px 0 96px;
          border-bottom: 1px solid #E2E8F0;
        }
        @media (max-width: 768px) {
          .sj-section-intake {
            padding: 48px 0 56px;
          }
        }
        .sj-console-top {
          background: #FAF9F5;
          border-bottom: 1.5px solid #E2E8F0;
          padding: 28px 32px;
        }
        @media (max-width: 768px) {
          .sj-console-top {
            padding: 20px 16px;
          }
        }
        .sj-parser-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 14px;
        }
        @media (max-width: 640px) {
          .sj-parser-header {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
          }
          .sj-parser-header button {
            width: 100%;
            justify-content: center;
          }
        }
        .sj-parser-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 14px;
        }
        @media (max-width: 640px) {
          .sj-parser-footer {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
          }
          .sj-parser-footer-left {
            flex-direction: column;
            align-items: stretch !important;
            gap: 8px !important;
            width: 100%;
          }
          .sj-parser-footer-left button {
            width: 100%;
            justify-content: center;
          }
          .sj-parser-footer-left span {
            text-align: center;
          }
          .sj-note-badge {
            width: 100%;
            box-sizing: border-box;
            justify-content: center;
          }
        }
        .sj-console-bottom {
          padding: 30px 32px 28px;
        }
        @media (max-width: 768px) {
          .sj-console-bottom {
            padding: 20px 16px 20px;
          }
        }
        .sj-param-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
        }
        .sj-param-card {
          background: #FFFFFF;
          border: 1.5px solid #E2E8F0;
          border-radius: 8px;
          padding: 14px 16px;
          transition: all 0.2s ease;
        }
        .sj-param-card.found {
          border-color: #1D4ED8;
          background: #F8FAFC;
          box-shadow: 0 0 0 1px #1D4ED8;
        }
        .sj-param-span-2 {
          grid-column: span 2;
        }
        @media (max-width: 960px) {
          .sj-param-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }
          .sj-param-span-2 {
            grid-column: span 1 !important;
          }
        }
        @media (max-width: 640px) {
          .sj-param-card select,
          .sj-param-card input {
            font-size: 16px !important;
          }
        }
        .sj-chip {
          padding: 7px 14px;
          border-radius: 6px;
          font-size: 13px;
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
          box-shadow: 0 2px 6px rgba(8, 20, 42, 0.15);
        }
        .sj-must-tags-wrap {
          background: #FAF9F5;
          border: 1px solid #E2E8F0;
          border-radius: 10px;
          padding: 20px 22px;
          margin-top: 18px;
        }
        @media (max-width: 640px) {
          .sj-must-tags-wrap {
            padding: 16px 14px;
          }
        }

        /* 4. Results & Benchmark */
        .sj-section-results {
          background: #FAF9F5;
          padding: 88px 0 96px;
          border-bottom: 1px solid #E2E8F0;
        }
        @media (max-width: 768px) {
          .sj-section-results {
            padding: 48px 0 56px;
          }
        }
        .sj-benchmark-card {
          background: #FFFFFF;
          border: 1.5px solid #E2E8F0;
          border-radius: 14px;
          padding: 22px 28px;
          box-shadow: 0 4px 20px rgba(8, 20, 42, 0.04);
          margin-bottom: 32px;
        }
        @media (max-width: 768px) {
          .sj-benchmark-card {
            padding: 18px 16px;
            margin-bottom: 24px;
          }
        }
        .sj-two-col {
          display: grid;
          grid-template-columns: 1.25fr 0.75fr;
          gap: 32px;
          align-items: start;
        }
        .sj-benchmark-grid {
          display: grid;
          grid-template-columns: 1.1fr 1.4fr 1.2fr;
          gap: 24px;
          align-items: center;
        }
        @media (max-width: 960px) {
          .sj-benchmark-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .sj-benchmark-grid > div {
            border-right: none !important;
            border-bottom: 1px solid #E2E8F0 !important;
            padding-right: 0 !important;
            padding-bottom: 16px;
          }
          .sj-benchmark-grid > div:last-child {
            border-bottom: none !important;
            padding-bottom: 0;
          }
          .sj-two-col {
            grid-template-columns: 1fr;
            gap: 28px;
          }
        }
        .sj-gate-wrapper {
          position: sticky;
          top: 100px;
        }
        @media (max-width: 960px) {
          .sj-gate-wrapper {
            position: static !important;
            top: auto !important;
          }
        }
        .sj-gate-card {
          background: #FFFFFF;
          border: 1.5px solid #E2E8F0;
          border-radius: 14px;
          padding: 28px 26px;
          box-shadow: 0 10px 30px rgba(8, 20, 42, 0.08);
        }
        @media (max-width: 640px) {
          .sj-gate-card {
            padding: 20px 16px;
          }
        }

        /* 5. 4 Steps Section */
        .sj-section-steps {
          background: #FFFFFF;
          padding: 88px 0 96px;
          border-bottom: 1px solid #E2E8F0;
        }
        @media (max-width: 768px) {
          .sj-section-steps {
            padding: 48px 0 56px;
          }
        }
        .sj-steps-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 20px;
        }
        .sj-step-card {
          background: #FAF9F5;
          border: 1.5px solid #EAE7DC;
          border-radius: 12px;
          padding: 26px 22px;
          display: flex;
          flex-direction: column;
        }
        @media (max-width: 960px) {
          .sj-steps-grid { grid-template-columns: 1fr 1fr; gap: 16px; }
        }
        @media (max-width: 640px) {
          .sj-steps-grid { grid-template-columns: 1fr; gap: 14px; }
          .sj-step-card { padding: 20px 16px; }
        }

        /* 6. FAQ Section */
        .sj-section-faq {
          background: #FAF9F5;
          padding: 88px 0 96px;
          border-bottom: 1px solid #E2E8F0;
        }
        @media (max-width: 768px) {
          .sj-section-faq {
            padding: 48px 0 56px;
          }
        }
        .sj-faq-layout {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 48px;
          align-items: start;
        }
        @media (max-width: 960px) {
          .sj-faq-layout {
            grid-template-columns: 1fr;
            gap: 28px;
          }
        }
        .sj-faq-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #08142A;
          color: #FFFFFF;
          padding: 12px 24px;
          border-radius: 7px;
          font-weight: 600;
          font-size: 14px;
          text-decoration: none;
        }
        @media (max-width: 640px) {
          .sj-faq-btn {
            display: inline-flex;
            width: 100%;
            max-width: 300px;
            justify-content: center;
            box-sizing: border-box;
          }
        }
        .sj-faq-item {
          background: #FFFFFF;
          border: 1.5px solid #E2E8F0;
          border-radius: 10px;
          padding: 18px 22px;
          margin-bottom: 12px;
          transition: border-color 0.15s ease;
        }
        @media (max-width: 640px) {
          .sj-faq-item {
            padding: 16px 16px;
          }
        }
        .sj-faq-item summary {
          font-weight: 600;
          color: #08142A;
          cursor: pointer;
          font-size: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
        }
        .sj-faq-item p {
          margin: 12px 0 0;
          font-size: 0.92rem;
          color: #475569;
          line-height: 1.6;
        }

        /* 7. Bottom Dark CTA Section */
        .sj-section-cta {
          position: relative;
          background: #08142A;
          color: #FFFFFF;
          padding: 96px 0 108px;
          overflow: hidden;
          border-top: 1px solid rgba(255, 255, 255, 0.12);
        }
        @media (max-width: 768px) {
          .sj-section-cta {
            padding: 56px 0 64px;
          }
        }
        .sj-cta-btns {
          display: flex;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
        }
        @media (max-width: 640px) {
          .sj-cta-btns {
            flex-direction: column;
            align-items: stretch;
            max-width: 320px;
            margin: 0 auto;
            gap: 10px;
          }
          .sj-cta-btns a {
            width: 100%;
            justify-content: center;
            box-sizing: border-box;
          }
        }
      `}</style>

      {/* 1. LUXURY CENTERED HERO (NO BREADCRUMBS, NO CARD CLUTTER) */}
      <section className="emp-luxury-hero-sec sj-hero-sec">
        <div className="sj-hero-wrap">
          {/* Eyebrow Badge Capsule */}
          <div style={{ marginBottom: 20 }}>
            <div
              className="hero-eyebrow-capsule badge-capsule"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 999,
                padding: "6px 16px",
                fontFamily: "var(--mono)",
                fontSize: 11,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#93C5FD",
              }}
            >
              <span className="hero-eyebrow-dot badge-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#60A5FA" }} />
              <span>CONFIDENTIAL MANDATE INTAKE<span className="eyebrow-sep"> · </span><br className="eyebrow-break" />ZERO RETAINER</span>
            </div>
          </div>

          {/* Main Title */}
          <h1 className="sj-hero-h1">
            Submit your mandate, see{" "}
            <span className="serif-accent" style={{ color: "#60A5FA", fontStyle: "italic" }}>
              who fits.
            </span>
          </h1>

          {/* Clean Subtext */}
          <p className="sj-hero-lead">
            Paste your job description or define hiring parameters. We benchmark compensation against Texas law firm percentiles and match active, pre-screened lateral attorney dossiers.
          </p>

          {/* Action Buttons */}
          <div className="sj-hero-actions">
            <a
              href="#intake"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#1D4ED8",
                color: "#FFFFFF",
                fontWeight: 600,
                fontSize: 15,
                padding: "13px 28px",
                borderRadius: 7,
                textDecoration: "none",
                boxShadow: "0 4px 14px rgba(29, 78, 216, 0.4)",
              }}
            >
              <span>Start mandate intake</span>
              <span aria-hidden="true">↓</span>
            </a>
            <Link
              href="/find-candidates"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.18)",
                color: "#FFFFFF",
                fontWeight: 600,
                fontSize: 15,
                padding: "13px 26px",
                borderRadius: 7,
                textDecoration: "none",
              }}
            >
              <span>Browse candidate dossiers</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          {/* Micro Reassurances */}
          <div className="sj-reassurances">
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="3.5 8.5 6.5 11.5 12.5 4.5" />
              </svg>
              <span>Zero upfront retainer</span>
            </div>
            <span className="sj-reassurance-dot">·</span>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="3.5 8.5 6.5 11.5 12.5 4.5" />
              </svg>
              <span>Pay only if you hire</span>
            </div>
            <span className="sj-reassurance-dot">·</span>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="3.5 8.5 6.5 11.5 12.5 4.5" />
              </svg>
              <span>90-day replacement warranty</span>
            </div>
            <span className="sj-reassurance-dot">·</span>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="3.5 8.5 6.5 11.5 12.5 4.5" />
              </svg>
              <span>100% confidential</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. UNIFIED MANDATE INTAKE & SPECIFICATION CONSOLE */}
      <section id="intake" className="sj-section-intake">
        <div className="sj-section-wrap">
          <div className="sj-section-header">
            <div
              className="badge-capsule"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#EFF6FF",
                border: "1px solid #DBEAFE",
                borderRadius: 999,
                padding: "6px 14px",
                fontFamily: "var(--mono)",
                fontSize: 11,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#1D4ED8",
                marginBottom: 14,
              }}
            >
              <span className="badge-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#1D4ED8" }} />
              <span>STEP 01 · MANDATE SPECIFICATION</span>
            </div>

            <h2
              style={{
                fontSize: "clamp(26px, 3.4vw, 40px)",
                fontWeight: 400,
                color: "#08142A",
                margin: "0 0 12px",
                fontFamily: "var(--display)",
              }}
            >
              Define your open <span className="serif-accent" style={{ fontStyle: "italic", color: "#1D4ED8" }}>seat</span>
            </h2>
            <p style={{ margin: 0, color: "#64748B", fontSize: "1.02rem", lineHeight: 1.6 }}>
              Paste an existing job posting for automated extraction, or configure the verified parameters directly below.
              Market compensation and matched candidate dossiers update in real time.
            </p>
          </div>

          {/* UNIFIED CONSOLE CONTAINER */}
          <div
            style={{
              background: "#FFFFFF",
              border: "1.5px solid #E2E8F0",
              borderRadius: 16,
              boxShadow: "0 8px 30px rgba(15, 23, 42, 0.05)",
              overflow: "hidden",
            }}
          >
            {/* TOP HALF: SMART TEXT PARSER */}
            <div className="sj-console-top">
              <form
                id="post-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!postingText.trim()) {
                    setNote("Please paste your posting text or use the sample button.");
                    return;
                  }
                  handleReadPosting(postingText, false);
                  const resEl = document.getElementById("results");
                  if (resEl) resEl.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <div className="sj-parser-header">
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 8,
                        background: "rgba(29, 78, 216, 0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#1D4ED8",
                      }}
                    >
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                        <polyline points="10 9 9 9 8 9" />
                      </svg>
                    </div>
                    <div>
                      <span style={{ fontSize: 11, fontFamily: "var(--mono)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#1D4ED8", display: "block" }}>
                        Auto-Fill From Job Description
                      </span>
                      <h3 style={{ fontSize: 16, fontWeight: 600, color: "#08142A", margin: 0 }}>
                        Paste job description, careers link text, or hiring notes
                      </h3>
                    </div>
                  </div>

                  <button
                    type="button"
                    id="p-sample"
                    onClick={() => {
                      setPostingText(samplePosting);
                      handleReadPosting(samplePosting, true);
                    }}
                    style={{
                      background: "#FFFFFF",
                      color: "#08142A",
                      padding: "7px 16px",
                      borderRadius: 7,
                      fontWeight: 600,
                      fontSize: 13,
                      border: "1.5px solid #CBD5E1",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      transition: "all 0.15s ease",
                    }}
                  >
                    <span>Load Texas Estate Planning Sample</span>
                  </button>
                </div>

                <textarea
                  id="p-text"
                  rows={4}
                  placeholder="Paste full job description from LinkedIn, Indeed, firm website, or an internal hiring committee memo..."
                  value={postingText}
                  onChange={(e) => setPostingText(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    borderRadius: 8,
                    border: "1.5px solid #CBD5E1",
                    fontSize: 14,
                    color: "#08142A",
                    outline: "none",
                    background: "#FFFFFF",
                    resize: "vertical",
                    lineHeight: 1.6,
                    fontFamily: "inherit",
                  }}
                />

                <div className="sj-parser-footer">
                  <div className="sj-parser-footer-left" style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                    <button
                      type="submit"
                      style={{
                        background: "#1D4ED8",
                        color: "#FFFFFF",
                        padding: "11px 24px",
                        borderRadius: 7,
                        fontWeight: 600,
                        fontSize: 14,
                        border: "none",
                        cursor: "pointer",
                        boxShadow: "0 4px 14px rgba(29, 78, 216, 0.35)",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      <span>Extract Parameters &amp; Match</span>
                      <span aria-hidden="true">→</span>
                    </button>

                    <span style={{ fontSize: 13, color: "#64748B" }}>
                      or tweak the verified fields below
                    </span>
                  </div>

                  {note && (
                    <div
                      className="sj-note-badge"
                      style={{
                        fontSize: 13,
                        color: "#047857",
                        background: "#ECFDF5",
                        border: "1px solid #A7F3D0",
                        padding: "5px 12px",
                        borderRadius: 6,
                        fontWeight: 600,
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      <span>✓</span> {note}
                    </div>
                  )}
                </div>
              </form>
            </div>

            {/* BOTTOM HALF: VERIFIED & EDITABLE PARAMETERS GRID */}
            <div className="sj-console-bottom">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10, marginBottom: 18 }}>
                <div>
                  <span style={{ fontSize: 11, fontFamily: "var(--mono)", fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.06em", display: "block" }}>
                    Verified Parameters
                  </span>
                  <h4 style={{ fontSize: 17, fontWeight: 600, color: "#08142A", margin: "2px 0 0" }}>
                    Seat Specifications &amp; Live Filters
                  </h4>
                </div>
                <span style={{ fontSize: 12.5, color: "#64748B" }}>
                  Fields with <span style={{ color: "#1D4ED8", fontWeight: 700 }}>[Parsed]</span> were extracted from your text
                </span>
              </div>

              <div className="sj-param-grid">
                {/* Practice Area / Role */}
                <div className={`sj-param-card ${foundFields.role ? "found" : ""}`}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: "var(--mono)" }}>
                      Practice Role
                    </span>
                    {foundFields.role && (
                      <span style={{ fontSize: 10.5, color: "#1D4ED8", background: "#EFF6FF", padding: "2px 6px", borderRadius: 4, fontWeight: 700, fontFamily: "var(--mono)" }}>
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
                    style={{ width: "100%", padding: "9px 12px", border: "1.5px solid #CBD5E1", borderRadius: 6, fontWeight: 600, fontSize: 13.5, color: "#08142A", background: "#FFFFFF" }}
                  >
                    {roles.map((r) => (
                      <option key={r.slug} value={r.slug}>
                        {r.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* City / Target Market */}
                <div className={`sj-param-card ${foundFields.city ? "found" : ""}`}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: "var(--mono)" }}>
                      Target Market
                    </span>
                    {foundFields.city && (
                      <span style={{ fontSize: 10.5, color: "#1D4ED8", background: "#EFF6FF", padding: "2px 6px", borderRadius: 4, fontWeight: 700, fontFamily: "var(--mono)" }}>
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
                    style={{ width: "100%", padding: "9px 12px", border: "1.5px solid #CBD5E1", borderRadius: 6, fontWeight: 600, fontSize: 13.5, color: "#08142A", background: "#FFFFFF" }}
                  >
                    {cities.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.name}, {c.state}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Experience Band */}
                <div className={`sj-param-card ${foundFields.years ? "found" : ""}`}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: "var(--mono)" }}>
                      Experience Band
                    </span>
                    {foundFields.years && (
                      <span style={{ fontSize: 10.5, color: "#1D4ED8", background: "#EFF6FF", padding: "2px 6px", borderRadius: 4, fontWeight: 700, fontFamily: "var(--mono)" }}>
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
                    style={{ width: "100%", padding: "9px 12px", border: "1.5px solid #CBD5E1", borderRadius: 6, fontWeight: 600, fontSize: 13.5, color: "#08142A", background: "#FFFFFF" }}
                  >
                    <option value="any">Any Experience Level</option>
                    {expBands.map((eb) => (
                      <option key={eb.key} value={eb.key}>
                        {eb.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Base Compensation Range */}
                <div className={`sj-param-card sj-param-span-2 ${foundFields.pay ? "found" : ""}`}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: "var(--mono)" }}>
                      Target Base Compensation ($ Thousands / yr)
                    </span>
                    {foundFields.pay && (
                      <span style={{ fontSize: 10.5, color: "#1D4ED8", background: "#EFF6FF", padding: "2px 6px", borderRadius: 4, fontWeight: 700, fontFamily: "var(--mono)" }}>
                        Parsed
                      </span>
                    )}
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", gap: 10 }}>
                    <div style={{ position: "relative" }}>
                      <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#94A3B8", fontWeight: 700, fontSize: 13 }}>$</span>
                      <input
                        id="c-lo"
                        type="number"
                        inputMode="numeric"
                        placeholder="Min (e.g. 115)"
                        value={lo ?? ""}
                        onChange={(e) => {
                          let v = +e.target.value;
                          if (v > 1000) v = Math.round(v / 1000);
                          setLo(v || null);
                          setFoundFields((prev) => ({ ...prev, pay: false }));
                        }}
                        style={{ width: "100%", padding: "9px 12px 9px 28px", border: "1.5px solid #CBD5E1", borderRadius: 6, fontWeight: 600, fontSize: 13.5, color: "#08142A" }}
                      />
                    </div>
                    <span style={{ color: "#94A3B8", fontWeight: 700 }}>–</span>
                    <div style={{ position: "relative" }}>
                      <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#94A3B8", fontWeight: 700, fontSize: 13 }}>$</span>
                      <input
                        id="c-hi"
                        type="number"
                        inputMode="numeric"
                        placeholder="Max (e.g. 150)"
                        value={hi ?? ""}
                        onChange={(e) => {
                          let v = +e.target.value;
                          if (v > 1000) v = Math.round(v / 1000);
                          setHi(v || null);
                          setFoundFields((prev) => ({ ...prev, pay: false }));
                        }}
                        style={{ width: "100%", padding: "9px 12px 9px 28px", border: "1.5px solid #CBD5E1", borderRadius: 6, fontWeight: 600, fontSize: 13.5, color: "#08142A" }}
                      />
                    </div>
                  </div>
                </div>

                {/* Work Arrangement */}
                <div className={`sj-param-card ${foundFields.mode ? "found" : ""}`}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: "var(--mono)" }}>
                      Work Arrangement
                    </span>
                    {foundFields.mode && (
                      <span style={{ fontSize: 10.5, color: "#1D4ED8", background: "#EFF6FF", padding: "2px 6px", borderRadius: 4, fontWeight: 700, fontFamily: "var(--mono)" }}>
                        Parsed
                      </span>
                    )}
                  </div>
                  <select
                    id="c-mode"
                    value={selectedMode}
                    onChange={(e) => {
                      setSelectedMode(e.target.value as "any" | "on-site" | "hybrid");
                      setFoundFields((prev) => ({ ...prev, mode: false }));
                    }}
                    style={{ width: "100%", padding: "9px 12px", border: "1.5px solid #CBD5E1", borderRadius: 6, fontWeight: 600, fontSize: 13.5, color: "#08142A", background: "#FFFFFF" }}
                  >
                    <option value="any">Either (On-site or Hybrid)</option>
                    <option value="on-site">On-site (Mon–Fri)</option>
                    <option value="hybrid">Hybrid (Designated Office Days)</option>
                  </select>
                </div>
              </div>

              {/* Must-Haves Tags Container */}
              <div className="sj-must-tags-wrap">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
                  <div>
                    <span style={{ fontSize: 11, fontFamily: "var(--mono)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#1D4ED8" }}>
                      Candidate Matching Skills
                    </span>
                    <h5 style={{ fontSize: 14.5, fontWeight: 600, color: "#08142A", margin: "2px 0 0" }}>
                      Must-Have Practice Skills &amp; Credentials
                    </h5>
                  </div>
                  <span style={{ fontSize: 12, color: "#64748B" }}>
                    Click any chip to toggle filter
                  </span>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
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
            </div>
          </div>
        </div>
      </section>

      {/* 3. PAY CHECK & MATCHED CANDIDATES (2-COLUMN ARCHITECTURE) */}
      <section id="results" className="sj-section-results">
        <div className="sj-section-wrap">
          <div className="sj-section-header">
            <div
              className="badge-capsule"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#EFF6FF",
                border: "1px solid #DBEAFE",
                borderRadius: 999,
                padding: "6px 14px",
                fontFamily: "var(--mono)",
                fontSize: 11,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#1D4ED8",
                marginBottom: 12,
              }}
            >
              <span className="badge-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#1D4ED8" }} />
              <span>STEP 02 · MARKET BENCHMARK &amp; MATCHES</span>
            </div>
            <h2
              style={{
                fontSize: "clamp(24px, 3.2vw, 38px)",
                fontWeight: 400,
                color: "#08142A",
                margin: "0 0 10px",
                fontFamily: "var(--display)",
              }}
            >
              Market Pay Check &amp; <span className="serif-accent" style={{ fontStyle: "italic", color: "#1D4ED8" }}>Matching Candidates</span>
            </h2>
            <p style={{ margin: 0, color: "#64748B", fontSize: "1.02rem", lineHeight: 1.6 }}>
              Verified market compensation range for this seat and available pre-screened candidate dossiers.
            </p>
          </div>

          {/* COMPACT HORIZONTAL COMPENSATION INTELLIGENCE BAR */}
          <div className="sj-benchmark-card">
            <div className="sj-benchmark-grid">
              {/* COLUMN 1: ROLE, MARKET & EXPERIENCED SENIORITY */}
              <div style={{ borderRight: "1px solid #E2E8F0", paddingRight: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <span style={{ fontSize: 11, fontFamily: "var(--mono)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#1D4ED8" }}>
                    Market Benchmark
                  </span>
                  <span style={{ fontSize: 10.5, background: "#EFF6FF", color: "#1D4ED8", padding: "2px 7px", borderRadius: 4, fontWeight: 700, fontFamily: "var(--mono)" }}>
                    Texas Percentiles
                  </span>
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 500, color: "#08142A", margin: "0 0 3px", fontFamily: "var(--display)" }}>
                  {roleObj.name}
                </h3>
                <p style={{ fontSize: 13, color: "#64748B", margin: 0 }}>
                  {cityObj.name}, TX · {expBandObj?.label || "Any Experience"}
                </p>
              </div>

              {/* COLUMN 2: SALARY BAND BAR & PERCENTILES */}
              <div style={{ borderRight: "1px solid #E2E8F0", paddingRight: 20 }}>
                {!lo && !hi ? (
                  <div style={{ fontSize: 13, color: "#64748B", lineHeight: 1.5 }}>
                    Set your base salary range in the console above to check Texas market percentiles.
                  </div>
                ) : !band ? (
                  <div style={{ fontSize: 13, color: "#64748B" }}>
                    Customized market data will be provided with your dossiers.
                  </div>
                ) : (
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11.5, fontFamily: "var(--mono)", color: "#64748B", marginBottom: 6 }}>
                      <span>25th: {fmt.k(expRange![0])}</span>
                      <span style={{ color: "#08142A", fontWeight: 700 }}>Median: {fmt.k(Math.round((expRange![0] + expRange![1]) / 2))}</span>
                      <span>75th: {fmt.k(expRange![1])}</span>
                    </div>
                    <SalaryBandBar
                      citySlug={selectedCity}
                      roleSlug={selectedRole}
                      highlight={expBandKey}
                      marker={lo && hi ? (lo + hi) / 2 : lo || hi || undefined}
                    />
                  </div>
                )}
              </div>

              {/* COLUMN 3: COMPETITIVENESS VERDICT & ADVICE */}
              <div>
                {payVerdict ? (
                  <div
                    style={{
                      background: payVerdict.where === "in" ? "#ECFDF5" : payVerdict.where === "above" ? "#EFF6FF" : "#FFFBEB",
                      border: `1.5px solid ${payVerdict.where === "in" ? "#A7F3D0" : payVerdict.where === "above" ? "#BFDBFE" : "#FDE68A"}`,
                      borderRadius: 8,
                      padding: "10px 14px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 700, fontSize: 12.5, color: payVerdict.where === "in" ? "#065F46" : payVerdict.where === "above" ? "#1E40AF" : "#92400E", marginBottom: 3 }}>
                      <span>{payVerdict.where === "in" ? "✓ In Line with Market Median" : payVerdict.where === "above" ? "★ Premium Range" : "⚠ Below Market Median"}</span>
                    </div>
                    <p style={{ fontSize: 12, lineHeight: 1.45, color: payVerdict.where === "in" ? "#047857" : payVerdict.where === "above" ? "#1D4ED8" : "#B45309", margin: 0 }}>
                      {payVerdict.advice}
                    </p>
                  </div>
                ) : (
                  <div style={{ fontSize: 12.5, color: "#64748B", lineHeight: 1.5 }}>
                    Enter base salary to preview candidate response expectations.
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="sj-two-col">
            {/* Left Column: Matched Candidate Dossiers */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 12, marginBottom: 18, borderBottom: "1.5px solid #E2E8F0", paddingBottom: 12 }}>
                <div>
                  <h3 style={{ fontSize: "1.35rem", fontWeight: 500, color: "#08142A", margin: 0, fontFamily: "var(--display)" }}>
                    {matches.length ? (
                      <>
                        <span style={{ color: "#1D4ED8" }}>{matches.length} Candidates</span> Match This Mandate
                      </>
                    ) : (
                      "No Exact Matches in Current Immediate Pool"
                    )}
                  </h3>
                  <span style={{ fontSize: "0.85rem", color: "#64748B", display: "block", marginTop: 4 }}>
                    {matches.length
                      ? "Click any candidate card below to select for confidential resume delivery"
                      : "We actively search our 100,000+ attorney network for specific requirements."}
                  </span>
                </div>
                {requestedId && (
                  <button
                    type="button"
                    onClick={() => setRequestedId(null)}
                    style={{
                      background: "#F1F5F9",
                      border: "1px solid #CBD5E1",
                      borderRadius: 6,
                      padding: "4px 10px",
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#475569",
                      cursor: "pointer",
                    }}
                  >
                    Clear Selection (Request All)
                  </button>
                )}
              </div>

              {!matches.length ? (
                <div style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 12, padding: "36px", textAlign: "center" }}>
                  <h4 style={{ fontSize: "1.1rem", fontWeight: 500, color: "#08142A", margin: "0 0 8px", fontFamily: "var(--display)" }}>
                    Active Headhunting Pool Available
                  </h4>
                  <p style={{ color: "#64748B", fontSize: "0.92rem", lineHeight: 1.6, margin: "0 0 16px" }}>
                    We frequently source confidential lateral candidates beyond our published listings. Submit your mandate and Justin will reply with tailored profiles within 1 business day.
                  </p>
                  <a
                    href="#gate"
                    style={{
                      background: "#1D4ED8",
                      color: "#FFFFFF",
                      padding: "11px 22px",
                      borderRadius: 7,
                      fontWeight: 600,
                      fontSize: 14,
                      textDecoration: "none",
                      display: "inline-block",
                    }}
                  >
                    Send Mandate to Justin →
                  </a>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {matches.map((r) => (
                    <CandidateCard
                      key={r.c.id}
                      candidate={r.c}
                      result={r}
                      selected={requestedId === r.c.id}
                      onSelect={(cand) => {
                        setRequestedId(requestedId === cand.id ? null : cand.id);
                        const gateEl = document.getElementById("gate");
                        if (gateEl) {
                          gateEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
                        }
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Sticky Mandate Submission GateForm */}
            <div id="gate" className="sj-gate-wrapper">
              <div className="sj-gate-card">
                {requestedId && (
                  <div
                    style={{
                      background: "#EFF6FF",
                      border: "1px solid #BFDBFE",
                      borderRadius: 8,
                      padding: "8px 12px",
                      marginBottom: 16,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontSize: 12, fontFamily: "var(--mono)", color: "#1D4ED8", fontWeight: 700 }}>
                      Target Candidate: {requestedId}
                    </span>
                    <button
                      type="button"
                      onClick={() => setRequestedId(null)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#1D4ED8",
                        fontSize: 12,
                        cursor: "pointer",
                        textDecoration: "underline",
                        padding: 0,
                        fontWeight: 600,
                      }}
                    >
                      Reset
                    </button>
                  </div>
                )}

                <GateForm
                  id="submit-job-gate"
                  eyebrow={requestedId ? `Candidate ${requestedId} Selected` : matches.length ? `Review All ${matches.length} Matches` : "Submit Mandate"}
                  title={
                    requestedId
                      ? `Request Confidential Dossier for ${requestedId}`
                      : `Request All ${matches.length} Candidate Profiles`
                  }
                  bullets={[
                    requestedId
                      ? `Complete redacted resume and verified compensation history for ${requestedId}`
                      : `Full redacted resumes for all ${matches.length} matching candidates`,
                    "Verified compensation expectations, notice periods, and bar admission standing",
                    "One-page contingency terms (fee due only if you hire). Zero upfront cost.",
                  ]}
                  button={
                    requestedId
                      ? `Deliver Dossier (${requestedId})`
                      : `Deliver All ${matches.length} Candidate Profiles`
                  }
                  ids={candidateIds}
                  role={selectedRole}
                  city={selectedCity}
                  fine="Your mandate is strictly confidential and never published. Zero fee unless you extend an offer and hire."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WORKFLOW: 4 EASY STEPS */}
      <section className="sj-section-steps">
        <div className="sj-section-wrap">
          <div className="sj-section-header">
            <div
              className="badge-capsule"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#EFF6FF",
                border: "1px solid #DBEAFE",
                borderRadius: 999,
                padding: "6px 14px",
                fontFamily: "var(--mono)",
                fontSize: 11,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#1D4ED8",
                marginBottom: 12,
              }}
            >
              <span className="badge-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#1D4ED8" }} />
              <span>THE PROTOCOL · 4 EASY STEPS</span>
            </div>
            <h2
              style={{
                fontSize: "clamp(24px, 3.2vw, 38px)",
                fontWeight: 400,
                color: "#08142A",
                margin: "0 0 10px",
                fontFamily: "var(--display)",
              }}
            >
              From Mandate Submission to First <span className="serif-accent" style={{ fontStyle: "italic", color: "#1D4ED8" }}>Interview</span>
            </h2>
            <p style={{ margin: 0, color: "#64748B", fontSize: "1.02rem", lineHeight: 1.6 }}>
              A streamlined lateral attorney placement process engineered specifically for law firm managing partners.
            </p>
          </div>

          <div className="sj-steps-grid">
            <div className="sj-step-card">
              <span style={{ fontFamily: "var(--mono)", fontSize: 10.5, fontWeight: 700, color: "#1D4ED8", marginBottom: 8, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                STEP 01 · SUBMISSION
              </span>
              <div style={{ fontFamily: "var(--display)", fontSize: 21, fontWeight: 400, color: "#08142A", marginBottom: 4, lineHeight: 1.25 }}>
                Submit Job Mandate
              </div>
              <span style={{ fontSize: 13, fontWeight: 500, color: "#64748B", marginBottom: 12 }}>
                Paste posting or criteria
              </span>
              <p style={{ fontSize: 13.5, color: "#475569", lineHeight: 1.55, margin: 0 }}>
                Paste your posting or informal notes above. Zero agreement and zero fee to initiate talent search.
              </p>
            </div>

            <div className="sj-step-card">
              <span style={{ fontFamily: "var(--mono)", fontSize: 10.5, fontWeight: 700, color: "#1D4ED8", marginBottom: 8, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                STEP 02 · 1 HOUR
              </span>
              <div style={{ fontFamily: "var(--display)", fontSize: 21, fontWeight: 400, color: "#08142A", marginBottom: 4, lineHeight: 1.25 }}>
                Full Dossier Review
              </div>
              <span style={{ fontSize: 13, fontWeight: 500, color: "#64748B", marginBottom: 12 }}>
                Candidate profiles delivered
              </span>
              <p style={{ fontSize: 13.5, color: "#475569", lineHeight: 1.55, margin: 0 }}>
                Receive redacted candidate profiles, verified compensation histories, and our simple one-page terms.
              </p>
            </div>

            <div className="sj-step-card">
              <span style={{ fontFamily: "var(--mono)", fontSize: 10.5, fontWeight: 700, color: "#1D4ED8", marginBottom: 8, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                STEP 03 · MUTUAL CONSENT
              </span>
              <div style={{ fontFamily: "var(--display)", fontSize: 21, fontWeight: 400, color: "#08142A", marginBottom: 4, lineHeight: 1.25 }}>
                Mutual Opt-In
              </div>
              <span style={{ fontSize: 13, fontWeight: 500, color: "#64748B", marginBottom: 12 }}>
                Discreet coordination
              </span>
              <p style={{ fontSize: 13.5, color: "#475569", lineHeight: 1.55, margin: 0 }}>
                Neither firm nor candidate identity is disclosed without mutual affirmative consent to interview.
              </p>
            </div>

            <div className="sj-step-card">
              <span style={{ fontFamily: "var(--mono)", fontSize: 10.5, fontWeight: 700, color: "#1D4ED8", marginBottom: 8, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                STEP 04 · ON START DATE
              </span>
              <div style={{ fontFamily: "var(--display)", fontSize: 21, fontWeight: 400, color: "#08142A", marginBottom: 4, lineHeight: 1.25 }}>
                One Success Fee
              </div>
              <span style={{ fontSize: 13, fontWeight: 500, color: "#64748B", marginBottom: 12 }}>
                Net 15 invoice
              </span>
              <p style={{ fontSize: 13.5, color: "#475569", lineHeight: 1.55, margin: 0 }}>
                One contingency invoice due 15 days after start date, fully protected by our 90-day replacement warranty.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FAQ SECTION */}
      <section className="sj-section-faq">
        <div className="sj-section-wrap">
          <div className="sj-faq-layout">
            <div>
              <div
                className="badge-capsule"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#EFF6FF",
                  border: "1px solid #DBEAFE",
                  borderRadius: 999,
                  padding: "6px 14px",
                  fontFamily: "var(--mono)",
                  fontSize: 11,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#1D4ED8",
                  marginBottom: 12,
                }}
              >
                <span className="badge-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#1D4ED8" }} />
                <span>PARTNER INQUIRIES</span>
              </div>
              <h2 style={{ fontSize: "clamp(24px, 3.2vw, 38px)", fontWeight: 400, color: "#08142A", margin: "0 0 14px", fontFamily: "var(--display)" }}>
                Mandate <span className="serif-accent" style={{ fontStyle: "italic", color: "#1D4ED8" }}>Intake FAQ</span>
              </h2>
              <p style={{ color: "#64748B", fontSize: "1rem", lineHeight: 1.6, margin: "0 0 24px" }}>
                Don&apos;t have a formal job posting drafted yet? Start with our{" "}
                <Link href="/hiring-kit/estate-planning-attorney" style={{ color: "#1D4ED8", fontWeight: 600 }}>
                  Hiring Kit Template
                </Link>{" "}
                or schedule a brief call directly with Justin Sofman.
              </p>
              <a
                href={trust.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="sj-faq-btn"
              >
                <span>Book 15 min call with Justin</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>

            <div>
              <details className="sj-faq-item" open>
                <summary>
                  <span>Is my firm&apos;s posting published anywhere online?</span>
                  <span style={{ color: "#1D4ED8", fontSize: "1.2rem" }}>+</span>
                </summary>
                <p>
                  No. Your posting is held strictly confidential and never published on public boards. We use it solely to parse key parameters, calibrate our algorithmic matching engine, and brief Justin Sofman on your exact practice requirements. Candidates only see a general, unbranded practice summary until you mutually agree to an interview.
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
                  There is zero fee to submit a job, zero retainer, and zero fee to review candidate dossiers. Orion charges one contingency fee, only if you hire, due 15 days after their first working day. Every placement is protected by our 90-day replacement warranty.
                </p>
              </details>
            </div>
          </div>
        </div>
      </section>

      {/* 6. BOTTOM LUXURY DARK CTA SECTION */}
      <section className="sj-section-cta">
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 24px", textAlign: "center", position: "relative", zIndex: 1 }}>
          <div
            className="badge-capsule"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.18)",
              borderRadius: 999,
              padding: "6px 16px",
              fontFamily: "var(--mono)",
              fontSize: 11,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#93C5FD",
              marginBottom: 18,
            }}
          >
            <span className="badge-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#60A5FA" }} />
            <span>DIRECT MANDATE INTAKE · RAPID TURNAROUND</span>
          </div>
          <h2
            style={{
              fontSize: "clamp(26px, 3.8vw, 44px)",
              fontWeight: 400,
              color: "#FFFFFF",
              margin: "0 0 16px",
              fontFamily: "var(--display)",
              lineHeight: 1.15,
            }}
          >
            Submit your job and meet the <span className="serif-accent" style={{ color: "#60A5FA", fontStyle: "italic" }}>matches.</span>
          </h2>
          <p
            style={{
              color: "#CBD5E1",
              fontSize: "1.06rem",
              lineHeight: 1.6,
              margin: "0 auto 34px",
              maxWidth: 620,
            }}
          >
            Curated lateral attorney dossiers delivered directly to your inbox within the hour. Zero upfront retainer, non-exclusive agreement, and no fee unless you hire.
          </p>

          <div className="sj-cta-btns">
            <a
              href="#gate"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#1D4ED8",
                color: "#FFFFFF",
                padding: "14px 34px",
                borderRadius: 7,
                fontWeight: 600,
                fontSize: 15.5,
                textDecoration: "none",
                boxShadow: "0 4px 16px rgba(29, 78, 216, 0.4)",
              }}
            >
              <span>Send Mandate to Justin</span>
              <span aria-hidden="true">→</span>
            </a>
            <a
              href={trust.calendly}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.22)",
                color: "#FFFFFF",
                padding: "14px 30px",
                borderRadius: 7,
                fontWeight: 600,
                fontSize: 15.5,
                textDecoration: "none",
              }}
            >
              <span>Book 15 min call</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
