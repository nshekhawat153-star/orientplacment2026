"use client";

import React, { useState, useEffect, useMemo, useId } from "react";
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
  Candidate,
} from "@/data";
import { TrustLine } from "@/components/Rating";
import { Breadcrumb } from "@/components/Breadcrumb";
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
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Employers", href: "/employers" },
          { label: "Submit a job" },
        ]}
      />

      {/* 1. Hero with paste box */}
      <section className="phero sj-hero">
        <div className="wrap">
          <div>
            <span className="eyebrow">Submit a job · for firms hiring</span>
            <h1>Paste your job posting, see who fits</h1>
            <p className="lede">
              We read the role, city, years and pay, check the pay against the market and show matching candidates. Your posting is not published anywhere.
            </p>
            <TrustLine />
          </div>

          <form
            className="tool-form"
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
            <div className="field">
              <label htmlFor="p-text">
                Your job posting <span className="hint">(paste the text)</span>
              </label>
              <textarea
                id="p-text"
                rows={6}
                placeholder="Paste the posting from your site, LinkedIn or a job board."
                value={postingText}
                onChange={(e) => setPostingText(e.target.value)}
              />
            </div>
            <div className="hero-act">
              <button className="btn btn-primary" type="submit">
                Read my posting
              </button>
              <button
                className="linkbtn"
                type="button"
                id="p-sample"
                onClick={() => {
                  setPostingText(samplePosting);
                  handleReadPosting(samplePosting, true);
                }}
              >
                Use a sample posting
              </button>
            </div>
            {note && (
              <p className="small muted" id="p-note" aria-live="polite">
                {note}
              </p>
            )}
          </form>
        </div>
      </section>

      {/* 2. What we read */}
      <section className="block alt" id="read">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">What we read</span>
            <h2>Check what we read</h2>
            <p>Green fields came from your posting. Change any of them and the pay check and matches update.</p>
          </div>

          <div className="sj-read">
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

            <fieldset>
              <legend>
                Must-haves we found <span className="muted" style={{ fontWeight: 400 }}>(tap to add or remove)</span>
              </legend>
              <div className="chips" id="c-must">
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

      {/* 3. Pay check and matched candidates, gate beside them */}
      <section className="block" id="results">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Your result</span>
            <h2>Pay check and who fits</h2>
          </div>

          <div className="sj-res">
            <div>
              <div className="pay-card" id="paycheck" aria-live="polite">
                <span className="mini-h">Pay check</span>
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
                    <p className="small muted">
                      {roleObj.name}, {cityObj.name}, base salary by experience.
                    </p>
                    <SalaryBandBar
                      city={selectedCity}
                      role={selectedRole}
                      highlight={expBandKey}
                      marker={lo && hi ? (lo + hi) / 2 : lo || hi || undefined}
                    />
                    {payVerdict && (
                      <div className="verdict">
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

              <div className="results-head" aria-live="polite">
                <b id="r-count">
                  {matches.length ? (
                    <>
                      <Mark>{String(matches.length)}</Mark> candidate{" "}
                      {matches.length === 1 ? "matches" : "match"} this posting
                    </>
                  ) : (
                    "No exact matches in our current list"
                  )}
                </b>
                <span className="small muted" id="r-sub">
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

      {/* 4. What happens next */}
      <section className="block alt">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">What happens next</span>
            <h2>From your posting to a first interview</h2>
          </div>
          <ol className="steps-line">
            <li>
              <span className="when">You send</span>
              <h3>One email address</h3>
              <p>No agreement and no fee to send a job. Nothing is published.</p>
            </li>
            <li>
              <span className="when">
                <Mark>Within one business hour</Mark>
              </span>
              <h3>Full profiles arrive</h3>
              <p>Redacted resumes for the matches, and our one-page terms.</p>
            </li>
            <li>
              <span className="when">
                <Mark>Within five business days</Mark>
              </span>
              <h3>A wider shortlist</h3>
              <p>More people from our network if you want more to meet.</p>
            </li>
            <li>
              <span className="when">When they start</span>
              <h3>You pay the fee</h3>
              <p>One invoice on the start date. Replacement at no charge if they leave early.</p>
            </li>
          </ol>
        </div>
      </section>

      {/* 5. FAQ */}
      <section className="block">
        <div className="wrap split">
          <div className="sec-head">
            <span className="eyebrow">Questions</span>
            <h2>About submitting a job</h2>
            <p>
              No posting yet? Start from our{" "}
              <Link href="/hiring-kit/estate-planning-attorney">posting template</Link>, or{" "}
              <Link href="/find-candidates">describe the seat</Link> instead.
            </p>
          </div>
          <div className="faq">
            <details>
              <summary>Is my posting published anywhere?</summary>
              <p>
                No. We use it to match candidates and brief Justin. Candidates see a description of the seat, never your firm's name, until you agree to meet.
              </p>
            </details>
            <details>
              <summary>Can I keep the job on other boards?</summary>
              <p>
                Yes. We ask for no exclusivity. Keep it on your site, LinkedIn or the bar association boards.
              </p>
            </details>
            <details>
              <summary>What if the pay check says my range is low?</summary>
              <p>
                You can still send it. Justin will tell you which candidates would talk at your range and what a small change at the top would add.
              </p>
            </details>
            <details>
              <summary>What does it cost to send a job?</summary>
              <p>
                Nothing. The fee is due only if you hire someone we introduced, on their start date.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* 6. CTA band */}
      <div className="wrap">
        <div className="cta-band">
          <div className="wrap row">
            <div>
              <h2>Send this job and meet the matches</h2>
              <p>Full profiles within the hour. No retainer, and no fee unless you hire.</p>
            </div>
            <a className="btn btn-primary btn-lg" href="#gate">
              Send this job
            </a>
          </div>
        </div>
      </div>

      <div className="mbar">
        <a className="btn btn-primary" href="#gate" id="mbar-cta">
          Send this job
        </a>
      </div>
    </>
  );
}
