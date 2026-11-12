"use client";

import React, { useState } from "react";
import { useSite } from "@/context/SiteContext";
import { terms, findRole, findCity } from "@/data";
import { Mark } from "./Mark";

export interface GateFormProps {
  id?: string;
  title?: string;
  intro?: string;
  eyebrow?: string;
  doneEyebrow?: string;
  bullets?: string[];
  button?: string;
  preset?: "profiles" | "profile" | "kit" | "guide";
  steps?: Array<[string, string, boolean?]>;
  ids?: string[];
  candidateIds?: string[];
  reviewSlug?: string;
  review?: string;
  role?: string;
  city?: string;
  audience?: "employer" | "candidate";
  fine?: string;
  compact?: boolean;
  gateNote?: string;
  onDone?: (email: string) => void;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function GateForm({
  id = "gate",
  title = "Get the full profiles",
  intro,
  eyebrow,
  doneEyebrow = "Request received",
  bullets,
  button = "Send me the full profiles",
  preset = "profiles",
  steps: customSteps,
  ids: passedIds = [],
  candidateIds,
  reviewSlug: passedReviewSlug,
  review,
  role = "estate-planning-attorney",
  city = "houston-tx",
  audience = "employer",
  fine,
  compact = false,
  gateNote,
  onDone,
}: GateFormProps) {
  const ids = candidateIds || passedIds;
  const reviewSlug = review || passedReviewSlug;
  const { setUnlocked, setUserEmail } = useSite();
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [firm, setFirm] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneErr, setPhoneErr] = useState("");
  const [moreDone, setMoreDone] = useState(false);
  const [thanksMsg, setThanksMsg] = useState("");

  const isCand = audience === "candidate";
  const ph = isCand ? "you@gmail.com" : "you@yourfirm.com";
  const label = isCand ? "Personal email" : "Work email";

  const defaultFine =
    fine ||
    (isCand
      ? "Use a personal email, not your work one. We never contact your current firm, and no employer sees your name until you say yes."
      : "No agreement and no fee to see profiles. We never tell a candidate's firm, and candidates do not see your details without your yes.");

  const getSteps = (): Array<[string, string, boolean?]> => {
    if (customSteps) return customSteps;
    const r = findRole(role);
    const c = findCity(city);
    const idsStr = ids.length ? ids.join(", ") : "the candidates you picked";

    if (preset === "profile") {
      return [
        ["Now", "Your request is with Justin. Nothing is shared with the candidate's current firm.", true],
        ["Within one business hour", `The full redacted resume for ${idsStr}, references on request, and our one-page terms.`],
        ["Within one business day", "Justin calls or emails to book an interview at a time that suits you."],
        ["Before the interview", `A one-page agreement to sign online: ${terms.fee}, ${terms.guarantee}, ${terms.payment}.`],
      ];
    }
    if (preset === "kit") {
      return [
        ["Now", "The hiring kit is on its way to your inbox.", true],
        ["Each month", `New ${r ? r.short : "legal"} candidates in ${c ? c.name : "your city"}. Unsubscribe in one click.`],
      ];
    }
    if (preset === "guide") {
      return [
        ["Now", `The ${c ? c.name : "local"} legal salary guide (PDF) is on its way to your inbox.`, true],
        ["Each quarter", "The updated guide when the bands change. Unsubscribe in one click."],
      ];
    }
    return [
      ["Now", "Your request is with Justin. Nothing is shared with the candidates' current firms.", true],
      ["Within one business hour", `Full redacted profiles for ${idsStr} and our one-page terms.`],
      ["Within one business day", "Justin confirms the seat with you and books first interviews. You sign the agreement only when you want to meet someone."],
      ["Each month", `New ${r ? r.short : "legal"} candidates in ${c ? c.name : "your city"}. Unsubscribe in one click.`],
    ];
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = email.trim();
    if (!v) {
      setEmailErr(
        isCand
          ? "Enter your personal email so we can send your matches."
          : "Enter your work email so we know where to send them."
      );
      return;
    }
    if (!v.includes("@")) {
      setEmailErr("That email is missing the @ sign.");
      return;
    }
    if (!EMAIL_RE.test(v)) {
      setEmailErr(`That email looks incomplete. Check it reads like ${ph}.`);
      return;
    }

    setEmailErr("");
    setSubmitted(true);
    setUnlocked(true);
    setUserEmail(v);
    if (onDone) onDone(v);
  };

