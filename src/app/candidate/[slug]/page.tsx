import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  candidates,
  findCandidate,
  findCity,
  findRole,
  salaryPosition,
  fmt,
  matchCandidates,
  asOf,
} from "@/data";
import { CalendlyLink } from "@/components/Rating";
import { SenderCard } from "@/components/SenderCard";
import { ResumeSheet } from "@/components/ResumeSheet";
import { SalaryBandBar } from "@/components/SalaryBand";
import { TermsTiles } from "@/components/TermsTiles";
import { ReviewCard } from "@/components/ReviewCard";
import { CandidateCard } from "@/components/CandidateCard";
import { GateForm } from "@/components/GateForm";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return candidates.map((c) => ({
    slug: c.id.toLowerCase(),
  }));
}

export default async function CandidateProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const c =
    findCandidate(slug.toUpperCase()) ||
    candidates.find((item) => item.id.toLowerCase() === slug.toLowerCase());

  if (!c) {
    notFound();
  }

  const role = findRole(c.role);
  const city = findCity(c.city);
  const mid = (c.pay[0] + c.pay[1]) / 2;
  const pos = salaryPosition(c.city, c.role, "b2", mid);

  const firmArticle = /^[aeiou]/i.test(c.firmType) ? "an" : "a";

  const fitRows: Array<[string, React.ReactNode]> = [
    ["Practice Distribution", c.mix.map((x) => x[0]).join(", ")],
    [
      "Tenure & Current Seat",
      `${c.years} years post-bar, currently at ${firmArticle} ${c.firmType.toLowerCase()} (${c.firmSize})`,
    ],
    ["Bar Standing", `${c.bars.join(", ")} Bar (Active & Verified)`],
    ["Target Market & Mode", `${c.area}; ${fmt.modes(c.modes)}`],
    [
      "Base Expectation",
      `${fmt.range(c.pay)} base (${pos.where === "in" ? "within" : pos.where} competitive market band)`,
    ],
    ["Earliest Availability", c.availability],
  ];

  // Similar candidates
  const similar = matchCandidates({
    role: c.role,
    city: c.city,
    years: "b2",
  })
    .filter((r) => r.c.id !== c.id)
    .slice(0, 3);

  return (
    <div className="candidate-dossier-page" style={{ background: "#FAF9F5", color: "#08142A" }}>
      {/* 1. LUXURY HERO & 2-COLUMN CREDENTIALS TERMINAL */}
      <section
        className="emp-luxury-hero-sec cand-dossier-hero"
        aria-labelledby="dossier-hero-title"
        style={{
          position: "relative",
          color: "#FFFFFF",
          padding: "124px 0 76px",
          overflow: "hidden",
        }}
      >
        <div className="wrap" style={{ position: "relative", zIndex: 2, maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 40, alignItems: "center" }}>
            {/* Left Column: Heading & Executive Value */}
            <div>
              <div className="emp-hero-badge-wrap" style={{ marginBottom: 16 }}>
                <div
                  className="hero-eyebrow-capsule badge-capsule"
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
                  <span className="hero-eyebrow-dot badge-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#60A5FA" }} />
                  <span>CONFIDENTIAL CANDIDATE DOSSIER<span className="eyebrow-sep"> · </span><br className="eyebrow-break" />ID #{c.id}</span>
                </div>
              </div>

              <h1
                id="dossier-hero-title"
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
                {role?.name || "Attorney"},{" "}
                <span className="serif-accent" style={{ color: "#60A5FA", fontStyle: "italic" }}>
                  {c.years} Years Post-Bar
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
                Active {c.bars.join(", ")} Bar admission. Currently representing matters at {firmArticle} {c.firmType.toLowerCase()} law firm. Open to confidential lateral interview requests in {city?.name || "Texas"}.
              </p>

              <div style={{ display: "grid", gap: 10, marginBottom: 30 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "#E2E8F0" }}>
                  <span style={{ color: "#60A5FA", fontWeight: 700 }}>✓</span>
                  <span>State Bar of Texas standing verified &amp; in active compliance</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "#E2E8F0" }}>
                  <span style={{ color: "#60A5FA", fontWeight: 700 }}>✓</span>
                  <span>100% contingency: standard 23% fee due only if you hire</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "#E2E8F0" }}>
                  <span style={{ color: "#60A5FA", fontWeight: 700 }}>✓</span>
                  <span>90-day calendar replacement warranty with zero extra retainer</span>
                </div>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
                <a
                  href="#request"
                  className="btn-emp-primary"
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
                  <span>Request full redacted profile</span>
                  <span aria-hidden="true">↓</span>
                </a>
                <a
                  href="#preview"
                  className="btn-emp-ghost"
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
                  <span>Preview credentials</span>
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>

            {/* Right Column: Elevated Candidate Summary Card */}
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
                      Credentials Snapshot
                    </span>
                    <span style={{ fontSize: 13, color: "#64748B" }}>
                      Candidate Dossier #{c.id}
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
                    VETTED BY ORION
                  </span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 10, marginBottom: 20 }}>
                  {fitRows.map(([label, val], idx) => (
                    <div
                      key={idx}
                      style={{
                        background: "#F8FAFC",
                        border: "1px solid #E2E8F0",
                        borderRadius: 8,
                        padding: "10px 14px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                        gap: 12,
                      }}
                    >
                      <span style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#64748B" }}>
                        {label}
                      </span>
                      <span style={{ fontSize: 13, fontWeight: 600, color: "#08142A", textAlign: "right" }}>
                        {val}
                      </span>
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, paddingTop: 14, borderTop: "1px solid #E2E8F0" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#059669" }} />
                    <span style={{ fontSize: 12.5, color: "#475569" }}>
                      Screened directly by founder Justin. Ready for partner call.
                    </span>
                  </div>
                  <a
                    href="#request"
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 12,
                      fontWeight: 700,
                      color: "#1D4ED8",
                      textDecoration: "none",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    Request Profile →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. REDACTED RESUME PREVIEW & WHAT YOU RECEIVE */}
      <section className="emp-process-sec" id="preview" style={{ background: "#FAF9F5", padding: "88px 0 96px", borderBottom: "1px solid #EAE7DC" }}>
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
              REDACTED CREDENTIALS PREVIEW
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
              What the complete candidate dossier <span className="serif-accent" style={{ fontStyle: "italic" }}>includes</span>
            </h2>
            <p style={{ color: "#64748B", fontSize: 16, lineHeight: 1.6, margin: 0 }}>
              The actual resume with identifying details redacted. We protect candidate confidentiality while giving your hiring committee complete decision-making transparency.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 36, alignItems: "start" }}>
            {/* Left: Resume Sheet */}
            <div style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 14, padding: "28px", boxShadow: "0 4px 16px rgba(15, 23, 42, 0.04)" }}>
              <ResumeSheet candidateId={c.id} />
            </div>

            {/* Right: What You Receive & Founder Contact */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 14, padding: "28px", boxShadow: "0 4px 16px rgba(15, 23, 42, 0.04)" }}>
                <h3 style={{ fontFamily: "var(--display)", fontSize: 20, color: "#08142A", margin: "0 0 16px", fontWeight: 500 }}>
                  Dossier Deliverables
                </h3>
                <div style={{ display: "grid", gap: 14 }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ color: "#1D4ED8", fontWeight: 700 }}>✓</span>
                    <span style={{ fontSize: 13.5, color: "#334155", lineHeight: 1.5 }}>
                      <strong style={{ color: "#08142A" }}>Practice History:</strong> Full career history detailing law firm types, practice group sizes, and specific client matters managed.
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ color: "#1D4ED8", fontWeight: 700 }}>✓</span>
                    <span style={{ fontSize: 13.5, color: "#334155", lineHeight: 1.5 }}>
                      <strong style={{ color: "#08142A" }}>Bar Standing:</strong> Verified bar admission numbers and confirmed good standing without public disciplinary history.
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ color: "#1D4ED8", fontWeight: 700 }}>✓</span>
                    <span style={{ fontSize: 13.5, color: "#334155", lineHeight: 1.5 }}>
                      <strong style={{ color: "#08142A" }}>Compensation &amp; Notice:</strong> Disclosed base salary expectations, bonus norms, and contractual notice periods.
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ color: "#1D4ED8", fontWeight: 700 }}>✓</span>
                    <span style={{ fontSize: 13.5, color: "#334155", lineHeight: 1.5 }}>
                      <strong style={{ color: "#08142A" }}>Candidate References:</strong> Formal professional references furnished immediately following your first partner interview.
                    </span>
                  </div>
                </div>

                <div style={{ marginTop: 22, paddingTop: 16, borderTop: "1px solid #E2E8F0" }}>
                  <CalendlyLink
                    label="Questions regarding this candidate? Schedule 15 mins with Justin"
                    className="link-arrow"
                  />
                </div>
              </div>

              {/* Sender Card */}
              <div style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 14, padding: "24px", boxShadow: "0 4px 16px rgba(15, 23, 42, 0.04)" }}>
                <div style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#64748B", marginBottom: 12 }}>
                  Dossier Curated By
                </div>
                <SenderCard personId="justin" withDomains full />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PAY EXPECTATION AGAINST THE MARKET BAND */}
      <section className="emp-process-sec" style={{ background: "#FFFFFF", padding: "88px 0 96px", borderBottom: "1px solid #E2E8F0" }}>
        <div className="wrap" style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
          <div className="sec-head" style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 36px" }}>
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
              COMPENSATION BENCHMARK
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
              Target base compensation: <span style={{ color: "#1D4ED8" }}>{fmt.range(c.pay)}</span>
            </h2>
            <p style={{ color: "#64748B", fontSize: 16, lineHeight: 1.6, margin: 0 }}>
              This target sits <strong style={{ color: "#08142A" }}>{pos.where === "in" ? "within" : pos.where}</strong> the competitive {city?.name || "Texas"} market range for {c.years} years of practice ({pos.range ? fmt.range(pos.range) : ""}). The marker below indicates the candidate&apos;s target midpoint.
            </p>
          </div>

          <div style={{ background: "#FAF9F5", border: "1.5px solid #EAE7DC", borderRadius: 14, padding: "32px 28px" }}>
            <SalaryBandBar
              city={c.city}
              role={c.role}
              highlight="b2"
              marker={mid}
            />
            <p style={{ fontSize: 12.5, color: "#64748B", marginTop: 24, paddingTop: 16, borderTop: "1px solid #EAE7DC", textAlign: "center" }}>
              Regional market compensation benchmarked from{" "}
              <Link href={`/salaries/${c.role}/${c.city}`} style={{ color: "#1D4ED8", textDecoration: "underline", fontWeight: 600 }}>
                the {role?.short || "attorney"} salary guide
              </Link>
              , updated {asOf}.
            </p>
          </div>
        </div>
      </section>

      {/* 4. TERMS TILES & WARRANTY */}
      <section className="emp-process-sec" style={{ background: "#FAF9F5", padding: "88px 0 96px", borderBottom: "1px solid #EAE7DC" }}>
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
              ORION PLACEMENT TERMS
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
              Free to review. Fee due only if you <span className="serif-accent" style={{ fontStyle: "italic" }}>hire.</span>
            </h2>
            <p style={{ color: "#64748B", fontSize: 16, lineHeight: 1.6, margin: 0 }}>
              Reviewing dossiers and interviewing candidates incurs zero upfront cost and zero retainer commitment.
            </p>
          </div>

          <TermsTiles />
        </div>
      </section>

      {/* 5. REQUEST DOSSIER GATE FORM */}
      <section className="emp-process-sec" id="request" style={{ background: "#FFFFFF", padding: "88px 0 96px" }}>
        <div className="wrap split" style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 48, alignItems: "start" }}>
          <div id="gate">
            <GateForm
              eyebrow="DIRECT MANDATE REQUEST"
              title={`Request full redacted profile for ${c.id}`}
              bullets={[
                "Unredacted law firm history and representative matter sheet within one business hour",
                "Full candidate legal name disclosed once mutual interest is established",
                "Straightforward one-page agreement. Zero fee unless you extend an accepted offer",
              ]}
              button="Request complete dossier"
              preset="profile"
              candidateIds={[c.id]}
              role={c.role}
              city={c.city}
            />
          </div>

          <div>
            <h3 style={{ fontFamily: "var(--display)", fontSize: 22, color: "#08142A", margin: "0 0 20px", fontWeight: 500 }}>
              What happens after your request
            </h3>
            <ol className="timeline" style={{ paddingLeft: 0, listStyle: "none", display: "grid", gap: 14 }}>
              <li style={{ background: "#FAF9F5", border: "1px solid #EAE7DC", borderRadius: 10, padding: "16px 18px" }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 700, color: "#1D4ED8", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  Immediate Notification
                </span>
                <p style={{ margin: "6px 0 0", color: "#334155", fontSize: 13.5, lineHeight: 1.5 }}>
                  Your request reaches founder Justin immediately. No inquiry is ever disclosed to the candidate&apos;s current employer.
                </p>
              </li>
              <li style={{ background: "#FAF9F5", border: "1px solid #EAE7DC", borderRadius: 10, padding: "16px 18px" }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 700, color: "#1D4ED8", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  Within 1 Business Hour
                </span>
                <p style={{ margin: "6px 0 0", color: "#334155", fontSize: 13.5, lineHeight: 1.5 }}>
                  You receive the complete redacted PDF resume, verified salary history, and standard one-page contingency agreement.
                </p>
              </li>
              <li style={{ background: "#FAF9F5", border: "1px solid #EAE7DC", borderRadius: 10, padding: "16px 18px" }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 700, color: "#1D4ED8", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  Within 1 Business Day
                </span>
                <p style={{ margin: "6px 0 0", color: "#334155", fontSize: 13.5, lineHeight: 1.5 }}>
                  Justin coordinates an initial confidential partner interview at a date and time convenient to your hiring committee.
                </p>
              </li>
              <li style={{ background: "#FAF9F5", border: "1px solid #EAE7DC", borderRadius: 10, padding: "16px 18px" }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 700, color: "#1D4ED8", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  Risk-Free Warranty
                </span>
                <p style={{ margin: "6px 0 0", color: "#334155", fontSize: 13.5, lineHeight: 1.5 }}>
                  23% placement fee invoiced Net 15 days following the candidate&apos;s first day, backed by our 90-day replacement guarantee.
                </p>
              </li>
            </ol>

            <div style={{ marginTop: 24 }}>
              <ReviewCard reviewSlug="brett-zimmerman" compact />
            </div>
          </div>
        </div>
      </section>

      {/* 6. SIMILAR PRE-SCREENED CANDIDATES */}
      {similar.length > 0 && (
        <section className="emp-process-sec" id="similar" style={{ background: "#FAF9F5", padding: "88px 0 96px", borderTop: "1px solid #EAE7DC" }}>
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
                  RELATED TALENT POOL
                </span>
                <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(26px, 3.4vw, 38px)", color: "#08142A", margin: 0, fontWeight: 500 }}>
                  Additional candidates open to <span className="serif-accent" style={{ fontStyle: "italic" }}>{city?.name || "Texas"}</span> seats
                </h2>
              </div>
              <Link
                href={`/find-candidates#role=${c.role}&city=${c.city}`}
                style={{ fontSize: 14, fontWeight: 600, color: "#1D4ED8", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}
              >
                <span>Filter all matching candidates</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="cards" style={{ display: "grid", gap: 20 }}>
              {similar.map((r) => (
                <CandidateCard
                  key={r.c.id}
                  candidate={r.c}
                  result={r}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. BOTTOM MIDNIGHT NAVY CTA BAND */}
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
            <span>DIRECT CANDIDATE INTRODUCTION</span>
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
            Ready to interview candidate{" "}
            <span className="serif-accent" style={{ color: "#60A5FA", fontStyle: "italic" }}>
              #{c.id}?
            </span>
          </h2>

          <p style={{ color: "#CBD5E1", fontSize: 17, lineHeight: 1.6, marginBottom: 34, maxWidth: 640, margin: "0 auto 34px" }}>
            Complete redacted dossier provided within one business hour. Pay 23% only if you decide to hire.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            <a
              href="#request"
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
              <span>Request full profile</span>
              <span aria-hidden="true">↑</span>
            </a>
            <Link
              href="/find-candidates"
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
              <span>Browse other candidates</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
