"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cities, roles, people } from "@/data";
import { RatingBadge, TrustLine, CalendlyLink } from "./Rating";
import { Chevron, BtnArrow } from "./icons";

const CANDIDATE_PATHS = [
  "/candidates",
  "/upload-resume",
  "/salary-check",
  "/best-law-firms",
  "/jobs",
];

const UNBUILT_MSG = "Prototype: only Houston × estate planning attorney is built.";

export function Header({ minimal = false }: { minimal?: boolean }) {
  const pathname = usePathname();
  const isHome =
    pathname === "/" ||
    pathname === "/employers" ||
    pathname === "/candidates" ||
    pathname === "/jobs" ||
    pathname.startsWith("/jobs/");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<Record<string, boolean>>({});
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showToast = (msg: string) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToastMsg(msg);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMsg(null);
    }, 3200);
  };

  const isCandidatePage = CANDIDATE_PATHS.some((p) => pathname.startsWith(p));
  const cta = isCandidatePage
    ? { label: "Upload resume", href: "/upload-resume" }
    : { label: "Find candidates", href: "/find-candidates" };

  const justin = people.find((p) => p.id === "justin") || people[0];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveGroup(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setActiveGroup(null);
    setMobileOpen(false);
  }, [pathname]);

  if (minimal || pathname.startsWith("/candidate/")) {
    return (
      <header className="site-header header-minimal">
        <div className="wrap">
          <Link className="logo" href="/" aria-label="Orion Placement">
            <Image
              src="/images/orion-logo.png"
              alt="Orion Placement"
              className="logo-img"
              width={48}
              height={48}
              priority
            />
          </Link>
          <span className="from">
            Sent by {justin.name} at Orion
            <br />
            <Link href="/about#email-check">Is this email from Orion?</Link>
          </span>
        </div>
      </header>
    );
  }

  const renderLink = (
    href: string,
    built: boolean,
    title: string,
    desc: string,
    className = "mi"
  ) => {
    if (built) {
      return (
        <Link href={href} className={className}>
          <b>{title}</b>
          <span>{desc}</span>
        </Link>
      );
    }
    return (
      <a
        href="#"
        data-unbuilt={UNBUILT_MSG}
        className={className}
        onClick={(e) => {
          e.preventDefault();
          showToast(UNBUILT_MSG);
        }}
      >
        <b>{title}</b>
        <span>{desc}</span>
      </a>
    );
  };

  return (
    <>
      <header
        className={`site-header ${isScrolled ? "scrolled" : "at-top"} ${
          isHome ? "header-on-dark" : ""
        }`}
      >
        <div className="wrap">
          <Link className="logo" href="/" aria-label="Orion Placement">
            <Image
              src="/images/orion-logo.png"
              alt="Orion Placement"
              className="logo-img"
              width={48}
              height={48}
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="nav" aria-label="Main">
            <ul className="nav-list">
              {/* 1. For employers */}
              <li
                className="nav-item"
                data-group="emp"
                onMouseEnter={() => setActiveGroup("emp")}
                onMouseLeave={() => setActiveGroup(null)}
              >
                <button
                  type="button"
                  className="nav-top"
                  aria-expanded={activeGroup === "emp"}
                  aria-controls="np-emp"
                  onClick={() =>
                    setActiveGroup(activeGroup === "emp" ? null : "emp")
                  }
                >
                  For employers <Chevron />
                </button>
                <div className="mega" id="np-emp" hidden={activeGroup !== "emp"}>
                  <div className="wrap mega-in has-aside">
                    <div className="mega-main">
                      <ul className="mega-list">
                        <li>
                          {renderLink(
                            "/find-candidates",
                            true,
                            "Find candidates",
                            "Describe the seat and see screened candidates now"
                          )}
                        </li>
                        <li>
                          {renderLink(
                            "/submit-job",
                            true,
                            "Submit a job",
                            "Paste your posting; we check the pay and match"
                          )}
                        </li>
                        <li>
                          {renderLink(
                            "/fees",
                            true,
                            "Fees and guarantee",
                            "One fee, only if you hire, with a calculator"
                          )}
                        </li>
                        <li>
                          {renderLink(
                            "/hiring-kit/estate-planning-attorney",
                            true,
                            "Hiring kits",
                            "Posting template, interview questions and a scorecard"
                          )}
                        </li>
                        <li>
                          {renderLink(
                            "/where-to-post/houston-tx",
                            true,
                            "Where to post a job",
                            "Job boards compared on cost and time to applicants"
                          )}
                        </li>
                        <li>
                          {renderLink(
                            "/where-to-hire/houston-tx",
                            true,
                            "Where to hire from",
                            "Law schools, paralegal programmes and bar groups"
                          )}
                        </li>
                        <li>
                          {renderLink(
                            "/employers",
                            true,
                            "Employers overview",
                            "How Orion works for small and mid-size firms"
                          )}
                        </li>
                      </ul>
                    </div>
                    <aside className="mega-aside">
                      <div className="mega-aside-talk">
                        <span className="eyebrow">Direct partner access</span>
                        <p>
                          Fifteen minutes with Justin: the seat, the pay, and who is
                          available now.
                        </p>
                        <CalendlyLink className="link-arrow" />
                      </div>
                      <div className="mega-aside-ctas">
                        <Link
                          className="btn btn-primary btn-sm btn-block mega-btn-primary"
                          href="/find-candidates"
                        >
                          <span>Find candidates</span>
                          <BtnArrow />
                        </Link>
                        <Link
                          className="btn btn-outline btn-sm btn-block mega-btn-outline"
                          href="/submit-job"
                        >
                          <span>Submit a job</span>
                          <BtnArrow />
                        </Link>
                      </div>
                      <div className="mega-aside-rating">
                        <RatingBadge size="sm" dark />
                      </div>
                    </aside>
                  </div>
                </div>
              </li>

              {/* 2. For candidates */}
              <li
                className="nav-item"
                data-group="cand"
                onMouseEnter={() => setActiveGroup("cand")}
                onMouseLeave={() => setActiveGroup(null)}
              >
                <button
                  type="button"
                  className="nav-top"
                  aria-expanded={activeGroup === "cand"}
                  aria-controls="np-cand"
                  onClick={() =>
                    setActiveGroup(activeGroup === "cand" ? null : "cand")
                  }
                >
                  For candidates <Chevron />
                </button>
                <div
                  className="mega"
                  id="np-cand"
                  hidden={activeGroup !== "cand"}
                >
                  <div className="wrap mega-in has-aside">
                    <div className="mega-main">
                      <ul className="mega-list">
                        <li>
                          {renderLink(
                            "/jobs",
                            true,
                            "Open jobs",
                            "Confidential roles with the pay on every listing"
                          )}
                        </li>
                        <li>
                          {renderLink(
                            "/upload-resume",
                            true,
                            "Upload your resume",
                            "See matching roles in seconds, in private"
                          )}
                        </li>
                        <li>
                          {renderLink(
                            "/salary-check",
                            true,
                            "Check your salary",
                            "Compare your base with your city and level"
                          )}
                        </li>
                        <li>
                          {renderLink(
                            "/best-law-firms/houston-tx",
                            true,
                            "Best firms to work for",
                            "Small and mid-size firms that publish their pay"
                          )}
                        </li>
                        <li>
                          {renderLink(
                            "/candidates",
                            true,
                            "Candidates overview",
                            "Free for candidates and confidential from the first call"
                          )}
                        </li>
                      </ul>
                    </div>
                    <aside className="mega-aside">
                      <div className="mega-aside-talk">
                        <span className="eyebrow">Confidential career move</span>
                        <p>
                          Always 100% free for candidates. No firm sees your name until you
                          say yes to an interview.
                        </p>
                      </div>
                      <div className="mega-aside-ctas">
                        <Link
                          className="btn btn-primary btn-sm btn-block mega-btn-primary"
                          href="/upload-resume"
                        >
                          <span>Upload resume</span>
                          <BtnArrow />
                        </Link>
                        <Link
                          className="btn btn-outline btn-sm btn-block mega-btn-outline"
                          href="/jobs"
                        >
                          <span>See open jobs</span>
                          <BtnArrow />
                        </Link>
                      </div>
                      <div className="mega-aside-rating">
                        <RatingBadge size="sm" dark />
                      </div>
                    </aside>
                  </div>
                </div>
              </li>

              {/* 3. Salary guides */}
              <li
                className="nav-item"
                data-group="sal"
                onMouseEnter={() => setActiveGroup("sal")}
                onMouseLeave={() => setActiveGroup(null)}
              >
                <button
                  type="button"
                  className="nav-top"
                  aria-expanded={activeGroup === "sal"}
                  aria-controls="np-sal"
                  onClick={() =>
                    setActiveGroup(activeGroup === "sal" ? null : "sal")
                  }
                >
                  Salary guides <Chevron />
                </button>
                <div className="mega" id="np-sal" hidden={activeGroup !== "sal"}>
                  <div className="wrap mega-in is-cols">
                    <div className="mega-main">
                      <div className="mega-feature">
                        <Link
                          href="/salaries/estate-planning-attorney/houston-tx"
                          className="mi mi-feature"
                        >
                          <span className="eyebrow">Featured benchmark · Houston</span>
                          <b>Estate planning attorney pay in Houston</b>
                          <span>
                            Bands by years of practice, the median, and verified market source
                          </span>
                          <span className="mega-feature-cta">
                            <span>Explore full report</span>
                            <span className="feature-arrow" aria-hidden="true">→</span>
                          </span>
                        </Link>
                      </div>
                      <div className="mega-col">
                        <h3>By role</h3>
                        <ul className="mega-list compact">
                          {roles.map((r) => (
                            <li key={r.slug}>
                              {renderLink(
                                `/roles/${r.slug}`,
                                !!r.built,
                                r.name,
                                `${
                                  r.kind === "attorney"
                                    ? "Attorney"
                                    : r.kind === "paralegal"
                                    ? "Paralegal"
                                    : "Legal staff"
                                } base pay by years, city by city`
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mega-col">
                        <h3>By city</h3>
                        <ul className="mega-list compact">
                          {cities.map((c) => (
                            <li key={c.slug}>
                              {renderLink(
                                `/locations/${c.stateSlug}/${c.citySlug}#pay`,
                                !!c.built,
                                `${c.name}, ${c.state}`,
                                `What ${c.name} firms pay, role by role`
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </nav>

          {/* Header CTA */}
          <Link className="btn btn-primary btn-sm header-cta" href={cta.href}>
            {cta.label}
          </Link>

          {/* Mobile hamburger button */}
          <button
            type="button"
            className="menu-btn"
            aria-expanded={mobileOpen}
            aria-controls="mnav"
            onClick={() => setMobileOpen(true)}
          >
            Menu
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        className="mnav"
        id="mnav"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        hidden={!mobileOpen}
      >
        <div className="mnav-top">
          <Link className="logo" href="/" aria-label="Orion Placement">
            <Image
              src="/images/orion-logo.png"
              alt="Orion Placement"
              className="logo-img"
              width={48}
              height={48}
            />
          </Link>
          <button
            type="button"
            className="mnav-close"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          >
            Close
          </button>
        </div>

        <div className="mnav-body">
          {/* Employers Accordion */}
          <div className="acc">
            <button
              type="button"
              className="acc-btn"
              aria-expanded={!!mobileExpanded["emp"]}
              aria-controls="ma-emp"
              onClick={() =>
                setMobileExpanded((prev) => ({ ...prev, emp: !prev.emp }))
              }
            >
              For employers <Chevron />
            </button>
            <div className="acc-panel" id="ma-emp" hidden={!mobileExpanded["emp"]}>
              <ul className="mega-list">
                <li>
                  {renderLink(
                    "/find-candidates",
                    true,
                    "Find candidates",
                    "Describe the seat and see screened candidates now"
                  )}
                </li>
                <li>
                  {renderLink(
                    "/submit-job",
                    true,
                    "Submit a job",
                    "Paste your posting; we check the pay and match"
                  )}
                </li>
                <li>
                  {renderLink(
                    "/fees",
                    true,
                    "Fees and guarantee",
                    "One fee, only if you hire, with a calculator"
                  )}
                </li>
                <li>
                  {renderLink(
                    "/hiring-kit/estate-planning-attorney",
                    true,
                    "Hiring kits",
                    "Posting template, interview questions and a scorecard"
                  )}
                </li>
                <li>
                  {renderLink(
                    "/where-to-post/houston-tx",
                    true,
                    "Where to post a job",
                    "Job boards compared on cost and time to applicants"
                  )}
                </li>
                <li>
                  {renderLink(
                    "/where-to-hire/houston-tx",
                    true,
                    "Where to hire from",
                    "Law schools, paralegal programmes and bar groups"
                  )}
                </li>
                <li>
                  {renderLink(
                    "/employers",
                    true,
                    "Employers overview",
                    "How Orion works for small and mid-size firms"
                  )}
                </li>
              </ul>
            </div>
          </div>

          {/* Candidates Accordion */}
          <div className="acc">
            <button
              type="button"
              className="acc-btn"
              aria-expanded={!!mobileExpanded["cand"]}
              aria-controls="ma-cand"
              onClick={() =>
                setMobileExpanded((prev) => ({ ...prev, cand: !prev.cand }))
              }
            >
              For candidates <Chevron />
            </button>
            <div
              className="acc-panel"
              id="ma-cand"
              hidden={!mobileExpanded["cand"]}
            >
              <ul className="mega-list">
                <li>
                  {renderLink(
                    "/jobs",
                    true,
                    "Open jobs",
                    "Confidential roles with the pay on every listing"
                  )}
                </li>
                <li>
                  {renderLink(
                    "/upload-resume",
                    true,
                    "Upload your resume",
                    "See matching roles in seconds, in private"
                  )}
                </li>
                <li>
                  {renderLink(
                    "/salary-check",
                    true,
                    "Check your salary",
                    "Compare your base with your city and level"
                  )}
                </li>
                <li>
                  {renderLink(
                    "/best-law-firms/houston-tx",
                    true,
                    "Best firms to work for",
                    "Small and mid-size firms that publish their pay"
                  )}
                </li>
                <li>
                  {renderLink(
                    "/candidates",
                    true,
                    "Candidates overview",
                    "Free for candidates and confidential from the first call"
                  )}
                </li>
              </ul>
            </div>
          </div>

          {/* Salary Guides Accordion */}
          <div className="acc">
            <button
              type="button"
              className="acc-btn"
              aria-expanded={!!mobileExpanded["sal"]}
              aria-controls="ma-sal"
              onClick={() =>
                setMobileExpanded((prev) => ({ ...prev, sal: !prev.sal }))
              }
            >
              Salary guides <Chevron />
            </button>
            <div className="acc-panel" id="ma-sal" hidden={!mobileExpanded["sal"]}>
              <ul className="mega-list compact">
                <li>
                  {renderLink(
                    "/salaries/estate-planning-attorney/houston-tx",
                    true,
                    "Estate planning attorney pay in Houston",
                    "Bands by years of practice, the median and the source"
                  )}
                </li>
              </ul>
              <h3>By role</h3>
              <ul className="mega-list compact">
                {roles.map((r) => (
                  <li key={r.slug}>
                    {renderLink(
                      `/roles/${r.slug}`,
                      !!r.built,
                      r.name,
                      `${
                        r.kind === "attorney"
                          ? "Attorney"
                          : r.kind === "paralegal"
                          ? "Paralegal"
                          : "Legal staff"
                      } base pay by years`
                    )}
                  </li>
                ))}
              </ul>
              <h3>By city</h3>
              <ul className="mega-list compact">
                {cities.map((c) => (
                  <li key={c.slug}>
                    {renderLink(
                      `/locations/${c.stateSlug}/${c.citySlug}#pay`,
                      !!c.built,
                      `${c.name}, ${c.state}`,
                      `What ${c.name} firms pay`
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mnav-foot">
          <Link
            className="btn btn-primary btn-block"
            href={cta.href}
            onClick={() => setMobileOpen(false)}
          >
            {cta.label}
          </Link>
          <TrustLine kind={isCandidatePage ? "candidate" : "employer"} />
        </div>
      </div>

      {/* Prototype Notice Toast */}
      {toastMsg && (
        <div className="toast show" role="status" aria-live="polite">
          {toastMsg}
        </div>
      )}
    </>
  );
}
