import React from "react";
import Link from "next/link";
import Image from "next/image";
import "./home-faq-tools.css";
import { people, trust } from "@/data";
import { Icon } from "./icons";

/* ------------------------------------------------------------------
   Homepage: FAQ + free hiring tools in one section.
   Answers follow the client questionnaire (Q10, Q11, Q14, Q19–Q21).
   Questions already covered in "How it works" are folded into one answer
   (cost + exclusivity) instead of being repeated.
   ------------------------------------------------------------------ */

const FAQS: Array<{ q: string; a: React.ReactNode }> = [
  {
    q: "What does it cost?",
    a: (
      <>
        One contingency fee, only if you hire someone we introduced. Nothing upfront, and the agreement is
        non-exclusive, so you can keep posting and keep your other recruiters. The fee is invoiced on the hire&rsquo;s
        first day and due 15 days later.
      </>
    ),
  },
  {
    q: "How fast will we see candidates?",
    a: (
      <>
        The first qualified candidate usually arrives within a week. Easier seats tend to start in about a month;
        harder ones in six weeks or more, depending on the market and how flexible the role is.
      </>
    ),
  },
  {
    q: "What if the hire leaves early?",
    a: (
      <>
        If they leave or are let go within 90 days of starting, we search again and send replacements at no extra
        fee.
      </>
    ),
  },
  {
    q: "Which seats and firms do you recruit for?",
    a: (
      <>
        Attorneys, paralegals and legal support, from support staff to senior attorneys and lateral partners. Our sweet spot
        is firms of about 50 to 500 people, plaintiff and defense, and we also work with boutiques and national firms
        across the US.
      </>
    ),
  },
  {
    q: "Do you place contract or temp staff?",
    a: <>No. Every placement is a permanent, direct hire.</>,
  },
  {
    q: "How do you keep candidates anonymous?",
    a: (
      <>
        Profiles show experience, firm type and size, never names. The full redacted resume goes to you on request,
        and names follow when both sides agree to meet.
      </>
    ),
  },
];

const TOOLS = [
  {
    href: "/salaries/estate-planning-attorney/houston-tx",
    icon: "chart",
    title: "Salary guides",
    line: "Pay bands by practice, city and years",
  },
  {
    href: "/hiring-kit/estate-planning-attorney",
    icon: "doc",
    title: "Hiring kits",
    line: "Job description, interview questions, scorecard",
  },
  {
    href: "/where-to-post/houston-tx",
    icon: "post",
    title: "Where to post a job",
    line: "Legal job boards compared on cost and speed",
  },
  {
    href: "/where-to-hire/houston-tx",
    icon: "school",
    title: "Where to hire from",
    line: "Law schools, paralegal programs and bar groups",
  },
];

const ArrowIcon = () => (
  <svg viewBox="0 0 20 20" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 10h12M11 5l5 5-5 5" />
  </svg>
);

export function HomeFaqTools() {
  const justin = people.find((p) => p.id === "justin") || people[0];

  return (
    <section className="hft" id="faq" aria-labelledby="hft-h">
      <div className="hft-wrap">
        <header className="hft-head">
          <p className="hft-eyebrow">
            <span aria-hidden="true" />
            Questions
          </p>
          <h2 id="hft-h" className="hft-h2">
            What firms ask <em>first.</em>
          </h2>
          <p className="hft-lede">Straight answers, and free tools if you would rather run the hire yourself.</p>
        </header>

        <div className="hft-body">
          {/* FAQ */}
          <div className="hft-faq">
            {FAQS.map((f, i) => (
              <details key={f.q} className="hft-item" open={i === 0}>
                <summary>
                  <span className="hft-n" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="hft-q">{f.q}</span>
                  <span className="hft-plus" aria-hidden="true" />
                </summary>
                <div className="hft-a">
                  <p>{f.a}</p>
                </div>
              </details>
            ))}
          </div>

          {/* Free tools + a person to call */}
          <aside className="hft-side" id="resources" aria-labelledby="hft-tools-h">
            <div className="hft-tools">
              <p className="hft-tools-k" id="hft-tools-h">
                Free hiring tools <span>No sign-up</span>
              </p>
              <ul>
                {TOOLS.map((t) => (
                  <li key={t.href}>
                    <Link href={t.href} className="hft-tool">
                      <span className="hft-tool-ico" aria-hidden="true">
                        <Icon name={t.icon} />
                      </span>
                      <span className="hft-tool-text">
                        <span className="hft-tool-title">{t.title}</span>
                        <span className="hft-tool-line">{t.line}</span>
                      </span>
                      <span className="hft-tool-go" aria-hidden="true">
                        <ArrowIcon />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="hft-call">
              <Image
                src={justin.photo}
                alt=""
                width={96}
                height={96}
                className="hft-call-photo"
              />
              <div className="hft-call-text">
                <p className="hft-call-q">Still have a question?</p>
                <p className="hft-call-sub">Justin replies within an hour during business hours.</p>
              </div>
              <a className="hft-call-btn" href={justin.calendly || trust.calendly} target="_blank" rel="noopener noreferrer">
                Book 15 min <ArrowIcon />
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
