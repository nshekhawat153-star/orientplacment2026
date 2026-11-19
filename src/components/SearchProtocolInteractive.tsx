"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

interface StepData {
  id: string;
  stepNum: string;
  kicker: string;
  title: React.ReactNode;
  desc: string;
  sla: string;
}

const STEPS: StepData[] = [
  {
    id: "step-1",
    stepNum: "01",
    kicker: "DAY 0 · INTAKE",
    title: (
      <>
        Consultation &amp; <span className="title-blue">Practice Mapping</span>
      </>
    ),
    desc: "A focused 15-minute consultation to map your firm's practice demands, culture, and billable targets.",
    sla: "< 1 Hour Response SLA",
  },
  {
    id: "step-2",
    stepNum: "02",
    kicker: "DAYS 5–7 · SOURCING",
    title: (
      <>
        Direct Sourcing &amp; <span className="title-blue">Screened Shortlist</span>
      </>
    ),
    desc: "Direct headhunting across our 100,000+ passive attorney network with verified compensation expectations.",
    sla: "5–7 Business Days",
  },
  {
    id: "step-3",
    stepNum: "03",
    kicker: "START DATE · TERMS",
    title: (
      <>
        Contingency Hire &amp; <span className="title-blue">90-Day Guarantee</span>
      </>
    ),
    desc: "Interview finalists with zero upfront retainer. Pay standard contingency fee only on start date.",
    sla: "100% Risk-Free · Net 15",
  },
];

