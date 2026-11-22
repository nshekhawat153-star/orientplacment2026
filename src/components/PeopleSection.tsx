import React from "react";
import Image from "next/image";
import Link from "next/link";
import { people, trust } from "@/data";

export function PersonCard({ pid }: { pid: "justin" | "jon"; row?: boolean }) {
  const p = people.find((x) => x.id === pid) || people[0];
  const isJustin = pid === "justin";

  const kicker = isJustin ? "CLIENT SEARCH STRATEGY & INTAKE" : "CANDIDATE VETTING & SCREENING";
  const expLabel = isJustin ? "11 YRS SEARCH" : "20 YRS SEARCH";

  const photoCol = (
    <div className="founder-photo-col">
      <div className="founder-large-photo-frame">
        <Image
          src={p.photo.startsWith("/") ? p.photo : `/${p.photo}`}
          alt={p.name}
          className="founder-large-photo"
          width={340}
          height={400}
          priority={false}
        />
      </div>
    </div>
  );

  const contentCol = (
    <div className="founder-content-col">
      {/* Top Bar: Kicker + Experience Tag */}
      <div className="founder-top-bar">
        <div className="founder-kicker-badge">
          <span className="founder-badge-dot" />
          <span>{kicker}</span>
        </div>
        <span className="founder-exp-tag">{expLabel}</span>
      </div>

      {/* Identity & Direct Email */}
      <div className="founder-identity-block">
        <h3 className="founder-name">{p.name}</h3>
        <p className="founder-title">
          {p.title} <span className="founder-org">· Orion Placement</span>
        </p>
        <a href={`mailto:${p.email}`} className="founder-email-pill" title={`Email ${p.name} directly`}>
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
          <span>{p.email}</span>
        </a>
      </div>

      {/* Scope / Accountability Description */}
      <p className="founder-scope-text">
        {isJustin
          ? "Your primary intake partner. Scopes practice needs with managing partners, aligns commercial terms, and directs candidate shortlists from initial brief to signed offer."
          : "Personally interviews every lateral attorney and legal candidate before their profile reaches your desk. Checks active bar standing, real case experience, and culture fit."}
      </p>

      {/* Executive Direct Quote Box with Blue Highlighting */}
      <div className="founder-quote-box">
        <p className="founder-quote-text">
          {isJustin ? (
            <>
              &ldquo;<span className="founder-quote-blue">Direct founder accountability</span> on every search. We learn your practice needs once and deliver only <span className="founder-quote-blue">screened, qualified candidates</span>.&rdquo;
            </>
          ) : (
            <>
              &ldquo;Every attorney and paralegal is <span className="founder-quote-blue">rigorously pre-screened</span> for <span className="founder-quote-blue">bar standing</span>, <span className="founder-quote-blue">real matter experience</span>, compensation expectations, and <span className="founder-quote-blue">firm fit</span>.&rdquo;
            </>
          )}
        </p>
      </div>

      {/* 3 Key Partner Commitments */}
      <div className="founder-check-list">
        {isJustin ? (
          <>
            <div className="founder-check-item">
              <span className="founder-check-icon" aria-hidden="true">✓</span>
              <span><strong>Direct partner access</strong> — zero junior recruiters or phone trees</span>
            </div>
            <div className="founder-check-item">
              <span className="founder-check-icon" aria-hidden="true">✓</span>
              <span><strong>5–7 business day turnaround</strong> on targeted, verified shortlist</span>
            </div>
            <div className="founder-check-item">
              <span className="founder-check-icon" aria-hidden="true">✓</span>
              <span><strong>Zero upfront fee</strong> · Contingency placement with 90-day guarantee</span>
            </div>
          </>
        ) : (
          <>
            <div className="founder-check-item">
              <span className="founder-check-icon" aria-hidden="true">✓</span>
              <span><strong>1-on-1 vetting interview</strong> with every candidate submitted</span>
            </div>
            <div className="founder-check-item">
              <span className="founder-check-icon" aria-hidden="true">✓</span>
              <span><strong>State bar verification</strong> &amp; malpractice / disciplinary audit</span>
            </div>
            <div className="founder-check-item">
              <span className="founder-check-icon" aria-hidden="true">✓</span>
              <span><strong>Named in {trust.jonNamed} Google reviews</strong> by law firm managing partners</span>
            </div>
          </>
        )}
      </div>

      {/* Card Action Footer */}
      <div className="founder-footer">
        {isJustin && (
          <>
            <div className="founder-footer-meta">
            </div>
            <a
              href={p.calendly || trust.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-founder-cta btn-founder-primary"
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span>Book 15 min with Justin</span>
              <span className="founder-btn-arrow" aria-hidden="true">→</span>
            </a>
          </>
        ) }
      </div>
    </div>
  );

  return (
    <article className={`founder-card founder-row-card founder-${pid}`} id={`founder-${pid}`}>
      {isJustin ? (
        <>
          {photoCol}
          {contentCol}
        </>
      ) : (
        <>
          {contentCol}
          {photoCol}
        </>
      )}
    </article>
  );
}

export function PeopleSection() {
  return (
    <div className="founders-showcase-wrap">
      <div className="founders-grid">
        <PersonCard pid="justin" />
        <PersonCard pid="jon" />
      </div>

      {/* The Orion Direct-Access Promise Reassurance Bar */}
      <div className="founders-promise-bar">
        <div className="promise-bar-content">
          <div className="promise-bar-icon-box" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#60A5FA" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <polyline points="9 12 11 14 15 10" />
            </svg>
          </div>
          <div className="promise-bar-left">
            <div className="promise-bar-tag">
              <span className="promise-tag-dot" />
              <span>DIRECT PARTNER ACCESS</span>
            </div>
            <p className="promise-bar-text">
              When you work with Orion, your search is run <strong>directly by Justin and Jon</strong>.
              You will <span className="promise-text-accent">never be passed to a junior recruiter</span>, coordinator, or phone tree.
            </p>
          </div>
        </div>

        <div className="promise-bar-right">
          <Link href="/hire-attorneys" className="btn-promise-action">
            <span>Submit your open role</span>
            <span className="promise-btn-arrow" aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
