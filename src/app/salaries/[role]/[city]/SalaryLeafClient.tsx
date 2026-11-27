"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, notFound } from "next/navigation";
import "@/app/jobs/jobs-redesign.css";
import "./salary-leaf.css";
import { DATA, fmt, salaryPosition, inBandCandidates, matchCandidates } from "@/data";
import { useSite } from "@/context/SiteContext";
import { SalaryBand } from "@/components/SalaryBand";
import { JobListCard } from "@/app/jobs/components/JobListCard";
import { PkHero, PkSection, PkCards, PkFaq, PkCallCard, PkArrow } from "@/components/PageKit";

type Side = "employer" | "candidate";

export default function SalaryLeafClient({ roleParam, cityParam }: { roleParam: string; cityParam: string }) {
  const router = useRouter();
  const role = DATA.roles.find((r) => r.slug === roleParam);
  const city = DATA.cities.find((c) => c.slug === cityParam);
  const { door } = useSite();
  const [side, setSide] = useState<Side>(door === "candidate" ? "candidate" : "employer");
  const [payInput, setPayInput] = useState("130");
  const [expKey, setExpKey] = useState("b2");
  const [checked, setChecked] = useState<number | null>(null);

  if (!role || !city) notFound();
  const band = DATA.bands[city.slug]?.[role.slug];
  if (!band) notFound();

  const levers = DATA.payLevers[role.slug] || [];
  const isAttorney = role.kind === "attorney";
  const typed = parseFloat(payInput.replace(/[^\d.]/g, ""));
  const typedK = isNaN(typed) ? null : typed > 1000 ? typed / 1000 : typed;
  const pos = checked != null ? salaryPosition(city.slug, role.slug, expKey, checked) : null;
  const expLabel = DATA.expBands.find((e) => e.key === expKey)?.label || "";

  // Candidates in the band (for firms) and seats paying more (for candidates)
  const k = checked ?? band.median;
  let inBand = inBandCandidates(role.slug, city.slug, k);
  if (inBand.length === 0) inBand = matchCandidates({ role: role.slug, city: city.slug });
  let moreJobs = DATA.jobs.filter((j) => j.role === role.slug && j.city === city.slug && j.band[1] > k).sort((a, b) => b.band[1] - a.band[1]);
  if (moreJobs.length === 0) moreJobs = DATA.jobs.filter((j) => j.role === role.slug && j.city === city.slug);

  const otherRoles = DATA.roles
    .filter((r) => r.slug !== role.slug && DATA.bands[city.slug]?.[r.slug])
    .map((r) => ({ slug: r.slug, name: r.name, median: DATA.bands[city.slug][r.slug].median }));
  const otherCities = DATA.cities
    .filter((c) => c.slug !== city.slug && DATA.bands[c.slug]?.[role.slug])
    .map((c) => ({ slug: c.slug, name: `${c.name}, ${c.state}`, median: DATA.bands[c.slug][role.slug].median }));

  const a = /^[aeiou]/i.test(role.name) ? "an" : "a";
  const roleLower = role.name.toLowerCase();
  const faq = [
    {
      q: `What does ${a} ${roleLower} earn in ${city.name}?`,
      a: `The median base salary is ${fmt.k(band.median)}. With 1–3 years it is usually ${fmt.range(band.b1)}, with 4–7 years ${fmt.range(band.b2)}, and with 8+ years ${fmt.range(band.b3)} base, before bonus${isAttorney ? " or origination" : ""}.`,
    },
    ...(isAttorney
      ? [
          {
            q: "Does a portable book of business change the base offer?",
            a: "Yes. Even a modest book of existing clients is the strongest single lever on compensation, often adding $15k–$30k to base, plus an origination split.",
          },
          {
            q: "Do small boutique firms pay less than large firms?",
            a: "On base, boutiques usually sit a little below large-firm lockstep. They often ask for far fewer billable hours and share fees more directly, so total earnings can be equal or better.",
          },
        ]
      : [
          {
            q: "What raises pay at this level?",
            a: "Software skills, specialist experience in the practice area and the ability to run matters with little supervision usually move an offer up a band.",
          },
        ]),
    {
      q: "Where does this data come from?",
      a: `Accepted offers and live searches Orion has worked on in ${city.name}, grouped by years of experience. Ranges show the middle half of base salaries and exclude bonuses. Updated quarterly (${DATA.asOf}).`,
    },
  ];

  const check = (e: React.FormEvent) => {
    e.preventDefault();
    if (typedK && typedK >= 30) setChecked(typedK);
  };

  const query = `${role.name} in ${city.name}`;

  return (
    <div className="sl">
      <PkHero
        eyebrow={`Salary guide · ${city.name}, ${city.state}`}
        title={`${role.name} salary`}
        accent={`in ${city.name}, ${city.state}`}
        lead={`Base salaries from accepted lateral offers and live searches in ${city.name}. Excludes bonuses. Updated ${DATA.asOf}.`}
        side={
          <div className="sl-hero-card">
            <span className="sl-k">Median base</span>
            <p className="sl-median">{fmt.k(band.median)}</p>
            <ul>
              {DATA.expBands.map((e) => (
                <li key={e.key}>
                  <span>{e.label}</span>
                  <b>{fmt.range(band[e.key as "b1" | "b2" | "b3"])}</b>
                </li>
              ))}
            </ul>
            <div className="sl-hero-actions">
              <a href="#check" className="pk-btn is-primary">
                Check an offer <PkArrow />
              </a>
              <Link href={`/jobs?q=${encodeURIComponent(role.short || role.name)}&l=${encodeURIComponent(city.name)}`} className="sl-hero-link">
                Open {city.name} seats →
              </Link>
            </div>
          </div>
        }
      />

      {/* BAND + CHECK */}
      <PkSection
        tone="light"
        id="check"
        kicker="By experience"
        title="Where an offer"
        accent="actually sits."
        lead={`The middle half of ${roleLower} base salaries in ${city.name} (25th to 75th percentile), by years of experience.`}
      >
        <div className="sl-grid">
          <div className="sl-band-card">
            <SalaryBand citySlug={city.slug} roleSlug={role.slug} marker={checked} highlight={checked != null ? expKey : undefined} />
          </div>

          <div className="sl-check">
            <div className="sl-side" role="tablist" aria-label="I am">
              <button type="button" role="tab" aria-selected={side === "employer"} className={side === "employer" ? "is-on" : ""} onClick={() => setSide("employer")}>
                I’m hiring
              </button>
              <button type="button" role="tab" aria-selected={side === "candidate"} className={side === "candidate" ? "is-on" : ""} onClick={() => setSide("candidate")}>
                I’m a candidate
              </button>
            </div>
            <form onSubmit={check}>
              <div className="pk-fields">
                <label className="pk-field">
                  <span>{side === "employer" ? "Planned base offer" : "Your current base"}</span>
                  <span className="sl-money">
                    <b>$</b>
                    <input inputMode="numeric" value={payInput} onChange={(e) => setPayInput(e.target.value)} aria-label="Base salary in thousands" />
                    <em>k</em>
                  </span>
                </label>
                <label className="pk-field">
                  <span>Experience</span>
                  <select value={expKey} onChange={(e) => setExpKey(e.target.value)}>
                    {DATA.expBands.map((e) => (
                      <option key={e.key} value={e.key}>
                        {e.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <button type="submit" className="pk-btn is-dark sl-go">
                {side === "employer" ? "Check my offer" : "Check my pay"}
              </button>
            </form>

            {pos && checked != null && (
              <div className={`sl-verdict is-${pos.where}`} role="status">
                <b>
                  {fmt.k(checked)} is {pos.where === "in" ? "inside" : pos.where} the usual range for {expLabel}.
                </b>
                <span>
                  {side === "employer"
                    ? pos.text.charAt(0).toUpperCase() + pos.text.slice(1)
                    : pos.where === "above"
                      ? "Seats at this level are rare. Justin can tell you when one opens."
                      : `Seats paying more are open in ${city.name} now.`}
                </span>
              </div>
            )}

            <div className="sl-next">
              {side === "employer" ? (
                <Link href={`/find-candidates?q=${encodeURIComponent(`${query}, up to $${Math.round(k)}k`)}`} className="sl-next-link">
                  <span>
                    <b>{inBand.length}</b> {inBand.length === 1 ? "candidate is" : "candidates are"} open near this pay
                  </span>
                  See them <PkArrow size={14} />
                </Link>
              ) : (
                <>
                  {moreJobs.slice(0, 2).map((j) => (
                    <JobListCard key={j.id} job={j} selected={false} onSelect={(x) => router.push(`/jobs?job=${encodeURIComponent(x.id)}`)} />
                  ))}
                  {moreJobs.length === 0 && (
                    <Link href="/upload-resume" className="sl-next-link">
                      <span>No listed seat right now</span>
                      Get matched privately <PkArrow size={14} />
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {levers.length > 0 && (
          <div className="sl-levers">
            <h3>What moves a lateral offer up</h3>
            <PkCards items={levers.map((l) => ({ meta: l.k, title: l.fig, text: l.v }))} cols={levers.length >= 3 ? 3 : 2} />
          </div>
        )}
      </PkSection>

      {/* COMPARE */}
      <PkSection tone="dark" kicker="Compare" title="Other roles and" accent="other cities.">
        <div className="sl-compare">
          <div className="sl-list">
            <div className="sl-list-h">
              <b>Other roles in {city.name}</b>
              <span>Median base</span>
            </div>
            {otherRoles.map((r) => (
              <Link key={r.slug} href={`/salaries/${r.slug}/${city.slug}`}>
                <span>{r.name}</span>
                <b>{fmt.k(r.median)}</b>
              </Link>
            ))}
          </div>
          <div className="sl-list">
            <div className="sl-list-h">
              <b>{role.name} in other cities</b>
              <span>Median base</span>
            </div>
            {otherCities.map((c) => (
              <Link key={c.slug} href={`/salaries/${role.slug}/${c.slug}`}>
                <span>{c.name}</span>
                <b>{fmt.k(c.median)}</b>
              </Link>
            ))}
          </div>
        </div>
      </PkSection>

      {/* FAQ + CALL */}
      <PkSection tone="light">
        <div className="pk-split">
          <div className="pk-head">
            <span className="pk-kicker">
              <span aria-hidden="true" />
              Questions
            </span>
            <h2 className="pk-h2">
              {role.name} pay <em>in {city.name}.</em>
            </h2>
            <p className="pk-sec-lead">
              Hiring for this seat? Start from the <Link href={`/hiring-kit/${role.slug}`}>hiring kit</Link>.
            </p>
          </div>
          <PkFaq items={faq} />
        </div>
        <div className="sl-call">
          <PkCallCard
            title="Hire or move"
            accentWords={`in ${city.name}.`}
            text="Fifteen minutes with Justin about pay, candidates or open seats. No fee unless a match is hired."
            secondary={{ label: `See ${city.name} candidates`, href: `/find-candidates?q=${encodeURIComponent(query)}` }}
          />
        </div>
      </PkSection>
    </div>
  );
}
