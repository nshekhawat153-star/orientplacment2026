import React from "react";
import Image from "next/image";
import Link from "next/link";
import { people, trust } from "@/data";

export function PersonCard({ pid }: { pid: "justin" | "jon"; row?: boolean }) {
  const p = people.find((x) => x.id === pid) || people[0];
  const isJustin = pid === "justin";

  const kicker = isJustin ? "CLIENT SEARCH STRATEGY & INTAKE" : "CANDIDATE VETTING & SCREENING";
  const expLabel = isJustin ? "11 YRS SEARCH" : "20 YRS SEARCH";

  const quote = isJustin
    ? "Direct founder accountability on every legal mandate. We scope your practice needs once and deliver only screened, top-tier counsel."
    : "Every attorney and paralegal is rigorously pre-screened for bar standing, real matter experience, compensation expectations, and firm fit.";

  return (
    <article className={`founder-card founder-${pid}`} id={`founder-${pid}`}>
      {/* Top Bar: Kicker + Experience Tag */}
      <div className="founder-top-bar">
        <div className="founder-kicker-badge">
          <span className="founder-badge-dot" />
          <span>{kicker}</span>
        </div>
        <span className="founder-exp-tag">{expLabel}</span>
      </div>

      {/* Profile Header: Avatar + Identity + Direct Email */}
      <div className="founder-profile-header">
        <div className="founder-avatar-frame">
          <Image
            src={p.photo.startsWith("/") ? p.photo : `/${p.photo}`}
            alt={p.name}
            className="founder-photo"
            width={88}
            height={88}
            priority={false}
          />
          <span className="founder-verified-dot" title="Founding Partner Verified">
            <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor" aria-hidden="true">
              <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z" />
            </svg>
          </span>
        </div>
        <div className="founder-header-details">
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
      </div>

      {/* Scope / Accountability Description */}
      <p className="founder-scope-text">
        {isJustin
          ? "Your primary intake partner. Scopes practice needs with managing partners, aligns commercial terms, and directs candidate shortlists from initial brief to signed offer."
          : "Personally interviews every lateral attorney and legal candidate before their dossier reaches your desk. Assesses active bar credentials, real matter handling, and cultural fit."}
      </p>

      {/* Executive Direct Quote Box */}
      <div className="founder-quote-box">
        <p className="founder-quote-text">&ldquo;{quote}&rdquo;</p>
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
        {isJustin ? (
          <>
            <div className="founder-footer-meta">
              <span className="status-ping-dot" />
              <span>Intake calendar open</span>
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
        ) : (
          <>
            <div className="founder-footer-meta">
              <span className="founder-stars" aria-hidden="true">★★★★★</span>
              <span><strong>5.0</strong> on Google</span>
            </div>
            <a
              href="#reviews"
              className="btn-founder-cta btn-founder-secondary"
            >
              <span>Read Jon&apos;s reviews ({trust.jonNamed})</span>
              <span className="founder-btn-arrow" aria-hidden="true">→</span>
            </a>
          </>
        )}
      </div>
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

      {/* The Orion Zero-Handoff Promise Reassurance Bar */}
      <div className="founders-promise-bar">
        <div className="promise-bar-left">
          <div className="promise-bar-tag">THE ORION ZERO-HANDOFF PROMISE</div>
          <p className="promise-bar-text">
            When you retain Orion Placement, your search is run directly by Justin and Jon.
            You will never be handed off to a junior recruiter, coordinator, or phone tree.
          </p>
        </div>
        <div className="promise-bar-right">
          <Link href="/hire-attorneys" className="btn-promise-action">
            <span>Submit open mandate</span>
            <span className="promise-btn-arrow" aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
