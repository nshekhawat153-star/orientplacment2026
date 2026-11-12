"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { roles, cities, Role, City } from "@/data";
import { Icon } from "./icons";

interface SearchHeroDualProps {
  currentRoleSlug?: string;
  currentCitySlug?: string;
  onSearch?: (roleSlug: string, citySlug: string) => void;
  placeholderWhat?: string;
  placeholderWhere?: string;
  buttonText?: string;
  headline?: React.ReactNode;
  subtitle?: React.ReactNode;
  eyebrow?: string;
}

export function SearchHeroDual({
  currentRoleSlug = "estate-planning-attorney",
  currentCitySlug = "houston-tx",
  onSearch,
  placeholderWhat = "Job title or practice area",
  placeholderWhere = "City or state",
  buttonText = "Find jobs",
  headline,
  subtitle,
  eyebrow,
}: SearchHeroDualProps) {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState(currentRoleSlug);
  const [selectedCity, setSelectedCity] = useState(currentCitySlug);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(selectedRole, selectedCity);
    } else {
      router.push(`/jobs/${selectedRole}/${selectedCity}`);
    }
  };

  return (
    <div className="search-dual-container">
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      {headline && <div className="search-dual-head">{headline}</div>}
      {subtitle && <p className="lede search-dual-sub">{subtitle}</p>}

      <form className="search-dual-bar" onSubmit={handleSubmit} role="search" aria-label="Job search">
        {/* WHAT INPUT */}
        <div className="search-input-group">
          <label htmlFor="search-what" className="search-input-label">
            <Icon name="search" className="search-ico" />
            <span className="search-tag">What</span>
          </label>
          <div className="search-select-wrapper">
            <select
              id="search-what"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="search-select"
              aria-label={placeholderWhat}
            >
              {roles.map((r: Role) => (
                <option key={r.slug} value={r.slug}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="search-divider" aria-hidden="true" />

        {/* WHERE INPUT */}
        <div className="search-input-group">
          <label htmlFor="search-where" className="search-input-label">
            <Icon name="pin" className="search-ico" />
            <span className="search-tag">Where</span>
          </label>
          <div className="search-select-wrapper">
            <select
              id="search-where"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="search-select"
              aria-label={placeholderWhere}
            >
              {cities.map((c: City) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}, {c.state}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <button type="submit" className="btn btn-primary search-submit-btn">
          <span>{buttonText}</span>
          <Icon name="arrow" className="btn-arrow-ico" />
        </button>
      </form>
    </div>
  );
}

