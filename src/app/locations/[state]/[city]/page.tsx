import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "@/app/roles/[role]/role.css";
import { cities, findCity, roles, jobs, bands, trust, asOf, fmt } from "@/data";
import { matchEnrichedCandidates } from "@/app/find-candidates/candidateData";
import { CandidateDossierCard } from "@/components/CandidateDossierCard";
import { PkHero, PkSection, PkSteps, PkTerms, PkCards, PkCallCard, PkStats } from "@/components/PageKit";

interface PageProps {
  params: Promise<{ state: string; city: string }>;
}

export async function generateStaticParams() {
  return cities.map((c) => ({
    state: c.stateName.toLowerCase().replace(/\s+/g, "-"),
    city: c.name.toLowerCase().replace(/\s+/g, "-"),
  }));
}

function resolveCity(stateParam: string, cityParam: string) {
  return (
    cities.find(
      (c) =>
        c.name.toLowerCase().replace(/\s+/g, "-") === cityParam.toLowerCase() ||
        c.slug === `${cityParam.toLowerCase()}-${stateParam.slice(0, 2).toLowerCase()}`
    ) || findCity("houston-tx")
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state, city: cityParam } = await params;
  const city = resolveCity(state, cityParam);
  if (!city) return {};
  return {
    title: `Legal Recruiters in ${city.name}, ${city.state} | Orion Placement`,
    description: `Lateral attorney and paralegal placements for boutique and mid-size firms in ${city.name}. Screened candidates, local pay data, and one fee only if you hire.`,
    alternates: {
      canonical: `https://www.orionplacement.com/locations/${state}/${cityParam}`,
    },
  };
}

const STEPS = [
  { t: "Tell us the seat", d: "Role, years, pay and must-haves. Two minutes online or fifteen with Justin.", tag: "Day 0" },
  { t: "See the shortlist", d: "Screened candidates with pay, bar standing and notice period. You pick who to meet.", tag: "Days 1–5" },
  { t: "Hire, then pay", d: "One contingency fee, invoiced on the start date and due in 15 days.", tag: "Start date" },
];

const TERMS = [
  { k: "$0", v: "Upfront or retainer" },
  { k: "Non-exclusive", v: "Keep your other recruiters" },
  { k: "90 days", v: "Free replacement" },
  { k: "Net 15", v: "Invoiced on start date" },
];

export default async function CityLocationPage({ params }: PageProps) {
  const { state: stateParam, city: cityParam } = await params;
  const city = resolveCity(stateParam, cityParam);
  if (!city) notFound();

  const candidates = matchEnrichedCandidates({ role: null, city: city.slug, years: "any", mode: "any", pay: null }).slice(0, 3);
  const cityJobs = jobs.filter((j) => j.city === city.slug).length;
  const cityBands = bands[city.slug] || {};
  const rows = roles.filter((r) => cityBands[r.slug]).map((r) => ({ r, b: cityBands[r.slug] }));

  const tools = [
    {
      meta: "Job boards",
      title: `Where to post in ${city.name}`,
      text: "Legal boards compared on cost, reach and time to first applicant.",
      href: `/where-to-post/${city.slug}`,
    },
    {
      meta: "Talent sources",
      title: `Where ${city.name} hires come from`,
      text: "The firms, courts and programmes your next hire is likely to come from.",
      href: `/where-to-hire/${city.slug}`,
    },
    {
      meta: "Interview kit",
      title: "Hiring kits",
      text: "Job post template, interview questions and a scorecard for each role.",
      href: "/hiring-kit/estate-planning-attorney",
    },
  ];

  return (
    <div className="rl">
      <PkHero
        eyebrow={`Legal recruiting · ${city.name}, ${city.state}`}
        title="Legal recruiters in"
        accent={`${city.name}.`}
        lead={`Lateral attorneys and paralegals for boutique and mid-size firms in ${city.name}. Screened profiles, local pay data, and one fee only if you hire.`}
        primary={{ label: `See ${city.name} candidates`, href: `/find-candidates?q=${encodeURIComponent(`Attorney in ${city.name}`)}` }}
        secondary={{ label: "Book 15 min with Justin", href: trust.calendly }}
      >
        <PkStats
          items={[
            { v: trust.rating, k: `On Google, ${trust.reviews} reviews` },
            { v: String(cityJobs), k: `Open seats in ${city.name}` },
            { v: String(rows.length), k: "Roles with local pay data" },
            { v: "90 days", k: "Replacement guarantee" },
          ]}
        />
      </PkHero>

      <PkSection
        tone="light"
        id="candidates"
        kicker={`Open in ${city.name}`}
        title="Candidates open to a"
        accent={`${city.name} seat.`}
        lead="Screened and anonymous. Names unlock when you request the profile."
      >
        {candidates.length > 0 ? (
          <div className="rl-cands">
            {candidates.map(({ candidate, notes, warn }) => (
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
        ) : (
          <p className="pk-sec-lead">Justin sources {city.name} seats on request. Send the seat and he’ll come back within a business day.</p>
        )}
        <div className="rl-cand-foot">
          <Link href="/submit-job" className="pk-btn is-dark">
            Send a {city.name} seat
          </Link>
          {cityJobs > 0 && (
            <Link href={`/jobs?l=${encodeURIComponent(city.name)}`} className="rl-kit">
              Looking for a role? {cityJobs} open {city.name} seats →
            </Link>
          )}
        </div>
      </PkSection>

      <PkSection
        tone="dark"
        id="pay"
        kicker="Local pay"
        title="What firms pay"
        accent={`in ${city.name}.`}
        lead={`Middle half of base salaries by practice area. Updated ${asOf}. Open a role for the full guide.`}
      >
        <div className="rl-table">
          <div className="rl-tr rl-th">
            <span>Role</span>
            <span>1–3 years</span>
            <span>4–7 years</span>
            <span>8+ years</span>
            <span>Median</span>
          </div>
          {rows.map(({ r, b }) => (
            <Link key={r.slug} href={`/salaries/${r.slug}/${city.slug}`} className="rl-tr">
              <span className="rl-city">{r.name}</span>
              <span data-l="1–3 yrs">{fmt.range(b.b1)}</span>
              <span data-l="4–7 yrs">{fmt.range(b.b2)}</span>
              <span data-l="8+ yrs">{fmt.range(b.b3)}</span>
              <b>{fmt.k(b.median)}</b>
            </Link>
          ))}
        </div>
      </PkSection>

      <PkSection tone="light" id="how-it-works" kicker="How it works" title="From open seat to shortlist" accent="in days.">
        <PkSteps steps={STEPS} />
        <PkTerms items={TERMS} link={{ label: "Fees & terms", href: "/fees" }} />

        <div className="lc-tools">
          <h3>Hiring in {city.name} on your own?</h3>
          <PkCards items={tools} />
        </div>

        <div className="rl-call">
          <PkCallCard
            title="Hire attorneys and paralegals"
            accentWords={`in ${city.name}.`}
            text="Fifteen minutes with Justin about the seat, the pay and who is realistic. No fee unless you hire."
            secondary={{ label: "Submit a job", href: "/submit-job" }}
          />
        </div>
      </PkSection>
    </div>
  );
}
