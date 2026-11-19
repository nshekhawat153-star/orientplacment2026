"use client";

import React, { useState } from "react";
import { EnrichedCandidate } from "../candidateData";

interface WorkEmailGateModalProps {
  candidate: EnrichedCandidate;
  onClose: () => void;
  onSuccess: (lead: { email: string; firm: string; guessName: string }) => void;
}

export function WorkEmailGateModal({
  candidate,
  onClose,
  onSuccess,
}: WorkEmailGateModalProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isPersonal, setIsPersonal] = useState(false);

  const handleEmailChange = (val: string) => {
    setEmail(val);
    setError("");
    const personalCheck = /@(gmail|yahoo|hotmail|outlook|icloud|aol)\./i.test(val);
    setIsPersonal(personalCheck);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(trimmed)) {
      setError("Please enter a valid work email like name@yourfirm.com");
      return;
    }

    const domain = trimmed.split("@")[1].split(".")[0];
    const isFree = /gmail|yahoo|hotmail|outlook|icloud|aol/i.test(domain);
    const firmName = isFree
      ? ""
      : domain
          .replace(/[-_]/g, " ")
          .replace(/\b\w/g, (x) => x.toUpperCase());

    const localPart = trimmed.split("@")[0].split(/[._]/)[0];
    const guessName = localPart
      ? localPart.charAt(0).toUpperCase() + localPart.slice(1)
      : "";

    onSuccess({
      email: trimmed,
      firm: firmName,
      guessName,
    });
  };

  return (
    <div
      className="fc-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="gate-modal-title"
    >
      <div
        className="fc-modal-card"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: 540 }}
      >
        <button
          type="button"
          className="fc-modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>

        <div style={{ marginBottom: 16 }}>
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: 11.5,
              fontWeight: 700,
              color: "#1D4ED8",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              background: "#EFF6FF",
              border: "1px solid #DBEAFE",
              padding: "4px 10px",
              borderRadius: 6,
            }}
          >
            {candidate.id} · DOSSIER ACCESS
          </span>
          <h2
            id="gate-modal-title"
            style={{
              fontFamily: "var(--display)",
              fontSize: 26,
              fontWeight: 500,
              color: "#08142A",
              margin: "12px 0 6px",
            }}
          >
            Get the full candidate resume
          </h2>
          <p style={{ color: "#64748B", fontSize: 14, margin: 0, lineHeight: 1.5 }}>
            Unlock complete career history, caseload volume metrics, and Justin&apos;s verified interview notes.
          </p>
        </div>

        {/* VALUE CHECKPOINTS */}
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: "16px 0 20px",
            fontSize: 14,
            color: "#334155",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <li style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
            <span style={{ color: "#1D4ED8", fontWeight: 700 }}>✓</span>
            <span>Every previous law firm role, case volumes, and specific software proficiency</span>
          </li>
          <li style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
            <span style={{ color: "#1D4ED8", fontWeight: 700 }}>✓</span>
            <span>Justin&apos;s intake notes: exact reason for leaving, notice period, and office expectations</span>
          </li>
          <li style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
            <span style={{ color: "#1D4ED8", fontWeight: 700 }}>✓</span>
            <span>Direct channel to ask Justin anything about this candidate before deciding to meet</span>
          </li>
        </ul>

        {/* EMAIL FORM */}
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="fc-gate-email"
            style={{
              display: "block",
              fontSize: 13,
              fontWeight: 600,
              color: "#08142A",
              marginBottom: 6,
            }}
          >
            Work email
          </label>
          <input
            id="fc-gate-email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@yourfirm.com"
            value={email}
            onChange={(e) => handleEmailChange(e.target.value)}
            style={{
              width: "100%",
              height: 48,
              border: "1.5px solid #CBD5E1",
              borderRadius: 8,
              padding: "0 14px",
              fontSize: 15,
              color: "#08142A",
              background: "#FFFFFF",
              outline: "none",
              transition: "border-color 0.15s ease",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#1D4ED8")}
            onBlur={(e) => (e.target.style.borderColor = "#CBD5E1")}
          />

          {error && (
            <p style={{ color: "#DC2626", fontSize: 13, margin: "6px 0 0" }} role="alert">
              {error}
            </p>
          )}

          {isPersonal && (
            <p style={{ color: "#D97706", fontSize: 12.5, margin: "6px 0 0" }}>
              Personal email works too. A firm email gets you faster dossier delivery.
            </p>
          )}

          <button
            type="submit"
            className="btn btn-primary fc-card-cta-btn"
            style={{
              width: "100%",
              height: 48,
              marginTop: 18,
              borderRadius: 8,
              fontSize: 15,
              fontWeight: 600,
              background: "#2563EB",
              color: "#FFFFFF",
              border: 0,
              cursor: "pointer",
              boxShadow: "0 4px 14px rgba(37, 99, 235, 0.35)",
            }}
          >
            Show the full resume →
          </button>
        </form>

        <p
          style={{
            fontSize: 12.5,
            color: "#64748B",
            textAlign: "center",
            marginTop: 14,
            marginBottom: 18,
          }}
        >
          No agreement required to read profiles · Candidate names revealed when you both agree to interview
        </p>

        {/* SOCIAL PROOF QUOTE */}
        <div
          style={{
            background: "#FFFFFF",
            border: "1px solid #E2E8F0",
            borderRadius: 10,
            padding: "14px 16px",
            display: "flex",
            gap: 12,
            alignItems: "center",
            fontSize: 13,
            color: "#334155",
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "#08142A",
              color: "#FFFFFF",
              display: "grid",
              placeItems: "center",
              fontWeight: 700,
              fontSize: 14,
              flexShrink: 0,
            }}
          >
            B
          </div>
          <div>
            <div style={{ color: "#1D4ED8", fontSize: 12, marginBottom: 2 }}>★★★★★</div>
            <div>&ldquo;Justin found a perfect lateral associate for our estate planning group within days.&rdquo;</div>
            <div style={{ color: "#64748B", fontSize: 11.5, marginTop: 2 }}>Brett Z., Managing Partner · Google 5.0 Review</div>
          </div>
        </div>
      </div>
    </div>
  );
}

