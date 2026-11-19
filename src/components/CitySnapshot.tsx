import React from "react";
import { findCity, snapshots, findBand, matchCandidates, jobs, fmt, plural, asOf } from "@/data";
import { Mark } from "./Mark";

export function CitySnapshot({
  city: passedCity,
  citySlug,
}: {
  city?: string;
  citySlug?: string;
}) {
  const effectiveCity = citySlug || passedCity || "houston-tx";
  const c = findCity(effectiveCity);
  const s = snapshots[effectiveCity] || {};
  const b = findBand(effectiveCity, "estate-planning-attorney");
  const candidatesInCity = matchCandidates({ city: effectiveCity }).filter((r) => r.inCity).length;
  const jobsInCity = jobs.filter((x) => x.city === effectiveCity).length;

  if (!c) return null;

  return (
    <div className="city-snapshot-terminal" style={{ color: "#08142A" }}>
      {/* Top Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          borderBottom: "1.5px solid #E2E8F0",
          paddingBottom: 16,
          marginBottom: 20,
        }}
      >
        <div>
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: 10.5,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#1D4ED8",
              display: "block",
              marginBottom: 4,
            }}
          >
            {c.name.toUpperCase()} REGIONAL BENCHMARK
          </span>
          <h3
            style={{
              fontFamily: "var(--display)",
              fontSize: 21,
              fontWeight: 500,
              color: "#08142A",
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            {c.name} Talent &amp; Market Radar
          </h3>
        </div>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontFamily: "var(--mono)",
            fontSize: 10.5,
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "#166534",
            background: "#DCFCE7",
            padding: "4px 8px",
            borderRadius: 999,
            border: "1px solid #BBF7D0",
            whiteSpace: "nowrap",
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#16A34A" }} />
          <span>ACTIVE · {asOf}</span>
        </span>
      </div>

      {/* 4 Metric Tiles */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 18 }}>
        <div
          style={{
            background: "#FAF9F5",
            border: "1.5px solid #E2E8F0",
            borderRadius: 10,
            padding: "14px 16px",
          }}
        >
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: 10.5,
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "#64748B",
              marginBottom: 4,
            }}
          >
            Active Talent
          </div>
          <div
            style={{
              fontFamily: "var(--display)",
              fontSize: 30,
              fontWeight: 700,
              color: "#08142A",
              lineHeight: 1,
            }}
          >
            <Mark>{candidatesInCity}</Mark>
          </div>
          <div style={{ fontSize: 11.5, color: "#64748B", marginTop: 4 }}>
            {plural(candidatesInCity, "candidate")} ready for interview
          </div>
        </div>

        <div
          style={{
            background: "#FAF9F5",
            border: "1.5px solid #E2E8F0",
            borderRadius: 10,
            padding: "14px 16px",
          }}
        >
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: 10.5,
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "#64748B",
              marginBottom: 4,
            }}
          >
            Median Base Pay
          </div>
          <div
            style={{
              fontFamily: "var(--display)",
              fontSize: 30,
              fontWeight: 700,
              color: "#1D4ED8",
              lineHeight: 1,
            }}
          >
            {b ? <Mark>{fmt.k(b.median)}</Mark> : "–"}
          </div>
          <div style={{ fontSize: 11.5, color: "#64748B", marginTop: 4 }}>
            Estate planning attorney median
          </div>
        </div>

        <div
          style={{
            background: "#FAF9F5",
            border: "1.5px solid #E2E8F0",
            borderRadius: 10,
            padding: "14px 16px",
          }}
        >
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: 10.5,
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "#64748B",
              marginBottom: 4,
            }}
          >
            Local Openings
          </div>
          <div
            style={{
              fontFamily: "var(--display)",
              fontSize: 30,
              fontWeight: 700,
              color: "#08142A",
              lineHeight: 1,
            }}
          >
            <Mark>{jobsInCity}</Mark>
          </div>
          <div style={{ fontSize: 11.5, color: "#64748B", marginTop: 4 }}>
            Confidential boutique seats
          </div>
        </div>

        <div
          style={{
            background: "#FAF9F5",
            border: "1.5px solid #E2E8F0",
            borderRadius: 10,
            padding: "14px 16px",
          }}
        >
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: 10.5,
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "#64748B",
              marginBottom: 4,
            }}
          >
            Time to Shortlist
          </div>
          <div
            style={{
              fontFamily: "var(--display)",
              fontSize: 30,
              fontWeight: 700,
              color: "#08142A",
              lineHeight: 1,
            }}
          >
            <Mark>{s.shortlistDays || "5 days"}</Mark>
          </div>
          <div style={{ fontSize: 11.5, color: "#64748B", marginTop: 4 }}>
            From intake to verified dossiers
          </div>
        </div>
      </div>

      {/* Bottom Assurance Card */}
      <div
        style={{
          background: "#EFF6FF",
          border: "1px solid #BFDBFE",
          borderRadius: 8,
          padding: "12px 14px",
          fontSize: 12,
          color: "#1E40AF",
          lineHeight: 1.5,
        }}
      >
        <span style={{ fontWeight: 700 }}>100% Contingency in {c.name}:</span> Zero upfront retainer. 23% fee due 15 days after start date, protected by full 90-day replacement warranty.
      </div>
    </div>
  );
}
