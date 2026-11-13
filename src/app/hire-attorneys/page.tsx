import React, { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { Questionnaire } from "./Questionnaire";
import { Stars, GMark } from "@/components/icons";
import { reviews } from "@/data";

export const metadata: Metadata = {
  title: "Hire Qualified Attorneys for Your Law Firm | Orion Placement",
  description:
    "Screened attorney candidates sent straight to your law firm. Pay only if you hire. Sign one simple agreement with zero upfront cost and a 90-day replacement guarantee.",
  alternates: {
    canonical: "https://www.orionplacement.com/hire-attorneys",
  },
};

export default function HireAttorneysLandingPage() {
  const clientReviews = reviews.filter((r) => r.kind === "employer").slice(0, 3);

  return (
    <div className="ha-page">
      {/* 1. HERO SECTION (Centered, Clean, Minimal) */}
      <section className="ha-hero">
        <div className="wrap">
          <div className="ha-hero-inner">
            <span className="ha-badge">Only for Law Firms Hiring Attorneys</span>

            <h1 className="ha-hero-h1">
              Get qualified attorney candidates sent straight to{" "}
              <span className="ha-serif-accent">your firm.</span>
            </h1>

            <p className="ha-hero-sub">You only pay if you hire.</p>

            <p className="ha-hero-p">
              Sign one simple agreement. We send attorneys who match your practice
              area, level, and timeline. If you don&apos;t hire, you don&apos;t pay. No upfront cost.
            </p>

            <div className="ha-hero-act">
              <a href="#questionnaire" className="ha-cta-btn">
                <span>Check candidate availability</span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  width="18"
                  height="18"
                  fill="currentColor"
                >
                  <path d="M10.3 3.3a1 1 0 0 1 1.4 0l6 6a1 1 0 0 1 0 1.4l-6 6a1 1 0 1 1-1.4-1.4l4.3-4.3H3a1 1 0 1 1 0-2h11.6l-4.3-4.3a1 1 0 0 1 0-1.4Z" />
                </svg>
              </a>
              <p className="ha-micro-trust">
                Takes about 2 minutes · No upfront cost · 90-day replacement guarantee
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CLIENT RESULTS / FIRMS WE'VE HELPED HIRE */}
      <section className="ha-sec ha-sec-tinted">
        <div className="wrap">
          <div className="ha-sec-header ha-text-center">
            <span className="ha-sec-kicker">Client results</span>
            <h2 className="ha-sec-title">Firms we&apos;ve helped hire</h2>
            <p className="ha-sec-desc">
              Direct feedback from managing partners and firm administrators who hired through Orion.
            </p>
          </div>

          <div className="ha-cards-3">
            {clientReviews.map((rev) => (
              <figure key={rev.id} className="ha-card ha-review-card">
                <div className="ha-review-card-top">
                  <Stars />
                  <span className="ha-star-badge">
                    <GMark /> Google review
                  </span>
                </div>

                <h3 className="ha-review-headline">
                  {rev.name === "Travis Bowen"
                    ? "Placed 2 attorneys with fast turnaround"
                    : rev.name === "Lainie James"
                    ? "Consistent delivery of top-tier talent"
                    : "Found the perfect candidate for our firm"}
                </h3>

                <blockquote className="ha-review-quote">
                  &ldquo;{rev.quote}&rdquo;
                </blockquote>

                <figcaption className="ha-review-author">
                  <div className="ha-avatar-circle" aria-hidden="true">⚖</div>
                  <div>
                    <b className="ha-author-name">{rev.name}</b>
                    <span className="ha-author-title">Law Firm Client</span>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS */}
      <section className="ha-sec">
        <div className="wrap">
          <div className="ha-sec-header ha-text-center">
            <span className="ha-sec-kicker">How it works</span>
            <h2 className="ha-sec-title">You only pay if you hire.</h2>
            <p className="ha-sec-desc">
              Sign a simple agreement. We send candidates. You interview the ones you like.
              A fee is due only if you hire one of them.
            </p>
          </div>

          <div className="ha-cards-3">
            <div className="ha-card ha-step-card">
              <span className="ha-step-number">STEP 01</span>
              <h3 className="ha-step-title">No upfront cost</h3>
              <p className="ha-step-desc">
                No retainer and nothing to pay to get started. You see candidate
                dossiers before you spend a single dollar.
              </p>
            </div>

            <div className="ha-card ha-step-card">
              <span className="ha-step-number">STEP 02</span>
              <h3 className="ha-step-title">Candidates who fit</h3>
              <p className="ha-step-desc">
                We pre-screen attorneys for your exact practice mix, local bar
                admissions, billable expectations, and compensation band.
              </p>
            </div>

            <div className="ha-card ha-step-card">
              <span className="ha-step-number">STEP 03</span>
              <h3 className="ha-step-title">90-day guarantee</h3>
              <p className="ha-step-desc">
                You stay in full control. If a placed attorney leaves within 90
                days, we conduct a replacement search at zero extra fee.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. MEET YOUR RECRUITER */}
      <section className="ha-sec ha-sec-tinted">
        <div className="wrap">
          <div className="ha-recruiter-grid">
            {/* Recruiter Photo */}
            <div className="ha-recruiter-photo-wrap">
              <div className="ha-recruiter-card">
                <Image
                  src="/images/founders/justin-sofman.png"
                  alt="Justin Sofman"
                  width={240}
                  height={240}
                  className="ha-recruiter-portrait"
                  priority
                />
                <div className="ha-recruiter-card-info">
                  <b className="ha-recruiter-name-tag">Justin Sofman</b>
                  <span className="ha-recruiter-role-tag">Co-Founder &amp; Managing Partner</span>
                </div>
              </div>
            </div>

            {/* Recruiter Content */}
            <div className="ha-recruiter-content">
              <span className="ha-sec-kicker">Meet your recruiter</span>
              <h2 className="ha-recruiter-name">Hi, I&apos;m Justin Sofman.</h2>
              <p className="ha-recruiter-sub">Co-Founder &amp; Managing Partner, Orion Placement</p>

              <div className="ha-recruiter-paragraphs">
                <p>
                  I co-founded Orion Placement alongside Jon Missirlian to solve the biggest frustration law firms face: paying huge upfront retainers for resume spammers who have never even spoken to the attorney they&apos;re submitting.
                </p>
                <p>
                  Since 2022, we have placed over <b>500+ attorneys and paralegals</b> with <b>200+ small and mid-size law firms</b> across Texas and the United States. Jon conducts in-depth screening calls on every single candidate before you ever see a profile.
                </p>
                <p>
                  We specialize in Estate Planning &amp; Wealth Transfer, Commercial Litigation, Real Estate, Corporate M&amp;A, Family Law, and Employment.
                </p>
              </div>

              <div className="ha-recruiter-quote">
                &ldquo;I only get paid when you find the right attorney, so I&apos;m 100% invested in sending people actually worth your time.&rdquo;
              </div>

              <div className="ha-recruiter-footer-actions">
                <a
                  href="https://calendly.com/orionplacement/call-with-justin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm"
                >
                  Book 15 min with Justin →
                </a>
                <a href="tel:2015729538" className="btn btn-outline btn-sm">
                  Call (201) 572-9538
                </a>
                <a href="mailto:justin@orionplacement.com" className="ha-email-link">
                  justin@orionplacement.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE QUESTIONNAIRE */}
      <section id="questionnaire" className="ha-sec">
        <div className="wrap">
          <div className="ha-sec-header ha-text-center">
            <span className="ha-sec-kicker">Check candidate availability</span>
            <h2 className="ha-sec-title">Tell us who you&apos;re looking for</h2>
            <p className="ha-sec-desc">
              A few quick questions. Takes 2 minutes. You only pay if you hire.
            </p>
          </div>

          <div className="ha-q-center-box">
            <Suspense fallback={<div className="q-card-box text-center py-12 text-[#5b6577]">Loading questionnaire...</div>}>
              <Questionnaire />
            </Suspense>
          </div>
        </div>
      </section>

      {/* 6. BOTTOM CALL TO ACTION */}
      <section className="ha-sec ha-sec-tinted ha-bottom-cta">
        <div className="wrap">
          <div className="ha-bottom-cta-content">
            <h2 className="ha-cta-h2">Ready to see who&apos;s available?</h2>
            <p className="ha-cta-desc">
              One simple agreement. Candidates sent to your inbox. No upfront cost, and you{" "}
              <b>only pay if you hire</b>.
            </p>
            <a href="#questionnaire" className="ha-cta-btn">
              <span>Check candidate availability</span>
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                width="18"
                height="18"
                fill="currentColor"
              >
                <path d="M10.3 3.3a1 1 0 0 1 1.4 0l6 6a1 1 0 0 1 0 1.4l-6 6a1 1 0 1 1-1.4-1.4l4.3-4.3H3a1 1 0 1 1 0-2h11.6l-4.3-4.3a1 1 0 0 1 0-1.4Z" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
