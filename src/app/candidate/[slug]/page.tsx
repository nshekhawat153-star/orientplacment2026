import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "./candidate-profile.css";
import { candidates, findCandidate, findCity, findRole, salaryPosition, fmt, asOf } from "@/data";
import { matchEnrichedCandidates } from "@/app/find-candidates/candidateData";
import { ResumeSheet } from "@/components/ResumeSheet";
import { SalaryBandBar } from "@/components/SalaryBand";
import { CandidateDossierCard } from "@/components/CandidateDossierCard";
import { PkHero, PkSection, PkTerms, PkCallCard, PkCheck } from "@/components/PageKit";
import { RequestProfile } from "./RequestProfile";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return candidates.map((c) => ({ slug: c.id.toLowerCase() }));
}

function getCandidate(slug: string) {
  return findCandidate(slug.toUpperCase()) || candidates.find((item) => item.id.toLowerCase() === slug.toLowerCase());
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const c = getCandidate(slug);
  if (!c) return {};
  const city = findCity(c.city);
  return {
    title: `${c.headline} | Orion Placement`,
    description: `Screened candidate${city ? ` in ${city.name}` : ""}: ${c.years} years, ${fmt.range(c.pay)} base expected, ${c.availability.toLowerCase()}. Anonymous profile; no fee unless you hire.`,
  };
}

const TERMS = [
  { k: "$0", v: "To see the full profile" },
  { k: "Non-exclusive", v: "Keep your other channels" },
  { k: "90 days", v: "Free replacement" },
  { k: "Net 15", v: "Invoiced on start date" },
];

export default async function CandidateProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const c = getCandidate(slug);
  if (!c) notFound();

  const role = findRole(c.role);
  const city = findCity(c.city);
  const mid = (c.pay[0] + c.pay[1]) / 2;
  const pos = salaryPosition(c.city, c.role, "b2", mid);
  const a = /^[aeiou]/i.test(c.firmType) ? "an" : "a";

  const facts: Array<[string, string]> = [
    ["Practice", c.mix.map((x) => `${x[0]} ${x[1]}%`).join(" · ")],
    ["Now at", `${a[0].toUpperCase()}${a.slice(1)} ${c.firmType.toLowerCase()} (${c.firmSize})`],
    ["Bar", c.bars.join(", ")],
    ["Based", `${c.area}${c.relocate.length ? " · open to relocate" : ""}`],
    ["Works", fmt.modes(c.modes)],
    ["Available", c.availability],
  ];

  const similar = matchEnrichedCandidates({ role: c.role, city: c.city, years: "any", mode: "any", pay: null })
    .filter((r) => r.candidate.id !== c.id)
    .slice(0, 3);
  const q = encodeURIComponent(`${role?.name || "Attorney"}${city ? ` in ${city.name}` : ""}`);

  return (
    <div className="cp">
      <PkHero
        eyebrow={`Screened candidate · ${city ? `${city.name}, ${city.state}` : "Open to a move"}`}
        title={c.headline}
        lead={c.why}
        side={
          <div className="pk-form cp-snap">
            <span className="pk-form-k">At a glance</span>
            <p className="cp-pay">
              {fmt.range(c.pay)}
              <small>base expected</small>
            </p>
            <p className="cp-pay-note">
              {pos.where === "in" ? "Within" : pos.where === "below" ? "Below" : "Above"} the {city?.name} market band for this role
            </p>
            <dl className="cp-facts">
              <div>
                <dt>Experience</dt>
                <dd>{c.years} years</dd>
              </div>
              {facts.slice(1).map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
            <a href="#request" className="pk-btn is-primary cp-snap-btn">
              Request full profile
            </a>
          </div>
        }
        trustItems={["Screened by Orion", "Anonymous until both say yes", "No fee unless you hire"]}
      />

      <PkSection
        tone="light"
        id="preview"
        kicker="Profile preview"
        title="What you get in"
        accent="the full profile."
        lead="Names, schools and firms are hidden here and come with the full profile."
      >
        <div className="cp-preview">
          <div className="cp-sheet">
            <ResumeSheet candidateId={c.id} />
          </div>
          <div className="cp-side">
            <div className="cp-card">
              <h3>Practice mix</h3>
              <ul className="cp-mix">
                {c.mix.map(([k, v]) => (
                  <li key={k}>
                    <span>{k}</span>
                    <b>{v}%</b>
                    <i aria-hidden="true">
                      <em style={{ width: `${v}%` }} />
                    </i>
                  </li>
                ))}
              </ul>
            </div>
            <div className="cp-card">
              <h3>Pay against the market</h3>
              <p className="cp-muted">
                {role?.name} base in {city?.name}, by experience. Marker: midpoint of what this candidate expects.
              </p>
              <SalaryBandBar citySlug={c.city} roleSlug={c.role} marker={mid} />
              <p className="cp-muted cp-src">Updated {asOf}.</p>
            </div>
          </div>
        </div>
      </PkSection>

      <PkSection tone="dark" id="request" kicker="Next step" title="Request the" accent="full profile.">
        <div className="cp-request">
          <div className="pk-form cp-form">
            <RequestProfile headline={c.headline} />
          </div>
          <ol className="cp-next">
            <li>
              <span>1</span>
              <div>
                <b>Justin gets your request</b>
                <p>The candidate’s current employer is never contacted.</p>
              </div>
            </li>
            <li>
              <span>2</span>
              <div>
                <b>Full profile in your inbox</b>
                <p>Resume, firm history and Justin’s screening notes, usually within the hour.</p>
              </div>
            </li>
            <li>
              <span>3</span>
              <div>
                <b>Interview if it fits</b>
                <p>Justin sets up the call. Names are shared once both sides agree.</p>
              </div>
            </li>
            <li className="cp-next-terms">
              <PkCheck /> One fee, only if you hire. Invoiced on the start date, Net 15, with a 90-day replacement.
            </li>
          </ol>
        </div>
        <PkTerms items={TERMS} link={{ label: "Fees & terms", href: "/fees" }} />
      </PkSection>

      <PkSection
        tone="light"
        id="similar"
        kicker="Also open to a move"
        title="Similar candidates"
        accent={city ? `in ${city.name}.` : "right now."}
      >
        {similar.length > 0 && (
          <div className="cp-similar">
            {similar.map(({ candidate, notes, warn }) => (
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
        )}
        <div className="cp-call">
          <PkCallCard
            title="Want to talk about"
            accentWords="this candidate?"
            text="Fifteen minutes with Justin about fit, pay and timing. No fee unless you hire."
            secondary={{ label: "See all candidates", href: `/find-candidates?q=${q}` }}
          />
        </div>
      </PkSection>
    </div>
  );
}
