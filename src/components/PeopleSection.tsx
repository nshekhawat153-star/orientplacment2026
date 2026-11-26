import React from "react";
import Image from "next/image";
import Link from "next/link";
import "./people-section.css";
import { people, trust } from "@/data";

/* ------------------------------------------------------------------
   Founders: used on the homepage and /about.
   One portrait, one line on what each founder does, one number, one link.
   Copy sticks to what the client confirmed in the questionnaire.
   ------------------------------------------------------------------ */

const ArrowIcon = () => (
  <svg viewBox="0 0 20 20" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 10h12M11 5l5 5-5 5" />
  </svg>
);

interface FounderView {
  id: "justin" | "jon";
  role: string;
  /** Two facts the client confirmed in the questionnaire */
  stats: Array<{ value: string; label: string }>;
  link: { label: string; href: string; external?: boolean };
  /** Where the face sits in the photo, so both crops line up */
  focus: string;
}

const FOUNDERS: FounderView[] = [
  {
    id: "justin",
    role: "Search & client intake",
    stats: [
      { value: "11 yrs", label: "in recruiting" },
      { value: "1 hr", label: "typical reply, business hours" },
    ],
    link: { label: "Book 15 min with Justin", href: trust.calendly, external: true },
    focus: "50% 30%",
  },
  {
    id: "jon",
    role: "Candidate screening",
    stats: [
      { value: "20 yrs", label: "in recruiting" },
      { value: `${trust.jonNamed}`, label: "Google reviews name him" },
    ],
    link: { label: "Read the reviews", href: "#reviews" },
    focus: "68% 22%",
  },
];

export function PersonCard({ pid }: { pid: "justin" | "jon"; row?: boolean }) {
  const p = people.find((x) => x.id === pid) || people[0];
  const v = FOUNDERS.find((f) => f.id === pid) || FOUNDERS[0];
  const href = pid === "justin" ? p.calendly || v.link.href : v.link.href;

  return (
    <article className="fdr-card" id={`founder-${pid}`}>
      <div className="fdr-photo">
        <div className="fdr-photo-frame">
          <Image
            src={p.photo.startsWith("/") ? p.photo : `/${p.photo}`}
            alt={`${p.name}, ${p.title}`}
            fill
            sizes="(max-width: 640px) 92vw, 340px"
            style={{ objectFit: "cover", objectPosition: v.focus }}
          />
          {/* Phones only: name sits on the photo, the heading below is kept for screen readers */}
          <div className="fdr-photo-cap" aria-hidden="true">
            <span className="fdr-photo-kicker">{v.role}</span>
            <span className="fdr-photo-name">{p.name}</span>
          </div>
        </div>
      </div>

      <div className="fdr-body">
        <p className="fdr-kicker">{v.role}</p>
        <h3 className="fdr-name">{p.name}</h3>
        <p className="fdr-title">{p.title}</p>
        <p className="fdr-does">{p.does}</p>

        <dl className="fdr-stats">
          {v.stats.map((st) => (
            <div key={st.label}>
              <dt>{st.label}</dt>
              <dd>{st.value}</dd>
            </div>
          ))}
        </dl>

        {v.link.external ? (
          <a className="fdr-link" href={href} target="_blank" rel="noopener noreferrer">
            {v.link.label} <ArrowIcon />
          </a>
        ) : (
          <a className="fdr-link" href={href}>
            {v.link.label} <ArrowIcon />
          </a>
        )}
      </div>
    </article>
  );
}

/** "Have a seat to fill? Send it to Justin" — placed by the page that uses it */
export function FounderCta({ className = "" }: { className?: string }) {
  return (
    <p className={`fdr-cta ${className}`.trim()}>
      Have a seat to fill?{" "}
      <Link href="/hire-attorneys">
        Send it to Justin <ArrowIcon />
      </Link>
    </p>
  );
}

export function PeopleSection({ showCta = true }: { showCta?: boolean }) {
  return (
    <div className="fdr">
      <div className="fdr-grid">
        <PersonCard pid="justin" />
        <PersonCard pid="jon" />
      </div>

      {showCta && (
        <div className="fdr-cta-wrap">
          <FounderCta />
        </div>
      )}
    </div>
  );
}
