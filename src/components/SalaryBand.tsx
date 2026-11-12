"use client";

import React from "react";
import { findBand, findCity, findRole, expBands, fmt } from "@/data";
import { Mark } from "./Mark";

export interface SalaryBandProps {
  city?: string;
  citySlug?: string;
  role?: string;
  roleSlug?: string;
  highlight?: "b1" | "b2" | "b3" | string;
  highlightKey?: string;
  marker?: number | null;
}

export function SalaryBand({
  city,
  citySlug,
  role,
  roleSlug,
  highlight,
  highlightKey,
  marker,
}: SalaryBandProps) {
  const actualCity = citySlug || city || "";
  const actualRole = roleSlug || role || "";
  const actualHighlight = highlightKey || highlight;
  const b = findBand(actualCity, actualRole);
  const c = findCity(actualCity);
  const roleObj = findRole(actualRole);

  if (!b || !c || !roleObj) return null;

  const lo = Math.floor((b.b1[0] * 0.88) / 10) * 10;
  const hi = Math.ceil((b.b3[1] * 1.05) / 10) * 10;
  const span = hi - lo;

  const x = (v: number) => Math.max(0, Math.min(100, ((v - lo) / span) * 100));

  const markerPos = marker != null ? x(marker) : null;
  const isEdgeL = markerPos != null && markerPos < 12;
  const isEdgeR = markerPos != null && markerPos > 88;

  const ariaLabel = `${roleObj.name} base salary in ${c.name} by experience: ${expBands
    .map((e) => `${e.label} ${fmt.range((b as any)[e.key])}`)
    .join("; ")}; median ${fmt.k(b.median)}`;

  return (
    <div className="band-wrap">
      <div className="band" role="img" aria-label={ariaLabel}>
        {expBands.map((e) => {
          const r = (b as any)[e.key] as [number, number];
          const isActive = actualHighlight === e.key;
          return (
            <div
              key={e.key}
              className={`band-row${isActive ? " active" : ""}`}
              data-key={e.key}
            >
              <span className="lab">
                {e.label.split(" ")[0]}
                <span className="lab-long"> years</span>
                <span className="lab-short"> yrs</span>
              </span>
              <div className="track">
                {[0, 25, 50, 75, 100].map((p) => (
                  <i key={p} className="gl" style={{ left: `${p}%` }} />
                ))}
                <span
                  className="range"
                  style={{
                    left: `${x(r[0])}%`,
                    width: `${x(r[1]) - x(r[0])}%`,
                  }}
                />
              </div>
              <span className="val">
                <Mark>{fmt.range(r)}</Mark>
              </span>
            </div>
          );
        })}

        <div className="band-axis">
          <span />
          <div className="ticks">
            {[0, 25, 50, 75, 100].map((p) => (
              <span key={p} className={`t${p}`} style={{ left: `${p}%` }}>
                {fmt.k(lo + (span * p) / 100)}
              </span>
            ))}
          </div>
          <span />
        </div>

        <div className="lane">
          <span className="med" style={{ left: `${x(b.median)}%` }} />
          {marker != null && !isNaN(marker) && (
            <span
              className={`you${isEdgeL ? " edge-l" : ""}${
                isEdgeR ? " edge-r" : ""
              }`}
              style={{ left: `${markerPos}%` }}
            >
              <b>{fmt.k(marker)}</b>
            </span>
          )}
        </div>
      </div>

      <div className="band-key">
        <span className="k-range">
          Middle half of base salaries (25th to 75th percentile)
        </span>
        <span className="k-med">
          Median <Mark>{fmt.k(b.median)}</Mark>
        </span>
        <span className="k-you">Your number</span>
      </div>
    </div>
  );
}

export const SalaryBandBar = SalaryBand;
