import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { TrustBar, RatingBadge } from "@/components/Rating";
import { ResourceCards } from "@/components/ResourceCards";
import { ReviewsSection } from "@/components/ReviewCard";
import { CtaBand } from "@/components/CtaBand";
import { Mark } from "@/components/Mark";
import { Icon } from "@/components/icons";
import { trust, terms } from "@/data";

export const metadata: Metadata = {
  title: "Hire attorneys and paralegals for your firm | Orion",
  description:
    "For small and mid-size law firms: see screened, anonymised candidates first, check pay against the market, and pay a fee only if you hire.",
  alternates: {
    canonical: "https://www.orionplacement.com/employers/",
  },
};

export default function EmployersPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.orionplacement.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Employers",
        item: "https://www.orionplacement.com/employers/",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. CINEMATIC WATER SPLASH HERO */}
      <section className="hero-cinematic" aria-labelledby="emp-hero-h1" style={{ padding: "124px 0 76px" }}>
        {/* Background Water Splash Video */}
        <div className="hero-video-wrap" aria-hidden="true">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="hero-video-el"
          >
            <source src="/media/splash.mp4" type="video/mp4" />
            <source src="/videos/hero-water-splash.mp4" type="video/mp4" />
          </video>
          <div className="hero-video-gradient" />
          <div className="hero-video-radial-aura" />
        </div>

        <div className="wrap hero-content-wrap" style={{ position: "relative", zIndex: 2, maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
          <div className="hero-content-center">
            <div className="hero-eyebrow-capsule">
              <span className="hero-eyebrow-dot" aria-hidden="true" />
              <span>EMPLOYER PORTAL<span className="eyebrow-sep"> · </span><br className="eyebrow-break" />23% DUE ONLY IF YOU HIRE</span>
            </div>

            <h1 id="emp-hero-h1" className="hero-display-h1">
              Hire attorneys and paralegals,{" "}
              <span className="hero-accent-serif">pay only when you hire.</span>
            </h1>

            <p className="hero-lead-p">
              Direct-hire lateral attorney and legal support placements sent straight to your inbox.{" "}
              <span style={{ color: "#93C5FD", fontWeight: 500 }}>
                Zero upfront fees, non-exclusive agreement, and a full 90-day replacement guarantee.
              </span>{" "}
              You only pay 15 days after your hire starts.
            </p>

            <div className="hero-actions-group">
              <Link className="btn-hero-primary" href="/find-candidates">
                <span>Find candidates for my seat</span>
                <svg aria-hidden="true" viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
                  <path d="M10.3 3.3a1 1 0 0 1 1.4 0l6 6a1 1 0 0 1 0 1.4l-6 6a1 1 0 1 1-1.4-1.4l4.3-4.3H3a1 1 0 1 1 0-2h11.6l-4.3-4.3a1 1 0 0 1 0-1.4Z" />
                </svg>
              </Link>
              <a
                href={trust.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-hero-secondary"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="15"
                  height="15"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span>Book 15 min with Justin</span>
              </a>
            </div>

            <div className="emp-hero-perks">
              <div className="emp-hero-perk-item">
                <span className="perk-check" aria-hidden="true">✓</span>
                <span>Zero upfront retainer</span>
              </div>
              <div className="emp-hero-perk-item">
                <span className="perk-check" aria-hidden="true">✓</span>
                <span>Non-exclusive agreement</span>
              </div>
              <div className="emp-hero-perk-item">
                <span className="perk-check" aria-hidden="true">✓</span>
                <span>90-day replacement warranty</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trust Bar */}
      <section className="trust-strip" aria-label="Orion in numbers">
        <div className="wrap">
          <TrustBar />
        </div>
      </section>

      {/* 3. Three Ways to Start */}
      <section className="block emp-ways-sec" id="start">
        <div className="wrap">
          <div className="sec-head-premium">
            <div className="badge-capsule">
              <span className="badge-dot" />
              THREE WAYS TO ENGAGE
            </div>
            <h2 className="sec-title-lg">
              Start the way that suits <span className="serif-accent">your firm</span>
            </h2>
            <p className="who-lede">
              Each option shows you candidates, market compensation benchmarks, or actionable answers before asking for any commitment.
            </p>
          </div>

          <div className="emp-ways-grid">
            {/* Card 1: Describe the seat */}
            <div className="emp-way-card">
              <div>
                <div className="emp-way-top">
                  <span className="emp-way-pill">~2 min intake</span>
                  <span style={{ fontSize: "12px", color: "#64748B", fontFamily: "var(--mono)" }}>Step 01</span>
                </div>
                <div className="emp-way-mock">
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontWeight: "600", color: "#08142A" }}>
                    <span>Seat Intake</span>
                    <span style={{ color: "#1D4ED8" }}>Live Match</span>
                  </div>
                  <div style={{ color: "#475569", marginBottom: "4px" }}>Role: Estate Planning Associate</div>
                  <div style={{ color: "#475569", marginBottom: "8px" }}>Market: Houston, TX · 3-6 Yrs</div>
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    <span style={{ background: "#DBEAFE", color: "#1D4ED8", padding: "2px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: "600" }}>Texas Bar</span>
                    <span style={{ background: "#DBEAFE", color: "#1D4ED8", padding: "2px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: "600" }}>Probate</span>
                    <span style={{ background: "#F1F5F9", color: "#64748B", padding: "2px 8px", borderRadius: "4px", fontSize: "11px" }}>Bilingual</span>
                  </div>
                </div>
                <h3 className="emp-way-title">Describe the seat</h3>
                <p className="emp-way-desc">
                  Role, market, years and must-haves. Matching candidates appear as you go, and the top three dossiers are available immediately.
                </p>
              </div>
              <Link className="btn-emp-way-act" href="/find-candidates">
                <span>Describe your seat</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            {/* Card 2: Paste your posting */}
            <div className="emp-way-card">
              <div>
                <div className="emp-way-top">
                  <span className="emp-way-pill">~1 min analysis</span>
                  <span style={{ fontSize: "12px", color: "#64748B", fontFamily: "var(--mono)" }}>Step 02</span>
                </div>
                <div className="emp-way-mock">
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontWeight: "600", color: "#08142A" }}>
                    <span>JD Parser</span>
                    <span style={{ color: "#059669" }}>✓ Verified</span>
                  </div>
                  <div style={{ height: "6px", background: "#E2E8F0", borderRadius: "3px", width: "80%", marginBottom: "6px" }} />
                  <div style={{ height: "6px", background: "#93C5FD", borderRadius: "3px", width: "95%", marginBottom: "6px" }} />
                  <div style={{ height: "6px", background: "#E2E8F0", borderRadius: "3px", width: "65%", marginBottom: "10px" }} />
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    <span style={{ background: "#ECFDF5", color: "#059669", padding: "2px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: "600" }}>Houston</span>
                    <span style={{ background: "#ECFDF5", color: "#059669", padding: "2px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: "600" }}>4–7 Years</span>
                    <span style={{ background: "#ECFDF5", color: "#059669", padding: "2px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: "600" }}>$120k–$140k</span>
                  </div>
                </div>
                <h3 className="emp-way-title">Paste your posting</h3>
                <p className="emp-way-desc">
                  We read the role, city, years and pay, check compensation against current market percentiles, and show qualified matches instantly.
                </p>
              </div>
              <Link className="btn-emp-way-act" href="/submit-job">
                <span>Paste your posting</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            {/* Card 3: Talk to Justin */}
            <div className="emp-way-card">
              <div>
                <div className="emp-way-top">
                  <span className="emp-way-pill">15 min call</span>
                  <span style={{ fontSize: "12px", color: "#64748B", fontFamily: "var(--mono)" }}>Step 03</span>
                </div>
                <div className="emp-way-mock">
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontWeight: "600", color: "#08142A" }}>
                    <span>Justin Missirlian</span>
                    <span style={{ color: "#1D4ED8" }}>Founder</span>
                  </div>
                  <div style={{ display: "flex", gap: "4px", marginBottom: "10px" }}>
                    <span style={{ flex: 1, padding: "6px 2px", textAlign: "center", background: "#F1F5F9", borderRadius: "4px", fontSize: "10px" }}>Mon</span>
                    <span style={{ flex: 1, padding: "6px 2px", textAlign: "center", background: "#1D4ED8", color: "#FFF", borderRadius: "4px", fontSize: "10px", fontWeight: "700" }}>Tue<br/>11:30</span>
                    <span style={{ flex: 1, padding: "6px 2px", textAlign: "center", background: "#F1F5F9", borderRadius: "4px", fontSize: "10px" }}>Wed</span>
                    <span style={{ flex: 1, padding: "6px 2px", textAlign: "center", background: "#F1F5F9", borderRadius: "4px", fontSize: "10px" }}>Thu</span>
                    <span style={{ flex: 1, padding: "6px 2px", textAlign: "center", background: "#F1F5F9", borderRadius: "4px", fontSize: "10px" }}>Fri</span>
                  </div>
                  <div style={{ color: "#059669", fontSize: "11px", fontWeight: "600" }}>
                    ✓ The seat, the pay, and who is available now
                  </div>
                </div>
                <h3 className="emp-way-title">Talk to Justin</h3>
                <p className="emp-way-desc">
                  Discuss your open seat with the founder who directly executes it. Learn who is actively exploring in your market and what they expect.
                </p>
              </div>
              <a
                href={trust.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-emp-way-act"
              >
                <span>Book 15 minutes with Justin</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. How it works: From open seat to shortlist in days */}
      <section className="block emp-process-sec" id="how-it-works">
        <div className="wrap">
          <div className="sec-head-premium">
            <div className="badge-capsule">
              <span className="badge-dot" />
              EFFORTLESS CONTINGENCY WORKFLOW
            </div>
            <h2 className="sec-title-lg">
              From open seat to shortlist in <span className="serif-accent">days</span>
            </h2>
            <p className="who-lede">
              You describe the seat once. We send screened, vetted candidates who match your exact criteria. You only pay when your hire starts.
            </p>
          </div>

          <div className="emp-process-grid">
            {/* Step 1 */}
            <div className="emp-pcard">
              <div>
                <div className="emp-pcard-header">
                  <span className="emp-pcard-step-badge">STEP 01</span>
                  <span className="emp-pcard-when">Day 0</span>
                </div>
                <h3 className="emp-pcard-title">Tell us the seat</h3>
                <p className="emp-pcard-desc">
                  Role, market, years, target pay and non-negotiables. Two minutes on our finder or 15 minutes directly with Justin.
                </p>
              </div>
              <div className="emp-pcard-ill">
                <div className="mock" aria-hidden="true">
                  <div className="mk-h">Your seat · Intake</div>
                  <div className="mk-f">
                    <i>Role</i>
                    <span>Estate planning attorney</span>
                  </div>
                  <div className="mk-f">
                    <i>City</i>
                    <span>Houston, TX</span>
                  </div>
                  <div className="mk-chips">
                    <span className="on">Texas Bar</span>
                    <span className="on">Probate</span>
                    <span>Spanish</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="emp-pcard">
              <div>
                <div className="emp-pcard-header">
                  <span className="emp-pcard-step-badge">STEP 02</span>
                  <span className="emp-pcard-when">Days 1–5</span>
                </div>
                <h3 className="emp-pcard-title">See the shortlist</h3>
                <p className="emp-pcard-desc">
                  Screened candidates with pay, bar standing, and notice period. We send redacted profiles; you pick who to interview.
                </p>
              </div>
              <div className="emp-pcard-ill">
                <div className="mock" aria-hidden="true">
                  <div className="mk-h">
                    Shortlist <em>3 matches</em>
                  </div>
                  <div className="mk-row">
                    <b>Candidate A</b>
                    <i style={{ width: "94%" }} />
                    <span>5 of 5</span>
                  </div>
                  <div className="mk-row">
                    <b>Candidate B</b>
                    <i style={{ width: "82%" }} />
                    <span>4 of 5</span>
                  </div>
                  <div className="mk-row">
                    <b>Candidate C</b>
                    <i style={{ width: "76%" }} />
                    <span>4 of 5</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="emp-pcard">
              <div>
                <div className="emp-pcard-header">
                  <span className="emp-pcard-step-badge">STEP 03</span>
                  <span className="emp-pcard-when">Start Date</span>
                </div>
                <h3 className="emp-pcard-title">Interview, hire, then pay</h3>
                <p className="emp-pcard-desc">
                  Invoice sent on the candidate&apos;s start date, due in 15 days. Full 90-day free replacement guarantee if it does not work out.
                </p>
              </div>
              <div className="emp-pcard-ill">
                <div className="mock" aria-hidden="true">
                  <div className="mk-h">Interviews &amp; Offer</div>
                  <div className="mk-days">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span className="on">
                      Wed<b>10:00</b>
                    </span>
                    <span>Thu</span>
                    <span>Fri</span>
                  </div>
                  <div className="mk-ok">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12.5l4.5 4.5L19 7.5" />
                    </svg>
                    Start date agreed · 90-day warranty
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DARK SECTION: One fee, and only if you hire */}
      <section className="emp-terms-dark-sec" id="terms">
        <div className="wrap">
          <div className="sec-head-premium sec-head-row">
            <div>
              <div className="badge-capsule">
                <span className="badge-dot" />
                TRANSPARENT TERMS · 23% CONTINGENCY
              </div>
              <h2 className="sec-title-lg" style={{ color: "#FFFFFF" }}>
                One fee, and only if you <span className="serif-accent" style={{ color: "#60A5FA" }}>hire</span>
              </h2>
              <p className="who-lede" style={{ color: "#94A3B8" }}>
                The exact same transparent terms for every firm. Nothing to sign until you want to interview a candidate.
              </p>
            </div>
            <Link className="btn-emp-primary" href="/fees" style={{ whiteSpace: "nowrap" }}>
              <span>Fee schedule &amp; calculator</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="emp-terms-dark-grid">
            {/* Tile 1 */}
            <div className="emp-dark-tile">
              <div>
                <div className="emp-dark-tile-icon">
                  <Icon name="percent" />
                </div>
                <span className="emp-dark-tile-label">Contingency Fee</span>
                <span className="emp-dark-tile-val">
                  <Mark>{Math.round(terms.feeRate * 100)}%</Mark>
                </span>
              </div>
              <p className="emp-dark-tile-desc">
                Of candidate&apos;s first-year compensation, invoiced only if you hire someone we introduced.
              </p>
            </div>

            {/* Tile 2 */}
            <div className="emp-dark-tile">
              <div>
                <div className="emp-dark-tile-icon" style={{ background: "rgba(5, 150, 105, 0.2)", borderColor: "rgba(52, 211, 153, 0.3)", color: "#34D399" }}>
                  <Icon name="shield" />
                </div>
                <span className="emp-dark-tile-label" style={{ color: "#6EE7B7" }}>Replacement Warranty</span>
                <span className="emp-dark-tile-val">
                  <Mark>{terms.guaranteeDays} Days</Mark>
                </span>
              </div>
              <p className="emp-dark-tile-desc">
                If the hire leaves or is let go in the first 90 days, we conduct a new search and replace at zero extra charge.
              </p>
            </div>

            {/* Tile 3 */}
            <div className="emp-dark-tile">
              <div>
                <div className="emp-dark-tile-icon">
                  <Icon name="wallet" />
                </div>
                <span className="emp-dark-tile-label">Upfront Retainer</span>
                <span className="emp-dark-tile-val">$0</span>
              </div>
              <p className="emp-dark-tile-desc">
                Zero retainer and zero exclusivity required. Keep posting your role and continue using other recruiters.
              </p>
            </div>

            {/* Tile 4 */}
            <div className="emp-dark-tile">
              <div>
                <div className="emp-dark-tile-icon">
                  <Icon name="invoice" />
                </div>
                <span className="emp-dark-tile-label">Payment Schedule</span>
                <span className="emp-dark-tile-val">Start Date</span>
              </div>
              <p className="emp-dark-tile-desc">
                Invoice generated on the candidate&apos;s official first day, payable within 15 calendar days.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Free tools */}
      <section className="block alt" id="tools">
        <div className="wrap">
          <div className="sec-head-premium">
            <div className="badge-capsule">
              <span className="badge-dot" />
              COMPLIMENTARY HIRING INTELLIGENCE
            </div>
            <h2 className="sec-title-lg">
              Run the hire with or <span className="serif-accent">without us</span>
            </h2>
            <p className="who-lede">
              Market pay data, ready-to-use job descriptions, posting channel comparisons, and instant fee estimates. No sign-up required.
            </p>
          </div>
          <ResourceCards set="employer" />
        </div>
      </section>

      {/* 7. Employer reviews */}
      <section className="block" id="reviews">
        <div className="wrap">
          <div className="sec-head-premium sec-head-row">
            <div>
              <div className="badge-capsule">
                <span className="badge-dot" />
                VERIFIED GOOGLE 5.0 RATING
              </div>
              <h2 className="sec-title-lg">
                What law firms <span className="serif-accent">say</span>
              </h2>
              <p className="who-lede">
                Jon is named personally in <b>47 of our 60+</b> verified Google reviews.
              </p>
            </div>
            <RatingBadge link />
          </div>
          <ReviewsSection kind="employer" />
        </div>
      </section>

      {/* 8. Candidate crossover band (Midnight Navy) */}
      <section className="block flush cand-band-sec">
        <div className="wrap">
          <div className="cand-band">
            <div className="cand-band-content">
              <div className="badge-capsule">
                <span className="badge-dot" />
                CANDIDATE PORTAL · 100% CONFIDENTIAL
              </div>
              <h2 className="cand-band-title">
                Looking for a lateral role <span className="serif-accent">yourself?</span>
              </h2>
              <p className="cand-band-lede">
                Direct lateral opportunities at leading boutique and mid-size law firms.
                Always 100% free for candidates. No firm ever sees your name until you approve.
              </p>
              <div className="cand-band-perks">
                <div className="cand-band-perk-item">
                  <span className="perk-check" aria-hidden="true">✓</span>
                  <span>100% confidential representation</span>
                </div>
                <div className="cand-band-perk-item">
                  <span className="perk-check" aria-hidden="true">✓</span>
                  <span>Exact salary &amp; bonus disclosed upfront</span>
                </div>
                <div className="cand-band-perk-item">
                  <span className="perk-check" aria-hidden="true">✓</span>
                  <span>Zero contact with firms without approval</span>
                </div>
              </div>
            </div>

            <div className="cand-band-card">
              <div className="cand-band-card-top">
                <span className="cand-portal-badge">ACTIVE CAREER PORTAL</span>
                <span className="cand-time-badge">Free for Candidates</span>
              </div>
              <Link className="btn-cand-submit" href="/candidates">
                <span>See the candidate side</span>
                <svg aria-hidden="true" viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
                  <path d="M10.3 3.3a1 1 0 0 1 1.4 0l6 6a1 1 0 0 1 0 1.4l-6 6a1 1 0 1 1-1.4-1.4l4.3-4.3H3a1 1 0 1 1 0-2h11.6l-4.3-4.3a1 1 0 0 1 0-1.4Z" />
                </svg>
              </Link>
              <p className="cand-band-note">
                No firm sees your resume or name until you say yes
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FAQ Section */}
      <section className="block faq-sec" id="faq">
        <div className="wrap split">
          <div className="sec-head-premium sec-head-left faq-head-col">
            <div className="badge-capsule">
              <span className="badge-dot" />
              QUESTIONS &amp; ANSWERS · ZERO OBLIGATION
            </div>
            <h2 className="sec-title-lg">
              What firms ask <span className="serif-accent">first</span>
            </h2>
            <p className="who-lede">
              Simple terms, 90-day replacement guarantee, zero retainers. Explore our complete fee schedule or speak directly with a founder.
            </p>
            <div className="faq-side-card">
              <p className="faq-side-note">
                Have a specific placement scenario or practice area in mind?
              </p>
              <div className="faq-side-actions">
                <Link href="/fees" className="btn-faq-fees">
                  <span>Fee schedule &amp; terms</span>
                  <span className="faq-arrow" aria-hidden="true">→</span>
                </Link>
                <a
                  href={trust.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="faq-cal-pill"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="15"
                    height="15"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <span>Book 15 min with Justin</span>
                </a>
              </div>
              <div className="faq-side-reassurance">
                <span className="reassurance-check" aria-hidden="true">✓</span>
                <span>Direct founder accountability on every legal mandate</span>
              </div>
            </div>
          </div>

          <div className="faq">
            <details>
              <summary>
                <span>Do we pay anything before we hire?</span>
                <span className="faq-toggle-icon" aria-hidden="true" />
              </summary>
              <div className="faq-body">
                <p>
                  No. There is <Mark>no retainer and zero fee</Mark> to see candidate profiles.
                  The contingency fee is due only if you hire someone we introduced, invoiced on their
                  first day and payable within 15 days.
                </p>
              </div>
            </details>
            <details>
              <summary>
                <span>Can we keep posting the job and using other recruiters?</span>
                <span className="faq-toggle-icon" aria-hidden="true" />
              </summary>
              <div className="faq-body">
                <p>
                  Yes. We ask for <Mark>no exclusivity</Mark>. Keep your job posting live and continue working
                  with any other recruiters. You owe a fee only for a candidate introduced by Orion.
                </p>
              </div>
            </details>
            <details>
              <summary>
                <span>Where do your candidates come from?</span>
                <span className="faq-toggle-icon" aria-hidden="true" />
              </summary>
              <div className="faq-body">
                <p>
                  Attorneys and paralegals who have spoken with Jon in recent weeks and agreed to be represented
                  anonymously. For a new mandate, we also proactively reach into our wider boutique network.
                </p>
              </div>
            </details>
            <details>
              <summary>
                <span>What if the hire leaves in the first months?</span>
                <span className="faq-toggle-icon" aria-hidden="true" />
              </summary>
              <div className="faq-body">
                <p>
                  If they leave or are let go within <Mark>90 days</Mark> of starting, we search again and send
                  qualified replacements at no extra fee under our full replacement warranty.
                </p>
              </div>
            </details>
            <details open>
              <summary>
                <span>Do you fill paralegal and legal assistant seats too?</span>
                <span className="faq-toggle-icon" aria-hidden="true" />
              </summary>
              <div className="faq-body">
                <p>
                  Yes. We place attorneys, paralegals, and legal assistants for small and mid-size law firms across
                  the US. Other specialized legal staff can be arranged; ask Justin.
                </p>
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* 10. CTA Band */}
      <CtaBand
        title="See candidates for your open seat"
        button="Find candidates"
        href="/find-candidates"
      />

      {/* Mobile Sticky Bar */}
      <div className="mbar">
        <Link className="btn btn-primary" href="/find-candidates">
          Find candidates
        </Link>
      </div>
    </>
  );
}
