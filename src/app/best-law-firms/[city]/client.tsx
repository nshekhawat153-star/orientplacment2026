"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DATA } from "@/data";

import { Mark } from "@/components/Mark";
import { TrustLine } from "@/components/Rating";
import { JobCard } from "@/components/JobCard";
import { GateForm } from "@/components/GateForm";
import { CtaBand } from "@/components/CtaBand";

export default function BestLawFirmsClient({ cityParam }: { cityParam: string }) {
  const city = DATA.cities.find((c) => c.slug === cityParam);

  const [currentPractice, setCurrentPractice] = useState<string>("All");

  if (!city) {
    notFound();
  }

  const firms = DATA.bestFirms[city.slug] || [];
  const criteria = DATA.bestFirmsCriteria || [];

  // Extract unique practice areas
  const practices = ["All", ...Array.from(new Set(firms.map((f) => f.practice)))];

  const filteredFirms = firms
    .filter((f) => currentPractice === "All" || f.practice === currentPractice)
    .sort((a, b) => {
      const pDiff = practices.indexOf(a.practice) - practices.indexOf(b.practice);
      if (pDiff !== 0) return pDiff;
      const rA = parseFloat(a.reviews) || 0;
      const rB = parseFloat(b.reviews) || 0;
      return rB - rA;
    });

  const cityJobs = DATA.jobs.filter((j) => j.city === city.slug).slice(0, 3);

  return (
    <>

      {/* 1. Hero */}
      <section className="phero bf-hero">
        <div className="wrap">
          <div>
            <span className="eyebrow">
              {city.name}, {city.state} · small and mid-size firms
            </span>
            <h1>Best small law firms to work for in {city.name}</h1>
            <p className="lede">
              Houston firms that pass all five tests below. No firm can pay to be listed or to move up.
            </p>
            <div className="hero-act">
              <Link className="btn btn-primary btn-lg" href={`/upload-resume#city=${city.slug}`}>
                Upload resume for matches
              </Link>
              <a className="text-link" href="#firms">
                See the list
              </a>
            </div>
            <TrustLine kind="candidate" />
          </div>

          <div className="snapshot" id="bf-snap">
            <div className="snap-h">
              <span className="eyebrow">The {city.name} list</span>
              <span className="small muted">
                <Mark>{DATA.asOf}</Mark>
              </span>
            </div>
            <div className="snap-grid">
              <div>
                <b>
                  <Mark>{firms.length}</Mark>
                </b>
                <span>firms pass all five tests</span>
              </div>
              <div>
                <b>
                  <Mark>{practices.length - 1}</Mark>
                </b>
                <span>practice areas covered</span>
              </div>
              <div>
                <b>
                  <Mark>4.5+</Mark>
                </b>
                <span>average public reviews, every firm</span>
              </div>
              <div>
                <b>$0</b>
                <span>paid by any firm to be listed</span>
              </div>
            </div>
          </div>

          <ol className="criteria" id="criteria" aria-label="The five tests">
            {criteria.map(([title, desc]: [string, string], i: number) => (
              <li key={i}>
                <b>{title}</b>
                {desc}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 2. Practice filter and compact listings */}
      <section className="block alt" id="firms">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">The list</span>
            <h2>{city.name} firms that pass all five</h2>
            <p>Listings show firm type, not names, until a firm opts in. Sorted by public reviews within each practice.</p>
          </div>

          <div className="results-head">
            <div className="chips chips-scroll" id="practice" role="group" aria-label="Practice area">
              {practices.map((p) => (
                <button
                  key={p}
                  type="button"
                  className={`chip${currentPractice === p ? " active" : ""}`}
                  aria-pressed={currentPractice === p}
                  onClick={() => setCurrentPractice(p)}
                >
                  {p}
                </button>
              ))}
            </div>
            <span className="small muted">
              <Mark>{filteredFirms.length}</Mark> {filteredFirms.length === 1 ? "firm" : "firms"}{" "}
              {currentPractice === "All"
                ? `across ${practices.length - 1} practice areas`
                : `in ${currentPractice.toLowerCase()}`}
            </span>
          </div>

          <div className="table-wrap">
            <table className="data stack-sm rows-sm">
              <caption className="sr">Small law firms in {city.name} by practice area (sample listings)</caption>
              <thead>
                <tr>
                  <th scope="col">Firm</th>
                  <th scope="col">Practice</th>
                  <th scope="col">Size</th>
                  <th scope="col">Area</th>
                  <th scope="col" className="r">
                    Published base
                  </th>
                  <th scope="col">Works</th>
                  <th scope="col" className="r">
                    Public reviews
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredFirms.map((f, i) => (
                  <tr key={i}>
                    <td data-label="Firm">
                      <Mark>{f.desc}</Mark> <span className="chip-static">Sample listing</span>
                    </td>
                    <td data-label="Practice">{f.practice}</td>
                    <td data-label="Size">
                      <Mark>{f.size}</Mark>
                    </td>
                    <td data-label="Area">
                      <Mark>{f.area}</Mark>
                    </td>
                    <td className="r" data-label="Published base">
                      <Mark>{f.pay}</Mark>
                    </td>
                    <td data-label="Works">
                      <Mark>{f.mode}</Mark>
                    </td>
                    <td className="r" data-label="Public reviews">
                      <Mark>{f.reviews}</Mark>
                    </td>
                    <td className="sm-cell">
                      <span className="l">
                        {f.practice} · <Mark>{f.size}</Mark> · <Mark>{f.area}</Mark>
                      </span>
                      <span className="l">
                        <Mark>{f.pay}</Mark> base · <Mark>{f.mode}</Mark> · <Mark>{f.reviews}</Mark>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 3. Confidential roles at firms like these */}
      <section className="block">
        <div className="wrap">
          <div className="sec-head row">
            <div>
              <span className="eyebrow">Open now</span>
              <h2>Confidential roles at firms like these</h2>
              <p>Open in {city.name}, with the base range on every card.</p>
            </div>
            <Link className="more link-arrow hide-sm" href={`/jobs/estate-planning-attorney/${city.slug}`}>
              Estate planning roles in {city.name}
            </Link>
          </div>
          <div className="cards">
            {cityJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
          <div className="sec-foot">
            <Link className="btn btn-ghost" href={`/jobs/estate-planning-attorney/${city.slug}`}>
              See all {city.name} roles
            </Link>
            <span className="small muted">Jon names the firm on your first call, before anything is sent.</span>
          </div>
        </div>
      </section>

      {/* 4. Job alerts */}
      <section className="block alt">
        <div className="wrap split">
          <div>
            <div className="sec-head">
              <span className="eyebrow">Job alerts</span>
              <h2>Hear when a listed firm is hiring</h2>
              <p>Many of these firms hire quietly. Get their roles before they are posted.</p>
            </div>
            <ul className="ticks">
              <li>New {city.name} roles with the base range</li>
              <li>Which listed firm is behind each one, on your first call</li>
              <li>Unsubscribe in one click</li>
            </ul>
          </div>
          <div id="alerts">
            <GateForm
              eyebrow="Job alerts"
              title={`Email me new ${city.name} roles`}
              audience="candidate"
              button="Email me new roles"
              review="n-brown"
              fine="Use a personal email, not your work one. No firm sees your name until you say yes."
              steps={[
                ["Now", `Alerts are on for ${city.name} roles. Nothing has gone to any firm.`, true],
                ["As roles open", "Each new role with its base range, firm type and on-site or hybrid."],
                ["When one fits", "Reply to the email. Jon tells you who the firm is before anything is sent."],
                ["Any time", "Unsubscribe in one click, and your email is deleted."],
              ]}
            />
          </div>
        </div>
      </section>

      {/* 5. How a firm gets featured */}
      <section className="block">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Featured employers</span>
            <h2>How a firm gets named on the list</h2>
            <p>Featuring never changes the order. Reviews decide that.</p>
          </div>
          <ol className="steps-line">
            <li>
              <span className="when">Step 1</span>
              <h3>Passes all five tests</h3>
              <p>Only firms already on the list can be featured.</p>
            </li>
            <li>
              <span className="when">Step 2</span>
              <h3>The firm opts in</h3>
              <p>A partner asks to be named. Nothing is paid.</p>
            </li>
            <li>
              <span className="when">Step 3</span>
              <h3>We check the details</h3>
              <p>Pay range, work arrangement and reviews, against public sources.</p>
            </li>
            <li>
              <span className="when">Step 4</span>
              <h3>Named, with open roles</h3>
              <p>Candidates see the firm&apos;s name and partners before a first call.</p>
            </li>
          </ol>
        </div>
      </section>

      {/* 6. For firms: claim or correct */}
      <section className="block alt" id="claim-col">
        <div className="wrap split">
          <div>
            <div className="sec-head">
              <span className="eyebrow">For law firms</span>
              <h2>Is your firm listed, or should it be?</h2>
              <p>
                Justin replies within <span className="mark">two business days</span>.
              </p>
            </div>
            <ul className="ticks">
              <li>Claim your listing</li>
              <li>Correct a detail</li>
              <li>Ask to be featured by name</li>
              <li>Ask to be considered, or removed</li>
            </ul>
          </div>
          <div id="claim">
            <GateForm
              eyebrow="Your listing"
              title="Claim or correct your listing"
              button="Send my listing request"
              review="daffner-law"
              fine="We confirm you work at the firm before changing anything. Featuring is free."
              steps={[
                ["Now", "Your request is with Justin.", true],
                [
                  "Within two business days",
                  "Justin replies from an Orion address to confirm you work at the firm and what to change.",
                ],
                ["Within one week", "The change is live, and you get a link to check it."],
                [
                  "Each quarter",
                  "A reminder to update your firm's pay bands and open roles. Unsubscribe in one click.",
                ],
              ]}
            />
          </div>
        </div>
      </section>

      {/* 7. FAQ */}
      <section className="block">
        <div className="wrap split">
          <div className="sec-head">
            <span className="eyebrow">Questions</span>
            <h2>About this list</h2>
            <p>Updated every quarter, when we refresh pay bands and reviews.</p>
          </div>
          <div className="faq">
            <details>
              <summary>How are firms chosen?</summary>
              <p>
                Each firm must be a small or mid-size firm, do at least half its work in one practice area, publish a base range for its roles, say whether seats are on-site or hybrid, and average 4.5 or more in public reviews.
              </p>
            </details>
            <details>
              <summary>Can a firm pay to be on the list?</summary>
              <p>
                No. Firms cannot pay to be listed or to move up. A firm that meets the tests can choose to be named, which changes nothing about its place.
              </p>
            </details>
            <details>
              <summary>Why are most firms not named?</summary>
              <p>
                Many small firms hire quietly. Until a firm opts in, we describe it by type, size and neighbourhood, and Jon names it on a confidential call if you are interested.
              </p>
            </details>
            <details>
              <summary>How often is it updated?</summary>
              <p>Every quarter, when we refresh pay bands and reviews.</p>
            </details>
          </div>
        </div>
      </section>

      {/* 8. CTA band */}
      <CtaBand
        kind="candidate"
        title="Get matched to firms like these"
        button="Upload resume for matches"
        href={`/upload-resume#city=${city.slug}`}
      />

      <div className="mbar">
        <Link className="btn btn-primary" href={`/upload-resume#city=${city.slug}`}>
          Upload resume for matches
        </Link>
      </div>
    </>
  );
}
