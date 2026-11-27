"use client";

import React, { useEffect, useState } from "react";
import "./fc-modals.css";
import { EnrichedCandidate } from "../candidateData";

interface WorkEmailGateModalProps {
  candidate: EnrichedCandidate;
  onClose: () => void;
  onSuccess: (lead: { email: string; firm: string; guessName: string }) => void;
}

const Check = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="3.5 8.5 6.5 11.5 12.5 4.5" />
  </svg>
);

export function WorkEmailGateModal({ candidate, onClose, onSuccess }: WorkEmailGateModalProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isPersonal, setIsPersonal] = useState(false);

  // Escape closes, page behind does not scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const handleEmailChange = (val: string) => {
    setEmail(val);
    setError("");
    setIsPersonal(/@(gmail|yahoo|hotmail|outlook|icloud|aol)\./i.test(val));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(trimmed)) {
      setError("Enter a valid email, like name@yourfirm.com");
      return;
    }
    const domain = trimmed.split("@")[1].split(".")[0];
    const isFree = /gmail|yahoo|hotmail|outlook|icloud|aol/i.test(domain);
    const firmName = isFree ? "" : domain.replace(/[-_]/g, " ").replace(/\b\w/g, (x) => x.toUpperCase());
    const localPart = trimmed.split("@")[0].split(/[._]/)[0];
    const guessName = localPart ? localPart.charAt(0).toUpperCase() + localPart.slice(1) : "";
    onSuccess({ email: trimmed, firm: firmName, guessName });
  };

  return (
    <div className="fm-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="gate-modal-title">
      <div className="fm-card fm-gate" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="fm-close" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <aside className="fm-side">
          <span className="fm-side-k">The candidate</span>
          <p className="fm-side-title">{candidate.headline}</p>
          <p className="fm-side-pay">
            ${candidate.pay[0]}k–${candidate.pay[1]}k<small>base</small>
          </p>
          <div className="fm-side-chips">
            <span>{candidate.years} years</span>
            <span>{candidate.area}</span>
            <span>{candidate.availability}</span>
          </div>
          <figure className="fm-quote">
            <span aria-hidden="true">★★★★★</span>
            <blockquote>“Jon did an amazing job finding me a perfect candidate for my company.”</blockquote>
            <figcaption>Brett Zimmerman · Google review</figcaption>
          </figure>
        </aside>

        <div className="fm-main">
          <span className="fm-k">Free · no agreement to read</span>
          <h2 id="gate-modal-title" className="fm-h2">
            Get the <em>full resume.</em>
          </h2>
          <ul className="fm-list">
            <li>
              <Check /> Every past firm, case volumes and software
            </li>
            <li>
              <Check /> Justin’s notes: why they’re leaving, notice, office needs
            </li>
            <li>
              <Check /> Ask Justin anything before you decide to meet
            </li>
          </ul>

          <form onSubmit={handleSubmit} noValidate>
            <label htmlFor="fc-gate-email" className="fm-label">
              Work email
            </label>
            <input
              id="fc-gate-email"
              className={`fm-input${error ? " is-error" : ""}`}
              type="email"
              required
              autoComplete="email"
              placeholder="you@yourfirm.com"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              autoFocus
            />
            {error && (
              <p className="fm-msg is-error" role="alert">
                {error}
              </p>
            )}
            {isPersonal && !error && <p className="fm-msg is-warn">Personal email works too. A firm email gets it to you faster.</p>}
            <button type="submit" className="fm-btn fc-card-cta-btn">
              Show the full resume
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </form>
          <p className="fm-fine">Names are shared once you both agree to interview.</p>
        </div>
      </div>
    </div>
  );
}
