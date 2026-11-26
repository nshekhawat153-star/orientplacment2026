import React from "react";
import Link from "next/link";
import "./home-process-terms.css";
import { terms, trust } from "@/data";

/* ------------------------------------------------------------------
   Homepage: how a search runs + what it costs, in one light section.
   Every claim maps to the client questionnaire:
   - reply within 1 hour in business hours (Q29)
   - first qualified candidate typically within a week (Q14)
   - 100,000+ pool, active and passive candidates (Q23)
   - submission = resume, notes, why they fit, pay expectations (Q24)
   - contingency fee, no upfront fee, non-exclusive (Q19, Q21)
   The fee percentage is NOT shown on the site (client's request).
   - invoiced on the first day, due 15 days later (Q21)
   - 90-day replacement guarantee (Q20)
   ------------------------------------------------------------------ */

const STEPS = [
  {
    n: "01",
    when: "Day one",
    title: "Brief Justin",
    body: "Fifteen minutes on the seat: practice, market, years and pay. Justin replies within an hour during business hours.",
  },
  {
    n: "02",
    when: "Usually within a week",
    title: "Get a screened shortlist",
    body: `We reach active and passive candidates across a ${trust.activePool} legal pool. Each profile comes with the resume, our notes, why they fit and their pay expectations.`,
  },
  {
    n: "03",
    when: "When they start",
    title: "Hire, then pay",
    body: "Interview who you choose. The fee is invoiced on your hire's first day and due 15 days later.",
  },
];

const TERMS_ROWS: Array<[string, string]> = [
  ["Exclusivity", "Not required"],
  ["Invoiced", "On the start date"],
  ["Payment", "Net 15"],
  ["Guarantee", `${terms.guaranteeDays}-day replacement`],
];

const ArrowIcon = () => (
  <svg viewBox="0 0 20 20" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 10h12M11 5l5 5-5 5" />
  </svg>
);

export function HomeProcessTerms() {
  return (
    <section className="hpt" id="how-it-works" aria-labelledby="hpt-h">
      <div className="hpt-wrap">
        <header className="hpt-head">
          <p className="hpt-eyebrow">
            <span aria-hidden="true" />
            How it works
          </p>
          <h2 id="hpt-h" className="hpt-h2">
            Three steps. One fee, <em>only if you hire.</em>
          </h2>
          <p className="hpt-lede">No retainer and no exclusivity. Keep recruiting your own way while we search.</p>
        </header>

        <div className="hpt-body">
          {/* How a search runs */}
          <ol className="hpt-steps">
            {STEPS.map((s) => (
              <li key={s.n} className="hpt-step">
                <span className="hpt-num" aria-hidden="true">
                  {s.n}
                </span>
                <div className="hpt-step-text">
                  <p className="hpt-when">{s.when}</p>
                  <h3 className="hpt-step-title">{s.title}</h3>
                  <p className="hpt-step-body">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>

          {/* What it costs */}
          <aside className="hpt-terms" id="terms" aria-labelledby="hpt-terms-h">
            <p className="hpt-terms-k" id="hpt-terms-h">
              The terms
            </p>
            <p className="hpt-fee">
              <span className="hpt-fee-num">$0</span>
              <span className="hpt-fee-text">
                upfront. One contingency fee,
                <br />
                only if you hire someone we introduced.
              </span>
            </p>

            <dl className="hpt-rows">
              {TERMS_ROWS.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>

            <div className="hpt-actions">
              <Link href="/find-candidates" className="hpt-btn">
                See candidates for your seat <ArrowIcon />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
