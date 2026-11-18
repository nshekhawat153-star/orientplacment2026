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
  bands,
  trust,
  fmt,
} from "@/data";
import { CandidateCard } from "@/components/CandidateCard";
import { CityPayTable } from "@/components/PayTables";
import { GateForm } from "@/components/GateForm";
import { TermsTiles } from "@/components/TermsTiles";
import { ReviewsSection } from "@/components/ReviewCard";
import { RatingBadge, TrustBar } from "@/components/Rating";
import { Icon } from "@/components/icons";

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

  // City Salary Bands for Top 4 Cards
  const cityBands = bands[city.slug] || {};
  const preferredSalaryRoles = [
    { slug: "estate-planning-attorney", name: "Estate Planning Attorney" },
    { slug: "commercial-litigation-attorney", name: "Commercial Litigation" },
    { slug: "litigation-attorney", name: "Litigation Attorney" },
    { slug: "real-estate-attorney", name: "Real Estate Attorney" },
  ];
  const topSalaryCards = preferredSalaryRoles
    .filter((r) => cityBands[r.slug])
    .map((r) => ({
      ...r,
      band: cityBands[r.slug],
    }));

  return (
    <div className="city-location-page" style={{ background: "#FAF9F5", color: "#08142A" }}>
      <style>{`
        .city-terms-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 18px;
        }
        .city-candidates-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 24px;
        }
        .city-salary-cards-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 18px;
        }
        .city-salary-split-grid {
          display: grid;
          grid-template-columns: 1.35fr 1fr;
          gap: 36px;
          align-items: start;
        }
        .city-steps-dark-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 24px;
        }
        .city-resources-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 24px;
        }
        .city-hover-lift {
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
        }
        .city-hover-lift:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 30px rgba(8, 20, 42, 0.08);
          border-color: #1D4ED8;
        }
        @media (max-width: 1024px) {
          .city-terms-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          .city-salary-cards-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          .city-salary-split-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 960px) {
          .city-candidates-grid {
            grid-template-columns: 1fr;
          }
          .city-steps-dark-grid {
            grid-template-columns: 1fr;
          }
          .city-resources-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 640px) {
          .city-terms-grid {
            grid-template-columns: 1fr;
          }
          .city-salary-cards-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* 1. LUXURY CENTERED DARK HERO WITH VIDEO BACKGROUND */}
      <section
        className="hero-cinematic city-location-hero"
        aria-labelledby="city-hero-h1"
        style={{
          position: "relative",
          background: "#08142A",
          color: "#FFFFFF",
          padding: "124px 0 88px",
          overflow: "hidden",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          textAlign: "center",
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

        <div className="wrap hero-content-wrap" style={{ position: "relative", zIndex: 3, maxWidth: 1040, margin: "0 auto", padding: "0 24px" }}>
          {/* Centered Capsule Badge */}
          <div style={{ marginBottom: 22 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.20)",
                borderRadius: 999,
                padding: "7px 18px",
                fontFamily: "var(--mono)",
                fontSize: 12,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#E2E8F0",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#60A5FA" }} />
              <span>REGIONAL LEGAL SEARCH · {city.name.toUpperCase()}, {city.stateName.toUpperCase()}</span>
            </div>
          </div>

          {/* Centered Display Heading - Prominent Executive Scale */}
          <h1
            id="city-hero-h1"
            style={{
              fontFamily: "var(--display)",
              fontSize: "clamp(40px, 5.2vw, 64px)",
              lineHeight: 1.10,
              fontWeight: 500,
              color: "#FFFFFF",
              letterSpacing: "-0.025em",
              margin: "0 auto 22px",
              textAlign: "center",
              maxWidth: 920,
              textWrap: "balance",
              textShadow: "0 2px 16px rgba(0, 0, 0, 0.45)",
            }}
          >
            Legal recruiters in{" "}
            <span className="serif-accent" style={{ color: "#93C5FD", fontStyle: "italic" }}>
              {city.name}
            </span>
          </h1>

          {/* Centered Subtitle - Readable Executive Scale */}
          <p
            style={{
              fontSize: "clamp(18px, 1.8vw, 21px)",
              lineHeight: 1.65,
              color: "#CBD5E1",
              maxWidth: 780,
              margin: "0 auto 34px",
              textShadow: "0 1px 8px rgba(0, 0, 0, 0.4)",
            }}
          >
            Direct lateral placements at boutique and mid-size law firms across {city.name}. Screened attorney and paralegal dossiers delivered in 48 hours. 100% contingency, zero upfront retainer.
          </p>

          {/* Centered Action Buttons */}
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 14, marginBottom: 34 }}>
            <a
              href="#candidates"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#1D4ED8",
                color: "#FFFFFF",
                fontWeight: 600,
                fontSize: 16,
                padding: "15px 32px",
                borderRadius: 7,
                textDecoration: "none",
                boxShadow: "0 8px 20px rgba(29, 78, 216, 0.35)",
              }}
            >
              <span>See {city.name} candidates</span>
              <span aria-hidden="true">↓</span>
            </a>
            <Link
              href={`/jobs/estate-planning-attorney/${city.slug}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "#FFFFFF",
                fontWeight: 600,
                fontSize: 16,
                padding: "15px 28px",
                borderRadius: 7,
                textDecoration: "none",
              }}
            >
              <span>Browse {city.name} legal jobs ({cityJobsCount})</span>
              <span aria-hidden="true">→</span>
            </Link>
            <a
              href="https://calendly.com/orionplacement/call-with-justin"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "#FFFFFF",
                fontWeight: 600,
                fontSize: 16,
                padding: "15px 26px",
                borderRadius: 7,
                textDecoration: "none",
              }}
            >
              <span>Book 15 min with Justin</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>

          {/* Centered Micro-reassurances Row */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap", gap: "14px 28px", color: "#CBD5E1", fontSize: 14.5 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: "#60A5FA", fontWeight: 700 }}>✓</span>
              <span>Pre-screened {city.name} lateral pool</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: "#60A5FA", fontWeight: 700 }}>✓</span>
              <span>23% contingency fee — only pay if you hire</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: "#60A5FA", fontWeight: 700 }}>✓</span>
              <span>90-day replacement warranty</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST BAR STRIP */}
      <section className="trust-strip" aria-label="Orion in numbers" style={{ background: "#FFFFFF", borderBottom: "1px solid #E2E8F0" }}>
        <div className="wrap">
          <TrustBar />
        </div>
      </section>

      {/* 2. PRE-SCREENED CANDIDATES OPEN TO HOUSTON SEATS (PROPERLY CENTERED) */}
      <section id="candidates" style={{ background: "#FAF9F5", padding: "88px 0 96px", borderBottom: "1px solid #EAE7DC" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          {/* Centered Section Header (no .sec-head constraint) */}
          <div style={{ textAlign: "center", maxWidth: 780, margin: "0 auto 44px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#EFF6FF",
                border: "1px solid #DBEAFE",
                borderRadius: 999,
                padding: "6px 14px",
                fontFamily: "var(--mono)",
                fontSize: 11,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#1D4ED8",
                marginBottom: 14,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#1D4ED8" }} />
              <span>ACTIVE {city.name.toUpperCase()} TALENT</span>
            </div>
            <h2
              style={{
                fontFamily: "var(--display)",
                fontSize: "clamp(28px, 3.6vw, 42px)",
                color: "#08142A",
                margin: "0 auto 14px",
                fontWeight: 500,
                lineHeight: 1.2,
                maxWidth: "100%",
              }}
            >
              Pre-screened candidates open to{" "}
              <span className="serif-accent" style={{ fontStyle: "italic", color: "#1D4ED8" }}>
                {city.name}
              </span>{" "}
              seats
            </h2>
            <p style={{ color: "#64748B", fontSize: 16, lineHeight: 1.6, margin: "0 auto", maxWidth: 680 }}>
              Screened attorneys and paralegals currently open to discreet lateral conversations in {city.name}.
            </p>
          </div>

          {/* 3 Candidate Cards in a Balanced Single Row */}
          <div className="city-candidates-grid">
            {cityCandidates.map((r) => (
              <div key={r.c.id} className="city-hover-lift" style={{ borderRadius: 14 }}>
                <CandidateCard candidate={r.c} result={r} />
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 36 }}>
            <Link
              href={`/find-candidates#city=${city.slug}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#1D4ED8",
                color: "#FFFFFF",
                fontWeight: 600,
                fontSize: 15,
                padding: "13px 28px",
                borderRadius: 7,
                textDecoration: "none",
                boxShadow: "0 4px 14px rgba(29, 78, 216, 0.3)",
              }}
            >
              <span>View all pre-screened {city.name} candidates</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. WHAT LAW FIRMS PAY IN HOUSTON (REDESIGNED LAYOUT WITH SALARY CARDS) */}
      <section id="pay" style={{ background: "#FFFFFF", padding: "88px 0 96px", borderBottom: "1px solid #E2E8F0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          {/* Centered Section Header */}
          <div style={{ textAlign: "center", maxWidth: 780, margin: "0 auto 40px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#EFF6FF",
                border: "1px solid #DBEAFE",
                borderRadius: 999,
                padding: "6px 14px",
                fontFamily: "var(--mono)",
                fontSize: 11,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#1D4ED8",
                marginBottom: 14,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#1D4ED8" }} />
              <span>COMPENSATION INTELLIGENCE</span>
            </div>
            <h2
              style={{
                fontFamily: "var(--display)",
                fontSize: "clamp(28px, 3.6vw, 42px)",
                color: "#08142A",
                margin: "0 auto 14px",
                fontWeight: 500,
                lineHeight: 1.2,
                maxWidth: "100%",
              }}
            >
              What law firms pay in{" "}
              <span className="serif-accent" style={{ fontStyle: "italic", color: "#1D4ED8" }}>
                {city.name}
              </span>
            </h2>
            <p style={{ color: "#64748B", fontSize: 16, lineHeight: 1.6, margin: "0 auto", maxWidth: 680 }}>
              Base compensation by practice area. Select any role to view detailed experience tiers and matching candidate expectations.
            </p>
          </div>

          {/* Top 4 Practice Area Salary Cards Row */}
          {topSalaryCards.length > 0 && (
            <div className="city-salary-cards-grid" style={{ marginBottom: 40 }}>
              {topSalaryCards.map((rc) => (
                <Link
                  key={rc.slug}
                  href={`/salaries/${rc.slug}/${city.slug}`}
                  className="city-hover-lift"
                  style={{
                    background: "#FAF9F5",
                    border: "1.5px solid #EAE7DC",
                    borderRadius: 14,
                    padding: "24px 20px",
                    textDecoration: "none",
                    color: "inherit",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontFamily: "var(--mono)",
                        fontSize: 10.5,
                        fontWeight: 700,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        color: "#1D4ED8",
                        display: "block",
                        marginBottom: 6,
                      }}
                    >
                      PRACTICE BENCHMARK
                    </span>
                    <h3 style={{ fontFamily: "var(--display)", fontSize: 18, color: "#08142A", fontWeight: 600, margin: "0 0 12px", lineHeight: 1.25 }}>
                      {rc.name}
                    </h3>
                    <div style={{ fontFamily: "var(--display)", fontSize: 28, fontWeight: 700, color: "#08142A", lineHeight: 1 }}>
                      {fmt.k(rc.band.median)}
                      <span style={{ fontSize: 13, fontWeight: 400, color: "#64748B", marginLeft: 4 }}>median base</span>
                    </div>
                    <div style={{ fontSize: 13, color: "#64748B", marginTop: 8 }}>
                      Range: <b>${rc.band.b1[0]}k–${rc.band.b3[1]}k</b>
                    </div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16, paddingTop: 12, borderTop: "1px solid #E2E8F0", fontSize: 12, color: "#1D4ED8", fontWeight: 600 }}>
                    <span>{rc.band.typical}</span>
                    <span>View guide →</span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Full Table & PDF Salary Guide Gate */}
          <div className="city-salary-split-grid">
            <div
              style={{
                background: "#FAF9F5",
                border: "1.5px solid #EAE7DC",
                borderRadius: 14,
                padding: "28px",
                boxShadow: "0 4px 16px rgba(15,23,42,0.03)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, paddingBottom: 12, borderBottom: "1.5px solid #E2E8F0" }}>
                <div>
                  <h3 style={{ fontFamily: "var(--display)", fontSize: 20, color: "#08142A", margin: 0, fontWeight: 600 }}>
                    {city.name} Legal Compensation Matrix
                  </h3>
                  <span style={{ fontSize: 12.5, color: "#64748B" }}>Updated {asOf} from verified boutique offers</span>
                </div>
              </div>
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

      {/* 4. FROM OPEN SEAT TO SHORTLIST IN DAYS (DARK LUXURY SECTION AS REQUESTED) */}
      <section
        style={{
          background: "radial-gradient(ellipse 90% 80% at 50% -20%, rgba(29, 78, 216, 0.22) 0%, rgba(8, 20, 42, 0.98) 75%, #08142A 100%)",
          padding: "96px 0 108px",
          color: "#FFFFFF",
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          {/* Centered Header */}
          <div style={{ textAlign: "center", maxWidth: 780, margin: "0 auto 48px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(29, 78, 216, 0.2)",
                border: "1px solid rgba(96, 165, 250, 0.3)",
                borderRadius: 999,
                padding: "6px 14px",
                fontFamily: "var(--mono)",
                fontSize: 11,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#93C5FD",
                marginBottom: 14,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#60A5FA" }} />
              <span>SEARCH WORKFLOW · ZERO FRICTION</span>
            </div>
            <h2
              style={{
                fontFamily: "var(--display)",
                fontSize: "clamp(28px, 3.6vw, 42px)",
                color: "#FFFFFF",
                margin: "0 auto 14px",
                fontWeight: 500,
                lineHeight: 1.2,
                maxWidth: "100%",
              }}
            >
              From open seat to shortlist in{" "}
              <span className="serif-accent" style={{ color: "#60A5FA", fontStyle: "italic" }}>
                days
              </span>
            </h2>
            <p style={{ color: "#CBD5E1", fontSize: 16.5, lineHeight: 1.6, margin: "0 auto", maxWidth: 680 }}>
              The proven 3-step intake workflow for every {city.name} opening, from senior litigation associate to boutique paralegal.
            </p>
          </div>

          {/* 3 Dark Step Cards */}
          <div className="city-steps-dark-grid">
            {/* Step 1 */}
            <div
              className="city-hover-lift"
              style={{
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: 14,
                padding: "32px 26px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#93C5FD",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    display: "inline-block",
                    background: "rgba(29, 78, 216, 0.25)",
                    border: "1px solid rgba(96, 165, 250, 0.3)",
                    padding: "4px 10px",
                    borderRadius: 4,
                    marginBottom: 14,
                  }}
                >
                  STEP 01 · DAY 0
                </span>
                <h3 style={{ fontFamily: "var(--display)", fontSize: 22, color: "#FFFFFF", fontWeight: 600, margin: "0 0 12px" }}>
                  Tell us the seat
                </h3>
                <p style={{ fontSize: 14.5, color: "#CBD5E1", lineHeight: 1.6, margin: 0 }}>
                  Role, city, years of experience, pay band, and must-haves. Two minutes on our direct intake or a 15-minute call with Justin.
                </p>
              </div>

              {/* Dark Mockup */}
              <div
                style={{
                  background: "rgba(15, 23, 42, 0.7)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: 10,
                  padding: "16px 18px",
                  marginTop: 24,
                  fontSize: 13,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--mono)", fontSize: 11, textTransform: "uppercase", color: "#94A3B8", marginBottom: 10 }}>
                  <span>Target Role</span>
                  <span style={{ color: "#60A5FA" }}>Houston, TX</span>
                </div>
                <div style={{ color: "#FFFFFF", fontWeight: 600, marginBottom: 8 }}>Estate Planning Attorney</div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  <span style={{ background: "rgba(29, 78, 216, 0.3)", color: "#93C5FD", padding: "2px 8px", borderRadius: 4, fontSize: 11 }}>Texas Bar</span>
                  <span style={{ background: "rgba(29, 78, 216, 0.3)", color: "#93C5FD", padding: "2px 8px", borderRadius: 4, fontSize: 11 }}>Probate</span>
                  <span style={{ background: "rgba(255, 255, 255, 0.08)", color: "#94A3B8", padding: "2px 8px", borderRadius: 4, fontSize: 11 }}>Spanish (Plus)</span>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div
              className="city-hover-lift"
              style={{
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: 14,
                padding: "32px 26px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#93C5FD",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    display: "inline-block",
                    background: "rgba(29, 78, 216, 0.25)",
                    border: "1px solid rgba(96, 165, 250, 0.3)",
                    padding: "4px 10px",
                    borderRadius: 4,
                    marginBottom: 14,
                  }}
                >
                  STEP 02 · DAYS 1–5
                </span>
                <h3 style={{ fontFamily: "var(--display)", fontSize: 22, color: "#FFFFFF", fontWeight: 600, margin: "0 0 12px" }}>
                  See the shortlist
                </h3>
                <p style={{ fontSize: 14.5, color: "#CBD5E1", lineHeight: 1.6, margin: 0 }}>
                  Pre-screened candidates with verified bar admissions, notice periods, and compensation expectations. You pick who to meet.
                </p>
              </div>

              {/* Dark Mockup */}
              <div
                style={{
                  background: "rgba(15, 23, 42, 0.7)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: 10,
                  padding: "16px 18px",
                  marginTop: 24,
                  fontSize: 13,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--mono)", fontSize: 11, textTransform: "uppercase", color: "#94A3B8", marginBottom: 10 }}>
                  <span>Shortlist Ready</span>
                  <span style={{ color: "#60A5FA" }}>3 Vetted</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <span style={{ color: "#FFFFFF" }}>Candidate EP-TX-0412</span>
                  <span style={{ color: "#4ADE80", fontSize: 11, fontWeight: 700 }}>5 of 5 Match</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "#FFFFFF" }}>Candidate LIT-TX-0390</span>
                  <span style={{ color: "#4ADE80", fontSize: 11, fontWeight: 700 }}>4 of 5 Match</span>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div
              className="city-hover-lift"
              style={{
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: 14,
                padding: "32px 26px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#93C5FD",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    display: "inline-block",
                    background: "rgba(29, 78, 216, 0.25)",
                    border: "1px solid rgba(96, 165, 250, 0.3)",
                    padding: "4px 10px",
                    borderRadius: 4,
                    marginBottom: 14,
                  }}
                >
                  STEP 03 · START DATE
                </span>
                <h3 style={{ fontFamily: "var(--display)", fontSize: 22, color: "#FFFFFF", fontWeight: 600, margin: "0 0 12px" }}>
                  Interview, hire, then pay
                </h3>
                <p style={{ fontSize: 14.5, color: "#CBD5E1", lineHeight: 1.6, margin: 0 }}>
                  Invoice sent on the hire&apos;s start date, due net 15. Backed by our 100% 90-day replacement warranty if things don&apos;t work out.
                </p>
              </div>

              {/* Dark Mockup */}
              <div
                style={{
                  background: "rgba(15, 23, 42, 0.7)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: 10,
                  padding: "16px 18px",
                  marginTop: 24,
                  fontSize: 13,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--mono)", fontSize: 11, textTransform: "uppercase", color: "#94A3B8", marginBottom: 10 }}>
                  <span>Placement Protection</span>
                  <span style={{ color: "#4ADE80" }}>Active</span>
                </div>
                <div style={{ color: "#FFFFFF", fontWeight: 600, marginBottom: 4 }}>90-Day Replacement Warranty</div>
                <div style={{ color: "#94A3B8", fontSize: 12 }}>Zero retainer · Due only upon completed hire</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TERMS TILES & RISK-FREE WARRANTY */}
      <section style={{ background: "#FFFFFF", padding: "88px 0 96px", borderBottom: "1px solid #E2E8F0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          {/* Centered Section Header */}
          <div style={{ textAlign: "center", maxWidth: 780, margin: "0 auto 44px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#EFF6FF",
                border: "1px solid #DBEAFE",
                borderRadius: 999,
                padding: "6px 14px",
                fontFamily: "var(--mono)",
                fontSize: 11,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#1D4ED8",
                marginBottom: 14,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#1D4ED8" }} />
              <span>ORION PLACEMENT TERMS</span>
            </div>
            <h2
              style={{
                fontFamily: "var(--display)",
                fontSize: "clamp(28px, 3.6vw, 42px)",
                color: "#08142A",
                margin: "0 auto 14px",
                fontWeight: 500,
                lineHeight: 1.2,
                maxWidth: "100%",
              }}
            >
              One fee, and only if you{" "}
              <span className="serif-accent" style={{ fontStyle: "italic", color: "#1D4ED8" }}>
                hire
              </span>
            </h2>
            <p style={{ color: "#64748B", fontSize: 16, lineHeight: 1.6, margin: "0 auto", maxWidth: 680 }}>
              {city.name} firms pay the standard 23% contingency fee. Zero upfront retainer.
            </p>
          </div>
          <TermsTiles />
        </div>
      </section>

      {/* 6. HIRING IN HOUSTON ON YOUR OWN (COMPLETELY REDESIGNED) */}
      <section style={{ background: "#FAF9F5", padding: "88px 0 96px", borderBottom: "1px solid #EAE7DC" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          {/* Centered Section Header */}
          <div style={{ textAlign: "center", maxWidth: 780, margin: "0 auto 44px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#EFF6FF",
                border: "1px solid #DBEAFE",
                borderRadius: 999,
                padding: "6px 14px",
                fontFamily: "var(--mono)",
                fontSize: 11,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#1D4ED8",
                marginBottom: 14,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#1D4ED8" }} />
              <span>FREE FIRM RESOURCES · DIY PLAYBOOK</span>
            </div>
            <h2
              style={{
                fontFamily: "var(--display)",
                fontSize: "clamp(28px, 3.6vw, 42px)",
                color: "#08142A",
                margin: "0 auto 14px",
                fontWeight: 500,
                lineHeight: 1.2,
                maxWidth: "100%",
              }}
            >
              Hiring in {city.name} on your{" "}
              <span className="serif-accent" style={{ fontStyle: "italic", color: "#1D4ED8" }}>
                own
              </span>
            </h2>
            <p style={{ color: "#64748B", fontSize: 16, lineHeight: 1.6, margin: "0 auto", maxWidth: 680 }}>
              Where to post job listings, law school talent pipelines, and customizable job description templates.
            </p>
          </div>

          {/* 3 Redesigned Elevated Resource Cards */}
          <div className="city-resources-grid">
            {/* Resource 1: Where to Post */}
            <div
              className="city-hover-lift"
              style={{
                background: "#FFFFFF",
                border: "1.5px solid #E2E8F0",
                borderRadius: 14,
                padding: "32px 26px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 4px 16px rgba(8, 20, 42, 0.03)",
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <div style={{ width: 42, height: 42, borderRadius: "50%", background: "#EFF6FF", color: "#1D4ED8", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon name="post" />
                  </div>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 10.5, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#1D4ED8", background: "#EFF6FF", padding: "4px 8px", borderRadius: 4 }}>
                    JOB BOARDS
                  </span>
                </div>
                <h3 style={{ fontFamily: "var(--display)", fontSize: 21, color: "#08142A", fontWeight: 600, margin: "0 0 10px" }}>
                  Where to post in {city.name}
                </h3>
                <p style={{ fontSize: 14.5, color: "#475569", lineHeight: 1.6, margin: "0 0 20px" }}>
                  Legal job boards compared on candidate quality, cost-per-applicant, and fill speed for Texas law practices.
                </p>
                <div style={{ background: "#FAF9F5", border: "1px solid #EAE7DC", borderRadius: 8, padding: "12px 14px", marginBottom: 20 }}>
                  <b style={{ display: "block", fontSize: 11, fontFamily: "var(--mono)", color: "#1D4ED8", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>
                    YOU GET
                  </b>
                  <span style={{ fontSize: 13, color: "#334155" }}>
                    Board cost comparisons &amp; time-to-first-applicant analysis.
                  </span>
                </div>
              </div>
              <Link
                href={`/where-to-post/${city.slug}`}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "#1D4ED8",
                  color: "#FFFFFF",
                  padding: "12px 18px",
                  borderRadius: 7,
                  fontWeight: 600,
                  fontSize: 14,
                  textDecoration: "none",
                }}
              >
                <span>Read posting guide</span>
                <span>→</span>
              </Link>
            </div>

            {/* Resource 2: Where Hires Come From */}
            <div
              className="city-hover-lift"
              style={{
                background: "#FFFFFF",
                border: "1.5px solid #E2E8F0",
                borderRadius: 14,
                padding: "32px 26px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 4px 16px rgba(8, 20, 42, 0.03)",
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <div style={{ width: 42, height: 42, borderRadius: "50%", background: "#EFF6FF", color: "#1D4ED8", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon name="school" />
                  </div>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 10.5, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#1D4ED8", background: "#EFF6FF", padding: "4px 8px", borderRadius: 4 }}>
                    TALENT PIPELINES
                  </span>
                </div>
                <h3 style={{ fontFamily: "var(--display)", fontSize: 21, color: "#08142A", fontWeight: 600, margin: "0 0 10px" }}>
                  Where {city.name} hires come from
                </h3>
                <p style={{ fontSize: 14.5, color: "#475569", lineHeight: 1.6, margin: "0 0 20px" }}>
                  Accredited law schools, clerkship programmes, and regional legal bar associations across Texas.
                </p>
                <div style={{ background: "#FAF9F5", border: "1px solid #EAE7DC", borderRadius: 8, padding: "12px 14px", marginBottom: 20 }}>
                  <b style={{ display: "block", fontSize: 11, fontFamily: "var(--mono)", color: "#1D4ED8", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>
                    YOU GET
                  </b>
                  <span style={{ fontSize: 13, color: "#334155" }}>
                    Direct placement contacts &amp; recruitment calendar.
                  </span>
                </div>
              </div>
              <Link
                href={`/where-to-hire/${city.slug}`}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "#1D4ED8",
                  color: "#FFFFFF",
                  padding: "12px 18px",
                  borderRadius: 7,
                  fontWeight: 600,
                  fontSize: 14,
                  textDecoration: "none",
                }}
              >
                <span>Read talent guide</span>
                <span>→</span>
              </Link>
            </div>

            {/* Resource 3: Interview Kits */}
            <div
              className="city-hover-lift"
              style={{
                background: "#FFFFFF",
                border: "1.5px solid #E2E8F0",
                borderRadius: 14,
                padding: "32px 26px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 4px 16px rgba(8, 20, 42, 0.03)",
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <div style={{ width: 42, height: 42, borderRadius: "50%", background: "#EFF6FF", color: "#1D4ED8", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon name="doc" />
                  </div>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 10.5, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#1D4ED8", background: "#EFF6FF", padding: "4px 8px", borderRadius: 4 }}>
                    INTERVIEW KITS
                  </span>
                </div>
                <h3 style={{ fontFamily: "var(--display)", fontSize: 21, color: "#08142A", fontWeight: 600, margin: "0 0 10px" }}>
                  Hiring kits &amp; rubrics
                </h3>
                <p style={{ fontSize: 14.5, color: "#475569", lineHeight: 1.6, margin: "0 0 20px" }}>
                  Complete attorney and paralegal interview kits, scoring rubrics, and customizable job descriptions.
                </p>
                <div style={{ background: "#FAF9F5", border: "1px solid #EAE7DC", borderRadius: 8, padding: "12px 14px", marginBottom: 20 }}>
                  <b style={{ display: "block", fontSize: 11, fontFamily: "var(--mono)", color: "#1D4ED8", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>
                    YOU GET
                  </b>
                  <span style={{ fontSize: 13, color: "#334155" }}>
                    Job posting template, screening questions, scoring rubric.
                  </span>
                </div>
              </div>
              <Link
                href="/hiring-kit/estate-planning-attorney"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "#1D4ED8",
                  color: "#FFFFFF",
                  padding: "12px 18px",
                  borderRadius: 7,
                  fontWeight: 600,
                  fontSize: 14,
                  textDecoration: "none",
                }}
              >
                <span>Access hiring kit</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. REVIEWS & TESTIMONIALS (HOMEPAGE-STYLE MIDNIGHT NAVY DARK SECTION AS REQUESTED) */}
      <section className="block reviews-sec" id="reviews">
        <div className="wrap">
          <div className="sec-head-premium">
            <div className="badge-capsule">
              <span className="badge-dot" />
              GOOGLE REVIEWS · VERIFIED CLIENTS &amp; CANDIDATES
            </div>
            <h2 className="sec-title-lg">
              What firms and candidates{" "}
              <span className="serif-accent">say</span>
            </h2>
            <div className="reviews-rating-pill">
              <RatingBadge link />
            </div>
          </div>

          <ReviewsSection kind="mixed" />

          {/* Bottom Reassurance & All Reviews Link */}
          <div className="reviews-bottom-bar">
            <div className="reviews-bottom-trust">
              <span className="reviews-bottom-dot" />
              <span>
                100% verified public Google reviews · Jon is named in <strong>{trust.jonNamed} of {trust.reviews}</strong> reviews
              </span>
            </div>
            <a
              href={trust.google}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-reviews-google"
            >
              <span>Read all {trust.reviews} reviews on Google</span>
              <svg aria-hidden="true" viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
                <path d="M10.3 3.3a1 1 0 0 1 1.4 0l6 6a1 1 0 0 1 0 1.4l-6 6a1 1 0 1 1-1.4-1.4l4.3-4.3H3a1 1 0 1 1 0-2h11.6l-4.3-4.3a1 1 0 0 1 0-1.4Z" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* 8. CANDIDATE CROSS-FUNNEL VALUE BAND */}
      <section style={{ background: "#FAF9F5", padding: "64px 0", borderBottom: "1px solid #EAE7DC" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
          <div>
            <span
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
      <section
        style={{
          background: "radial-gradient(ellipse 90% 80% at 50% -20%, rgba(29, 78, 216, 0.28) 0%, rgba(8, 20, 42, 0.98) 75%, #08142A 100%)",
          padding: "96px 0 108px",
          textAlign: "center",
          color: "#FFFFFF",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
          <div
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
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#60A5FA" }} />
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
                boxShadow: "0 8px 24px rgba(29, 78, 216, 0.35)",
              }}
            >
              <span>Find {city.name} candidates</span>
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/submit-job"
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
