import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  cities,
  findCity,
  matchCandidates,
  asOf,
  source,
  jobs,
} from "@/data";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CitySnapshot } from "@/components/CitySnapshot";
import { CandidateCard } from "@/components/CandidateCard";
import { CityPayTable } from "@/components/PayTables";
import { GateForm } from "@/components/GateForm";
import { ProcessSteps } from "@/components/ProcessSteps";
import { TermsTiles } from "@/components/TermsTiles";
import { ResourceCards } from "@/components/ResourceCards";
import { ReviewsSection } from "@/components/ReviewCard";
import { RatingBadge } from "@/components/Rating";

interface PageProps {
  params: Promise<{ state: string; city: string }>;
}

export async function generateStaticParams() {
  return cities.map((c) => ({
    state: c.stateName.toLowerCase().replace(/\s+/g, "-"),
    city: c.name.toLowerCase().replace(/\s+/g, "-"),
  }));
}

export default async function CityLocationPage({ params }: PageProps) {
  const { state: stateParam, city: cityParam } = await params;

  const city =
    cities.find(
      (c) =>
        c.name.toLowerCase().replace(/\s+/g, "-") === cityParam.toLowerCase() ||
        c.slug === `${cityParam.toLowerCase()}-${stateParam.slice(0, 2).toLowerCase()}`
    ) || findCity("houston-tx");

  if (!city) {
    notFound();
  }

  // Top candidates in city
  const cityCandidates = matchCandidates({ city: city.slug })
    .filter((r) => r.inCity)
    .slice(0, 3);

  const cityJobsCount = jobs.filter((j) => j.city === city.slug).length;

  return (
    <div className="city-location-page" style={{ background: "#FAF9F5", color: "#08142A" }}>
      {/* 1. LUXURY HERO WITH VIDEO & 2-COLUMN REGIONAL SNAPSHOT */}
      <section
        className="emp-luxury-hero-sec city-location-hero"
        aria-labelledby="city-hero-h1"
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
          {/* Breadcrumb Navigation */}
          <div style={{ marginBottom: 20 }}>
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Regional Markets", href: "/find-candidates" },
                { label: `${city.name}, ${city.state}`, current: true },
              ]}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 40, alignItems: "center" }}>
            {/* Left Column: Heading & Executive Value */}
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
                  <span>REGIONAL LEGAL SEARCH · {city.name.toUpperCase()}, {city.stateName.toUpperCase()}</span>
                </div>
              </div>

              <h1
                id="city-hero-h1"
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
                Legal recruiters in{" "}
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
                Screened {city.name} attorneys and paralegals available for confidential interviews. Verified local law firm compensation data, and one fee only if you hire.
              </p>

              <div style={{ display: "grid", gap: 10, marginBottom: 30 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "#E2E8F0" }}>
                  <span style={{ color: "#60A5FA", fontWeight: 700 }}>✓</span>
                  <span>Pre-screened {city.name} lateral attorney &amp; paralegal pool</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "#E2E8F0" }}>
                  <span style={{ color: "#60A5FA", fontWeight: 700 }}>✓</span>
                  <span>100% contingency: 23% fee due only if you hire</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "#E2E8F0" }}>
                  <span style={{ color: "#60A5FA", fontWeight: 700 }}>✓</span>
                  <span>90-day replacement warranty with zero upfront retainers</span>
                </div>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
                <Link
                  className="btn-emp-primary"
                  href={`/find-candidates#city=${city.slug}`}
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
                  <span>See {city.name} candidates</span>
                  <span aria-hidden="true">→</span>
                </Link>
                <Link
                  className="btn-emp-ghost"
                  href={`/jobs/estate-planning-attorney/${city.slug}`}
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
                  <span>Browse {city.name} legal jobs ({cityJobsCount})</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Elevated City Snapshot Terminal */}
            <div>
              <div
                style={{
                  background: "#FFFFFF",
                  border: "1.5px solid #E2E8F0",
                  borderRadius: 14,
                  padding: "24px",
                  boxShadow: "0 24px 60px -12px rgba(0, 0, 0, 0.55)",
                  color: "#08142A",
                  textAlign: "left",
                }}
              >
                <CitySnapshot citySlug={city.slug} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. AVAILABLE CANDIDATES IN METRO */}
      <section className="emp-process-sec" id="candidates" style={{ background: "#FAF9F5", padding: "88px 0 96px", borderBottom: "1px solid #EAE7DC" }}>
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
                ACTIVE {city.name.toUpperCase()} TALENT
              </span>
              <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(26px, 3.4vw, 38px)", color: "#08142A", margin: 0, fontWeight: 500 }}>
                Pre-screened candidates open to <span className="serif-accent" style={{ fontStyle: "italic", color: "#1D4ED8" }}>{city.name}</span> seats
              </h2>
            </div>
            <Link
              className="more link-arrow hide-sm"
              href={`/find-candidates#city=${city.slug}`}
              style={{ fontSize: 14, fontWeight: 600, color: "#1D4ED8", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}
            >
              <span>View all {city.name} candidates</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="cards" style={{ display: "grid", gap: 20 }}>
            {cityCandidates.map((r) => (
              <CandidateCard key={r.c.id} candidate={r.c} result={r} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. WHAT CITY FIRMS PAY + SALARY GUIDE */}
      <section className="emp-process-sec" id="pay" style={{ background: "#FFFFFF", padding: "88px 0 96px", borderBottom: "1px solid #E2E8F0" }}>
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
              COMPENSATION INTELLIGENCE
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
              What law firms pay in <span className="serif-accent" style={{ fontStyle: "italic", color: "#1D4ED8" }}>{city.name}</span>
            </h2>
            <p style={{ color: "#64748B", fontSize: 16, lineHeight: 1.6, margin: 0 }}>
              Base compensation by practice area. Select any role to view detailed experience tiers and matching candidate expectations.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 36, alignItems: "start" }}>
            <div style={{ background: "#FAF9F5", border: "1.5px solid #EAE7DC", borderRadius: 14, padding: "28px", boxShadow: "0 4px 16px rgba(15,23,42,0.03)" }}>
              <CityPayTable citySlug={city.slug} />
              <p style={{ fontSize: 12.5, color: "#64748B", marginTop: 20, paddingTop: 14, borderTop: "1px solid #EAE7DC", margin: "20px 0 0" }}>
                Source: {source}, updated {asOf}. Base salary only before discretionary bonuses.
              </p>
            </div>

            <div id="guide-gate">
              <GateForm
                eyebrow="FREE PDF REPORT"
                title={`Get the ${city.name} Legal Salary Guide`}
                bullets={[
                  "Base pay for 10 practice specializations by experience tier",
                  "Bonus norms, collection incentives, and hybrid premiums",
                  "Updated quarterly from real boutique firm offers",
                ]}
                button={`Email me the ${city.name} guide`}
                preset="guide"
                city={city.slug}
                reviewSlug="daffner-law"
                fine="Delivered as a PDF immediately. Unsubscribe in one click."
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. PROCESS: FROM OPEN SEAT TO SHORTLIST IN DAYS */}
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
              SEARCH WORKFLOW
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
              From open seat to shortlist in <span className="serif-accent" style={{ fontStyle: "italic", color: "#1D4ED8" }}>days</span>
            </h2>
            <p style={{ color: "#64748B", fontSize: 16, lineHeight: 1.6, margin: 0 }}>
              The proven 3-step intake workflow for every {city.name} opening, from senior litigation associate to boutique paralegal.
            </p>
          </div>
          <ProcessSteps />
        </div>
      </section>

      {/* 5. TERMS TILES & RISK-FREE WARRANTY */}
      <section className="emp-process-sec" style={{ background: "#FFFFFF", padding: "88px 0 96px", borderBottom: "1px solid #E2E8F0" }}>
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
              ORION PLACEMENT TERMS
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
              One fee, and only if you <span className="serif-accent" style={{ fontStyle: "italic", color: "#1D4ED8" }}>hire</span>
            </h2>
            <p style={{ color: "#64748B", fontSize: 16, lineHeight: 1.6, margin: 0 }}>
              {city.name} firms pay the standard 23% contingency fee. Zero upfront retainer.
            </p>
          </div>
          <TermsTiles />
        </div>
      </section>

      {/* 6. HIRING TOOLS FOR CITY */}
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
              FREE FIRM RESOURCES
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
              Hiring in {city.name} on your <span className="serif-accent" style={{ fontStyle: "italic", color: "#1D4ED8" }}>own</span>
            </h2>
            <p style={{ color: "#64748B", fontSize: 16, lineHeight: 1.6, margin: 0 }}>
              Where to post job listings, law school talent pipelines, and customizable job description templates.
            </p>
          </div>
          <ResourceCards setType="city" />
        </div>
      </section>

      {/* 7. REVIEWS & TESTIMONIALS */}
      <section className="emp-process-sec" style={{ background: "#FFFFFF", padding: "88px 0 96px", borderBottom: "1px solid #E2E8F0" }}>
        <div className="wrap" style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
          <div className="sec-head row" style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 40, flexWrap: "wrap", gap: 14 }}>
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
                CLIENT REVIEWS
              </span>
              <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(26px, 3.4vw, 38px)", color: "#08142A", margin: 0, fontWeight: 500 }}>
                What law firms say about Orion
              </h2>
            </div>
            <RatingBadge link={true} />
          </div>
          <ReviewsSection kind="mixed" limit={3} />
        </div>
      </section>

      {/* 8. CANDIDATE CROSS-FUNNEL VALUE BAND */}
      <section className="emp-process-sec" style={{ background: "#FAF9F5", padding: "64px 0", borderBottom: "1px solid #EAE7DC" }}>
        <div className="wrap" style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
          <div>
            <span
              className="eyebrow"
              style={{
                fontFamily: "var(--mono)",
                fontSize: 11.5,
                color: "#1D4ED8",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: 6,
              }}
            >
              LOOKING FOR A ROLE IN {city.name.toUpperCase()}?
            </span>
            <h3 style={{ fontFamily: "var(--display)", fontSize: 26, color: "#08142A", margin: "0 0 6px", fontWeight: 600 }}>
              Confidential {city.name} roles with salary disclosed
            </h3>
            <p style={{ color: "#64748B", fontSize: 15, margin: 0 }}>
              {cityJobsCount} openings currently active in {city.name}. No firm sees your name until you say yes.
            </p>
          </div>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link
              className="btn-emp-primary"
              href={`/jobs/estate-planning-attorney/${city.slug}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#1D4ED8",
                color: "#FFFFFF",
                fontWeight: 600,
                fontSize: 14,
                padding: "12px 24px",
                borderRadius: 7,
                textDecoration: "none",
              }}
            >
              <span>View {city.name} jobs</span>
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              className="btn btn-outline"
              href="/upload-resume"
              style={{
                borderRadius: 7,
                fontWeight: 600,
                padding: "12px 24px",
                border: "1.5px solid #CBD5E1",
                color: "#08142A",
                textDecoration: "none",
                fontSize: 14,
                background: "#FFFFFF",
              }}
            >
              <span>Upload resume →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 9. BOTTOM MIDNIGHT NAVY CTA BAND */}
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
            <span>EXECUTIVE LEGAL PLACEMENT</span>
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
            Hire qualified attorneys and paralegals in{" "}
            <span className="serif-accent" style={{ color: "#60A5FA", fontStyle: "italic" }}>
              {city.name}
            </span>
          </h2>

          <p style={{ color: "#CBD5E1", fontSize: 17, lineHeight: 1.6, marginBottom: 34, maxWidth: 640, margin: "0 auto 34px" }}>
            Access vetted candidate dossiers or schedule a confidential 15-minute search consultation with founder Justin.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            <Link
              href={`/find-candidates#city=${city.slug}`}
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
              <span>Find {city.name} candidates</span>
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/submit-job"
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
              <span>Submit a mandate</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
