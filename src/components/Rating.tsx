import React from "react";
import { trust } from "@/data";
import { GMark, Stars } from "./icons";

export interface RatingBadgeProps {
  size?: "sm" | "md" | "lg";
  dark?: boolean;
  link?: boolean;
}

export function RatingBadge({ size, dark, link }: RatingBadgeProps) {
  const cls = `rating${size ? ` rating-${size}` : ""}${dark ? " on-dark" : ""}`;
  const content = (
    <>
      <GMark />
      <b>{trust.rating}</b>
      <Stars />
      <span className="rc">{trust.reviews} Google reviews</span>
    </>
  );

  if (link) {
    return (
      <a
        className={cls}
        href={trust.google}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
        <span className="sr"> (opens Google)</span>
      </a>
    );
  }

  return <span className={cls}>{content}</span>;
}

export function TrustLine({ kind = "employer" }: { kind?: "employer" | "candidate" }) {
  const tail =
    kind === "candidate"
      ? "free for candidates, always confidential"
      : "no fee unless you hire";
  return (
    <p className="trust-line">
      <Stars />
      <span>
        <b>{trust.rating} on Google</b> · {tail}
      </span>
    </p>
  );
}

export function TrustBar({ kind = "employer" }: { kind?: "employer" | "candidate" }) {
  const fmtNum = (n: string | number) => {
    const s = String(n);
    if (s.endsWith("+")) {
      return (
        <>
          {s.slice(0, -1)}
          <span className="tb-plus">+</span>
        </>
      );
    }
    return s;
  };

  const placeCity = trust.place.split(",")[0];

  const cells =
    kind === "candidate"
      ? [
          {
            num: trust.rating,
            label: (
              <>
                <div className="tb-stars">
                  <Stars />
                </div>
                <span className="tb-sub">on Google, {trust.reviews} reviews</span>
              </>
            ),
          },
          {
            num: (
              <>
                {trust.jonNamed}
                <small className="tb-of"> of {trust.reviews}</small>
              </>
            ),
            label: (
              <span className="tb-sub">
                reviews name Jon, who screens every candidate
              </span>
            ),
          },
          {
            num: "$0",
            label: <span className="tb-sub">cost to candidates, always</span>,
          },
          {
            num: trust.since,
            label: (
              <span className="tb-sub">recruiting since, from {placeCity}</span>
            ),
          },
        ]
      : [
          {
            num: trust.rating,
            label: (
              <>
                <div className="tb-stars">
                  <Stars />
                </div>
                <span className="tb-sub">on Google, {trust.reviews} reviews</span>
              </>
            ),
          },
          {
            num: fmtNum(trust.placements),
            label: (
              <span className="tb-sub">attorneys and paralegals placed</span>
            ),
          },
          {
            num: fmtNum(trust.clientFirms),
            label: (
              <span className="tb-sub">law firms we have hired for</span>
            ),
          },
          {
            num: trust.since,
            label: (
              <span className="tb-sub">recruiting since, from {placeCity}</span>
            ),
          },
        ];

  return (
    <div className="trustbar">
      {cells.map((c, idx) => (
        <div key={idx} className={`tb tb-${idx}`}>
          <div className="tb-inner">
            <b className="tb-n">{c.num}</b>
            <div className="tb-l">{c.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function CalendlyLink({
  label = "Book 15 minutes with Justin",
  className = "cal-link",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <a
      className={className}
      href={trust.calendly}
      target="_blank"
      rel="noopener noreferrer"
    >
      {label}
    </a>
  );
}
