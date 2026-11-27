import React from "react";
import type { Metadata } from "next";
import "./about.css";
import { trust, sendingDomains } from "@/data";
import { PeopleSection } from "@/components/PeopleSection";
import { HomeReviews } from "@/components/HomeReviews";
import { PkHero, PkSection, PkSteps, PkCallCard, PkStats, PkCheck } from "@/components/PageKit";

export const metadata: Metadata = {
  title: "About Orion Placement | Legal Recruiting Team",
  description:
    "Orion Placement is a small legal recruiting team in Fort Lauderdale. Justin and Jon handle every search themselves, for attorneys and paralegals at small and mid-size law firms.",
  alternates: { canonical: "https://www.orionplacement.com/about/" },
};

const STEPS = [
  { t: "Justin takes the seat", d: "Practice focus, billing targets, pay band and firm culture, in a short call with the partner.", tag: "For firms" },
  { t: "Jon screens every candidate", d: "Background, bar standing and career direction are checked before anyone sees a profile.", tag: "For candidates" },
  { t: "Both sides say yes", d: "Neither the firm nor the candidate is named until both agree to an interview.", tag: "Mutual consent" },
  { t: "One fee, on start", d: "Invoiced 15 days after the start date, with a 90-day replacement. Free for candidates.", tag: "Start date" },
];

const NEVER = [
  "Ask a firm for a retainer or a wire transfer",
  "Charge candidates any fee",
  "Share a candidate’s identity without their consent",
  "Email you from Gmail, Yahoo or other public addresses",
];

export default function AboutPage() {
  const jsonLd = [
    {
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
          name: "About",
          item: "https://www.orionplacement.com/about/",
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Orion Placement",
      url: "https://www.orionplacement.com/",
      description:
        "Contingency legal recruiter for small and mid-size US law firms: attorneys, paralegals and legal assistants.",
      email: "justin@orionplacement.com",
      employee: [
        {
          "@type": "Person",
          name: "Justin",
          email: "justin@orionplacement.com",
        },
        {
          "@type": "Person",
          name: "Jon",
          email: "jon@orionplacement.com",
        },
      ],
      knowsAbout: [
        "Legal recruiting",
        "Attorney placement",
        "Paralegal placement",
      ],
      areaServed: { "@type": "Country", name: "United States" },
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PkHero
        eyebrow="About Orion · Boutique legal search"
        title="A small legal recruiting team"
        accent="you can reach directly."
        lead={`Orion Placement is a legal recruiting firm in ${trust.place.split(",")[0]} that has placed attorneys and paralegals with law firms across the US since ${trust.since}.`}
        primary={{ label: "Book 15 min with Justin", href: trust.calendly }}
        secondary={{ label: "See open seats", href: "/jobs" }}
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

      <PkSection
        tone="light"
        id="people"
        kicker="The team"
        title="Two partners handle"
        accent="every search."
        lead="The founders who take your brief are the ones who run it, from the first call to a signed offer."
        className="ab-team"
      >
        <PeopleSection />
      </PkSection>

      <PkSection
        tone="dark"
        kicker="How we work"
        title="Both sides say yes"
        accent="before anyone is named."
        lead="Firms pay only when a hire starts. Candidates never pay anything."
      >
        <PkSteps steps={STEPS} />
      </PkSection>

      <PkSection tone="light" id="email-check" className="ab-verify">
        <div className="ab-verify-grid">
          <div className="pk-head">
            <span className="pk-kicker">
              <span aria-hidden="true" />
              Is it really us?
            </span>
            <h2 className="pk-h2">
              Check an email is <em>really from Orion.</em>
            </h2>
            <p className="pk-sec-lead">
              Real Orion emails come only from the domain below. If anything else reaches you in Orion’s name, forward it
              to Justin before you reply.
            </p>
            <div className="ab-domains">
              {sendingDomains.map((d) => (
                <code key={d}>@{d}</code>
              ))}
            </div>
          </div>
          <div className="ab-never">
            <h3>Orion will never</h3>
            <ul>
              {NEVER.map((n) => (
                <li key={n}>
                  <span aria-hidden="true">×</span>
                  {n}
                </li>
              ))}
            </ul>
            <p>
              <PkCheck /> Unsure? Ask Justin to confirm. He replies within a business hour.
            </p>
          </div>
        </div>
      </PkSection>

      <HomeReviews />

      <PkSection tone="light" id="contact">
        <PkCallCard
          title="Talk to us"
          accentWords="directly."
          text="A 15-minute call about an open seat or a confidential move. No fee unless a match is hired."
          secondary={{ label: "Upload your resume", href: "/upload-resume" }}
        />
      </PkSection>
    </>
  );
}
