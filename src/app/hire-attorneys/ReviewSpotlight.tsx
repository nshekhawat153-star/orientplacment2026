"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { GMark } from "@/components/icons";

interface ReviewItem {
  id: string;
  name: string;
  role: string;
  firm: string;
  market: string;
  headline: string;
  quote: string;
  metric: string;
  initials: string;
}

const REVIEWS: ReviewItem[] = [
  {
    id: "travis-bowen",
    name: "Travis Bowen",
    role: "Managing Partner",
    firm: "Bowen Law Group",
    market: "Texas Statewide",
    headline: "Placed 2 new team members with fast turnaround.",
    quote:
      "Justin Sofman and Jon Missirlian have been relentless in helping us with the staffing needs of our Firm. They have successfully placed 2 new team members with us and we will use them for all of our future staffing needs. Orion Placement, Justin and Jon are professional, excellent at follow-up and experts in finding the talent we need.",
    metric: "2 Lateral Attorney Placements",
    initials: "TB",
  },
  {
    id: "lainie-james",
    name: "Lainie James",
    role: "Firm Administrator",
    firm: "Manning & Kass (MS&A Law)",
    market: "Texas & Regional",
    headline: "Consistently delivering top-tier legal talent for our firm.",
    quote:
      "Jon Missirlian has been a trusted recruiter for MS&A for quite some time, consistently delivering high-quality candidates. Beyond his professional expertise, he is always respectful and kind. Working with him has been a pleasure, and I know I can always rely on him to find top-tier talent.",
    metric: "Long-Term Recruiting Partner",
    initials: "LJ",
  },
  {
    id: "brett-zimmerman",
    name: "Brett Zimmerman",
    role: "Managing Attorney",
    firm: "Zimmerman Law Firm",
    market: "Texas Market",
    headline: "Found me the perfect candidate with relentless follow-up.",
    quote:
      "Jon did an amazing job finding me a perfect candidate for my company. He’s above and beyond with his follow up with candidates. I will be using Orion Placement and Jon for all my future hires!",
    metric: "100% Contingency Hire",
    initials: "BZ",
  },
  {
    id: "lourdes-masson",
    name: "Lourdes Masson",
    role: "Managing Partner",
    firm: "Masson Law Group, PLLC",
    market: "Houston & Texas",
    headline: "True professionals who communicate well and deliver great candidates.",
    quote:
      "I’ve worked with Orion Placement several times over the years, and they’ve always been a pleasure to work with. They’re true professionals, communicate well, and consistently deliver great candidates. I wouldn’t hesitate to recommend them to any law firm looking for a recruiting partner.",
    metric: "Multi-Year Firm Client",
    initials: "LM",
  },
  {
    id: "daffner-law",
    name: "Daffner Law",
    role: "Managing Attorney",
    firm: "Daffner Law, PLLC",
    market: "Dallas-Fort Worth, TX",
    headline: "Very attentive and does an excellent job — highly recommended!",
    quote:
      "Very attentive and does an excellent job matching experienced attorneys to our exact caseload. Orion Placement is professional, responsive, and understands the legal market intimately. Highly recommended for any firm seeking confidential lateral hires!",
    metric: "Verified Law Firm Review",
    initials: "DL",
  },
];

