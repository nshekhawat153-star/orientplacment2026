"use client";

import React, { useState } from "react";
import Link from "next/link";
import "./design-concept.css";

const SWATCHES = [
  { name: "Navy Obsidian", hex: "#060D18", bg: "#060D18", border: "#1E293B" },
  { name: "Boardroom Midnight", hex: "#0B1728", bg: "#0B1728", border: "#1E293B" },
  { name: "Frosted Glass Surface", hex: "#11233D", bg: "#11233D", border: "#334155" },
  { name: "Luminous Sapphire", hex: "#60A5FA", bg: "#60A5FA", border: "#93C5FD" },
  { name: "Warm Legal Paper", hex: "#FAF9F5", bg: "#FAF9F5", border: "#E2E8F0" },
  { name: "Tinted Cream (Reviews)", hex: "#F4F0E6", bg: "#F4F0E6", border: "#CBD5E1" },
  { name: "Savile Heritage Navy", hex: "#1B3A6B", bg: "#1B3A6B", border: "#2563EB" },
  { name: "Legal Sapphire Pop", hex: "#2F62B8", bg: "#2F62B8", border: "#60A5FA" },
  { name: "Deep Legal Ink", hex: "#1A1917", bg: "#1A1917", border: "#334155" },
  { name: "Champagne Gold Seal", hex: "#C99738", bg: "#C99738", border: "#FDE047" },
];

