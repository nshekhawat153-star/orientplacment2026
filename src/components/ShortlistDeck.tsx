"use client";

import React, { useState, useEffect, useRef } from "react";
import { findCandidate, findRole, fmt } from "@/data";
import { Mark } from "./Mark";
import { Icon } from "./icons";

interface ShortlistDeckProps {
  candidateIds?: string[];
}

const DEFAULT_IDS = [
  "EP-TX-0412",
  "LIT-TX-0422",
  "PI-TX-0158",
  "RE-TX-0274",
  "PL-TX-0611",
  "LIT-TX-0390",
  "PL-TX-0640",
];

export function ShortlistDeck({ candidateIds = DEFAULT_IDS }: ShortlistDeckProps) {
  const list = candidateIds.map(findCandidate).filter(Boolean);
  const n = list.length;
  const [front, setFront] = useState(0);
  const [isLeaving, setIsLeaving] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (n <= 1 || isPaused) return;

    timerRef.current = setInterval(() => {
      setIsLeaving(true);
      setTimeout(() => {
        setFront((prev) => (prev + 1) % n);
        setIsLeaving(false);
      }, 320);
    }, 7000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [n, isPaused, front]);

  if (!n) return null;

  return (
    <div
      className={`deck auto${isPaused ? " paused" : ""}`}
      role="region"
      aria-roledescription="carousel"
      aria-label="Example candidate shortlist"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="deck-head">
        <span>Your shortlist</span>
        <span className="deck-count" aria-hidden="true">
          <b>{front + 1}</b> / {n}
        </span>
      </div>

      <div className="deck-cards">
        {list.map((c, i) => {
          if (!c) return null;
          const role = findRole(c.role);
          const bar = c.bars && c.bars.length ? c.bars.join(", ") : "Not required";
          const mix = c.mix
            .slice(0, 2)
            .map((x) => `${x[0]} ${x[1]}%`)
            .join(" · ");
          const pos = (i - front + n) % n;
          const dataPos = Math.min(pos, 2);
          const zIndex = n - pos;
          const isCurrentFront = pos === 0;

          return (
            <article
              key={c.id}
              className={`dk-card${isCurrentFront && isLeaving ? " leaving" : ""}`}
              data-pos={dataPos}
              style={{ zIndex }}
              aria-hidden={!isCurrentFront}
              aria-roledescription="slide"
              aria-label={`Candidate ${i + 1} of ${n}`}
            >
              <div className="dk-in">
                <div className="dk-top">
                  <span className="dk-id">{c.id}</span>
                  <span className="dk-ok">
                    <Icon name="check" /> Meets 5 of 5
                  </span>
                </div>
                <span className="dk-role">{role ? role.name : ""}</span>
                <b className="dk-h">
                  <Mark>{c.headline}</Mark>
                </b>
                <div className="dk-mix">
                  <div className="mixbar" aria-hidden="true">
                    {c.mix.map((x, idx) => (
                      <i key={idx} style={{ width: `${x[1]}%` }} />
                    ))}
                  </div>
                  <span>
                    <Mark>{mix}</Mark>
                  </span>
                </div>
                <dl className="dk-facts">
                  <div>
                    <dt>Experience</dt>
                    <dd>
                      <Mark>{c.years} years</Mark>
                    </dd>
                  </div>
                  <div>
                    <dt>Bar</dt>
                    <dd>
                      <Mark>{bar}</Mark>
                    </dd>
                  </div>
                  <div>
                    <dt>Expects</dt>
                    <dd>
                      <Mark>{fmt.range(c.pay)} base</Mark>
                    </dd>
                  </div>
                  <div>
                    <dt>Notice</dt>
                    <dd>
                      <Mark>{c.availability}</Mark>
                    </dd>
                  </div>
                  <div className="wide">
                    <dt>Now at</dt>
                    <dd>
                      <Mark>
                        {c.firmType}, {c.firmSize}
                      </Mark>
                    </dd>
                  </div>
                </dl>
              </div>
            </article>
          );
        })}
      </div>

      <div className="deck-progress" aria-hidden="true">
        <i key={front} />
      </div>
    </div>
  );
}
