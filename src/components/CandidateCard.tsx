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
      >
        <div className="feed-card-top">
          <h3 className="feed-card-title">
            <Mark>{c.headline}</Mark>
          </h3>
          <span className="feed-cand-id">{c.id}</span>
        </div>

        <div className="feed-card-firm">
          <span>{c.years} yrs exp · {c.firmType} ({c.firmSize})</span>
        </div>

        <div className="feed-card-location">
          <span>{c.area.replace(/^[^,]+, /, "")} · {bars}</span>
        </div>

        <div className="feed-card-tags">
          <span className="feed-tag feed-tag-pay">
            <Mark>{fmt.range(c.pay)} expected</Mark>
          </span>
          <span className="feed-tag feed-tag-mode">
            {c.modes.includes("hybrid") ? "Hybrid / On-site" : "On-site"}
          </span>
        </div>

        <div className="feed-card-footer">
          <span className="feed-posted">Available: {c.availability}</span>
          <span className="feed-dot">·</span>
          <span className="feed-confidential">Screened by Jon</span>
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
