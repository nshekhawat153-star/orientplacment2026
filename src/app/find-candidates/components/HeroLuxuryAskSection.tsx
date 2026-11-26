"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import "./fc-redesign.css";
import { roles, cities } from "@/data";
import { parseSeatInput, ParsedSeat } from "../candidateData";

/* ------------------------------------------------------------------
   /find-candidates hero: the page's only search box.
   Same look and behaviour as the homepage hero search (live chips
   under the box, examples that return real profiles).
   ------------------------------------------------------------------ */

interface HeroLuxuryAskSectionProps {
  initialText: string;
  isReading: boolean;
  onSubmitPrompt: (text: string) => void;
}

const EXAMPLES = [
  { label: "Estate planning · Houston", q: "Estate planning attorney in Houston, 3–5 years, up to $145k" },
  { label: "Litigation · 4+ yrs", q: "Litigation associate in Houston, 4+ years, on-site" },
  { label: "Estate paralegal · on-site", q: "Estate planning paralegal, Houston, on-site" },
  { label: "Real estate · up to $150k", q: "Real estate attorney in Houston, up to $150k" },
];

const YEARS_LABEL: Record<ParsedSeat["years"], string> = { any: "", "1-3": "1–3 yrs", "3-6": "3–6 yrs", "6+": "6+ yrs" };
const MODE_LABEL: Record<ParsedSeat["mode"], string> = { any: "", "on-site": "On-site", hybrid: "Hybrid", remote: "Remote" };

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const Check = () => (
  <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="3.5 8.5 6.5 11.5 12.5 4.5" />
  </svg>
);

export function HeroLuxuryAskSection({ initialText, isReading, onSubmitPrompt }: HeroLuxuryAskSectionProps) {
  const [text, setText] = useState(initialText);
  const [focused, setFocused] = useState(false);
  const ref = useRef<HTMLTextAreaElement>(null);

  // Autosize the box
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }, [text]);

  const live = useMemo(() => parseSeatInput(text), [text]);
  const chips = [
    roles.find((r) => r.slug === live.role)?.name,
    (() => {
      const c = cities.find((x) => x.slug === live.city);
      return c ? `${c.name}, ${c.state}` : null;
    })(),
    YEARS_LABEL[live.years] || null,
    live.pay ? `≤ $${live.pay}k` : null,
    MODE_LABEL[live.mode] || null,
  ].filter(Boolean) as string[];

  const submit = (q: string) => {
    const t = q.trim();
    if (!t || isReading) return;
    setText(t);
    onSubmitPrompt(t);
  };

  return (
    <section className="fch" aria-labelledby="fc-hero-h1">
      <div className="fch-wrap">
        <p className="fch-eyebrow">
          <span aria-hidden="true" />
          Screened candidates · Pay only if you hire
        </p>

        <h1 id="fc-hero-h1" className="fch-h1">
          Find candidates for your <em>open seat.</em>
        </h1>
        <p className="fch-lead">Describe the seat in one sentence. We match it against screened, available profiles.</p>

        <div className={`fch-box-wrap${focused ? " is-focused" : ""}${isReading ? " is-thinking" : ""}`}>
          <div className="fch-glow" aria-hidden="true" />
          <div className="fch-ring" aria-hidden="true" />
          <form
            className="fch-box"
            role="search"
            aria-label="Describe the seat you are hiring for"
            onSubmit={(e) => {
              e.preventDefault();
              submit(text);
            }}
          >
            <label htmlFor="fc-hero-prompt-q" className="fch-sr">
              Describe the seat you are hiring for
            </label>
            <textarea
              ref={ref}
              id="fc-hero-prompt-q"
              className="fch-input"
              rows={2}
              value={text}
              placeholder="e.g. Estate planning attorney in Houston, 3–5 years, up to $145k, on-site"
              onChange={(e) => setText(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  submit(text);
                }
              }}
            />
            <div className="fch-foot">
              <div className="fch-chips" aria-live="polite">
                {text.trim() && chips.length ? (
                  chips.map((c) => (
                    <span key={c} className="fch-chip">
                      {c}
                    </span>
                  ))
                ) : (
                  <span className="fch-hint">Role, market, years, budget and office.</span>
                )}
              </div>
              <button type="submit" className="fch-submit" disabled={!text.trim() || isReading} aria-label="Find candidates">
                {isReading ? <span className="fch-spin" aria-hidden="true" /> : <ArrowIcon />}
              </button>
            </div>
          </form>
        </div>

        {isReading ? (
          <p className="fch-status" role="status">
            Matching your seat against the screened pool…
          </p>
        ) : (
          <div className="fch-examples" aria-label="Example searches">
            {EXAMPLES.map((ex) => (
              <button key={ex.label} type="button" className="fch-ex" onClick={() => submit(ex.q)} title={ex.q}>
                {ex.label}
              </button>
            ))}
          </div>
        )}

        <ul className="fch-trust">
          <li>
            <Check /> No retainer
          </li>
          <li>
            <Check /> Non-exclusive
          </li>
          <li>
            <Check /> 90-day replacement
          </li>
          <li>
            <Check /> Anonymous profiles
          </li>
        </ul>
      </div>
    </section>
  );
}
