import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TrustBar, TrustTicker, RatingBadge, CalendlyLink } from "@/components/Rating";
import { ProcessSteps } from "@/components/ProcessSteps";
import { TermsTiles } from "@/components/TermsTiles";
import { CandidateCard } from "@/components/CandidateCard";
import { InteractiveCandidateShowcase } from "@/components/InteractiveCandidateShowcase";
import { ReviewsSection } from "@/components/ReviewCard";
import { SearchProtocolInteractive } from "@/components/SearchProtocolInteractive";
import { PeopleSection } from "@/components/PeopleSection";
import { ResourceCards } from "@/components/ResourceCards";
import { CtaBand } from "@/components/CtaBand";
import { Mark } from "@/components/Mark";
import { Icon, AwardIcon } from "@/components/icons";
import { findCandidate, orionLine, trust } from "@/data";
import { ScrollRevealProvider } from "@/components/ScrollRevealProvider";

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
  const c4 = findCandidate("LIT-TX-0422");
  const c5 = findCandidate("EP-TX-0451");

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
      <ScrollRevealProvider />
        {/* 1. CINEMATIC WATER SPLASH HERO */}
        <section className="hero-cinematic" aria-labelledby="h1">
          {/* Background Water Splash Video */}
          <div className="hero-video-wrap" aria-hidden="true">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="hero-video-el"
            >
              <source src="/videos/hero-water-splash.mp4" type="video/mp4" />
            </video>
            <div className="hero-video-gradient" />
            <div className="hero-video-radial-aura" />
          </div>

          <div className="wrap hero-content-wrap">
            <div className="hero-content-center">
              <div className="hero-eyebrow-capsule">
                <span className="hero-eyebrow-dot" aria-hidden="true" />
                <span>NATIONWIDE CONTINGENCY<span className="eyebrow-sep"> · </span><br className="eyebrow-break" />PAY ONLY IF YOU HIRE</span>
              </div>

              <h1 id="h1" className="hero-display-h1">
                Legal recruiters for small and mid-size{" "}
                <span className="hero-accent-serif" style={{ color: "#60A5FA" }}>law firms.</span>
              </h1>

              <p className="hero-lead-p">
                Direct-hire attorney and legal support placements sent straight to your inbox.{" "}
                <span style={{ color: "#93C5FD", fontWeight: 500 }}>
                  Zero upfront fees, non-exclusive agreement, and a full 90-day replacement guarantee.
                </span>{" "}
                You only pay when you hire.
              </p>

              <div className="hero-actions-group">
                <Link
                  className="btn-hero-primary"
                  href="/find-candidates"
                >
                  <span>See candidates for my seat</span>
                  <svg aria-hidden="true" viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
                    <path d="M10.3 3.3a1 1 0 0 1 1.4 0l6 6a1 1 0 0 1 0 1.4l-6 6a1 1 0 1 1-1.4-1.4l4.3-4.3H3a1 1 0 1 1 0-2h11.6l-4.3-4.3a1 1 0 0 1 0-1.4Z" />
                  </svg>
                </Link>
                <CalendlyLink
                  label="Book 15 minutes with Justin"
                  className="btn-hero-secondary"
                />
              </div>

              <div className="hero-subline">
                Looking for a role?{" "}
                <Link className="hero-subline-link" href="/jobs">
                  See open jobs →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Sleek Continuous Moving Trust Ticker */}
        <section className="trust-ticker-strip" aria-label="Orion verified numbers">
          <TrustTicker />
        </section>

        {/* 3. The Orion Search Protocol - Interactive Animated Showcase */}
        <SearchProtocolInteractive />

        {/* 4. What It Costs - Transparent Contingency Terms */}
        <section className="block terms-sec" id="terms" aria-labelledby="terms-h2">
          {/* Faded Background Graphic Backdrop */}
          <div className="terms-bg-backdrop" aria-hidden="true">
            <div className="terms-bg-image" />
            <div className="terms-bg-overlay" />
          </div>

          <div className="wrap">
            <div className="terms-head">
              <div className="terms-eyebrow">
                <span className="terms-eyebrow-dot" />
                <span>WHAT IT COSTS · TRANSPARENT TERMS</span>
              </div>
              <h2 id="terms-h2" className="terms-h2">
                One fee, and only if you <span className="serif-accent">hire.</span>
              </h2>
              <p className="terms-lede">
                Identical, non-exclusive contingency terms for every firm. Zero retainers, zero invoice until candidate starts, and a full 90-day replacement guarantee.
              </p>
            </div>

            {/* 4 Executive Terms Pillars */}
            <div className="terms-pillars-grid">
              {/* Pillar 01: 23% Fee */}
              <div className="terms-pillar">
                <div className="pillar-kicker">01 · CONTINGENCY</div>
                <div className="pillar-val">23%</div>
                <div className="pillar-label">Fee</div>
                <p className="pillar-desc">
                  Of candidate&apos;s compensation, only if you hire someone we introduced.
                </p>
                <div className="pillar-badge">
                  <span>Contingency Only</span>
                </div>
              </div>

              {/* Pillar 02: 90 Days */}
              <div className="terms-pillar">
                <div className="pillar-kicker">02 · GUARANTEE</div>
                <div className="pillar-val">90 Days</div>
                <div className="pillar-label">Guarantee</div>
                <p className="pillar-desc">
                  If the hire leaves in that time, we replace them at no extra charge.
                </p>
                <div className="pillar-badge">
                  <span>100% Free Replacement</span>
                </div>
              </div>

              {/* Pillar 03: $0 Upfront */}
              <div className="terms-pillar">
                <div className="pillar-kicker">03 · ZERO RISK</div>
                <div className="pillar-val">$0</div>
                <div className="pillar-label">Upfront</div>
                <p className="pillar-desc">
                  No retainer and no exclusivity. Keep your other recruiters.
                </p>
                <div className="pillar-badge">
                  <span>Non-Exclusive</span>
                </div>
              </div>

              {/* Pillar 04: Net 15 */}
              <div className="terms-pillar">
                <div className="pillar-kicker">04 · PAYMENT SCHEDULE</div>
                <div className="pillar-val">Net 15</div>
                <div className="pillar-label">When you pay</div>
                <p className="pillar-desc">
                  Invoice when the hire starts, due in 15 days.
                </p>
                <div className="pillar-badge">
                  <span>Start Date Invoice</span>
                </div>
              </div>
            </div>

            {/* Bottom Reassurance & Calculator Bar */}
            <div className="terms-bottom-bar">
              <div className="terms-reassurance-list">
                <span className="terms-check-item">
                  <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="3.5 8.5 6.5 11.5 12.5 4.5" />
                  </svg>
                  <span>100% Free for all candidates</span>
                </span>
                <span className="terms-check-item">
                  <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="3.5 8.5 6.5 11.5 12.5 4.5" />
                  </svg>
                  <span>Non-exclusive contingency agreement</span>
                </span>
                <span className="terms-check-item">
                  <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="3.5 8.5 6.5 11.5 12.5 4.5" />
                  </svg>
                  <span>Zero upfront retainer required</span>
                </span>
              </div>

              <Link href="/fees" className="btn-terms-calc">
                <span>Fees and a calculator</span>
                <svg aria-hidden="true" viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
                  <path d="M10.3 3.3a1 1 0 0 1 1.4 0l6 6a1 1 0 0 1 0 1.4l-6 6a1 1 0 1 1-1.4-1.4l4.3-4.3H3a1 1 0 1 1 0-2h11.6l-4.3-4.3a1 1 0 0 1 0-1.4Z" />
                </svg>
              </Link>
            </div>
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
                Candidates open to a <span className="serif-accent">move.</span>
              </h2>
              <p className="who-lede">
                Screened by Jon. Names and firms stay hidden until you ask for the profile.
              </p>
            </div>

            {/* Candidate Showcase: 3 in Row 1, 2 in Row 2 (Centered) + Bottom Banner */}
            <InteractiveCandidateShowcase c1={c1} c2={c2} c3={c3} c4={c4} c5={c5} />
          </div>
        </section>

        {/* 6. Reviews */}
        <section className="block reviews-sec home-reviews-sec" id="reviews">
          {/* Faded 4-2.jpg Parallax Backdrop - Homepage Only */}
          <div className="home-reviews-bg-backdrop" aria-hidden="true">
            <div className="home-reviews-bg-image" />
            <div className="home-reviews-bg-overlay" />
          </div>

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

            {/* Bottom Reassurance & All Reviews Link */}
            <div className="reviews-bottom-bar">
              <div className="reviews-bottom-trust">
                <span className="reviews-bottom-dot" />
                <span>
                  100% verified public Google reviews · Jon is named in <strong>{trust.jonNamed} of {trust.reviews}</strong> reviews
                </span>
              </div>
              <a
                href={trust.google}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-reviews-google"
              >
                <span>Read all {trust.reviews} reviews on Google</span>
                <svg aria-hidden="true" viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
                  <path d="M10.3 3.3a1 1 0 0 1 1.4 0l6 6a1 1 0 0 1 0 1.4l-6 6a1 1 0 1 1-1.4-1.4l4.3-4.3H3a1 1 0 1 1 0-2h11.6l-4.3-4.3a1 1 0 0 1 0-1.4Z" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* 7. Who we are */}
        <section className="block who-we-are-sec" id="who-we-are">
          <div className="wrap">
            <div className="who-head-split">
              {/* Left Column: Eyebrow, Heading, Google Review Badge */}
              <div className="who-head-col who-head-col-left">
                <div className="badge-capsule">
                  <span className="badge-dot" />
                  WHO WE ARE · DIRECT FOUNDER SEARCH
                </div>
                <h2 className="sec-title-lg">
                  Two recruiters you can call by{" "}
                  <span className="serif-accent">name</span>
                </h2>
                <div className="who-head-rating">
                  <RatingBadge size="lg" />
                </div>
              </div>

              {/* Subtle Vertical Divider between columns on desktop */}
              <div className="who-head-vdivider" aria-hidden="true" />

              {/* Right Column: Supporting paragraph & Jon Named line */}
              <div className="who-head-col who-head-col-right">
                <p className="who-lede" id="orion-line">
                  {orionLine}
                </p>
                <div className="who-head-jon-trust">
                  <span className="jon-trust-pill">
                    <AwardIcon />
                    Jon is named in <b>47 of our 60</b> Google reviews
                  </span>
                </div>
              </div>
            </div>

            {/* Subtle horizontal fade divider between header and founders */}
            <div className="who-bottom-fade-divider" aria-hidden="true" />

            <PeopleSection />
          </div>
        </section>

        {/* 8. Post a job today */}
        <section className="block flush post-job-band-sec" id="post-a-job">
          {/* Background Water Splash Video Backdrop */}
          <div className="post-job-video-backdrop" aria-hidden="true">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="post-job-video-el"
            >
              <source src="/videos/hero-water-splash.mp4" type="video/mp4" />
              <source src="/media/splash.mp4" type="video/mp4" />
            </video>
            <div className="post-job-video-gradient" />
            <div className="post-job-video-radial-aura" />
          </div>

          <div className="wrap">
            <div className="post-job-band">
              <div className="post-job-content">
                <div className="badge-capsule">
                  <span className="badge-dot" />
                  EMPLOYER PORTAL · FREE JOB POSTING
                </div>
                <h2 className="post-job-title">
                  Post your open seat today,{" "}
                  <span className="serif-accent">free</span>
                </h2>
                <p className="post-job-lede">
                  Attorneys, paralegals and legal assistants across the US.
                  Describe your seat in 2 minutes. No upfront fee, no retainer,
                  and nothing to pay unless you hire.
                </p>
                <div className="post-job-perks">
                  <div className="post-job-perk-item">
                    <span className="perk-check" aria-hidden="true">✓</span>
                    <span>Zero upfront retainer</span>
                  </div>
                  <div className="post-job-perk-item">
                    <span className="perk-check" aria-hidden="true">✓</span>
                    <span>5–7 business day shortlist</span>
                  </div>
                  <div className="post-job-perk-item">
                    <span className="perk-check" aria-hidden="true">✓</span>
                    <span>90-day replacement guarantee</span>
                  </div>
                </div>
              </div>

              <div className="post-job-card">
                <div className="post-job-card-top">
                  <span className="post-job-portal-badge">DIRECT INTAKE PORTAL</span>
                  <span className="post-job-time-badge">~2 min submission</span>
                </div>
                <Link
                  className="btn-post-job-submit"
                  href="/submit-job"
                >
                  <span>Submit a job for free</span>
                  <svg aria-hidden="true" viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
                    <path d="M10.3 3.3a1 1 0 0 1 1.4 0l6 6a1 1 0 0 1 0 1.4l-6 6a1 1 0 1 1-1.4-1.4l4.3-4.3H3a1 1 0 1 1 0-2h11.6l-4.3-4.3a1 1 0 0 1 0-1.4Z" />
                  </svg>
                </Link>
                <p className="post-job-note">
                  Screened candidates within days · 100% confidential
                </p>
                <div className="post-job-card-divider" />
                <div className="post-job-alt-action">
                  <span>Prefer to discuss the mandate first?</span>
                  <a
                    href={trust.calendly}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="post-job-call-link"
                  >
                    <span>Book 15 min with Justin</span>
                    <span className="call-arrow" aria-hidden="true">→</span>
                  </a>
                </div>
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
                Verified pay data, attorney hiring kits, and recruiting directories.
                Zero sign-up, zero email gate, and completely free to use.
              </p>
            </div>
            <ResourceCards set="home" />

            {/* Bottom Ungated Intelligence Reassurance Bar - Dark Luxury Redesign */}
            <div className="resources-bottom-bar">
              <div className="resources-bottom-content">
                <div className="resources-bottom-icon-box" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#60A5FA" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 9.9-1" />
                  </svg>
                </div>
                <div className="resources-bottom-left">
                  <div className="resources-bottom-tag">
                    <span className="resources-tag-dot" />
                    <span>100% UNGATED LEGAL INTELLIGENCE</span>
                  </div>
                  <p className="resources-bottom-text">
                    All compensation benchmarks, interview frameworks, and recruitment guides are <strong>publicly available</strong>.
                    <span className="resources-text-accent"> Zero email wall, zero sign-up, and zero subscription.</span>
                  </p>
                </div>
              </div>

              <div className="resources-bottom-right">
                <Link href="/salaries/estate-planning-attorney/houston-tx" className="btn-resources-action">
                  <span>Explore salary directory</span>
                  <span className="resources-btn-arrow" aria-hidden="true">→</span>
                </Link>
                <span className="resources-subtext">
                  <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="3.5 8.5 6.5 11.5 12.5 4.5" />
                  </svg>
                  <span>100% Public Access · Instant Download</span>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 11. For candidates */}
        <section className="block flush cand-band-sec" id="for-candidates">
          <div className="cand-band-video-backdrop" aria-hidden="true">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="cand-band-video-el"
            >
              <source src="/videos/hero-water-splash.mp4" type="video/mp4" />
              <source src="/media/splash.mp4" type="video/mp4" />
            </video>
            <div className="cand-band-video-gradient" />
            <div className="cand-band-video-radial-aura" />
          </div>

          <div className="wrap">
            <div className="cand-band">
              <div className="cand-band-content">
                <div className="badge-capsule">
                  <span className="badge-dot" />
                  CANDIDATE PORTAL · 100% CONFIDENTIAL
                </div>
                <h2 className="cand-band-title">
                  Confidential roles with the pay{" "}
                  <span className="serif-accent">shown</span>
                </h2>
                <p className="cand-band-lede">
                  Direct lateral opportunities at leading boutique and mid-size law firms.
                  Always 100% free for candidates. No firm ever sees your name until you say yes.
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
                <Link
                  className="btn-cand-submit"
                  href="/jobs"
                >
                  <span>See open jobs</span>
                  <svg aria-hidden="true" viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
                    <path d="M10.3 3.3a1 1 0 0 1 1.4 0l6 6a1 1 0 0 1 0 1.4l-6 6a1 1 0 1 1-1.4-1.4l4.3-4.3H3a1 1 0 1 1 0-2h11.6l-4.3-4.3a1 1 0 0 1 0-1.4Z" />
                  </svg>
                </Link>
                <p className="cand-band-note">
                  No firm sees your resume or name until you approve
                </p>
                <div className="cand-card-divider" />
                <div className="cand-alt-action">
                  <span>Looking for a discreet career move?</span>
                  <Link
                    href="/upload-resume"
                    className="cand-call-link"
                  >
                    <span>Submit resume confidentially</span>
                    <span className="call-arrow" aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 12. FAQ */}
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
                Simple terms, 90-day replacement guarantee, zero retainers. Explore our complete fee schedule or speak with a founder.
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
                  <span>What does it cost?</span>
                  <span className="faq-toggle-icon" aria-hidden="true" />
                </summary>
                <div className="faq-body">
                  <p>
                    <Mark>23% of the candidate&apos;s compensation</Mark>,
                    invoiced <Mark>on their first day and due in 15 days</Mark>.
                    Nothing upfront and nothing if you do not hire. Non-exclusive
                    contingency agreement.
                  </p>
                </div>
              </details>
              <details>
                <summary>
                  <span>What if the hire leaves early?</span>
                  <span className="faq-toggle-icon" aria-hidden="true" />
                </summary>
                <div className="faq-body">
                  <p>
                    If they leave or are let go within <Mark>90 days</Mark> of
                    starting, we search again and send replacements at no extra fee.
                  </p>
                </div>
              </details>
              <details>
                <summary>
                  <span>Do we have to work only with you?</span>
                  <span className="faq-toggle-icon" aria-hidden="true" />
                </summary>
                <div className="faq-body">
                  <p>
                    No. Keep posting and keep your other recruiters. You owe a fee
                    only for a hire we introduced.
                  </p>
                </div>
              </details>
              <details>
                <summary>
                  <span>How do you keep candidates anonymous?</span>
                  <span className="faq-toggle-icon" aria-hidden="true" />
                </summary>
                <div className="faq-body">
                  <p>
                    Profiles show firm type and size, never names. The full
                    redacted resume goes to you on request, and names follow when
                    both sides agree to meet.
                  </p>
                </div>
              </details>
              <details open>
                <summary>
                  <span>Which seats do you fill?</span>
                  <span className="faq-toggle-icon" aria-hidden="true" />
                </summary>
                <div className="faq-body">
                  <p>
                    Attorneys, paralegals and legal assistants at small and mid-size
                    law firms across the US. Other legal seats can be arranged;
                    ask Justin.
                  </p>
                </div>
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
