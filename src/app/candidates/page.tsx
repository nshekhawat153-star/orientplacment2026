import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumb } from "@/components/Breadcrumb";
import { TrustBar, TrustLine, RatingBadge } from "@/components/Rating";
import { ProcessSteps } from "@/components/ProcessSteps";
import { ReviewsSection } from "@/components/ReviewCard";
import { ResumeSheet } from "@/components/ResumeSheet";
import { GateForm } from "@/components/GateForm";
import { CtaBand } from "@/components/CtaBand";
import { Mark } from "@/components/Mark";
import { Icon } from "@/components/icons";
import { jobs, orionLine, fmt, plural } from "@/data";

export const metadata: Metadata = {
  title: "Confidential legal jobs with pay bands | Orion Placement",
  description:
    "Confidential attorney and paralegal jobs at small and mid-size law firms, with base pay on every listing. No firm sees your name until you say yes.",
  alternates: {
    canonical: "https://www.orionplacement.com/candidates/",
  },
};

export default function CandidatesPage() {
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
        name: "Candidates",
        item: "https://www.orionplacement.com/candidates/",
      },
    ],
  };

  const CITY = "houston-tx";
  const hou = jobs
    .filter((j) => j.city === CITY)
    .sort((a, b) => b.band[1] - a.band[1]);

  const ep = jobs.filter((j) => j.city === CITY && j.role === "estate-planning-attorney");
  const re = hou.filter((j) => j.role === "real-estate-attorney")[0];
  const pl = hou.filter((j) => j.role === "estate-planning-paralegal")[0];
  const featuredJobs = [ep[0], re, pl].filter(Boolean);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <style>{`
        .open-card .nlist{border-top:0}
        .open-card .nlist .row{align-items:flex-start;padding:12px 0}
        .open-card .nlist .row>span:first-child{min-width:0}
        .open-card .nlist .t{display:block;font-weight:600}
        .open-card .nlist .small{display:block;margin-top:2px}
        .open-card .v{font-family:var(--serif);font-size:1.12rem;color:var(--ink)}
        .card-foot{display:flex;align-items:center;gap:8px;font-size:.86rem;color:var(--ink-2);padding:12px 0 6px}
        .card-foot .ico{width:18px;height:18px;color:var(--green);flex-shrink:0}
        .reviews-2 .reviews{grid-template-columns:repeat(2,minmax(0,1fr))}
        @media (max-width:860px){.reviews-2 .reviews{grid-template-columns:1fr}}
        @media (max-width:640px){.open-card .nlist li:nth-child(n+4){display:none}#jobs-now .cards>.job:nth-child(n+3){display:none}}
      `}</style>
        <Breadcrumb
          items={[
            { name: "Home", href: "/" },
            { name: "Candidates" },
          ]}
        />

        {/* 1. Hero */}
        <section className="phero">
          <div className="wrap">
            <div>
              <span className="eyebrow">For attorneys and paralegals</span>
              <h1>Confidential legal jobs with the pay shown</h1>
              <p className="lede">
                Roles at small and mid-size firms. Free for candidates. No firm
                sees your name until you say yes.
              </p>
              <div className="hero-act">
                <Link className="btn btn-primary btn-lg" href="/upload-resume">
                  Upload your resume
                </Link>
                <Link
                  className="text-link"
                  href="/jobs"
                >
                  See open jobs
                </Link>
              </div>
              <TrustLine kind="candidate" />
              <p className="hero-sub" id="orion-line">
                {orionLine}
              </p>
            </div>
            <div className="band-card open-card">
              <h2 className="mini-h" id="open-h">
                Open now in Houston · <Mark>{hou.length} {plural(hou.length, "role")}</Mark>
              </h2>
              <ul className="nlist" id="open-list">
                {hou.slice(0, 5).map((j) => (
                  <li key={j.id}>
                    <div className="row">
                      <span>
                        <span className="t">
                          <Mark>{j.title}</Mark>
                        </span>
                        <span className="small muted">
                          <Mark>
                            {j.firmType}, {j.area}
                          </Mark>{" "}
                          · {j.mode === "on-site" ? "On-site" : "Hybrid"}
                        </span>
                      </span>
                      <span className="v">
                        <Mark>{fmt.range(j.band)}</Mark>
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="card-foot" id="open-foot">
                <Icon name="lock" />
                <span>Employers named on your first call, before anything is sent</span>
              </p>
            </div>
          </div>
        </section>

        {/* 2. Trust bar */}
        <section className="trust-strip" aria-label="Orion for candidates">
          <div className="wrap">
            <TrustBar kind="candidate" />
          </div>
        </section>

        {/* 3. How it works */}
        <section className="block alt">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">How it works</span>
              <h2>Three steps, and you stay in control</h2>
              <p>Nothing goes to a firm until you pick it. Jon reads every resume himself.</p>
            </div>
            <ProcessSteps kind="candidate" />
          </div>
        </section>

        {/* 4. Open roles */}
        <section className="block">
          <div className="wrap">
            <div className="sec-head row">
              <div>
                <span className="eyebrow">Open now</span>
                <h2>Roles with the base pay on every card</h2>
                <p>Employers stay confidential until your first call with Jon.</p>
              </div>
              <Link
                className="more link-arrow hide-sm"
                href="/jobs"
              >
                All open jobs
              </Link>
            </div>
            <div id="jobs-now">
              <div className="cards">
                {featuredJobs.map((j) => (
                  <article key={j.id} className="job" data-id={j.id}>
                    <div className="job-top">
                      <span>Confidential employer</span>
                      <span>
                        Posted <Mark>{fmt.date(j.posted)}</Mark>
                      </span>
                    </div>
                    <h3>
                      <Mark>{j.title}</Mark>
                    </h3>
                    <div className="pay">
                      <Mark>{fmt.range(j.band)}</Mark>{" "}
                      <span className="small muted">base</span>
                    </div>
                    <dl className="facts">
                      <div>
                        <dt>Firm</dt>
                        <dd>
                          <Mark>
                            {j.firmType}, {j.firmSize}
                          </Mark>
                        </dd>
                      </div>
                      <div>
                        <dt>Practice</dt>
                        <dd>
                          <Mark>{j.mix}</Mark>
                        </dd>
                      </div>
                      <div>
                        <dt>Where</dt>
                        <dd>
                          <Mark>{j.area}, Houston</Mark>
                        </dd>
                      </div>
                      <div>
                        <dt>Works</dt>
                        <dd>
                          <Mark>{j.mode === "on-site" ? "On-site" : "Hybrid"}</Mark>
                        </dd>
                      </div>
                      <div>
                        <dt>Experience</dt>
                        <dd>
                          <Mark>{j.years}</Mark>
                        </dd>
                      </div>
                    </dl>
                    <div className="actions">
                      <Link
                        href="/upload-resume"
                        className="btn btn-line btn-sm"
                      >
                        Apply confidentially
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <div className="sec-foot">
              <Link
                className="btn btn-ghost"
                href="/jobs"
              >
                See all open jobs
              </Link>
              <span className="small muted">
                Filter by on-site, hybrid and years of practice.
              </span>
            </div>
          </div>
        </section>

        {/* 5. Reviews */}
        <section className="block alt" id="reviews">
          <div className="wrap">
            <div className="sec-head row">
              <div>
                <span className="eyebrow">Reviews</span>
                <h2>What candidates say</h2>
                <p>
                  Jon is named in <b>47 of our 60</b> Google reviews.
                </p>
              </div>
              <RatingBadge link />
            </div>
            <div className="reviews-2">
              <ReviewsSection kind="candidate" limit={2} />
            </div>
          </div>
        </section>

        {/* 6. Three tools */}
        <section className="block">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">Free tools</span>
              <h2>Look around before you talk to anyone</h2>
              <p>No sign-up and no name needed for any of them.</p>
            </div>
            <div className="rcards">
              <div>
                <Link href="/upload-resume" className="rcard">
                  <Icon name="upload" />
                  <h3>Upload your resume</h3>
                  <p>We read it into a short profile and match it to open roles.</p>
                  <p className="rget">
                    <b>You get</b> Matching roles with pay, in two minutes
                  </p>
                  <span className="rgo">
                    Open <Icon name="arrow" />
                  </span>
                </Link>
              </div>
              <div>
                <Link href="/salary-check" className="rcard">
                  <Icon name="chart" />
                  <h3>Check your salary</h3>
                  <p>Your base against what firms in your city pay at your level.</p>
                  <p className="rget">
                    <b>You get</b> Your place in the band, and roles that pay more
                  </p>
                  <span className="rgo">
                    Open <Icon name="arrow" />
                  </span>
                </Link>
              </div>
              <div>
                <Link href="/best-law-firms/houston-tx" className="rcard">
                  <Icon name="scale" />
                  <h3>Best firms to work for</h3>
                  <p>Houston firms judged on five tests, with pay and reviews.</p>
                  <p className="rget">
                    <b>You get</b> A shortlist of firms worth a call
                  </p>
                  <span className="rgo">
                    Open <Icon name="arrow" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Confidentiality promises */}
        <section className="block alt" id="privacy">
          <div className="wrap split">
            <div>
              <div className="sec-head">
                <span className="eyebrow">Confidential</span>
                <h2>Your firm never hears about it</h2>
                <p>Four promises we keep for every candidate, every time.</p>
              </div>
              <ul className="ticks promise-ticks">
                <li>Your name and resume go to no firm until you say yes to that one role.</li>
                <li>We never contact your current firm or anyone who works there.</li>
                <li>Every role shows its base pay before you apply.</li>
                <li>Ask us to delete your resume and we do it the same day.</li>
              </ul>
            </div>
            <div>
              <p className="mini-h">What a firm sees before your yes</p>
              <div id="sheet">
                <ResumeSheet candidateId="EP-TX-0412" />
              </div>
            </div>
          </div>
        </section>

        {/* 8. Job alerts */}
        <section className="block" id="alerts-block">
          <div className="wrap split">
            <div>
              <div className="sec-head">
                <span className="eyebrow">Job alerts</span>
                <h2>Get new roles by email</h2>
                <p>Many roles are filled before they are posted anywhere. Hear about them first.</p>
              </div>
              <ul className="ticks">
                <li>Each new role with its base range</li>
                <li>Firm type, practice mix, on-site or hybrid</li>
                <li>One email a week at most. Unsubscribe in one click</li>
              </ul>
            </div>
            <div id="alerts">
              <GateForm
                id="cand-alerts"
                eyebrow="Job alerts"
                title="Email me new roles"
                audience="candidate"
                button="Email me new roles"
                bullets={["Roles that match your field and city", "The base range on every one"]}
                fine="Use a personal email, not your work one. No firm sees your name until you say yes."
                steps={[
                  ["Now", "Alerts are on. Nothing has gone to any firm.", true],
                  ["Within one business day", "Jon emails to ask your field, city and the base you would move for."],
                  ["As roles open", "Each new role with its pay band. Reply to ask who the firm is."],
                  ["Any time", "Unsubscribe in one click and your email is deleted."],
                ]}
              />
            </div>
          </div>
        </section>

        {/* 9. FAQ */}
        <section className="block alt">
          <div className="wrap split">
            <div className="sec-head">
              <span className="eyebrow">Questions</span>
              <h2>What candidates ask first</h2>
              <p>
                Rather talk it through? <Link href="/about#contact">Reach Jon directly</Link>.
              </p>
            </div>
            <div className="faq">
              <details>
                <summary>Will my current firm find out?</summary>
                <p>
                  No. We never contact your firm, and no employer sees your name
                  or resume until you say yes to that specific role. Profiles we
                  share before that show firm type and size only.
                </p>
              </details>
              <details>
                <summary>Do I pay anything?</summary>
                <p>
                  No. The hiring firm pays Orion when you start. Your offer is
                  not reduced to cover it.
                </p>
              </details>
              <details>
                <summary>Are the pay bands real?</summary>
                <p>
                  Each band is the base range the firm agreed with us for that
                  role. Bonus and benefits are on top and are shared on the first
                  call.
                </p>
              </details>
              <details>
                <summary>What if nothing listed fits me?</summary>
                <p>
                  Upload your resume anyway. Many roles are filled before they
                  are posted, and Jon matches you to new ones as they open.
                </p>
              </details>
              <details>
                <summary>Can I talk after work hours?</summary>
                <p>
                  Yes. Calls before or after work, or by email only, can be
                  arranged. Say what suits you when you send your resume.
                </p>
              </details>
            </div>
          </div>
        </section>

        {/* 10. CTA band */}
        <CtaBand
          kind="candidate"
          title="See the roles that fit you, with the pay"
          button="Upload your resume"
          href="/upload-resume"
        />
      <div className="mbar">
        <Link className="btn btn-primary" href="/upload-resume">
          Upload your resume
        </Link>
      </div>
    </>
  );
}
