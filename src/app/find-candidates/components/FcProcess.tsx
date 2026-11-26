import React from "react";
import Link from "next/link";
import Image from "next/image";
import "./fc-redesign.css";
import { people, trust } from "@/data";

/* Lower part of /find-candidates: how it works + terms (dark),
   then a light closing call card. Replaces LowerSections on this page. */

const STEPS = [
  {
    n: "01",
    t: "Request a profile",
    d: "Pick the candidates you like. It’s free and the candidate stays anonymous until you ask.",
    tag: "No fee to look",
  },
  {
    n: "02",
    t: "Get the full resume",
    d: "Name, resume and Justin’s screening notes land in your inbox, usually within the hour.",
    tag: "About 1 hour",
  },
  {
    n: "03",
    t: "Interview directly",
    d: "Justin lines up the calls with your partners. You talk to the candidate yourself.",
    tag: "We schedule it",
  },
  {
    n: "04",
    t: "Pay only on start",
    d: "One contingency fee, invoiced on the start date, Net 15. Covered by a 90-day replacement.",
    tag: "Net 15",
  },
];

const TERMS = [
  { k: "$0", v: "Upfront or retainer" },
  { k: "Non-exclusive", v: "Keep your other channels" },
  { k: "90 days", v: "Free replacement" },
  { k: "Net 15", v: "Invoiced on start date" },
];

const Arrow = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export function FcProcess() {
  const justin = people.find((p) => p.id === "justin") || people[0];

  return (
    <>
      <section className="fcp" aria-labelledby="fcp-h">
        <div className="fcp-wrap">
          <div className="fcp-head">
            <span className="fcp-eyebrow">
              <span aria-hidden="true" />
              How it works
            </span>
            <h2 id="fcp-h" className="fcp-h2">
              From profile to start date, <em>in four steps.</em>
            </h2>
            <p className="fcp-lead">No retainer, no lock-in. You only pay when someone starts.</p>
          </div>

          <ol className="fcp-steps">
            {STEPS.map((s) => (
              <li key={s.n} className="fcp-step">
                <span className="fcp-step-n">{s.n}</span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
                <span className="fcp-step-tag">{s.tag}</span>
              </li>
            ))}
          </ol>

          <div className="fcp-terms">
            <ul>
              {TERMS.map((t) => (
                <li key={t.k}>
                  <strong>{t.k}</strong>
                  <span>{t.v}</span>
                </li>
              ))}
            </ul>
            <Link href="/fees" className="fcp-terms-link">
              Fees &amp; terms <Arrow />
            </Link>
          </div>
        </div>
      </section>

      <section className="fcc" aria-labelledby="fcc-h">
        <div className="fcc-wrap">
          <div className="fcc-card">
            <div className="fcc-person">
              <Image src={justin.photo} alt={justin.name} width={88} height={88} className="fcc-photo" />
              <div>
                <strong>{justin.name}</strong>
                <span>{justin.title}</span>
              </div>
            </div>
            <div className="fcc-copy">
              <h2 id="fcc-h">
                Rather talk the seat <em>through first?</em>
              </h2>
              <p>Fifteen minutes with Justin. He’ll tell you who’s realistic for the seat and the pay.</p>
            </div>
            <div className="fcc-actions">
              <a href={trust.calendly} target="_blank" rel="noopener noreferrer" className="fcc-btn is-primary">
                Book 15 min with Justin <Arrow />
              </a>
              <Link href="/submit-job" className="fcc-btn is-ghost">
                Submit a job
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
