"use client";

import { useEffect } from "react";

/**
 * ScrollRevealProvider
 *
 * Implements silky-smooth, luxury Apple/Linear-grade scroll reveal animations
 * across the entire homepage.
 *
 * Features:
 * - GPU accelerated with cubic-bezier(0.16, 1, 0.3, 1) quintic easing
 * - Staggered choreography for grids (terms, candidates, reviews, resources, faq)
 * - Safe progressive enhancement (elements never hidden if JS fails or reduced-motion is active)
 * - Zero layout shifts and automatic unobserving once revealed
 */
export function ScrollRevealProvider() {
  useEffect(() => {
    // Respect user's motion preferences
    if (
      typeof window === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const docEl = document.documentElement;
    docEl.classList.add("reveal-ready");

    // Automatically select structural elements across the homepage
    const autoSelectors: Array<{ selector: string; type: "up" | "scale" | "left" | "right" }> = [
      // Trust ticker
      { selector: ".trust-ticker-strip", type: "up" },
      // Search protocol
      { selector: ".protocol-interactive-wrap", type: "up" },
      // Terms section
      { selector: ".terms-head", type: "up" },
      { selector: ".terms-pillar", type: "scale" },
      { selector: ".terms-bottom-bar", type: "up" },
      // Candidates section
      { selector: ".candidates-sec .sec-head-premium", type: "up" },
      { selector: ".cand-gallery-card", type: "scale" },
      { selector: ".showcase-bottom-banner", type: "scale" },
      // Reviews section
      { selector: ".reviews-sec .sec-head-premium", type: "up" },
      { selector: ".reviews figure", type: "scale" },
      { selector: ".reviews-bottom-bar", type: "up" },
      // Who we are section
      { selector: ".who-head-col-left", type: "left" },
      { selector: ".who-head-col-right", type: "right" },
      { selector: ".founder-card", type: "scale" },
      { selector: ".founders-promise-bar", type: "scale" },
      // Post a job section
      { selector: ".post-job-content", type: "left" },
      { selector: ".post-job-card", type: "scale" },
      // Resources section
      { selector: ".resources-sec .sec-head-premium", type: "up" },
      { selector: ".rcard", type: "scale" },
      { selector: ".resources-bottom-bar", type: "scale" },
      // For candidates section
      { selector: ".cand-band-content", type: "left" },
      { selector: ".cand-band-card", type: "scale" },
      // FAQ section
      { selector: ".faq-head-col", type: "left" },
      { selector: ".faq details", type: "right" },
      // Bottom CTA band
      { selector: ".cta-band", type: "scale" },
    ];

    autoSelectors.forEach(({ selector, type }) => {
      document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
        if (!el.hasAttribute("data-reveal")) {
          el.setAttribute("data-reveal", type);
        }
      });
    });

    // Compute staggered delays for multi-item grids/lists
    const staggerGroups = [
      { container: ".terms-pillars-grid", item: ".terms-pillar", step: 85 },
      { container: ".cand-gallery-grid", item: ".cand-gallery-card", step: 85 },
      { container: ".reviews", item: "figure", step: 95 },
      { container: ".founders-grid", item: ".founder-card", step: 120 },
      { container: ".rcards", item: ".rcard", step: 85 },
      { container: ".faq", item: "details", step: 75 },
    ];

    staggerGroups.forEach(({ container, item, step }) => {
      const parent = document.querySelector(container);
      if (parent) {
        const items = Array.from(parent.querySelectorAll<HTMLElement>(item));
        items.forEach((child, index) => {
          child.style.setProperty("--reveal-delay", `${index * step}ms`);
        });
      }
    });

    const allElements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );

    // IntersectionObserver with bottom margin so elements smoothly rise as user scrolls
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.classList.add("is-revealed");
            observer.unobserve(el);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -40px 0px",
        threshold: 0.05,
      }
    );

    // Elements already in or near viewport are revealed immediately
    const viewportHeight = window.innerHeight;
    allElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < viewportHeight * 0.9) {
        el.classList.add("is-revealed");
      } else {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
      docEl.classList.remove("reveal-ready");
    };
  }, []);

  return null;
}

