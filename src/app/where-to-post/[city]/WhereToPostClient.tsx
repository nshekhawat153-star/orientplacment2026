"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DATA, fmt, matchCandidates } from "@/data";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Mark } from "@/components/Mark";
import { TrustLine } from "@/components/Rating";
import { ShortlistDeck } from "@/components/ShortlistDeck";
import { CandidateCard } from "@/components/CandidateCard";
import { GateForm } from "@/components/GateForm";
import { CtaBand } from "@/components/CtaBand";

export function WhereToPostClient({
  cityParam
}: {
  cityParam: string;
}) {
  const city = DATA.cities.find(c => c.slug === cityParam);

  const [seatFilter, setSeatFilter] = useState<string>("all");

  if (!city) {
    notFound();
  }

  const places = DATA.placesToPost[city.slug] || [];
  const fitMap = DATA.placesToPostFit[city.slug] || [];

  const candidateIds = ["EP-TX-0412", "LIT-TX-0390", "PL-TX-0611"];
  const candidates = candidateIds.map(id => DATA.candidates.find(c => c.id === id)).filter(Boolean);

  const screenedCount = matchCandidates({ city: city.slug }).filter(r => r.inCity).length;
  const bands = DATA.bands[city.slug] || {};

  const rolesToShow = [
    "estate-planning-attorney",
    "litigation-attorney",
    "estate-planning-paralegal",
    "legal-assistant"
  ];

  return (
    <>
      <Breadcrumb
        crumbs={[
          { label: "Home", href: "/" },
          { label: city.name, href: `/locations/texas/${city.slug === "houston-tx" ? "houston" : city.slug}` },
          { label: "Where to post", current: true }
        ]}
      />

      {/* 1. Hero */}
      <section className="phero wtp-hero">
        <div className="wrap">
          <div>
            <span className="eyebrow">Hiring guide · {city.name}, {city.state}</span>
            <h1>Where to post a legal job in {city.name}</h1>
            <p className="lede">Six places to post, compared on cost, who sees it and how soon the first applicant arrives. Or see {city.name} candidates before you pay to post.</p>
            <div className="hero-act">
              <Link className="btn btn-primary btn-lg" href={`/find-candidates#city=${city.slug}`}>See {city.name} candidates</Link>
              <a className="text-link" href="#checklist">Email me the hiring kit</a>
            </div>
            <TrustLine />
          </div>
          <ShortlistDeck candidateIds={["EP-TX-0412", "EP-TX-0388", "EP-TX-0451"]} />
        </div>
      </section>

      {/* 2. Comparison table */}
      <section className="block alt" id="compare">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Compare</span>
            <h2>Six places to post, side by side</h2>
            <p>Pick the seat and the best fits light up.</p>
          </div>

          <div className="filter-row" role="group" aria-label="Hiring for">
            <span className="door-label">Hiring a</span>
            <div className="chips" id="kind">
              <button
                type="button"
                className={`chip${seatFilter === "all" ? " active" : ""}`}
                aria-pressed={seatFilter === "all"}
                onClick={() => setSeatFilter("all")}
              >
                Any seat
              </button>
              <button
                type="button"
                className={`chip${seatFilter === "attorney" ? " active" : ""}`}
                aria-pressed={seatFilter === "attorney"}
                onClick={() => setSeatFilter("attorney")}
              >
                Attorney
              </button>
              <button
                type="button"
                className={`chip${seatFilter === "paralegal" ? " active" : ""}`}
                aria-pressed={seatFilter === "paralegal"}
                onClick={() => setSeatFilter("paralegal")}
              >
                Paralegal
              </button>
              <button
                type="button"
                className={`chip${seatFilter === "staff" ? " active" : ""}`}
                aria-pressed={seatFilter === "staff"}
                onClick={() => setSeatFilter("staff")}
              >
                Legal assistant
              </button>
              <button
                type="button"
                className={`chip${seatFilter === "clerk" ? " active" : ""}`}
                aria-pressed={seatFilter === "clerk"}
                onClick={() => setSeatFilter("clerk")}
              >
                Law clerk
              </button>
            </div>
          </div>

          <div className="table-wrap">
            <table className="data stack-sm" id="post-table">
              <caption className="sr">Places to post a legal job in {city.name}</caption>
              <thead>
                <tr>
                  <th scope="col">Where</th>
                  <th scope="col">Cost</th>
                  <th scope="col">Who sees it</th>
                  <th scope="col">First applicant</th>
                  <th scope="col">Best for</th>
                </tr>
              </thead>
              <tbody id="post-rows">
                {places.map((p, i) => {
                  const fit = fitMap[i] || [];
                  const isHit = seatFilter !== "all" && fit.includes(seatFilter);
                  const isDim = seatFilter !== "all" && !isHit;
                  const rowClass = `${isHit ? "here" : ""} ${isDim ? "dim" : ""}`.trim();

                  return (
                    <tr key={i} className={rowClass} data-i={i}>
                      <td data-label="Where"><b>{p.name}</b></td>
                      <td data-label="Cost"><Mark>{p.cost}</Mark></td>
                      <td data-label="Who sees it"><Mark>{p.reach}</Mark></td>
                      <td data-label="First applicant"><Mark>{p.firstApplicant}</Mark></td>
                      <td data-label="Best for"><Mark>{p.bestFor}</Mark></td>
                    </tr>
                  );
                })}
                <tr className="orion">
                  <td data-label="Where"><b>Orion Placement</b></td>
                  <td data-label="Cost">No fee unless you hire</td>
                  <td data-label="Who sees it">
                    <Mark>{screenedCount} screened {city.name} candidate{screenedCount === 1 ? "" : "s"}</Mark> open to a move
                  </td>
                  <td data-label="First applicant">Profiles today</td>
                  <td data-label="Best for">
                    Any seat. <Link href={`/find-candidates#city=${city.slug}`}>See them</Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="source">Prices and times: <Mark>{DATA.source}</Mark>, <Mark>{DATA.asOf}</Mark>. Check each board&apos;s current rates before you buy.</p>
        </div>
      </section>

      {/* 3. Before you pay to post */}
      <section className="block" id="candidates">
        <div className="wrap">
          <div className="sec-head row">
            <div>
              <span className="eyebrow">Before you pay to post</span>
              <h2>{city.name} candidates already looking</h2>
              <p>Screened by Jon and free to see. Names and firms stay hidden until you ask for the profile.</p>
            </div>
            <Link className="more link-arrow hide-sm" href="/submit-job">Or paste your posting</Link>
          </div>
          <div className="cand-grid">
            {candidates.map(candidate => candidate && (
              <CandidateCard key={candidate.id} candidate={candidate} />
            ))}
          </div>
          <div className="sec-foot">
            <Link className="btn btn-primary" href={`/find-candidates#city=${city.slug}`}>See {city.name} candidates</Link>
            <span className="small muted">No fee unless you hire. Keep your posting live too.</span>
          </div>
        </div>
      </section>

      {/* 4. Posting checklist */}
      <section className="block alt" id="checklist">
        <div className="wrap check-split">
          <div>
            <div className="sec-head">
              <span className="eyebrow">Before you post</span>
              <h2>Six things every posting needs</h2>
              <p>Postings with these get more replies from experienced people.</p>
            </div>
            <ul className="ticks">
              <li>Put the base salary range in the posting.</li>
              <li>Say whether the seat is on-site or hybrid, and which part of {city.name}.</li>
              <li>Name the practice mix in plain words: wills and trusts, probate, administration.</li>
              <li>State the licence you need. For attorneys, that is Texas.</li>
              <li>Say who they report to and what paralegal support they get.</li>
              <li>Say how and when you reply to applicants.</li>
            </ul>
            <p className="sec-foot">
              <Link className="link-arrow" href="/hiring-kit/estate-planning-attorney#tab=posting">Start from our posting template</Link>
            </p>
          </div>
          <div id="kit-gate">
            <GateForm
              eyebrow="Free PDF and Word"
              title="Email me the hiring kit"
              bullets={[
                "A posting template with all six of these in it",
                "Interview questions and a weighted scorecard",
                "Offer-letter outline and pay models"
              ]}
              button="Email me the kit"
              preset="kit"
              role="estate-planning-attorney"
              city={city.slug}
              review="daffner-law"
              fine="One email with the kit. No list, and no call unless you ask for one."
            />
          </div>
        </div>
      </section>

      {/* 5. What Houston firms pay */}
      <section className="block pay-links" id="pay">
        <div className="wrap">
          <div className="sec-head row">
            <div>
              <span className="eyebrow">Pay</span>
              <h2>Check your range before it goes live</h2>
              <p>Median base salary in {city.name}. Pick a role for its band by years of practice.</p>
            </div>
            <Link className="more link-arrow" href={`/locations/texas/${city.slug === "houston-tx" ? "houston" : city.slug}#pay`}>
              Every role in {city.name}
            </Link>
          </div>
          <div className="statband" id="pay-list">
            {rolesToShow.map(rSlug => {
              const r = DATA.roles.find(x => x.slug === rSlug);
              const b = bands[rSlug];
              if (!r || !b) return null;
              return (
                <div key={rSlug}>
                  <Link href={`/salaries/${rSlug}/${city.slug}`}>
                    <b><Mark>{fmt.k(b.median)}</Mark></b>
                  </Link>
                  <span>
                    <Link href={`/salaries/${rSlug}/${city.slug}`}>{r.name}</Link>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. FAQ */}
      <section className="block alt">
        <div className="wrap split">
          <div className="sec-head">
            <span className="eyebrow">Questions</span>
            <h2>Posting in {city.name}</h2>
            <p>Where the people come from: <Link href={`/where-to-hire/${city.slug}`}>law schools and bar groups in {city.name}</Link>.</p>
          </div>
          <div className="faq">
            <details>
              <summary>Where should a {city.name} firm post an attorney job?</summary>
              <p>For licensed attorneys, the Houston Bar Association and State Bar of Texas career centres reach people who already practise in Texas. LinkedIn adds volume for mid-level seats.</p>
            </details>
            <details>
              <summary>Where should we post a paralegal or legal assistant job?</summary>
              <p>Indeed and LinkedIn bring the most applicants for staff seats. The Houston Paralegal Association job bank reaches experienced paralegals.</p>
            </details>
            <details>
              <summary>How soon will the first applicant arrive?</summary>
              <p>From the same day on Indeed to about <span className="mark">1–2 weeks</span> on law school boards. Bar career centres sit in between, around <span className="mark">3–7 days</span>.</p>
            </details>
            <details>
              <summary>Can we post and use a recruiter at the same time?</summary>
              <p>Yes. We ask for no exclusivity, and you pay us only if you hire someone we introduced.</p>
            </details>
          </div>
        </div>
      </section>

      {/* 7. CTA band */}
      <CtaBand
        title={`See ${city.name} candidates before you pay to post`}
        button={`See ${city.name} candidates`}
        href={`/find-candidates#city=${city.slug}`}
      />

      <div className="mbar">
        <Link className="btn btn-primary" href={`/find-candidates#city=${city.slug}`}>See {city.name} candidates</Link>
      </div>
    </>
  );
}
