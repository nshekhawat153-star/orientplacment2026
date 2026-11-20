"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { orionLine, sendingDomains, cities, roles } from "@/data";
import { RatingBadge, CalendlyLink } from "./Rating";
import { GMark } from "./icons";
import { Mark } from "./Mark";

const UNBUILT_MSG = "Prototype: only Houston × estate planning attorney is built.";

export function Footer({ minimal = false }: { minimal?: boolean }) {
  const pathname = usePathname();
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    const handleDesktopExpand = () => {
      if (typeof window !== "undefined" && window.innerWidth > 900) {
        document.querySelectorAll<HTMLDetailsElement>(".site-footer .fgroup").forEach((el) => {
          el.open = true;
        });
      }
    };
    handleDesktopExpand();
    window.addEventListener("resize", handleDesktopExpand);
    return () => window.removeEventListener("resize", handleDesktopExpand);
  }, []);

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
                Direct intake legal recruiters for Texas law firms. Screened lateral attorneys and paralegals on 100% contingency.
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
              "linear-gradient(90deg, transparent 0%, transparent 20%, rgba(96, 165, 250, 0.12) 32%, rgba(147, 197, 253, 0.50) 50%, rgba(96, 165, 250, 0.12) 68%, transparent 80%, transparent 100%)",
          }}
        />
      </div>
      <footer className="site-footer">
        <div className="wrap">
          <div className="f-top">
            <Link className="logo" href="/" aria-label="Orion Placement">
              <Image
                src="/images/orion-logo.png"
                alt="Orion Placement"
                className="logo-img"
                width={68}
                height={68}
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
              <details className="fgroup">
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
              <details className="fgroup">
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
