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
import { SearchHeroDual } from "@/components/SearchHeroDual";
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
      // If current selection is still in filteredList, keep it; otherwise pick first
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
    // On screens < 1024px, open mobile drawer
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
    <>
      <Breadcrumb
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Candidates", href: "/candidates" },
          { label: city.name, href: `/locations/texas/${city.slug.replace(/-[a-z]+$/, "")}` },
          { label: `${role.name} jobs`, current: true },
        ]}
      />

      {/* 1. HERO WITH DUAL SEARCH & RIGHT BAND-CARD */}
      <section className="phero jobs-hero">
        <div className="wrap">
          <div>
            <span className="eyebrow">
              Confidential Legal Jobs · {city.name}, {city.state} · employers kept confidential
            </span>
            <h1>
              {role.name} jobs in <span className="h1-accent">{city.name}</span>
            </h1>
            <p className="lede">
              Open roles at small and mid-size firms with verified base salary ranges.{" "}
              <b>No firm sees your name until you say yes.</b>
            </p>

            {/* DUAL WHAT & WHERE SEARCH BAR */}
            <div className="hero-search-wrapper">
              <SearchHeroDual
                currentRoleSlug={roleSlug}
                currentCitySlug={citySlug}
                buttonText="Find jobs"
              />
            </div>

            <TrustLine kind="candidate" />
          </div>

          {/* RESTORED ORIGINAL HERO BAND-CARD */}
          <div className="band-card">
            <h2 className="mini-h">Open now in {city.name}</h2>
            <div className="nums">
              <div>
                <div className="big-num" id="n-jobs">
                  <Mark>{String(matchingJobs.length)}</Mark>
                </div>
                <p className="big-num-l">open roles</p>
              </div>
              <div>
                <div className="big-num" id="pay-span">
                  <Mark>{fmt.range([lo, hi])}</Mark>
                </div>
                <p className="big-num-l">base pay range across them</p>
              </div>
            </div>
            <p className="card-foot" id="hero-foot">
              <Icon name="lock" className="ico" />
              <span>Employers named on your first call with Jon, before anything is sent</span>
            </p>
          </div>
        </div>
      </section>

      {/* 2. CLEAN INDEED-STYLE JOB STREAM */}
      <section className="block alt indeed-search-section" id="jobs-stream">
        <div className="wrap">
          <div className="indeed-clean-feed-header">
            <h2 className="indeed-clean-feed-title">
              Jobs in {city.name}
            </h2>
            <span className="indeed-clean-feed-count">
              Showing {filteredList.length} of {matchingJobs.length} {role.short} {filteredList.length === 1 ? "role" : "roles"}
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
          <div className="indeed-split-grid">
            {/* LEFT COLUMN: STREAM OF JOB CARDS (40% width) */}
            <div className="indeed-feed-column" aria-label="Job listings stream">
              {filteredList.length > 0 ? (
                <div className="indeed-card-stack">
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
                <div className="indeed-empty-feed">
                  <Icon name="search" className="empty-feed-ico" />
                  <h3>No open roles match this exact filter</h3>
                  <p className="muted">
                    Try broadening your salary threshold or experience filter to see more
                    seats, or set up a job alert below.
                  </p>
                  <button
                    type="button"
                    className="btn btn-outline btn-sm"
                    onClick={() =>
                      setFilters({ mode: "all", minPay: null, experience: "any" })
                    }
                  >
                    Reset all filters
                  </button>
                </div>
              )}

              <div className="indeed-feed-footer-cta">
                <Link
                  className="btn btn-ghost btn-sm"
                  href={`/upload-resume#role=${roleSlug}&city=${citySlug}`}
                >
                  <Icon name="upload" className="btn-ico-sm" />
                  <span>Am I a fit? Upload your resume</span>
                </Link>
                <span className="feed-footer-note">
                  Jon Missirlian compares your experience confidentially.
                </span>
              </div>
            </div>

            {/* RIGHT COLUMN: STICKY LIVE DETAIL PANE (60% width) */}
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
      <section className="block" id="alerts-block">
        <div className="wrap split">
          <div>
            <div className="sec-head">
              <span className="eyebrow">Confidential Job Alerts</span>
              <h2>Email me new roles like these</h2>
              <p>
                Many small firm seats are filled confidentially before ever being
                publicly advertised. Be first in line.
              </p>
            </div>
            <ul className="ticks">
              <li>Verified {role.name} roles in {city.name}</li>
              <li>Base salary range, firm size, and hybrid terms published upfront</li>
              <li>
                Low volume: usually <Mark>2 to 4 a month</Mark>. Unsubscribe anytime in one click.
              </li>
            </ul>
          </div>
          <div id="alerts">
            <GateForm
              eyebrow="Job alerts"
              title={`${role.name} roles, ${city.name}`}
              audience="candidate"
              button="Email me new roles"
              review="n-brown"
              role={roleSlug}
              city={citySlug}
              fine="Use a personal email, not your work one. No firm sees your name until you say yes."
              steps={[
                ["Now", `Alerts are active for ${role.name} roles in ${city.name}.`, true],
                [
                  "As roles open",
                  "Each new confidential seat with transparent pay and firm dynamics.",
                ],
                [
                  "When one fits",
                  "Reply directly. Jon speaks with you before anything is shared with a firm.",
                ],
                ["Any time", "Unsubscribe in one click, and your records are deleted."],
              ]}
            />
          </div>
        </div>
      </section>

      {/* 4. HOW APPLYING WORKS */}
      <section className="block alt">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Confidential Process</span>
            <h2>Nothing goes to a firm without your explicit permission</h2>
            <p>
              Your current employer will never know you are exploring the market.
            </p>
          </div>
          <ol className="steps-line three">
            <li>
              <span className="when">1. Submit Interest</span>
              <h3>Confidential Contact or Resume</h3>
              <p>Your submission is delivered exclusively to Jon Missirlian.</p>
            </li>
            <li>
              <span className="when">
                <Mark>Within 24 Hours</Mark>
              </span>
              <h3>Private Call with Jon</h3>
              <p>
                Learn exact firm identities, partner styles, caseloads, and bonus
                potential.
              </p>
            </li>
            <li>
              <span className="when">3. Your Call</span>
              <h3>Interview on Your Terms</h3>
              <p>
                Only firms you approve receive your resume. 100% free for candidates.
              </p>
            </li>
          </ol>
        </div>
      </section>

      {/* 5. EXPLORE DIRECTORY LINKS */}
      <section className="block">
        <div className="wrap">
          <div className="sec-head row">
            <div>
              <span className="eyebrow">Explore Markets</span>
              <h2>More legal jobs by practice area and metro</h2>
              <p>Explore compensation benchmarks across other key regions.</p>
            </div>
            <Link className="more link-arrow" href={`/salaries/${roleSlug}/${citySlug}`}>
              View {city.name} Salary Guide →
            </Link>
          </div>

          <div className="directory-sub-grid">
            <div>
              <h3 className="mini-h">Other roles in {city.name}</h3>
              <ul className="directory-mini-list">
                {otherRoles.map(({ role: r, count }) => (
                  <li key={r.slug}>
                    <Link href={`/jobs/${r.slug}/${citySlug}`} className="dir-link">
                      <span>{r.name}</span>
                      <span className="dir-count">{count}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mini-h">{role.name} in other cities</h3>
              <ul className="directory-mini-list">
                {otherCities.map(({ city: c, count, band: b }) => (
                  <li key={c.slug}>
                    <Link href={`/jobs/${roleSlug}/${c.slug}`} className="dir-link">
                      <span>{c.name}, {c.state}</span>
                      <span className="dir-count">
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
    </>
  );
}
