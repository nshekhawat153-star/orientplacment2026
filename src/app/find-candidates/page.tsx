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

  const openCards = results;

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

  const hasActiveFilters =
    years !== "any" || mode !== "any" || pay !== null || selectedMust.length > 0;

  const handleResetFilters = () => {
    setYears("any");
    setMode("any");
    setPay(null);
    setSelectedMust([]);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const el = document.getElementById("results");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
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

      {/* 1. LUXURY HERO WITH UNIFIED TOP SEARCH CONSOLE */}
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

        <div className="wrap" style={{ position: "relative", zIndex: 2, maxWidth: 960, margin: "0 auto", padding: "0 24px" }}>
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
              margin: "0 auto 36px",
            }}
          >
            Filter by practice area, Texas market, experience, and must-haves.
            Screened lateral attorney dossiers update dynamically with verified compensation.
          </p>

          {/* UNIFIED SEARCH CONSOLE */}
          <div style={{ maxWidth: 900, margin: "0 auto 32px", width: "100%" }}>
            <form
              onSubmit={handleSearchSubmit}
              role="search"
              aria-label="Candidate search console"
              style={{
                background: "#FFFFFF",
                border: "1.5px solid rgba(255, 255, 255, 0.2)",
                borderRadius: 12,
                boxShadow: "0 20px 50px -10px rgba(0, 0, 0, 0.55)",
                padding: "7px 8px 7px 18px",
                display: "flex",
                alignItems: "center",
                gap: 12,
                minHeight: 60,
                flexWrap: "wrap",
              }}
            >
              {/* PRACTICE AREA / ROLE */}
              <div style={{ display: "flex", alignItems: "center", flex: "1 1 260px", gap: 10 }}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", textAlign: "left" }}>
                  <span style={{ fontSize: 10.5, fontFamily: "var(--mono)", fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Practice Area / Role
                  </span>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    aria-label="Practice Area / Role"
                    style={{
                      border: 0,
                      background: "transparent",
                      fontSize: 14.5,
                      fontWeight: 600,
                      color: "#08142A",
                      outline: "none",
                      cursor: "pointer",
                      width: "100%",
                      padding: "2px 0 0",
                    }}
                  >
                    {roles.map((r) => (
                      <option key={r.slug} value={r.slug}>
                        {r.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* VERTICAL DIVIDER */}
              <div
                style={{ width: 1, height: 34, background: "#E2E8F0" }}
                className="hidden-mobile"
                aria-hidden="true"
              />

              {/* TEXAS MARKET / LOCATION */}
              <div style={{ display: "flex", alignItems: "center", flex: "1 1 220px", gap: 10 }}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", textAlign: "left" }}>
                  <span style={{ fontSize: 10.5, fontFamily: "var(--mono)", fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Texas Market
                  </span>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    aria-label="Texas Market"
                    style={{
                      border: 0,
                      background: "transparent",
                      fontSize: 14.5,
                      fontWeight: 600,
                      color: "#08142A",
                      outline: "none",
                      cursor: "pointer",
                      width: "100%",
                      padding: "2px 0 0",
                    }}
                  >
                    {cities.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.name}, {c.state}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                style={{
                  background: "#1D4ED8",
                  color: "#FFFFFF",
                  border: 0,
                  borderRadius: 7,
                  padding: "13px 26px",
                  fontSize: 14.5,
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  boxShadow: "0 4px 14px rgba(29, 78, 216, 0.4)",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                <span>Find Candidates</span>
                <span aria-hidden="true">→</span>
              </button>
            </form>
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

      {/* 2. HORIZONTAL FILTER CHIPS BAR (STICKY, CLEAN, SPACIOUS) */}
      <section
        id="filters"
        style={{
          background: "#FFFFFF",
          borderBottom: "1.5px solid #E2E8F0",
          padding: "14px 0",
          position: "sticky",
          top: 68,
          zIndex: 20,
          boxShadow: "0 2px 10px rgba(15, 23, 42, 0.04)",
        }}
      >
        <div className="wrap" style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            {/* LEFT: FILTER PILLS */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                flexWrap: "wrap",
              }}
            >
              {/* Experience Band Group */}
              <div
                style={{
                  display: "inline-flex",
                  background: "#F1F5F9",
                  borderRadius: 8,
                  padding: 3,
                  gap: 2,
                }}
              >
                <button
                  type="button"
                  onClick={() => setYears("any")}
                  style={{
                    border: 0,
                    background: years === "any" ? "#08142A" : "transparent",
                    color: years === "any" ? "#FFFFFF" : "#475569",
                    padding: "5px 12px",
                    borderRadius: 6,
                    fontSize: 12.5,
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  All Exp
                </button>
                {expBands.map((eb) => (
                  <button
                    key={eb.key}
                    type="button"
                    onClick={() => setYears(years === eb.key ? "any" : eb.key)}
                    style={{
                      border: 0,
                      background: years === eb.key ? "#08142A" : "transparent",
                      color: years === eb.key ? "#FFFFFF" : "#475569",
                      padding: "5px 12px",
                      borderRadius: 6,
                      fontSize: 12.5,
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                    }}
                  >
                    {eb.label}
                  </button>
                ))}
              </div>

              <span style={{ width: 1, height: 22, background: "#E2E8F0" }} aria-hidden="true" />

              {/* Work Arrangement Pills */}
              <button
                type="button"
                onClick={() => setMode(mode === "hybrid" ? "any" : "hybrid")}
                className="flat-chip"
                style={{
                  background: mode === "hybrid" ? "#08142A" : "#FFFFFF",
                  color: mode === "hybrid" ? "#FFFFFF" : "#475569",
                  borderColor: mode === "hybrid" ? "#08142A" : "#E2E8F0",
                }}
              >
                <span>Hybrid</span>
              </button>

              <button
                type="button"
                onClick={() => setMode(mode === "on-site" ? "any" : "on-site")}
                className="flat-chip"
                style={{
                  background: mode === "on-site" ? "#08142A" : "#FFFFFF",
                  color: mode === "on-site" ? "#FFFFFF" : "#475569",
                  borderColor: mode === "on-site" ? "#08142A" : "#E2E8F0",
                }}
              >
                <span>On-site</span>
              </button>

              <span style={{ width: 1, height: 22, background: "#E2E8F0" }} aria-hidden="true" />

              {/* Target Compensation Pills */}
              {[110000, 130000, 150000].map((p) => {
                const isAct = pay === p;
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPay(isAct ? null : p)}
                    className="flat-chip"
                    style={{
                      background: isAct ? "#08142A" : "#FFFFFF",
                      color: isAct ? "#FFFFFF" : "#475569",
                      borderColor: isAct ? "#08142A" : "#E2E8F0",
                    }}
                  >
                    <span>${p / 1000}k+</span>
                  </button>
                );
              })}

              {/* Dynamic Role Must-Haves */}
              {availableMustHaves.length > 0 && (
                <>
                  <span style={{ width: 1, height: 22, background: "#E2E8F0" }} aria-hidden="true" />
                  {availableMustHaves.slice(0, 4).map((tag) => {
                    const isSelected = selectedMust.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleMustHave(tag)}
                        className="flat-chip"
                        style={{
                          background: isSelected ? "#1D4ED8" : "#FFFFFF",
                          color: isSelected ? "#FFFFFF" : "#334155",
                          borderColor: isSelected ? "#1D4ED8" : "#CBD5E1",
                          fontSize: 12.5,
                        }}
                      >
                        <span style={{ opacity: isSelected ? 1 : 0.6 }}>{isSelected ? "✓ " : "+ "}</span>
                        <span>{tag}</span>
                      </button>
                    );
                  })}
                </>
              )}

              {/* Reset All Filters Button */}
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  style={{
                    background: "#FFF5F5",
                    color: "#DC2626",
                    border: "1px dashed #FCA5A5",
                    borderRadius: 6,
                    padding: "5px 12px",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <span>Reset filters</span>
                </button>
              )}
            </div>

            {/* RIGHT: LIVE CANDIDATE COUNT */}
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: 12,
                color: "#64748B",
                fontWeight: 600,
                whiteSpace: "nowrap",
              }}
            >
              <span style={{ color: "#1D4ED8", fontWeight: 700 }}>{results.length}</span>{" "}
              {results.length === 1 ? "candidate" : "candidates"} available
            </div>
          </div>
        </div>
      </section>

      {/* 3. MAIN CANDIDATE STREAM: PURE 2-COLUMN MASTER-DETAIL WORKSPACE */}
      <main
        className="wrap"
        id="results"
        style={{
          maxWidth: 1240,
          margin: "0 auto",
          padding: "36px 24px 80px",
        }}
      >
        {/* Results Stream Subhead */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            flexWrap: "wrap",
            gap: 12,
            marginBottom: 22,
            paddingBottom: 14,
            borderBottom: "1.5px solid #E2E8F0",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--display)",
              fontSize: "clamp(20px, 2.4vw, 26px)",
              color: "#08142A",
              margin: 0,
              fontWeight: 600,
            }}
          >
            {results.length ? (
              <>
                <Mark>{results.length}</Mark> {results.length === 1 ? "candidate" : "candidates"} for{" "}
                <span style={{ color: "#1D4ED8" }}>{rObj ? rObj.short : role}</span> in {cObj ? cObj.name : city}, Texas
              </>
            ) : (
              "No matching candidates found"
            )}
          </h2>

          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: 11.5,
              color: "#1D4ED8",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            {results.length ? "PRE-SCREENED TALENT · 100% CONFIDENTIAL" : ""}
          </span>
        </div>

        {/* RESULTS SPLIT OR EMPTY STATE */}
        {!results.length ? (
          <div
            className="empty-state"
            style={{
              background: "#FFFFFF",
              border: "1.5px solid #E2E8F0",
              borderRadius: 14,
              padding: "48px 32px",
              textAlign: "center",
            }}
          >
            <h3 style={{ fontFamily: "var(--display)", fontSize: 24, color: "#08142A", margin: "0 0 10px" }}>
              No candidate in our active public pool fits this exact combination.
            </h3>
            <p style={{ fontSize: 15, color: "#64748B", maxWidth: 580, margin: "0 auto 28px", lineHeight: 1.6 }}>
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
                onClick={handleResetFilters}
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
                Reset all filters
              </button>
            </div>
          </div>
        ) : (
          <>
            <div
              className="indeed-split-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(380px, 42%) minmax(0, 58%)",
                gap: 24,
                alignItems: "start",
              }}
            >
              {/* LEFT FEED COLUMN */}
              <div className="indeed-feed-column">
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

                {/* HELPER CARD IN FEED */}
                <div
                  style={{
                    background: "#FFFFFF",
                    border: "1.5px dashed #CBD5E1",
                    borderRadius: 12,
                    padding: "22px 24px",
                    textAlign: "center",
                    marginTop: 10,
                  }}
                >
                  <p style={{ fontSize: 13.5, color: "#475569", margin: "0 0 12px", lineHeight: 1.55 }}>
                    <b>Need an attorney with niche experience or specific book of business?</b>
                    <br />
                    Justin maintains confidential relationships with off-market lateral candidates across Texas.
                  </p>
                  <Link
                    href="/submit-job"
                    className="btn btn-line btn-sm"
                    style={{ borderRadius: 7, fontWeight: 600, fontSize: 13 }}
                  >
                    Submit confidential seat mandate →
                  </Link>
                </div>
              </div>

              {/* RIGHT STICKY CANDIDATE DOSSIER PANE */}
              <div
                className="indeed-detail-column"
                style={{
                  position: "sticky",
                  top: 136,
                  maxHeight: "calc(100vh - 152px)",
                  overflowY: "auto",
                }}
              >
                <CandidateDetailPane
                  candidate={activeCandidate}
                  onRequestProfile={handleRequestProfile}
                />
              </div>
            </div>

            {/* MOBILE DETAIL DRAWER MODAL */}
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

            {/* CANDIDATE DOSSIER GATE FORM */}
            <div id="gate" style={{ marginTop: 52 }}>
              <GateForm
                id="finder-gate"
                eyebrow="Direct Candidate Dossiers"
                title={
                  selectedIds.length
                    ? `Send me the complete profile for ${selectedIds.join(", ")}`
                    : `Request full candidate profiles (${results.length} available)`
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
          </>
        )}
      </main>

      {/* 4. 4-STEP WORKFLOW */}
      <section
        className="block alt"
        style={{
          background: "#FAF9F5",
          padding: "88px 0 96px",
          borderTop: "1px solid #EAE7DC",
          borderBottom: "1px solid #EAE7DC",
        }}
      >
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
            <h2 className="sec-title-lg" style={{ fontFamily: "var(--display)", fontSize: "clamp(26px, 3.2vw, 38px)", color: "#08142A", margin: "0 0 14px", fontWeight: 400 }}>
              From your request to a first <span className="serif-accent" style={{ fontStyle: "italic", color: "#1D4ED8" }}>interview</span>
            </h2>
            <p className="who-lede" style={{ color: "#64748B", fontSize: 16, lineHeight: 1.6, margin: 0 }}>
              Transparent, discreet candidate introductions with zero obligation and zero upfront retainers.
            </p>
          </div>

          <div className="terms-pillars-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            <div className="terms-pillar" style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 12, padding: "26px 22px" }}>
              <div className="pillar-kicker" style={{ fontFamily: "var(--mono)", fontSize: 10.5, color: "#1D4ED8", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
                STEP 01 · REQUEST
              </div>
              <div className="pillar-val" style={{ fontFamily: "var(--display)", fontSize: 22, fontWeight: 400, color: "#08142A", marginBottom: 4, lineHeight: 1.25 }}>
                One Email
              </div>
              <div className="pillar-label" style={{ fontSize: 13, fontWeight: 500, color: "#64748B", marginBottom: 12 }}>
                Select candidate IDs
              </div>
              <p className="pillar-desc" style={{ fontSize: 13.5, lineHeight: 1.55, color: "#475569", margin: 0 }}>
                No agreement and no fee to see candidate dossiers. Your firm identity stays completely confidential.
              </p>
            </div>

            <div className="terms-pillar" style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 12, padding: "26px 22px" }}>
              <div className="pillar-kicker" style={{ fontFamily: "var(--mono)", fontSize: 10.5, color: "#1D4ED8", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
                STEP 02 · 1 HOUR
              </div>
              <div className="pillar-val" style={{ fontFamily: "var(--display)", fontSize: 22, fontWeight: 400, color: "#08142A", marginBottom: 4, lineHeight: 1.25 }}>
                Full Profiles
              </div>
              <div className="pillar-label" style={{ fontSize: 13, fontWeight: 500, color: "#64748B", marginBottom: 12 }}>
                Dossiers delivered
              </div>
              <p className="pillar-desc" style={{ fontSize: 13.5, lineHeight: 1.55, color: "#475569", margin: 0 }}>
                Redacted resumes for the candidates you choose, along with our simple one-page contingency agreement.
              </p>
            </div>

            <div className="terms-pillar" style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 12, padding: "26px 22px" }}>
              <div className="pillar-kicker" style={{ fontFamily: "var(--mono)", fontSize: 10.5, color: "#1D4ED8", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
                STEP 03 · 1 DAY
              </div>
              <div className="pillar-val" style={{ fontFamily: "var(--display)", fontSize: 22, fontWeight: 400, color: "#08142A", marginBottom: 4, lineHeight: 1.25 }}>
                Interviews
              </div>
              <div className="pillar-label" style={{ fontSize: 13, fontWeight: 500, color: "#64748B", marginBottom: 12 }}>
                Justin coordinates calls
              </div>
              <p className="pillar-desc" style={{ fontSize: 13.5, lineHeight: 1.55, color: "#475569", margin: 0 }}>
                We coordinate interviews with the candidates you want to meet, strictly at dates and times that suit you.
              </p>
            </div>

            <div className="terms-pillar" style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 12, padding: "26px 22px" }}>
              <div className="pillar-kicker" style={{ fontFamily: "var(--mono)", fontSize: 10.5, color: "#1D4ED8", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
                STEP 04 · WHEN HIRED
              </div>
              <div className="pillar-val" style={{ fontFamily: "var(--display)", fontSize: 22, fontWeight: 400, color: "#08142A", marginBottom: 4, lineHeight: 1.25 }}>
                Pay on Start
              </div>
              <div className="pillar-label" style={{ fontSize: 13, fontWeight: 500, color: "#64748B", marginBottom: 12 }}>
                Net 15 Invoice
              </div>
              <p className="pillar-desc" style={{ fontSize: 13.5, lineHeight: 1.55, color: "#475569", margin: 0 }}>
                Fee due 15 calendar days after candidate physically starts work. Covered by our 90-day replacement warranty.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. THE 4 TERMS PILLARS */}
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
              <h2 className="sec-title-lg" style={{ fontFamily: "var(--display)", fontSize: "clamp(26px, 3.2vw, 38px)", color: "#08142A", margin: 0, fontWeight: 400 }}>
                One fee, and only if you <span className="serif-accent" style={{ fontStyle: "italic", color: "#1D4ED8" }}>hire</span>
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
              <div className="pillar-kicker" style={{ fontFamily: "var(--mono)", fontSize: 10.5, color: "#64748B", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
                01 · CONTINGENCY FEE
              </div>
              <div className="pillar-val" style={{ fontFamily: "var(--display)", fontSize: 32, fontWeight: 400, color: "#1D4ED8", marginBottom: 4, lineHeight: 1.1 }}>
                23%
              </div>
              <div className="pillar-label" style={{ fontSize: 13.5, fontWeight: 500, color: "#08142A", marginBottom: 10 }}>
                Of first-year base pay
              </div>
              <p className="pillar-desc" style={{ fontSize: 13.5, lineHeight: 1.55, color: "#475569", margin: 0 }}>
                Calculated strictly on base salary. Discretionary bonuses and health benefits are never included.
              </p>
            </div>

            <div className="terms-pillar" style={{ background: "#FAF9F5", border: "1.5px solid #EAE7DC", borderRadius: 12, padding: "26px 22px" }}>
              <div className="pillar-kicker" style={{ fontFamily: "var(--mono)", fontSize: 10.5, color: "#64748B", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
                02 · REPLACEMENT WARRANTY
              </div>
              <div className="pillar-val" style={{ fontFamily: "var(--display)", fontSize: 32, fontWeight: 400, color: "#08142A", marginBottom: 4, lineHeight: 1.1 }}>
                90 Days
              </div>
              <div className="pillar-label" style={{ fontSize: 13.5, fontWeight: 500, color: "#08142A", marginBottom: 10 }}>
                Calendar day guarantee
              </div>
              <p className="pillar-desc" style={{ fontSize: 13.5, lineHeight: 1.55, color: "#475569", margin: 0 }}>
                If the hire leaves or is let go within 90 days, we conduct a replacement search at zero extra fee.
              </p>
            </div>

            <div className="terms-pillar" style={{ background: "#FAF9F5", border: "1.5px solid #EAE7DC", borderRadius: 12, padding: "26px 22px" }}>
              <div className="pillar-kicker" style={{ fontFamily: "var(--mono)", fontSize: 10.5, color: "#64748B", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
                03 · CLIENT FREEDOM
              </div>
              <div className="pillar-val" style={{ fontFamily: "var(--display)", fontSize: 32, fontWeight: 400, color: "#08142A", marginBottom: 4, lineHeight: 1.1 }}>
                Zero
              </div>
              <div className="pillar-label" style={{ fontSize: 13.5, fontWeight: 500, color: "#08142A", marginBottom: 10 }}>
                Upfront retainer or lock-in
              </div>
              <p className="pillar-desc" style={{ fontSize: 13.5, lineHeight: 1.55, color: "#475569", margin: 0 }}>
                No retainer and no exclusivity. Keep your internal pipeline and other recruiting sources active.
              </p>
            </div>

            <div className="terms-pillar" style={{ background: "#FAF9F5", border: "1.5px solid #EAE7DC", borderRadius: 12, padding: "26px 22px" }}>
              <div className="pillar-kicker" style={{ fontFamily: "var(--mono)", fontSize: 10.5, color: "#64748B", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
                04 · PAYMENT SCHEDULE
              </div>
              <div className="pillar-val" style={{ fontFamily: "var(--display)", fontSize: 32, fontWeight: 400, color: "#08142A", marginBottom: 4, lineHeight: 1.1 }}>
                Net 15
              </div>
              <div className="pillar-label" style={{ fontSize: 13.5, fontWeight: 500, color: "#08142A", marginBottom: 10 }}>
                Invoice on physical start date
              </div>
              <p className="pillar-desc" style={{ fontSize: 13.5, lineHeight: 1.55, color: "#475569", margin: 0 }}>
                We issue the invoice only when the candidate physically begins work, payable within 15 calendar days.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. BOTTOM DARK CTA SECTION */}
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
