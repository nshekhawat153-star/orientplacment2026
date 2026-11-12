"use client";

import React from "react";
import { Icon } from "./icons";

export interface FilterChipsState {
  mode: "all" | "on-site" | "hybrid";
  minPay: number | null; // e.g. 100, 125, 150 (in thousands)
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

  const handleModeChange = (mode: "all" | "on-site" | "hybrid") => {
    onChange({ ...filters, mode });
  };

  const handlePayChange = (minPay: number | null) => {
    onChange({ ...filters, minPay });
  };

  const handleExpChange = (experience: "any" | "b1" | "b2" | "b3") => {
    onChange({ ...filters, experience });
  };

  const handleReset = () => {
    onChange({ mode: "all", minPay: null, experience: "any" });
  };

  return (
    <div className="indeed-filters-strip">
      <div className="indeed-chips-scroll">
        {/* Mode Pills */}
        <div className="filter-pill-group" role="group" aria-label="Work mode filter">
          <button
            type="button"
            className={`filter-pill ${filters.mode === "all" ? "active" : ""}`}
            onClick={() => handleModeChange("all")}
          >
            All Modes
          </button>
          <button
            type="button"
            className={`filter-pill ${filters.mode === "hybrid" ? "active" : ""}`}
            onClick={() => handleModeChange("hybrid")}
          >
            Hybrid
          </button>
          <button
            type="button"
            className={`filter-pill ${filters.mode === "on-site" ? "active" : ""}`}
            onClick={() => handleModeChange("on-site")}
          >
            On-site
          </button>
        </div>

        <div className="filter-chip-sep" aria-hidden="true" />

        {/* Salary Pills */}
        <div className="filter-pill-group" role="group" aria-label="Salary filter">
          <button
            type="button"
            className={`filter-pill ${filters.minPay === null ? "active" : ""}`}
            onClick={() => handlePayChange(null)}
          >
            Any Pay
          </button>
          <button
            type="button"
            className={`filter-pill ${filters.minPay === 110 ? "active" : ""}`}
            onClick={() => handlePayChange(filters.minPay === 110 ? null : 110)}
          >
            $110k+
          </button>
          <button
            type="button"
            className={`filter-pill ${filters.minPay === 130 ? "active" : ""}`}
            onClick={() => handlePayChange(filters.minPay === 130 ? null : 130)}
          >
            $130k+
          </button>
          <button
            type="button"
            className={`filter-pill ${filters.minPay === 150 ? "active" : ""}`}
            onClick={() => handlePayChange(filters.minPay === 150 ? null : 150)}
          >
            $150k+
          </button>
        </div>

        <div className="filter-chip-sep" aria-hidden="true" />

        {/* Experience Pills */}
        <div className="filter-pill-group" role="group" aria-label="Experience filter">
          <button
            type="button"
            className={`filter-pill ${filters.experience === "any" ? "active" : ""}`}
            onClick={() => handleExpChange("any")}
          >
            Any Exp
          </button>
          <button
            type="button"
            className={`filter-pill ${filters.experience === "b2" ? "active" : ""}`}
            onClick={() => handleExpChange(filters.experience === "b2" ? "any" : "b2")}
          >
            4–7 yrs
          </button>
          <button
            type="button"
            className={`filter-pill ${filters.experience === "b3" ? "active" : ""}`}
            onClick={() => handleExpChange(filters.experience === "b3" ? "any" : "b3")}
          >
            8+ yrs
          </button>
        </div>

        {/* Reset Button */}
        {hasActiveFilters && (
          <button
            type="button"
            className="filter-reset-btn"
            onClick={handleReset}
            title="Reset filters"
          >
            <span>Reset</span>
            <span className="reset-x">×</span>
          </button>
        )}
      </div>

      <div className="indeed-filter-stats">
        <span>
          Showing <b>{filteredCount}</b> of <b>{totalCount}</b> jobs
        </span>
      </div>
    </div>
  );
}

