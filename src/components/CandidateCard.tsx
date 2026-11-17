"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Candidate, fmt, findRole, plural } from "@/data";
import { Mark } from "./Mark";
import { BtnArrow } from "./icons";

export interface CandidateCardProps {
  candidate: Candidate;
  locked?: boolean;
  long?: boolean;
  actions?: boolean;
  selected?: boolean;
  onSelect?: (candidate: Candidate) => void;
  result?: {
    met: number;
    total: number;
    checks: Array<{ k: string; ok: boolean }>;
  };
  onRequestProfile?: (id: string) => void;
  onRequest?: (id: string) => void;
}

export function CandidateCard({
  candidate: c,
  locked = false,
  long = false,
  actions = true,
  selected = false,
  onSelect,
  result: r,
  onRequestProfile,
  onRequest,
}: CandidateCardProps) {
  const reqHandler = onRequest || onRequestProfile;
  const router = useRouter();
  const role = findRole(c.role);
  const isBuilt = c.id === "EP-TX-0412";
  const bars = c.bars.length ? c.bars.join(", ") : "Not required";

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("a, button")) {
      return;
    }
    if (onSelect) {
      onSelect(c);
    }
  };

  const handleRequest = () => {
    if (reqHandler) {
      reqHandler(c.id);
      return;
    }
    if (isBuilt) {
      router.push(`/candidate/${c.id.toLowerCase()}#request`);
    } else {
      router.push(`/find-candidates#ids=${c.id}`);
    }
  };

  const idHtml = isBuilt ? (
    <Link className="id" href={`/candidate/${c.id.toLowerCase()}`}>
      {c.id}
    </Link>
  ) : (
    <span className="id">{c.id}</span>
  );

  const top = (
    <div className="cand-top">
      {idHtml}
      <span className="avail">{c.availability}</span>
    </div>
  );

  if (locked) {
    return (
      <article className="cand locked" data-id={c.id}>
        {top}
        <h3>
          <Mark>{c.headline}</Mark>
        </h3>
        <p className="small muted">
          <Mark>{c.years} years</Mark> · {role ? role.name : ""}
        </p>
        <div className="redact" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <p className="lock-note">
          Experience, pay and practice mix come with the full profiles.
        </p>
      </article>
    );
  }

  const score =
    r && r.total ? (
      <>
        <p className="score">
          Meets {r.met} of {r.total} {plural(r.total, "must-have")}
        </p>
        <ul className="checks">
          {r.checks.map((x, idx) => (
            <li key={idx} className={x.ok ? "" : "no"}>
              {x.k}
            </li>
          ))}
        </ul>
      </>
    ) : null;

  const act =
    actions === false ? null : (
      <div className="actions">
        <button
          type="button"
          className="btn btn-line btn-sm btn-block"
          data-profile={c.id}
          onClick={handleRequest}
        >
          <span>Request profile</span>
          <BtnArrow />
        </button>
      </div>
    );

  if (long) {
    return (
      <article
        className={`cand cand-long ${selected ? "job-selected cand-selected" : ""} ${
          onSelect ? "job-clickable" : ""
        }`}
        data-id={c.id}
        onClick={handleCardClick}
      >
        {top}
        <h3>
          <Mark>{c.headline}</Mark>
        </h3>
        {score}
        <dl className="facts">
          <div>
            <dt>Experience</dt>
            <dd>
              <Mark>{c.years} years</Mark>
            </dd>
          </div>
          <div>
            <dt>Bar</dt>
            <dd>
              <Mark>{bars}</Mark>
            </dd>
          </div>
          <div>
            <dt>Now at</dt>
            <dd>
              <Mark>
                {c.firmType}, {c.firmSize}
              </Mark>
            </dd>
          </div>
          <div>
            <dt>Based</dt>
            <dd>
              <Mark>{c.area}</Mark>
            </dd>
          </div>
          <div>
            <dt>Works</dt>
            <dd>
              <Mark>{fmt.modes(c.modes)}</Mark>
            </dd>
          </div>
          <div>
            <dt>Expects</dt>
            <dd>
              <Mark>{fmt.range(c.pay)} base</Mark>
            </dd>
          </div>
        </dl>
        <div className="mix-detail">
          <div className="mixbar" aria-hidden="true">
            {c.mix.map((x, idx) => (
              <i key={idx} style={{ width: `${x[1]}%` }} />
            ))}
          </div>
          <p className="mix-legend">
            {c.mix.map((x) => `${x[0]} ${x[1]}%`).join(" · ")}
          </p>
        </div>
        <p className="why">
          <Mark>{c.why}</Mark>
        </p>
        {act}
      </article>
    );
  }

  const mixTxt = c.mix
    .slice(0, 2)
    .map((x) => `${x[0]} ${x[1]}%`)
    .join(" · ");

  if (onSelect) {
    return (
      <article
        className={`indeed-feed-card ${selected ? "selected" : ""}`}
        data-id={c.id}
        onClick={handleCardClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelect(c);
          }
        }}
        aria-current={selected ? "true" : undefined}
        style={{
          background: "#FFFFFF",
          border: selected ? "2px solid #1D4ED8" : "1.5px solid #E2E8F0",
          borderRadius: 12,
          padding: "20px 22px 18px",
          boxShadow: selected
            ? "0 10px 28px -4px rgba(29, 78, 216, 0.16), 0 2px 8px rgba(15, 23, 42, 0.04)"
            : "0 2px 8px rgba(15, 23, 42, 0.03)",
          transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
          position: "relative",
          cursor: "pointer",
        }}
      >
        {/* TOP STATUS BADGES & ID */}
        <div className="feed-card-badge-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                background: "rgba(29, 78, 216, 0.08)",
                border: "1px solid rgba(29, 78, 216, 0.2)",
                borderRadius: 6,
                padding: "3px 8px",
                fontSize: 11,
                fontWeight: 700,
                color: "#1D4ED8",
                fontFamily: "var(--mono)",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              <svg viewBox="0 0 16 16" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="3.5 8.5 6.5 11.5 12.5 4.5" />
              </svg>
              Pre-Screened
            </span>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                background: "#F1F5F9",
                borderRadius: 6,
                padding: "3px 8px",
                fontSize: 11.5,
                color: "#475569",
                fontWeight: 500,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#16A34A" }} />
              {c.availability}
            </span>
          </div>

          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: 11.5,
              fontWeight: 700,
              color: "#64748B",
              background: "#FAF9F5",
              border: "1px solid #E2E8F0",
              padding: "2px 8px",
              borderRadius: 4,
            }}
          >
            {c.id}
          </span>
        </div>

        {/* CANDIDATE HEADLINE */}
        <h3
          className="feed-card-title"
          style={{
            fontFamily: "var(--display)",
            fontSize: "1.18rem",
            fontWeight: 600,
            color: selected ? "#1D4ED8" : "#08142A",
            margin: "0 0 6px",
            lineHeight: 1.3,
          }}
        >
          <Mark>{c.headline}</Mark>
        </h3>

        {/* FIRM & EXPERIENCE */}
        <div
          className="feed-card-firm"
          style={{
            fontSize: 13,
            color: "#475569",
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 6,
          }}
        >
          <span>{c.years} yrs exp · {c.firmType} ({c.firmSize})</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 3, background: "#FEF3C7", color: "#B45309", padding: "1px 6px", borderRadius: 4, fontSize: 11, fontWeight: 700 }}>
            ★ 5.0
          </span>
        </div>

        {/* LOCATION & BAR ADMISSIONS */}
        <div
          className="feed-card-location"
          style={{
            fontSize: 12.5,
            color: "#64748B",
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginBottom: 10,
          }}
        >
          <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0, opacity: 0.75 }}>
            <path d="M8 1.5a4.5 4.5 0 0 0-4.5 4.5c0 3.375 4.5 8.5 4.5 8.5s4.5-5.125 4.5-8.5A4.5 4.5 0 0 0 8 1.5z" />
            <circle cx="8" cy="6" r="1.5" />
          </svg>
          <span>{c.area.replace(/^[^,]+, /, "")} · {bars}</span>
        </div>

        {/* TAGS (SALARY, MODE, PRACTICE FOCUS) */}
        <div className="feed-card-tags" style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
          <span
            className="feed-tag feed-tag-pay"
            style={{
              background: "rgba(29, 78, 216, 0.08)",
              color: "#1D4ED8",
              border: "1px solid rgba(29, 78, 216, 0.2)",
              borderRadius: 6,
              padding: "3px 10px",
              fontSize: 12,
              fontWeight: 700,
              fontFamily: "var(--mono)",
            }}
          >
            <Mark>{fmt.range(c.pay)} expected</Mark>
          </span>
          <span
            className="feed-tag feed-tag-mode"
            style={{
              background: "#F8FAFC",
              color: "#475569",
              border: "1px solid #E2E8F0",
              borderRadius: 6,
              padding: "3px 8px",
              fontSize: 12,
              fontWeight: 500,
            }}
          >
            {c.modes.includes("hybrid") ? "Hybrid / On-site" : "On-site only"}
          </span>
          {c.mix.length > 0 && (
            <span
              style={{
                background: "#FAF9F5",
                color: "#475569",
                border: "1px solid #E2E8F0",
                borderRadius: 6,
                padding: "3px 8px",
                fontSize: 11.5,
                fontWeight: 500,
              }}
            >
              {c.mix[0][0]} {c.mix[0][1]}%
            </span>
          )}
        </div>

        {/* WHY MOVING SUMMARY */}
        {c.why && (
          <div
            style={{
              fontSize: 12.5,
              color: "#475569",
              fontStyle: "italic",
              background: "#FAF9F5",
              borderLeft: "2.5px solid #CBD5E1",
              padding: "6px 10px",
              borderRadius: "0 6px 6px 0",
              marginBottom: 10,
              lineHeight: 1.45,
            }}
          >
            &ldquo;{c.why}&rdquo;
          </div>
        )}

        {/* FOOTER */}
        <div
          className="feed-card-footer"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #F1F5F9",
            paddingTop: 8,
            fontSize: 12,
            color: "#64748B",
          }}
        >
          <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
            <svg viewBox="0 0 16 16" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="6.5" width="10" height="7.5" rx="1.5" />
              <path d="M5.5 6.5V4.5a2.5 2.5 0 0 1 5 0v2" />
            </svg>
            100% Confidential
          </span>
          <span style={{ color: "#1D4ED8", fontWeight: 600 }}>Screened by Justin · View Dossier →</span>
        </div>
      </article>
    );
  }

  return (
    <article
      className={`cand ${selected ? "job-selected cand-selected" : ""} ${
        onSelect ? "job-clickable" : ""
      }`}
      data-id={c.id}
      onClick={handleCardClick}
    >
      {top}
      <h3>
        <Mark>{c.headline}</Mark>
      </h3>
      {score}
      <dl className="facts">
        <div>
          <dt>Experience</dt>
          <dd>
            <Mark>{c.years} years</Mark>
          </dd>
        </div>
        <div>
          <dt>Bar</dt>
          <dd>
            <Mark>{bars}</Mark>
          </dd>
        </div>
        <div>
          <dt>Based</dt>
          <dd>
            <Mark>{c.area.replace(/^[^,]+, /, "")}</Mark>
          </dd>
        </div>
        <div>
          <dt>Expects</dt>
          <dd>
            <Mark>{fmt.range(c.pay)}</Mark>
          </dd>
        </div>
      </dl>
      <div className="mix-mini">
        <div className="mixbar" aria-hidden="true">
          {c.mix.map((x, idx) => (
            <i key={idx} style={{ width: `${x[1]}%` }} />
          ))}
        </div>
        <span className="mixline">
          <Mark>{mixTxt}</Mark>
        </span>
      </div>
      <p className="why">
        <Mark>{c.why}</Mark>
      </p>
      {act}
    </article>
  );
}
