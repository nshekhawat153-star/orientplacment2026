"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DATA, fmt, matchCandidates } from "@/data";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Mark } from "@/components/Mark";
import { TrustLine, RatingBadge } from "@/components/Rating";
import { CandidateCard } from "@/components/CandidateCard";
import { GateForm } from "@/components/GateForm";
import { ReviewCard } from "@/components/ReviewCard";
import { CtaBand } from "@/components/CtaBand";
import { Icon } from "@/components/icons";

export function HiringKitClient({
  roleParam
}: {
  roleParam: string;
}) {
  const role = DATA.roles.find(r => r.slug === roleParam);

  if (!role) {
    notFound();
  }

  const kit = DATA.hiringKit[role.slug];
  const payModels = DATA.payModels[role.slug] || [];

  const [activeTab, setActiveTab] = useState<"posting" | "questions" | "scorecard" | "offer" | "pay">("posting");

  // Form facts state
  const [firm, setFirm] = useState<string>("");
  const [citySlug, setCitySlug] = useState<string>("houston-tx");
  const [firmSize, setFirmSize] = useState<number>(8);
  const [yearsKey, setYearsKey] = useState<string>("b2");
  const [loPay, setLoPay] = useState<number>(115000);
  const [hiPay, setHiPay] = useState<number>(150000);
  const [workMode, setWorkMode] = useState<"on-site" | "hybrid">("on-site");
  const [email, setEmail] = useState<string>("");

  const [copied, setCopied] = useState<boolean>(false);
  const [copyNote, setCopyNote] = useState<string>("");

  // Scorecard state
  const [scores, setScores] = useState<Record<number, number>>({});

  // Sync default pay band when city or years changes
  useEffect(() => {
    const band = DATA.bands[citySlug]?.[role.slug];
    if (band && band[yearsKey as keyof typeof band]) {
      const range = band[yearsKey as keyof typeof band] as [number, number];
      setLoPay(range[0] * 1000);
      setHiPay(range[1] * 1000);
    }
  }, [citySlug, yearsKey, role.slug]);

  const currentCity = DATA.cities.find(c => c.slug === citySlug) || DATA.cities[0];
  const currentExp = DATA.expBands.find(e => e.key === yearsKey) || DATA.expBands[1];

  const templateVars: Record<string, string> = {
    firm: firm || "[Your firm]",
    size: String(firmSize || "[number]"),
    city: currentCity.name,
    state: currentCity.state,
    years: currentExp.label,
    pay: `${fmt.money(Math.min(loPay, hiPay))} to ${fmt.money(Math.max(loPay, hiPay))}`,
    mode: workMode === "hybrid" ? "Hybrid, with set days" : "On-site, Monday to Friday",
    email: email || "hiring@yourfirm.com"
  };

  const fill = (s: string) => {
    return s.replace(/\{(\w+)\}/g, (_, k) => templateVars[k] || "").replace(/^(\w)/, (x) => x.toUpperCase());
  };

  const postingText = () => {
    if (!kit) return "";
    const lines: string[] = [];
    kit.template.forEach(([type, text]: [string, string]) => {
      const t = fill(text);
      lines.push(type === "h" ? (lines.length ? `\n${t}` : t) : type === "li" ? `- ${t}` : t);
    });
    return lines.join("\n");
  };

  // Matched candidates
  const matched = matchCandidates({
    role: role.slug,
    city: citySlug,
    years: yearsKey,
    mode: workMode,
    pay: Math.max(loPay, hiPay) / 1000
  });
  const topMatches = matched.slice(0, 3);

  const handleCopyPosting = async () => {
    const text = postingText();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setCopyNote(`Copied. ${matched.length} candidate${matched.length === 1 ? "" : "s"} already match this posting.`);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopyNote("Copy failed. Select the text above to copy it.");
    }
  };

  // Scorecard calculation
  let scoreSum = 0;
  let weightSum = 0;
  let ratedCount = 0;
  if (kit) {
    kit.scorecard.forEach((s: { k: string; hint: string; w: number }, idx: number) => {
      const val = scores[idx];
      if (val) {
        scoreSum += s.w * val;
        weightSum += s.w;
        ratedCount++;
      }
    });
  }
  const weightedTotal = ratedCount && weightSum ? (scoreSum / weightSum).toFixed(1) : "–";

  return (
    <div style={{ background: "#FAF9F5", minHeight: "100vh", color: "#08142A" }}>
      {/* 1. Luxury Dark Hero with Splash Video */}
      <section
        style={{
          position: "relative",
          background: "radial-gradient(ellipse 90% 80% at 50% -20%, rgba(29, 78, 216, 0.28) 0%, rgba(8, 20, 42, 0.98) 75%, #08142A 100%)",
          color: "#FFFFFF",
          padding: "124px 0 76px",
          overflow: "hidden",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)"
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.16,
            pointerEvents: "none",
            zIndex: 0
          }}
        >
          <source src="/media/splash.mp4" type="video/mp4" />
          <source src="/videos/hero-water-splash.mp4" type="video/mp4" />
        </video>

        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
          <div style={{ marginBottom: "20px" }}>
            <Breadcrumb
              crumbs={[
                { label: "Home", href: "/" },
                { label: role.name, href: `/roles/${role.slug}` },
                { label: "Hiring Kit", current: true }
              ]}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "48px", alignItems: "center" }} className="kit-hero-grid">
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "rgba(29, 78, 216, 0.15)",
                  border: "1px solid rgba(96, 165, 250, 0.3)",
                  borderRadius: "100px",
                  padding: "6px 14px",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "#93C5FD",
                  marginBottom: "18px"
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#60A5FA" }} />
                Executive Law Firm Hiring Kit · {role.name}
              </div>

              <h1
                style={{
                  fontSize: "clamp(2.4rem, 4.4vw, 3.6rem)",
                  fontFamily: "var(--font-serif, 'Playfair Display', Georgia, serif)",
                  fontWeight: 700,
                  lineHeight: 1.15,
                  color: "#FFFFFF",
                  letterSpacing: "-0.02em",
                  margin: "0 0 18px"
                }}
              >
                {role.name} <br />
                <span style={{ color: "#93C5FD", fontStyle: "italic" }}>Hiring Kit & Playbook</span>
              </h1>

              <p
                style={{
                  fontSize: "1.12rem",
                  lineHeight: 1.6,
                  color: "rgba(255, 255, 255, 0.82)",
                  maxWidth: "580px",
                  margin: "0 0 28px"
                }}
              >
                A battle-tested lateral posting you can customize and copy, structured interview questions, candidate evaluation scorecard, and formal offer-letter outline. 100% free with zero registration.
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", alignItems: "center", marginBottom: "32px" }}>
                <button
                  type="button"
                  onClick={handleCopyPosting}
                  style={{
                    background: copied ? "#059669" : "#1D4ED8",
                    color: "#FFFFFF",
                    padding: "13px 26px",
                    borderRadius: "7px",
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 4px 14px rgba(29, 78, 216, 0.4)",
                    transition: "all 0.2s ease"
                  }}
                >
                  {copied ? "✓ Copied Posting to Clipboard" : "Copy Live Posting"}
                </button>
                <a
                  href="#download"
                  style={{
                    background: "rgba(255, 255, 255, 0.08)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    color: "#FFFFFF",
                    padding: "13px 22px",
                    borderRadius: "7px",
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    transition: "all 0.2s ease"
                  }}
                >
                  Download Full Kit (PDF & Word) →
                </a>
              </div>

              <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.12)", paddingTop: "18px" }}>
                <TrustLine />
              </div>
            </div>

            {/* Visual Kit Layered Cards Graphic */}
            <div style={{ position: "relative", minHeight: "340px", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div
                style={{
                  width: "100%",
                  maxWidth: "400px",
                  background: "rgba(15, 23, 42, 0.75)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  borderRadius: "14px",
                  padding: "24px",
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", borderBottom: "1px solid rgba(255, 255, 255, 0.1)", paddingBottom: "12px" }}>
                  <span style={{ fontSize: "0.82rem", fontWeight: 700, letterSpacing: "0.06em", color: "#60A5FA", textTransform: "uppercase" }}>Complete 5-Part Kit</span>
                  <span style={{ fontSize: "0.78rem", background: "rgba(37, 99, 235, 0.3)", color: "#93C5FD", padding: "3px 8px", borderRadius: "4px" }}>v2026 Edition</span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {[
                    { num: "01", name: "Customizable Job Posting", desc: "Live dynamic variables & pay bands" },
                    { num: "02", name: "Structured Interview Guide", desc: "Targeted questions & candidate red flags" },
                    { num: "03", name: "Weighted Candidate Scorecard", desc: "Instant mathematical suitability index" },
                    { num: "04", name: "Executive Offer Letter", desc: "Bar admission & 10-part contingency outline" },
                    { num: "05", name: "Boutique Pay Architecture", desc: "Base + bonus + origination models" }
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "10px 14px",
                        background: "rgba(255, 255, 255, 0.04)",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        borderRadius: "8px"
                      }}
                    >
                      <span style={{ fontFamily: "monospace", fontSize: "0.85rem", color: "#60A5FA", fontWeight: 700 }}>{item.num}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "#FFFFFF" }}>{item.name}</div>
                        <div style={{ fontSize: "0.75rem", color: "rgba(255, 255, 255, 0.6)" }}>{item.desc}</div>
                      </div>
                      <span style={{ color: "#60A5FA", fontSize: "0.85rem" }}>✓</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Kit Tabs Section */}
      <section style={{ maxWidth: "1200px", margin: "-32px auto 0", padding: "0 24px", position: "relative", zIndex: 10 }}>
        {/* Navigation Tabs Pill Bar */}
        <div
          style={{
            background: "#FFFFFF",
            border: "1px solid #E2E8F0",
            borderRadius: "12px",
            padding: "8px",
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            boxShadow: "0 10px 30px rgba(8, 20, 42, 0.06)",
            marginBottom: "36px"
          }}
          role="tablist"
          aria-label="Hiring kit navigation"
        >
          {[
            { id: "posting", label: "01. Posting Template" },
            { id: "questions", label: "02. Interview Questions" },
            { id: "scorecard", label: "03. Candidate Scorecard" },
            { id: "offer", label: "04. Offer Letter Outline" },
            { id: "pay", label: "05. Partner & Associate Pay Models" }
          ].map(tab => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              style={{
                flex: "1 1 auto",
                padding: "12px 18px",
                borderRadius: "8px",
                fontWeight: activeTab === tab.id ? 700 : 500,
                fontSize: "0.92rem",
                border: "none",
                cursor: "pointer",
                background: activeTab === tab.id ? "#08142A" : "transparent",
                color: activeTab === tab.id ? "#FFFFFF" : "#475569",
                boxShadow: activeTab === tab.id ? "0 2px 8px rgba(8, 20, 42, 0.2)" : "none",
                transition: "all 0.15s ease",
                textAlign: "center"
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: POSTING TEMPLATE WITH LIVE FACTS FORM */}
        {activeTab === "posting" && (
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "32px", alignItems: "start" }} className="kit-split-grid">
            {/* Live Rendered Template */}
            <div
              style={{
                background: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderRadius: "12px",
                padding: "36px",
                boxShadow: "0 4px 20px rgba(8, 20, 42, 0.04)"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", borderBottom: "1px solid #F1F5F9", paddingBottom: "16px" }}>
                <div>
                  <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#1D4ED8", textTransform: "uppercase", letterSpacing: "0.06em" }}>Live Preview</span>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#08142A", margin: "4px 0 0" }}>Customized Job Description</h3>
                </div>
                <button
                  type="button"
                  onClick={handleCopyPosting}
                  style={{
                    background: copied ? "#059669" : "#1D4ED8",
                    color: "#FFFFFF",
                    padding: "9px 18px",
                    borderRadius: "7px",
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 2px 8px rgba(29, 78, 216, 0.3)"
                  }}
                >
                  {copied ? "✓ Copied" : "Copy Live Text"}
                </button>
              </div>

              <div style={{ lineHeight: 1.7, color: "#334155", fontSize: "0.98rem" }}>
                {kit?.template.map(([type, text]: [string, string], i: number) => {
                  const t = fill(text);
                  if (type === "h") {
                    return (
                      <h4
                        key={i}
                        style={{
                          fontSize: "1.1rem",
                          fontWeight: 700,
                          color: "#08142A",
                          margin: i === 0 ? "0 0 12px" : "24px 0 10px",
                          fontFamily: "var(--font-serif, Georgia, serif)"
                        }}
                      >
                        {t}
                      </h4>
                    );
                  }
                  if (type === "li") {
                    return (
                      <div key={i} style={{ display: "flex", gap: "10px", margin: "6px 0", paddingLeft: "4px" }}>
                        <span style={{ color: "#1D4ED8", fontWeight: 700 }}>•</span>
                        <span>{t}</span>
                      </div>
                    );
                  }
                  return <p key={i} style={{ margin: "0 0 12px" }}>{t}</p>;
                })}
              </div>

              {copyNote && (
                <div style={{ marginTop: "20px", padding: "12px 16px", background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: "8px", color: "#1E40AF", fontSize: "0.9rem" }}>
                  {copyNote}
                </div>
              )}
            </div>

            {/* Firm Facts Form Sidebar */}
            <div
              style={{
                background: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderRadius: "12px",
                padding: "28px",
                boxShadow: "0 4px 20px rgba(8, 20, 42, 0.04)"
              }}
            >
              <div style={{ marginBottom: "20px" }}>
                <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#1D4ED8", textTransform: "uppercase", letterSpacing: "0.06em" }}>Customization Engine</span>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#08142A", margin: "4px 0 0" }}>Your Firm&apos;s Specifics</h3>
                <p style={{ fontSize: "0.85rem", color: "#64748B", margin: "4px 0 0" }}>Update the variables to dynamically regenerate your job mandate.</p>
              </div>

              <form onSubmit={e => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <label htmlFor="k-firm" style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#475569", marginBottom: "6px" }}>Firm Name</label>
                  <input
                    id="k-firm"
                    type="text"
                    placeholder="e.g. Sterling & Sterling LLP"
                    value={firm}
                    onChange={(e) => setFirm(e.target.value)}
                    style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "7px", fontSize: "0.9rem", color: "#08142A" }}
                  />
                </div>

                <div>
                  <label htmlFor="k-city" style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#475569", marginBottom: "6px" }}>Target City & Market</label>
                  <select
                    id="k-city"
                    value={citySlug}
                    onChange={(e) => setCitySlug(e.target.value)}
                    style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "7px", fontSize: "0.9rem", color: "#08142A", background: "#FFFFFF" }}
                  >
                    {DATA.cities.filter(c => DATA.bands[c.slug]?.[role.slug]).map(c => (
                      <option key={c.slug} value={c.slug}>{c.name}, {c.state}</option>
                    ))}
                  </select>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div>
                    <label htmlFor="k-size" style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#475569", marginBottom: "6px" }}>Firm Attorney Count</label>
                    <input
                      id="k-size"
                      type="number"
                      min={1}
                      max={500}
                      value={firmSize}
                      onChange={(e) => setFirmSize(Number(e.target.value))}
                      style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "7px", fontSize: "0.9rem", color: "#08142A" }}
                    />
                  </div>
                  <div>
                    <label htmlFor="k-years" style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#475569", marginBottom: "6px" }}>Target Seniority</label>
                    <select
                      id="k-years"
                      value={yearsKey}
                      onChange={(e) => setYearsKey(e.target.value)}
                      style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "7px", fontSize: "0.9rem", color: "#08142A", background: "#FFFFFF" }}
                    >
                      {DATA.expBands.map(e => (
                        <option key={e.key} value={e.key}>{e.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#475569", marginBottom: "6px" }}>
                    Verified Base Salary Range ($)
                  </label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                    <input
                      id="k-lo"
                      type="number"
                      value={loPay}
                      onChange={(e) => setLoPay(Number(e.target.value))}
                      style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "7px", fontSize: "0.9rem", color: "#08142A" }}
                      placeholder="Min"
                    />
                    <input
                      id="k-hi"
                      type="number"
                      value={hiPay}
                      onChange={(e) => setHiPay(Number(e.target.value))}
                      style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "7px", fontSize: "0.9rem", color: "#08142A" }}
                      placeholder="Max"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="k-mode" style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#475569", marginBottom: "6px" }}>Work Arrangement</label>
                  <select
                    id="k-mode"
                    value={workMode}
                    onChange={(e) => setWorkMode(e.target.value as "on-site" | "hybrid")}
                    style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "7px", fontSize: "0.9rem", color: "#08142A", background: "#FFFFFF" }}
                  >
                    <option value="on-site">On-site (Mon–Fri)</option>
                    <option value="hybrid">Hybrid (Designated in-office days)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="k-email" style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#475569", marginBottom: "6px" }}>Direct Hiring Inquiries Email</label>
                  <input
                    id="k-email"
                    type="email"
                    placeholder="hiring@yourfirm.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "7px", fontSize: "0.9rem", color: "#08142A" }}
                  />
                </div>
              </form>
            </div>
          </div>
        )}

        {/* TAB 2: INTERVIEW QUESTIONS */}
        {activeTab === "questions" && (
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "32px", alignItems: "start" }} className="kit-split-grid">
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {kit?.questions.map((q: { q: string; good: string; flag: string }, idx: number) => (
                <div
                  key={idx}
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid #E2E8F0",
                    borderRadius: "12px",
                    padding: "28px",
                    boxShadow: "0 4px 20px rgba(8, 20, 42, 0.04)"
                  }}
                >
                  <div style={{ display: "flex", gap: "12px", alignItems: "baseline", marginBottom: "16px" }}>
                    <span style={{ fontFamily: "monospace", fontSize: "0.9rem", fontWeight: 700, color: "#1D4ED8", background: "#EFF6FF", padding: "4px 8px", borderRadius: "4px" }}>
                      Q{idx + 1}
                    </span>
                    <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#08142A", margin: 0, lineHeight: 1.4 }}>{q.q}</h3>
                  </div>

                  <div style={{ display: "grid", gap: "14px" }}>
                    <div style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: "8px", padding: "14px 16px" }}>
                      <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#166534", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: "4px" }}>
                        ✓ Strong Lateral Candidate Indicator
                      </span>
                      <p style={{ margin: 0, fontSize: "0.9rem", color: "#14532D", lineHeight: 1.5 }}>{q.good}</p>
                    </div>

                    <div style={{ background: "#FFF1F2", border: "1px solid #FECDD3", borderRadius: "8px", padding: "14px 16px" }}>
                      <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#9F1239", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: "4px" }}>
                        ⚠ Potential Red Flag / Inconsistency
                      </span>
                      <p style={{ margin: 0, fontSize: "0.9rem", color: "#881337", lineHeight: 1.5 }}>{q.flag}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Interview Best Practices Card */}
            <div
              style={{
                background: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderRadius: "12px",
                padding: "28px",
                boxShadow: "0 4px 20px rgba(8, 20, 42, 0.04)"
              }}
            >
              <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#1D4ED8", textTransform: "uppercase", letterSpacing: "0.06em" }}>Hiring Best Practice</span>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#08142A", margin: "6px 0 12px" }}>Structured Interviewing</h3>
              <p style={{ fontSize: "0.92rem", lineHeight: 1.6, color: "#475569", margin: "0 0 18px" }}>
                Ask every candidate the identical sequence of substantive questions without deviating. Record specific matter examples immediately, then transfer scores to your weighted evaluation rubric.
              </p>
              <button
                type="button"
                onClick={() => setActiveTab("scorecard")}
                style={{
                  width: "100%",
                  background: "#08142A",
                  color: "#FFFFFF",
                  padding: "12px 18px",
                  borderRadius: "7px",
                  fontWeight: 600,
                  fontSize: "0.92rem",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "8px"
                }}
              >
                Proceed to Scorecard Rubric →
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: CANDIDATE SCORECARD */}
        {activeTab === "scorecard" && (
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "32px", alignItems: "start" }} className="kit-split-grid">
            <div
              style={{
                background: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderRadius: "12px",
                padding: "32px",
                boxShadow: "0 4px 20px rgba(8, 20, 42, 0.04)"
              }}
            >
              <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#08142A", margin: "0 0 8px" }}>Weighted Evaluation Rubric</h3>
              <p style={{ fontSize: "0.9rem", color: "#64748B", margin: "0 0 24px" }}>Assign ratings from 1 (unsatisfactory) to 5 (exceptional) per competency criteria.</p>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {kit?.scorecard.map((s: { k: string; hint: string; w: number }, i: number) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "16px",
                      padding: "16px 20px",
                      background: "#F8FAFC",
                      border: "1px solid #E2E8F0",
                      borderRadius: "8px"
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <span style={{ fontWeight: 700, color: "#08142A", fontSize: "0.98rem" }}>{s.k}</span>
                        <span style={{ fontSize: "0.75rem", background: "#EFF6FF", color: "#1D4ED8", fontWeight: 700, padding: "2px 8px", borderRadius: "100px" }}>
                          Weight: {s.w}%
                        </span>
                      </div>
                      <div style={{ fontSize: "0.85rem", color: "#64748B", marginTop: "4px" }}>{s.hint}</div>
                    </div>

                    <select
                      aria-label={`Rating for ${s.k}`}
                      value={scores[i] || ""}
                      onChange={(e) => setScores({ ...scores, [i]: Number(e.target.value) })}
                      style={{
                        padding: "8px 14px",
                        border: "1px solid #CBD5E1",
                        borderRadius: "6px",
                        fontWeight: 700,
                        fontSize: "0.95rem",
                        color: scores[i] ? "#1D4ED8" : "#475569",
                        background: "#FFFFFF",
                        cursor: "pointer"
                      }}
                    >
                      <option value="">Rate (–)</option>
                      <option value="1">1 - Unsatisfactory</option>
                      <option value="2">2 - Marginal</option>
                      <option value="3">3 - Competent</option>
                      <option value="4">4 - Advanced</option>
                      <option value="5">5 - Exceptional</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>

            {/* Scorecard Verdict Calculation */}
            <div
              style={{
                background: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderRadius: "12px",
                padding: "32px",
                boxShadow: "0 4px 20px rgba(8, 20, 42, 0.04)",
                textAlign: "center"
              }}
            >
              <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#1D4ED8", textTransform: "uppercase", letterSpacing: "0.06em" }}>Mathematical Result</span>
              <div style={{ fontSize: "3.6rem", fontWeight: 800, color: "#08142A", margin: "12px 0 4px", fontFamily: "var(--font-serif, Georgia, serif)" }}>
                {weightedTotal}
                <span style={{ fontSize: "1.4rem", color: "#94A3B8", fontWeight: 400 }}> / 5.0</span>
              </div>
              <div style={{ fontSize: "0.92rem", fontWeight: 600, color: ratedCount > 0 ? "#1E293B" : "#64748B", marginBottom: "18px" }}>
                {ratedCount > 0
                  ? `${ratedCount} of ${kit?.scorecard.length} criteria evaluated`
                  : "Assign ratings to calculate candidate viability"}
              </div>

              <div style={{ background: "#F1F5F9", borderRadius: "8px", padding: "16px", textAlign: "left", fontSize: "0.88rem", color: "#334155", lineHeight: 1.5 }}>
                {ratedCount === kit?.scorecard.length ? (
                  parseFloat(weightedTotal) >= 3.8 ? (
                    <span style={{ color: "#15803D", fontWeight: 600 }}>✓ Strong Candidate: Score meets premier lateral hiring threshold for offer consideration.</span>
                  ) : parseFloat(weightedTotal) >= 3.0 ? (
                    <span style={{ color: "#B45309", fontWeight: 600 }}>● Viable Candidate: Compare closely against competitive market pool.</span>
                  ) : (
                    <span style={{ color: "#B91C1C", fontWeight: 600 }}>✕ Below Threshold: Substantive risk profile does not warrant lateral placement.</span>
                  )
                ) : (
                  "Complete all scorecard dimensions to receive an automated hiring committee recommendation."
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: OFFER LETTER OUTLINE */}
        {activeTab === "offer" && (
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "32px", alignItems: "start" }} className="kit-split-grid">
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {kit?.offer.map(([heading, detail]: [string, string], i: number) => (
                <div
                  key={i}
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid #E2E8F0",
                    borderRadius: "10px",
                    padding: "24px",
                    boxShadow: "0 2px 10px rgba(8, 20, 42, 0.03)"
                  }}
                >
                  <div style={{ display: "flex", gap: "12px", alignItems: "baseline", marginBottom: "8px" }}>
                    <span style={{ fontFamily: "monospace", fontSize: "0.85rem", fontWeight: 700, color: "#1D4ED8", background: "#EFF6FF", padding: "2px 8px", borderRadius: "4px" }}>
                      Clause {i + 1}
                    </span>
                    <h4 style={{ fontSize: "1.08rem", fontWeight: 700, color: "#08142A", margin: 0 }}>{heading}</h4>
                  </div>
                  <p style={{ margin: 0, fontSize: "0.92rem", color: "#475569", lineHeight: 1.6 }}>{detail}</p>
                </div>
              ))}
            </div>

            <div
              style={{
                background: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderRadius: "12px",
                padding: "28px",
                boxShadow: "0 4px 20px rgba(8, 20, 42, 0.04)"
              }}
            >
              <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#1D4ED8", textTransform: "uppercase", letterSpacing: "0.06em" }}>Offer Checklist</span>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#08142A", margin: "6px 0 12px" }}>Mandatory Offer Safeguards</h3>
              <p style={{ fontSize: "0.92rem", lineHeight: 1.6, color: "#475569", margin: "0 0 18px" }}>
                Ensure all offer letters explicitly condition employment on active state bar licensure in good standing, satisfactory reference checks, and non-disclosure compliance.
              </p>
              <div style={{ borderTop: "1px solid #E2E8F0", paddingTop: "16px", fontSize: "0.85rem", color: "#64748B" }}>
                Need employment counsel review? Consult your firm&apos;s managing partner prior to letter dispatch.
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: PAY MODELS */}
        {activeTab === "pay" && (
          <div
            style={{
              background: "#FFFFFF",
              border: "1px solid #E2E8F0",
              borderRadius: "12px",
              padding: "36px",
              boxShadow: "0 4px 20px rgba(8, 20, 42, 0.04)"
            }}
          >
            <h3 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#08142A", margin: "0 0 8px" }}>Boutique & Mid-Size Law Firm Pay Architectures</h3>
            <p style={{ fontSize: "0.92rem", color: "#64748B", margin: "0 0 24px" }}>Common compensation structures utilized by lateral hiring committees for {role.name}s.</p>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #E2E8F0", background: "#F8FAFC" }}>
                    <th style={{ padding: "14px 18px", fontSize: "0.85rem", fontWeight: 700, color: "#08142A" }}>Structure Model</th>
                    <th style={{ padding: "14px 18px", fontSize: "0.85rem", fontWeight: 700, color: "#08142A" }}>Mechanics & Flow</th>
                    <th style={{ padding: "14px 18px", fontSize: "0.85rem", fontWeight: 700, color: "#08142A" }}>Ideal Profile</th>
                    <th style={{ padding: "14px 18px", fontSize: "0.85rem", fontWeight: 700, color: "#08142A" }}>Market Terms</th>
                  </tr>
                </thead>
                <tbody>
                  {payModels.map((p, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid #F1F5F9" }}>
                      <td style={{ padding: "18px", fontWeight: 700, color: "#08142A", fontSize: "0.95rem" }}>{p.name}</td>
                      <td style={{ padding: "18px", color: "#475569", fontSize: "0.9rem", lineHeight: 1.5 }}>{p.how}</td>
                      <td style={{ padding: "18px", color: "#475569", fontSize: "0.9rem" }}>{p.fits}</td>
                      <td style={{ padding: "18px", color: "#1D4ED8", fontWeight: 700, fontSize: "0.95rem" }}>{p.typical}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ marginTop: "24px", padding: "16px 20px", background: "#FAF9F5", borderRadius: "8px", border: "1px solid #E2E8F0", fontSize: "0.9rem", color: "#475569" }}>
              For localized compensation benchmarks, explore verified rates on our{" "}
              <Link href={`/salaries/${role.slug}/houston-tx`} style={{ color: "#1D4ED8", fontWeight: 600 }}>
                {role.name} Salary Guide for Houston, TX
              </Link>.
            </div>
          </div>
        )}
      </section>

      {/* 3. Matching Pre-Screened Candidates */}
      <section style={{ maxWidth: "1200px", margin: "80px auto 0", padding: "0 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "32px", borderBottom: "1px solid #E2E8F0", paddingBottom: "20px" }}>
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(29, 78, 216, 0.08)",
                border: "1px solid rgba(29, 78, 216, 0.2)",
                borderRadius: "100px",
                padding: "4px 12px",
                fontSize: "0.78rem",
                fontWeight: 600,
                color: "#1D4ED8",
                marginBottom: "10px"
              }}
            >
              Active Orion Network
            </div>
            <h2 style={{ fontSize: "2rem", fontWeight: 700, color: "#08142A", margin: "0 0 6px", fontFamily: "var(--font-serif, Georgia, serif)" }}>
              Candidates Matching This Exact Mandate
            </h2>
            <p style={{ margin: 0, color: "#64748B", fontSize: "1.02rem" }}>
              <span style={{ fontWeight: 700, color: "#1D4ED8" }}>{matched.length} screened candidates</span> match your city, experience band, and compensation range.
            </p>
          </div>

          <Link
            href={`/find-candidates#role=${role.slug}&city=${citySlug}`}
            style={{
              color: "#1D4ED8",
              fontWeight: 600,
              fontSize: "0.95rem",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px"
            }}
          >
            Browse All {matched.length} Matches →
          </Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "32px", alignItems: "start" }} className="kit-cand-grid">
          <div style={{ display: "grid", gap: "20px" }}>
            {topMatches.map(r => (
              <CandidateCard key={r.c.id} candidate={r.c} />
            ))}
          </div>

          <div
            style={{
              background: "#FFFFFF",
              border: "1px solid #E2E8F0",
              borderRadius: "12px",
              padding: "28px",
              boxShadow: "0 4px 20px rgba(8, 20, 42, 0.04)"
            }}
          >
            <GateForm
              eyebrow="Direct Candidate Introductions"
              title={topMatches.length === 1 ? "Request Complete Dossier" : `Request Dossiers for Top ${topMatches.length} Matches`}
              bullets={[
                "Unredacted resumes delivered to your inbox within 60 minutes",
                "Explicit compensation requirements, bar status, and notice periods",
                "Strict 23% contingency success fee only if you extend an offer and hire"
              ]}
              button="Deliver Candidate Dossiers"
              ids={topMatches.map(r => r.c.id)}
              role={role.slug}
              city={citySlug}
              review="brett-zimmerman"
            />
          </div>
        </div>
      </section>

      {/* 4. Full Kit Download Section */}
      <section id="download" style={{ background: "#08142A", color: "#FFFFFF", padding: "80px 0", marginTop: "80px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "48px", alignItems: "center" }} className="kit-dl-grid">
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "rgba(29, 78, 216, 0.2)",
                  border: "1px solid rgba(96, 165, 250, 0.3)",
                  borderRadius: "100px",
                  padding: "4px 12px",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  color: "#93C5FD",
                  marginBottom: "16px"
                }}
              >
                Complimentary Tool
              </div>
              <h2 style={{ fontSize: "2.2rem", fontWeight: 700, margin: "0 0 16px", fontFamily: "var(--font-serif, Georgia, serif)" }}>
                Receive the Complete Kit via Email
              </h2>
              <p style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "1.05rem", lineHeight: 1.6, margin: "0 0 28px" }}>
                Download clean, editable Word templates and ready-to-print PDF guides to distribute directly to your firm&apos;s hiring committee and managing partners.
              </p>

              <div style={{ display: "grid", gap: "12px" }}>
                {[
                  "Formatted Word document (.docx) job description template",
                  "Structured lateral interview question guide with rating indicators",
                  "Printable candidate assessment scoring matrix",
                  "Ten-clause executive offer letter outline",
                  "Partner origination and associate base pay structures"
                ].map((item, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{ color: "#60A5FA", fontWeight: 700 }}>✓</span>
                    <span style={{ color: "rgba(255, 255, 255, 0.9)", fontSize: "0.95rem" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: "#FFFFFF", borderRadius: "12px", padding: "32px", color: "#08142A" }}>
              <GateForm
                eyebrow="Instant Delivery"
                title="Email Full Hiring Package"
                intro={`Editable Word (.docx) & PDF package for ${role.name} seats.`}
                button="Send Me the Kit"
                preset="kit"
                role={role.slug}
                city={citySlug}
                review="daffner-law"
                fine="One automated delivery email. No automated telemarketing or uninvited sales contact."
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Managing Partner Reviews */}
      <section style={{ maxWidth: "1200px", margin: "80px auto", padding: "0 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "32px" }}>
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(29, 78, 216, 0.08)",
                border: "1px solid rgba(29, 78, 216, 0.2)",
                borderRadius: "100px",
                padding: "4px 12px",
                fontSize: "0.78rem",
                fontWeight: 600,
                color: "#1D4ED8",
                marginBottom: "10px"
              }}
            >
              Verified Track Record
            </div>
            <h2 style={{ fontSize: "2rem", fontWeight: 700, color: "#08142A", margin: 0, fontFamily: "var(--font-serif, Georgia, serif)" }}>
              What Law Firm Partners Say
            </h2>
          </div>
          <RatingBadge link={true} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
          <ReviewCard review={DATA.reviews[0]} />
          <ReviewCard review={DATA.reviews[1]} />
          <ReviewCard review={DATA.reviews[3]} />
        </div>
      </section>

      {/* 6. Orion Direct Search CTA Band */}
      <CtaBand
        title="Prefer Orion to Headhunt Your Next Lateral?"
        text="Pre-screened, admitted attorneys ready to interview. Zero upfront retainer, and our standard 23% fee is payable only when you hire."
        button="Review Matching Candidates"
        href={`/find-candidates#role=${role.slug}`}
      />
    </div>
  );
}
