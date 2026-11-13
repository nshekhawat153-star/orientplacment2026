"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import { people } from "@/data";

export interface QuestionDef {
  id: string;
  label: string;
  kind: "text" | "choice" | "textarea" | "fee" | "contact";
  question: string;
  placeholder?: string;
  inputType?: string;
  skipLabel?: string;
  intro?: string;
  options?: string[];
  otherOption?: string;
}

const QUESTIONS: QuestionDef[] = [
  {
    id: "location",
    label: "Hiring location",
    kind: "text",
    question: "Which city or state are you hiring in?",
    placeholder: "e.g. Austin, TX · Houston, TX · Dallas, TX · or Remote",
  },
  {
    id: "firmSize",
    label: "Firm size",
    kind: "choice",
    question: "What is the size of your firm?",
    options: ["Solo", "2–5 attorneys", "6–20 attorneys", "21–50 attorneys", "51–100 attorneys", "100+ attorneys"],
  },
  {
    id: "hires",
    label: "Hires in next 12 months",
    kind: "choice",
    question: "How many attorneys do you plan to hire in the next 12 months?",
    options: ["1", "2–3", "4–10", "10+", "Not sure yet"],
  },
  {
    id: "practiceArea",
    label: "Practice area",
    kind: "choice",
    question: "Which practice area are you hiring for first?",
    options: [
      "Estate Planning / Trusts & Estates",
      "Commercial Litigation",
      "Real Estate Law",
      "Corporate / M&A",
      "Labor & Employment",
      "Family Law",
      "Personal Injury",
      "Tax Law",
      "Criminal Defense",
    ],
    otherOption: "Something else",
  },
  {
    id: "level",
    label: "Level",
    kind: "choice",
    question: "What level attorney do you need?",
    options: [
      "Junior associate (1–3 yrs)",
      "Mid-level associate (4–7 yrs)",
      "Senior associate (8+ yrs)",
      "Partner track / Of counsel",
    ],
  },
  {
    id: "timing",
    label: "Start timing",
    kind: "choice",
    question: "How soon do you want this person to start?",
    options: ["Right away", "Within 30 days", "1–3 months", "3+ months", "Just exploring"],
  },
  {
    id: "recruiterBefore",
    label: "Used a recruiter before",
    kind: "choice",
    question: "Have you worked with a legal recruiter before?",
    options: ["Currently working with one", "In the past", "Never before"],
  },
  {
    id: "firmName",
    label: "Firm name",
    kind: "text",
    question: "What is your firm's name?",
    placeholder: "Your firm's legal name",
  },
  {
    id: "firmWebsite",
    label: "Firm website",
    kind: "text",
    inputType: "url",
    question: "What is your firm's website?",
    placeholder: "yourfirm.com",
    skipLabel: "We don't have a website yet",
  },
  {
    id: "source",
    label: "Heard about us from",
    kind: "choice",
    question: "Where did you hear about Orion Placement?",
    options: [
      "Google search",
      "LinkedIn",
      "Referral from a colleague / attorney",
      "Direct email",
      "Bar association event",
    ],
    otherOption: "Somewhere else",
  },
  {
    id: "pitch",
    label: "Why join your firm",
    kind: "textarea",
    intro: "Quick reminder: there's no upfront cost. You only pay if you hire.",
    question: "What makes your firm a great place for an attorney to join?",
    placeholder: "Firm culture, mentorship, caseload quality, growth trajectory, compensation, flexibility…",
  },
  {
    id: "fee",
    label: "Placement fee OK",
    kind: "fee",
    intro: "Last question: there's no upfront cost, and nothing to pay unless you hire.",
    question: "If you hire a qualified candidate we send, would a contingency placement fee work for your firm?",
  },
  {
    id: "contact",
    label: "Contact details",
    kind: "contact",
    question: "Where should we send qualified candidate profiles?",
  },
];

const TIME_SLOTS = [
  "9:00 AM",
  "10:00 AM",
  "11:30 AM",
  "1:00 PM",
  "2:30 PM",
  "4:00 PM",
];

