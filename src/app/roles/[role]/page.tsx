import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  roles,
  cities,
  expBands,
  bands,
  payModels,
  findRole,
  findBand,
  matchCandidates,
  jobs,
  asOf,
  source,
  fmt,
} from "@/data";
import { Breadcrumb } from "@/components/Breadcrumb";
import { RolePayTable } from "@/components/PayTables";
import { CandidateCard } from "@/components/CandidateCard";
import { GateForm } from "@/components/GateForm";
import { Mark } from "@/components/Mark";

interface PageProps {
  params: Promise<{ role: string }>;
}

export async function generateStaticParams() {
  return roles.map((r) => ({
    role: r.slug,
  }));
}

function calculateMedian(arr: number[]): number {
  if (!arr.length) return 0;
  const s = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 !== 0 ? s[mid] : Math.round((s[mid - 1] + s[mid]) / 2);
}

export default async function RolePage({ params }: PageProps) {
  const { role: roleParam } = await params;
  const role = findRole(roleParam);

  if (!role) {
    notFound();
  }

  // Calculate national band
  const cityBands = cities
    .map((c) => findBand(c.slug, role.slug))
    .filter(Boolean) as Array<{
    median: number;
    b1: [number, number];
    b2: [number, number];
    b3: [number, number];
  }>;

  const natMedian = calculateMedian(cityBands.map((b) => b.median));
  const natBands: Record<string, [number, number]> = {};
  expBands.forEach((e) => {
    natBands[e.key] = [
      calculateMedian(cityBands.map((b) => (b as any)[e.key][0])),
      calculateMedian(cityBands.map((b) => (b as any)[e.key][1])),
    ];
  });

  // National band coordinates
  const b1Min = natBands.b1 ? natBands.b1[0] : 80;
  const b3Max = natBands.b3 ? natBands.b3[1] : 200;
  const lo = Math.floor((b1Min * 0.88) / 10) * 10;
  const hi = Math.ceil((b3Max * 1.05) / 10) * 10;
  const span = hi - lo || 1;
  const x = (v: number) => Math.max(0, Math.min(100, ((v - lo) / span) * 100));

  // Candidates for role
  const roleCandidates = matchCandidates({ role: role.slug }).slice(0, 3);
  const models = payModels[role.slug] || payModels["estate-planning-attorney"] || [];

  return (
    <div className="role-hub-page" style={{ background: "#FAF9F5", color: "#08142A" }}>
      {/* 1. LUXURY HERO WITH VIDEO & 2-COLUMN NATIONAL COMPENSATION TERMINAL */}
      <section
        className="emp-luxury-hero-sec role-hub-hero"
        aria-labelledby="role-hero-h1"
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
                { label: "Practice Specializations", href: "/find-candidates" },
                { label: role.name, current: true },
              ]}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 40, alignItems: "center" }}>
            {/* Left Column: Heading & Executive Metrics */}
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
                  <span>PRACTICE SPECIALIZATION · NATIONAL DIRECTORY</span>
                </div>
              </div>

              <h1
                id="role-hero-h1"
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
                {role.name}:{" "}
                <span className="serif-accent" style={{ color: "#60A5FA", fontStyle: "italic" }}>
                  Salary, Hiring &amp; Jobs
                </span>
              </h1>

              <p
                className="emp-hero-lead"
                style={{
                  fontSize: 17,
                  lineHeight: 1.6,
                  color: "#CBD5E1",
                  maxWidth: 580,
                  margin: "0 0 28px",
                }}
              >
                National compensation intelligence, turnkey law firm hiring templates, and active pre-screened lateral attorney candidates across all major regional legal markets.
              </p>

              <div style={{ display: "grid", gap: 10, marginBottom: 30 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "#E2E8F0" }}>
                  <span style={{ color: "#60A5FA", fontWeight: 700 }}>✓</span>
                  <span>{cityBands.length} US metro legal markets quarterly benchmarked</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "#E2E8F0" }}>
                  <span style={{ color: "#60A5FA", fontWeight: 700 }}>✓</span>
                  <span>Verified prevailing offers updated quarterly ({asOf})</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "#E2E8F0" }}>
                  <span style={{ color: "#60A5FA", fontWeight: 700 }}>✓</span>
                  <span>Turnkey partner interview kits &amp; weighted scorecards</span>
                </div>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
                <Link
                  className="btn-emp-primary"
                  href={`/find-candidates#role=${role.slug}`}
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
                  <span>See {role.short} candidates</span>
                  <span aria-hidden="true">→</span>
                </Link>
                <a
                  className="btn-emp-ghost"
                  href="#kit"
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
                  <span>Get turnkey hiring kit</span>
                  <span aria-hidden="true">↓</span>
                </a>
              </div>
            </div>

            {/* Right Column: Elevated National Band Terminal */}
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
                      National Compensation Band
                    </span>
                    <span style={{ fontSize: 13, color: "#64748B" }}>
                      Prevailing base pay by experience level
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
                    INTERQUARTILE RANGE
                  </span>
                </div>

                <div id="nat-band" className="band-wrap" style={{ marginBottom: 16 }}>
                  <div
                    className="band"
                    role="img"
                    aria-label={`${role.name} national base salary by experience`}
                  >
                    {expBands.map((e) => {
                      const r = natBands[e.key] || [0, 0];
                      const leftPos = x(r[0]);
                      const widthPos = x(r[1]) - x(r[0]);
                      return (
                        <div
                          key={e.key}
                          className={`band-row ${e.key === "b2" ? "active" : ""}`}
                          data-key={e.key}
                        >
                          <span className="lab" style={{ fontSize: 13, fontWeight: 600 }}>
                            {e.label.replace(" years", "")}
                            <span className="lab-long"> years</span>
                            <span className="lab-short"> yrs</span>
                          </span>
                          <div className="track">
                            {[0, 25, 50, 75, 100].map((p) => (
                              <i key={p} className="gl" style={{ left: `${p}%` }} />
                            ))}
                            <span
                              className="range"
                              style={{ left: `${leftPos}%`, width: `${widthPos}%`, background: "#1D4ED8" }}
                            />
                          </div>
                          <span className="val" style={{ fontFamily: "var(--mono)", fontSize: 13, fontWeight: 700 }}>
                            <Mark>{fmt.range(r)}</Mark>
                          </span>
                        </div>
                      );
                    })}
                    <div className="band-axis">
                      <span />
                      <div className="ticks">
                        {[0, 25, 50, 75, 100].map((p) => (
                          <span key={p} className={`t${p}`} style={{ left: `${p}%`, fontFamily: "var(--mono)", fontSize: 11 }}>
                            {fmt.k(lo + (span * p) / 100)}
                          </span>
                        ))}
                      </div>
                      <span />
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    background: "#FAF9F5",
                    border: "1px solid #EAE7DC",
                    borderRadius: 8,
                    padding: "12px 16px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 14,
                  }}
                >
                  <span style={{ fontSize: 13, color: "#64748B" }}>
                    National Median Midpoint:
                  </span>
                  <span style={{ fontFamily: "var(--display)", fontSize: 24, fontWeight: 600, color: "#1D4ED8" }}>
                    {fmt.k(natMedian)}
                  </span>
                </div>

                <p style={{ fontSize: 12, color: "#64748B", margin: 0, lineHeight: 1.5 }}>
                  Composite median calculated across all covered US metros. Source: {source}, updated {asOf}. Base salary only before discretionary bonuses.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PAY BY CITY TABLE */}
      <section className="emp-process-sec" id="pay" style={{ background: "#FAF9F5", padding: "88px 0 96px", borderBottom: "1px solid #EAE7DC" }}>
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
              METRO MARKET COMPARISON
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
              {role.name} compensation, <span className="serif-accent" style={{ fontStyle: "italic", color: "#1D4ED8" }}>metro by metro</span>
            </h2>
            <p style={{ color: "#64748B", fontSize: 16, lineHeight: 1.6, margin: 0 }}>
              Compare experience tiers across Texas and national markets. Click any city to launch its customized compensation guide.
            </p>
          </div>

          <div style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 14, padding: "28px", boxShadow: "0 4px 16px rgba(15, 23, 42, 0.04)" }}>
            <RolePayTable roleSlug={role.slug} hereCitySlug="houston-tx" />
            <p style={{ fontSize: 12.5, color: "#64748B", marginTop: 20, paddingTop: 14, borderTop: "1px solid #E2E8F0", margin: "20px 0 0" }}>
              Source: {source}, updated {asOf}. Every published band reflects the middle 50% of verified offers for that seniority level.
            </p>
          </div>
        </div>
      </section>

      {/* 3. CANDIDATES AVAILABLE NOW */}
      <section className="emp-process-sec" id="candidates" style={{ background: "#FFFFFF", padding: "88px 0 96px", borderBottom: "1px solid #E2E8F0" }}>
        <div className="wrap" style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
          <div className="sec-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 36, flexWrap: "wrap", gap: 14 }}>
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
                PRE-SCREENED TALENT
              </span>
              <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(26px, 3.4vw, 38px)", color: "#08142A", margin: 0, fontWeight: 500 }}>
                {role.name}s open to confidential moves
              </h2>
            </div>
            <Link
              className="more link-arrow hide-sm"
              href={`/find-candidates#role=${role.slug}`}
              style={{ fontSize: 14, fontWeight: 600, color: "#1D4ED8", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}
            >
              <span>Match candidates to your open seat</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="cards" style={{ display: "grid", gap: 20 }}>
            {roleCandidates.map((r) => (
              <CandidateCard key={r.c.id} candidate={r.c} result={r} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. TURNKEY HIRING KIT SECTION */}
      <section className="emp-process-sec" id="kit" style={{ background: "#FAF9F5", padding: "88px 0 96px", borderBottom: "1px solid #EAE7DC" }}>
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
                EXECUTIVE HIRING TEMPLATES
              </span>
              <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(28px, 3.6vw, 40px)", color: "#08142A", margin: "0 0 14px", fontWeight: 500 }}>
                Complete hiring kit for <span className="serif-accent" style={{ fontStyle: "italic", color: "#1D4ED8" }}>{role.name}s</span>
              </h2>
              <p style={{ color: "#64748B", fontSize: 16, lineHeight: 1.6, margin: "0 0 24px" }}>
                Everything needed to recruit and vet {/^[aeiou]/i.test(role.name) ? "an" : "a"} {role.name.toLowerCase()} for your firm, designed specifically for managing partners and hiring chairs.
              </p>
            </div>

            <div style={{ display: "grid", gap: 14 }}>
              <div style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 10, padding: "16px 18px", boxShadow: "0 2px 8px rgba(15,23,42,0.02)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 10.5, fontWeight: 700, color: "#1D4ED8", background: "rgba(29,78,216,0.08)", padding: "2px 8px", borderRadius: 4 }}>PART 01</span>
                  <strong style={{ color: "#08142A", fontSize: 14.5 }}>High-Converting Job Posting</strong>
                </div>
                <p style={{ fontSize: 13, color: "#64748B", margin: 0, lineHeight: 1.5 }}>Pre-drafted requirements, caseload expectations, and transparent compensation disclosure.</p>
              </div>

              <div style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 10, padding: "16px 18px", boxShadow: "0 2px 8px rgba(15,23,42,0.02)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 10.5, fontWeight: 700, color: "#1D4ED8", background: "rgba(29,78,216,0.08)", padding: "2px 8px", borderRadius: 4 }}>PART 02</span>
                  <strong style={{ color: "#08142A", fontSize: 14.5 }}>Partner Interview Questions</strong>
                </div>
                <p style={{ fontSize: 13, color: "#64748B", margin: 0, lineHeight: 1.5 }}>Practice-specific behavioral questions and diagnostic client scenarios with ideal answers.</p>
              </div>

              <div style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 10, padding: "16px 18px", boxShadow: "0 2px 8px rgba(15,23,42,0.02)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 10.5, fontWeight: 700, color: "#1D4ED8", background: "rgba(29,78,216,0.08)", padding: "2px 8px", borderRadius: 4 }}>PART 03</span>
                  <strong style={{ color: "#08142A", fontSize: 14.5 }}>Candidate Evaluation Scorecard</strong>
                </div>
                <p style={{ fontSize: 13, color: "#64748B", margin: 0, lineHeight: 1.5 }}>Weighted 1–5 ranking framework for billable rigor, matter autonomy, and culture alignment.</p>
              </div>

              <div style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 10, padding: "16px 18px", boxShadow: "0 2px 8px rgba(15,23,42,0.02)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 10.5, fontWeight: 700, color: "#1D4ED8", background: "rgba(29,78,216,0.08)", padding: "2px 8px", borderRadius: 4 }}>PART 04</span>
                  <strong style={{ color: "#08142A", fontSize: 14.5 }}>Offer-Letter Outline</strong>
                </div>
                <p style={{ fontSize: 13, color: "#64748B", margin: 0, lineHeight: 1.5 }}>Contingency bonus language, collection fee splits, and partnership track provisions.</p>
              </div>
            </div>
          </div>

          <div id="kit-gate">
            <GateForm
              eyebrow="FREE PDF &amp; WORD TEMPLATES"
              title={`Download the ${role.name} Hiring Kit`}
              bullets={[
                "Editable Word document templates for your hiring committee",
                "Interview questions with partner evaluation rubric",
                "Weighted scorecard and lateral offer-letter structure",
              ]}
              button="Email me the turnkey kit"
              preset="kit"
              role={role.slug}
              city="houston-tx"
              reviewSlug="daffner-law"
              fine="Delivered immediately to your inbox. No ongoing sales calls unless requested."
            />
          </div>
        </div>
      </section>

      {/* 5. COMPENSATION MODELS */}
      <section className="emp-process-sec" id="models" style={{ background: "#FFFFFF", padding: "88px 0 96px", borderBottom: "1px solid #E2E8F0" }}>
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
              COMPENSATION ARCHITECTURE
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
              How law firms structure pay for this <span className="serif-accent" style={{ fontStyle: "italic", color: "#1D4ED8" }}>role</span>
            </h2>
            <p style={{ color: "#64748B", fontSize: 16, lineHeight: 1.6, margin: 0 }}>
              The three prevailing compensation models deployed by small and mid-size firms.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {models.map((p, i) => (
              <div
                key={i}
                style={{
                  background: "#FAF9F5",
                  border: "1.5px solid #EAE7DC",
                  borderRadius: 14,
                  padding: "28px 24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 4px 16px rgba(15,23,42,0.03)",
                }}
              >
                <div>
                  <span
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "#1D4ED8",
                      display: "block",
                      marginBottom: 8,
                    }}
                  >
                    0{i + 1} · COMPENSATION MODEL
                  </span>
                  <h3 style={{ fontFamily: "var(--display)", fontSize: 22, color: "#08142A", margin: "0 0 12px", fontWeight: 600 }}>
                    {p.name}
                  </h3>
                  <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.6, marginBottom: 20 }}>
                    {p.how}
                  </p>
                </div>
                <div style={{ borderTop: "1px solid #E2E8F0", paddingTop: 16, display: "grid", gap: 8 }}>
                  <div style={{ fontSize: 13, color: "#64748B" }}>
                    <strong style={{ color: "#08142A" }}>Best for:</strong> {p.fits}
                  </div>
                  <div style={{ fontSize: 13, color: "#1D4ED8", fontWeight: 600 }}>
                    <strong>Typical Terms:</strong> {p.typical}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. BOTTOM MIDNIGHT NAVY CTA */}
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
            <span>PRACTICE PLACEMENT SPECIALISTS</span>
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
            Find pre-screened{" "}
            <span className="serif-accent" style={{ color: "#60A5FA", fontStyle: "italic" }}>
              {role.short} candidates
            </span>
          </h2>

          <p style={{ color: "#CBD5E1", fontSize: 17, lineHeight: 1.6, marginBottom: 34, maxWidth: 640, margin: "0 auto 34px" }}>
            Access verified candidate dossiers ready for immediate interview. 23% fee due only if you hire.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            <Link
              href={`/find-candidates#role=${role.slug}`}
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
              <span>View {role.short} candidates</span>
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
          </div>
        </div>
      </section>
    </div>
  );
}
