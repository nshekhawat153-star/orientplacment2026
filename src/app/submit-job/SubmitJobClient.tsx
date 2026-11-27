"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import "./submit-job.css";
import { roles, cities, findBand, findRole, findCity, fmt, samplePosting, parsePosting, trust } from "@/data";
import { matchEnrichedCandidates, ParsedSeat } from "@/app/find-candidates/candidateData";
import { CandidateDossierCard } from "@/components/CandidateDossierCard";
import { PkHero, PkSection, PkSteps, PkTerms, PkFaq, PkCallCard, PkCheck, PkArrow } from "@/components/PageKit";

const STEPS = [
  { t: "Send the seat", d: "Paste the posting or a few lines. It stays private and is never published.", tag: "2 minutes" },
  { t: "Get matched profiles", d: "Justin sends screened, anonymous profiles that fit the seat and the pay.", tag: "Same day" },
  { t: "Interview who you like", d: "Justin sets up the calls with your partners. Names unlock when both sides agree.", tag: "We schedule" },
  { t: "Pay only on start", d: "One contingency fee, invoiced on the start date, Net 15. 90-day replacement.", tag: "Net 15" },
];

const TERMS = [
  { k: "$0", v: "To post or review profiles" },
  { k: "Non-exclusive", v: "Keep your other channels" },
  { k: "90 days", v: "Free replacement" },
  { k: "Net 15", v: "Invoiced on start date" },
];

const FAQ = [
  {
    q: "Is our posting published anywhere?",
    a: "No. It stays private. Justin uses it to brief himself and match candidates. Candidates see an unbranded summary until both sides agree to an interview.",
  },
  {
    q: "Can we keep the job on other boards?",
    a: "Yes. Orion is non-exclusive. Keep it on your site, LinkedIn, Indeed or bar boards. The fee only applies if you hire someone Orion introduced.",
  },
  {
    q: "What if our pay is below the market?",
    a: "Send it anyway. Justin will tell you honestly who will consider the seat at that number, and what small change would open it up.",
  },
  {
    q: "What does it cost?",
    a: (
      <>
        Nothing to post and nothing to review profiles. One contingency fee only if you hire, due 15 days after the start
        date, with a 90-day replacement. <Link href="/fees">See fees and terms</Link>.
      </>
    ),
  },
];

const YEARS_LABEL: Record<ParsedSeat["years"], string> = { any: "", "1-3": "1–3 yrs", "3-6": "4–7 yrs", "6+": "8+ yrs" };

