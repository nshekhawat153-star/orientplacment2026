"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

const STEPS = [
  {
    id: "step-1",
    num: "01",
    kicker: "DAY 0 · INTAKE",
    title: (<>Consultation & Practice <span className="sp-title-blue">Mapping</span></>),
    desc: "A focused 15-minute call with Justin to map your firm's practice demands, culture fit, and compensation target. Direct outreach begins within 24 hours.",
    sla: "< 1 Hour Response",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
  },
  {
    id: "step-2",
    num: "02",
    kicker: "DAYS 5–7 · SOURCING",
    title: (<>Direct Sourcing & Screened <span className="sp-title-blue">Shortlist</span></>),
    desc: "Jon personally reaches out across our vetted legal network. Every candidate is pre-screened for practice area, bar status, and verified compensation.",
    sla: "5–7 Business Days",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    id: "step-3",
    num: "03",
    kicker: "START DATE · TERMS",
    title: (<>Contingency Hire & 90-Day <span className="sp-title-blue">Guarantee</span></>),
    desc: "Interview finalists with zero upfront retainer. Pay the standard contingency fee only on start date. If they leave within 90 days, we replace them free.",
    sla: "100% Risk-Free · Net 15",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <polyline points="9 12 11 14 15 10"/>
      </svg>
    ),
  },
];

