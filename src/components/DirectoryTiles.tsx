"use client";

import React, { useState } from "react";
import Link from "next/link";
import { cities, roles, findBand, findCity, fmt } from "@/data";
import { Mark } from "./Mark";

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
              <Link key={c.slug} href={href} className="tile">
                <b>{c.name}</b>
                <span>
                  {c.stateName}
                  {b && (
                    <>
                      {" "}
                      · median <Mark>{fmt.k(b.median)}</Mark>
                    </>
                  )}
                </span>
              </Link>
            );
          }

          return (
            <a
              key={c.slug}
              href="#"
              data-unbuilt={UNBUILT_MSG}
              className="tile"
              onClick={(e) => {
                e.preventDefault();
                showToast();
              }}
            >
              <b>{c.name}</b>
              <span>
                {c.stateName}
                {b && (
                  <>
                    {" "}
                    · median <Mark>{fmt.k(b.median)}</Mark>
                  </>
                )}
              </span>
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
              <Link key={r.slug} href={href} className="tile">
                <b>{r.name}</b>
                <span>
                  {b && currentCity ? (
                    <>
                      {currentCity.name} median <Mark>{fmt.k(b.median)}</Mark>
                    </>
                  ) : (
                    "Pay by city"
                  )}
                </span>
              </Link>
            );
          }

          return (
            <a
              key={r.slug}
              href="#"
              data-unbuilt={UNBUILT_MSG}
              className="tile"
              onClick={(e) => {
                e.preventDefault();
                showToast();
              }}
            >
              <b>{r.name}</b>
              <span>
                {b && currentCity ? (
                  <>
                    {currentCity.name} median <Mark>{fmt.k(b.median)}</Mark>
                  </>
                ) : (
                  "Pay by city"
                )}
              </span>
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
