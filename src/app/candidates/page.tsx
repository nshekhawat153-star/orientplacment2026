import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { TrustBar, RatingBadge } from "@/components/Rating";
import { ProcessSteps } from "@/components/ProcessSteps";
import { ReviewsSection } from "@/components/ReviewCard";
import { ResumeSheet } from "@/components/ResumeSheet";
import { CtaBand } from "@/components/CtaBand";
import { Mark } from "@/components/Mark";
import { jobs, fmt, trust } from "@/data";

export const metadata: Metadata = {
  title: "Confidential legal jobs with pay bands | Orion Placement",
  description:
    "Confidential attorney and paralegal jobs at small and mid-size law firms, with base pay on every listing. No firm sees your name until you say yes.",
  alternates: {
    canonical: "https://www.orionplacement.com/candidates/",
  },
};

export default function CandidatesPage() {
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
        name: "Candidates",
        item: "https://www.orionplacement.com/candidates/",
      },
    ],
  };

  const CITY = "houston-tx";
  const hou = jobs
    .filter((j) => j.city === CITY)
    .sort((a, b) => b.band[1] - a.band[1]);

  const ep = jobs.filter((j) => j.city === CITY && j.role === "estate-planning-attorney");
  const re = hou.filter((j) => j.role === "real-estate-attorney")[0];
  const pl = hou.filter((j) => j.role === "estate-planning-paralegal")[0];
  const featuredJobs = [ep[0], re, pl].filter(Boolean);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. CINEMATIC WATER SPLASH HERO */}
      <section className="hero-cinematic" aria-labelledby="cand-hero-h1">
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
              <span>CANDIDATE PORTAL · 100% CONFIDENTIAL &amp; FREE</span>
            </div>

            <h1 id="cand-hero-h1" className="hero-display-h1">
              Confidential legal jobs,{" "}
              <span className="hero-accent-serif">with the pay shown.</span>
            </h1>

            <p className="hero-lead-p">
              Direct lateral opportunities at leading boutique and mid-size law firms.
              Always 100% free for candidates. No firm ever sees your name until you say yes.
            </p>

            <div className="hero-actions-group">
              <Link className="btn-hero-primary" href="/upload-resume">
                <span>Upload your resume</span>
                <svg aria-hidden="true" viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
                  <path d="M10.3 3.3a1 1 0 0 1 1.4 0l6 6a1 1 0 0 1 0 1.4l-6 6a1 1 0 1 1-1.4-1.4l4.3-4.3H3a1 1 0 1 1 0-2h11.6l-4.3-4.3a1 1 0 0 1 0-1.4Z" />
                </svg>
              </Link>
              <Link className="btn-hero-secondary" href="/jobs">
                <span>Browse open roles with pay</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="emp-hero-perks">
              <div className="emp-hero-perk-item">
                <span className="perk-check" aria-hidden="true">✓</span>
                <span>100% confidential representation</span>
              </div>
              <div className="emp-hero-perk-item">
                <span className="perk-check" aria-hidden="true">✓</span>
                <span>Exact salary &amp; bonus disclosed upfront</span>
              </div>
              <div className="emp-hero-perk-item">
                <span className="perk-check" aria-hidden="true">✓</span>
                <span>Zero contact with current firm</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trust Bar */}
      <section className="trust-strip" aria-label="Orion for candidates">
        <div className="wrap">
          <TrustBar kind="candidate" />
        </div>
      </section>

      {/* 3. How It Works (Candidate Workflow) */}
      <section className="block emp-process-sec" id="how-it-works">
        <div className="wrap">
          <div className="sec-head-premium">
            <div className="badge-capsule">
              <span className="badge-dot" />
              CONFIDENTIAL 3-STEP PROCESS
            </div>
            <h2 className="sec-title-lg">
              Three steps, and you stay in <span className="serif-accent">complete control</span>
            </h2>
            <p className="who-lede">
              Nothing goes to any firm until you pick it. Jon personally reviews every resume and discusses lateral opportunities directly.
            </p>
          </div>
          <ProcessSteps kind="candidate" />
        </div>
      </section>

      {/* 4. Open Roles with Pay Shown */}
      <section className="block cand-open-roles-sec" id="open-roles">
        <div className="wrap">
          <div className="sec-head-premium sec-head-row">
            <div>
              <div className="badge-capsule">
                <span className="badge-dot" />
                ACTIVE SEARCHES · PAY DISCLOSED
              </div>
              <h2 className="sec-title-lg">
                Roles with base pay on every <span className="serif-accent">card</span>
              </h2>
              <p className="who-lede">
                Boutique and mid-size firms with verified compensation and transparent practice areas.
              </p>
            </div>
            <Link className="btn-emp-primary" href="/jobs" style={{ whiteSpace: "nowrap" }}>
              <span>View all open roles</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="cand-jobs-grid">
            {featuredJobs.map((j) => (
              <article key={j.id} className="cand-job-card">
                <div>
                  <div className="cand-job-card-top">
                    <span className="cand-job-pill">{j.mode === "on-site" ? "On-site" : "Hybrid"}</span>
                    <span className="cand-job-posted">Posted {fmt.date(j.posted)}</span>
                  </div>

                  <h3 className="cand-job-title">
                    <Mark>{j.title}</Mark>
                  </h3>

                  <div className="cand-job-pay">
                    <Mark>{fmt.range(j.band)}</Mark>
                    <span className="cand-job-pay-sub">Base Target</span>
                  </div>

                  <div className="cand-job-specs">
                    <div className="cand-job-spec-row">
                      <span className="cand-job-spec-k">Firm Profile</span>
                      <span className="cand-job-spec-v">{j.firmType}, {j.firmSize}</span>
                    </div>
                    <div className="cand-job-spec-row">
                      <span className="cand-job-spec-k">Practice Focus</span>
                      <span className="cand-job-spec-v">{j.mix}</span>
                    </div>
                    <div className="cand-job-spec-row">
                      <span className="cand-job-spec-k">Location</span>
                      <span className="cand-job-spec-v">{j.area}, Houston</span>
                    </div>
                    <div className="cand-job-spec-row">
                      <span className="cand-job-spec-k">Experience</span>
                      <span className="cand-job-spec-v">{j.years} Years</span>
                    </div>
                  </div>
                </div>

                <Link className="btn-cand-job-cta" href={`/jobs?q=${encodeURIComponent(j.title)}`}>
                  <span>Explore Confidential Opening</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. DARK SECTION: Candidate Privacy Promise ("What a firm sees before your yes") */}
      <section className="cand-promise-dark-sec" id="privacy-promise">
        <div className="wrap">
          <div className="cand-promise-content">
            <div className="badge-capsule">
              <span className="badge-dot" />
              ANONYMITY GUARANTEE · ZERO RISK
            </div>

            <h2 className="sec-title-lg" style={{ color: "#FFFFFF" }}>
              What a firm sees before your <span className="serif-accent" style={{ color: "#60A5FA" }}>yes</span>
            </h2>

            <p className="who-lede" style={{ color: "#94A3B8" }}>
              We never contact your current law firm, partners, or colleagues. Your name, current employer,
              and law school stay 100% hidden until you specifically greenlight an interview.
            </p>

            <div className="cand-promise-pillars">
              <div className="cand-promise-item">
                <span className="cand-promise-icon" aria-hidden="true">✓</span>
                <p className="cand-promise-text">
                  <b>No unsolicited submissions:</b> Your resume and identity are shared only with the specific firms you explicitly choose.
                </p>
              </div>

              <div className="cand-promise-item">
                <span className="cand-promise-icon" aria-hidden="true">✓</span>
                <p className="cand-promise-text">
                  <b>Zero contact with your firm:</b> We never reach out to your managing partner, colleagues, or HR under any circumstance.
                </p>
              </div>

              <div className="cand-promise-item">
                <span className="cand-promise-icon" aria-hidden="true">✓</span>
                <p className="cand-promise-text">
                  <b>Upfront salary disclosure:</b> Every single opportunity includes verified base compensation and bonus structure upfront.
                </p>
              </div>

              <div className="cand-promise-item">
                <span className="cand-promise-icon" aria-hidden="true">✓</span>
                <p className="cand-promise-text">
                  <b>Right to be forgotten:</b> Ask us to delete your resume at any time and we purge all records within 24 hours.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Redacted Resume Sheet */}
          <div className="cand-promise-preview-shell">
            <div style={{ marginBottom: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: "var(--mono)", fontSize: "11px", fontWeight: "700", color: "#1D4ED8", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                REDACTED DOSSIER PREVIEW
              </span>
              <span style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "#059669", fontWeight: "600" }}>
                ● 100% Anonymized
              </span>
            </div>
            <ResumeSheet candidateId="EP-TX-0412" />
          </div>
        </div>
      </section>

      {/* 6. Candidate Reviews */}
      <section className="block" id="reviews">
        <div className="wrap">
          <div className="sec-head-premium sec-head-row">
            <div>
              <div className="badge-capsule">
                <span className="badge-dot" />
                VERIFIED GOOGLE 5.0 RATING
              </div>
              <h2 className="sec-title-lg">
                What candidates <span className="serif-accent">say</span>
              </h2>
              <p className="who-lede">
                Real attorneys and paralegals who made lateral career moves through Orion Placement.
              </p>
            </div>
            <RatingBadge link />
          </div>
          <ReviewsSection kind="candidate" />
        </div>
      </section>

      {/* 7. Candidate FAQ */}
      <section className="block faq-sec" id="faq">
        <div className="wrap split">
          <div className="sec-head-premium sec-head-left faq-head-col">
            <div className="badge-capsule">
              <span className="badge-dot" />
              QUESTIONS &amp; ANSWERS · FOR CANDIDATES
            </div>
            <h2 className="sec-title-lg">
              What candidates ask <span className="serif-accent">first</span>
            </h2>
            <p className="who-lede">
              Confidentiality, compensation transparency, and how representation works.
            </p>
            <div className="faq-side-card">
              <p className="faq-side-note">
                Rather speak confidentially after business hours?
              </p>
              <div className="faq-side-actions">
                <Link href="/upload-resume" className="btn-faq-fees">
                  <span>Upload resume privately</span>
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
                  <span>Schedule confidential call</span>
                </a>
              </div>
              <div className="faq-side-reassurance">
                <span className="reassurance-check" aria-hidden="true">✓</span>
                <span>100% free representation for all candidates</span>
              </div>
            </div>
          </div>

          <div className="faq">
            <details>
              <summary>
                <span>Will my current firm find out?</span>
                <span className="faq-toggle-icon" aria-hidden="true" />
              </summary>
              <div className="faq-body">
                <p>
                  No. We never contact your firm, and <Mark>no employer sees your name or resume</Mark> until
                  you say yes to that specific role. Profiles we share before that show firm type and size only.
                </p>
              </div>
            </details>
            <details>
              <summary>
                <span>Do I pay anything?</span>
                <span className="faq-toggle-icon" aria-hidden="true" />
              </summary>
              <div className="faq-body">
                <p>
                  No. Orion&apos;s fee is paid entirely by the hiring law firm upon your start date.
                  Your compensation offer is <Mark>never reduced</Mark> to cover our contingency fee.
                </p>
              </div>
            </details>
            <details>
              <summary>
                <span>Are the pay bands real?</span>
                <span className="faq-toggle-icon" aria-hidden="true" />
              </summary>
              <div className="faq-body">
                <p>
                  Yes. Each band reflects the verified base range agreed directly with the managing partners.
                  Bonus potential, benefits, and originations are shared on your initial private call with Jon.
                </p>
              </div>
            </details>
            <details>
              <summary>
                <span>What if nothing listed fits me right now?</span>
                <span className="faq-toggle-icon" aria-hidden="true" />
              </summary>
              <div className="faq-body">
                <p>
                  Upload your resume anyway. Over 60% of our lateral placements are made for confidential,
                  unposted mandates. Jon proactively reaches out as matching boutique seats open.
                </p>
              </div>
            </details>
            <details open>
              <summary>
                <span>Can I speak confidentially after work hours?</span>
                <span className="faq-toggle-icon" aria-hidden="true" />
              </summary>
              <div className="faq-body">
                <p>
                  Yes. Calls before 8:00 AM, in the evenings after 6:00 PM, or on weekends can easily be arranged.
                  Simply note your preferred time window when you submit your resume.
                </p>
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* 8. CTA Band */}
      <CtaBand
        kind="candidate"
        title="See the roles that fit you, with the pay"
        button="Upload your resume"
        href="/upload-resume"
      />

      {/* Mobile Sticky Bar */}
      <div className="mbar">
        <Link className="btn btn-primary" href="/upload-resume">
          Upload your resume
        </Link>
      </div>
    </>
  );
}
