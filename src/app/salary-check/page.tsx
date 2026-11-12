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
  Job,
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

    const pct = p.pct ?? 50;
    if (p.where === "below") {
      head = `Your base of ${fmt.k(submittedBase)} is below the usual range.`;
      body = `Most ${who} earn ${fmt.range(expRange)}. About ${100 - pct} in 100 earn more than you. The gap to the middle of the range is ${fmt.k((expRange[0] + expRange[1]) / 2 - submittedBase)}.`;
    } else if (p.where === "above") {
      head = `Your base of ${fmt.k(submittedBase)} is above the usual range.`;
      body = `You earn more than about ${pct} in 100 ${who} (usual range ${fmt.range(expRange)}). A move up is most likely with a portable book or a senior title.`;
    } else {
      head = `Your base of ${fmt.k(submittedBase)} is inside the usual range.`;
      body = `You earn more than about ${pct} in 100 ${who}. The usual range is ${fmt.range(expRange)}; the top of it is ${fmt.k(expRange[1] - submittedBase)} above you.`;
    }

    return { head, body, p };
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
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Candidates", href: "/candidates" },
          { label: "Salary check" },
        ]}
      />

      {/* 1. Hero with form */}
      <section className="phero sc-hero">
        <div className="wrap">
          <div>
            <span className="eyebrow">Salary check · private, nothing is saved</span>
            <h1>Is your salary in line with the market?</h1>
            <p className="lede" id="lede-band">
              {roleObj.name}s in {cityObj.name} with {expBandObj.label} earn{" "}
              <Mark>{expRange ? fmt.range(expRange) : ""}</Mark> base. Where do you sit?
            </p>
            <ul className="ticks hide-sm" style={{ marginTop: 22 }}>
              <li>Runs in your browser. Your firm never hears about it</li>
              <li>Bands from real offers and roles, refreshed each quarter</li>
              <li>Roles that pay more, with the base on every one</li>
            </ul>
          </div>

          <form className="tool-form" id="sc" aria-label="Your pay" onSubmit={handleSubmit}>
            <h2>Your pay</h2>
            <div className="field">
              <label htmlFor="s-role">Role</label>
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
              >
                {availableRoles.map((r) => (
                  <option key={r.slug} value={r.slug}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="pair">
              <div className="field">
                <label htmlFor="s-city">City</label>
                <select
                  id="s-city"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                >
                  {availableCities.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name}, {c.state}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="s-years">Years of practice</label>
                <input
                  id="s-years"
                  type="number"
                  inputMode="numeric"
                  min="0"
                  max="45"
                  value={years}
                  onChange={(e) => setYears(+e.target.value || 0)}
                />
              </div>
            </div>

            <div className="pair">
              <div className="field">
                <label htmlFor="s-base">
                  Current base <span className="hint">($/yr)</span>
                </label>
                <div className="money">
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
                  />
                </div>
              </div>
              <div className="field">
                <label htmlFor="s-bonus">
                  Bonus <span className="hint">(optional)</span>
                </label>
                <div className="money">
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
                  />
                </div>
              </div>
            </div>

            <button className="btn btn-primary btn-lg" type="submit">
              Check my pay
            </button>
            <TrustLine kind="candidate" />
          </form>
        </div>
      </section>

      {/* 2. Result on band bar */}
      <section className="block alt" id="result">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Your result</span>
            <h2 id="r-title">
              {roleObj.name} pay in {cityObj.name}
            </h2>
            <p id="r-sub">
              Base salary by years of practice. {expBandObj.label} is highlighted.
            </p>
          </div>

          <div className="band-card res-card">
            <SalaryBandBar
              city={selectedCity}
              role={selectedRole}
              highlight={currentExpKey}
              marker={submittedBase ?? undefined}
            />
            <p className="source">
              Source: Orion placements and verified offers. Updated Q1 2026. Base salary only.{" "}
              <span id="bonus-norm"><Mark>{bonusNormText}</Mark></span>
            </p>

            <div id="verdict" aria-live="polite">
              {!submittedBase ? (
                <div className="verdict">
                  Enter your current base to place yourself on the bar. The usual range for{" "}
                  {expBandObj.label} is <Mark>{expRange ? fmt.range(expRange) : ""}</Mark>.
                </div>
              ) : verdict ? (
                <div className="verdict">
                  <b>{verdict.head}</b>
                  <br />
                  {verdict.body}
                  {submittedBonus ? (
                    <p className="total-line">
                      With your bonus of <Mark>{fmt.k(submittedBonus)}</Mark>, total cash is{" "}
                      <Mark>{fmt.k(submittedBase + submittedBonus)}</Mark>.{" "}
                      <Mark>{bonusNormText}</Mark>
                    </p>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Roles paying more */}
      <section className="block" id="more-block">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Roles that pay more</span>
            <h2>Confidential roles above your number</h2>
            <p>Employers stay confidential until your first call with Jon.</p>
          </div>

          <div id="more">
            <div className="results-head">
              <b>
                {submittedBase ? (
                  <>
                    <Mark>{String(rolesPayingMore.length)}</Mark>{" "}
                    {rolesPayingMore.length === 1 ? "role" : "roles"} in {cityObj.name} paying more than you earn
                  </>
                ) : (
                  <>{rolesPayingMore.length} open roles in {cityObj.name}</>
                )}
              </b>
              <Link
                href={`/jobs/${selectedRole}/${selectedCity}`}
                className="more link-arrow"
              >
                All {roleObj.short} roles in {cityObj.name}
              </Link>
            </div>

            {rolesPayingMore.length > 0 ? (
              <div className="cards">
                {rolesPayingMore.slice(0, 3).map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    why={
                      submittedBase
                        ? `Up to ${fmt.k(job.band[1])}, ${fmt.k(job.band[1] - submittedBase)} more than your base.`
                        : undefined
                    }
                  />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>
                  <b>Your base already tops the listed {cityObj.name} roles.</b> Senior seats are often filled before they are posted. Jon can tell you which firms would pay more for your experience.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. Email result and confidential call */}
      <section className="block alt">
        <div className="wrap split">
          <div>
            <div className="sec-head">
              <span className="eyebrow">By email</span>
              <h2>Get your result and the city guide</h2>
              <p>Keep it for your next review, or talk it through with Jon after work.</p>
            </div>
            <ul className="ticks">
              <li>Your result and the full band for your city</li>
              <li>The city legal salary guide (PDF), updated each quarter</li>
              <li>Add a phone number after and Jon calls you, confidentially</li>
            </ul>
          </div>
          <div id="talk">
            <GateForm
              eyebrow="Free by email"
              title="Email me my result and the city guide"
              audience="candidate"
              button="Email me my result"
              reviewSlug="vera-massey"
              fine="Use a personal email, not your work one. Your pay figures stay with Jon, and no firm sees your name until you say yes."
              steps={[
                ["Now", `Your result and the ${cityObj.name} salary guide are on their way. Your pay figures stay with Jon.`, true],
                ["Within one business day", `Jon emails what firms near you pay for ${expBandObj.label} and which roles fit. Add a phone number below for a call after work.`],
                ["On a call, if you want one", "What a move would look like, without your firm knowing you asked. No yes needed."],
                ["Each quarter", `The updated guide for ${roleObj.short}s in ${cityObj.name}. Unsubscribe in one click.`],
              ]}
            />
          </div>
        </div>
      </section>

      {/* 5. FAQ */}
      <section className="block">
        <div className="wrap split">
          <div className="sec-head">
            <span className="eyebrow">Questions</span>
            <h2>About the salary check</h2>
            <p>
              Full figures for one role:{" "}
              <Link href="/salaries/estate-planning-attorney/houston-tx">
                estate planning attorney pay in Houston
              </Link>.
            </p>
          </div>
          <div className="faq">
            <details>
              <summary>Is what I enter saved or shared?</summary>
              <p>
                No. The check runs in your browser. Nothing is stored unless you ask us to contact you, and even then no employer sees your pay or name without your yes.
              </p>
            </details>
            <details>
              <summary>Where do the bands come from?</summary>
              <p>
                Base salaries in offers made and roles posted through Orion, grouped by city, role and years since bar admission, refreshed every quarter.
              </p>
            </details>
            <details>
              <summary>How do I read the bar?</summary>
              <p>
                The green bar is the middle half of base salaries for your level: a quarter of people earn less than its left edge and a quarter earn more than its right edge. The black line is the median across all levels. The brass line is you.
              </p>
            </details>
            <details>
              <summary>My base is below the band. What should I do?</summary>
              <p>
                Look at the roles that pay more, then talk to Jon. He can tell you what firms near you would offer for your experience, without your firm knowing you asked.
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
              <h2>See the roles that pay more than you earn now</h2>
              <p>Confidential roles with verified compensation.</p>
            </div>
            <Link className="btn btn-primary btn-lg" href="/upload-resume">
              Upload your resume
            </Link>
          </div>
        </div>
      </div>

      <div className="mbar">
        <a className="btn btn-primary" href="#sc" id="mbar-cta">
          {rolesPayingMore.length ? "See roles that pay more" : "Talk confidentially"}
        </a>
      </div>
    </>
  );
}
