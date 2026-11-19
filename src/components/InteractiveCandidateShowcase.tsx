"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Candidate, fmt, findRole } from "@/data";

export interface InteractiveCandidateShowcaseProps {
  c1?: Candidate;
  c2?: Candidate;
  c3?: Candidate;
  c4?: Candidate;
  c5?: Candidate;
}

export function InteractiveCandidateShowcase({ c1, c2, c3, c4, c5 }: InteractiveCandidateShowcaseProps) {
  const router = useRouter();
  const rawList = [c1, c2, c3, c4, c5].filter((c): c is Candidate => Boolean(c));

  const titleMap: Record<string, { title: string; scope: string }> = {
    "EP-TX-0412": {
      title: "Estate Planning Associate",
      scope: "Drafts and runs trust administrations autonomously without partner oversight.",
    },
    "LIT-TX-0390": {
      title: "Civil Litigation Associate",
      scope: "Insurance defense background, deposition & hearing ready with active caseload.",
    },
    "RE-TX-0274": {
      title: "Commercial Real Estate Associate",
      scope: "Commercial closings, leasing agreements, and comprehensive title examination.",
    },
    "LIT-TX-0422": {
      title: "Commercial Litigation Attorney",
      scope: "Contract disputes, business torts, and trial second-chair with 20-attorney firm.",
    },
    "EP-TX-0451": {
      title: "Senior Estate & Tax Attorney",
      scope: "Estate tax planning, Form 706/709 returns, and business succession for HNW families.",
    },
  };

  const handleRequest = (e: React.MouseEvent, candidateId: string) => {
    e.stopPropagation();
    router.push(`/candidate/${candidateId.toLowerCase()}#request`);
  };

  const handleCardClick = (candidateId: string) => {
    router.push(`/candidate/${candidateId.toLowerCase()}`);
  };

  return (
    <div className="cand-gallery-wrap">
      {/* 3 + 2 Cards Layout: Row 1 has 3 cards (33% each), Row 2 has 2 cards full-width (50% each) */}
      <div className="cand-gallery-grid">
        {rawList.map((c, idx) => {
          const meta = titleMap[c.id] || {
            title: findRole(c.role)?.name || "Direct-Hire Attorney",
            scope: c.headline,
          };
          const bars = c.bars.length ? c.bars.join(", ") : "Not required";
          const num = String(idx + 1).padStart(2, "0");

          return (
            <div
              key={c.id}
              className="cand-gallery-card"
              onClick={() => handleCardClick(c.id)}
            >
              {/* Top Row: Confidential ID badge & Availability status */}
              <div className="cand-card-topbar">
                <div className="cand-card-id-badge">
                  <span className="cand-card-index">{num}</span>
                  <Link
                    href={`/candidate/${c.id.toLowerCase()}`}
                    className="cand-card-id-link"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {c.id}
                  </Link>
                </div>

                <div className="cand-card-avail-badge">
                  <span className="cand-avail-dot" />
                  <span>{c.availability}</span>
                </div>
              </div>

              {/* Title & Scope */}
              <div className="cand-card-header">
                <h3 className="cand-card-title">{meta.title}</h3>
                <p className="cand-card-scope">{meta.scope}</p>
              </div>

              {/* 4-Stat Metrics Grid */}
              <div className="cand-card-stats-grid">
                <div className="cand-stat-box">
                  <span className="cand-stat-label">EXPERIENCE</span>
                  <span className="cand-stat-val">{c.years} Yrs Lateral</span>
                </div>
                <div className="cand-stat-box">
                  <span className="cand-stat-label">BAR STANDING</span>
                  <span className="cand-stat-val">{bars} Bar</span>
                </div>
                <div className="cand-stat-box">
                  <span className="cand-stat-label">CURRENT FIRM</span>
                  <span className="cand-stat-val">{c.firmType}</span>
                </div>
                <div className="cand-stat-box highlight-stat">
                  <span className="cand-stat-label">TARGET BASE</span>
                  <span className="cand-stat-val-pay">{fmt.range(c.pay)}</span>
                </div>
              </div>

              {/* Jon's Screening Endorsement Quote */}
              <div className="cand-card-vetting">
                <div className="cand-vetting-author-row">
                  <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="3.5 8.5 6.5 11.5 12.5 4.5" />
                  </svg>
                  <span>Screened by Jon Missirlian</span>
                </div>
                <p className="cand-vetting-quote">&ldquo;{c.why}&rdquo;</p>
              </div>

              {/* Footer CTA Button */}
              <div className="cand-card-footer">
                <button
                  type="button"
                  className="btn-cand-request"
                  onClick={(e) => handleRequest(e, c.id)}
                >
                  <span>Request Profile Dossier</span>
                  <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sleek Executive Directory Discovery Strip */}
      <div className="showcase-bottom-banner">
        <div className="showcase-banner-content">
          <div className="showcase-banner-icon-box" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#1D4ED8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <div className="showcase-banner-text">
            <h4 className="showcase-banner-title">
              Looking for candidates in a different practice area, city, or experience level?
            </h4>
            <p className="showcase-banner-desc">
              Search across 100,000+ active and passive attorneys, paralegals, and legal staff nationwide. Filter by practice specialty, bar standing, and verified compensation.
            </p>
          </div>
        </div>

        <div className="showcase-banner-cta-group">
          <Link href="/find-candidates" className="btn-showcase-all">
            <span>See all candidates</span>
            <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor" aria-hidden="true">
              <path d="M10.3 3.3a1 1 0 0 1 1.4 0l6 6a1 1 0 0 1 0 1.4l-6 6a1 1 0 1 1-1.4-1.4l4.3-4.3H3a1 1 0 1 1 0-2h11.6l-4.3-4.3a1 1 0 0 1 0-1.4Z" />
            </svg>
          </Link>
          <span className="showcase-banner-subtext">Free search · No retainer required</span>
        </div>
      </div>
    </div>
  );
}
