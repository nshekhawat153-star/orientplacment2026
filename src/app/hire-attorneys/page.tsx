import React, { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Questionnaire } from "./Questionnaire";
import { ShortlistDeck } from "@/components/ShortlistDeck";
import { TrustBar, TrustLine, RatingBadge, CalendlyLink } from "@/components/Rating";
import { ProcessSteps } from "@/components/ProcessSteps";
import { TermsTiles } from "@/components/TermsTiles";
import { ReviewsSection } from "@/components/ReviewCard";
import { PeopleSection } from "@/components/PeopleSection";
import { CtaBand } from "@/components/CtaBand";
import { AwardIcon } from "@/components/icons";
import { orionLine } from "@/data";

export const metadata: Metadata = {
  title: "Hire Qualified Attorneys for Your Law Firm | Orion Placement",
  description:
    "Screened attorney candidates sent straight to your law firm. Pay only if you hire. Sign one simple agreement with zero upfront cost and a 90-day replacement guarantee.",
  alternates: {
    canonical: "https://www.orionplacement.com/hire-attorneys",
  },
};

export default function HireAttorneysLandingPage() {
  return (
    <>
      {/* 1. HERO SECTION (Aligned with Homepage hero3) */}
      <section className="hero3" aria-labelledby="h1">
        <div className="wrap">
          <div>
            <span className="eyebrow">ONLY FOR LAW FIRMS HIRING ATTORNEYS</span>
            <h1 id="h1">
              Get qualified attorney candidates sent straight to{" "}
              <span className="h1-accent">your firm</span>
            </h1>
            <p className="lede">
              You only pay if you hire. Sign one simple agreement. We send
              attorneys who match your practice area, level, and timeline. If you
              don&apos;t hire, you don&apos;t pay. No upfront cost.
            </p>
            <div className="hero-act">
              <a className="btn btn-primary btn-lg" href="#questionnaire">
                Check candidate availability
              </a>
              <CalendlyLink
                label="Book 15 minutes with Justin"
                className="btn btn-outline btn-lg"
              />
            </div>
            <TrustLine />
          </div>
          <ShortlistDeck />
        </div>
      </section>

      {/* 2. TRUST STRIP (Orion in numbers) */}
      <section className="trust-strip" aria-label="Orion in numbers">
        <div className="wrap">
          <TrustBar />
        </div>
      </section>

      {/* 3. CLIENT RESULTS / FIRMS WE'VE HELPED HIRE */}
      <section className="block reviews-sec" id="results">
        <div className="wrap">
          <div className="sec-head-premium">
            <div className="badge-capsule">
              <span className="badge-dot" />
              CLIENT RESULTS · 5.0 GOOGLE REVIEWS
            </div>
            <h2 className="sec-title-lg">
              Firms we&apos;ve helped <span className="serif-accent">hire</span>
            </h2>
            <p className="who-lede">
              Direct feedback from managing partners and firm administrators who hired through Orion.
            </p>
            <div className="reviews-rating-pill">
              <RatingBadge link />
            </div>
          </div>
          <ReviewsSection kind="employer" limit={3} />
        </div>
      </section>

      {/* 4. HOW IT WORKS (3-Step Hiring Process) */}
      <section className="block how-it-works-sec" id="how-it-works">
        <div className="wrap">
          <div className="sec-head-premium">
            <div className="badge-capsule">
              <span className="badge-dot" />
              HOW IT WORKS · 3-STEP HIRING PROCESS
            </div>
            <h2 className="sec-title-lg">
              You only pay if you <span className="serif-accent">hire</span>
            </h2>
            <p className="who-lede">
              Sign a simple agreement. We send candidates. You interview the ones you like.
              A fee is due only if you hire one of them.
            </p>
          </div>
          <ProcessSteps kind="employer" />
        </div>
      </section>

      {/* 5. TRANSPARENT TERMS */}
      <section className="block terms-sec" id="terms">
        <div className="wrap">
          <div className="sec-head-premium">
            <div className="badge-capsule">
              <span className="badge-dot" />
              WHAT IT COSTS · TRANSPARENT TERMS
            </div>
            <h2 className="sec-title-lg">
              One fee, and only if you <span className="serif-accent">hire</span>
            </h2>
            <p className="who-lede">
              The same terms for every firm. Zero upfront retainer. 90-day replacement guarantee.{" "}
              <Link className="terms-link-accent" href="/fees">
                Fees and calculator →
              </Link>
            </p>
          </div>
          <TermsTiles />
        </div>
      </section>

      {/* 6. MEET YOUR RECRUITERS (PeopleSection) */}
      <section className="block who-we-are-sec" id="meet-recruiter">
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

      {/* 7. INTERACTIVE CANDIDATE AVAILABILITY QUESTIONNAIRE */}
      <section className="block questionnaire-sec" id="questionnaire">
        <div className="wrap">
          <div className="sec-head-premium">
            <div className="badge-capsule">
              <span className="badge-dot" />
              CHECK CANDIDATE AVAILABILITY · FREE 2-MINUTE BRIEF
            </div>
            <h2 className="sec-title-lg">
              Tell us who you&apos;re looking <span className="serif-accent">for</span>
            </h2>
            <p className="who-lede">
              A few quick questions. Takes 2 minutes. Zero upfront cost, and you only pay if you hire.
            </p>
          </div>

          <div className="q-wrap-centered">
            <Suspense fallback={<div className="q-card-box text-center py-12 text-[#5b6577]">Loading questionnaire...</div>}>
              <Questionnaire />
            </Suspense>
          </div>
        </div>
      </section>

      {/* 8. BOTTOM CTA BAND */}
      <CtaBand
        title="Ready to see who's available?"
        text="One simple agreement. Candidates sent to your inbox. No upfront cost, and you only pay if you hire."
        button="Check candidate availability"
        href="#questionnaire"
        kind="employer"
        cal={true}
      />
    </>
  );
}
