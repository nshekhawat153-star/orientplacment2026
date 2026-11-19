"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { TrustBar, TrustLine, RatingBadge } from "@/components/Rating";
import { PeopleSection } from "@/components/PeopleSection";
import { ReviewsSection } from "@/components/ReviewCard";
import { CtaBand } from "@/components/CtaBand";
import { Mark } from "@/components/Mark";
import { Icon } from "@/components/icons";
import { orionLine, trust, people, sendingDomains } from "@/data";

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<"firms" | "cands">("firms");

  const justin = people.find((p) => p.id === "justin") || people[0];
  const jon = people.find((p) => p.id === "jon") || people[1];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.orionplacement.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "About",
          item: "https://www.orionplacement.com/about/",
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Orion Placement",
      url: "https://www.orionplacement.com/",
      description:
        "Contingency legal recruiter for small and mid-size US law firms: attorneys, paralegals and legal assistants.",
      email: "justin@orionplacement.com",
      employee: [
        {
          "@type": "Person",
          name: "Justin",
          email: "justin@orionplacement.com",
        },
        {
          "@type": "Person",
          name: "Jon",
          email: "jon@orionplacement.com",
        },
      ],
      knowsAbout: [
        "Legal recruiting",
        "Attorney placement",
        "Paralegal placement",
      ],
      areaServed: { "@type": "Country", name: "United States" },
    },
  ];

  return (
    <div style={{ background: "#FAF9F5", minHeight: "100vh", color: "#08142A" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <style>{`
        .about-steps-4 {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 20px;
        }
        .about-contact-3 {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 24px;
        }
        .about-sec-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 48px;
          align-items: start;
        }
        @media (max-width: 1024px) {
          .about-steps-4 {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          .about-contact-3 {
            grid-template-columns: 1fr;
          }
          .about-sec-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 640px) {
          .about-steps-4 {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* 1. LUXURY DARK HERO (CENTERED, NO CARDS, NO BREADCRUMBS) */}
      <section
        className="emp-luxury-hero-sec about-hero-sec"
        style={{
          position: "relative",
          background: "#08142A",
          color: "#FFFFFF",
          padding: "124px 0 76px",
          overflow: "hidden",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        <div className="hero-video-wrap" aria-hidden="true">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="hero-video-el"
          >
            <source src="/videos/hero-water-splash.mp4" type="video/mp4" />
            <source src="/media/splash.mp4" type="video/mp4" />
          </video>
          <div className="hero-video-gradient" />
          <div className="hero-video-radial-aura" />
        </div>

        <div style={{ maxWidth: "960px", margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 3, textAlign: "center" }}>
          {/* Eyebrow Capsule */}
          <div style={{ marginBottom: "18px" }}>
            <div
              className="hero-eyebrow-capsule"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(29, 78, 216, 0.15)",
                border: "1px solid rgba(96, 165, 250, 0.3)",
                borderRadius: "100px",
                padding: "7px 18px",
                fontFamily: "var(--mono)",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#93C5FD",
                marginBottom: "24px",
              }}
            >
              <span className="hero-eyebrow-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#60A5FA" }} />
              <span>BOUTIQUE LEGAL SEARCH<span className="eyebrow-sep"> · </span><br className="eyebrow-break" />DIRECT ACCOUNTABILITY</span>
            </div>
          </div>

          {/* Centered Display Heading - Prominent Executive Scale */}
          <h1
            className="about-hero-h1"
            style={{
              fontSize: "clamp(40px, 5.2vw, 64px)",
              fontFamily: "var(--display)",
              fontWeight: 500,
              lineHeight: 1.10,
              color: "#FFFFFF",
              letterSpacing: "-0.025em",
              margin: "0 auto 22px",
              maxWidth: "920px",
              textAlign: "center",
              textWrap: "balance",
              textShadow: "0 2px 16px rgba(0, 0, 0, 0.45)",
            }}
          >
            A small, dedicated legal recruiting team <br />
            <span className="serif-accent" style={{ color: "#60A5FA", fontStyle: "italic" }}>you can directly reach.</span>
          </h1>

          <p
            style={{
              fontSize: "clamp(18px, 1.8vw, 21px)",
              lineHeight: 1.65,
              color: "rgba(255, 255, 255, 0.88)",
              maxWidth: "760px",
              margin: "0 auto 34px",
              textShadow: "0 1px 8px rgba(0, 0, 0, 0.4)",
            }}
          >
            {orionLine}
          </p>

          <div className="about-hero-actions hero-actions-group" style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "14px", marginBottom: "34px" }}>
            <a
              href={trust.calendly}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "#1D4ED8",
                color: "#FFFFFF",
                padding: "15px 32px",
                borderRadius: "7px",
                fontWeight: 600,
                fontSize: "16px",
                textDecoration: "none",
                boxShadow: "0 8px 20px rgba(29, 78, 216, 0.35)",
                transition: "all 0.2s ease",
              }}
            >
              Book 15 Minutes with Justin →
            </a>
            <Link
              href="/jobs"
              style={{
                background: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                color: "#FFFFFF",
                padding: "15px 28px",
                borderRadius: "7px",
                fontWeight: 600,
                fontSize: "16px",
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
            >
              Explore Active Openings →
            </Link>
            <a
              href="#people"
              style={{
                background: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                color: "#FFFFFF",
                padding: "13px 24px",
                borderRadius: "7px",
                fontWeight: 600,
                fontSize: "0.95rem",
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
            >
              Meet the Partners ↓
            </a>
          </div>

          {/* Micro Reassurances */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap", gap: "16px 24px", color: "rgba(255, 255, 255, 0.75)", fontSize: "0.85rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ color: "#60A5FA" }}>✓</span> Direct founder representation
            </div>
            <span>•</span>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ color: "#60A5FA" }}>✓</span> Zero upfront retainer fees
            </div>
            <span>•</span>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ color: "#60A5FA" }}>✓</span> 90-day replacement warranty
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trust Metrics Strip */}
      <section style={{ background: "#FFFFFF", borderBottom: "1px solid #E2E8F0", padding: "32px 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <TrustBar />
        </div>
      </section>

      {/* 3. The Founders: People Section */}
      <section style={{ maxWidth: "1200px", margin: "88px auto 0", padding: "0 24px" }} id="people">
        <div style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto 48px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(29, 78, 216, 0.08)",
              border: "1px solid rgba(29, 78, 216, 0.2)",
              borderRadius: "100px",
              padding: "5px 14px",
              fontFamily: "var(--mono)",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#1D4ED8",
              marginBottom: "12px",
            }}
          >
            DIRECT FOUNDER ACCOUNTABILITY
          </div>
          <h2 style={{ fontSize: "clamp(26px, 3.4vw, 38px)", fontWeight: 500, color: "#08142A", margin: "0 0 14px", fontFamily: "var(--display)" }}>
            Two Partners Handle <span className="serif-accent" style={{ color: "#1D4ED8", fontStyle: "italic" }}>Every Single Search</span>
          </h2>
          <p style={{ fontSize: "1.05rem", color: "#64748B", lineHeight: 1.6, margin: 0 }}>
            Zero anonymous call centers. No junior screeners. The legal recruiter who reaches out to you is the decision-maker who represents your search end-to-end.
          </p>
        </div>

        <PeopleSection />
      </section>

      {/* 4. Placement Protocol / Workflow */}
      <section style={{ background: "#FFFFFF", borderTop: "1px solid #E2E8F0", borderBottom: "1px solid #E2E8F0", padding: "88px 0", marginTop: "88px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", maxWidth: "740px", margin: "0 auto 48px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(29, 78, 216, 0.08)",
                border: "1px solid rgba(29, 78, 216, 0.2)",
                borderRadius: "100px",
                padding: "5px 14px",
                fontFamily: "var(--mono)",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#1D4ED8",
                marginBottom: "12px",
              }}
            >
              RIGOROUS PLACEMENT PROTOCOL
            </div>
            <h2 style={{ fontSize: "clamp(26px, 3.4vw, 38px)", fontWeight: 500, color: "#08142A", margin: "0 0 14px", fontFamily: "var(--display)" }}>
              Both sides must explicitly say <span className="serif-accent" style={{ color: "#1D4ED8", fontStyle: "italic" }}>&quot;yes&quot;</span> before identities are disclosed
            </h2>
            <p style={{ fontSize: "1.02rem", color: "#64748B", margin: 0 }}>
              Firms pay strictly upon successful hire. Candidates never incur any fees whatsoever.
            </p>
          </div>

          <div className="about-steps-4">
            {[
              {
                step: "01",
                audience: "For Law Firms",
                title: "Justin Takes the Mandate",
                desc: "Practice focus, required billing years, compensation band, and firm culture mapped in a direct 15-minute partner call.",
              },
              {
                step: "02",
                audience: "For Candidates",
                title: "Jon Confidentially Screens",
                desc: "Every candidate undergoes substantive background checks, verified state bar standing, and career trajectory alignment.",
              },
              {
                step: "03",
                audience: "Mutual Consent",
                title: "Mutual Opt-In Protocol",
                desc: "Neither firm nor candidate identity is ever revealed without mutual, affirmative agreement to conduct an interview.",
              },
              {
                step: "04",
                audience: "Start Date Guarantee",
                title: "Single 23% Contingency Fee",
                desc: "Invoiced 15 days following candidate start date, fully protected by Orion's 90-day replacement warranty.",
              },
            ].map((p, idx) => (
              <div
                key={idx}
                style={{
                  background: "#FAF9F5",
                  border: "1.5px solid #EAE7DC",
                  borderRadius: "14px",
                  padding: "28px 22px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 4px 16px rgba(8, 20, 42, 0.03)",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                    <span style={{ fontFamily: "monospace", fontSize: "1.2rem", fontWeight: 800, color: "#1D4ED8" }}>{p.step}</span>
                    <span style={{ fontSize: "0.75rem", background: "#EFF6FF", color: "#1D4ED8", fontWeight: 700, padding: "3px 9px", borderRadius: "100px" }}>
                      {p.audience}
                    </span>
                  </div>
                  <h3 style={{ fontSize: "1.15rem", fontWeight: 500, fontFamily: "var(--display)", color: "#08142A", margin: "0 0 10px", lineHeight: 1.3 }}>{p.title}</h3>
                  <p style={{ fontSize: "0.9rem", color: "#475569", lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
                </div>
                <div style={{ marginTop: "20px", paddingTop: "14px", borderTop: "1px solid #EAE7DC", fontSize: "0.82rem", color: "#1D4ED8", fontWeight: 600 }}>
                  ✓ Standard Protocol Step
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Reviews Wall with Tabs */}
      <section style={{ maxWidth: "1200px", margin: "88px auto 0", padding: "0 24px" }} id="reviews">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "32px", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(29, 78, 216, 0.08)",
                border: "1px solid rgba(29, 78, 216, 0.2)",
                borderRadius: "100px",
                padding: "5px 14px",
                fontFamily: "var(--mono)",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#1D4ED8",
                marginBottom: "10px",
              }}
            >
              PUBLIC CLIENT TESTIMONIALS
            </div>
            <h2 style={{ fontSize: "clamp(26px, 3.4vw, 38px)", fontWeight: 500, color: "#08142A", margin: 0, fontFamily: "var(--display)" }}>
              What Law Firms &amp; Candidates <span className="serif-accent" style={{ color: "#1D4ED8", fontStyle: "italic" }}>Say</span>
            </h2>
            <p style={{ margin: "6px 0 0", color: "#64748B", fontSize: "0.95rem" }}>
              Public Google reviews verified by real attorneys and hiring partners.
            </p>
          </div>
          <RatingBadge link={true} />
        </div>

        {/* Reviews Navigation Tabs */}
        <div style={{ display: "inline-flex", background: "#E2E8F0", padding: "4px", borderRadius: "8px", marginBottom: "28px" }}>
          <button
            type="button"
            onClick={() => setActiveTab("firms")}
            style={{
              padding: "9px 22px",
              borderRadius: "7px",
              fontWeight: activeTab === "firms" ? 700 : 500,
              fontSize: "0.9rem",
              border: "none",
              cursor: "pointer",
              background: activeTab === "firms" ? "#1D4ED8" : "transparent",
              color: activeTab === "firms" ? "#FFFFFF" : "#475569",
              transition: "all 0.15s ease",
            }}
          >
            Law Firm Partners
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("cands")}
            style={{
              padding: "9px 22px",
              borderRadius: "7px",
              fontWeight: activeTab === "cands" ? 700 : 500,
              fontSize: "0.9rem",
              border: "none",
              cursor: "pointer",
              background: activeTab === "cands" ? "#1D4ED8" : "transparent",
              color: activeTab === "cands" ? "#FFFFFF" : "#475569",
              transition: "all 0.15s ease",
            }}
          >
            Placed Candidates
          </button>
        </div>

        {activeTab === "firms" ? (
          <ReviewsSection kind="employer" limit={3} />
        ) : (
          <ReviewsSection kind="candidate" limit={3} />
        )}
      </section>

      {/* 6. Security, Domain Verification & Anti-Fraud */}
      <section style={{ background: "#08142A", color: "#FFFFFF", padding: "88px 0", marginTop: "88px", borderTop: "1px solid rgba(255, 255, 255, 0.08)", borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }} id="email-check">
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <div className="about-sec-grid">
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "rgba(29, 78, 216, 0.2)",
                  border: "1px solid rgba(96, 165, 250, 0.3)",
                  borderRadius: "100px",
                  padding: "5px 14px",
                  fontFamily: "var(--mono)",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#93C5FD",
                  marginBottom: "16px",
                }}
              >
                SECURITY &amp; ANTI-SPOOFING VERIFICATION
              </div>
              <h2 style={{ fontSize: "clamp(26px, 3.4vw, 38px)", fontWeight: 500, margin: "0 0 16px", fontFamily: "var(--display)" }}>
                Is this inbound email <span className="serif-accent" style={{ color: "#60A5FA", fontStyle: "italic" }}>truly from Orion?</span>
              </h2>
              <p style={{ color: "rgba(255, 255, 255, 0.82)", fontSize: "1.02rem", lineHeight: 1.6, margin: "0 0 24px" }}>
                Legitimate Orion communications originate exclusively from our verified, SPF/DKIM authenticated domain servers. If you receive an unsolicited inquiry from any other domain, forward it directly to Justin for immediate verification.
              </p>

              <div style={{ background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "12px", padding: "20px 24px", marginBottom: "28px" }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: "11px", fontWeight: 700, color: "#60A5FA", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "12px" }}>
                  OFFICIAL SENDING DOMAINS
                </span>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {sendingDomains.map((d, i) => (
                    <div key={d} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", background: "rgba(0, 0, 0, 0.25)", borderRadius: "8px" }}>
                      <span style={{ fontFamily: "monospace", color: "#93C5FD", fontWeight: 700, fontSize: "0.95rem" }}>@{d}</span>
                      <span style={{ fontSize: "0.82rem", color: "rgba(255, 255, 255, 0.65)" }}>{i === 0 ? "Primary Executive Server" : "Secondary Talent Dispatch"}</span>
                    </div>
                  ))}
                </div>
              </div>

              <h4 style={{ fontSize: "1.05rem", fontWeight: 600, color: "#FFFFFF", margin: "0 0 14px" }}>
                What an authentic Orion communication never does:
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  "Never demands upfront retainer fees or wire transfers from law firms",
                  "Never charges candidates any application, screening, or placement fee",
                  "Never reveals candidate identity prior to explicit, documented consent",
                  "Never sends mail from public webmail domains (@gmail.com, @yahoo.com)",
                ].map((rule, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
                    <span style={{ color: "#EF4444", fontWeight: 700 }}>✕</span>
                    <span style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "0.92rem" }}>{rule}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick 3-Step Verification Protocol */}
            <div style={{ background: "#FFFFFF", borderRadius: "16px", padding: "36px 32px", color: "#08142A", boxShadow: "0 20px 50px rgba(0, 0, 0, 0.35)" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  background: "rgba(29, 78, 216, 0.08)",
                  border: "1px solid rgba(29, 78, 216, 0.2)",
                  borderRadius: "100px",
                  padding: "4px 10px",
                  fontFamily: "var(--mono)",
                  fontSize: "10.5px",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "#1D4ED8",
                  marginBottom: "12px",
                }}
              >
                INSTANT INTEGRITY CHECK
              </div>
              <h3 style={{ fontSize: "1.35rem", fontWeight: 500, margin: "0 0 20px", color: "#08142A", fontFamily: "var(--display)" }}>
                Verify Authenticity in 60 Seconds
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {[
                  {
                    step: "01",
                    title: "Examine Sender Domain",
                    desc: "Ensure the string following the '@' matches orionplacement.com exactly.",
                  },
                  {
                    step: "02",
                    title: "Inspect Signature Credentials",
                    desc: "Authentic dispatches will specify Justin Missirlian or Jon Missirlian with direct phone access.",
                  },
                  {
                    step: "03",
                    title: "Forward Directly for Confirmation",
                    desc: `Uncertain? Forward the email directly to ${justin.email} for a confirmation reply within 2 hours.`,
                  },
                ].map((item, idx) => (
                  <div key={idx} style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#EFF6FF", color: "#1D4ED8", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "0.85rem", fontFamily: "monospace" }}>
                      {item.step}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "#08142A" }}>{item.title}</div>
                      <div style={{ fontSize: "0.85rem", color: "#64748B", marginTop: "2px", lineHeight: 1.5 }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Direct Contact Matrix */}
      <section style={{ maxWidth: "1200px", margin: "88px auto 96px", padding: "0 24px" }} id="contact">
        <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 48px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(29, 78, 216, 0.08)",
              border: "1px solid rgba(29, 78, 216, 0.2)",
              borderRadius: "100px",
              padding: "5px 14px",
              fontFamily: "var(--mono)",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#1D4ED8",
              marginBottom: "12px",
            }}
          >
            DIRECT CHANNELS
          </div>
          <h2 style={{ fontSize: "clamp(26px, 3.4vw, 38px)", fontWeight: 500, color: "#08142A", margin: "0 0 12px", fontFamily: "var(--display)" }}>
            Direct Access to <span className="serif-accent" style={{ color: "#1D4ED8", fontStyle: "italic" }}>Justin &amp; Jon</span>
          </h2>
          <p style={{ fontSize: "1.02rem", color: "#64748B", margin: 0 }}>
            Confidential inquiries answered within 1 business hour. Headquartered in {trust.place}.
          </p>
        </div>

        <div className="about-contact-3">
          {/* Justin Contact Card */}
          <div
            style={{
              background: "#FFFFFF",
              border: "1.5px solid #E2E8F0",
              borderRadius: "14px",
              padding: "32px 28px",
              boxShadow: "0 4px 20px rgba(8, 20, 42, 0.03)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "18px" }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", overflow: "hidden", position: "relative", border: "2px solid #DBEAFE" }}>
                  <Image src={justin.photo.startsWith("/") ? justin.photo : `/${justin.photo}`} alt={justin.name} fill style={{ objectFit: "cover" }} />
                </div>
                <div>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 500, fontFamily: "var(--display)", color: "#08142A", margin: 0 }}>{justin.name}</h3>
                  <span style={{ fontSize: "0.82rem", color: "#1D4ED8", fontWeight: 600 }}>{justin.title}</span>
                </div>
              </div>
              <p style={{ fontSize: "0.9rem", color: "#64748B", lineHeight: 1.55, margin: "0 0 20px" }}>
                For law firm partners, hiring chairs, and practice heads opening attorney or paralegal mandates.
              </p>
            </div>
            <div style={{ borderTop: "1px solid #F1F5F9", paddingTop: "16px" }}>
              <div style={{ fontSize: "0.85rem", color: "#64748B", marginBottom: "10px" }}>
                Direct: <span style={{ fontFamily: "monospace", color: "#1D4ED8", fontWeight: 700 }}>{justin.email}</span>
              </div>
              <a
                href={justin.calendly}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  background: "#1D4ED8",
                  color: "#FFFFFF",
                  padding: "10px 18px",
                  borderRadius: 7,
                  fontWeight: 600,
                  fontSize: "0.88rem",
                  textDecoration: "none",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                Schedule 15 Min Partner Call →
              </a>
            </div>
          </div>

          {/* Jon Contact Card */}
          <div
            style={{
              background: "#FFFFFF",
              border: "1.5px solid #E2E8F0",
              borderRadius: "14px",
              padding: "32px 28px",
              boxShadow: "0 4px 20px rgba(8, 20, 42, 0.03)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "18px" }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", overflow: "hidden", position: "relative", border: "2px solid #DBEAFE" }}>
                  <Image src={jon.photo.startsWith("/") ? jon.photo : `/${jon.photo}`} alt={jon.name} fill style={{ objectFit: "cover" }} />
                </div>
                <div>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 500, fontFamily: "var(--display)", color: "#08142A", margin: 0 }}>{jon.name}</h3>
                  <span style={{ fontSize: "0.82rem", color: "#1D4ED8", fontWeight: 600 }}>{jon.title}</span>
                </div>
              </div>
              <p style={{ fontSize: "0.9rem", color: "#64748B", lineHeight: 1.55, margin: "0 0 20px" }}>
                For attorneys, paralegals, and legal assistants seeking confidential career transitions.
              </p>
            </div>
            <div style={{ borderTop: "1px solid #F1F5F9", paddingTop: "16px" }}>
              <div style={{ fontSize: "0.85rem", color: "#64748B", marginBottom: "10px" }}>
                Direct: <span style={{ fontFamily: "monospace", color: "#1D4ED8", fontWeight: 700 }}>{jon.email}</span>
              </div>
              <Link
                href="/candidates"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  background: "#08142A",
                  color: "#FFFFFF",
                  padding: "10px 18px",
                  borderRadius: 7,
                  fontWeight: 600,
                  fontSize: "0.88rem",
                  textDecoration: "none",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                Confidential Candidate Portal →
              </Link>
            </div>
          </div>

          {/* Direct Calendly Card */}
          <div
            style={{
              background: "#08142A",
              color: "#FFFFFF",
              border: "1.5px solid rgba(255, 255, 255, 0.12)",
              borderRadius: "14px",
              padding: "32px 28px",
              boxShadow: "0 10px 30px rgba(8, 20, 42, 0.15)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  background: "rgba(29, 78, 216, 0.2)",
                  border: "1px solid rgba(96, 165, 250, 0.3)",
                  borderRadius: "100px",
                  padding: "4px 10px",
                  fontFamily: "var(--mono)",
                  fontSize: "10.5px",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "#93C5FD",
                  marginBottom: "12px",
                }}
              >
                DIRECT APPOINTMENT
              </div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 500, margin: "0 0 12px", color: "#FFFFFF", fontFamily: "var(--display)" }}>
                Book 15 Minutes with Justin
              </h3>
              <p style={{ fontSize: "0.9rem", color: "rgba(255, 255, 255, 0.8)", lineHeight: 1.55, margin: 0 }}>
                Discuss an open law firm seat, evaluate current salary benchmarks, or verify candidate availability.
              </p>
            </div>
            <div style={{ marginTop: "24px" }}>
              <a
                href={trust.calendly}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "center",
                  background: "#1D4ED8",
                  color: "#FFFFFF",
                  padding: "11px 18px",
                  borderRadius: 7,
                  fontWeight: 600,
                  fontSize: "0.92rem",
                  textDecoration: "none",
                  boxShadow: "0 4px 14px rgba(29, 78, 216, 0.4)",
                }}
              >
                Select Appointment Slot →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Luxury CTA Band */}
      <CtaBand
        title="Consult Directly with Justin Missirlian"
        text="A 15-minute briefing regarding an open lateral role or confidential transition. Zero fees unless a match is hired."
        button="Book 15 Minutes with Justin"
        href={trust.calendly}
        cal={false}
      />
    </div>
  );
}
