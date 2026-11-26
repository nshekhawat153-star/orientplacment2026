"use client";

import React, { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import "./jobs-redesign.css";
import { jobs, Job, cities, trust } from "@/data";
import { JobListCard } from "./components/JobListCard";
import { JobSeatPane } from "./components/JobSeatPane";
import { EXP_FILTERS, ExpFilter, matchesExp, matchesLocation, matchesQuery } from "./components/jobUtils";

const PAGE = 10;

type ModeFilter = "all" | "on-site" | "hybrid";
type SortBy = "relevance" | "date" | "pay";

// Markets that actually have open seats, with counts (for the quick chips)
const MARKETS = cities
  .map((c) => ({ name: c.name, n: jobs.filter((j) => j.city === c.slug).length }))
  .filter((m) => m.n > 0);

const POPULAR = ["Estate planning", "Litigation", "Real estate", "Paralegal"];

const Caret = () => (
  <svg className="jb-caret" viewBox="0 0 12 12" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="2.5 4.5 6 8 9.5 4.5" />
  </svg>
);

const Check = () => (
  <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="3.5 8.5 6.5 11.5 12.5 4.5" />
  </svg>
);

// Reads ?q= &l= &job= in its own Suspense boundary so the page itself prerenders as static HTML.
function ParamsReader({ onParams }: { onParams: (q: string, l: string, job: string | null) => void }) {
  const sp = useSearchParams();
  useEffect(() => {
    onParams(sp.get("q") || "", sp.get("l") || "", sp.get("job"));
  }, [sp, onParams]);
  return null;
}

export function JobsSearchClient() {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [qInput, setQInput] = useState("");
  const [lInput, setLInput] = useState("");

  const [mode, setMode] = useState<ModeFilter>("all");
  const [minPay, setMinPay] = useState<number | null>(null);
  const [exp, setExp] = useState<ExpFilter>("any");
  const [sortBy, setSortBy] = useState<SortBy>("relevance");
  const [visible, setVisible] = useState(PAGE);

  const [activeId, setActiveId] = useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const onParams = useCallback((q: string, l: string, job: string | null) => {
    setQuery(q);
    setLocation(l);
    setQInput(q);
    setLInput(l);
    setVisible(PAGE);
    if (job && jobs.some((j) => j.id === job)) setActiveId(job);
  }, []);

  const pushSearch = (q: string, l: string) => {
    setQuery(q);
    setLocation(l);
    setQInput(q);
    setLInput(l);
    setVisible(PAGE);
    const p = new URLSearchParams();
    if (q) p.set("q", q);
    if (l) p.set("l", l);
    const qs = p.toString();
    router.push(qs ? `/jobs?${qs}` : "/jobs", { scroll: false });
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    pushSearch(qInput.trim(), lInput.trim());
    window.setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
  };

  const clearAll = () => {
    setMode("all");
    setMinPay(null);
    setExp("any");
    pushSearch("", "");
  };

  // 1. text search
  const searched = useMemo(
    () => jobs.filter((j) => matchesQuery(j, query) && matchesLocation(j, location)),
    [query, location]
  );

  // 2. filters + sort
  const filtered = useMemo(() => {
    const list = searched.filter(
      (j) => (mode === "all" || j.mode === mode) && (minPay === null || j.band[1] >= minPay) && matchesExp(j, exp)
    );
    if (sortBy === "date") list.sort((a, b) => b.posted.localeCompare(a.posted));
    if (sortBy === "pay") list.sort((a, b) => b.band[1] - a.band[1]);
    return list;
  }, [searched, mode, minPay, exp, sortBy]);

  // a deep-linked job further down the list stays visible
  const activeIdx = activeId ? filtered.findIndex((j) => j.id === activeId) : -1;
  const shownCount = Math.max(visible, activeIdx >= 0 ? Math.ceil((activeIdx + 1) / PAGE) * PAGE : 0);
  const shown = filtered.slice(0, shownCount);
  const active: Job | null = filtered.find((j) => j.id === activeId) || filtered[0] || null;

  // lock page scroll while the mobile sheet is open; Escape closes it
  useEffect(() => {
    if (!sheetOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSheetOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setSheetOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [sheetOpen]);

  const select = (j: Job) => {
    setActiveId(j.id);
    if (window.innerWidth < 1024) setSheetOpen(true);
  };

  const activeFilters = (mode !== "all" ? 1 : 0) + (minPay !== null ? 1 : 0) + (exp !== "any" ? 1 : 0);
  const hasSearch = !!(query || location);

  const heading = query
    ? `${query.charAt(0).toUpperCase()}${query.slice(1)} jobs${location ? ` in ${location}` : ""}`
    : location
      ? `Legal jobs in ${location}`
      : "All open seats";

  return (
    <div className="jb">
      <Suspense fallback={null}>
        <ParamsReader onParams={onParams} />
      </Suspense>

      {/* HERO + SEARCH */}
      <section className="jb-hero" aria-labelledby="jb-h1">
        <div className="jb-hero-wrap">
          <p className="jb-eyebrow">
            <span aria-hidden="true" />
            {jobs.length} open seats · Pay shown on every one
          </p>
          <h1 id="jb-h1" className="jb-h1">
            Legal jobs in Texas, <em>with the pay up front.</em>
          </h1>
          <p className="jb-lead">
            Lateral seats at boutique and mid-size firms. Every seat is screened by Justin and your name stays private
            until you say yes.
          </p>

          <form className="jb-search" role="search" aria-label="Search jobs" onSubmit={submit}>
            <label className="jb-field">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" />
              </svg>
              <span className="jb-sr">Job title or practice</span>
              <input
                type="text"
                value={qInput}
                onChange={(e) => setQInput(e.target.value)}
                placeholder="Job title or practice area"
              />
              {qInput && (
                <button type="button" className="jb-x" aria-label="Clear job title" onClick={() => pushSearch("", location)}>
                  ×
                </button>
              )}
            </label>
            <span className="jb-divider" aria-hidden="true" />
            <label className="jb-field">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span className="jb-sr">City</span>
              <input
                type="text"
                value={lInput}
                onChange={(e) => setLInput(e.target.value)}
                placeholder="City, e.g. Houston"
                list="jb-cities"
              />
              <datalist id="jb-cities">
                {MARKETS.map((m) => (
                  <option key={m.name} value={m.name} />
                ))}
              </datalist>
              {lInput && (
                <button type="button" className="jb-x" aria-label="Clear city" onClick={() => pushSearch(query, "")}>
                  ×
                </button>
              )}
            </label>
            <button type="submit" className="jb-go">
              Find jobs
            </button>
          </form>

          <div className="jb-quick" aria-label="Quick searches">
            {MARKETS.map((m) => (
              <button
                key={m.name}
                type="button"
                className={`jb-qchip${location.toLowerCase() === m.name.toLowerCase() ? " is-on" : ""}`}
                onClick={() => pushSearch(query, location.toLowerCase() === m.name.toLowerCase() ? "" : m.name)}
              >
                {m.name} <small>{m.n}</small>
              </button>
            ))}
            <span className="jb-quick-sep" aria-hidden="true" />
            {POPULAR.map((p) => (
              <button
                key={p}
                type="button"
                className={`jb-qchip${query.toLowerCase() === p.toLowerCase() ? " is-on" : ""}`}
                onClick={() => pushSearch(query.toLowerCase() === p.toLowerCase() ? "" : p, location)}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section className="jb-results" id="results" aria-labelledby="jb-h2">
        <div className="jb-wrap" ref={resultsRef}>
          {/* toolbar */}
          <div className="jb-bar">
            <div className="jb-bar-head">
              <div>
                <h2 id="jb-h2" className="jb-h2">
                  {heading}
                </h2>
                <p className="jb-count">
                  <b>{filtered.length}</b> of {jobs.length} seats
                  {(hasSearch || activeFilters > 0) && (
                    <button type="button" className="jb-clear" onClick={clearAll}>
                      Clear all
                    </button>
                  )}
                </p>
              </div>
            </div>
            <div className="jb-filters" role="group" aria-label="Filter jobs">
              <label className={`jb-f${mode !== "all" ? " is-set" : ""}`}>
                <span className="jb-f-k">Office</span>
                <span className="jb-f-v">
                  <select value={mode} onChange={(e) => {
                      setMode(e.target.value as ModeFilter);
                      setVisible(PAGE);
                    }} aria-label="Office">
                    <option value="all">Any office</option>
                    <option value="on-site">On-site</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                  <Caret />
                </span>
              </label>
              <label className={`jb-f${minPay !== null ? " is-set" : ""}`}>
                <span className="jb-f-k">Base pay</span>
                <span className="jb-f-v">
                  <select
                    value={minPay === null ? "any" : String(minPay)}
                    onChange={(e) => {
                      setMinPay(e.target.value === "any" ? null : Number(e.target.value));
                      setVisible(PAGE);
                    }}
                    aria-label="Base pay"
                  >
                    <option value="any">Any pay</option>
                    <option value="110">$110k+</option>
                    <option value="130">$130k+</option>
                    <option value="150">$150k+</option>
                  </select>
                  <Caret />
                </span>
              </label>
              <label className={`jb-f${exp !== "any" ? " is-set" : ""}`}>
                <span className="jb-f-k">Experience asked</span>
                <span className="jb-f-v">
                  <select value={exp} onChange={(e) => {
                      setExp(e.target.value as ExpFilter);
                      setVisible(PAGE);
                    }} aria-label="Experience asked">
                    {EXP_FILTERS.map((o) => (
                      <option key={o.id} value={o.id}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                  <Caret />
                </span>
              </label>
              <label className={`jb-f${sortBy !== "relevance" ? " is-set" : ""}`}>
                <span className="jb-f-k">Sort by</span>
                <span className="jb-f-v">
                  <select value={sortBy} onChange={(e) => {
                      setSortBy(e.target.value as SortBy);
                      setVisible(PAGE);
                    }} aria-label="Sort by">
                    <option value="relevance">Relevance</option>
                    <option value="date">Newest first</option>
                    <option value="pay">Highest pay</option>
                  </select>
                  <Caret />
                </span>
              </label>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="jb-empty">
              <h3>No seat matches that search yet.</h3>
              <p>New seats come in every week. Upload your resume once and Justin will reach out when one fits.</p>
              <div className="jb-empty-actions">
                <button type="button" className="jb-btn is-dark" onClick={clearAll}>
                  See all {jobs.length} seats
                </button>
                <Link href="/upload-resume" className="jb-btn is-line">
                  Upload resume
                </Link>
              </div>
            </div>
          ) : (
            <div className="jb-split">
              <div className="jb-list">
                {shown.map((j) => (
                  <JobListCard key={j.id} job={j} selected={active?.id === j.id} onSelect={select} />
                ))}

                {filtered.length > shownCount && (
                  <button type="button" className="jb-more" onClick={() => setVisible(shownCount + PAGE)}>
                    Show {Math.min(PAGE, filtered.length - shownCount)} more seats
                    <span>
                      {shownCount} of {filtered.length}
                    </span>
                  </button>
                )}

                <div className="jb-listnote">
                  <p>
                    <b>No firm sees your name until you say yes.</b> Every seat is screened and the pay range is confirmed
                    with the firm.
                  </p>
                  <Link href="/upload-resume">Upload resume for confidential matching →</Link>
                </div>
              </div>

              <div className="jb-pane">{active && <JobSeatPane key={active.id} job={active} />}</div>
            </div>
          )}
        </div>
      </section>

      {/* CLOSING */}
      <section className="jb-closing" aria-labelledby="jb-cl-h">
        <div className="jb-wrap">
          <div className="jb-cl-card">
            <div className="jb-cl-copy">
              <span className="jb-cl-k">Confidential matching</span>
              <h2 id="jb-cl-h">
                Don’t see the right seat? <em>Let Justin bring it to you.</em>
              </h2>
              <ul>
                <li>
                  <Check /> Your current firm is never contacted
                </li>
                <li>
                  <Check /> Free for candidates, always
                </li>
                <li>
                  <Check /> {trust.rating} on Google, {trust.reviews} reviews
                </li>
              </ul>
            </div>
            <div className="jb-cl-actions">
              <Link href="/upload-resume" className="jb-btn is-primary">
                Upload your resume
              </Link>
              <Link href="/salary-check" className="jb-btn is-ghost">
                Check your salary
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* MOBILE SHEET */}
      {sheetOpen && active && (
        <div className="jb-sheet" role="dialog" aria-modal="true" aria-label={active.title}>
          <JobSeatPane key={active.id} job={active} onClose={() => setSheetOpen(false)} />
        </div>
      )}
    </div>
  );
}
