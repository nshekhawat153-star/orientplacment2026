"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

// Mobile-only sticky CTA bar for the homepage. Works like the hire-attorneys StickyRequestBar:
// appears once ~40% of the hero has been scrolled past, slides in from the bottom.
export function HomeStickyBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const update = () => {
      const hero = document.querySelector(".hero-cinematic");
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
    <div className={`home-sticky-bar${show ? " is-visible" : ""}`} aria-hidden={!show}>
      <style>{`
        .home-sticky-bar { display: none; }
        @media (max-width: 640px) {
          .home-sticky-bar {
            display: flex;
            gap: 10px;
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
          .home-sticky-bar.is-visible {
            transform: translateY(0);
            pointer-events: auto;
          }
          .home-sticky-bar a {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            box-sizing: border-box;
            padding: 14px 12px;
            border-radius: 10px;
            font-size: 15.5px;
            font-weight: 600;
            line-height: 1.2;
            text-decoration: none;
            white-space: nowrap;
          }
          .home-sticky-bar .hsb-primary {
            flex: 1.25 1 0;
            background: linear-gradient(135deg, #1D4ED8 0%, #1E40AF 100%);
            color: #FFFFFF;
            box-shadow: 0 6px 18px rgba(29, 78, 216, 0.45);
          }
          .home-sticky-bar .hsb-secondary {
            flex: 1 1 0;
            background: rgba(255, 255, 255, 0.06);
            color: #FFFFFF;
            border: 1px solid rgba(255, 255, 255, 0.28);
          }
        }
      `}</style>
      <Link className="hsb-primary" href="/find-candidates" tabIndex={show ? 0 : -1}>
        <span>See candidates</span>
        <span aria-hidden="true">→</span>
      </Link>
      <Link className="hsb-secondary" href="/submit-job" tabIndex={show ? 0 : -1}>
        <span>Post your job</span>
      </Link>
    </div>
  );
}
