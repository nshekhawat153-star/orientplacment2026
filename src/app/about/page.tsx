"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Breadcrumb } from "@/components/Breadcrumb";
import { TrustBar, TrustLine, RatingBadge } from "@/components/Rating";
import { PeopleSection } from "@/components/PeopleSection";
import { ReviewsSection } from "@/components/ReviewCard";
import { CtaBand } from "@/components/CtaBand";
import { Mark } from "@/components/Mark";
import { Icon } from "@/components/icons";
import { orionLine, trust, people, sendingDomains } from "@/data";

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<"firms" | "cands">("firms");

  const justin = people.find((p) => p.id === "justin") || people[0];
  const jon = people.find((p) => p.id === "jon") || people[1];

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <style>{`
        .wall .tabs{margin-bottom:24px}
        .wall .reviews-2 .reviews{grid-template-columns:repeat(2,minmax(0,1fr))}
        .stack-senders{display:grid;gap:14px}
        .contact-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;align-items:stretch}
        .contact-grid .terms-box{display:flex;flex-direction:column}
        .contact-grid .terms-box .foot{margin-top:auto;padding-top:12px}
        .book-card .ico{width:28px;height:28px;color:var(--green);margin-bottom:8px}
        .book-card p{color:var(--ink-2);font-size:.95rem;margin-bottom:14px}
        .never li::before{border:0;width:12px;height:12px;transform:none;top:.38em;background:linear-gradient(45deg,transparent 44%,var(--ink-2) 44%,var(--ink-2) 56%,transparent 56%),linear-gradient(-45deg,transparent 44%,var(--ink-2) 44%,var(--ink-2) 56%,transparent 56%)}
        @media (max-width:860px){.wall .reviews-2 .reviews,.contact-grid{grid-template-columns:1fr}}
        @media (max-width:640px){#p-firms .reviews>.review:nth-child(n+3){display:flex}}
      `}</style>
      <Breadcrumb
        items={[
            { name: "Home", href: "/" },
            { name: "About" },
          ]}
        />

        {/* 1. Hero */}
        <section className="phero about-hero">
          <div className="wrap">
            <div>
              <span className="eyebrow">About Orion Placement</span>
              <h1>A small legal recruiting team you can call</h1>
              <p className="lede" id="orion-line">
                {orionLine}
              </p>
              <div className="hero-act">
                <a
                  className="btn btn-primary btn-lg"
                  id="hero-cal"
                  href={trust.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book 15 minutes with Justin
                </a>
                <Link
                  className="text-link"
                  href="/jobs/estate-planning-attorney/houston-tx"
                >
                  See open jobs
                </Link>
              </div>
              <TrustLine />
            </div>
            <div>
              <p className="mini-h">Who is writing to you</p>
              <div className="stack-senders">
                <div className="sender">
                  <div className="portrait sm">
                    <Image
                      src={justin.photo.startsWith("/") ? justin.photo : `/${justin.photo}`}
                      alt={justin.name}
                      className="portrait-img"
                      width={48}
                      height={48}
                    />
                  </div>
                  <div className="who">
                    <b>{justin.name}</b>, {justin.title} at Orion Placement
                    <p>{justin.note}</p>
                    <p>
                      Direct line: <Mark>{justin.phone}</Mark> ·{" "}
                      <Mark>{justin.email}</Mark>
                    </p>
                    <p className="keep">
                      Orion emails come only from{" "}
                      {sendingDomains.map((d, i) => (
                        <React.Fragment key={d}>
                          {i > 0 && " and "}
                          <Mark>{d}</Mark>
                        </React.Fragment>
                      ))}
                      .
                    </p>
                  </div>
                </div>

                <div className="sender">
                  <div className="portrait sm">
                    <Image
                      src={jon.photo.startsWith("/") ? jon.photo : `/${jon.photo}`}
                      alt={jon.name}
                      className="portrait-img"
                      width={48}
                      height={48}
                    />
                  </div>
                  <div className="who">
                    <b>{jon.name}</b>, {jon.title} at Orion Placement
                    <p>{jon.note}</p>
                    <p>
                      Direct line: <Mark>{jon.phone}</Mark> ·{" "}
                      <Mark>{jon.email}</Mark>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Trust bar */}
        <section className="trust-strip" aria-label="Orion in numbers">
          <div className="wrap">
            <TrustBar />
          </div>
        </section>

        {/* 3. Jon and Justin */}
        <section className="block" id="people">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">Who you deal with</span>
              <h2>Two people do the work</h2>
              <p>
                No call centre and no hand-offs. The person who writes to you is the
                person you talk to.
              </p>
            </div>
            <PeopleSection />
          </div>
        </section>

        {/* 4. How we work */}
        <section className="block alt">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">How we work</span>
              <h2>Both sides say yes before names move</h2>
              <p>
                Firms pay only when they hire someone we introduced. Candidates never pay.
              </p>
            </div>
            <ol className="steps-line">
              <li>
                <span className="when">Firms</span>
                <h3>Justin takes the seat</h3>
                <p>
                  Role, city, pay and must-haves, in a 15-minute call or on the finder.
                </p>
              </li>
              <li>
                <span className="when">Candidates</span>
                <h3>Jon screens every person</h3>
                <p>
                  He reads the resume, checks the bar and asks what they want next.
                </p>
              </li>
              <li>
                <span className="when">Both</span>
                <h3>Names move on a yes</h3>
                <p>
                  A firm sees a name only after the candidate agrees to meet that firm.
                </p>
              </li>
              <li>
                <span className="when">Start date</span>
                <h3>One fee, from the firm</h3>
                <p>
                  Invoiced on the start date, with a <Mark>90-day</Mark> replacement
                  guarantee.
                </p>
              </li>
            </ol>
          </div>
        </section>

        {/* 5. Reviews wall */}
        <section className="block wall" id="reviews">
          <div className="wrap">
            <div className="sec-head row">
              <div>
                <span className="eyebrow">Reviews</span>
                <h2>What firms and candidates say</h2>
                <p>
                  Public Google reviews. Jon is named in <b>47 of our 60</b>.
                </p>
              </div>
              <RatingBadge link />
            </div>
            <div
              className="tabs"
              role="tablist"
              aria-label="Reviews by who wrote them"
              id="rv-tabs"
            >
              <button
                type="button"
                role="tab"
                id="t-firms"
                aria-controls="p-firms"
                aria-selected={activeTab === "firms"}
                className={activeTab === "firms" ? "active" : ""}
                onClick={() => setActiveTab("firms")}
              >
                Law firms
              </button>
              <button
                type="button"
                role="tab"
                id="t-cands"
                aria-controls="p-cands"
                aria-selected={activeTab === "cands"}
                className={activeTab === "cands" ? "active" : ""}
                onClick={() => setActiveTab("cands")}
              >
                Candidates
              </button>
            </div>

            {activeTab === "firms" && (
              <div id="p-firms" role="tabpanel" aria-labelledby="t-firms">
                <ReviewsSection kind="employer" limit={3} />
              </div>
            )}

            {activeTab === "cands" && (
              <div id="p-cands" role="tabpanel" aria-labelledby="t-cands">
                <div className="reviews-2">
                  <ReviewsSection kind="candidate" limit={2} />
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 6. Is this email from Orion? */}
        <section className="block alt" id="email-check">
          <div className="wrap split">
            <div>
              <div className="sec-head">
                <span className="eyebrow">Check an email</span>
                <h2>Is this email from Orion?</h2>
                <p>
                  Orion sends email only from the domains below. Anything else,
                  forward it to us and we confirm the same day.
                </p>
              </div>
              <ul className="nlist domains-list" id="domains">
                {sendingDomains.map((d, i) => (
                  <li key={d}>
                    <div className="row">
                      <span>
                        <Mark>{d}</Mark>
                      </span>
                      <span className="v small">
                        {i === 0 ? "Main domain" : "Second sending domain"}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="small muted" style={{ marginTop: 10 }}>
                Sending domains are sample values until Orion confirms them.
              </p>
              <h3 className="mini-h" style={{ marginTop: 32 }}>
                What a real Orion email never does
              </h3>
              <ul className="ticks never">
                <li>
                  Ask for payment, bank or card details. Firms pay one invoice,{" "}
                  <Mark>on the start date</Mark>.
                </li>
                <li>Name a candidate before you request the full profile.</li>
                <li>Ask a candidate for a fee, a deposit or their login to anything.</li>
                <li>Come from a free email address or a look-alike domain.</li>
              </ul>
            </div>
            <div className="band-card">
              <h3 className="mini-h">How to check in one minute</h3>
              <ol className="timeline">
                <li>
                  <span className="when">1</span>
                  <p>
                    Look at the address after the @. It must match one of the
                    domains listed here exactly.
                  </p>
                </li>
                <li>
                  <span className="when">2</span>
                  <p>
                    Check the signature: Justin or Jon, with the direct line shown
                    on this page.
                  </p>
                </li>
                <li>
                  <span className="when">3</span>
                  <p>
                    Still unsure? Forward it to <Mark>{justin.email}</Mark> and we
                    reply the same business day.
                  </p>
                </li>
              </ol>
            </div>
          </div>
        </section>

        {/* 7. Contact */}
        <section className="block" id="contact">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">Contact</span>
              <h2>Email, call or book a time</h2>
              <p>
                Email is fastest. Calls before or after work can be arranged for
                candidates. Based in {trust.place}.
              </p>
            </div>
            <div className="contact-grid">
              <div className="terms-box">
                <h3>Hiring an attorney or paralegal</h3>
                <dl>
                  <dt>Who</dt>
                  <dd>
                    {justin.name}, <Mark>{justin.title}</Mark>
                  </dd>
                  <dt>For</dt>
                  <dd>Candidates for your seat, terms and agreements</dd>
                  <dt>Email</dt>
                  <dd>
                    <Mark>{justin.email}</Mark>
                  </dd>
                  <dt>Direct line</dt>
                  <dd>
                    <Mark>{justin.phone}</Mark>
                  </dd>
                  <dt>Replies</dt>
                  <dd>
                    <Mark>Within one business day</Mark>
                  </dd>
                </dl>
                <p className="foot">
                  <Link className="link-arrow" href="/find-candidates">
                    Find candidates
                  </Link>
                </p>
              </div>

              <div className="terms-box">
                <h3>Looking for your next role</h3>
                <dl>
                  <dt>Who</dt>
                  <dd>
                    {jon.name}, <Mark>{jon.title}</Mark>
                  </dd>
                  <dt>For</dt>
                  <dd>Confidential calls about roles and pay</dd>
                  <dt>Email</dt>
                  <dd>
                    <Mark>{jon.email}</Mark>
                  </dd>
                  <dt>Direct line</dt>
                  <dd>
                    <Mark>{jon.phone}</Mark>
                  </dd>
                  <dt>Replies</dt>
                  <dd>
                    <Mark>Within one business day</Mark>
                  </dd>
                </dl>
                <p className="foot">
                  <Link className="link-arrow" href="/candidates">
                    How it works for candidates
                  </Link>
                </p>
              </div>

              <div className="terms-box book-card">
                <Icon name="calendar" />
                <h3>Book 15 minutes with Justin</h3>
                <p>
                  A seat, a candidate, our terms, or an email you want to check.
                  Pick a time that suits you.
                </p>
                <p className="foot">
                  <a
                    className="btn btn-ghost"
                    href={trust.calendly}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Pick a time
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 8. CTA band */}
        <CtaBand
          title="Talk to a person before you decide"
          text="Fifteen minutes with Justin, about a seat, a candidate or an email you received. No fee unless you hire."
          button="Book 15 minutes with Justin"
          href={trust.calendly}
          cal={false}
        />
      <div className="mbar">
        <a
          className="btn btn-primary"
          href={trust.calendly}
          target="_blank"
          rel="noopener noreferrer"
        >
          Book 15 minutes with Justin
        </a>
      </div>
    </>
  );
}
