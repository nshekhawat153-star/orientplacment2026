"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Candidate, fmt, findRole } from "@/data";

export interface InteractiveCandidateShowcaseProps {
  c1?: Candidate;
  c2?: Candidate;
  c3?: Candidate;
  c4?: Candidate;
}

export function InteractiveCandidateShowcase({ c1, c2, c3, c4 }: InteractiveCandidateShowcaseProps) {
  const router = useRouter();
  const candidates = [c1, c2, c3, c4].filter((c): c is Candidate => Boolean(c));
  const [activeId, setActiveId] = useState<string>(candidates[0]?.id || "EP-TX-0412");

  const activeCandidate = candidates.find((c) => c.id === activeId) || candidates[0];

  const titleMap: Record<string, { kicker: string; title: string; scope: string }> = {
    "EP-TX-0412": {
      kicker: "ESTATE PLANNING · LATERAL ASSOCIATE",
      title: "Estate Planning Associate",
      scope: "Drafts and runs trust administrations autonomously without partner oversight",
    },
    "LIT-TX-0390": {
      kicker: "CIVIL LITIGATION · LATERAL ASSOCIATE",
      title: "Civil Litigation Associate",
      scope: "Insurance defense background, deposition & trial ready with active caseload",
    },
    "RE-TX-0274": {
      kicker: "COMMERCIAL REAL ESTATE · LATERAL ASSOCIATE",
      title: "Commercial Real Estate Associate",
      scope: "Commercial closings, leasing agreements, and comprehensive title review",
    },
    "LIT-TX-0422": {
      kicker: "COMMERCIAL LITIGATION · SENIOR ASSOCIATE",
      title: "Commercial Litigation Attorney",
      scope: "Contract disputes, business torts, and trial second-chair with 20-attorney firm",
    },
  };

  const handleRequest = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activeCandidate) return;
    if (activeCandidate.id === "EP-TX-0412") {
      router.push(`/candidate/${activeCandidate.id.toLowerCase()}#request`);
    } else {
      router.push(`/find-candidates#ids=${activeCandidate.id}`);
    }
  };

  if (!activeCandidate) return null;

  const activeMeta = titleMap[activeCandidate.id] || {
    kicker: `${(findRole(activeCandidate.role)?.name || "LEGAL TALENT").toUpperCase()} · ${activeCandidate.years} YRS EXP`,
    title: findRole(activeCandidate.role)?.name || "Direct-Hire Attorney",
    scope: activeCandidate.headline,
  };

  const activeBars = activeCandidate.bars.length ? activeCandidate.bars.join(", ") : "Not required";
  const isBuilt = activeCandidate.id === "EP-TX-0412";

  // Practice mix segments for active candidate
  const mixItems = activeCandidate.mix.slice(0, 3);
  const mixColors = ["#1D4ED8", "#475569", "#94A3B8"];

  return (
    <div className="showcase-outer-wrap">
      {/* 2-Column Split: Left 4 Pills + Right Dossier Card */}
      <div className="showcase-split-container">
        {/* LEFT: 4 Selectable Candidate Pills */}
        <div className="showcase-pills-rail" role="tablist" aria-label="Select Candidate">
          {candidates.map((c, idx) => {
            const isSelected = c.id === activeId;
            const meta = titleMap[c.id] || {
              title: findRole(c.role)?.name || "Direct-Hire Attorney",
            };
            const num = String(idx + 1).padStart(2, "0");

            return (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                className={`showcase-pill ${isSelected ? "active" : ""}`}
                onClick={() => setActiveId(c.id)}
              >
                <div className="pill-top">
                  <span className="pill-index">{num}</span>
                  <span className="pill-id">{c.id}</span>
                  <span className="pill-avail">
                    <span className="pill-avail-dot" />
                    <span>{c.availability}</span>
                  </span>
                </div>

                <div className="pill-body">
                  <h4 className="pill-title">{meta.title}</h4>
                  <p className="pill-specs">
                    <span>{c.years} Yrs Exp</span>
                    <span className="pill-sep">·</span>
                    <span>{c.bars.join(", ")} Bar</span>
                    <span className="pill-sep">·</span>
                    <span className="pill-pay">{fmt.range(c.pay)}</span>
                  </p>
                </div>

                <div className="pill-indicator" aria-hidden="true">
                  <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 12l4-4-4-4" />
                  </svg>
                </div>
              </button>
            );
          })}
        </div>

        {/* RIGHT: Active Executive Confidential Dossier Display */}
        <div className="showcase-dossier-panel" key={activeCandidate.id}>
          {/* Top Header */}
          <div className="showcase-dossier-top">
            <div className="showcase-dossier-identity">
              <span className="dossier-crest-label">CONFIDENTIAL DOSSIER</span>
              <span className="dossier-crest-sep">/</span>
              {isBuilt ? (
                <Link
                  href={`/candidate/${activeCandidate.id.toLowerCase()}`}
                  className="dossier-id-link"
                >
                  {activeCandidate.id}
                </Link>
              ) : (
                <span className="dossier-id-code">{activeCandidate.id}</span>
              )}
            </div>

            <div className="showcase-avail-badge">
              <span className="avail-pulse-dot" />
              <span>{activeCandidate.availability}</span>
            </div>
          </div>

          {/* Title & Scope */}
          <div className="showcase-role-block">
            <span className="showcase-kicker">{activeMeta.kicker}</span>
            <h3 className="showcase-display-title">{activeMeta.title}</h3>
            <p className="showcase-scope-text">{activeMeta.scope}</p>
          </div>

          {/* 4-Stat Pillar Grid */}
          <div className="showcase-stats-grid">
            <div className="showcase-stat-box">
              <span className="stat-label">EXPERIENCE</span>
              <span className="stat-val">{activeCandidate.years} Years Lateral</span>
            </div>
            <div className="showcase-stat-box">
              <span className="stat-label">BAR STANDING</span>
              <span className="stat-val">{activeBars} Bar (Active)</span>
            </div>
            <div className="showcase-stat-box">
              <span className="stat-label">CURRENT FIRM</span>
              <span className="stat-val">{activeCandidate.firmType}</span>
            </div>
            <div className="showcase-stat-box highlight-stat">
              <span className="stat-label">TARGET BASE</span>
              <span className="stat-val-pay">{fmt.range(activeCandidate.pay)}</span>
            </div>
          </div>

          {/* Practice Allocation Meter */}
          <div className="showcase-mix-wrap">
            <div className="mix-header">
              <span className="mix-title">Practice Distribution</span>
              <span className="mix-legend-summary">
                {mixItems.map((x) => `${x[0]} ${x[1]}%`).join(" · ")}
              </span>
            </div>
            <div className="mix-bar" aria-hidden="true">
              {mixItems.map((item, idx) => (
                <div
                  key={idx}
                  className="mix-segment"
                  style={{
                    width: `${item[1]}%`,
                    backgroundColor: mixColors[idx % mixColors.length],
                  }}
                />
              ))}
            </div>
          </div>

          {/* Jon Missirlian's Verified Endorsement */}
          <div className="showcase-vetting-card">
            <div className="vetting-badge-row">
              <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="#1D4ED8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="3.5 8.5 6.5 11.5 12.5 4.5" />
              </svg>
              <span className="vetting-author">Screened by Jon Missirlian</span>
            </div>
            <p className="vetting-quote">
              &ldquo;{activeCandidate.why}&rdquo;
            </p>
          </div>

          {/* Action Footer */}
          <div className="showcase-action-footer">
            <div className="showcase-action-reassurance">
              <span className="reassurance-dot" />
              <span>Direct partner interview · Zero upfront retainer · 90-day guarantee</span>
            </div>

            <button
              type="button"
              className="btn-showcase-request"
              onClick={handleRequest}
            >
              <span>Request Profile Dossier</span>
              <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </button>
          </div>
        </div>
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