export function SubmitJobClient() {
  const [text, setText] = useState("");
  const [role, setRole] = useState("");
  const [city, setCity] = useState("");
  const [payLo, setPayLo] = useState("");
  const [payHi, setPayHi] = useState("");
  const [email, setEmail] = useState("");
  const [firm, setFirm] = useState("");
  const [name, setName] = useState("");
  const [sent, setSent] = useState(false);

  // Read the posting as the user types; explicit selects win over what we read.
  // parsePosting is built for job postings (it reads "4 to 7 years", "$120,000 – $140,000", etc.)
  const parsed = useMemo(() => {
    const p = parsePosting(text);
    const years: ParsedSeat["years"] = !p.found.years ? "any" : p.years === "b1" ? "1-3" : p.years === "b2" ? "3-6" : "6+";
    return {
      role: p.found.role ? p.role || null : null,
      city: p.found.city ? p.city || null : null,
      years,
      mode: (p.mode || "any") as ParsedSeat["mode"],
      pay: p.found.pay ? p.hi ?? null : null,
      lo: p.found.pay ? p.lo ?? null : null,
    };
  }, [text]);
  const seat: ParsedSeat = {
    role: role || parsed.role,
    city: city || parsed.city,
    years: parsed.years,
    mode: parsed.mode,
    pay: payHi ? Number(payHi) : parsed.pay,
  };

  const roleObj = findRole(seat.role || "");
  const cityObj = findCity(seat.city || "");
  const chips = [
    roleObj?.name,
    cityObj ? `${cityObj.name}, ${cityObj.state}` : null,
    YEARS_LABEL[seat.years] || null,
    seat.pay ? (parsed.lo && parsed.lo !== seat.pay && !payHi ? `$${parsed.lo}k–$${seat.pay}k` : `≤ $${seat.pay}k`) : null,
    seat.mode !== "any" ? (seat.mode === "on-site" ? "On-site" : seat.mode === "hybrid" ? "Hybrid" : "Remote") : null,
  ].filter(Boolean) as string[];

  // Preview: who is open for this seat right now
  const previewSeat: ParsedSeat = { ...seat, role: seat.role || "estate-planning-attorney", city: seat.city || "houston-tx" };
  const matches = useMemo(
    () => matchEnrichedCandidates(previewSeat),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [previewSeat.role, previewSeat.city, previewSeat.years, previewSeat.mode, previewSeat.pay]
  );
  const previewRole = findRole(previewSeat.role!);
  const previewCity = findCity(previewSeat.city!);
  const query = [previewRole?.name, previewCity ? `in ${previewCity.name}` : "", seat.pay ? `up to $${seat.pay}k` : ""]
    .filter(Boolean)
    .join(" ");

  // Market pay for the seat
  const band = findBand(previewSeat.city!, previewSeat.role!);
  const lo = payLo ? Number(payLo) : parsed.lo;
  const hi = payHi ? Number(payHi) : seat.pay;
  let verdict: { tone: "ok" | "low" | "high"; text: string } | null = null;
  if (band && (lo || hi)) {
    const top = hi || lo!;
    if (top < band.b2[0]) verdict = { tone: "low", text: `Below the middle of the market. Mid-level candidates here expect ${fmt.range(band.b2)}.` };
    else if (top > band.b3[0]) verdict = { tone: "high", text: "Above market. Expect strong interest, including senior candidates." };
    else verdict = { tone: "ok", text: "In line with the market. Most candidates at this level will take the call." };
  }

  const canSend = !!(email.trim() && (text.trim() || role));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSend) return;
    setSent(true);
  };

  const form = (
    <div className="pk-form sj-form" id="intake">
      {sent ? (
        <div className="pk-form-done" role="status">
          <span className="pk-form-done-ico" aria-hidden="true">
            <PkCheck size={28} />
          </span>
          <h3>Seat received.</h3>
          <p>
            Justin will reply to <b>{email}</b> with matched profiles, usually the same business day.
          </p>
          <a href={trust.calendly} target="_blank" rel="noopener noreferrer" className="pk-btn is-line">
            Or book 15 min with Justin
          </a>
        </div>
      ) : (
        <form onSubmit={submit}>
          <span className="pk-form-k">Free · Confidential · Non-exclusive</span>
          <h2 className="pk-form-h">Tell us about the seat</h2>

          <div className="pk-fields">
            <label className="pk-field is-wide">
              <span>
                Job posting or a few lines <em>paste anything</em>
              </span>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="e.g. Estate planning associate in Houston, 4–7 years, $120k–$140k, on-site"
                rows={4}
              />
            </label>
            {text.trim() && chips.length > 0 && (
              <div className="sj-chips is-wide" aria-live="polite">
                <span>We read:</span>
                {chips.map((c) => (
                  <i key={c}>{c}</i>
                ))}
              </div>
            )}
            <label className="pk-field">
              <span>Role</span>
              <select value={role || parsed.role || ""} onChange={(e) => setRole(e.target.value)}>
                <option value="">Select role</option>
                {roles.map((r) => (
                  <option key={r.slug} value={r.slug}>
                    {r.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="pk-field">
              <span>City</span>
              <select value={city || parsed.city || ""} onChange={(e) => setCity(e.target.value)}>
                <option value="">Select city</option>
                {cities.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}, {c.state}
                  </option>
                ))}
              </select>
            </label>
            <label className="pk-field">
              <span>
                Base pay <em>$k, optional</em>
              </span>
              <span className="sj-pay">
                <input inputMode="numeric" placeholder="From" value={payLo} onChange={(e) => setPayLo(e.target.value.replace(/\D/g, ""))} aria-label="Pay from, in thousands" />
                <b>–</b>
                <input inputMode="numeric" placeholder="To" value={payHi} onChange={(e) => setPayHi(e.target.value.replace(/\D/g, ""))} aria-label="Pay to, in thousands" />
              </span>
            </label>
            <label className="pk-field">
              <span>
                Firm <em>optional</em>
              </span>
              <input type="text" value={firm} onChange={(e) => setFirm(e.target.value)} placeholder="Firm name" autoComplete="organization" />
            </label>
            <label className="pk-field">
              <span>
                Your name <em>optional</em>
              </span>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" autoComplete="name" />
            </label>
            <label className="pk-field">
              <span>Work email</span>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@yourfirm.com" autoComplete="email" />
            </label>
          </div>

          <div className="pk-form-foot">
            <button type="button" className="sj-sample" onClick={() => setText(samplePosting)}>
              Try a sample posting
            </button>
            <button type="submit" className="pk-btn is-primary" disabled={!canSend}>
              Send to Justin <PkArrow />
            </button>
          </div>
          <p className="pk-form-fine">Never published. No fee unless you hire.</p>
        </form>
      )}
    </div>
  );

  return (
    <div className="sj">
      <PkHero
        eyebrow="Submit a job · Free to post"
        title="Send us the seat."
        accent="Get matched profiles today."
        lead="Paste your posting or a few lines. Justin reads it, checks the pay against the market and sends screened candidates who fit."
        trustItems={["No retainer", "Non-exclusive", "Pay only if you hire", "90-day replacement"]}
        side={form}
      />

      {/* MATCHES + MARKET PAY */}
      <PkSection
        tone="light"
        kicker="Live preview"
        title={`${matches.length} ${matches.length === 1 ? "candidate is" : "candidates are"} open to`}
        accent={`this seat right now.`}
        lead={`Based on ${previewRole?.name.toLowerCase() || "the role"} in ${previewCity?.name || "Texas"}${seat.pay ? `, up to $${seat.pay}k` : ""}. Updates as you fill in the form.`}
      >
        <div className="sj-preview">
          <aside className="sj-market">
            <span className="sj-market-k">Market base pay</span>
            <p className="sj-market-t">
              {previewRole?.name} · {previewCity?.name}
            </p>
            {band ? (
              <>
                <ul>
                  <li>
                    <span>1–3 years</span>
                    <b>{fmt.range(band.b1)}</b>
                  </li>
                  <li>
                    <span>4–7 years</span>
                    <b>{fmt.range(band.b2)}</b>
                  </li>
                  <li>
                    <span>8+ years</span>
                    <b>{fmt.range(band.b3)}</b>
                  </li>
                </ul>
                <p className="sj-market-med">
                  Median <b>{fmt.k(band.median)}</b>
                </p>
                {verdict ? (
                  <p className={`sj-verdict is-${verdict.tone}`}>{verdict.text}</p>
                ) : (
                  <p className="sj-verdict">Add your pay range in the form to see where it sits.</p>
                )}
                <Link href={`/salaries/${previewSeat.role}/${previewSeat.city}`} className="sj-market-link">
                  Full salary guide <PkArrow size={14} />
                </Link>
              </>
            ) : (
              <p className="sj-verdict">We don’t publish a band for this role and city yet. Justin will share what he sees.</p>
            )}
          </aside>

          <div className="sj-matches">
            {matches.length > 0 ? (
              <>
                <div className="sj-cards">
                  {matches.slice(0, 4).map(({ candidate, notes, warn }) => (
                    <CandidateDossierCard
                      key={candidate.id}
                      c={candidate}
                      notes={notes}
                      warn={warn}
                      actionLabel="See profile"
                      action={{ href: `/find-candidates?q=${encodeURIComponent(query)}&c=${candidate.id}` }}
                    />
                  ))}
                </div>
                {matches.length > 2 && (
                  <Link href={`/find-candidates?q=${encodeURIComponent(query)}`} className="sj-all">
                    See all {matches.length} on Find candidates <PkArrow size={14} />
                  </Link>
                )}
              </>
            ) : (
              <div className="sj-none">
                <h3>No one in the open pool fits exactly yet.</h3>
                <p>Send the seat anyway. Justin works an off-market network and will come back within a business day.</p>
                <a href="#intake" className="pk-btn is-dark">
                  Send the seat
                </a>
              </div>
            )}
          </div>
        </div>
      </PkSection>

      {/* PROCESS + TERMS */}
      <PkSection tone="dark" kicker="How it works" title="From posting to start date," accent="in four steps.">
        <PkSteps steps={STEPS} />
        <PkTerms items={TERMS} link={{ label: "Fees & terms", href: "/fees" }} />
      </PkSection>

      {/* FAQ + CALL */}
      <PkSection tone="light">
        <div className="pk-split">
          <div className="pk-head">
            <span className="pk-kicker">
              <span aria-hidden="true" />
              Questions
            </span>
            <h2 className="pk-h2">
              Before you <em>send it.</em>
            </h2>
            <p className="pk-sec-lead">
              No posting written yet? Start from a <Link href="/hiring-kit/estate-planning-attorney">hiring kit</Link> or talk
              it through with Justin.
            </p>
          </div>
          <PkFaq items={FAQ} />
        </div>
        <div className="sj-call">
          <PkCallCard title="Rather talk the seat" accentWords="through first?" />
        </div>
      </PkSection>
    </div>
  );
}
