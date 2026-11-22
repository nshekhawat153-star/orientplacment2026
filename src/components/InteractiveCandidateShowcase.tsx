"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Candidate, fmt, findRole } from "@/data";
import { useSite } from "@/context/SiteContext";
import { WorkEmailGateModal } from "@/app/find-candidates/components/WorkEmailGateModal";
import { enrichCandidate, EnrichedCandidate } from "@/app/find-candidates/candidateData";

export interface InteractiveCandidateShowcaseProps {
  c1?: Candidate;
  c2?: Candidate;
  c3?: Candidate;
  c4?: Candidate;
  c5?: Candidate;
  c6?: Candidate;
}

export function InteractiveCandidateShowcase({ c1, c2, c3, c4, c5, c6 }: InteractiveCandidateShowcaseProps) {
  const router = useRouter();
  const { setUnlocked, setUserEmail } = useSite();
  const [gateCandidate, setGateCandidate] = useState<EnrichedCandidate | null>(null);
  const rawList = [c1, c2, c3, c4, c5, c6].filter((c): c is Candidate => Boolean(c));

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

  const handleRequest = (e: React.MouseEvent, c: Candidate) => {
    e.stopPropagation();
    const enriched = enrichCandidate(c);
    setGateCandidate(enriched);
  };

  const handleGateSuccess = (info: { email: string; firm: string; guessName: string }) => {
    if (gateCandidate) {
      const candId = gateCandidate.id;
      try {
        setUnlocked(true);
        setUserEmail(info.email);
        localStorage.setItem("fc_work_email", info.email);
        if (info.firm) localStorage.setItem("fc_firm", info.firm);
      } catch {}
      setGateCandidate(null);
      router.push(`/candidate/${candId.toLowerCase()}`);
    }
  };

  const handleCardClick = (candidateId: string) => {
    router.push(`/candidate/${candidateId.toLowerCase()}`);
  };

  return (
    <div className="cand-gallery-wrap">
      {/* Desktop: 3 + 3 cards. Phones: first 3 only, no toggle */}
      <div className="cand-gallery-grid">
        {rawList.map((c, idx) => {
          const meta = titleMap[c.id] || {
            title: findRole(c.role)?.name || "Direct-Hire Attorney",
            scope: c.headline,
          };
          const bars = c.bars.length ? c.bars.join(", ") : "Not required";
          const num = String(idx + 1).padStart(2, "0");
          const isMobileHidden = idx >= 3; // phones show the first 3 only; desktop shows all 6

          return (
            <div
              key={c.id}
              className={`cand-gallery-card ${isMobileHidden ? "cand-card-mobile-hidden" : ""}`}
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
                  onClick={(e) => handleRequest(e, c)}
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

      {/* Mobile Show More / Show Less Toggle (Only visible on mobile <= 900px, hidden on desktop) */}
     

      {/* Sleek Executive Directory Discovery Strip - Premium Dark Redesign */}
      <div className="showcase-bottom-banner">
        <div className="showcase-banner-content">
          <div className="showcase-banner-icon-box" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#60A5FA" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <div className="showcase-banner-text">
            <h4 className="showcase-banner-title">
              Looking for candidates in a different practice area, city, or experience level?
            </h4>
            <p className="showcase-banner-desc showcase-desc-desktop">
              Search across <strong>100,000+ active &amp; passive attorneys, paralegals, and legal staff</strong> nationwide. Filter by practice specialty, active bar standing, and verified compensation.
            </p>
            <p className="showcase-banner-desc showcase-desc-mobile">
              Search <strong>100,000+ pre-screened attorneys &amp; legal staff</strong> nationwide.
            </p>
          </div>
        </div>

        <div className="showcase-banner-cta-group">
          <Link href="/find-candidates" className="btn-showcase-all">
            <span>Search all candidates</span>
            <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor" aria-hidden="true">
              <path d="M10.3 3.3a1 1 0 0 1 1.4 0l6 6a1 1 0 0 1 0 1.4l-6 6a1 1 0 1 1-1.4-1.4l4.3-4.3H3a1 1 0 1 1 0-2h11.6l-4.3-4.3a1 1 0 0 1 0-1.4Z" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Work Email Gate Modal Flow for Candidate Resume Dossier */}
      {gateCandidate && (
        <WorkEmailGateModal
          candidate={gateCandidate}
          onClose={() => setGateCandidate(null)}
          onSuccess={handleGateSuccess}
        />
      )}
    </div>
  );
}
