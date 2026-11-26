"use client";

import React, { useState } from "react";
import "./fc-redesign.css";
import {
  EnrichedCandidate,
  ParsedSeat,
  CandidateMatchResult,
} from "../candidateData";
import { roles, cities, trust } from "@/data";
import { CandidateDossierCard } from "@/components/CandidateDossierCard";

interface ScreenResultsProps {
  seat: ParsedSeat;
  promptText: string;
  isFromPosting: boolean;
  results: CandidateMatchResult[];
  unlockedIds: string[];
  activeCandidateId: string | null;
  onUpdateSeat: (updated: Partial<ParsedSeat>) => void;
  onSubmitPrompt: (newPrompt: string) => void;
  onSelectCandidate: (candidate: EnrichedCandidate) => void;
  onOpenGateModal: (candidate: EnrichedCandidate) => void;
  onOpenTermsModal: (candidate: EnrichedCandidate | null, readOnly?: boolean) => void;
}

const EXP_OPTIONS: Array<{ id: ParsedSeat["years"]; label: string }> = [
  { id: "any", label: "Any experience" },
  { id: "1-3", label: "1–3 years" },
  { id: "3-6", label: "3–6 years" },
  { id: "6+", label: "6+ years" },
];

const MODE_OPTIONS: Array<{ id: ParsedSeat["mode"]; label: string }> = [
  { id: "any", label: "Any office" },
  { id: "on-site", label: "On-site" },
  { id: "hybrid", label: "Hybrid" },
  { id: "remote", label: "Remote" },
];

const Caret = () => (
  <svg className="fcr-caret" viewBox="0 0 12 12" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="2.5 4.5 6 8 9.5 4.5" />
  </svg>
);

const Check = () => (
  <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="3.5 8.5 6.5 11.5 12.5 4.5" />
  </svg>
);

