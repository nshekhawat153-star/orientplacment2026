import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  cities,
  findCity,
  matchCandidates,
  orionLine,
  asOf,
  source,
  jobs,
} from "@/data";
import { Breadcrumb } from "@/components/Breadcrumb";
import { TrustLine, CalendlyLink, RatingBadge } from "@/components/Rating";
import { CitySnapshot } from "@/components/CitySnapshot";
import { CandidateCard } from "@/components/CandidateCard";
import { CityPayTable } from "@/components/PayTables";
import { GateForm } from "@/components/GateForm";
import { ProcessSteps } from "@/components/ProcessSteps";
import { TermsTiles } from "@/components/TermsTiles";
import { ResourceCards } from "@/components/ResourceCards";
import { ReviewsSection } from "@/components/ReviewCard";
import { Mark } from "@/components/Mark";

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
    <div className="city-location-page">
      {/* 1. LUXURY HERO WITH VIDEO & REGIONAL SNAPSHOT */}
      <section className="emp-luxury-hero-sec city-location-hero" aria-labelledby="city-hero-h1">
        <div className="emp-hero-video-wrap" aria-hidden="true">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="emp-hero-video"
          >
            <source src="/media/splash.mp4" type="video/mp4" />
          </video>
          <div className="emp-hero-overlay" />
          <div className="emp-hero-glow" />
        </div>

        <div className="wrap emp-hero-content" style={{ maxWidth: 900 }}>
          <div className="emp-hero-badge-wrap">
            <div className="badge-capsule">
              <span className="badge-dot" />
              <span>REGIONAL LEGAL SEARCH · {city.name.toUpperCase()}, {city.stateName.toUpperCase()}</span>
            </div>
          </div>

          <h1 id="city-hero-h1" className="emp-hero-h1">
            Legal recruiters in <span className="serif-accent">{city.name}</span>
          </h1>

          <p className="emp-hero-lead">
            Screened {city.name} attorneys and paralegals available for confidential interviews. Verified local law firm compensation data, and one fee only if you hire.
          </p>

          <div className="emp-reassurance-row" style={{ marginBottom: 32 }}>
            <div className="emp-reassurance-item">
              <span className="check" aria-hidden="true">✓</span>
              <span>Pre-screened {city.name} talent pool</span>
            </div>
            <div className="emp-reassurance-item">
              <span className="check" aria-hidden="true">✓</span>
              <span>23% fee due only if you hire</span>
            </div>
            <div className="emp-reassurance-item">
              <span className="check" aria-hidden="true">✓</span>
              <span>90-day replacement warranty</span>
            </div>
          </div>

          <div className="emp-hero-actions">
            <Link
              className="btn-emp-primary"
              href={`/find-candidates#city=${city.slug}`}
            >
              <span>See {city.name} candidates</span>
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              className="btn-emp-ghost"
              href={`/jobs/estate-planning-attorney/${city.slug}`}
            >
              <span>Browse {city.name} legal jobs ({cityJobsCount})</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          {/* Elevated City Snapshot Card */}
          <div style={{ marginTop: 24, background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 14, padding: "28px", boxShadow: "0 20px 48px -12px rgba(0, 0, 0, 0.45)", color: "#08142A", textAlign: "left" }}>
            <CitySnapshot citySlug={city.slug} />
          </div>
        </div>
      </section>

      {/* 2. AVAILABLE CANDIDATES IN METRO */}
      <section className="emp-process-sec" id="candidates" style={{ background: "#FAF9F5", padding: "96px 0 108px", borderBottom: "1px solid #EAE7DC" }}>
        <div className="wrap">
          <div className="sec-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 36, flexWrap: "wrap", gap: 14 }}>
            <div>
              <span className="eyebrow" style={{ color: "#1D4ED8", fontWeight: 700 }}>ACTIVE {city.name.toUpperCase()} TALENT</span>
              <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(26px, 3.4vw, 38px)", color: "#08142A", margin: "8px 0 0" }}>
                Pre-screened candidates open to {city.name} seats
              </h2>
            </div>
            <Link
              className="more link-arrow hide-sm"
              href={`/find-candidates#city=${city.slug}`}
              style={{ fontSize: 14, fontWeight: 600, color: "#1D4ED8", textDecoration: "none" }}
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
      <section className="emp-process-sec" id="pay" style={{ background: "#FFFFFF", padding: "96px 0 108px" }}>
        <div className="wrap">
          <div className="sec-head" style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 48px" }}>
            <span className="eyebrow" style={{ color: "#1D4ED8", fontWeight: 700 }}>COMPENSATION INTELLIGENCE</span>
            <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(28px, 3.6vw, 42px)", color: "#08142A", margin: "10px 0 14px" }}>
              What law firms pay in {city.name}
            </h2>
            <p style={{ color: "#64748B", fontSize: 16 }}>
              Base compensation by practice area. Select any role to view detailed experience tiers and matching candidate expectations.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.25fr) minmax(320px, 1fr)", gap: 40, alignItems: "start" }}>
            <div style={{ background: "#F8FAFC", border: "1.5px solid #E2E8F0", borderRadius: 14, padding: "28px" }}>
              <CityPayTable citySlug={city.slug} />
              <p style={{ fontSize: 12.5, color: "#64748B", marginTop: 20, paddingTop: 14, borderTop: "1px solid #E2E8F0" }}>
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
      <section className="emp-process-sec" style={{ background: "#FAF9F5", padding: "96px 0 108px", borderTop: "1px solid #E2E8F0", borderBottom: "1px solid #EAE7DC" }}>
        <div className="wrap">
          <div className="sec-head" style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 48px" }}>
            <span className="eyebrow" style={{ color: "#1D4ED8", fontWeight: 700 }}>SEARCH WORKFLOW</span>
            <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(28px, 3.6vw, 42px)", color: "#08142A", margin: "10px 0 14px" }}>
              From open seat to shortlist in days
            </h2>
            <p style={{ color: "#64748B", fontSize: 16 }}>
              The proven 3-step intake workflow for every {city.name} opening, from senior litigation associate to boutique paralegal.
            </p>
          </div>
          <ProcessSteps />
        </div>
      </section>

      {/* 5. TERMS TILES & RISK-FREE WARRANTY */}
      <section className="emp-process-sec" style={{ background: "#FFFFFF", padding: "96px 0 108px" }}>
        <div className="wrap">
          <div className="sec-head" style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 48px" }}>
            <span className="eyebrow" style={{ color: "#1D4ED8", fontWeight: 700 }}>ORION PLACEMENT TERMS</span>
            <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(28px, 3.6vw, 42px)", color: "#08142A", margin: "10px 0 14px" }}>
              One fee, and only if you hire
            </h2>
            <p style={{ color: "#64748B", fontSize: 16 }}>
              {city.name} firms pay the standard 23% contingency fee. Zero upfront retainer.
            </p>
          </div>
          <TermsTiles />
        </div>
      </section>

      {/* 6. HIRING TOOLS FOR CITY */}
      <section className="emp-process-sec" style={{ background: "#FAF9F5", padding: "96px 0 108px", borderTop: "1px solid #E2E8F0", borderBottom: "1px solid #EAE7DC" }}>
        <div className="wrap">
          <div className="sec-head" style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 48px" }}>
            <span className="eyebrow" style={{ color: "#1D4ED8", fontWeight: 700 }}>FREE FIRM RESOURCES</span>
            <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(28px, 3.6vw, 42px)", color: "#08142A", margin: "10px 0 14px" }}>
              Hiring in {city.name} on your own
            </h2>
            <p style={{ color: "#64748B", fontSize: 16 }}>
              Where to post job listings, law school talent pipelines, and customizable job description templates.
            </p>
          </div>
          <ResourceCards setType="city" />
        </div>
      </section>

      {/* 7. REVIEWS & TESTIMONIALS */}
      <section className="emp-process-sec" style={{ background: "#FFFFFF", padding: "96px 0 108px" }}>
        <div className="wrap">
          <div className="sec-head row" style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 40, flexWrap: "wrap", gap: 14 }}>
            <div>
              <span className="eyebrow" style={{ color: "#1D4ED8", fontWeight: 700 }}>CLIENT REVIEWS</span>
              <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(26px, 3.4vw, 38px)", color: "#08142A", margin: "8px 0 0" }}>
                What law firms say about Orion
              </h2>
            </div>
            <RatingBadge link={true} />
          </div>
          <ReviewsSection kind="mixed" limit={3} />
        </div>
      </section>

      {/* 8. CANDIDATE CROSS-FUNNEL VALUE BAND */}
      <section className="emp-process-sec" style={{ background: "#FAF9F5", padding: "64px 0", borderTop: "1px solid #E2E8F0", borderBottom: "1px solid #EAE7DC" }}>
        <div className="wrap" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
          <div>
            <span className="eyebrow" style={{ color: "#1D4ED8", fontWeight: 700 }}>LOOKING FOR A ROLE IN {city.name.toUpperCase()}?</span>
            <h3 style={{ fontFamily: "var(--display)", fontSize: 26, color: "#08142A", margin: "6px 0 8px" }}>
              Confidential {city.name} roles with salary disclosed
            </h3>
            <p style={{ color: "#64748B", fontSize: 15, margin: 0 }}>
              {cityJobsCount} openings currently active in {city.name}. No firm sees your name until you say yes.
            </p>
          </div>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link className="btn-emp-primary" href={`/jobs/estate-planning-attorney/${city.slug}`}>
              <span>View {city.name} jobs</span>
              <span aria-hidden="true">→</span>
            </Link>
            <Link className="btn-emp-ghost" href="/upload-resume" style={{ color: "#08142A !important", borderColor: "#CBD5E1" }}>
              <span>Upload resume</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 9. BOTTOM MIDNIGHT NAVY CTA */}
      <section className="emp-terms-dark-sec" style={{ background: "#08142A", padding: "100px 0 108px", textAlign: "center" }}>
        <div className="wrap" style={{ maxWidth: 760, margin: "0 auto" }}>
          <div className="badge-capsule" style={{ marginBottom: 18 }}>
            <span className="badge-dot" />
            <span>EXECUTIVE LEGAL PLACEMENT</span>
          </div>
          <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(32px, 4.2vw, 48px)", color: "#FFFFFF", margin: "0 0 16px" }}>
            Hire qualified attorneys and paralegals in <span className="serif-accent" style={{ color: "#60A5FA" }}>{city.name}</span>
          </h2>
          <p style={{ color: "#CBD5E1", fontSize: 17, lineHeight: 1.6, marginBottom: 32 }}>
            Access vetted candidate dossiers or schedule a confidential 15-minute search consultation with founder Justin.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            <Link href={`/find-candidates#city=${city.slug}`} className="btn-emp-primary" style={{ padding: "14px 34px", fontSize: 16 }}>
              <span>Find {city.name} candidates</span>
              <span aria-hidden="true">→</span>
            </Link>
            <Link href="/submit-job" className="btn-emp-ghost" style={{ padding: "14px 34px", fontSize: 16 }}>
              <span>Submit a mandate</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
