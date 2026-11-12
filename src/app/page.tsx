import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ShortlistDeck } from "@/components/ShortlistDeck";
import { TrustBar, TrustLine, RatingBadge, CalendlyLink } from "@/components/Rating";
import { ProcessSteps } from "@/components/ProcessSteps";
import { TermsTiles } from "@/components/TermsTiles";
import { CandidateCard } from "@/components/CandidateCard";
import { ReviewsSection } from "@/components/ReviewCard";
import { PeopleSection } from "@/components/PeopleSection";
import { ResourceCards } from "@/components/ResourceCards";
import { CityTiles, RoleTiles } from "@/components/DirectoryTiles";
import { CtaBand } from "@/components/CtaBand";
import { Mark } from "@/components/Mark";
import { Icon, AwardIcon } from "@/components/icons";
import { findCandidate, orionLine } from "@/data";

export const metadata: Metadata = {
  title: "Legal recruiters for small and mid-size law firms | Orion",
  description:
    "Screened attorneys and paralegals for small and mid-size law firms. See candidates for your seat today. No retainer, and no fee unless you hire.",
  alternates: {
    canonical: "https://www.orionplacement.com/",
  },
};

export default function HomePage() {
  const c1 = findCandidate("EP-TX-0412");
  const c2 = findCandidate("LIT-TX-0390");
  const c3 = findCandidate("RE-TX-0274");

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.orionplacement.com/#org",
        name: "Orion Placement",
        url: "https://www.orionplacement.com/",
        foundingDate: "2022",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Fort Lauderdale",
          addressRegion: "FL",
          addressCountry: "US",
        },
      },
      {
        "@type": "EmploymentAgency",
        name: "Orion Placement",
        url: "https://www.orionplacement.com/",
        parentOrganization: {
          "@id": "https://www.orionplacement.com/#org",
        },
        areaServed: "US",
        description:
          "Contingency legal recruiting for small and mid-size law firms: attorneys, paralegals and legal assistants.",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.orionplacement.com/",
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
        {/* 1. Hero */}
        <section className="hero3" aria-labelledby="h1">
          <div className="wrap">
            <div>
              <span className="eyebrow">Contingency legal recruiting</span>
              <h1 id="h1">
                Legal recruiters for small and mid-size{" "}
                <span className="h1-accent">law firms</span>
              </h1>
              <p className="lede">
                See screened attorneys and paralegals for your open seat today. No
                fee unless you hire.
              </p>
              <div className="hero-act">
                <Link
                  className="btn btn-primary btn-lg"
                  href="/find-candidates"
                >
                  See candidates for my seat
                </Link>
                <CalendlyLink
                  label="Book 15 minutes with Justin"
                  className="btn btn-outline btn-lg"
                />
              </div>
              <TrustLine />
              <p className="hero-sub">
                Looking for a role?{" "}
                <Link
                  className="link-arrow"
                  href="/jobs"
                >
                  See open jobs
                </Link>
              </p>
            </div>
            <ShortlistDeck />
          </div>
        </section>

        {/* 2. Trust bar */}
        <section className="trust-strip" aria-label="Orion in numbers">
          <div className="wrap">
            <TrustBar />
          </div>
        </section>

        {/* 3. How it works */}
        <section className="block how-it-works-sec" id="how-it-works">
          <div className="wrap">
            <div className="sec-head-premium">
              <div className="badge-capsule">
                <span className="badge-dot" />
                HOW IT WORKS · 3-STEP HIRING PROCESS
              </div>
              <h2 className="sec-title-lg">
                From open seat to shortlist in{" "}
                <span className="serif-accent">days</span>
              </h2>
              <p className="who-lede">
                You describe the seat once. We send screened people who fit it,
                and you pay only when one of them starts.
              </p>
            </div>
            <ProcessSteps />
          </div>
        </section>

        {/* 4. What it costs */}
        <section className="block terms-sec" id="terms">
          <div className="wrap">
            <div className="sec-head-premium">
              <div className="badge-capsule">
                <span className="badge-dot" />
                WHAT IT COSTS · TRANSPARENT TERMS
              </div>
              <h2 className="sec-title-lg">
                One fee, and only if you{" "}
                <span className="serif-accent">hire</span>
              </h2>
              <p className="who-lede">
                The same terms for every firm. Nothing to sign until you want to
                meet someone.{" "}
                <Link className="terms-link-accent" href="/fees">
                  Fees and a calculator →
                </Link>
              </p>
            </div>
            <TermsTiles />
          </div>
        </section>

        {/* 5. Candidates available now */}
        <section className="block candidates-sec" id="available-now">
          <div className="wrap">
            <div className="sec-head-premium">
              <div className="badge-capsule">
                <span className="badge-dot" />
                AVAILABLE NOW · PRE-SCREENED TALENT
              </div>
              <h2 className="sec-title-lg">
                Candidates open to a <span className="serif-accent">move</span>
              </h2>
              <p className="who-lede">
                Screened by Jon. Names and firms stay hidden until you ask for the
                profile.
              </p>
            </div>
            <div className="cards teaser">
              {c1 && <CandidateCard candidate={c1} />}
              {c2 && <CandidateCard candidate={c2} />}
              {c3 && <CandidateCard candidate={c3} />}
            </div>
            <div className="sec-foot">
              <Link
                className="btn btn-primary btn-lg"
                href="/find-candidates"
              >
                See all candidates
              </Link>
              <span className="small muted">
                Filter by role, city, years and must-haves.
              </span>
            </div>
          </div>
        </section>

        {/* 6. Reviews */}
        <section className="block reviews-sec" id="reviews">
          <div className="wrap">
            <div className="sec-head-premium">
              <div className="badge-capsule">
                <span className="badge-dot" />
                GOOGLE REVIEWS · VERIFIED CLIENTS &amp; CANDIDATES
              </div>
              <h2 className="sec-title-lg">
                What firms and candidates{" "}
                <span className="serif-accent">say</span>
              </h2>
              <div className="reviews-rating-pill">
                <RatingBadge link />
              </div>
            </div>
            <ReviewsSection kind="mixed" />
          </div>
        </section>

        {/* 7. Who we are */}
        <section className="block who-we-are-sec" id="who-we-are">
          <div className="wrap">
            <div className="sec-head-premium">
              <div className="badge-capsule">
                <span className="badge-dot" />
                WHO WE ARE · DIRECT FOUNDER SEARCH
              </div>
              <h2 className="sec-title-lg">
                Two recruiters you can call by{" "}
                <span className="serif-accent">name</span>
              </h2>
              <p className="who-lede" id="orion-line">
                {orionLine}
              </p>
              <div className="who-trust-strip">
                <RatingBadge size="lg" />
                <span className="trust-sep">·</span>
                <span className="jon-trust-pill">
                  <AwardIcon />
                  Jon is named in <b>47 of our 60</b> Google reviews
                </span>
              </div>
            </div>
            <PeopleSection />
          </div>
        </section>

        {/* 8. Post a job today */}
        <section className="block flush post-job-band-sec" id="post-a-job">
          <div className="wrap">
            <div className="post-job-band">
              <div>
                <div className="badge-capsule badge-capsule-dark">
                  <span className="badge-dot" />
                  EMPLOYER PORTAL · FREE JOB POSTING
                </div>
                <h2>
                  Post your open seat today,{" "}
                  <span className="serif-accent">free</span>
                </h2>
                <p>
                  Attorneys, paralegals and legal assistants across the US.
                  Describe your seat in 2 minutes. No upfront fee, no retainer,
                  and nothing to pay unless you hire.
                </p>
              </div>
              <div className="post-job-act">
                <Link
                  className="btn btn-primary btn-lg"
                  href="/submit-job"
                >
                  Submit a job for free
                </Link>
                <span className="post-job-note">
                  Screened candidates within days · 100% confidential
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 9. Free hiring tools */}
        <section className="block resources-sec" id="resources">
          <div className="wrap">
            <div className="sec-head-premium">
              <div className="badge-capsule">
                <span className="badge-dot" />
                FREE HIRING TOOLS · SELF-SERVE RESOURCES
              </div>
              <h2 className="sec-title-lg">
                Run the hire with or without{" "}
                <span className="serif-accent">us</span>
              </h2>
              <p className="who-lede">
                Pay data, a ready posting and where to find people. No sign-up
                to read any of it.
              </p>
            </div>
            <ResourceCards set="home" />
          </div>
        </section>

        {/* 10. Browse */}
        <section className="block browse-sec" id="browse">
          <div className="wrap">
            <div className="sec-head-premium">
              <div className="badge-capsule">
                <span className="badge-dot" />
                MARKET DIRECTORY · LOCAL INTELLIGENCE
              </div>
              <h2 className="sec-title-lg">
                Pay and candidates near{" "}
                <span className="serif-accent">you</span>
              </h2>
            </div>
            <div className="browse">
              <div>
                <h3 id="by-city">
                  <Icon name="pin" /> By city
                </h3>
                <CityTiles />
              </div>
              <div>
                <h3 id="by-role">
                  <Icon name="scale" /> By role
                </h3>
                <RoleTiles city="houston-tx" />
              </div>
            </div>
          </div>
        </section>

        {/* 11. For candidates */}
        <section className="block flush cand-band-sec">
          <div className="wrap">
            <div className="cand-band">
              <div>
                <div className="badge-capsule badge-capsule-dark">
                  <span className="badge-dot" />
                  FOR ATTORNEYS AND PARALEGALS
                </div>
                <h2>
                  Confidential roles with the pay{" "}
                  <span className="serif-accent">shown</span>
                </h2>
                <p>
                  Roles at small and mid-size firms. Free for candidates. No firm
                  sees your name until you say yes.
                </p>
              </div>
              <Link
                className="btn btn-primary btn-lg"
                href="/jobs"
              >
                See open jobs
              </Link>
            </div>
          </div>
        </section>

        {/* 12. FAQ */}
        <section className="block faq-sec" id="faq">
          <div className="wrap split">
            <div className="sec-head-premium sec-head-left">
              <div className="badge-capsule">
                <span className="badge-dot" />
                QUESTIONS &amp; ANSWERS · ZERO OBLIGATION
              </div>
              <h2 className="sec-title-lg">
                What firms ask <span className="serif-accent">first</span>
              </h2>
              <p className="who-lede">
                More on the <Link href="/fees">fees and guarantee</Link> page,
                or ask Justin directly.
              </p>
            </div>
            <div className="faq">
              <details>
                <summary>What does it cost?</summary>
                <p>
                  <Mark>20% of the hire&apos;s first-year base salary</Mark>,
                  invoiced <Mark>on their start date and due in 30 days</Mark>.
                  Nothing upfront and nothing if you do not hire. Terms for
                  several hires can be arranged.
                </p>
              </details>
              <details>
                <summary>What if the hire leaves early?</summary>
                <p>
                  If they leave or are let go within <Mark>90 days</Mark> of
                  starting, we search again and send replacements at no extra fee.
                </p>
              </details>
              <details>
                <summary>Do we have to work only with you?</summary>
                <p>
                  No. Keep posting and keep your other recruiters. You owe a fee
                  only for a hire we introduced.
                </p>
              </details>
              <details>
                <summary>How do you keep candidates anonymous?</summary>
                <p>
                  Profiles show firm type and size, never names. The full
                  redacted resume goes to you on request, and names follow when
                  both sides agree to meet.
                </p>
              </details>
              <details>
                <summary>Which seats do you fill?</summary>
                <p>
                  Attorneys, paralegals and legal assistants at small and mid-size
                  law firms across the US. Other legal seats can be arranged;
                  ask Justin.
                </p>
              </details>
            </div>
          </div>
        </section>

        {/* 13. CTA band */}
        <CtaBand />
      <div className="mbar">
        <Link className="btn btn-primary" href="/find-candidates">
          See candidates for my seat
        </Link>
      </div>
    </>
  );
}
