import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ResumeSheet } from "@/components/ResumeSheet";
import { TrustBar, TrustLine, RatingBadge, CalendlyLink } from "@/components/Rating";
import { ProcessSteps } from "@/components/ProcessSteps";
import { TermsTiles } from "@/components/TermsTiles";
import { ResourceCards } from "@/components/ResourceCards";
import { ReviewsSection } from "@/components/ReviewCard";
import { CtaBand } from "@/components/CtaBand";
import { Mark } from "@/components/Mark";
import { orionLine } from "@/data";

export const metadata: Metadata = {
  title: "Hire attorneys and paralegals for your firm | Orion",
  description:
    "For small and mid-size law firms: see screened, anonymised candidates first, check pay against the market, and pay a fee only if you hire.",
  alternates: {
    canonical: "https://www.orionplacement.com/employers/",
  },
};

export default function EmployersPage() {
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
        name: "Employers",
        item: "https://www.orionplacement.com/employers/",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <style>{`
        .ways{list-style:none;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px}
        .ways>li{background:var(--card);border:1px solid var(--line);border-radius:var(--r-lg);padding:18px 18px 24px;display:grid;gap:8px;align-content:start}
        .ways .ill{min-height:190px;margin-bottom:10px}
        .ways h3{font-size:23px;padding:0 6px}
        .ways p{font-size:.94rem;color:var(--ink-2);padding:0 6px}
        .ways .link-arrow{font-weight:500;text-decoration:none;padding:4px 6px 0;justify-self:start;min-height:44px;display:inline-flex;align-items:center}
        .ways .when{font:500 11.5px var(--mono);letter-spacing:.1em;text-transform:uppercase;color:var(--accent);padding:0 6px}
        .mk-lines{display:grid;gap:5px}
        .mk-lines i{display:block;height:6px;border-radius:3px;background:var(--rule-2)}
        .mk-lines i.on{background:var(--green-soft);box-shadow:inset 3px 0 0 var(--green)}
        .emp-hero .sheet{margin-left:auto}
        .emp-hero>.wrap{align-items:start}
        .emp-hero h1{max-width:20ch;font-size:clamp(2.1rem,4.2vw,3.2rem)}
        .emp-hero .sheet .sm-drop{display:none}
        .emp-hero .wrap>div:first-child{padding-top:28px}
        @media (max-width:860px){.ways{grid-template-columns:1fr}}
        @media (max-width:640px){.ways .ill{display:none}.ways>li{padding:16px 14px 12px}.emp-hero .sheet .sx:nth-child(n+4){display:none}}
      `}</style>
        <Breadcrumb
          items={[
            { name: "Home", href: "/" },
            { name: "Employers" },
          ]}
        />

        {/* 1. Hero */}
        <section className="phero emp-hero">
          <div className="wrap">
            <div>
              <span className="eyebrow">For law firms hiring</span>
              <h1>Hire attorneys and paralegals, pay only if you do</h1>
              <p className="lede">
                See screened, anonymised candidates for your open seat today. No
                retainer, and one fee only when your hire starts.
              </p>
              <div className="hero-act">
                <Link className="btn btn-primary btn-lg" href="/find-candidates">
                  Find candidates
                </Link>
                <CalendlyLink
                  label="Book 15 minutes with Justin"
                  className="text-link"
                />
              </div>
              <TrustLine />
              <p className="hero-sub" id="orion-line">
                {orionLine}
              </p>
            </div>
            <ResumeSheet candidateId="EP-TX-0412" />
          </div>
        </section>

        {/* 2. Trust bar */}
        <section className="trust-strip" aria-label="Orion in numbers">
          <div className="wrap">
            <TrustBar />
          </div>
        </section>

        {/* 3. Three ways to start */}
        <section className="block" id="start">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">Three ways to start</span>
              <h2>Start the way that suits you</h2>
              <p>Each one shows you candidates or answers before it asks for anything.</p>
            </div>
            <ul className="ways">
              <li>
                <div className="ill">
                  <div className="mock" aria-hidden="true">
                    <div className="mk-h">
                      Your seat <em>2 minutes</em>
                    </div>
                    <div className="mk-f">
                      <i>Role</i>
                      <span>Estate planning attorney</span>
                    </div>
                    <div className="mk-f">
                      <i>City</i>
                      <span>Houston, TX</span>
                    </div>
                    <div className="mk-chips">
                      <span className="on">Texas bar</span>
                      <span className="on">Probate</span>
                      <span>Spanish</span>
                    </div>
                  </div>
                </div>
                <span className="when">About 2 minutes</span>
                <h3>Describe the seat</h3>
                <p>
                  Role, city, years and must-haves. Matching candidates appear as
                  you go, and the top three are open at once.
                </p>
                <Link className="link-arrow" href="/find-candidates">
                  Describe your seat
                </Link>
              </li>
              <li>
                <div className="ill">
                  <div className="mock" aria-hidden="true">
                    <div className="mk-h">
                      Your posting <em>6 of 6 read</em>
                    </div>
                    <div className="mk-lines">
                      <i style={{ width: "70%" }} />
                      <i className="on" style={{ width: "92%" }} />
                      <i style={{ width: "84%" }} />
                      <i className="on" style={{ width: "60%" }} />
                      <i style={{ width: "76%" }} />
                    </div>
                    <div className="mk-chips">
                      <span className="on">Houston</span>
                      <span className="on">4–7 years</span>
                      <span className="on">$120k–$140k</span>
                    </div>
                  </div>
                </div>
                <span className="when">About 1 minute</span>
                <h3>Paste your posting</h3>
                <p>
                  We read the role, city, years and pay, check the pay against the
                  market and show who fits.
                </p>
                <Link className="link-arrow" href="/submit-job">
                  Paste your posting
                </Link>
              </li>
              <li>
                <div className="ill">
                  <div className="mock" aria-hidden="true">
                    <div className="mk-h">
                      Call with Justin <em>15 min</em>
                    </div>
                    <div className="mk-days">
                      <span>Mon</span>
                      <span className="on">
                        Tue<b>11:30</b>
                      </span>
                      <span>Wed</span>
                      <span>Thu</span>
                      <span>Fri</span>
                    </div>
                    <div className="mk-ok">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M5 12.5l4.5 4.5L19 7.5" />
                      </svg>
                      The seat, the pay, who is free now
                    </div>
                  </div>
                </div>
                <span className="when">15 minutes</span>
                <h3>Talk to Justin</h3>
                <p>
                  Talk the seat through with the person who will run it. He tells
                  you who is available now and what they expect.
                </p>
                <CalendlyLink
                  label="Book 15 minutes with Justin"
                  className="link-arrow"
                />
              </li>
            </ul>
          </div>
        </section>

        {/* 4. How it works */}
        <section className="block alt">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">How it works</span>
              <h2>From open seat to shortlist in days</h2>
              <p>
                You describe the seat once. We send screened people who fit it,
                and you pay only when one of them starts.
              </p>
            </div>
            <ProcessSteps />
          </div>
        </section>

        {/* 5. Terms */}
        <section className="block" id="terms">
          <div className="wrap">
            <div className="sec-head row">
              <div>
                <span className="eyebrow">What it costs</span>
                <h2>One fee, and only if you hire</h2>
                <p>The same terms for every firm. Nothing to sign until you want to meet someone.</p>
              </div>
              <Link className="more link-arrow" href="/fees">
                Fees and a calculator
              </Link>
            </div>
            <TermsTiles />
          </div>
        </section>

        {/* 6. Free tools */}
        <section className="block alt">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">Free hiring tools</span>
              <h2>Run the hire with or without us</h2>
              <p>
                Pay data, a ready posting, where to post and the fee on your
                salary. No sign-up to use any of it.
              </p>
            </div>
            <ResourceCards set="employer" />
          </div>
        </section>

        {/* 7. Employer reviews */}
        <section className="block" id="reviews">
          <div className="wrap">
            <div className="sec-head row">
              <div>
                <span className="eyebrow">Reviews</span>
                <h2>What law firms say</h2>
                <p>
                  Jon is named in <b>47 of our 60</b> Google reviews.
                </p>
              </div>
              <RatingBadge link />
            </div>
            <ReviewsSection kind="employer" />
          </div>
        </section>

        {/* 8. For candidates */}
        <section className="block flush">
          <div className="wrap">
            <div className="cand-band">
              <div>
                <span className="eyebrow">For attorneys and paralegals</span>
                <h2>Looking for a role yourself?</h2>
                <p>
                  Confidential roles at small and mid-size firms, with the pay
                  shown. Free for candidates.
                </p>
              </div>
              <Link className="btn btn-ghost" href="/candidates">
                See the candidate side
              </Link>
            </div>
          </div>
        </section>

        {/* 9. FAQ */}
        <section className="block alt">
          <div className="wrap split">
            <div className="sec-head">
              <span className="eyebrow">Questions</span>
              <h2>What firms ask first</h2>
              <p>
                More on the <Link href="/fees">fees and guarantee</Link> page,
                or ask Justin directly.
              </p>
            </div>
            <div className="faq">
              <details>
                <summary>Do we pay anything before we hire?</summary>
                <p>
                  No. There is no retainer and no fee to see profiles. The fee is
                  due only if you hire someone we introduced, and the invoice
                  goes out on their start date.
                </p>
              </details>
              <details>
                <summary>Can we keep posting the job and using other recruiters?</summary>
                <p>
                  Yes. We ask for no exclusivity. Keep your posting live and
                  work with anyone else you like.
                </p>
              </details>
              <details>
                <summary>Where do your candidates come from?</summary>
                <p>
                  Attorneys and paralegals who have spoken with Jon in recent
                  weeks and agreed to be shown anonymously. For a new seat we
                  also search our wider network.
                </p>
              </details>
              <details>
                <summary>What if the hire leaves in the first months?</summary>
                <p>
                  If they leave or are let go within <Mark>90 days</Mark> of the
                  start date, we search again and send replacements at no extra
                  fee.
                </p>
              </details>
              <details>
                <summary>Do you fill paralegal and legal assistant seats too?</summary>
                <p>
                  Yes. Attorneys, paralegals and legal assistants, for small and
                  mid-size law firms. Other seats can be arranged.
                </p>
              </details>
            </div>
          </div>
        </section>

        {/* 10. CTA band */}
        <CtaBand
          title="See candidates for your open seat"
          button="Find candidates"
          href="/find-candidates"
        />
      <div className="mbar">
        <Link className="btn btn-primary" href="/find-candidates">
          Find candidates
        </Link>
      </div>
    </>
  );
}
