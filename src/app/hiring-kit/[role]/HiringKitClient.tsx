"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DATA, fmt, matchCandidates } from "@/data";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Mark } from "@/components/Mark";
import { TrustLine, RatingBadge } from "@/components/Rating";
import { CandidateCard } from "@/components/CandidateCard";
import { GateForm } from "@/components/GateForm";
import { ReviewCard } from "@/components/ReviewCard";
import { CtaBand } from "@/components/CtaBand";
import { Icon } from "@/components/icons";

export function HiringKitClient({
  roleParam
}: {
  roleParam: string;
}) {
  const role = DATA.roles.find(r => r.slug === roleParam);

  if (!role) {
    notFound();
  }

  const kit = DATA.hiringKit[role.slug];
  const payModels = DATA.payModels[role.slug] || [];

  const [activeTab, setActiveTab] = useState<"posting" | "questions" | "scorecard" | "offer" | "pay">("posting");

  // Form facts state
  const [firm, setFirm] = useState<string>("");
  const [citySlug, setCitySlug] = useState<string>("houston-tx");
  const [firmSize, setFirmSize] = useState<number>(8);
  const [yearsKey, setYearsKey] = useState<string>("b2");
  const [loPay, setLoPay] = useState<number>(115000);
  const [hiPay, setHiPay] = useState<number>(150000);
  const [workMode, setWorkMode] = useState<"on-site" | "hybrid">("on-site");
  const [email, setEmail] = useState<string>("");

  const [copied, setCopied] = useState<boolean>(false);
  const [copyNote, setCopyNote] = useState<string>("");

  // Scorecard state
  const [scores, setScores] = useState<Record<number, number>>({});

  // Sync default pay band when city or years changes
  useEffect(() => {
    const band = DATA.bands[citySlug]?.[role.slug];
    if (band && band[yearsKey as keyof typeof band]) {
      const range = band[yearsKey as keyof typeof band] as [number, number];
      setLoPay(range[0] * 1000);
      setHiPay(range[1] * 1000);
    }
  }, [citySlug, yearsKey, role.slug]);

  const currentCity = DATA.cities.find(c => c.slug === citySlug) || DATA.cities[0];
  const currentExp = DATA.expBands.find(e => e.key === yearsKey) || DATA.expBands[1];

  const templateVars: Record<string, string> = {
    firm: firm || "[Your firm]",
    size: String(firmSize || "[number]"),
    city: currentCity.name,
    state: currentCity.state,
    years: currentExp.label,
    pay: `${fmt.money(Math.min(loPay, hiPay))} to ${fmt.money(Math.max(loPay, hiPay))}`,
    mode: workMode === "hybrid" ? "Hybrid, with set days" : "On-site, Monday to Friday",
    email: email || "hiring@yourfirm.com"
  };

  const fill = (s: string) => {
    return s.replace(/\{(\w+)\}/g, (_, k) => templateVars[k] || "").replace(/^(\w)/, (x) => x.toUpperCase());
  };

  const postingText = () => {
    if (!kit) return "";
    const lines: string[] = [];
    kit.template.forEach(([type, text]: [string, string]) => {
      const t = fill(text);
      lines.push(type === "h" ? (lines.length ? `\n${t}` : t) : type === "li" ? `- ${t}` : t);
    });
    return lines.join("\n");
  };

  // Matched candidates
  const matched = matchCandidates({
    role: role.slug,
    city: citySlug,
    years: yearsKey,
    mode: workMode,
    pay: Math.max(loPay, hiPay) / 1000
  });
  const topMatches = matched.slice(0, 3);

  const handleCopyPosting = async () => {
    const text = postingText();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setCopyNote(`Copied. ${matched.length} candidate${matched.length === 1 ? "" : "s"} already match this posting.`);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopyNote("Copy failed. Select the text above to copy it.");
    }
  };

  // Scorecard calculation
  let scoreSum = 0;
  let weightSum = 0;
  let ratedCount = 0;
  if (kit) {
    kit.scorecard.forEach((s: { k: string; hint: string; w: number }, idx: number) => {
      const val = scores[idx];
      if (val) {
        scoreSum += s.w * val;
        weightSum += s.w;
        ratedCount++;
      }
    });
  }
  const weightedTotal = ratedCount && weightSum ? (scoreSum / weightSum).toFixed(1) : "–";

  return (
    <>
      <Breadcrumb
        crumbs={[
          { label: "Home", href: "/" },
          { label: role.name, href: `/roles/${role.slug}` },
          { label: "Hiring kit", current: true }
        ]}
      />

      {/* 1. Hero */}
      <section className="phero hk-hero">
        <div className="wrap">
          <div>
            <span className="eyebrow">Hiring kit · {role.name.toLowerCase()}</span>
            <h1>{role.name} job description and hiring kit</h1>
            <p className="lede">A posting you can edit and copy, interview questions, a scorecard and an offer outline. Free, and no sign-up to use it.</p>
            <div className="hero-act">
              <button type="button" className="btn btn-primary btn-lg" onClick={handleCopyPosting}>
                {copied ? "Copied" : "Copy the posting"}
              </button>
              <a className="text-link" href="#download">Email me the full kit</a>
            </div>
            <TrustLine />
          </div>

          <div className="kitfan" role="img" aria-label="The hiring kit: posting template, interview questions, scorecard and offer-letter outline">
            <div className="kf kf-0">
              <span className="kf-k"><Icon name="doc" /> Part 4</span>
              <b>Offer-letter outline</b>
              <i style={{ width: "88%" }} />
              <i style={{ width: "70%" }} />
              <i className="on" style={{ width: "80%" }} />
              <i className="kf-extra" style={{ width: "60%" }} />
            </div>
            <div className="kf kf-1">
              <span className="kf-k"><Icon name="check" /> Part 3</span>
              <b>Scorecard</b>
              <div className="kf-row"><i style={{ width: "90%" }} /><span>4</span></div>
              <div className="kf-row"><i style={{ width: "76%" }} /><span>5</span></div>
              <div className="kf-row kf-extra"><i style={{ width: "84%" }} /><span>3</span></div>
            </div>
            <div className="kf kf-2">
              <span className="kf-k"><Icon name="list" /> Part 2</span>
              <b>Interview questions</b>
              <i style={{ width: "92%" }} />
              <i className="on" style={{ width: "66%" }} />
              <i style={{ width: "84%" }} />
              <i className="kf-extra" style={{ width: "72%" }} />
            </div>
            <div className="kf kf-3">
              <span className="kf-k"><Icon name="brief" /> Part 1</span>
              <b>Job posting</b>
              <i style={{ width: "80%" }} />
              <i className="on" style={{ width: "94%" }} />
              <i style={{ width: "86%" }} />
              <i className="on" style={{ width: "62%" }} />
              <i className="kf-extra" style={{ width: "78%" }} />
              <i className="kf-extra" style={{ width: "58%" }} />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Tabs: posting, interview questions, scorecard, offer outline, pay models */}
      <section className="block alt" id="kit">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">The kit</span>
            <h2>Edit it, copy it, run the hire</h2>
            <p>Add your firm&apos;s facts and the posting updates. The other tabs take you from interview to offer.</p>
          </div>

          <div className="tabs" role="tablist" aria-label="Hiring kit">
            <button
              type="button"
              role="tab"
              id="t-posting"
              aria-controls="posting"
              aria-selected={activeTab === "posting"}
              className={activeTab === "posting" ? "active" : ""}
              onClick={() => setActiveTab("posting")}
            >
              Posting template
            </button>
            <button
              type="button"
              role="tab"
              id="t-questions"
              aria-controls="questions"
              aria-selected={activeTab === "questions"}
              className={activeTab === "questions" ? "active" : ""}
              onClick={() => setActiveTab("questions")}
            >
              Interview questions
            </button>
            <button
              type="button"
              role="tab"
              id="t-scorecard"
              aria-controls="scorecard"
              aria-selected={activeTab === "scorecard"}
              className={activeTab === "scorecard" ? "active" : ""}
              onClick={() => setActiveTab("scorecard")}
            >
              Scorecard
            </button>
            <button
              type="button"
              role="tab"
              id="t-offer"
              aria-controls="offer"
              aria-selected={activeTab === "offer"}
              className={activeTab === "offer" ? "active" : ""}
              onClick={() => setActiveTab("offer")}
            >
              Offer letter
            </button>
            <button
              type="button"
              role="tab"
              id="t-pay"
              aria-controls="pay"
              aria-selected={activeTab === "pay"}
              className={activeTab === "pay" ? "active" : ""}
              onClick={() => setActiveTab("pay")}
            >
              Pay models
            </button>
          </div>

          {/* Tab 1: Posting */}
          {activeTab === "posting" && (
            <div role="tabpanel" id="posting" aria-labelledby="t-posting">
              <div className="split">
                <article className="tpl" aria-label="Job posting template">
                  <div className="tpl-bar">
                    <span>Edit your firm&apos;s facts and the posting updates.</span>
                    <button type="button" className="btn btn-line btn-sm" onClick={handleCopyPosting}>
                      {copied ? "Copied" : "Copy the posting"}
                    </button>
                  </div>
                  <div id="tpl-body">
                    {kit?.template.map(([type, text]: [string, string], i: number) => {
                      const t = fill(text);
                      if (type === "h") return <h3 key={i}>{t}</h3>;
                      if (type === "li") return <li key={i}>{t}</li>;
                      return <p key={i}>{t}</p>;
                    })}
                  </div>
                  {copyNote && (
                    <p className="small" id="copy-note" aria-live="polite" style={{ marginTop: 14 }}>
                      {copyNote}
                    </p>
                  )}
                </article>

                <form className="tool-form" id="facts" aria-label="Your firm's facts" style={{ position: "static" }} onSubmit={(e) => e.preventDefault()}>
                  <h2>Your firm&apos;s facts</h2>
                  <div className="field">
                    <label htmlFor="k-firm">Firm name</label>
                    <input
                      id="k-firm"
                      type="text"
                      placeholder="Your firm"
                      autoComplete="organization"
                      value={firm}
                      onChange={(e) => setFirm(e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="k-city">City</label>
                    <select
                      id="k-city"
                      value={citySlug}
                      onChange={(e) => setCitySlug(e.target.value)}
                    >
                      {DATA.cities.filter(c => DATA.bands[c.slug]?.[role.slug]).map(c => (
                        <option key={c.slug} value={c.slug}>{c.name}, {c.state}</option>
                      ))}
                    </select>
                  </div>
                  <div className="field">
                    <label htmlFor="k-size">Attorneys at the firm</label>
                    <input
                      id="k-size"
                      type="number"
                      inputMode="numeric"
                      min={1}
                      max={200}
                      value={firmSize}
                      onChange={(e) => setFirmSize(Number(e.target.value))}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="k-years">Years of practice</label>
                    <select
                      id="k-years"
                      value={yearsKey}
                      onChange={(e) => setYearsKey(e.target.value)}
                    >
                      {DATA.expBands.map(e => (
                        <option key={e.key} value={e.key}>{e.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="field">
                    <span className="label" id="k-pay-l">
                      Base salary <span className="hint">($ per year, set from the market band)</span>
                    </span>
                    <div className="grid-2" style={{ gap: 8 }}>
                      <div className="money">
                        <input
                          id="k-lo"
                          type="number"
                          inputMode="numeric"
                          aria-label="Base salary from"
                          value={loPay}
                          onChange={(e) => setLoPay(Number(e.target.value))}
                        />
                      </div>
                      <div className="money">
                        <input
                          id="k-hi"
                          type="number"
                          inputMode="numeric"
                          aria-label="Base salary to"
                          value={hiPay}
                          onChange={(e) => setHiPay(Number(e.target.value))}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="field">
                    <label htmlFor="k-mode">Work arrangement</label>
                    <select
                      id="k-mode"
                      value={workMode}
                      onChange={(e) => setWorkMode(e.target.value as "on-site" | "hybrid")}
                    >
                      <option value="on-site">On-site</option>
                      <option value="hybrid">Hybrid</option>
                    </select>
                  </div>
                  <div className="field">
                    <label htmlFor="k-email">Apply-to email</label>
                    <input
                      id="k-email"
                      type="email"
                      placeholder="hiring@yourfirm.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Tab 2: Interview questions */}
          {activeTab === "questions" && (
            <div role="tabpanel" id="questions" aria-labelledby="t-questions">
              <div className="split">
                <ol className="qlist" id="q-list">
                  {kit?.questions.map((q: { q: string; good: string; flag: string }, idx: number) => (
                    <li key={idx}>
                      <h3>{q.q}</h3>
                      <dl>
                        <dt>Good answer</dt>
                        <dd>{q.good}</dd>
                      </dl>
                      <dl className="flag">
                        <dt>Watch for</dt>
                        <dd>{q.flag}</dd>
                      </dl>
                    </li>
                  ))}
                </ol>
                <div className="terms-box">
                  <h3>How to use these</h3>
                  <p className="small">Ask the same questions in the same order to every candidate. Write down what they say, then rate them on the scorecard straight after the interview.</p>
                  <p className="foot">
                    <button type="button" className="btn btn-ghost btn-sm" onClick={() => setActiveTab("scorecard")}>
                      Open the scorecard
                    </button>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Scorecard */}
          {activeTab === "scorecard" && (
            <div role="tabpanel" id="scorecard" aria-labelledby="t-scorecard">
              <div className="split">
                <div className="table-wrap">
                  <table className="data stack-sm">
                    <caption className="sr">Interview scorecard</caption>
                    <thead>
                      <tr>
                        <th scope="col">What to rate</th>
                        <th scope="col" className="r">Weight</th>
                        <th scope="col" className="r">Rating (1–5)</th>
                      </tr>
                    </thead>
                    <tbody id="sc-rows">
                      {kit?.scorecard.map((s: { k: string; hint: string; w: number }, i: number) => (
                        <tr key={i}>
                          <td data-label="What to rate">
                            <b>{s.k}</b>
                            <br />
                            <span className="small muted">{s.hint}</span>
                          </td>
                          <td className="r" data-label="Weight"><Mark>{s.w}%</Mark></td>
                          <td className="r" data-label="Rating">
                            <select
                              aria-label={`Rating for ${s.k}`}
                              style={{ width: "auto", minWidth: 84 }}
                              value={scores[i] || ""}
                              onChange={(e) => setScores({ ...scores, [i]: Number(e.target.value) })}
                            >
                              <option value="">–</option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="verdict" style={{ marginTop: 0 }} aria-live="polite">
                  <span className="small muted">Weighted score</span>
                  <br />
                  <span className="score-total" id="sc-total">{weightedTotal}</span>
                  <p className="small" id="sc-note" style={{ marginTop: 6 }}>
                    {ratedCount > 0
                      ? `${ratedCount} of ${kit?.scorecard.length} lines rated.${ratedCount === kit?.scorecard.length ? (parseFloat(weightedTotal) >= 3.8 ? " Worth a second interview." : parseFloat(weightedTotal) >= 3 ? " Compare with your other candidates." : " Probably not this seat.") : ""}`
                      : "Rate each line after the interview."}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Offer letter */}
          {activeTab === "offer" && (
            <div role="tabpanel" id="offer" aria-labelledby="t-offer">
              <div className="split">
                <ol className="qlist" id="offer-list">
                  {kit?.offer.map(([heading, detail]: [string, string], i: number) => (
                    <li key={i}>
                      <h3>{heading}</h3>
                      <p className="small" style={{ color: "var(--ink-2)" }}>{detail}</p>
                    </li>
                  ))}
                </ol>
                <div className="terms-box">
                  <h3>Before you send it</h3>
                  <p className="small">Have your employment counsel read the final letter. Make the offer depend on an active Texas licence in good standing.</p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 5: Pay models */}
          {activeTab === "pay" && (
            <div role="tabpanel" id="pay" aria-labelledby="t-pay">
              <div className="table-wrap">
                <table className="data stack-sm">
                  <caption className="sr">Pay models</caption>
                  <thead>
                    <tr>
                      <th scope="col">Model</th>
                      <th scope="col">How it works</th>
                      <th scope="col">Fits</th>
                      <th scope="col">Typical terms</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payModels.map((p, i) => (
                      <tr key={i}>
                        <td data-label="Model"><b>{p.name}</b></td>
                        <td data-label="How it works">{p.how}</td>
                        <td data-label="Fits">{p.fits}</td>
                        <td data-label="Typical terms"><Mark>{p.typical}</Mark></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="source">
                What Houston firms pay at each level: <Link href={`/salaries/${role.slug}/houston-tx`}>estate planning attorney salary in Houston</Link>.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 3. Candidates who match this posting */}
      <section className="block" id="matches">
        <div className="wrap">
          <div className="sec-head row">
            <div>
              <span className="eyebrow">Already looking</span>
              <h2>Candidates who match this posting</h2>
              <p>
                <Mark>{matched.length}</Mark> {matched.length === 1 ? "candidate matches" : "candidates match"} the city, years, pay and work arrangement in your posting.
              </p>
            </div>
            <Link className="more link-arrow hide-sm" href={`/find-candidates#role=${role.slug}&city=${citySlug}`}>
              See every match
            </Link>
          </div>

          <div className="km-res">
            <div className="cand-grid">
              {topMatches.map(r => (
                <CandidateCard key={r.c.id} candidate={r.c} />
              ))}
            </div>
            <div id="gate">
              <GateForm
                eyebrow="Full profiles"
                title={topMatches.length === 1 ? "Get this candidate's full profile" : `Get the full profiles for these ${topMatches.length}`}
                bullets={[
                  "Redacted resumes, by email within the hour",
                  "Pay expectation, bar admission and notice period",
                  "Our one-page terms. No agreement to see them"
                ]}
                button="Send me the full profiles"
                ids={topMatches.map(r => r.c.id)}
                role={role.slug}
                city={citySlug}
                review="brett-zimmerman"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Email the full kit */}
      <section className="block alt" id="download">
        <div className="wrap dl-split">
          <div>
            <div className="sec-head">
              <span className="eyebrow">Free PDF and Word</span>
              <h2>Get the full kit by email</h2>
              <p>The same kit as a PDF to share and a Word file to edit, for every estate planning seat you open.</p>
            </div>
            <ul className="ticks cols">
              <li>Job posting template</li>
              <li>Seven interview questions with good answers</li>
              <li>Weighted interview scorecard</li>
              <li>Offer-letter outline in ten parts</li>
              <li>Three pay models with typical terms</li>
            </ul>
          </div>
          <div id="kit-gate">
            <GateForm
              eyebrow="Free kit"
              title="Email me the full kit"
              intro="PDF and Word, for estate planning attorney seats."
              button="Email me the kit"
              preset="kit"
              role={role.slug}
              city={citySlug}
              review="daffner-law"
              fine="One email with the kit. No list, and no call unless you ask for one."
            />
          </div>
        </div>
      </section>

      {/* 5. Employer reviews */}
      <section className="block" id="reviews">
        <div className="wrap">
          <div className="sec-head row">
            <div>
              <span className="eyebrow">Reviews</span>
              <h2>What law firms say</h2>
              <p>Rather we ran the search? Same people, same kit, and a fee only if you hire.</p>
            </div>
            <RatingBadge link={true} />
          </div>
          <div className="reviews-3">
            <ReviewCard review={DATA.reviews[0]} />
            <ReviewCard review={DATA.reviews[1]} />
            <ReviewCard review={DATA.reviews[3]} />
          </div>
        </div>
      </section>

      {/* 6. CTA band */}
      <CtaBand
        title="Rather we find them for you?"
        text="Screened estate planning attorneys for your seat. No retainer, and no fee unless you hire."
        button="See matching candidates"
        href={`/find-candidates#role=${role.slug}`}
      />

      <div className="mbar">
        <button type="button" className="btn btn-primary" onClick={handleCopyPosting}>
          {copied ? "Copied" : "Copy the posting"}
        </button>
      </div>
    </>
  );
}
