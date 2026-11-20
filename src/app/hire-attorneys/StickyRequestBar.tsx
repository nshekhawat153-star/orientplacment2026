"use client";

import React, { useEffect, useState } from "react";

// Mobile-only sticky CTA. Appears once ~40% of the hero has been scrolled past.
export function StickyRequestBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const update = () => {
      const hero = document.querySelector(".ha-hero-sec");
      if (!hero) return;
      const r = hero.getBoundingClientRect();
      const scrolledPast = -r.top; // px of the hero scrolled out of view
      setShow(scrolledPast >= r.height * 0.4);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className={`ha-sticky-bar${show ? " is-visible" : ""}`} aria-hidden={!show}>
      <style>{`
        .ha-sticky-bar { display: none; }
        @media (max-width: 640px) {
          .ha-sticky-bar {
            display: block;
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 9000;
            padding: 10px 16px calc(10px + env(safe-area-inset-bottom));
            background: rgba(8, 20, 42, 0.92);
            -webkit-backdrop-filter: blur(10px);
            backdrop-filter: blur(10px);
            border-top: 1px solid rgba(255, 255, 255, 0.10);
            transform: translateY(110%);
            transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1);
            pointer-events: none;
          }
          .ha-sticky-bar.is-visible {
            transform: translateY(0);
            pointer-events: auto;
          }
          .ha-sticky-bar a {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            width: 100%;
            box-sizing: border-box;
            padding: 14px 18px;
            border-radius: 10px;
            background: linear-gradient(135deg, #1D4ED8 0%, #1E40AF 100%);
            color: #FFFFFF;
            font-size: 15.5px;
            font-weight: 600;
            text-decoration: none;
            box-shadow: 0 6px 18px rgba(29, 78, 216, 0.45);
          }
        }
      `}</style>
      <a href="#intake-form" data-open-intake-modal="true" tabIndex={show ? 0 : -1}>
        <span>Request Candidates</span>
        <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}
