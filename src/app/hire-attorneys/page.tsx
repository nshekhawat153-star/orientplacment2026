import React, { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Questionnaire } from "./Questionnaire";
import { Breadcrumb } from "@/components/Breadcrumb";
import { people, reviews, trust } from "@/data";

export const metadata: Metadata = {
  title: "Hire Qualified Attorneys for Your Law Firm | Orion Placement",
  description:
    "Screened attorney candidates sent straight to your law firm. Pay only if you hire. Sign one simple agreement with zero upfront cost and a 90-day replacement guarantee.",
  alternates: {
    canonical: "https://www.orionplacement.com/hire-attorneys",
  },
};

export default function HireAttorneysLandingPage() {
  const justin = people.find((p) => p.id === "justin") || people[0];
  const clientReviews = reviews.filter((r) => r.kind === "employer").slice(0, 3);

  return (
    <div className="ha-page-wrapper" id="top">
      {/* 1. BREADCRUMB */}
      <Breadcrumb
        items={[
          { name: "Home", href: "/" },
          { name: "Employers", href: "/employers" },
          { name: "Hire Attorneys" },
        ]}
      />

      {/* 2. HERO SECTION */}
      <section className="ha-hero-section">
        <div className="ha-hero-ambient" aria-hidden="true" />
        <div className="wrap ha-hero-wrap">
          <div className="ha-hero-content">
            <span className="ha-hero-badge">
              ONLY FOR LAW FIRMS HIRING ATTORNEYS
            </span>

            <h1 className="ha-hero-title">
              Get qualified attorney candidates sent straight to your firm.
            </h1>

            <p className="ha-hero-sub-gold">
              You only pay if you hire.
            </p>

            <p className="ha-hero-desc">
              Sign one simple agreement. We send attorneys who match your practice area, level, and timeline. If you don&apos;t hire, you don&apos;t pay. No upfront cost.
            </p>

            <div className="ha-hero-actions">
              <a href="#questionnaire" className="ha-btn-gold">
                <span>Check candidate availability</span>
                <svg aria-hidden="true" viewBox="0 0 20 20" width="20" height="20" fill="currentColor">
                  <path d="M10.3 3.3a1 1 0 0 1 1.4 0l6 6a1 1 0 0 1 0 1.4l-6 6a1 1 0 1 1-1.4-1.4l4.3-4.3H3a1 1 0 1 1 0-2h11.6l-4.3-4.3a1 1 0 0 1 0-1.4Z" />
                </svg>
              </a>
              <p className="ha-hero-trust-note">
                Takes about 2 minutes · No upfront cost · 90-day replacement guarantee
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CLIENT RESULTS / FIRMS WE'VE HELPED HIRE */}
      <section className="ha-results-section">
        <div className="wrap">
          <div className="ha-sec-header">
            <span className="ha-eyebrow">Client results</span>
            <h2 className="ha-sec-title">Firms we&apos;ve helped hire</h2>
          </div>

          <div className="ha-reviews-grid">
            {clientReviews.map((rev) => (
              <figure key={rev.id} className="ha-review-card">
                <div className="ha-card-top-row">
                  <span aria-hidden="true" className="ha-quote-mark">“</span>
                  <span className="ha-review-star-badge">5.0 ★ Google Review</span>
                </div>

                <p className="ha-review-headline">
                  {rev.name === "Travis Bowen"
                    ? "Placed 2 attorneys with fast turnaround"
                    : rev.name === "Lainie James"
                    ? "Consistent delivery of top-tier talent"
                    : "Found the perfect candidate for our firm"}
                </p>

                <blockquote className="ha-review-body">
                  &ldquo;{rev.quote}&rdquo;
                </blockquote>

                <figcaption className="ha-review-author">
                  <span aria-hidden="true" className="ha-author-icon">⚖</span>
                  <div>
                    <span className="ha-author-name">{rev.name}</span>
                    <span className="ha-author-role">Law Firm Managing Partner / Administrator</span>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section className="ha-how-section">
        <div className="wrap">
          <div className="ha-sec-header ha-sec-header-center">
            <span className="ha-eyebrow">How it works</span>
            <h2 className="ha-sec-title">You only pay if you hire.</h2>
            <p className="ha-sec-subtitle">
              Sign a simple agreement. We send candidates. You interview the ones you like. A fee is due only if you hire one of them.
            </p>
          </div>

          <div className="ha-steps-grid">
            <div className="ha-step-card">
              <span className="ha-step-num">01</span>
              <h3 className="ha-step-h">No upfront cost</h3>
              <p className="ha-step-p">
                No retainer and nothing to pay to get started. You see candidate dossiers before you spend a single dollar.
              </p>
            </div>

            <div className="ha-step-card">
              <span className="ha-step-num">02</span>
              <h3 className="ha-step-h">Candidates who fit</h3>
              <p className="ha-step-p">
                We pre-screen attorneys for your exact practice mix, local bar admissions, billable expectations, and compensation band.
              </p>
            </div>

            <div className="ha-step-card">
              <span className="ha-step-num">03</span>
              <h3 className="ha-step-h">90-day guarantee</h3>
              <p className="ha-step-p">
                You stay in full control. If a placed attorney leaves within 90 days, we conduct a replacement search at zero extra fee.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. MEET YOUR RECRUITER */}
      <section className="ha-recruiter-section">
        <div className="wrap">
          <div className="ha-recruiter-grid">
            {/* Recruiter Photo */}
            <div className="ha-recruiter-photo-wrap">
              <div className="ha-recruiter-photo-card">
                <Image
                  src={justin.photo || "/images/founders/justin-sofman.png"}
                  alt="Justin Sofman - Co-Founder & Managing Partner"
                  width={280}
                  height={280}
                  className="ha-recruiter-img"
                  priority
                />
              </div>
            </div>

            {/* Recruiter Story */}
            <div className="ha-recruiter-text">
              <span className="ha-eyebrow">Meet your recruiter</span>
              <h2 className="ha-recruiter-title">Hi, I&apos;m Justin Sofman.</h2>
              <p className="ha-recruiter-role">Co-Founder &amp; Managing Partner, Orion Placement</p>

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

              <div className="ha-recruiter-contact-row">
                <span className="ha-contact-label">Direct phone:</span>
                <a href="tel:2015729538" className="ha-contact-val">(201) 572-9538</a>
                <span className="ha-contact-sep">·</span>
                <span className="ha-contact-label">Email:</span>
                <a href="mailto:justin@orionplacement.com" className="ha-contact-val">justin@orionplacement.com</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. INTERACTIVE MULTI-STEP QUESTIONNAIRE */}
      <section id="questionnaire" className="ha-q-section">
        <div className="wrap">
          <div className="ha-q-header">
            <span className="ha-q-eyebrow">Check candidate availability</span>
            <h2 className="ha-q-title">Tell us who you&apos;re looking for</h2>
            <p className="ha-q-sub">A few quick questions. You only pay if you hire.</p>
          </div>

          <div className="ha-q-container">
            <Suspense fallback={<div className="q-card-box text-center py-12 text-[#5b6577]">Loading questionnaire...</div>}>
              <Questionnaire />
            </Suspense>
          </div>
        </div>
      </section>

      {/* 7. BOTTOM CALL TO ACTION */}
      <section className="ha-cta-section">
        <div className="wrap ha-cta-wrap">
          <h2 className="ha-cta-h">Ready to see who&apos;s available?</h2>
          <p className="ha-cta-p">
            One simple agreement. Candidates sent to your inbox. No upfront cost, and you{" "}
            <strong>only pay if you hire</strong>.
          </p>

          <div className="ha-cta-btn-wrap">
            <a href="#questionnaire" className="ha-btn-gold">
              <span>Check candidate availability</span>
              <svg aria-hidden="true" viewBox="0 0 20 20" width="20" height="20" fill="currentColor">
                <path d="M10.3 3.3a1 1 0 0 1 1.4 0l6 6a1 1 0 0 1 0 1.4l-6 6a1 1 0 1 1-1.4-1.4l4.3-4.3H3a1 1 0 1 1 0-2h11.6l-4.3-4.3a1 1 0 0 1 0-1.4Z" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
