"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
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

      <style>{`
        /* Hero Section Responsive */
        @media (max-width: 768px) {
          .fee-luxury-hero-sec {
            padding: 88px 0 44px !important;
          }
          .fees-hero-h1 {
            font-size: 32px !important;
            line-height: 1.15 !important;
          }
        }
        @media (max-width: 640px) {
          .fees-hero-actions {
            flex-direction: column !important;
            align-items: stretch !important;
            max-width: 330px !important;
            margin: 0 auto 28px !important;
          }
          .fees-hero-actions a {
            width: 100% !important;
            justify-content: center !important;
            box-sizing: border-box !important;
          }
          .fees-reassurances {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 10px 14px !important;
            max-width: 330px !important;
            margin: 0 auto !important;
            text-align: left !important;
            font-size: 12px !important;
          }
          .fees-reassurance-dot {
            display: none !important;
          }
        }

        /* 4 Pillars Responsive */
        @media (max-width: 1024px) {
          .terms-pillars-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            gap: 16px !important;
          }
        }
        @media (max-width: 640px) {
          .terms-pillars-grid {
            grid-template-columns: 1fr !important;
            gap: 14px !important;
          }
          .terms-pillar {
            padding: 20px 18px !important;
          }
        }

        /* Fee Calculator Responsive */
        @media (max-width: 960px) {
          .fee-calc-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }
        @media (max-width: 640px) {
          .fee-calc-form-card,
          .fee-calc-dash-card {
            padding: 20px 16px !important;
          }
          .fee-calc-dash-top {
            flex-wrap: wrap !important;
            gap: 8px !important;
          }
          .fee-calc-meta-pill {
            font-size: 10.5px !important;
            padding: 4px 8px !important;
            white-space: nowrap !important;
            display: inline-flex !important;
            align-items: center !important;
            width: fit-content !important;
          }
          .fee-milestones-grid {
            grid-template-columns: 1fr !important;
            gap: 8px !important;
            margin-bottom: 18px !important;
          }
        }

        /* 90-Day Guarantee Responsive */
        @media (max-width: 960px) {
          .fee-guarantee-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            gap: 16px !important;
          }
        }
        @media (max-width: 640px) {
          .fee-guarantee-grid {
            grid-template-columns: 1fr !important;
            gap: 14px !important;
          }
          .fee-guarantee-card {
            padding: 20px 18px !important;
          }
        }

        /* Table & Horizontal Touch Scrolling */
        .fee-table-wrap {
          overflow-x: auto !important;
          -webkit-overflow-scrolling: touch !important;
        }
        .fee-table-scroll-hint {
          display: none;
        }
        @media (max-width: 768px) {
          .fee-table-scroll-hint {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            font-size: 12px;
            font-weight: 600;
            color: #1D4ED8;
            background: #EFF6FF;
            padding: 7px 12px;
            border-radius: 6px;
            margin-top: 14px;
            border: 1px solid #DBEAFE;
          }
        }
        @media (max-width: 640px) {
          .sec-head-premium {
            text-align: left !important;
          }
          .sec-head-premium .badge-capsule {
            margin-bottom: 10px !important;
          }
          .sec-head-premium h2 {
            font-size: 26px !important;
            line-height: 1.2 !important;
          }
          .sec-head-premium .who-lede {
            font-size: 14.5px !important;
          }
          #copy-q {
            width: 100% !important;
            justify-content: center !important;
          }
        }

        /* FAQ Clean Accordion Styling */
        .fee-faq-clean details {
          background: #FFFFFF !important;
          border: 1.5px solid #E2E8F0 !important;
          border-radius: 12px !important;
          padding: 0 !important;
          overflow: hidden !important;
          box-shadow: 0 2px 6px rgba(15, 23, 42, 0.03) !important;
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1) !important;
          margin-bottom: 12px !important;
        }
        .fee-faq-clean details:hover {
          border-color: #CBD5E1 !important;
        }
        .fee-faq-clean details[open] {
          border-color: #1D4ED8 !important;
          box-shadow: 0 8px 20px -4px rgba(29, 78, 216, 0.12) !important;
        }
        .fee-faq-clean summary {
          display: flex !important;
          justify-content: space-between !important;
          align-items: center !important;
          gap: 16px !important;
          padding: 18px 20px !important;
          cursor: pointer !important;
          list-style: none !important;
          font-size: 15.5px !important;
          font-weight: 600 !important;
          color: #08142A !important;
        }
        .fee-faq-clean summary::-webkit-details-marker {
          display: none !important;
        }
        .fee-faq-clean summary::marker {
          display: none !important;
        }
        .fee-faq-clean .faq-body {
          padding: 0 20px 20px !important;
        }
        .fee-faq-clean .faq-body p {
          margin: 0 !important;
          font-size: 14.5px !important;
          line-height: 1.6 !important;
          color: #475569 !important;
        }
      `}</style>

      {/* 1. LUXURY CENTERED HERO SECTION (NO BREADCRUMBS, NO CARD CLUTTER) */}
      <section
        className="emp-luxury-hero-sec fee-luxury-hero-sec"
        style={{
          position: "relative",
          background: "#08142A",
          color: "#FFFFFF",
          padding: "128px 0 84px",
          overflow: "hidden",
          textAlign: "center",
          borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
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

        <div className="wrap" style={{ position: "relative", zIndex: 2, maxWidth: 840, margin: "0 auto", padding: "0 24px" }}>
          {/* Eyebrow Capsule */}
          <div style={{ marginBottom: 20 }}>
            <div
              className="hero-eyebrow-capsule badge-capsule"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 999,
                padding: "7px 18px",
                fontFamily: "var(--mono)",
                fontSize: 12,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#93C5FD",
              }}
            >
              <span className="badge-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#60A5FA" }} />
              <span>TRANSPARENT PRICING<span className="eyebrow-sep"> · </span><br className="eyebrow-break" />100% CONTINGENCY</span>
            </div>
          </div>

          {/* Main Title - Prominent Executive Scale */}
          <h1
            className="fees-hero-h1"
            style={{
              fontFamily: "var(--display)",
              fontSize: "clamp(40px, 5.2vw, 64px)",
              lineHeight: 1.10,
              fontWeight: 500,
              color: "#FFFFFF",
              letterSpacing: "-0.025em",
              margin: "0 auto 22px",
              maxWidth: 920,
              textAlign: "center",
              textWrap: "balance",
              textShadow: "0 2px 16px rgba(0, 0, 0, 0.45)",
            }}
          >
            One fee, only if you{" "}
            <span className="serif-accent" style={{ color: "#60A5FA", fontStyle: "italic" }}>
              hire.
            </span>
          </h1>

          {/* Clean Subtext - Readable Executive Scale */}
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
            Zero upfront retainer, zero exclusivity, and zero hidden costs. You pay one invoice (23%)
            only when your introduced attorney starts, protected by our 90-day replacement warranty.
          </p>

          {/* Action CTAs */}
          <div className="fees-hero-actions hero-actions-group" style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap", marginBottom: 36 }}>
            <a
              href="#calc"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#1D4ED8",
                color: "#FFFFFF",
                fontWeight: 600,
                fontSize: 16,
                padding: "15px 32px",
                borderRadius: 7,
                textDecoration: "none",
                boxShadow: "0 8px 20px rgba(29, 78, 216, 0.35)",
              }}
            >
              <span>Calculate your fee</span>
              <span aria-hidden="true">↓</span>
            </a>
            <Link
              href="/find-candidates"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.18)",
                color: "#FFFFFF",
                fontWeight: 600,
                fontSize: 16,
                padding: "15px 28px",
                borderRadius: 7,
                textDecoration: "none",
              }}
            >
              <span>Browse candidate dossiers</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          {/* Micro Reassurances */}
          <div
            className="fees-reassurances"
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              gap: 16,
              fontSize: 13,
              color: "#94A3B8",
            }}
          >
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="3.5 8.5 6.5 11.5 12.5 4.5" />
              </svg>
              <span>Zero upfront retainer</span>
            </div>
            <span className="fees-reassurance-dot" style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="3.5 8.5 6.5 11.5 12.5 4.5" />
              </svg>
              <span>23% flat contingency</span>
            </div>
            <span className="fees-reassurance-dot" style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="3.5 8.5 6.5 11.5 12.5 4.5" />
              </svg>
              <span>Net 15 on start date</span>
            </div>
            <span className="fees-reassurance-dot" style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="3.5 8.5 6.5 11.5 12.5 4.5" />
              </svg>
              <span>90-day replacement warranty</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE 4 PILLARS OF OUR TERMS */}
      <section style={{ padding: "88px 0 96px", background: "#FAF9F5", borderBottom: "1px solid #E2E8F0" }}>
        <div className="wrap" style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
          {/* Header */}
          <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 48px" }}>
            <div
              className="badge-capsule"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#EFF6FF",
                border: "1px solid #DBEAFE",
                borderRadius: 999,
                padding: "6px 14px",
                fontFamily: "var(--mono)",
                fontSize: 11,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#1D4ED8",
                marginBottom: 12,
              }}
            >
              <span className="badge-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#1D4ED8" }} />
              <span>THE PROTOCOL · 4 CORE COMMITMENTS</span>
            </div>
            <h2
              style={{
                fontSize: "clamp(28px, 3.4vw, 40px)",
                fontWeight: 400,
                color: "#08142A",
                margin: "0 0 10px",
                fontFamily: "var(--display)",
              }}
            >
              The pillars of our <span className="serif-accent" style={{ color: "#1D4ED8", fontStyle: "italic" }}>agreement</span>
            </h2>
            <p style={{ margin: 0, color: "#64748B", fontSize: "1.02rem", lineHeight: 1.6 }}>
              Simple, transparent commercial terms designed to protect small and mid-size Texas law firms.
            </p>
          </div>

          <div className="terms-pillars-grid">
            <div className="terms-pillar" style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 14, padding: "30px 24px", boxShadow: "0 4px 16px rgba(15,23,42,0.04)" }}>
              <div className="pillar-kicker" style={{ color: "#1D4ED8", fontFamily: "var(--mono)", fontSize: 10.5, fontWeight: 700, letterSpacing: "0.08em", marginBottom: 12 }}>
                01 · CONTINGENCY FEE
              </div>
              <div className="pillar-val" style={{ fontFamily: "var(--display)", fontSize: 34, fontWeight: 400, color: "#08142A", marginBottom: 4 }}>
                23%
              </div>
              <div className="pillar-label" style={{ fontSize: 14, fontWeight: 600, color: "#08142A", marginBottom: 10 }}>
                Of first-year base salary
              </div>
              <p className="pillar-desc" style={{ fontSize: 13.5, color: "#475569", lineHeight: 1.55, margin: "0 0 16px" }}>
                Calculated strictly on base salary. Discretionary bonuses, health benefits, and sign-ons are never included.
              </p>
              <div style={{ marginTop: "auto" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(29,78,216,0.08)", border: "1px solid rgba(29,78,216,0.2)", borderRadius: 6, padding: "4px 10px", fontSize: 11, fontFamily: "var(--mono)", fontWeight: 700, color: "#1D4ED8" }}>
                  Contingency Only
                </span>
              </div>
            </div>

            <div className="terms-pillar" style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 14, padding: "30px 24px", boxShadow: "0 4px 16px rgba(15,23,42,0.04)" }}>
              <div className="pillar-kicker" style={{ color: "#1D4ED8", fontFamily: "var(--mono)", fontSize: 10.5, fontWeight: 700, letterSpacing: "0.08em", marginBottom: 12 }}>
                02 · REPLACEMENT WARRANTY
              </div>
              <div className="pillar-val" style={{ fontFamily: "var(--display)", fontSize: 34, fontWeight: 400, color: "#08142A", marginBottom: 4 }}>
                90 Days
              </div>
              <div className="pillar-label" style={{ fontSize: 14, fontWeight: 600, color: "#08142A", marginBottom: 10 }}>
                Calendar day guarantee
              </div>
              <p className="pillar-desc" style={{ fontSize: 13.5, color: "#475569", lineHeight: 1.55, margin: "0 0 16px" }}>
                If the hire leaves or is let go within 90 days, we conduct a prioritized replacement search at zero extra fee.
              </p>
              <div style={{ marginTop: "auto" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(29,78,216,0.08)", border: "1px solid rgba(29,78,216,0.2)", borderRadius: 6, padding: "4px 10px", fontSize: 11, fontFamily: "var(--mono)", fontWeight: 700, color: "#1D4ED8" }}>
                  Free Replacement
                </span>
              </div>
            </div>

            <div className="terms-pillar" style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 14, padding: "30px 24px", boxShadow: "0 4px 16px rgba(15,23,42,0.04)" }}>
              <div className="pillar-kicker" style={{ color: "#1D4ED8", fontFamily: "var(--mono)", fontSize: 10.5, fontWeight: 700, letterSpacing: "0.08em", marginBottom: 12 }}>
                03 · CLIENT FREEDOM
              </div>
              <div className="pillar-val" style={{ fontFamily: "var(--display)", fontSize: 34, fontWeight: 400, color: "#08142A", marginBottom: 4 }}>
                Zero
              </div>
              <div className="pillar-label" style={{ fontSize: 14, fontWeight: 600, color: "#08142A", marginBottom: 10 }}>
                Upfront retainer or lock-in
              </div>
              <p className="pillar-desc" style={{ fontSize: 13.5, color: "#475569", lineHeight: 1.55, margin: "0 0 16px" }}>
                No upfront cash and no exclusivity. Keep your internal referrals and other recruiting channels fully active.
              </p>
              <div style={{ marginTop: "auto" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(29,78,216,0.08)", border: "1px solid rgba(29,78,216,0.2)", borderRadius: 6, padding: "4px 10px", fontSize: 11, fontFamily: "var(--mono)", fontWeight: 700, color: "#1D4ED8" }}>
                  Non-Exclusive
                </span>
              </div>
            </div>

            <div className="terms-pillar" style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 14, padding: "30px 24px", boxShadow: "0 4px 16px rgba(15,23,42,0.04)" }}>
              <div className="pillar-kicker" style={{ color: "#1D4ED8", fontFamily: "var(--mono)", fontSize: 10.5, fontWeight: 700, letterSpacing: "0.08em", marginBottom: 12 }}>
                04 · PAYMENT SCHEDULE
              </div>
              <div className="pillar-val" style={{ fontFamily: "var(--display)", fontSize: 34, fontWeight: 400, color: "#08142A", marginBottom: 4 }}>
                Net 15
              </div>
              <div className="pillar-label" style={{ fontSize: 14, fontWeight: 600, color: "#08142A", marginBottom: 10 }}>
                Invoice on physical start date
              </div>
              <p className="pillar-desc" style={{ fontSize: 13.5, color: "#475569", lineHeight: 1.55, margin: "0 0 16px" }}>
                We issue the invoice only when the candidate physically begins work, payable within 15 calendar days.
              </p>
              <div style={{ marginTop: "auto" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(29,78,216,0.08)", border: "1px solid rgba(29,78,216,0.2)", borderRadius: 6, padding: "4px 10px", fontSize: 11, fontFamily: "var(--mono)", fontWeight: 700, color: "#1D4ED8" }}>
                  Start Date Invoice
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE FEE CALCULATOR */}
      <section className="block alt" id="calc" style={{ padding: "88px 0 96px", background: "#FFFFFF", borderBottom: "1px solid #E2E8F0" }}>
        <div className="wrap" style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
          <div className="sec-head-premium" style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="badge-capsule" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#EFF6FF", border: "1px solid #DBEAFE", borderRadius: 999, padding: "6px 14px", fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "#1D4ED8", marginBottom: 12 }}>
              <span className="badge-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#1D4ED8" }} />
              <span>INSTANT FEE ESTIMATE · ZERO COMMITMENT</span>
            </div>
            <h2 className="sec-title-lg" style={{ fontFamily: "var(--display)", fontSize: "clamp(30px, 3.8vw, 44px)", color: "#08142A", margin: "0 0 14px", fontWeight: 400 }}>
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
                border: "1.5px solid #EAE7DC",
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
                border: "1.5px solid #EAE7DC",
                padding: "32px 28px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 4px 16px rgba(15,23,42,0.03)",
              }}
            >
              <div>
                <div className="fee-calc-dash-top" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, flexWrap: "wrap", gap: 10 }}>
                  <span className="fee-calc-meta-pill" style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#1D4ED8", background: "rgba(29,78,216,0.08)", padding: "4px 10px", borderRadius: 6, border: "1px solid rgba(29,78,216,0.18)", display: "inline-flex", alignItems: "center", whiteSpace: "nowrap", width: "fit-content", flexShrink: 0 }}>
                    CONFIRMED 23% CONTINGENCY
                  </span>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 11.5, color: "#64748B", fontWeight: 600 }}>Zero Upfront</span>
                </div>

                <div className="fee-primary-stat" style={{ marginBottom: 24 }}>
                  <div className="fee-stat-number" style={{ fontFamily: "var(--display)", fontSize: "clamp(36px, 4vw, 48px)", fontWeight: 400, color: "#08142A", lineHeight: 1.1 }}>
                    {fmt.money(fee)}
                  </div>
                  <div className="fee-stat-sub" style={{ fontSize: 13.5, color: "#64748B", marginTop: 4 }}>
                    One-time contingency fee on {fmt.money(baseSalary)} base
                  </div>
                </div>

                <div className="fee-milestones-grid" style={{ marginBottom: 24 }}>
                  <div className="fee-milestone-box" style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 8, padding: "12px 14px" }}>
                    <span className="fee-milestone-label" style={{ display: "block", fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase", color: "#64748B", marginBottom: 4 }}>Invoice Date</span>
                    <span className="fee-milestone-val" style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#08142A" }}>{okDate ? fmt.date(startDate) : "–"}</span>
                  </div>
                  <div className="fee-milestone-box" style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 8, padding: "12px 14px" }}>
                    <span className="fee-milestone-label" style={{ display: "block", fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase", color: "#64748B", marginBottom: 4 }}>Payment Due (Net 15)</span>
                    <span className="fee-milestone-val" style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#08142A" }}>{okDate ? fmt.date(dueDate) : "–"}</span>
                  </div>
                  <div className="fee-milestone-box" style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 8, padding: "12px 14px" }}>
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
      <section className="block" style={{ padding: "88px 0 96px", background: "#FAF9F5", borderBottom: "1px solid #E2E8F0" }}>
        <div className="wrap" style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
          <div className="sec-head-premium" style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="badge-capsule" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#EFF6FF", border: "1px solid #DBEAFE", borderRadius: 999, padding: "6px 14px", fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "#1D4ED8", marginBottom: 12 }}>
              <span className="badge-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#1D4ED8" }} />
              <span>RISK REVERSAL · IN WRITING</span>
            </div>
            <h2 className="sec-title-lg" style={{ fontFamily: "var(--display)", fontSize: "clamp(30px, 3.8vw, 44px)", color: "#08142A", margin: "0 0 14px", fontWeight: 400 }}>
              The 90-day replacement <span className="serif-accent" style={{ color: "#1D4ED8", fontStyle: "italic" }}>guarantee</span>
            </h2>
            <p className="who-lede" style={{ fontSize: 16, color: "#64748B", maxWidth: 640, margin: "0 auto", lineHeight: 1.6 }}>
              What happens if a hire does not work out, in plain English.
            </p>
          </div>

          <div className="fee-guarantee-grid">
            <div className="fee-guarantee-card" style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 14, padding: "28px 24px" }}>
              <div className="fee-guarantee-kicker" style={{ color: "#1D4ED8", fontFamily: "var(--mono)", fontSize: 10.5, fontWeight: 700, letterSpacing: "0.08em", marginBottom: 10 }}>
                01 · DURATION
              </div>
              <h3 className="fee-guarantee-title" style={{ fontFamily: "var(--display)", fontSize: 21, fontWeight: 400, color: "#08142A", margin: "0 0 8px" }}>
                90 Calendar Days
              </h3>
              <p className="fee-guarantee-desc" style={{ fontSize: 13.5, color: "#475569", lineHeight: 1.55, margin: 0 }}>
                Full 90 calendar days from their first day in your office. Not business days — complete calendar protection.
              </p>
            </div>

            <div className="fee-guarantee-card" style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 14, padding: "28px 24px" }}>
              <div className="fee-guarantee-kicker" style={{ color: "#1D4ED8", fontFamily: "var(--mono)", fontSize: 10.5, fontWeight: 700, letterSpacing: "0.08em", marginBottom: 10 }}>
                02 · REMEDY
              </div>
              <h3 className="fee-guarantee-title" style={{ fontFamily: "var(--display)", fontSize: 21, fontWeight: 400, color: "#08142A", margin: "0 0 8px" }}>
                Priority Re-Search
              </h3>
              <p className="fee-guarantee-desc" style={{ fontSize: 13.5, color: "#475569", lineHeight: 1.55, margin: 0 }}>
                We reopen the search, prioritize it above other mandates, and send screened replacements until the seat is filled. No additional fee.
              </p>
            </div>

            <div className="fee-guarantee-card" style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 14, padding: "28px 24px" }}>
              <div className="fee-guarantee-kicker" style={{ color: "#1D4ED8", fontFamily: "var(--mono)", fontSize: 10.5, fontWeight: 700, letterSpacing: "0.08em", marginBottom: 10 }}>
                03 · BROAD COVERAGE
              </div>
              <h3 className="fee-guarantee-title" style={{ fontFamily: "var(--display)", fontSize: 21, fontWeight: 400, color: "#08142A", margin: "0 0 8px" }}>
                Comprehensive Protection
              </h3>
              <p className="fee-guarantee-desc" style={{ fontSize: 13.5, color: "#475569", lineHeight: 1.55, margin: 0 }}>
                Covers the hire resigning or being let go for any operational reason other than firm redundancy or practice group closure.
              </p>
            </div>

            <div className="fee-guarantee-card" style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 14, padding: "28px 24px" }}>
              <div className="fee-guarantee-kicker" style={{ color: "#1D4ED8", fontFamily: "var(--mono)", fontSize: 10.5, fontWeight: 700, letterSpacing: "0.08em", marginBottom: 10 }}>
                04 · PAYMENT REQUIREMENT
              </div>
              <h3 className="fee-guarantee-title" style={{ fontFamily: "var(--display)", fontSize: 21, fontWeight: 400, color: "#08142A", margin: "0 0 8px" }}>
                Prompt Invoice Clause
              </h3>
              <p className="fee-guarantee-desc" style={{ fontSize: 13.5, color: "#475569", lineHeight: 1.55, margin: 0 }}>
                The guarantee is fully active whenever the original placement invoice is paid within our standard Net 15 terms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. QUESTIONS TO ASK ANY RECRUITER */}
      <section className="block alt" id="questions" style={{ padding: "88px 0 96px", background: "#FFFFFF", borderBottom: "1px solid #E2E8F0" }}>
        <div className="wrap" style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
          <div className="sec-head-premium" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16 }}>
            <div>
              <div className="badge-capsule" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#EFF6FF", border: "1px solid #DBEAFE", borderRadius: 999, padding: "6px 14px", fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "#1D4ED8", marginBottom: 12 }}>
                <span className="badge-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#1D4ED8" }} />
                <span>DUE DILIGENCE · MARKET COMPARISON</span>
              </div>
              <h2 className="sec-title-lg" style={{ fontFamily: "var(--display)", fontSize: "clamp(30px, 3.8vw, 44px)", color: "#08142A", margin: "8px 0 0", fontWeight: 400 }}>
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

          <div className="table-wrap fee-table-wrap" style={{ marginTop: 32, background: "#FFFFFF", borderRadius: 14, border: "1.5px solid #E2E8F0", overflowX: "auto", WebkitOverflowScrolling: "touch", boxShadow: "0 4px 16px rgba(15,23,42,0.04)" }}>
            <table className="data" style={{ width: "100%", minWidth: 620, borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#FAF9F5", borderBottom: "1.5px solid #E2E8F0" }}>
                  <th style={{ padding: "16px 20px", textAlign: "left", fontFamily: "var(--mono)", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#64748B", minWidth: 180 }}>Ask</th>
                  <th style={{ padding: "16px 20px", textAlign: "left", fontFamily: "var(--mono)", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#64748B", minWidth: 220 }}>Why it matters</th>
                  <th style={{ padding: "16px 20px", textAlign: "left", fontFamily: "var(--mono)", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#1D4ED8", minWidth: 200 }}>Orion&apos;s answer</th>
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
          <div className="fee-table-scroll-hint" aria-hidden="true">
            <span>← Swipe horizontally to view full comparison →</span>
          </div>
        </div>
      </section>

      {/* 6. TERMS IN WRITING & GATE FORM */}
      <section className="block" id="terms-writing" style={{ padding: "88px 0 96px", background: "#FAF9F5", borderBottom: "1px solid #E2E8F0" }}>
        <div className="wrap split" style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
          <div>
            <div className="sec-head-premium sec-head-left">
              <div className="badge-capsule" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#EFF6FF", border: "1px solid #DBEAFE", borderRadius: 999, padding: "6px 14px", fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "#1D4ED8", marginBottom: 12 }}>
                <span className="badge-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#1D4ED8" }} />
                <span>IN WRITING · ZERO PRESSURE</span>
              </div>
              <h2 className="sec-title-lg" style={{ fontFamily: "var(--display)", fontSize: "clamp(30px, 3.8vw, 44px)", color: "#08142A", margin: "0 0 14px", fontWeight: 400 }}>
                Our terms on one <span className="serif-accent" style={{ color: "#1D4ED8", fontStyle: "italic" }}>page</span>
              </h2>
              <p className="who-lede" style={{ fontSize: 16, color: "#64748B", lineHeight: 1.6 }}>
                No retainer, one fee, 90-day replacement, and the five recruiter questions answered. Ready to forward to a managing partner.
              </p>
            </div>

            <div className="faq fee-faq-clean" style={{ marginTop: 28 }}>
              <details>
                <summary>
                  <span>Do we sign an agreement before we see candidates?</span>
                  <span className="faq-toggle-icon" aria-hidden="true" />
                </summary>
                <div className="faq-body">
                  <p>
                    No. You sign nothing until you want to interview someone we introduced. Looking at candidate profiles and dossiers commits you to nothing.
                  </p>
                </div>
              </details>
              <details>
                <summary>
                  <span>Do you offer a refund instead of replacement?</span>
                  <span className="faq-toggle-icon" aria-hidden="true" />
                </summary>
                <div className="faq-body">
                  <p>
                    Our standard contract term is a priority replacement search. Cash-refund terms can be structured for multi-hire retainers or enterprise mandates; discuss with Justin prior to engagement.
                  </p>
                </div>
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
      <section className="emp-terms-dark-sec" style={{ background: "#08142A", padding: "96px 0 108px", textAlign: "center", borderTop: "1px solid rgba(255, 255, 255, 0.12)" }}>
        <div className="wrap" style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px" }}>
          <div className="emp-terms-head">
            <div
              className="badge-capsule"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.18)",
                borderRadius: 999,
                padding: "6px 16px",
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
                fontWeight: 400,
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
                  boxShadow: "0 4px 16px rgba(29, 78, 216, 0.4)",
                }}
              >
                <span>Find candidates</span>
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/hire-attorneys"
                className="btn-emp-ghost"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.22)",
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
