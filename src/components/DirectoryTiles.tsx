"use client";

import React, { useState } from "react";
import Link from "next/link";
import { cities, roles, findBand, findCity, fmt } from "@/data";

const UNBUILT_MSG = "Prototype: only Houston × estate planning attorney is built.";

export function CityTiles() {
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = () => {
    setToastMsg(UNBUILT_MSG);
    setTimeout(() => setToastMsg(null), 3200);
  };

  return (
    <>
      <div className="tiles">
        {cities.map((c) => {
          const b = findBand(c.slug, "estate-planning-attorney");
          const isBuilt = !!c.built;
          const href = `/locations/${c.stateSlug}/${c.citySlug}`;

          if (isBuilt) {
            return (
              <Link key={c.slug} href={href} className="dir-tile dir-tile-built" title={`View ${c.name} legal market`}>
                <div className="dir-tile-main">
                  <div className="dir-tile-name-row">
                    <span className="dir-tile-name">{c.name}</span>
                    <span className="dir-tile-state-pill">{c.state}</span>
                  </div>
                  <div className="dir-tile-meta">
                    {b ? (
                      <>
                        <span className="dir-median-label">Median</span>{" "}
                        <strong className="dir-median-val">{fmt.k(b.median)}</strong>
                      </>
                    ) : (
                      <span>{c.stateName}</span>
                    )}
                  </div>
                </div>
                <span className="dir-tile-arrow" aria-hidden="true">→</span>
              </Link>
            );
          }

          return (
            <a
              key={c.slug}
              href="#"
              data-unbuilt={UNBUILT_MSG}
              className="dir-tile"
              title={`${c.name}, ${c.state}`}
              onClick={(e) => {
                e.preventDefault();
                showToast();
              }}
            >
              <div className="dir-tile-main">
                <div className="dir-tile-name-row">
                  <span className="dir-tile-name">{c.name}</span>
                  <span className="dir-tile-state-pill">{c.state}</span>
                </div>
                <div className="dir-tile-meta">
                  {b ? (
                    <>
                      <span className="dir-median-label">Median</span>{" "}
                      <strong className="dir-median-val">{fmt.k(b.median)}</strong>
                    </>
                  ) : (
                    <span>{c.stateName}</span>
                  )}
                </div>
              </div>
              <span className="dir-tile-arrow" aria-hidden="true">→</span>
            </a>
          );
        })}
      </div>
      {toastMsg && (
        <div className="toast show" role="status" aria-live="polite">
          {toastMsg}
        </div>
      )}
    </>
  );
}

export function RoleTiles({ city = "houston-tx" }: { city?: string }) {
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const currentCity = findCity(city);

  const showToast = () => {
    setToastMsg(UNBUILT_MSG);
    setTimeout(() => setToastMsg(null), 3200);
  };

  return (
    <>
      <div className="tiles">
        {roles.map((r) => {
          const b = findBand(city, r.slug);
          const isBuilt = !!r.built;
          const href = `/roles/${r.slug}`;

          if (isBuilt) {
            return (
              <Link key={r.slug} href={href} className="dir-tile dir-tile-built" title={`View ${r.name} benchmarks`}>
                <div className="dir-tile-main">
                  <div className="dir-tile-name-row">
                    <span className="dir-tile-name">{r.name}</span>
                  </div>
                  <div className="dir-tile-meta">
                    {b && currentCity ? (
                      <>
                        <span className="dir-median-label">{currentCity.name}</span>{" "}
                        <strong className="dir-median-val">{fmt.k(b.median)}</strong>
                      </>
                    ) : (
                      <span>Pay by city</span>
                    )}
                  </div>
                </div>
                <span className="dir-tile-arrow" aria-hidden="true">→</span>
              </Link>
            );
          }

          return (
            <a
              key={r.slug}
              href="#"
              data-unbuilt={UNBUILT_MSG}
              className="dir-tile"
              title={r.name}
              onClick={(e) => {
                e.preventDefault();
                showToast();
              }}
            >
              <div className="dir-tile-main">
                <div className="dir-tile-name-row">
                  <span className="dir-tile-name">{r.name}</span>
                </div>
                <div className="dir-tile-meta">
                  {b && currentCity ? (
                    <>
                      <span className="dir-median-label">{currentCity.name}</span>{" "}
                      <strong className="dir-median-val">{fmt.k(b.median)}</strong>
                    </>
                  ) : (
                    <span>Pay by city</span>
                  )}
                </div>
              </div>
              <span className="dir-tile-arrow" aria-hidden="true">→</span>
            </a>
          );
        })}
      </div>
      {toastMsg && (
        <div className="toast show" role="status" aria-live="polite">
          {toastMsg}
        </div>
      )}
    </>
  );
}
