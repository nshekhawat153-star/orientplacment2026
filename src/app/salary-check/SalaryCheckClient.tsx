"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "@/app/jobs/jobs-redesign.css";
import "./salary-check.css";
import { roles, cities, expBands, bonusNorms, jobs, findCity, findRole, findBand, fmt, expKey, toK, salaryPosition } from "@/data";
import { SalaryBandBar } from "@/components/SalaryBand";
import { JobListCard } from "@/app/jobs/components/JobListCard";
import { PkHero, PkSection, PkFaq, PkCallCard, PkArrow } from "@/components/PageKit";

const FAQ = [
  {
    q: "Is what I enter saved or shared?",
    a: "No. The check runs in your browser. Nothing is sent to a server, stored or tracked.",
  },
  {
    q: "Where does the salary data come from?",
    a: "Accepted offers, offer letters and live searches at small, boutique and mid-size law firms, grouped by city and years of experience.",
  },
  {
    q: "How is the band calculated?",
    a: "The bar shows the middle half of base salaries (25th to 75th percentile): a quarter earn below the left edge and a quarter above the right. The marker is you.",
  },
  {
    q: "What if I’m below the range?",
    a: "It usually means several years at one firm without a lateral reset. Internal raises often lag what the lateral market pays. Seats paying more are listed on this page.",
  },
];

