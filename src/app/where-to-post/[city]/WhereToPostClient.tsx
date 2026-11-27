"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import "@/app/where-to-hire/[city]/where-to-hire.css";
import { DATA } from "@/data";
import { matchEnrichedCandidates } from "@/app/find-candidates/candidateData";
import { CandidateDossierCard } from "@/components/CandidateDossierCard";
import { PkHero, PkSection, PkCards, PkCallCard, PkArrow } from "@/components/PageKit";

const SEATS = [
  { id: "all", label: "All roles" },
  { id: "attorney", label: "Lateral attorneys" },
  { id: "paralegal", label: "Paralegals" },
  { id: "staff", label: "Legal assistants & staff" },
];

const ELEMENTS = [
  { meta: "01", title: "The pay band", text: "Publish the salary range. It filters out poor fits and signals a serious firm." },
  { meta: "02", title: "The work model", text: "Say exactly how many office days and where the office is." },
  { meta: "03", title: "The practice mix", text: "Spell out the split, e.g. 60% estate planning, 40% probate administration." },
  { meta: "04", title: "Bar requirements", text: "State the bar admission you need, or which reciprocity you accept." },
  { meta: "05", title: "Billable target", text: "Give a realistic annual hours number. It is what laterals ask about first." },
  { meta: "06", title: "Confidentiality", text: "Say who reviews resumes and that they are never circulated." },
];

export function WhereToPostClient({ cityParam }: { cityParam: string }) {
  const city = DATA.cities.find((c) => c.slug === cityParam);
  const [seat, setSeat] = useState("all");
  if (!city) notFound();

  const places = DATA.placesToPost[city.slug] || [];
  const fitMap = DATA.placesToPostFit[city.slug] || [];
  const candidates = matchEnrichedCandidates({ role: null, city: city.slug, years: "any", mode: "any", pay: null });
  const q = encodeURIComponent(`Attorney in ${city.name}`);

  return (
    <div className="wh">
      <PkHero
        eyebrow={`Job board guide · ${city.name}, ${city.state}`}
        title="Where to post a legal job"
        accent={`in ${city.name}.`}
        lead={`${places.length} places ${city.name} firms post legal jobs, compared on cost, reach and how fast the first applicant arrives. Or skip posting and meet screened candidates now.`}
        primary={{ label: "Compare the boards", href: "#boards" }}
        secondary={{ label: `See ${city.name} candidates (${candidates.length})`, href: `/find-candidates?q=${q}` }}
      />

      <PkSection
        tone="light"
        id="boards"
        kicker="Side by side"
        title={`${places.length} places to post,`}
        accent="compared."
        lead="Pick the role you are hiring for to highlight the boards that fit it."
      >
        <div className="wh-bar">
          <div className="wh-tabs" role="tablist" aria-label="Role">
            {SEATS.map((s) => (
              <button key={s.id} type="button" role="tab" aria-selected={seat === s.id} className={seat === s.id ? "is-on" : ""} onClick={() => setSeat(s.id)}>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="wh-table">
          <div className="wh-tr wh-th">
            <span>Board</span>
            <span>Cost</span>
            <span>Reach</span>
            <span>First applicant</span>
            <span>Best for</span>
          </div>
          {places.map((p, i) => {
            const fit = fitMap[i] || [];
            const dim = seat !== "all" && !fit.includes(seat);
            return (
              <div key={p.name} className="wh-tr" style={{ opacity: dim ? 0.35 : 1 }}>
                <span className="wh-name">{p.name}</span>
                <span data-l="Cost">{p.cost}</span>
                <span data-l="Reach">{p.reach}</span>
                <span data-l="First applicant" className="wh-speed">
                  {p.firstApplicant}
                </span>
                <span data-l="Best for">{p.bestFor}</span>
              </div>
            );
          })}
          <div className="wh-tr is-orion">
            <span className="wh-name">Orion Placement</span>
            <span data-l="Cost">$0 upfront, fee only if you hire</span>
            <span data-l="Reach">{candidates.length} screened {city.name} candidates</span>
            <span data-l="First applicant" className="wh-speed">
              Profiles the same day
            </span>
            <span>
              <Link href={`/find-candidates?q=${q}`}>See candidates →</Link>
            </span>
          </div>
        </div>
      </PkSection>

      <PkSection
        tone="dark"
        id="posting"
        kicker="Write a better post"
        title="Six things every strong"
        accent="legal job post includes."
        lead="Posts with clear pay and practice detail get far more qualified lateral applicants."
      >
        <div className="wh-els">
          <PkCards items={ELEMENTS} cols={3} />
        </div>
        <p className="wh-note wh-note-dark">
          Want it written for you? Use a <Link href="/hiring-kit/estate-planning-attorney">hiring kit job post template</Link>.
        </p>
      </PkSection>

      <PkSection
        tone="light"
        id="candidates"
        kicker="Before you pay to post"
        title={`${city.name} candidates`}
        accent="looking now."
        lead="Screened, anonymous profiles open to a move. Available to interview without a job ad."
      >
        <div className="wh-cands">
          {candidates.slice(0, 3).map(({ candidate, notes, warn }) => (
            <CandidateDossierCard
              key={candidate.id}
              c={candidate}
              notes={notes}
              warn={warn}
              actionLabel="See profile"
              action={{ href: `/find-candidates?q=${q}&c=${candidate.id}` }}
            />
          ))}
        </div>
        <Link href={`/find-candidates?q=${q}`} className="wh-all">
          See all {candidates.length} {city.name} candidates <PkArrow size={14} />
        </Link>
        <div className="wh-call">
          <PkCallCard
            title={`See ${city.name} talent`}
            accentWords="before you pay to post."
            text="No retainer, non-exclusive, and the fee is due only if you hire."
            secondary={{ label: "Submit a job", href: "/submit-job" }}
          />
        </div>
      </PkSection>
    </div>
  );
}
