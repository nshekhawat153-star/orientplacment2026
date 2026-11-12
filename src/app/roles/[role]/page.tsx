import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  roles,
  cities,
  expBands,
  bands,
  payModels,
  findRole,
  findBand,
  matchCandidates,
  jobs,
  asOf,
  source,
  fmt,
} from "@/data";
import { Breadcrumb } from "@/components/Breadcrumb";
import { TrustLine } from "@/components/Rating";
import { RolePayTable } from "@/components/PayTables";
import { CandidateCard } from "@/components/CandidateCard";
import { GateForm } from "@/components/GateForm";
import { Mark } from "@/components/Mark";
import { Icon } from "@/components/icons";

interface PageProps {
  params: Promise<{ role: string }>;
}

export async function generateStaticParams() {
  return roles.map((r) => ({
    role: r.slug,
  }));
}

function calculateMedian(arr: number[]): number {
  if (!arr.length) return 0;
  const s = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 !== 0 ? s[mid] : Math.round((s[mid - 1] + s[mid]) / 2);
}

export default async function RolePage({ params }: PageProps) {
  const { role: roleParam } = await params;
  const role = findRole(roleParam);

  if (!role) {
    notFound();
  }

  // Calculate national band
  const cityBands = cities
    .map((c) => findBand(c.slug, role.slug))
    .filter(Boolean) as Array<{
    median: number;
    b1: [number, number];
    b2: [number, number];
    b3: [number, number];
  }>;

  const natMedian = calculateMedian(cityBands.map((b) => b.median));
  const natBands: Record<string, [number, number]> = {};
  expBands.forEach((e) => {
    natBands[e.key] = [
      calculateMedian(cityBands.map((b) => (b as any)[e.key][0])),
      calculateMedian(cityBands.map((b) => (b as any)[e.key][1])),
    ];
  });

  // National band coordinates
  const b1Min = natBands.b1 ? natBands.b1[0] : 80;
  const b3Max = natBands.b3 ? natBands.b3[1] : 200;
  const lo = Math.floor((b1Min * 0.88) / 10) * 10;
  const hi = Math.ceil((b3Max * 1.05) / 10) * 10;
  const span = hi - lo || 1;
  const x = (v: number) => Math.max(0, Math.min(100, ((v - lo) / span) * 100));

  // Candidates for role
  const roleCandidates = matchCandidates({ role: role.slug }).slice(0, 3);
  const models = payModels[role.slug] || payModels["estate-planning-attorney"] || [];
  const openRolesCount = jobs.filter((j) => j.role === role.slug).length;

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Salaries", href: "/salary-check" },
          { label: role.name },
        ]}
      />

      {/* 1. Hero */}
      <section className="phero rh-hero">
        <div className="wrap">
          <div>
            <span className="eyebrow">Role guide · United States</span>
            <h1>{role.name}: salary, hiring and jobs</h1>
            <div className="big-num" id="nat-median">
              <Mark>{fmt.k(natMedian)}</Mark>
            </div>
            <p className="big-num-l">
              median base salary across <Mark>{String(cityBands.length)}</Mark> US cities, all levels
            </p>
            <div className="hero-act">
              <Link
                className="btn btn-primary btn-lg"
                href={`/find-candidates#role=${role.slug}`}
              >
                See {role.short} candidates
              </Link>
              <a className="text-link" href="#kit">
                Email me the hiring kit
              </a>
            </div>
            <TrustLine />
          </div>

          <div className="band-card">
            <h2 className="mini-h">National base salary by years of practice</h2>
            <div id="nat-band" className="band-wrap">
              <div
                className="band"
                role="img"
                aria-label={`${role.name} national base salary by experience`}
              >
                {expBands.map((e) => {
                  const r = natBands[e.key] || [0, 0];
                  const leftPos = x(r[0]);
                  const widthPos = x(r[1]) - x(r[0]);
                  return (
                    <div
                      key={e.key}
                      className={`band-row ${e.key === "b2" ? "active" : ""}`}
                      data-key={e.key}
                    >
                      <span className="lab">
                        {e.label.replace(" years", "")}
                        <span className="lab-long"> years</span>
                        <span className="lab-short"> yrs</span>
                      </span>
                      <div className="track">
                        {[0, 25, 50, 75, 100].map((p) => (
                          <i key={p} className="gl" style={{ left: `${p}%` }} />
                        ))}
                        <span
                          className="range"
                          style={{ left: `${leftPos}%`, width: `${widthPos}%` }}
                        />
                      </div>
                      <span className="val">
                        <Mark>{fmt.range(r)}</Mark>
                      </span>
                    </div>
                  );
                })}
                <div className="band-axis">
                  <span />
                  <div className="ticks">
                    {[0, 25, 50, 75, 100].map((p) => (
                      <span key={p} className={`t${p}`} style={{ left: `${p}%` }}>
                        {fmt.k(lo + (span * p) / 100)}
                      </span>
                    ))}
                  </div>
                  <span />
                </div>
                <div className="lane">
                  <span className="med" style={{ left: `${x(natMedian)}%` }} />
                </div>
              </div>
              <div className="band-key">
                <span className="k-range">Middle half of base salaries</span>
                <span className="k-med">
                  Median <Mark>{fmt.k(natMedian)}</Mark>
                </span>
              </div>
            </div>
            <p className="source">
              Median of the city bands below. Source: {source}. Updated {asOf}. Base only, before bonus.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Pay by city */}
      <section className="block alt" id="pay">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Pay by city</span>
            <h2>What firms pay, city by city</h2>
            <p>
              Base salary by years of practice. Pick a city for its full guide, what moves pay and an offer check.
            </p>
          </div>
          <RolePayTable roleSlug={role.slug} hereCitySlug="houston-tx" />
          <p className="source">
            Source: {source}, {asOf}. Each range is the middle half of base salaries for that level.
          </p>
        </div>
      </section>

      {/* 3. Candidates */}
      <section className="block" id="candidates">
        <div className="wrap">
          <div className="sec-head row">
            <div>
              <span className="eyebrow">Available now</span>
              <h2>{role.name}s open to a move</h2>
              <p>Screened by Jon. Names and firms stay hidden until you ask for the profile.</p>
            </div>
            <Link
              className="more link-arrow hide-sm"
              href={`/find-candidates#role=${role.slug}`}
            >
              Match them to your seat
            </Link>
          </div>
          <div className="cards">
            {roleCandidates.map((r) => (
              <CandidateCard key={r.c.id} candidate={r.c} result={r} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Hiring kit teaser + email gate */}
      <section className="block alt" id="kit">
        <div className="wrap kit-split">
          <div>
            <div className="sec-head">
              <span className="eyebrow">Free hiring kit</span>
              <h2>Run the hire with a ready kit</h2>
              <p>
                Everything to hire {/^[aeiou]/i.test(role.name) ? "an" : "a"} {role.name.toLowerCase()} yourself, written for small and mid-size firms.
              </p>
            </div>

            <div
              className="kitfan"
              role="img"
              aria-label="The hiring kit: posting template, interview questions, scorecard and offer-letter outline"
            >
              <div className="kf kf-0">
                <span className="kf-k">
                  <Icon name="doc" className="ico" /> Part 4
                </span>
                <b>Offer-letter outline</b>
                <i style={{ width: "88%" }} />
                <i style={{ width: "70%" }} />
                <i className="on" style={{ width: "80%" }} />
                <i className="kf-extra" style={{ width: "60%" }} />
              </div>
              <div className="kf kf-1">
                <span className="kf-k">
                  <Icon name="check" className="ico" /> Part 3
                </span>
                <b>Scorecard</b>
                <div className="kf-row">
                  <i style={{ width: "90%" }} />
                  <span>4</span>
                </div>
                <div className="kf-row">
                  <i style={{ width: "76%" }} />
                  <span>5</span>
                </div>
                <div className="kf-row kf-extra">
                  <i style={{ width: "84%" }} />
                  <span>3</span>
                </div>
              </div>
              <div className="kf kf-2">
                <span className="kf-k">
                  <Icon name="list" className="ico" /> Part 2
                </span>
                <b>Interview questions</b>
                <i style={{ width: "92%" }} />
                <i className="on" style={{ width: "66%" }} />
                <i style={{ width: "84%" }} />
                <i className="kf-extra" style={{ width: "72%" }} />
              </div>
              <div className="kf kf-3">
                <span className="kf-k">
                  <Icon name="brief" className="ico" /> Part 1
                </span>
                <b>Job posting</b>
                <i style={{ width: "80%" }} />
                <i className="on" style={{ width: "94%" }} />
                <i style={{ width: "86%" }} />
                <i className="on" style={{ width: "62%" }} />
                <i className="kf-extra" style={{ width: "78%" }} />
                <i className="kf-extra" style={{ width: "58%" }} />
              </div>
            </div>

            <p className="sec-foot">
              <Link className="link-arrow" href={`/hiring-kit/${role.slug}#tab=posting`}>
                Copy the posting now
              </Link>
              <Link className="link-arrow" href={`/hiring-kit/${role.slug}#tab=questions`}>
                See the interview questions
              </Link>
            </p>
          </div>

          <div id="kit-gate">
            <GateForm
              eyebrow="Free PDF and Word"
              title="Email me the hiring kit"
              bullets={[
                "Job posting template you can edit",
                "Interview questions with good answers",
                "Weighted scorecard and offer-letter outline",
              ]}
              button="Email me the kit"
              preset="kit"
              role={role.slug}
              city="houston-tx"
              reviewSlug="daffner-law"
              fine="One email with the kit. No list, and no call unless you ask for one."
            />
          </div>
        </div>
      </section>

      {/* 5. How firms pay this role */}
      <section className="block" id="models">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Pay models</span>
            <h2>How firms pay this role</h2>
            <p>
              The three models we see most at small and mid-size firms. Each one can be combined with the others.
            </p>
          </div>
          <div className="levers" id="models-cards">
            {models.map((p, i) => (
              <div key={i} className="lever">
                <span className="tt-k">Model {i + 1}</span>
                <b>{p.name}</b>
                <p>{p.how}</p>
                <p className="lv-t">
                  <b>Fits</b>
                  {p.fits}
                </p>
                <p className="lv-t">
                  <b>Typical terms</b>
                  <Mark>{p.typical}</Mark>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. For candidates */}
      <section className="block flush">
        <div className="wrap">
          <div className="cand-band">
            <div>
              <span className="eyebrow">{role.name} yourself?</span>
              <h2>Confidential roles with the pay shown</h2>
              <ul className="ticks">
                <li>
                  <Mark>{openRolesCount}</Mark> open {openRolesCount === 1 ? "role" : "roles"}
                </li>
                <li>
                  <Link href="/salary-check">Check your salary</Link>
                </li>
                <li>
                  <Link href="/upload-resume">Upload your resume</Link>
                </li>
              </ul>
            </div>
            <Link
              className="btn btn-ghost"
              href={`/jobs/${role.slug}/houston-tx`}
            >
              See open roles
            </Link>
          </div>
        </div>
      </section>

      {/* 7. FAQ */}
      <section className="block alt">
        <div className="wrap split">
          <div className="sec-head">
            <span className="eyebrow">Questions</span>
            <h2>{role.name} pay</h2>
            <p>
              City detail is in each{" "}
              <Link href={`/salaries/${role.slug}/houston-tx`}>
                salary guide
              </Link>.
            </p>
          </div>
          <div className="faq">
            <details>
              <summary>How much does an {role.short} make?</summary>
              <p>
                Across the cities we track, the median base is about <Mark>{fmt.k(natMedian)}</Mark>.
              </p>
            </details>
            <details>
              <summary>What does an {role.short} do at a small firm?</summary>
              <p>
                Meets clients, designs the plan, drafts legal documents, and runs matters end to end, often with paralegal support.
              </p>
            </details>
            <details>
              <summary>What raises an {role.short}'s pay most?</summary>
              <p>
                A portable book of existing clients, specialized practice experience, and leading client intake directly.
              </p>
            </details>
            <details>
              <summary>Do {role.short}s get a bonus?</summary>
              <p>
                Often. Small firms pay a bonus on collections above a threshold, or a share of origination fees on clients brought in.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* 8. CTA band */}
      <div className="wrap">
        <div className="cta-band">
          <div className="wrap row">
            <div>
              <h2>See {role.short} candidates for your seat</h2>
              <p>Screened candidates ready to interview. One fee only if you hire.</p>
            </div>
            <Link
              className="btn btn-primary btn-lg"
              href={`/find-candidates#role=${role.slug}`}
            >
              See {role.short} candidates
            </Link>
          </div>
        </div>
      </div>

      <div className="mbar">
        <Link
          className="btn btn-primary"
          href={`/find-candidates#role=${role.slug}`}
          id="mbar-cta"
        >
          See {role.short} candidates
        </Link>
      </div>
    </>
  );
}
