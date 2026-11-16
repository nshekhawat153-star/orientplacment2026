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
      {/* 1. LUXURY HERO SECTION (Centered with Water Splash Video & Blue Glow) */}
      <section className="emp-luxury-hero-sec ha-luxury-hero-sec">
        {/* Background Video Layer */}
        <div className="emp-hero-video-wrap" aria-hidden="true">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="emp-hero-video"
          >
            <source src="/media/splash.mp4" type="video/mp4" />
          </video>
          <div className="emp-hero-overlay" />
          <div className="emp-hero-glow" />
        </div>

        <div className="wrap emp-hero-content">
          <div className="emp-hero-badge-wrap">
            <div className="badge-capsule">
              <span className="badge-dot" />
              <span>DIRECT INTAKE · ZERO RETAINER</span>
            </div>
          </div>

          <h1 className="emp-hero-h1">
            Get qualified attorney candidates sent straight to{" "}
            <span className="serif-accent">your firm.</span>
          </h1>

          <p className="emp-hero-lead">
            Sign one simple agreement. Pre-screened lateral attorneys matched to your exact
            practice mix, local bar admissions, and compensation band. You only pay if you hire.
          </p>

          <div className="emp-hero-actions">
            <a href="#questionnaire" className="btn-emp-primary">
              <span>Check candidate availability</span>
              <svg aria-hidden="true" viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
                <path d="M10.3 3.3a1 1 0 0 1 1.4 0l6 6a1 1 0 0 1 0 1.4l-6 6a1 1 0 1 1-1.4-1.4l4.3-4.3H3a1 1 0 1 1 0-2h11.6l-4.3-4.3a1 1 0 0 1 0-1.4Z" />
              </svg>
            </a>
            <a
              href="https://calendly.com/orionplacement/call-with-justin"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-emp-ghost"
            >
              <span>Book 15 min with Justin</span>
              <svg aria-hidden="true" viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
                <path d="M10.3 3.3a1 1 0 0 1 1.4 0l6 6a1 1 0 0 1 0 1.4l-6 6a1 1 0 1 1-1.4-1.4l4.3-4.3H3a1 1 0 1 1 0-2h11.6l-4.3-4.3a1 1 0 0 1 0-1.4Z" />
              </svg>
            </a>
          </div>

          {/* Micro Reassurances */}
          <div className="emp-reassurance-row">
            <div className="emp-reassurance-item">
              <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="3.5 8.5 6.5 11.5 12.5 4.5" />
              </svg>
              <span>Takes ~2 minutes</span>
            </div>
            <span className="emp-dot-sep">·</span>
            <div className="emp-reassurance-item">
              <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="3.5 8.5 6.5 11.5 12.5 4.5" />
              </svg>
              <span>Zero upfront cost</span>
            </div>
            <span className="emp-dot-sep">·</span>
            <div className="emp-reassurance-item">
              <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="3.5 8.5 6.5 11.5 12.5 4.5" />
              </svg>
              <span>90-day replacement guarantee</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CLIENT RESULTS / FIRMS WE'VE HELPED HIRE */}
      <section className="ha-sec ha-sec-tinted">
        <div className="wrap">
          <div className="sec-head-premium">
            <div className="badge-capsule">
              <span className="badge-dot" />
              <span>CLIENT RESULTS · VERIFIED FEEDBACK</span>
            </div>
            <h2 className="sec-title-lg">
              Firms we&apos;ve helped <span className="serif-accent">hire</span>
            </h2>
            <p className="who-lede">
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
                  <div className="ha-avatar-circle" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 3v18M3 7h18M6 7l-3 7h6L6 7zm12 0l-3 7h6l-3-7z" />
                    </svg>
                  </div>
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
          <div className="sec-head-premium">
            <div className="badge-capsule">
              <span className="badge-dot" />
              <span>THE CONTINGENCY MODEL · ZERO RISK</span>
            </div>
            <h2 className="sec-title-lg">
              You only pay if you <span className="serif-accent">hire.</span>
            </h2>
            <p className="who-lede">
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
              <div className="badge-capsule" style={{ marginBottom: 14 }}>
                <span className="badge-dot" />
                <span>FOUNDER SPOTLIGHT</span>
              </div>
              <h2 className="ha-recruiter-name">
                Hi, I&apos;m <span className="serif-accent">Justin Sofman.</span>
              </h2>
              <p className="ha-recruiter-sub">Co-Founder &amp; Managing Partner, Orion Placement</p>

              <div className="ha-recruiter-paragraphs">
                <p>
                  I co-founded Orion Placement alongside Jon Missirlian to solve the biggest frustration law firms face: paying huge upfront retainers for resume spammers who have never even spoken to the attorney they&apos;re submitting.
                </p>
                <p>
                  With <b>11 years</b> of recruiting industry experience and Jon&apos;s <b>20 years</b> of talent acquisition expertise, we facilitate over <b>30 hires per month</b> (over 200 hires in the past 12 months) for law firms across Texas and nationwide, backed by an active pool of <b>100,000+ legal professionals</b>.
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
                  style={{ borderRadius: 7, fontWeight: 600, padding: "10px 20px" }}
                >
                  Book 15 min with Justin →
                </a>
                <a
                  href="#questionnaire"
                  className="btn btn-outline btn-sm"
                  style={{ borderRadius: 7, fontWeight: 600, padding: "10px 20px" }}
                >
                  Check candidate availability
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
          <div className="sec-head-premium">
            <div className="badge-capsule">
              <span className="badge-dot" />
              <span>START YOUR SEARCH · 2 MINUTES</span>
            </div>
            <h2 className="sec-title-lg">
              Tell us who you&apos;re looking <span className="serif-accent">for</span>
            </h2>
            <p className="who-lede">
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

      {/* 6. BOTTOM DARK CTA SECTION */}
      <section className="emp-terms-dark-sec ha-terms-dark-sec">
        <div className="wrap">
          <div className="emp-terms-head">
            <div className="badge-capsule-dark">
              <span className="badge-dot-dark" />
              <span>100% CONTINGENCY · RISK REVERSAL</span>
            </div>
            <h2 className="emp-terms-h2">
              Ready to see who&apos;s <span className="serif-accent-dark">available?</span>
            </h2>
            <p className="emp-terms-lead">
              One simple agreement. Pre-screened attorney dossiers sent to your inbox within days.
              No upfront cost, and you <b>only pay if you hire</b>.
            </p>

            <div style={{ marginTop: 32 }}>
              <a href="#questionnaire" className="btn-emp-primary" style={{ padding: "16px 36px", fontSize: 16 }}>
                <span>Check candidate availability</span>
                <svg aria-hidden="true" viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
                  <path d="M10.3 3.3a1 1 0 0 1 1.4 0l6 6a1 1 0 0 1 0 1.4l-6 6a1 1 0 1 1-1.4-1.4l4.3-4.3H3a1 1 0 1 1 0-2h11.6l-4.3-4.3a1 1 0 0 1 0-1.4Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
