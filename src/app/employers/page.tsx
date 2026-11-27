import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { trust } from "@/data";
import { HomeReviews } from "@/components/HomeReviews";
import { PkHero, PkSection, PkSteps, PkTerms, PkFaq, PkCards, PkCallCard, PkStats, PkArrow } from "@/components/PageKit";

export const metadata: Metadata = {
  title: "Hire attorneys and paralegals for your firm | Orion",
  description:
    "For small and mid-size law firms: see screened, anonymised candidates first, check pay against the market, and pay a fee only if you hire.",
  alternates: {
    canonical: "https://www.orionplacement.com/employers/",
  },
};

const WAYS = [
  {
    meta: "2 minutes",
    title: "Find candidates now",
    text: "Describe the seat in one sentence and see screened, available profiles with their pay.",
    href: "/find-candidates",
  },
  {
    meta: "Free to post",
    title: "Submit a job",
    text: "Paste your posting. Justin checks the pay against the market and sends matched profiles.",
    href: "/submit-job",
  },
  {
    meta: "15 minutes",
    title: "Talk to Justin",
    text: "Talk the seat through with the founder who runs it: who’s realistic, at what pay, and how fast.",
    href: trust.calendly,
  },
];

const STEPS = [
  { t: "Tell us the seat", d: "Role, market, years, pay and must-haves. Two minutes online or fifteen with Justin.", tag: "Day 0" },
  { t: "See the shortlist", d: "Screened candidates with pay, bar standing and notice period. You pick who to interview.", tag: "Days 1–5" },
  { t: "Hire, then pay", d: "One contingency fee, invoiced on the start date and due in 15 days. 90-day replacement.", tag: "Start date" },
];

const TERMS = [
  { k: "$0", v: "Upfront or retainer" },
  { k: "Non-exclusive", v: "Keep your other recruiters" },
  { k: "90 days", v: "Free replacement" },
  { k: "Net 15", v: "Invoiced on start date" },
];

const TOOLS = [
  { meta: "Compensation", title: "Salary guides", text: "Base pay bands by role, city and years of experience.", href: "/salaries/estate-planning-attorney/houston-tx" },
  { meta: "Interview kit", title: "Hiring kits", text: "Job descriptions, interview questions and scoring rubrics.", href: "/hiring-kit/estate-planning-attorney" },
  { meta: "Job boards", title: "Where to post a job", text: "Legal boards compared on cost, reach and first applicant.", href: "/where-to-post/houston-tx" },
  { meta: "Talent sources", title: "Where to hire from", text: "Which firms and courts your next hire is likely coming from.", href: "/where-to-hire/houston-tx" },
];

const FAQ = [
  {
    q: "Do we pay anything before we hire?",
    a: "No. There is no retainer and no fee to see profiles. The contingency fee is due only if you hire someone Orion introduced, invoiced on their first day and payable within 15 days.",
  },
  {
    q: "Can we keep posting the job and using other recruiters?",
    a: "Yes. Orion is non-exclusive. Keep your posting live and work with anyone else. You owe a fee only for a candidate Orion introduced.",
  },
  {
    q: "Where do your candidates come from?",
    a: "Attorneys and paralegals who have spoken with Jon in recent weeks and agreed to be shown anonymously. For a new seat, Orion also reaches into its wider boutique network.",
  },
  {
    q: "What if the hire leaves in the first months?",
    a: "If they leave or are let go within 90 days of starting, Orion searches again and sends replacements at no extra fee.",
  },
  {
    q: "Do you fill paralegal and legal assistant seats too?",
    a: (
      <>
        Yes. Orion places attorneys, paralegals and legal assistants for small and mid-size firms across the US. For other
        legal staff, <a href={trust.calendly}>ask Justin</a>.
      </>
    ),
  },
];

export default function EmployersPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.orionplacement.com/" },
      { "@type": "ListItem", position: 2, name: "Employers", item: "https://www.orionplacement.com/employers/" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PkHero
        eyebrow="For law firms · Fee only if you hire"
        title="Hire attorneys and paralegals,"
        accent="pay only when you hire."
        lead="Screened lateral attorneys and legal staff, sent straight to your inbox. No upfront fee, non-exclusive, and a 90-day replacement. You pay 15 days after your hire starts."
        primary={{ label: "Find candidates for my seat", href: "/find-candidates" }}
        secondary={{ label: "Book 15 min with Justin", href: trust.calendly }}
      >
        <PkStats
          items={[
            { v: trust.rating, k: `On Google, ${trust.reviews} reviews` },
            { v: trust.last12MonthsPlacements, k: "Hires in the past 12 months" },
            { v: trust.activePool, k: "Legal talent pool" },
            { v: "90 days", k: "Replacement guarantee" },
          ]}
        />
      </PkHero>

      <PkSection tone="light" id="start" kicker="Three ways to start" title="Start the way that" accent="suits your firm.">
        <PkCards items={WAYS} />
      </PkSection>

      <PkSection
        tone="dark"
        id="how-it-works"
        kicker="How it works"
        title="From open seat to shortlist"
        accent="in days."
        lead="Describe the seat once. Orion sends screened candidates who match. You only pay when your hire starts."
      >
        <PkSteps steps={STEPS} />
        <PkTerms items={TERMS} link={{ label: "Fees & terms", href: "/fees" }} />
      </PkSection>

      <PkSection
        tone="light"
        id="tools"
        kicker="Free hiring tools"
        title="Run the hire with or"
        accent="without us."
        lead="Market pay data, ready-to-use job descriptions and posting channel comparisons. No sign-up."
      >
        <PkCards items={TOOLS} cols={4} />
      </PkSection>

      <HomeReviews />

      <PkSection tone="light" id="faq">
        <div className="pk-split">
          <div className="pk-head">
            <span className="pk-kicker">
              <span aria-hidden="true" />
              Questions
            </span>
            <h2 className="pk-h2">
              What firms <em>ask first.</em>
            </h2>
            <p className="pk-sec-lead">
              Simple terms and a 90-day replacement. <Link href="/fees">See the full fee schedule</Link>.
            </p>
            <p className="pk-sec-lead emp-cand-note">
              Looking for a role yourself?{" "}
              <Link href="/candidates">
                See the candidate side <PkArrow size={14} />
              </Link>
            </p>
          </div>
          <PkFaq items={FAQ} />
        </div>
        <div style={{ marginTop: 64 }}>
          <PkCallCard
            title="See candidates for"
            accentWords="your open seat."
            text="Fifteen minutes with Justin, or go straight to screened profiles."
            secondary={{ label: "Find candidates", href: "/find-candidates" }}
          />
        </div>
      </PkSection>

      {/* Mobile sticky bar (kept) */}
      <div className="mbar">
        <Link className="btn btn-primary" href="/find-candidates">
          Find candidates
        </Link>
      </div>
    </>
  );
}
