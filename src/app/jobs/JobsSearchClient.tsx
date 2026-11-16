"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { jobs, Job, findCity, findRole, fmt } from "@/data";
import { IndeedTopSearchBar } from "@/components/IndeedTopSearchBar";
import { FilterChipsBar, FilterChipsState } from "@/components/FilterChipsBar";
import { JobCard } from "@/components/JobCard";
import { JobDetailPane } from "@/components/JobDetailPane";
import { Mark } from "@/components/Mark";
import Link from "next/link";

export function JobsSearchClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const queryParam = searchParams.get("q") || "";
  const locationParam = searchParams.get("l") || "";

  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [searchLocation, setSearchLocation] = useState(locationParam);
  const [sortBy, setSortBy] = useState<"relevance" | "date">("relevance");

  const [filters, setFilters] = useState<FilterChipsState>({
    mode: "all",
    minPay: null,
    experience: "any",
  });

  const [activeJobId, setActiveJobId] = useState<string | null>(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  useEffect(() => {
    setSearchQuery(queryParam);
    setSearchLocation(locationParam);
  }, [queryParam, locationParam]);

  const handleSearch = (q: string, l: string) => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (l) params.set("l", l);
    router.push(`/jobs?${params.toString()}`);
  };

  // 1. FILTER BY QUERY & LOCATION
  const matchingJobs = useMemo(() => {
    let list = [...jobs];

    const q = searchQuery.toLowerCase().trim();
    if (q) {
      list = list.filter((j) => {
        const titleMatch = j.title.toLowerCase().includes(q);
        const mixMatch = j.mix.toLowerCase().includes(q);
        const roleMatch = j.role.toLowerCase().includes(q);
        const firmMatch = j.firmType.toLowerCase().includes(q);
        return titleMatch || mixMatch || roleMatch || firmMatch;
      });
    }

    const loc = searchLocation.toLowerCase().trim();
    if (loc) {
      list = list.filter((j) => {
        const cityObj = findCity(j.city);
        const cityName = cityObj ? cityObj.name.toLowerCase() : "";
        const citySlug = j.city.toLowerCase();
        const areaName = j.area.toLowerCase();
        return (
          cityName.includes(loc) ||
          citySlug.includes(loc) ||
          areaName.includes(loc) ||
          (loc.includes("remote") && j.mode === "hybrid")
        );
      });
    }

    return list;
  }, [searchQuery, searchLocation]);

  // 2. APPLY FILTER PILLS
  const filteredJobs = useMemo(() => {
    let list = [...matchingJobs];

    if (filters.mode !== "all") {
      list = list.filter((j) => j.mode === filters.mode);
    }

    if (filters.minPay !== null) {
      list = list.filter((j) => j.band[1] >= filters.minPay!);
    }

    if (filters.experience !== "any") {
      if (filters.experience === "b1") {
        list = list.filter((j) => j.years.includes("1–3") || j.years.includes("2–4") || j.years.includes("2–5"));
      } else if (filters.experience === "b2") {
        list = list.filter((j) => j.years.includes("3–6") || j.years.includes("4–7") || j.years.includes("4–8") || j.years.includes("5–8"));
      } else if (filters.experience === "b3") {
        list = list.filter((j) => j.years.includes("6–10") || j.years.includes("7+") || j.years.includes("8+"));
      }
    }

    if (sortBy === "date") {
      list.sort((a, b) => new Date(b.posted).getTime() - new Date(a.posted).getTime());
    }

    return list;
  }, [matchingJobs, filters, sortBy]);

  // Sync active job
  useEffect(() => {
    if (filteredJobs.length > 0) {
      if (!activeJobId || !filteredJobs.some((j) => j.id === activeJobId)) {
        setActiveJobId(filteredJobs[0].id);
      }
    } else {
      setActiveJobId(null);
    }
  }, [filteredJobs, activeJobId]);

  const activeJob = useMemo(() => {
    return filteredJobs.find((j) => j.id === activeJobId) || filteredJobs[0] || null;
  }, [filteredJobs, activeJobId]);

  const handleSelectJob = (job: Job) => {
    setActiveJobId(job.id);
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setMobileDrawerOpen(true);
    }
  };

  const titleText = searchQuery
    ? `${searchQuery} jobs`
    : searchLocation
    ? `Legal jobs in ${searchLocation}`
    : "Confidential Legal Jobs in Texas";

  return (
    <div className="indeed-search-portal-page">
      {/* 1. LUXURY TOP SEARCH HEADER BANNER */}
      <section className="jobs-luxury-header-sec">
        <div className="wrap">
          <div className="jobs-header-intro">
            <div className="badge-capsule">
              <span className="badge-dot" />
              CONFIDENTIAL LEGAL SEARCH · 100% SALARY TRANSPARENCY
            </div>
            <h1 className="jobs-header-title">
              Legal jobs in <span className="serif-accent">Texas</span>
            </h1>
            <p className="jobs-header-sub">
              Direct lateral openings at premier boutique and mid-size law firms. Verified pay bands and exact compensation disclosed on every seat.
            </p>
          </div>

          <IndeedTopSearchBar
            initialQuery={searchQuery}
            initialLocation={searchLocation}
            onSearch={handleSearch}
          />
        </div>
      </section>

      {/* 2. FILTER PILLS BAR */}
      <section className="indeed-filter-pills-section">
        <div className="wrap">
          <FilterChipsBar
            filters={filters}
            onChange={setFilters}
            totalCount={matchingJobs.length}
            filteredCount={filteredJobs.length}
          />
        </div>
      </section>

      {/* 3. MAIN JOB STREAM CONTAINER */}
      <main className="indeed-results-section" id="results">
        <div className="wrap">
          {/* SUBHEAD LINE (EXACTLY MATCHING INDEED SCREENSHOT) */}
          <div className="indeed-results-head-row">
            <div className="indeed-head-left">
              <h1 className="indeed-head-title">
                {titleText} {searchLocation && !searchQuery ? "" : searchLocation ? `in ${searchLocation}` : ""}
              </h1>
              <span className="indeed-info-icon" title="Verified employer salaries" aria-label="Verified salaries">
                ⓘ
              </span>
            </div>

            <div className="indeed-sort-row">
              <span className="sort-label">Sort by: </span>
              <button
                type="button"
                className={`sort-link ${sortBy === "relevance" ? "active" : ""}`}
                onClick={() => setSortBy("relevance")}
              >
                relevance
              </button>
              <span className="sort-sep">-</span>
              <button
                type="button"
                className={`sort-link ${sortBy === "date" ? "active" : ""}`}
                onClick={() => setSortBy("date")}
              >
                date
              </button>
            </div>
          </div>

          {/* RESULTS SPLIT OR EMPTY STATE */}
          {filteredJobs.length === 0 ? (
            <div className="indeed-empty-search-state">
              <div className="empty-box">
                <h3>No jobs found matching your criteria</h3>
                <p>
                  Try widening your search terms, clearing filters, or searching for &ldquo;Austin&rdquo;, &ldquo;Houston&rdquo;, or &ldquo;Estate Planning&rdquo;.
                </p>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    setFilters({ mode: "all", minPay: null, experience: "any" });
                    setSearchQuery("");
                    setSearchLocation("");
                    router.push("/jobs");
                  }}
                >
                  View all open positions
                </button>
              </div>
            </div>
          ) : (
            <div className="indeed-split-grid">
              {/* LEFT FEED COLUMN */}
              <div className="indeed-feed-column">
                <div className="indeed-card-stack">
                  {filteredJobs.map((j) => (
                    <JobCard
                      key={j.id}
                      job={j}
                      selected={activeJob?.id === j.id}
                      onSelect={handleSelectJob}
                    />
                  ))}
                </div>

                <div className="indeed-feed-footer-card">
                  <p className="feed-footer-p">
                    <b>No firm sees your name until you say yes.</b> All seats are screened with confirmed compensation ranges.
                  </p>
                  <Link href="/upload-resume" className="btn btn-line btn-sm">
                    Upload resume for confidential matching
                  </Link>
                </div>
              </div>

              {/* RIGHT STICKY DETAIL PANE */}
              <div className="indeed-detail-column">
                <JobDetailPane
                  job={activeJob}
                  onCloseMobile={() => setMobileDrawerOpen(false)}
                />
              </div>
            </div>
          )}

          {/* MOBILE DRAWER */}
          {mobileDrawerOpen && activeJob && (
            <div
              className="mobile-detail-overlay"
              onClick={() => setMobileDrawerOpen(false)}
            >
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
      </main>
    </div>
  );
}

