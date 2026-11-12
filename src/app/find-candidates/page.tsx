"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumb } from "@/components/Breadcrumb";
import { TrustLine } from "@/components/Rating";
import { CandidateCard } from "@/components/CandidateCard";
import { GateForm } from "@/components/GateForm";
import { TermsTiles } from "@/components/TermsTiles";
import { CtaBand } from "@/components/CtaBand";
import { Mark } from "@/components/Mark";
import {
  roles,
  cities,
  expBands,
  mustHaves,
  findRole,
  findCity,
  matchCandidates,
  plural,
  trust,
} from "@/data";
import { useSite } from "@/context/SiteContext";

export default function FindCandidatesPage() {
  const { unlocked } = useSite();
  const [role, setRole] = useState("estate-planning-attorney");
  const [city, setCity] = useState("houston-tx");
  const [years, setYears] = useState("any");
  const [mode, setMode] = useState<"any" | "on-site" | "hybrid">("any");
  const [pay, setPay] = useState<number | null>(null);
  const [selectedMust, setSelectedMust] = useState<string[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [folded, setFolded] = useState(true);

  // Check URL hash / search params on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace(/^#/, "");
      if (hash) {
        const params = new URLSearchParams(hash);
        const r = params.get("role");
        const c = params.get("city");
        const y = params.get("years");
        const m = params.get("mode") as any;
        const p = params.get("pay");
        const ids = params.get("ids");
        const must = params.get("must");

        if (r) setRole(r);
        if (c) setCity(c);
        if (y) setYears(y);
        if (m) setMode(m);
        if (p) setPay(Number(p));
        if (ids) setSelectedIds(ids.split(","));
        if (must) setSelectedMust(must.split(","));
      }
    }
  }, []);

  const rObj = findRole(role);
  const cObj = findCity(city);

  const availableMustHaves =
    mustHaves[role] || (rObj ? mustHaves[rObj.kind] : []) || [];

  const toggleMustHave = (tag: string) => {
    setSelectedMust((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const results = matchCandidates({
    role,
    city,
    years: years === "any" ? undefined : years,
    mode: mode === "any" ? undefined : mode,
    pay: pay ? pay / 1000 : null,
    must: selectedMust,
  });

  const openCards = unlocked ? results : results.slice(0, 3);
  const lockedCards = unlocked ? [] : results.slice(3);

  const expBandObj = expBands.find((e) => e.key === years);
  const summaryBits = [
    rObj ? rObj.name : role,
    cObj ? cObj.name : city,
    expBandObj ? expBandObj.label : "any experience",
  ];
  if (mode !== "any") summaryBits.push(mode);
  if (selectedMust.length)
    summaryBits.push(`${selectedMust.length} ${plural(selectedMust.length, "must-have")}`);

  const handleRequestProfile = (id: string) => {
    setSelectedIds([id]);
    const el = document.getElementById("gate");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

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
        name: "Find candidates",
        item: "https://www.orionplacement.com/find-candidates/",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main id="main">
        <Breadcrumb
          items={[
            { name: "Home", href: "/" },
            { name: "Employers", href: "/employers" },
            { name: "Find candidates" },
          ]}
        />

        <header className="phero compact">
          <div className="wrap">
            <span className="eyebrow">For firms hiring</span>
            <h1>Find candidates for your open seat</h1>
            <p className="lede">
              Describe the seat and screened candidates update as you go. The top
              three are open now.
            </p>
            <TrustLine />
          </div>
        </header>

        <section className="wrap tool-sec">
          <div className="tool">
            <form
              className={`tool-form${folded ? " folded editing" : ""}`}
              id="brief"
              aria-label="Your seat"
            >
              <div className="brief-sum" id="brief-sum">
                <p>
                  <span className="small muted">Your seat</span>
                  <b id="brief-sum-t">{summaryBits.join(" · ")}</b>
                </p>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  id="brief-edit"
                  aria-expanded={!folded}
                  onClick={() => setFolded(!folded)}
                >
                  {folded ? "Edit" : "Done"}
                </button>
              </div>

              <h2>Your seat</h2>

              <div className="field">
                <label htmlFor="b-role">Role</label>
                <select
                  id="b-role"
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  {roles.map((r) => (
                    <option key={r.slug} value={r.slug}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label htmlFor="b-city">City</label>
                <select
                  id="b-city"
                  name="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                >
                  {cities.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name}, {c.state}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label htmlFor="b-years">Years of practice</label>
                <select
                  id="b-years"
                  name="years"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                >
                  <option value="any">Any</option>
                  {expBands.map((e) => (
                    <option key={e.key} value={e.key}>
                      {e.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label htmlFor="b-mode">Work arrangement</label>
                <select
                  id="b-mode"
                  name="mode"
                  value={mode}
                  onChange={(e) => setMode(e.target.value as any)}
                >
                  <option value="any">Either</option>
                  <option value="on-site">On-site</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>

              <div className="field">
                <label htmlFor="b-pay">
                  Top of your pay band{" "}
                  <span className="hint">($ base per year, optional)</span>
                </label>
                <div className="money">
                  <input
                    id="b-pay"
                    name="pay"
                    type="number"
                    inputMode="numeric"
                    min="30000"
                    step="5000"
                    placeholder="145000"
                    value={pay || ""}
                    onChange={(e) =>
                      setPay(e.target.value ? Number(e.target.value) : null)
                    }
                  />
                </div>
              </div>

              <fieldset className="field" style={{ border: 0 }}>
                <legend className="label" style={{ marginBottom: 6 }}>
                  Must-haves <span className="hint">(tap to add)</span>
                </legend>
                <div className="chips" id="b-must">
                  {availableMustHaves.map((tag) => {
                    const isPressed = selectedMust.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        className="chip"
                        aria-pressed={isPressed}
                        data-tag={tag}
                        onClick={() => toggleMustHave(tag)}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            </form>

            <div className="tool-results">
              <div className="results-head" aria-live="polite">
                <b id="r-count">
                  {results.length ? (
                    <>
                      <Mark>{results.length}</Mark>{" "}
                      {results.length === 1 ? "candidate" : "candidates"} for{" "}
                      {rObj ? rObj.short : role}, {cObj ? cObj.name : city}
                    </>
                  ) : (
                    "No exact matches yet"
                  )}
                </b>
                <span className="small muted" id="r-sub">
                  {results.length
                    ? unlocked
                      ? "All open"
                      : results.length > 3
                      ? `Top 3 open, ${results.length - 3} more by email`
                      : "All open"
                    : ""}
                </span>
              </div>

              {!results.length ? (
                <div className="empty-state" id="r-list">
                  <p>
                    <b>No one in our current list fits this exact seat.</b> We search
                    our wider network for seats like this one. Send it and Justin
                    replies within <Mark>one business day</Mark>.
                  </p>
                  <p className="actions" style={{ marginTop: 12 }}>
                    <Link className="btn btn-primary btn-sm" href="/submit-job">
                      Send this seat
                    </Link>
                    <button
                      type="button"
                      className="btn btn-ghost btn-sm"
                      id="widen"
                      onClick={() => setSelectedMust([])}
                    >
                      Clear must-haves
                    </button>
                  </p>
                </div>
              ) : (
                <>
                  <div id="r-list">
                    <div className="cards">
                      {openCards.map((r) => (
                        <CandidateCard
                          key={r.c.id}
                          candidate={r.c}
                          result={r}
                          onRequestProfile={handleRequestProfile}
                        />
                      ))}
                    </div>
                  </div>

                  <div id="gate">
                    <GateForm
                      id="finder-gate"
                      eyebrow={
                        results.length > 3
                          ? `See all ${results.length}`
                          : "Full profiles"
                      }
                      title={
                        selectedIds.length
                          ? `Send me the full profile for ${selectedIds.join(", ")}`
                          : "Get the full profiles"
                      }
                      bullets={[
                        `Redacted resumes for ${
                          selectedIds.length
                            ? selectedIds.join(", ")
                            : results.length === 1
                            ? "this candidate"
                            : `all ${results.length} candidates`
                        }`,
                        "Pay expectation, bar admission and notice period",
                        "Our one-page terms, within one business hour",
                      ]}
                      button={
                        selectedIds.length
                          ? "Send me the full profile"
                          : "Send me the full profiles"
                      }
                      ids={selectedIds.length ? selectedIds : results.map((r) => r.c.id)}
                      role={role}
                      city={city}
                      gateNote={selectedIds.join(", ")}
                    />
                  </div>

                  <div id="r-locked">
                    {lockedCards.length > 0 && (
                      <>
                        <p className="mini-h locked-h">
                          <Mark>{lockedCards.length} more {plural(lockedCards.length, "candidate")}</Mark>{" "}
                          with the full profiles
                        </p>
                        <div className="cards">
                          {lockedCards.map((r) => (
                            <CandidateCard
                              key={r.c.id}
                              candidate={r.c}
                              result={r}
                              locked
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Steps */}
        <section className="block alt">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">What happens next</span>
              <h2>From your email to a first interview</h2>
            </div>
            <ol className="steps-line">
              <li>
                <span className="when">You ask</span>
                <h3>One email address</h3>
                <p>No agreement and no fee to see profiles.</p>
              </li>
              <li>
                <span className="when">
                  <Mark>Within one business hour</Mark>
                </span>
                <h3>Full profiles arrive</h3>
                <p>
                  Redacted resumes for the candidates you picked, and our
                  one-page terms.
                </p>
              </li>
              <li>
                <span className="when">
                  <Mark>Within one business day</Mark>
                </span>
                <h3>Justin books interviews</h3>
                <p>With the people you choose, at times that suit you.</p>
              </li>
              <li>
                <span className="when">When they start</span>
                <h3>You pay the fee</h3>
                <p>
                  Invoice on the start date, <Mark>due in 30 days</Mark>.
                </p>
              </li>
            </ol>
          </div>
        </section>

        {/* What it costs */}
        <section className="block">
          <div className="wrap">
            <div className="sec-head row">
              <div>
                <span className="eyebrow">What it costs</span>
                <h2>One fee, and only if you hire</h2>
              </div>
              <Link className="more link-arrow" href="/fees">
                Fees and a calculator
              </Link>
            </div>
            <TermsTiles />
          </div>
        </section>

        {/* FAQ */}
        <section className="block alt">
          <div className="wrap split">
            <div className="sec-head">
              <span className="eyebrow">Questions</span>
              <h2>About these candidates</h2>
              <p>
                Rather paste your posting? <Link href="/submit-job">Submit a job</Link>.
              </p>
            </div>
            <div className="faq">
              <details>
                <summary>Who are these candidates?</summary>
                <p>
                  Attorneys and paralegals who have spoken with Jon in the last
                  few weeks and are open to a move. Each one has agreed to be shown
                  anonymously.
                </p>
              </details>
              <details>
                <summary>Why can&apos;t I see names?</summary>
                <p>
                  So their current firm never learns they are looking. Names
                  follow when you both agree to meet, usually within a day of your
                  request.
                </p>
              </details>
              <details>
                <summary>What if nobody fits?</summary>
                <p>
                  Send the seat anyway. We search our wider network and send a
                  first shortlist, usually within <Mark>five business days</Mark>.
                </p>
              </details>
              <details>
                <summary>Do we have to sign anything to see profiles?</summary>
                <p>
                  No. You sign a one-page agreement only when you want to interview
                  someone.
                </p>
              </details>
            </div>
          </div>
        </section>

        {/* CTA */}
        <CtaBand
          title="Rather talk the seat through?"
          text="Fifteen minutes with Justin: the seat, the pay, and who is available now."
          button="Book 15 minutes with Justin"
          href={trust.calendly || "https://calendly.com/orionplacement/call-with-justin"}
          cal={false}
        />
      </main>
      <Footer />
      <div className="mbar">
        <a className="btn btn-primary" href="#gate" id="mbar-cta">
          {unlocked ? "Request a profile" : "Get the full profiles"}
        </a>
      </div>
    </>
  );
}