export function Questionnaire() {
  const [viewState, setViewState] = useState<"questions" | "notFit" | "booking" | "done">("questions");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [customText, setCustomText] = useState("");
  const [isOtherSelected, setIsOtherSelected] = useState(false);

  // Contact form state
  const [contact, setContact] = useState({ name: "", email: "", phone: "" });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Calendar booking state
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const cardRef = useRef<HTMLDivElement>(null);
  const justin = people.find((p) => p.id === "justin") || people[0];

  const currentQ = QUESTIONS[currentIndex];
  const progressPercent = Math.round(((currentIndex + 1) / QUESTIONS.length) * 100);

  // Generate next 10 business days on client mount to support Next.js 16 prerendering
  const [businessDays, setBusinessDays] = useState<Date[]>([]);

  useEffect(() => {
    const list: Date[] = [];
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    while (list.length < 10) {
      d.setDate(d.getDate() + 1);
      const day = d.getDay();
      if (day !== 0 && day !== 6) {
        list.push(new Date(d));
      }
    }
    setBusinessDays(list);
  }, []);

  // Scroll to questionnaire on step change
  const scrollToCard = () => {
    if (cardRef.current) {
      const top = cardRef.current.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const handleNext = (nextIndex: number) => {
    const target = Math.max(0, Math.min(QUESTIONS.length - 1, nextIndex));
    const nextQ = QUESTIONS[target];
    const existing = answers[nextQ.id] || "";
    const isOther = nextQ.kind === "choice" && existing !== "" && !(nextQ.options || []).includes(existing);

    setIsOtherSelected(isOther);
    setCustomText(nextQ.kind !== "choice" || isOther ? existing : "");
    setCurrentIndex(target);
    scrollToCard();
  };

  const handleAnswer = (val: string) => {
    setAnswers((prev) => ({ ...prev, [currentQ.id]: val }));
  };

  const submitTextAnswer = (val: string = customText) => {
    const trimmed = val.trim();
    if (trimmed) {
      handleAnswer(trimmed);
      handleNext(currentIndex + 1);
    }
  };

  // Validation for contact info
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const isNameValid = contact.name.trim().length >= 2;
  const isEmailValid = emailRegex.test(contact.email.trim());
  const isPhoneValid = contact.phone.replace(/\D/g, "").length >= 7;
  const isContactValid = isNameValid && isEmailValid && isPhoneValid;

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    if (isContactValid) {
      setViewState("booking");
      scrollToCard();
    }
  };

  // NOT FIT SCREEN
  if (viewState === "notFit") {
    return (
      <div ref={cardRef} className="q-card-box step-in text-center">
        <div className="q-icon-disc">🤝</div>
        <h3 className="q-title mt-4">Thanks for being upfront.</h3>
        <p className="q-sub-text">
          Our service works on a one-time contingency fee that is due <b>only if you hire</b> a candidate we introduce, backed by a 90-day replacement guarantee. If that doesn&apos;t align with your firm&apos;s current model, we might not be the right partner right now, and that is completely okay.
        </p>
        <div className="mt-8 space-y-3 max-w-sm mx-auto">
          <button
            type="button"
            className="q-btn-primary"
            onClick={() => {
              setAnswers((prev) => ({ ...prev, fee: "" }));
              setViewState("questions");
              handleNext(QUESTIONS.findIndex((q) => q.kind === "fee"));
            }}
          >
            Go back and adjust answer
          </button>
          <a href="#top" className="block text-sm text-[#5b6577] hover:underline pt-2">
            Back to top of page
          </a>
        </div>
      </div>
    );
  }

  // BOOKING SCREEN
  if (viewState === "booking") {
    return (
      <div ref={cardRef} className="q-card-box step-in">
        <div className="q-progress-bar-bg">
          <div className="q-progress-bar-fill" style={{ width: "100%" }} />
        </div>

        <p className="q-eyebrow-accent">YOU&apos;RE ALMOST DONE</p>
        <h3 className="q-title mt-2">Book your free intake call with Justin</h3>
        <p className="q-sub-text">
          Pick a 15-minute slot so Justin Sofman can confirm your seat brief and review matching candidate profiles.
        </p>

        {/* STEP 1: CHOOSE A DAY */}
        <p className="mt-6 mb-3 text-sm font-semibold text-[#0a1a33]">1. Choose a day</p>
        <div className="q-days-scroll">
          {businessDays.map((d) => {
            const isSelected = selectedDate?.toDateString() === d.toDateString();
            return (
              <button
                key={d.toISOString()}
                type="button"
                onClick={() => {
                  setSelectedDate(d);
                  setSelectedTime(null);
                }}
                className={`q-day-pill ${isSelected ? "selected" : ""}`}
                aria-pressed={isSelected}
              >
                <span className={`block text-xs font-semibold ${isSelected ? "text-[#ecd496]" : "text-[#5b6577]"}`}>
                  {d.toLocaleDateString("en-US", { weekday: "short" })}
                </span>
                <span className="block text-lg font-bold my-0.5">{d.getDate()}</span>
                <span className={`block text-xs ${isSelected ? "text-white/80" : "text-[#5b6577]"}`}>
                  {d.toLocaleDateString("en-US", { month: "short" })}
                </span>
              </button>
            );
          })}
        </div>

        {/* STEP 2: CHOOSE A TIME */}
        {selectedDate && (
          <div className="step-in mt-6">
            <p className="mb-3 text-sm font-semibold text-[#0a1a33]">
              2. Choose a time on {selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {TIME_SLOTS.map((t) => {
                const isSelected = selectedTime === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setSelectedTime(t)}
                    className={`q-time-pill ${isSelected ? "selected" : ""}`}
                    aria-pressed={isSelected}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
            <p className="mt-2 text-xs text-[#5b6577]">Times shown in Eastern Standard Time (EST).</p>
          </div>
        )}

        {/* CONFIRM BUTTON */}
        <div className="mt-8 space-y-3">
          <button
            type="button"
            disabled={!selectedDate || !selectedTime}
            onClick={() => {
              setViewState("done");
              scrollToCard();
            }}
            className="q-btn-primary"
          >
            {selectedDate && selectedTime
              ? `Confirm Call: ${selectedDate.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })} at ${selectedTime}`
              : "Select a day and time"}
          </button>

          <div className="text-center pt-2">
            <span className="text-xs text-[#5b6577]">Prefer Calendly directly? </span>
            <a
              href={justin.calendly || "https://calendly.com/orionplacement/call-with-justin"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#1b3a6b] font-semibold underline underline-offset-2"
            >
              Open Justin&apos;s Calendly link
            </a>
          </div>

          <button
            type="button"
            onClick={() => {
              setViewState("questions");
              handleNext(QUESTIONS.length - 1);
            }}
            className="w-full text-center py-2 text-sm text-[#5b6577] hover:text-[#0a1a33]"
          >
            ← Back to contact details
          </button>
        </div>
      </div>
    );
  }

  // DONE SCREEN
  if (viewState === "done" && selectedDate && selectedTime) {
    const formattedDate = `${selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })} at ${selectedTime}`;

    return (
      <div ref={cardRef} className="q-card-box step-in">
        <div className="text-center mb-6">
          <div className="q-check-disc">
            <svg viewBox="0 0 20 20" className="size-8" fill="currentColor">
              <path d="M16.7 5.3a1 1 0 0 1 0 1.4l-8 8a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.4L8 12.6l7.3-7.3a1 1 0 0 1 1.4 0Z" />
            </svg>
          </div>
          <p className="q-eyebrow-accent mt-4">SEARCH INITIATED</p>
          <h3 className="q-title mt-2">Intake call confirmed!</h3>
          <p className="q-sub-text">
            Justin Sofman will speak with you on <b>{formattedDate}</b>. A calendar invite has been queued for <b>{contact.email}</b>.
          </p>
        </div>

        {/* SUMMARY CARD */}
        <div className="rounded-2xl border border-[#e6ebf3] bg-[#faf8f3] p-5 text-sm space-y-2.5 mb-6">
          <div className="font-semibold text-[#0a1a33] pb-2 border-b border-[#e4e2da]">
            Your Seat Brief Summary
          </div>
          <div className="flex justify-between">
            <span className="text-[#5b6577]">Location:</span>
            <span className="font-medium text-[#0a1a33]">{answers.location || "Not specified"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#5b6577]">Practice area:</span>
            <span className="font-medium text-[#0a1a33]">{answers.practiceArea || "General"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#5b6577]">Experience level:</span>
            <span className="font-medium text-[#0a1a33]">{answers.level || "Any"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#5b6577]">Firm name:</span>
            <span className="font-medium text-[#0a1a33]">{answers.firmName || "Confidential firm"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#5b6577]">Timeline:</span>
            <span className="font-medium text-[#0a1a33]">{answers.timing || "Immediate"}</span>
          </div>
        </div>

        {/* DIRECT CONTACT REMINDER */}
        <div className="rounded-xl bg-[#fff8d9] border border-[#d9a400]/40 p-4 text-xs text-[#6b4e00] flex items-center gap-3">
          <span className="text-xl">📞</span>
          <div>
            <b>Need candidates faster?</b> You can call Justin directly at{" "}
            <a href="tel:2015729538" className="underline font-bold text-[#0a1a33]">
              (201) 572-9538
            </a>{" "}
            or email{" "}
            <a href="mailto:justin@orionplacement.com" className="underline font-bold text-[#0a1a33]">
              justin@orionplacement.com
            </a>
            .
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="inline-block text-sm text-[#1b3a6b] font-semibold hover:underline">
            ← Return to Orion Placement home
          </Link>
        </div>
      </div>
    );
  }

  // ACTIVE QUESTIONS VIEW
  return (
    <div ref={cardRef} className="q-card-box step-in">
      {/* TOP PROGRESS BAR */}
      <div className="flex items-center justify-between mb-3 text-xs font-semibold">
        <span className="q-progress-step">
          Question {currentIndex + 1} of {QUESTIONS.length}
        </span>
        <span className="q-progress-pct">{progressPercent}%</span>
      </div>

      <div className="q-progress-bar-bg mb-6">
        <div className="q-progress-bar-fill" style={{ width: `${progressPercent}%` }} />
      </div>

      {/* CALLOUT INTRO IF PRESENT */}
      {currentQ.intro && (
        <div className="q-intro-banner">
          <p>{currentQ.intro}</p>
        </div>
      )}

      {/* QUESTION HEADING */}
      <h3 className="q-title">{currentQ.question}</h3>

      {/* 1. TEXT INPUT TYPE */}
      {currentQ.kind === "text" && (
        <form
          className="mt-6"
          onSubmit={(e) => {
            e.preventDefault();
            submitTextAnswer();
          }}
        >
          <input
            type={currentQ.inputType || "text"}
            autoFocus
            className="q-input"
            placeholder={currentQ.placeholder}
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
          />

          {currentQ.id === "location" && (
            <div className="q-quick-chips-wrap">
              {["Austin, TX", "Houston, TX", "Dallas, TX", "San Antonio, TX", "Remote / Anywhere in TX"].map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => {
                    setCustomText(city);
                    submitTextAnswer(city);
                  }}
                  className="q-quick-chip"
                >
                  {city}
                </button>
              ))}
            </div>
          )}

          <div className="mt-6 flex items-center justify-between gap-4">
            {currentIndex > 0 ? (
              <button
                type="button"
                onClick={() => handleNext(currentIndex - 1)}
                className="q-btn-back"
              >
                ← Back
              </button>
            ) : <span />}

            <div className="flex items-center gap-3">
              {currentQ.skipLabel && (
                <button
                  type="button"
                  onClick={() => {
                    handleAnswer(currentQ.skipLabel || "Skipped");
                    handleNext(currentIndex + 1);
                  }}
                  className="q-btn-skip"
                >
                  {currentQ.skipLabel}
                </button>
              )}
              <button
                type="submit"
                disabled={!customText.trim() && !currentQ.skipLabel}
                className="q-btn-continue"
              >
                Continue →
              </button>
            </div>
          </div>
        </form>
      )}

      {/* 2. CHOICE TYPE */}
      {currentQ.kind === "choice" && (
        <div className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(currentQ.options || []).map((opt) => {
              const isSelected = answers[currentQ.id] === opt && !isOtherSelected;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    setIsOtherSelected(false);
                    handleAnswer(opt);
                    handleNext(currentIndex + 1);
                  }}
                  className={`q-choice-btn ${isSelected ? "selected" : ""}`}
                >
                  {opt}
                </button>
              );
            })}

            {currentQ.otherOption && (
              <button
                type="button"
                onClick={() => setIsOtherSelected(true)}
                className={`q-choice-btn ${isOtherSelected ? "selected" : ""}`}
              >
                {currentQ.otherOption}
              </button>
            )}
          </div>

          {/* IF OTHER SELECTED */}
          {isOtherSelected && (
            <div className="mt-4 step-in">
              <input
                type="text"
                autoFocus
                className="q-input"
                placeholder="Please specify…"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    submitTextAnswer();
                  }
                }}
              />
              <button
                type="button"
                disabled={!customText.trim()}
                onClick={() => submitTextAnswer()}
                className="q-btn-continue mt-3"
              >
                Continue →
              </button>
            </div>
          )}

          {currentIndex > 0 && (
            <div className="mt-6">
              <button
                type="button"
                onClick={() => handleNext(currentIndex - 1)}
                className="q-btn-back"
              >
                ← Back
              </button>
            </div>
          )}
        </div>
      )}

      {/* 3. TEXTAREA TYPE */}
      {currentQ.kind === "textarea" && (
        <form
          className="mt-6"
          onSubmit={(e) => {
            e.preventDefault();
            submitTextAnswer();
          }}
        >
          <textarea
            autoFocus
            rows={4}
            className="q-input"
            placeholder={currentQ.placeholder}
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
          />
          <div className="mt-6 flex items-center justify-between">
            <button
              type="button"
              onClick={() => handleNext(currentIndex - 1)}
              className="q-btn-back"
            >
              ← Back
            </button>
            <button
              type="submit"
              disabled={!customText.trim()}
              className="q-btn-continue"
            >
              Continue →
            </button>
          </div>
        </form>
      )}

      {/* 4. FEE STEP */}
      {currentQ.kind === "fee" && (
        <div className="mt-6">
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => {
                handleAnswer("Yes");
                handleNext(currentIndex + 1);
              }}
              className="q-fee-btn yes"
            >
              <span className="block text-xl font-bold text-[#1A1917]">Yes</span>
              <span className="block text-xs text-[#546359] mt-1">20% fee only upon hire</span>
            </button>
            <button
              type="button"
              onClick={() => {
                handleAnswer("No");
                setViewState("notFit");
              }}
              className="q-fee-btn no"
            >
              <span className="block text-xl font-bold text-[#546359]">No</span>
              <span className="block text-xs text-[#546359] mt-1">We don&apos;t pay fees</span>
            </button>
          </div>

          <div className="mt-6">
            <button
              type="button"
              onClick={() => handleNext(currentIndex - 1)}
              className="q-btn-back"
            >
              ← Back
            </button>
          </div>
        </div>
      )}

      {/* 5. CONTACT STEP */}
      {currentQ.kind === "contact" && (
        <form className="mt-6 space-y-4" onSubmit={handleContactSubmit}>
          <div>
            <label className="q-label">Your Name</label>
            <input
              type="text"
              required
              className="q-input"
              placeholder="e.g. Jane Smith, Managing Partner"
              value={contact.name}
              onChange={(e) => setContact({ ...contact, name: e.target.value })}
            />
            {contactSubmitted && !isNameValid && (
              <p className="q-field-err">Please enter your full name.</p>
            )}
          </div>

          <div>
            <label className="q-label">Work Email</label>
            <input
              type="email"
              required
              className="q-input"
              placeholder="jane@yourfirm.com"
              value={contact.email}
              onChange={(e) => setContact({ ...contact, email: e.target.value })}
            />
            {contactSubmitted && !isEmailValid && (
              <p className="q-field-err">Please enter a valid work email.</p>
            )}
          </div>

          <div>
            <label className="q-label">Direct Phone</label>
            <input
              type="tel"
              required
              className="q-input"
              placeholder="(555) 000-0000"
              value={contact.phone}
              onChange={(e) => setContact({ ...contact, phone: e.target.value })}
            />
            {contactSubmitted && !isPhoneValid && (
              <p className="q-field-err">Please enter a direct phone number.</p>
            )}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="q-btn-primary"
            >
              See candidate availability &amp; book call →
            </button>
            <p className="text-xs text-center text-[#546359] mt-3">
              🔒 100% confidential · Never shared with other recruiters or external portals
            </p>
          </div>
        </form>
      )}
    </div>
  );
}

