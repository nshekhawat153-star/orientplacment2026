"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "./icons";
import { roles, cities } from "@/data";

interface IndeedTopSearchBarProps {
  initialQuery?: string;
  initialLocation?: string;
  onSearch?: (query: string, location: string) => void;
  className?: string;
}

export function IndeedTopSearchBar({
  initialQuery = "",
  initialLocation = "",
  onSearch,
  className = "",
}: IndeedTopSearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [location, setLocation] = useState(initialLocation);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    setLocation(initialLocation);
  }, [initialLocation]);

  const handleClearQuery = () => {
    setQuery("");
    if (onSearch) {
      onSearch("", location.trim());
    }
  };

  const handleClearLocation = () => {
    setLocation("");
    if (onSearch) {
      onSearch(query.trim(), "");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query.trim(), location.trim());
    } else {
      const params = new URLSearchParams();
      if (query.trim()) params.set("q", query.trim());
      if (location.trim()) params.set("l", location.trim());
      router.push(`/jobs?${params.toString()}`);
    }
  };

  return (
    <form
      className={`indeed-top-search-form ${className}`}
      onSubmit={handleSubmit}
      role="search"
      aria-label="Job search"
    >
      <div className="indeed-search-box-unified">
        {/* WHAT INPUT */}
        <div className="indeed-input-wrap">
          <Icon name="search" className="indeed-input-icon" />
          <input
            type="text"
            className="indeed-search-input"
            placeholder="Job title, keywords, or company"
            value={query}
            onChange={(e) => {
              const val = e.target.value;
              setQuery(val);
            }}
            list="roles-datalist"
            aria-label="Job title, keywords, or company"
          />
          {query && (
            <button
              type="button"
              className="indeed-clear-btn"
              onClick={handleClearQuery}
              aria-label="Clear job search"
              title="Clear"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
          <datalist id="roles-datalist">
            {roles.map((r) => (
              <option key={r.slug} value={r.name} />
            ))}
          </datalist>
        </div>

        <div className="indeed-search-divider" aria-hidden="true" />

        {/* WHERE INPUT */}
        <div className="indeed-input-wrap">
          <Icon name="pin" className="indeed-input-icon" />
          <input
            type="text"
            className="indeed-search-input"
            placeholder='City, state, or "remote"'
            value={location}
            onChange={(e) => {
              const val = e.target.value;
              setLocation(val);
            }}
            list="cities-datalist"
            aria-label='City, state, or "remote"'
          />
          {location && (
            <button
              type="button"
              className="indeed-clear-btn"
              onClick={handleClearLocation}
              aria-label="Clear location search"
              title="Clear"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
          <datalist id="cities-datalist">
            {cities.map((c) => (
              <option key={c.slug} value={`${c.name}, ${c.state}`} />
            ))}
            <option value="Austin, TX" />
            <option value="Houston, TX" />
            <option value="Dallas, TX" />
            <option value="San Antonio, TX" />
            <option value="Remote" />
          </datalist>
        </div>

        {/* FIND JOBS BUTTON */}
        <button type="submit" className="indeed-submit-btn">
          Find jobs
        </button>
      </div>
    </form>
  );
}

