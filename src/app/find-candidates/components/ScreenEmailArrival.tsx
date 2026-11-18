"use client";

import React from "react";

interface ScreenEmailArrivalProps {
  onOpenCandidateLink: () => void;
}

export function ScreenEmailArrival({
  onOpenCandidateLink,
}: ScreenEmailArrivalProps) {
  return (
    <section className="fc-email-screen" style={{ padding: "40px 0 80px" }}>
      <div className="wrap" style={{ maxWidth: 680, margin: "0 auto", padding: "0 24px" }}>
        {/* EMAIL CONTAINER CARD */}
        <div
          style={{
            background: "#FFFFFF",
            border: "1.5px solid #E2E8F0",
            borderRadius: 14,
            padding: "24px 28px",
            boxShadow: "0 8px 30px rgba(8, 20, 42, 0.05)",
          }}
        >
          {/* HEADER META */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #F1F5F9",
              paddingBottom: 14,
              marginBottom: 14,
              fontSize: 13,
              color: "#64748B",
            }}
          >
            <div>
              From: <b style={{ color: "#08142A" }}>Justin Sofman</b> &lt;justin@orionplacement.com&gt;
            </div>
            <div>9:12 AM CT</div>
          </div>

          <div style={{ fontSize: 13, color: "#64748B", marginBottom: 12 }}>
            To: <span style={{ color: "#08142A" }}>Dana Whitfield &lt;dana@whitfieldlowe.com&gt;</span>
          </div>

          <h3
            style={{
              fontFamily: "var(--display)",
              fontSize: 20,
              fontWeight: 500,
              color: "#08142A",
              margin: "0 0 16px",
            }}
          >
            Estate planning associate, 5 yrs, for your Houston seat
          </h3>

          <div style={{ fontSize: 15, color: "#334155", lineHeight: 1.6, marginBottom: 20 }}>
            <p style={{ margin: "0 0 12px" }}>Hi Dana,</p>
            <p style={{ margin: "0 0 12px" }}>
              I saw your firm&apos;s open associate posting for Whitfield &amp; Lowe. One of our pre-screened lateral candidates fits it very closely: 5 years experience, active Texas bar, routinely runs independent trust administrations, and is open to an in-office seat in Houston.
            </p>
            <p style={{ margin: "0 0 20px" }}>
              I have prepared their complete redacted dossier here for you to review—no login or sign-up needed:
            </p>

            <button
              type="button"
              className="btn btn-primary"
              onClick={onOpenCandidateLink}
              style={{
                background: "#1D4ED8",
                color: "#FFFFFF",
                border: 0,
                borderRadius: 8,
                padding: "12px 24px",
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: "0 4px 14px rgba(29, 78, 216, 0.35)",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span>View the candidate dossier (EP-TX-0412)</span>
              <span>→</span>
            </button>
          </div>

          <div style={{ borderTop: "1px solid #F1F5F9", paddingTop: 14, fontSize: 13, color: "#64748B" }}>
            Best regards,<br />
            <b>Justin Sofman</b> · Founder, Orion Placement<br />
            Direct: (713) 555-0192 · Houston, Texas
          </div>
        </div>

        <p style={{ fontSize: 12.5, color: "#64748B", textAlign: "center", marginTop: 16 }}>
          In production, this link contains a personalized secure token that identifies the firm and unlocks the full dossier in one click.
        </p>
      </div>
    </section>
  );
}

