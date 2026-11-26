"use client";

import React, { useState } from "react";
import "./home-reviews.css";
import { trust } from "@/data";
import { GMark } from "./icons";

/* ------------------------------------------------------------------
   Homepage reviews. Public Google reviews only, taken from
   src/data (reviews) and the client-approved hire-attorneys page
   (bylines, plus the Duncan Bernardo and Josh reviews). Quotes are verbatim
   apart from obvious typos; "…" marks a cut, later sentences may be dropped.
   Left out on purpose: the "hire a great engineer" review (IT roles
   are no longer promoted), and one quote whose reviewer name differs
   between the two sources.
   ------------------------------------------------------------------ */

interface HomeReview {
  id: string;
  name: string;
  byline: string;
  quote: string;
  /** Phrases drawn out in white */
  marks: string[];
}

const FEATURED: HomeReview = {
  id: "travis-bowen",
  name: "Travis Bowen",
  byline: "Managing Partner · Bowen Law Group",
  quote:
    "Justin Sofman and Jon Missirlian have been relentless in helping us with the staffing needs of our Firm. They have successfully placed 2 new team members with us and we will use them for all of our future staffing needs.",
  marks: ["relentless", "successfully placed 2 new team members", "all of our future staffing needs"],
};

const FIRMS: HomeReview[] = [
  {
    id: "brett-zimmerman",
    name: "Brett Zimmerman",
    byline: "Managing Attorney · Zimmerman Law Firm",
    quote:
      "Jon did an amazing job finding me a perfect candidate for my company. He’s above and beyond with his follow up with candidates. I will be using Orion Placement and Jon for all my future hires!",
    marks: ["finding me a perfect candidate", "all my future hires"],
  },
  {
    id: "lainie-james",
    name: "Lainie James",
    byline: "Law firm client",
    quote:
      "Jon Missirlian has been a trusted recruiter for MS&A for quite some time, consistently delivering high-quality candidates. … I know I can always rely on him to find top-tier talent.",
    marks: ["consistently delivering high-quality candidates"],
  },
  {
    id: "duncan-bernardo",
    name: "Duncan Bernardo",
    byline: "Employer client",
    quote:
      "Working with Justin and the Orion team was a fantastic experience. They were consistent, responsive, and did what they said they would.",
    marks: ["did what they said they would"],
  },
  {
    id: "josh",
    name: "Josh",
    byline: "Employer client",
    quote:
      "Their team is professional, attentive, and truly understands how to match the right talent with the right opportunities.",
    marks: ["match the right talent with the right opportunities"],
  },
  {
    id: "daffner-law",
    name: "Daffner Law",
    byline: "Law firm client",
    quote: "Very attentive and does an excellent job - highly recommended!",
    marks: ["highly recommended!"],
  },
];

const CANDIDATES: HomeReview[] = [
  {
    id: "n-brown",
    name: "N Brown",
    byline: "Placed by Orion",
    quote:
      "They set great expectations and delivered for me within less than a week. This is perhaps the best result I have ever had while working through a placement agency. Their process is simple and effective; I felt like I had someone on the inside working for me.",
    marks: ["delivered for me within less than a week", "someone on the inside working for me"],
  },
  {
    id: "rafael-jimenez",
    name: "Rafael Jimenez",
    byline: "Paralegal · Placed by Orion",
    quote:
      "Justin at Orion was able to find me a perfect paralegal position within two weeks of us getting in touch. I am forever grateful to Justin as the position and employer are exactly what I was looking for.",
    marks: ["within two weeks"],
  },
  {
    id: "derek-letellier",
    name: "Derek Letellier",
    byline: "Placed by Orion",
    quote:
      "Jon did a phenomenal job connecting me to a fantastic opportunity. From the beginning, he was incredibly responsive, kept the process flowing, answered all the questions I had, and helped me secure my next role.",
    marks: ["incredibly responsive"],
  },
  {
    id: "vera-massey",
    name: "Vera Massey",
    byline: "Placed by Orion",
    quote:
      "Jon was incredibly professional, responsive, and genuinely cared about helping me. He guided me through every step of the process and made the transition smooth and stress-free.",
    marks: ["genuinely cared about helping me"],
  },
];

function initials(name: string) {
  const parts = name.split(/\s+/).filter(Boolean);
  return (parts[0][0] + (parts[1]?.[0] || parts[0][1] || "")).toUpperCase();
}

