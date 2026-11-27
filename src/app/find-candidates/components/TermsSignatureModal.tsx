"use client";

import React, { useEffect, useState } from "react";
import "./fc-modals.css";
import { EnrichedCandidate, TERMS_DATA, generateSlotDates } from "../candidateData";

interface TermsSignatureModalProps {
  candidate: EnrichedCandidate | null;
  readOnly?: boolean;
  initialLead?: { name?: string; title?: string; firm?: string; email?: string } | null;
  onClose: () => void;
  onSign: (signedInfo: { name: string; title: string; firm: string }) => void;
  onBookCall?: (slot: string) => void;
}

const TERMS = [
  { k: TERMS_DATA.fee, v: "One contingency fee, only if you hire" },
  { k: TERMS_DATA.guarantee, v: "Free replacement if they leave" },
  { k: "Net 15", v: "Invoiced from the start date" },
  { k: "$0", v: "Upfront, and no exclusivity" },
];

const CLAUSES = [
  "You pay nothing to view profiles, receive resumes or interview.",
  "If your firm already engaged this candidate in the last 6 months, tell us within 2 business days and no fee applies.",
  "If you hire any candidate we introduced within 12 months, the contingency fee applies on the start date.",
  "If the hire leaves or is let go within 90 calendar days, we search again at no extra fee.",
];

const Check = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="3.5 8.5 6.5 11.5 12.5 4.5" />
  </svg>
);

export function TermsSignatureModal({ candidate, readOnly = false, initialLead, onClose, onSign }: TermsSignatureModalProps) {
  const [name, setName] = useState(initialLead?.name || "");
  const [title, setTitle] = useState(initialLead?.title || "Partner");
  const [firm, setFirm] = useState(initialLead?.firm || "");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");

  const [partnerMode, setPartnerMode] = useState(false);
  const [partnerEmail, setPartnerEmail] = useState("");
  const [partnerSent, setPartnerSent] = useState(false);
  const [callMode, setCallMode] = useState(false);
  const [bookedSlot, setBookedSlot] = useState<string | null>(null);
  const slots = generateSlotDates().slice(0, 3);

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

  const handleSignSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !firm.trim()) {
      setError("Add your full name and firm name to sign.");
      return;
    }
    if (!agreed) {
      setError("Tick the box to confirm you can sign for the firm.");
      return;
    }
    onSign({ name: name.trim(), title: title.trim(), firm: firm.trim() });
  };

  const handleSendToPartner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(partnerEmail.trim())) {
      setError("Enter a valid partner email.");
      return;
    }
    setError("");
    setPartnerSent(true);
  };

  return (
    <div className="fm-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="terms-modal-title">
      <div className="fm-card fm-terms" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="fm-close is-light" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <header className="fm-terms-head">
          <span className="fm-side-k">One-page terms{candidate ? ` · ${candidate.headline}` : ""}</span>
          <h2 id="terms-modal-title" className="fm-h2 is-light">
            {candidate ? (
              <>
                Meet this <em>candidate.</em>
              </>
            ) : (
              <>
                Orion’s terms, <em>on one page.</em>
              </>
            )}
          </h2>
          <p>Plain words, no fine print. Signing takes under a minute and a copy is emailed to your firm.</p>
          <dl className="fm-terms-grid">
            {TERMS.map((t) => (
              <div key={t.v}>
                <dt>{t.k}</dt>
                <dd>{t.v}</dd>
              </div>
            ))}
          </dl>
        </header>

        <div className="fm-terms-body">
          <ol className="fm-clauses">
            {CLAUSES.map((c, i) => (
              <li key={c}>
                <span>{i + 1}</span>
                {c}
              </li>
            ))}
          </ol>

          {readOnly ? (
            <button type="button" className="fm-btn fc-card-cta-btn" onClick={onClose}>
              Close
            </button>
          ) : (
            <>
              <form onSubmit={handleSignSubmit} noValidate>
                <div className="fm-fields">
                  <label>
                    <span className="fm-label">Your full name</span>
                    <input id="fc-sign-name" className="fm-input" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Jonathan Smith" autoComplete="name" />
                  </label>
                  <label>
                    <span className="fm-label">Title</span>
                    <input id="fc-sign-title" className="fm-input" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Managing Partner" />
                  </label>
                  <label className="is-wide">
                    <span className="fm-label">Law firm</span>
                    <input id="fc-sign-firm" className="fm-input" type="text" value={firm} onChange={(e) => setFirm(e.target.value)} placeholder="e.g. Smith & Sterling LLP" autoComplete="organization" />
                  </label>
                </div>

                <div className="fm-sign">
                  <span className="fm-label">Signature</span>
                  <div className="fc-signature-preview fm-sign-line" aria-live="polite">
                    {name ? name : <span className="fm-sign-ph">Your signature appears here</span>}
                  </div>
                </div>

                <label className={`fm-agree${agreed ? " is-on" : ""}`}>
                  <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
                  <span className="fm-box" aria-hidden="true">
                    {agreed && <Check />}
                  </span>
                  <span>I can sign for the firm and agree to these one-page terms.</span>
                </label>

                {error && (
                  <p className="fm-msg is-error" role="alert">
                    {error}
                  </p>
                )}

                <button type="submit" className="fm-btn fc-card-cta-btn">
                  Sign and see the name
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </button>
              </form>

              <div className="fm-alt">
                <button
                  type="button"
                  className={partnerMode ? "is-on" : ""}
                  onClick={() => {
                    setPartnerMode(!partnerMode);
                    setCallMode(false);
                  }}
                >
                  Send to my partner to sign
                </button>
                <button
                  type="button"
                  className={callMode ? "is-on" : ""}
                  onClick={() => {
                    setCallMode(!callMode);
                    setPartnerMode(false);
                  }}
                >
                  Talk about the terms first
                </button>
              </div>

              {partnerMode && (
                <div className="fm-sub">
                  {partnerSent ? (
                    <p className="fm-ok">
                      <Check /> Sent to {partnerEmail}. Your partner gets the profile and a one-minute sign link.
                    </p>
                  ) : (
                    <form onSubmit={handleSendToPartner} className="fm-inline" noValidate>
                      <input className="fm-input" type="email" placeholder="partner@yourfirm.com" value={partnerEmail} onChange={(e) => setPartnerEmail(e.target.value)} aria-label="Partner email" />
                      <button type="submit" className="fm-btn is-dark fc-card-cta-btn">
                        Send link
                      </button>
                    </form>
                  )}
                </div>
              )}

              {callMode && (
                <div className="fm-sub">
                  {bookedSlot ? (
                    <p className="fm-ok">
                      <Check /> 15 minutes booked for {bookedSlot}. Justin will call you, and this profile stays on hold for your firm.
                    </p>
                  ) : (
                    <>
                      <span className="fm-label">Pick 15 minutes with Justin</span>
                      <div className="fm-slots fc-slots-grid">
                        {slots.map((s) => (
                          <button key={s} type="button" className="fc-slot-btn" onClick={() => setBookedSlot(s)}>
                            {s}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
