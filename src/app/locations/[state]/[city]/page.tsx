import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  cities,
  findCity,
  findCandidate,
  matchCandidates,
  orionLine,
  asOf,
  source,
  jobs,
} from "@/data";
import { Breadcrumb } from "@/components/Breadcrumb";
import { TrustLine, CalendlyLink, RatingBadge } from "@/components/Rating";
import { CitySnapshot } from "@/components/CitySnapshot";
import { CandidateCard } from "@/components/CandidateCard";
import { CityPayTable } from "@/components/PayTables";
import { GateForm } from "@/components/GateForm";
import { ProcessSteps } from "@/components/ProcessSteps";
import { TermsTiles } from "@/components/TermsTiles";
import { ResourceCards } from "@/components/ResourceCards";
import { ReviewsSection } from "@/components/ReviewCard";
import { Mark } from "@/components/Mark";

interface PageProps {
  params: Promise<{ state: string; city: string }>;
}

export async function generateStaticParams() {
  return cities.map((c) => ({
    state: c.stateName.toLowerCase().replace(/\s+/g, "-"),
    city: c.name.toLowerCase().replace(/\s+/g, "-"),
  }));
}

export default async function CityLocationPage({ params }: PageProps) {
  const { state: stateParam, city: cityParam } = await params;

  const city = cities.find(
    (c) =>
      c.name.toLowerCase().replace(/\s+/g, "-") === cityParam.toLowerCase() ||
      c.slug === `${cityParam.toLowerCase()}-${stateParam.slice(0, 2).toLowerCase()}`
  ) || findCity("houston-tx");

  if (!city) {
    notFound();
  }

  // Top candidates in city
  const cityCandidates = matchCandidates({ city: city.slug })
    .filter((r) => r.inCity)
    .slice(0, 3);

  const cityJobsCount = jobs.filter((j) => j.city === city.slug).length;

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: city.stateName },
          { label: city.name },
        ]}
      />

      {/* 1. Hero + Snapshot */}
      <section className="phero">
        <div className="wrap">
          <div>
            <span className="eyebrow">
              {city.name}, {city.stateName}
            </span>
            <h1>Legal recruiters in {city.name}</h1>
            <p className="lede">
              Screened {city.name} attorneys and paralegals available now, what {city.name} firms pay, and one fee only if you hire.
            </p>
            <div className="hero-act">
              <Link
                className="btn btn-primary btn-lg"
                href={`/find-candidates#city=${city.slug}`}
              >
                See {city.name} candidates
              </Link>
              <CalendlyLink
                label="Book 15 minutes with Justin"
                className="text-link"
              />
            </div>
            <TrustLine />
            <p className="hero-sub" id="orion-line">
              {orionLine}
            </p>
          </div>
          <CitySnapshot citySlug={city.slug} />
        </div>
      </section>

      {/* 2. Candidates available in city */}
      <section className="block alt" id="candidates">
        <div className="wrap">
          <div className="sec-head row">
            <div>
              <span className="eyebrow">Available now</span>
              <h2>{city.name} candidates open to a move</h2>
              <p>Screened by Jon. Names and firms stay hidden until you ask for the profile.</p>
            </div>
            <Link
              className="more link-arrow hide-sm"
              href={`/find-candidates#city=${city.slug}`}
            >
              All {city.name} candidates
            </Link>
          </div>
          <div className="cards">
            {cityCandidates.map((r) => (
              <CandidateCard key={r.c.id} candidate={r.c} result={r} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. What city firms pay + salary guide offer */}
      <section className="block" id="pay">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Pay</span>
            <h2>What {city.name} firms pay</h2>
            <p>
              Base salary by role. Pick a role for its band by years of practice and the candidates inside it.
            </p>
          </div>
          <div className="split pay-split">
            <div>
              <CityPayTable citySlug={city.slug} />
              <p className="source">
                Source: {source}, {asOf}. Base salary only, before bonus.
              </p>
            </div>
            <div id="guide-gate">
              <GateForm
                eyebrow="Free PDF"
                title={`Get the ${city.name} legal salary guide`}
                bullets={[
                  "Base pay for ten roles by years of practice",
                  "Bonus norms and the on-site premium",
                  "Updated each quarter",
                ]}
                button={`Email me the ${city.name} guide`}
                preset="guide"
                city={city.slug}
                reviewSlug="daffner-law"
                fine="One email with the PDF, then the update each quarter. Unsubscribe in one click."
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. How it works */}
      <section className="block alt">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">How it works</span>
            <h2>From open seat to shortlist in days</h2>
            <p>
              The same three steps for every {city.name} seat, from legal assistant to senior associate.
            </p>
          </div>
          <ProcessSteps />
        </div>
      </section>

      {/* 5. Terms */}
      <section className="block">
        <div className="wrap">
          <div className="sec-head row">
            <div>
              <span className="eyebrow">What it costs</span>
              <h2>One fee, and only if you hire</h2>
              <p>{city.name} firms pay the same as everywhere. Nothing upfront.</p>
            </div>
            <Link className="more link-arrow" href="/fees">
              Fees and a calculator
            </Link>
          </div>
          <TermsTiles />
        </div>
      </section>

      {/* 6. City hiring resources */}
      <section className="block alt">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Free tools</span>
            <h2>Hiring in {city.name} on your own</h2>
            <p>Where to post, where {city.name} hires come from, and a posting you can copy.</p>
          </div>
          <ResourceCards setType="city" />
        </div>
      </section>

      {/* 7. Reviews */}
      <section className="block">
        <div className="wrap">
          <div className="sec-head row">
            <div>
              <span className="eyebrow">Reviews</span>
              <h2>What firms and candidates say</h2>
            </div>
            <RatingBadge link={true} />
          </div>
          <ReviewsSection kind="mixed" limit={3} />
        </div>
      </section>

      {/* 8. For candidates */}
      <section className="block flush">
        <div className="wrap">
          <div className="cand-band">
            <div>
              <span className="eyebrow">Looking for a role in {city.name}?</span>
              <h2>Confidential {city.name} roles with the pay shown</h2>
              <ul className="ticks">
                <li>
                  <Mark>{cityJobsCount} open {cityJobsCount === 1 ? "role" : "roles"}</Mark>
                </li>
                <li>
                  <Link href={`/best-law-firms/${city.slug}`}>
                    Best {city.name} firms to work for
                  </Link>
                </li>
                <li>
                  <Link href="/salary-check">Check your salary</Link>
                </li>
              </ul>
            </div>
            <Link
              className="btn btn-ghost"
              href={`/jobs/estate-planning-attorney/${city.slug}`}
            >
              See {city.name} jobs
            </Link>
          </div>
        </div>
      </section>

      {/* 9. FAQ */}
      <section className="block alt">
        <div className="wrap split">
          <div className="sec-head">
            <span className="eyebrow">Questions</span>
            <h2>Hiring in {city.name}</h2>
            <p>Ask Justin anything else in a 15-minute call.</p>
          </div>
          <div className="faq">
            <details>
              <summary>Do {city.name} candidates need a {city.stateName} licence?</summary>
              <p>
                For attorney seats, yes: every {city.name} attorney we show holds a {city.stateName} bar licence or is licensed in {city.stateName} and relocating. Paralegal and staff seats need no licence.
              </p>
            </details>
            <details>
              <summary>Are {city.name} roles on-site or hybrid?</summary>
              <p>
                Many {city.name} seats are on-site. Every profile says whether the candidate accepts on-site, hybrid or both, so you only meet people who fit your policy.
              </p>
            </details>
            <details>
              <summary>How fast can we meet {city.name} candidates?</summary>
              <p>
                The candidates on this page are available now. For a new search, the first shortlist usually follows within <Mark>five business days</Mark>.
              </p>
            </details>
            <details>
              <summary>What does it cost to hire in {city.name}?</summary>
              <p>
                The same as anywhere: <Mark>20% of first-year base salary</Mark>, invoiced <Mark>on the start date and due in 30 days</Mark>, with a <Mark>90-day replacement</Mark> guarantee.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* 10. CTA band */}
      <div className="wrap">
        <div className="cta-band">
          <div className="wrap row">
            <div>
              <h2>See {city.name} candidates for your seat</h2>
              <p>Screened candidates ready to interview. One fee only if you hire.</p>
            </div>
            <Link
              className="btn btn-primary btn-lg"
              href={`/find-candidates#city=${city.slug}`}
            >
              See {city.name} candidates
            </Link>
          </div>
        </div>
      </div>

      <div className="mbar">
        <Link
          className="btn btn-primary"
          href={`/find-candidates#city=${city.slug}`}
          id="mbar-cta"
        >
          See {city.name} candidates
        </Link>
      </div>
    </>
  );
}
