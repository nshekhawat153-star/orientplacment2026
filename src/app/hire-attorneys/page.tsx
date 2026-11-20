import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HeroLeadForm } from "./HeroLeadForm";
import { ReviewCards } from "./ReviewCards";
import { HireAttorneysIntakeModal } from "./HireAttorneysIntakeModal";
import { StickyRequestBar } from "./StickyRequestBar";
import { TermsTicker } from "./TermsTicker";
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
        .ha-founder-quote-left {
          display: none;
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
        .ha-hero-sec {
          position: relative !important;
          background-color: #08142A !important;
          background-image:
            radial-gradient(circle 620px at 96% 6%, rgba(37, 99, 235, 0.42) 0%, rgba(29, 78, 216, 0.16) 45%, rgba(29, 78, 216, 0) 72%),
            radial-gradient(circle 560px at 3% 78%, rgba(96, 165, 250, 0.24) 0%, rgba(47, 98, 184, 0.09) 45%, rgba(47, 98, 184, 0) 72%),
            linear-gradient(180deg, #0A1A38 0%, #08142A 55%, #050B17 100%) !important;
          color: #FFFFFF !important;
          padding: 124px 0 120px !important;
          min-height: auto !important;
          display: block !important;
          overflow: hidden !important;
          border-bottom: 0 !important;
          box-sizing: border-box !important;
        }
        /* light grid pattern in the hero background, faded toward the edges */
        .ha-hero-sec::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.028) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.028) 1px, transparent 1px);
          background-size: 60px 60px;
          background-position: center top;
          -webkit-mask-image: radial-gradient(ellipse 85% 75% at 50% 42%, #000 25%, transparent 100%);
          mask-image: radial-gradient(ellipse 85% 75% at 50% 42%, #000 25%, transparent 100%);
        }
        @media (max-width: 640px) {
          .ha-hero-sec::before { background-size: 44px 44px; }
          /* phones: darker background, smaller and softer glows (the full-size ones wash the small screen out) */
          .ha-hero-sec {
            background-image:
              radial-gradient(circle 380px at 100% 4%, rgba(37, 99, 235, 0.24) 0%, rgba(29, 78, 216, 0.08) 50%, rgba(29, 78, 216, 0) 75%),
              radial-gradient(circle 340px at 0% 80%, rgba(96, 165, 250, 0.12) 0%, rgba(47, 98, 184, 0.04) 50%, rgba(47, 98, 184, 0) 75%),
              linear-gradient(180deg, #08142A 0%, #060E1F 55%, #040913 100%) !important;
          }
        }
        .ha-terms-inner-wrap {
          max-width: 1200px;
          margin: 0 auto !important;
          padding: 0 24px !important;
          position: relative;
          z-index: 10;
        }
        /* "You only pay if you hire": same background as the hero (glows + grid) */
        .ha-protocol-sec {
          background-color: #08142A !important;
          background-image:
            radial-gradient(circle 620px at 96% 6%, rgba(37, 99, 235, 0.42) 0%, rgba(29, 78, 216, 0.16) 45%, rgba(29, 78, 216, 0) 72%),
            radial-gradient(circle 560px at 3% 78%, rgba(96, 165, 250, 0.24) 0%, rgba(47, 98, 184, 0.09) 45%, rgba(47, 98, 184, 0) 72%),
            linear-gradient(180deg, #0A1A38 0%, #08142A 55%, #050B17 100%) !important;
        }
        .ha-protocol-sec::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.028) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.028) 1px, transparent 1px);
          background-size: 60px 60px;
          background-position: center top;
          -webkit-mask-image: radial-gradient(ellipse 85% 75% at 50% 42%, #000 25%, transparent 100%);
          mask-image: radial-gradient(ellipse 85% 75% at 50% 42%, #000 25%, transparent 100%);
        }
        @media (max-width: 768px) {
          .ha-protocol-eyebrow .hidden-mobile,
          .ha-protocol-eyebrow span.hidden-mobile {
            display: none !important;
          }
          .ha-protocol-eyebrow .only-mobile,
          .ha-protocol-eyebrow span.only-mobile {
            display: inline !important;
          }
        }
        .ha-hero-h1,
        .ha-split-hero-h1 {
          color: #FFFFFF !important;
        }
        .ha-page .ha-hero-sec {
          min-height: 100vh !important;
          min-height: 100svh !important;
          padding: 120px 0 150px !important;
          display: flex !important;
          flex-direction: column !important;
          justify-content: center !important;
          box-sizing: border-box !important;
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
        @media (max-width: 860px) {
          .ha-reviews-cta {
            flex-direction: column !important;
            align-items: stretch !important;
            text-align: center !important;
            padding: 28px 22px !important;
            gap: 20px !important;
          }
          .ha-reviews-cta-btn {
            width: 100% !important;
            box-sizing: border-box !important;
          }
        }
        .ha-founder-photo {
          position: relative;
        }
        /* soft offset frame behind the portrait */
        .ha-founder-photo::before {
          content: "";
          position: absolute;
          inset: 16px -16px -16px 16px;
          border: 1.5px solid #BFDBFE;
          border-radius: 26px;
          background: linear-gradient(135deg, rgba(219, 234, 254, 0.55) 0%, rgba(239, 246, 255, 0) 70%);
          z-index: 0;
        }
        .ha-founder-card {
          position: relative !important;
          z-index: 1;
          display: block !important;
          width: 100% !important;
          max-width: none !important;
          aspect-ratio: 4 / 5;
          padding: 0 !important;
          border: 0 !important;
          border-radius: 24px !important;
          overflow: hidden !important;
          background: #0A1A38 !important;
          box-shadow: 0 34px 70px -24px rgba(8, 20, 42, 0.45) !important;
        }
        .ha-founder-img-wrap {
          position: absolute !important;
          inset: 0;
          width: 100% !important;
          height: 100% !important;
          margin: 0 !important;
          border-radius: 0 !important;
        }
        .ha-founder-meta {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          padding: 80px 24px 22px;
          text-align: left;
          background: linear-gradient(180deg, rgba(5, 11, 23, 0) 0%, rgba(5, 11, 23, 0.55) 45%, rgba(5, 11, 23, 0.92) 100%);
        }
        .ha-founder-meta b {
          color: #FFFFFF !important;
          font-size: 26px !important;
          letter-spacing: -0.01em;
        }
        .ha-founder-meta span {
          color: #CBD5E1 !important;
          font-size: 14px !important;
          margin-top: 4px !important;
        }
        @media (min-width: 1025px) {
          .ha-recruiter-sec {
            padding: 112px 0 120px !important;
          }
          .ha-recruiter-split {
            grid-template-columns: minmax(0, 420px) minmax(0, 1fr);
            gap: 76px;
            align-items: center;
          }
          .ha-founder-right h2 {
            font-size: clamp(34px, 3.8vw, 48px) !important;
            line-height: 1.1;
            letter-spacing: -0.02em;
          }
          .ha-founder-right h2 + p {
            font-size: 16px !important;
            margin-bottom: 28px !important;
          }
          .ha-founder-copy {
            font-size: 16.5px !important;
            line-height: 1.7 !important;
            gap: 16px !important;
            margin-bottom: 32px !important;
          }
          .ha-founder-copy b {
            color: #08142A;
          }
          .ha-founder-stats {
            padding: 24px 8px !important;
            gap: 0 !important;
            margin-bottom: 28px !important;
            border-radius: 16px !important;
            box-shadow: 0 10px 30px rgba(15, 23, 42, 0.05);
          }
          .ha-founder-stats > div {
            padding: 0 24px;
          }
          .ha-founder-stats > div + div {
            border-left: 1px solid #E2E8F0;
          }
          .ha-founder-stats > div > div:first-child {
            font-size: 34px !important;
            line-height: 1.1;
            margin-bottom: 4px;
          }
          .ha-founder-stats > div > div:last-child {
            font-size: 13px !important;
          }
          .ha-founder-quote-right {
            display: none !important;
          }
          .ha-founder-quote-left {
            display: block !important;
            background: #FFFFFF;
            border-left: 4px solid #1D4ED8;
            color: #08142A;
            font-style: italic;
            margin: 44px 0 0 !important;
            text-align: left;
            font-family: var(--display);
            font-size: 19px !important;
            line-height: 1.5;
            padding: 20px 24px !important;
            border-left-width: 4px !important;
            border-radius: 0 14px 14px 0 !important;
            box-shadow: 0 8px 24px rgba(15, 23, 42, 0.05);
          }
          .ha-founder-btn-group a {
            padding: 16px 32px !important;
            font-size: 15.5px !important;
            border-radius: 10px !important;
          }
        }
        @media (max-width: 1024px) {
          .ha-founder-photo {
            max-width: 420px;
            margin: 0 auto;
          }
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
            margin: 0 auto 20px !important;
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
          .hidden-mobile,
          .ha-page span.hidden-mobile,
          .ha-page br.hidden-mobile {
            display: none !important;
          }
          .ha-terms-sec {
            padding: 44px 0 52px !important;
          }
          .ha-terms-inner-wrap {
            padding: 0 14px !important;
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
            padding: 15px 12px 14px !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: flex-start !important;
            align-items: center !important;
            text-align: center !important;
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
            font-size: 9.5px !important;
            letter-spacing: 0.08em !important;
            margin-bottom: 4px !important;
            color: #64748B !important;
            font-weight: 700 !important;
            text-transform: uppercase !important;
            text-align: center !important;
            width: 100% !important;
          }
          .ha-term-val {
            font-size: 24px !important;
            line-height: 1.15 !important;
            font-weight: 600 !important;
            margin-bottom: 4px !important;
            text-align: center !important;
            width: 100% !important;
          }
          .ha-term-sub {
            font-size: 11px !important;
            line-height: 1.35 !important;
            margin-top: 0 !important;
            color: #64748B !important;
            text-align: center !important;
            width: 100% !important;
          }
          .ha-page .ha-hero-sec {
            padding: 96px 0 124px !important;
            min-height: 100svh !important;
          }
          .ha-hero-wrap {
            padding: 24px 16px !important;
          }
          .ha-hero-eyebrow {
            font-size: 11px !important;
            letter-spacing: 0.05em !important;
            padding: 6px 16px !important;
            gap: 6px !important;
            margin-bottom: 14px !important;
            white-space: normal !important;
            text-align: center !important;
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
            background-image:
              radial-gradient(circle 380px at 100% 4%, rgba(37, 99, 235, 0.24) 0%, rgba(29, 78, 216, 0.08) 50%, rgba(29, 78, 216, 0) 75%),
              radial-gradient(circle 340px at 0% 80%, rgba(96, 165, 250, 0.12) 0%, rgba(47, 98, 184, 0.04) 50%, rgba(47, 98, 184, 0) 75%),
              linear-gradient(180deg, #08142A 0%, #060E1F 55%, #040913 100%) !important;
            padding: 48px 0 56px !important;
          }
          .ha-protocol-sec::before { background-size: 44px 44px; }
          .ha-protocol-eyebrow {
            background: rgba(30, 58, 138, 0.35) !important;
            border: 1px solid rgba(96, 165, 250, 0.35) !important;
            color: #BFDBFE !important;
            padding: 4px 12px !important;
            font-size: 9.5px !important;
            letter-spacing: 0.08em !important;
            margin-bottom: 14px !important;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2) !important;
            white-space: nowrap !important;
            max-width: calc(100vw - 32px) !important;
            box-sizing: border-box !important;
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
          .ha-founder-photo::before {
            inset: 10px -10px -10px 10px;
            border-radius: 22px;
          }
          .ha-founder-card {
            border-radius: 20px !important;
          }
          .ha-founder-meta {
            padding: 64px 20px 18px;
          }
          .ha-founder-meta b {
            font-size: 22px !important;
          }
          .ha-founder-meta span {
            font-size: 13px !important;
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
        .ha-eb-short { display: none; }
        .ha-hero-lead .ha-hl {
          color: #FFFFFF;
          font-weight: 600;
          background: linear-gradient(transparent 58%, rgba(96, 165, 250, 0.38) 58%);
          padding: 0 2px;
          white-space: nowrap;
          -webkit-box-decoration-break: clone;
          box-decoration-break: clone;
        }
        @media (max-width: 640px) {
          /* hero, phones */
          .ha-page .ha-hero-trust-bar {
            justify-content: center !important;
            align-self: stretch !important;
            width: 100% !important;
            margin: 0 auto !important;
          }
          /* highlights flow inline inside the paragraph instead of jumping to the next line */
          .ha-page .ha-hero-lead .ha-hl {
            white-space: normal !important;
          }
          /* bigger submit CTA */
          .ha-page .ha-hero-mobile-cta {
            width: 100% !important;
            max-width: 95vw !important;
            margin: 24px auto 0 !important;
          }
          .ha-page .ha-hero-mobile-cta a {
            width: 100% !important;
            max-width: 100% !important;
            padding: 18px 16px !important;
            font-size: 17px !important;
            line-height: 1.25 !important;
            border-radius: 12px !important;
            font-weight: 600 !important;
            box-sizing: border-box !important;
            white-space: normal !important;
            text-align: center !important;
          }
          .ha-page .ha-hero-h1,
          .ha-page .ha-split-hero-h1 {
            font-size: 50px !important;
            line-height: 1.1 !important;
            text-align: center !important;
            align-self: stretch !important;
            width: 100% !important;
            max-width: none !important;
            margin: 0 auto 14px !important;
          }
          .ha-page .ha-hero-lead {
            font-size: 18px !important;
            line-height: 1.6 !important;
            text-align: center !important;
            align-self: stretch !important;
            width: 100% !important;
            max-width: none !important;
            margin: 0 0 20px !important;
          }
          .ha-page .ha-gword { display: none; }
          .ha-page .ha-hero-eyebrow {
            align-self: center !important;
            margin: 0 auto 14px !important;
          }
          .ha-page .ha-eb-long { display: none !important; }
          .ha-page .ha-eb-short { display: inline !important; }
          .ha-page .ha-hero-guarantees { display: none !important; }
          .ha-page .ha-hero-points-sm {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 9px;
            align-self: stretch;
            width: 100%;
            margin: 0 0 20px;
            text-align: left;
            font-size: 13px;
            line-height: 1.4;
            color: #CBD5E1;
          }
          .ha-page .ha-hero-point {
            display: flex;
            align-items: flex-start;
            gap: 8px;
          }
          .ha-page .ha-hero-point > span:first-child {
            color: #60A5FA;
            font-weight: 700;
            flex-shrink: 0;
          }
          .ha-page .ha-hero-google-pill .gmark {
            width: 14px !important;
            height: 14px !important;
          }
        }
        @media (max-width: 640px) {
          /* header: no CTA on phones (sticky bottom button replaces it) */
          .site-header .ha-nav-cta { display: none !important; }
          /* room for the sticky bar */
          .ha-page { padding-bottom: 76px; }

          /* terms cards: 4 rows, one card per row */
          .ha-terms-inner-wrap { margin-top: 0 !important; }
          .ha-terms-grid {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
            background: transparent !important;
            border: 0 !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            overflow: visible !important;
          }
          .ha-term-card {
            background: #FFFFFF !important;
            border: 1.5px solid #BFDBFE !important;
            border-radius: 14px !important;
            box-shadow: 0 6px 18px rgba(29, 78, 216, 0.07) !important;
            padding: 16px 18px !important;
            text-align: center !important;
            align-items: flex-start !important;
          }
          .ha-term-card:nth-child(n) {
            border: 1.5px solid #BFDBFE !important;
          }
          .ha-term-label {
            font-size: 10.5px !important;
            letter-spacing: 0.07em !important;
            min-height: 0 !important;
            margin-bottom: 4px !important;
            text-align: center !important;
            width: auto !important;
          }
          .ha-term-val {
            font-size: 28px !important;
            margin-bottom: 4px !important;
            text-align: center !important;
            width: auto !important;
          }
          .ha-term-sub {
            font-size: 13px !important;
            line-height: 1.45 !important;
            text-align: center !important;
            width: auto !important;
          }

          /* section headings */
          .ha-protocol-sec .ha-section-h2 { font-size: 30px !important; }
          .ha-reviews-sec .ha-section-h2 { font-size: 32px !important; }
          .ha-founder-mobile-header h2 { font-size: 32px !important; }
          .ha-founder-mobile-header p { font-style: italic; }

          /* founder: photo spacing, no CTA */
          .ha-founder-photo { margin-bottom: 28px; }
          .ha-founder-btn-group { display: none !important; }
        }
        @media (min-width: 425px) and (max-width: 640px) {
          /* hero text sizes, large phones only */
          .ha-page .ha-hero-h1,
          .ha-page .ha-split-hero-h1 {
            font-size: 50px !important;
          }
          .ha-page .ha-hero-lead {
            font-size: 18px !important;
          }
          .ha-page .ha-hero-points-sm {
            font-size: 14px !important;
          }
        }
        @media (max-width: 424px) {
          /* smaller Google rating badge, small phones only */
          .ha-page .ha-hero-google-pill {
            padding: 6px 12px !important;
            gap: 7px !important;
            font-size: 12px !important;
            border-radius: 9px !important;
          }
          .ha-page .ha-hero-google-pill .gmark {
            width: 13px !important;
            height: 13px !important;
          }
          .ha-page .ha-hero-google-pill > span:nth-child(2) {
            font-size: 11.5px !important;
            letter-spacing: 1px !important;
          }
          .ha-page .ha-hero-google-pill > span:nth-child(3) {
            height: 12px !important;
          }
        }
      `}</style>

      {/* 1. LUXURY SPLIT DARK HERO WITH VIDEO BACKGROUND & LEAD CAPTURE FORM */}
      <section
        className="ha-hero-sec"
        style={{
          position: "relative",
          background: "#08142A",
          color: "#FFFFFF",
          padding: "96px 0 96px",
          minHeight: "100svh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          overflow: "hidden",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
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
                <span className="ha-eb-long">PAY ONLY IF YOU HIRE</span>
                <span className="ha-eb-short">PAY ONLY IF YOU HIRE</span>
              </div>

              {/* Display Heading */}
              <h1
                className="ha-hero-h1 ha-split-hero-h1"
                style={{
                  fontSize: "clamp(42px, 5vw, 64px)",
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
                  fontSize: "clamp(18px, 1.9vw, 21px)",
                  lineHeight: 1.7,
                  color: "rgba(255, 255, 255, 0.88)",
                  maxWidth: 700,
                  margin: "0 0 26px",
                  textAlign: "left",
                  textShadow: "0 1px 8px rgba(0, 0, 0, 0.4)",
                }}
              >
                Matched to your practice and delivered in <b className="ha-hl">48–72 hours</b>.{" "}
                <b className="ha-hl">Pay nothing until you hire</b>: no retainer, no exclusivity, and a{" "}
                <b className="ha-hl">90-day replacement guarantee</b>.
              </p>

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
                  <GMark />
                  <span style={{ color: "#FBBF24", fontSize: 14, letterSpacing: 1.5, textShadow: "0 0 8px rgba(251, 191, 36, 0.35)" }}>
                    ★★★★★
                  </span>
                  <span style={{ width: 1, height: 14, background: "rgba(255, 255, 255, 0.25)" }} />
                  <span style={{ color: "#FFFFFF" }}>
                    <strong style={{ color: "#FFFFFF", fontWeight: 600 }}>5.0 <span className="ha-gword">Google </span>Rating</strong>
                    <span style={{ color: "rgba(255, 255, 255, 0.72)" }}> · 60+ reviews</span>
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
                    marginTop: "1rem"
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

        {/* Terms ticker: part of the hero, shares its background */}
        <TermsTicker />
      </section>

      {/* 3. CLIENT RESULTS / FIRMS WE'VE HELPED HIRE (LIGHT LUXURY EDITORIAL SOCIAL PROOF) */}
      <section
        className="ha-reviews-sec"
        style={{
          position: "relative",
          background: "#FFFFFF",
          color: "#08142A",
          padding: "96px 0 108px",
          borderBottom: "1px solid #EAE7DC",
        }}
      >
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
          {/* Section Header */}
          <div style={{ textAlign: "center", maxWidth: 780, margin: "0 auto 48px" }}>
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
              Direct feedback from managing partners and firm administrators who rely on Orion for lateral attorney placements.
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
              </div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                <span style={{ color: "#F59E0B", fontSize: 14 }}>★★★★★</span>
                <b style={{ color: "#08142A", fontSize: 13.5 }}>5.0 Rating</b>
                <span className="hidden-mobile" style={{ color: "#64748B", fontSize: 12.5 }}>(60+ Google reviews)</span>
                <span className="only-mobile" style={{ color: "#64748B", fontSize: 12 }}>(60+ reviews)</span>
              </div>
            </div>
          </div>

          {/* Three employer reviews */}
          <ReviewCards />
        </div>
      </section>

      {/* 4. THE CONTINGENCY PROTOCOL (EXECUTIVE LUXURY DARK MIDNIGHT ARCHITECTURE) */}
      <section
        className="ha-protocol-sec"
        style={{
          position: "relative",
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
              We deliver screened, bar-admitted attorney dossiers directly to your inbox. You interview the candidates you choose — a fee is payable only when your chosen candidate starts.
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
                <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginBottom: 22 }}>
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
                <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginBottom: 22 }}>                  
                  <span style={{ fontFamily: "var(--mono)", fontSize: 12, color: "#64748B" }}>02 / 03</span>
                </div>

                <div style={{ marginBottom: 18 }}>
                  <div style={{ fontFamily: "var(--display)", fontSize: 46, fontWeight: 600, color: "#FFF", lineHeight: 1 }}>
                    3–5
                  </div>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "#93C5FD", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700, marginTop: 6 }}>
                    Screened finalists delivered per seat
                  </div>
                </div>

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
                <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginBottom: 22 }}>                 
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
              background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 55%, #1E3A8A 100%)",
              border: "1px solid rgba(147, 197, 253, 0.45)",
              borderRadius: 16,
              padding: "36px 40px",
              color: "#FFFFFF",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 24,
              boxShadow: "0 18px 44px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.18)",
            }}
          >
            <div>
              <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "#DBEAFE", textTransform: "uppercase", letterSpacing: "0.10em", fontWeight: 700, marginBottom: 6 }}>
                READY TO REVIEW CANDIDATES?
              </div>
              <h3 style={{ fontFamily: "var(--display)", fontSize: 24, fontWeight: 500, margin: "0 0 6px", color: "#FFFFFF" }}>
                Receive screened attorney dossiers for your seat.
              </h3>
              <p style={{ color: "#DBEAFE", fontSize: 14, margin: 0 }}>
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
                  background: "#FFFFFF",
                  color: "#1D4ED8",
                  fontWeight: 600,
                  fontSize: 14.5,
                  padding: "13px 26px",
                  borderRadius: 7,
                  textDecoration: "none",
                  boxShadow: "0 6px 18px rgba(8, 20, 42, 0.30)",
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
            <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(26px, 7vw, 32px)", color: "#08142A", margin: "0 0 6px", fontWeight: 500, lineHeight: 1.2 }}>
              Hi, I&apos;m <span className="serif-accent" style={{ fontStyle: "italic", color: "#1D4ED8" }}>Justin Sofman.</span>
            </h2>

            <p style={{ fontSize: 14, color: "#64748B", margin: "0 0 4px", fontStyle: "italic" }}>
              Co-Founder &amp; Managing Partner, Orion Placement
            </p>
          </div>

          <div className="ha-recruiter-split">
            {/* Left Column: Executive Portrait Card */}
            <div className="ha-founder-left" style={{ textAlign: "center" }}>
              <div className="ha-founder-photo">
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
                    src="/justin-sofman.png"
                    alt="Justin Sofman"
                    fill
                    style={{ objectFit: "cover" }}
                    priority
                  />
                </div>
                <div className="ha-founder-meta">
                  <b style={{ display: "block", fontSize: 20, color: "#08142A", fontWeight: 600, fontFamily: "var(--display)" }}>Justin Sofman</b>
                  <span style={{ fontSize: 13, color: "#64748B", display: "block", marginTop: 2 }}>Co-Founder &amp; Managing Partner</span>
                </div>
              </div>
              </div>

              {/* Desktop-only quote, sits under the photo (mobile keeps it in the right column) */}
              <div className="ha-founder-quote ha-founder-quote-left" style={{fontSize:"16px !important"}}>
                &ldquo;I only get paid when you find the right attorney, so I&apos;m 100% invested in sending people actually worth your time.&rdquo;
              </div>
            </div>

            {/* Right Column: Recruiter Content */}
            <div className="ha-founder-right">
              {/* Desktop-Only Heading (Shows alongside photo on desktop) */}
              <div className="hidden-mobile">
                <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(28px, 3.6vw, 42px)", color: "#08142A", margin: "0 0 6px", fontWeight: 500 }}>
                  Hi, I&apos;m <span className="serif-accent" style={{ fontStyle: "italic", color: "#1D4ED8" }}>Justin Sofman.</span>
                </h2>

                <p style={{ fontSize: 15, color: "#64748B", margin: "0 0 20px", fontStyle: "italic" }}>
                  Co-Founder &amp; Managing Partner, Orion Placement
                </p>
              </div>

              <div className="ha-founder-copy" style={{ display: "grid", gap: 14, fontSize: 15, color: "#475569", lineHeight: 1.6, marginBottom: 24 }}>
                <p style={{ margin: 0 }}>
                  I co-founded Orion Placement alongside Jon Missirlian to solve the biggest frustration law firms face: paying huge upfront retainers for resume spammers who have never even spoken to the attorney they&apos;re submitting.
                </p>
                <p style={{ margin: 0 }}>
                  With <b>11 years</b> of recruiting industry experience and Jon&apos;s <b>20 years</b> of talent acquisition expertise, we facilitate over <b>30 hires per month</b> for law firms across Texas and nationwide, backed by an active pool of <b>100,000+ legal professionals</b>.
                </p>
                <p style={{ margin: 0 }}>
                  Before Orion, I spent several years consulting enterprise clients at the world&apos;s largest tech recruiting firm. I bring that same structured process to every new seat, and I hold one value above the rest: doing what we say we&apos;re going to do.
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
                  <div style={{ fontSize: 12, color: "#64748B" }}>Search Experience</div>
                </div>
                <div>
                  <div style={{ fontFamily: "var(--display)", fontSize: 24, fontWeight: 700, color: "#1D4ED8" }}>30+</div>
                  <div style={{ fontSize: 12, color: "#64748B" }}>Monthly Placements</div>
                </div>
                <div>
                  <div style={{ fontFamily: "var(--display)", fontSize: 24, fontWeight: 700, color: "#08142A" }}>100k+</div>
                  <div style={{ fontSize: 12, color: "#64748B" }}>Legal Talent Network</div>
                </div>
              </div>

              <div className="ha-founder-quote ha-founder-quote-right" style={{ background: "#FFFFFF", borderLeft: "3px solid #1D4ED8", padding: "14px 18px", borderRadius: "0 8px 8px 0", fontSize: 14.5, fontStyle: "italic", color: "#08142A", marginBottom: 24 }}>
                &ldquo;I only get paid when you find the right attorney, so I&apos;m 100% invested in sending people actually worth your time.&rdquo;
              </div>

              <div className="ha-founder-btn-group" style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", justifyContent: "center" }}>
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
          background: "#FFFFFF",
          padding: "96px 0 108px",
          textAlign: "center",
          color: "#08142A",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="ha-bottom-cta-wrap" style={{ maxWidth: 780, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
          <h2
            className="ha-bottom-h2"
            style={{
              fontFamily: "var(--display)",
              fontSize: "clamp(32px, 4.2vw, 48px)",
              color: "#08142A",
              margin: "0 0 16px",
              fontWeight: 500,
              lineHeight: 1.15,
            }}
          >
            Ready to receive qualified attorney <span className="serif-accent" style={{ color: "#1D4ED8", fontStyle: "italic" }}>candidates?</span>
          </h2>

          <p className="ha-bottom-sub" style={{ color: "#475569", fontSize: 17, lineHeight: 1.6, marginBottom: 28, maxWidth: 640, margin: "0 auto 28px" }}>
            Sign one simple agreement. Pre-screened attorney dossiers delivered straight to your inbox within 48–72 hours.
            Zero upfront cost — you <b style={{ color: "#1D4ED8", fontWeight: 600 }}>only pay if you hire</b>.
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
              color: "#334155",
              marginBottom: 32,
            }}
          >
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <span style={{ color: "#1D4ED8", fontWeight: 700 }}>✓</span> Zero Upfront Retainer
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <span style={{ color: "#1D4ED8", fontWeight: 700 }}>✓</span> 90-Day Replacement Warranty
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <span style={{ color: "#1D4ED8", fontWeight: 700 }}>✓</span> 48–72h Turnaround
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
                boxShadow: "0 8px 24px rgba(29, 78, 216, 0.32)",
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
      <StickyRequestBar />
    </div>
  );
}
