"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { CandidateCard } from "@/components/CandidateCard";
import { CandidateDetailPane } from "@/components/CandidateDetailPane";
import { GateForm } from "@/components/GateForm";
import { Mark } from "@/components/Mark";
import {
  roles,
  cities,
  expBands,
  mustHaves,
  findRole,
  findCity,
  matchCandidates,
  plural,
  trust,
} from "@/data";
import { useSite } from "@/context/SiteContext";

export default function FindCandidatesPage() {
  const { unlocked } = useSite();
  const [role, setRole] = useState("estate-planning-attorney");
  const [city, setCity] = useState("houston-tx");
  const [years, setYears] = useState("any");
  const [mode, setMode] = useState<"any" | "on-site" | "hybrid">("any");
  const [pay, setPay] = useState<number | null>(null);
  const [selectedMust, setSelectedMust] = useState<string[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [folded, setFolded] = useState(false);
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Check URL hash / search params on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace(/^#/, "");
      if (hash) {
        const params = new URLSearchParams(hash);
        const r = params.get("role");
        const c = params.get("city");
        const y = params.get("years");
        const m = params.get("mode") as "any" | "on-site" | "hybrid" | null;
        const p = params.get("pay");
        const ids = params.get("ids");
        const must = params.get("must");

        if (r) setRole(r);
        if (c) setCity(c);
        if (y) setYears(y);
        if (m) setMode(m);
        if (p) setPay(Number(p));
        if (ids) setSelectedIds(ids.split(","));
        if (must) setSelectedMust(must.split(","));
      }
    }
  }, []);

  const rObj = findRole(role);
  const cObj = findCity(city);

  const availableMustHaves =
    mustHaves[role] || (rObj ? mustHaves[rObj.kind] : []) || [];

  const toggleMustHave = (tag: string) => {
    setSelectedMust((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const results = matchCandidates({
    role,
    city,
    years: years === "any" ? undefined : years,
    mode: mode === "any" ? undefined : mode,
    pay: pay ? pay / 1000 : null,
    must: selectedMust,
  });

  const openCards = unlocked ? results : results.slice(0, 3);
  const lockedCards = unlocked ? [] : results.slice(3);

  const expBandObj = expBands.find((e) => e.key === years);
  const summaryBits = [
    rObj ? rObj.name : role,
    cObj ? cObj.name : city,
    expBandObj ? expBandObj.label : "any experience",
  ];
  if (mode !== "any") summaryBits.push(mode);
  if (selectedMust.length)
    summaryBits.push(`${selectedMust.length} ${plural(selectedMust.length, "must-have")}`);

  const handleRequestProfile = (id: string) => {
    setSelectedIds([id]);
    const el = document.getElementById("gate");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (results.length > 0) {
      if (!selectedCandidateId || !results.some((r) => r.c.id === selectedCandidateId)) {
        setSelectedCandidateId(results[0].c.id);
      }
    } else {
      setSelectedCandidateId(null);
    }
  }, [results, selectedCandidateId]);

  const activeCandidate = useMemo(() => {
    return results.find((r) => r.c.id === selectedCandidateId)?.c || results[0]?.c || null;
  }, [results, selectedCandidateId]);

  const handleSelectCandidate = (cand: { id: string }) => {
    setSelectedCandidateId(cand.id);
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setMobileDrawerOpen(true);
    }
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Find Candidates | Orion Placement",
    url: "https://www.orionplacement.com/find-candidates/",
    description: "Search pre-screened lateral attorney and paralegal dossiers with verified compensation and strict confidentiality.",
  };

  return (
    <div style={{ background: "#FAF9F5", color: "#08142A" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. LUXURY HERO (CENTERED, CLEAN, NO CARDS, NO BREADCRUMBS) */}
      <section
        className="emp-luxury-hero-sec fc-luxury-hero-sec"
        style={{
          position: "relative",
          background: "#08142A",
          color: "#FFFFFF",
          padding: "128px 0 72px",
          overflow: "hidden",
          textAlign: "center",
        }}
      >
        <div className="emp-hero-video-wrap" aria-hidden="true">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="emp-hero-video"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.22,
            }}
          >
            <source src="/media/splash.mp4" type="video/mp4" />
          </video>
          <div
            className="emp-hero-overlay"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(180deg, rgba(8,20,42,0.85) 0%, rgba(8,20,42,0.96) 100%)",
            }}
          />
        </div>

        <div className="wrap" style={{ position: "relative", zIndex: 2, maxWidth: 840, margin: "0 auto", padding: "0 24px" }}>
          {/* Eyebrow Badge Capsule */}
          <div style={{ marginBottom: 20 }}>
            <div
              className="badge-capsule"
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
              <span className="badge-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#60A5FA" }} />
              <span>PRE-SCREENED TALENT · 100% CONTINGENCY</span>
            </div>
          </div>

          {/* Main Title */}
          <h1
            className="emp-hero-h1"
            style={{
              fontFamily: "var(--display)",
              fontSize: "clamp(36px, 4.8vw, 54px)",
              lineHeight: 1.15,
              fontWeight: 500,
              color: "#FFFFFF",
              margin: "0 auto 20px",
              maxWidth: 780,
            }}
          >
            Find candidates for your{" "}
            <span className="serif-accent" style={{ color: "#60A5FA", fontStyle: "italic" }}>
              open seat
            </span>
          </h1>

          {/* Clean Subtext */}
          <p
            className="emp-hero-lead"
            style={{
              fontSize: "clamp(16px, 1.8vw, 18px)",
              lineHeight: 1.6,
              color: "#CBD5E1",
              maxWidth: 620,
              margin: "0 auto 32px",
            }}
          >
            Filter by practice area, market, experience, and must-haves.
            Screened lateral attorney dossiers update dynamically with verified compensation.
          </p>

          {/* Action CTAs */}
          <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap", marginBottom: 34 }}>
            <a
              href="#brief"
              className="btn-emp-primary"
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
              <span>Filter candidate pool</span>
              <span aria-hidden="true">↓</span>
            </a>
            <Link
              href="/submit-job"
              className="btn-emp-ghost"
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
              <span>Submit open mandate</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          {/* Micro Reassurances */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              gap: 16,
              fontSize: 13,
              color: "#94A3B8",
            }}
          >
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="3.5 8.5 6.5 11.5 12.5 4.5" />
              </svg>
              <span>Zero upfront retainer</span>
            </div>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="3.5 8.5 6.5 11.5 12.5 4.5" />
              </svg>
              <span>23% flat contingency</span>
            </div>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="3.5 8.5 6.5 11.5 12.5 4.5" />
              </svg>
              <span>90-day replacement warranty</span>
            </div>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="3.5 8.5 6.5 11.5 12.5 4.5" />
              </svg>
              <span>100% confidential</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN TOOL WORKSPACE */}
      <section className="wrap tool-sec" style={{ maxWidth: 1240, margin: "0 auto", padding: "64px 24px 88px" }}>
        <div className="tool">
          {/* FILTER BRIEF FORM */}
          <form
            className={`tool-form${folded ? " folded editing" : ""}`}
            id="brief"
            aria-label="Your seat"
            style={{
              background: "#FFFFFF",
              border: "1.5px solid #E2E8F0",
              borderRadius: 14,
              padding: "24px 24px",
              boxShadow: "0 4px 16px rgba(15,23,42,0.04)",
              position: "sticky",
              top: 96,
            }}
          >
            <div className="brief-sum" id="brief-sum" style={{ borderBottom: "1px solid #E2E8F0", paddingBottom: 14, marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <span style={{ display: "block", fontFamily: "var(--mono)", fontSize: 10.5, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#1D4ED8", marginBottom: 3 }}>
                    Active Filters
                  </span>
                  <div id="brief-sum-t" style={{ fontFamily: "var(--display)", fontSize: 16, color: "#08142A", fontWeight: 600 }}>
                    {summaryBits.join(" · ")}
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  id="brief-edit"
                  aria-expanded={!folded}
                  onClick={() => setFolded(!folded)}
                  style={{ borderRadius: 6, fontWeight: 600, padding: "5px 12px", border: "1px solid #CBD5E1", fontSize: 12.5 }}
                >
                  {folded ? "Change" : "Hide"}
                </button>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16 }}>
              <h2 style={{ fontFamily: "var(--display)", fontSize: 20, color: "#08142A", margin: 0, fontWeight: 600 }}>
                Seat Specifications
              </h2>
              {(selectedMust.length > 0 || years !== "any" || mode !== "any" || pay !== null) && (
                <button
                  type="button"
                  onClick={() => {
                    setYears("any");
                    setMode("any");
                    setPay(null);
                    setSelectedMust([]);
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#1D4ED8",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  Reset all
                </button>
              )}
            </div>

            <div className="field" style={{ marginBottom: 14 }}>
              <label htmlFor="b-role" style={{ display: "block", fontFamily: "var(--mono)", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#08142A", marginBottom: 5 }}>
                Practice Area / Role
              </label>
              <select
                id="b-role"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={{ width: "100%", padding: "9px 12px", borderRadius: 7, border: "1.5px solid #CBD5E1", fontSize: 13.5, color: "#08142A", background: "#FFFFFF" }}
              >
                {roles.map((r) => (
                  <option key={r.slug} value={r.slug}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="field" style={{ marginBottom: 14 }}>
              <label htmlFor="b-city" style={{ display: "block", fontFamily: "var(--mono)", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#08142A", marginBottom: 5 }}>
                Location
              </label>
              <select
                id="b-city"
                name="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                style={{ width: "100%", padding: "9px 12px", borderRadius: 7, border: "1.5px solid #CBD5E1", fontSize: 13.5, color: "#08142A", background: "#FFFFFF" }}
              >
                {cities.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}, {c.state}
                  </option>
                ))}
              </select>
            </div>

            <div className="field" style={{ marginBottom: 14 }}>
              <label htmlFor="b-years" style={{ display: "block", fontFamily: "var(--mono)", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#08142A", marginBottom: 5 }}>
                Experience Band
              </label>
              <select
                id="b-years"
                name="years"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                style={{ width: "100%", padding: "9px 12px", borderRadius: 7, border: "1.5px solid #CBD5E1", fontSize: 13.5, color: "#08142A", background: "#FFFFFF" }}
              >
                <option value="any">Any experience</option>
                {expBands.map((eb) => (
                  <option key={eb.key} value={eb.key}>
                    {eb.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="field" style={{ marginBottom: 14 }}>
              <label htmlFor="b-mode" style={{ display: "block", fontFamily: "var(--mono)", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#08142A", marginBottom: 5 }}>
                Arrangement
              </label>
              <select
                id="b-mode"
                name="mode"
                value={mode}
                onChange={(e) => setMode(e.target.value as "any" | "on-site" | "hybrid")}
                style={{ width: "100%", padding: "9px 12px", borderRadius: 7, border: "1.5px solid #CBD5E1", fontSize: 13.5, color: "#08142A", background: "#FFFFFF" }}
              >
                <option value="any">Either on-site or hybrid</option>
                <option value="on-site">On-site only</option>
                <option value="hybrid">Hybrid only</option>
              </select>
            </div>

            <div className="field" style={{ marginBottom: 16 }}>
              <label htmlFor="b-pay" style={{ display: "block", fontFamily: "var(--mono)", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#08142A", marginBottom: 5 }}>
                Target Base Compensation ($/yr)
              </label>
              <input
                id="b-pay"
                name="pay"
                type="number"
                inputMode="numeric"
                min="30000"
                step="5000"
                placeholder="145000"
                value={pay || ""}
                onChange={(e) =>
                  setPay(e.target.value ? Number(e.target.value) : null)
                }
                style={{ width: "100%", padding: "9px 12px", borderRadius: 7, border: "1.5px solid #CBD5E1", fontSize: 13.5, color: "#08142A", background: "#FFFFFF" }}
              />
            </div>

            <fieldset className="field" style={{ border: 0, padding: 0, margin: 0 }}>
              <legend className="label" style={{ display: "block", fontFamily: "var(--mono)", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#08142A", marginBottom: 8 }}>
                Must-haves <span className="hint" style={{ color: "#64748B", fontWeight: 400 }}>(tap to toggle)</span>
              </legend>
              <div className="chips" id="b-must" style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {availableMustHaves.map((tag) => {
                  const isPressed = selectedMust.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      className="chip"
                      aria-pressed={isPressed}
                      data-tag={tag}
                      onClick={() => toggleMustHave(tag)}
                      style={{
                        padding: "6px 12px",
                        borderRadius: 6,
                        fontSize: 12,
                        fontWeight: 600,
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                        background: isPressed ? "#1D4ED8" : "#F1F5F9",
                        color: isPressed ? "#FFFFFF" : "#334155",
                        border: `1px solid ${isPressed ? "#1D4ED8" : "#E2E8F0"}`,
                      }}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          </form>

          {/* RESULTS DISPLAY */}
          <div className="tool-results">
            <div className="results-head" aria-live="polite" style={{ marginBottom: 18, borderBottom: "1.5px solid #E2E8F0", paddingBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 10 }}>
                <b id="r-count" style={{ fontFamily: "var(--display)", fontSize: 24, color: "#08142A", fontWeight: 600 }}>
                  {results.length ? (
                    <>
                      <Mark>{results.length}</Mark>{" "}
                      {results.length === 1 ? "candidate" : "candidates"} for{" "}
                      {rObj ? rObj.short : role}, {cObj ? cObj.name : city}
                    </>
                  ) : (
                    "No exact matches yet"
                  )}
                </b>
                <span className="small muted" id="r-sub" style={{ fontFamily: "var(--mono)", fontSize: 11.5, color: "#1D4ED8", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  {results.length
                    ? unlocked
                      ? "ALL DOSSIERS UNLOCKED"
                      : results.length > 3
                      ? `TOP 3 OPEN · ${results.length - 3} MORE BY EMAIL`
                      : "ALL OPEN"
                    : ""}
                </span>
              </div>
            </div>

            {!results.length ? (
              <div className="empty-state" id="r-list" style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 14, padding: "40px 32px", textAlign: "center" }}>
                <h3 style={{ fontFamily: "var(--display)", fontSize: 22, color: "#08142A", margin: "0 0 10px" }}>
                  No candidate in our active pool fits this exact combination.
                </h3>
                <p style={{ fontSize: 15, color: "#64748B", maxWidth: 560, margin: "0 auto 24px", lineHeight: 1.6 }}>
                  We continually source across our network of 100,000+ legal professionals. Submit your exact criteria and Justin will review our off-market candidate radar within one business day.
                </p>
                <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
                  <Link
                    className="btn-emp-primary"
                    href="/submit-job"
                    style={{
                      background: "#1D4ED8",
                      color: "#FFFFFF",
                      borderRadius: 7,
                      fontWeight: 600,
                      padding: "12px 24px",
                      fontSize: 14,
                      textDecoration: "none",
                    }}
                  >
                    Submit this seat to Justin →
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedMust([]);
                      setYears("any");
                    }}
                    style={{
                      background: "#F8FAFC",
                      color: "#08142A",
                      border: "1.5px solid #CBD5E1",
                      borderRadius: 7,
                      fontWeight: 600,
                      padding: "12px 20px",
                      fontSize: 14,
                      cursor: "pointer",
                    }}
                  >
                    Clear must-haves
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="indeed-split-grid" style={{ marginTop: 14 }}>
                  <div className="indeed-feed-column">
                    <div id="r-list">
                      <div className="indeed-card-stack">
                        {openCards.map((r) => (
                          <CandidateCard
                            key={r.c.id}
                            candidate={r.c}
                            result={r}
                            selected={activeCandidate?.id === r.c.id}
                            onSelect={handleSelectCandidate}
                            onRequestProfile={handleRequestProfile}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="indeed-detail-column">
                    <CandidateDetailPane
                      candidate={activeCandidate}
                      onRequestProfile={handleRequestProfile}
                    />
                  </div>
                </div>

                {mobileDrawerOpen && activeCandidate && (
                  <div
                    className="mobile-detail-overlay"
                    onClick={() => setMobileDrawerOpen(false)}
                  >
                    <div
                      className="mobile-detail-modal"
                      onClick={(e) => e.stopPropagation()}
                      role="dialog"
                      aria-modal="true"
                    >
                      <CandidateDetailPane
                        candidate={activeCandidate}
                        onRequestProfile={handleRequestProfile}
                        onCloseMobile={() => setMobileDrawerOpen(false)}
                      />
                    </div>
                  </div>
                )}

                <div id="gate" style={{ marginTop: 48 }}>
                  <GateForm
                    id="finder-gate"
                    eyebrow={
                      results.length > 3
                        ? `See all ${results.length} candidates`
                        : "Full candidate profiles"
                    }
                    title={
                      selectedIds.length
                        ? `Send me the complete profile for ${selectedIds.join(", ")}`
                        : `Get all ${results.length} candidate profiles`
                    }
                    bullets={[
                      `Redacted resumes for ${
                        selectedIds.length
                          ? selectedIds.join(", ")
                          : results.length === 1
                          ? "this candidate"
                          : `all ${results.length} candidates`
                      }`,
                      "Compensation expectation, Texas bar admission status, and notice period",
                      "Our standard one-page contingency terms, delivered within one business hour",
                    ]}
                    button={
                      selectedIds.length
                        ? "Send me the full profile"
                        : "Send me all candidate profiles"
                    }
                    ids={selectedIds.length ? selectedIds : results.map((r) => r.c.id)}
                    role={role}
                    city={city}
                    gateNote={selectedIds.join(", ")}
                  />
                </div>

                <div id="r-locked" style={{ marginTop: 32 }}>
                  {lockedCards.length > 0 && (
                    <>
                      <p className="mini-h locked-h" style={{ fontFamily: "var(--mono)", fontSize: 12, fontWeight: 700, color: "#64748B", textTransform: "uppercase", marginBottom: 16 }}>
                        <Mark>{lockedCards.length} more {plural(lockedCards.length, "candidate")}</Mark>{" "}
                        with full dossiers
                      </p>
                      <div className="cards">
                        {lockedCards.map((r) => (
                          <CandidateCard
                            key={r.c.id}
                            candidate={r.c}
                            result={r}
                            locked
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* 3. 4-STEP WORKFLOW */}
      <section className="block alt" style={{ background: "#FAF9F5", padding: "88px 0 96px", borderTop: "1px solid #EAE7DC", borderBottom: "1px solid #EAE7DC" }}>
        <div className="wrap" style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
          <div className="sec-head-premium" style={{ textAlign: "center", maxWidth: 740, margin: "0 auto 44px" }}>
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
              <span>THE PROCESS · 4 EASY STEPS</span>
            </div>
            <h2 className="sec-title-lg" style={{ fontFamily: "var(--display)", fontSize: "clamp(28px, 3.6vw, 42px)", color: "#08142A", margin: "0 0 14px", fontWeight: 500 }}>
              From your request to a first <span className="serif-accent" style={{ fontStyle: "italic" }}>interview</span>
            </h2>
            <p className="who-lede" style={{ color: "#64748B", fontSize: 16, lineHeight: 1.6, margin: 0 }}>
              Transparent, discreet candidate introductions with zero obligation and zero upfront retainers.
            </p>
          </div>

          <div className="terms-pillars-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            <div className="terms-pillar" style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 12, padding: "26px 22px" }}>
              <div className="pillar-kicker" style={{ fontFamily: "var(--mono)", fontSize: 11, color: "#1D4ED8", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>
                STEP 01 · REQUEST
              </div>
              <div className="pillar-val" style={{ fontFamily: "var(--display)", fontSize: 26, fontWeight: 600, color: "#08142A", marginBottom: 4 }}>
                One Email
              </div>
              <div className="pillar-label" style={{ fontSize: 13, fontWeight: 600, color: "#64748B", marginBottom: 12 }}>
                Select candidate IDs
              </div>
              <p className="pillar-desc" style={{ fontSize: 13.5, lineHeight: 1.55, color: "#475569", margin: 0 }}>
                No agreement and no fee to see candidate dossiers. Your firm identity stays completely confidential.
              </p>
            </div>

            <div className="terms-pillar" style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 12, padding: "26px 22px" }}>
              <div className="pillar-kicker" style={{ fontFamily: "var(--mono)", fontSize: 11, color: "#1D4ED8", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>
                STEP 02 · 1 HOUR
              </div>
              <div className="pillar-val" style={{ fontFamily: "var(--display)", fontSize: 26, fontWeight: 600, color: "#08142A", marginBottom: 4 }}>
                Full Profiles
              </div>
              <div className="pillar-label" style={{ fontSize: 13, fontWeight: 600, color: "#64748B", marginBottom: 12 }}>
                Dossiers delivered
              </div>
              <p className="pillar-desc" style={{ fontSize: 13.5, lineHeight: 1.55, color: "#475569", margin: 0 }}>
                Redacted resumes for the candidates you choose, along with our simple one-page contingency agreement.
              </p>
            </div>

            <div className="terms-pillar" style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 12, padding: "26px 22px" }}>
              <div className="pillar-kicker" style={{ fontFamily: "var(--mono)", fontSize: 11, color: "#1D4ED8", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>
                STEP 03 · 1 DAY
              </div>
              <div className="pillar-val" style={{ fontFamily: "var(--display)", fontSize: 26, fontWeight: 600, color: "#08142A", marginBottom: 4 }}>
                Interviews
              </div>
              <div className="pillar-label" style={{ fontSize: 13, fontWeight: 600, color: "#64748B", marginBottom: 12 }}>
                Justin coordinates calls
              </div>
              <p className="pillar-desc" style={{ fontSize: 13.5, lineHeight: 1.55, color: "#475569", margin: 0 }}>
                We coordinate interviews with the candidates you want to meet, strictly at dates and times that suit you.
              </p>
            </div>

            <div className="terms-pillar" style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 12, padding: "26px 22px" }}>
              <div className="pillar-kicker" style={{ fontFamily: "var(--mono)", fontSize: 11, color: "#1D4ED8", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>
                STEP 04 · WHEN HIRED
              </div>
              <div className="pillar-val" style={{ fontFamily: "var(--display)", fontSize: 26, fontWeight: 600, color: "#08142A", marginBottom: 4 }}>
                Pay on Start
              </div>
              <div className="pillar-label" style={{ fontSize: 13, fontWeight: 600, color: "#64748B", marginBottom: 12 }}>
                Net 15 Invoice
              </div>
              <p className="pillar-desc" style={{ fontSize: 13.5, lineHeight: 1.55, color: "#475569", margin: 0 }}>
                Fee due 15 calendar days after candidate physically starts work. Covered by our 90-day replacement warranty.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE 4 TERMS PILLARS */}
      <section className="block" style={{ background: "#FFFFFF", padding: "88px 0 96px", borderBottom: "1px solid #E2E8F0" }}>
        <div className="wrap" style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
          <div className="sec-head-premium" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16, marginBottom: 40 }}>
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
                  marginBottom: 10,
                }}
              >
                <span className="badge-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#1D4ED8" }} />
                <span>TERMS TRANSPARENCY</span>
              </div>
              <h2 className="sec-title-lg" style={{ fontFamily: "var(--display)", fontSize: "clamp(28px, 3.6vw, 40px)", color: "#08142A", margin: 0, fontWeight: 500 }}>
                One fee, and only if you <span className="serif-accent" style={{ fontStyle: "italic" }}>hire</span>
              </h2>
            </div>
            <Link
              className="btn btn-outline btn-sm"
              href="/fees"
              style={{
                borderRadius: 7,
                fontWeight: 600,
                padding: "11px 22px",
                border: "1.5px solid #CBD5E1",
                color: "#08142A",
                textDecoration: "none",
                fontSize: 14,
              }}
            >
              <span>Explore fee schedule &amp; calculator</span>
              <span aria-hidden="true"> →</span>
            </Link>
          </div>

          <div className="terms-pillars-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            <div className="terms-pillar" style={{ background: "#FAF9F5", border: "1.5px solid #EAE7DC", borderRadius: 12, padding: "26px 22px" }}>
              <div className="pillar-kicker" style={{ fontFamily: "var(--mono)", fontSize: 11, color: "#1D4ED8", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>
                01 · CONTINGENCY FEE
              </div>
              <div className="pillar-val" style={{ fontFamily: "var(--display)", fontSize: 36, fontWeight: 600, color: "#1D4ED8", marginBottom: 4 }}>
                23%
              </div>
              <div className="pillar-label" style={{ fontSize: 13, fontWeight: 600, color: "#08142A", marginBottom: 10 }}>
                Of first-year base pay
              </div>
              <p className="pillar-desc" style={{ fontSize: 13.5, lineHeight: 1.55, color: "#475569", margin: 0 }}>
                Calculated strictly on base salary. Discretionary bonuses and health benefits are never included.
              </p>
            </div>

            <div className="terms-pillar" style={{ background: "#FAF9F5", border: "1.5px solid #EAE7DC", borderRadius: 12, padding: "26px 22px" }}>
              <div className="pillar-kicker" style={{ fontFamily: "var(--mono)", fontSize: 11, color: "#1D4ED8", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>
                02 · REPLACEMENT WARRANTY
              </div>
              <div className="pillar-val" style={{ fontFamily: "var(--display)", fontSize: 36, fontWeight: 600, color: "#08142A", marginBottom: 4 }}>
                90 Days
              </div>
              <div className="pillar-label" style={{ fontSize: 13, fontWeight: 600, color: "#08142A", marginBottom: 10 }}>
                Calendar day guarantee
              </div>
              <p className="pillar-desc" style={{ fontSize: 13.5, lineHeight: 1.55, color: "#475569", margin: 0 }}>
                If the hire leaves or is let go within 90 days, we conduct a replacement search at zero extra fee.
              </p>
            </div>

            <div className="terms-pillar" style={{ background: "#FAF9F5", border: "1.5px solid #EAE7DC", borderRadius: 12, padding: "26px 22px" }}>
              <div className="pillar-kicker" style={{ fontFamily: "var(--mono)", fontSize: 11, color: "#1D4ED8", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>
                03 · CLIENT FREEDOM
              </div>
              <div className="pillar-val" style={{ fontFamily: "var(--display)", fontSize: 36, fontWeight: 600, color: "#08142A", marginBottom: 4 }}>
                Zero
              </div>
              <div className="pillar-label" style={{ fontSize: 13, fontWeight: 600, color: "#08142A", marginBottom: 10 }}>
                Upfront retainer or lock-in
              </div>
              <p className="pillar-desc" style={{ fontSize: 13.5, lineHeight: 1.55, color: "#475569", margin: 0 }}>
                No retainer and no exclusivity. Keep your internal pipeline and other recruiting sources active.
              </p>
            </div>

            <div className="terms-pillar" style={{ background: "#FAF9F5", border: "1.5px solid #EAE7DC", borderRadius: 12, padding: "26px 22px" }}>
              <div className="pillar-kicker" style={{ fontFamily: "var(--mono)", fontSize: 11, color: "#1D4ED8", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>
                04 · PAYMENT SCHEDULE
              </div>
              <div className="pillar-val" style={{ fontFamily: "var(--display)", fontSize: 36, fontWeight: 600, color: "#08142A", marginBottom: 4 }}>
                Net 15
              </div>
              <div className="pillar-label" style={{ fontSize: 13, fontWeight: 600, color: "#08142A", marginBottom: 10 }}>
                Invoice on physical start date
              </div>
              <p className="pillar-desc" style={{ fontSize: 13.5, lineHeight: 1.55, color: "#475569", margin: 0 }}>
                We issue the invoice only when the candidate physically begins work, payable within 15 calendar days.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BOTTOM DARK CTA SECTION */}
      <section className="emp-terms-dark-sec" style={{ background: "#08142A", padding: "96px 0 108px", textAlign: "center" }}>
        <div className="wrap" style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px" }}>
          <div
            className="badge-capsule"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 999,
              padding: "6px 14px",
              fontFamily: "var(--mono)",
              fontSize: 11,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#93C5FD",
              marginBottom: 18,
            }}
          >
            <span className="badge-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#60A5FA" }} />
            <span>DIRECT MANDATE ADVISORY</span>
          </div>

          <h2
            style={{
              fontFamily: "var(--display)",
              fontSize: "clamp(32px, 4.2vw, 48px)",
              color: "#FFFFFF",
              margin: "0 0 16px",
              fontWeight: 500,
              lineHeight: 1.15,
            }}
          >
            Rather talk the seat through{" "}
            <span className="serif-accent" style={{ color: "#60A5FA", fontStyle: "italic" }}>
              first?
            </span>
          </h2>

          <p style={{ color: "#CBD5E1", fontSize: 17, lineHeight: 1.6, marginBottom: 34, maxWidth: 640, margin: "0 auto 34px" }}>
            Book a 15-minute briefing directly with founder Justin Sofman: the seat, current Texas market compensation bands, and who is available right now.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            <a
              href={trust.calendly || "https://calendly.com/orionplacement/call-with-justin"}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-emp-primary"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#1D4ED8",
                color: "#FFFFFF",
                fontWeight: 600,
                fontSize: 16,
                padding: "14px 34px",
                borderRadius: 7,
                textDecoration: "none",
              }}
            >
              <span>Book 15 min with Justin</span>
              <span aria-hidden="true">→</span>
            </a>
            <Link
              href="/submit-job"
              className="btn-emp-ghost"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.18)",
                color: "#FFFFFF",
                fontWeight: 600,
                fontSize: 16,
                padding: "14px 34px",
                borderRadius: 7,
                textDecoration: "none",
              }}
            >
              <span>Submit open job</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
