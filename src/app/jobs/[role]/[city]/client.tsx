"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  jobs,
  roles,
  cities,
  findCity,
  findRole,
  findBand,
  yearsRange,
  fmt,
  Job,
} from "@/data";
import { Breadcrumb } from "@/components/Breadcrumb";
import { TrustLine } from "@/components/Rating";
import { JobCard } from "@/components/JobCard";
import { GateForm } from "@/components/GateForm";
import { Mark } from "@/components/Mark";
import { Icon } from "@/components/icons";
import { IndeedTopSearchBar } from "@/components/IndeedTopSearchBar";
import { FilterChipsBar, FilterChipsState } from "@/components/FilterChipsBar";
import { JobDetailPane } from "@/components/JobDetailPane";

export default function JobsClient({
  roleParam,
  cityParam,
}: {
  roleParam: string;
  cityParam: string;
}) {
  const roleSlug = roleParam || "estate-planning-attorney";
  const citySlug = cityParam || "houston-tx";

  const role = findRole(roleSlug) || roles[0];
  const city = findCity(citySlug) || cities[0];

  const [filters, setFilters] = useState<FilterChipsState>({
    mode: "all",
    minPay: null,
    experience: "any",
  });

  const matchingJobs = useMemo(() => {
    return jobs
      .filter((j) => j.role === roleSlug && j.city === citySlug)
      .sort((a, b) => (a.posted < b.posted ? 1 : -1));
  }, [roleSlug, citySlug]);

  const lo = matchingJobs.length ? Math.min(...matchingJobs.map((j) => j.band[0])) : 90;
  const hi = matchingJobs.length ? Math.max(...matchingJobs.map((j) => j.band[1])) : 195;

  const filteredList = useMemo(() => {
    return matchingJobs.filter((j) => {
      // Work mode filter
      if (filters.mode !== "all" && j.mode !== filters.mode) {
        return false;
      }

      // Min pay filter
      if (filters.minPay !== null && j.band[1] < filters.minPay) {
        return false;
      }

      // Experience filter
      if (filters.experience !== "any") {
        const yr = yearsRange(j.years);
        if (filters.experience === "b1" && (yr[0] > 3 || yr[1] < 1)) return false;
        if (filters.experience === "b2" && (yr[1] < 4 || yr[0] > 7)) return false;
        if (filters.experience === "b3" && yr[1] < 8) return false;
      }

      return true;
    });
  }, [matchingJobs, filters]);

  // Selected job for master-detail preview
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  useEffect(() => {
    if (filteredList.length > 0) {
      if (!selectedJobId || !filteredList.some((j) => j.id === selectedJobId)) {
        setSelectedJobId(filteredList[0].id);
      }
    } else {
      setSelectedJobId(null);
    }
  }, [filteredList, selectedJobId]);

  const activeJob = useMemo(() => {
    return filteredList.find((j) => j.id === selectedJobId) || filteredList[0] || null;
  }, [filteredList, selectedJobId]);

  const handleSelectJob = (job: Job) => {
    setSelectedJobId(job.id);
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setMobileDrawerOpen(true);
    }
  };

  // Other roles and other cities
  const otherRoles = useMemo(() => {
    return roles
      .filter((r) => r.slug !== roleSlug)
      .map((r) => {
        const count = jobs.filter((j) => j.role === r.slug && j.city === citySlug).length;
        return { role: r, count };
      })
      .filter((x) => x.count > 0);
  }, [roleSlug, citySlug]);

  const otherCities = useMemo(() => {
    return cities
      .filter((c) => c.slug !== citySlug)
      .map((c) => {
        const count = jobs.filter((j) => j.role === roleSlug && j.city === c.slug).length;
        const b = findBand(c.slug, roleSlug);
        return { city: c, count, band: b };
      })
      .filter((x) => x.count > 0 || x.band)
      .slice(0, 6);
  }, [roleSlug, citySlug]);

  return (
    <div className="jobs-role-city-page">
      {/* 1. LUXURY MIDNIGHT NAVY HERO WITH SPLASH VIDEO & EMBEDDED SEARCH */}
      <section className="jobs-luxury-header-sec" aria-labelledby="jobs-feed-h1">
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

        <div className="wrap" style={{ position: "relative", zIndex: 3 }}>
          <div className="jobs-header-intro">
            <div className="badge-capsule">
              <span className="badge-dot" />
              <span>CONFIDENTIAL LEGAL SEARCH · 100% SALARY TRANSPARENCY</span>
            </div>

            <h1 id="jobs-feed-h1" className="jobs-header-title">
              {role.name} jobs in <span className="serif-accent">{city.name}</span>
            </h1>

            <p className="jobs-header-sub">
              Direct lateral openings at premier boutique and mid-size law firms. Verified pay bands and exact compensation disclosed on every seat.
            </p>
          </div>

          {/* Centered Luxury Indeed Search Bar */}
          <div className="indeed-top-search-form" style={{ maxWidth: 1040, margin: "0 auto" }}>
            <IndeedTopSearchBar
              initialQuery={role.name}
              initialLocation={`${city.name}, ${city.state}`}
            />
          </div>
        </div>
      </section>

      {/* 2. MASTER-DETAIL JOB STREAM */}
      <section className="block alt indeed-search-section" id="jobs-stream" style={{ background: "#FAF9F5", padding: "40px 0 80px" }}>
        <div className="wrap">
          {/* Header & Result Count */}
          <div className="indeed-clean-feed-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
            <div>
              <span style={{ fontSize: 13, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700 }}>
                ACTIVE LEGAL OPENINGS
              </span>
              <h2 style={{ fontFamily: "var(--display)", fontSize: 24, color: "#08142A", margin: "4px 0 0" }}>
                Confidential {role.short} positions in {city.name}
              </h2>
            </div>
            <span style={{ fontFamily: "var(--mono)", fontSize: 13, color: "#1D4ED8", fontWeight: 600 }}>
              Showing {filteredList.length} of {matchingJobs.length} verified seats
            </span>
          </div>

          {/* FLAT FILTER CHIPS */}
          <FilterChipsBar
            filters={filters}
            onChange={setFilters}
            totalCount={matchingJobs.length}
            filteredCount={filteredList.length}
          />

          {/* MASTER-DETAIL 2-COLUMN SPLIT */}
          <div className="indeed-split-grid" style={{ marginTop: 24 }}>
            {/* LEFT COLUMN: STREAM OF HOMEPAGE LUXURY JOB CARDS */}
            <div className="indeed-feed-column" aria-label="Job listings stream">
              {filteredList.length > 0 ? (
                <div className="indeed-card-stack" style={{ display: "grid", gap: 16 }}>
                  {filteredList.map((job) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      selected={activeJob?.id === job.id}
                      onSelect={handleSelectJob}
                    />
                  ))}
                </div>
              ) : (
                <div style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 14, padding: "48px 32px", textAlign: "center" }}>
                  <div style={{ width: 44, height: 44, margin: "0 auto 16px", color: "#64748B" }}>
                    <Icon name="search" className="empty-feed-ico" />
                  </div>
                  <h3 style={{ fontFamily: "var(--display)", fontSize: 20, color: "#08142A", margin: "0 0 8px" }}>
                    No open roles match this exact filter
                  </h3>
                  <p style={{ color: "#64748B", fontSize: 14, maxWidth: 420, margin: "0 auto 20px" }}>
                    Try expanding your salary expectation or experience filter to view additional seats, or set up a confidential alert below.
                  </p>
                  <button
                    type="button"
                    className="btn-emp-ghost"
                    style={{ color: "#08142A !important", borderColor: "#CBD5E1", padding: "10px 20px", fontSize: 14 }}
                    onClick={() =>
                      setFilters({ mode: "all", minPay: null, experience: "any" })
                    }
                  >
                    Reset all filters
                  </button>
                </div>
              )}

              <div style={{ marginTop: 28, background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 14, padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14 }}>
                <div>
                  <div style={{ fontWeight: 600, color: "#08142A", fontSize: 14.5 }}>
                    Not seeing your target firm or exact compensation?
                  </div>
                  <div style={{ fontSize: 12.5, color: "#64748B", marginTop: 2 }}>
                    Upload your resume for confidential off-market matching by Orion founder Justin.
                  </div>
                </div>
                <Link
                  className="btn-emp-primary"
                  style={{ padding: "10px 20px", fontSize: 13.5 }}
                  href={`/upload-resume#role=${roleSlug}&city=${citySlug}`}
                >
                  <span>Upload resume</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>

            {/* RIGHT COLUMN: STICKY LIVE DETAIL PANE */}
            <div className="indeed-detail-column" aria-label="Selected job details">
              <JobDetailPane job={activeJob} />
            </div>
          </div>

          {/* MOBILE SLIDE-OVER DRAWER FOR SCREENS < 1024px */}
          {mobileDrawerOpen && activeJob && (
            <div className="mobile-detail-overlay" onClick={() => setMobileDrawerOpen(false)}>
              <div
                className="mobile-detail-modal"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
              >
                <JobDetailPane
                  job={activeJob}
                  onCloseMobile={() => setMobileDrawerOpen(false)}
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 3. ALERTS SECTION */}
      <section className="emp-process-sec" id="alerts-block" style={{ background: "#FFFFFF", padding: "96px 0 108px", borderTop: "1px solid #E2E8F0" }}>
        <div className="wrap split">
          <div>
            <div className="sec-head">
              <span className="eyebrow" style={{ color: "#1D4ED8", fontWeight: 700 }}>CONFIDENTIAL MARKET ALERTS</span>
              <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(28px, 3.6vw, 40px)", color: "#08142A", margin: "10px 0 14px" }}>
                Be the first to hear of new {role.name} seats in {city.name}
              </h2>
              <p style={{ color: "#64748B", fontSize: 16 }}>
                Many boutique and mid-size law firms hire lateral talent without posting publicly. Receive confidential updates when seats fitting your criteria become available.
              </p>
            </div>
            <div style={{ display: "grid", gap: 14, marginTop: 28 }}>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ color: "#1D4ED8", fontWeight: 700 }}>✓</span>
                <span style={{ fontSize: 14, color: "#334155" }}>
                  <strong>Verified Compensation:</strong> Exact base pay band, expected bonus history, and billable requirement disclosed upfront.
                </span>
              </div>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ color: "#1D4ED8", fontWeight: 700 }}>✓</span>
                <span style={{ fontSize: 14, color: "#334155" }}>
                  <strong>Low Volume &amp; High Signal:</strong> Typically 2 to 4 curated openings per month. No spam, ever.
                </span>
              </div>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ color: "#1D4ED8", fontWeight: 700 }}>✓</span>
                <span style={{ fontSize: 14, color: "#334155" }}>
                  <strong>Strict Confidentiality:</strong> Your firm is never contacted, and you can unsubscribe in a single click.
                </span>
              </div>
            </div>
          </div>

          <div id="alerts">
            <GateForm
              eyebrow="JOB ALERTS"
              title={`${role.name} Roles in ${city.name}`}
              audience="candidate"
              button="Subscribe to confidential alerts"
              reviewSlug="n-brown"
              role={roleSlug}
              city={citySlug}
              fine="Always enter your personal email address. No employer sees your name without your prior authorization."
              steps={[
                ["Immediate Confirmation", `Job alert registered for ${role.name} seats in ${city.name}.`, true],
                ["As New Openings Arise", "You receive direct alerts with firm culture notes, practice dynamics, and verified base pay."],
                ["Before Any Interview", "Justin speaks with you directly to confirm mutual alignment before any materials are shared."],
                ["Total Freedom", "Unsubscribe or request data deletion anytime in one click."],
              ]}
            />
          </div>
        </div>
      </section>

      {/* 4. EXPLORE OTHER REGIONAL MARKETS & ROLES */}
      <section className="emp-process-sec" style={{ background: "#FAF9F5", padding: "96px 0 108px", borderTop: "1px solid #E2E8F0" }}>
        <div className="wrap">
          <div className="sec-head row" style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 40, flexWrap: "wrap", gap: 14 }}>
            <div>
              <span className="eyebrow" style={{ color: "#1D4ED8", fontWeight: 700 }}>RELATED MARKETS</span>
              <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(26px, 3.4vw, 38px)", color: "#08142A", margin: "8px 0 0" }}>
                Additional legal opportunities across Texas
              </h2>
            </div>
            <Link className="more link-arrow" href={`/salaries/${roleSlug}/${citySlug}`} style={{ fontSize: 14, fontWeight: 600, color: "#1D4ED8", textDecoration: "none" }}>
              <span>View {city.name} {role.short} Salary Guide</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="directory-sub-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 32 }}>
            <div style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 14, padding: "28px" }}>
              <h3 style={{ fontFamily: "var(--display)", fontSize: 19, color: "#08142A", margin: "0 0 18px", borderBottom: "1px solid #E2E8F0", paddingBottom: 10 }}>
                Other practice areas in {city.name}
              </h3>
              <ul className="directory-mini-list" style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 12 }}>
                {otherRoles.map(({ role: r, count }) => (
                  <li key={r.slug}>
                    <Link
                      href={`/jobs/${r.slug}/${citySlug}`}
                      style={{ display: "flex", justifyContent: "space-between", alignItems: "center", textDecoration: "none", color: "#08142A", fontSize: 14, padding: "6px 0", borderBottom: "1px solid #F1F5F9" }}
                    >
                      <span style={{ fontWeight: 500 }}>{r.name}</span>
                      <span style={{ fontFamily: "var(--mono)", fontSize: 12, fontWeight: 600, color: "#1D4ED8", background: "rgba(29, 78, 216, 0.08)", padding: "2px 8px", borderRadius: 999 }}>
                        {count} {count === 1 ? "seat" : "seats"}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 14, padding: "28px" }}>
              <h3 style={{ fontFamily: "var(--display)", fontSize: 19, color: "#08142A", margin: "0 0 18px", borderBottom: "1px solid #E2E8F0", paddingBottom: 10 }}>
                {role.name} in other Texas metros
              </h3>
              <ul className="directory-mini-list" style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 12 }}>
                {otherCities.map(({ city: c, count, band: b }) => (
                  <li key={c.slug}>
                    <Link
                      href={`/jobs/${roleSlug}/${c.slug}`}
                      style={{ display: "flex", justifyContent: "space-between", alignItems: "center", textDecoration: "none", color: "#08142A", fontSize: 14, padding: "6px 0", borderBottom: "1px solid #F1F5F9" }}
                    >
                      <span style={{ fontWeight: 500 }}>{c.name}, {c.state}</span>
                      <span style={{ fontFamily: "var(--mono)", fontSize: 12, fontWeight: 600, color: "#059669", background: "#ECFDF5", padding: "2px 8px", borderRadius: 999 }}>
                        {count > 0 ? `${count} open` : b ? fmt.range(b.b2) : "Explore"}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BOTTOM MIDNIGHT NAVY CTA */}
      <section className="emp-terms-dark-sec" style={{ background: "#08142A", padding: "100px 0 108px", textAlign: "center" }}>
        <div className="wrap" style={{ maxWidth: 760, margin: "0 auto" }}>
          <div className="badge-capsule" style={{ marginBottom: 18 }}>
            <span className="badge-dot" />
            <span>CONFIDENTIAL LATERAL INTAKE</span>
          </div>
          <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(32px, 4.2vw, 48px)", color: "#FFFFFF", margin: "0 0 16px" }}>
            Ready to explore verified legal roles in <span className="serif-accent" style={{ color: "#60A5FA" }}>{city.name}?</span>
          </h2>
          <p style={{ color: "#CBD5E1", fontSize: 17, lineHeight: 1.6, marginBottom: 32 }}>
            Upload your resume confidentially or speak directly with founder Justin to evaluate your market leverage.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            <Link href="/upload-resume" className="btn-emp-primary" style={{ padding: "14px 34px", fontSize: 16 }}>
              <span>Upload your resume</span>
              <span aria-hidden="true">→</span>
            </Link>
            <Link href="/salary-check" className="btn-emp-ghost" style={{ padding: "14px 34px", fontSize: 16 }}>
              <span>Check your market pay</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