export function ScreenResults({
  seat,
  isFromPosting,
  results,
  unlockedIds,
  onUpdateSeat,
  onSelectCandidate,
  onOpenGateModal,
  onOpenTermsModal,
}: ScreenResultsProps) {
  const [skipQuestion, setSkipQuestion] = useState(false);
  const [noMatchEmail, setNoMatchEmail] = useState("");
  const [noMatchSent, setNoMatchSent] = useState(false);

  // One clarifying question when role or city is missing
  const missing = !skipQuestion && (!seat.role ? "role" : !seat.city ? "city" : null);

  const roleObj = roles.find((r) => r.slug === seat.role);
  const cityObj = cities.find((c) => c.slug === seat.city);
  const roleLabel = roleObj ? roleObj.name : "Candidate";
  const cityLabel = cityObj ? cityObj.name : "Texas";
  const count = results.length;

  const activeFilters =
    (seat.role ? 1 : 0) +
    (seat.city && seat.city !== "any" ? 1 : 0) +
    (seat.years !== "any" ? 1 : 0) +
    (seat.mode !== "any" ? 1 : 0) +
    (seat.pay ? 1 : 0);

  return (
    <section className="fcr" aria-labelledby="fcr-title">
      <div className="fcr-wrap">
        {/* FILTER TOOLBAR: adjusts the search typed in the hero */}
        <div className="fcr-bar" role="group" aria-label="Adjust your seat">
          <div className="fcr-bar-head">
            <span className="fcr-bar-k">Your seat</span>
            <span className="fcr-bar-n">{activeFilters} of 5 set · change any filter</span>
          </div>

          <div className="fcr-filters">
            <label className={`fcr-f${seat.role ? " is-set" : ""}`}>
              <span className="fcr-f-k">Role{isFromPosting && seat.role ? " · from posting" : ""}</span>
              <span className="fcr-f-v">
                <select value={seat.role || ""} onChange={(e) => onUpdateSeat({ role: e.target.value || null })} aria-label="Role">
                  <option value="">Any role</option>
                  {roles.map((r) => (
                    <option key={r.slug} value={r.slug}>
                      {r.name}
                    </option>
                  ))}
                </select>
                <Caret />
              </span>
            </label>

            <label className={`fcr-f${seat.city && seat.city !== "any" ? " is-set" : ""}`}>
              <span className="fcr-f-k">Market{isFromPosting && seat.city ? " · from posting" : ""}</span>
              <span className="fcr-f-v">
                <select value={seat.city || ""} onChange={(e) => onUpdateSeat({ city: e.target.value || null })} aria-label="Market">
                  <option value="">Select market</option>
                  <option value="any">Any Texas market</option>
                  {cities.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name}, {c.state}
                    </option>
                  ))}
                </select>
                <Caret />
              </span>
            </label>

            <label className={`fcr-f${seat.years !== "any" ? " is-set" : ""}`}>
              <span className="fcr-f-k">Experience</span>
              <span className="fcr-f-v">
                <select value={seat.years} onChange={(e) => onUpdateSeat({ years: e.target.value as ParsedSeat["years"] })} aria-label="Experience">
                  {EXP_OPTIONS.map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.label}
                    </option>
                  ))}
                </select>
                <Caret />
              </span>
            </label>

            <label className={`fcr-f${seat.mode !== "any" ? " is-set" : ""}`}>
              <span className="fcr-f-k">Office</span>
              <span className="fcr-f-v">
                <select value={seat.mode} onChange={(e) => onUpdateSeat({ mode: e.target.value as ParsedSeat["mode"] })} aria-label="Office arrangement">
                  {MODE_OPTIONS.map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.label}
                    </option>
                  ))}
                </select>
                <Caret />
              </span>
            </label>

            <label className={`fcr-f is-pay${seat.pay ? " is-set" : ""}`}>
              <span className="fcr-f-k">Max base</span>
              <span className="fcr-f-v">
                <span className="fcr-f-unit">$</span>
                <input
                  type="number"
                  inputMode="numeric"
                  placeholder="Any"
                  value={seat.pay ?? ""}
                  onChange={(e) => onUpdateSeat({ pay: e.target.value ? Number(e.target.value) : null })}
                  aria-label="Top of pay band in thousands"
                />
                <span className="fcr-f-unit">k</span>
              </span>
            </label>
          </div>
        </div>

        {/* ONE CLARIFYING QUESTION */}
        {missing && (
          <div className="fcr-ask" role="group" aria-label="Seat clarification">
            <div className="fcr-ask-copy">
              <span className="fcr-kicker">One quick question</span>
              <h2 id="fcr-title" className="fcr-ask-h">
                {missing === "role" ? (
                  <>
                    Which <em>role</em> is the seat for?
                  </>
                ) : (
                  <>
                    Which <em>Texas market</em> is the seat in?
                  </>
                )}
              </h2>
            </div>
            <div className="fcr-ask-chips">
              {missing === "role"
                ? roles.slice(0, 6).map((r) => (
                    <button key={r.slug} type="button" className="fcr-chip" onClick={() => onUpdateSeat({ role: r.slug })}>
                      {r.name}
                    </button>
                  ))
                : cities.slice(0, 6).map((c) => (
                    <button key={c.slug} type="button" className="fcr-chip" onClick={() => onUpdateSeat({ city: c.slug })}>
                      {c.name}, TX
                    </button>
                  ))}
              <button
                type="button"
                className="fcr-chip is-skip"
                onClick={() => {
                  setSkipQuestion(true);
                  if (!seat.city) onUpdateSeat({ city: "any" });
                }}
              >
                Skip, show everyone →
              </button>
            </div>
          </div>
        )}

        {!missing && (
          <>
            {/* RESULTS HEAD */}
            <div className="fcr-head">
              <div>
                <span className="fcr-kicker">
                  <span className={`fcr-dot${count === 0 ? " is-empty" : ""}`} aria-hidden="true" />
                  {count === 0 ? "No exact match yet" : `${count} screened ${count === 1 ? "profile" : "profiles"}`}
                </span>
                <h2 id="fcr-title" className="fcr-h2">
                  {count === 0 ? (
                    <>
                      We’ll find this seat <em>for you.</em>
                    </>
                  ) : (
                    <>
                      {roleLabel}
                      {count === 1 ? "" : "s"} open to <em>{cityLabel}</em> seats
                    </>
                  )}
                </h2>
                <p className="fcr-sub">
                  {count === 0
                    ? "Nobody in the open pool fits every filter. Loosen one above, or send the seat to Justin."
                    : "Each one spoke with Justin recently and agreed to be shown anonymously. Names unlock when you request the profile."}
                </p>
              </div>
              {count > 0 && (
                <ul className="fcr-head-meta" aria-label="What every profile includes">
                  <li>
                    <Check /> Pay verified
                  </li>
                  <li>
                    <Check /> Open to move
                  </li>
                </ul>
              )}
            </div>

            {count === 0 ? (
              <div className="fcr-empty">
                <div className="fcr-empty-copy">
                  <h3>Send the seat. Get a confidential shortlist.</h3>
                  <p>Justin works an off-market network of Texas lateral talent. He reviews your seat within one business day.</p>
                </div>
                {noMatchSent ? (
                  <p className="fcr-empty-ok" role="status">
                    <Check /> Seat received. Justin will reply with a first shortlist.
                  </p>
                ) : (
                  <form
                    className="fcr-empty-form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (noMatchEmail.trim()) setNoMatchSent(true);
                    }}
                  >
                    <label htmlFor="fcr-email" className="fch-sr">
                      Work email
                    </label>
                    <input
                      id="fcr-email"
                      type="email"
                      required
                      placeholder="you@yourfirm.com"
                      value={noMatchEmail}
                      onChange={(e) => setNoMatchEmail(e.target.value)}
                    />
                    <button type="submit">Send me a shortlist</button>
                  </form>
                )}
                <a className="fcr-empty-alt" href={trust.calendly} target="_blank" rel="noopener noreferrer">
                  Or book 15 minutes with Justin →
                </a>
              </div>
            ) : (
              <div className="fc-cards-grid fcr-grid">
                {results.map(({ candidate: c, notes, warn }) => {
                  const isUnlocked = unlockedIds.includes(c.id);
                  return (
                    <CandidateDossierCard
                      key={c.id}
                      c={c}
                      notes={notes}
                      warn={warn}
                      quiet={isUnlocked}
                      actionLabel={isUnlocked ? "Open resume" : "Show full resume"}
                      action={{ onClick: () => (isUnlocked ? onSelectCandidate(c) : onOpenGateModal(c)) }}
                    />
                  );
                })}
              </div>
            )}

            {/* TERMS STRIP */}
            <div className="fcr-terms">
              <ul>
                <li>
                  <Check /> $0 unless you hire
                </li>
                <li>
                  <Check /> No exclusivity
                </li>
                <li>
                  <Check /> 90-day replacement
                </li>
              </ul>
              <button type="button" className="fcr-terms-link" onClick={() => onOpenTermsModal(null, true)}>
                Read the one-page terms →
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
