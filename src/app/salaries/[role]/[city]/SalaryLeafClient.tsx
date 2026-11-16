"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DATA, fmt, salaryPosition, inBandCandidates, matchCandidates } from "@/data";
import { useSite } from "@/context/SiteContext";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Mark } from "@/components/Mark";
import { SalaryBand } from "@/components/SalaryBand";
import { CandidateCard } from "@/components/CandidateCard";
import { JobCard } from "@/components/JobCard";
import { GateForm } from "@/components/GateForm";
import { Neighbours } from "@/components/PayTables";
import { ReviewCard } from "@/components/ReviewCard";
import { RatingBadge } from "@/components/Rating";

export function SalaryLeafClient({
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

  return (
    <div style={{ background: "#FAF9F5", color: "#08142A" }}>
      {/* 1. LUXURY HERO WITH VIDEO & 2-COLUMN BENCHMARK TERMINAL */}
      <section
        className="emp-luxury-hero-sec leaf-hero"
        style={{
          position: "relative",
          background: "#08142A",
          color: "#FFFFFF",
          padding: "124px 0 76px",
          overflow: "hidden",
        }}
      >
        <div className="emp-hero-video-wrap" aria-hidden="true">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="emp-hero-video"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.22,
            }}
          >
            <source src="/media/splash.mp4" type="video/mp4" />
          </video>
          <div
            className="emp-hero-overlay"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(180deg, rgba(8,20,42,0.85) 0%, rgba(8,20,42,0.96) 100%)",
            }}
          />
        </div>

        <div className="wrap" style={{ position: "relative", zIndex: 2, maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
          {/* Breadcrumb Navigation */}
          <div style={{ marginBottom: 20 }}>
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: city.name, href: `/locations/texas/${city.slug === "houston-tx" ? "houston" : city.slug}` },
                { label: `${role.name} Salary`, current: true },
              ]}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 40, alignItems: "center" }}>
            {/* Left Column: Heading & Value */}
            <div>
              <div className="emp-hero-badge-wrap" style={{ marginBottom: 16 }}>
                <div
                  className="badge-capsule"
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
                  }}
                >
                  <span className="badge-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#60A5FA" }} />
                  <span>COMPENSATION GUIDE · {city.name.toUpperCase()}, {city.state.toUpperCase()}</span>
                </div>
              </div>

              <h1
                className="emp-hero-h1"
                style={{
                  fontFamily: "var(--display)",
                  fontSize: "clamp(34px, 4.4vw, 52px)",
                  lineHeight: 1.12,
                  fontWeight: 500,
                  color: "#FFFFFF",
                  margin: "0 0 18px",
                }}
              >
                {role.name} salary in{" "}
                <span className="serif-accent" style={{ color: "#60A5FA", fontStyle: "italic" }}>
                  {city.name}
                </span>
              </h1>

              <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 16 }}>
                <span style={{ fontFamily: "var(--display)", fontSize: "clamp(44px, 5.5vw, 64px)", fontWeight: 500, color: "#FFFFFF", lineHeight: 1 }}>
                  {fmt.k(bandData.median)}
                </span>
                <span style={{ fontFamily: "var(--mono)", fontSize: 13, color: "#93C5FD", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>
                  Median Base Salary across all seniority levels
                </span>
              </div>

              <p
                className="emp-hero-lead"
                style={{
                  fontSize: 16.5,
                  lineHeight: 1.6,
                  color: "#CBD5E1",
                  maxWidth: 580,
                  margin: "0 0 24px",
                }}
              >
                Prevailing market base salaries from accepted lateral offers and active boutique mandates in {city.name}. Excludes discretionary collections bonuses.
              </p>

              {/* Perspective Toggle: Employer vs Candidate */}
              <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, padding: "5px 6px", marginBottom: 28 }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.06em", padding: "0 8px" }}>
                  I am:
                </span>
                <button
                  type="button"
                  onClick={() => setDoor("employer")}
                  style={{
                    padding: "7px 16px",
                    borderRadius: 6,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                    border: "none",
                    background: door === "employer" ? "#1D4ED8" : "transparent",
                    color: door === "employer" ? "#FFFFFF" : "#CBD5E1",
                    transition: "all 0.15s ease",
                  }}
                >
                  Hiring firm
                </button>
                <button
                  type="button"
                  onClick={() => setDoor("candidate")}
                  style={{
                    padding: "7px 16px",
                    borderRadius: 6,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                    border: "none",
                    background: door === "candidate" ? "#1D4ED8" : "transparent",
                    color: door === "candidate" ? "#FFFFFF" : "#CBD5E1",
                    transition: "all 0.15s ease",
                  }}
                >
                  Candidate exploring
                </button>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
                <a
                  className="btn-emp-primary"
                  href="#check"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: "#1D4ED8",
                    color: "#FFFFFF",
                    fontWeight: 600,
                    fontSize: 15,
                    padding: "13px 26px",
                    borderRadius: 7,
                    textDecoration: "none",
                  }}
                >
                  <span>{door === "employer" ? "Evaluate your offer" : "Benchmark your salary"}</span>
                  <span aria-hidden="true">↓</span>
                </a>
                <Link
                  className="btn-emp-ghost"
                  href={`/find-candidates#role=${role.slug}&city=${city.slug}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.18)",
                    color: "#FFFFFF",
                    fontWeight: 600,
                    fontSize: 15,
                    padding: "13px 24px",
                    borderRadius: 7,
                    textDecoration: "none",
                  }}
                >
                  <span>See {city.name} talent pool</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Elevated Live Salary Band Visualizer */}
            <div>
              <div
                style={{
                  background: "#FFFFFF",
                  border: "1.5px solid #E2E8F0",
                  borderRadius: 14,
                  padding: "28px 24px",
                  boxShadow: "0 24px 60px -12px rgba(0, 0, 0, 0.55)",
                  color: "#08142A",
                  textAlign: "left",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    borderBottom: "1.5px solid #E2E8F0",
                    paddingBottom: 14,
                    marginBottom: 20,
                  }}
                >
                  <div>
                    <span style={{ fontFamily: "var(--display)", fontSize: 20, color: "#08142A", fontWeight: 600, display: "block" }}>
                      Base Salary by Experience Tier
                    </span>
                    <span style={{ fontSize: 13, color: "#64748B" }}>
                      {role.short} in {city.name}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 10.5,
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "#1D4ED8",
                      background: "#EFF6FF",
                      padding: "4px 8px",
                      borderRadius: 4,
                      border: "1px solid #DBEAFE",
                    }}
                  >
                    UPDATED {DATA.asOf}
                  </span>
                </div>

                <div style={{ marginBottom: 18 }}>
                  <SalaryBand
                    citySlug={city.slug}
                    roleSlug={role.slug}
                    highlightKey={expKey}
                    marker={marker ?? undefined}
                  />
                </div>

                <p style={{ fontSize: 12, color: "#64748B", margin: 0, paddingTop: 14, borderTop: "1px solid #E2E8F0", lineHeight: 1.5 }}>
                  Source: <Mark>{DATA.source}</Mark>. Reflects interquartile 25th–75th percentiles of verified lateral market offers. Base pay only before collections incentives.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. REAL-TIME EVALUATION TERMINAL */}
      <section className="emp-process-sec" id="check" style={{ background: "#FAF9F5", padding: "88px 0 96px", borderBottom: "1px solid #EAE7DC" }}>
        <div className="wrap" style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
          <div className="sec-head" style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 40px" }}>
            <span
              className="eyebrow"
              style={{
                fontFamily: "var(--mono)",
                fontSize: 12,
                color: "#1D4ED8",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: 8,
              }}
            >
              REAL-TIME BENCHMARK TERMINAL
            </span>
            <h2
              style={{
                fontFamily: "var(--display)",
                fontSize: "clamp(28px, 3.6vw, 42px)",
                color: "#08142A",
                margin: "0 0 14px",
                fontWeight: 500,
              }}
            >
              {door === "employer" ? "Check your planned offer" : "Check where your salary sits"}
            </h2>
            <p style={{ color: "#64748B", fontSize: 16, lineHeight: 1.6, margin: 0 }}>
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
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
                    <div>
                      <span style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 700, color: "#1D4ED8", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                        MATCHING LATERAL TALENT
                      </span>
                      <h3 style={{ fontFamily: "var(--display)", fontSize: 24, color: "#08142A", margin: "4px 0 0", fontWeight: 600 }}>
                        {inBand.length > 0 ? `${inBand.length} candidate${inBand.length === 1 ? "" : "s"} open in this compensation tier` : "Candidates near this compensation band"}
                      </h3>
                    </div>
                  </div>

                  <div className="cards" style={{ display: "grid", gap: 20 }}>
                    {inBand.map((r) => (
                      <CandidateCard key={r.c.id} candidate={r.c} />
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
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
                    <div>
                      <span style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 700, color: "#1D4ED8", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                        LATERAL OPPORTUNITIES
                      </span>
                      <h3 style={{ fontFamily: "var(--display)", fontSize: 24, color: "#08142A", margin: "4px 0 0", fontWeight: 600 }}>
                        {moreJobs.length > 0 ? `${moreJobs.length} ${city.name} role${moreJobs.length === 1 ? "" : "s"} paying more than ${fmt.k(currentK)}` : `${city.name} roles near your base`}
                      </h3>
                    </div>
                  </div>

                  <div className="cards" style={{ display: "grid", gap: 20 }}>
                    {moreJobs.slice(0, 3).map((j) => (
                      <JobCard key={j.id} job={j} />
                    ))}
                  </div>

                  <div style={{ display: "flex", justifyContent: "center", gap: 14, marginTop: 32, flexWrap: "wrap" }}>
                    <Link
                      className="btn-emp-primary"
                      href={`/jobs/${role.slug}/${city.slug}`}
                      style={{
                        background: "#1D4ED8",
                        color: "#FFFFFF",
                        padding: "12px 24px",
                        borderRadius: 7,
                        fontWeight: 600,
                        fontSize: 14,
                        textDecoration: "none",
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
                        fontSize: 14,
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
      <section className="emp-process-sec" style={{ background: "#FFFFFF", padding: "88px 0 96px", borderBottom: "1px solid #E2E8F0" }}>
        <div className="wrap" style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
          <div className="sec-head" style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 44px" }}>
            <span
              className="eyebrow"
              style={{
                fontFamily: "var(--mono)",
                fontSize: 12,
                color: "#1D4ED8",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: 8,
              }}
            >
              COMPENSATION LEVERS
            </span>
            <h2
              style={{
                fontFamily: "var(--display)",
                fontSize: "clamp(28px, 3.6vw, 42px)",
                color: "#08142A",
                margin: "0 0 14px",
                fontWeight: 500,
              }}
            >
              Three factors that move a lateral <span className="serif-accent" style={{ fontStyle: "italic" }}>offer</span>
            </h2>
            <p style={{ color: "#64748B", fontSize: 16, lineHeight: 1.6, margin: 0 }}>
              Specific credentials and client assets that command higher base premiums in {city.name} law firms.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {levers.map((d, i) => (
              <div
                key={i}
                style={{
                  background: "#FAF9F5",
                  border: "1.5px solid #EAE7DC",
                  borderRadius: 12,
                  padding: "26px 22px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#1D4ED8", display: "block", marginBottom: 6 }}>
                    {d.k}
                  </span>
                  <div style={{ fontFamily: "var(--display)", fontSize: 26, fontWeight: 600, color: "#08142A", marginBottom: 10 }}>
                    <Mark>{d.fig}</Mark>
                  </div>
                  <p style={{ fontSize: 13.5, lineHeight: 1.55, color: "#475569", margin: 0 }}>
                    {d.v}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SALARY GUIDE EMAIL OFFER */}
      <section className="emp-process-sec" style={{ background: "#FAF9F5", padding: "88px 0 96px", borderBottom: "1px solid #EAE7DC" }}>
        <div className="wrap split" style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 48, alignItems: "start" }}>
          <div>
            <div className="sec-head">
              <span
                className="eyebrow"
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 12,
                  color: "#1D4ED8",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: 8,
                }}
              >
                FREE REGIONAL INTELLIGENCE
              </span>
              <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(28px, 3.6vw, 40px)", color: "#08142A", margin: "0 0 14px", fontWeight: 500 }}>
                The complete {city.name} legal salary <span className="serif-accent" style={{ fontStyle: "italic" }}>guide</span>
              </h2>
              <p style={{ color: "#64748B", fontSize: 16, lineHeight: 1.6, margin: "0 0 24px" }}>
                Every practice area we recruit in {city.name}, published on an executive one-page PDF you can reference for partner compensation reviews.
              </p>
            </div>

            <div style={{ display: "grid", gap: 12 }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <span style={{ color: "#1D4ED8", fontWeight: 700 }}>✓</span>
                <span style={{ fontSize: 14, color: "#334155" }}>Base salary percentiles for 10 legal roles by years post-bar</span>
              </div>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <span style={{ color: "#1D4ED8", fontWeight: 700 }}>✓</span>
                <span style={{ fontSize: 14, color: "#334155" }}>Discretionary bonus norms and hybrid arrangement premiums</span>
              </div>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <span style={{ color: "#1D4ED8", fontWeight: 700 }}>✓</span>
                <span style={{ fontSize: 14, color: "#334155" }}>Updated quarterly from real boutique firm offers</span>
              </div>
            </div>
          </div>

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
      </section>

      {/* 5. METRO & ROLE COMPARISONS */}
      <section className="emp-process-sec" style={{ background: "#FFFFFF", padding: "88px 0 96px", borderBottom: "1px solid #E2E8F0" }}>
        <div className="wrap" style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
          <div className="sec-head" style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 40px" }}>
            <span
              className="eyebrow"
              style={{
                fontFamily: "var(--mono)",
                fontSize: 12,
                color: "#1D4ED8",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: 8,
              }}
            >
              CROSS-MARKET INTELLIGENCE
            </span>
            <h2
              style={{
                fontFamily: "var(--display)",
                fontSize: "clamp(28px, 3.6vw, 42px)",
                color: "#08142A",
                margin: "0 0 14px",
                fontWeight: 500,
              }}
            >
              Compare other practice areas and cities
            </h2>
          </div>

          <div style={{ background: "#FAF9F5", border: "1.5px solid #EAE7DC", borderRadius: 14, padding: "28px" }}>
            <Neighbours roleSlug={role.slug} citySlug={city.slug} />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20, paddingTop: 14, borderTop: "1px solid #EAE7DC", flexWrap: "wrap", gap: 10 }}>
              <Link href={`/roles/${role.slug}`} style={{ fontSize: 13.5, color: "#1D4ED8", fontWeight: 600, textDecoration: "none" }}>
                <span>{role.name} national hub →</span>
              </Link>
              <Link href={`/locations/texas/${city.slug === "houston-tx" ? "houston" : city.slug}`} style={{ fontSize: 13.5, color: "#1D4ED8", fontWeight: 600, textDecoration: "none" }}>
                <span>Legal recruiters in {city.name} →</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. METHODOLOGY & STATS */}
      <section className="emp-process-sec" id="method" style={{ background: "#FAF9F5", padding: "88px 0 96px", borderBottom: "1px solid #EAE7DC" }}>
        <div className="wrap" style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
          <div className="sec-head" style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 44px" }}>
            <span
              className="eyebrow"
              style={{
                fontFamily: "var(--mono)",
                fontSize: 12,
                color: "#1D4ED8",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: 8,
              }}
            >
              DATA INTEGRITY
            </span>
            <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(28px, 3.6vw, 42px)", color: "#08142A", margin: "0 0 14px", fontWeight: 500 }}>
              How we measure legal compensation
            </h2>
            <p style={{ color: "#64748B", fontSize: 16, lineHeight: 1.6, margin: 0 }}>
              Bands originate from accepted offers and verified mandates placed through Orion for {role.name.toLowerCase()}s in the {city.name} metro, categorized strictly by years post-bar admission.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            <div style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 12, padding: "26px 22px", textAlign: "center" }}>
              <div style={{ fontFamily: "var(--display)", fontSize: 36, color: "#1D4ED8", fontWeight: 600, marginBottom: 4 }}>
                20+
              </div>
              <div style={{ fontSize: 13, color: "#64748B" }}>Verified data points behind every published band</div>
            </div>
            <div style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 12, padding: "26px 22px", textAlign: "center" }}>
              <div style={{ fontFamily: "var(--display)", fontSize: 36, color: "#08142A", fontWeight: 600, marginBottom: 4 }}>
                25th–75th
              </div>
              <div style={{ fontSize: 13, color: "#64748B" }}>The range reflects the middle 50% interquartile spread</div>
            </div>
            <div style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 12, padding: "26px 22px", textAlign: "center" }}>
              <div style={{ fontFamily: "var(--display)", fontSize: 36, color: "#059669", fontWeight: 600, marginBottom: 4 }}>
                Quarterly
              </div>
              <div style={{ fontSize: 13, color: "#64748B" }}>Systematic review cycle with published effective date</div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. REVIEWS */}
      <section className="emp-process-sec" style={{ background: "#FFFFFF", padding: "88px 0 96px", borderBottom: "1px solid #E2E8F0" }}>
        <div className="wrap" style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
          <div className="sec-head row" style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 40, flexWrap: "wrap", gap: 14 }}>
            <div>
              <span
                className="eyebrow"
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 12,
                  color: "#1D4ED8",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: 8,
                }}
              >
                VERIFIED TESTIMONIALS
              </span>
              <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(26px, 3.4vw, 38px)", color: "#08142A", margin: 0, fontWeight: 500 }}>
                Why law firms &amp; candidates partner with Orion
              </h2>
            </div>
            <RatingBadge link={true} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20 }}>
            {door === "employer" ? (
              <>
                <ReviewCard review={DATA.reviews[0]} />
                <ReviewCard review={DATA.reviews[1]} />
                <ReviewCard review={DATA.reviews[3]} />
              </>
            ) : (
              <>
                <ReviewCard review={DATA.reviews[2]} />
                <ReviewCard review={DATA.reviews[5]} />
              </>
            )}
          </div>
        </div>
      </section>

      {/* 8. REGIONAL FAQ ACCORDION */}
      <section className="emp-process-sec" style={{ background: "#FAF9F5", padding: "88px 0 96px", borderBottom: "1px solid #EAE7DC" }}>
        <div className="wrap split" style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 48, alignItems: "start" }}>
          <div className="sec-head">
            <span
              className="eyebrow"
              style={{
                fontFamily: "var(--mono)",
                fontSize: 12,
                color: "#1D4ED8",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: 8,
              }}
            >
              COMPENSATION QUESTIONS
            </span>
            <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(28px, 3.6vw, 40px)", color: "#08142A", margin: "0 0 14px", fontWeight: 500 }}>
              {role.short} pay in <span className="serif-accent" style={{ fontStyle: "italic" }}>{city.name}</span>
            </h2>
            <p style={{ color: "#64748B", fontSize: 15, lineHeight: 1.6 }}>
              Common market factors that influence lateral offer structures in {city.name}.
            </p>
          </div>

          <div className="faq" style={{ display: "grid", gap: 14 }}>
            <details style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 10, padding: "18px 22px" }}>
              <summary style={{ fontWeight: 600, color: "#08142A", cursor: "pointer", fontSize: 15 }}>
                What does {/^[aeiou]/i.test(role.name) ? "an" : "a"} {role.name.toLowerCase()} earn in {city.name}?
              </summary>
              <p style={{ marginTop: 12, color: "#475569", lineHeight: 1.6, fontSize: 14, margin: "12px 0 0" }}>
                The prevailing median base salary is <strong style={{ color: "#08142A" }}>${bandData.median}k</strong>. Associates with 1 to 3 years experience generally earn ${bandData.b1[0]}k–${bandData.b1[1]}k, mid-levels (4 to 7 years) command ${bandData.b2[0]}k–${bandData.b2[1]}k, and senior attorneys with 8+ years earn ${bandData.b3[0]}k–${bandData.b3[1]}k base before origination or bonus splits.
              </p>
            </details>

            <details style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 10, padding: "18px 22px" }}>
              <summary style={{ fontWeight: 600, color: "#08142A", cursor: "pointer", fontSize: 15 }}>
                Does a portable book of business change the base offer?
              </summary>
              <p style={{ marginTop: 12, color: "#475569", lineHeight: 1.6, fontSize: 14, margin: "12px 0 0" }}>
                Yes. Even a modest book of existing clients ($75k–$150k) is the single strongest compensation lever in Texas, typically commanding a $15k to $30k immediate premium on base, alongside an aggressive origination split (often 20% to 35% of collected fees).
              </p>
            </details>

            <details style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 10, padding: "18px 22px" }}>
              <summary style={{ fontWeight: 600, color: "#08142A", cursor: "pointer", fontSize: 15 }}>
                Do small boutique firms pay less than large AmLaw firms?
              </summary>
              <p style={{ marginTop: 12, color: "#475569", lineHeight: 1.6, fontSize: 14, margin: "12px 0 0" }}>
                In base salary, Texas boutiques sit slightly below AmLaw locksteps. However, boutiques feature substantially lower billable hour requirements (e.g. 1,500 vs. 2,100 hours) and direct fee-collection incentives that frequently yield equal or superior net earnings with better quality of life.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* 9. BOTTOM MIDNIGHT NAVY CTA BAND */}
      <section className="emp-terms-dark-sec" style={{ background: "#08142A", padding: "96px 0 108px", textAlign: "center" }}>
        <div className="wrap" style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px" }}>
          <div
            className="badge-capsule"
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
            <span className="badge-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#60A5FA" }} />
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
            {door === "employer" ? (
              <>
                Hire qualified {role.short} talent in{" "}
                <span className="serif-accent" style={{ color: "#60A5FA", fontStyle: "italic" }}>
                  {city.name}
                </span>
              </>
            ) : (
              <>
                Explore higher-paying {city.name} seats{" "}
                <span className="serif-accent" style={{ color: "#60A5FA", fontStyle: "italic" }}>
                  with pay disclosed
                </span>
              </>
            )}
          </h2>

          <p style={{ color: "#CBD5E1", fontSize: 17, lineHeight: 1.6, marginBottom: 34, maxWidth: 640, margin: "0 auto 34px" }}>
            {door === "employer"
              ? "Access pre-screened lateral dossiers ready for partner interview. Standard 23% fee due only if you hire."
              : "Review confidential Texas lateral openings with verified compensation. No firm sees your name until you say yes."}
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            {door === "employer" ? (
              <>
                <Link
                  href={`/find-candidates#role=${role.slug}&city=${city.slug}`}
                  className="btn-emp-primary"
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
                  }}
                >
                  <span>See {city.name} candidates</span>
                  <span aria-hidden="true">→</span>
                </Link>
                <Link
                  href="/submit-job"
                  className="btn-emp-ghost"
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
                  <span>Submit your mandate</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  href={`/jobs/${role.slug}/${city.slug}`}
                  className="btn-emp-primary"
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
                  }}
                >
                  <span>See {city.name} roles</span>
                  <span aria-hidden="true">→</span>
                </Link>
                <Link
                  href="/upload-resume"
                  className="btn-emp-ghost"
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
                  <span>Upload resume</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