export function SearchProtocolInteractive() {
  const [activeStep, setActiveStep] = useState(0);
  const [displayStep, setDisplayStep] = useState(0);
  const [isFading, setIsFading] = useState(false);

  // Exact Sub-Pixel Connecting Cable Coordinates (Guaranteed to touch card borders)
  const [ropeData, setRopeData] = useState<{
    path: string;
    startX: number;
    startY: number;
    endX: number;
    endY: number;
  }>({
    startX: 520,
    startY: 65,
    endX: 574,
    endY: 195,
    path: "M 520 65 C 544 73, 550 187, 574 195",
  });

  const trackRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rightCardRef = useRef<HTMLDivElement | null>(null);

  // Measure exact sub-pixel connection points from active left card to right card center
  const measureRope = useCallback(() => {
    const grid = gridRef.current;
    const activeCard = cardRefs.current[activeStep];
    const rightCard = rightCardRef.current;

    if (!grid || !activeCard || !rightCard) return;

    const gridRect = grid.getBoundingClientRect();
    const cardRect = activeCard.getBoundingClientRect();
    const rightRect = rightCard.getBoundingClientRect();

    if (gridRect.width === 0 || cardRect.height === 0 || rightRect.height === 0) return;

    // Start point: Exactly on the right border of active left card
    const startX = Math.round(cardRect.right - gridRect.left);
    const startY = Math.round(cardRect.top + cardRect.height * 0.5 - gridRect.top);

    // End point: Exactly on the left border of right card (exact vertical center)
    const endX = Math.round(rightRect.left - gridRect.left);
    const endY = Math.round(rightRect.top + rightRect.height * 0.5 - gridRect.top);

    const dx = endX - startX;
    const dy = endY - startY;

    // Natural organic cable drape
    let path = "";
    if (Math.abs(dy) < 30) {
      // Cards level (Step 2): gentle physical gravity sag in the center
      const sag = 15;
      const cp1x = Math.round(startX + dx * 0.35);
      const cp1y = startY + sag;
      const cp2x = Math.round(startX + dx * 0.65);
      const cp2y = endY + sag;
      path = `M ${startX} ${startY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}`;
    } else if (dy > 0) {
      // Top card to center: graceful S-curve down
      const cp1x = Math.round(startX + dx * 0.45);
      const cp1y = startY + 8;
      const cp2x = Math.round(startX + dx * 0.55);
      const cp2y = endY - 8;
      path = `M ${startX} ${startY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}`;
    } else {
      // Bottom card to center: graceful S-curve up
      const cp1x = Math.round(startX + dx * 0.45);
      const cp1y = startY - 8;
      const cp2x = Math.round(startX + dx * 0.55);
      const cp2y = endY + 8;
      path = `M ${startX} ${startY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}`;
    }

    setRopeData((prev) => {
      if (
        prev.startX === startX &&
        prev.startY === startY &&
        prev.endX === endX &&
        prev.endY === endY &&
        prev.path === path
      ) {
        return prev;
      }
      return { path, startX, startY, endX, endY };
    });
  }, [activeStep]);

  // Recalculate on step change, resize, scroll, or layout shift
  useEffect(() => {
    measureRope();
    const raf = requestAnimationFrame(measureRope);
    const t1 = setTimeout(measureRope, 40);
    const t2 = setTimeout(measureRope, 150);

    window.addEventListener("resize", measureRope);
    window.addEventListener("scroll", measureRope, { passive: true });

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => {
        measureRope();
      });
      if (gridRef.current) ro.observe(gridRef.current);
      if (rightCardRef.current) ro.observe(rightCardRef.current);
      cardRefs.current.forEach((el) => {
        if (el && ro) ro.observe(el);
      });
    }

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("resize", measureRope);
      window.removeEventListener("scroll", measureRope);
      if (ro) ro.disconnect();
    };
  }, [measureRope]);

  // Pinned Scroll Track: Section sticks in viewport while user scrolls through the 3 cards
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleScroll = () => {
      if (window.innerWidth <= 960) return;

      const rect = track.getBoundingClientRect();
      const trackHeight = rect.height - window.innerHeight;
      if (trackHeight <= 0) return;

      const scrolled = 76 - rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / trackHeight));

      let step = 0;
      if (progress > 0.64) {
        step = 2;
      } else if (progress > 0.31) {
        step = 1;
      } else {
        step = 0;
      }

      setActiveStep((prev) => (prev !== step ? step : prev));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth Cross-Fade on Step Change
  useEffect(() => {
    if (activeStep === displayStep) return;

    setIsFading(true);
    const timeout = setTimeout(() => {
      setDisplayStep(activeStep);
      setIsFading(false);
    }, 130);

    return () => clearTimeout(timeout);
  }, [activeStep, displayStep]);

  // Click handler: smoothly scrolls page to corresponding point in track & updates step
  const selectStep = useCallback((idx: number) => {
    setActiveStep(idx);
    const track = trackRef.current;
    if (!track) return;

    if (window.innerWidth > 960) {
      const rect = track.getBoundingClientRect();
      const trackTop = window.pageYOffset + rect.top;
      const trackHeight = rect.height - window.innerHeight;
      const stepProgress = idx === 0 ? 0.05 : idx === 1 ? 0.48 : 0.88;
      const targetY = trackTop - 76 + trackHeight * stepProgress;
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  }, []);

  const nextStep = useCallback(() => {
    const nextIdx = (activeStep + 1) % STEPS.length;
    selectStep(nextIdx);
  }, [activeStep, selectStep]);

  const prevStep = useCallback(() => {
    const prevIdx = (activeStep - 1 + STEPS.length) % STEPS.length;
    selectStep(prevIdx);
  }, [activeStep, selectStep]);

  return (
    <section
      className="how-it-works-sec light-editorial-sec protocol-scroll-track"
      ref={trackRef}
      id="how-it-works"
      aria-labelledby="protocol-h2"
      style={{ backgroundColor: "#FAF9F5" }}
    >
      <style>{`
        /* Embedded Scoped Protocol Styles */
        .protocol-scroll-track {
          position: relative;
          height: 250vh;
          background-color: #FAF9F5 !important;
          border-top: 1px solid #E5E0D5;
          border-bottom: 1px solid #E5E0D5;
        }

        .protocol-pinned-viewport {
          position: sticky;
          top: 76px;
          min-height: calc(100vh - 80px);
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 20px 0 28px;
          background-color: #FAF9F5;
          overflow: hidden;
        }

        /* Ethereal Tech Dot Matrix Background Pattern */
        .protocol-tech-dots {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background-image:
            radial-gradient(rgba(37, 99, 235, 0.11) 1.25px, transparent 1.25px),
            radial-gradient(rgba(15, 23, 42, 0.04) 1px, transparent 1px);
          background-size: 24px 24px, 12px 12px;
          background-position: 0 0, 6px 6px;
          mask-image: radial-gradient(ellipse 90% 80% at 50% 50%, #000 45%, transparent 95%);
          -webkit-mask-image: radial-gradient(ellipse 90% 80% at 50% 50%, #000 45%, transparent 95%);
        }

        .protocol-container {
          width: 100%;
          max-width: 100%;
          margin: 0;
        }

        .protocol-header-group {
          margin-bottom: 24px;
          width: 100%;
        }

        .protocol-heading-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 28px;
          width: 100%;
          flex-wrap: wrap;
        }

        .protocol-heading-row .editorial-desc {
          margin-bottom: 0 !important;
          max-width: 620px;
          font-size: 14.5px !important;
          line-height: 1.5 !important;
        }

        .protocol-head-action {
          flex-shrink: 0;
          margin-bottom: 4px;
        }

        /* 2-Column Full-Width Grid: Left Cards Flushed Left, Right Card Flushed Right */
        .protocol-interactive-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1.08fr);
          gap: 52px;
          align-items: center;
          position: relative;
          width: 100%;
        }

        /* Full-Grid SVG Cable Overlay (Directly touches card borders) */
        .protocol-rope-svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 10;
          overflow: visible !important;
        }

        .protocol-rope-shadow {
          display: none;
        }

        .protocol-rope-path {
          fill: none;
          stroke: #2563EB;
          stroke-width: 2px;
          stroke-linecap: round;
          opacity: 0.65;
          filter: none;
          transition: d 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .protocol-rope-node {
          fill: #2563EB;
          stroke: #FFFFFF;
          stroke-width: 1.5px;
          opacity: 0.75;
          filter: none;
          transition: cx 0.3s cubic-bezier(0.16, 1, 0.3, 1), cy 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Left Column: Generous, Crisp Cards Flushed with Heading */
        .protocol-steps-scroll-col {
          display: flex;
          flex-direction: column;
          gap: 14px;
          width: 100%;
          position: relative;
        }

        .protocol-step-card {
          display: flex;
          align-items: flex-start;
          gap: 18px;
          background: #FFFFFF;
          border: 1.5px solid #BFDBFE;
          border-radius: 14px;
          padding: 22px 24px 20px;
          text-align: left;
          cursor: pointer;
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
          width: 100%;
          position: relative;
          box-shadow: 0 2px 6px rgba(15, 23, 42, 0.02);
        }

        .protocol-step-card:hover {
          border-color: #93C5FD;
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(15, 23, 42, 0.04);
        }

        .protocol-step-card.active {
          border-color: #2563EB !important;
          background: linear-gradient(135deg, #FFFFFF 0%, #F8FAFF 100%) !important;
          box-shadow: 0 10px 24px rgba(37, 99, 235, 0.09), 0 2px 5px rgba(0, 0, 0, 0.02) !important;
        }

        .protocol-step-indicator {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          padding-top: 2px;
          flex-shrink: 0;
        }

        .protocol-step-number {
          font: 700 12px/1 var(--mono);
          color: #64748B;
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: #F8FAFC;
          border: 1px solid #BFDBFE;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .protocol-step-card.active .protocol-step-number {
          background: #2563EB !important;
          color: #FFFFFF !important;
          border-color: #2563EB !important;
          box-shadow: none !important;
        }

        .protocol-step-line {
          width: 2px;
          height: 48px;
          background: #DBEAFE;
          border-radius: 2px;
          transition: background 0.2s ease;
        }

        .protocol-step-card.active .protocol-step-line {
          background: #93C5FD;
        }

        .protocol-step-body {
          flex: 1;
          min-width: 0;
        }

        .protocol-step-kicker-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          margin-bottom: 8px;
        }

        .protocol-step-kicker {
          font: 600 10px/1 var(--mono);
          color: #64748B;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .protocol-step-card.active .protocol-step-kicker {
          color: #2563EB;
          font-weight: 700;
        }

        .protocol-live-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font: 700 9px/1 var(--mono);
          color: #1D4ED8;
          background: #EFF6FF;
          border: 1px solid #BFDBFE;
          border-radius: 999px;
          padding: 2.5px 7px;
          letter-spacing: 0.06em;
        }

        .protocol-live-badge-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #2563EB;
          box-shadow: 0 0 6px #2563EB;
          animation: badgePulse 2s infinite ease-in-out;
        }

        @keyframes badgePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.45; transform: scale(0.85); }
        }

        .protocol-step-title {
          font-family: var(--body), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
          font-size: 18px !important;
          font-weight: 600 !important;
          color: #0A1629 !important;
          line-height: 1.35 !important;
          letter-spacing: -0.015em !important;
          margin: 0 0 8px !important;
          transition: color 0.2s ease;
        }

        .title-blue {
          color: #1D4ED8 !important;
          font-weight: 600 !important;
        }

        .protocol-step-text {
          font-size: 13.5px !important;
          line-height: 1.55 !important;
          color: #475569 !important;
          margin: 0 0 14px !important;
          font-weight: 400 !important;
        }

        .protocol-step-sla-pill {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font: 600 11px/1 var(--mono);
          color: #475569;
          background: #F1F5F9;
          border: 1px solid #E2E8F0;
          border-radius: 6px;
          padding: 4px 9px;
          letter-spacing: 0.02em;
        }

        .protocol-step-card.active .protocol-step-sla-pill {
          background: #EFF6FF;
          border-color: #BFDBFE;
          color: #1D4ED8;
        }

        /* Right Column: Flushed with CTA Button Right Edge */
        .protocol-stage-column {
          display: flex;
          flex-direction: column;
          align-self: center;
          width: 100%;
        }

        .protocol-stage-card-clean {
          display: flex;
          flex-direction: column;
          background: #FFFFFF !important;
          border: 1.5px solid #BFDBFE !important;
          border-radius: 14px !important;
          box-shadow: 0 16px 36px rgba(15, 23, 42, 0.06), 0 2px 8px rgba(0, 0, 0, 0.02) !important;
          overflow: hidden !important;
          width: 100% !important;
          position: relative;
        }

        .protocol-stage-clean-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 11px 18px;
          background: #08142A !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .protocol-stage-clean-meta {
          display: inline-flex;
          align-items: center;
          gap: 7px;
        }

        .clean-dot-pulse {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #3B82F6;
          box-shadow: 0 0 8px #3B82F6;
        }

        .clean-meta-title {
          font: 600 9.5px/1 var(--mono);
          color: #E2E8F0;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .protocol-stage-clean-controls {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .protocol-clean-pills {
          display: inline-flex;
          gap: 3px;
        }

        .clean-pill-btn {
          font: 600 9.5px/1 var(--mono);
          padding: 3px 7px;
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #94A3B8;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s ease;
        }

        .clean-pill-btn:hover {
          background: rgba(255, 255, 255, 0.18);
          color: #FFFFFF;
        }

        .clean-pill-btn.active {
          background: #2563EB !important;
          color: #FFFFFF !important;
          border-color: #2563EB !important;
        }

        .protocol-clean-arrows {
          display: inline-flex;
          gap: 3px;
        }

        .clean-arrow-btn {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #FFFFFF;
          border-radius: 4px;
          width: 20px;
          height: 20px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 10px;
          transition: all 0.15s ease;
        }

        .clean-arrow-btn:hover {
          background: rgba(255, 255, 255, 0.22);
          color: #FFFFFF;
        }

        /* Right Card Inner Content Area */
        .protocol-card-anim-stage {
          padding: 24px 28px 22px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          background: #FFFFFF !important;
        }

        .protocol-clean-card-body {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 0.13s cubic-bezier(0.16, 1, 0.3, 1), transform 0.13s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity, transform;
          display: flex;
          flex-direction: column;
        }

        .protocol-clean-card-body.card-fading {
          opacity: 0 !important;
          transform: translateY(-4px) !important;
        }

        .protocol-view-content {
          display: flex;
          flex-direction: column;
        }

        /* Header Row */
        .clean-card-head-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 12px;
        }

        .clean-card-kicker {
          font: 600 9px/1 var(--mono);
          color: #2563EB !important;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          display: block;
          margin-bottom: 5px;
        }

        .clean-card-title {
          font-family: var(--body), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
          font-size: 20px !important;
          font-weight: 600 !important;
          color: #0F172A !important;
          line-height: 1.3 !important;
          letter-spacing: -0.015em !important;
          margin: 0 0 4px !important;
        }

        .clean-card-subtitle {
          font-size: 13px !important;
          color: #64748B !important;
          font-weight: 400 !important;
          margin: 0 !important;
        }

        .clean-sla-pill {
          font: 700 8.5px/1 var(--mono);
          padding: 3.5px 8px;
          border-radius: 999px;
          background: #EFF6FF !important;
          border: 1px solid #BFDBFE !important;
          color: #1D4ED8 !important;
          flex-shrink: 0;
          letter-spacing: 0.04em;
        }

        .clean-sla-pill.green {
          background: #F0FDF4 !important;
          border-color: #BBF7D0 !important;
          color: #15803D !important;
        }

        .clean-sla-pill.blue {
          background: #EFF6FF !important;
          border-color: #BFDBFE !important;
          color: #1D4ED8 !important;
        }

        /* Clean Minimal Spec Chips Row */
        .clean-chips-row {
          display: flex;
          gap: 6px;
          margin: 9px 0 12px;
          flex-wrap: wrap;
        }

        .clean-spec-chip {
          font-size: 11px;
          font-weight: 500;
          color: #334155;
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 6px;
          padding: 4px 8.5px;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        .clean-spec-chip.featured {
          background: #EFF6FF;
          border-color: #BFDBFE;
          color: #1D4ED8;
          font-weight: 600;
        }

        /* Executive Note Callout */
        .clean-highlight-box {
          background: #F8FAFC !important;
          border: 1px solid #E2E8F0 !important;
          border-radius: 7px !important;
          padding: 10px 13px;
          display: flex;
          align-items: flex-start;
          gap: 9px;
          margin-bottom: 13px;
        }

        .clean-highlight-box.quote {
          border-left: 3px solid #16A34A !important;
          background: #F0FDF4 !important;
          border-color: #DCFCE7 !important;
        }

        .clean-highlight-box.mandate {
          border-left: 3px solid #2563EB !important;
        }

        .clean-highlight-box.terms {
          border-left: 3px solid #1D4ED8 !important;
        }

        .clean-box-icon {
          font-size: 12px;
          flex-shrink: 0;
          margin-top: 1px;
        }

        .clean-box-text {
          font-size: 12px !important;
          line-height: 1.45 !important;
          color: #334155 !important;
          margin: 0 !important;
          font-weight: 400 !important;
        }

        /* Bottom Live Status Line */
        .clean-card-bottom-line {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          font-size: 11px;
          color: #64748B !important;
          padding-top: 10px;
          border-top: 1px solid #F1F5F9 !important;
          margin-top: auto;
        }

        .clean-bottom-left {
          display: inline-flex;
          align-items: center;
          gap: 5px;
        }

        .clean-status-dot {
          width: 5.5px;
          height: 5.5px;
          border-radius: 50%;
          background: #2563EB;
          flex-shrink: 0;
        }

        .clean-status-dot.green { 
          background: #16A34A !important; 
          box-shadow: 0 0 5px rgba(22, 163, 74, 0.4);
        }

        .clean-status-dot.blue { 
          background: #2563EB !important; 
          box-shadow: 0 0 5px rgba(37, 99, 235, 0.4);
        }

        .clean-bottom-sla {
          font: 600 10px/1 var(--mono);
          color: #94A3B8 !important;
          letter-spacing: 0.04em;
        }

        /* Responsive Media Queries */
        @media (max-width: 960px) {
          .protocol-scroll-track {
            height: auto !important;
          }

          .protocol-pinned-viewport {
            position: static !important;
            min-height: auto !important;
            padding: 40px 0 !important;
          }

          .protocol-interactive-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .protocol-rope-svg {
            display: none !important;
          }

          .protocol-steps-scroll-col {
            max-width: 100%;
          }

          .protocol-stage-column {
            position: static;
            max-width: 100%;
          }

          .protocol-step-card {
            padding: 15px 18px;
          }

          .protocol-heading-row {
            flex-direction: column;
            align-items: flex-start;
          }
        }

        @media (max-width: 640px) {
          .protocol-card-anim-stage {
            padding: 14px;
          }

          .protocol-step-line {
            display: none;
          }
        }
      `}</style>

      {/* Pinned Viewport Container */}
      <div className="protocol-pinned-viewport">
        {/* Subtle Ethereal Tech Dot Grid Pattern */}
        <div className="protocol-tech-dots" aria-hidden="true" />
        <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
          <div className="protocol-container">
            {/* Section Header */}
            <div className="protocol-header-group">
              <div className="editorial-pill">
                <span className="editorial-pill-dot" />
                <span>HOW A SEARCH RUNS</span>
              </div>

              <div className="protocol-heading-row">
                <div>
                  <h2 id="protocol-h2" className="editorial-h2">
                    Built for precision,{" "}
                    <span className="serif-accent">run for speed.</span>
                  </h2>
                  <p className="editorial-desc">
                    Every search follows a disciplined, three-step hiring protocol. Zero upfront retainer, non-exclusive search, and you only pay when your candidate starts.
                  </p>
                </div>

                <div className="protocol-head-action">
                  <Link href="/find-candidates" className="btn-editorial-cta">
                    <span>See candidates for your seat</span>
                    <svg aria-hidden="true" viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
                      <path d="M10.3 3.3a1 1 0 0 1 1.4 0l6 6a1 1 0 0 1 0 1.4l-6 6a1 1 0 1 1-1.4-1.4l4.3-4.3H3a1 1 0 1 1 0-2h11.6l-4.3-4.3a1 1 0 0 1 0-1.4Z" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* 2-Column Full-Width Grid */}
            <div className="protocol-interactive-grid" ref={gridRef}>
              {/* Dynamic SVG Organic Cable (Directly touches card borders with 0px gap) */}
              {ropeData && (
                <svg className="protocol-rope-svg" aria-hidden="true">
                  {/* Soft depth shadow behind cable */}
                  <path d={ropeData.path} className="protocol-rope-shadow" />
                  {/* Main Royal Blue Cable with Organic Drape */}
                  <path d={ropeData.path} className="protocol-rope-path" />
                  {/* Start Hardware Anchor Pin touching Left Card Border */}
                  <circle
                    cx={ropeData.startX}
                    cy={ropeData.startY}
                    r="4"
                    className="protocol-rope-node"
                  />
                  {/* End Hardware Anchor Pin touching Right Card Border (Exact Center) */}
                  <circle
                    cx={ropeData.endX}
                    cy={ropeData.endY}
                    r="4"
                    className="protocol-rope-node"
                  />
                </svg>
              )}

              {/* Left Column: Generous, Crisp Cards Flushed with Heading */}
              <div className="protocol-steps-scroll-col" role="tablist" aria-label="Hiring protocol steps">
                {STEPS.map((step, idx) => {
                  const isActive = activeStep === idx;
                  return (
                    <div
                      key={step.id}
                      ref={(el) => { cardRefs.current[idx] = el; }}
                      role="tab"
                      id={`step-tab-${idx}`}
                      aria-selected={isActive}
                      aria-controls={`step-panel-${idx}`}
                      onClick={() => selectStep(idx)}
                      className={`protocol-step-card ${isActive ? "active" : ""}`}
                    >
                      {/* Step Number & Connector Line */}
                      <div className="protocol-step-indicator">
                        <span className="protocol-step-number">{step.stepNum}</span>
                        <div className="protocol-step-line" />
                      </div>

                      <div className="protocol-step-body">
                        <div className="protocol-step-kicker-row">
                          <span className="protocol-step-kicker">{step.kicker}</span>
                          {isActive && (
                            <span className="protocol-live-badge">
                              <span className="protocol-live-badge-dot" />
                              ACTIVE
                            </span>
                          )}
                        </div>

                        <h3 className="protocol-step-title">{step.title}</h3>
                        <p className="protocol-step-text">{step.desc}</p>

                        {/* Clean Single Metric / SLA Pill */}
                        <div className="protocol-step-sla-pill">
                          <span>{step.sla}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right Column: Executive Dossier Flushed with CTA Button */}
              <div className="protocol-stage-column">
                <div
                  ref={rightCardRef}
                  className="protocol-stage-card-clean"
                  id={`step-panel-${displayStep}`}
                  role="tabpanel"
                  aria-labelledby={`step-tab-${displayStep}`}
                >
                  {/* Clean Stage Top Bar */}
                  <div className="protocol-stage-clean-top">
                    <div className="protocol-stage-clean-meta">
                      <span className="clean-dot-pulse" />
                      <span className="clean-meta-title">
                        {displayStep === 0 && "STEP 01 · PRACTICE INTAKE MANDATE"}
                        {displayStep === 1 && "STEP 02 · SCREENED CANDIDATE DOSSIER"}
                        {displayStep === 2 && "STEP 03 · CONTINGENCY AGREEMENT"}
                      </span>
                    </div>

                    <div className="protocol-stage-clean-controls">
                      <div className="protocol-clean-pills">
                        {[0, 1, 2].map((i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => selectStep(i)}
                            className={`clean-pill-btn ${activeStep === i ? "active" : ""}`}
                            aria-label={`Jump to step ${i + 1}`}
                          >
                            0{i + 1}
                          </button>
                        ))}
                      </div>

                      <div className="protocol-clean-arrows">
                        <button
                          type="button"
                          onClick={prevStep}
                          className="clean-arrow-btn"
                          aria-label="Previous step"
                        >
                          ←
                        </button>
                        <button
                          type="button"
                          onClick={nextStep}
                          className="clean-arrow-btn"
                          aria-label="Next step"
                        >
                          →
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Animated Dynamic Card Stage with Fade-Out / Fade-In */}
                  <div className="protocol-card-anim-stage">
                    <div className={`protocol-clean-card-body ${isFading ? "card-fading" : ""}`}>
                      {/* STEP 1: INTAKE & PRACTICE MAPPING */}
                      {displayStep === 0 && (
                        <div className="protocol-view-content">
                          <div className="clean-card-head-row">
                            <div>
                              <span className="clean-card-kicker">CALIBRATED PRACTICE MANDATE</span>
                              <h3 className="clean-card-title">Senior <span className="title-blue">Lateral Associate</span> / Counsel</h3>
                              <p className="clean-card-subtitle">Houston Boutique · Estate Planning &amp; Probate</p>
                            </div>
                            <span className="clean-sla-pill">&lt; 1 HOUR SLA</span>
                          </div>

                          <div className="clean-chips-row">
                            <span className="clean-spec-chip">🏛️ Texas Bar (Active)</span>
                            <span className="clean-spec-chip">⏱️ 1,600 Billable Target</span>
                            <span className="clean-spec-chip featured">💼 $185k–$225k Base</span>
                          </div>

                          <div className="clean-highlight-box mandate">
                            <span className="clean-box-icon">⚡</span>
                            <p className="clean-box-text">
                              Justin personally maps practice demands, culture, and billable expectations in a 15-minute call. Outreach across 100,000+ attorney network commences within 60 minutes.
                            </p>
                          </div>

                          <div className="clean-card-bottom-line">
                            <div className="clean-bottom-left">
                              <span className="clean-status-dot blue" />
                              <span>100,000+ Attorney Network Radar Active</span>
                            </div>
                            <span className="clean-bottom-sla">&lt; 1 Hr First Response</span>
                          </div>
                        </div>
                      )}

                      {/* STEP 2: SCREENED SHORTLIST */}
                      {displayStep === 1 && (
                        <div className="protocol-view-content">
                          <div className="clean-card-head-row">
                            <div>
                              <span className="clean-card-kicker">CONFIDENTIAL CANDIDATE DOSSIER</span>
                              <h3 className="clean-card-title">Candidate <span className="title-blue">#TX-EP-0412</span></h3>
                              <p className="clean-card-subtitle">Lateral Associate · Regional Boutique · Houston Metro</p>
                            </div>
                            <span className="clean-sla-pill green">DAY 5 MATCH</span>
                          </div>

                          <div className="clean-chips-row">
                            <span className="clean-spec-chip">🏛️ 6 Yrs HNW Estate Practice</span>
                            <span className="clean-spec-chip">📄 100% Autonomous Drafting</span>
                            <span className="clean-spec-chip featured">✓ Verified $195k Comp</span>
                          </div>

                          <div className="clean-highlight-box quote">
                            <span className="clean-box-icon">💬</span>
                            <p className="clean-box-text">
                              &ldquo;Personally vetted by Justin. Candidate is seeking a 1,600 billable target and clear partnership runway. Culture &amp; technical score: 5/5.&rdquo;
                            </p>
                          </div>

                          <div className="clean-card-bottom-line">
                            <div className="clean-bottom-left">
                              <span className="clean-status-dot green" />
                              <span>Screened Candidate Ready for Partner Interview</span>
                            </div>
                            <span className="clean-bottom-sla">Day 5 Match</span>
                          </div>
                        </div>
                      )}

                      {/* STEP 3: CONTINGENCY TERMS & GUARANTEE */}
                      {displayStep === 2 && (
                        <div className="protocol-view-content">
                          <div className="clean-card-head-row">
                            <div>
                              <span className="clean-card-kicker">RISK-FREE CONTINGENCY TERMS</span>
                              <h3 className="clean-card-title">Pay Only When Your <span className="title-blue">Hire Starts</span></h3>
                              <p className="clean-card-subtitle">Zero upfront retainer · Non-exclusive search agreement</p>
                            </div>
                            <span className="clean-sla-pill blue">100% RISK-FREE</span>
                          </div>

                          <div className="clean-chips-row">
                            <span className="clean-spec-chip">💵 $0 Upfront Retainer</span>
                            <span className="clean-spec-chip">⭐ 90-Day Full Guarantee</span>
                            <span className="clean-spec-chip featured">🤝 23% Contingency Fee</span>
                          </div>

                          <div className="clean-highlight-box terms">
                            <span className="clean-box-icon">🛡️</span>
                            <p className="clean-box-text">
                              You retain complete control of your hiring decision at every single step. If you do not hire a candidate from Orion, you owe zero dollars.
                            </p>
                          </div>

                          <div className="clean-card-bottom-line">
                            <div className="clean-bottom-left">
                              <span className="clean-status-dot blue" />
                              <span>Orion 90-Day Placement Guarantee Enforced</span>
                            </div>
                            <span className="clean-bottom-sla">Net 15 on Start</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
