"use client";

import React, { useState } from "react";
import Link from "next/link";
import "./design-concept.css";

const SWATCHES = [
  { name: "Cosmic Void", hex: "#03070E", bg: "#03070E", border: "#1E293B" },
  { name: "Midnight Obsidian", hex: "#050B14", bg: "#050B14", border: "#1E293B" },
  { name: "Cosmic Surface", hex: "#0D1F38", bg: "#0D1F38", border: "#334155" },
  { name: "Celestial Cyan", hex: "#5EA8FF", bg: "#5EA8FF", border: "#93C5FD" },
  { name: "Warm Paper", hex: "#FAF9F5", bg: "#FAF9F5", border: "#E2E8F0" },
  { name: "Tinted Cream", hex: "#F4F0E6", bg: "#F4F0E6", border: "#CBD5E1" },
  { name: "Heritage Navy", hex: "#1B3A6B", bg: "#1B3A6B", border: "#2563EB" },
  { name: "Sapphire Pop", hex: "#2F62B8", bg: "#2F62B8", border: "#60A5FA" },
  { name: "Deep Legal Ink", hex: "#0F172A", bg: "#0F172A", border: "#334155" },
  { name: "Champagne Gold", hex: "#C99738", bg: "#C99738", border: "#FDE047" },
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
      {/* 0. STICKY SPEC CONTROL BAR */}
      <header className="dc-spec-bar">
        <div className="dc-spec-bar-inner">
          <div className="dc-brand-tag">
            <span className="dc-badge-godmode">DESIGN SPEC · V1.0</span>
            <span className="dc-brand-title">Orion Placement Design Architecture</span>
          </div>

          <nav className="dc-nav-pills" aria-label="Section navigation">
            <a href="#celestial-dark" className="dc-nav-pill">
              1. Dark Celestial Section
            </a>
            <a href="#editorial-light" className="dc-nav-pill">
              2. Light Editorial Section
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
          1. THE ORION CELESTIAL DARK SECTION
          Reference Recreation: Glowing Nodes, Constellation Steps
          ======================================================== */}
      <section id="celestial-dark" className="dc-dark-section">
        <div className="dc-dark-wrap">
          {/* Left Column: Anchor & Headline */}
          <div className="dc-dark-left">
            <span className="dc-eyebrow">HOW A SEARCH RUNS</span>

            <h1 className="dc-dark-h1">
              Built for precision,{" "}
              <span className="dc-italic-accent">run for speed.</span>
            </h1>

            <p className="dc-dark-lead">
              Every search follows the same four steps, so nothing is left to
              chance and you only meet people worth your time.
            </p>

            <div>
              <a href="#editorial-light" className="dc-btn-ghost-pill">
                <span>What we do</span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  width="16"
                  height="16"
                  fill="currentColor"
                >
                  <path d="M10.3 3.3a1 1 0 0 1 1.4 0l6 6a1 1 0 0 1 0 1.4l-6 6a1 1 0 1 1-1.4-1.4l4.3-4.3H3a1 1 0 1 1 0-2h11.6l-4.3-4.3a1 1 0 0 1 0-1.4Z" />
                </svg>
              </a>
            </div>

            <div className="dc-dark-trust-micro">
              <span>✦</span>
              <span>23% Contingency · Zero upfront fee · 90-day replacement guarantee</span>
            </div>
          </div>

          {/* Right Column: Illuminated Celestial Timeline */}
          <div className="dc-dark-right">
            <div className="dc-timeline-track" aria-hidden="true" />

            {/* STEP 1 */}
            <div className="dc-timeline-step">
              <div className="dc-timeline-node" aria-hidden="true" />
              <div className="dc-step-header">01 · MINTAKA</div>
              <h2 className="dc-step-title">In-depth consultation</h2>
              <p className="dc-step-desc">
                We take the time to understand your firm&apos;s specific practice
                needs, billing rates, culture, and hiring goals—whether you need an
                experienced lateral partner with a book of business or essential
                support staff.
              </p>
            </div>

            {/* STEP 2 */}
            <div className="dc-timeline-step">
              <div className="dc-timeline-node" aria-hidden="true" />
              <div className="dc-step-header">02 · ALNILAM</div>
              <h2 className="dc-step-title">Proactive talent search</h2>
              <p className="dc-step-desc">
                Through our proprietary database of over 100,000 active legal
                professionals and direct multi-channel outreach, we identify and
                approach high-caliber attorneys, including the passive candidates who
                aren&apos;t actively looking on public job boards.
              </p>
            </div>

            {/* STEP 3 */}
            <div className="dc-timeline-step">
              <div className="dc-timeline-node" aria-hidden="true" />
              <div className="dc-step-header">03 · ALNITAK</div>
              <h2 className="dc-step-title">Streamlined selection</h2>
              <p className="dc-step-desc">
                We manage the entire recruitment journey and present only the most
                qualified candidates with detailed dossiers, verified credentials, and
                compensation alignment so your hiring stays smooth and focused.
              </p>
            </div>

            {/* STEP 4 */}
            <div className="dc-timeline-step">
              <div className="dc-timeline-node" aria-hidden="true" />
              <div className="dc-step-header">04 · RIGEL</div>
              <h2 className="dc-step-title">Hiring assistance to the finish</h2>
              <p className="dc-step-desc">
                From offer structuring and transition guidance to our standard
                90-day replacement guarantee, our team stays actively engaged until
                your new hire is fully integrated and thriving.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. THE LEGAL EDITORIAL LIGHT SECTION
          Warm Paper (#FAF9F5) + Tinted Cream (#F4F0E6)
          ======================================================== */}
      <section id="editorial-light" className="dc-light-section">
        <div className="dc-light-wrap">
          <div className="dc-light-header">
            <span className="dc-light-kicker">VERIFIED CLIENT OUTCOMES</span>
            <h2 className="dc-light-h2">Law firms choose Orion when hiring actually matters.</h2>
            <p className="dc-light-desc">
              Direct feedback from managing partners and administrators at law firms with 50 to 500 attorneys.
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
                  <span className="dc-author-role">Firm Administrator</span>
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
            Architectural tokens configured for both the Celestial Dark and Legal Editorial Light atmospheres. Click any swatch to copy hex code.
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
            <div className="dc-group-h3">Button &amp; CTA Geometries</div>
            <div className="dc-buttons-row">
              <button type="button" className="dc-btn-primary-blue">
                Primary Sapphire Action (8px)
              </button>
              <button type="button" className="dc-btn-outline-white">
                Outline Surface Button
              </button>
              <button type="button" className="dc-btn-gold-action">
                Gold Replacement Guarantee (8px)
              </button>
              <a href="#celestial-dark" className="dc-btn-ghost-pill">
                Celestial Ghost Capsule (Pill) →
              </a>
            </div>
          </div>

          {/* TYPOGRAPHY LADDER */}
          <div className="dc-spec-group">
            <div className="dc-group-h3">Typography Scale &amp; Pairing Hierarchy</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div>
                <span style={{ fontSize: 12, color: "#64748B", fontFamily: "var(--font-dm-mono, monospace)" }}>DISPLAY H1 · DM SERIF DISPLAY (56px)</span>
                <div style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: 44, color: "#FFFFFF", marginTop: 4 }}>
                  Precision Legal Recruiting for AmLaw &amp; Mid-Size Firms.
                </div>
              </div>
              <div>
                <span style={{ fontSize: 12, color: "#64748B", fontFamily: "var(--font-dm-mono, monospace)" }}>ITALIC ACCENT · DM SERIF DISPLAY ITALIC</span>
                <div style={{ fontFamily: "var(--font-dm-serif, serif)", fontStyle: "italic", fontSize: 36, color: "#93C5FD", marginTop: 4 }}>
                  &ldquo;We&apos;re the recruiters who get the job done.&rdquo;
                </div>
              </div>
              <div>
                <span style={{ fontSize: 12, color: "#64748B", fontFamily: "var(--font-dm-mono, monospace)" }}>ASTRONOMICAL KICKER · DM MONO (11.5px / +0.18em)</span>
                <div style={{ fontFamily: "var(--font-dm-mono, monospace)", fontSize: 13, letterSpacing: "0.18em", color: "#5EA8FF", marginTop: 4 }}>
                  01 · MINTAKA · CONSTELLATION RECRUITING METHODOLOGY
                </div>
              </div>
              <div>
                <span style={{ fontSize: 12, color: "#64748B", fontFamily: "var(--font-dm-mono, monospace)" }}>BODY EDITORIAL · INTER SANS (16px / 1.65 line-height)</span>
                <div style={{ fontFamily: "var(--font-inter, sans-serif)", fontSize: 16, color: "#94A3B8", maxWidth: 680, lineHeight: 1.65, marginTop: 4 }}>
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
