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
import { TrustLine } from "@/components/Rating";
import { RolePayTable } from "@/components/PayTables";
import { CandidateCard } from "@/components/CandidateCard";
import { GateForm } from "@/components/GateForm";
import { Mark } from "@/components/Mark";
import { Icon } from "@/components/icons";

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
  const openRolesCount = jobs.filter((j) => j.role === role.slug).length;

  return (
    <div className="role-hub-page">
      {/* 1. LUXURY HERO WITH VIDEO & NATIONAL BAND */}
      <section className="emp-luxury-hero-sec role-hub-hero" aria-labelledby="role-hero-h1">
        <div className="emp-hero-video-wrap" aria-hidden="true">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="emp-hero-video"
          >
            <source src="/media/splash.mp4" type="video/mp4" />
          </video>
          <div className="emp-hero-overlay" />
          <div className="emp-hero-glow" />
        </div>

        <div className="wrap emp-hero-content" style={{ maxWidth: 900 }}>
          <div className="emp-hero-badge-wrap">
            <div className="badge-capsule">
              <span className="badge-dot" />
              <span>PRACTICE SPECIALIZATION · NATIONAL DIRECTORY</span>
            </div>
          </div>

          <h1 id="role-hero-h1" className="emp-hero-h1">
            {role.name}: <span className="serif-accent">Salary, Hiring &amp; Jobs</span>
          </h1>

          <p className="emp-hero-lead">
            National compensation intelligence, turnkey law firm hiring templates, and active pre-screened lateral attorney candidates across all major regional legal markets.
          </p>

          <div className="emp-reassurance-row" style={{ marginBottom: 32 }}>
            <div className="emp-reassurance-item">
              <span className="check" aria-hidden="true">✓</span>
              <span>{cityBands.length} US metro markets benchmarked</span>
            </div>
            <div className="emp-reassurance-item">
              <span className="check" aria-hidden="true">✓</span>
              <span>Updated quarterly ({asOf})</span>
            </div>
            <div className="emp-reassurance-item">
              <span className="check" aria-hidden="true">✓</span>
              <span>Turnkey partner interview kits</span>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center", alignItems: "baseline", gap: 12, marginBottom: 32 }}>
            <span style={{ fontFamily: "var(--display)", fontSize: "clamp(44px, 5.5vw, 68px)", fontWeight: 500, color: "#FFFFFF", lineHeight: 1 }}>
              {fmt.k(natMedian)}
            </span>
            <span style={{ fontFamily: "var(--mono)", fontSize: 13, color: "#93C5FD", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>
              National Median Base Salary
            </span>
          </div>

          <div className="emp-hero-actions" style={{ marginBottom: 36 }}>
            <Link
              className="btn-emp-primary"
              href={`/find-candidates#role=${role.slug}`}
            >
              <span>See {role.short} candidates</span>
              <span aria-hidden="true">→</span>
            </Link>
            <a className="btn-emp-ghost" href="#kit">
              <span>Get the free hiring kit</span>
              <span aria-hidden="true">↓</span>
            </a>
          </div>

          {/* Elevated National Band Card */}
          <div style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 14, padding: "32px 28px", boxShadow: "0 20px 48px -12px rgba(0, 0, 0, 0.45)", color: "#08142A", textAlign: "left" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderBottom: "1px solid #E2E8F0", paddingBottom: 14, marginBottom: 20 }}>
              <h2 style={{ fontFamily: "var(--display)", fontSize: 21, fontWeight: 500, color: "#08142A", margin: 0 }}>
                National Base Salary by Experience Tier
              </h2>
              <span style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#1D4ED8" }}>
                INTERQUARTILE RANGE
              </span>
            </div>

            <div id="nat-band" className="band-wrap">
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
                      <span className="lab">
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
                          style={{ left: `${leftPos}%`, width: `${widthPos}%` }}
                        />
                      </div>
                      <span className="val">
                        <Mark>{fmt.range(r)}</Mark>
                      </span>
                    </div>
                  );
                })}
                <div className="band-axis">
                  <span />
                  <div className="ticks">
                    {[0, 25, 50, 75, 100].map((p) => (
                      <span key={p} className={`t${p}`} style={{ left: `${p}%` }}>
                        {fmt.k(lo + (span * p) / 100)}
                      </span>
                    ))}
                  </div>
                  <span />
                </div>
                <div className="lane">
                  <span className="med" style={{ left: `${x(natMedian)}%` }} />
                </div>
              </div>
              <div className="band-key" style={{ marginTop: 16 }}>
                <span className="k-range">Middle 50% of prevailing offers</span>
                <span className="k-med">
                  National Median: <Mark>{fmt.k(natMedian)}</Mark>
                </span>
              </div>
            </div>

            <p style={{ fontSize: 12.5, color: "#64748B", marginTop: 20, paddingTop: 14, borderTop: "1px solid #E2E8F0" }}>
              Composite median calculated across all covered US metros. Source: {source}, updated {asOf}. Base salary only before collections bonuses.
            </p>
          </div>
        </div>
      </section>

      {/* 2. PAY BY CITY TABLE */}
      <section className="emp-process-sec" id="pay" style={{ background: "#FAF9F5", padding: "96px 0 108px", borderBottom: "1px solid #EAE7DC" }}>
        <div className="wrap">
          <div className="sec-head" style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 48px" }}>
            <span className="eyebrow" style={{ color: "#1D4ED8", fontWeight: 700 }}>METRO MARKET COMPARISON</span>
            <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(28px, 3.6vw, 42px)", color: "#08142A", margin: "10px 0 14px" }}>
              {role.name} compensation, metro by metro
            </h2>
            <p style={{ color: "#64748B", fontSize: 16 }}>
              Compare experience tiers across Texas and national markets. Click any city to launch its customized compensation guide.
            </p>
          </div>

          <div style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 14, padding: "28px", boxShadow: "0 4px 16px rgba(15, 23, 42, 0.04)" }}>
            <RolePayTable roleSlug={role.slug} hereCitySlug="houston-tx" />
            <p style={{ fontSize: 12.5, color: "#64748B", marginTop: 20, paddingTop: 14, borderTop: "1px solid #E2E8F0" }}>
              Source: {source}, updated {asOf}. Every published band reflects the middle 50% of verified offers for that seniority level.
            </p>
          </div>
        </div>
      </section>

      {/* 3. CANDIDATES AVAILABLE NOW */}
      <section className="emp-process-sec" id="candidates" style={{ background: "#FFFFFF", padding: "96px 0 108px" }}>
        <div className="wrap">
          <div className="sec-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 36, flexWrap: "wrap", gap: 14 }}>
            <div>
              <span className="eyebrow" style={{ color: "#1D4ED8", fontWeight: 700 }}>PRE-SCREENED TALENT</span>
              <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(26px, 3.4vw, 38px)", color: "#08142A", margin: "8px 0 0" }}>
                {role.name}s open to confidential moves
              </h2>
            </div>
            <Link
              className="more link-arrow hide-sm"
              href={`/find-candidates#role=${role.slug}`}
              style={{ fontSize: 14, fontWeight: 600, color: "#1D4ED8", textDecoration: "none" }}
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
      <section className="emp-process-sec" id="kit" style={{ background: "#FAF9F5", padding: "96px 0 108px", borderTop: "1px solid #E2E8F0", borderBottom: "1px solid #EAE7DC" }}>
        <div className="wrap split">
          <div>
            <div className="sec-head">
              <span className="eyebrow" style={{ color: "#1D4ED8", fontWeight: 700 }}>EXECUTIVE HIRING TEMPLATES</span>
              <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(28px, 3.6vw, 40px)", color: "#08142A", margin: "10px 0 14px" }}>
                Complete hiring kit for {role.name}s
              </h2>
              <p style={{ color: "#64748B", fontSize: 16, lineHeight: 1.6 }}>
                Everything needed to recruit and vet {/^[aeiou]/i.test(role.name) ? "an" : "a"} {role.name.toLowerCase()} for your firm, designed specifically for managing partners and hiring chairs.
              </p>
            </div>

            <div style={{ display: "grid", gap: 14, marginTop: 24 }}>
              <div style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 10, padding: "14px 18px" }}>
                <strong style={{ color: "#08142A", fontSize: 14 }}>Part 1: High-Converting Job Posting</strong>
                <p style={{ fontSize: 13, color: "#64748B", margin: "4px 0 0" }}>Pre-drafted requirements, caseload expectations, and transparent compensation disclosure.</p>
              </div>
              <div style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 10, padding: "14px 18px" }}>
                <strong style={{ color: "#08142A", fontSize: 14 }}>Part 2: Partner Interview Questions</strong>
                <p style={{ fontSize: 13, color: "#64748B", margin: "4px 0 0" }}>Practice-specific behavioral questions and diagnostic client scenarios with ideal answers.</p>
              </div>
              <div style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 10, padding: "14px 18px" }}>
                <strong style={{ color: "#08142A", fontSize: 14 }}>Part 3: Candidate Evaluation Scorecard</strong>
                <p style={{ fontSize: 13, color: "#64748B", margin: "4px 0 0" }}>Weighted 1–5 ranking framework for billable rigor, matter autonomy, and culture alignment.</p>
              </div>
              <div style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 10, padding: "14px 18px" }}>
                <strong style={{ color: "#08142A", fontSize: 14 }}>Part 4: Offer-Letter Outline</strong>
                <p style={{ fontSize: 13, color: "#64748B", margin: "4px 0 0" }}>Contingency bonus language, collection fee splits, and partnership track provisions.</p>
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
      <section className="emp-process-sec" id="models" style={{ background: "#FFFFFF", padding: "96px 0 108px" }}>
        <div className="wrap">
          <div className="sec-head" style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 48px" }}>
            <span className="eyebrow" style={{ color: "#1D4ED8", fontWeight: 700 }}>COMPENSATION ARCHITECTURE</span>
            <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(28px, 3.6vw, 42px)", color: "#08142A", margin: "10px 0 14px" }}>
              How law firms structure pay for this role
            </h2>
            <p style={{ color: "#64748B", fontSize: 16 }}>
              The three prevailing compensation models deployed by small and mid-size firms.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {models.map((p, i) => (
              <div key={i} style={{ background: "#F8FAFC", border: "1.5px solid #E2E8F0", borderRadius: 14, padding: "28px 24px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#1D4ED8", display: "block", marginBottom: 6 }}>
                    Model {i + 1}
                  </span>
                  <h3 style={{ fontFamily: "var(--display)", fontSize: 22, color: "#08142A", margin: "0 0 10px" }}>
                    {p.name}
                  </h3>
                  <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.6, marginBottom: 16 }}>
                    {p.how}
                  </p>
                </div>
                <div style={{ borderTop: "1px solid #E2E8F0", paddingTop: 14 }}>
                  <div style={{ fontSize: 13, color: "#64748B", marginBottom: 6 }}>
                    <strong>Best for:</strong> {p.fits}
                  </div>
                  <div style={{ fontSize: 13, color: "#08142A", fontWeight: 600 }}>
                    <strong>Typical Terms:</strong> {p.typical}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. BOTTOM MIDNIGHT NAVY CTA */}
      <section className="emp-terms-dark-sec" style={{ background: "#08142A", padding: "100px 0 108px", textAlign: "center" }}>
        <div className="wrap" style={{ maxWidth: 760, margin: "0 auto" }}>
          <div className="badge-capsule" style={{ marginBottom: 18 }}>
            <span className="badge-dot" />
            <span>PRACTICE PLACEMENT SPECIALISTS</span>
          </div>
          <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(32px, 4.2vw, 48px)", color: "#FFFFFF", margin: "0 0 16px" }}>
            Find pre-screened <span className="serif-accent" style={{ color: "#60A5FA" }}>{role.short} candidates</span>
          </h2>
          <p style={{ color: "#CBD5E1", fontSize: 17, lineHeight: 1.6, marginBottom: 32 }}>
            Access verified candidate dossiers ready for immediate interview. 23% fee due only if you hire.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            <Link href={`/find-candidates#role=${role.slug}`} className="btn-emp-primary" style={{ padding: "14px 34px", fontSize: 16 }}>
              <span>View {role.short} candidates</span>
              <span aria-hidden="true">→</span>
            </Link>
            <Link href="/submit-job" className="btn-emp-ghost" style={{ padding: "14px 34px", fontSize: 16 }}>
              <span>Submit your mandate</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
