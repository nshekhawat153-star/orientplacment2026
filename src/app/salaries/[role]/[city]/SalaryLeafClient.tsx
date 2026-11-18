"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  DATA,
  fmt,
  salaryPosition,
  inBandCandidates,
  matchCandidates,
  Role,
  City,
} from "@/data";
import { useSite } from "@/context/SiteContext";
import { Mark } from "@/components/Mark";
import { SalaryBand } from "@/components/SalaryBand";
import { CandidateCard } from "@/components/CandidateCard";
import { JobCard } from "@/components/JobCard";
import { GateForm } from "@/components/GateForm";
import { ReviewsSection } from "@/components/ReviewCard";
import { RatingBadge, TrustBar } from "@/components/Rating";

export default function SalaryLeafClient({
  roleParam,
  cityParam,
}: {
  roleParam: string;
  cityParam: string;
}) {
  const role = DATA.roles.find((r) => r.slug === roleParam);
  const city = DATA.cities.find((c) => c.slug === cityParam);

  const { door, setDoor } = useSite();

  const [payInput, setPayInput] = useState<string>("130000");
  const [expKey, setExpKey] = useState<string>("b2");
  const [marker, setMarker] = useState<number | null>(130);
  const [hasChecked, setHasChecked] = useState<boolean>(false);
  const [verdict, setVerdict] = useState<{
    employerVerdict: { title: string; desc: string };
    candidateVerdict: { title: string; desc: string };
  } | null>(null);

  if (!role || !city) {
    notFound();
  }

  const bandData = DATA.bands[city.slug]?.[role.slug];
  if (!bandData) {
    notFound();
  }

  const levers = DATA.payLevers[role.slug] || [];

  const handlePayChange = (val: string) => {
    setPayInput(val);
    const num = parseFloat(val);
    if (!isNaN(num)) {
      const k = num > 1000 ? num / 1000 : num;
      if (k >= 30) {
        setMarker(k);
      }
    }
  };

  const handleCheck = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const raw = parseFloat(payInput);
    if (isNaN(raw)) return;
    const k = raw > 1000 ? raw / 1000 : raw;
    setMarker(k);
    setHasChecked(true);

    const pos = salaryPosition(city.slug, role.slug, expKey, k);
    const expLabel = DATA.expBands.find((e) => e.key === expKey)?.label || expKey;
    const r = pos.range || [0, 0];

    setVerdict({
      employerVerdict: {
        title: `Your offer of ${fmt.k(k)} sits ${pos.where === "in" ? "inside" : pos.where} the range.`,
        desc: `It is ${pos.text}`,
      },
      candidateVerdict: {
        title: `Your base of ${fmt.k(k)} is ${pos.where === "in" ? "inside" : pos.where} the usual range for ${expLabel}.`,
        desc: `In ${city.name} that range is $${r[0]}k–$${r[1]}k base. ${pos.where === "above" ? "Roles at this level are rare; we can tell you when one opens." : "Roles paying more are open now."}`,
      },
    });
  };

  const currentK = parseFloat(payInput) ? (parseFloat(payInput) > 1000 ? parseFloat(payInput) / 1000 : parseFloat(payInput)) : 130;

  // Matched jobs for candidate door
  let moreJobs = DATA.jobs
    .filter((j) => j.role === role.slug && j.city === city.slug && j.band[1] > currentK)
    .sort((a, b) => b.band[1] - a.band[1]);
  if (moreJobs.length === 0) {
    moreJobs = DATA.jobs.filter((j) => j.role === role.slug && j.city === city.slug);
  }

  // Matched candidates for employer door
  let inBand = inBandCandidates(role.slug, city.slug, currentK).slice(0, 3);
  if (inBand.length === 0) {
    inBand = matchCandidates({ role: role.slug, city: city.slug }).slice(0, 3);
  }

  // Other roles in this city
  const otherRolesInCity = DATA.roles
    .filter((r) => r.slug !== role.slug && DATA.bands[city.slug]?.[r.slug])
    .map((r) => ({
      ...r,
      band: DATA.bands[city.slug][r.slug],
    }));

  // Same role in other cities
  const sameRoleInOtherCities = DATA.cities
    .filter((c) => c.slug !== city.slug && DATA.bands[c.slug]?.[role.slug])
    .map((c) => ({
      ...c,
      band: DATA.bands[c.slug][role.slug],
    }));

  return (
    <div style={{ background: "#FAF9F5", color: "#08142A" }}>
      <style>{`
        .leaf-terms-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 18px;
        }
        .leaf-cards-3 {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 24px;
        }
        .leaf-split-2 {
          display: grid;
          grid-template-columns: 1.25fr 1fr;
          gap: 40px;
          align-items: start;
        }
        .leaf-compare-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
        }
        .leaf-hover-lift {
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
        }
        .leaf-hover-lift:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 30px rgba(8, 20, 42, 0.08);
          border-color: #1D4ED8;
        }
        .salary-door-toggle {
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        @media (max-width: 1024px) {
          .leaf-terms-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          .leaf-split-2 {
            grid-template-columns: 1fr;
          }
          .leaf-compare-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 960px) {
          .leaf-cards-3 {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 640px) {
          .leaf-terms-grid {
            grid-template-columns: 1fr;
          }
          .salary-leaf-hero {
            padding: 96px 0 52px !important;
          }
          .salary-badge {
            font-size: 11px !important;
            padding: 6px 14px !important;
            letter-spacing: 0.08em !important;
          }
          .salary-hero-title {
            font-size: clamp(28px, 7.8vw, 36px) !important;
            line-height: 1.18 !important;
            margin-bottom: 14px !important;
          }
          .salary-hero-subtitle {
            font-size: 15px !important;
            line-height: 1.55 !important;
            margin-bottom: 22px !important;
          }
          .salary-hero-actions {
            display: flex !important;
            flex-direction: column !important;
            width: 100% !important;
            max-width: 340px !important;
            margin: 0 auto 18px !important;
            gap: 10px !important;
          }
          .salary-hero-btn {
            width: 100% !important;
            justify-content: center !important;
            padding: 13px 18px !important;
            font-size: 15px !important;
            box-sizing: border-box !important;
            text-align: center !important;
          }
          .salary-micro-row {
            flex-direction: column !important;
            align-items: center !important;
            gap: 8px !important;
            font-size: 13px !important;
            width: 100% !important;
          }
        }
      `}</style>

      {/* 1. LUXURY CENTERED DARK HERO WITH VIDEO BACKGROUND */}
      <section
        className="hero-cinematic salary-leaf-hero"
        style={{
          position: "relative",
          background: "#08142A",
          color: "#FFFFFF",
          padding: "124px 0 88px",
          overflow: "hidden",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          textAlign: "center",
        }}
      >
        <div className="hero-video-wrap" aria-hidden="true">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="hero-video-el"
          >
            <source src="/videos/hero-water-splash.mp4" type="video/mp4" />
            <source src="/media/splash.mp4" type="video/mp4" />
          </video>
          <div className="hero-video-gradient" />
          <div className="hero-video-radial-aura" />
        </div>

        <div className="wrap hero-content-wrap" style={{ display: "block", position: "relative", zIndex: 3, maxWidth: 980, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <div className="hero-content-center" style={{ maxWidth: 880, margin: "0 auto", textAlign: "center" }}>
            {/* Centered Capsule Badge */}
            <div style={{ marginBottom: 20 }}>
              <div
                className="salary-badge"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.20)",
                  borderRadius: 999,
                  padding: "7px 18px",
                  fontFamily: "var(--mono)",
                  fontSize: 12,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#E2E8F0",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#60A5FA" }} />
                <span>COMPENSATION GUIDE · {city.name.toUpperCase()}, {city.state.toUpperCase()}</span>
              </div>
            </div>

            {/* Centered Display Heading - Prominent Executive Scale */}
            <h1
              className="salary-hero-title"
              style={{
                fontFamily: "var(--display)",
                fontSize: "clamp(40px, 5.2vw, 64px)",
                lineHeight: 1.10,
                fontWeight: 500,
                color: "#FFFFFF",
                letterSpacing: "-0.025em",
                margin: "0 auto 22px",
                textAlign: "center",
                maxWidth: 920,
                textWrap: "balance",
                textShadow: "0 2px 16px rgba(0, 0, 0, 0.45)",
              }}
            >
              {role.name} salary in{" "}
              <span className="serif-accent" style={{ color: "#93C5FD", fontStyle: "italic" }}>
                {city.name}, {city.state}
              </span>
            </h1>

            {/* Centered Subtitle - Readable Executive Scale */}
            <p
              className="salary-hero-subtitle"
              style={{
                fontSize: "clamp(18px, 1.8vw, 21px)",
                lineHeight: 1.65,
                color: "#CBD5E1",
                maxWidth: 780,
                margin: "0 auto 30px",
                textAlign: "center",
                textShadow: "0 1px 8px rgba(0, 0, 0, 0.4)",
              }}
            >
              Prevailing market base salaries from accepted lateral offers and active boutique mandates in {city.name}. Excludes discretionary collections bonuses.
            </p>

          {/* Centered Action Buttons (Clean & Executive - Exactly 2 Buttons) */}
          <div
            className="salary-hero-actions"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 14,
              marginBottom: 16,
            }}
          >
            <a
              href="#check"
              className="salary-hero-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#1D4ED8",
                color: "#FFFFFF",
                fontWeight: 600,
                fontSize: 16,
                padding: "14px 30px",
                borderRadius: 7,
                textDecoration: "none",
                boxShadow: "0 8px 20px rgba(29, 78, 216, 0.35)",
              }}
            >
              <span>Evaluate your offer</span>
              <span aria-hidden="true">↓</span>
            </a>
            <a
              href="https://calendly.com/orionplacement/call-with-justin"
              target="_blank"
              rel="noopener noreferrer"
              className="salary-hero-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.22)",
                color: "#FFFFFF",
                fontWeight: 600,
                fontSize: 16,
                padding: "14px 26px",
                borderRadius: 7,
                textDecoration: "none",
              }}
            >
              <span>Book 15 min with Justin</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>

          {/* Clean Subline link for open roles */}
          <div
            className="hero-subline"
            style={{
              textAlign: "center",
              marginBottom: 28,
              fontSize: 14,
              color: "#94A3B8",
            }}
          >
            Looking for open roles?{" "}
            <Link
              href={`/jobs/${role.slug}/${city.slug}`}
              style={{
                color: "#93C5FD",
                fontWeight: 500,
                textDecoration: "none",
                borderBottom: "1px solid rgba(147, 197, 253, 0.35)",
              }}
            >
              Browse {city.name} jobs ({moreJobs.length}) →
            </Link>
          </div>

          {/* Centered Micro-reassurances Row */}
          <div
            className="salary-micro-row"
            style={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap", gap: "14px 28px", color: "#CBD5E1", fontSize: 14.5 }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: "#60A5FA", fontWeight: 700 }}>✓</span>
              <span>Verified {city.name} lateral market offers</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: "#60A5FA", fontWeight: 700 }}>✓</span>
              <span>Base compensation disclosed upfront</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: "#60A5FA", fontWeight: 700 }}>✓</span>
              <span>Updated quarterly ({DATA.asOf})</span>
            </div>
          </div>
        </div>
      </div>
    </section>

      {/* 2. TRUST BAR STRIP */}
      <section className="trust-strip" aria-label="Orion in numbers" style={{ background: "#FFFFFF", borderBottom: "1px solid #E2E8F0" }}>
        <div className="wrap">
          <TrustBar kind={door === "candidate" ? "candidate" : "employer"} />
        </div>
      </section>

      {/* 2. BASE SALARY BY EXPERIENCE TIER (ELEVATED FULL-WIDTH VISUALIZER SECTION) */}
      <section style={{ background: "#FFFFFF", padding: "88px 0 96px", borderBottom: "1px solid #E2E8F0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          {/* Centered Section Header */}
          <div style={{ textAlign: "center", maxWidth: 780, margin: "0 auto 44px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#EFF6FF",
                border: "1px solid #DBEAFE",
                borderRadius: 999,
                padding: "6px 14px",
                fontFamily: "var(--mono)",
                fontSize: 11,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#1D4ED8",
                marginBottom: 14,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#1D4ED8" }} />
              <span>EXPERIENCE TIERS &amp; PERCENTILES</span>
            </div>
            <h2
              style={{
                fontFamily: "var(--display)",
                fontSize: "clamp(28px, 3.6vw, 42px)",
                color: "#08142A",
                margin: "0 auto 14px",
                fontWeight: 500,
                lineHeight: 1.2,
                maxWidth: "100%",
              }}
            >
              Base salary by{" "}
              <span className="serif-accent" style={{ color: "#1D4ED8", fontStyle: "italic" }}>
                experience tier
              </span>
            </h2>
            <p style={{ color: "#64748B", fontSize: 16, lineHeight: 1.6, margin: "0 auto", maxWidth: 680 }}>
              Prevailing 25th to 75th percentile base compensation for {role.short.toLowerCase()}s in {city.name}.
            </p>
          </div>

          <div
            style={{
              background: "#FAF9F5",
              border: "1.5px solid #EAE7DC",
              borderRadius: 16,
              padding: "36px 32px",
              boxShadow: "0 8px 30px rgba(8, 20, 42, 0.04)",
              color: "#08142A",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                borderBottom: "1.5px solid #E2E8F0",
                paddingBottom: 16,
                marginBottom: 24,
                flexWrap: "wrap",
                gap: 12,
              }}
            >
              <div>
                <span style={{ fontFamily: "var(--display)", fontSize: 22, color: "#08142A", fontWeight: 600, display: "block" }}>
                  {role.name} Market Band
                </span>
                <span style={{ fontSize: 13.5, color: "#64748B" }}>
                  {city.name}, {city.state} · 25th to 75th Percentile
                </span>
              </div>
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#1D4ED8",
                  background: "#EFF6FF",
                  padding: "5px 10px",
                  borderRadius: 6,
                  border: "1px solid #DBEAFE",
                }}
              >
                UPDATED {DATA.asOf}
              </span>
            </div>

            <div style={{ marginBottom: 24 }}>
              <SalaryBand
                citySlug={city.slug}
                roleSlug={role.slug}
                highlightKey={expKey}
                marker={marker ?? undefined}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, paddingTop: 16, borderTop: "1px solid #E2E8F0" }}>
              <p style={{ fontSize: 12.5, color: "#64748B", margin: 0, lineHeight: 1.5 }}>
                Source: <Mark>{DATA.source}</Mark>. Reflects verified lateral market offers. Base pay only before collections incentives.
              </p>
              <a
                href="#check"
                style={{
                  fontSize: 13.5,
                  fontWeight: 600,
                  color: "#1D4ED8",
                  textDecoration: "none",
                }}
              >
                Benchmark your exact pay below ↓
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2.5. REAL-TIME EVALUATION TERMINAL */}
      <section id="check" style={{ background: "#FAF9F5", padding: "88px 0 96px", borderBottom: "1px solid #EAE7DC" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          {/* Centered Section Header */}
          <div style={{ textAlign: "center", maxWidth: 780, margin: "0 auto 40px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#EFF6FF",
                border: "1px solid #DBEAFE",
                borderRadius: 999,
                padding: "6px 14px",
                fontFamily: "var(--mono)",
                fontSize: 11,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#1D4ED8",
                marginBottom: 14,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#1D4ED8" }} />
              <span>REAL-TIME BENCHMARK TERMINAL</span>
            </div>
            <h2
              style={{
                fontFamily: "var(--display)",
                fontSize: "clamp(28px, 3.6vw, 42px)",
                color: "#08142A",
                margin: "0 auto 14px",
                fontWeight: 500,
                lineHeight: 1.2,
                maxWidth: "100%",
              }}
            >
              {door === "employer" ? "Check your planned offer" : "Check where your salary sits"}
            </h2>
            <p style={{ color: "#64748B", fontSize: 16, lineHeight: 1.6, margin: "0 auto", maxWidth: 680 }}>
              {door === "employer"
                ? "Enter your target base compensation. The benchmark marker updates instantly, and candidate matches in that tier appear below."
                : "Enter your current base salary to see your percentile positioning and explore active higher-paying lateral seats in Texas."}
            </p>
          </div>

          <form
            onSubmit={handleCheck}
            style={{
              maxWidth: 720,
              margin: "0 auto 36px",
              background: "#FFFFFF",
              border: "1.5px solid #E2E8F0",
              borderRadius: 14,
              padding: "28px 24px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr auto",
              gap: 16,
              alignItems: "end",
              boxShadow: "0 4px 16px rgba(15,23,42,0.04)",
            }}
          >
            <div>
              <label htmlFor="o-pay" style={{ display: "block", fontFamily: "var(--mono)", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#08142A", marginBottom: 6 }}>
                {door === "employer" ? "Planned Base Offer ($/yr)" : "Current Base Salary ($/yr)"}
              </label>
              <input
                id="o-pay"
                type="number"
                inputMode="numeric"
                min="30000"
                max="400000"
                step="1000"
                value={payInput}
                onChange={(e) => handlePayChange(e.target.value)}
                placeholder="130000"
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: 7,
                  border: "1.5px solid #CBD5E1",
                  fontSize: 14.5,
                  color: "#08142A",
                  background: "#FFFFFF",
                }}
              />
            </div>

            <div>
              <label htmlFor="o-exp" style={{ display: "block", fontFamily: "var(--mono)", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#08142A", marginBottom: 6 }}>
                Seniority Level
              </label>
              <select
                id="o-exp"
                value={expKey}
                onChange={(e) => {
                  setExpKey(e.target.value);
                  if (payInput) handleCheck();
                }}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: 7,
                  border: "1.5px solid #CBD5E1",
                  fontSize: 14.5,
                  color: "#08142A",
                  background: "#FFFFFF",
                }}
              >
                {DATA.expBands.map((e) => (
                  <option key={e.key} value={e.key}>
                    {e.label}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              style={{
                background: "#1D4ED8",
                color: "#FFFFFF",
                border: "none",
                borderRadius: 7,
                fontWeight: 600,
                fontSize: 14.5,
                padding: "11px 22px",
                cursor: "pointer",
                whiteSpace: "nowrap",
                boxShadow: "0 4px 14px rgba(29, 78, 216, 0.3)",
              }}
            >
              {door === "employer" ? "Check offer" : "Benchmark pay"}
            </button>
          </form>

          {hasChecked && verdict && (
            <div
              id="verdict"
              style={{
                maxWidth: 720,
                margin: "0 auto 36px",
                background: "#EFF6FF",
                border: "1.5px solid #BFDBFE",
                borderRadius: 12,
                padding: "20px 24px",
              }}
            >
              <h3 style={{ fontFamily: "var(--display)", fontSize: 18, color: "#1E40AF", margin: "0 0 6px", fontWeight: 600 }}>
                {door === "employer" ? verdict.employerVerdict.title : verdict.candidateVerdict.title}
              </h3>
              <p style={{ fontSize: 14, color: "#1E3A8A", margin: 0, lineHeight: 1.55 }}>
                {door === "employer" ? verdict.employerVerdict.desc : verdict.candidateVerdict.desc}
              </p>
            </div>
          )}

          {/* Downstream Results: In-Band Candidates or Higher-Paying Open Roles */}
          {hasChecked && (
            <div id="offer-next" style={{ marginTop: 36 }}>
              {door === "employer" ? (
                <div>
                  <div style={{ textAlign: "center", marginBottom: 28 }}>
                    <span style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 700, color: "#1D4ED8", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                      MATCHING LATERAL TALENT
                    </span>
                    <h3 style={{ fontFamily: "var(--display)", fontSize: 24, color: "#08142A", margin: "6px 0 0", fontWeight: 600 }}>
                      {inBand.length > 0 ? `${inBand.length} candidate${inBand.length === 1 ? "" : "s"} open in this compensation tier` : "Candidates near this compensation band"}
                    </h3>
                  </div>

                  <div className="leaf-cards-3">
                    {inBand.map((r) => (
                      <div key={r.c.id} className="leaf-hover-lift" style={{ borderRadius: 14 }}>
                        <CandidateCard candidate={r.c} />
                      </div>
                    ))}
                  </div>

                  <div style={{ marginTop: 36, maxWidth: 680, margin: "36px auto 0" }}>
                    <GateForm
                      title={inBand.length === 1 ? "Request this candidate's full profile" : `Get the full profiles for these ${inBand.length} candidates`}
                      bullets={[
                        "Redacted resumes delivered within one business hour",
                        "Verified bar admission, practice history, and notice period",
                        "Standard one-page contingency agreement. Zero fee unless you decide to hire",
                      ]}
                      button="Send me the full profiles"
                      ids={inBand.map((r) => r.c.id)}
                      role={role.slug}
                      city={city.slug}
                      reviewSlug="brett-zimmerman"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ textAlign: "center", marginBottom: 28 }}>
                    <span style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 700, color: "#1D4ED8", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                      LATERAL OPPORTUNITIES
                    </span>
                    <h3 style={{ fontFamily: "var(--display)", fontSize: 24, color: "#08142A", margin: "6px 0 0", fontWeight: 600 }}>
                      {moreJobs.length > 0 ? `${moreJobs.length} ${city.name} role${moreJobs.length === 1 ? "" : "s"} paying more than ${fmt.k(currentK)}` : `${city.name} roles near your base`}
                    </h3>
                  </div>

                  <div className="leaf-cards-3">
                    {moreJobs.slice(0, 3).map((j) => (
                      <div key={j.id} className="leaf-hover-lift" style={{ borderRadius: 14 }}>
                        <JobCard job={j} />
                      </div>
                    ))}
                  </div>

                  <div style={{ display: "flex", justifyContent: "center", gap: 14, marginTop: 32, flexWrap: "wrap" }}>
                    <Link
                      href={`/jobs/${role.slug}/${city.slug}`}
                      style={{
                        background: "#1D4ED8",
                        color: "#FFFFFF",
                        padding: "12px 24px",
                        borderRadius: 7,
                        fontWeight: 600,
                        fontSize: 14.5,
                        textDecoration: "none",
                        boxShadow: "0 4px 14px rgba(29, 78, 216, 0.3)",
                      }}
                    >
                      <span>Explore all {city.name} roles</span>
                      <span aria-hidden="true">→</span>
                    </Link>
                    <Link
                      href={`/salary-check#role=${role.slug}&city=${city.slug}&base=${Math.round(currentK * 1000)}`}
                      style={{
                        background: "#FFFFFF",
                        color: "#08142A",
                        border: "1.5px solid #CBD5E1",
                        padding: "12px 24px",
                        borderRadius: 7,
                        fontWeight: 600,
                        fontSize: 14.5,
                        textDecoration: "none",
                      }}
                    >
                      <span>Full salary check with bonus calculator →</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* 3. WHAT MOVES PAY (3 COMPENSATION LEVERS) */}
      <section style={{ background: "#FFFFFF", padding: "88px 0 96px", borderBottom: "1px solid #E2E8F0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          {/* Centered Section Header */}
          <div style={{ textAlign: "center", maxWidth: 780, margin: "0 auto 44px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#EFF6FF",
                border: "1px solid #DBEAFE",
                borderRadius: 999,
                padding: "6px 14px",
                fontFamily: "var(--mono)",
                fontSize: 11,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#1D4ED8",
                marginBottom: 14,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#1D4ED8" }} />
              <span>COMPENSATION LEVERS</span>
            </div>
            <h2
              style={{
                fontFamily: "var(--display)",
                fontSize: "clamp(28px, 3.6vw, 42px)",
                color: "#08142A",
                margin: "0 auto 14px",
                fontWeight: 500,
                lineHeight: 1.2,
                maxWidth: "100%",
              }}
            >
              Three factors that move a lateral{" "}
              <span className="serif-accent" style={{ fontStyle: "italic", color: "#1D4ED8" }}>
                offer
              </span>
            </h2>
            <p style={{ color: "#64748B", fontSize: 16, lineHeight: 1.6, margin: "0 auto", maxWidth: 680 }}>
              Specific credentials and client assets that command higher base premiums in {city.name} law firms.
            </p>
          </div>

          <div className="leaf-cards-3">
            {levers.map((d, i) => (
              <div
                key={i}
                className="leaf-hover-lift"
                style={{
                  background: "#FAF9F5",
                  border: "1.5px solid #EAE7DC",
                  borderRadius: 14,
                  padding: "32px 26px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#1D4ED8", display: "inline-block", background: "#EFF6FF", padding: "4px 10px", borderRadius: 4, marginBottom: 14 }}>
                    {d.k}
                  </span>
                  <div style={{ fontFamily: "var(--display)", fontSize: 28, fontWeight: 700, color: "#08142A", marginBottom: 12 }}>
                    <Mark>{d.fig}</Mark>
                  </div>
                  <p style={{ fontSize: 14.5, lineHeight: 1.6, color: "#475569", margin: 0 }}>
                    {d.v}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. THE COMPLETE HOUSTON LEGAL SALARY GUIDE (DARK SECTION AS REQUESTED) */}
      <section
        style={{
          background: "radial-gradient(ellipse 90% 80% at 50% -20%, rgba(29, 78, 216, 0.22) 0%, rgba(8, 20, 42, 0.98) 75%, #08142A 100%)",
          padding: "96px 0 108px",
          color: "#FFFFFF",
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          {/* Centered Header */}
          <div style={{ textAlign: "center", maxWidth: 780, margin: "0 auto 48px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(29, 78, 216, 0.2)",
                border: "1px solid rgba(96, 165, 250, 0.3)",
                borderRadius: 999,
                padding: "6px 14px",
                fontFamily: "var(--mono)",
                fontSize: 11,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#93C5FD",
                marginBottom: 14,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#60A5FA" }} />
              <span>FREE REGIONAL INTELLIGENCE · EXECUTIVE PDF</span>
            </div>
            <h2
              style={{
                fontFamily: "var(--display)",
                fontSize: "clamp(28px, 3.6vw, 42px)",
                color: "#FFFFFF",
                margin: "0 auto 14px",
                fontWeight: 500,
                lineHeight: 1.2,
                maxWidth: "100%",
              }}
            >
              The complete {city.name} legal salary{" "}
              <span className="serif-accent" style={{ color: "#60A5FA", fontStyle: "italic" }}>
                guide
              </span>
            </h2>
            <p style={{ color: "#CBD5E1", fontSize: 16.5, lineHeight: 1.6, margin: "0 auto", maxWidth: 680 }}>
              Every practice area we recruit in {city.name}, published on an executive one-page PDF you can reference for partner compensation reviews.
            </p>
          </div>

          <div className="leaf-split-2">
            {/* Left Column: Dark Value Checklist */}
            <div
              style={{
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: 16,
                padding: "36px 32px",
              }}
            >
              <span style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 700, color: "#93C5FD", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 8 }}>
                WHAT IS INCLUDED
              </span>
              <h3 style={{ fontFamily: "var(--display)", fontSize: 24, color: "#FFFFFF", margin: "0 0 16px", fontWeight: 600 }}>
                Quarterly Market Intelligence
              </h3>
              <p style={{ color: "#CBD5E1", fontSize: 15, lineHeight: 1.6, marginBottom: 24 }}>
                Prepared directly by Orion Placement&apos;s managing recruiters, covering prevailing compensation patterns across Texas and national legal markets.
              </p>

              <div style={{ display: "grid", gap: 16 }}>
                <div style={{ display: "flex", gap: 12, alignItems: "start" }}>
                  <span style={{ color: "#60A5FA", fontWeight: 700, fontSize: 16 }}>✓</span>
                  <div>
                    <strong style={{ color: "#FFFFFF", display: "block", fontSize: 14.5 }}>Base Salary Percentiles for 10 Legal Roles</strong>
                    <span style={{ fontSize: 13.5, color: "#94A3B8" }}>Categorized strictly by years post-bar admission (1–3, 4–7, 8+ years).</span>
                  </div>
                </div>

                <div style={{ display: "flex", gap: 12, alignItems: "start" }}>
                  <span style={{ color: "#60A5FA", fontWeight: 700, fontSize: 16 }}>✓</span>
                  <div>
                    <strong style={{ color: "#FFFFFF", display: "block", fontSize: 14.5 }}>Discretionary Bonus &amp; Origination Norms</strong>
                    <span style={{ fontSize: 13.5, color: "#94A3B8" }}>Collection incentives, hours thresholds, and hybrid arrangement premiums.</span>
                  </div>
                </div>

                <div style={{ display: "flex", gap: 12, alignItems: "start" }}>
                  <span style={{ color: "#60A5FA", fontWeight: 700, fontSize: 16 }}>✓</span>
                  <div>
                    <strong style={{ color: "#FFFFFF", display: "block", fontSize: 14.5 }}>Updated Quarterly ({DATA.asOf})</strong>
                    <span style={{ fontSize: 13.5, color: "#94A3B8" }}>Drawn from accepted lateral placements and confidential boutique firm mandates.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Gate Form */}
            <div id="guide-gate">
              <GateForm
                eyebrow="FREE PDF REPORT"
                title={`Email me the ${city.name} salary guide`}
                button="Send me the guide"
                preset="guide"
                city={city.slug}
                audience={door === "candidate" ? "candidate" : "employer"}
                reviewSlug={door === "candidate" ? "n-brown" : "daffner-law"}
                fine="Delivered immediately as a PDF. Zero sales calls unless requested."
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. COMPARE OTHER PRACTICE AREAS AND CITIES (REDESIGNED PROPERLY) */}
      <section style={{ background: "#FFFFFF", padding: "88px 0 96px", borderBottom: "1px solid #E2E8F0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          {/* Centered Section Header */}
          <div style={{ textAlign: "center", maxWidth: 780, margin: "0 auto 44px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#EFF6FF",
                border: "1px solid #DBEAFE",
                borderRadius: 999,
                padding: "6px 14px",
                fontFamily: "var(--mono)",
                fontSize: 11,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#1D4ED8",
                marginBottom: 14,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#1D4ED8" }} />
              <span>CROSS-MARKET INTELLIGENCE</span>
            </div>
            <h2
              style={{
                fontFamily: "var(--display)",
                fontSize: "clamp(28px, 3.6vw, 42px)",
                color: "#08142A",
                margin: "0 auto 14px",
                fontWeight: 500,
                lineHeight: 1.2,
                maxWidth: "100%",
              }}
            >
              Compare other practice areas and{" "}
              <span className="serif-accent" style={{ fontStyle: "italic", color: "#1D4ED8" }}>
                cities
              </span>
            </h2>
            <p style={{ color: "#64748B", fontSize: 16, lineHeight: 1.6, margin: "0 auto", maxWidth: 680 }}>
              Cross-discipline benchmarks in {city.name} and regional salary comparisons across Texas and national legal hubs.
            </p>
          </div>

          <div className="leaf-compare-grid">
            {/* Panel 1: Other Roles in This City */}
            <div
              style={{
                background: "#FAF9F5",
                border: "1.5px solid #EAE7DC",
                borderRadius: 16,
                padding: "32px 28px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 20, paddingBottom: 12, borderBottom: "1.5px solid #E2E8F0" }}>
                <div>
                  <h3 style={{ fontFamily: "var(--display)", fontSize: 20, color: "#08142A", margin: 0, fontWeight: 600 }}>
                    Other roles in {city.name}
                  </h3>
                  <span style={{ fontSize: 13, color: "#64748B" }}>Prevailing base compensation by specialization</span>
                </div>
                <Link href={`/locations/texas/${city.slug === "houston-tx" ? "houston" : city.slug}`} style={{ fontSize: 12.5, color: "#1D4ED8", fontWeight: 600, textDecoration: "none" }}>
                  All {city.name} →
                </Link>
              </div>

              <div style={{ display: "grid", gap: 10 }}>
                {otherRolesInCity.slice(0, 6).map((r) => (
                  <Link
                    key={r.slug}
                    href={`/salaries/${r.slug}/${city.slug}`}
                    className="leaf-hover-lift"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      background: "#FFFFFF",
                      border: "1px solid #E2E8F0",
                      borderRadius: 10,
                      padding: "12px 16px",
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    <div>
                      <b style={{ display: "block", fontSize: 14.5, color: "#08142A" }}>{r.name}</b>
                      <span style={{ fontSize: 12, color: "#64748B" }}>Range: ${r.band.b1[0]}k–${r.band.b3[1]}k</span>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <span style={{ fontFamily: "var(--display)", fontSize: 16, fontWeight: 700, color: "#1D4ED8" }}>
                        {fmt.k(r.band.median)}
                      </span>
                      <span style={{ display: "block", fontSize: 11, color: "#64748B" }}>median</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Panel 2: Same Role in Other Cities */}
            <div
              style={{
                background: "#FAF9F5",
                border: "1.5px solid #EAE7DC",
                borderRadius: 16,
                padding: "32px 28px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 20, paddingBottom: 12, borderBottom: "1.5px solid #E2E8F0" }}>
                <div>
                  <h3 style={{ fontFamily: "var(--display)", fontSize: 20, color: "#08142A", margin: 0, fontWeight: 600 }}>
                    {role.short} pay in other cities
                  </h3>
                  <span style={{ fontSize: 13, color: "#64748B" }}>Regional differentials across top legal markets</span>
                </div>
                <Link href={`/roles/${role.slug}`} style={{ fontSize: 12.5, color: "#1D4ED8", fontWeight: 600, textDecoration: "none" }}>
                  Role hub →
                </Link>
              </div>

              <div style={{ display: "grid", gap: 10 }}>
                {sameRoleInOtherCities.slice(0, 6).map((c) => (
                  <Link
                    key={c.slug}
                    href={`/salaries/${role.slug}/${c.slug}`}
                    className="leaf-hover-lift"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      background: "#FFFFFF",
                      border: "1px solid #E2E8F0",
                      borderRadius: 10,
                      padding: "12px 16px",
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    <div>
                      <b style={{ display: "block", fontSize: 14.5, color: "#08142A" }}>{c.name}, {c.state}</b>
                      <span style={{ fontSize: 12, color: "#64748B" }}>Range: ${c.band.b1[0]}k–${c.band.b3[1]}k</span>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <span style={{ fontFamily: "var(--display)", fontSize: 16, fontWeight: 700, color: "#1D4ED8" }}>
                        {fmt.k(c.band.median)}
                      </span>
                      <span style={{ display: "block", fontSize: 11, color: "#64748B" }}>median</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. HOW WE MEASURE LEGAL COMPENSATION (DARK SECTION AS REQUESTED) */}
      <section
        id="method"
        style={{
          background: "radial-gradient(ellipse 90% 80% at 50% -20%, rgba(29, 78, 216, 0.22) 0%, rgba(8, 20, 42, 0.98) 75%, #08142A 100%)",
          padding: "96px 0 108px",
          color: "#FFFFFF",
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          {/* Centered Header */}
          <div style={{ textAlign: "center", maxWidth: 780, margin: "0 auto 48px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(29, 78, 216, 0.2)",
                border: "1px solid rgba(96, 165, 250, 0.3)",
                borderRadius: 999,
                padding: "6px 14px",
                fontFamily: "var(--mono)",
                fontSize: 11,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#93C5FD",
                marginBottom: 14,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#60A5FA" }} />
              <span>DATA INTEGRITY · STATISTICAL METHODOLOGY</span>
            </div>
            <h2
              style={{
                fontFamily: "var(--display)",
                fontSize: "clamp(28px, 3.6vw, 42px)",
                color: "#FFFFFF",
                margin: "0 auto 14px",
                fontWeight: 500,
                lineHeight: 1.2,
                maxWidth: "100%",
              }}
            >
              How we measure legal{" "}
              <span className="serif-accent" style={{ color: "#60A5FA", fontStyle: "italic" }}>
                compensation
              </span>
            </h2>
            <p style={{ color: "#CBD5E1", fontSize: 16.5, lineHeight: 1.6, margin: "0 auto", maxWidth: 680 }}>
              Bands originate from accepted offers and verified mandates placed through Orion for {role.name.toLowerCase()}s in the {city.name} metro, categorized strictly by years post-bar admission.
            </p>
          </div>

          <div className="leaf-cards-3">
            <div
              className="leaf-hover-lift"
              style={{
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: 14,
                padding: "32px 26px",
                textAlign: "center",
              }}
            >
              <div style={{ fontFamily: "var(--display)", fontSize: 40, color: "#60A5FA", fontWeight: 600, marginBottom: 8 }}>
                20+
              </div>
              <b style={{ display: "block", color: "#FFFFFF", fontSize: 16, marginBottom: 6 }}>Verified Data Points</b>
              <div style={{ fontSize: 14, color: "#94A3B8", lineHeight: 1.55 }}>
                Behind every published practice band, cross-referenced against boutique lateral placements.
              </div>
            </div>

            <div
              className="leaf-hover-lift"
              style={{
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: 14,
                padding: "32px 26px",
                textAlign: "center",
              }}
            >
              <div style={{ fontFamily: "var(--display)", fontSize: 40, color: "#FFFFFF", fontWeight: 600, marginBottom: 8 }}>
                25th–75th
              </div>
              <b style={{ display: "block", color: "#FFFFFF", fontSize: 16, marginBottom: 6 }}>Interquartile Spread</b>
              <div style={{ fontSize: 14, color: "#94A3B8", lineHeight: 1.55 }}>
                The range reflects the middle 50% spread, eliminating distorting single-firm anomalies.
              </div>
            </div>

            <div
              className="leaf-hover-lift"
              style={{
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: 14,
                padding: "32px 26px",
                textAlign: "center",
              }}
            >
              <div style={{ fontFamily: "var(--display)", fontSize: 40, color: "#4ADE80", fontWeight: 600, marginBottom: 8 }}>
                Quarterly
              </div>
              <b style={{ display: "block", color: "#FFFFFF", fontSize: 16, marginBottom: 6 }}>Systematic Updates</b>
              <div style={{ fontSize: 14, color: "#94A3B8", lineHeight: 1.55 }}>
                Effective dates continuously audited to ensure data matches active recruiting quarters.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. REVIEWS (HOMEPAGE-STYLE MIDNIGHT NAVY DARK SECTION AS REQUESTED) */}
      <section className="block reviews-sec" id="reviews">
        <div className="wrap">
          <div className="sec-head-premium">
            <div className="badge-capsule">
              <span className="badge-dot" />
              GOOGLE REVIEWS · VERIFIED CLIENTS &amp; CANDIDATES
            </div>
            <h2 className="sec-title-lg">
              Why law firms &amp; candidates partner with{" "}
              <span className="serif-accent">Orion</span>
            </h2>
            <div className="reviews-rating-pill">
              <RatingBadge link />
            </div>
          </div>

          <ReviewsSection kind="mixed" />

          {/* Bottom Reassurance & All Reviews Link */}
          <div className="reviews-bottom-bar">
            <div className="reviews-bottom-trust">
              <span className="reviews-bottom-dot" />
              <span>
                100% verified public Google reviews · Jon is named in <strong>{DATA.trust.jonNamed} of {DATA.trust.reviews}</strong> reviews
              </span>
            </div>
            <a
              href={DATA.trust.google}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-reviews-google"
            >
              <span>Read all {DATA.trust.reviews} reviews on Google</span>
              <svg aria-hidden="true" viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
                <path d="M10.3 3.3a1 1 0 0 1 1.4 0l6 6a1 1 0 0 1 0 1.4l-6 6a1 1 0 1 1-1.4-1.4l4.3-4.3H3a1 1 0 1 1 0-2h11.6l-4.3-4.3a1 1 0 0 1 0-1.4Z" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* 8. REGIONAL FAQ ACCORDION (CENTERED & PROPERLY ALIGNED) */}
      <section style={{ background: "#FAF9F5", padding: "88px 0 96px", borderBottom: "1px solid #EAE7DC" }}>
        <div style={{ maxWidth: 840, margin: "0 auto", padding: "0 24px" }}>
          {/* Centered Section Header */}
          <div style={{ textAlign: "center", maxWidth: 780, margin: "0 auto 44px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#EFF6FF",
                border: "1px solid #DBEAFE",
                borderRadius: 999,
                padding: "6px 14px",
                fontFamily: "var(--mono)",
                fontSize: 11,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#1D4ED8",
                marginBottom: 14,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#1D4ED8" }} />
              <span>COMPENSATION QUESTIONS</span>
            </div>
            <h2
              style={{
                fontFamily: "var(--display)",
                fontSize: "clamp(28px, 3.6vw, 42px)",
                color: "#08142A",
                margin: "0 auto 14px",
                fontWeight: 500,
                lineHeight: 1.2,
                maxWidth: "100%",
              }}
            >
              {role.short} pay in{" "}
              <span className="serif-accent" style={{ fontStyle: "italic", color: "#1D4ED8" }}>
                {city.name}
              </span>
            </h2>
            <p style={{ color: "#64748B", fontSize: 16, lineHeight: 1.6, margin: "0 auto", maxWidth: 680 }}>
              Common market factors that influence lateral offer structures in {city.name}.
            </p>
          </div>

          <div style={{ display: "grid", gap: 14 }}>
            <details style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 12, padding: "20px 24px" }}>
              <summary style={{ fontWeight: 600, color: "#08142A", cursor: "pointer", fontSize: 16 }}>
                What does {/^[aeiou]/i.test(role.name) ? "an" : "a"} {role.name.toLowerCase()} earn in {city.name}?
              </summary>
              <p style={{ marginTop: 14, color: "#475569", lineHeight: 1.6, fontSize: 14.5, margin: "14px 0 0" }}>
                The prevailing median base salary is <strong style={{ color: "#08142A" }}>${bandData.median}k</strong>. Associates with 1 to 3 years experience generally earn ${bandData.b1[0]}k–${bandData.b1[1]}k, mid-levels (4 to 7 years) command ${bandData.b2[0]}k–${bandData.b2[1]}k, and senior attorneys with 8+ years earn ${bandData.b3[0]}k–${bandData.b3[1]}k base before origination or bonus splits.
              </p>
            </details>

            <details style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 12, padding: "20px 24px" }}>
              <summary style={{ fontWeight: 600, color: "#08142A", cursor: "pointer", fontSize: 16 }}>
                Does a portable book of business change the base offer?
              </summary>
              <p style={{ marginTop: 14, color: "#475569", lineHeight: 1.6, fontSize: 14.5, margin: "14px 0 0" }}>
                Yes. Even a modest book of existing clients ($75k–$150k) is the single strongest compensation lever in Texas, typically commanding a $15k to $30k immediate premium on base, alongside an aggressive origination split (often 20% to 35% of collected fees).
              </p>
            </details>

            <details style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 12, padding: "20px 24px" }}>
              <summary style={{ fontWeight: 600, color: "#08142A", cursor: "pointer", fontSize: 16 }}>
                Do small boutique firms pay less than large AmLaw firms?
              </summary>
              <p style={{ marginTop: 14, color: "#475569", lineHeight: 1.6, fontSize: 14.5, margin: "14px 0 0" }}>
                In base salary, Texas boutiques sit slightly below AmLaw locksteps. However, boutiques feature substantially lower billable hour requirements (e.g. 1,500 vs. 2,100 hours) and direct fee-collection incentives that frequently yield equal or superior net earnings with better quality of life.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* 9. BOTTOM MIDNIGHT NAVY CTA BAND */}
      <section
        style={{
          background: "radial-gradient(ellipse 90% 80% at 50% -20%, rgba(29, 78, 216, 0.28) 0%, rgba(8, 20, 42, 0.98) 75%, #08142A 100%)",
          padding: "96px 0 108px",
          textAlign: "center",
          color: "#FFFFFF",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 999,
              padding: "6px 14px",
              fontFamily: "var(--mono)",
              fontSize: 11,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#93C5FD",
              marginBottom: 18,
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#60A5FA" }} />
            <span>EXECUTIVE LEGAL PLACEMENT</span>
          </div>

          <h2
            style={{
              fontFamily: "var(--display)",
              fontSize: "clamp(32px, 4.2vw, 48px)",
              color: "#FFFFFF",
              margin: "0 0 16px",
              fontWeight: 500,
              lineHeight: 1.15,
            }}
          >
            Hire or explore lateral {role.name.toLowerCase()} roles in{" "}
            <span className="serif-accent" style={{ color: "#60A5FA", fontStyle: "italic" }}>
              {city.name}
            </span>
          </h2>

          <p style={{ color: "#CBD5E1", fontSize: 17, lineHeight: 1.6, marginBottom: 34, maxWidth: 640, margin: "0 auto 34px" }}>
            Access vetted candidate dossiers or schedule a confidential 15-minute compensation and search consultation with Justin.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            <Link
              href={`/find-candidates#role=${role.slug}&city=${city.slug}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#1D4ED8",
                color: "#FFFFFF",
                fontWeight: 600,
                fontSize: 16,
                padding: "14px 34px",
                borderRadius: 7,
                textDecoration: "none",
                boxShadow: "0 8px 24px rgba(29, 78, 216, 0.35)",
              }}
            >
              <span>See {city.name} candidates</span>
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href={`/jobs/${role.slug}/${city.slug}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.18)",
                color: "#FFFFFF",
                fontWeight: 600,
                fontSize: 16,
                padding: "14px 34px",
                borderRadius: 7,
                textDecoration: "none",
              }}
            >
              <span>Browse open roles</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
