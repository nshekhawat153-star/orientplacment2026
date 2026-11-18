import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HeroLeadForm } from "./HeroLeadForm";
import { ReviewSpotlight } from "./ReviewSpotlight";
import { HireAttorneysIntakeModal } from "./HireAttorneysIntakeModal";
import { Stars, GMark } from "@/components/icons";
import { reviews } from "@/data";

export const metadata: Metadata = {
  title: "Hire Qualified Attorneys for Your Law Firm | Orion Placement",
  description:
    "Screened attorney candidates sent straight to your law firm. Pay only if you hire. Sign one simple agreement with zero upfront cost and a 90-day replacement guarantee.",
  alternates: {
    canonical: "https://www.orionplacement.com/hire-attorneys",
  },
};

export default function HireAttorneysLandingPage() {
  const clientReviews = reviews.filter((r) => r.kind === "employer").slice(0, 3);

  return (
    <div className="ha-page" style={{ background: "#FFFFFF", color: "#08142A" }}>
      <style>{`
        html {
          scroll-behavior: smooth;
        }
        .ha-terms-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 18px;
        }
        .ha-reviews-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 24px;
        }
        .ha-steps-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 24px;
        }
        .ha-recruiter-split {
          display: grid;
          grid-template-columns: 360px 1fr;
          gap: 48px;
          align-items: center;
        }
        .ha-hero-split-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.18fr) minmax(0, 470px);
          gap: 48px;
          align-items: center;
          text-align: left;
        }
        .ha-hero-h1,
        .ha-split-hero-h1 {
          color: #FFFFFF !important;
        }
        .ha-hover-lift {
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
        }
        .ha-hover-lift:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 30px rgba(8, 20, 42, 0.08);
          border-color: #1D4ED8;
        }
        .only-mobile {
          display: none !important;
        }
        .hidden-mobile {
          display: block;
        }
        span.hidden-mobile, br.hidden-mobile {
          display: inline;
        }
        @media (max-width: 1024px) {
          .ha-terms-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          .ha-reviews-grid {
            grid-template-columns: 1fr;
          }
          .ha-steps-grid {
            grid-template-columns: 1fr;
          }
          .ha-recruiter-split {
            grid-template-columns: 1fr;
          }
          .ha-hero-split-grid {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
            gap: 36px !important;
          }
          .ha-hero-form-col {
            display: block !important;
            width: 100% !important;
            max-width: 520px !important;
            margin: 0 auto !important;
          }
          .ha-hero-left-col {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
            margin: 0 auto !important;
          }
          .ha-hero-eyebrow {
            margin: 0 auto 16px !important;
            display: inline-flex !important;
          }
          .ha-hero-h1,
          .ha-split-hero-h1 {
            text-align: center !important;
            margin: 0 auto 14px !important;
          }
          .ha-hero-lead {
            text-align: center !important;
            margin: 0 auto 22px !important;
          }
          .ha-hero-trust-bar {
            justify-content: center !important;
            margin: 0 auto !important;
          }
        }
        @media (max-width: 640px) {
          .ha-hero-split-grid {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
            gap: 20px !important;
          }
          .ha-hero-form-col {
            display: none !important;
          }
          .ha-hero-left-col {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
            margin: 0 auto !important;
          }
          .only-mobile {
            display: block !important;
          }
          span.only-mobile {
            display: inline !important;
          }
          .hidden-mobile {
            display: none !important;
          }
          .ha-terms-strip-sec {
            margin-top: 0 !important;
            margin-bottom: 24px !important;
            padding: 0 14px !important;
          }
          .ha-terms-inner-wrap {
            margin-top: -46px !important;
            padding: 0 !important;
          }
          .ha-terms-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 0 !important;
            background: #FFFFFF !important;
            border: 1.5px solid #BFDBFE !important;
            border-radius: 14px !important;
            box-shadow: 0 8px 24px rgba(29, 78, 216, 0.08) !important;
            overflow: hidden !important;
          }
          .ha-term-card {
            background: transparent !important;
            border: 0 !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            padding: 13px 12px !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: flex-start !important;
          }
          .ha-term-card:nth-child(1) {
            border-right: 1px solid #DBEAFE !important;
            border-bottom: 1px solid #DBEAFE !important;
          }
          .ha-term-card:nth-child(2) {
            border-bottom: 1px solid #DBEAFE !important;
          }
          .ha-term-card:nth-child(3) {
            border-right: 1px solid #DBEAFE !important;
          }
          .ha-term-card:nth-child(4) {
            border: 0 !important;
          }
          .ha-term-label {
            font-size: 9px !important;
            letter-spacing: 0.08em !important;
            margin-bottom: 3px !important;
            color: #64748B !important;
            font-weight: 700 !important;
            text-transform: uppercase !important;
          }
          .ha-term-val {
            font-size: 22px !important;
            line-height: 1.15 !important;
            font-weight: 600 !important;
            margin-bottom: 3px !important;
          }
          .ha-term-sub {
            font-size: 10.5px !important;
            line-height: 1.35 !important;
            margin-top: 0 !important;
            color: #64748B !important;
          }
          .ha-hero-sec {
            padding: 86px 0 36px !important;
            min-height: auto !important;
          }
          .ha-hero-wrap {
            padding: 0 16px !important;
          }
          .ha-hero-eyebrow {
            font-size: 10px !important;
            letter-spacing: 0.08em !important;
            padding: 5px 12px !important;
            gap: 6px !important;
            margin-bottom: 14px !important;
            white-space: nowrap !important;
          }
          .ha-hero-h1 {
            font-size: clamp(26px, 7.2vw, 32px) !important;
            line-height: 1.18 !important;
            margin: 0 auto 12px !important;
            letter-spacing: -0.02em !important;
          }
          .ha-hero-lead {
            font-size: 13.5px !important;
            line-height: 1.55 !important;
            margin: 0 auto 20px !important;
            color: rgba(255, 255, 255, 0.82) !important;
          }
          .ha-hero-cta-group {
            flex-direction: column !important;
            align-items: stretch !important;
            width: 100% !important;
            max-width: 320px !important;
            margin: 0 auto 20px !important;
            gap: 9px !important;
          }
          .ha-hero-btn-primary {
            width: 100% !important;
            justify-content: center !important;
            padding: 12px 18px !important;
            font-size: 14px !important;
            border-radius: 7px !important;
            box-sizing: border-box !important;
            white-space: nowrap !important;
          }
          .ha-hero-btn-secondary {
            width: 100% !important;
            justify-content: center !important;
            padding: 11px 18px !important;
            font-size: 13.5px !important;
            border-radius: 7px !important;
            box-sizing: border-box !important;
            white-space: nowrap !important;
          }
          .ha-hero-guarantees {
            flex-direction: column !important;
            align-items: center !important;
            gap: 7px !important;
            margin-top: 4px !important;
            font-size: 12.5px !important;
          }
          .ha-guarantee-item {
            gap: 6px !important;
          }
          .ha-reviews-sec {
            padding: 44px 0 52px !important;
            border-top: 1px solid #E2E8F0 !important;
          }
          .ha-section-eyebrow {
            font-size: 9.5px !important;
            letter-spacing: 0.08em !important;
            padding: 5px 12px !important;
            margin-bottom: 12px !important;
            white-space: nowrap !important;
            max-width: calc(100vw - 32px) !important;
            box-sizing: border-box !important;
          }
          .ha-section-h2 {
            font-size: 26px !important;
            line-height: 1.2 !important;
            margin: 0 0 10px !important;
          }
          .ha-section-sub {
            font-size: 13.5px !important;
            line-height: 1.55 !important;
            margin: 0 auto 16px !important;
          }
          .ha-google-reviews-pill {
            padding: 6px 14px !important;
            gap: 8px !important;
            font-size: 11.5px !important;
            white-space: nowrap !important;
            max-width: calc(100vw - 32px) !important;
            box-sizing: border-box !important;
          }
          .ha-protocol-sec {
            background-color: #08142A !important;
            background-image: radial-gradient(ellipse 120% 70% at 50% 0%, #0D1E3A 0%, #08142A 70%) !important;
            padding: 48px 0 56px !important;
          }
          .ha-protocol-eyebrow {
            background: rgba(30, 58, 138, 0.35) !important;
            border: 1px solid rgba(96, 165, 250, 0.35) !important;
            color: #BFDBFE !important;
            padding: 5px 14px !important;
            font-size: 10px !important;
            letter-spacing: 0.10em !important;
            margin-bottom: 14px !important;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2) !important;
          }
          .ha-step-card {
            padding: 24px 20px !important;
            border-radius: 14px !important;
          }
          .ha-banner-card {
            padding: 24px 18px !important;
            flex-direction: column !important;
            align-items: stretch !important;
            margin-top: 28px !important;
          }
          .ha-banner-btn-group {
            flex-direction: column !important;
            align-items: stretch !important;
            width: 100% !important;
            gap: 10px !important;
          }
          .ha-banner-btn-group a {
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            width: 100% !important;
            box-sizing: border-box !important;
            text-align: center !important;
            padding: 13px 20px !important;
          }
          .ha-recruiter-sec {
            padding: 44px 0 52px !important;
          }
          .ha-recruiter-split {
            gap: 20px !important;
          }
          .ha-founder-mobile-header {
            margin-bottom: 20px !important;
            text-align: left !important;
          }
          .ha-founder-card {
            max-width: 100% !important;
            padding: 20px 16px !important;
            box-sizing: border-box !important;
          }
          .ha-founder-img-wrap {
            max-width: 240px !important;
            height: 240px !important;
          }
          .ha-founder-stats {
            gap: 8px !important;
            padding: 14px 10px !important;
          }
          .ha-founder-stats div {
            text-align: center !important;
          }
          .ha-founder-btn-group {
            flex-direction: column !important;
            align-items: stretch !important;
            width: 100% !important;
            gap: 10px !important;
          }
          .ha-founder-btn-group a {
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            width: 100% !important;
            box-sizing: border-box !important;
            text-align: center !important;
            padding: 13px 20px !important;
          }
          .ha-questionnaire-sec {
            padding: 38px 0 46px !important;
          }
          .ha-questionnaire-wrap {
            padding: 0 14px !important;
          }
          .ha-questionnaire-header {
            margin-bottom: 20px !important;
          }
          .ha-bottom-cta-sec {
            padding: 52px 0 60px !important;
            background-color: #08142A !important;
            background-image: radial-gradient(ellipse 120% 70% at 50% 0%, #0D1E3A 0%, #08142A 70%) !important;
          }
          .ha-bottom-cta-wrap {
            padding: 0 16px !important;
          }
          .ha-bottom-eyebrow {
            padding: 5px 13px !important;
            font-size: 9.5px !important;
            letter-spacing: 0.08em !important;
            margin-bottom: 14px !important;
            white-space: nowrap !important;
          }
          .ha-bottom-h2 {
            font-size: 27px !important;
            line-height: 1.2 !important;
            margin-bottom: 12px !important;
          }
          .ha-bottom-sub {
            font-size: 13.5px !important;
            line-height: 1.55 !important;
            margin: 0 auto 22px !important;
          }
          .ha-bottom-cta-group {
            flex-direction: column !important;
            align-items: stretch !important;
            width: 100% !important;
            max-width: 320px !important;
            margin: 0 auto !important;
            gap: 10px !important;
          }
          .ha-bottom-btn-primary {
            width: 100% !important;
            justify-content: center !important;
            padding: 12px 18px !important;
            font-size: 14px !important;
            border-radius: 7px !important;
            box-sizing: border-box !important;
            white-space: nowrap !important;
            text-align: center !important;
          }
        }
      `}</style>

      {/* 1. LUXURY SPLIT DARK HERO WITH VIDEO BACKGROUND & LEAD CAPTURE FORM */}
      <section
        className="hero-cinematic ha-hero-sec"
        style={{
          position: "relative",
          background: "#08142A",
          color: "#FFFFFF",
          padding: "128px 0 108px",
          overflow: "hidden",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        <div className="hero-video-wrap" aria-hidden="true">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="hero-video-el"
          >
            <source src="/videos/hero-water-splash.mp4" type="video/mp4" />
            <source src="/media/splash.mp4" type="video/mp4" />
          </video>
          <div className="hero-video-gradient" />
          <div className="hero-video-radial-aura" />
        </div>

        <div className="wrap hero-content-wrap ha-hero-wrap" style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 3 }}>
          <div className="ha-hero-split-grid">
            {/* LEFT COLUMN: HEADINGS, VALUE PROPOSITIONS & TRUST (LEFT-ALIGNED ON WEB, CENTERED ON MOBILE) */}
            <div className="ha-hero-left-col">
              {/* Eyebrow Pill Badge */}
              <div
                className="ha-hero-eyebrow"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.20)",
                  borderRadius: 999,
                  padding: "6px 16px",
                  fontFamily: "var(--mono)",
                  fontSize: 11.5,
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#E2E8F0",
                  marginBottom: 20,
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#60A5FA" }} />
                Direct Intake · Zero Retainer · 100% Contingency
              </div>

              {/* Display Heading */}
              <h1
                className="ha-hero-h1 ha-split-hero-h1"
                style={{
                  fontSize: "clamp(34px, 4.2vw, 54px)",
                  fontFamily: "var(--display)",
                  fontWeight: 500,
                  lineHeight: 1.14,
                  color: "#FFFFFF",
                  letterSpacing: "-0.02em",
                  margin: "0 0 18px",
                  textAlign: "left",
                  maxWidth: 680,
                  textWrap: "balance",
                  textShadow: "0 2px 20px rgba(0, 0, 0, 0.6)",
                }}
              >
                Get qualified attorney candidates{" "}
                <span className="serif-accent" style={{ color: "#60A5FA", fontStyle: "italic" }}>
                  sent straight to your firm.
                </span>
              </h1>

              {/* Subtitle */}
              <p
                className="ha-hero-lead"
                style={{
                  fontSize: "clamp(16px, 1.6vw, 18.5px)",
                  lineHeight: 1.6,
                  color: "rgba(255, 255, 255, 0.88)",
                  maxWidth: 620,
                  margin: "0 0 26px",
                  textAlign: "left",
                  textShadow: "0 1px 8px rgba(0, 0, 0, 0.4)",
                }}
              >
                Sign one simple agreement. Pre-screened lateral attorneys matched to your exact
                practice mix, local Texas bar admissions, and compensation band. You only pay if you hire.
              </p>

              {/* Value Checkmarks List (Desktop / Web) */}
              <div
                className="ha-hero-checkmarks hidden-mobile"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  marginBottom: 28,
                  fontSize: 14.5,
                  color: "#CBD5E1",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ color: "#60A5FA", fontWeight: 700, fontSize: 16 }}>✓</span>
                  <span>23% flat contingency fee — payable Net 15 only if you hire</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ color: "#60A5FA", fontWeight: 700, fontSize: 16 }}>✓</span>
                  <span>90-day replacement warranty backed by contract credit</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ color: "#60A5FA", fontWeight: 700, fontSize: 16 }}>✓</span>
                  <span>Fast 48–72h turnaround with verified attorney dossiers</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ color: "#60A5FA", fontWeight: 700, fontSize: 16 }}>✓</span>
                  <span>Zero upfront retainer or exclusivity lock-in</span>
                </div>
              </div>

              {/* Guarantees on Mobile (Centered clean guarantees) */}
              <div
                className="ha-hero-guarantees only-mobile"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 7,
                  fontSize: 12.5,
                  color: "#CBD5E1",
                  margin: "0 auto 20px",
                  textAlign: "center",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ color: "#60A5FA", fontWeight: 700 }}>✓</span>
                  <span>23% flat contingency fee · Pay only if you hire</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ color: "#60A5FA", fontWeight: 700 }}>✓</span>
                  <span>90-day replacement warranty · Zero upfront retainer</span>
                </div>
              </div>

              {/* Social Proof Founder Rating Badge (Bright, crisp and high-contrast) */}
              <div className="ha-hero-trust-bar" style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                <div
                  className="ha-hero-google-pill"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    background: "rgba(255, 255, 255, 0.08)",
                    border: "1px solid rgba(255, 255, 255, 0.18)",
                    borderRadius: 10,
                    padding: "9px 16px",
                    fontSize: 13.5,
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                  }}
                >
                  <span style={{ color: "#60A5FA", fontSize: 13, letterSpacing: 1.5 }}>
                    ★★★★★
                  </span>
                  <span style={{ width: 1, height: 14, background: "rgba(255, 255, 255, 0.25)" }} />
                  <span style={{ color: "#FFFFFF" }}>
                    <strong style={{ color: "#FFFFFF", fontWeight: 600 }}>5.0 Google Rating</strong>
                    <span style={{ color: "rgba(255, 255, 255, 0.8)", fontWeight: 400 }}> · Texas Law Firms</span>
                  </span>
                </div>
              </div>

              {/* MOBILE ONLY HERO CTA BUTTON (Opens modal popup on tap) */}
              <div className="ha-hero-mobile-cta only-mobile" style={{ width: "100%", maxWidth: 360, margin: "20px auto 0" }}>
                <a
                  href="#intake-form"
                  className="ha-hero-btn-primary ha-trigger-intake-modal"
                  data-open-intake-modal="true"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#1D4ED8",
                    color: "#FFFFFF",
                    fontWeight: 600,
                    fontSize: 15.5,
                    padding: "14px 28px",
                    borderRadius: 8,
                    textDecoration: "none",
                    boxShadow: "0 8px 24px rgba(29, 78, 216, 0.4)",
                    width: "100%",
                  }}
                >
                  <span>Submit Brief &amp; Receive Candidates</span>
                </a>
              </div>
            </div>

            {/* RIGHT COLUMN: HIGH-CONVERTING HERO LEAD CAPTURE FORM (VISIBLE ON WEB & MOBILE) */}
            <div className="ha-hero-form-col">
              <HeroLeadForm />
            </div>
          </div>
        </div>
      </section>

      {/* 2. DEDICATED ELEVATED TERMS STRIP (4 CARDS IN 1 BALANCED ROW) */}
      <section
        className="ha-terms-strip-sec"
        style={{
          background: "transparent",
          position: "relative",
          zIndex: 10,
          padding: "0 0 24px",
        }}
      >
        <div className="ha-terms-inner-wrap" style={{ maxWidth: 1200, margin: "-76px auto 0", padding: "0 24px" }}>
          <div className="ha-terms-grid">
            {/* Card 1: Placement Fee */}
            <div
              className="ha-hover-lift ha-term-card"
              style={{
                background: "#FFFFFF",
                border: "1.5px solid #BFDBFE",
                borderRadius: 14,
                padding: "24px 22px",
                boxShadow: "0 8px 24px rgba(29, 78, 216, 0.06)",
              }}
            >
              <div className="ha-term-label" style={{ fontFamily: "var(--mono)", fontSize: 11, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>
                Placement Fee
              </div>
              <div className="ha-term-val" style={{ fontFamily: "var(--display)", fontSize: 32, fontWeight: 600, color: "#08142A", lineHeight: 1.1 }}>
                23%
              </div>
              <div className="ha-term-sub" style={{ fontSize: 13, color: "#64748B", marginTop: 6, lineHeight: 1.4 }}>
                Net 15 upon candidate start date. Due only if you hire.
              </div>
            </div>

            {/* Card 2: Warranty Period */}
            <div
              className="ha-hover-lift ha-term-card"
              style={{
                background: "#FFFFFF",
                border: "1.5px solid #BFDBFE",
                borderRadius: 14,
                padding: "24px 22px",
                boxShadow: "0 8px 24px rgba(29, 78, 216, 0.06)",
              }}
            >
              <div className="ha-term-label" style={{ fontFamily: "var(--mono)", fontSize: 11, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>
                Warranty Period
              </div>
              <div className="ha-term-val" style={{ fontFamily: "var(--display)", fontSize: 32, fontWeight: 600, color: "#1D4ED8", lineHeight: 1.1 }}>
                90 Days
              </div>
              <div className="ha-term-sub" style={{ fontSize: 13, color: "#64748B", marginTop: 6, lineHeight: 1.4 }}>
                100% replacement guarantee backed by contract credit.
              </div>
            </div>

            {/* Card 3: Upfront Cost */}
            <div
              className="ha-hover-lift ha-term-card"
              style={{
                background: "#FFFFFF",
                border: "1.5px solid #BFDBFE",
                borderRadius: 14,
                padding: "24px 22px",
                boxShadow: "0 8px 24px rgba(29, 78, 216, 0.06)",
              }}
            >
              <div className="ha-term-label" style={{ fontFamily: "var(--mono)", fontSize: 11, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>
                Upfront Retainer
              </div>
              <div className="ha-term-val" style={{ fontFamily: "var(--display)", fontSize: 32, fontWeight: 600, color: "#08142A", lineHeight: 1.1 }}>
                $0
              </div>
              <div className="ha-term-sub" style={{ fontSize: 13, color: "#64748B", marginTop: 6, lineHeight: 1.4 }}>
                Zero upfront fees, retainers, or exclusivity lock-in.
              </div>
            </div>

            {/* Card 4: Turnaround */}
            <div
              className="ha-hover-lift ha-term-card"
              style={{
                background: "#FFFFFF",
                border: "1.5px solid #BFDBFE",
                borderRadius: 14,
                padding: "24px 22px",
                boxShadow: "0 8px 24px rgba(29, 78, 216, 0.06)",
              }}
            >
              <div className="ha-term-label" style={{ fontFamily: "var(--mono)", fontSize: 11, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>
                Candidate Turnaround
              </div>
              <div className="ha-term-val" style={{ fontFamily: "var(--display)", fontSize: 32, fontWeight: 600, color: "#1D4ED8", lineHeight: 1.1 }}>
                48–72h
              </div>
              <div className="ha-term-sub" style={{ fontSize: 13, color: "#64748B", marginTop: 6, lineHeight: 1.4 }}>
                Pre-screened lateral attorney dossiers delivered directly.
              </div>
            </div>
          </div>

          {/* ELEGANT SECTION DIVIDER */}
          <div
            className="ha-terms-divider-wrap"
            style={{
              maxWidth: 1200,
              margin: "48px auto 0",
              padding: "0 12px",
            }}
          >
            <div
              style={{
                height: 1.5,
                background: "linear-gradient(90deg, rgba(219, 234, 254, 0.15) 0%, #BFDBFE 25%, #60A5FA 50%, #BFDBFE 75%, rgba(219, 234, 254, 0.15) 100%)",
                borderRadius: 999,
              }}
            />
          </div>
        </div>
      </section>

      {/* 3. CLIENT RESULTS / FIRMS WE'VE HELPED HIRE (LIGHT LUXURY EDITORIAL SOCIAL PROOF) */}
      <section
        className="ha-reviews-sec"
        style={{
          position: "relative",
          background: "#FFFFFF",
          color: "#08142A",
          padding: "68px 0 108px",
          borderBottom: "1px solid #EAE7DC",
        }}
      >
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
          {/* Section Header */}
          <div style={{ textAlign: "center", maxWidth: 780, margin: "0 auto 48px" }}>
            <div
              className="ha-section-eyebrow"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#EFF6FF",
                border: "1px solid #DBEAFE",
                borderRadius: 999,
                padding: "6px 16px",
                fontFamily: "var(--mono)",
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#1D4ED8",
                marginBottom: 18,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#1D4ED8" }} />
              <span className="hidden-mobile">CLIENT RESULTS · 100% VERIFIED LAW FIRM FEEDBACK</span>
              <span className="only-mobile">CLIENT RESULTS · VERIFIED FEEDBACK</span>
            </div>
            <h2
              className="ha-section-h2"
              style={{
                fontFamily: "var(--display)",
                fontSize: "clamp(32px, 4vw, 48px)",
                color: "#08142A",
                margin: "0 0 16px",
                fontWeight: 500,
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
              }}
            >
              Firms we&apos;ve helped{" "}
              <span className="serif-accent" style={{ fontStyle: "italic", color: "#1D4ED8" }}>
                hire.
              </span>
            </h2>
            <p
              className="ha-section-sub"
              style={{
                color: "#475569",
                fontSize: 17,
                lineHeight: 1.65,
                margin: "0 auto 24px",
                maxWidth: 680,
              }}
            >
              Direct, unedited feedback from managing partners and firm administrators who rely on Orion for lateral attorney placements.
            </p>

            {/* Google Verified Trust Pill (Light Executive Edition) */}
            <div
              className="ha-google-reviews-pill"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                background: "#FAF9F5",
                border: "1.5px solid #E2E8F0",
                borderRadius: 999,
                padding: "8px 22px",
                boxShadow: "0 2px 8px rgba(8, 20, 42, 0.04)",
              }}
            >
              <div style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
                <GMark />
                <span className="hidden-mobile" style={{ fontFamily: "var(--mono)", fontSize: 11.5, fontWeight: 700, color: "#08142A", letterSpacing: "0.06em" }}>
                  GOOGLE REVIEWS
                </span>
              </div>
              <span className="hidden-mobile" style={{ color: "#CBD5E1" }}>|</span>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                <span style={{ color: "#F59E0B", fontSize: 14 }}>★★★★★</span>
                <b style={{ color: "#08142A", fontSize: 13.5 }}>5.0 Rating</b>
                <span className="hidden-mobile" style={{ color: "#64748B", fontSize: 12.5 }}>(60 verified law firm reviews)</span>
                <span className="only-mobile" style={{ color: "#64748B", fontSize: 12 }}>(60 reviews)</span>
              </div>
            </div>
          </div>

          {/* Premium Spotlight Carousel Card */}
          <ReviewSpotlight />
        </div>
      </section>

      {/* 4. THE CONTINGENCY PROTOCOL (EXECUTIVE LUXURY DARK MIDNIGHT ARCHITECTURE) */}
      <section
        className="ha-protocol-sec"
        style={{
          position: "relative",
          background: "radial-gradient(ellipse 90% 70% at 50% 0%, rgba(29, 78, 216, 0.16) 0%, #08142A 70%, #050B17 100%)",
          color: "#FFFFFF",
          padding: "100px 0 110px",
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          overflow: "hidden",
        }}
      >
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 2 }}>
          {/* Header */}
          <div style={{ textAlign: "center", maxWidth: 780, margin: "0 auto 52px" }}>
            <div
              className="ha-section-eyebrow ha-protocol-eyebrow"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(29, 78, 216, 0.20)",
                border: "1px solid rgba(96, 165, 250, 0.30)",
                borderRadius: 999,
                padding: "6px 16px",
                fontFamily: "var(--mono)",
                fontSize: 11,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#93C5FD",
                marginBottom: 18,
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#60A5FA", flexShrink: 0 }} />
              <span className="hidden-mobile">THE CONTINGENCY SEARCH PROTOCOL · ZERO FINANCIAL RISK</span>
              <span className="only-mobile">THE CONTINGENCY PROTOCOL</span>
            </div>
            <h2
              className="ha-section-h2"
              style={{
                fontFamily: "var(--display)",
                fontSize: "clamp(32px, 4vw, 48px)",
                color: "#FFFFFF",
                margin: "0 0 16px",
                fontWeight: 500,
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
                textShadow: "0 2px 16px rgba(0, 0, 0, 0.45)",
              }}
            >
              You only pay if you{" "}
              <span className="serif-accent" style={{ fontStyle: "italic", color: "#93C5FD" }}>
                hire.
              </span>
            </h2>
            <p
              className="ha-section-sub"
              style={{
                color: "#CBD5E1",
                fontSize: 17,
                lineHeight: 1.65,
                margin: 0,
                maxWidth: 680,
                marginInline: "auto",
                textShadow: "0 1px 8px rgba(0, 0, 0, 0.4)",
              }}
            >
              Sign one simple non-exclusive agreement. We deliver screened, bar-admitted attorney dossiers directly to your inbox. You interview the candidates you choose — a fee is payable only when your chosen candidate starts.
            </p>
          </div>

          {/* 3 Elevated Executive Protocol Cards */}
          <div className="ha-steps-grid">
            {/* Step 1 */}
            <div
              className="ha-hover-lift ha-step-card"
              style={{
                background: "linear-gradient(180deg, rgba(15, 30, 58, 0.72) 0%, rgba(8, 20, 42, 0.88) 100%)",
                border: "1px solid rgba(96, 165, 250, 0.18)",
                borderRadius: 16,
                padding: "36px 30px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 16px 40px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #1D4ED8 0%, #60A5FA 100%)" }} />
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
                  <span
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#93C5FD",
                      textTransform: "uppercase",
                      letterSpacing: "0.10em",
                      background: "rgba(29, 78, 216, 0.25)",
                      border: "1px solid rgba(96, 165, 250, 0.3)",
                      padding: "5px 12px",
                      borderRadius: 6,
                    }}
                  >
                    STEP 01 · INTAKE
                  </span>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 12, color: "#64748B" }}>01 / 03</span>
                </div>

                <div style={{ marginBottom: 18 }}>
                  <div style={{ fontFamily: "var(--display)", fontSize: 46, fontWeight: 600, color: "#FFFFFF", lineHeight: 1 }}>
                    $0
                  </div>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "#93C5FD", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700, marginTop: 6 }}>
                    Due upfront or to initiate search
                  </div>
                </div>

                <h3 style={{ fontFamily: "var(--display)", fontSize: 22, color: "#FFFFFF", fontWeight: 600, margin: "0 0 12px", lineHeight: 1.3 }}>
                  Zero upfront cost or retainer
                </h3>
                <p style={{ fontSize: 14.5, color: "#CBD5E1", lineHeight: 1.65, margin: 0 }}>
                  Nothing to pay to launch your search. We review your open seat, align on practice requirements, and begin sourcing immediately under a simple non-exclusive agreement.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div
              className="ha-hover-lift ha-step-card"
              style={{
                background: "linear-gradient(180deg, rgba(15, 30, 58, 0.72) 0%, rgba(8, 20, 42, 0.88) 100%)",
                border: "1px solid rgba(96, 165, 250, 0.18)",
                borderRadius: 16,
                padding: "36px 30px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 16px 40px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #1D4ED8 0%, #60A5FA 100%)" }} />
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
                  <span
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#93C5FD",
                      textTransform: "uppercase",
                      letterSpacing: "0.10em",
                      background: "rgba(29, 78, 216, 0.25)",
                      border: "1px solid rgba(96, 165, 250, 0.3)",
                      padding: "5px 12px",
                      borderRadius: 6,
                    }}
                  >
                    STEP 02 · SELECTION
                  </span>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 12, color: "#64748B" }}>02 / 03</span>
                </div>

                <div style={{ marginBottom: 18 }}>
                  <div style={{ fontFamily: "var(--display)", fontSize: 46, fontWeight: 600, color: "#60A5FA", lineHeight: 1 }}>
                    3–5
                  </div>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "#93C5FD", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700, marginTop: 6 }}>
                    Screened finalists delivered per seat
                  </div>
                </div>

                <h3 style={{ fontFamily: "var(--display)", fontSize: 22, color: "#FFFFFF", fontWeight: 600, margin: "0 0 12px", lineHeight: 1.3 }}>
                  Candidates who truly fit
                </h3>
                <p style={{ fontSize: 14.5, color: "#CBD5E1", lineHeight: 1.65, margin: 0 }}>
                  We pre-screen lateral attorneys for your exact practice mix, local state bar status, courtroom or deal experience, billable hour expectations, and compensation band.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div
              className="ha-hover-lift ha-step-card"
              style={{
                background: "linear-gradient(180deg, rgba(15, 30, 58, 0.72) 0%, rgba(8, 20, 42, 0.88) 100%)",
                border: "1px solid rgba(96, 165, 250, 0.18)",
                borderRadius: 16,
                padding: "36px 30px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 16px 40px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #1D4ED8 0%, #60A5FA 100%)" }} />
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
                  <span
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#93C5FD",
                      textTransform: "uppercase",
                      letterSpacing: "0.10em",
                      background: "rgba(29, 78, 216, 0.25)",
                      border: "1px solid rgba(96, 165, 250, 0.3)",
                      padding: "5px 12px",
                      borderRadius: 6,
                    }}
                  >
                    STEP 03 · WARRANTY
                  </span>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 12, color: "#64748B" }}>03 / 03</span>
                </div>

                <div style={{ marginBottom: 18 }}>
                  <div style={{ fontFamily: "var(--display)", fontSize: 46, fontWeight: 600, color: "#FFFFFF", lineHeight: 1 }}>
                    90 Days
                  </div>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "#93C5FD", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700, marginTop: 6 }}>
                    100% replacement warranty in contract
                  </div>
                </div>

                <h3 style={{ fontFamily: "var(--display)", fontSize: 22, color: "#FFFFFF", fontWeight: 600, margin: "0 0 12px", lineHeight: 1.3 }}>
                  100% placement guarantee
                </h3>
                <p style={{ fontSize: 14.5, color: "#CBD5E1", lineHeight: 1.65, margin: 0 }}>
                  Our 23% contingency fee is due Net 15 only after your candidate starts. If they leave or don&apos;t work out within 90 days, we conduct a replacement search at $0 extra charge.
                </p>
              </div>
            </div>
          </div>

          {/* High-Converting Ad Conversion Callout Banner */}
          <div
            className="ha-banner-card"
            style={{
              marginTop: 48,
              background: "linear-gradient(180deg, rgba(15, 30, 58, 0.72) 0%, rgba(8, 20, 42, 0.88) 100%)",
              border: "1px solid rgba(96, 165, 250, 0.18)",
              borderRadius: 16,
              padding: "36px 40px",
              color: "#FFFFFF",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 24,
              boxShadow: "0 16px 40px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          >
            <div>
              <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "#93C5FD", textTransform: "uppercase", letterSpacing: "0.10em", fontWeight: 700, marginBottom: 6 }}>
                READY TO REVIEW CANDIDATES?
              </div>
              <h3 style={{ fontFamily: "var(--display)", fontSize: 24, fontWeight: 500, margin: "0 0 6px", color: "#FFFFFF" }}>
                Receive screened attorney dossiers for your seat.
              </h3>
              <p style={{ color: "#CBD5E1", fontSize: 14, margin: 0 }}>
                Zero upfront cost · 100% contingency · 90-day replacement warranty
              </p>
            </div>

            <div className="ha-banner-btn-group" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a
                href="#intake-form"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#1D4ED8",
                  color: "#FFFFFF",
                  fontWeight: 600,
                  fontSize: 14.5,
                  padding: "13px 26px",
                  borderRadius: 7,
                  textDecoration: "none",
                  boxShadow: "0 6px 18px rgba(29, 78, 216, 0.45)",
                }}
              >
                <span>Request Candidate Dossiers</span>
                <span className="hidden-mobile" aria-hidden="true">↑</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. MEET YOUR RECRUITER / FOUNDER SPOTLIGHT */}
      <section className="ha-recruiter-sec" style={{ background: "#FAF9F5", padding: "88px 0 96px", borderBottom: "1px solid #EAE7DC" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          {/* Mobile-Only Heading (Shows ABOVE Founder Card on mobile) */}
          <div className="only-mobile ha-founder-mobile-header">
            <div
              className="ha-section-eyebrow"
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
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#1D4ED8", flexShrink: 0 }} />
              <span>FOUNDER SPOTLIGHT</span>
            </div>

            <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(26px, 7vw, 32px)", color: "#08142A", margin: "0 0 6px", fontWeight: 500, lineHeight: 1.2 }}>
              Hi, I&apos;m <span className="serif-accent" style={{ fontStyle: "italic", color: "#1D4ED8" }}>Justin Sofman.</span>
            </h2>

            <p style={{ fontSize: 14, color: "#64748B", margin: "0 0 4px" }}>
              Co-Founder &amp; Managing Partner, Orion Placement
            </p>
          </div>

          <div className="ha-recruiter-split">
            {/* Left Column: Executive Portrait Card */}
            <div style={{ textAlign: "center" }}>
              <div
                className="ha-founder-card"
                style={{
                  background: "#FFFFFF",
                  border: "1.5px solid #E2E8F0",
                  borderRadius: 16,
                  padding: "24px",
                  display: "inline-block",
                  boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05)",
                  maxWidth: 320,
                  width: "100%",
                }}
              >
                <div className="ha-founder-img-wrap" style={{ position: "relative", width: 260, height: 260, margin: "0 auto 16px", borderRadius: 12, overflow: "hidden", background: "#F1F5F9" }}>
                  <Image
                    src="/images/founders/justin-sofman.png"
                    alt="Justin Sofman"
                    fill
                    style={{ objectFit: "cover" }}
                    priority
                  />
                </div>
                <div>
                  <b style={{ display: "block", fontSize: 20, color: "#08142A", fontWeight: 600, fontFamily: "var(--display)" }}>Justin Sofman</b>
                  <span style={{ fontSize: 13, color: "#64748B", display: "block", marginTop: 2 }}>Co-Founder &amp; Managing Partner</span>
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 6, marginTop: 10, fontSize: 12, color: "#1D4ED8", fontWeight: 600 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#16A34A" }} />
                    <span>Active Placement Partner</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Recruiter Content */}
            <div>
              {/* Desktop-Only Heading (Shows alongside photo on desktop) */}
              <div className="hidden-mobile">
                <div
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
                    marginBottom: 14,
                  }}
                >
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#1D4ED8" }} />
                  <span>FOUNDER SPOTLIGHT</span>
                </div>

                <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(28px, 3.6vw, 42px)", color: "#08142A", margin: "0 0 6px", fontWeight: 500 }}>
                  Hi, I&apos;m <span className="serif-accent" style={{ fontStyle: "italic", color: "#1D4ED8" }}>Justin Sofman.</span>
                </h2>

                <p style={{ fontSize: 15, color: "#64748B", margin: "0 0 20px" }}>
                  Co-Founder &amp; Managing Partner, Orion Placement
                </p>
              </div>

              <div style={{ display: "grid", gap: 14, fontSize: 15, color: "#475569", lineHeight: 1.6, marginBottom: 24 }}>
                <p style={{ margin: 0 }}>
                  I co-founded Orion Placement alongside Jon Missirlian to solve the biggest frustration law firms face: paying huge upfront retainers for resume spammers who have never even spoken to the attorney they&apos;re submitting.
                </p>
                <p style={{ margin: 0 }}>
                  With <b>11 years</b> of recruiting industry experience and Jon&apos;s <b>20 years</b> of talent acquisition expertise, we facilitate over <b>30 hires per month</b> for law firms across Texas and nationwide, backed by an active pool of <b>100,000+ legal professionals</b>.
                </p>
              </div>

              {/* Stats Highlight Bar */}
              <div
                className="ha-founder-stats"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                  gap: 12,
                  background: "#FFFFFF",
                  border: "1px solid #E2E8F0",
                  borderRadius: 12,
                  padding: "16px 20px",
                  marginBottom: 24,
                }}
              >
                <div>
                  <div style={{ fontFamily: "var(--display)", fontSize: 24, fontWeight: 700, color: "#08142A" }}>11+ Yrs</div>
                  <div style={{ fontSize: 12, color: "#64748B" }}>Legal Search Experience</div>
                </div>
                <div>
                  <div style={{ fontFamily: "var(--display)", fontSize: 24, fontWeight: 700, color: "#1D4ED8" }}>30+</div>
                  <div style={{ fontSize: 12, color: "#64748B" }}>Monthly Firm Placements</div>
                </div>
                <div>
                  <div style={{ fontFamily: "var(--display)", fontSize: 24, fontWeight: 700, color: "#08142A" }}>100k+</div>
                  <div style={{ fontSize: 12, color: "#64748B" }}>Legal Talent Network</div>
                </div>
              </div>

              <div style={{ background: "#FFFFFF", borderLeft: "3px solid #1D4ED8", padding: "14px 18px", borderRadius: "0 8px 8px 0", fontSize: 14.5, fontStyle: "italic", color: "#08142A", marginBottom: 24 }}>
                &ldquo;I only get paid when you find the right attorney, so I&apos;m 100% invested in sending people actually worth your time.&rdquo;
              </div>

              <div className="ha-founder-btn-group" style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
                <a
                  href="#intake-form"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: "#1D4ED8",
                    color: "#FFFFFF",
                    borderRadius: 7,
                    fontWeight: 600,
                    padding: "13px 26px",
                    fontSize: 14.5,
                    textDecoration: "none",
                    boxShadow: "0 6px 18px rgba(29, 78, 216, 0.35)",
                  }}
                >
                  <span>Request Candidates for Your Firm</span>
                  <span className="hidden-mobile" aria-hidden="true">↑</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. BOTTOM ACTION CLOSING SECTION */}
      <section
        className="ha-bottom-cta-sec"
        style={{
          background: "radial-gradient(ellipse 90% 80% at 50% -20%, rgba(29, 78, 216, 0.28) 0%, rgba(8, 20, 42, 0.98) 75%, #08142A 100%)",
          padding: "96px 0 108px",
          textAlign: "center",
          color: "#FFFFFF",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="ha-bottom-cta-wrap" style={{ maxWidth: 780, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
          <div
            className="ha-section-eyebrow ha-bottom-eyebrow"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
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
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#60A5FA", flexShrink: 0 }} />
            <span>100% CONTINGENCY · 90-DAY REPLACEMENT GUARANTEE</span>
          </div>

          <h2
            className="ha-bottom-h2"
            style={{
              fontFamily: "var(--display)",
              fontSize: "clamp(32px, 4.2vw, 48px)",
              color: "#FFFFFF",
              margin: "0 0 16px",
              fontWeight: 500,
              lineHeight: 1.15,
            }}
          >
            Ready to receive qualified attorney <span className="serif-accent" style={{ color: "#60A5FA", fontStyle: "italic" }}>candidates?</span>
          </h2>

          <p className="ha-bottom-sub" style={{ color: "#CBD5E1", fontSize: 17, lineHeight: 1.6, marginBottom: 28, maxWidth: 640, margin: "0 auto 28px" }}>
            Sign one simple agreement. Pre-screened attorney dossiers delivered straight to your inbox within 48–72 hours.
            Zero upfront cost — you <b>only pay if you hire</b>.
          </p>

          {/* Quick trust checklist */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "clamp(12px, 2.5vw, 24px)",
              flexWrap: "wrap",
              fontSize: 13.5,
              color: "#E2E8F0",
              marginBottom: 32,
            }}
          >
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <span style={{ color: "#60A5FA", fontWeight: 700 }}>✓</span> Zero Upfront Retainer
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <span style={{ color: "#60A5FA", fontWeight: 700 }}>✓</span> 23% Fee Only If You Hire
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <span style={{ color: "#60A5FA", fontWeight: 700 }}>✓</span> 90-Day Replacement Warranty
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <span style={{ color: "#60A5FA", fontWeight: 700 }}>✓</span> 48–72h Turnaround
            </span>
          </div>

          {/* SINGLE PRIMARY CTA BUTTON (GLIDES DIRECTLY TO HERO FORM) */}
          <div className="ha-bottom-cta-group" style={{ display: "flex", justifyContent: "center" }}>
            <a
              href="#intake-form"
              className="ha-bottom-btn-primary"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#1D4ED8",
                color: "#FFFFFF",
                fontWeight: 600,
                fontSize: 16,
                padding: "15px 36px",
                borderRadius: 8,
                textDecoration: "none",
                boxShadow: "0 8px 24px rgba(29, 78, 216, 0.45)",
              }}
            >
              <span>Submit Brief &amp; Receive Candidate Dossiers</span>
              <span className="hidden-mobile" aria-hidden="true">↑</span>
            </a>
          </div>
        </div>
      </section>

      {/* MOBILE POPUP INTAKE MODAL (Opens on tap of any CTA on mobile, web remains untouched) */}
      <HireAttorneysIntakeModal />
    </div>
  );
}
