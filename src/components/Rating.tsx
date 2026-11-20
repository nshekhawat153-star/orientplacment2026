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

export function TrustLine({
  kind = "employer",
  dark = false,
  className = "",
  style,
}: {
  kind?: "employer" | "candidate";
  dark?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  const tail =
    kind === "candidate"
      ? "free for candidates, always confidential"
      : "no fee unless you hire";
  return (
    <p
      className={`trust-line${dark ? " on-dark" : ""}${className ? ` ${className}` : ""}`}
      style={style}
    >
      <Stars />
      <span>
        <b>{trust.rating} on Google</b> · {tail}
      </span>
    </p>
  );
}

export function TrustTicker() {
  const items = [
    { num: "200+", label: "Hires in Past 12 Months" },
    { num: "30+", label: "Hires Facilitated Monthly" },
    { num: "100,000+", label: "Active Legal Talent Pool" },
    { num: "28", label: "Repeat Client Law Firms" },
    { num: "90 Days", label: "Replacement Guarantee" },
    { num: "23%", label: "Contingency Fee · $0 Upfront" },
    { num: "5.0 ★", label: "Google Rating (60 Reviews)" },
    { num: "< 1 Week", label: "First Qualified Candidate" },
    { num: "50–500", label: "Firm Sweet Spot (Attorneys)" },
    { num: "100%", label: "Permanent Direct-Hire" },
  ];

  return (
    <div className="ticker-wrapper" aria-hidden="true">
      <div className="ticker-track">
        {/* Loop Set 1 */}
        {items.map((item, idx) => (
          <div key={`t1-${idx}`} className="ticker-pill">
            <span className="ticker-bullet" aria-hidden="true">✦</span>
            <b className="ticker-num">{item.num.endsWith(" ★") ? <>{item.num.slice(0, -2)} <span style={{ color: "#FBBF24" }}>★</span></> : item.num}</b>
            <span className="ticker-lbl">{item.label}</span>
          </div>
        ))}
        {/* Loop Set 2 (for 100% seamless infinite scroll) */}
        {items.map((item, idx) => (
          <div key={`t2-${idx}`} className="ticker-pill">
            <span className="ticker-bullet" aria-hidden="true">✦</span>
            <b className="ticker-num">{item.num.endsWith(" ★") ? <>{item.num.slice(0, -2)} <span style={{ color: "#FBBF24" }}>★</span></> : item.num}</b>
            <span className="ticker-lbl">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TrustBar({
  kind = "employer",
}: {
  kind?: "employer" | "candidate";
}) {
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
            label: <span className="tb-sub">cost to candidates, always confidential</span>,
          },
          {
            num: trust.since,
            label: (
              <span className="tb-sub">recruiting since, based in {placeCity}</span>
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
            num: fmtNum(trust.last12MonthsPlacements || trust.placements),
            label: <span className="tb-sub">hires in past 12 months</span>,
          },
          {
            num: fmtNum(trust.activePool),
            label: <span className="tb-sub">active legal talent pool</span>,
          },
          {
            num: "90 Days",
            label: <span className="tb-sub">full replacement guarantee</span>,
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
