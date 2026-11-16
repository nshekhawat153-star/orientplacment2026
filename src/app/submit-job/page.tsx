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
        ? "Showing a sample posting. Paste yours to replace it."
        : `Read ${count} of 6 fields. Green fields came from your posting; check the rest.`
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

    let advice = "Most candidates at this level will take the call.";
    if (where === "below") {
      advice = `Expect fewer strong candidates to reply. A top of ${fmt.k(expRange[0])} or more puts the posting in range.`;
    } else if (where === "above") {
      advice = "Strong candidates will take the call. You may be able to ask for more experience at this pay.";
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
    <>
      {/* 1. LUXURY HERO WITH PASTE BOX */}
      <section className="emp-luxury-hero-sec sj-luxury-hero-sec">
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

        <div className="wrap emp-hero-content" style={{ maxWidth: 880 }}>
          <div className="emp-hero-badge-wrap">
            <div className="badge-capsule">
              <span className="badge-dot" />
              <span>DIRECT MANDATE INTAKE · 100% CONFIDENTIAL</span>
            </div>
          </div>

          <h1 className="emp-hero-h1">
            Paste your job posting, see <span className="serif-accent">who fits</span>
          </h1>

          <p className="emp-hero-lead">
            We instantly extract the practice role, location, experience requirements, and compensation band — check the pay against live market data, and reveal pre-screened matching candidates. Your posting is never published.
          </p>

          <form
            className="sj-luxury-form-card"
            id="post-form"
            aria-label="Your job posting"
            onSubmit={(e) => {
              e.preventDefault();
              if (!postingText.trim()) {
                setNote("Paste a posting first, or use the sample.");
                return;
              }
              handleReadPosting(postingText, false);
            }}
          >
            <div style={{ textAlign: "left", marginBottom: 14 }}>
              <label htmlFor="p-text" style={{ display: "block", fontFamily: "var(--mono)", fontSize: 11.5, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#08142A", marginBottom: 8 }}>
                Your job posting <span style={{ color: "#64748B", fontWeight: 400 }}>(paste full description or requirements)</span>
              </label>
              <textarea
                id="p-text"
                rows={5}
                placeholder="Paste the posting text from your careers site, LinkedIn, or an internal mandate note..."
                value={postingText}
                onChange={(e) => setPostingText(e.target.value)}
                style={{ width: "100%", padding: "14px 16px", borderRadius: 8, border: "1.5px solid #CBD5E1", fontSize: 14.5, color: "#08142A", outline: "none", background: "#FFFFFF", resize: "vertical", lineHeight: 1.5 }}
              />
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <button
                  className="btn btn-primary"
                  type="submit"
                  style={{ background: "#1D4ED8", borderRadius: 7, fontWeight: 600, padding: "12px 24px", fontSize: 14.5, border: "none", color: "#FFFFFF", cursor: "pointer", boxShadow: "0 4px 14px rgba(29,78,216,0.3)" }}
                >
                  Read my posting →
                </button>
                <button
                  className="btn btn-ghost"
                  type="button"
                  id="p-sample"
                  onClick={() => {
                    setPostingText(samplePosting);
                    handleReadPosting(samplePosting, true);
                  }}
                  style={{ borderRadius: 7, fontWeight: 600, padding: "11px 18px", fontSize: 14, color: "#475569", background: "#F1F5F9", border: "1.5px solid #E2E8F0", cursor: "pointer" }}
                >
                  Use sample posting
                </button>
              </div>

              {note && (
                <p style={{ margin: 0, fontFamily: "var(--mono)", fontSize: 12, color: "#059669", fontWeight: 600 }} id="p-note" aria-live="polite">
                  ✓ {note}
                </p>
              )}
            </div>
          </form>

          {/* Micro Reassurances */}
          <div className="emp-reassurance-row">
            <div className="emp-reassurance-item">
              <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="3.5 8.5 6.5 11.5 12.5 4.5" />
              </svg>
              <span>100% confidential intake</span>
            </div>
            <span className="emp-dot-sep">·</span>
            <div className="emp-reassurance-item">
              <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="3.5 8.5 6.5 11.5 12.5 4.5" />
              </svg>
              <span>Live market compensation check</span>
            </div>
            <span className="emp-dot-sep">·</span>
            <div className="emp-reassurance-item">
              <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="3.5 8.5 6.5 11.5 12.5 4.5" />
              </svg>
              <span>Pre-screened attorney matches</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHAT WE READ */}
      <section className="block alt" id="read" style={{ padding: "88px 0" }}>
        <div className="wrap">
          <div className="sec-head-premium">
            <div className="badge-capsule">
              <span className="badge-dot" />
              <span>INTELLIGENT PARSER · ADJUSTABLE FILTERS</span>
            </div>
            <h2 className="sec-title-lg">
              Check what we <span className="serif-accent">read</span>
            </h2>
            <p className="who-lede">
              Green fields came from your posting. Change any of them and the pay check and matches update immediately.
            </p>
          </div>

          <div className="sj-read" style={{ marginTop: 32 }}>
            <div className="pchips" id="chips">
              <label className={`pchip ${foundFields.role ? "found" : ""}`} data-f="role">
                <span>Role</span>
                <select
                  id="c-role"
                  value={selectedRole}
                  onChange={(e) => {
                    setSelectedRole(e.target.value);
                    setFoundFields((prev) => ({ ...prev, role: false }));
                  }}
                >
                  {roles.map((r) => (
                    <option key={r.slug} value={r.slug}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </label>

              <label className={`pchip ${foundFields.city ? "found" : ""}`} data-f="city">
                <span>City</span>
                <select
                  id="c-city"
                  value={selectedCity}
                  onChange={(e) => {
                    setSelectedCity(e.target.value);
                    setFoundFields((prev) => ({ ...prev, city: false }));
                  }}
                >
                  {cities.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name}, {c.state}
                    </option>
                  ))}
                </select>
              </label>

              <label className={`pchip ${foundFields.years ? "found" : ""}`} data-f="years">
                <span>Years</span>
                <select
                  id="c-years"
                  value={selectedYears}
                  onChange={(e) => {
                    setSelectedYears(e.target.value);
                    setFoundFields((prev) => ({ ...prev, years: false }));
                  }}
                >
                  <option value="any">Any</option>
                  {expBands.map((eb) => (
                    <option key={eb.key} value={eb.key}>
                      {eb.label}
                    </option>
                  ))}
                </select>
              </label>

              <div
                className={`pchip ${foundFields.pay ? "found" : ""}`}
                data-f="pay"
                style={{ gridColumn: "span 2" }}
              >
                <span id="c-pay-l">Posted base ($ thousands)</span>
                <div className="pair">
                  <input
                    id="c-lo"
                    type="number"
                    inputMode="numeric"
                    aria-label="Posted base from, $ thousands"
                    placeholder="from"
                    value={lo ?? ""}
                    onChange={(e) => {
                      let v = +e.target.value;
                      if (v > 1000) v = Math.round(v / 1000);
                      setLo(v || null);
                      setFoundFields((prev) => ({ ...prev, pay: false }));
                    }}
                  />
                  <span aria-hidden="true">–</span>
                  <input
                    id="c-hi"
                    type="number"
                    inputMode="numeric"
                    aria-label="Posted base to, $ thousands"
                    placeholder="to"
                    value={hi ?? ""}
                    onChange={(e) => {
                      let v = +e.target.value;
                      if (v > 1000) v = Math.round(v / 1000);
                      setHi(v || null);
                      setFoundFields((prev) => ({ ...prev, pay: false }));
                    }}
                  />
                </div>
              </div>

              <label className={`pchip ${foundFields.mode ? "found" : ""}`} data-f="mode">
                <span>Works</span>
                <select
                  id="c-mode"
                  value={selectedMode}
                  onChange={(e) => {
                    setSelectedMode(e.target.value as any);
                    setFoundFields((prev) => ({ ...prev, mode: false }));
                  }}
                >
                  <option value="any">Either</option>
                  <option value="on-site">On-site</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </label>
            </div>

            <fieldset style={{ border: "1.5px solid #E2E8F0", borderRadius: 12, padding: "20px 24px", background: "#FFFFFF", marginTop: 20 }}>
              <legend style={{ fontFamily: "var(--mono)", fontSize: 11.5, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#08142A", padding: "0 8px" }}>
                Must-haves we found <span style={{ color: "#64748B", fontWeight: 400 }}>(tap to add or remove)</span>
              </legend>
              <div className="chips" id="c-must" style={{ marginTop: 8 }}>
                {availableMustTags.map((tag) => {
                  const active = mustTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      className="chip"
                      aria-pressed={active}
                      onClick={() => toggleMustTag(tag)}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          </div>
        </div>
      </section>

      {/* 3. PAY CHECK AND MATCHED CANDIDATES */}
      <section className="block" id="results" style={{ padding: "88px 0" }}>
        <div className="wrap">
          <div className="sec-head-premium">
            <div className="badge-capsule">
              <span className="badge-dot" />
              <span>MARKET BENCHMARK · MATCHED TALENT</span>
            </div>
            <h2 className="sec-title-lg">
              Pay check &amp; who <span className="serif-accent">fits</span>
            </h2>
            <p className="who-lede">
              Verified market compensation range for this seat and available pre-screened candidate dossiers.
            </p>
          </div>

          <div className="sj-res" style={{ marginTop: 36 }}>
            <div>
              <div className="pay-card" id="paycheck" aria-live="polite" style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 14, padding: "28px 24px", boxShadow: "0 4px 16px rgba(15,23,42,0.04)" }}>
                <span className="mini-h" style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#1D4ED8", background: "rgba(29,78,216,0.08)", padding: "4px 10px", borderRadius: 6, display: "inline-block", marginBottom: 12 }}>
                  Market Pay check
                </span>
                {!lo && !hi ? (
                  <div className="empty-state small">
                    Add the posted pay above and we check it against what {cityObj.name} firms pay.
                  </div>
                ) : !band ? (
                  <div className="verdict">
                    <b>
                      Pay check for {roleObj.short} in {cityObj.name}
                    </b>
                    <br />
                    Justin sends the band for this role and city with your matches.
                  </div>
                ) : (
                  <>
                    <p className="small muted" style={{ marginBottom: 14 }}>
                      {roleObj.name}, {cityObj.name}, base salary by experience.
                    </p>
                    <SalaryBandBar
                      city={selectedCity}
                      role={selectedRole}
                      highlight={expBandKey}
                      marker={lo && hi ? (lo + hi) / 2 : lo || hi || undefined}
                    />
                    {payVerdict && (
                      <div className="verdict" style={{ marginTop: 16 }}>
                        <b>
                          Your posted range <Mark>{payVerdict.rangeText}</Mark> is{" "}
                          {payVerdict.where === "in" ? "in line with" : payVerdict.where} the market.
                        </b>
                        <br />
                        The usual range for {expBandObj?.label} in {cityObj.name} is{" "}
                        <Mark>{fmt.range(expRange!)}</Mark>. {payVerdict.advice}
                      </div>
                    )}
                  </>
                )}
              </div>

              <div className="results-head" aria-live="polite" style={{ marginTop: 28, marginBottom: 16 }}>
                <b id="r-count" style={{ fontFamily: "var(--display)", fontSize: 20, color: "#08142A" }}>
                  {matches.length ? (
                    <>
                      <Mark>{String(matches.length)}</Mark> candidate{" "}
                      {matches.length === 1 ? "matches" : "match"} this posting
                    </>
                  ) : (
                    "No exact matches in our current list"
                  )}
                </b>
                <span className="small muted" id="r-sub" style={{ display: "block", marginTop: 4 }}>
                  {matches.length
                    ? unlocked
                      ? "All open"
                      : `Top 3 open, ${Math.max(0, matches.length - 3)} more when you send the job`
                    : ""}
                </span>
              </div>

              <div id="r-list" className={!unlocked ? "pre" : ""}>
                {!matches.length ? (
                  <div className="empty-state">
                    <p>
                      <b>We search our wider network for seats like this.</b> Send the job and Justin replies within{" "}
                      <Mark>one business day</Mark>.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="cards">
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
                    </div>
                    {!unlocked && matches.length > 2 && (
                      <p className="small muted" style={{ marginTop: 12 }}>
                        <span className="hide-sm">
                          {matches.length - 3} more {matches.length - 3 === 1 ? "match" : "matches"}
                        </span>
                        <span className="only-sm">
                          {matches.length - 2} more {matches.length - 2 === 1 ? "match" : "matches"}
                        </span>{" "}
                        come with the full profiles.
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>

            <div id="gate">
              <GateForm
                eyebrow={matches.length > 3 ? `Get all ${matches.length} matches` : "Send this job"}
                title={
                  requestedId
                    ? `Send the job and request an intro to ${requestedId}`
                    : "Send this job to Justin"
                }
                bullets={[
                  `Full redacted profiles for ${matches.length ? "every match" : "the people we find"}`,
                  "A pay check on your range from Justin",
                  "Our one-page terms, within one business hour",
                ]}
                button="Send this job"
                candidateIds={candidateIds}
                role={selectedRole}
                city={selectedCity}
                reviewSlug="daffner-law"
                fine="Your posting is not published anywhere. No agreement and no fee to send a job."
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHAT HAPPENS NEXT */}
      <section className="block alt" style={{ padding: "88px 0" }}>
        <div className="wrap">
          <div className="sec-head-premium">
            <div className="badge-capsule">
              <span className="badge-dot" />
              <span>THE WORKFLOW · 4 EASY STEPS</span>
            </div>
            <h2 className="sec-title-lg">
              From your posting to a first <span className="serif-accent">interview</span>
            </h2>
            <p className="who-lede">
              A frictionless process engineered for busy managing partners.
            </p>
          </div>

          <div className="terms-pillars-grid" style={{ marginTop: 36 }}>
            <div className="terms-pillar">
              <div className="pillar-kicker">STEP 01 · SUBMISSION</div>
              <div className="pillar-val" style={{ fontSize: 26 }}>One Email</div>
              <div className="pillar-label">You send the mandate</div>
              <p className="pillar-desc">
                No agreement and no fee to send a job. Your posting stays strictly confidential.
              </p>
            </div>

            <div className="terms-pillar">
              <div className="pillar-kicker">STEP 02 · 1 HOUR</div>
              <div className="pillar-val" style={{ fontSize: 26 }}>Full Profiles</div>
              <div className="pillar-label">Redacted dossiers arrive</div>
              <p className="pillar-desc">
                Screened resumes for the matches, verified compensation, and our one-page terms.
              </p>
            </div>

            <div className="terms-pillar">
              <div className="pillar-kicker">STEP 03 · 5 DAYS</div>
              <div className="pillar-val" style={{ fontSize: 26 }}>Wider Shortlist</div>
              <div className="pillar-label">Active search extension</div>
              <p className="pillar-desc">
                Targeted outreach across our 100,000+ legal network if you want additional candidates.
              </p>
            </div>

            <div className="terms-pillar">
              <div className="pillar-kicker">STEP 04 · WHEN HIRED</div>
              <div className="pillar-val" style={{ fontSize: 26 }}>Pay on Start</div>
              <div className="pillar-label">One contingency invoice</div>
              <p className="pillar-desc">
                One invoice due 15 days after start date. Protected by our 90-day replacement warranty.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FAQ */}
      <section className="block" style={{ padding: "88px 0" }}>
        <div className="wrap split">
          <div className="sec-head-premium sec-head-left">
            <div className="badge-capsule">
              <span className="badge-dot" />
              <span>QUESTIONS &amp; ANSWERS</span>
            </div>
            <h2 className="sec-title-lg">
              About submitting a <span className="serif-accent">job</span>
            </h2>
            <p className="who-lede">
              No posting yet? Start from our{" "}
              <Link href="/hiring-kit/estate-planning-attorney" style={{ color: "#1D4ED8", textDecoration: "underline" }}>posting template</Link>, or{" "}
              <Link href="/find-candidates" style={{ color: "#1D4ED8", textDecoration: "underline" }}>describe the seat</Link> instead.
            </p>
          </div>

          <div className="faq" style={{ marginTop: 28 }}>
            <details style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 10, padding: "16px 20px", marginBottom: 12 }}>
              <summary style={{ fontWeight: 600, color: "#08142A", cursor: "pointer", fontSize: 15 }}>Is my posting published anywhere?</summary>
              <p style={{ marginTop: 12, fontSize: 14, color: "#475569", lineHeight: 1.6 }}>
                No. We use it to match candidates and brief Justin. Candidates see a general description of the seat, never your firm&apos;s name, until you agree to interview.
              </p>
            </details>
            <details style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 10, padding: "16px 20px", marginBottom: 12 }}>
              <summary style={{ fontWeight: 600, color: "#08142A", cursor: "pointer", fontSize: 15 }}>Can I keep the job on other boards?</summary>
              <p style={{ marginTop: 12, fontSize: 14, color: "#475569", lineHeight: 1.6 }}>
                Yes. We work on a non-exclusive basis. Keep it on your firm website, LinkedIn, or local bar association boards.
              </p>
            </details>
            <details style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 10, padding: "16px 20px", marginBottom: 12 }}>
              <summary style={{ fontWeight: 600, color: "#08142A", cursor: "pointer", fontSize: 15 }}>What if the pay check says my range is low?</summary>
              <p style={{ marginTop: 12, fontSize: 14, color: "#475569", lineHeight: 1.6 }}>
                You can still submit it. Justin will advise you on which candidates would be open at your current band and what a small adjustment would unlock.
              </p>
            </details>
            <details style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 10, padding: "16px 20px" }}>
              <summary style={{ fontWeight: 600, color: "#08142A", cursor: "pointer", fontSize: 15 }}>What does it cost to send a job?</summary>
              <p style={{ marginTop: 12, fontSize: 14, color: "#475569", lineHeight: 1.6 }}>
                Zero. Orion operates strictly on a contingency fee (23%) due only if you hire an introduced candidate, payable on their start date.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* 6. BOTTOM DARK CTA SECTION */}
      <section className="emp-terms-dark-sec">
        <div className="wrap">
          <div className="emp-terms-head">
            <div className="badge-capsule-dark">
              <span className="badge-dot-dark" />
              <span>DIRECT MANDATE · RAPID SHORTLIST</span>
            </div>
            <h2 className="emp-terms-h2">
              Send this job and meet the <span className="serif-accent-dark">matches</span>
            </h2>
            <p className="emp-terms-lead">
              Full candidate profiles within the hour. Zero retainer, zero exclusivity, and no fee unless you hire.
            </p>

            <div style={{ marginTop: 32 }}>
              <a href="#gate" className="btn-emp-primary" style={{ padding: "16px 36px", fontSize: 16 }}>
                <span>Send this job to Justin</span>
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