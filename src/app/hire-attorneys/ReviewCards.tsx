import React from "react";
import { GMark } from "@/components/icons";

interface ReviewItem {
  id: string;
  name: string;
  byline: string;
  quote: string;
  highlights: string[];
  initials: string;
}

// Employer-side Google reviews only (law firms that hired through Orion).
// Source: the Google Business Profile export. Typos lightly corrected.
const REVIEWS: ReviewItem[] = [
  {
    id: "travis-bowen",
    name: "Travis Bowen",
    byline: "Managing Partner · Bowen Law Group",
    quote:
      "Justin Sofman and Jon Missirlian have been relentless in helping us with the staffing needs of our Firm. They have successfully placed 2 new team members with us and we will use them for all of our future staffing needs. Orion Placement, Justin and Jon are professional, excellent at follow-up and experts in finding the talent we need.",
    highlights: ["successfully placed 2 new team members", "we will use them for all of our future staffing needs", "excellent at follow-up"],
    initials: "TB",
  },
  {
    id: "jn",
    name: "JN",
    byline: "Law firm client · Google review",
    quote:
      "I’ve worked with Orion Placement several times over the years, and they’ve always been a pleasure to work with. They’re true professionals, communicate well, and consistently deliver great candidates. I wouldn’t hesitate to recommend them to any law firm looking for a recruiting partner.",
    highlights: ["consistently deliver great candidates", "I wouldn’t hesitate to recommend them"],
    initials: "JN",
  },
  {
    id: "brett-zimmerman",
    name: "Brett Zimmerman",
    byline: "Managing Attorney · Zimmerman Law Firm",
    quote:
      "Jon did an amazing job finding me a perfect candidate for my company. He’s above and beyond with his follow up with candidates. I will be using Orion Placement and Jon for all my future hires!",
    highlights: ["finding me a perfect candidate", "above and beyond with his follow up", "all my future hires"],
    initials: "BZ",
  },
  {
    id: "duncan-bernardo",
    name: "Duncan Bernardo",
    byline: "Employer client · Google review",
    quote:
      "Working with Justin and the Orion team was a fantastic experience. They were consistent, responsive, and did what they said they would. If you’re looking for recruiting experts, they’re what you’re looking for.",
    highlights: ["consistent, responsive, and did what they said they would"],
    initials: "DB",
  },
  {
    id: "josh",
    name: "Josh",
    byline: "Employer client · Google review",
    quote:
      "If you’re looking for a top-notch recruiting company, I highly recommend Orion. Their team is professional, attentive, and truly understands how to match the right talent with the right opportunities. We’ve had a great experience working with them, and I’m confident you won’t be disappointed!",
    highlights: ["top-notch recruiting company", "truly understands how to match the right talent with the right opportunities"],
    initials: "JO",
  },
  {
    id: "vanessa-silva",
    name: "Vanessa Silva",
    byline: "Employer client · Google review",
    quote:
      "I worked with Orion Placement to help me hire a great engineer. I was having no luck myself using the job boards. They were able to find me a great candidate in 2 weeks! Great company. Highly recommended.",
    highlights: ["find me a great candidate in 2 weeks", "no luck myself using the job boards"],
    initials: "VS",
  },
];

function Highlighted({ text, phrases }: { text: string; phrases: string[] }) {
  const escaped = phrases.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const parts = text.split(new RegExp(`(${escaped.join("|")})`, "g"));
  return (
    <>
      {parts.map((part, i) =>
        phrases.includes(part) ? (
          <mark key={i} className="ha-rv-mark">
            {part}
          </mark>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        )
      )}
    </>
  );
}

export function ReviewCards() {
  return (
    <div className="ha-rv-grid">
      <style>{`
        .ha-rv-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 24px;
          align-items: stretch;
          text-align: left;
        }
        .ha-rv-card {
          margin: 0;
          display: flex;
          flex-direction: column;
          background: #FFFFFF;
          border: 1.5px solid #E2E8F0;
          border-radius: 16px;
          padding: 32px 30px 26px;
          box-shadow: 0 2px 10px rgba(8, 20, 42, 0.04);
        }
        .ha-rv-stars { color: #F59E0B; font-size: 17px; letter-spacing: 2px; margin-bottom: 18px; }
        .ha-rv-quote {
          margin: 0 0 22px;
          font-size: 16px;
          line-height: 1.7;
          color: #1E293B;
        }
        .ha-rv-mark {
          background: linear-gradient(transparent 58%, #BFDBFE 58%);
          color: #08142A;
          font-weight: 600;
          padding: 0 1px;
        }
        .ha-rv-spacer { flex: 1 1 auto; }
        .ha-rv-attr { display: flex; align-items: center; gap: 12px; padding-top: 18px; border-top: 1px solid #E2E8F0; }
        .ha-rv-avatar {
          flex: 0 0 auto;
          width: 42px; height: 42px;
          border-radius: 50%;
          display: grid; place-items: center;
          font-family: var(--mono); font-size: 12px; font-weight: 700;
          color: #1D4ED8; background: #EFF6FF; border: 1px solid #DBEAFE;
        }
        .ha-rv-name { font-size: 15px; font-weight: 600; color: #08142A; line-height: 1.3; }
        .ha-rv-byline { font-size: 13px; color: #64748B; line-height: 1.4; }
        .ha-rv-g { margin-left: auto; flex: 0 0 auto; display: inline-flex; }
        .ha-rv-g svg { width: 22px; height: 22px; }
        @media (max-width: 1024px) {
          .ha-rv-grid { grid-template-columns: 1fr; gap: 16px; max-width: 640px; margin: 0 auto; }
        }
        @media (max-width: 640px) {
          /* phones: only the first three reviews */
          .ha-rv-card:nth-of-type(n + 4) { display: none; }
          .ha-rv-card { padding: 24px 20px 20px; }
          .ha-rv-quote { font-size: 15.5px; }
        }
      `}</style>

      {REVIEWS.map((r) => (
        <figure key={r.id} className="ha-rv-card">
          <div className="ha-rv-stars" aria-label="5 out of 5 stars">
            ★★★★★
          </div>
          <blockquote className="ha-rv-quote">“<Highlighted text={r.quote} phrases={r.highlights} />”</blockquote>
          <div className="ha-rv-spacer" />
          <figcaption className="ha-rv-attr">
            <span className="ha-rv-avatar" aria-hidden="true">
              {r.initials}
            </span>
            <div style={{ minWidth: 0 }}>
              <div className="ha-rv-name">{r.name}</div>
              <div className="ha-rv-byline">Google Review</div>
            </div>
            <span className="ha-rv-g" title="Google review">
              <GMark />
            </span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