function Marked({ text, marks }: { text: string; marks: string[] }) {
  if (!marks.length) return <>{text}</>;
  const esc = marks.map((m) => m.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const parts = text.split(new RegExp(`(${esc.join("|")})`, "g"));
  return (
    <>
      {parts.map((p, i) => (marks.includes(p) ? <mark key={i}>{p}</mark> : <React.Fragment key={i}>{p}</React.Fragment>))}
    </>
  );
}

const StarRow = ({ size = 14 }: { size?: number }) => (
  <span className="hrv-stars" role="img" aria-label="5 out of 5 stars">
    {[0, 1, 2, 3, 4].map((i) => (
      <svg key={i} viewBox="0 0 20 20" width={size} height={size} aria-hidden="true">
        <path d="M10 1.6l2.6 5.3 5.8.8-4.2 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.6 7.7l5.8-.8L10 1.6z" fill="currentColor" />
      </svg>
    ))}
  </span>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 20 20" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 10h12M11 5l5 5-5 5" />
  </svg>
);

function Attribution({ r }: { r: HomeReview }) {
  return (
    <figcaption className="hrv-attr">
      <span className="hrv-avatar" aria-hidden="true">
        {initials(r.name)}
      </span>
      <span className="hrv-who">
        <span className="hrv-name">{r.name}</span>
        <span className="hrv-byline">{r.byline}</span>
      </span>
      <span className="hrv-g" title="Google review">
        <GMark />
      </span>
    </figcaption>
  );
}

export function HomeReviews() {
  const [tab, setTab] = useState<"firms" | "candidates">("firms");
  const list = tab === "firms" ? FIRMS : CANDIDATES;

  return (
    <section className="hrv" id="reviews" aria-labelledby="hrv-h">
      <div className="hrv-wrap">
        {/* Header: title left, the score right */}
        <div className="hrv-head">
          <div>
            <p className="hrv-eyebrow">
              <span className="hrv-eyebrow-dot" aria-hidden="true" />
              Google reviews
            </p>
            <h2 id="hrv-h" className="hrv-h2">
              What firms and candidates <span>say.</span>
            </h2>
          </div>

          <a className="hrv-score" href={trust.google} target="_blank" rel="noopener noreferrer">
            <span className="hrv-score-num">{trust.rating}</span>
            <span className="hrv-score-side">
              <StarRow size={16} />
              <span className="hrv-score-count">
                <GMark /> {trust.reviews} Google reviews
              </span>
            </span>
            <span className="hrv-sr"> (opens Google)</span>
          </a>
        </div>

        {/* One review, large */}
        <figure className="hrv-featured">
          <span className="hrv-quote-mark" aria-hidden="true">
            &ldquo;
          </span>
          <blockquote className="hrv-featured-q">
            <Marked text={FEATURED.quote} marks={FEATURED.marks} />
          </blockquote>
          <Attribution r={FEATURED} />
        </figure>

        {/* Firms / candidates */}
        <div className="hrv-tabs" role="tablist" aria-label="Show reviews from">
          <span className={`hrv-tab-pill${tab === "candidates" ? " is-right" : ""}`} aria-hidden="true" />
          <button
            type="button"
            role="tab"
            id="hrv-tab-firms"
            aria-selected={tab === "firms"}
            aria-controls="hrv-panel"
            className="hrv-tab"
            onClick={() => setTab("firms")}
          >
            Law firms <span>{FIRMS.length + 1}</span>
          </button>
          <button
            type="button"
            role="tab"
            id="hrv-tab-candidates"
            aria-selected={tab === "candidates"}
            aria-controls="hrv-panel"
            className="hrv-tab"
            onClick={() => setTab("candidates")}
          >
            Candidates <span>{CANDIDATES.length}</span>
          </button>
        </div>

        <div
          id="hrv-panel"
          role="tabpanel"
          aria-labelledby={tab === "firms" ? "hrv-tab-firms" : "hrv-tab-candidates"}
          className={`hrv-grid count-${list.length}`}
          key={tab}
        >
          {list.map((r) => (
            <figure key={r.id} className="hrv-card">
              <StarRow />
              <blockquote className="hrv-card-q">
                <Marked text={r.quote} marks={r.marks} />
              </blockquote>
              <Attribution r={r} />
            </figure>
          ))}
        </div>

        <div className="hrv-foot">
          <p className="hrv-foot-note">
            Public Google reviews. Jon is named in {trust.jonNamed} of {trust.reviews}.
          </p>
          <a className="hrv-all" href={trust.google} target="_blank" rel="noopener noreferrer">
            Read all {trust.reviews} on Google <ArrowIcon />
          </a>
        </div>
      </div>
    </section>
  );
}
