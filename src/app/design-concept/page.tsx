"use client";

import React, { useState } from "react";
import Link from "next/link";
import "./design-concept.css";

const LUXURY_SWATCHES = [
  { name: "Deep Obsidian Void", hex: "#040914", bg: "#040914", border: "#1E293B", category: "Dark Foundation" },
  { name: "Velvet Boardroom Navy", hex: "#0B1628", bg: "#0B1628", border: "#1E293B", category: "Dark Foundation" },
  { name: "Midnight Executive", hex: "#152A4A", bg: "#152A4A", border: "#334155", category: "Dark Elevation" },
  { name: "Aurora Ice Accent", hex: "#7DD3FC", bg: "#7DD3FC", border: "#BAE6FD", category: "Luminous Accent" },
  { name: "Royal Cobalt Sapphire", hex: "#1D4ED8", bg: "#1D4ED8", border: "#3B82F6", category: "Brand Core" },
  { name: "Electric Sapphire Pop", hex: "#3B82F6", bg: "#3B82F6", border: "#93C5FD", category: "Interactive CTA" },
  { name: "Warm Editorial Ivory", hex: "#FAF8F5", bg: "#FAF8F5", border: "#E2E8F0", category: "Light Foundation" },
  { name: "Unbleached Linen Cream", hex: "#F3EFE6", bg: "#F3EFE6", border: "#CBD5E1", category: "Light Tint (Reviews)" },
  { name: "Midnight Sumi Ink", hex: "#111625", bg: "#111625", border: "#334155", category: "Light Typography" },
  { name: "Antiqued 24K Gold", hex: "#D4AF37", bg: "#D4AF37", border: "#FDE047", category: "Trust & Stars" },
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
      {/* 0. ARCHITECTURAL CONTROL BAR */}
      <header className="dc-spec-bar">
        <div className="dc-spec-bar-inner">
          <div className="dc-brand-tag">
            <span className="dc-badge-godmode">ULTRA-LUXURY ARCHITECTURE · V3.0</span>
            <span className="dc-brand-title">Orion Placement Executive Palette</span>
          </div>

          <nav className="dc-nav-pills" aria-label="Section navigation">
            <a href="#executive-dark" className="dc-nav-pill">
              1. Executive Midnight (Dark)
            </a>
            <a href="#editorial-light" className="dc-nav-pill">
              2. Savile Row Linen (Light)
            </a>
            <a href="#specimen-board" className="dc-nav-pill">
              3. Luxury Token Specimen
            </a>
            <Link href="/hire-attorneys" className="dc-nav-pill" style={{ color: "#7DD3FC" }}>
              ← Return to Live Page
            </Link>
          </nav>
        </div>
      </header>

      {/* ========================================================
          1. ULTRA-LUXURY EXECUTIVE MIDNIGHT (DARK)
          Obsidian, Velvet Navy & Aurora Backlight
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

          {/* 3 SMOKED OBSIDIAN GLASS PILLARS */}
          <div className="dc-dark-pillars-3">
            {/* PILLAR 1 */}
            <article className="dc-frosted-card">
              <div className="dc-card-icon-wrap" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="26" height="26" stroke="currentColor" strokeWidth="1.5" fill="none">
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
                <svg viewBox="0 0 24 24" width="26" height="26" stroke="currentColor" strokeWidth="1.5" fill="none">
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
                <svg viewBox="0 0 24 24" width="26" height="26" stroke="currentColor" strokeWidth="1.5" fill="none">
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
          2. SAVILE ROW EDITORIAL LINEN (LIGHT)
          Warm Paper (#FAF8F5) + Unbleached Linen (#F3EFE6)
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

          {/* Unbleached Linen Stats Strip (The #F3EFE6 user praised) */}
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
          3. LUXURY DESIGN SYSTEM SPECIMEN BOARD
          ======================================================== */}
      <section id="specimen-board" className="dc-specimen-section">
        <div className="dc-specimen-wrap">
          <h2 className="dc-specimen-title">Pinnacle Tier Design Token Specimen</h2>
          <p className="dc-specimen-sub">
            Harmonized dual-atmosphere color physics: Executive Midnight Obsidian &amp; Savile Row Editorial Linen. Click any swatch to copy its exact hex code.
          </p>

          {/* COLOR PALETTE */}
          <div className="dc-spec-group">
            <div className="dc-group-h3">Executive Color Palette Swatches</div>
            <div className="dc-swatch-grid">
              {LUXURY_SWATCHES.map((s) => (
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
                    <div style={{ fontSize: 11, color: "#64748B", marginBottom: 4 }}>{s.category}</div>
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
            <div className="dc-group-h3">High-Conversion CTA Geometries (8px Crisp Tailored vs 999px Capsule)</div>
            <div className="dc-buttons-row">
              <button type="button" className="dc-btn-primary-sapphire">
                Dual-Layer Sapphire Action (8px)
              </button>
              <button type="button" className="dc-btn-outline-boardroom">
                Frosted Boardroom Outline (8px)
              </button>
              <button type="button" className="dc-btn-capsule-gold">
                Antiqued 24K Guarantee Capsule (999px)
              </button>
            </div>
          </div>

          {/* 1.5PX OUTLINE ICONOGRAPHY */}
          <div className="dc-spec-group">
            <div className="dc-group-h3">1.5px Hairline Outline Iconography Library (Legal Gravitas)</div>
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
            <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
              <div>
                <span style={{ fontSize: 12, color: "#64748B", fontFamily: "var(--font-dm-mono, monospace)" }}>DISPLAY H1 · DM SERIF DISPLAY (56px)</span>
                <div style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: 44, color: "#FFFFFF", marginTop: 4 }}>
                  Precision Legal Recruiting for AmLaw &amp; Mid-Size Law Firms.
                </div>
              </div>
              <div>
                <span style={{ fontSize: 12, color: "#64748B", fontFamily: "var(--font-dm-mono, monospace)" }}>ITALIC ACCENT · DM SERIF DISPLAY ITALIC</span>
                <div style={{ fontFamily: "var(--font-dm-serif, serif)", fontStyle: "italic", fontSize: 36, color: "#BAE6FD", marginTop: 4 }}>
                  &ldquo;We&apos;re the recruiters who get the job done.&rdquo;
                </div>
              </div>
              <div>
                <span style={{ fontSize: 12, color: "#64748B", fontFamily: "var(--font-dm-mono, monospace)" }}>EXECUTIVE KICKER · DM MONO (11.5px / +0.20em)</span>
                <div style={{ fontFamily: "var(--font-dm-mono, monospace)", fontSize: 13, letterSpacing: "0.20em", color: "#7DD3FC", marginTop: 4 }}>
                  STEP 01 · PRECISION INTAKE · PRACTICE &amp; CULTURE MAPPING
                </div>
              </div>
              <div>
                <span style={{ fontSize: 12, color: "#64748B", fontFamily: "var(--font-dm-mono, monospace)" }}>BODY EDITORIAL · INTER SANS (16px / 1.70 line-height)</span>
                <div style={{ fontFamily: "var(--font-inter, sans-serif)", fontSize: 16, color: "#CBD5E1", maxWidth: 680, lineHeight: 1.7, marginTop: 4 }}>
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
