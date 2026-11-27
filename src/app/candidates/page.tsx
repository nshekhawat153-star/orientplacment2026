import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import "@/app/jobs/jobs-redesign.css";
import { jobs, trust } from "@/data";
import { HomeReviews } from "@/components/HomeReviews";
import { CandidatePrivacy } from "@/components/CandidatePrivacy";
import { PkHero, PkSection, PkSteps, PkFaq, PkCallCard, PkStats, PkArrow } from "@/components/PageKit";
import { CandidateSeatLinks } from "./CandidateSeatLinks";
import "./candidates.css";

export const metadata: Metadata = {
  title: "Confidential Legal Jobs With the Pay Shown | Orion Placement",
  description:
    "For attorneys and paralegals: lateral seats at boutique and mid-size Texas firms with the pay shown. Free for candidates, and no firm sees your name until you say yes.",
  alternates: { canonical: "https://www.orionplacement.com/candidates/" },
};

const STEPS = [
  {
    t: "Send your resume privately",
    d: "Upload or paste it. Your identity is hidden behind an anonymous profile.",
    tag: "Day 0",
  },
  {
    t: "Review seats with the pay",
    d: "A short private call. Every seat comes with base pay, bonus structure and billable targets.",
    tag: "Within 48 hours",
  },
  {
    t: "Meet firms on your terms",
    d: "You’re introduced only to the firms you pick. Free for you, start to finish.",
    tag: "When you say yes",
  },
];

const FAQ = [
  {
    q: "Will my current firm find out?",
    a: "No. Orion never contacts your firm, and no employer sees your name or resume until you say yes to that specific role. Before that, firms see firm type, practice mix and seniority only.",
  },
  {
    q: "Do I pay anything?",
    a: "No. The hiring firm pays Orion when you start. Your offer is never reduced to cover the fee.",
  },
  {
    q: "Are the salary bands real?",
    a: "Yes. Each band is the base range agreed with the firm’s partners. Bonus, benefits and origination are covered on your private call.",
  },
  {
    q: "What if nothing listed fits me right now?",
    a: "Upload your resume anyway. Many seats are filled before they are posted, and Jon reaches out as matching seats open.",
  },
  {
    q: "Can I talk after work hours?",
    a: "Yes. Early mornings, evenings or weekends. Just note your preferred time when you send your resume.",
  },
];

export default function CandidatesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.orionplacement.com/" },
      { "@type": "ListItem", position: 2, name: "Candidates", item: "https://www.orionplacement.com/candidates/" },
    ],
  };

  const newest = [...jobs].sort((a, b) => b.posted.localeCompare(a.posted)).slice(0, 3);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PkHero
        eyebrow="For candidates · Free and confidential"
        title="Confidential legal jobs,"
        accent="with the pay shown."
        lead="Lateral seats at boutique and mid-size Texas firms. Free for candidates, and no firm sees your name until you say yes."
        primary={{ label: "Upload your resume", href: "/upload-resume" }}
        secondary={{ label: "Browse open seats", href: "/jobs" }}
      >
        <PkStats
          items={[
            { v: trust.rating, k: `On Google, ${trust.reviews} reviews` },
            { v: `${trust.jonNamed} of ${trust.reviews}`, k: "Reviews name Jon, who screens every candidate" },
            { v: "$0", k: "Cost to candidates, always" },
            { v: trust.since, k: `Recruiting since, based in ${trust.place.split(",")[0]}` },
          ]}
        />
      </PkHero>

      <PkSection
        tone="light"
        id="how-it-works"
        kicker="How it works"
        title="Three steps, and you stay"
        accent="in control."
        lead="Nothing goes to a firm until you give the green light. Jon reads every resume himself."
      >
        <PkSteps steps={STEPS} />

        <div className="cd-seats" id="open-roles">
          <div className="cd-seats-head">
            <h3>Open now, with the pay</h3>
            <Link href="/jobs">
              All {jobs.length} seats <PkArrow size={14} />
            </Link>
          </div>
          <CandidateSeatLinks jobs={newest} />
        </div>
      </PkSection>

      <PkSection
        tone="dark"
        id="privacy-promise"
        className="cd-privacy"
        kicker="Your privacy"
        title="What a firm sees"
        accent="before you say yes."
        lead="Firms see an anonymous summary. Your identity stays with Orion until you approve a specific firm."
      >
        <CandidatePrivacy />
      </PkSection>

      {/* continues the same dark band: privacy, then what candidates say */}
      <div className="cd-reviews">
        <HomeReviews initialTab="candidates" />
      </div>

      <PkSection tone="light" id="faq">
        <div className="pk-split">
          <div className="pk-head">
            <span className="pk-kicker">
              <span aria-hidden="true" />
              Questions
            </span>
            <h2 className="pk-h2">
              What candidates <em>ask first.</em>
            </h2>
            <p className="pk-sec-lead">
              Want to know your number first? <Link href="/salary-check">Run the free salary check</Link>.
            </p>
          </div>
          <PkFaq items={FAQ} />
        </div>
        <div style={{ marginTop: 64 }}>
          <PkCallCard
            title="See the seats that fit you,"
            accentWords="with the pay."
            text="Upload your resume privately, or talk it through with Justin first."
            secondary={{ label: "Upload your resume", href: "/upload-resume" }}
          />
        </div>
      </PkSection>

      <div className="mbar">
        <Link className="btn btn-primary" href="/upload-resume">
          Upload resume
        </Link>
      </div>
    </>
  );
}
