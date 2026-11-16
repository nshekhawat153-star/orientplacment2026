"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { GateForm } from "@/components/GateForm";
import { terms, recruiterQuestions, fmt } from "@/data";

export default function FeesPage() {
  const [baseSalary, setBaseSalary] = useState<number>(130000);
  const [startDate, setStartDate] = useState<string>("");
  const [otherRate, setOtherRate] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    const today = new Date();
    today.setDate(today.getDate() + 30);
    setStartDate(today.toISOString().slice(0, 10));
  }, []);

  const addDays = (dateStr: string, days: number): string => {
    const d = new Date(dateStr + "T12:00:00");
    if (isNaN(d.getTime())) return "";
    d.setDate(d.getDate() + days);
    return d.toISOString().slice(0, 10);
  };

  const okDate =
    /^\d{4}-\d{2}-\d{2}$/.test(startDate) &&
    !isNaN(new Date(startDate + "T12:00:00").getTime());

  const fee = baseSalary * terms.feeRate;
  const dueDate = okDate ? addDays(startDate, 15) : "";
  const guaranteeDate = okDate ? addDays(startDate, terms.guaranteeDays) : "";

  const otherNum = parseFloat(otherRate);
  const otherFee = !isNaN(otherNum) && otherNum > 0 ? (baseSalary * otherNum) / 100 : 0;
  const diff = otherFee - fee;

  const handleCopyQuestions = () => {
    const qs = recruiterQuestions.filter((q) => q.term).slice(0, 5);
    const text =
      "Questions to ask a legal recruiter\n" +
      qs.map((q, i) => `${i + 1}. ${q.q}`).join("\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const qs = recruiterQuestions.filter((q) => q.term).slice(0, 5);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.orionplacement.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Employers",
        item: "https://www.orionplacement.com/employers/",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Fees",
        item: "https://www.orionplacement.com/fees/",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. LUXURY 2-COLUMN HERO SECTION WITH SPLASH VIDEO */}
      <section
        className="emp-luxury-hero-sec fee-luxury-hero-sec"
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
                { label: "Fees & Terms", current: true },
              ]}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 40, alignItems: "center" }}>
            {/* Left Column: Heading & Value Proposition */}
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
                  <span>TRANSPARENT PRICING · 100% CONTINGENCY</span>
                </div>
              </div>

              <h1
                style={{
                  fontFamily: "var(--display)",
                  fontSize: "clamp(36px, 4.5vw, 56px)",
                  lineHeight: 1.12,
                  fontWeight: 500,
                  color: "#FFFFFF",
                  margin: "0 0 20px",
                }}
              >
                One fee, only if you <span className="serif-accent" style={{ color: "#60A5FA", fontStyle: "italic" }}>hire</span>
              </h1>

              <p
                style={{
                  fontSize: "clamp(16px, 1.8vw, 18px)",
                  lineHeight: 1.6,
                  color: "#CBD5E1",
                  margin: "0 0 32px",
                  maxWidth: 580,
                }}
              >
                Zero upfront retainer, zero exclusivity, and zero hidden costs. You pay one invoice (23%)
                only when the introduced attorney starts, protected by a 90-day replacement warranty.
              </p>

              <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 36 }}>
                <a
                  href="#calc"
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
                  <span>Calculate your fee</span>
                  <svg aria-hidden="true" viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
                    <path d="M10.3 3.3a1 1 0 0 1 1.4 0l6 6a1 1 0 0 1 0 1.4l-6 6a1 1 0 1 1-1.4-1.4l4.3-4.3H3a1 1 0 1 1 0-2h11.6l-4.3-4.3a1 1 0 0 1 0-1.4Z" />
                  </svg>
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
                    fontSize: 15,
                    padding: "13px 26px",
                    borderRadius: 7,
                    textDecoration: "none",
                  }}
                >
                  <span>Find candidates</span>
                  <svg aria-hidden="true" viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
                    <path d="M10.3 3.3a1 1 0 0 1 1.4 0l6 6a1 1 0 0 1 0 1.4l-6 6a1 1 0 1 1-1.4-1.4l4.3-4.3H3a1 1 0 1 1 0-2h11.6l-4.3-4.3a1 1 0 0 1 0-1.4Z" />
                  </svg>
                </Link>
              </div>

              {/* Micro Reassurances */}
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 14, fontSize: 13, color: "#94A3B8" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                  <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="3.5 8.5 6.5 11.5 12.5 4.5" />
                  </svg>
                  <span>23% flat contingency</span>
                </div>
                <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                  <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="3.5 8.5 6.5 11.5 12.5 4.5" />
                  </svg>
                  <span>Net 15 on start date</span>
                </div>
                <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                  <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="3.5 8.5 6.5 11.5 12.5 4.5" />
                  </svg>
                  <span>90-day replacement warranty</span>
                </div>
              </div>
            </div>

            {/* Right Column: Luxury Terms Summary Terminal */}
            <div
              style={{
                background: "rgba(15, 23, 42, 0.75)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                borderRadius: 14,
                padding: "28px 24px",
                boxShadow: "0 20px 50px rgba(0, 0, 0, 0.35)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, paddingBottom: 16, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "#93C5FD" }}>
                  STANDARD ENGAGEMENT SCHEDULE
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(34, 197, 94, 0.15)", border: "1px solid rgba(34, 197, 94, 0.3)", borderRadius: 999, padding: "3px 10px", fontSize: 11, color: "#4ADE80", fontWeight: 600 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ADE80" }} />
                  ACTIVE POLICY
                </span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 20 }}>
                <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "14px 16px" }}>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.06em", color: "#94A3B8", textTransform: "uppercase", marginBottom: 4 }}>
                    Contingency Fee
                  </div>
                  <div style={{ fontSize: 24, fontWeight: 700, color: "#60A5FA" }}>23%</div>
                  <div style={{ fontSize: 11.5, color: "#CBD5E1", marginTop: 2 }}>Of 1st-year base salary</div>
                </div>

                <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "14px 16px" }}>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.06em", color: "#94A3B8", textTransform: "uppercase", marginBottom: 4 }}>
                    Upfront Retainer
                  </div>
                  <div style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF" }}>$0</div>
                  <div style={{ fontSize: 11.5, color: "#CBD5E1", marginTop: 2 }}>Zero upfront commitment</div>
                </div>

                <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "14px 16px" }}>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.06em", color: "#94A3B8", textTransform: "uppercase", marginBottom: 4 }}>
                    Replacement Guarantee
                  </div>
                  <div style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF" }}>90 Days</div>
                  <div style={{ fontSize: 11.5, color: "#CBD5E1", marginTop: 2 }}>Calendar-day coverage</div>
                </div>

                <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "14px 16px" }}>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.06em", color: "#94A3B8", textTransform: "uppercase", marginBottom: 4 }}>
                    Payment Schedule
                  </div>
                  <div style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF" }}>Net 15</div>
                  <div style={{ fontSize: 11.5, color: "#CBD5E1", marginTop: 2 }}>Invoiced on physical start</div>
                </div>
              </div>

              <div style={{ background: "rgba(29, 78, 216, 0.15)", border: "1px solid rgba(96, 165, 250, 0.3)", borderRadius: 8, padding: "12px 14px", fontSize: 12.5, color: "#BFDBFE", lineHeight: 1.5 }}>
                <span style={{ fontWeight: 600, color: "#FFFFFF" }}>Zero Risk Guarantee:</span> If you interview candidates we present and decide not to hire, you owe nothing. No cancellation fees, no hourly bills.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE 4 PILLARS OF OUR TERMS */}
      <section className="block" style={{ padding: "80px 0 56px", background: "#FAF9F5" }}>
        <div className="wrap" style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
          <div className="terms-pillars-grid">
            <div className="terms-pillar">
              <div className="pillar-kicker">01 · CONTINGENCY FEE</div>
              <div className="pillar-val">23%</div>
              <div className="pillar-label">Of first-year base</div>
              <p className="pillar-desc">
                Calculated strictly on base salary. Discretionary bonuses and benefits are never included.
              </p>
              <div className="pillar-badge">
                <span>Contingency Only</span>
              </div>
            </div>

            <div className="terms-pillar">
              <div className="pillar-kicker">02 · REPLACEMENT WARRANTY</div>
              <div className="pillar-val">90 Days</div>
              <div className="pillar-label">Calendar day guarantee</div>
              <p className="pillar-desc">
                If the hire leaves or is let go within 90 days, we conduct a replacement search at zero extra fee.
              </p>
              <div className="pillar-badge">
                <span>Free Replacement</span>
              </div>
            </div>

            <div className="terms-pillar">
              <div className="pillar-kicker">03 · CLIENT FREEDOM</div>
              <div className="pillar-val">Zero</div>
              <div className="pillar-label">Upfront retainer or lock-in</div>
              <p className="pillar-desc">
                No retainer and no exclusivity. Keep your internal pipeline and other recruiters active.
              </p>
              <div className="pillar-badge">
                <span>Non-Exclusive</span>
              </div>
            </div>

            <div className="terms-pillar">
              <div className="pillar-kicker">04 · PAYMENT SCHEDULE</div>
              <div className="pillar-val">Net 15</div>
              <div className="pillar-label">Invoice on start date</div>
              <p className="pillar-desc">
                We issue the invoice only when the candidate physically begins work, payable within 15 calendar days.
              </p>
              <div className="pillar-badge">
                <span>Start Date Invoice</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE FEE CALCULATOR */}
      <section className="block alt" id="calc" style={{ padding: "88px 0", background: "#FFFFFF", borderTop: "1px solid #E2E8F0", borderBottom: "1px solid #E2E8F0" }}>
        <div className="wrap" style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
          <div className="sec-head-premium" style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="badge-capsule" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 999, padding: "5px 14px", fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "#1D4ED8", marginBottom: 12 }}>
              <span className="badge-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#1D4ED8" }} />
              <span>INSTANT FEE ESTIMATE · ZERO COMMITMENT</span>
            </div>
            <h2 className="sec-title-lg" style={{ fontFamily: "var(--display)", fontSize: "clamp(30px, 3.8vw, 44px)", color: "#08142A", margin: "0 0 14px", fontWeight: 500 }}>
              Your fee in ten <span className="serif-accent" style={{ color: "#1D4ED8", fontStyle: "italic" }}>seconds</span>
            </h2>
            <p className="who-lede" style={{ fontSize: 16, color: "#64748B", maxWidth: 640, margin: "0 auto", lineHeight: 1.6 }}>
              Enter the first-year base salary and start date. See your exact fee, invoice due date, and replacement guarantee window.
            </p>
          </div>

          <div className="fee-calc-grid">
            {/* Input Form Card */}
            <form
              className="fee-calc-form-card"
              id="calc-form"
              noValidate
              aria-label="Fee calculator"
              onSubmit={(e) => e.preventDefault()}
              style={{
                background: "#FAF9F5",
                borderRadius: 14,
                border: "1.5px solid #E2E8F0",
                padding: "32px 28px",
                display: "flex",
                flexDirection: "column",
                gap: 22,
                boxShadow: "0 4px 16px rgba(15,23,42,0.03)",
              }}
            >
              <div>
                <label htmlFor="f-base" style={{ display: "block", fontFamily: "var(--mono)", fontSize: 11.5, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#08142A", marginBottom: 8 }}>
                  First-year base salary ($/yr)
                </label>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "#64748B", fontWeight: 600 }}>$</span>
                  <input
                    id="f-base"
                    type="number"
                    inputMode="numeric"
                    min="20000"
                    step="1000"
                    value={baseSalary || ""}
                    onChange={(e) => setBaseSalary(Number(e.target.value))}
                    style={{ width: "100%", padding: "13px 16px 13px 32px", borderRadius: 7, border: "1.5px solid #CBD5E1", fontSize: 16, fontWeight: 600, color: "#08142A", outline: "none", background: "#FFFFFF" }}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="f-start" style={{ display: "block", fontFamily: "var(--mono)", fontSize: 11.5, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#08142A", marginBottom: 8 }}>
                  Candidate start date
                </label>
                <input
                  id="f-start"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  style={{ width: "100%", padding: "12px 16px", borderRadius: 7, border: "1.5px solid #CBD5E1", fontSize: 15, color: "#08142A", outline: "none", background: "#FFFFFF" }}
                />
              </div>

              <div>
                <label htmlFor="f-other" style={{ display: "block", fontFamily: "var(--mono)", fontSize: 11.5, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#08142A", marginBottom: 8 }}>
                  Compare with another quote (% of salary)
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    id="f-other"
                    type="number"
                    inputMode="decimal"
                    min="0"
                    max="50"
                    placeholder="e.g. 25 or 30"
                    value={otherRate}
                    onChange={(e) => setOtherRate(e.target.value)}
                    style={{ width: "100%", padding: "12px 36px 12px 16px", borderRadius: 7, border: "1.5px solid #CBD5E1", fontSize: 15, color: "#08142A", outline: "none", background: "#FFFFFF" }}
                  />
                  <span style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", color: "#64748B", fontWeight: 600 }}>%</span>
                </div>
                <span style={{ display: "block", fontSize: 12, color: "#64748B", marginTop: 6 }}>
                  Most traditional recruiters charge 25%–30% with upfront retainers.
                </span>
              </div>
            </form>

            {/* Output Dashboard Card */}
            <div
              className="fee-calc-dash-card"
              id="calc-out"
              style={{
                background: "#FAF9F5",
                borderRadius: 14,
                border: "1.5px solid #E2E8F0",
                padding: "32px 28px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 4px 16px rgba(15,23,42,0.03)",
              }}
            >
              <div>
                <div className="fee-calc-dash-top" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                  <span className="fee-calc-meta-pill" style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#1D4ED8", background: "rgba(29,78,216,0.08)", padding: "4px 10px", borderRadius: 6, border: "1px solid rgba(29,78,216,0.18)" }}>
                    CONFIRMED 23% CONTINGENCY
                  </span>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 11.5, color: "#64748B", fontWeight: 600 }}>Zero Upfront</span>
                </div>

                <div className="fee-primary-stat" style={{ marginBottom: 24 }}>
                  <div className="fee-stat-number" style={{ fontFamily: "var(--display)", fontSize: "clamp(36px, 4vw, 48px)", fontWeight: 700, color: "#08142A", lineHeight: 1.1 }}>
                    {fmt.money(fee)}
                  </div>
                  <div className="fee-stat-sub" style={{ fontSize: 13.5, color: "#64748B", marginTop: 4 }}>
                    One-time contingency fee on {fmt.money(baseSalary)} base
                  </div>
                </div>

                <div className="fee-milestones-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 24 }}>
                  <div className="fee-milestone-box" style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 8, padding: "12px 14px" }}>
                    <span className="fee-milestone-label" style={{ display: "block", fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase", color: "#64748B", marginBottom: 4 }}>Invoice Date</span>
                    <span className="fee-milestone-val" style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#08142A" }}>{okDate ? fmt.date(startDate) : "–"}</span>
                  </div>
                  <div className="fee-milestone-box" style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 8, padding: "12px 14px" }}>
                    <span className="fee-milestone-label" style={{ display: "block", fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase", color: "#64748B", marginBottom: 4 }}>Payment Due (Net 15)</span>
                    <span className="fee-milestone-val" style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#08142A" }}>{okDate ? fmt.date(dueDate) : "–"}</span>
                  </div>
                  <div className="fee-milestone-box" style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 8, padding: "12px 14px" }}>
                    <span className="fee-milestone-label" style={{ display: "block", fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase", color: "#64748B", marginBottom: 4 }}>Guarantee Until</span>
                    <span className="fee-milestone-val" style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#08142A" }}>{okDate ? fmt.date(guaranteeDate) : "–"}</span>
                  </div>
                </div>
              </div>

              <div
                className="fee-verdict-box"
                id="calc-compare"
                style={{
                  background: "#FFFFFF",
                  border: "1.5px solid #E2E8F0",
                  borderRadius: 10,
                  padding: "16px 18px",
                  fontSize: 13.5,
                  color: "#334155",
                  lineHeight: 1.55,
                }}
              >
                {otherFee > 0 ? (
                  <>
                    <b style={{ color: "#08142A" }}>At {otherNum}%, the traditional recruiter fee would be {fmt.money(otherFee)}.</b>
                    <br />
                    {Math.abs(diff) < 1 ? (
                      "The same percentage as ours, but Orion requires zero upfront retainers."
                    ) : diff > 0 ? (
                      <>
                        You save <span style={{ color: "#1D4ED8", fontWeight: 700 }}>{fmt.money(diff)}</span> with Orion&apos;s flat 23% contingency fee.
                      </>
                    ) : (
                      <>
                        <span style={{ color: "#BE123C", fontWeight: 700 }}>{fmt.money(-diff)}</span> less, but ensure that quote includes a 90-day free replacement guarantee and Net 15 terms.
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <b style={{ color: "#08142A" }}>90-Day Free Replacement Guarantee:</b> If the hire leaves or is terminated before{" "}
                    {okDate ? fmt.date(guaranteeDate) : "the 90-day window ends"}, we reopen the search and provide qualified replacements at zero extra cost.
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE 90-DAY REPLACEMENT GUARANTEE */}
      <section className="block" style={{ padding: "88px 0", background: "#FAF9F5" }}>
        <div className="wrap" style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
          <div className="sec-head-premium" style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="badge-capsule" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 999, padding: "5px 14px", fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "#1D4ED8", marginBottom: 12 }}>
              <span className="badge-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#1D4ED8" }} />
              <span>RISK REVERSAL · IN WRITING</span>
            </div>
            <h2 className="sec-title-lg" style={{ fontFamily: "var(--display)", fontSize: "clamp(30px, 3.8vw, 44px)", color: "#08142A", margin: "0 0 14px", fontWeight: 500 }}>
              The 90-day replacement <span className="serif-accent" style={{ color: "#1D4ED8", fontStyle: "italic" }}>guarantee</span>
            </h2>
            <p className="who-lede" style={{ fontSize: 16, color: "#64748B", maxWidth: 640, margin: "0 auto", lineHeight: 1.6 }}>
              What happens if a hire does not work out, in plain English.
            </p>
          </div>

          <div className="fee-guarantee-grid">
            <div className="fee-guarantee-card">
              <div className="fee-guarantee-kicker">01 · DURATION</div>
              <h3 className="fee-guarantee-title">90 Calendar Days</h3>
              <p className="fee-guarantee-desc">
                Full 90 calendar days from their first day in your office. Not business days — complete calendar protection.
              </p>
            </div>

            <div className="fee-guarantee-card">
              <div className="fee-guarantee-kicker">02 · REMEDY</div>
              <h3 className="fee-guarantee-title">Priority Re-Search</h3>
              <p className="fee-guarantee-desc">
                We reopen the search, prioritize it above other mandates, and send screened replacements until the seat is filled. No additional fee.
              </p>
            </div>

            <div className="fee-guarantee-card">
              <div className="fee-guarantee-kicker">03 · BROAD COVERAGE</div>
              <h3 className="fee-guarantee-title">Comprehensive Protection</h3>
              <p className="fee-guarantee-desc">
                Covers the hire resigning or being let go for any operational reason other than firm redundancy or practice group closure.
              </p>
            </div>

            <div className="fee-guarantee-card">
              <div className="fee-guarantee-kicker">04 · PAYMENT REQUIREMENT</div>
              <h3 className="fee-guarantee-title">Prompt Invoice Clause</h3>
              <p className="fee-guarantee-desc">
                The guarantee is fully active whenever the original placement invoice is paid within our standard Net 15 terms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. QUESTIONS TO ASK ANY RECRUITER */}
      <section className="block alt" id="questions" style={{ padding: "88px 0", background: "#FFFFFF", borderTop: "1px solid #E2E8F0", borderBottom: "1px solid #E2E8F0" }}>
        <div className="wrap" style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
          <div className="sec-head-premium" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16 }}>
            <div>
              <div className="badge-capsule" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 999, padding: "5px 14px", fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "#1D4ED8", marginBottom: 12 }}>
                <span className="badge-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#1D4ED8" }} />
                <span>DUE DILIGENCE · MARKET COMPARISON</span>
              </div>
              <h2 className="sec-title-lg" style={{ fontFamily: "var(--display)", fontSize: "clamp(30px, 3.8vw, 44px)", color: "#08142A", margin: "8px 0 0", fontWeight: 500 }}>
                Questions to ask any <span className="serif-accent" style={{ color: "#1D4ED8", fontStyle: "italic" }}>recruiter</span>
              </h2>
              <p className="who-lede" style={{ fontSize: 16, color: "#64748B", maxWidth: 640, margin: "10px 0 0", lineHeight: 1.6 }}>
                The fee is only half the quote. Ask these five questions before signing an agreement.
              </p>
            </div>

            <button
              type="button"
              className="btn btn-outline btn-sm"
              style={{
                borderRadius: 7,
                fontWeight: 600,
                padding: "11px 22px",
                border: "1.5px solid #1D4ED8",
                background: copied ? "#1D4ED8" : "transparent",
                color: copied ? "#FFFFFF" : "#1D4ED8",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              id="copy-q"
              onClick={handleCopyQuestions}
            >
              {copied ? "✓ Copied to clipboard" : "Copy the 5 questions"}
            </button>
          </div>

          <div className="table-wrap" style={{ marginTop: 32, background: "#FFFFFF", borderRadius: 14, border: "1.5px solid #E2E8F0", overflow: "hidden", boxShadow: "0 4px 16px rgba(15,23,42,0.04)" }}>
            <table className="data" style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#F8FAFC", borderBottom: "1.5px solid #E2E8F0" }}>
                  <th style={{ padding: "16px 20px", textAlign: "left", fontFamily: "var(--mono)", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#64748B" }}>Ask</th>
                  <th style={{ padding: "16px 20px", textAlign: "left", fontFamily: "var(--mono)", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#64748B" }}>Why it matters</th>
                  <th style={{ padding: "16px 20px", textAlign: "left", fontFamily: "var(--mono)", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#1D4ED8" }}>Orion&apos;s answer</th>
                </tr>
              </thead>
              <tbody id="q-rows">
                {qs.map((q, idx) => (
                  <tr key={idx} style={{ borderBottom: idx === qs.length - 1 ? "none" : "1px solid #F1F5F9" }}>
                    <td data-label="Ask" style={{ padding: "18px 20px", fontSize: 14.5, fontWeight: 600, color: "#08142A" }}>
                      {q.q}
                    </td>
                    <td data-label="Why it matters" style={{ padding: "18px 20px", fontSize: 14, color: "#475569", lineHeight: 1.55 }}>
                      {q.why}
                    </td>
                    <td className="us" data-label="Orion's answer" style={{ padding: "18px 20px", fontSize: 14, fontWeight: 600, color: "#1D4ED8" }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(29,78,216,0.08)", padding: "4px 10px", borderRadius: 6, border: "1px solid rgba(29,78,216,0.2)" }}>
                        ✓ {(terms as any)[q.term!]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 6. TERMS IN WRITING & GATE FORM */}
      <section className="block" id="terms-writing" style={{ padding: "88px 0", background: "#FAF9F5" }}>
        <div className="wrap split" style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
          <div>
            <div className="sec-head-premium sec-head-left">
              <div className="badge-capsule" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 999, padding: "5px 14px", fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "#1D4ED8", marginBottom: 12 }}>
                <span className="badge-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#1D4ED8" }} />
                <span>IN WRITING · ZERO PRESSURE</span>
              </div>
              <h2 className="sec-title-lg" style={{ fontFamily: "var(--display)", fontSize: "clamp(30px, 3.8vw, 44px)", color: "#08142A", margin: "0 0 14px", fontWeight: 500 }}>
                Our terms on one <span className="serif-accent" style={{ color: "#1D4ED8", fontStyle: "italic" }}>page</span>
              </h2>
              <p className="who-lede" style={{ fontSize: 16, color: "#64748B", lineHeight: 1.6 }}>
                No retainer, one fee, 90-day replacement, and the five recruiter questions answered. Ready to forward to a managing partner.
              </p>
            </div>

            <div className="faq" style={{ marginTop: 28 }}>
              <details style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 10, padding: "16px 20px", marginBottom: 12 }}>
                <summary style={{ fontWeight: 600, color: "#08142A", cursor: "pointer", fontSize: 15 }}>Do we sign an agreement before we see candidates?</summary>
                <p style={{ marginTop: 12, fontSize: 14, color: "#475569", lineHeight: 1.6 }}>
                  No. You sign nothing until you want to interview someone we introduced. Looking at candidate profiles and dossiers commits you to nothing.
                </p>
              </details>
              <details style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 10, padding: "16px 20px" }}>
                <summary style={{ fontWeight: 600, color: "#08142A", cursor: "pointer", fontSize: 15 }}>Do you offer a refund instead of replacement?</summary>
                <p style={{ marginTop: 12, fontSize: 14, color: "#475569", lineHeight: 1.6 }}>
                  Our standard contract term is a priority replacement search. Cash-refund terms can be structured for multi-hire retainers or enterprise mandates; discuss with Justin prior to engagement.
                </p>
              </details>
            </div>
          </div>

          <div className="form-side" id="terms-gate">
            <GateForm
              id="terms-gate-form"
              eyebrow="In writing"
              title="Email me the one-page terms"
              button="Send me the terms"
              bullets={[
                "The fee, guarantee and payment terms on one page",
                "The five questions, with our answers",
                "Ready to forward to a partner",
              ]}
              fine="One email with the terms. We do not add you to a list."
              steps={[
                [
                  "Now",
                  "The one-page terms are on their way. No agreement is attached and nothing to sign.",
                  true,
                ],
                [
                  "Within one business hour",
                  "Justin replies in case you want to talk the seat through.",
                ],
                [
                  "When you are ready",
                  "See candidates for your seat. You sign only when you want to meet someone.",
                ],
              ]}
            />
          </div>
        </div>
      </section>

      {/* 7. BOTTOM DARK SECTION */}
      <section className="emp-terms-dark-sec" style={{ background: "#08142A", padding: "96px 0 108px", textAlign: "center" }}>
        <div className="wrap" style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px" }}>
          <div className="emp-terms-head">
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
              <span>THE TALENT POOL · PRE-SCREENED CANDIDATES</span>
            </div>
            <h2
              className="emp-terms-h2"
              style={{
                fontFamily: "var(--display)",
                fontSize: "clamp(32px, 4.2vw, 48px)",
                color: "#FFFFFF",
                margin: "0 0 16px",
                fontWeight: 500,
                lineHeight: 1.15,
              }}
            >
              Ready to see who you would be <span className="serif-accent" style={{ color: "#60A5FA", fontStyle: "italic" }}>paying for?</span>
            </h2>
            <p className="emp-terms-lead" style={{ color: "#CBD5E1", fontSize: 17, lineHeight: 1.6, marginBottom: 34, maxWidth: 640, margin: "0 auto 34px" }}>
              Screened lateral attorneys and paralegals matched to your firm. No retainer, and zero fee unless you hire.
            </p>

            <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap", marginTop: 32 }}>
              <Link
                href="/find-candidates"
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
                <span>Find candidates</span>
                <svg aria-hidden="true" viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
                  <path d="M10.3 3.3a1 1 0 0 1 1.4 0l6 6a1 1 0 0 1 0 1.4l-6 6a1 1 0 1 1-1.4-1.4l4.3-4.3H3a1 1 0 1 1 0-2h11.6l-4.3-4.3a1 1 0 0 1 0-1.4Z" />
                </svg>
              </Link>
              <Link
                href="/hire-attorneys"
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
                <span>Direct intake form</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
