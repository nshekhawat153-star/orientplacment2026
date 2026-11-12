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
            placeholder='Job title, keywords, or company'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            list="roles-datalist"
            aria-label="Job title, keywords, or company"
          />
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
            onChange={(e) => setLocation(e.target.value)}
            list="cities-datalist"
            aria-label='City, state, or "remote"'
          />
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

