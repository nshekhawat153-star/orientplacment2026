"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { orionLine, sendingDomains, cities, roles } from "@/data";
import { RatingBadge, CalendlyLink } from "./Rating";
import { Mark } from "./Mark";

const UNBUILT_MSG = "Prototype: only Houston × estate planning attorney is built.";

export function Footer({ minimal = false }: { minimal?: boolean }) {
  const pathname = usePathname();
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3200);
  };

  const renderLink = (href: string, built: boolean, label: string) => {
    if (built) {
      return <Link href={href}>{label}</Link>;
    }
    return (
      <a
        href="#"
        data-unbuilt={UNBUILT_MSG}
        onClick={(e) => {
          e.preventDefault();
          showToast(UNBUILT_MSG);
        }}
      >
        {label}
      </a>
    );
  };

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
        <footer
          className="site-footer ha-ads-footer"
          style={{
            background: "#08142A",
            borderTop: "1px solid rgba(255, 255, 255, 0.10)",
            color: "#FFFFFF",
            padding: "54px 0 38px",
            textAlign: "center",
          }}
        >
          <div className="wrap" style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px" }}>
            {/* 1. LARGER LOGO & BRAND */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 20 }}>
              <Link href="/" aria-label="Orion Placement" style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", textDecoration: "none" }}>
                <Image
                  src="/images/orion-logo.png"
                  alt="Orion Placement"
                  className="ha-footer-logo-img"
                  width={68}
                  height={68}
                  style={{
                    borderRadius: "50%",
                    boxShadow: "0 0 24px rgba(29, 78, 216, 0.35)",
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
              </Link>
              <p style={{ color: "#94A3B8", fontSize: 13.5, margin: "6px 0 0", maxWidth: 460, lineHeight: 1.55 }}>
                Direct intake legal recruiters for Texas law firms. Screened lateral attorneys and paralegals on 100% contingency.
              </p>
            </div>

            {/* 2. RATING & REVIEWS TRUST BADGE */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
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
                <span style={{ color: "#60A5FA", fontSize: 12, letterSpacing: 1 }}>
                  ★★★★★
                </span>
                <span style={{ width: 1, height: 14, background: "rgba(255, 255, 255, 0.2)" }} />
                <span style={{ color: "#FFFFFF" }}>
                  <strong style={{ color: "#FFFFFF", fontWeight: 600 }}>5.0 Google Rating</strong>
                  <span style={{ color: "rgba(255, 255, 255, 0.75)" }}> · 60+ Verified Texas Law Firm Reviews</span>
                </span>
              </div>
            </div>

            {/* 3. ESSENTIAL MAIN LINKS ONLY (job, candidate, about, book call) */}
            <nav
              aria-label="Footer Navigation"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "clamp(16px, 3.2vw, 32px)",
                flexWrap: "wrap",
                padding: "16px 0",
                borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                marginBottom: 22,
              }}
            >
              <Link
                href="/jobs"
                style={{ color: "#CBD5E1", textDecoration: "none", fontSize: 14, fontWeight: 500 }}
                className="ha-footer-link"
              >
                Open Jobs
              </Link>
              <Link
                href="/find-candidates"
                style={{ color: "#CBD5E1", textDecoration: "none", fontSize: 14, fontWeight: 500 }}
                className="ha-footer-link"
              >
                Find Candidates
              </Link>
              <Link
                href="/candidates"
                style={{ color: "#CBD5E1", textDecoration: "none", fontSize: 14, fontWeight: 500 }}
                className="ha-footer-link"
              >
                For Candidates
              </Link>
              <Link
                href="/about"
                style={{ color: "#CBD5E1", textDecoration: "none", fontSize: 14, fontWeight: 500 }}
                className="ha-footer-link"
              >
                About Orion
              </Link>
              <a
                href="https://calendly.com/orionplacement/call-with-justin"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#60A5FA",
                  fontWeight: 600,
                  fontSize: 14,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                }}
                className="ha-footer-link"
              >
                <span>Book a Call</span>
                <span aria-hidden="true">→</span>
              </a>
            </nav>

            {/* 4. COPYRIGHT & TERMS NOTICE */}
            <div style={{ fontSize: 12, color: "#64748B", lineHeight: 1.6 }}>
              <p style={{ margin: "0 0 6px" }}>
                23% flat contingency fee · 90-day replacement warranty · Payable Net 15 only if you hire
              </p>
              <p style={{ margin: 0 }}>
                © 2026 Orion Placement LLC · Texas Legal Recruiting. All rights reserved.
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
            <p>
              Orion emails come only from{" "}
              {sendingDomains.map((d, i) => (
                <React.Fragment key={d}>
                  {i > 0 && " and "}
                  <Mark>{d}</Mark>
                </React.Fragment>
              ))}
              . If a message uses another domain, forward it to us before you
              reply.
            </p>
            <p className="fm-links">
              <Link href="/about#email-check">Is this email from Orion?</Link>
              <Link href="/about">About Orion</Link>
              <Link href="/">orionplacement.com</Link>
            </p>
            <p className="small">© 2026 Orion Placement LLC. All rights reserved.</p>
          </div>
        </footer>
        {toastMsg && (
          <div className="toast show" role="status" aria-live="polite">
            {toastMsg}
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <footer className="site-footer">
        <div className="wrap">
          <div className="f-top">
            <Link className="logo" href="/" aria-label="Orion Placement">
              <Image
                src="/images/orion-logo.png"
                alt="Orion Placement"
                className="logo-img"
                width={48}
                height={48}
              />
            </Link>
            <p className="f-tagline">{orionLine}</p>
            <div className="f-rating-wrap">
              <RatingBadge size="sm" dark />
            </div>
          </div>

          <div className="cols">
            {/* For employers */}
            <div>
              <h2>For employers</h2>
              <ul>
                <li>{renderLink("/find-candidates", true, "Find candidates")}</li>
                <li>{renderLink("/submit-job", true, "Submit a job")}</li>
                <li>{renderLink("/fees", true, "Fees and guarantee")}</li>
                <li>
                  {renderLink(
                    "/hiring-kit/estate-planning-attorney",
                    true,
                    "Hiring kits"
                  )}
                </li>
                <li>
                  {renderLink(
                    "/where-to-post/houston-tx",
                    true,
                    "Where to post a job"
                  )}
                </li>
                <li>
                  {renderLink(
                    "/where-to-hire/houston-tx",
                    true,
                    "Where to hire from"
                  )}
                </li>
                <li>{renderLink("/employers", true, "Employers overview")}</li>
              </ul>
            </div>

            {/* For candidates */}
            <div>
              <h2>For candidates</h2>
              <ul>
                <li>
                  {renderLink(
                    "/jobs",
                    true,
                    "Open jobs"
                  )}
                </li>
                <li>{renderLink("/upload-resume", true, "Upload your resume")}</li>
                <li>{renderLink("/salary-check", true, "Check your salary")}</li>
                <li>
                  {renderLink(
                    "/best-law-firms/houston-tx",
                    true,
                    "Best firms to work for"
                  )}
                </li>
                <li>{renderLink("/candidates", true, "Candidates overview")}</li>
              </ul>
            </div>

            {/* Salary guides */}
            <div>
              <details className="fgroup" open>
                <summary>
                  <h2>Salary guides</h2>
                </summary>
                <ul>
                  <li>
                    {renderLink(
                      "/salaries/estate-planning-attorney/houston-tx",
                      true,
                      "Estate planning attorney, Houston"
                    )}
                  </li>
                  {roles.map((r) => (
                    <li key={r.slug}>
                      {renderLink(`/roles/${r.slug}`, !!r.built, r.name)}
                    </li>
                  ))}
                </ul>
              </details>
            </div>

            {/* Cities */}
            <div>
              <details className="fgroup" open>
                <summary>
                  <h2>Cities</h2>
                </summary>
                <ul>
                  {cities.map((c) => (
                    <li key={c.slug}>
                      {renderLink(
                        `/locations/${c.stateSlug}/${c.citySlug}`,
                        !!c.built,
                        c.name
                      )}
                    </li>
                  ))}
                </ul>
              </details>
            </div>

            {/* About */}
            <div>
              <h2>About</h2>
              <ul>
                <li>{renderLink("/about", true, "About Orion")}</li>
                <li>
                  <Link href="/about#reviews">Reviews</Link>
                </li>
                <li>
                  <Link href="/about#email-check">Is this email from Orion?</Link>
                </li>
                <li>
                  <Link href="/about#contact">Contact</Link>
                </li>
                <li>
                  <CalendlyLink />
                </li>
              </ul>
            </div>
          </div>

          <div className="base">
            <p className="f-security-note">
              Orion emails come only from{" "}
              {sendingDomains.map((d, i) => (
                <React.Fragment key={d}>
                  {i > 0 && " and "}
                  <Mark>{d}</Mark>
                </React.Fragment>
              ))}
              . If a message uses another domain, forward it to us before you
              reply.
            </p>
            <div className="f-bottom-row">
              <p className="f-copyright">
                © 2026 Orion Placement LLC · 510 Southeast 5th Avenue, Unit 1513, Fort Lauderdale, FL 33301. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {toastMsg && (
        <div className="toast show" role="status" aria-live="polite">
          {toastMsg}
        </div>
      )}
    </>
  );
}
