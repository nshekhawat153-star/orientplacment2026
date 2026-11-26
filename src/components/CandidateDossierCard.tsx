"use client";

import React from "react";
import Link from "next/link";
import "./candidate-dossier-card.css";
import type { EnrichedCandidate } from "@/app/find-candidates/candidateData";

/* ------------------------------------------------------------------
   One candidate card for the homepage preview and /find-candidates.

   Only what differs between candidates is shown: where they are, what
   they do, what they cost, how soon they can start, and why they stand out.
   Things that are true of every card (screened, Texas bar, a reference ID,
   "strong fit") are left to the page header and the dossier.
   ------------------------------------------------------------------ */

const ArrowIcon = () => (
  <svg viewBox="0 0 20 20" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 10h12M11 5l5 5-5 5" />
  </svg>
);

const PinIcon = () => (
  <svg viewBox="0 0 20 20" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M10 17.5s5.5-4.9 5.5-9.2a5.5 5.5 0 0 0-11 0c0 4.3 5.5 9.2 5.5 9.2Z" />
    <circle cx="10" cy="8.3" r="1.9" />
  </svg>
);

/** "4 weeks' notice" → "4 weeks' notice", "Available now" → "Available now" (kept readable as a phrase) */
function noticeText(s: string) {
  return /available now/i.test(s) ? "Available now" : s;
}

/** Turns the matcher's long notes into one short gap, only when something does not fit. */
function gapLabel(notes: string[]): string | null {
  for (const n of notes) {
    if (/above your/i.test(n)) return "Above budget";
    if (/junior for/i.test(n)) return "Fewer years";
    if (/senior for/i.test(n)) return "More senior";
    const out = n.match(/(\d+) yrs, outside (\d+)\D+(\d+)/i);
    if (out) return Number(out[1]) > Number(out[3]) ? "More senior" : "Fewer years";
    if (/outside .* target/i.test(n)) return "Outside your years";
    const only = n.match(/open only to (.+)$/i);
    if (only) {
      const m = only[1].split("/")[0].trim();
      return `${m.charAt(0).toUpperCase()}${m.slice(1)} only`;
    }
  }
  return null;
}

type Action =
  | { href: string; onClick?: never }
  | { onClick: () => void; href?: never };

export function CandidateDossierCard({
  c,
  notes,
  warn,
  actionLabel,
  action,
  quiet = false,
}: {
  c: EnrichedCandidate;
  notes: string[];
  warn: boolean;
  actionLabel: string;
  action: Action;
  /** Already unlocked: the action reads as secondary */
  quiet?: boolean;
}) {
  const gap = warn ? gapLabel(notes) : null;
  const linkClass = `cdc-link${quiet ? " is-quiet" : ""}`;
  // Screen readers: the whole card is one link/button, named after the role
  const srName = `${actionLabel}: ${c.headline}`;

  return (
    <article className="cdc">
      <header className="cdc-top">
        <span className="cdc-loc">
          <PinIcon />
          {c.area}
        </span>
        {gap && (
          <span className="cdc-gap" title={notes.join(" · ")}>
            {gap}
          </span>
        )}
      </header>

      <h3 className="cdc-title">{c.headline}</h3>

      <p className="cdc-pay">
        ${c.pay[0]}k–${c.pay[1]}k <span>base</span>
      </p>
      <p className="cdc-facts">
        {c.years} years<span aria-hidden="true"> · </span>
        {noticeText(c.availability)}
      </p>

      {c.why && <p className="cdc-why">{c.why}</p>}

      <footer className="cdc-foot">
        {action.href ? (
          <Link className={linkClass} href={action.href} aria-label={srName}>
            {actionLabel} <ArrowIcon />
          </Link>
        ) : (
          <button type="button" className={linkClass} onClick={action.onClick} aria-label={srName}>
            {actionLabel} <ArrowIcon />
          </button>
        )}
      </footer>
    </article>
  );
}

/** Same frame, for seats we source on request. Clearly labelled as a sample. */
export function SampleDossierCard({
  title,
  location,
  pay,
  facts,
  onRequest,
}: {
  title: string;
  location: string;
  pay: string;
  facts: string;
  onRequest: () => void;
}) {
  return (
    <article className="cdc is-sample">
      <header className="cdc-top">
        <span className="cdc-loc">
          <PinIcon />
          {location}
        </span>
        <span className="cdc-sample-tag">Sample</span>
      </header>

      <h3 className="cdc-title">{title}</h3>

      <p className="cdc-pay">{pay}</p>
      <p className="cdc-facts">{facts}</p>

      <p className="cdc-why">Names, firms and full resumes are shared once you request a shortlist.</p>

      <footer className="cdc-foot">
        <button type="button" className="cdc-link" onClick={onRequest} aria-label={`Request profiles like this: ${title}`}>
          Request profiles like this <ArrowIcon />
        </button>
      </footer>
    </article>
  );
}
