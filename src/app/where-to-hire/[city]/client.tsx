"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DATA, matchCandidates } from "@/data";
import { Mark } from "@/components/Mark";
import { TrustLine } from "@/components/Rating";
import { CandidateCard } from "@/components/CandidateCard";
import { GateForm } from "@/components/GateForm";
import { CtaBand } from "@/components/CtaBand";

export default function WhereToHireClient({ cityParam }: { cityParam: string }) {
  const city = DATA.cities.find((c) => c.slug === cityParam);

  const [kindFilter, setKindFilter] = useState<string>("all");

  if (!city) {
    notFound();
  }

  const places = (DATA.placesToHire[city.slug] || []).concat(DATA.placesToHireExtra[city.slug] || []);
  const lateralSources = DATA.lateralSources[city.slug] || [];

  const candidateIds = ["EP-TX-0476", "EP-TX-0388", "PL-TX-0640"];
  const candidates = candidateIds.map((id) => DATA.candidates.find((c) => c.id === id)).filter(Boolean);

  const screenedCount = matchCandidates({ city: city.slug }).filter((r) => r.inCity).length;

  const nLawSchools = places.filter((p) => p.kind === "Law school").length;
  const nParalegal = places.filter((p) => p.kind === "Paralegal programme").length;
  const nAssoc = places.filter((p) => /association/i.test(p.kind)).length;

  const filteredPlaces = places.filter((p) => {
    if (kindFilter === "all") return true;
    if (kindFilter === "assoc") return /association/i.test(p.kind);
    return p.kind === kindFilter;
  });

  return (
    <>
      {/* 1. Hero */}
      <section className="phero wth-hero">
        <div className="wrap">
          <div>
            <span className="eyebrow">
              Hiring guide · {city.name}, {city.state}
            </span>
            <h1>Where to hire attorneys and paralegals in {city.name}</h1>
            <p className="lede">
              The law schools, paralegal programmes and bar groups {city.name} firms hire from, who to contact and when. Or meet experienced people open to a move now.
            </p>
            <div className="hero-act">
              <Link className="btn btn-primary btn-lg" href={`/find-candidates#city=${city.slug}`}>
                See {city.name} candidates
              </Link>
              <a className="text-link" href="#kit">
                Email me the hiring kit
              </a>
            </div>
            <TrustLine />
          </div>

          <div className="snapshot" id="glance">
            <div className="snap-h">
              <span className="eyebrow">{city.name} at a glance</span>
              <span className="small muted">
                <Mark>{DATA.asOf}</Mark>
              </span>
            </div>
            <div className="snap-grid">
              <div>
                <b>{nLawSchools}</b>
                <span>law schools with career offices</span>
              </div>
              <div>
                <b>{nParalegal}</b>
                <span>paralegal programmes</span>
              </div>
              <div>
                <b>{nAssoc}</b>
                <span>bar and professional groups</span>
              </div>
              <div>
                <b>
                  <Mark>{screenedCount}</Mark>
                </b>
                <span>candidates open to a move now</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Source table */}
      <section className="block alt" id="sources">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Sources</span>
            <h2>Who to contact, and when they hire</h2>
            <p>Filter by type. Every row says who to reach and the months that matter.</p>
          </div>

          <div className="filter-row" role="group" aria-label="Show">
            <span className="door-label">Show</span>
            <div className="chips" id="kind">
              <button
                type="button"
                className={`chip${kindFilter === "all" ? " active" : ""}`}
                aria-pressed={kindFilter === "all"}
                onClick={() => setKindFilter("all")}
              >
                All sources
              </button>
              <button
                type="button"
                className={`chip${kindFilter === "Law school" ? " active" : ""}`}
                aria-pressed={kindFilter === "Law school"}
                onClick={() => setKindFilter("Law school")}
              >
                Law schools
              </button>
              <button
                type="button"
                className={`chip${kindFilter === "Paralegal programme" ? " active" : ""}`}
                aria-pressed={kindFilter === "Paralegal programme"}
                onClick={() => setKindFilter("Paralegal programme")}
              >
                Paralegal programmes
              </button>
              <button
                type="button"
                className={`chip${kindFilter === "assoc" ? " active" : ""}`}
                aria-pressed={kindFilter === "assoc"}
                onClick={() => setKindFilter("assoc")}
              >
                Bar and associations
              </button>
            </div>
          </div>

          <div className="table-wrap">
            <table className="data stack-sm">
              <caption className="sr">Where {city.name} firms hire attorneys and paralegals</caption>
              <thead>
                <tr>
                  <th scope="col">Source</th>
                  <th scope="col">Type</th>
                  <th scope="col">Who to contact</th>
                  <th scope="col">When they hire</th>
                </tr>
              </thead>
              <tbody id="hire-rows">
                {filteredPlaces.map((p, i) => (
                  <tr key={i} data-kind={p.kind}>
                    <td data-label="Source">
                      <b>{p.name}</b>
                    </td>
                    <td data-label="Type">{p.kind}</td>
                    <td data-label="Who to contact">
                      <Mark>{p.contact}</Mark>
                    </td>
                    <td data-label="When they hire">
                      <Mark>{p.cycle}</Mark>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="source">
            Contacts and timing: <Mark>{DATA.source}</Mark>, <Mark>{DATA.asOf}</Mark>. Confirm dates with each office.
          </p>
        </div>
      </section>

      {/* 3. When to reach out */}
      <section className="block" id="when">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Timing</span>
            <h2>When to reach out</h2>
            <p>Schools and programmes hire on a calendar. Experienced attorneys move all year.</p>
          </div>
          <ol className="steps-line">
            <li>
              <span className="when">
                <span className="mark">January to February</span>
              </span>
              <h3>Clerk postings</h3>
              <p>Law schools post spring and summer clerk roles. Get your posting in early.</p>
            </li>
            <li>
              <span className="when">
                <span className="mark">May and December</span>
              </span>
              <h3>Paralegal graduates</h3>
              <p>Programmes graduate. Contact coordinators a month before.</p>
            </li>
            <li>
              <span className="when">
                <span className="mark">August</span>
              </span>
              <h3>On-campus interviews</h3>
              <p>For next year&apos;s associates at the three {city.name} law schools.</p>
            </li>
            <li>
              <span className="when">Any time</span>
              <h3>Experienced attorneys</h3>
              <p>
                They move all year. Most give <span className="mark">2 to 6 weeks&apos;</span> notice.
              </p>
            </li>
          </ol>
        </div>
      </section>

      {/* 4. Where lateral hires come from */}
      <section className="block alt" id="lateral">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Lateral hires</span>
            <h2>Where lateral hires come from</h2>
            <p>
              Where the attorneys we place at small and mid-size {city.name} firms were working before. Share of placements.
            </p>
          </div>
          <div className="lat-split">
            <div>
              <ul className="hbars" id="lat">
                {lateralSources.map((s: [string, number], idx: number) => (
                  <li key={idx}>
                    <span>{s[0]}</span>
                    <span className="bar" aria-hidden="true">
                      <i style={{ width: `${s[1]}%` }} />
                    </span>
                    <span className="v">
                      <Mark>{s[1]}%</Mark>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="source">
                Source: <Mark>{DATA.source}</Mark>, <Mark>{DATA.asOf}</Mark>.
              </p>
            </div>
            {lateralSources.length > 0 && (
              <div className="lat-fig">
                <span className="mini-h">Most come from</span>
                <div className="big-num">
                  <Mark>{lateralSources[0][1]}%</Mark>
                </div>
                <p className="big-num-l">of lateral hires came from {lateralSources[0][0].toLowerCase()}.</p>
                <p className="sec-foot">
                  <Link className="link-arrow" href={`/find-candidates#city=${city.slug}`}>
                    See who is open to a move
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. Candidates band */}
      <section className="block" id="candidates">
        <div className="wrap">
          <div className="sec-head row">
            <div>
              <span className="eyebrow">Available now</span>
              <h2>{city.name} candidates open to a move</h2>
              <p>Experienced hires screened by Jon. Names and firms stay hidden until you ask for the profile.</p>
            </div>
            <Link className="more link-arrow hide-sm" href="/submit-job">
              Or paste your posting
            </Link>
          </div>
          <div className="cand-grid">
            {candidates.map(
              (candidate) =>
                candidate && <CandidateCard key={candidate.id} candidate={candidate} />
            )}
          </div>
          <div className="sec-foot">
            <Link className="btn btn-primary" href={`/find-candidates#city=${city.slug}`}>
              See {city.name} candidates
            </Link>
            <span className="small muted">No retainer, and no fee unless you hire.</span>
          </div>
        </div>
      </section>

      {/* 6. Hiring kit gate */}
      <section className="block alt" id="kit">
        <div className="wrap kit-split">
          <div>
            <div className="sec-head">
              <span className="eyebrow">Free PDF and Word</span>
              <h2>Hiring on your own? Take the kit</h2>
              <p>Send the same posting to every school and bar group, and score every interview the same way.</p>
            </div>
            <ul className="ticks">
              <li>Job posting template you can edit</li>
              <li>Interview questions with good answers</li>
              <li>Weighted scorecard and offer-letter outline</li>
            </ul>
            <p className="sec-foot">
              <Link className="link-arrow" href={`/where-to-post/${city.slug}`}>
                Compare places to post in {city.name}
              </Link>
            </p>
          </div>
          <div id="kit-gate">
            <GateForm
              eyebrow="Free kit"
              title="Email me the hiring kit"
              button="Email me the kit"
              preset="kit"
              role="estate-planning-attorney"
              city={city.slug}
              review="brett-zimmerman"
              fine="One email with the kit. No list, and no call unless you ask for one."
            />
          </div>
        </div>
      </section>

      {/* 7. FAQ */}
      <section className="block">
        <div className="wrap split">
          <div className="sec-head">
            <span className="eyebrow">Questions</span>
            <h2>Hiring in {city.name}</h2>
            <p>
              Ready to post? Compare <Link href={`/where-to-post/${city.slug}`}>places to post in {city.name}</Link>.
            </p>
          </div>
          <div className="faq">
            <details>
              <summary>Which law schools are in {city.name}?</summary>
              <p>
                Three: the University of Houston Law Center, South Texas College of Law Houston and Thurgood Marshall School of Law at Texas Southern University. Each has a career office that takes postings from firms.
              </p>
            </details>
            <details>
              <summary>Can a small firm recruit at {city.name} law schools?</summary>
              <p>Yes. Career offices take postings from firms of any size, for clerks, summer associates and graduates.</p>
            </details>
            <details>
              <summary>Where do experienced estate planning attorneys come from?</summary>
              <p>
                Mostly from other small firms. In our sample, <span className="mark">46%</span> of lateral hires came from other small firms.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* 8. CTA band */}
      <CtaBand
        title="Skip the hiring calendar"
        text={`Experienced ${city.name} attorneys and paralegals open to a move now. No retainer, and no fee unless you hire.`}
        button={`See ${city.name} candidates`}
        href={`/find-candidates#city=${city.slug}`}
      />

      <div className="mbar">
        <Link className="btn btn-primary" href={`/find-candidates#city=${city.slug}`}>
          See {city.name} candidates
        </Link>
      </div>
    </>
  );
}