export function SearchProtocolInteractive() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="how-it-works-sec light-editorial-sec"
      id="how-it-works"
      ref={sectionRef}
      aria-labelledby="protocol-h2"
    >
      <style>{`
        /* ═══════════════════════════════════════════════════
           HOW A SEARCH RUNS — Premium Animated Section
           ═══════════════════════════════════════════════════ */

        .how-it-works-sec {
          background-color: #FAF9F5 !important;
          border-top: 1px solid #E5E0D5;
          border-bottom: none !important;
          padding: 108px 0 120px;
          position: relative;
          overflow: hidden;
        }

        /* Subtle ambient glow behind the section */
        .how-it-works-sec::before {
          content: "";
          position: absolute;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(37, 99, 235, 0.06) 0%, transparent 70%);
          top: -100px;
          right: -100px;
          pointer-events: none;
        }

        .how-it-works-sec::after {
          content: "";
          position: absolute;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(37, 99, 235, 0.04) 0%, transparent 70%);
          bottom: -80px;
          left: -60px;
          pointer-events: none;
        }

        /* Header — 2-col: heading left, divider, para + button right */
        .sp-header {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 40px;
          align-items: start;
          margin-bottom: 64px;
          position: relative;
          z-index: 1;
        }

        .sp-header-left {
          max-width: 100%;
        }

        .sp-header-divider {
          width: 1.5px;
          align-self: stretch;
          background: linear-gradient(180deg, transparent 0%, #CBD5E1 30%, #CBD5E1 70%, transparent 100%);
          border-radius: 2px;
        }

        .sp-header-right {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 20px;
          padding-top: 36px;
        }

        .sp-header .editorial-desc {
          margin-bottom: 0 !important;
          max-width: 100%;
          font-size: 15.5px !important;
          line-height: 1.65 !important;
          color: #475569 !important;
        }

        /* ─── Timeline ─── */
        .sp-timeline {
          position: relative;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          z-index: 1;
        }

        /* The connecting line behind all cards */
        .sp-timeline-line {
          position: absolute;
          top: 48px;
          left: 60px;
          right: 60px;
          height: 2px;
          background: #E2E8F0;
          z-index: 0;
        }

        /* Animated fill overlay on the line */
        .sp-timeline-progress {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 0%;
          background: linear-gradient(90deg, #2563EB, #60A5FA, #2563EB);
          background-size: 200% 100%;
          border-radius: 2px;
          transition: width 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.5s;
        }

        .sp-timeline-progress.sp-anim-in {
          width: 100%;
          animation: shimmerLine 3s ease-in-out infinite 1.9s;
        }

        @keyframes shimmerLine {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* Traveling dot on the timeline */
        .sp-timeline-dot-travel {
          position: absolute;
          top: -3.5px;
          left: 0%;
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #2563EB;
          box-shadow: 0 0 12px rgba(37, 99, 235, 0.6);
          opacity: 0;
          transition: none;
        }

        .sp-timeline-progress.sp-anim-in .sp-timeline-dot-travel {
          opacity: 0;
        }

        /* ─── Step Card ─── */
        .sp-step {
          position: relative;
          padding: 0 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .sp-step.sp-anim-in { opacity: 1; transform: translateY(0); }
        .sp-step:nth-child(2) { transition-delay: 0.18s; }
        .sp-step:nth-child(3) { transition-delay: 0.36s; }

        /* Circle node on the timeline */
        .sp-node {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #FFFFFF;
          border: 2.5px solid #E2E8F0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #64748B;
          flex-shrink: 0;
          position: relative;
          z-index: 2;
          margin-bottom: 20px;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
        }

        .sp-step.sp-anim-in .sp-node {
          border-color: #2563EB;
          color: #2563EB;
          box-shadow: 0 0 0 6px rgba(37, 99, 235, 0.08), 0 2px 8px rgba(37, 99, 235, 0.12);
        }

        /* The card body */
        .sp-card {
          background: #FFFFFF;
          border: 1px solid #E8E5DE;
          border-radius: 16px;
          padding: 28px 24px 24px;
          width: 100%;
          position: relative;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 1px 3px rgba(15, 23, 42, 0.03);
        }

        .sp-card::before {
          content: "";
          position: absolute;
          inset: -1px;
          border-radius: 17px;
          padding: 1px;
          background: linear-gradient(135deg, transparent, transparent);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          transition: background 0.4s ease;
          pointer-events: none;
          opacity: 0;
        }

        .sp-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(37, 99, 235, 0.08), 0 2px 6px rgba(15, 23, 42, 0.03);
          border-color: rgba(37, 99, 235, 0.25);
        }

        .sp-card:hover::before {
          background: linear-gradient(135deg, #2563EB, #60A5FA, #2563EB);
          opacity: 1;
        }

        /* Large faded step number behind */
        .sp-card-bg-num {
          position: absolute;
          top: 10px;
          right: 16px;
          font: 800 72px/1 var(--display), serif;
          color: rgba(37, 99, 235, 0.04);
          pointer-events: none;
          user-select: none;
          letter-spacing: -0.04em;
          transition: color 0.4s ease;
        }

        .sp-card:hover .sp-card-bg-num {
          color: rgba(37, 99, 235, 0.07);
        }

        .sp-kicker {
          font: 600 10px/1 var(--mono);
          color: #2563EB;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 10px;
          display: block;
        }

        .sp-title {
          font-family: var(--display), Georgia, serif;
          font-size: 21px;
          font-weight: 400;
          color: #0A1629;
          line-height: 1.3;
          letter-spacing: -0.02em;
          margin: 0 0 10px;
        }

        .sp-title-blue {
          color: #2563EB;
          font-style: italic;
        }

        .sp-desc {
          font-size: 14px;
          line-height: 1.65;
          color: #64748B;
          margin: 0 0 18px;
          font-weight: 400;
        }

        .sp-sla {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font: 600 10.5px/1 var(--mono);
          color: #1D4ED8;
          background: #EFF6FF;
          border: 1px solid #BFDBFE;
          border-radius: 6px;
          padding: 5px 10px;
          letter-spacing: 0.03em;
          transition: all 0.25s ease;
        }

        .sp-card:hover .sp-sla {
          background: #DBEAFE;
          border-color: #93C5FD;
        }

        /* Animated ring pulse on nodes after reveal */
        .sp-node-ring {
          position: absolute;
          inset: -8px;
          border-radius: 50%;
          border: 1.5px solid rgba(37, 99, 235, 0.25);
          opacity: 0;
          transform: scale(0.8);
          animation: none;
        }

        .sp-step.sp-anim-in .sp-node-ring {
          animation: nodeRingPulse 3s cubic-bezier(0.16, 1, 0.3, 1) infinite;
        }

        .sp-step:nth-child(1).sp-anim-in .sp-node-ring { animation-delay: 0.8s; }
        .sp-step:nth-child(2).sp-anim-in .sp-node-ring { animation-delay: 1.1s; }
        .sp-step:nth-child(3).sp-anim-in .sp-node-ring { animation-delay: 1.4s; }

        @keyframes nodeRingPulse {
          0% { opacity: 0; transform: scale(0.85); }
          15% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0; transform: scale(1.4); }
          100% { opacity: 0; transform: scale(1.4); }
        }

        /* Header reveal */
        .sp-header-reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .sp-header-reveal.sp-anim-in {
          opacity: 1;
          transform: translateY(0);
        }

        /* ─── Responsive ─── */
        @media (max-width: 900px) {
          .how-it-works-sec {
            padding: 72px 0 80px;
          }

          .sp-header {
            grid-template-columns: 1fr;
            gap: 20px;
            margin-bottom: 48px;
          }

          .sp-header-divider {
            display: none;
          }

          .sp-header-right {
            padding-top: 0;
          }

          .sp-timeline {
            grid-template-columns: 1fr;
            gap: 0;
            padding-left: 32px;
          }

          .sp-timeline-line {
            top: 0;
            bottom: 0;
            left: 20px;
            right: auto;
            width: 2px;
            height: auto;
          }

          .sp-timeline-progress {
            width: 100% !important;
            height: 0%;
            transition: height 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.5s;
          }

          .sp-timeline-progress.sp-anim-in {
            height: 100%;
            width: 100% !important;
          }

          .sp-step {
            flex-direction: row;
            align-items: flex-start;
            text-align: left;
            padding: 0 0 40px 0;
          }

          .sp-node {
            margin-bottom: 0;
            margin-right: -20px; /* node is shifted -32px with left, so this leaves a 12px gap to the card */
            flex-shrink: 0;
            position: relative;
            left: -32px;
          }

          .sp-card {
            flex: 1;
          }

          .sp-step::after { display: none; }

          .sp-step:nth-child(2) { transition-delay: 0.14s; }
          .sp-step:nth-child(3) { transition-delay: 0.28s; }
        }

        @media (max-width: 640px) {
          .how-it-works-sec {
            padding: 56px 0 64px;
          }

          .sp-timeline {
            padding-left: 28px;
          }

          .sp-timeline-line {
            left: 18px;
          }

          .sp-node {
            width: 36px;
            height: 36px;
            left: -28px;
            margin-right: -16px; /* 12px gap to the card (node shifted -28px) */
          }

          .sp-title {
            font-size: 17px;
          }

          .sp-card {
            padding: 22px 18px 20px;
          }
        }
      `}</style>

      <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
        {/* Section Header */}
        <div className={`sp-header sp-header-reveal ${isVisible ? "sp-anim-in" : ""}`}>
          <div className="sp-header-left">
            <div className="editorial-pill">
              <span className="editorial-pill-dot" />
              <span>HOW A SEARCH RUNS</span>
            </div>
            <h2 id="protocol-h2" className="editorial-h2" style={{ marginTop: "14px", marginBottom: "0" }}>
              Built for precision,{" "}
              <span className="serif-accent">run for speed.</span>
            </h2>
          </div>
          <div className="sp-header-divider" aria-hidden="true" />
          <div className="sp-header-right">
            <p className="editorial-desc">
              Every search follows a disciplined, three-step protocol. Zero upfront retainer, non-exclusive, and you only pay when your candidate starts.
            </p>
            <Link href="/find-candidates" className="btn-editorial-cta">
              <span>See candidates for your seat</span>
              <svg aria-hidden="true" viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
                <path d="M10.3 3.3a1 1 0 0 1 1.4 0l6 6a1 1 0 0 1 0 1.4l-6 6a1 1 0 1 1-1.4-1.4l4.3-4.3H3a1 1 0 1 1 0-2h11.6l-4.3-4.3a1 1 0 0 1 0-1.4Z" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Timeline */}
        <div className="sp-timeline">
          {/* Background line */}
          <div className="sp-timeline-line" aria-hidden="true">
            <div className={`sp-timeline-progress ${isVisible ? "sp-anim-in" : ""}`} />
          </div>

          {STEPS.map((step, idx) => (
            <div
              key={step.id}
              className={`sp-step ${isVisible ? "sp-anim-in" : ""}`}
              style={{ transitionDelay: isVisible ? `${idx * 0.18}s` : "0s" }}
            >
              {/* Timeline node */}
              <div className="sp-node">
                <div className="sp-node-ring" />
                {step.icon}
              </div>

              {/* Card */}
              <div className="sp-card">
                <span className="sp-card-bg-num" aria-hidden="true">{step.num}</span>
                <span className="sp-kicker">{step.kicker}</span>
                <h3 className="sp-title">{step.title}</h3>
                <p className="sp-desc">{step.desc}</p>
                <span className="sp-sla">{step.sla}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
