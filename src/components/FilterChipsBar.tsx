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

  return (
    <div className="indeed-flat-filters-bar">
      <div className="indeed-flat-chips">
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

      <div className="indeed-results-stat">
        Showing <b>{filteredCount}</b> of <b>{totalCount}</b> jobs
      </div>
    </div>
  );
}
