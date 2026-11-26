import React from "react";
import Link from "next/link";
import "./home-final-cta.css";
import { trust } from "@/data";

/* ------------------------------------------------------------------
   Homepage closing section: one door for law firms, one for candidates.
   Replaces the two separate water-video bands ("Post your open seat today,
   free." and "Confidential roles with the pay shown.").
   Background matches the hero. Facts follow the client questionnaire:
   no upfront fee, non-exclusive, first candidate usually within a week,
   90-day replacement, direct hire only; always free for candidates.
   ------------------------------------------------------------------ */

const ArrowIcon = () => (
  <svg viewBox="0 0 20 20" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 10h12M11 5l5 5-5 5" />
  </svg>
);

const Check = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="3.5 8.5 6.5 11.5 12.5 4.5" />
  </svg>
);

export function HomeFinalCta() {
  return (
    <section className="hfc" id="post-a-job" aria-labelledby="hfc-h">
      <div className="hfc-wrap">
        <header className="hfc-head">
          <p className="hfc-eyebrow">
            <span aria-hidden="true" />
            Get started
          </p>
          <h2 id="hfc-h" className="hfc-h2">
            Hiring, or ready for a move? <em>Start free today.</em>
          </h2>
        </header>

        <div className="hfc-grid">
          {/* Law firms */}
          <article className="hfc-door is-firm">
            <p className="hfc-k">For law firms</p>
            <h3 className="hfc-title">Post your open seat, free.</h3>
            <p className="hfc-copy">
              Describe the seat in two minutes. Nothing to pay unless you hire someone we introduced.
            </p>
            <ul className="hfc-facts">
              <li>
                <Check /> No retainer, no exclusivity
              </li>
              <li>
                <Check /> First candidates usually within a week
              </li>
              <li>
                <Check /> 90-day replacement guarantee
              </li>
            </ul>
            <div className="hfc-actions">
              <Link href="/submit-job" className="hfc-btn is-primary">
                Submit a job, free <ArrowIcon />
              </Link>
              <Link href="/find-candidates" className="hfc-btn is-ghost">
                See candidates
              </Link>
            </div>
            <a className="hfc-aside" href={trust.calendly} target="_blank" rel="noopener noreferrer">
              Prefer to talk first? Book 15 min with Justin <ArrowIcon />
            </a>
          </article>

          {/* Candidates */}
          <article className="hfc-door is-cand" id="for-candidates">
            <p className="hfc-k">For attorneys &amp; paralegals</p>
            <h3 className="hfc-title">Confidential roles, pay shown.</h3>
            <p className="hfc-copy">
              Always free for candidates. No firm sees your name until you say yes.
            </p>
            <ul className="hfc-facts">
              <li>
                <Check /> Pay range on every role
              </li>
              <li>
                <Check /> Permanent, direct-hire positions
              </li>
              <li>
                <Check /> Your resume stays private until you approve
              </li>
            </ul>
            <div className="hfc-actions">
              <Link href="/jobs" className="hfc-btn is-light">
                See open jobs <ArrowIcon />
              </Link>
              <Link href="/upload-resume" className="hfc-btn is-ghost">
                Send resume privately
              </Link>
            </div>
            <p className="hfc-aside is-text">Free for candidates. Always.</p>
          </article>
        </div>
      </div>
    </section>
  );
}
