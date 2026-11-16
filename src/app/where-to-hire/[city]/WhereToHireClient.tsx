"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DATA, matchCandidates } from "@/data";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Mark } from "@/components/Mark";
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
    <div className="where-to-hire-page" style={{ background: "#FAF9F5", color: "#08142A" }}>
      {/* 1. LUXURY HERO WITH VIDEO & 2-COLUMN SNAPSHOT TERMINAL */}
      <section
        className="emp-luxury-hero-sec wth-luxury-hero"
        aria-labelledby="wth-hero-h1"
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
                { label: "Employers", href: "/employers" },
                { label: `Where to Hire · ${city.name}`, current: true },
              ]}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 40, alignItems: "center" }}>
            {/* Left Column: Heading & Executive Value */}
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
                  <span>REGIONAL HIRING DIRECTORY · {city.name.toUpperCase()}, {city.state.toUpperCase()}</span>
                </div>
              </div>

              <h1
                id="wth-hero-h1"
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
                Where to hire attorneys and paralegals in{" "}
                <span className="serif-accent" style={{ color: "#60A5FA", fontStyle: "italic" }}>
                  {city.name}
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
                Accredited Texas law schools, ABA-approved paralegal programmes, and active bar associations that {city.name} boutique firms recruit from. Direct career office contacts, seasonal recruitment cycles, and confidential lateral talent pools.
              </p>

              <div style={{ display: "grid", gap: 10, marginBottom: 32 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "#E2E8F0" }}>
                  <span style={{ color: "#60A5FA", fontWeight: 700 }}>✓</span>
                  <span>Direct career office liaison &amp; recruitment cycle timelines</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "#E2E8F0" }}>
                  <span style={{ color: "#60A5FA", fontWeight: 700 }}>✓</span>
                  <span>Active pool of {screenedCount} pre-screened {city.name} lateral professionals</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "#E2E8F0" }}>
                  <span style={{ color: "#60A5FA", fontWeight: 700 }}>✓</span>
                  <span>100% contingency placement: zero fee unless your chosen hire starts</span>
                </div>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
                <Link
                  className="btn-emp-primary"
                  href={`/find-candidates#city=${city.slug}`}
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
                  <span>See {city.name} candidates ({screenedCount})</span>
                  <span aria-hidden="true">→</span>
                </Link>
                <a
                  className="btn-emp-ghost"
                  href="#sources"
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
                  <span>Explore talent channels</span>
                  <span aria-hidden="true">↓</span>
                </a>
              </div>
            </div>

            {/* Right Column: Elevated Pipeline Terminal Card */}
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
                      {city.name} Talent Sourcing Terminal
                    </span>
                    <span style={{ fontSize: 13, color: "#64748B" }}>
                      Institutional channels &amp; lateral candidate pipelines
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 10.5,
                      color: "#1D4ED8",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      background: "#EFF6FF",
                      padding: "4px 8px",
                      borderRadius: 4,
                      border: "1px solid #DBEAFE",
                    }}
                  >
                    UPDATED {DATA.asOf}
                  </span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 20 }}>
                  <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 9, padding: "14px 16px" }}>
                    <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>
                      Law Schools
                    </div>
                    <div style={{ fontFamily: "var(--display)", fontSize: 30, color: "#08142A", fontWeight: 600 }}>
                      {nLawSchools}
                    </div>
                    <div style={{ fontSize: 12, color: "#64748B", marginTop: 4 }}>
                      Active OCI &amp; career desks
                    </div>
                  </div>

                  <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 9, padding: "14px 16px" }}>
                    <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>
                      Paralegal Degrees
                    </div>
                    <div style={{ fontFamily: "var(--display)", fontSize: 30, color: "#08142A", fontWeight: 600 }}>
                      {nParalegal}
                    </div>
                    <div style={{ fontSize: 12, color: "#64748B", marginTop: 4 }}>
                      ABA-accredited cohorts
                    </div>
                  </div>

                  <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 9, padding: "14px 16px" }}>
                    <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>
                      Bar Associations
                    </div>
                    <div style={{ fontFamily: "var(--display)", fontSize: 30, color: "#08142A", fontWeight: 600 }}>
                      {nAssoc}
                    </div>
                    <div style={{ fontSize: 12, color: "#64748B", marginTop: 4 }}>
                      Sections &amp; specialist committees
                    </div>
                  </div>

                  <div style={{ background: "#EFF6FF", border: "1.5px solid #BFDBFE", borderRadius: 9, padding: "14px 16px" }}>
                    <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "#1D4ED8", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>
                      Lateral Candidates
                    </div>
                    <div style={{ fontFamily: "var(--display)", fontSize: 30, color: "#1D4ED8", fontWeight: 600 }}>
                      {screenedCount}
                    </div>
                    <div style={{ fontSize: 12, color: "#1E40AF", marginTop: 4 }}>
                      Ready for confidential moves
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    background: "#FAF9F5",
                    border: "1px solid #EAE7DC",
                    borderRadius: 9,
                    padding: "14px 16px",
                    fontSize: 13,
                    lineHeight: 1.55,
                    color: "#475569",
                  }}
                >
                  <strong style={{ color: "#08142A" }}>Market Advisory:</strong> {city.name} boutique firms balance dual recruitment paths: on-campus interviews (OCI) for summer associates and entry-level clerks, paired with Orion&apos;s direct lateral introductions for seasoned 3-7 year attorneys who bring immediate bookable billables.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INSTITUTIONAL TALENT CHANNELS DIRECTORY */}
      <section className="emp-process-sec" id="sources" style={{ background: "#FAF9F5", padding: "88px 0 96px", borderBottom: "1px solid #EAE7DC" }}>
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
              INSTITUTIONAL TALENT CHANNELS
            </span>
            <h2
              style={{
                fontFamily: "var(--display)",
                fontSize: "clamp(28px, 3.6vw, 42px)",
                color: "#08142A",
                margin: "0 0 14px",
                fontWeight: 500,
                lineHeight: 1.18,
              }}
            >
              Who to contact, and when they <span className="serif-accent" style={{ fontStyle: "italic" }}>recruit</span>
            </h2>
            <p style={{ color: "#64748B", fontSize: 16, lineHeight: 1.6, margin: 0 }}>
              Direct career service office contacts, campus recruitment cycles, and optimal job posting windows across {city.name}&apos;s legal training institutions.
            </p>
          </div>

          {/* Controls: Filter Pills & Search Bar */}
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
              <button
                type="button"
                onClick={() => setKindFilter("all")}
                style={{
                  padding: "8px 18px",
                  borderRadius: 7,
                  fontSize: 13.5,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  background: kindFilter === "all" ? "#1D4ED8" : "#FFFFFF",
                  color: kindFilter === "all" ? "#FFFFFF" : "#334155",
                  border: `1.5px solid ${kindFilter === "all" ? "#1D4ED8" : "#E2E8F0"}`,
                }}
              >
                All sources ({places.length})
              </button>
              <button
                type="button"
                onClick={() => setKindFilter("Law school")}
                style={{
                  padding: "8px 18px",
                  borderRadius: 7,
                  fontSize: 13.5,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  background: kindFilter === "Law school" ? "#1D4ED8" : "#FFFFFF",
                  color: kindFilter === "Law school" ? "#FFFFFF" : "#334155",
                  border: `1.5px solid ${kindFilter === "Law school" ? "#1D4ED8" : "#E2E8F0"}`,
                }}
              >
                Law schools ({nLawSchools})
              </button>
              <button
                type="button"
                onClick={() => setKindFilter("Paralegal programme")}
                style={{
                  padding: "8px 18px",
                  borderRadius: 7,
                  fontSize: 13.5,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  background: kindFilter === "Paralegal programme" ? "#1D4ED8" : "#FFFFFF",
                  color: kindFilter === "Paralegal programme" ? "#FFFFFF" : "#334155",
                  border: `1.5px solid ${kindFilter === "Paralegal programme" ? "#1D4ED8" : "#E2E8F0"}`,
                }}
              >
                Paralegal programmes ({nParalegal})
              </button>
              <button
                type="button"
                onClick={() => setKindFilter("assoc")}
                style={{
                  padding: "8px 18px",
                  borderRadius: 7,
                  fontSize: 13.5,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  background: kindFilter === "assoc" ? "#1D4ED8" : "#FFFFFF",
                  color: kindFilter === "assoc" ? "#FFFFFF" : "#334155",
                  border: `1.5px solid ${kindFilter === "assoc" ? "#1D4ED8" : "#E2E8F0"}`,
                }}
              >
                Bar &amp; associations ({nAssoc})
              </button>
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

          {/* Directory Listings Cards Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 20 }}>
            {filteredPlaces.map((p, idx) => {
              const isLawSchool = p.kind === "Law school";
              const isParalegal = p.kind === "Paralegal programme";

              const badgeColor = isLawSchool
                ? { bg: "#EFF6FF", text: "#1D4ED8", border: "#DBEAFE" }
                : isParalegal
                ? { bg: "#ECFDF5", text: "#059669", border: "#A7F3D0" }
                : { bg: "#F8FAFC", text: "#475569", border: "#E2E8F0" };

              return (
                <div
                  key={idx}
                  style={{
                    background: "#FFFFFF",
                    border: "1.5px solid #E2E8F0",
                    borderRadius: 12,
                    padding: "24px 22px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    boxShadow: "0 4px 14px rgba(15, 23, 42, 0.03)",
                    transition: "transform 0.15s ease, box-shadow 0.15s ease",
                  }}
                >
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 12 }}>
                      <h3 style={{ fontFamily: "var(--display)", fontSize: 18, color: "#08142A", fontWeight: 600, margin: 0, lineHeight: 1.3 }}>
                        {p.name}
                      </h3>
                      <span
                        style={{
                          fontFamily: "var(--mono)",
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
                      <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 3 }}>
                        Direct Office Contact
                      </div>
                      <div style={{ fontSize: 14, fontWeight: 500, color: "#1E293B" }}>
                        {p.contact}
                      </div>
                    </div>

                    <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 8, padding: "12px 14px", marginBottom: 16 }}>
                      <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "#059669", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 3 }}>
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
                  padding: "8px 18px",
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

      {/* 3. LATERAL TALENT MOBILITY & ORIGIN MATRIX */}
      <section className="emp-process-sec" style={{ background: "#FFFFFF", padding: "88px 0 96px", borderBottom: "1px solid #E2E8F0" }}>
        <div className="wrap" style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
          <div className="sec-head" style={{ textAlign: "center", maxWidth: 780, margin: "0 auto 44px" }}>
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
              MARKET MOBILITY INTELLIGENCE
            </span>
            <h2
              style={{
                fontFamily: "var(--display)",
                fontSize: "clamp(28px, 3.6vw, 42px)",
                color: "#08142A",
                margin: "0 0 14px",
                fontWeight: 500,
                lineHeight: 1.18,
              }}
            >
              Where lateral hires come from in <span className="serif-accent" style={{ fontStyle: "italic" }}>{city.name}</span>
            </h2>
            <p style={{ color: "#64748B", fontSize: 16, lineHeight: 1.6, margin: 0 }}>
              Historical background analysis of attorneys and paralegals successfully placed by Orion into boutique and midsize Texas practices.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20, marginBottom: 44 }}>
            {lateralSources.map((s: [string, number], idx: number) => {
              const title = s[0];
              const pct = s[1];
              const rationale = lateralRationales[title] || "Seeking improved compensation alignment, direct client contact, and accelerated advancement.";

              return (
                <div
                  key={idx}
                  style={{
                    background: "#FAF9F5",
                    border: "1.5px solid #EAE7DC",
                    borderRadius: 12,
                    padding: "24px 22px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
                      <span style={{ fontWeight: 600, color: "#08142A", fontSize: 16 }}>{title}</span>
                      <span style={{ fontFamily: "var(--display)", fontSize: 28, fontWeight: 600, color: "#1D4ED8" }}>{pct}%</span>
                    </div>

                    <div style={{ background: "#E2E8F0", height: 7, borderRadius: 999, overflow: "hidden", marginBottom: 14 }}>
                      <div style={{ width: `${pct}%`, height: "100%", background: "#1D4ED8", borderRadius: 999 }} />
                    </div>

                    <p style={{ fontSize: 13, lineHeight: 1.55, color: "#475569", margin: 0 }}>
                      {rationale}
                    </p>
                  </div>

                  <div style={{ borderTop: "1px solid #E2E8F0", marginTop: 14, paddingTop: 10, display: "flex", justifyContent: "space-between", fontSize: 12, color: "#64748B" }}>
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
              padding: "28px 32px",
              color: "#FFFFFF",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 24,
              alignItems: "center",
            }}
          >
            <div>
              <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "#93C5FD", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>
                Average Placement Speed
              </div>
              <div style={{ fontFamily: "var(--display)", fontSize: 32, fontWeight: 500, color: "#FFFFFF" }}>
                24 Days
              </div>
              <div style={{ fontSize: 12.5, color: "#94A3B8", marginTop: 2 }}>
                From mandate intake to accepted offer (vs. 114 days via self-posting)
              </div>
            </div>

            <div style={{ borderLeft: "1px solid rgba(255,255,255,0.15)", paddingLeft: 24 }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "#93C5FD", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>
                24-Month Retention
              </div>
              <div style={{ fontFamily: "var(--display)", fontSize: 32, fontWeight: 500, color: "#FFFFFF" }}>
                94.2%
              </div>
              <div style={{ fontSize: 12.5, color: "#94A3B8", marginTop: 2 }}>
                Attorneys and paralegals remaining active at client firms past two years
              </div>
            </div>

            <div style={{ borderLeft: "1px solid rgba(255,255,255,0.15)", paddingLeft: 24 }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "#93C5FD", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>
                Contingency Warranty
              </div>
              <div style={{ fontFamily: "var(--display)", fontSize: 32, fontWeight: 500, color: "#FFFFFF" }}>
                90 Days
              </div>
              <div style={{ fontSize: 12.5, color: "#94A3B8", marginTop: 2 }}>
                Full calendar replacement guarantee with zero extra recruiting fees
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ACTIVE CANDIDATES READY NOW */}
      <section className="emp-process-sec" style={{ background: "#FAF9F5", padding: "88px 0 96px", borderBottom: "1px solid #EAE7DC" }}>
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
                AVAILABLE LATERAL TALENT
              </span>
              <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(26px, 3.4vw, 38px)", color: "#08142A", margin: 0, fontWeight: 500 }}>
                Skip the recruiting calendar: <span className="serif-accent" style={{ fontStyle: "italic" }}>{city.name}</span> talent ready now
              </h2>
            </div>
            <Link
              className="more link-arrow hide-sm"
              href={`/find-candidates#city=${city.slug}`}
              style={{ fontSize: 14, fontWeight: 600, color: "#1D4ED8", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}
            >
              <span>Explore all {screenedCount} {city.name} dossiers</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="cards" style={{ display: "grid", gap: 20 }}>
            {candidates.map((candidate) => candidate && (
              <CandidateCard key={candidate.id} candidate={candidate} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. TURNKEY HIRING KIT GATE FORM */}
      <section className="emp-process-sec" id="kit" style={{ background: "#FFFFFF", padding: "88px 0 96px" }}>
        <div className="wrap split" style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 48, alignItems: "center" }}>
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
                FIRM HIRING KIT
              </span>
              <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(28px, 3.6vw, 40px)", color: "#08142A", margin: "0 0 14px", fontWeight: 500 }}>
                Hiring on your own in {city.name}? <span className="serif-accent" style={{ fontStyle: "italic" }}>Take the turnkey kit</span>
              </h2>
              <p style={{ color: "#64748B", fontSize: 16, lineHeight: 1.6, margin: "0 0 24px" }}>
                Standardize your recruitment process across local law schools and bar associations with our battle-tested templates and evaluation rubrics.
              </p>
            </div>

            <div style={{ display: "grid", gap: 16 }}>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start", background: "#FAF9F5", padding: "14px 16px", borderRadius: 8, border: "1px solid #EAE7DC" }}>
                <span style={{ color: "#1D4ED8", fontWeight: 700, fontSize: 16 }}>✓</span>
                <span style={{ fontSize: 13.5, color: "#334155", lineHeight: 1.5 }}>
                  <strong style={{ color: "#08142A" }}>Campus Job Board Posting Copy:</strong> Pre-formatted role descriptions optimized for UH Law Center and South Texas College of Law portals.
                </span>
              </div>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start", background: "#FAF9F5", padding: "14px 16px", borderRadius: 8, border: "1px solid #EAE7DC" }}>
                <span style={{ color: "#1D4ED8", fontWeight: 700, fontSize: 16 }}>✓</span>
                <span style={{ fontSize: 13.5, color: "#334155", lineHeight: 1.5 }}>
                  <strong style={{ color: "#08142A" }}>Diagnostic Interview Questions:</strong> 15 behavioral and drafting questions to evaluate substantive legal execution and billable habits.
                </span>
              </div>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start", background: "#FAF9F5", padding: "14px 16px", borderRadius: 8, border: "1px solid #EAE7DC" }}>
                <span style={{ color: "#1D4ED8", fontWeight: 700, fontSize: 16 }}>✓</span>
                <span style={{ fontSize: 13.5, color: "#334155", lineHeight: 1.5 }}>
                  <strong style={{ color: "#08142A" }}>Texas Lateral Compensation Grid:</strong> Current percentile salary tables for estate planning, litigation, and probate laterals in {city.name}.
                </span>
              </div>
            </div>
          </div>

          <div id="kit-gate">
            <GateForm
              eyebrow="FREE DOWNLOAD"
              title="Email me the complete hiring kit"
              button="Download the turnkey kit"
              preset="kit"
              role="estate-planning-attorney"
              city={city.slug}
              reviewSlug="brett-zimmerman"
              fine="Delivered immediately as an editable Word document and PDF. Zero spam."
            />
          </div>
        </div>
      </section>

      {/* 6. BOTTOM MIDNIGHT NAVY CTA BAND */}
      <section className="emp-terms-dark-sec" style={{ background: "#08142A", padding: "96px 0 108px", textAlign: "center" }}>
        <div className="wrap" style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px" }}>
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
            Meet pre-screened {city.name} legal talent{" "}
            <span className="serif-accent" style={{ color: "#60A5FA", fontStyle: "italic" }}>
              without the wait.
            </span>
          </h2>

          <p style={{ color: "#CBD5E1", fontSize: 17, lineHeight: 1.6, marginBottom: 34, maxWidth: 640, margin: "0 auto 34px" }}>
            Access confidential lateral attorney and paralegal dossiers. Pay our standard 23% contingency fee only if you decide to hire.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            <Link
              href={`/find-candidates#city=${city.slug}`}
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
              <span>View {city.name} candidates</span>
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
              <span>Submit your open seat</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
