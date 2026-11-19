"use client";

import React, { useState } from "react";
import { EnrichedCandidate, TERMS_DATA, generateSlotDates } from "../candidateData";

interface TermsSignatureModalProps {
  candidate: EnrichedCandidate | null;
  readOnly?: boolean;
  initialLead?: { name?: string; title?: string; firm?: string; email?: string } | null;
  onClose: () => void;
  onSign: (signedInfo: { name: string; title: string; firm: string }) => void;
  onBookCall?: (slot: string) => void;
}

export function TermsSignatureModal({
  candidate,
  readOnly = false,
  initialLead,
  onClose,
  onSign,
}: TermsSignatureModalProps) {
  const [name, setName] = useState(initialLead?.name || "");
  const [title, setTitle] = useState(initialLead?.title || "Partner");
  const [firm, setFirm] = useState(initialLead?.firm || "");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");

  // Sub-flows
  const [partnerMode, setPartnerMode] = useState(false);
  const [partnerEmail, setPartnerEmail] = useState("");
  const [partnerSent, setPartnerSent] = useState(false);

  const [callMode, setCallMode] = useState(false);
  const [bookedSlot, setBookedSlot] = useState<string | null>(null);

  const slots = generateSlotDates().slice(0, 3);

  const handleSignSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !firm.trim()) {
      setError("Please provide your full name and firm name to sign.");
      return;
    }
    if (!agreed) {
      setError("Please check the box to confirm you can sign for the firm and accept the terms.");
      return;
    }

    onSign({
      name: name.trim(),
      title: title.trim(),
      firm: firm.trim(),
    });
  };

  const handleSendToPartner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(partnerEmail.trim())) {
      setError("Please enter a valid partner email address.");
      return;
    }
    setError("");
    setPartnerSent(true);
  };

  return (
    <div
      className="fc-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="terms-modal-title"
    >
      <div
        className="fc-modal-card"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: 640 }}
      >
        <button
          type="button"
          className="fc-modal-close"
          onClick={onClose}
          aria-label="Close terms modal"
        >
          ×
        </button>

        {/* HEADER */}
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
            ONE-PAGE CONTINGENCY TERMS {candidate ? `· ${candidate.id}` : ""}
          </span>
          <h2
            id="terms-modal-title"
            style={{
              fontFamily: "var(--display)",
              fontSize: 26,
              fontWeight: 500,
              color: "#08142A",
              margin: "12px 0 6px",
            }}
          >
            {candidate ? "Meet this candidate" : "Orion Placement Terms"}
          </h2>
          <p style={{ color: "#64748B", fontSize: 14, margin: 0, lineHeight: 1.5 }}>
            Plain words, zero fine print. Signing takes under a minute. The executed copy is emailed to your firm immediately.
          </p>
        </div>

        {/* 4 CORE TERMS TILES */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
            gap: 10,
            margin: "16px 0",
          }}
        >
          <div style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 10, padding: "12px 14px" }}>
            <span style={{ fontFamily: "var(--display)", fontSize: 24, fontWeight: 500, color: "#1D4ED8", display: "block" }}>
              {TERMS_DATA.fee}
            </span>
            <span style={{ fontSize: 12, color: "#64748B", lineHeight: 1.3 }}>
              Of 1st-year base salary, only if you hire
            </span>
          </div>
          <div style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 10, padding: "12px 14px" }}>
            <span style={{ fontFamily: "var(--display)", fontSize: 24, fontWeight: 500, color: "#1D4ED8", display: "block" }}>
              {TERMS_DATA.guarantee}
            </span>
            <span style={{ fontSize: 12, color: "#64748B", lineHeight: 1.3 }}>
              Free replacement warranty if they depart
            </span>
          </div>
          <div style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 10, padding: "12px 14px" }}>
            <span style={{ fontFamily: "var(--display)", fontSize: 24, fontWeight: 500, color: "#1D4ED8", display: "block" }}>
              Net 15
            </span>
            <span style={{ fontSize: 12, color: "#64748B", lineHeight: 1.3 }}>
              Invoice payable from physical start date
            </span>
          </div>
          <div style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 10, padding: "12px 14px" }}>
            <span style={{ fontFamily: "var(--display)", fontSize: 24, fontWeight: 500, color: "#1D4ED8", display: "block" }}>
              Zero
            </span>
            <span style={{ fontSize: 12, color: "#64748B", lineHeight: 1.3 }}>
              Upfront retainer or exclusivity required
            </span>
          </div>
        </div>

        {/* 4 PLAIN CLAUSES */}
        <ol
          style={{
            fontSize: 13.5,
            color: "#334155",
            background: "#FFFFFF",
            border: "1px solid #E2E8F0",
            borderRadius: 10,
            padding: "14px 18px 14px 34px",
            margin: "0 0 20px",
            lineHeight: 1.6,
          }}
        >
          <li>You pay nothing to view profiles, receive resumes, or conduct interviews.</li>
          <li>If your firm has actively engaged this candidate in the last 6 months, tell us within 2 business days and no fee applies.</li>
          <li>If you hire any candidate we introduced within 12 months, our standard 23% flat contingency fee applies on start date.</li>
          <li>If the candidate leaves or is let go within 90 calendar days, we conduct a replacement search at zero additional fee.</li>
        </ol>

        {readOnly ? (
          <button
            type="button"
            className="btn btn-primary fc-card-cta-btn"
            onClick={onClose}
            style={{
              width: "100%",
              height: 46,
              borderRadius: 8,
              background: "#2563EB",
              color: "#FFFFFF",
              border: 0,
              fontWeight: 600,
              fontSize: 14.5,
              cursor: "pointer",
              boxShadow: "0 4px 14px rgba(37, 99, 235, 0.35)",
            }}
          >
            Close terms
          </button>
        ) : (
          <>
            {/* SIGNATURE FORM */}
            <form onSubmit={handleSignSubmit}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                <div>
                  <label
                    htmlFor="fc-sign-name"
                    style={{ display: "block", fontSize: 12.5, fontWeight: 600, color: "#08142A", marginBottom: 4 }}
                  >
                    Your full name
                  </label>
                  <input
                    id="fc-sign-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Johnathan Smith"
                    style={{
                      width: "100%",
                      height: 42,
                      border: "1.5px solid #CBD5E1",
                      borderRadius: 7,
                      padding: "0 12px",
                      fontSize: 14,
                      background: "#FFFFFF",
                      outline: "none",
                    }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="fc-sign-title"
                    style={{ display: "block", fontSize: 12.5, fontWeight: 600, color: "#08142A", marginBottom: 4 }}
                  >
                    Title
                  </label>
                  <input
                    id="fc-sign-title"
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Managing Partner"
                    style={{
                      width: "100%",
                      height: 42,
                      border: "1.5px solid #CBD5E1",
                      borderRadius: 7,
                      padding: "0 12px",
                      fontSize: 14,
                      background: "#FFFFFF",
                      outline: "none",
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: 12 }}>
                <label
                  htmlFor="fc-sign-firm"
                  style={{ display: "block", fontSize: 12.5, fontWeight: 600, color: "#08142A", marginBottom: 4 }}
                >
                  Law firm name
                </label>
                <input
                  id="fc-sign-firm"
                  type="text"
                  required
                  value={firm}
                  onChange={(e) => setFirm(e.target.value)}
                  placeholder="e.g. Smith, Sterling & Associates LLP"
                  style={{
                    width: "100%",
                    height: 42,
                    border: "1.5px solid #CBD5E1",
                    borderRadius: 7,
                    padding: "0 12px",
                    fontSize: 14,
                    background: "#FFFFFF",
                    outline: "none",
                  }}
                />
              </div>

              {/* CURSIVE SIGNATURE PREVIEW */}
              <div style={{ marginBottom: 16 }}>
                <span style={{ fontSize: 12, color: "#64748B", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                  Digital Signature
                </span>
                <div className="fc-signature-preview" aria-live="polite">
                  {name ? name : <span style={{ opacity: 0.35, fontSize: 18 }}>Your signature appears here</span>}
                </div>
              </div>

              <label
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  fontSize: 13.5,
                  color: "#08142A",
                  cursor: "pointer",
                  margin: "14px 0",
                }}
              >
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  style={{ width: 18, height: 18, marginTop: 2, accentColor: "#1D4ED8", flexShrink: 0 }}
                />
                <span>I have authority to sign for the firm and agree to these one-page terms.</span>
              </label>

              {error && (
                <p style={{ color: "#DC2626", fontSize: 13, margin: "6px 0 12px" }} role="alert">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="btn btn-primary fc-card-cta-btn"
                style={{
                  width: "100%",
                  height: 48,
                  borderRadius: 8,
                  background: "#2563EB",
                  color: "#FFFFFF",
                  border: 0,
                  fontWeight: 600,
                  fontSize: 15,
                  cursor: "pointer",
                  boxShadow: "0 4px 14px rgba(37, 99, 235, 0.35)",
                }}
              >
                Sign and see the name →
              </button>
            </form>

            {/* ALTERNATIVE ACTIONS */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 14 }}>
              <button
                type="button"
                onClick={() => {
                  setPartnerMode(!partnerMode);
                  setCallMode(false);
                }}
                style={{
                  background: "#FFFFFF",
                  border: "1.5px solid #CBD5E1",
                  borderRadius: 8,
                  padding: "10px",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#08142A",
                  cursor: "pointer",
                }}
              >
                Send to my partner to sign
              </button>
              <button
                type="button"
                onClick={() => {
                  setCallMode(!callMode);
                  setPartnerMode(false);
                }}
                style={{
                  background: "#FFFFFF",
                  border: "1.5px solid #CBD5E1",
                  borderRadius: 8,
                  padding: "10px",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#08142A",
                  cursor: "pointer",
                }}
              >
                I&apos;d like to talk about terms
              </button>
            </div>

            {/* EXPANDABLE PARTNER FLOW */}
            {partnerMode && (
              <div style={{ background: "#FFFFFF", border: "1.5px solid #DBEAFE", borderRadius: 10, padding: "16px", marginTop: 14 }}>
                {partnerSent ? (
                  <div style={{ color: "#15803D", fontSize: 13.5, fontWeight: 500 }}>
                    ✓ Sent to {partnerEmail}. Your partner will receive the candidate profile and a secure 1-minute sign link.
                  </div>
                ) : (
                  <form onSubmit={handleSendToPartner}>
                    <label style={{ display: "block", fontSize: 12.5, fontWeight: 600, color: "#08142A", marginBottom: 4 }}>
                      Partner&apos;s email address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="partner@yourfirm.com"
                      value={partnerEmail}
                      onChange={(e) => setPartnerEmail(e.target.value)}
                      style={{
                        width: "100%",
                        height: 40,
                        border: "1.5px solid #CBD5E1",
                        borderRadius: 6,
                        padding: "0 12px",
                        fontSize: 14,
                        marginBottom: 10,
                      }}
                    />
                    <button
                      type="submit"
                      className="fc-card-cta-btn"
                      style={{
                        background: "#2563EB",
                        color: "#FFFFFF",
                        border: 0,
                        borderRadius: 6,
                        padding: "8px 16px",
                        fontSize: 13,
                        fontWeight: 600,
                        cursor: "pointer",
                        boxShadow: "0 2px 8px rgba(37, 99, 235, 0.3)",
                      }}
                    >
                      Send sign link to partner →
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* EXPANDABLE CALL BOOKING FLOW */}
            {callMode && (
              <div style={{ background: "#FFFFFF", border: "1.5px solid #DBEAFE", borderRadius: 10, padding: "16px", marginTop: 14 }}>
                {bookedSlot ? (
                  <div style={{ color: "#15803D", fontSize: 13.5, fontWeight: 500 }}>
                    ✓ 15-minute briefing booked for {bookedSlot}. Justin will call you directly. The candidate dossier remains on hold for your firm.
                  </div>
                ) : (
                  <div>
                    <div style={{ fontSize: 13.5, fontWeight: 600, color: "#08142A", marginBottom: 8 }}>
                      Pick 15 minutes with founder Justin Sofman:
                    </div>
                    <div className="fc-slots-grid">
                      {slots.map((s) => (
                        <button
                          key={s}
                          type="button"
                          className="fc-slot-btn"
                          onClick={() => setBookedSlot(s)}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

