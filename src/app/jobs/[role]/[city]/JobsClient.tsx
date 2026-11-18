"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DATA, fmt } from "@/data";
import { Mark } from "@/components/Mark";
import { JobCard } from "@/components/JobCard";
import { SalaryBand } from "@/components/SalaryBand";
import { GateForm } from "@/components/GateForm";

export function JobsClient({
  roleParam,
  cityParam,
}: {
  roleParam: string;
  cityParam: string;
}) {
  const role = DATA.roles.find((r) => r.slug === roleParam);
  const city = DATA.cities.find((c) => c.slug === cityParam);

  const [filter, setFilter] = useState<string>("all");

  if (!role || !city) {
    notFound();
  }

  const bandData = DATA.bands[city.slug]?.[role.slug];
  const allJobs = DATA.jobs
    .filter((j) => j.role === role.slug && j.city === city.slug)
    .sort((a, b) => (a.posted < b.posted ? 1 : -1));

  const lo = allJobs.length ? Math.min(...allJobs.map((j) => j.band[0])) : 0;
  const hi = allJobs.length ? Math.max(...allJobs.map((j) => j.band[1])) : 0;

  const filteredJobs = allJobs.filter((j) => {
    if (filter === "all") return true;
    if (filter === "senior") {
      const match = j.years.match(/(\d+)/g);
      if (match) {
        const nums = match.map(Number);
        return Math.max(...nums) >= 6;
      }
      return false;
    }
    return j.mode === filter;
  });

  const otherRoles = DATA.roles.filter(
    (r) => r.slug !== role.slug && DATA.jobs.filter((j) => j.role === r.slug && j.city === city.slug).length > 0
  );
  const otherCities = DATA.cities
    .filter(
      (c) =>
        c.slug !== city.slug &&
        (DATA.jobs.filter((j) => j.role === role.slug && j.city === c.slug).length > 0 || DATA.bands[c.slug]?.[role.slug])
    )
    .slice(0, 6);

  return (
    <div style={{ background: "#FAF9F5", color: "#08142A" }}>
      {/* 1. LUXURY HERO WITH VIDEO & 2-COLUMN MARKET SNAPSHOT */}
      <section
        className="emp-luxury-hero-sec jobs-hero"
        style={{
          position: "relative",
          background: "#08142A",
          color: "#FFFFFF",
          padding: "124px 0 76px",
          overflow: "hidden",
        }}
      >
        <div className="emp-hero-video-wrap" aria-hidden="true">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="emp-hero-video"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.22,
            }}
          >
            <source src="/media/splash.mp4" type="video/mp4" />
          </video>
          <div
            className="emp-hero-overlay"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(180deg, rgba(8,20,42,0.85) 0%, rgba(8,20,42,0.96) 100%)",
            }}
          />
        </div>

        <div className="wrap" style={{ position: "relative", zIndex: 2, maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 40, alignItems: "center" }}>
            {/* Left Column: Heading & Value */}
            <div>
              <div className="emp-hero-badge-wrap" style={{ marginBottom: 16 }}>
                <div
                  className="badge-capsule"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: 999,
                    padding: "6px 14px",
                    fontFamily: "var(--mono)",
                    fontSize: 11,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#93C5FD",
                  }}
                >
                  <span className="badge-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#60A5FA" }} />
                  <span>CONFIDENTIAL LATERAL SEARCH · {city.name.toUpperCase()}, {city.state.toUpperCase()}</span>
                </div>
              </div>

              <h1
                className="emp-hero-h1"
                style={{
                  fontFamily: "var(--display)",
                  fontSize: "clamp(34px, 4.4vw, 52px)",
                  lineHeight: 1.12,
                  fontWeight: 500,
                  color: "#FFFFFF",
                  margin: "0 0 18px",
                }}
              >
                {role.name} jobs in{" "}
                <span className="serif-accent" style={{ color: "#60A5FA", fontStyle: "italic" }}>
                  {city.name}
                </span>
              </h1>

              <p
                className="emp-hero-lead"
                style={{
                  fontSize: 17,
                  lineHeight: 1.6,
                  color: "#CBD5E1",
                  maxWidth: 580,
                  margin: "0 0 28px",
                }}
              >
                Open roles at boutique and mid-size law firms, with disclosed base compensation on every listing. No law firm ever sees your identity until you provide explicit written authorization.
              </p>

              <div style={{ display: "grid", gap: 10, marginBottom: 30 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "#E2E8F0" }}>
                  <span style={{ color: "#60A5FA", fontWeight: 700 }}>✓</span>
                  <span>Disclosed base compensation &amp; verified bonus structures</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "#E2E8F0" }}>
                  <span style={{ color: "#60A5FA", fontWeight: 700 }}>✓</span>
                  <span>Zero blind submissions: firm named on your introductory call</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "#E2E8F0" }}>
                  <span style={{ color: "#60A5FA", fontWeight: 700 }}>✓</span>
                  <span>Always 100% free and confidential for candidates</span>
                </div>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
                <a
                  className="btn-emp-primary"
                  href="#list"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: "#1D4ED8",
                    color: "#FFFFFF",
                    fontWeight: 600,
                    fontSize: 15,
                    padding: "13px 26px",
                    borderRadius: 7,
                    textDecoration: "none",
                  }}
                >
                  <span>Apply confidentially ({allJobs.length})</span>
                  <span aria-hidden="true">↓</span>
                </a>
                <Link
                  className="btn-emp-ghost"
                  href={`/upload-resume#role=${role.slug}&city=${city.slug}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.18)",
                    color: "#FFFFFF",
                    fontWeight: 600,
                    fontSize: 15,
                    padding: "13px 24px",
                    borderRadius: 7,
                    textDecoration: "none",
                  }}
                >
                  <span>Upload resume to match</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Elevated Jobs Snapshot Card */}
            <div>
              <div
                style={{
                  background: "#FFFFFF",
                  border: "1.5px solid #E2E8F0",
                  borderRadius: 14,
                  padding: "28px 24px",
                  boxShadow: "0 24px 60px -12px rgba(0, 0, 0, 0.55)",
                  color: "#08142A",
                  textAlign: "left",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    borderBottom: "1.5px solid #E2E8F0",
                    paddingBottom: 14,
                    marginBottom: 20,
                  }}
                >
                  <div>
                    <span style={{ fontFamily: "var(--display)", fontSize: 20, color: "#08142A", fontWeight: 600, display: "block" }}>
                      Market Opportunity Index
                    </span>
                    <span style={{ fontSize: 13, color: "#64748B" }}>
                      {city.name} Lateral Market
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 10.5,
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "#1D4ED8",
                      background: "#EFF6FF",
                      padding: "4px 8px",
                      borderRadius: 4,
                      border: "1px solid #DBEAFE",
                    }}
                  >
                    ACTIVE ROLES
                  </span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 20 }}>
                  <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 9, padding: "16px 14px" }}>
                    <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>
                      Open Mandates
                    </div>
                    <div style={{ fontFamily: "var(--display)", fontSize: 32, fontWeight: 600, color: "#08142A" }}>
                      {allJobs.length}
                    </div>
                    <div style={{ fontSize: 12, color: "#64748B", marginTop: 4 }}>
                      Boutique &amp; midsize seats
                    </div>
                  </div>

                  <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 9, padding: "16px 14px" }}>
                    <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>
                      Base Range
                    </div>
                    <div style={{ fontFamily: "var(--display)", fontSize: 24, fontWeight: 600, color: "#1D4ED8", lineHeight: 1.3 }}>
                      {fmt.range([lo, hi])}
                    </div>
                    <div style={{ fontSize: 12, color: "#64748B", marginTop: 4 }}>
                      Disclosed salary spread
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    background: "#FAF9F5",
                    border: "1px solid #EAE7DC",
                    borderRadius: 8,
                    padding: "12px 14px",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <span style={{ color: "#1D4ED8", fontSize: 16 }}>🔒</span>
                  <span style={{ fontSize: 12.5, color: "#475569", lineHeight: 1.45 }}>
                    Law firm names and managing partner backgrounds are disclosed on your first private briefing with Justin, prior to sending credentials.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. JOB CARDS WITH FILTER PILLS */}
      <section className="emp-process-sec" id="list" style={{ background: "#FAF9F5", padding: "88px 0 96px", borderBottom: "1px solid #EAE7DC" }}>
        <div className="wrap" style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
          <div className="sec-head" style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 36px" }}>
            <span
              className="eyebrow"
              style={{
                fontFamily: "var(--mono)",
                fontSize: 12,
                color: "#1D4ED8",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: 8,
              }}
            >
              VERIFIED OPPORTUNITIES
            </span>
            <h2
              style={{
                fontFamily: "var(--display)",
                fontSize: "clamp(28px, 3.6vw, 42px)",
                color: "#08142A",
                margin: "0 0 14px",
                fontWeight: 500,
              }}
            >
              Pick a role and apply <span className="serif-accent" style={{ fontStyle: "italic" }}>confidentially</span>
            </h2>
            <p style={{ color: "#64748B", fontSize: 16, lineHeight: 1.6, margin: 0 }}>
              Every listing shows the firm practice focus, required seniority, work arrangement, and guaranteed base salary range.
            </p>
          </div>

          {/* Filter Pills */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 16,
              marginBottom: 32,
            }}
          >
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              <button
                type="button"
                onClick={() => setFilter("all")}
                style={{
                  padding: "8px 18px",
                  borderRadius: 7,
                  fontSize: 13.5,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  background: filter === "all" ? "#1D4ED8" : "#FFFFFF",
                  color: filter === "all" ? "#FFFFFF" : "#334155",
                  border: `1.5px solid ${filter === "all" ? "#1D4ED8" : "#E2E8F0"}`,
                }}
              >
                All ({allJobs.length})
              </button>
              <button
                type="button"
                onClick={() => setFilter("on-site")}
                style={{
                  padding: "8px 18px",
                  borderRadius: 7,
                  fontSize: 13.5,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  background: filter === "on-site" ? "#1D4ED8" : "#FFFFFF",
                  color: filter === "on-site" ? "#FFFFFF" : "#334155",
                  border: `1.5px solid ${filter === "on-site" ? "#1D4ED8" : "#E2E8F0"}`,
                }}
              >
                On-site
              </button>
              <button
                type="button"
                onClick={() => setFilter("hybrid")}
                style={{
                  padding: "8px 18px",
                  borderRadius: 7,
                  fontSize: 13.5,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  background: filter === "hybrid" ? "#1D4ED8" : "#FFFFFF",
                  color: filter === "hybrid" ? "#FFFFFF" : "#334155",
                  border: `1.5px solid ${filter === "hybrid" ? "#1D4ED8" : "#E2E8F0"}`,
                }}
              >
                Hybrid
              </button>
              <button
                type="button"
                onClick={() => setFilter("senior")}
                style={{
                  padding: "8px 18px",
                  borderRadius: 7,
                  fontSize: 13.5,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  background: filter === "senior" ? "#1D4ED8" : "#FFFFFF",
                  color: filter === "senior" ? "#FFFFFF" : "#334155",
                  border: `1.5px solid ${filter === "senior" ? "#1D4ED8" : "#E2E8F0"}`,
                }}
              >
                Senior 6+ yrs
              </button>
            </div>

            <span style={{ fontSize: 13, color: "#64748B", fontFamily: "var(--mono)" }}>
              Showing {filteredJobs.length} of {allJobs.length} openings
            </span>
          </div>

          {filteredJobs.length > 0 ? (
            <div className="cards" style={{ display: "grid", gap: 20 }}>
              {filteredJobs.map((j) => (
                <JobCard key={j.id} job={j} />
              ))}
            </div>
          ) : (
            <div style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 14, padding: "48px 24px", textAlign: "center" }}>
              <p style={{ fontSize: 16, color: "#64748B", margin: "0 0 16px" }}>
                <b>No active {role.name} role matches this filter today in {city.name}.</b>
              </p>
              <a
                href="#alerts-block"
                style={{
                  background: "#1D4ED8",
                  color: "#FFFFFF",
                  padding: "10px 22px",
                  borderRadius: 7,
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: "none",
                  display: "inline-block",
                }}
              >
                Get email alerts when one opens →
              </a>
            </div>
          )}

          <div
            style={{
              marginTop: 40,
              background: "#FFFFFF",
              border: "1.5px solid #E2E8F0",
              borderRadius: 12,
              padding: "20px 24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <div>
              <span style={{ fontWeight: 600, color: "#08142A", fontSize: 15 }}>
                Not sure which role is the best fit?
              </span>
              <p style={{ color: "#64748B", fontSize: 13.5, margin: "2px 0 0" }}>
                Our parser compares your credentials against every active opening and scores your compatibility.
              </p>
            </div>
            <Link
              href={`/upload-resume#role=${role.slug}&city=${city.slug}`}
              style={{
                background: "#1D4ED8",
                color: "#FFFFFF",
                padding: "10px 20px",
                borderRadius: 7,
                fontSize: 14,
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Upload resume to match →
            </Link>
          </div>
        </div>
      </section>

      {/* 3. ALERTS FORM */}
      <section className="emp-process-sec" id="alerts-block" style={{ background: "#FFFFFF", padding: "88px 0 96px", borderBottom: "1px solid #E2E8F0" }}>
        <div className="wrap split" style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 48, alignItems: "start" }}>
          <div>
            <div className="sec-head">
              <span
                className="eyebrow"
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 12,
                  color: "#1D4ED8",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: 8,
                }}
              >
                CONFIDENTIAL ALERTS
              </span>
              <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(28px, 3.6vw, 40px)", color: "#08142A", margin: "0 0 14px", fontWeight: 500 }}>
                Email me new {role.short} roles in <span className="serif-accent" style={{ fontStyle: "italic" }}>{city.name}</span>
              </h2>
              <p style={{ color: "#64748B", fontSize: 16, lineHeight: 1.6, margin: "0 0 24px" }}>
                Many boutique roles are filled through confidential referrals before they are posted anywhere publicly. Hear about them first.
              </p>
            </div>

            <div style={{ display: "grid", gap: 12 }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <span style={{ color: "#1D4ED8", fontWeight: 700 }}>✓</span>
                <span style={{ fontSize: 14, color: "#334155" }}>Targeted {role.name} seats in {city.name}</span>
              </div>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <span style={{ color: "#1D4ED8", fontWeight: 700 }}>✓</span>
                <span style={{ fontSize: 14, color: "#334155" }}>Verified base range, firm size, and on-site or hybrid requirements</span>
              </div>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <span style={{ color: "#1D4ED8", fontWeight: 700 }}>✓</span>
                <span style={{ fontSize: 14, color: "#334155" }}>Usually 2 to 4 high-quality openings per month. One-click unsubscribe</span>
              </div>
            </div>
          </div>

          <div id="alerts">
            <GateForm
              eyebrow="JOB ALERTS"
              title={`${role.name} roles in ${city.name}`}
              audience="candidate"
              button="Email me new roles"
              reviewSlug="n-brown"
              fine="Always use a personal email address, never your law firm account. No firm sees your name until you say yes."
              steps={[
                ["Step 1: Alerts Configured", `Alerts active for ${role.name.toLowerCase()} seats in ${city.name}.`, true],
                ["Step 2: Curated Dispatches", "Receive each verified role with complete salary spread, firm size, and hybrid flexibility."],
                ["Step 3: Private Briefing", "When a seat fits, reply to the email. Justin briefs you on the firm and partners before anything is submitted."],
                ["Step 4: Unsubscribe Anytime", "One-click instant unsubscribe and automatic contact deletion."],
              ]}
            />
          </div>
        </div>
      </section>

      {/* 4. HOW APPLYING WORKS (3-STEP PRIVACY PROTOCOL) */}
      <section className="emp-process-sec" style={{ background: "#FAF9F5", padding: "88px 0 96px", borderBottom: "1px solid #EAE7DC" }}>
        <div className="wrap" style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
          <div className="sec-head" style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 44px" }}>
            <span
              className="eyebrow"
              style={{
                fontFamily: "var(--mono)",
                fontSize: 12,
                color: "#1D4ED8",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: 8,
              }}
            >
              PRIVACY PROTOCOL
            </span>
            <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(28px, 3.6vw, 42px)", color: "#08142A", margin: "0 0 14px", fontWeight: 500 }}>
              Nothing goes to any firm without your <span className="serif-accent" style={{ fontStyle: "italic" }}>express consent</span>
            </h2>
            <p style={{ color: "#64748B", fontSize: 16, lineHeight: 1.6, margin: 0 }}>
              Submitting an application sends your credentials to Orion director Justin only.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            <div style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 12, padding: "26px 22px" }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "#1D4ED8", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>
                STEP 01 · YOU APPLY
              </div>
              <div style={{ fontFamily: "var(--display)", fontSize: 20, color: "#08142A", fontWeight: 600, marginBottom: 8 }}>
                Personal Email &amp; Resume
              </div>
              <p style={{ fontSize: 13.5, lineHeight: 1.55, color: "#475569", margin: 0 }}>
                Zero information is transmitted to the hiring firm. Your candidacy is stored in our confidential offline vault.
              </p>
            </div>

            <div style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 12, padding: "26px 22px" }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "#1D4ED8", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>
                STEP 02 · 1 BUSINESS DAY
              </div>
              <div style={{ fontFamily: "var(--display)", fontSize: 20, color: "#08142A", fontWeight: 600, marginBottom: 8 }}>
                Director Introductory Call
              </div>
              <p style={{ fontSize: 13.5, lineHeight: 1.55, color: "#475569", margin: 0 }}>
                Justin calls you to discuss the firm identity, partner personalities, caseload volume, and true compensation package.
              </p>
            </div>

            <div style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 12, padding: "26px 22px" }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "#1D4ED8", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>
                STEP 03 · YOUR APPROVAL
              </div>
              <div style={{ fontFamily: "var(--display)", fontSize: 20, color: "#08142A", fontWeight: 600, marginBottom: 8 }}>
                One Firm Sees Your Dossier
              </div>
              <p style={{ fontSize: 13.5, lineHeight: 1.55, color: "#475569", margin: 0 }}>
                Only the specific firm you explicitly authorize receives your profile. Orion&apos;s service is always 100% free for candidates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHAT THIS ROLE PAYS */}
      <section className="emp-process-sec" style={{ background: "#FFFFFF", padding: "88px 0 96px", borderBottom: "1px solid #E2E8F0" }}>
        <div className="wrap" style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
          <div className="sec-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 36, flexWrap: "wrap", gap: 14 }}>
            <div>
              <span
                className="eyebrow"
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 12,
                  color: "#1D4ED8",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: 8,
                }}
              >
                COMPENSATION CONTEXT
              </span>
              <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(26px, 3.4vw, 38px)", color: "#08142A", margin: 0, fontWeight: 500 }}>
                What {role.name}s earn in {city.name}
              </h2>
            </div>
            <Link
              href={`/salaries/${role.slug}/${city.slug}`}
              style={{ fontSize: 14, fontWeight: 600, color: "#1D4ED8", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}
            >
              <span>View full {city.name} salary guide</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div style={{ background: "#FAF9F5", border: "1.5px solid #EAE7DC", borderRadius: 14, padding: "28px" }}>
            <SalaryBand city={city.slug} role={role.slug} highlight="b2" />
            <p style={{ fontSize: 12.5, color: "#64748B", marginTop: 20, paddingTop: 14, borderTop: "1px solid #EAE7DC", margin: "20px 0 0" }}>
              Source: <Mark>{DATA.source}</Mark>. Updated <Mark>{DATA.asOf}</Mark>. Base salary only before collections bonuses.
            </p>
          </div>
        </div>
      </section>

      {/* 6. MORE ROLES & CITIES */}
      <section className="emp-process-sec" style={{ background: "#FAF9F5", padding: "88px 0 96px", borderBottom: "1px solid #EAE7DC" }}>
        <div className="wrap" style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
          <div className="sec-head" style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 40px" }}>
            <span
              className="eyebrow"
              style={{
                fontFamily: "var(--mono)",
                fontSize: 12,
                color: "#1D4ED8",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: 8,
              }}
            >
              RELATED VACANCIES
            </span>
            <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(28px, 3.6vw, 42px)", color: "#08142A", margin: "0 0 14px", fontWeight: 500 }}>
              Other roles and legal markets
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
            <div style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 12, padding: "24px 22px" }}>
              <h3 style={{ fontFamily: "var(--display)", fontSize: 18, color: "#08142A", margin: "0 0 14px", fontWeight: 600 }}>
                Other practices in {city.name}
              </h3>
              <div style={{ display: "grid", gap: 10 }}>
                {otherRoles.map((r) => {
                  const cnt = DATA.jobs.filter((j) => j.role === r.slug && j.city === city.slug).length;
                  return (
                    <Link
                      key={r.slug}
                      href={`/jobs/${r.slug}/${city.slug}`}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "8px 12px",
                        background: "#F8FAFC",
                        borderRadius: 6,
                        textDecoration: "none",
                        color: "#08142A",
                        fontSize: 13.5,
                        fontWeight: 500,
                      }}
                    >
                      <span>{r.name}</span>
                      <span style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 700, color: "#1D4ED8" }}>{cnt} open</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 12, padding: "24px 22px" }}>
              <h3 style={{ fontFamily: "var(--display)", fontSize: 18, color: "#08142A", margin: "0 0 14px", fontWeight: 600 }}>
                {role.name} seats in other metros
              </h3>
              <div style={{ display: "grid", gap: 10 }}>
                {otherCities.map((c) => {
                  const cnt = DATA.jobs.filter((j) => j.role === role.slug && j.city === c.slug).length;
                  const b = DATA.bands[c.slug]?.[role.slug];
                  return (
                    <Link
                      key={c.slug}
                      href={`/jobs/${role.slug}/${c.slug}`}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "8px 12px",
                        background: "#F8FAFC",
                        borderRadius: 6,
                        textDecoration: "none",
                        color: "#08142A",
                        fontSize: 13.5,
                        fontWeight: 500,
                      }}
                    >
                      <span>{c.name}, {c.state}</span>
                      <span style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 700, color: "#1D4ED8" }}>
                        {cnt > 0 ? `${cnt} open` : b ? `med ${fmt.k(b.median)}` : "active"}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ ACCORDION */}
      <section className="emp-process-sec" style={{ background: "#FFFFFF", padding: "88px 0 96px", borderBottom: "1px solid #E2E8F0" }}>
        <div className="wrap split" style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 48, alignItems: "start" }}>
          <div className="sec-head">
            <span
              className="eyebrow"
              style={{
                fontFamily: "var(--mono)",
                fontSize: 12,
                color: "#1D4ED8",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: 8,
              }}
            >
              CANDIDATE INQUIRIES
            </span>
            <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(28px, 3.6vw, 40px)", color: "#08142A", margin: "0 0 14px", fontWeight: 500 }}>
              Questions about these <span className="serif-accent" style={{ fontStyle: "italic" }}>positions</span>
            </h2>
            <p style={{ color: "#64748B", fontSize: 15, lineHeight: 1.6 }}>
              Prefer to speak directly with founder Justin before submitting?{" "}
              <Link href="/about" style={{ color: "#1D4ED8", textDecoration: "underline", fontWeight: 600 }}>
                Schedule a confidential introductory call
              </Link>.
            </p>
          </div>

          <div className="faq" style={{ display: "grid", gap: 14 }}>
            <details style={{ background: "#FAF9F5", border: "1px solid #EAE7DC", borderRadius: 10, padding: "18px 22px" }}>
              <summary style={{ fontWeight: 600, color: "#08142A", cursor: "pointer", fontSize: 15 }}>
                Why are the employer firm names confidential?
              </summary>
              <p style={{ marginTop: 12, color: "#475569", lineHeight: 1.6, fontSize: 14, margin: "12px 0 0" }}>
                So you can explore the market without your current partners knowing, and so hiring firms can recruit without broadcasting vacancies to competitors. Justin discloses the exact firm name and managing partner background on your private briefing before anything is sent.
              </p>
            </details>

            <details style={{ background: "#FAF9F5", border: "1px solid #EAE7DC", borderRadius: 10, padding: "18px 22px" }}>
              <summary style={{ fontWeight: 600, color: "#08142A", cursor: "pointer", fontSize: 15 }}>
                Are the published pay bands real offer ranges?
              </summary>
              <p style={{ marginTop: 12, color: "#475569", lineHeight: 1.6, fontSize: 14, margin: "12px 0 0" }}>
                Yes. Each published band reflects the exact base salary range agreed with the law firm in our retained or contingent mandate intake. Origination bonuses, collection fees, and health benefits are on top.
              </p>
            </details>

            <details style={{ background: "#FAF9F5", border: "1px solid #EAE7DC", borderRadius: 10, padding: "18px 22px" }}>
              <summary style={{ fontWeight: 600, color: "#08142A", cursor: "pointer", fontSize: 15 }}>
                Will my current firm find out I applied?
              </summary>
              <p style={{ marginTop: 12, color: "#475569", lineHeight: 1.6, fontSize: 14, margin: "12px 0 0" }}>
                Under no circumstances. Applying delivers your resume to Justin only. We never contact your current firm, and we never submit your dossier anywhere without your express written approval.
              </p>
            </details>

            <details style={{ background: "#FAF9F5", border: "1px solid #EAE7DC", borderRadius: 10, padding: "18px 22px" }}>
              <summary style={{ fontWeight: 600, color: "#08142A", cursor: "pointer", fontSize: 15 }}>
                Does using Orion cost the candidate anything?
              </summary>
              <p style={{ marginTop: 12, color: "#475569", lineHeight: 1.6, fontSize: 14, margin: "12px 0 0" }}>
                Zero. Orion&apos;s fee is paid entirely by the hiring law firm upon your accepted start date. Your salary offer is never reduced or affected by our recruiting fee.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* 8. BOTTOM MIDNIGHT NAVY CTA BAND */}
      <section className="emp-terms-dark-sec" style={{ background: "#08142A", padding: "96px 0 108px", textAlign: "center" }}>
        <div className="wrap" style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px" }}>
          <div
            className="badge-capsule"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 999,
              padding: "6px 14px",
              fontFamily: "var(--mono)",
              fontSize: 11,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#93C5FD",
              marginBottom: 18,
            }}
          >
            <span className="badge-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#60A5FA" }} />
            <span>CONFIDENTIAL LATERAL ADVANCEMENT</span>
          </div>

          <h2
            style={{
              fontFamily: "var(--display)",
              fontSize: "clamp(32px, 4.2vw, 48px)",
              color: "#FFFFFF",
              margin: "0 0 16px",
              fontWeight: 500,
              lineHeight: 1.15,
            }}
          >
            Not sure which seat fits?{" "}
            <span className="serif-accent" style={{ color: "#60A5FA", fontStyle: "italic" }}>
              Send your credentials.
            </span>
          </h2>

          <p style={{ color: "#CBD5E1", fontSize: 17, lineHeight: 1.6, marginBottom: 34, maxWidth: 640, margin: "0 auto 34px" }}>
            We match your credentials against active and confidential unposted openings in {city.name}. Zero obligation.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            <Link
              href={`/upload-resume#role=${role.slug}&city=${city.slug}`}
              className="btn-emp-primary"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#1D4ED8",
                color: "#FFFFFF",
                fontWeight: 600,
                fontSize: 16,
                padding: "14px 34px",
                borderRadius: 7,
                textDecoration: "none",
              }}
            >
              <span>Upload your resume</span>
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href={`/salaries/${role.slug}/${city.slug}`}
              className="btn-emp-ghost"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.18)",
                color: "#FFFFFF",
                fontWeight: 600,
                fontSize: 16,
                padding: "14px 34px",
                borderRadius: 7,
                textDecoration: "none",
              }}
            >
              <span>Check {city.name} salary guide</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
