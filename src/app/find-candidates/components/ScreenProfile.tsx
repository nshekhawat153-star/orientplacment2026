"use client";

import React, { useState } from "react";
import {
  EnrichedCandidate,
  TERMS_DATA,
  RECRUITER_QA_PATTERNS,
  generateSlotDates,
  matchEnrichedCandidates,
  ParsedSeat,
} from "../candidateData";

interface ScreenProfileProps {
  candidate: EnrichedCandidate;
  seat: ParsedSeat;
  isUnlocked: boolean;
  isSigned: boolean;
  lead: { name: string; title: string; firm: string; email: string } | null;
  onBackToResults: () => void;
  onOpenGateModal: (cand: EnrichedCandidate) => void;
  onOpenTermsModal: (cand: EnrichedCandidate) => void;
  onSelectOtherCandidate: (cand: EnrichedCandidate) => void;
}

export function ScreenProfile({
  candidate: c,
  seat,
  isUnlocked,
  isSigned,
  lead,
  onBackToResults,
  onOpenGateModal,
  onOpenTermsModal,
  onSelectOtherCandidate,
}: ScreenProfileProps) {
  // Q&A state
  const [qaList, setQaList] = useState<Array<{ q: string; a: string | null }>>([]);
  const [questionInput, setQuestionInput] = useState("");

  // Interview slot state
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const availableSlots = generateSlotDates().slice(0, 6);

  const handleAskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = questionInput.trim();
    if (!q) return;

    // Add user question with typing state
    const newEntry = { q, a: null as string | null };
    setQaList((prev) => [...prev, newEntry]);
    setQuestionInput("");

    // Simulate recruiter reply
    setTimeout(() => {
      let matchedAnswer =
        "Good question. I will check with the candidate and send you a confirmed note by email within the hour.";
      for (const [regex, ans] of RECRUITER_QA_PATTERNS) {
        if (regex.test(q)) {
          matchedAnswer = ans;
          break;
        }
      }
      setQaList((prev) =>
        prev.map((item) => (item === newEntry ? { ...item, a: matchedAnswer } : item))
      );
    }, 1100);
  };

  // Find similar other candidates
  const similar = matchEnrichedCandidates(seat)
    .filter((r) => r.candidate.id !== c.id)
    .slice(0, 2);

  return (
    <section className="fc-profile-screen" style={{ padding: "20px 0 80px" }}>
      <div className="wrap" style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
        {/* BACK BUTTON */}
        <button
          type="button"
          onClick={onBackToResults}
          style={{
            background: "transparent",
            border: 0,
            color: "#1D4ED8",
            fontWeight: 600,
            fontSize: 14,
            cursor: "pointer",
            padding: "6px 0",
            marginBottom: 16,
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          ← Back to candidate stream
        </button>

        {/* 2-COLUMN PROFILE WORKSPACE */}
        <div className="fc-profile-layout">
          {/* LEFT: CANDIDATE DOSSIER SHEET */}
          <div>
            <div className="fc-sheet">
              {/* WATERMARK BADGE */}
              <span className="fc-sheet-watermark">
                {isSigned ? "FULL PROFILE" : isUnlocked ? "REDACTED DOSSIER" : "DOSSIER PREVIEW"}
              </span>

              {/* ID & NAME */}
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 11.5,
                  fontWeight: 700,
                  color: "#1D4ED8",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  display: "block",
                  marginBottom: 6,
                }}
              >
                {c.id}
              </span>

              <h2
                style={{
                  fontFamily: "var(--display)",
                  fontSize: 28,
                  fontWeight: 500,
                  color: "#08142A",
                  margin: "0 0 6px",
                }}
              >
                {isSigned ? (
                  <span className="fc-name-revealed">{c.fullName}</span>
                ) : (
                  <span
                    className="fc-redact"
                    style={{ width: "9em" }}
                    aria-label="Candidate name hidden"
                  />
                )}
              </h2>

              <p style={{ color: "#475569", fontSize: 16, margin: "0 0 16px", lineHeight: 1.5 }}>
                {c.headline}
              </p>

              {/* VERIFICATION STAMPS */}
              <div className="fc-stamps-wrap" style={{ marginBottom: 24 }}>
                <span className="fc-stamp">✓ Spoke with Justin {c.spokeDate}</span>
                <span className="fc-stamp">✓ Texas Bar admission verified</span>
                <span className="fc-stamp">✓ Agreed to confidential representation</span>
              </div>

              {/* AT A GLANCE */}
              <h4
                style={{
                  fontSize: 11.5,
                  fontFamily: "var(--mono)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "#64748B",
                  margin: "24px 0 10px",
                }}
              >
                At a Glance
              </h4>
              <dl className="fc-facts-grid" style={{ fontSize: 14 }}>
                <div>
                  <dt>Experience</dt>
                  <dd>{c.years} years post-bar</dd>
                </div>
                <div>
                  <dt>Bar Admissions</dt>
                  <dd>{c.bars.join(", ") || "Texas"} (active &amp; verified)</dd>
                </div>
                <div>
                  <dt>Current Metro</dt>
                  <dd>{c.area}</dd>
                </div>
                <div>
                  <dt>Office Arrangement</dt>
                  <dd>{c.modes.join(" / ")}</dd>
                </div>
                <div>
                  <dt>Compensation Target</dt>
                  <dd>${c.pay[0]}k–${c.pay[1]}k base salary</dd>
                </div>
                <div>
                  <dt>Earliest Start</dt>
                  <dd>{c.availability}</dd>
                </div>
              </dl>

              {/* EXPERIENCE TIMELINE */}
              <h4
                style={{
                  fontSize: 11.5,
                  fontFamily: "var(--mono)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "#64748B",
                  margin: "28px 0 10px",
                }}
              >
                Career Experience
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {c.timeline.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      borderTop: "1px solid #E2E8F0",
                      paddingTop: 12,
                      display: "grid",
                      gridTemplateColumns: "110px 1fr",
                      gap: 12,
                    }}
                  >
                    <span style={{ fontSize: 13, color: "#64748B", fontWeight: 600 }}>
                      {item[0]}
                    </span>
                    <div>
                      <div style={{ fontSize: 14.5, fontWeight: 600, color: "#08142A" }}>
                        {isSigned ? (
                          <span className="fc-name-revealed">{c.firmNameSample}</span>
                        ) : (
                          <>
                            <span
                              className="fc-redact"
                              style={{ width: "7em", marginRight: 6 }}
                              aria-label="Firm name hidden"
                            />{" "}
                            <span style={{ color: "#64748B", fontSize: 13 }}>({c.firmSize})</span>
                          </>
                        )}
                      </div>
                      {isUnlocked ? (
                        <p style={{ fontSize: 14, color: "#334155", margin: "6px 0 0", lineHeight: 1.55 }}>
                          {item[2]}
                        </p>
                      ) : (
                        <p style={{ fontSize: 13, color: "#94A3B8", margin: "6px 0 0" }}>
                          Full caseload breakdown unlocked with work email.
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* EDUCATION & RECRUITER NOTES */}
              {isUnlocked ? (
                <>
                  <h4
                    style={{
                      fontSize: 11.5,
                      fontFamily: "var(--mono)",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: "#64748B",
                      margin: "28px 0 10px",
                    }}
                  >
                    Education &amp; Credentials
                  </h4>
                  <p style={{ fontSize: 14.5, color: "#08142A", margin: 0, fontWeight: 500 }}>
                    {isSigned ? (
                      <span className="fc-name-revealed">{c.schoolNameSample}, J.D.</span>
                    ) : (
                      c.schoolText
                    )}
                  </p>

                  <h4
                    style={{
                      fontSize: 11.5,
                      fontFamily: "var(--mono)",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: "#64748B",
                      margin: "28px 0 10px",
                    }}
                  >
                    Justin&apos;s Interview Intake Notes
                  </h4>
                  <div className="fc-call-notes">
                    <dl>
                      <dt>Why leaving</dt>
                      <dd>{c.leavingReason}</dd>
                      <dt>Office preference</dt>
                      <dd>{c.officePref}</dd>
                      <dt>Pay flexibility</dt>
                      <dd>${c.pay[0]}k–${c.pay[1]}k base; discretionary performance bonus</dd>
                      <dt>Notice period</dt>
                      <dd>{c.availability}</dd>
                    </dl>
                  </div>
                </>
              ) : (
                <div
                  style={{
                    background: "#EFF6FF",
                    border: "1px dashed #BFDBFE",
                    borderRadius: 10,
                    padding: "20px",
                    textAlign: "center",
                    marginTop: 24,
                  }}
                >
                  <p style={{ fontWeight: 600, color: "#08142A", margin: "0 0 6px" }}>
                    Every previous law firm role, education, and recruiter intake notes
                  </p>
                  <p style={{ fontSize: 13, color: "#64748B", margin: "0 0 14px" }}>
                    Work email only. Zero agreement required to view.
                  </p>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => onOpenGateModal(c)}
                    style={{
                      background: "#1D4ED8",
                      color: "#FFFFFF",
                      border: 0,
                      borderRadius: 7,
                      padding: "10px 20px",
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Show full resume →
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: STICKY RECRUITER & TERMS PANEL */}
          <aside className="fc-side-panel">
            {isSigned ? (
              /* POST-SIGNING INTERVIEW SCHEDULING PANEL */
              <div className="fc-panel-box">
                <span
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#15803D",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    background: "#F0FDF4",
                    border: "1px solid #BBF7D0",
                    padding: "3px 8px",
                    borderRadius: 6,
                    display: "inline-block",
                    marginBottom: 8,
                  }}
                >
                  ✓ TERMS SIGNED BY {lead?.name || "YOUR FIRM"}
                </span>

                <h3
                  style={{
                    fontFamily: "var(--display)",
                    fontSize: 22,
                    fontWeight: 500,
                    color: "#08142A",
                    margin: "0 0 6px",
                  }}
                >
                  Pick an interview time
                </h3>
                <p style={{ color: "#64748B", fontSize: 13.5, margin: "0 0 14px", lineHeight: 1.5 }}>
                  Times the candidate has already confirmed open. Justin coordinates call logistics within 1 hour.
                </p>

                {selectedSlot ? (
                  <div
                    style={{
                      background: "#EFF6FF",
                      border: "1.5px solid #DBEAFE",
                      borderRadius: 10,
                      padding: "16px",
                      marginTop: 10,
                    }}
                  >
                    <div style={{ color: "#1D4ED8", fontWeight: 700, fontSize: 15, marginBottom: 4 }}>
                      ✓ Interview Requested
                    </div>
                    <p style={{ fontSize: 13.5, color: "#08142A", margin: "0 0 12px" }}>
                      Requested: <b>{selectedSlot}</b> with {c.fullName}.
                    </p>

                    <ol className="fc-timeline">
                      <li className="ok">
                        One-page terms signed by {lead?.name || "firm"} · PDF sent to your inbox
                      </li>
                      <li className="ok">
                        Interview request dispatched to {c.fullName}
                      </li>
                      <li>Justin confirms calendar hold within one business hour</li>
                      <li>Google Meet / Zoom calendar invitation sent to both parties</li>
                    </ol>
                  </div>
                ) : (
                  <>
                    <div className="fc-slots-grid">
                      {availableSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          className="fc-slot-btn"
                          onClick={() => setSelectedSlot(slot)}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>

                    <div style={{ borderTop: "1px solid #E2E8F0", marginTop: 18, paddingTop: 14, fontSize: 13 }}>
                      <span style={{ color: "#64748B" }}>Candidate files: </span>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          alert("PDF dossier download started.");
                        }}
                        style={{ color: "#1D4ED8", fontWeight: 600, textDecoration: "underline", marginRight: 8 }}
                      >
                        Download PDF Resume
                      </a>
                      ·
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          alert("Viewing verified profile record.");
                        }}
                        style={{ color: "#1D4ED8", fontWeight: 600, textDecoration: "underline", marginLeft: 8 }}
                      >
                        Verified Profile
                      </a>
                    </div>
                  </>
                )}
              </div>
            ) : (
              /* PRE-SIGNING TERMS & MEET PANEL */
              <div className="fc-panel-box">
                <h3
                  style={{
                    fontFamily: "var(--display)",
                    fontSize: 22,
                    fontWeight: 500,
                    color: "#08142A",
                    margin: "0 0 6px",
                  }}
                >
                  Want to meet this candidate?
                </h3>
                <p style={{ color: "#64748B", fontSize: 13.5, margin: "0 0 14px", lineHeight: 1.5 }}>
                  Accept our simple one-page terms. The candidate&apos;s real name and calendar interview times follow straight away.
                </p>

                {/* MINI TERMS TILES */}
                <div className="fc-terms-mini-grid">
                  <div className="fc-terms-mini-tile">
                    <b>{TERMS_DATA.fee}</b>
                    <span>of base salary, only if you hire</span>
                  </div>
                  <div className="fc-terms-mini-tile">
                    <b>{TERMS_DATA.guarantee}</b>
                    <span>replacement guarantee</span>
                  </div>
                  <div className="fc-terms-mini-tile">
                    <b>$0</b>
                    <span>to inspect profiles or interview</span>
                  </div>
                  <div className="fc-terms-mini-tile">
                    <b>{TERMS_DATA.excl}</b>
                    <span>exclusivity required</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => onOpenTermsModal(c)}
                  style={{
                    width: "100%",
                    height: 46,
                    borderRadius: 8,
                    background: "#1D4ED8",
                    color: "#FFFFFF",
                    border: 0,
                    fontWeight: 600,
                    fontSize: 15,
                    cursor: "pointer",
                    boxShadow: "0 4px 14px rgba(29, 78, 216, 0.35)",
                  }}
                >
                  Meet this candidate →
                </button>

                <p style={{ fontSize: 12.5, color: "#64748B", textAlign: "center", margin: "10px 0 0" }}>
                  Already know this candidate? Tell us and there is zero fee.
                </p>
              </div>
            )}

            {/* ASK JUSTIN Q&A SIMULATOR */}
            <div className="fc-panel-box">
              <h4 style={{ fontFamily: "var(--display)", fontSize: 18, color: "#08142A", margin: "0 0 4px" }}>
                Ask Justin about this candidate
              </h4>
              <p style={{ color: "#64748B", fontSize: 12.5, margin: "0 0 12px" }}>
                Anonymous to the candidate. Justin replies directly, typically within the hour.
              </p>

              {qaList.length > 0 && (
                <div className="fc-qa-stream">
                  {qaList.map((item, idx) => (
                    <React.Fragment key={idx}>
                      <div className="fc-qa-q">{item.q}</div>
                      <div className="fc-qa-a">
                        <b>Justin · Recruiter note</b>
                        {item.a ? item.a : <span style={{ color: "#64748B", fontStyle: "italic" }}>Justin is typing…</span>}
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              )}

              <form onSubmit={handleAskSubmit}>
                <textarea
                  rows={2}
                  placeholder="e.g. Which firms has she worked at? Would she take $120k?"
                  value={questionInput}
                  onChange={(e) => setQuestionInput(e.target.value)}
                  style={{
                    width: "100%",
                    border: "1.5px solid #CBD5E1",
                    borderRadius: 8,
                    padding: "8px 10px",
                    fontSize: 13.5,
                    resize: "vertical",
                    outline: "none",
                  }}
                />
                <button
                  type="submit"
                  style={{
                    width: "100%",
                    height: 38,
                    marginTop: 8,
                    background: "#F8FAFC",
                    border: "1.5px solid #CBD5E1",
                    borderRadius: 7,
                    fontWeight: 600,
                    fontSize: 13,
                    color: "#08142A",
                    cursor: "pointer",
                  }}
                >
                  Send question to Justin →
                </button>
              </form>
            </div>

            {/* RECRUITER ASSURANCE */}
            <div
              style={{
                background: "#FAF9F5",
                border: "1px solid #E2E8F0",
                borderRadius: 10,
                padding: "14px 16px",
                fontSize: 12.5,
                color: "#64748B",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <span
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    background: "#08142A",
                    color: "#FFFFFF",
                    display: "grid",
                    placeItems: "center",
                    fontWeight: 700,
                    fontSize: 11,
                  }}
                >
                  J
                </span>
                <span style={{ color: "#08142A", fontWeight: 600 }}>Founder Justin Sofman</span>
              </div>
              <div>
                Justin personally conducts attorney screenings and manages search mandates. Direct inquiries: justin@orionplacement.com
              </div>
            </div>
          </aside>
        </div>

        {/* 3. SIMILAR CANDIDATES FOR THIS SEAT */}
        {similar.length > 0 && (
          <div style={{ marginTop: 52 }}>
            <h3
              style={{
                fontFamily: "var(--display)",
                fontSize: 22,
                color: "#08142A",
                margin: "0 0 16px",
              }}
            >
              Others for this seat
            </h3>
            <div className="fc-cards-grid">
              {similar.map(({ candidate: simCand }) => (
                <article
                  key={simCand.id}
                  className="fc-candidate-card"
                  onClick={() => onSelectOtherCandidate(simCand)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="fc-card-top-row">
                    <span className="fc-card-id-badge">{simCand.id}</span>
                    <span className="fc-card-area">{simCand.area}</span>
                  </div>
                  <h4 className="fc-card-title">{simCand.headline}</h4>
                  <div style={{ fontSize: 13, color: "#64748B" }}>
                    {simCand.years} yrs exp · ${simCand.pay[0]}k–${simCand.pay[1]}k expected · {simCand.availability}
                  </div>
                  <button
                    type="button"
                    className="btn btn-ghost"
                    style={{
                      marginTop: "auto",
                      width: "100%",
                      borderRadius: 7,
                      border: "1.5px solid #1D4ED8",
                      color: "#1D4ED8",
                      fontSize: 13.5,
                      fontWeight: 600,
                      padding: "8px",
                      background: "#FFFFFF",
                      cursor: "pointer",
                    }}
                  >
                    View dossier →
                  </button>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

