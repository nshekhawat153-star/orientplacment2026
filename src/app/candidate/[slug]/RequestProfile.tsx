"use client";

import React, { useState } from "react";
import { PkCheck, PkArrow } from "@/components/PageKit";

/* Request the full profile for one candidate (work email + firm). */
export function RequestProfile({ headline }: { headline: string }) {
  const [email, setEmail] = useState("");
  const [firm, setFirm] = useState("");
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="pk-form-done" role="status">
        <span className="pk-form-done-ico" aria-hidden="true">
          <PkCheck size={28} />
        </span>
        <h3>Request received.</h3>
        <p>
          Justin will send the full profile to <b>{email}</b>, usually within the hour. Nothing to sign until you want to
          interview.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (email.trim()) setSent(true);
      }}
    >
      <span className="pk-form-k">Free · no commitment</span>
      <h2 className="pk-form-h">Get the full profile</h2>
      <p className="cp-form-sub">{headline}</p>
      <ul className="cp-bullets">
        <li>
          <PkCheck /> Full resume and firm history, usually within the hour
        </li>
        <li>
          <PkCheck /> Name shared once both sides want to talk
        </li>
        <li>
          <PkCheck /> No fee unless you hire
        </li>
      </ul>
      <div className="pk-fields">
        <label className="pk-field">
          <span>Work email</span>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@yourfirm.com" autoComplete="email" />
        </label>
        <label className="pk-field">
          <span>
            Firm <em>optional</em>
          </span>
          <input type="text" value={firm} onChange={(e) => setFirm(e.target.value)} placeholder="Firm name" autoComplete="organization" />
        </label>
      </div>
      <button type="submit" className="pk-btn is-primary cp-send">
        Send me the profile <PkArrow />
      </button>
      <p className="pk-form-fine">The candidate’s current employer is never contacted.</p>
    </form>
  );
}
