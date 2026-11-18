"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DATA, matchCandidates } from "@/data";
import { Mark } from "@/components/Mark";
import { TrustLine } from "@/components/Rating";
import { CandidateCard } from "@/components/CandidateCard";
import { GateForm } from "@/components/GateForm";

export function WhereToHireClient({
  cityParam,
}: {
  cityParam: string;
}) {
  const city = DATA.cities.find((c) => c.slug === cityParam);

  const [kindFilter, setKindFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  if (!city) {
    notFound();
  }

  const places = (DATA.placesToHire[city.slug] || []).concat(DATA.placesToHireExtra[city.slug] || []);
  const lateralSources = DATA.lateralSources[city.slug] || [];

  const candidateIds = ["EP-TX-0476", "EP-TX-0388", "PL-TX-0640"];
  const candidates = candidateIds.map((id) => DATA.candidates.find((c) => c.id === id)).filter(Boolean);

  const screenedCount = matchCandidates({ city: city.slug }).filter((r) => r.inCity).length;

  const nLawSchools = places.filter((p) => p.kind === "Law school").length;
  const nParalegal = places.filter((p) => p.kind === "Paralegal programme").length;
  const nAssoc = places.filter((p) => /association/i.test(p.kind) || p.kind === "Professional association").length;

  const filteredPlaces = useMemo(() => {
    return places.filter((p) => {
      const matchesKind =
        kindFilter === "all"
          ? true
          : kindFilter === "assoc"
          ? /association/i.test(p.kind) || p.kind === "Professional association"
          : p.kind === kindFilter;

      const matchesSearch =
        !searchQuery.trim() ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.cycle.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesKind && matchesSearch;
    });
  }, [places, kindFilter, searchQuery]);

  const lateralRationales: Record<string, string> = {
    "Other small firms": "Moving for higher equity transparency, established succession plans, and modernized digital practice management systems.",
    "Mid-size firms": "Seeking autonomy from committee bureaucracy, direct client origination credit, and more sustainable billable structures.",
    "Solo practices": "Transitioning into boutique infrastructure to eliminate administrative overhead, payroll risk, and solo malpractice exposure.",
    "Large firms": "Leaving 2,100+ billable requirements for elite work-life control, direct partner mentorship, and courtroom/deal ownership.",
    "In-house or government": "Returning to private wealth and litigation practice for aggressive compensation upside and sophisticated client advisory work.",
  };

  return (
    <div className="where-to-hire-page" style={{ background: "#FFFFFF", minHeight: "100vh", color: "#08142A" }}>
      <style>{`
        /* Self-adjusting Flex Grid: Last row items expand to fill full row width */
        .wth-sources-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
        }
        .wth-source-card {
          flex: 1 1 calc(33.333% - 20px);
          min-width: 320px;
          background: #FFFFFF;
          border: 1.5px solid #E2E8F0;
          border-radius: 14px;
          padding: 24px 22px;
          display: flex;
          flex-direction: column;
          justifyContent: space-between;
          box-shadow: 0 4px 14px rgba(15, 23, 42, 0.03);
          transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;
        }
        .wth-source-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(15, 23, 42, 0.06);
          border-color: #CBD5E1;
        }

        .wth-lateral-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          margin-bottom: 44px;
        }
        .wth-lateral-card {
          flex: 1 1 calc(33.333% - 20px);
          min-width: 300px;
          background: #FAF9F5;
          border: 1.5px solid #EAE7DC;
          border-radius: 14px;
          padding: 24px 22px;
          display: flex;
          flex-direction: column;
          justifyContent: space-between;
          box-shadow: 0 4px 14px rgba(15, 23, 42, 0.02);
          transition: transform 0.15s ease, border-color 0.15s ease;
        }
        .wth-lateral-card:hover {
          transform: translateY(-2px);
          border-color: #CBD5E1;
        }

        .wth-candidates-row {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 22px;
          align-items: stretch;
        }

        @media (max-width: 960px) {
          .wth-source-card { flex: 1 1 100%; min-width: 0; }
          .wth-lateral-card { flex: 1 1 100%; min-width: 0; }
          .wth-candidates-row { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* =========================================================================
          HERO SECTION: Centered Luxury Showcase (No Card, Unobstructed Video)
          ========================================================================= */}
      <section
        className="wth-luxury-hero emp-luxury-hero-sec"
        style={{
          position: "relative",
          background: "radial-gradient(ellipse 90% 80% at 50% -20%, rgba(29, 78, 216, 0.28) 0%, rgba(8, 20, 42, 0.98) 75%, #08142A 100%)",
          color: "#FFFFFF",
          padding: "116px 0 84px",
          overflow: "hidden",
          borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
        }}
      >
        <div className="emp-hero-video-wrap" aria-hidden="true">
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.18,
              pointerEvents: "none",
              zIndex: 0,
            }}
          >
            <source src="/media/splash.mp4" type="video/mp4" />
            <source src="/videos/hero-water-splash.mp4" type="video/mp4" />
          </video>
        </div>

        <div style={{ position: "relative", zIndex: 2, maxWidth: 1040, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          {/* Eyebrow Badge */}
          <div
            className="hero-eyebrow-capsule"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(29, 78, 216, 0.2)",
              border: "1px solid rgba(96, 165, 250, 0.35)",
              borderRadius: 100,
              padding: "7px 18px",
              fontFamily: "var(--font-mono, monospace)",
              fontSize: 12,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#93C5FD",
              marginBottom: 24,
            }}
          >
            <span className="hero-eyebrow-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#60A5FA" }} />
            <span>REGIONAL HIRING DIRECTORY<span className="eyebrow-sep"> · </span><br className="eyebrow-break" />{city.name.toUpperCase()}, {city.state.toUpperCase()}</span>
          </div>

          {/* Centered Display Heading - Prominent Executive Scale */}
          <h1
            style={{
              fontFamily: "var(--font-serif, 'Playfair Display', Georgia, serif)",
              fontSize: "clamp(40px, 5.2vw, 64px)",
              lineHeight: 1.10,
              fontWeight: 700,
              color: "#FFFFFF",
              letterSpacing: "-0.025em",
              margin: "0 auto 22px",
              maxWidth: 920,
              textAlign: "center",
              textWrap: "balance",
              textShadow: "0 2px 16px rgba(0, 0, 0, 0.45)",
            }}
          >
            Where to hire attorneys and paralegals in{" "}
            <span className="serif-accent" style={{ color: "#60A5FA", fontStyle: "italic" }}>
              {city.name}
            </span>
          </h1>

          {/* Subtitle - Readable Executive Scale */}
          <p
            style={{
              fontSize: "clamp(18px, 1.8vw, 21px)",
              lineHeight: 1.65,
              color: "#CBD5E1",
              maxWidth: 780,
              margin: "0 auto 34px",
              textAlign: "center",
              textShadow: "0 1px 8px rgba(0, 0, 0, 0.4)",
            }}
          >
            Accredited Texas law schools, ABA-approved paralegal programmes, and active bar associations that {city.name} boutique firms recruit from. Direct career office contacts, seasonal recruitment cycles, and confidential lateral talent pools.
          </p>

          {/* Value Props Strip */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 24, marginBottom: 34, fontSize: 14.5, color: "#E2E8F0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: "#60A5FA", fontWeight: 700 }}>✓</span>
              <span>Direct career office liaison &amp; OCI schedules</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: "#60A5FA", fontWeight: 700 }}>✓</span>
              <span>Active pool of {screenedCount} pre-screened {city.name} laterals</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: "#60A5FA", fontWeight: 700 }}>✓</span>
              <span>100% contingency: zero fee unless chosen hire starts</span>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 14, marginBottom: 36 }}>
            <Link
              href={`/find-candidates#city=${city.slug}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#1D4ED8",
                color: "#FFFFFF",
                fontWeight: 600,
                fontSize: "16px",
                padding: "15px 32px",
                borderRadius: 7,
                textDecoration: "none",
                boxShadow: "0 8px 20px rgba(29, 78, 216, 0.35)",
                transition: "all 0.2s ease",
              }}
            >
              <span>See {city.name} candidates ({screenedCount})</span>
              <span aria-hidden="true">→</span>
            </Link>
            <a
              href="#sources"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.22)",
                color: "#FFFFFF",
                fontWeight: 600,
                fontSize: "16px",
                padding: "15px 28px",
                borderRadius: 7,
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
            >
              <span>Explore talent channels</span>
              <span aria-hidden="true">↓</span>
            </a>
          </div>

          <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.12)", paddingTop: 20 }}>
            <TrustLine />
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 1: Institutional Talent Channels Directory
          ========================================================================= */}
      <section
        id="sources"
        style={{
          background: "#FAF9F5",
          padding: "84px 0 96px",
          borderBottom: "1px solid #E2E8F0",
        }}
      >
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
          {/* Centered Section Header */}
          <div style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 36px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(29, 78, 216, 0.08)",
                border: "1px solid rgba(29, 78, 216, 0.2)",
                borderRadius: 100,
                padding: "5px 14px",
                fontSize: "0.78rem",
                fontWeight: 700,
                color: "#1D4ED8",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              STEP 01 · INSTITUTIONAL TALENT CHANNELS
            </div>
            <h2
              style={{
                fontFamily: "var(--font-serif, Georgia, serif)",
                fontSize: "clamp(2rem, 3.2vw, 2.6rem)",
                color: "#08142A",
                margin: "0 0 12px",
                fontWeight: 700,
                lineHeight: 1.2,
              }}
            >
              Who to contact, and when they{" "}
              <span className="serif-accent" style={{ color: "#1D4ED8", fontStyle: "italic" }}>
                recruit
              </span>
            </h2>
            <p style={{ color: "#64748B", fontSize: "1.05rem", lineHeight: 1.6, margin: 0 }}>
              Direct career service office contacts, campus recruitment cycles, and optimal job posting windows across {city.name}&apos;s legal training institutions.
            </p>
          </div>

          {/* Controls: Centered Filter Pills & Search Bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 16,
              marginBottom: 32,
            }}
          >
            {/* Filter Pills */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {[
                { id: "all", label: `All sources (${places.length})` },
                { id: "Law school", label: `Law schools (${nLawSchools})` },
                { id: "Paralegal programme", label: `Paralegal programmes (${nParalegal})` },
                { id: "assoc", label: `Bar & associations (${nAssoc})` },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setKindFilter(tab.id)}
                  style={{
                    padding: "9px 18px",
                    borderRadius: 7,
                    fontSize: 13.5,
                    fontWeight: kindFilter === tab.id ? 700 : 500,
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                    background: kindFilter === tab.id ? "#08142A" : "#FFFFFF",
                    color: kindFilter === tab.id ? "#FFFFFF" : "#334155",
                    border: `1.5px solid ${kindFilter === tab.id ? "#08142A" : "#E2E8F0"}`,
                    boxShadow: kindFilter === tab.id ? "0 2px 8px rgba(8, 20, 42, 0.2)" : "none",
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Quick Search Input */}
            <div style={{ position: "relative", minWidth: 260 }}>
              <input
                type="text"
                placeholder="Search institution or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  padding: "9px 14px",
                  borderRadius: 7,
                  border: "1.5px solid #CBD5E1",
                  fontSize: 13.5,
                  color: "#08142A",
                  background: "#FFFFFF",
                }}
              />
            </div>
          </div>

          {/* Directory Listings Cards: Self-Adjusting Full-Width Row Grid */}
          <div className="wth-sources-grid">
            {filteredPlaces.map((p, idx) => {
              const isLawSchool = p.kind === "Law school";
              const isParalegal = p.kind === "Paralegal programme";

              const badgeColor = isLawSchool
                ? { bg: "#EFF6FF", text: "#1D4ED8", border: "#DBEAFE" }
                : isParalegal
                ? { bg: "#ECFDF5", text: "#059669", border: "#A7F3D0" }
                : { bg: "#F8FAFC", text: "#475569", border: "#E2E8F0" };

              return (
                <div key={idx} className="wth-source-card">
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 12 }}>
                      <h3 style={{ fontFamily: "var(--font-serif, Georgia, serif)", fontSize: 18, color: "#08142A", fontWeight: 700, margin: 0, lineHeight: 1.3 }}>
                        {p.name}
                      </h3>
                      <span
                        style={{
                          fontFamily: "var(--font-mono, monospace)",
                          fontSize: 10.5,
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                          padding: "4px 8px",
                          borderRadius: 4,
                          background: badgeColor.bg,
                          color: badgeColor.text,
                          border: `1px solid ${badgeColor.border}`,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {p.kind}
                      </span>
                    </div>

                    <div style={{ marginBottom: 14 }}>
                      <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: 11, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 3 }}>
                        Direct Office Contact
                      </div>
                      <div style={{ fontSize: 14, fontWeight: 500, color: "#1E293B" }}>
                        {p.contact}
                      </div>
                    </div>

                    <div style={{ background: "#FAF9F5", border: "1px solid #EAE7DC", borderRadius: 8, padding: "12px 14px", marginBottom: 16 }}>
                      <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: 11, color: "#059669", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 3 }}>
                        Recruitment Schedule &amp; Window
                      </div>
                      <div style={{ fontSize: 13.5, color: "#334155", lineHeight: 1.5 }}>
                        {p.cycle}
                      </div>
                    </div>
                  </div>

                  <div style={{ borderTop: "1px solid #F1F5F9", paddingTop: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 12, color: "#64748B" }}>
                      Direct Campus Pipeline
                    </span>
                    <a
                      href="#kit"
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#1D4ED8",
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <span>Get posting template</span>
                      <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredPlaces.length === 0 && (
            <div style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 12, padding: "48px 24px", textAlign: "center" }}>
              <p style={{ fontSize: 16, color: "#64748B", margin: "0 0 12px" }}>
                No institutional channels match your query: &ldquo;{searchQuery}&rdquo;
              </p>
              <button
                type="button"
                onClick={() => {
                  setKindFilter("all");
                  setSearchQuery("");
                }}
                style={{
                  background: "#1D4ED8",
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: 7,
                  padding: "10px 20px",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: Market Mobility Intelligence (Self-Adjusting Full-Width Row Grid)
          ========================================================================= */}
      <section
        id="mobility"
        style={{
          background: "#FFFFFF",
          padding: "88px 0 96px",
          borderBottom: "1px solid #E2E8F0",
        }}
      >
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
          {/* Centered Section Header */}
          <div style={{ textAlign: "center", maxWidth: 780, margin: "0 auto 40px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(29, 78, 216, 0.08)",
                border: "1px solid rgba(29, 78, 216, 0.2)",
                borderRadius: 100,
                padding: "5px 14px",
                fontSize: "0.78rem",
                fontWeight: 700,
                color: "#1D4ED8",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              STEP 02 · MARKET MOBILITY INTELLIGENCE
            </div>
            <h2
              style={{
                fontFamily: "var(--font-serif, Georgia, serif)",
                fontSize: "clamp(2rem, 3.2vw, 2.6rem)",
                color: "#08142A",
                margin: "0 0 12px",
                fontWeight: 700,
                lineHeight: 1.2,
              }}
            >
              Where lateral hires come from in{" "}
              <span className="serif-accent" style={{ color: "#1D4ED8", fontStyle: "italic" }}>
                {city.name}
              </span>
            </h2>
            <p style={{ color: "#64748B", fontSize: "1.05rem", lineHeight: 1.6, margin: 0 }}>
              Historical background analysis of attorneys and paralegals successfully placed by Orion into boutique and midsize Texas practices.
            </p>
          </div>

          {/* Lateral Source Cards: Flex auto-expands so last row fills full width */}
          <div className="wth-lateral-grid">
            {lateralSources.map((s: [string, number], idx: number) => {
              const title = s[0];
              const pct = s[1];
              const rationale = lateralRationales[title] || "Seeking improved compensation alignment, direct client contact, and accelerated advancement.";

              return (
                <div key={idx} className="wth-lateral-card">
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
                      <span style={{ fontWeight: 700, color: "#08142A", fontSize: 16 }}>{title}</span>
                      <span style={{ fontFamily: "var(--font-serif, Georgia, serif)", fontSize: 30, fontWeight: 700, color: "#1D4ED8" }}>{pct}%</span>
                    </div>

                    <div style={{ background: "#E2E8F0", height: 7, borderRadius: 999, overflow: "hidden", marginBottom: 14 }}>
                      <div style={{ width: `${pct}%`, height: "100%", background: "#1D4ED8", borderRadius: 999 }} />
                    </div>

                    <p style={{ fontSize: 13.5, lineHeight: 1.55, color: "#475569", margin: 0 }}>
                      {rationale}
                    </p>
                  </div>

                  <div style={{ borderTop: "1px solid #E2E8F0", marginTop: 16, paddingTop: 12, display: "flex", justifyContent: "space-between", fontSize: 12, color: "#64748B" }}>
                    <span>Average tenure prior to lateral:</span>
                    <strong style={{ color: "#08142A" }}>3.4 – 5.2 Years</strong>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Benchmark Comparative Strip */}
          <div
            style={{
              background: "#08142A",
              borderRadius: 14,
              padding: "32px 36px",
              color: "#FFFFFF",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 28,
              alignItems: "center",
              boxShadow: "0 10px 30px rgba(8, 20, 42, 0.15)",
            }}
          >
            <div>
              <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: 11, color: "#93C5FD", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>
                Average Placement Speed
              </div>
              <div style={{ fontFamily: "var(--font-serif, Georgia, serif)", fontSize: 32, fontWeight: 700, color: "#FFFFFF" }}>
                24 Days
              </div>
              <div style={{ fontSize: 12.5, color: "#CBD5E1", marginTop: 4 }}>
                From mandate intake to accepted offer (vs. 114 days via self-posting)
              </div>
            </div>

            <div style={{ borderLeft: "1px solid rgba(255,255,255,0.15)", paddingLeft: 24 }}>
              <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: 11, color: "#93C5FD", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>
                24-Month Retention
              </div>
              <div style={{ fontFamily: "var(--font-serif, Georgia, serif)", fontSize: 32, fontWeight: 700, color: "#FFFFFF" }}>
                94.2%
              </div>
              <div style={{ fontSize: 12.5, color: "#CBD5E1", marginTop: 4 }}>
                Attorneys and paralegals remaining active at client firms past two years
              </div>
            </div>

            <div style={{ borderLeft: "1px solid rgba(255,255,255,0.15)", paddingLeft: 24 }}>
              <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: 11, color: "#93C5FD", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>
                Contingency Warranty
              </div>
              <div style={{ fontFamily: "var(--font-serif, Georgia, serif)", fontSize: 32, fontWeight: 700, color: "#FFFFFF" }}>
                90 Days
              </div>
              <div style={{ fontSize: 12.5, color: "#CBD5E1", marginTop: 4 }}>
                Full calendar replacement guarantee with zero extra recruiting fees
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: Available Lateral Talent (Cards in Single Uniform Row)
          ========================================================================= */}
      <section
        id="candidates"
        style={{
          background: "#FAF9F5",
          padding: "88px 0 96px",
          borderBottom: "1px solid #E2E8F0",
        }}
      >
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
          {/* Centered Section Header */}
          <div style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 40px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(29, 78, 216, 0.08)",
                border: "1px solid rgba(29, 78, 216, 0.2)",
                borderRadius: 100,
                padding: "5px 14px",
                fontSize: "0.78rem",
                fontWeight: 700,
                color: "#1D4ED8",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              STEP 03 · AVAILABLE LATERAL TALENT
            </div>
            <h2
              style={{
                fontFamily: "var(--font-serif, Georgia, serif)",
                fontSize: "clamp(2rem, 3.2vw, 2.6rem)",
                color: "#08142A",
                margin: "0 0 12px",
                fontWeight: 700,
                lineHeight: 1.2,
              }}
            >
              Skip the recruiting calendar:{" "}
              <span className="serif-accent" style={{ color: "#1D4ED8", fontStyle: "italic" }}>
                {city.name} talent ready now
              </span>
            </h2>
            <p style={{ color: "#64748B", fontSize: "1.05rem", lineHeight: 1.6, margin: 0 }}>
              Direct confidential lateral dossiers delivered to your inbox with zero upfront retainer.
            </p>
          </div>

          {/* Candidate Cards: Strictly in a Single Uniform 3-Column Row */}
          <div className="wth-candidates-row">
            {candidates.map((candidate) => candidate && (
              <CandidateCard key={candidate.id} candidate={candidate} />
            ))}
          </div>

          {/* Bottom Discovery Banner */}
          <div
            style={{
              marginTop: 28,
              padding: "20px 24px",
              background: "#FFFFFF",
              border: "1.5px solid #E2E8F0",
              borderRadius: 12,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 14,
              boxShadow: "0 4px 16px rgba(8, 20, 42, 0.03)",
            }}
          >
            <div>
              <b style={{ color: "#08142A", fontSize: "0.95rem" }}>
                Need candidates in a specific practice specialty across {city.name}?
              </b>
              <p style={{ margin: "4px 0 0", fontSize: "0.88rem", color: "#64748B" }}>
                Justin maintains confidential relationships with off-market lateral attorneys across the state.
              </p>
            </div>
            <Link
              href={`/find-candidates#city=${city.slug}`}
              style={{
                color: "#1D4ED8",
                fontWeight: 700,
                fontSize: "0.92rem",
                textDecoration: "none",
              }}
            >
              Explore All {screenedCount} {city.name} Dossiers →
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: Turnkey Firm Hiring Kit
          ========================================================================= */}
      <section
        id="kit"
        style={{
          background: "#FFFFFF",
          padding: "88px 0 96px",
          borderBottom: "1px solid #E2E8F0",
        }}
      >
        <div
          style={{
            maxWidth: 1240,
            margin: "0 auto",
            padding: "0 24px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: 48,
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ marginBottom: 28 }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "rgba(29, 78, 216, 0.08)",
                  border: "1px solid rgba(29, 78, 216, 0.2)",
                  borderRadius: 100,
                  padding: "5px 14px",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  color: "#1D4ED8",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  marginBottom: 12,
                }}
              >
                STEP 04 · FIRM HIRING KIT
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-serif, Georgia, serif)",
                  fontSize: "clamp(2rem, 3.2vw, 2.6rem)",
                  color: "#08142A",
                  margin: "0 0 14px",
                  fontWeight: 700,
                  lineHeight: 1.2,
                }}
              >
                Hiring on your own in {city.name}?{" "}
                <span className="serif-accent" style={{ color: "#1D4ED8", fontStyle: "italic" }}>
                  Take the turnkey kit
                </span>
              </h2>
              <p style={{ color: "#64748B", fontSize: "1.05rem", lineHeight: 1.6, margin: 0 }}>
                Standardize your recruitment process across local law schools and bar associations with our battle-tested templates and evaluation rubrics.
              </p>
            </div>

            <div style={{ display: "grid", gap: 16 }}>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start", background: "#FAF9F5", padding: "16px 18px", borderRadius: 10, border: "1.5px solid #EAE7DC" }}>
                <span style={{ color: "#1D4ED8", fontWeight: 700, fontSize: 18, lineHeight: 1 }}>✓</span>
                <span style={{ fontSize: 13.5, color: "#334155", lineHeight: 1.55 }}>
                  <strong style={{ color: "#08142A" }}>Campus Job Board Posting Copy:</strong> Pre-formatted role descriptions optimized for UH Law Center and South Texas College of Law portals.
                </span>
              </div>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start", background: "#FAF9F5", padding: "16px 18px", borderRadius: 10, border: "1.5px solid #EAE7DC" }}>
                <span style={{ color: "#1D4ED8", fontWeight: 700, fontSize: 18, lineHeight: 1 }}>✓</span>
                <span style={{ fontSize: 13.5, color: "#334155", lineHeight: 1.55 }}>
                  <strong style={{ color: "#08142A" }}>Diagnostic Interview Questions:</strong> 15 behavioral and drafting questions to evaluate substantive legal execution and billable habits.
                </span>
              </div>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start", background: "#FAF9F5", padding: "16px 18px", borderRadius: 10, border: "1.5px solid #EAE7DC" }}>
                <span style={{ color: "#1D4ED8", fontWeight: 700, fontSize: 18, lineHeight: 1 }}>✓</span>
                <span style={{ fontSize: 13.5, color: "#334155", lineHeight: 1.55 }}>
                  <strong style={{ color: "#08142A" }}>Texas Lateral Compensation Grid:</strong> Current percentile salary tables for estate planning, litigation, and probate laterals in {city.name}.
                </span>
              </div>
            </div>
          </div>

          <div
            id="kit-gate"
            style={{
              background: "#FFFFFF",
              border: "1.5px solid #E2E8F0",
              borderRadius: 14,
              padding: "32px 28px",
              boxShadow: "0 8px 30px rgba(15, 23, 42, 0.05)",
            }}
          >
            <GateForm
              eyebrow="FREE DOWNLOAD"
              title="Email me the complete hiring kit"
              button="Download the turnkey kit"
              preset="kit"
              role="estate-planning-attorney"
              city={city.slug}
              review="brett-zimmerman"
              fine="Delivered immediately as an editable Word document and PDF. Zero spam."
            />
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: Closing Midnight Navy Executive CTA
          ========================================================================= */}
      <section
        style={{
          position: "relative",
          background: "#08142A",
          padding: "96px 0 108px",
          textAlign: "center",
          color: "#FFFFFF",
          borderTop: "1px solid rgba(255, 255, 255, 0.12)",
        }}
      >
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "0 24px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(29, 78, 216, 0.2)",
              border: "1px solid rgba(96, 165, 250, 0.35)",
              borderRadius: 100,
              padding: "5px 14px",
              fontFamily: "var(--font-mono, monospace)",
              fontSize: 11,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#93C5FD",
              marginBottom: 18,
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#60A5FA" }} />
            <span>EXECUTIVE LEGAL PLACEMENT · {city.name.toUpperCase()}</span>
          </div>

          <h2
            style={{
              fontFamily: "var(--font-serif, Georgia, serif)",
              fontSize: "clamp(32px, 4.2vw, 48px)",
              color: "#FFFFFF",
              margin: "0 0 18px",
              fontWeight: 700,
              lineHeight: 1.15,
            }}
          >
            Meet pre-screened {city.name} legal talent{" "}
            <span className="serif-accent" style={{ color: "#60A5FA", fontStyle: "italic" }}>
              without the wait.
            </span>
          </h2>

          <p style={{ color: "#CBD5E1", fontSize: 17, lineHeight: 1.6, marginBottom: 34, maxWidth: 640, margin: "0 auto 34px" }}>
            Access confidential lateral attorney and paralegal dossiers. Pay our standard 23% contingency fee only if you decide to hire.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap", marginBottom: 36 }}>
            <Link
              href={`/find-candidates#city=${city.slug}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#1D4ED8",
                color: "#FFFFFF",
                fontWeight: 600,
                fontSize: 15,
                padding: "13px 30px",
                borderRadius: 7,
                textDecoration: "none",
                boxShadow: "0 4px 14px rgba(29, 78, 216, 0.4)",
              }}
            >
              <span>View {city.name} candidates ({screenedCount})</span>
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/submit-job"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.22)",
                color: "#FFFFFF",
                fontWeight: 600,
                fontSize: 15,
                padding: "13px 26px",
                borderRadius: 7,
                textDecoration: "none",
              }}
            >
              <span>Submit your open seat</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.12)", paddingTop: 20, fontSize: "0.85rem", color: "#94A3B8" }}>
            Zero upfront retainer · 23% contingency fee only upon hire · 90-day replacement warranty
          </div>
        </div>
      </section>
    </div>
  );
}
