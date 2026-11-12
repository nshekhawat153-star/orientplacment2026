"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { TrustLine } from "@/components/Rating";
import { TermsTiles } from "@/components/TermsTiles";
import { GateForm } from "@/components/GateForm";
import { CtaBand } from "@/components/CtaBand";
import { Mark } from "@/components/Mark";
import { terms, recruiterQuestions, fmt } from "@/data";

export default function FeesPage() {
  const [baseSalary, setBaseSalary] = useState<number>(130000);
  const [startDate, setStartDate] = useState<string>("");
  const [otherRate, setOtherRate] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    const today = new Date();
    today.setDate(today.getDate() + 30);
    setStartDate(today.toISOString().slice(0, 10));
  }, []);

  const addDays = (dateStr: string, days: number): string => {
    const d = new Date(dateStr + "T12:00:00");
    if (isNaN(d.getTime())) return "";
    d.setDate(d.getDate() + days);
    return d.toISOString().slice(0, 10);
  };

  const okDate =
    /^\d{4}-\d{2}-\d{2}$/.test(startDate) &&
    !isNaN(new Date(startDate + "T12:00:00").getTime());

  const fee = baseSalary * terms.feeRate;
  const dueDate = okDate ? addDays(startDate, 30) : "";
  const guaranteeDate = okDate ? addDays(startDate, terms.guaranteeDays) : "";

  const otherNum = parseFloat(otherRate);
  const otherFee = !isNaN(otherNum) && otherNum > 0 ? (baseSalary * otherNum) / 100 : 0;
  const diff = otherFee - fee;

  const handleCopyQuestions = () => {
    const qs = recruiterQuestions.filter((q) => q.term).slice(0, 5);
    const text =
      "Questions to ask a legal recruiter\n" +
      qs.map((q, i) => `${i + 1}. ${q.q}`).join("\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const qs = recruiterQuestions.filter((q) => q.term).slice(0, 5);

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
      {
        "@type": "ListItem",
        position: 3,
        name: "Fees",
        item: "https://www.orionplacement.com/fees/",
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
        .fee-hero .tiles4{grid-template-columns:repeat(2,minmax(0,1fr))}
        .calc-grid{display:grid;grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);gap:28px;align-items:start}
        .calc-grid .tool-form{position:static}
        .calc-out{background:var(--card);border:1px solid var(--line);border-top:3px solid var(--ink);border-radius:6px 6px 14px 14px;padding:22px 24px}
        .calc-out .stats{grid-template-columns:1fr 1fr;border-bottom:0;border-top:0}
        .calc-out .stat:nth-child(3){border-left:0;padding-left:0}
        .calc-out .stat:nth-child(n+3){border-top:1px solid var(--line)}
        .calc-out .verdict{margin-top:16px}
        @media (max-width:860px){.calc-grid{grid-template-columns:1fr}}
        @media (max-width:640px){
          .fee-hero .tt p{display:none}
          .fee-hero .tt{padding:14px 14px 12px}
          .fee-hero .tt .ico{display:none}
          .calc-out{padding:16px}
          .calc-out .stat b{font-size:1.4rem}
        }
      `}</style>
      <Breadcrumb
        items={[
            { name: "Home", href: "/" },
            { name: "Employers", href: "/employers" },
            { name: "Fees" },
          ]}
        />

        {/* 1. Hero */}
        <section className="phero fee-hero">
          <div className="wrap">
            <div>
              <span className="eyebrow">Fees and guarantee</span>
              <h1>One fee, only if you hire</h1>
              <p className="lede">
                Nothing upfront and no exclusivity. You pay one invoice when the
                person we introduced starts, and we replace them if it does not
                work out.
              </p>
              <div className="hero-act">
                <Link className="btn btn-primary btn-lg" href="/find-candidates">
                  Find candidates
                </Link>
                <a className="text-link" href="#calc">
                  Work out your fee
                </a>
              </div>
              <TrustLine />
            </div>
            <TermsTiles />
          </div>
        </section>

        {/* 2. Fee calculator */}
        <section className="block alt" id="calc">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">Fee calculator</span>
              <h2>Your fee in ten seconds</h2>
              <p>
                Enter the base salary and a start date. See the fee, when it is
                due and how long the guarantee runs.
              </p>
            </div>
            <div className="calc-grid">
              <form
                className="tool-form"
                id="calc-form"
                noValidate
                aria-label="Fee calculator"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="field">
                  <label htmlFor="f-base">
                    First-year base salary <span className="hint">($ per year)</span>
                  </label>
                  <div className="money">
                    <input
                      id="f-base"
                      type="number"
                      inputMode="numeric"
                      min="20000"
                      step="1000"
                      value={baseSalary || ""}
                      onChange={(e) => setBaseSalary(Number(e.target.value))}
                    />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="f-start">Start date</label>
                  <input
                    id="f-start"
                    type="text"
                    inputMode="numeric"
                    placeholder="YYYY-MM-DD"
                    pattern="\d{4}-\d{2}-\d{2}"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div className="field">
                  <label htmlFor="f-other">
                    Compare with another quote{" "}
                    <span className="hint">(% of salary, optional)</span>
                  </label>
                  <input
                    id="f-other"
                    type="number"
                    inputMode="decimal"
                    min="0"
                    max="50"
                    placeholder="e.g. 25"
                    value={otherRate}
                    onChange={(e) => setOtherRate(e.target.value)}
                  />
                </div>
              </form>

              <div className="calc-out" id="calc-out">
                {baseSalary >= 10000 ? (
                  <>
                    <div className="stats">
                      <div className="stat">
                        <b>
                          <Mark>{fmt.money(fee)}</Mark>
                        </b>
                        <span>fee on {fmt.money(baseSalary)} base</span>
                      </div>
                      <div className="stat">
                        <b>{okDate ? <Mark>{fmt.date(startDate)}</Mark> : "–"}</b>
                        <span>invoice date (start date)</span>
                      </div>
                      <div className="stat">
                        <b>{okDate ? <Mark>{fmt.date(dueDate)}</Mark> : "–"}</b>
                        <span>payment due</span>
                      </div>
                      <div className="stat">
                        <b>{okDate ? <Mark>{fmt.date(guaranteeDate)}</Mark> : "–"}</b>
                        <span>replacement guarantee runs to</span>
                      </div>
                    </div>
                    <div className="verdict" id="calc-compare">
                      {otherFee > 0 ? (
                        <>
                          <b>
                            At {otherNum}% the fee would be {fmt.money(otherFee)}.
                          </b>
                          <br />
                          {Math.abs(diff) < 1 ? (
                            "The same as ours."
                          ) : diff > 0 ? (
                            <>
                              <Mark>{fmt.money(diff)}</Mark> more than ours.
                            </>
                          ) : (
                            <>
                              <Mark>{fmt.money(-diff)}</Mark> less than ours.
                              Check what that quote&apos;s guarantee and payment
                              timing cover.
                            </>
                          )}
                        </>
                      ) : (
                        <>
                          <b>
                            If the hire leaves before{" "}
                            {okDate ? fmt.date(guaranteeDate) : "the guarantee ends"},
                          </b>{" "}
                          we search again and send replacements at no extra fee.
                        </>
                      )}
                      {!okDate && (
                        <>
                          <br />
                          <span className="err-msg">
                            Enter the start date as YYYY-MM-DD, for example 2026-12-01.
                          </span>
                        </>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="stat">
                    <b>–</b>
                    <span>Enter a base salary</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 3. The 90-day replacement guarantee */}
        <section className="block">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">Guarantee</span>
              <h2>The 90-day replacement guarantee</h2>
              <p>What happens if a hire does not work out, in plain English.</p>
            </div>
            <div className="terms-box">
              <dl>
                <dt>Length</dt>
                <dd>
                  <Mark>{terms.guaranteeDays} calendar days</Mark> from their
                  first day in the office.
                </dd>
                <dt>Remedy</dt>
                <dd>
                  We reopen the search, prioritize it above other mandates and send
                  replacements until the seat is filled. No additional fee is
                  charged.
                </dd>
                <dt>Scope</dt>
                <dd>
                  Covers the hire resigning or being let go for any reason other
                  than firm redundancy, practice closure or material change to
                  the role described.
                </dd>
                <dt>Payment requirement</dt>
                <dd>
                  The original invoice was paid within our 30-day term.
                </dd>
              </dl>
            </div>
          </div>
        </section>

        {/* 4. Questions to ask any recruiter */}
        <section className="block alt" id="questions">
          <div className="wrap">
            <div className="sec-head row">
              <div>
                <span className="eyebrow">Recruiter comparison</span>
                <h2>Questions to ask any recruiter</h2>
                <p>The fee is only half the quote. Ask these five questions first.</p>
              </div>
              <button
                type="button"
                className="btn btn-line btn-sm"
                id="copy-q"
                onClick={handleCopyQuestions}
              >
                {copied ? "Copied" : "Copy the questions"}
              </button>
            </div>
            <div className="table-wrap">
              <table className="data">
                <thead>
                  <tr>
                    <th>Ask</th>
                    <th>Why it matters</th>
                    <th className="us">Orion&apos;s answer</th>
                  </tr>
                </thead>
                <tbody id="q-rows">
                  {qs.map((q, idx) => (
                    <tr key={idx}>
                      <td data-label="Ask">
                        <b>{q.q}</b>
                      </td>
                      <td data-label="Why it matters">{q.why}</td>
                      <td className="us" data-label="Orion's answer">
                        <span className="tick">
                          <Mark>{(terms as any)[q.term!]}</Mark>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 5. Terms in writing */}
        <section className="block" id="terms-writing">
          <div className="wrap split">
            <div>
              <div className="sec-head">
                <span className="eyebrow">In writing</span>
                <h2>Our terms on one page</h2>
                <p>
                  No retainer, one fee, 90-day replacement and the five recruiter
                  questions answered. Ready to forward to a partner.
                </p>
              </div>
              <div className="faq">
                <details>
                  <summary>Do we sign an agreement before we see candidates?</summary>
                  <p>
                    No. You sign nothing until you want to interview someone we
                    introduced. Looking at profiles commits you to nothing.
                  </p>
                </details>
                <details>
                  <summary>Do you offer a refund instead of replacement?</summary>
                  <p>
                    Our standard term is a replacement search. Cash-refund terms
                    can be agreed for multi-hire arrangements; ask Justin before
                    we start.
                  </p>
                </details>
              </div>
            </div>
            <div className="form-side" id="terms-gate">
              <GateForm
                id="terms-gate-form"
                eyebrow="In writing"
                title="Email me the one-page terms"
                button="Send me the terms"
                bullets={[
                  "The fee, guarantee and payment terms on one page",
                  "The five questions, with our answers",
                  "Ready to forward to a partner",
                ]}
                fine="One email with the terms. We do not add you to a list."
                steps={[
                  [
                    "Now",
                    "The one-page terms are on their way. No agreement is attached and nothing to sign.",
                    true,
                  ],
                  [
                    "Within one business hour",
                    "Justin replies in case you want to talk the seat through.",
                  ],
                  [
                    "When you are ready",
                    "See candidates for your seat. You sign only when you want to meet someone.",
                  ],
                ]}
              />
            </div>
          </div>
        </section>

        {/* 6. CTA band */}
        <CtaBand
          title="See who you would be paying for"
          text="Screened attorneys and paralegals for your seat. No retainer, and no fee unless you hire."
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