export function ReviewSpotlight() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback(
    (nextIndex: number) => {
      if (nextIndex === currentIndex) return;
      setIsFading(true);
      setTimeout(() => {
        setCurrentIndex(nextIndex);
        setIsFading(false);
      }, 190);
    },
    [currentIndex]
  );

  const handlePrev = useCallback(() => {
    const next = currentIndex === 0 ? REVIEWS.length - 1 : currentIndex - 1;
    goTo(next);
  }, [currentIndex, goTo]);

  const handleNext = useCallback(() => {
    const next = currentIndex === REVIEWS.length - 1 ? 0 : currentIndex + 1;
    goTo(next);
  }, [currentIndex, goTo]);

  // Gentle auto-cycle every 8 seconds, paused on user hover/interaction
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      handleNext();
    }, 8000);
    return () => clearInterval(timer);
  }, [isPaused, handleNext]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 45) {
      handleNext(); // swipe left -> next
    } else if (diff < -45) {
      handlePrev(); // swipe right -> prev
    }
    touchStartX.current = null;
  };

  const current = REVIEWS[currentIndex];

  return (
    <div
      className="ha-review-spotlight"
      style={{ width: "100%", maxWidth: 960, margin: "0 auto" }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <style>{`
        .ha-spotlight-card {
          position: relative;
          background: #FFFFFF;
          border: 1.5px solid #BFDBFE;
          border-radius: 22px;
          padding: 44px 48px 36px;
          box-shadow: 0 24px 60px -15px rgba(29, 78, 216, 0.09), 0 4px 16px rgba(8, 20, 42, 0.03);
          overflow: hidden;
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .ha-spotlight-card:hover {
          border-color: #93C5FD;
          box-shadow: 0 30px 70px -15px rgba(29, 78, 216, 0.14), 0 6px 20px rgba(8, 20, 42, 0.04);
        }
        .ha-spotlight-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #1D4ED8 0%, #60A5FA 50%, #1D4ED8 100%);
        }
        .ha-spotlight-watermark {
          position: absolute;
          right: 32px;
          top: 20px;
          font-size: 140px;
          font-family: var(--display), Georgia, serif;
          line-height: 1;
          color: rgba(29, 78, 216, 0.045);
          user-select: none;
          pointer-events: none;
          font-weight: 700;
        }
        .ha-spotlight-content {
          position: relative;
          z-index: 2;
          transition: opacity 0.19s cubic-bezier(0.16, 1, 0.3, 1), transform 0.19s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .ha-spotlight-content.fading {
          opacity: 0;
          transform: translateY(8px);
        }
        .ha-nav-arrow-btn {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: 1.5px solid #CBD5E1;
          background: #FFFFFF;
          color: #08142A;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 3px 10px rgba(8, 20, 42, 0.05);
        }
        .ha-nav-arrow-btn:hover {
          background: #1D4ED8;
          border-color: #1D4ED8;
          color: #FFFFFF;
          transform: scale(1.06);
          box-shadow: 0 6px 20px rgba(29, 78, 216, 0.28);
        }
        .ha-nav-arrow-btn:active {
          transform: scale(0.95);
        }
        .ha-dot-indicator {
          height: 8px;
          border-radius: 999px;
          border: none;
          cursor: pointer;
          padding: 0;
          transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .ha-dot-indicator.active {
          width: 34px;
          background: #1D4ED8;
        }
        .ha-dot-indicator.inactive {
          width: 8px;
          background: #CBD5E1;
        }
        .ha-dot-indicator.inactive:hover {
          background: #93C5FD;
        }
        @media (max-width: 640px) {
          .ha-spotlight-card {
            padding: 28px 22px 24px !important;
            border-radius: 18px !important;
          }
          .ha-spotlight-top-row {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 10px !important;
          }
          .ha-spotlight-watermark {
            font-size: 90px !important;
            right: 18px !important;
            top: 14px !important;
          }
          .ha-spotlight-headline {
            font-size: 21px !important;
            line-height: 1.28 !important;
          }
          .ha-spotlight-quote {
            font-size: 15.5px !important;
            line-height: 1.62 !important;
          }
          .ha-spotlight-author-wrap {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 12px !important;
          }
          .ha-nav-arrow-btn {
            width: 44px !important;
            height: 44px !important;
          }
        }
      `}</style>

      {/* 1. THE BIG CENTERED LUXURY CARD */}
      <div className="ha-spotlight-card">
        {/* Subtle decorative watermark */}
        <div className="ha-spotlight-watermark" aria-hidden="true">
          &ldquo;
        </div>

        <div className={`ha-spotlight-content ${isFading ? "fading" : ""}`}>
          {/* TOP BAR: STARS + GOOGLE VERIFIED CHIP + LIVE COUNTER */}
          <div
            className="ha-spotlight-top-row"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 22,
              gap: 12,
            }}
          >
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 3,
                  color: "#F59E0B",
                  fontSize: 17,
                  letterSpacing: "0.04em",
                }}
              >
                ★★★★★
              </div>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 11.5,
                  color: "#166534",
                  background: "#F0FDF4",
                  border: "1px solid #BBF7D0",
                  padding: "4.5px 11px",
                  borderRadius: 999,
                  fontFamily: "var(--mono)",
                  letterSpacing: "0.04em",
                  fontWeight: 600,
                }}
              >
                <GMark /> Verified Law Firm Hire
              </span>
            </div>

            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: 12,
                fontWeight: 700,
                color: "#1D4ED8",
                background: "#EFF6FF",
                border: "1px solid #DBEAFE",
                padding: "4px 11px",
                borderRadius: 6,
                letterSpacing: "0.08em",
              }}
            >
              0{currentIndex + 1} / 0{REVIEWS.length}
            </div>
          </div>

          {/* IMPACT HEADLINE (LARGE DISPLAY TYPOGRAPHY) */}
          <h3
            className="ha-spotlight-headline"
            style={{
              fontFamily: "var(--display)",
              fontSize: "clamp(24px, 2.7vw, 30px)",
              color: "#08142A",
              fontWeight: 500,
              margin: "0 0 16px",
              lineHeight: 1.25,
              letterSpacing: "-0.018em",
            }}
          >
            &ldquo;{current.headline}&rdquo;
          </h3>

          {/* VERBATIM EXPANDED QUOTE (LARGE BODY COPY) */}
          <blockquote
            className="ha-spotlight-quote"
            style={{
              fontSize: "clamp(16.5px, 1.75vw, 18.5px)",
              color: "#334155",
              lineHeight: 1.72,
              margin: "0 0 28px",
              fontStyle: "normal",
            }}
          >
            &ldquo;{current.quote}&rdquo;
          </blockquote>

          {/* AUTHOR & LAW FIRM FOOTER */}
          <div
            className="ha-spotlight-author-wrap"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: 22,
              borderTop: "1.5px solid #F1F5F9",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              {/* Monogram Badge */}
              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)",
                  border: "1.5px solid #BFDBFE",
                  color: "#1D4ED8",
                  display: "grid",
                  placeItems: "center",
                  fontFamily: "var(--mono)",
                  fontWeight: 700,
                  fontSize: 16,
                  flexShrink: 0,
                  boxShadow: "0 3px 10px rgba(29, 78, 216, 0.12)",
                }}
                aria-hidden="true"
              >
                {current.initials}
              </div>

              <div>
                <b style={{ display: "block", fontSize: 16.5, color: "#08142A", fontWeight: 600 }}>
                  {current.name}
                </b>
                <span style={{ fontSize: 13.5, color: "#64748B" }}>
                  {current.role} · <strong style={{ color: "#334155", fontWeight: 500 }}>{current.firm}</strong> ({current.market})
                </span>
              </div>
            </div>

            {/* Credential Badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 12,
                color: "#1E40AF",
                background: "#EFF6FF",
                border: "1px solid #DBEAFE",
                borderRadius: 999,
                padding: "6px 14px",
                fontFamily: "var(--mono)",
                letterSpacing: "0.03em",
                fontWeight: 600,
              }}
            >
              <span>✓</span>
              <span>{current.metric}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. SLIDER CONTROLS (PREV BUTTON / PILL DOTS / NEXT BUTTON) */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 20,
          marginTop: 28,
        }}
      >
        {/* PREV ARROW */}
        <button
          type="button"
          onClick={handlePrev}
          className="ha-nav-arrow-btn"
          aria-label="Previous client review"
          title="Previous review (or swipe left)"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* PILL DOT INDICATORS */}
        <div
          style={{ display: "flex", alignItems: "center", gap: 8 }}
          role="tablist"
          aria-label="Review slider pagination"
        >
          {REVIEWS.map((r, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={r.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Go to review ${idx + 1}: ${r.name}`}
                onClick={() => goTo(idx)}
                className={`ha-dot-indicator ${isActive ? "active" : "inactive"}`}
              />
            );
          })}
        </div>

        {/* NEXT ARROW */}
        <button
          type="button"
          onClick={handleNext}
          className="ha-nav-arrow-btn"
          aria-label="Next client review"
          title="Next review (or swipe right)"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* 3. GOOGLE VERIFIED FOOTER BAR */}
      <div
        style={{
          marginTop: 26,
          textAlign: "center",
          fontSize: 13,
          color: "#64748B",
        }}
      >
        <span style={{ color: "#166534", fontWeight: 700, marginRight: 6 }}>✓</span>
        <span>All 60 Google reviews are independently submitted and verified by law firm clients.</span>{" "}
        <a
          href="https://www.google.com/search?q=Orion+Placement+reviews"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#1D4ED8",
            fontWeight: 700,
            textDecoration: "underline",
            marginLeft: 4,
          }}
        >
          Read Google Reviews →
        </a>
      </div>
    </div>
  );
}
