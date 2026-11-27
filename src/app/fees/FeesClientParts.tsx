"use client";

import React, { useState } from "react";
import { PkCheck, PkArrow } from "@/components/PageKit";

/* Copy the recruiter questions to the clipboard. */
export function CopyQuestions({ questions }: { questions: string[] }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    const text = "Questions to ask a legal recruiter\n" + questions.map((q, i) => `${i + 1}. ${q}`).join("\n");
    navigator.clipboard?.writeText(text).then(
      () => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2500);
      },
      () => undefined
    );
  };
  return (
    <button type="button" className={`fe-copy${copied ? " is-done" : ""}`} onClick={copy}>
      {copied ? (
        <>
          <PkCheck /> Copied
        </>
      ) : (
        `Copy the ${questions.length} questions`
      )}
    </button>
  );
}

/* Email me the one-page terms. */
export function TermsEmail() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  if (sent) {
    return (
      <div className="pk-form-done" role="status">
        <span className="pk-form-done-ico" aria-hidden="true">
          <PkCheck size={28} />
        </span>
        <h3>On its way.</h3>
        <p>
          The one-page terms are going to <b>{email}</b>. Nothing to sign. Justin replies within a business hour in case you
          want to talk the seat through.
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
      <span className="pk-form-k">In writing</span>
      <h2 className="pk-form-h">Email me the one-page terms</h2>
      <ul className="fe-bullets">
        <li>
          <PkCheck /> Fee, guarantee and payment terms on one page
        </li>
        <li>
          <PkCheck /> The recruiter questions, with Orion’s answers
        </li>
        <li>
          <PkCheck /> Ready to forward to a partner
        </li>
      </ul>
      <label className="pk-field">
        <span>Work email</span>
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@yourfirm.com" autoComplete="email" />
      </label>
      <button type="submit" className="pk-btn is-primary fe-send">
        Send me the terms <PkArrow />
      </button>
      <p className="pk-form-fine">One email with the terms. You are not added to a list.</p>
    </form>
  );
}
