import React from "react";

// Quiet, professional terms strip: small serif figures, spaced mono labels, thin dividers,
// edges faded out. Lives inside the hero (transparent), so it shares the hero background exactly.
const ITEMS = [
  { num: "Net 15", label: "Fee · pay only if you hire" },
  { num: "90 days", label: "Replacement guarantee" },
  { num: "$0", label: "Upfront retainer" },
  { num: "48–72h", label: "Candidate turnaround" },
];

// Each half of the track holds the items several times so it is always wider than the screen,
// and both halves are identical so the -50% loop is seamless.
const HALF = [...ITEMS, ...ITEMS, ...ITEMS];

export function TermsTicker() {
  return (
    <div className="ha-tk" aria-label="Our terms">
      <style>{`
        .ha-tk {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 2;
          background: transparent;
          border-top: 1px solid rgba(255, 255, 255, 0.09);
          padding: 26px 0 30px;
          overflow: hidden;
        }
        .ha-tk-fade {
          overflow: hidden;
          -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 12%, #000 88%, transparent 100%);
          mask-image: linear-gradient(90deg, transparent 0%, #000 12%, #000 88%, transparent 100%);
        }
        .ha-tk-track {
          display: flex;
          align-items: center;
          width: max-content;
          animation: haTkSlide 70s linear infinite;
          will-change: transform;
        }
        .ha-tk:hover .ha-tk-track { animation-play-state: paused; }
        .ha-tk-item {
          display: inline-flex;
          align-items: baseline;
          gap: 14px;
          white-space: nowrap;
          padding: 0 54px;
          position: relative;
        }
        .ha-tk-item::after {
          content: "";
          position: absolute;
          right: 0;
          top: 50%;
          width: 1px;
          height: 28px;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.14);
        }
        .ha-tk-num {
          font-family: var(--display);
          font-size: 31px;
          font-weight: 400;
          line-height: 1;
          color: #FFFFFF;
          letter-spacing: -0.01em;
        }
        .ha-tk-lbl {
          font-family: var(--mono);
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #94A3B8;
        }
        @keyframes haTkSlide {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-50%, 0, 0); }
        }
        @media (max-width: 640px) {
          .ha-tk { padding: 22px 0 26px; }
          .ha-tk-track { animation-duration: 55s; }
          .ha-tk-item { padding: 0 36px; gap: 12px; }
          .ha-tk-item::after { height: 26px; }
          .ha-tk-num { font-size: 32px; }
          .ha-tk-lbl { font-size: 13px; letter-spacing: 0.1em; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ha-tk-track { animation: none; }
        }
      `}</style>
      <div className="ha-tk-fade">
      <div className="ha-tk-track" role="list">
        {[0, 1].map((half) =>
          HALF.map((item, i) => (
            <div
              key={`${half}-${i}`}
              className="ha-tk-item"
              role={half === 0 && i < ITEMS.length ? "listitem" : undefined}
              aria-hidden={half === 1 || i >= ITEMS.length ? true : undefined}
            >
              <span className="ha-tk-num">{item.num}</span>
              <span className="ha-tk-lbl">{item.label}</span>
            </div>
          ))
        )}
      </div>
      </div>
    </div>
  );
}
