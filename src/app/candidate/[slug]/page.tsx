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
import { Breadcrumb } from "@/components/Breadcrumb";
import { TrustLine, CalendlyLink } from "@/components/Rating";
import { SenderCard } from "@/components/SenderCard";
import { ResumeSheet } from "@/components/ResumeSheet";
import { SalaryBandBar } from "@/components/SalaryBand";
import { TermsTiles } from "@/components/TermsTiles";
import { ReviewCard } from "@/components/ReviewCard";
import { CandidateCard } from "@/components/CandidateCard";
import { GateForm } from "@/components/GateForm";
import { Mark } from "@/components/Mark";

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
    <div className="candidate-dossier-page">
      {/* 1. LUXURY HERO WITH WATER SPLASH VIDEO & DOSSIER HIGHLIGHTS */}
      <section className="emp-luxury-hero-sec cand-dossier-hero" aria-labelledby="dossier-hero-title">
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

        <div className="wrap emp-hero-content" style={{ maxWidth: 880 }}>
          <div className="emp-hero-badge-wrap">
            <div className="badge-capsule">
              <span className="badge-dot" />
              <span>CONFIDENTIAL CANDIDATE DOSSIER · ID #{c.id}</span>
            </div>
          </div>

          <h1 id="dossier-hero-title" className="emp-hero-h1">
            {role?.name || "Attorney"},{" "}
            <span className="serif-accent">{c.years} Years Post-Bar</span>
          </h1>

          <p className="emp-hero-lead">
            Active {c.bars.join(", ")} Bar admission. Currently representing matters at {firmArticle} {c.firmType.toLowerCase()} law firm. Open to confidential lateral interview requests in {city?.name || "Texas"}.
          </p>

          <div className="emp-reassurance-row" style={{ marginBottom: 32 }}>
            <div className="emp-reassurance-item">
              <span className="check" aria-hidden="true">✓</span>
              <span>Bar standing verified &amp; active</span>
            </div>
            <div className="emp-reassurance-item">
              <span className="check" aria-hidden="true">✓</span>
              <span>23% fee due only if you hire</span>
            </div>
            <div className="emp-reassurance-item">
              <span className="check" aria-hidden="true">✓</span>
              <span>90-day 100% replacement warranty</span>
            </div>
          </div>

          {/* Elevated Candidate Summary Card */}
          <div style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 14, padding: "32px 28px", boxShadow: "0 20px 48px -12px rgba(0, 0, 0, 0.45)", color: "#08142A", textAlign: "left" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderBottom: "1px solid #E2E8F0", paddingBottom: 14, marginBottom: 20 }}>
              <div style={{ fontFamily: "var(--display)", fontSize: 22, fontWeight: 500, color: "#08142A" }}>
                Candidate Credentials Snapshot
              </div>
              <span style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#1D4ED8" }}>
                VETTED BY ORION
              </span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px 24px", marginBottom: 26 }}>
              {fitRows.map(([label, val], idx) => (
                <div key={idx} style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 10, padding: "12px 16px" }}>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#64748B", marginBottom: 4 }}>
                    {label}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#08142A" }}>
                    {val}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, paddingTop: 18, borderTop: "1px solid #E2E8F0" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#059669" }} />
                <span style={{ fontSize: 13, color: "#475569" }}>
                  Screened directly by founder Justin. Ready for partner interview.
                </span>
              </div>
              <a href="#request" className="btn-emp-primary" style={{ padding: "12px 26px", fontSize: 14 }}>
                <span>Request full redacted profile</span>
                <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. REDACTED RESUME PREVIEW & WHAT YOU RECEIVE */}
      <section className="emp-process-sec" style={{ background: "#FAF9F5", padding: "96px 0 108px", borderBottom: "1px solid #EAE7DC" }}>
        <div className="wrap">
          <div className="sec-head" style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 48px" }}>
            <span className="eyebrow" style={{ color: "#1D4ED8", fontWeight: 700 }}>REDACTED CREDENTIALS PREVIEW</span>
            <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(28px, 3.6vw, 42px)", color: "#08142A", margin: "10px 0 14px" }}>
              What the complete candidate dossier includes
            </h2>
            <p style={{ color: "#64748B", fontSize: 16 }}>
              The actual resume with identifying details redacted. We protect candidate confidentiality while giving your hiring committee complete decision-making transparency.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.25fr) minmax(320px, 1fr)", gap: 40, alignItems: "start" }}>
            {/* Left: Resume Sheet */}
            <div style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 14, padding: "28px", boxShadow: "0 4px 16px rgba(15, 23, 42, 0.04)" }}>
              <ResumeSheet candidateId={c.id} />
            </div>

            {/* Right: What You Receive & Founder Contact */}
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 14, padding: "28px", boxShadow: "0 4px 16px rgba(15, 23, 42, 0.04)" }}>
                <h3 style={{ fontFamily: "var(--display)", fontSize: 20, color: "#08142A", margin: "0 0 16px" }}>
                  Dossier Deliverables
                </h3>
                <div style={{ display: "grid", gap: 14 }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ color: "#1D4ED8", fontWeight: 700 }}>✓</span>
                    <span style={{ fontSize: 14, color: "#334155" }}>
                      <strong>Practice History:</strong> Full career history detailing firm types, practice group sizes, and specific client matters managed.
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ color: "#1D4ED8", fontWeight: 700 }}>✓</span>
                    <span style={{ fontSize: 14, color: "#334155" }}>
                      <strong>Bar Standing:</strong> Verified bar admission numbers and confirmed good standing without disciplinary history.
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ color: "#1D4ED8", fontWeight: 700 }}>✓</span>
                    <span style={{ fontSize: 14, color: "#334155" }}>
                      <strong>Compensation &amp; Notice:</strong> Disclosed base salary expectations, bonus norms, and contractual notice periods.
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ color: "#1D4ED8", fontWeight: 700 }}>✓</span>
                    <span style={{ fontSize: 14, color: "#334155" }}>
                      <strong>Candidate References:</strong> Formal professional references furnished immediately following your first partner interview.
                    </span>
                  </div>
                </div>

                <div style={{ marginTop: 24, paddingTop: 18, borderTop: "1px solid #E2E8F0" }}>
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
      <section className="emp-process-sec" style={{ background: "#FFFFFF", padding: "96px 0 108px" }}>
        <div className="wrap">
          <div className="sec-head" style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 40px" }}>
            <span className="eyebrow" style={{ color: "#1D4ED8", fontWeight: 700 }}>COMPENSATION BENCHMARK</span>
            <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(28px, 3.6vw, 42px)", color: "#08142A", margin: "10px 0 14px" }}>
              Target base compensation: <span style={{ color: "#1D4ED8" }}>{fmt.range(c.pay)}</span>
            </h2>
            <p style={{ color: "#64748B", fontSize: 16 }}>
              This target sits <strong style={{ color: "#08142A" }}>{pos.where === "in" ? "within" : pos.where}</strong> the competitive {city?.name || "Texas"} market range for {c.years} years of practice ({pos.range ? fmt.range(pos.range) : ""}). The marker below indicates the candidate's target midpoint.
            </p>
          </div>

          <div style={{ background: "#F8FAFC", border: "1.5px solid #E2E8F0", borderRadius: 14, padding: "32px 28px", boxShadow: "0 2px 8px rgba(15, 23, 42, 0.03)" }}>
            <SalaryBandBar
              city={c.city}
              role={c.role}
              highlight="b2"
              marker={mid}
            />
            <p style={{ fontSize: 12.5, color: "#64748B", marginTop: 24, paddingTop: 16, borderTop: "1px solid #E2E8F0", textAlign: "center" }}>
              Regional market compensation benchmarked from{" "}
              <Link href={`/salaries/${c.role}/${c.city}`} style={{ color: "#1D4ED8", textDecoration: "underline" }}>
                the {role?.short || "attorney"} salary guide
              </Link>
              , updated {asOf}.
            </p>
          </div>
        </div>
      </section>

      {/* 4. TERMS TILES & WARRANTY */}
      <section className="emp-process-sec" style={{ background: "#FAF9F5", padding: "96px 0 108px", borderTop: "1px solid #E2E8F0", borderBottom: "1px solid #EAE7DC" }}>
        <div className="wrap">
          <div className="sec-head" style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 48px" }}>
            <span className="eyebrow" style={{ color: "#1D4ED8", fontWeight: 700 }}>ORION PLACEMENT TERMS</span>
            <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(28px, 3.6vw, 42px)", color: "#08142A", margin: "10px 0 14px" }}>
              Free to review. Fee due only if you hire.
            </h2>
            <p style={{ color: "#64748B", fontSize: 16 }}>
              Reviewing dossiers and interviewing candidates incurs zero upfront cost and zero retainer commitment.
            </p>
          </div>

          <TermsTiles />
        </div>
      </section>

      {/* 5. REQUEST DOSSIER GATE FORM */}
      <section className="emp-process-sec" id="request" style={{ background: "#FFFFFF", padding: "96px 0 108px" }}>
        <div className="wrap split">
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
            <h3 style={{ fontFamily: "var(--display)", fontSize: 22, color: "#08142A", marginBottom: 20 }}>
              What happens after your request
            </h3>
            <ol className="timeline" style={{ paddingLeft: 0, listStyle: "none", display: "grid", gap: 16 }}>
              <li style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 10, padding: "16px 18px" }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 700, color: "#1D4ED8", textTransform: "uppercase" }}>
                  Immediate Notification
                </span>
                <p style={{ margin: "6px 0 0", color: "#334155", fontSize: 14 }}>
                  Your request reaches founder Justin immediately. No inquiry is ever disclosed to the candidate's current employer.
                </p>
              </li>
              <li style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 10, padding: "16px 18px" }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 700, color: "#1D4ED8", textTransform: "uppercase" }}>
                  Within 1 Business Hour
                </span>
                <p style={{ margin: "6px 0 0", color: "#334155", fontSize: 14 }}>
                  You receive the complete redacted PDF resume, verified salary history, and standard one-page contingency agreement.
                </p>
              </li>
              <li style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 10, padding: "16px 18px" }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 700, color: "#1D4ED8", textTransform: "uppercase" }}>
                  Within 1 Business Day
                </span>
                <p style={{ margin: "6px 0 0", color: "#334155", fontSize: 14 }}>
                  Justin coordinates an initial confidential partner interview at a date and time convenient to your hiring committee.
                </p>
              </li>
              <li style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 10, padding: "16px 18px" }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 700, color: "#1D4ED8", textTransform: "uppercase" }}>
                  Risk-Free Warranty
                </span>
                <p style={{ margin: "6px 0 0", color: "#334155", fontSize: 14 }}>
                  23% placement fee invoiced Net 15 days following the candidate's first day, backed by our 90-day replacement guarantee.
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
        <section className="emp-process-sec" id="similar" style={{ background: "#FAF9F5", padding: "96px 0 108px", borderTop: "1px solid #E2E8F0" }}>
          <div className="wrap">
            <div className="sec-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 36, flexWrap: "wrap", gap: 14 }}>
              <div>
                <span className="eyebrow" style={{ color: "#1D4ED8", fontWeight: 700 }}>RELATED TALENT POOL</span>
                <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(26px, 3.4vw, 38px)", color: "#08142A", margin: "8px 0 0" }}>
                  Additional candidates open to {city?.name || "Texas"} seats
                </h2>
              </div>
              <Link
                href={`/find-candidates#role=${c.role}&city=${c.city}`}
                style={{ fontSize: 14, fontWeight: 600, color: "#1D4ED8", textDecoration: "none" }}
              >
                <span>Filter all matching candidates</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="cards">
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

      {/* 7. BOTTOM MIDNIGHT NAVY CTA */}
      <section className="emp-terms-dark-sec" style={{ background: "#08142A", padding: "100px 0 108px", textAlign: "center" }}>
        <div className="wrap" style={{ maxWidth: 760, margin: "0 auto" }}>
          <div className="badge-capsule" style={{ marginBottom: 18 }}>
            <span className="badge-dot" />
            <span>DIRECT CANDIDATE INTRODUCTION</span>
          </div>
          <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(32px, 4.2vw, 48px)", color: "#FFFFFF", margin: "0 0 16px" }}>
            Ready to interview candidate <span className="serif-accent" style={{ color: "#60A5FA" }}>#{c.id}?</span>
          </h2>
          <p style={{ color: "#CBD5E1", fontSize: 17, lineHeight: 1.6, marginBottom: 32 }}>
            Complete redacted dossier provided within one business hour. Pay 23% only if you decide to hire.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            <a href="#request" className="btn-emp-primary" style={{ padding: "14px 34px", fontSize: 16 }}>
              <span>Request full profile</span>
              <span aria-hidden="true">↑</span>
            </a>
            <Link href="/find-candidates" className="btn-emp-ghost" style={{ padding: "14px 34px", fontSize: 16 }}>
              <span>Browse other candidates</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