  const handleMoreSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phClean = phone.trim();
    const digits = phClean.replace(/\D/g, "");
    if (phClean && digits.length < 10) {
      setPhoneErr("That phone number looks short. Include the area code.");
      return;
    }

    setPhoneErr("");
    setMoreDone(true);
    if (!phClean && !firm.trim()) {
      setThanksMsg("No problem. Everything comes by email.");
    } else {
      setThanksMsg(
        phClean
          ? `Thanks. Justin may call ${phClean} to save you an email.`
          : `Thanks. Justin will reply with ${firm.trim()} in the subject line.`
      );
    }
  };

  const steps = getSteps();

  return (
    <div id={id} className="gate-wrap">
      {gateNote && (
        <p className="gate-note">
          Requesting profile for <b>{gateNote}</b>
        </p>
      )}

      {!submitted ? (
        <form className="gate" noValidate onSubmit={handleEmailSubmit}>
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h3>{title}</h3>
          {intro && <p className="small">{intro}</p>}
          {bullets && !compact && (
            <ul className="ticks">
              {bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          )}
          <div className="gate-row">
            <div className={`field${emailErr ? " err" : ""}`}>
              <label htmlFor={`${id}-email`}>{label}</label>
              <input
                id={`${id}-email`}
                type="email"
                name="email"
                autoComplete="email"
                inputMode="email"
                required
                placeholder={ph}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailErr) setEmailErr("");
                }}
              />
              <span className="err-msg" aria-live="polite">
                {emailErr}
              </span>
            </div>
            <button className="btn btn-primary" type="submit">
              {button}
            </button>
          </div>
          <p className="fine">{defaultFine}</p>
        </form>
      ) : (
        <div className="confirm" role="status" tabIndex={-1}>
          <span className="eyebrow">{doneEyebrow}</span>
          <h3>Sent to {email}</h3>
          <ol className="timeline">
            {steps.map((s, idx) => (
              <li key={idx} className={s[2] ? "done" : ""}>
                <span className="when">{idx === 0 ? s[0] : <Mark>{s[0]}</Mark>}</span>
                <p>{s[1]}</p>
              </li>
            ))}
          </ol>

          {!moreDone ? (
            <form className="gate-more" noValidate onSubmit={handleMoreSubmit}>
              <p>
                <b>
                  {isCand
                    ? "Add a phone number for a faster reply"
                    : "Add your firm and a phone number for a faster reply"}
                </b>{" "}
                <span className="muted">(optional)</span>
              </p>
              <div className="row">
                {!isCand && (
                  <div className="field">
                    <label htmlFor={`${id}-firm`}>Firm name</label>
                    <input
                      id={`${id}-firm`}
                      name="firm"
                      type="text"
                      autoComplete="organization"
                      value={firm}
                      onChange={(e) => setFirm(e.target.value)}
                    />
                  </div>
                )}
                <div className={`field${phoneErr ? " err" : ""}`}>
                  <label htmlFor={`${id}-phone`}>Phone</label>
                  <input
                    id={`${id}-phone`}
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (phoneErr) setPhoneErr("");
                    }}
                  />
                  <span className="err-msg" aria-live="polite">
                    {phoneErr}
                  </span>
                </div>
              </div>
              <button className="btn btn-ghost btn-sm" type="submit">
                Add details
              </button>
            </form>
          ) : (
            <p className="gate-thanks">{thanksMsg}</p>
          )}
        </div>
      )}
    </div>
  );
}
