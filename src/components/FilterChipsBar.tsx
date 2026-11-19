"use client";

import React from "react";

export interface FilterChipsState {
  mode: "all" | "on-site" | "hybrid";
  minPay: number | null; // e.g. 110, 130, 150 (in thousands)
  experience: "any" | "b1" | "b2" | "b3";
}

interface FilterChipsBarProps {
  filters: FilterChipsState;
  onChange: (filters: FilterChipsState) => void;
  totalCount: number;
  filteredCount: number;
}

export function FilterChipsBar({
  filters,
  onChange,
  totalCount,
  filteredCount,
}: FilterChipsBarProps) {
  const hasActiveFilters =
    filters.mode !== "all" || filters.minPay !== null || filters.experience !== "any";

  const handleModeToggle = (mode: "hybrid" | "on-site") => {
    onChange({
      ...filters,
      mode: filters.mode === mode ? "all" : mode,
    });
  };

  const handlePayToggle = (pay: number) => {
    onChange({
      ...filters,
      minPay: filters.minPay === pay ? null : pay,
    });
  };

  const handleExpToggle = (exp: "b2" | "b3") => {
    onChange({
      ...filters,
      experience: filters.experience === exp ? "any" : exp,
    });
  };

  const handleReset = () => {
    onChange({ mode: "all", minPay: null, experience: "any" });
  };

  // Mobile Dropdown Labels
  const modeLabel =
    filters.mode === "hybrid"
      ? "Hybrid"
      : filters.mode === "on-site"
      ? "On-site"
      : "Work mode";

  const payLabel =
    filters.minPay !== null
      ? `$${filters.minPay}k+`
      : "Pay";

  const expLabel =
    filters.experience === "b2"
      ? "4–7 yrs"
      : filters.experience === "b3"
      ? "8+ yrs"
      : "Experience";

  return (
    <div className="indeed-flat-filters-bar">
      {/* 1. DESKTOP FLAT CHIPS (100% UNTOUCHED ON DESKTOP) */}
      <div className="indeed-flat-chips desktop-filter-chips">
        {/* Work Mode Chips */}
        <button
          type="button"
          className={`flat-chip ${filters.mode === "hybrid" ? "active" : ""}`}
          onClick={() => handleModeToggle("hybrid")}
        >
          <span>Hybrid</span>
          <span className="chip-chevron">▾</span>
        </button>

        <button
          type="button"
          className={`flat-chip ${filters.mode === "on-site" ? "active" : ""}`}
          onClick={() => handleModeToggle("on-site")}
        >
          <span>On-site</span>
          <span className="chip-chevron">▾</span>
        </button>

        {/* Salary Chips */}
        <button
          type="button"
          className={`flat-chip ${filters.minPay === 110 ? "active" : ""}`}
          onClick={() => handlePayToggle(110)}
        >
          <span>$110k+</span>
          <span className="chip-chevron">▾</span>
        </button>

        <button
          type="button"
          className={`flat-chip ${filters.minPay === 130 ? "active" : ""}`}
          onClick={() => handlePayToggle(130)}
        >
          <span>$130k+</span>
          <span className="chip-chevron">▾</span>
        </button>

        <button
          type="button"
          className={`flat-chip ${filters.minPay === 150 ? "active" : ""}`}
          onClick={() => handlePayToggle(150)}
        >
          <span>$150k+</span>
          <span className="chip-chevron">▾</span>
        </button>

        {/* Experience Chips */}
        <button
          type="button"
          className={`flat-chip ${filters.experience === "b2" ? "active" : ""}`}
          onClick={() => handleExpToggle("b2")}
        >
          <span>4–7 yrs</span>
          <span className="chip-chevron">▾</span>
        </button>

        <button
          type="button"
          className={`flat-chip ${filters.experience === "b3" ? "active" : ""}`}
          onClick={() => handleExpToggle("b3")}
        >
          <span>8+ yrs</span>
          <span className="chip-chevron">▾</span>
        </button>

        {/* Reset Action */}
        {hasActiveFilters && (
          <button
            type="button"
            className="flat-chip chip-reset"
            onClick={handleReset}
          >
            Clear filters ×
          </button>
        )}
      </div>

      {/* 2. MOBILE DROPDOWN FILTERS (VISIBLE ONLY ON MOBILE) */}
      <div className="indeed-mobile-filter-dropdowns">
        {/* Work Mode Dropdown */}
        <div className={`mobile-filter-dropdown-pill ${filters.mode !== "all" ? "active" : ""}`}>
          <span className="pill-text">{modeLabel}</span>
          <span className="chip-chevron">▾</span>
          <select
            value={filters.mode}
            onChange={(e) =>
              onChange({
                ...filters,
                mode: e.target.value as "all" | "hybrid" | "on-site",
              })
            }
            aria-label="Filter by work mode"
          >
            <option value="all">Work mode: All</option>
            <option value="hybrid">Hybrid</option>
            <option value="on-site">On-site</option>
          </select>
        </div>

        {/* Pay Dropdown */}
        <div className={`mobile-filter-dropdown-pill ${filters.minPay !== null ? "active" : ""}`}>
          <span className="pill-text">{payLabel}</span>
          <span className="chip-chevron">▾</span>
          <select
            value={filters.minPay === null ? "all" : String(filters.minPay)}
            onChange={(e) =>
              onChange({
                ...filters,
                minPay: e.target.value === "all" ? null : Number(e.target.value),
              })
            }
            aria-label="Filter by pay"
          >
            <option value="all">Pay: All salaries</option>
            <option value="110">$110k+ / year</option>
            <option value="130">$130k+ / year</option>
            <option value="150">$150k+ / year</option>
          </select>
        </div>

        {/* Experience Dropdown */}
        <div className={`mobile-filter-dropdown-pill ${filters.experience !== "any" ? "active" : ""}`}>
          <span className="pill-text">{expLabel}</span>
          <span className="chip-chevron">▾</span>
          <select
            value={filters.experience}
            onChange={(e) =>
              onChange({
                ...filters,
                experience: e.target.value as "any" | "b2" | "b3",
              })
            }
            aria-label="Filter by experience"
          >
            <option value="any">Experience: All</option>
            <option value="b2">4–7 years</option>
            <option value="b3">8+ years</option>
          </select>
        </div>

        {/* Reset Action on Mobile */}
        {hasActiveFilters && (
          <button
            type="button"
            className="mobile-filter-clear-btn"
            onClick={handleReset}
            aria-label="Clear all active filters"
          >
            Clear ×
          </button>
        )}
      </div>

      {/* 3. DESKTOP STAT (HIDDEN ON MOBILE, VISIBLE ON DESKTOP) */}
      <div className="indeed-results-stat desktop-results-stat">
        Showing <b>{filteredCount}</b> of <b>{totalCount}</b> jobs
      </div>
    </div>
  );
}
