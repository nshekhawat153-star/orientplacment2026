"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import "./job-apply-modal.css";
import { Job, findCity, fmt, people } from "@/data";

/* Confidential application popup for a job seat.
   Same flow as before (resume → contact → pay & bar → privacy → review → done),
   redesigned: dark seat summary + stepper on the left, form on the right,
   sticky footer with Back / Continue. Full screen on phones. */

interface JobApplyModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
}

type ApplyStep = "resume" | "contact" | "compensation" | "agreement" | "review" | "success";

const STEPS: Array<{ id: Exclude<ApplyStep, "success">; label: string }> = [
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact details" },
  { id: "compensation", label: "Pay & bar status" },
  { id: "agreement", label: "Privacy" },
  { id: "review", label: "Review & send" },
];

const BAR_OPTIONS = ["Active & In Good Standing", "Pending TX Bar / UBE Transfer", "Licensed in Another State"];
const NOTICE_OPTIONS = ["Immediate (Under 2 weeks)", "Standard 2 weeks notice", "30 days (Case transition)", "Flexible / Exploring"];

const Check = ({ size = 14 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const Lock = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);
const Arrow = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

function fileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function JobApplyModal({ job, isOpen, onClose }: JobApplyModalProps) {
  // Mounted fresh on every open, so each application starts clean.
  if (!isOpen || !job || typeof document === "undefined") return null;
  return createPortal(<ApplyDialog job={job} onClose={onClose} />, document.body);
}

function ApplyDialog({ job, onClose }: { job: Job; onClose: () => void }) {
  const [step, setStep] = useState<ApplyStep>("resume");

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isReading, setIsReading] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState(() => {
    const c = findCity(job.city);
    return c ? `${c.name}, ${c.state}` : "Houston, TX";
  });
  const [currentFirm, setCurrentFirm] = useState("");

  // band is in thousands; the field is in dollars
  const [targetSalary, setTargetSalary] = useState<number>(() => Math.round((job.band[0] + job.band[1]) / 2) * 1000);
  const [barStatus, setBarStatus] = useState(BAR_OPTIONS[0]);
  const [availability, setAvailability] = useState(NOTICE_OPTIONS[1]);

  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Lock page scroll, close on Escape
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

  // Scroll the form back to the top on every step
  useEffect(() => {
    document.querySelector(".jam-main")?.scrollTo({ top: 0 });
  }, [step]);

  const cityObj = findCity(job.city);
  const justin = people.find((p) => p.id === "justin") || people[0];
  const stepIndex = step === "success" ? STEPS.length : STEPS.findIndex((s) => s.id === step);
  const percent = step === "success" ? 100 : Math.round(((stepIndex + 1) / (STEPS.length + 1)) * 100);
  const contactOk = !!(fullName.trim() && email.trim() && phone.trim());

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    setResumeFile(file);
    setIsReading(true);
    window.setTimeout(() => setIsReading(false), 700);
  };

  const handleBack = () => {
    if (step === "contact") setStep("resume");
    else if (step === "compensation") setStep("contact");
    else if (step === "agreement") setStep("compensation");
    else if (step === "review") setStep("agreement");
  };

  const handleNext = () => {
    if (step === "resume") setStep("contact");
    else if (step === "contact" && contactOk) setStep("compensation");
    else if (step === "compensation") setStep("agreement");
    else if (step === "agreement" && agreedToPrivacy) setStep("review");
    else if (step === "review") {
      setSubmitting(true);
      window.setTimeout(() => {
        setSubmitting(false);
        setStep("success");
      }, 900);
    }
  };

  const nextDisabled =
    (step === "contact" && !contactOk) || (step === "agreement" && !agreedToPrivacy) || (step === "review" && submitting);

  const nextLabel =
    step === "agreement" ? "Review application" : step === "review" ? (submitting ? "Sending…" : "Send confidentially") : "Continue";

  const editLink = (to: ApplyStep, label = "Edit") => (
    <button type="button" className="jam-edit" onClick={() => setStep(to)}>
      {label}
    </button>
  );

  return (
    <div
      className="jam-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="apply-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="jam-card">
        {/* LEFT: seat summary + stepper */}
        <aside className="jam-side">
          <span className="jam-side-k">Applying for</span>
          <p className="jam-side-title">{job.title}</p>
          <p className="jam-side-firm">
            <Lock /> Confidential {job.firmType}
          </p>
          <p className="jam-side-pay">
            {fmt.range(job.band)}
            <small>base</small>
          </p>
          <div className="jam-side-chips">
            <span>{job.years}</span>
            <span>{job.mode === "hybrid" ? "Hybrid" : "On-site"}</span>
            <span>
              {job.area}
              {cityObj && !job.area.includes(cityObj.name) ? `, ${cityObj.name}` : ""}
            </span>
          </div>

          <ol className="jam-steps" aria-label="Application steps">
            {STEPS.map((s, i) => {
              const state = i < stepIndex ? "done" : i === stepIndex ? "now" : "todo";
              return (
                <li key={s.id} className={`is-${state}`} aria-current={state === "now" ? "step" : undefined}>
                  <span className="jam-dot">{state === "done" ? <Check size={12} /> : i + 1}</span>
                  {s.label}
                </li>
              );
            })}
          </ol>

          <div className="jam-side-justin">
            <Image src={justin.photo} alt={justin.name} width={40} height={40} />
            <p>
              <b>{justin.name}</b> reads every application himself. Nothing goes to the firm without your yes.
            </p>
          </div>
        </aside>

        {/* RIGHT: form */}
        <div className="jam-panel">
          <header className="jam-head">
            <div className="jam-head-l">
              {step !== "success" ? (
                <span className="jam-stepno">
                  Step {stepIndex + 1} of {STEPS.length}
                </span>
              ) : (
                <span className="jam-stepno is-done">Sent</span>
              )}
              {/* compact seat line for phones (sidebar is hidden there) */}
              <span className="jam-head-seat">
                <b>{job.title}</b>
                <small>{fmt.range(job.band)}</small>
              </span>
            </div>
            <button type="button" className="jam-close" onClick={onClose} aria-label="Close application">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <div className="jam-progress" aria-hidden="true">
              <span style={{ width: `${percent}%` }} />
            </div>
          </header>

          <main className="jam-main">
            {/* 1. RESUME */}
            {step === "resume" && (
              <section className="jam-step">
                <h2 id="apply-modal-title" className="jam-h2">
                  Add your <em>resume</em>
                </h2>
                <p className="jam-sub">Justin reads it before your call so he can talk specifics about this seat.</p>

                {!resumeFile ? (
                  <div className="jam-drop">
                    <input
                      type="file"
                      id="resume-file-input"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => handleFile(e.target.files?.[0])}
                      aria-label="Upload resume"
                    />
                    <span className="jam-drop-ico" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="12" y1="18" x2="12" y2="12" />
                        <polyline points="9 15 12 12 15 15" />
                      </svg>
                    </span>
                    <b>Drop your resume here, or browse</b>
                    <span>PDF, DOC or DOCX · up to 10 MB</span>
                  </div>
                ) : (
                  <div className={`jam-file${isReading ? " is-reading" : ""}`}>
                    <span className="jam-file-ico" aria-hidden="true">
                      {isReading ? <span className="jam-spin" /> : <Check size={16} />}
                    </span>
                    <div>
                      <b>{resumeFile.name}</b>
                      <span>{isReading ? "Attaching…" : `${fileSize(resumeFile.size)} · attached`}</span>
                    </div>
                    <label className="jam-file-replace">
                      Replace
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => handleFile(e.target.files?.[0])}
                        aria-label="Replace resume"
                      />
                    </label>
                  </div>
                )}

                <p className="jam-note">
                  <Lock />
                  <span>
                    <b>Your name stays private.</b> Orion never shares your identity with a firm without your written
                    approval.
                  </span>
                </p>

                {!resumeFile && (
                  <button type="button" className="jam-skip" onClick={() => setStep("contact")}>
                    No resume handy? Continue without it →
                  </button>
                )}
              </section>
            )}

            {/* 2. CONTACT */}
            {step === "contact" && (
              <section className="jam-step">
                <h2 id="apply-modal-title" className="jam-h2">
                  How can Justin <em>reach you?</em>
                </h2>
                <p className="jam-sub">Use personal details. Justin contacts you privately, never at your current firm.</p>

                <div className="jam-grid">
                  <label className="jam-field">
                    <span>
                      Full name <i>*</i>
                    </span>
                    <input type="text" required autoComplete="name" placeholder="e.g. Rachel Adams" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                  </label>
                  <label className="jam-field">
                    <span>
                      Personal email <i>*</i>
                    </span>
                    <input type="email" required autoComplete="email" placeholder="you@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <small>Not your current firm’s email.</small>
                  </label>
                  <label className="jam-field">
                    <span>
                      Mobile number <i>*</i>
                    </span>
                    <input type="tel" required autoComplete="tel" placeholder="(713) 555-0142" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </label>
                  <label className="jam-field">
                    <span>
                      Target market <i>*</i>
                    </span>
                    <input type="text" required placeholder="e.g. Houston, TX" value={city} onChange={(e) => setCity(e.target.value)} />
                  </label>
                  <label className="jam-field is-wide">
                    <span>
                      Current firm <em>optional · kept private</em>
                    </span>
                    <input type="text" placeholder="e.g. Texas boutique, AmLaw 200 firm" value={currentFirm} onChange={(e) => setCurrentFirm(e.target.value)} />
                  </label>
                </div>
              </section>
            )}

            {/* 3. PAY & BAR */}
            {step === "compensation" && (
              <section className="jam-step">
                <h2 id="apply-modal-title" className="jam-h2">
                  Pay, bar status and <em>notice</em>
                </h2>
                <p className="jam-sub">So Justin knows whether this seat is a real fit before he calls you.</p>

                <div className="jam-band">
                  <span>This seat pays</span>
                  <b>{fmt.range(job.band)}</b>
                  <small>base a year · Full-time · {job.mode === "hybrid" ? "Hybrid" : "On-site"}</small>
                </div>

                <label className="jam-field is-wide">
                  <span>
                    Your target base salary <i>*</i>
                  </span>
                  <span className="jam-money">
                    <b>$</b>
                    <input
                      id="app-salary"
                      type="number"
                      min={50000}
                      max={600000}
                      step={5000}
                      value={targetSalary}
                      onChange={(e) => setTargetSalary(Number(e.target.value))}
                    />
                    <em>a year</em>
                  </span>
                </label>

                <fieldset className="jam-choices">
                  <legend>
                    Texas Bar status <i>*</i>
                  </legend>
                  <div>
                    {BAR_OPTIONS.map((o) => (
                      <button key={o} type="button" className={barStatus === o ? "is-on" : ""} aria-pressed={barStatus === o} onClick={() => setBarStatus(o)}>
                        <span className="jam-radio" aria-hidden="true" />
                        {o}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <fieldset className="jam-choices">
                  <legend>
                    Earliest start <i>*</i>
                  </legend>
                  <div>
                    {NOTICE_OPTIONS.map((o) => (
                      <button key={o} type="button" className={availability === o ? "is-on" : ""} aria-pressed={availability === o} onClick={() => setAvailability(o)}>
                        <span className="jam-radio" aria-hidden="true" />
                        {o}
                      </button>
                    ))}
                  </div>
                </fieldset>
              </section>
            )}

            {/* 4. PRIVACY */}
            {step === "agreement" && (
              <section className="jam-step">
                <h2 id="apply-modal-title" className="jam-h2">
                  Your privacy, <em>in writing</em>
                </h2>
                <p className="jam-sub">How Orion handles your application.</p>

                <ul className="jam-promises">
                  <li>
                    <Check /> Your name and resume go to a firm only after you say yes to that firm.
                  </li>
                  <li>
                    <Check /> Your current firm is never contacted.
                  </li>
                  <li>
                    <Check /> Orion is paid by the hiring firm. It costs you nothing.
                  </li>
                </ul>

                <button
                  type="button"
                  role="checkbox"
                  aria-checked={agreedToPrivacy}
                  className={`jam-agree${agreedToPrivacy ? " is-on" : ""}`}
                  onClick={() => setAgreedToPrivacy(!agreedToPrivacy)}
                >
                  <span className="jam-box" aria-hidden="true">
                    {agreedToPrivacy && <Check size={13} />}
                  </span>
                  <span>
                    I agree that Orion Placement can keep my details to represent me confidentially for this and similar
                    seats. <i>*</i>
                  </span>
                </button>
              </section>
            )}

            {/* 5. REVIEW */}
            {step === "review" && (
              <section className="jam-step">
                <h2 id="apply-modal-title" className="jam-h2">
                  Check it, then <em>send</em>
                </h2>
                <p className="jam-sub">This goes to Justin only, not to the firm.</p>

                <div className="jam-review">
                  <div className="jam-rv">
                    <div className="jam-rv-h">
                      <b>Contact</b>
                      {editLink("contact")}
                    </div>
                    <dl>
                      <div>
                        <dt>Name</dt>
                        <dd>{fullName}</dd>
                      </div>
                      <div>
                        <dt>Email</dt>
                        <dd>{email}</dd>
                      </div>
                      <div>
                        <dt>Phone</dt>
                        <dd>{phone}</dd>
                      </div>
                      <div>
                        <dt>Market</dt>
                        <dd>{city}</dd>
                      </div>
                      {currentFirm && (
                        <div>
                          <dt>Current firm</dt>
                          <dd>{currentFirm}</dd>
                        </div>
                      )}
                    </dl>
                  </div>
                  <div className="jam-rv">
                    <div className="jam-rv-h">
                      <b>Resume &amp; bar</b>
                      {editLink("resume", "Change")}
                    </div>
                    <dl>
                      <div>
                        <dt>Resume</dt>
                        <dd>{resumeFile ? resumeFile.name : "Not attached"}</dd>
                      </div>
                      <div>
                        <dt>Bar status</dt>
                        <dd>{barStatus}</dd>
                      </div>
                    </dl>
                  </div>
                  <div className="jam-rv">
                    <div className="jam-rv-h">
                      <b>Pay &amp; start</b>
                      {editLink("compensation")}
                    </div>
                    <dl>
                      <div>
                        <dt>Target base</dt>
                        <dd>${targetSalary.toLocaleString("en-US")} a year</dd>
                      </div>
                      <div>
                        <dt>Earliest start</dt>
                        <dd>{availability}</dd>
                      </div>
                    </dl>
                  </div>
                  <p className="jam-note is-ok">
                    <Check /> <span>Privacy terms agreed. No contact with your current firm.</span>
                  </p>
                </div>
              </section>
            )}

            {/* DONE */}
            {step === "success" && (
              <section className="jam-step jam-done">
                <span className="jam-done-ico" aria-hidden="true">
                  <Check size={30} />
                </span>
                <h2 id="apply-modal-title" className="jam-h2">
                  Sent, <em>confidentially.</em>
                </h2>
                <p className="jam-sub">
                  Thanks{fullName ? `, ${fullName.split(" ")[0]}` : ""}. Your application for <b>{job.title}</b> is with Orion
                  Placement.
                </p>
                <ol className="jam-next">
                  <li>
                    <span>1</span>
                    <div>
                      <b>Justin reviews it</b>
                      <p>He checks your background against what this firm needs.</p>
                    </div>
                  </li>
                  <li>
                    <span>2</span>
                    <div>
                      <b>A private call</b>
                      <p>
                        He reaches you at <b>{email || "your email"}</b> within 24 hours to talk pay, the team and the firm.
                      </p>
                    </div>
                  </li>
                  <li>
                    <span>3</span>
                    <div>
                      <b>You decide</b>
                      <p>Your name goes to the firm only with your written OK.</p>
                    </div>
                  </li>
                </ol>
              </section>
            )}
          </main>

          <footer className="jam-foot">
            {step === "success" ? (
              <button type="button" className="jam-next-btn" onClick={onClose}>
                Back to jobs
              </button>
            ) : (
              <>
                {step !== "resume" ? (
                  <button type="button" className="jam-back" onClick={handleBack}>
                    ← Back
                  </button>
                ) : (
                  <span className="jam-foot-note">
                    <Lock /> Confidential
                  </span>
                )}
                <button type="button" className="jam-next-btn" disabled={nextDisabled} onClick={handleNext}>
                  {step === "review" && submitting && <span className="jam-spin is-white" aria-hidden="true" />}
                  {nextLabel}
                  {!(step === "review" && submitting) && <Arrow />}
                </button>
              </>
            )}
          </footer>
        </div>
      </div>
    </div>
  );
}