export function SalaryCheckClient() {
  const router = useRouter();
  const availableRoles = useMemo(() => roles.filter((r) => cities.some((c) => findBand(c.slug, r.slug))), []);
  const [role, setRole] = useState("estate-planning-attorney");
  const [city, setCity] = useState("houston-tx");
  const [years, setYears] = useState(5);
  const [baseInput, setBaseInput] = useState("118000");
  const [bonusInput, setBonusInput] = useState("8000");
  const [base, setBase] = useState<number | null>(118);
  const [bonus, setBonus] = useState<number | null>(8);

  const availableCities = useMemo(() => cities.filter((c) => findBand(c.slug, role)), [role]);
  const roleObj = findRole(role) || roles[0];
  const cityObj = findCity(city) || cities[0];
  const eKey = expKey(years);
  const eBand = expBands.find((e) => e.key === eKey) || expBands[1];
  const band = findBand(city, role);
  const range = band ? band[eKey as "b1" | "b2" | "b3"] : null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const kb = toK(baseInput);
    setBase(kb && kb >= 20 ? kb : null);
    setBonus(toK(bonusInput));
    window.setTimeout(() => document.getElementById("result")?.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
  };

  const verdict = useMemo(() => {
    if (!base || !range) return null;
    const p = salaryPosition(city, role, eKey, base);
    const pct = p.pct ?? 50;
    const who = `${roleObj.short}s with ${eBand.label} in ${cityObj.name}`;
    if (p.where === "below")
      return {
        tone: "below",
        head: `${fmt.k(base)} is below the market range.`,
        body: `Most ${who} earn ${fmt.range(range)}. About ${100 - pct}% at your level earn more. The gap to the middle of the range is ${fmt.k((range[0] + range[1]) / 2 - base)}.`,
      };
    if (p.where === "above")
      return {
        tone: "above",
        head: `${fmt.k(base)} is above the usual range.`,
        body: `You out-earn about ${pct}% of ${who} (usual range ${fmt.range(range)}). Bigger moves from here usually need a portable book or a partnership track.`,
      };
    return {
      tone: "in",
      head: `${fmt.k(base)} is inside the market range.`,
      body: `You earn more than about ${pct}% of ${who}. The range runs ${fmt.range(range)}; the top of it pays ${fmt.k(range[1] - base)} more than you.`,
    };
  }, [base, range, city, role, eKey, roleObj, eBand, cityObj]);

  const payingMore = useMemo(() => {
    if (!base) return jobs.filter((j) => j.city === city && j.role === role);
    const same = jobs.filter((j) => j.city === city && j.role === role && j.band[1] > base);
    const near = same.length
      ? []
      : jobs.filter((j) => j.city === city && findRole(j.role)?.kind === roleObj.kind && j.role !== role && j.band[1] > base);
    return (same.length ? same : near).sort((a, b) => b.band[1] - a.band[1]);
  }, [base, city, role, roleObj]);

  const bonusText = bonusNorms[roleObj.kind] || bonusNorms.attorney;

  const form = (
    <form className="pk-form" onSubmit={submit}>
      <span className="pk-form-k">Private · runs in your browser</span>
      <h2 className="pk-form-h">Your pay today</h2>
      <div className="pk-fields">
        <label className="pk-field is-wide">
          <span>Practice area</span>
          <select
            value={role}
            onChange={(e) => {
              const r = e.target.value;
              setRole(r);
              if (!findBand(city, r)) {
                const first = cities.find((c) => findBand(c.slug, r));
                if (first) setCity(first.slug);
              }
            }}
          >
            {availableRoles.map((r) => (
              <option key={r.slug} value={r.slug}>
                {r.name}
              </option>
            ))}
          </select>
        </label>
        <label className="pk-field">
          <span>City</span>
          <select value={city} onChange={(e) => setCity(e.target.value)}>
            {availableCities.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}, {c.state}
              </option>
            ))}
          </select>
        </label>
        <label className="pk-field">
          <span>Years in practice</span>
          <input type="number" min={0} max={45} value={years} onChange={(e) => setYears(Number(e.target.value) || 0)} />
        </label>
        <label className="pk-field">
          <span>Current base ($/yr)</span>
          <input inputMode="numeric" value={baseInput} onChange={(e) => setBaseInput(e.target.value)} />
        </label>
        <label className="pk-field">
          <span>
            Bonus <em>optional</em>
          </span>
          <input inputMode="numeric" value={bonusInput} onChange={(e) => setBonusInput(e.target.value)} />
        </label>
      </div>
      <button type="submit" className="pk-btn is-primary sc-go">
        Check my pay <PkArrow />
      </button>
      <p className="pk-form-fine">Nothing is saved or sent anywhere.</p>
    </form>
  );

  return (
    <div className="sc">
      <PkHero
        eyebrow="Salary check · Free and private"
        title="Is your legal salary"
        accent="in line with the market?"
        lead={
          band && range
            ? `${roleObj.name}s in ${cityObj.name} with ${eBand.label} earn ${fmt.range(range)} base. See exactly where you sit, against real lateral offers.`
            : "See where your base sits against real lateral offers in your city."
        }
        trustItems={["Runs in your browser", "Updated quarterly", "Nothing is logged or shared"]}
        side={form}
      />

      <PkSection
        tone="light"
        id="result"
        kicker={`${roleObj.name} · ${cityObj.name}`}
        title="Where your pay"
        accent="sits."
        lead={`Middle half of base salaries by experience. Your level (${eBand.label}) is highlighted.`}
      >
        <div className="sc-grid">
          <div className="sc-band">
            <SalaryBandBar citySlug={city} roleSlug={role} highlight={eKey} marker={base} />
          </div>
          <div className={`sc-verdict is-${verdict?.tone || "none"}`}>
            {verdict ? (
              <>
                <span className="sc-k">Your result</span>
                <h3>{verdict.head}</h3>
                <p>{verdict.body}</p>
                {bonus && base ? (
                  <p className="sc-bonus">
                    With a {fmt.k(bonus)} bonus, total cash is <b>{fmt.k(base + bonus)}</b>. {bonusText}
                  </p>
                ) : null}
              </>
            ) : (
              <>
                <h3>Enter your base above.</h3>
                <p>Your result appears here.</p>
              </>
            )}
            <Link href={`/salaries/${role}/${city}`} className="sc-guide">
              Full {cityObj.name} salary guide <PkArrow size={14} />
            </Link>
          </div>
        </div>

        <div className="sc-seats">
          <div className="sc-seats-head">
            <h3>{payingMore.length > 0 && base ? `Seats paying more than ${fmt.k(base)}` : `${cityObj.name} seats for your role`}</h3>
            <Link href={`/jobs?l=${encodeURIComponent(cityObj.name)}`}>
              All {cityObj.name} seats <PkArrow size={14} />
            </Link>
          </div>
          {payingMore.length > 0 ? (
            <div className="sc-seat-grid">
              {payingMore.slice(0, 3).map((j) => (
                <JobListCard key={j.id} job={j} selected={false} onSelect={(x) => router.push(`/jobs?job=${encodeURIComponent(x.id)}`)} />
              ))}
            </div>
          ) : (
            <p className="sc-none">
              No listed seat pays more right now. <Link href="/upload-resume">Get matched privately</Link> and Justin will tell you
              when one opens.
            </p>
          )}
        </div>
      </PkSection>

      <PkSection tone="dark" id="faq">
        <div className="pk-split">
          <div className="pk-head">
            <span className="pk-kicker">
              <span aria-hidden="true" />
              About the data
            </span>
            <h2 className="pk-h2">
              How the numbers <em>work.</em>
            </h2>
            <p className="pk-sec-lead">Built from real offers at small and mid-size firms, not self-reported surveys or big-law lockstep.</p>
          </div>
          <PkFaq items={FAQ} />
        </div>
      </PkSection>

      <PkSection tone="light">
        <PkCallCard
          title="Ready for seats that pay"
          accentWords="what you’re worth?"
          text="Upload your resume privately. Your current firm never knows you’re looking."
          secondary={{ label: "Upload your resume", href: "/upload-resume" }}
        />
      </PkSection>
    </div>
  );
}
