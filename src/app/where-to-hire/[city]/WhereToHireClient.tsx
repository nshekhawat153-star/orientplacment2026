"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import "./where-to-hire.css";
import { DATA } from "@/data";
import { matchEnrichedCandidates } from "@/app/find-candidates/candidateData";
import { CandidateDossierCard } from "@/components/CandidateDossierCard";
import { PkHero, PkSection, PkCallCard, PkArrow } from "@/components/PageKit";

const WHY: Record<string, string> = {
  "Other small firms": "Moving for clearer partnership paths, succession plans and better practice tools.",
  "Mid-size firms": "Looking for autonomy, direct origination credit and saner billable targets.",
  "Solo practices": "Joining a boutique to shed admin, payroll risk and malpractice exposure.",
  "Large firms": "Leaving 2,000+ hour targets for control, partner mentorship and their own matters.",
  "In-house or government": "Returning to private practice for pay upside and client work.",
};

const FILTERS = [
  { id: "all", label: "All" },
  { id: "Law school", label: "Law schools" },
  { id: "Paralegal programme", label: "Paralegal programmes" },
  { id: "assoc", label: "Bar & associations" },
];

export function WhereToHireClient({ cityParam }: { cityParam: string }) {
  const city = DATA.cities.find((c) => c.slug === cityParam);
  const [kind, setKind] = useState("all");
  const [q, setQ] = useState("");

  const places = useMemo(
    () => (city ? (DATA.placesToHire[city.slug] || []).concat(DATA.placesToHireExtra[city.slug] || []) : []),
    [city]
  );
  const shown = useMemo(
    () =>
      places.filter((p) => {
        const k = kind === "all" ? true : kind === "assoc" ? /association/i.test(p.kind) : p.kind === kind;
        const s = q.trim().toLowerCase();
        return k && (!s || `${p.name} ${p.contact} ${p.cycle}`.toLowerCase().includes(s));
      }),
    [places, kind, q]
  );

  if (!city) notFound();

  const sources = DATA.lateralSources[city.slug] || [];
  const candidates = matchEnrichedCandidates({ role: null, city: city.slug, years: "any", mode: "any", pay: null });
  const count = (id: string) =>
    id === "all" ? places.length : places.filter((p) => (id === "assoc" ? /association/i.test(p.kind) : p.kind === id)).length;

  return (
    <div className="wh">
      <PkHero
        eyebrow={`Hiring guide · ${city.name}, ${city.state}`}
        title="Where to hire attorneys and paralegals"
        accent={`in ${city.name}.`}
        lead={`The law schools, paralegal programmes and bar groups ${city.name} firms recruit from, who to contact, and when. Plus where lateral hires actually come from.`}
        primary={{ label: `See ${city.name} candidates (${candidates.length})`, href: `/find-candidates?q=${encodeURIComponent(`Attorney in ${city.name}`)}` }}
        secondary={{ label: "Browse the sources", href: "#sources" }}
      />

      <PkSection
        tone="light"
        id="sources"
        kicker="Talent channels"
        title="Who to contact,"
        accent="and when they recruit."
        lead="Career offices, programme coordinators and section chairs, with each one’s hiring calendar."
      >
        <div className="wh-bar">
          <div className="wh-tabs" role="tablist" aria-label="Filter sources">
            {FILTERS.map((f) => (
              <button key={f.id} type="button" role="tab" aria-selected={kind === f.id} className={kind === f.id ? "is-on" : ""} onClick={() => setKind(f.id)}>
                {f.label} <small>{count(f.id)}</small>
              </button>
            ))}
          </div>
          <label className="wh-search">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" />
            </svg>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search a school or group" aria-label="Search sources" />
          </label>
        </div>

        <div className="wh-grid">
          {shown.map((p) => (
            <article key={p.name} className="wh-card">
              <span className="wh-kind">{p.kind}</span>
              <h3>{p.name}</h3>
              <dl>
                <div>
                  <dt>Contact</dt>
                  <dd>{p.contact}</dd>
                </div>
                <div>
                  <dt>When</dt>
                  <dd>{p.cycle}</dd>
                </div>
              </dl>
            </article>
          ))}
          {shown.length === 0 && <p className="wh-empty">Nothing matches that search.</p>}
        </div>
        <p className="wh-note">
          Need a posting to send them? Use a <Link href="/hiring-kit/estate-planning-attorney">hiring kit job post template</Link>.
        </p>
      </PkSection>

      {sources.length > 0 && (
        <PkSection
          tone="dark"
          id="laterals"
          kicker="Lateral market"
          title="Where lateral hires"
          accent={`come from in ${city.name}.`}
          lead={`Previous employer of attorneys and paralegals Orion has placed with ${city.name} boutiques and mid-size firms.`}
        >
          <div className="wh-sources">
            {sources.map(([name, pct]) => (
              <div key={name} className="wh-src">
                <div className="wh-src-top">
                  <h3>{name}</h3>
                  <b>{pct}%</b>
                </div>
                <span className="wh-src-bar" aria-hidden="true">
                  <i style={{ width: `${pct}%` }} />
                </span>
                {WHY[name] && <p>{WHY[name]}</p>}
              </div>
            ))}
          </div>
        </PkSection>
      )}

      <PkSection
        tone="light"
        id="candidates"
        kicker="Skip the calendar"
        title={`${city.name} talent`}
        accent="ready now."
        lead="Screened, anonymous profiles open to a move. No retainer, and no fee unless you hire."
      >
        <div className="wh-cands">
          {candidates.slice(0, 3).map(({ candidate, notes, warn }) => (
            <CandidateDossierCard
              key={candidate.id}
              c={candidate}
              notes={notes}
              warn={warn}
              actionLabel="See profile"
              action={{ href: `/find-candidates?q=${encodeURIComponent(`Attorney in ${city.name}`)}&c=${candidate.id}` }}
            />
          ))}
        </div>
        <Link href={`/find-candidates?q=${encodeURIComponent(`Attorney in ${city.name}`)}`} className="wh-all">
          See all {candidates.length} {city.name} candidates <PkArrow size={14} />
        </Link>
        <div className="wh-call">
          <PkCallCard
            title="Meet screened talent"
            accentWords="without the wait."
            text="Tell Justin about the seat. No retainer, non-exclusive, and one fee only if you hire."
            secondary={{ label: "Submit a job", href: "/submit-job" }}
          />
        </div>
      </PkSection>
    </div>
  );
}
