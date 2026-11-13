import React from "react";
import { terms } from "@/data";
import { Mark } from "./Mark";

export function ProcessSteps({ kind = "employer" }: { kind?: "employer" | "candidate" }) {
  const isCandidate = kind === "candidate";

  const mocks = {
    brief: (
      <div className="mock" aria-hidden="true">
        <div className="mk-h">Your seat</div>
        <div className="mk-f">
          <i>Role</i>
          <span>Estate planning attorney</span>
        </div>
        <div className="mk-f">
          <i>City</i>
          <span>Houston, TX</span>
        </div>
        <div className="mk-chips">
          <span className="on">Texas bar</span>
          <span className="on">Probate</span>
          <span>Spanish</span>
        </div>
      </div>
    ),
    list: (
      <div className="mock" aria-hidden="true">
        <div className="mk-h">
          Shortlist <em>3 matches</em>
        </div>
        <div className="mk-row">
          <b>Candidate A</b>
          <i style={{ width: "92%" }} />
          <span>5 of 5</span>
        </div>
        <div className="mk-row">
          <b>Candidate B</b>
          <i style={{ width: "78%" }} />
          <span>4 of 5</span>
        </div>
        <div className="mk-row">
          <b>Candidate C</b>
          <i style={{ width: "70%" }} />
          <span>4 of 5</span>
        </div>
      </div>
    ),
    cal: (
      <div className="mock" aria-hidden="true">
        <div className="mk-h">Interviews</div>
        <div className="mk-days">
          <span>Mon</span>
          <span>Tue</span>
          <span className="on">
            Wed<b>10:00</b>
          </span>
          <span>Thu</span>
          <span>Fri</span>
        </div>
        <div className="mk-ok">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
          Start date agreed
        </div>
      </div>
    ),
    upload: (
      <div className="mock" aria-hidden="true">
        <div className="mk-h">Your resume</div>
        <div className="mk-drop">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 16V5M7.5 9.5L12 5l4.5 4.5" />
            <path d="M5 15v4h14v-4" />
          </svg>
          <span>resume.pdf</span>
        </div>
        <div className="mk-chips">
          <span className="on">Texas bar</span>
          <span className="on">5 years</span>
        </div>
      </div>
    ),
    jobs: (
      <div className="mock" aria-hidden="true">
        <div className="mk-h">
          Roles for you <em>pay shown</em>
        </div>
        <div className="mk-row">
          <b>Associate</b>
          <i style={{ width: "80%" }} />
          <span>$120k+</span>
        </div>
        <div className="mk-row">
          <b>Attorney</b>
          <i style={{ width: "90%" }} />
          <span>$140k+</span>
        </div>
        <div className="mk-row">
          <b>Senior</b>
          <i style={{ width: "96%" }} />
          <span>$165k+</span>
        </div>
      </div>
    ),
    yes: (
      <div className="mock" aria-hidden="true">
        <div className="mk-h">Introduction</div>
        <div className="mk-yes">
          <span className="mk-q">Share your profile with this firm?</span>
          <span className="mk-btns">
            <b>Yes</b>
            <i>Not now</i>
          </span>
        </div>
        <div className="mk-ok">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
          Your name stays private until then
        </div>
      </div>
    ),
  };

  const steps = isCandidate
    ? [
        {
          num: "01",
          when: "Today",
          title: "Send your resume",
          body: "Upload it or paste it. We read it and show matching roles with the pay.",
          ill: mocks.upload,
        },
        {
          num: "02",
          when: "This week",
          title: "See roles with pay",
          body: "Confidential roles at small and mid-size firms, each with its base range.",
          ill: mocks.jobs,
        },
        {
          num: "03",
          when: "When you say yes",
          title: "Meet the firm",
          body: "We share your profile only with the firms you pick. Free for you.",
          ill: mocks.yes,
        },
      ]
    : [
        {
          num: "01",
          when: <Mark>Day 0</Mark>,
          title: "Tell us the seat",
          body: "Role, city, years, pay and must-haves. Two minutes on the finder, or 15 minutes with Justin.",
          ill: mocks.brief,
        },
        {
          num: "02",
          when: <Mark>Days 1–5</Mark>,
          title: "See the shortlist",
          body: "Screened candidates with pay, bar admission and notice period. You pick who to meet.",
          ill: mocks.list,
        },
        {
          num: "03",
          when: <Mark>Start date</Mark>,
          title: "Interview, hire, then pay",
          body: (
            <>
              Invoice on the start date, <Mark>due in 15 days</Mark>.{" "}
              <Mark>{terms.guarantee}</Mark> if it does not work out.
            </>
          ),
          ill: mocks.cal,
        },
      ];

  return (
    <ol className="process">
      {steps.map((s, idx) => (
        <li key={idx} className="process-card">
          <div className="pstep-top">
            <div className="pstep-badge">
              <span className="pn">{s.num}</span>
              <span className="when">{s.when}</span>
            </div>
            {idx < 2 && (
              <div className="pstep-arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </div>
            )}
          </div>
          <div className="pstep-body">
            <h3>{s.title}</h3>
            <p>{s.body}</p>
          </div>
          <div className="ill">{s.ill}</div>
        </li>
      ))}
    </ol>
  );
}
