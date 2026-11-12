"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DATA, fmt } from "@/data";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Mark } from "@/components/Mark";
import { TrustLine } from "@/components/Rating";
import { JobCard } from "@/components/JobCard";
import { SalaryBand } from "@/components/SalaryBand";
import { GateForm } from "@/components/GateForm";
import { CtaBand } from "@/components/CtaBand";
import { Icon } from "@/components/icons";

export function JobsClient({
  roleParam,
  cityParam
}: {
  roleParam: string;
  cityParam: string;
}) {
  const role = DATA.roles.find(r => r.slug === roleParam);
  const city = DATA.cities.find(c => c.slug === cityParam);

  const [filter, setFilter] = useState<string>("all");

  if (!role || !city) {
    notFound();
  }

  const bandData = DATA.bands[city.slug]?.[role.slug];
  const allJobs = DATA.jobs
    .filter(j => j.role === role.slug && j.city === city.slug)
    .sort((a, b) => (a.posted < b.posted ? 1 : -1));

  const lo = allJobs.length ? Math.min(...allJobs.map(j => j.band[0])) : 0;
  const hi = allJobs.length ? Math.max(...allJobs.map(j => j.band[1])) : 0;

  const filteredJobs = allJobs.filter(j => {
    if (filter === "all") return true;
    if (filter === "senior") {
      const match = j.years.match(/(\d+)/g);
      if (match) {
        const nums = match.map(Number);
        return Math.max(...nums) >= 6;
      }
      return false;
    }
    return j.mode === filter;
  });

  const otherRoles = DATA.roles.filter(r => r.slug !== role.slug && DATA.jobs.filter(j => j.role === r.slug && j.city === city.slug).length > 0);
  const otherCities = DATA.cities
    .filter(c => c.slug !== city.slug && (DATA.jobs.filter(j => j.role === role.slug && j.city === c.slug).length > 0 || DATA.bands[c.slug]?.[role.slug]))
    .slice(0, 6);

  return (
    <>
      <Breadcrumb
        crumbs={[
          { label: "Home", href: "/" },
          { label: city.name, href: `/locations/texas/${city.slug === "houston-tx" ? "houston" : city.slug}` },
          { label: `${role.name} jobs`, current: true }
        ]}
      />

      {/* 1. Hero */}
      <section className="phero jobs-hero">
        <div className="wrap">
          <div>
            <span className="eyebrow">Jobs · {city.name}, {city.state} · employers kept confidential</span>
            <h1>{role.name} jobs in {city.name}</h1>
            <p className="lede">Open roles at small and mid-size firms, with the base pay on each. No firm sees your name until you say yes.</p>
            <div className="hero-act">
              <a className="btn btn-primary btn-lg" href="#list">Apply confidentially</a>
              <a className="text-link" href="#alerts-block">Email me new roles</a>
            </div>
            <TrustLine kind="candidate" />
          </div>

          <div className="band-card">
            <h2 className="mini-h">Open now in {city.name}</h2>
            <div className="nums">
              <div>
                <div className="big-num"><Mark>{allJobs.length}</Mark></div>
                <p className="big-num-l">open roles</p>
              </div>
              <div>
                <div className="big-num"><Mark>{fmt.range([lo, hi])}</Mark></div>
                <p className="big-num-l">base pay range across them</p>
              </div>
            </div>
            <p className="card-foot">
              <Icon name="lock" />
              <span>Employers named on your first call with Jon, before anything is sent</span>
            </p>
          </div>
        </div>
      </section>

      {/* 2. Job cards with filter chips */}
      <section className="block alt" id="list">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Open roles</span>
            <h2>Pick a role and apply confidentially</h2>
            <p>Each card shows the base range, firm type and how the seat works.</p>
          </div>

          <div className="results-head" aria-live="polite">
            <div className="chips" id="filters" role="group" aria-label="Filter roles">
              <button
                type="button"
                className={`chip${filter === "all" ? " active" : ""}`}
                aria-pressed={filter === "all"}
                onClick={() => setFilter("all")}
              >
                All
              </button>
              <button
                type="button"
                className={`chip${filter === "on-site" ? " active" : ""}`}
                aria-pressed={filter === "on-site"}
                onClick={() => setFilter("on-site")}
              >
                On-site
              </button>
              <button
                type="button"
                className={`chip${filter === "hybrid" ? " active" : ""}`}
                aria-pressed={filter === "hybrid"}
                onClick={() => setFilter("hybrid")}
              >
                Hybrid
              </button>
              <button
                type="button"
                className={`chip${filter === "senior" ? " active" : ""}`}
                aria-pressed={filter === "senior"}
                onClick={() => setFilter("senior")}
              >
                6+ years
              </button>
            </div>
            <span className="small muted">
              Showing <Mark>{filteredJobs.length}</Mark> of <Mark>{allJobs.length}</Mark>, newest first
            </span>
          </div>

          {filteredJobs.length > 0 ? (
            <div className="cards">
              {filteredJobs.map(j => (
                <JobCard key={j.id} job={j} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>
                <b>No listed role matches this filter today.</b>{" "}
                <a href="#alerts-block">Get an email</a> when one opens.
              </p>
            </div>
          )}

          <div className="sec-foot">
            <Link className="btn btn-ghost" href={`/upload-resume#role=${role.slug}&city=${city.slug}`}>
              Am I a fit? Upload your resume
            </Link>
            <span className="small muted">We read it and show how you fit each role.</span>
          </div>
        </div>
      </section>

      {/* 3. Alerts form */}
      <section className="block" id="alerts-block">
        <div className="wrap split">
          <div>
            <div className="sec-head">
              <span className="eyebrow">Job alerts</span>
              <h2>Email me new roles like these</h2>
              <p>Many are filled before they are posted anywhere else. Hear about them first.</p>
            </div>
            <ul className="ticks">
              <li>New {role.name.toLowerCase()} roles in {city.name}</li>
              <li>The base range, firm type and on-site or hybrid on each</li>
              <li>Usually <span className="mark">2 to 4 a month</span>. Unsubscribe in one click</li>
            </ul>
          </div>
          <div id="alerts">
            <GateForm
              eyebrow="Job alerts"
              title={`${role.name} roles, ${city.name}`}
              audience="candidate"
              button="Email me new roles"
              review="n-brown"
              fine="Use a personal email, not your work one. No firm sees your name until you say yes."
              steps={[
                ["Now", `Alerts are on for ${role.name.toLowerCase()} roles in ${city.name}.`, true],
                ["As roles open", "Each new role with its pay band, firm size and on-site or hybrid. Usually 2 to 4 a month."],
                ["When one fits", "Reply to the email. Jon tells you who the firm is before anything is sent."],
                ["Any time", "Unsubscribe in one click, and your email is deleted."]
              ]}
            />
          </div>
        </div>
      </section>

      {/* 4. How applying works */}
      <section className="block alt">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">How applying works</span>
            <h2>Nothing goes to the firm without your yes</h2>
            <p>Applying sends your resume to Jon only.</p>
          </div>
          <ol className="steps-line three">
            <li>
              <span className="when">You apply</span>
              <h3>Personal email and resume</h3>
              <p>Nothing goes to the firm yet.</p>
            </li>
            <li>
              <span className="when"><span className="mark">Within one business day</span></span>
              <h3>Jon calls you</h3>
              <p>Who the firm is, who you would work for and the full pay.</p>
            </li>
            <li>
              <span className="when">Your yes</span>
              <h3>One firm sees your name</h3>
              <p>Only the firm you said yes to. Free for you.</p>
            </li>
          </ol>
        </div>
      </section>

      {/* 5. What this role pays */}
      <section className="block">
        <div className="wrap">
          <div className="sec-head row">
            <div>
              <span className="eyebrow">Pay</span>
              <h2>What this role pays in {city.name}</h2>
              <p>Median base <b>{bandData ? fmt.k(bandData.median) : ""}</b>. The listings above sit inside these bands.</p>
            </div>
            <Link className="more link-arrow" href={`/salaries/${role.slug}/${city.slug}`}>Full salary guide</Link>
          </div>
          <div className="band-card">
            <SalaryBand city={city.slug} role={role.slug} highlight="b2" />
            <p className="source">Source: <Mark>{DATA.source}</Mark>. Updated <Mark>{DATA.asOf}</Mark>. Base salary only.</p>
          </div>
          <div className="sec-foot">
            <Link className="btn btn-ghost" href={`/salary-check#role=${role.slug}&city=${city.slug}`}>Check my pay</Link>
            <span className="small muted">Your base against this band, and the roles that pay more.</span>
          </div>
        </div>
      </section>

      {/* 6. More roles */}
      <section className="block alt">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">More roles</span>
            <h2>Other roles and other cities</h2>
          </div>
          <div className="neighbours">
            <div>
              <h3>Other roles in {city.name}</h3>
              <ul className="nlist">
                {otherRoles.map(r => {
                  const cnt = DATA.jobs.filter(j => j.role === r.slug && j.city === city.slug).length;
                  return (
                    <li key={r.slug}>
                      <Link href={`/jobs/${r.slug}/${city.slug}`}>
                        <span>{r.name}</span>
                        <span className="v"><Mark>{cnt} open</Mark></span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div>
              <h3>{role.name} jobs in other cities</h3>
              <ul className="nlist">
                {otherCities.map(c => {
                  const cnt = DATA.jobs.filter(j => j.role === role.slug && j.city === c.slug).length;
                  const b = DATA.bands[c.slug]?.[role.slug];
                  return (
                    <li key={c.slug}>
                      <Link href={`/jobs/${role.slug}/${c.slug}`}>
                        <span>{c.name}, {c.state}</span>
                        <span className="v">
                          {cnt > 0 ? <Mark>{cnt} open</Mark> : <>median <Mark>{b ? fmt.k(b.median) : ""}</Mark></>}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <p className="sec-foot">
            <Link className="link-arrow" href={`/best-law-firms/${city.slug}`}>Best small firms to work for in {city.name}</Link>
            <Link className="link-arrow" href={`/roles/${role.slug}`}>{role.name} hub</Link>
          </p>
        </div>
      </section>

      {/* 7. FAQ */}
      <section className="block">
        <div className="wrap split">
          <div className="sec-head">
            <span className="eyebrow">Questions</span>
            <h2>About these jobs</h2>
            <p>Rather talk first? <Link href="/about#contact">Reach Jon directly</Link>.</p>
          </div>
          <div className="faq">
            <details>
              <summary>Why are the employers not named?</summary>
              <p>So you can look without anyone knowing, and so firms can hire without announcing it. Jon names the firm on your first call, before anything is sent.</p>
            </details>
            <details>
              <summary>Are the pay bands the real offer range?</summary>
              <p>Yes. Each band is the base range the firm agreed with us for that seat. Bonus and benefits are on top.</p>
            </details>
            <details>
              <summary>Will the firm see my resume if I apply?</summary>
              <p>Not until you say yes to that firm. Applying sends your resume to Jon only.</p>
            </details>
            <details>
              <summary>Does it cost me anything?</summary>
              <p>No. The hiring firm pays Orion&apos;s fee when you start, and your offer is not reduced to cover it.</p>
            </details>
          </div>
        </div>
      </section>

      {/* 8. CTA band */}
      <CtaBand
        kind="candidate"
        title="Not sure which role fits? Send your resume"
        button="Am I a fit? Upload your resume"
        href={`/upload-resume#role=${role.slug}&city=${city.slug}`}
      />

      <div className="mbar">
        <a className="btn btn-primary" href="#list">Apply confidentially</a>
      </div>
    </>
  );
}
