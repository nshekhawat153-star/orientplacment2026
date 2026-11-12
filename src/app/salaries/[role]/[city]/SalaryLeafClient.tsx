"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DATA, fmt, salaryPosition, inBandCandidates, matchCandidates, Role, City } from "@/data";
import { useSite } from "@/context/SiteContext";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Mark } from "@/components/Mark";
import { TrustLine, RatingBadge } from "@/components/Rating";
import { SalaryBand } from "@/components/SalaryBand";
import { CandidateCard } from "@/components/CandidateCard";
import { JobCard } from "@/components/JobCard";
import { GateForm } from "@/components/GateForm";
import { Neighbours } from "@/components/PayTables";
import { ReviewCard } from "@/components/ReviewCard";
import { CtaBand } from "@/components/CtaBand";

export function SalaryLeafClient({
  roleParam,
  cityParam
}: {
  roleParam: string;
  cityParam: string;
}) {
  const role = DATA.roles.find(r => r.slug === roleParam);
  const city = DATA.cities.find(c => c.slug === cityParam);

  const { door, setDoor } = useSite();

  const [payInput, setPayInput] = useState<string>("130000");
  const [expKey, setExpKey] = useState<string>("b2");
  const [marker, setMarker] = useState<number | null>(130);
  const [hasChecked, setHasChecked] = useState<boolean>(false);
  const [verdict, setVerdict] = useState<{
    employerVerdict: { title: string; desc: string };
    candidateVerdict: { title: string; desc: string };
  } | null>(null);

  if (!role || !city) {
    notFound();
  }

  const bandData = DATA.bands[city.slug]?.[role.slug];
  if (!bandData) {
    notFound();
  }

  const levers = DATA.payLevers[role.slug] || [];

  const handlePayChange = (val: string) => {
    setPayInput(val);
    const num = parseFloat(val);
    if (!isNaN(num)) {
      const k = num > 1000 ? num / 1000 : num;
      if (k >= 30) {
        setMarker(k);
      }
    }
  };

  const handleCheck = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const raw = parseFloat(payInput);
    if (isNaN(raw)) return;
    const k = raw > 1000 ? raw / 1000 : raw;
    setMarker(k);
    setHasChecked(true);

    const pos = salaryPosition(city.slug, role.slug, expKey, k);
    const expLabel = DATA.expBands.find(e => e.key === expKey)?.label || expKey;
    const r = pos.range || [0, 0];

    setVerdict({
      employerVerdict: {
        title: `Your offer of ${fmt.k(k)} sits ${pos.where === "in" ? "inside" : pos.where} the range.`,
        desc: `It is ${pos.text}`
      },
      candidateVerdict: {
        title: `Your base of ${fmt.k(k)} is ${pos.where === "in" ? "inside" : pos.where} the usual range for ${expLabel}.`,
        desc: `In ${city.name} that range is $${r[0]}k–$${r[1]}k base. ${pos.where === "above" ? "Roles at this level are rare; we can tell you when one opens." : "Roles paying more are open now."}`
      }
    });
  };

  const currentK = parseFloat(payInput) ? (parseFloat(payInput) > 1000 ? parseFloat(payInput) / 1000 : parseFloat(payInput)) : 130;

  // Matched jobs for candidate door
  let moreJobs = DATA.jobs
    .filter(j => j.role === role.slug && j.city === city.slug && j.band[1] > currentK)
    .sort((a, b) => b.band[1] - a.band[1]);
  if (moreJobs.length === 0) {
    moreJobs = DATA.jobs.filter(j => j.role === role.slug && j.city === city.slug);
  }

  // Matched candidates for employer door
  let inBand = inBandCandidates(role.slug, city.slug, currentK).slice(0, 3);
  if (inBand.length === 0) {
    inBand = matchCandidates({ role: role.slug, city: city.slug }).slice(0, 3);
  }

  return (
    <>
      <Breadcrumb
        crumbs={[
          { label: "Home", href: "/" },
          { label: city.name, href: `/locations/texas/${city.slug === "houston-tx" ? "houston" : city.slug}` },
          { label: `${role.name} salary`, current: true }
        ]}
      />

      {/* 1. Hero */}
      <section className="phero leaf-hero">
        <div className="wrap">
          <div>
            <span className="eyebrow">Salary guide · {city.name}, {city.state}</span>
            <h1>{role.name} salary in {city.name}</h1>
            <div className="big-num"><Mark>{fmt.k(bandData.median)}</Mark></div>
            <p className="big-num-l">median base salary, all levels</p>

            <div className="door-row">
              <span className="door-label">I&apos;m</span>
              <div className="door" role="group" aria-label="I am">
                <button
                  type="button"
                  className={door === "employer" ? "active" : ""}
                  onClick={() => setDoor("employer")}
                >
                  hiring
                </button>
                <button
                  type="button"
                  className={door === "candidate" ? "active" : ""}
                  onClick={() => setDoor("candidate")}
                >
                  looking
                </button>
              </div>
            </div>

            <div className="hero-act">
              <a className="btn btn-primary" href="#check">
                {door === "employer" ? "Check my offer" : "Check my pay"}
              </a>
            </div>

            <TrustLine kind={door === "employer" ? "employer" : "candidate"} />
          </div>

          <div className="band-card">
            <h2 className="mini-h">Base salary by years of practice</h2>
            <SalaryBand
              citySlug={city.slug}
              roleSlug={role.slug}
              highlightKey={expKey}
              marker={marker ?? undefined}
            />
            <p className="source">
              Source: <Mark>{DATA.source}</Mark>. Updated <Mark>{DATA.asOf}</Mark>. Base only, before bonus.{" "}
              <a href="#method">How we measure</a>
            </p>
          </div>
        </div>
      </section>

      {/* 2. Check tool */}
      <section className="block alt" id="check">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Check a number</span>
            <h2>{door === "employer" ? "Check your offer" : "Check my pay"}</h2>
            <p>
              {door === "employer"
                ? "Enter the base you plan to offer. The brass line moves to it, and the candidates in that band appear below."
                : "Enter your current base. See where it sits, then Houston roles that pay more."}
            </p>
          </div>

          <form className="finder offer" onSubmit={handleCheck}>
            <div className="field">
              <label htmlFor="o-pay">
                <span>{door === "employer" ? "Base you plan to offer" : "Your current base"}</span>{" "}
                <span className="hint">($ per year)</span>
              </label>
              <div className="money">
                <input
                  id="o-pay"
                  type="number"
                  inputMode="numeric"
                  min="30000"
                  max="400000"
                  step="1000"
                  value={payInput}
                  onChange={(e) => handlePayChange(e.target.value)}
                  placeholder="130000"
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="o-exp">Years of practice</label>
              <select
                id="o-exp"
                value={expKey}
                onChange={(e) => {
                  setExpKey(e.target.value);
                  if (payInput) handleCheck();
                }}
              >
                {DATA.expBands.map(e => (
                  <option key={e.key} value={e.key}>{e.label}</option>
                ))}
              </select>
            </div>

            <button className="btn btn-primary" type="submit">
              <span>{door === "employer" ? "Check offer" : "Check my pay"}</span>
            </button>
          </form>

          {hasChecked && verdict && (
            <div id="verdict" aria-live="polite">
              <div className="verdict">
                <b>{door === "employer" ? verdict.employerVerdict.title : verdict.candidateVerdict.title}</b>
                <br />
                {door === "employer" ? verdict.employerVerdict.desc : verdict.candidateVerdict.desc}
              </div>
            </div>
          )}

          {hasChecked && (
            <div id="offer-next" style={{ margin: "32px 0 0" }}>
              {door === "employer" ? (
                <div>
                  <h3 className="mini-h">
                    {inBand.length > 0 ? `${inBand.length} candidate${inBand.length === 1 ? "" : "s"} in your band` : "Candidates near your band"}
                  </h3>
                  <div className="cand-grid">
                    {inBand.map(r => (
                      <CandidateCard key={r.c.id} candidate={r.c} />
                    ))}
                  </div>
                  <div style={{ marginTop: 24 }}>
                    <GateForm
                      title={inBand.length === 1 ? "Get this candidate's full profile" : `Get the full profiles for these ${inBand.length}`}
                      bullets={[
                        "Redacted resumes, by email within the hour",
                        "Pay expectation and notice period for each",
                        "Our one-page terms. No agreement to see them"
                      ]}
                      button="Send me the full profiles"
                      ids={inBand.map(r => r.c.id)}
                      role={role.slug}
                      city={city.slug}
                      review="brett-zimmerman"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="mini-h">
                    {moreJobs.length > 0 ? `${moreJobs.length} ${city.name} role${moreJobs.length === 1 ? "" : "s"} paying more than ${fmt.k(currentK)}` : `${city.name} roles near your base`}
                  </h3>
                  <div className="cards">
                    {moreJobs.slice(0, 3).map(j => (
                      <JobCard key={j.id} job={j} />
                    ))}
                  </div>
                  <p className="sec-foot">
                    <Link className="btn btn-primary" href={`/jobs/${role.slug}/${city.slug}`}>See every {city.name} role</Link>
                    <Link className="link-arrow" href={`/salary-check#role=${role.slug}&city=${city.slug}&base=${Math.round(currentK * 1000)}`}>Full salary check with bonus</Link>
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* 3. What moves pay */}
      <section className="block">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">What moves pay</span>
            <h2>Three things that move an offer</h2>
            <p>Each one is worth asking about in the first interview.</p>
          </div>
          <div className="levers">
            {levers.map((d, i) => (
              <div key={i} className="lever">
                <span className="tt-k">{d.k}</span>
                <b><Mark>{d.fig}</Mark></b>
                <p>{d.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Salary guide email offer */}
      <section className="block alt">
        <div className="wrap split">
          <div>
            <div className="sec-head">
              <span className="eyebrow">Free PDF</span>
              <h2>The {city.name} legal salary guide</h2>
              <p>Every role we place in {city.name}, on one page you can share with a partner or keep for your next review.</p>
            </div>
            <ul className="ticks">
              <li>Base pay for ten roles by years of practice</li>
              <li>Bonus norms and the on-site premium</li>
              <li>Updated each quarter</li>
            </ul>
          </div>
          <div id="guide-gate">
            <GateForm
              eyebrow="Free PDF"
              title={`Email me the ${city.name} salary guide`}
              button="Send me the guide"
              preset="guide"
              city={city.slug}
              audience={door === "candidate" ? "candidate" : "employer"}
              review={door === "candidate" ? "n-brown" : "daffner-law"}
              fine="One email with the PDF, then the update each quarter. Unsubscribe in one click."
            />
          </div>
        </div>
      </section>

      {/* 5. Neighbours */}
      <section className="block">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Compare</span>
            <h2>Other roles and other cities</h2>
          </div>
          <Neighbours roleSlug={role.slug} citySlug={city.slug} />
          <p className="sec-foot">
            <Link className="link-arrow" href={`/roles/${role.slug}`}>{role.name} hub</Link>
            <Link className="link-arrow" href={`/locations/texas/${city.slug === "houston-tx" ? "houston" : city.slug}`}>Legal recruiters in {city.name}</Link>
          </p>
        </div>
      </section>

      {/* 6. How we measure */}
      <section className="block alt" id="method">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Method</span>
            <h2>How we measure</h2>
            <p>Bands come from base salaries in offers made and roles posted through Orion for {role.name.toLowerCase()}s in the {city.name} metro, grouped by years since bar admission.</p>
          </div>
          <div className="statband">
            <div><b><Mark>20+</Mark></b><span>data points behind every band we publish</span></div>
            <div><b>25–75</b><span>the bar shows the middle half, 25th to 75th percentile</span></div>
            <div><b><Mark>Quarterly</Mark></b><span>refresh, with the date on every page</span></div>
          </div>
        </div>
      </section>

      {/* 7. Reviews */}
      <section className="block">
        <div className="wrap">
          <div className="sec-head row">
            <div>
              <span className="eyebrow">Reviews</span>
              <h2>Why people use Orion</h2>
            </div>
            <RatingBadge link={true} />
          </div>
          <div className="reviews-3">
            {door === "employer" ? (
              <>
                <ReviewCard review={DATA.reviews[0]} />
                <ReviewCard review={DATA.reviews[1]} />
                <ReviewCard review={DATA.reviews[3]} />
              </>
            ) : (
              <>
                <ReviewCard review={DATA.reviews[2]} />
                <ReviewCard review={DATA.reviews[5]} />
              </>
            )}
          </div>
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="block alt">
        <div className="wrap split">
          <div className="sec-head">
            <span className="eyebrow">Questions</span>
            <h2>Estate planning pay in {city.name}</h2>
          </div>
          <div className="faq">
            <details>
              <summary>What does an estate planning attorney earn in {city.name}?</summary>
              <p>The median base is <span className="mark">${bandData.median}k</span>. Attorneys with 1 to 3 years usually earn <span className="mark">${bandData.b1[0]}k to ${bandData.b1[1]}k</span>, 4 to 7 years <span className="mark">${bandData.b2[0]}k to ${bandData.b2[1]}k</span>, and 8 years or more <span className="mark">${bandData.b3[0]}k to ${bandData.b3[1]}k</span>.</p>
            </details>
            <details>
              <summary>Does a portable book change the offer?</summary>
              <p>Yes. A small book of existing estate clients is the biggest single lever, often worth <span className="mark">$15k to $30k</span> on base, and can be paired with an origination bonus.</p>
            </details>
            <details>
              <summary>Do small firms pay less than large firms?</summary>
              <p>At small and mid-size firms, base is close to the bands above. Many add a bonus on collections or a fee split that larger firms do not offer.</p>
            </details>
          </div>
        </div>
      </section>

      {/* 9. CTA band */}
      {door === "employer" ? (
        <CtaBand
          title={`See estate planning candidates in ${city.name}`}
          button="See candidates in this band"
          href={`/find-candidates#role=${role.slug}&city=${city.slug}`}
        />
      ) : (
        <CtaBand
          kind="candidate"
          title={`${city.name} roles that pay more`}
          button={`See ${city.name} roles`}
          href={`/jobs/${role.slug}/${city.slug}`}
        />
      )}

      <div className="mbar">
        <a className="btn btn-primary" href="#check">
          {door === "employer" ? "Check my offer" : "Check my pay"}
        </a>
      </div>
    </>
  );
}
