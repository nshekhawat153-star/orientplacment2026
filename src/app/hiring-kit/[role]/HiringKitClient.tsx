"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DATA, fmt, matchCandidates } from "@/data";
import { CandidateDossierCard } from "@/components/CandidateDossierCard";
import { PkHero, PkSection, PkCallCard } from "@/components/PageKit";
import { matchEnrichedCandidates } from "@/app/find-candidates/candidateData";
import "./hiring-kit.css";
import { Icon } from "@/components/icons";

const MODULES = [
  { key: "posting" as const, num: "01", short: "Job post", name: "Job post template", desc: "Fills in your firm, pay and work model" },
  { key: "questions" as const, num: "02", short: "Interview", name: "Interview questions", desc: "What to ask, and what a weak answer sounds like" },
  { key: "scorecard" as const, num: "03", short: "Scorecard", name: "Candidate scorecard", desc: "Weighted scores, totalled for you" },
  { key: "offer" as const, num: "04", short: "Offer letter", name: "Offer-letter outline", desc: "The clauses to include" },
  { key: "pay" as const, num: "05", short: "Pay models", name: "Pay models", desc: "Base, bonus and origination options" },
];

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
  const kitCands = matchEnrichedCandidates({ role: role.slug, city: citySlug, years: "any", mode: workMode, pay: Math.round(hiPay / 1000) });
  const matched = matchCandidates({
    role: role.slug,
    city: citySlug,
    years: yearsKey,
    mode: workMode,
    pay: Math.max(loPay, hiPay) / 1000
  });

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

  const handleJumpToModule = (tabKey: "posting" | "questions" | "scorecard" | "offer" | "pay") => {
    setActiveTab(tabKey);
    const el = document.getElementById("kit-modules");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
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
    <div style={{ background: "#FFFFFF", minHeight: "100vh", color: "#08142A", overflowX: "hidden" }}>
      <style>{`
        /* Hero Section Responsive */
        .kit-hero-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 48px;
          align-items: center;
        }
        @media (max-width: 960px) {
          .kit-hero-sec {
            padding: 92px 0 36px !important;
          }
          .kit-hero-grid {
            grid-template-columns: 1fr !important;
            gap: 0 !important;
          }
          .kit-hero-card-col {
            display: none !important;
          }
          .kit-hero-content {
            text-align: center !important;
            max-width: 760px !important;
            margin: 0 auto !important;
          }
          .kit-hero-eyebrow {
            margin: 0 auto 18px !important;
            display: inline-flex !important;
          }
          .kit-hero-h1 {
            font-size: clamp(28px, 6vw, 42px) !important;
            line-height: 1.18 !important;
            margin: 0 auto 18px !important;
            text-align: center !important;
          }
          .kit-hero-lead {
            font-size: 15px !important;
            line-height: 1.6 !important;
            margin: 0 auto 28px !important;
            text-align: center !important;
            max-width: 620px !important;
          }
          .kit-hero-actions {
            flex-direction: column !important;
            align-items: stretch !important;
            max-width: 330px !important;
            margin: 0 auto 28px !important;
            gap: 10px !important;
          }
          .kit-hero-actions button,
          .kit-hero-actions a {
            width: 100% !important;
            justify-content: center !important;
            box-sizing: border-box !important;
          }
          .kit-hero-trust {
            display: flex !important;
            justify-content: center !important;
          }
        }

        /* 5-Part Interactive Playbook Navigation Tabs */
        @media (max-width: 768px) {
          .kit-modules-sec {
            padding: 48px 0 56px !important;
          }
          .kit-tab-bar {
            overflow-x: auto !important;
            -webkit-overflow-scrolling: touch !important;
            flex-wrap: nowrap !important;
            gap: 8px !important;
            padding: 6px !important;
            scrollbar-width: none !important;
          }
          .kit-tab-bar::-webkit-scrollbar {
            display: none !important;
          }
          .kit-tab-btn {
            flex: 0 0 auto !important;
            white-space: nowrap !important;
            font-size: 13px !important;
            padding: 10px 16px !important;
          }
        }

        /* Module Split Grids (Section 1) */
        .kit-split-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 32px;
          align-items: start;
        }
        @media (max-width: 960px) {
          .kit-split-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .kit-preview-card,
          .kit-sidebar-card {
            padding: 20px 16px !important;
          }
          .kit-card-head {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 12px !important;
          }
          .kit-card-head button {
            width: 100% !important;
            justify-content: center !important;
          }
          .kit-scorecard-item {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 10px !important;
          }
          .kit-scorecard-item select {
            width: 100% !important;
          }
        }

        /* Pre-Screened Candidates Grid (Section 2) */
        .kit-cand-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 32px;
          align-items: start;
        }
        @media (max-width: 960px) {
          .kit-matches-sec {
            padding: 48px 0 56px !important;
          }
          .kit-cand-grid {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }
          .kit-gate-col {
            position: static !important;
            top: auto !important;
          }
          .kit-gate-col-card {
            padding: 20px 16px !important;
          }
        }
        @media (max-width: 640px) {
          .kit-cand-head {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 12px !important;
          }
        }

        /* Reviews Section (Section 3) */
        @media (max-width: 768px) {
          .kit-reviews-sec {
            padding: 48px 0 56px !important;
          }
        }

        /* Full Package Email Download Grid (Section 4) */
        .kit-dl-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 52px;
          align-items: center;
        }
        @media (max-width: 960px) {
          .kit-dl-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
        @media (max-width: 640px) {
          .kit-dl-sec {
            padding: 56px 0 64px !important;
          }
          .kit-dl-form-card {
            padding: 22px 16px !important;
          }
          .kit-dl-cta-btns {
            flex-direction: column !important;
            align-items: stretch !important;
            max-width: 330px !important;
          }
          .kit-dl-cta-btns a {
            width: 100% !important;
            justify-content: center !important;
            box-sizing: border-box !important;
          }
        }
      `}</style>

      <PkHero
        eyebrow={`Hiring kit · ${role.name}`}
        title={`${role.name}`}
        accent="hiring kit."
        lead="An editable job post, interview questions, a scorecard, an offer-letter outline and pay models. Free, no sign-up."
        side={
          <div className="hk-index">
            <span className="hk-index-k">Five parts</span>
            {MODULES.map((m) => (
              <button key={m.key} type="button" className={activeTab === m.key ? "is-on" : ""} onClick={() => handleJumpToModule(m.key)}>
                <span className="hk-index-n">{m.num}</span>
                <span>
                  <b>{m.name}</b>
                  <small>{m.desc}</small>
                </span>
                <span aria-hidden="true">→</span>
              </button>
            ))}
          </div>
        }
      >
        <div className="pk-actions">
          <button type="button" className="pk-btn is-primary" onClick={handleCopyPosting}>
            {copied ? "Copied" : "Copy the job post"}
          </button>
          <a href="#kit-modules" className="pk-btn is-ghost">
            Open the kit
          </a>
        </div>
      </PkHero>

      <section id="kit-modules" className="pk-sec is-light hk-tool">
        <div className="pk-wrap">
          <div className="pk-head">
            <span className="pk-kicker">
              <span aria-hidden="true" />
              The kit
            </span>
            <h2 className="pk-h2">
              Edit it for your firm, <em>then copy.</em>
            </h2>
            <p className="pk-sec-lead">Fill in your firm’s details and every part of the kit updates.</p>
          </div>

          <div className="hk-tabs" role="tablist" aria-label="Hiring kit parts">
            {MODULES.map((m) => (
              <button key={m.key} type="button" role="tab" aria-selected={activeTab === m.key} className={activeTab === m.key ? "is-on" : ""} onClick={() => setActiveTab(m.key)}>
                <span>{m.num}</span> {m.short}
              </button>
            ))}
          </div>

          {/* TAB 1: POSTING TEMPLATE WITH LIVE FACTS FORM */}
          {activeTab === "posting" && (
            <div className="kit-split-grid">
              {/* Live Rendered Template */}
              <div
                className="kit-preview-card"
                style={{
                  background: "#FFFFFF",
                  border: "1.5px solid #E2E8F0",
                  borderRadius: "14px",
                  padding: "36px",
                  boxShadow: "0 6px 24px rgba(8, 20, 42, 0.04)"
                }}
              >
                <div className="kit-card-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", borderBottom: "1px solid #F1F5F9", paddingBottom: "16px" }}>
                  <div>
                    <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#1D4ED8", textTransform: "uppercase", letterSpacing: "0.06em" }}>Live Preview</span>
                    <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#08142A", margin: "4px 0 0" }}>Customized <span className="serif-accent" style={{ color: "#1D4ED8", fontStyle: "italic" }}>Job Description</span></h3>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyPosting}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
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
                    <Icon name="copy" />
                    <span>{copied ? "✓ Copied" : "Copy Live Text"}</span>
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
                            fontSize: "1.12rem",
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
                  <div style={{ marginTop: "24px", padding: "12px 16px", background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: "8px", color: "#1E40AF", fontSize: "0.9rem" }}>
                    {copyNote}
                  </div>
                )}
              </div>

              {/* Firm Facts Form Sidebar */}
              <div
                className="kit-sidebar-card"
                style={{
                  background: "#FAF9F5",
                  border: "1.5px solid #EAE7DC",
                  borderRadius: "14px",
                  padding: "30px",
                  boxShadow: "0 4px 20px rgba(8, 20, 42, 0.04)"
                }}
              >
                <div style={{ marginBottom: "22px" }}>
                  <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#1D4ED8", textTransform: "uppercase", letterSpacing: "0.06em" }}>Customization Console</span>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#08142A", margin: "4px 0 0" }}>Your Firm&apos;s <span className="serif-accent" style={{ color: "#1D4ED8", fontStyle: "italic" }}>Specifics</span></h3>
                  <p style={{ fontSize: "0.85rem", color: "#64748B", margin: "4px 0 0" }}>Adjust parameters to regenerate the template dynamically.</p>
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
                      style={{ width: "100%", padding: "11px 14px", border: "1px solid #CBD5E1", borderRadius: "7px", fontSize: "0.9rem", color: "#08142A", background: "#FFFFFF" }}
                    />
                  </div>

                  <div>
                    <label htmlFor="k-city" style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#475569", marginBottom: "6px" }}>Target City &amp; Market</label>
                    <select
                      id="k-city"
                      value={citySlug}
                      onChange={(e) => setCitySlug(e.target.value)}
                      style={{ width: "100%", padding: "11px 14px", border: "1px solid #CBD5E1", borderRadius: "7px", fontSize: "0.9rem", color: "#08142A", background: "#FFFFFF" }}
                    >
                      {DATA.cities.filter(c => DATA.bands[c.slug]?.[role.slug]).map(c => (
                        <option key={c.slug} value={c.slug}>{c.name}, {c.state}</option>
                      ))}
                    </select>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <div>
                      <label htmlFor="k-size" style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#475569", marginBottom: "6px" }}>Attorney Count</label>
                      <input
                        id="k-size"
                        type="number"
                        min={1}
                        max={500}
                        value={firmSize}
                        onChange={(e) => setFirmSize(Number(e.target.value))}
                        style={{ width: "100%", padding: "11px 14px", border: "1px solid #CBD5E1", borderRadius: "7px", fontSize: "0.9rem", color: "#08142A", background: "#FFFFFF" }}
                      />
                    </div>
                    <div>
                      <label htmlFor="k-years" style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#475569", marginBottom: "6px" }}>Seniority Level</label>
                      <select
                        id="k-years"
                        value={yearsKey}
                        onChange={(e) => setYearsKey(e.target.value)}
                        style={{ width: "100%", padding: "11px 14px", border: "1px solid #CBD5E1", borderRadius: "7px", fontSize: "0.9rem", color: "#08142A", background: "#FFFFFF" }}
                      >
                        {DATA.expBands.map(e => (
                          <option key={e.key} value={e.key}>{e.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#475569", marginBottom: "6px" }}>
                      Target Base Salary Band ($)
                    </label>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                      <input
                        id="k-lo"
                        type="number"
                        value={loPay}
                        onChange={(e) => setLoPay(Number(e.target.value))}
                        style={{ width: "100%", padding: "11px 14px", border: "1px solid #CBD5E1", borderRadius: "7px", fontSize: "0.9rem", color: "#08142A", background: "#FFFFFF" }}
                        placeholder="Min"
                      />
                      <input
                        id="k-hi"
                        type="number"
                        value={hiPay}
                        onChange={(e) => setHiPay(Number(e.target.value))}
                        style={{ width: "100%", padding: "11px 14px", border: "1px solid #CBD5E1", borderRadius: "7px", fontSize: "0.9rem", color: "#08142A", background: "#FFFFFF" }}
                        placeholder="Max"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="k-mode" style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#475569", marginBottom: "6px" }}>Work Mode</label>
                    <select
                      id="k-mode"
                      value={workMode}
                      onChange={(e) => setWorkMode(e.target.value as "on-site" | "hybrid")}
                      style={{ width: "100%", padding: "11px 14px", border: "1px solid #CBD5E1", borderRadius: "7px", fontSize: "0.9rem", color: "#08142A", background: "#FFFFFF" }}
                    >
                      <option value="on-site">On-site (Mon–Fri)</option>
                      <option value="hybrid">Hybrid (Designated in-office days)</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="k-email" style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#475569", marginBottom: "6px" }}>Hiring Inquiries Email</label>
                    <input
                      id="k-email"
                      type="email"
                      placeholder="hiring@yourfirm.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{ width: "100%", padding: "11px 14px", border: "1px solid #CBD5E1", borderRadius: "7px", fontSize: "0.9rem", color: "#08142A", background: "#FFFFFF" }}
                    />
                  </div>
                </form>

                <div style={{ marginTop: "20px", paddingTop: "16px", borderTop: "1px solid #E2E8F0" }}>
                  <a
                    href="#matches"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      color: "#1D4ED8",
                      textDecoration: "none"
                    }}
                  >
                    <span>{matched.length} candidates already match these filters</span>
                    <span>View Matches ↓</span>
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: INTERVIEW QUESTIONS */}
          {activeTab === "questions" && (
            <div className="kit-split-grid">
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {kit?.questions.map((q: { q: string; good: string; flag: string }, idx: number) => (
                  <div
                    key={idx}
                    className="kit-preview-card"
                    style={{
                      background: "#FFFFFF",
                      border: "1.5px solid #E2E8F0",
                      borderRadius: "14px",
                      padding: "28px",
                      boxShadow: "0 4px 20px rgba(8, 20, 42, 0.04)"
                    }}
                  >
                    <div style={{ display: "flex", gap: "12px", alignItems: "baseline", marginBottom: "16px" }}>
                      <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.88rem", fontWeight: 700, color: "#1D4ED8", background: "#EFF6FF", padding: "4px 8px", borderRadius: "4px" }}>
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
                className="kit-sidebar-card"
                style={{
                  background: "#FAF9F5",
                  border: "1.5px solid #EAE7DC",
                  borderRadius: "14px",
                  padding: "30px",
                  boxShadow: "0 4px 20px rgba(8, 20, 42, 0.04)"
                }}
              >
                <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#1D4ED8", textTransform: "uppercase", letterSpacing: "0.06em" }}>Hiring Best Practice</span>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#08142A", margin: "6px 0 12px" }}>Structured <span className="serif-accent" style={{ color: "#1D4ED8", fontStyle: "italic" }}>Interviewing</span></h3>
                <p style={{ fontSize: "0.92rem", lineHeight: 1.6, color: "#475569", margin: "0 0 20px" }}>
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
            <div className="kit-split-grid">
              <div
                className="kit-preview-card"
                style={{
                  background: "#FFFFFF",
                  border: "1.5px solid #E2E8F0",
                  borderRadius: "14px",
                  padding: "32px",
                  boxShadow: "0 4px 20px rgba(8, 20, 42, 0.04)"
                }}
              >
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#08142A", margin: "0 0 8px" }}>Weighted <span className="serif-accent" style={{ color: "#1D4ED8", fontStyle: "italic" }}>Evaluation Rubric</span></h3>
                <p style={{ fontSize: "0.9rem", color: "#64748B", margin: "0 0 24px" }}>Assign ratings from 1 (unsatisfactory) to 5 (exceptional) per competency criteria.</p>

                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {kit?.scorecard.map((s: { k: string; hint: string; w: number }, i: number) => (
                    <div
                      key={i}
                      className="kit-scorecard-item"
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
                className="kit-sidebar-card"
                style={{
                  background: "#FAF9F5",
                  border: "1.5px solid #EAE7DC",
                  borderRadius: "14px",
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

                <div style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "8px", padding: "16px", textAlign: "left", fontSize: "0.88rem", color: "#334155", lineHeight: 1.5 }}>
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
            <div className="kit-split-grid">
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {kit?.offer.map(([heading, detail]: [string, string], i: number) => (
                  <div
                    key={i}
                    className="kit-preview-card"
                    style={{
                      background: "#FFFFFF",
                      border: "1.5px solid #E2E8F0",
                      borderRadius: "10px",
                      padding: "24px",
                      boxShadow: "0 2px 10px rgba(8, 20, 42, 0.03)"
                    }}
                  >
                    <div style={{ display: "flex", gap: "12px", alignItems: "baseline", marginBottom: "8px" }}>
                      <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.85rem", fontWeight: 700, color: "#1D4ED8", background: "#EFF6FF", padding: "2px 8px", borderRadius: "4px" }}>
                        Clause {i + 1}
                      </span>
                      <h4 style={{ fontSize: "1.08rem", fontWeight: 700, color: "#08142A", margin: 0 }}>{heading}</h4>
                    </div>
                    <p style={{ margin: 0, fontSize: "0.92rem", color: "#475569", lineHeight: 1.6 }}>{detail}</p>
                  </div>
                ))}
              </div>

              <div
                className="kit-sidebar-card"
                style={{
                  background: "#FAF9F5",
                  border: "1.5px solid #EAE7DC",
                  borderRadius: "14px",
                  padding: "30px",
                  boxShadow: "0 4px 20px rgba(8, 20, 42, 0.04)"
                }}
              >
                <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#1D4ED8", textTransform: "uppercase", letterSpacing: "0.06em" }}>Offer Checklist</span>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#08142A", margin: "6px 0 12px" }}>Mandatory <span className="serif-accent" style={{ color: "#1D4ED8", fontStyle: "italic" }}>Offer Safeguards</span></h3>
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
              className="kit-preview-card"
              style={{
                background: "#FFFFFF",
                border: "1.5px solid #E2E8F0",
                borderRadius: "14px",
                padding: "36px",
                boxShadow: "0 4px 20px rgba(8, 20, 42, 0.04)"
              }}
            >
              <h3 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#08142A", margin: "0 0 8px" }}>Boutique &amp; Mid-Size Law Firm <span className="serif-accent" style={{ color: "#1D4ED8", fontStyle: "italic" }}>Pay Architectures</span></h3>
              <p style={{ fontSize: "0.92rem", color: "#64748B", margin: "0 0 24px" }}>Common compensation structures utilized by lateral hiring committees for {role.name}s.</p>

              <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
                <table style={{ width: "100%", minWidth: 620, borderCollapse: "collapse", textAlign: "left" }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid #E2E8F0", background: "#F8FAFC" }}>
                      <th style={{ padding: "14px 18px", fontSize: "0.85rem", fontWeight: 700, color: "#08142A" }}>Structure Model</th>
                      <th style={{ padding: "14px 18px", fontSize: "0.85rem", fontWeight: 700, color: "#08142A" }}>Mechanics &amp; Flow</th>
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
        </div>
      </section>

      {/* Candidates for this seat + call card (replaces old candidates, reviews and email sections) */}
      <PkSection
        tone="light"
        id="matches"
        kicker="Or skip the posting"
        title={`${matched.length} screened candidates`}
        accent={`match this seat in ${currentCity.name}.`}
        lead="Anonymous profiles open to a move. Names unlock when you request the profile."
      >
        <div className="hk-cands">
          {kitCands.slice(0, 3).map(({ candidate, notes, warn }) => (
            <CandidateDossierCard
              key={candidate.id}
              c={candidate}
              notes={notes}
              warn={warn}
              actionLabel="See profile"
              action={{ href: `/find-candidates?q=${encodeURIComponent(`${role.name} in ${currentCity.name}`)}&c=${candidate.id}` }}
            />
          ))}
        </div>
        <Link href={`/find-candidates?q=${encodeURIComponent(`${role.name} in ${currentCity.name}`)}`} className="hk-all">
          See all {role.name.toLowerCase()} candidates →
        </Link>
        <div className="hk-call">
          <PkCallCard
            title="Want Orion to fill"
            accentWords="this seat instead?"
            text="Send the seat to Justin. No retainer, non-exclusive, and one fee only if you hire."
            secondary={{ label: "Submit a job", href: "/submit-job" }}
          />
        </div>
      </PkSection>
    </div>
  );
}
