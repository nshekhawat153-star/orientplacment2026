"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
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
  const [folded, setFolded] = useState(true);
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
        const m = params.get("mode") as any;
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

  const handleSelectCandidate = (cand: any) => {
    setSelectedCandidateId(cand.id);
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setMobileDrawerOpen(true);
    }
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.orionplacement.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Employers",
        item: "https://www.orionplacement.com/employers/",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Find candidates",
        item: "https://www.orionplacement.com/find-candidates/",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. LUXURY HERO WITH SPLASH VIDEO */}
      <section className="emp-luxury-hero-sec fc-luxury-hero-sec">
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

        <div className="wrap emp-hero-content">
          <div className="emp-hero-badge-wrap">
            <div className="badge-capsule">
              <span className="badge-dot" />
              <span>PRE-SCREENED TALENT · 100% CONTINGENCY</span>
            </div>
          </div>

          <h1 className="emp-hero-h1">
            Find candidates for your <span className="serif-accent">open seat</span>
          </h1>

          <p className="emp-hero-lead">
            Select your practice area, location, experience requirements, and notice window.
            Pre-screened lateral attorney dossiers update dynamically in real time.
          </p>

          <div className="emp-hero-actions">
            <a href="#brief" className="btn-emp-primary">
              <span>Filter candidate pool</span>
              <svg aria-hidden="true" viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
                <path d="M10.3 3.3a1 1 0 0 1 1.4 0l6 6a1 1 0 0 1 0 1.4l-6 6a1 1 0 1 1-1.4-1.4l4.3-4.3H3a1 1 0 1 1 0-2h11.6l-4.3-4.3a1 1 0 0 1 0-1.4Z" />
              </svg>
            </a>
            <Link href="/submit-job" className="btn-emp-ghost">
              <span>Submit a job instead</span>
              <svg aria-hidden="true" viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
                <path d="M10.3 3.3a1 1 0 0 1 1.4 0l6 6a1 1 0 0 1 0 1.4l-6 6a1 1 0 1 1-1.4-1.4l4.3-4.3H3a1 1 0 1 1 0-2h11.6l-4.3-4.3a1 1 0 0 1 0-1.4Z" />
              </svg>
            </Link>
          </div>

          {/* Micro Reassurances */}
          <div className="emp-reassurance-row">
            <div className="emp-reassurance-item">
              <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="3.5 8.5 6.5 11.5 12.5 4.5" />
              </svg>
              <span>Top candidates available now</span>
            </div>
            <span className="emp-dot-sep">·</span>
            <div className="emp-reassurance-item">
              <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="3.5 8.5 6.5 11.5 12.5 4.5" />
              </svg>
              <span>Names confidential until approved</span>
            </div>
            <span className="emp-dot-sep">·</span>
            <div className="emp-reassurance-item">
              <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="3.5 8.5 6.5 11.5 12.5 4.5" />
              </svg>
              <span>Zero fee unless you hire (23% Net 15)</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN TOOL WORKSPACE */}
      <section className="wrap tool-sec" style={{ padding: "64px 0 88px" }}>
        <div className="tool">
          {/* FILTER BRIEF FORM */}
          <form
            className={`tool-form${folded ? " folded editing" : ""}`}
            id="brief"
            aria-label="Your seat"
            style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 14, padding: "24px 28px", boxShadow: "0 4px 16px rgba(15,23,42,0.04)" }}
          >
            <div className="brief-sum" id="brief-sum" style={{ borderBottom: "1px solid #E2E8F0", paddingBottom: 16, marginBottom: 16 }}>
              <p style={{ margin: 0 }}>
                <span className="small muted" style={{ display: "block", fontFamily: "var(--mono)", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#1D4ED8", marginBottom: 4 }}>Current Seat Filter</span>
                <b id="brief-sum-t" style={{ fontFamily: "var(--display)", fontSize: 18, color: "#08142A" }}>{summaryBits.join(" · ")}</b>
              </p>
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                id="brief-edit"
                aria-expanded={!folded}
                onClick={() => setFolded(!folded)}
                style={{ borderRadius: 6, fontWeight: 600, padding: "6px 14px", border: "1px solid #CBD5E1" }}
              >
                {folded ? "Change Filters" : "Done"}
              </button>
            </div>

            <h2 style={{ fontFamily: "var(--display)", fontSize: 22, color: "#08142A", margin: "0 0 16px" }}>Filter Seat Specifications</h2>

            <div className="field" style={{ marginBottom: 16 }}>
              <label htmlFor="b-role" style={{ display: "block", fontFamily: "var(--mono)", fontSize: 11.5, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#08142A", marginBottom: 6 }}>Role</label>
              <select
                id="b-role"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={{ width: "100%", padding: "10px 14px", borderRadius: 7, border: "1.5px solid #CBD5E1", fontSize: 14.5, color: "#08142A", background: "#FFFFFF" }}
              >
                {roles.map((r) => (
                  <option key={r.slug} value={r.slug}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="field" style={{ marginBottom: 16 }}>
              <label htmlFor="b-city" style={{ display: "block", fontFamily: "var(--mono)", fontSize: 11.5, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#08142A", marginBottom: 6 }}>City</label>
              <select
                id="b-city"
                name="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                style={{ width: "100%", padding: "10px 14px", borderRadius: 7, border: "1.5px solid #CBD5E1", fontSize: 14.5, color: "#08142A", background: "#FFFFFF" }}
              >
                {cities.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}, {c.state}
                  </option>
                ))}
              </select>
            </div>

            <div className="field" style={{ marginBottom: 16 }}>
              <label htmlFor="b-years" style={{ display: "block", fontFamily: "var(--mono)", fontSize: 11.5, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#08142A", marginBottom: 6 }}>Years of experience</label>
              <select
                id="b-years"
                name="years"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                style={{ width: "100%", padding: "10px 14px", borderRadius: 7, border: "1.5px solid #CBD5E1", fontSize: 14.5, color: "#08142A", background: "#FFFFFF" }}
              >
                <option value="any">Any experience</option>
                {expBands.map((eb) => (
                  <option key={eb.key} value={eb.key}>
                    {eb.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="field" style={{ marginBottom: 16 }}>
              <label htmlFor="b-mode" style={{ display: "block", fontFamily: "var(--mono)", fontSize: 11.5, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#08142A", marginBottom: 6 }}>Work arrangement</label>
              <select
                id="b-mode"
                name="mode"
                value={mode}
                onChange={(e) => setMode(e.target.value as any)}
                style={{ width: "100%", padding: "10px 14px", borderRadius: 7, border: "1.5px solid #CBD5E1", fontSize: 14.5, color: "#08142A", background: "#FFFFFF" }}
              >
                <option value="any">Either on-site or hybrid</option>
                <option value="on-site">On-site only</option>
                <option value="hybrid">Hybrid only</option>
              </select>
            </div>

            <div className="field" style={{ marginBottom: 16 }}>
              <label htmlFor="b-pay" style={{ display: "block", fontFamily: "var(--mono)", fontSize: 11.5, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#08142A", marginBottom: 6 }}>
                Target base pay ($/yr)
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
                style={{ width: "100%", padding: "10px 14px", borderRadius: 7, border: "1.5px solid #CBD5E1", fontSize: 14.5, color: "#08142A", background: "#FFFFFF" }}
              />
            </div>

            <fieldset className="field" style={{ border: 0, padding: 0 }}>
              <legend className="label" style={{ display: "block", fontFamily: "var(--mono)", fontSize: 11.5, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#08142A", marginBottom: 8 }}>
                Must-haves <span className="hint" style={{ color: "#64748B", fontWeight: 400 }}>(tap to add)</span>
              </legend>
              <div className="chips" id="b-must">
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
            <div className="results-head" aria-live="polite" style={{ marginBottom: 18 }}>
              <b id="r-count" style={{ fontFamily: "var(--display)", fontSize: 22, color: "#08142A" }}>
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
              <span className="small muted" id="r-sub" style={{ display: "block", marginTop: 4 }}>
                {results.length
                  ? unlocked
                    ? "All open"
                    : results.length > 3
                    ? `Top 3 open, ${results.length - 3} more by email`
                    : "All open"
                  : ""}
              </span>
            </div>

            {!results.length ? (
              <div className="empty-state" id="r-list" style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 14, padding: "36px 32px", textAlign: "center" }}>
                <p style={{ fontSize: 16, color: "#08142A", margin: "0 0 16px" }}>
                  <b>No one in our current pool fits this exact seat.</b> We search
                  our wider network of 100,000+ legal professionals for seats like this one. Send it and Justin
                  replies within <Mark>one business day</Mark>.
                </p>
                <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
                  <Link className="btn btn-primary btn-sm" href="/submit-job" style={{ borderRadius: 7, fontWeight: 600, padding: "10px 20px" }}>
                    Send this seat to Justin →
                  </Link>
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm"
                    id="widen"
                    onClick={() => setSelectedMust([])}
                    style={{ borderRadius: 7, fontWeight: 600, padding: "10px 18px" }}
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
                        ? `See all ${results.length}`
                        : "Full profiles"
                    }
                    title={
                      selectedIds.length
                        ? `Send me the full profile for ${selectedIds.join(", ")}`
                        : "Get the full profiles"
                    }
                    bullets={[
                      `Redacted resumes for ${
                        selectedIds.length
                          ? selectedIds.join(", ")
                          : results.length === 1
                          ? "this candidate"
                          : `all ${results.length} candidates`
                      }`,
                      "Pay expectation, bar admission and notice period",
                      "Our one-page terms, within one business hour",
                    ]}
                    button={
                      selectedIds.length
                        ? "Send me the full profile"
                        : "Send me the full profiles"
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
                        with the full profiles
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
      <section className="block alt" style={{ padding: "88px 0" }}>
        <div className="wrap">
          <div className="sec-head-premium">
            <div className="badge-capsule">
              <span className="badge-dot" />
              <span>THE PROCESS · 4 EASY STEPS</span>
            </div>
            <h2 className="sec-title-lg">
              From your request to a first <span className="serif-accent">interview</span>
            </h2>
            <p className="who-lede">
              Transparent, discreet candidate introductions with zero obligation.
            </p>
          </div>

          <div className="terms-pillars-grid" style={{ marginTop: 36 }}>
            <div className="terms-pillar">
              <div className="pillar-kicker">STEP 01 · REQUEST</div>
              <div className="pillar-val" style={{ fontSize: 26 }}>One Email</div>
              <div className="pillar-label">Select profiles</div>
              <p className="pillar-desc">
                No agreement and no fee to see candidate dossiers. Your firm identity stays confidential.
              </p>
            </div>

            <div className="terms-pillar">
              <div className="pillar-kicker">STEP 02 · 1 HOUR</div>
              <div className="pillar-val" style={{ fontSize: 26 }}>Full Profiles</div>
              <div className="pillar-label">Dossiers delivered</div>
              <p className="pillar-desc">
                Redacted resumes for the candidates you choose, along with our one-page contingency terms.
              </p>
            </div>

            <div className="terms-pillar">
              <div className="pillar-kicker">STEP 03 · 1 DAY</div>
              <div className="pillar-val" style={{ fontSize: 26 }}>Interviews</div>
              <div className="pillar-label">Justin coordinates calls</div>
              <p className="pillar-desc">
                We coordinate interviews with the candidates you want to meet, at dates and times that suit you.
              </p>
            </div>

            <div className="terms-pillar">
              <div className="pillar-kicker">STEP 04 · WHEN HIRED</div>
              <div className="pillar-val" style={{ fontSize: 26 }}>Pay on Start</div>
              <div className="pillar-label">Net 15 Invoice</div>
              <p className="pillar-desc">
                Fee due 15 days after candidate starts. Covered by our 90-day replacement warranty.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE 4 TERMS PILLARS */}
      <section className="block" style={{ padding: "88px 0" }}>
        <div className="wrap">
          <div className="sec-head-premium" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16 }}>
            <div>
              <div className="badge-capsule">
                <span className="badge-dot" />
                <span>TERMS TRANSPARENCY</span>
              </div>
              <h2 className="sec-title-lg" style={{ margin: "8px 0 0" }}>
                One fee, and only if you <span className="serif-accent">hire</span>
              </h2>
            </div>
            <Link className="btn btn-outline btn-sm" href="/fees" style={{ borderRadius: 7, fontWeight: 600, padding: "10px 20px" }}>
              Fees and calculator →
            </Link>
          </div>

          <div className="terms-pillars-grid" style={{ marginTop: 36 }}>
            <div className="terms-pillar">
              <div className="pillar-kicker">01 · CONTINGENCY FEE</div>
              <div className="pillar-val">23%</div>
              <div className="pillar-label">Of first-year base</div>
              <p className="pillar-desc">
                Calculated strictly on base salary. Discretionary bonuses and benefits are never included.
              </p>
            </div>

            <div className="terms-pillar">
              <div className="pillar-kicker">02 · REPLACEMENT WARRANTY</div>
              <div className="pillar-val">90 Days</div>
              <div className="pillar-label">Calendar day guarantee</div>
              <p className="pillar-desc">
                If the hire leaves or is let go within 90 days, we conduct a replacement search at zero extra fee.
              </p>
            </div>

            <div className="terms-pillar">
              <div className="pillar-kicker">03 · CLIENT FREEDOM</div>
              <div className="pillar-val">Zero</div>
              <div className="pillar-label">Upfront retainer or lock-in</div>
              <p className="pillar-desc">
                No retainer and no exclusivity. Keep your internal pipeline and other recruiters active.
              </p>
            </div>

            <div className="terms-pillar">
              <div className="pillar-kicker">04 · PAYMENT SCHEDULE</div>
              <div className="pillar-val">Net 15</div>
              <div className="pillar-label">Invoice on start date</div>
              <p className="pillar-desc">
                We issue the invoice only when the candidate physically begins work, payable within 15 calendar days.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BOTTOM DARK CTA SECTION */}
      <section className="emp-terms-dark-sec">
        <div className="wrap">
          <div className="emp-terms-head">
            <div className="badge-capsule-dark">
              <span className="badge-dot-dark" />
              <span>DIRECT MANDATE ADVISORY</span>
            </div>
            <h2 className="emp-terms-h2">
              Rather talk the seat through <span className="serif-accent-dark">first?</span>
            </h2>
            <p className="emp-terms-lead">
              Book a 15-minute briefing directly with founder Justin Sofman: the seat, the market compensation band, and who is available right now.
            </p>

            <div style={{ marginTop: 32 }}>
              <a
                href={trust.calendly || "https://calendly.com/orionplacement/call-with-justin"}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-emp-primary"
                style={{ padding: "16px 36px", fontSize: 16 }}
              >
                <span>Book 15 min with Justin</span>
                <svg aria-hidden="true" viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
                  <path d="M10.3 3.3a1 1 0 0 1 1.4 0l6 6a1 1 0 0 1 0 1.4l-6 6a1 1 0 1 1-1.4-1.4l4.3-4.3H3a1 1 0 1 1 0-2h11.6l-4.3-4.3a1 1 0 0 1 0-1.4Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}