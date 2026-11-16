"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Breadcrumb } from "@/components/Breadcrumb";
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

      {/* 1. Luxury Dark Hero with Splash Video */}
      <section
        style={{
          position: "relative",
          background: "radial-gradient(ellipse 90% 80% at 50% -20%, rgba(29, 78, 216, 0.28) 0%, rgba(8, 20, 42, 0.98) 75%, #08142A 100%)",
          color: "#FFFFFF",
          padding: "124px 0 76px",
          overflow: "hidden",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)"
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.16,
            pointerEvents: "none",
            zIndex: 0
          }}
        >
          <source src="/media/splash.mp4" type="video/mp4" />
          <source src="/videos/hero-water-splash.mp4" type="video/mp4" />
        </video>

        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
          <div style={{ marginBottom: "20px" }}>
            <Breadcrumb
              crumbs={[
                { label: "Home", href: "/" },
                { label: "About Orion", current: true }
              ]}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "48px", alignItems: "center" }} className="about-hero-grid">
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "rgba(29, 78, 216, 0.15)",
                  border: "1px solid rgba(96, 165, 250, 0.3)",
                  borderRadius: "100px",
                  padding: "6px 14px",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "#93C5FD",
                  marginBottom: "18px"
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#60A5FA" }} />
                Boutique Legal Search Practice · Direct Accountability
              </div>

              <h1
                style={{
                  fontSize: "clamp(2.4rem, 4.4vw, 3.6rem)",
                  fontFamily: "var(--font-serif, 'Playfair Display', Georgia, serif)",
                  fontWeight: 700,
                  lineHeight: 1.15,
                  color: "#FFFFFF",
                  letterSpacing: "-0.02em",
                  margin: "0 0 18px"
                }}
              >
                A small, dedicated legal recruiting team <br />
                <span style={{ color: "#93C5FD", fontStyle: "italic" }}>you can directly reach.</span>
              </h1>

              <p
                style={{
                  fontSize: "1.12rem",
                  lineHeight: 1.6,
                  color: "rgba(255, 255, 255, 0.82)",
                  maxWidth: "580px",
                  margin: "0 0 28px"
                }}
              >
                {orionLine}
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", alignItems: "center", marginBottom: "32px" }}>
                <a
                  href={trust.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: "#1D4ED8",
                    color: "#FFFFFF",
                    padding: "13px 26px",
                    borderRadius: "7px",
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    textDecoration: "none",
                    boxShadow: "0 4px 14px rgba(29, 78, 216, 0.4)",
                    transition: "all 0.2s ease"
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
                    padding: "13px 22px",
                    borderRadius: "7px",
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    textDecoration: "none",
                    transition: "all 0.2s ease"
                  }}
                >
                  Explore Active Openings
                </Link>
              </div>

              <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.12)", paddingTop: "18px" }}>
                <TrustLine />
              </div>
            </div>

            {/* Leadership Dossier Cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                { person: justin, focus: "Direct Partner & Law Firm Practice Chair Mandates" },
                { person: jon, focus: "Confidential Senior Associate & Candidate Vetting" }
              ].map(({ person, focus }) => (
                <div
                  key={person.id}
                  style={{
                    background: "rgba(15, 23, 42, 0.75)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    borderRadius: "14px",
                    padding: "20px 24px",
                    display: "flex",
                    gap: "18px",
                    alignItems: "center",
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)"
                  }}
                >
                  <div style={{ position: "relative", width: 64, height: 64, borderRadius: "50%", overflow: "hidden", border: "2px solid #60A5FA", flexShrink: 0 }}>
                    <Image
                      src={person.photo.startsWith("/") ? person.photo : `/${person.photo}`}
                      alt={person.name}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                      <span style={{ fontSize: "1.1rem", fontWeight: 700, color: "#FFFFFF" }}>{person.name}</span>
                      <span style={{ fontSize: "0.82rem", color: "#93C5FD", fontWeight: 500 }}>{person.title}</span>
                    </div>
                    <p style={{ margin: "4px 0 8px", fontSize: "0.82rem", color: "rgba(255, 255, 255, 0.7)", lineHeight: 1.4 }}>
                      {focus}
                    </p>
                    <div style={{ fontSize: "0.82rem", color: "#60A5FA", fontFamily: "monospace" }}>
                      Direct: {person.email}
                    </div>
                  </div>
                </div>
              ))}
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
      <section style={{ maxWidth: "1200px", margin: "80px auto 0", padding: "0 24px" }} id="people">
        <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 48px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(29, 78, 216, 0.08)",
              border: "1px solid rgba(29, 78, 216, 0.2)",
              borderRadius: "100px",
              padding: "4px 12px",
              fontSize: "0.78rem",
              fontWeight: 600,
              color: "#1D4ED8",
              marginBottom: "12px"
            }}
          >
            Direct Representation
          </div>
          <h2 style={{ fontSize: "2.3rem", fontWeight: 700, color: "#08142A", margin: "0 0 12px", fontFamily: "var(--font-serif, Georgia, serif)" }}>
            Two Partners Handle Every Single Search
          </h2>
          <p style={{ fontSize: "1.05rem", color: "#64748B", lineHeight: 1.6, margin: 0 }}>
            Zero anonymous call centers. No junior screeners. The legal recruiter who reaches out to you is the decision-maker who represents your search end-to-end.
          </p>
        </div>

        <PeopleSection />
      </section>

      {/* 4. Placement Protocol / Workflow */}
      <section style={{ background: "#FFFFFF", borderTop: "1px solid #E2E8F0", borderBottom: "1px solid #E2E8F0", padding: "80px 0", marginTop: "80px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 48px" }}>
            <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#1D4ED8", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Rigorous Placement Protocol
            </span>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 700, color: "#08142A", margin: "8px 0 12px", fontFamily: "var(--font-serif, Georgia, serif)" }}>
              Both Sides Must Explicitly Say &quot;Yes&quot; Before Identities Are Disclosed
            </h2>
            <p style={{ fontSize: "1.02rem", color: "#64748B", margin: 0 }}>
              Firms pay strictly upon successful hire. Candidates never incur any fees whatsoever.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px" }}>
            {[
              {
                step: "01",
                audience: "For Law Firms",
                title: "Justin Takes the Mandate",
                desc: "Practice focus, required billing years, compensation band, and firm culture mapped in a direct 15-minute partner call."
              },
              {
                step: "02",
                audience: "For Candidates",
                title: "Jon Confidentially Screens",
                desc: "Every candidate undergoes substantive background checks, verified state bar standing, and career trajectory alignment."
              },
              {
                step: "03",
                audience: "Mutual Consent",
                title: "Mutual Mutual Opt-In",
                desc: "Neither firm nor candidate identity is ever revealed without mutual, affirmative agreement to conduct an interview."
              },
              {
                step: "04",
                audience: "Start Date Guarantee",
                title: "Single 23% Contingency Fee",
                desc: "Invoiced 15 days following candidate start date, fully protected by Orion's 90-day replacement warranty."
              }
            ].map((p, idx) => (
              <div
                key={idx}
                style={{
                  background: "#FAF9F5",
                  border: "1px solid #E2E8F0",
                  borderRadius: "12px",
                  padding: "28px 24px",
                  position: "relative"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <span style={{ fontFamily: "monospace", fontSize: "1.2rem", fontWeight: 800, color: "#1D4ED8" }}>{p.step}</span>
                  <span style={{ fontSize: "0.75rem", background: "#EFF6FF", color: "#1D4ED8", fontWeight: 700, padding: "2px 8px", borderRadius: "100px" }}>
                    {p.audience}
                  </span>
                </div>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#08142A", margin: "0 0 10px" }}>{p.title}</h3>
                <p style={{ fontSize: "0.9rem", color: "#475569", lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Reviews Wall with Tabs */}
      <section style={{ maxWidth: "1200px", margin: "80px auto 0", padding: "0 24px" }} id="reviews">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "32px" }}>
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(29, 78, 216, 0.08)",
                border: "1px solid rgba(29, 78, 216, 0.2)",
                borderRadius: "100px",
                padding: "4px 12px",
                fontSize: "0.78rem",
                fontWeight: 600,
                color: "#1D4ED8",
                marginBottom: "10px"
              }}
            >
              Public Client Testimonials
            </div>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 700, color: "#08142A", margin: 0, fontFamily: "var(--font-serif, Georgia, serif)" }}>
              What Law Firms & Candidates Say
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
              padding: "8px 20px",
              borderRadius: "6px",
              fontWeight: activeTab === "firms" ? 700 : 500,
              fontSize: "0.9rem",
              border: "none",
              cursor: "pointer",
              background: activeTab === "firms" ? "#08142A" : "transparent",
              color: activeTab === "firms" ? "#FFFFFF" : "#475569",
              transition: "all 0.15s ease"
            }}
          >
            Law Firm Partners
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("cands")}
            style={{
              padding: "8px 20px",
              borderRadius: "6px",
              fontWeight: activeTab === "cands" ? 700 : 500,
              fontSize: "0.9rem",
              border: "none",
              cursor: "pointer",
              background: activeTab === "cands" ? "#08142A" : "transparent",
              color: activeTab === "cands" ? "#FFFFFF" : "#475569",
              transition: "all 0.15s ease"
            }}
          >
            Placed Candidates
          </button>
        </div>

        {activeTab === "firms" ? (
          <ReviewsSection kind="employer" limit={3} />
        ) : (
          <ReviewsSection kind="candidate" limit={2} />
        )}
      </section>

      {/* 6. Security, Domain Verification & Anti-Fraud */}
      <section style={{ background: "#08142A", color: "#FFFFFF", padding: "80px 0", marginTop: "80px" }} id="email-check">
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "48px", alignItems: "start" }} className="about-sec-grid">
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "rgba(29, 78, 216, 0.2)",
                  border: "1px solid rgba(96, 165, 250, 0.3)",
                  borderRadius: "100px",
                  padding: "4px 12px",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  color: "#93C5FD",
                  marginBottom: "16px"
                }}
              >
                Security & Anti-Spoofing Verification
              </div>
              <h2 style={{ fontSize: "2.2rem", fontWeight: 700, margin: "0 0 16px", fontFamily: "var(--font-serif, Georgia, serif)" }}>
                Is This Inbound Email Truly From Orion?
              </h2>
              <p style={{ color: "rgba(255, 255, 255, 0.82)", fontSize: "1.02rem", lineHeight: 1.6, margin: "0 0 24px" }}>
                Legitimate Orion communications originate exclusively from our verified, SPF/DKIM authenticated domain servers. If you receive an unsolicited inquiry from any other domain, forward it directly to Justin for immediate verification.
              </p>

              <div style={{ background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "10px", padding: "20px", marginBottom: "28px" }}>
                <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#60A5FA", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: "10px" }}>
                  Official Sending Domains
                </span>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {sendingDomains.map((d, i) => (
                    <div key={d} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", background: "rgba(0, 0, 0, 0.2)", borderRadius: "6px" }}>
                      <span style={{ fontFamily: "monospace", color: "#93C5FD", fontWeight: 700 }}>@{d}</span>
                      <span style={{ fontSize: "0.78rem", color: "rgba(255, 255, 255, 0.6)" }}>{i === 0 ? "Primary Executive Server" : "Secondary Talent Dispatch"}</span>
                    </div>
                  ))}
                </div>
              </div>

              <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#FFFFFF", margin: "0 0 12px" }}>
                What an Authentic Orion Communication Never Does:
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  "Never demands upfront retainer fees or wire transfers from law firms",
                  "Never charges candidates any application, screening, or placement fee",
                  "Never reveals candidate identity prior to explicit, documented consent",
                  "Never sends mail from public webmail domains (@gmail.com, @yahoo.com)"
                ].map((rule, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
                    <span style={{ color: "#EF4444", fontWeight: 700 }}>✕</span>
                    <span style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "0.92rem" }}>{rule}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick 3-Step Verification Protocol */}
            <div style={{ background: "#FFFFFF", borderRadius: "14px", padding: "36px", color: "#08142A", boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)" }}>
              <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#1D4ED8", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Instant Integrity Check
              </span>
              <h3 style={{ fontSize: "1.4rem", fontWeight: 700, margin: "6px 0 16px", fontFamily: "var(--font-serif, Georgia, serif)" }}>
                Verify Authenticity in 60 Seconds
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {[
                  {
                    step: "1",
                    title: "Examine Sender Domain",
                    desc: "Ensure the string following the '@' matches orionplacement.com exactly."
                  },
                  {
                    step: "2",
                    title: "Inspect Signature Credentials",
                    desc: "Authentic dispatches will specify Justin Missirlian or Jon Missirlian with direct phone access."
                  },
                  {
                    step: "3",
                    title: "Forward Directly for Confirmation",
                    desc: `Uncertain? Forward the email directly to ${justin.email} for a confirmation reply within 2 hours.`
                  }
                ].map((item, idx) => (
                  <div key={idx} style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#EFF6FF", color: "#1D4ED8", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "0.85rem" }}>
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
      <section style={{ maxWidth: "1200px", margin: "80px auto", padding: "0 24px" }} id="contact">
        <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 48px" }}>
          <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#1D4ED8", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Direct Channels
          </span>
          <h2 style={{ fontSize: "2.2rem", fontWeight: 700, color: "#08142A", margin: "8px 0 12px", fontFamily: "var(--font-serif, Georgia, serif)" }}>
            Direct Access to Justin & Jon
          </h2>
          <p style={{ fontSize: "1.02rem", color: "#64748B", margin: 0 }}>
            Confidential inquiries answered within 1 business hour. Headquartered in {trust.place}.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
          {/* Justin Contact Card */}
          <div
            style={{
              background: "#FFFFFF",
              border: "1px solid #E2E8F0",
              borderRadius: "12px",
              padding: "32px",
              boxShadow: "0 4px 20px rgba(8, 20, 42, 0.04)",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "18px" }}>
              <div style={{ width: 52, height: 52, borderRadius: "50%", overflow: "hidden", position: "relative" }}>
                <Image src={justin.photo.startsWith("/") ? justin.photo : `/${justin.photo}`} alt={justin.name} fill style={{ objectFit: "cover" }} />
              </div>
              <div>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#08142A", margin: 0 }}>{justin.name}</h3>
                <span style={{ fontSize: "0.82rem", color: "#1D4ED8", fontWeight: 600 }}>{justin.title}</span>
              </div>
            </div>
            <p style={{ fontSize: "0.9rem", color: "#64748B", lineHeight: 1.5, margin: "0 0 18px" }}>
              For law firm partners, hiring chairs, and practice heads opening attorney or paralegal mandates.
            </p>
            <div style={{ borderTop: "1px solid #F1F5F9", paddingTop: "14px", marginTop: "auto" }}>
              <div style={{ fontSize: "0.88rem", color: "#08142A", marginBottom: "8px" }}>
                Email: <span style={{ fontFamily: "monospace", color: "#1D4ED8", fontWeight: 700 }}>{justin.email}</span>
              </div>
              <a
                href={justin.calendly}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  color: "#1D4ED8",
                  fontWeight: 600,
                  fontSize: "0.88rem",
                  textDecoration: "none"
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
              border: "1px solid #E2E8F0",
              borderRadius: "12px",
              padding: "32px",
              boxShadow: "0 4px 20px rgba(8, 20, 42, 0.04)",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "18px" }}>
              <div style={{ width: 52, height: 52, borderRadius: "50%", overflow: "hidden", position: "relative" }}>
                <Image src={jon.photo.startsWith("/") ? jon.photo : `/${jon.photo}`} alt={jon.name} fill style={{ objectFit: "cover" }} />
              </div>
              <div>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#08142A", margin: 0 }}>{jon.name}</h3>
                <span style={{ fontSize: "0.82rem", color: "#1D4ED8", fontWeight: 600 }}>{jon.title}</span>
              </div>
            </div>
            <p style={{ fontSize: "0.9rem", color: "#64748B", lineHeight: 1.5, margin: "0 0 18px" }}>
              For attorneys, paralegals, and legal assistants seeking confidential career transitions.
            </p>
            <div style={{ borderTop: "1px solid #F1F5F9", paddingTop: "14px", marginTop: "auto" }}>
              <div style={{ fontSize: "0.88rem", color: "#08142A", marginBottom: "8px" }}>
                Email: <span style={{ fontFamily: "monospace", color: "#1D4ED8", fontWeight: 700 }}>{jon.email}</span>
              </div>
              <Link
                href="/candidates"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  color: "#1D4ED8",
                  fontWeight: 600,
                  fontSize: "0.88rem",
                  textDecoration: "none"
                }}
              >
                Confidential Candidate Protocol →
              </Link>
            </div>
          </div>

          {/* Direct Calendly Card */}
          <div
            style={{
              background: "#08142A",
              color: "#FFFFFF",
              borderRadius: "12px",
              padding: "32px",
              boxShadow: "0 4px 20px rgba(8, 20, 42, 0.1)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}
          >
            <div>
              <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#60A5FA", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Direct Calendar
              </span>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 700, margin: "8px 0 12px" }}>Book 15 Minutes with Justin</h3>
              <p style={{ fontSize: "0.9rem", color: "rgba(255, 255, 255, 0.8)", lineHeight: 1.5, margin: 0 }}>
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
                  padding: "12px 18px",
                  borderRadius: "7px",
                  fontWeight: 600,
                  fontSize: "0.92rem",
                  textDecoration: "none"
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
