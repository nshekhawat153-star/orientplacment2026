import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "./role.css";
import { roles, cities, expBands, payModels, findRole, findBand, jobs, asOf, fmt } from "@/data";
import { matchEnrichedCandidates } from "@/app/find-candidates/candidateData";
import { CandidateDossierCard } from "@/components/CandidateDossierCard";
import { PkHero, PkSection, PkCallCard, PkArrow } from "@/components/PageKit";

interface PageProps {
  params: Promise<{ role: string }>;
}

export async function generateStaticParams() {
  return roles.map((r) => ({ role: r.slug }));
}

function median(arr: number[]): number {
  if (!arr.length) return 0;
  const s = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 !== 0 ? s[mid] : Math.round((s[mid - 1] + s[mid]) / 2);
}

function national(roleSlug: string) {
  const list = cities.map((c) => findBand(c.slug, roleSlug)).filter(Boolean) as Array<{
    median: number;
    b1: [number, number];
    b2: [number, number];
    b3: [number, number];
  }>;
  const nat: Record<string, [number, number]> = {};
  expBands.forEach((e) => {
    const k = e.key as "b1" | "b2" | "b3";
    nat[k] = [median(list.map((b) => b[k][0])), median(list.map((b) => b[k][1]))];
  });
  return { med: median(list.map((b) => b.median)), nat };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { role: slug } = await params;
  const role = findRole(slug);
  if (!role) return {};
  const { med } = national(role.slug);
  return {
    title: `${role.name}: Salary, Hiring and Jobs | Orion Placement`,
    description: `${role.name} base salary by city and experience (national median $${med}k), how firms structure pay, and screened candidates open to a move.`,
    alternates: { canonical: `https://www.orionplacement.com/roles/${role.slug}` },
  };
}

export default async function RolePage({ params }: PageProps) {
  const { role: roleParam } = await params;
  const role = findRole(roleParam);
  if (!role) notFound();

  const { med, nat } = national(role.slug);
  const models = payModels[role.slug] || payModels["estate-planning-attorney"] || [];
  const metros = cities
    .map((c) => ({ c, b: findBand(c.slug, role.slug) }))
    .filter((m) => m.b) as Array<{ c: (typeof cities)[number]; b: NonNullable<ReturnType<typeof findBand>> }>;
  const candidates = matchEnrichedCandidates({ role: role.slug, city: "any", years: "any", mode: "any", pay: null }).slice(0, 3);
  const openSeats = jobs.filter((j) => j.role === role.slug).length;
  const plural = `${role.name.toLowerCase()}s`;

  return (
    <div className="rl">
      <PkHero
        eyebrow={`Role guide · ${role.name}`}
        title={role.name}
        accent="salary, hiring and jobs."
        lead={`What ${plural} earn across ${metros.length} US markets, how firms structure their pay, and who is open to a move right now.`}
        side={
          <div className="rl-hero-card">
            <span className="rl-k">National median base</span>
            <p className="rl-median">{fmt.k(med)}</p>
            <ul>
              {expBands.map((e) => (
                <li key={e.key}>
                  <span>{e.label}</span>
                  <b>{fmt.range(nat[e.key])}</b>
                </li>
              ))}
            </ul>
            <div className="rl-hero-actions">
              <Link href={`/find-candidates?q=${encodeURIComponent(role.name)}`} className="pk-btn is-primary">
                See candidates <PkArrow />
              </Link>
              {openSeats > 0 && (
                <Link href={`/jobs?q=${encodeURIComponent(role.short || role.name)}`} className="rl-hero-link">
                  {openSeats} open {openSeats === 1 ? "seat" : "seats"} →
                </Link>
              )}
            </div>
          </div>
        }
      />

      <PkSection
        tone="light"
        id="metros"
        kicker="By city"
        title={`${role.name} pay,`}
        accent="market by market."
        lead={`Middle half of base salaries by years of experience. Updated ${asOf}. Open a city for the full guide and an offer check.`}
      >
        <div className="rl-table">
          <div className="rl-tr rl-th">
            <span>City</span>
            <span>1–3 years</span>
            <span>4–7 years</span>
            <span>8+ years</span>
            <span>Median</span>
          </div>
          {metros.map(({ c, b }) => (
            <Link key={c.slug} href={`/salaries/${role.slug}/${c.slug}`} className="rl-tr">
              <span className="rl-city">
                {c.name}, {c.state}
              </span>
              <span data-l="1–3 yrs">{fmt.range(b.b1)}</span>
              <span data-l="4–7 yrs">{fmt.range(b.b2)}</span>
              <span data-l="8+ yrs">{fmt.range(b.b3)}</span>
              <b>{fmt.k(b.median)}</b>
            </Link>
          ))}
        </div>
      </PkSection>

      {models.length > 0 && (
        <PkSection
          tone="dark"
          kicker="Pay structure"
          title="How firms structure"
          accent="pay for this role."
          lead="The three models small and mid-size firms use most."
        >
          <div className="rl-models">
            {models.map((m, i) => (
              <div key={m.name} className="rl-model">
                <span className="rl-model-n">{String(i + 1).padStart(2, "0")}</span>
                <h3>{m.name}</h3>
                <p>{m.how}</p>
                <dl>
                  <div>
                    <dt>Best for</dt>
                    <dd>{m.fits}</dd>
                  </div>
                  <div>
                    <dt>Typical terms</dt>
                    <dd>{m.typical}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </PkSection>
      )}

      <PkSection
        tone="light"
        kicker="Open to a move"
        title={`${role.name}s`}
        accent="you can meet now."
        lead="Screened, anonymous profiles. Names unlock when you request the profile."
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
                action={{ href: `/find-candidates?q=${encodeURIComponent(role.name)}&c=${candidate.id}` }}
              />
            ))}
          </div>
        ) : (
          <p className="pk-sec-lead">Justin sources this role on request. Send the seat and he’ll come back within a business day.</p>
        )}
        <div className="rl-cand-foot">
          <Link href={`/find-candidates?q=${encodeURIComponent(role.name)}`} className="pk-btn is-dark">
            See all {role.name.toLowerCase()} candidates
          </Link>
          <Link href={`/hiring-kit/${role.slug}`} className="rl-kit">
            Hiring kit: job post, interview questions, scorecard →
          </Link>
        </div>

        <div className="rl-call">
          <PkCallCard
            title={`Hiring ${a(role.name)} ${role.name.toLowerCase()}?`}
            accentWords="Send it to Justin."
            text="Free to post, non-exclusive, and no fee unless you hire."
            secondary={{ label: "Submit a job", href: "/submit-job" }}
          />
        </div>
      </PkSection>
    </div>
  );
}

function a(word: string) {
  return /^[aeiou]/i.test(word) ? "an" : "a";
}
