"use client";

import React from "react";
import Link from "next/link";

interface FlowStepperProps {
  entry: "site" | "email";
  currentStepIndex: number;
  onSelectEntry: (entry: "site" | "email") => void;
  onRestart: () => void;
}

const STEPS_SITE = [
  "Describe the seat",
  "Candidates",
  "Full resume",
  "Terms",
  "Interview",
];

const STEPS_MAIL = [
  "Candidate",
  "Full resume",
  "Terms",
  "Interview",
];

export function FlowStepper({
  entry,
  currentStepIndex,
  onSelectEntry,
  onRestart,
}: FlowStepperProps) {
  const stepsList = entry === "site" ? STEPS_SITE : STEPS_MAIL;
  const clampedIndex = Math.min(Math.max(currentStepIndex, 0), stepsList.length - 1);

  return (
    <>
      {/* 1. TOP DEMO CONTROLS BAR */}
      <div className="fc-demobar" role="region" aria-label="Demo controls">
        <div className="wrap" style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <span style={{ fontWeight: 700, color: "#FFFFFF", letterSpacing: "0.04em" }}>DEMO FLOW</span>
            <div className="fc-demobar-seg" role="group" aria-label="Employer traffic origin">
              <button
                type="button"
                aria-pressed={entry === "site"}
                onClick={() => onSelectEntry("site")}
              >
                Website visitor
              </button>
              <button
                type="button"
                aria-pressed={entry === "email"}
                onClick={() => onSelectEntry("email")}
              >
                From cold email
              </button>
            </div>
            <button
              type="button"
              className="fc-demobar-btn"
              onClick={onRestart}
              title="Reset flow to beginning"
            >
              Restart
            </button>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ color: "#94A3B8", fontSize: 12 }}>
              Sample attorney dossiers &amp; terms. Strict confidentiality.
            </span>
            <Link
              href="/jobs"
              className="fc-demobar-btn"
              style={{ textDecoration: "none" }}
            >
              Browse Jobs →
            </Link>
          </div>
        </div>
      </div>

      {/* 2. PROGRESS STEPPER RAIL */}
      <div className="fc-stepper-wrap">
        <div className="wrap" style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
          <ol className="fc-steps" aria-label="Candidate Search Progress">
            {stepsList.map((stepName, idx) => {
              const isDone = idx < clampedIndex;
              const isOn = idx === clampedIndex;
              return (
                <li
                  key={stepName}
                  className={`${isDone ? "done" : ""} ${isOn ? "on" : ""}`}
                  aria-current={isOn ? "step" : undefined}
                >
                  <span style={{ opacity: isOn || isDone ? 1 : 0.6 }}>
                    {idx + 1}. {stepName}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </>
  );
}

