"use client";

import React from "react";
import "./footer.css";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { orionLine, cities, roles, trust } from "@/data";
import { RatingBadge } from "./Rating";
import { GMark } from "./icons";

// Footer columns. Every link points at a page that exists.
const FT_COLUMNS: Array<{ title: string; links: Array<[string, string]> }> = [
  {
    title: "For law firms",
    links: [
      ["Find candidates", "/find-candidates"],
      ["Submit a job", "/submit-job"],
      ["Fees and guarantee", "/fees"],
      ["Employers overview", "/employers"],
    ],
  },
  {
    title: "Hiring resources",
    links: [
      ["Salary guides", "/salaries/estate-planning-attorney/houston-tx"],
      ["Hiring kits", "/hiring-kit/estate-planning-attorney"],
      ["Where to post a job", "/where-to-post/houston-tx"],
      ["Where to hire from", "/where-to-hire/houston-tx"],
    ],
  },
  {
    title: "For candidates",
    links: [
      ["Open jobs", "/jobs"],
      ["Upload your resume", "/upload-resume"],
      ["Check your salary", "/salary-check"],
      ["Best firms to work for", "/best-law-firms/houston-tx"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About Orion", "/about"],
      ["Reviews", "/about#reviews"],
      ["Contact", "/about#contact"],
    ],
  },
];

const FtArrow = () => (
  <svg viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 10h12M11 5l5 5-5 5" />
  </svg>
);

export function Footer({ minimal = false }: { minimal?: boolean }) {
  const pathname = usePathname();
  const isMinimal = minimal || pathname.startsWith("/candidate/");
  const isHireAttorneys = pathname.startsWith("/hire-attorneys");

  if (isHireAttorneys) {
    return (
      <>
        <style>{`
          .ha-footer-link {
            transition: color 0.15s ease, opacity 0.15s ease;
          }
          .ha-footer-link:hover {
            color: #60A5FA !important;
          }
        `}</style>
        {/* LUXURY ULTRA-THIN DEEPLY FADED DIVIDER ABOVE FOOTER */}
        <div
          role="separator"
          aria-hidden="true"
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            position: "relative",
            zIndex: 10,
            background: "#08142A",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 1140,
              height: "1px",
              background:
                "linear-gradient(90deg, transparent 0%, transparent 20%, rgba(96, 165, 250, 0.12) 32%, rgba(147, 197, 253, 0.60) 50%, rgba(96, 165, 250, 0.12) 68%, transparent 80%, transparent 100%)",
              boxShadow: "0 0 10px rgba(96, 165, 250, 0.28)",
            }}
          />
        </div>
        <footer
          className="site-footer ha-ads-footer"
          style={{
            background: "#08142A",
            borderTop: "none",
            color: "#FFFFFF",
            padding: "54px 0 38px",
            textAlign: "center",
          }}
        >
          <div
            className="wrap"
            style={{
              maxWidth: 860,
              margin: "0 auto",
              padding: "0 24px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            {/* 1. LARGER LOGO & BRAND (Unlinked on PPC ad landing page to prevent exit leaks) */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 20, textAlign: "center" }}>
              <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", textDecoration: "none" }}>
                <Image
                  src="/images/orion-logo.png"
                  alt="Orion Placement"
                  className="ha-footer-logo-img"
                  width={72}
                  height={72}
                  style={{
                    borderRadius: "50%",
                    border: "2px solid #3B82F6",
                    boxShadow: "0 0 0 1px rgba(96, 165, 250, 0.35), 0 0 24px rgba(37, 99, 235, 0.45)",
                    marginBottom: 12,
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--display)",
                    fontSize: 25,
                    fontWeight: 500,
                    color: "#FFFFFF",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Orion Placement
                </span>
              </div>
              <p style={{ color: "#94A3B8", fontSize: 13.5, margin: "6px auto 0", maxWidth: 480, lineHeight: 1.55, textAlign: "center" }}>
                Legal recruiters for Texas law firms. Screened attorneys and paralegals, no retainer, and you pay only if you hire.
              </p>
            </div>

            {/* 2. RATING & REVIEWS TRUST BADGE */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 24, width: "100%" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  background: "rgba(255, 255, 255, 0.06)",
                  border: "1px solid rgba(255, 255, 255, 0.14)",
                  borderRadius: 999,
                  padding: "8px 18px",
                  fontSize: 13,
                  color: "#E2E8F0",
                }}
              >
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                  <GMark />
                  <span style={{ color: "#FBBF24", fontSize: 13, letterSpacing: 1 }}>★★★★★</span>
                </span>
                <span style={{ width: 1, height: 14, background: "rgba(255, 255, 255, 0.2)" }} />
                <span style={{ color: "#FFFFFF" }}>
                  <strong style={{ color: "#FFFFFF", fontWeight: 600 }}>5.0 Rating</strong>
                  <span style={{ color: "rgba(255, 255, 255, 0.75)" }}> · 60+ Reviews</span>
                </span>
              </div>
            </div>

            {/* 3. COPYRIGHT & TERMS NOTICE (Distraction-free, zero outward navigation) */}
            <div
              style={{
                width: "100%",
                fontSize: 12.5,
                color: "#94A3B8",
                lineHeight: 1.6,
                paddingTop: 18,
                borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <p style={{ margin: "0 auto", color: "#64748B", maxWidth: "100%", textAlign: "center", width: "100%" }}>
                © 2026 Orion Placement LLC · All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </>
    );
  }

  if (isMinimal) {
    return (
      <>
        <footer className="site-footer footer-minimal">
          <div className="wrap">
            <p className="fm-links">
              <Link href="/about">About Orion</Link>
              <Link href="/">orionplacement.com</Link>
            </p>
            <p className="small">© 2026 Orion Placement LLC. All rights reserved.</p>
          </div>
        </footer>
      </>
    );
  }

  return (
    <footer className="ft" aria-labelledby="ft-h">
      <h2 id="ft-h" className="ft-sr">
        Orion Placement
      </h2>
      <div className="ft-wrap">
        {/* Brand row */}
        <div className="ft-top">
          <div className="ft-brand">
            <Link href="/" className="ft-logo" aria-label="Orion Placement home">
              <Image src="/images/orion-logo.png" alt="" width={56} height={56} />
            </Link>
            <div>
              <p className="ft-name">Orion Placement</p>
              <p className="ft-tag">{orionLine}</p>
            </div>
          </div>
          <div className="ft-top-side">
            <RatingBadge size="sm" dark link />
            <a className="ft-call" href={trust.calendly} target="_blank" rel="noopener noreferrer">
              Book 15 min with Justin <FtArrow />
            </a>
          </div>
        </div>

        {/* Link columns */}
        <nav className="ft-cols" aria-label="Footer">
          {FT_COLUMNS.map((col) => (
            <div key={col.title} className="ft-col">
              <h3>{col.title}</h3>
              <ul>
                {col.links.map(([label, href]) => (
                  <li key={href}>
                    <Link href={href}>{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* Directory: practice areas and cities as compact inline lists */}
        <div className="ft-dir">
          <div className="ft-dir-row">
            <h3>Practice areas</h3>
            <ul>
              {roles.map((r) => (
                <li key={r.slug}>
                  <Link href={`/roles/${r.slug}`}>{r.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="ft-dir-row">
            <h3>Cities</h3>
            <ul>
              {cities.map((c) => (
                <li key={c.slug}>
                  <Link href={`/locations/${c.stateSlug}/${c.citySlug}`}>{c.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Base */}
        <div className="ft-base">
          <p>© 2026 Orion Placement LLC. All rights reserved.</p>
          <p>{trust.address}</p>
        </div>
      </div>
    </footer>
  );
}
