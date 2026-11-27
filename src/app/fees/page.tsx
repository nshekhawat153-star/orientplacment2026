import React from "react";
import type { Metadata } from "next";
import "./fees.css";
import { terms, trust, recruiterQuestions } from "@/data";
import { PkHero, PkSection, PkCards, PkFaq, PkCallCard, PkStats } from "@/components/PageKit";
import { CopyQuestions, TermsEmail } from "./FeesClientParts";

export const metadata: Metadata = {
  title: "Fees and Guarantee: One Fee, Only If You Hire | Orion Placement",
  description:
    "Orion Placement charges one contingency fee, only if you hire. No retainer, no exclusivity, invoiced on the start date with Net 15 terms and a 90-day replacement guarantee.",
  alternates: { canonical: "https://www.orionplacement.com/fees" },
};

const GUARANTEE = [
  {
    meta: "The fee",
    title: "One fee, on hire",
    text: "Set out in a one-page agreement. Nothing is due unless you hire someone Orion introduced.",
  },
  {
    meta: "Replacement",
    title: "90 calendar days",
    text: "If the hire leaves or is let go in the first 90 days, Orion reopens the search and sends replacements at no extra fee.",
  },
  {
    meta: "Freedom",
    title: "No retainer, no lock-in",
    text: "No upfront cash and no exclusivity. Keep your referrals, job posts and other recruiters.",
  },
  {
    meta: "Payment",
    title: "Net 15 from the start date",
    text: "The invoice goes out on the hire’s first day and is due in 15 days. The guarantee applies once it is paid.",
  },
];

const FAQ = [
  {
    q: "Do we sign an agreement before we see candidates?",
    a: "No. You sign nothing until you want to interview someone Orion introduced. Looking at profiles commits you to nothing.",
  },
  {
    q: "Do you offer a refund instead of replacement?",
    a: "The standard term is a priority replacement search. Refund terms can be discussed for multi-hire or larger searches; ask Justin before you start.",
  },
  {
    q: "What counts as the guarantee period?",
    a: "90 calendar days from the hire’s first day in your office, covering resignation or being let go for any reason other than firm redundancy or practice group closure.",
  },
];

export default function FeesPage() {
  const qs = recruiterQuestions.filter((q) => q.term).slice(0, 5);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.orionplacement.com/" },
      { "@type": "ListItem", position: 2, name: "Employers", item: "https://www.orionplacement.com/employers/" },
      { "@type": "ListItem", position: 3, name: "Fees", item: "https://www.orionplacement.com/fees/" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PkHero
        eyebrow="Fees and guarantee · Contingency only"
        title="One fee,"
        accent="only if you hire."
        lead="No retainer, no exclusivity and no hidden costs. You pay one contingency fee when your hire starts, covered by a 90-day replacement."
        primary={{ label: "Book 15 min with Justin", href: trust.calendly }}
        secondary={{ label: "See candidates", href: "/find-candidates" }}
      >
        <PkStats
          items={[
            { v: "On hire", k: "One contingency fee" },
            { v: "90 days", k: "Free replacement" },
            { v: "$0", k: "Upfront or retainer" },
            { v: "Net 15", k: "From the start date" },
          ]}
        />
      </PkHero>

      <PkSection
        tone="light"
        kicker="The terms"
        title="Everything you agree to,"
        accent="in plain English."
        lead="The same simple terms for every firm. Nothing to sign until you want to interview someone."
      >
        <PkCards items={GUARANTEE} cols={4} />
      </PkSection>

      <PkSection
        tone="dark"
        id="questions"
        kicker="Before you sign with anyone"
        title="Questions to ask"
        accent="any recruiter."
        lead="The fee is only half the quote. Ask these before signing an agreement, with anyone."
      >
        <div className="fe-table">
          <div className="fe-table-head">
            <span>Ask</span>
            <span>Why it matters</span>
            <span>Orion’s answer</span>
          </div>
          {qs.map((q) => (
            <div key={q.q} className="fe-row">
              <p className="fe-q">{q.q}</p>
              <p className="fe-why">{q.why}</p>
              <p className="fe-us">{(terms as Record<string, string | number>)[q.term!]}</p>
            </div>
          ))}
        </div>
        <div className="fe-table-foot">
          <CopyQuestions questions={qs.map((q) => q.q)} />
        </div>
      </PkSection>

      <PkSection tone="light" id="terms-writing">
        <div className="fe-terms">
          <div>
            <div className="pk-head">
              <span className="pk-kicker">
                <span aria-hidden="true" />
                In writing
              </span>
              <h2 className="pk-h2">
                Our terms on <em>one page.</em>
              </h2>
              <p className="pk-sec-lead">
                No retainer, one fee, 90-day replacement. Ready to forward to a managing partner.
              </p>
            </div>
            <PkFaq items={FAQ} />
          </div>
          <div className="pk-form fe-form">
            <TermsEmail />
          </div>
        </div>
        <div style={{ marginTop: 64 }}>
          <PkCallCard
            title="Ready to see who you’d be"
            accentWords="paying for?"
            text="Screened attorneys and paralegals matched to your seat. No retainer, and no fee unless you hire."
            secondary={{ label: "Submit a job", href: "/submit-job" }}
          />
        </div>
      </PkSection>

    </>
  );
}