export default function DesignConceptPage() {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <div className="dc-container">
      {/* 0. STICKY ARCHITECTURAL CONTROL BAR */}
      <header className="dc-spec-bar">
        <div className="dc-spec-bar-inner">
          <div className="dc-brand-tag">
            <span className="dc-badge-godmode">ORION SPEC · V2.0</span>
            <span className="dc-brand-title">Orion Placement Design Architecture</span>
          </div>

          <nav className="dc-nav-pills" aria-label="Section navigation">
            <a href="#executive-dark" className="dc-nav-pill">
              1. Executive Dark Section
            </a>
            <a href="#editorial-light" className="dc-nav-pill">
              2. Warm Editorial Light Section
            </a>
            <a href="#specimen-board" className="dc-nav-pill">
              3. UI Specimen Board
            </a>
            <Link href="/hire-attorneys" className="dc-nav-pill" style={{ color: "#60A5FA" }}>
              ← Return to Live Page
            </Link>
          </nav>
        </div>
      </header>

      {/* ========================================================
          1. EXECUTIVE MIDNIGHT DARK ATMOSPHERE
          Orion's Sourcing Engine (Boardroom Midnight Palette)
          ======================================================== */}
      <section id="executive-dark" className="dc-dark-section">
        <div className="dc-dark-wrap">
          <div className="dc-dark-header">
            <span className="dc-eyebrow">CONTINGENCY LEGAL RECRUITING · 23% DUE ONLY IF YOU HIRE</span>

            <h1 className="dc-dark-h1">
              We&apos;re the recruiters who{" "}
              <span className="dc-italic-accent">get the job done.</span>
            </h1>

            <p className="dc-dark-lead">
              Direct permanent attorney placements for law firms with 50 to 500 attorneys across Texas and nationwide. Zero upfront retainer. 23% contingency fee due only when your candidate starts.
            </p>

            <div className="dc-dark-actions">
              <Link href="/find-candidates" className="dc-btn-primary-sapphire">
                <span>See candidates for my seat</span>
                <svg aria-hidden="true" viewBox="0 0 20 20" width="18" height="18" fill="currentColor">
                  <path d="M10.3 3.3a1 1 0 0 1 1.4 0l6 6a1 1 0 0 1 0 1.4l-6 6a1 1 0 1 1-1.4-1.4l4.3-4.3H3a1 1 0 1 1 0-2h11.6l-4.3-4.3a1 1 0 0 1 0-1.4Z" />
                </svg>
              </Link>
              <a
                href="https://calendly.com/orionplacement/call-with-justin"
                target="_blank"
                rel="noopener noreferrer"
                className="dc-btn-outline-boardroom"
              >
                <span>Book 15 min with Justin</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          {/* 3 FROSTED GLASS CARDS (THE SOURCING ENGINE) */}
          <div className="dc-dark-pillars-3">
            {/* PILLAR 1 */}
            <article className="dc-frosted-card">
              <div className="dc-card-icon-wrap" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="1.5" fill="none">
                  <path d="M12 3v18M3 8l9-5 9 5M6 13l-3-5h6l-3 5zm12 0l-3-5h6l-3 5zM4 21h16" />
                </svg>
              </div>
              <span className="dc-card-step-badge">STEP 01 · PRECISION INTAKE</span>
              <h2 className="dc-card-title-dark">Practice &amp; Culture Mapping</h2>
              <p className="dc-card-desc-dark">
                We analyze your firm&apos;s specific practice group, billable hour expectations, partner track, and compensation parameters before reaching out to the market.
              </p>
            </article>

            {/* PILLAR 2 */}
            <article className="dc-frosted-card">
              <div className="dc-card-icon-wrap" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="1.5" fill="none">
                  <circle cx="12" cy="12" r="9" />
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
                </svg>
              </div>
              <span className="dc-card-step-badge">STEP 02 · RELENTLESS SOURCING</span>
              <h2 className="dc-card-title-dark">100,000+ Candidate Pool</h2>
              <p className="dc-card-desc-dark">
                Direct, multi-channel outreach across active candidates and passive top-tier attorneys who are not on job boards. We facilitate over 30 successful hires every month.
              </p>
            </article>

            {/* PILLAR 3 */}
            <article className="dc-frosted-card">
              <div className="dc-card-icon-wrap" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="1.5" fill="none">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <span className="dc-card-step-badge">STEP 03 · 90-DAY GUARANTEE</span>
              <h2 className="dc-card-title-dark">23% Contingency &amp; Net 15</h2>
              <p className="dc-card-desc-dark">
                Zero upfront retainer. Invoiced on day 1 of employment, due in 15 days. If a placed attorney leaves within 90 days, we conduct a replacement search at zero extra cost.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. WARM EDITORIAL LIGHT ATMOSPHERE
          Warm Paper (#FAF9F5) + Tinted Cream (#F4F0E6)
          ======================================================== */}
      <section id="editorial-light" className="dc-light-section">
        <div className="dc-light-wrap">
          <div className="dc-light-header">
            <span className="dc-light-kicker">VERIFIED CLIENT OUTCOMES · 5.0 GOOGLE REVIEWS</span>
            <h2 className="dc-light-h2">Law firms choose Orion when hiring actually matters.</h2>
            <p className="dc-light-desc">
              Direct feedback from managing partners and firm administrators at law firms with 50 to 500 attorneys.
            </p>
          </div>

          {/* 3 Review Cards */}
          <div className="dc-light-cards-3">
            <article className="dc-paper-card">
              <div>
                <div className="dc-card-top">
                  <div className="dc-stars" aria-label="5 out of 5 stars">
                    {"★★★★★"}
                  </div>
                  <span className="dc-google-badge">5.0 ★ Google Review</span>
                </div>
                <h3 className="dc-review-h3">Placed 2 attorneys with fast turnaround</h3>
                <blockquote className="dc-review-quote">
                  &ldquo;Justin Sofman and Jon Missirlian have been relentless in helping us with the staffing needs of our Firm. They have successfully placed 2 new team members with us and we will use them for all of our future staffing needs.&rdquo;
                </blockquote>
              </div>
              <div className="dc-review-author">
                <div className="dc-avatar">⚖</div>
                <div>
                  <b className="dc-author-name">Travis Bowen</b>
                  <span className="dc-author-role">Managing Partner, Law Firm</span>
                </div>
              </div>
            </article>

            <article className="dc-paper-card">
              <div>
                <div className="dc-card-top">
                  <div className="dc-stars" aria-label="5 out of 5 stars">
                    {"★★★★★"}
                  </div>
                  <span className="dc-google-badge">5.0 ★ Google Review</span>
                </div>
                <h3 className="dc-review-h3">Consistent delivery of top-tier talent</h3>
                <blockquote className="dc-review-quote">
                  &ldquo;Jon Missirlian has been a trusted recruiter for quite some time, consistently delivering high-quality candidates. Beyond his professional expertise, he is always respectful, kind, and responsive.&rdquo;
                </blockquote>
              </div>
              <div className="dc-review-author">
                <div className="dc-avatar">⚖</div>
                <div>
                  <b className="dc-author-name">Lainie James</b>
                  <span className="dc-author-role">Firm Administrator (Named in 47 Reviews)</span>
                </div>
              </div>
            </article>

            <article className="dc-paper-card">
              <div>
                <div className="dc-card-top">
                  <div className="dc-stars" aria-label="5 out of 5 stars">
                    {"★★★★★"}
                  </div>
                  <span className="dc-google-badge">5.0 ★ Google Review</span>
                </div>
                <h3 className="dc-review-h3">Found the perfect candidate for our firm</h3>
                <blockquote className="dc-review-quote">
                  &ldquo;Jon did an amazing job finding me a perfect candidate for my company. He&apos;s above and beyond with his follow up with candidates. I will be using Orion Placement and Jon for all my future hires!&rdquo;
                </blockquote>
              </div>
              <div className="dc-review-author">
                <div className="dc-avatar">⚖</div>
                <div>
                  <b className="dc-author-name">Verified Managing Partner</b>
                  <span className="dc-author-role">Commercial Litigation Boutique</span>
                </div>
              </div>
            </article>
          </div>

          {/* Tinted Stats Strip (The warm #F4F0E6 background user loved) */}
          <div className="dc-tinted-stats-strip">
            <div>
              <div className="dc-stat-num">30+</div>
              <div className="dc-stat-label">Hires per month</div>
            </div>
            <div>
              <div className="dc-stat-num">200+</div>
              <div className="dc-stat-label">Last 12 months</div>
            </div>
            <div>
              <div className="dc-stat-num">100,000+</div>
              <div className="dc-stat-label">Legal talent pool</div>
            </div>
            <div>
              <div className="dc-stat-num">23%</div>
              <div className="dc-stat-label">Net 15 contingency</div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. DESIGN SYSTEM TOKEN & COMPONENT SPECIMEN BOARD
          ======================================================== */}
      <section id="specimen-board" className="dc-specimen-section">
        <div className="dc-specimen-wrap">
          <h2 className="dc-specimen-title">Design System Token &amp; Component Specimen</h2>
          <p className="dc-specimen-sub">
            Architectural tokens configured for both the Executive Midnight Dark and Warm Editorial Light atmospheres. Click any swatch to copy hex code.
          </p>

          {/* COLOR PALETTE */}
          <div className="dc-spec-group">
            <div className="dc-group-h3">Color Palette Swatches</div>
            <div className="dc-swatch-grid">
              {SWATCHES.map((s) => (
                <div
                  key={s.name}
                  className="dc-swatch-card"
                  onClick={() => copyToClipboard(s.hex)}
                  style={{ cursor: "pointer" }}
                  title="Click to copy hex"
                >
                  <div className="dc-swatch-color" style={{ background: s.bg, borderBottom: `1px solid ${s.border}` }} />
                  <div className="dc-swatch-meta">
                    <div className="dc-swatch-name">{s.name}</div>
                    <div className="dc-swatch-hex">
                      {copiedHex === s.hex ? "✓ Copied!" : s.hex}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BUTTON SPECIMENS */}
          <div className="dc-spec-group">
            <div className="dc-group-h3">Button &amp; CTA Geometries (8px Crisp vs 999px Capsule)</div>
            <div className="dc-buttons-row">
              <button type="button" className="dc-btn-primary-sapphire">
                Primary Sapphire Action (8px)
              </button>
              <button type="button" className="dc-btn-outline-boardroom">
                Boardroom Outline Button (8px)
              </button>
              <button type="button" className="dc-btn-capsule-gold">
                Gold Guarantee Capsule (999px)
              </button>
            </div>
          </div>

          {/* 1.5PX OUTLINE ICONOGRAPHY */}
          <div className="dc-spec-group">
            <div className="dc-group-h3">1.5px Hairline Outline Iconography Library</div>
            <div className="dc-icons-row">
              <div className="dc-icon-box">
                <svg viewBox="0 0 24 24">
                  <path d="M12 3v18M3 8l9-5 9 5M6 13l-3-5h6l-3 5zm12 0l-3-5h6l-3 5zM4 21h16" />
                </svg>
                <span className="dc-icon-title">Scales of Justice</span>
                <span className="dc-icon-role">Legal Credentials</span>
              </div>

              <div className="dc-icon-box">
                <svg viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="9" />
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
                </svg>
                <span className="dc-icon-title">Search Reticle</span>
                <span className="dc-icon-role">100k+ Talent Sweep</span>
              </div>

              <div className="dc-icon-box">
                <svg viewBox="0 0 24 24">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                <span className="dc-icon-title">Shield Guarantee</span>
                <span className="dc-icon-role">90-Day Protection</span>
              </div>

              <div className="dc-icon-box">
                <svg viewBox="0 0 24 24">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                  <path d="M12 14v4l2-2" />
                </svg>
                <span className="dc-icon-title">Response SLA</span>
                <span className="dc-icon-role">Within 1 Hour</span>
              </div>

              <div className="dc-icon-box">
                <svg viewBox="0 0 24 24">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                <span className="dc-icon-title">Direct Founders</span>
                <span className="dc-icon-role">Justin &amp; Jon (31 Yrs Exp)</span>
              </div>
            </div>
          </div>

          {/* TYPOGRAPHY LADDER */}
          <div className="dc-spec-group">
            <div className="dc-group-h3">Typography Scale &amp; Pairing Hierarchy</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div>
                <span style={{ fontSize: 12, color: "#64748B", fontFamily: "var(--font-dm-mono, monospace)" }}>DISPLAY H1 · DM SERIF DISPLAY (56px)</span>
                <div style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: 44, color: "#FFFFFF", marginTop: 4 }}>
                  Precision Legal Recruiting for AmLaw &amp; Mid-Size Law Firms.
                </div>
              </div>
              <div>
                <span style={{ fontSize: 12, color: "#64748B", fontFamily: "var(--font-dm-mono, monospace)" }}>ITALIC ACCENT · DM SERIF DISPLAY ITALIC</span>
                <div style={{ fontFamily: "var(--font-dm-serif, serif)", fontStyle: "italic", fontSize: 36, color: "#93C5FD", marginTop: 4 }}>
                  &ldquo;We&apos;re the recruiters who get the job done.&rdquo;
                </div>
              </div>
              <div>
                <span style={{ fontSize: 12, color: "#64748B", fontFamily: "var(--font-dm-mono, monospace)" }}>ASTRONOMICAL KICKER · DM MONO (12px / +0.18em)</span>
                <div style={{ fontFamily: "var(--font-dm-mono, monospace)", fontSize: 13, letterSpacing: "0.18em", color: "#60A5FA", marginTop: 4 }}>
                  STEP 01 · PRECISION INTAKE · PRACTICE &amp; CULTURE MAPPING
                </div>
              </div>
              <div>
                <span style={{ fontSize: 12, color: "#64748B", fontFamily: "var(--font-dm-mono, monospace)" }}>BODY EDITORIAL · INTER SANS (16px / 1.65 line-height)</span>
                <div style={{ fontFamily: "var(--font-inter, sans-serif)", fontSize: 16, color: "#CBD5E1", maxWidth: 680, lineHeight: 1.65, marginTop: 4 }}>
                  We operate exclusively on a non-exclusive, contingency-based model at 23% of the candidate&apos;s compensation. Clients only pay when they successfully hire. Invoiced on the first day of employment, due in 15 days.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
