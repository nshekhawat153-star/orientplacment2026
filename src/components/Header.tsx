"use client";

import React, { useState, useEffect } from "react";
import "./header-nav.css";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cities, roles, people } from "@/data";
import { RatingBadge } from "./Rating";
import { Chevron } from "./icons";

const CANDIDATE_PATHS = [
  "/candidates",
  "/upload-resume",
  "/salary-check",
  "/best-law-firms",
  "/jobs",
];

// ---- Menu content. Every link points at a page that exists. ----
type NavLink = { label: string; href: string; desc?: string; icon?: string };

const FIRM_HIRE: NavLink[] = [
  { label: "Find candidates", href: "/find-candidates", desc: "Describe the seat, see screened profiles", icon: "search" },
  { label: "Submit a job", href: "/submit-job", desc: "Paste your posting, free", icon: "post" },
  { label: "Fees and guarantee", href: "/fees", desc: "No retainer, 90-day replacement", icon: "shield" },
  { label: "Employers overview", href: "/employers", desc: "How Orion works for law firms", icon: "users" },
];

const FIRM_TOOLS: NavLink[] = [
  { label: "Salary guides", href: "/salaries/estate-planning-attorney/houston-tx", desc: "Pay bands by practice, city and years", icon: "chart" },
  { label: "Hiring kits", href: "/hiring-kit/estate-planning-attorney", desc: "Job description, questions, scorecard", icon: "doc" },
  { label: "Where to post a job", href: "/where-to-post/houston-tx", desc: "Legal job boards compared", icon: "megaphone" },
  { label: "Where to hire from", href: "/where-to-hire/houston-tx", desc: "Law schools, programs and bar groups", icon: "school" },
];

const CAND_LINKS: NavLink[] = [
  { label: "Open jobs", href: "/jobs", desc: "Confidential roles, pay on every listing", icon: "briefcase" },
  { label: "Upload your resume", href: "/upload-resume", desc: "See matching roles, in private", icon: "doc" },
  { label: "Check your salary", href: "/salary-check", desc: "Your base against your city and level", icon: "chart" },
  { label: "Best firms to work for", href: "/best-law-firms/houston-tx", desc: "Firms that publish their pay", icon: "star" },
  { label: "Candidates overview", href: "/candidates", desc: "Free and confidential, from the first call", icon: "users" },
];

const NV_ICONS: Record<string, React.ReactNode> = {
  search: (<><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" /></>),
  post: (<><rect x="4" y="3.5" width="16" height="17" rx="2.5" /><path d="M8 8.5h8M8 12h8M8 15.5h5" /></>),
  shield: (<><path d="M12 3 5 5.6v5.6c0 4.5 3 8 7 9.8 4-1.8 7-5.3 7-9.8V5.6L12 3Z" /><path d="m9 12 2.2 2.2L15.5 10" /></>),
  users: (<><circle cx="9" cy="8.5" r="3.2" /><path d="M3.5 19c.7-3 2.9-4.6 5.5-4.6s4.8 1.6 5.5 4.6" /><path d="M15.5 5.6a3 3 0 0 1 0 5.8M17.5 14.6c1.6.6 2.6 2 3 4.4" /></>),
  briefcase: (<><rect x="3.5" y="7" width="17" height="12.5" rx="2.5" /><path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M3.5 12.5h17" /></>),
  doc: (<><path d="M14 3.5H7.5A2 2 0 0 0 5.5 5.5v13a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V8l-4.5-4.5Z" /><path d="M14 3.5V8h4.5M9 13h6M9 16.5h4" /></>),
  chart: (<><path d="M4 20h16" /><path d="M7 16v-4M12 16V7M17 16v-6" /></>),
  megaphone: (<><path d="M4 10v4a1 1 0 0 0 1 1h2l5 4V5L7 9H5a1 1 0 0 0-1 1Z" /><path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a7.5 7.5 0 0 1 0 11" /></>),
  school: (<><path d="m3 9 9-4.5L21 9l-9 4.5L3 9Z" /><path d="M7 11v4.5c1.4 1.3 3 2 5 2s3.6-.7 5-2V11M21 9v5" /></>),
  star: (<path d="m12 3.8 2.5 5.1 5.6.8-4 4 .9 5.6-5-2.6-5 2.6.9-5.6-4-4 5.6-.8L12 3.8Z" />),
};

function NvIcon({ name }: { name: string }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {NV_ICONS[name]}
    </svg>
  );
}

const NvArrow = () => (
  <svg viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 10h12M11 5l5 5-5 5" />
  </svg>
);

export function Header({ minimal = false }: { minimal?: boolean }) {
  const pathname = usePathname();
  const isHome =
    pathname === "/" ||
    pathname === "/employers" ||
    pathname === "/candidates" ||
    pathname === "/jobs" ||
    pathname.startsWith("/jobs/") ||
    pathname === "/hire-attorneys" ||
    pathname === "/fees" ||
    pathname === "/submit-job" ||
    pathname === "/find-candidates" ||
    pathname === "/upload-resume" ||
    pathname === "/salary-check" ||
    pathname.startsWith("/candidate/") ||
    pathname.startsWith("/salaries/") ||
    pathname.startsWith("/locations/") ||
    pathname.startsWith("/roles/") ||
    pathname.startsWith("/best-law-firms/") ||
    pathname.startsWith("/where-to-hire/") ||
    pathname.startsWith("/where-to-post/") ||
    pathname.startsWith("/hiring-kit/") ||
    pathname === "/about" ||
    pathname === "/design-concept";
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isCandidatePage = CANDIDATE_PATHS.some((p) => pathname.startsWith(p));
  const isHireAttorneys = pathname.startsWith("/hire-attorneys");
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
    // Leaving phone width with the drawer open: close it
    const handleResize = () => {
      if (window.innerWidth > 1080) setMobileOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Close menus on route change
  useEffect(() => {
    setActiveGroup(null);
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.documentElement.classList.add("mnav-open");
      document.body.classList.add("mnav-open");
    } else {
      document.documentElement.classList.remove("mnav-open");
      document.body.classList.remove("mnav-open");
    }
    return () => {
      document.documentElement.classList.remove("mnav-open");
      document.body.classList.remove("mnav-open");
    };
  }, [mobileOpen]);

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

  const closeAll = () => {
    setActiveGroup(null);
    setMobileOpen(false);
  };

  const isActive = (href: string) => pathname === href.split("#")[0];

  return (
    <>
      <header
        className={`site-header ${isScrolled ? "scrolled" : "at-top"} ${
          isHome ? "header-on-dark" : ""
        } ${pathname.startsWith("/hire-attorneys") ? "header-hire-attorneys" : ""}`}
      >
        <div className="wrap">
          {/* Logo: On /hire-attorneys ad page, keep unlinked to prevent ad traffic leaks */}
          {isHireAttorneys ? (
            <div className="logo" style={{ display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none", cursor: "default" }}>
              <Image
                src="/images/orion-logo.png"
                alt="Orion Placement"
                className="logo-img"
                width={48}
                height={48}
                priority
              />
              <span
                className="ha-nav-brand-name hidden-mobile"
                style={{ color: "#FFFFFF", fontFamily: "var(--display)", fontSize: 18, fontWeight: 500, letterSpacing: "-0.01em" }}
              >
                Orion Placement
              </span>
            </div>
          ) : (
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
          )}

          {/* Ad landing page header CTA: opens the intake popup */}
          {isHireAttorneys && (
            <a
              href="#intake-form"
              data-open-intake-modal="true"
              className="ha-nav-cta"
              style={{
                marginLeft: "auto",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                background: "linear-gradient(135deg, #1D4ED8 0%, #1E40AF 100%)",
                color: "#FFFFFF",
                fontWeight: 600,
                fontSize: 14,
                padding: "11px 22px",
                borderRadius: 10,
                textDecoration: "none",
                whiteSpace: "nowrap",
                boxShadow: "0 6px 18px rgba(29, 78, 216, 0.4)",
              }}
            >
              <span>Request Candidates</span>
              <span aria-hidden="true">→</span>
            </a>
          )}

          {/* Desktop nav (hidden on the /hire-attorneys ad page) */}
          {!isHireAttorneys && (
            <nav className="nav nv" aria-label="Main">
              <ul className="nv-list">
                {/* For law firms */}
                <li
                  className="nv-item"
                  onMouseEnter={() => setActiveGroup("emp")}
                  onMouseLeave={() => setActiveGroup(null)}
                >
                  <button
                    type="button"
                    className="nv-top"
                    aria-expanded={activeGroup === "emp"}
                    aria-controls="np-emp"
                    onClick={() => setActiveGroup(activeGroup === "emp" ? null : "emp")}
                  >
                    For law firms <Chevron />
                  </button>
                  <div className="nv-panel is-wide" id="np-emp" hidden={activeGroup !== "emp"}>
                    <div className="nv-panel-in">
                      <div className="nv-col">
                        <p className="nv-k">Hire with Orion</p>
                        <ul className="nv-rich">
                          {FIRM_HIRE.map((l) => (
                            <li key={l.href}>
                              <Link href={l.href} className={`nv-rich-a${isActive(l.href) ? " is-current" : ""}`} onClick={closeAll}>
                                <span className="nv-ico">{l.icon && <NvIcon name={l.icon} />}</span>
                                <span className="nv-rich-t">
                                  <b>{l.label}</b>
                                  <span>{l.desc}</span>
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="nv-col nv-col-tools">
                        <p className="nv-k">Free hiring tools</p>
                        <ul className="nv-rich">
                          {FIRM_TOOLS.map((l) => (
                            <li key={l.href}>
                              <Link href={l.href} className={`nv-rich-a${isActive(l.href) ? " is-current" : ""}`} onClick={closeAll}>
                                <span className="nv-ico">{l.icon && <NvIcon name={l.icon} />}</span>
                                <span className="nv-rich-t">
                                  <b>{l.label}</b>
                                  <span>{l.desc}</span>
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="nv-feature">
                        <p className="nv-feature-k">Start a search</p>
                        <p className="nv-feature-t">Screened candidates for your open seat.</p>
                        <Link className="nv-feature-btn" href="/find-candidates" onClick={closeAll}>
                          Find candidates <NvArrow />
                        </Link>
                        <Link className="nv-feature-btn is-ghost" href="/submit-job" onClick={closeAll}>
                          Submit a job, free <NvArrow />
                        </Link>
                        <div className="nv-feature-talk">
                          <Image src={justin.photo} alt="" width={80} height={80} className="nv-feature-photo" />
                          <span>
                            Prefer to talk?{" "}
                            <a href={justin.calendly} target="_blank" rel="noopener noreferrer" onClick={closeAll}>
                              Book 15 min with Justin
                            </a>
                          </span>
                        </div>
                        <span className="nv-feature-rating">
                          <RatingBadge size="sm" dark />
                        </span>
                      </div>
                    </div>
                  </div>
                </li>

                {/* For candidates */}
                <li
                  className="nv-item"
                  onMouseEnter={() => setActiveGroup("cand")}
                  onMouseLeave={() => setActiveGroup(null)}
                >
                  <button
                    type="button"
                    className="nv-top"
                    aria-expanded={activeGroup === "cand"}
                    aria-controls="np-cand"
                    onClick={() => setActiveGroup(activeGroup === "cand" ? null : "cand")}
                  >
                    For candidates <Chevron />
                  </button>
                  <div className="nv-panel is-mid" id="np-cand" hidden={activeGroup !== "cand"}>
                    <div className="nv-panel-in">
                      <div className="nv-col">
                        <p className="nv-k">Your next move</p>
                        <ul className="nv-rich">
                          {CAND_LINKS.map((l) => (
                            <li key={l.href}>
                              <Link href={l.href} className={`nv-rich-a${isActive(l.href) ? " is-current" : ""}`} onClick={closeAll}>
                                <span className="nv-ico">{l.icon && <NvIcon name={l.icon} />}</span>
                                <span className="nv-rich-t">
                                  <b>{l.label}</b>
                                  <span>{l.desc}</span>
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="nv-feature is-cand">
                        <p className="nv-feature-k">Free and confidential</p>
                        <p className="nv-feature-t">No firm sees your name until you say yes.</p>
                        <p className="nv-feature-s">Always free for candidates. Every role shows the pay range.</p>
                        <Link className="nv-feature-btn" href="/jobs" onClick={closeAll}>
                          See open jobs <NvArrow />
                        </Link>
                        <Link className="nv-feature-btn is-ghost" href="/upload-resume" onClick={closeAll}>
                          Upload your resume <NvArrow />
                        </Link>
                        <span className="nv-feature-rating">
                          <RatingBadge size="sm" dark />
                        </span>
                      </div>
                    </div>
                  </div>
                </li>

                {/* Salary guides */}
                <li
                  className="nv-item"
                  onMouseEnter={() => setActiveGroup("sal")}
                  onMouseLeave={() => setActiveGroup(null)}
                >
                  <button
                    type="button"
                    className="nv-top"
                    aria-expanded={activeGroup === "sal"}
                    aria-controls="np-sal"
                    onClick={() => setActiveGroup(activeGroup === "sal" ? null : "sal")}
                  >
                    Salary guides <Chevron />
                  </button>
                  <div className="nv-panel is-wide" id="np-sal" hidden={activeGroup !== "sal"}>
                    <div className="nv-panel-in is-sal">
                      <Link
                        href="/salaries/estate-planning-attorney/houston-tx"
                        className="nv-bench"
                        onClick={closeAll}
                      >
                        <span className="nv-feature-k">Featured guide</span>
                        <span className="nv-bench-t">Estate planning attorney pay in Houston</span>
                        <span className="nv-bench-s">Pay bands by years of practice, with the median.</span>
                        <span className="nv-bench-go">
                          Read the guide <NvArrow />
                        </span>
                      </Link>
                      <div className="nv-col">
                        <p className="nv-k">By practice area</p>
                        <ul className="nv-plain is-2col">
                          {roles.map((r) => (
                            <li key={r.slug}>
                              <Link href={`/roles/${r.slug}`} className={isActive(`/roles/${r.slug}`) ? "is-current" : undefined} onClick={closeAll}>
                                {r.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="nv-col">
                        <p className="nv-k">By city</p>
                        <ul className="nv-plain is-2col">
                          {cities.map((c) => (
                            <li key={c.slug}>
                              <Link
                                href={`/locations/${c.stateSlug}/${c.citySlug}#pay`}
                                className={isActive(`/locations/${c.stateSlug}/${c.citySlug}`) ? "is-current" : undefined}
                                onClick={closeAll}
                              >
                                {c.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>

              </ul>
            </nav>
          )}

          {/* Header CTA for standard pages */}
          {!isHireAttorneys && (
            <Link className={`btn btn-primary btn-sm header-cta${pathname === "/" ? " header-cta-home" : ""}`} href={cta.href}>
              {cta.label}
            </Link>
          )}



          {/* Mobile hamburger button - Hidden on /hire-attorneys */}
          {!isHireAttorneys && (
            <button
              type="button"
              className="menu-btn"
              aria-expanded={mobileOpen}
              aria-controls="mnav"
              aria-label="Open navigation menu"
              onClick={() => {
                // Phone menu always opens with every section closed
                setMobileExpanded({});
                setMobileOpen(true);
              }}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="3.5" y1="6" x2="20.5" y2="6" />
                <line x1="3.5" y1="12" x2="20.5" y2="12" />
                <line x1="3.5" y1="18" x2="20.5" y2="18" />
              </svg>
            </button>
          )}
        </div>
      </header>

      {/* Mobile Drawer Menu - Hidden on /hire-attorneys */}
      {!isHireAttorneys && (
        <div
          className="mnav"
          id="mnav"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          hidden={!mobileOpen}
        >
        <div className="mnav-top">
          <Link
            className="logo"
            href="/"
            aria-label="Orion Placement"
            onClick={() => setMobileOpen(false)}
          >
            <Image
              src="/images/orion-logo.png"
              alt="Orion Placement"
              className="logo-img"
              width={40}
              height={40}
            />
          </Link>
          <button
            type="button"
            className="mnav-close"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="mnav-body mn">
          {/* Main actions first */}
          <div className="mn-ctas">
            <Link
              className="mn-primary"
              href={isCandidatePage ? "/jobs" : "/find-candidates"}
              onClick={closeAll}
            >
              <span>
                <span className="mn-primary-t">{isCandidatePage ? "See open jobs" : "Find candidates"}</span>
                <span className="mn-primary-s">
                  {isCandidatePage ? "Confidential roles, pay shown." : "Describe the seat, see screened profiles."}
                </span>
              </span>
              <NvArrow />
            </Link>
            <Link
              className="mn-primary is-ghost"
              href={isCandidatePage ? "/upload-resume" : "/submit-job"}
              onClick={closeAll}
            >
              <span>
                <span className="mn-primary-t">{isCandidatePage ? "Upload your resume" : "Submit a job, free"}</span>
                <span className="mn-primary-s">
                  {isCandidatePage ? "Free and private." : "Paste your posting. Nothing to pay unless you hire."}
                </span>
              </span>
              <NvArrow />
            </Link>
          </div>

          {/* Sections */}
          {[
            { key: "emp", title: "For law firms", links: [...FIRM_HIRE, ...FIRM_TOOLS] },
            { key: "cand", title: "For candidates", links: [...CAND_LINKS, { label: "Candidates overview", href: "/candidates" }] },
            {
              key: "sal",
              title: "Salary guides",
              links: [
                { label: "Estate planning attorney pay, Houston", href: "/salaries/estate-planning-attorney/houston-tx" },
                ...roles.map((r) => ({ label: r.name, href: `/roles/${r.slug}` })),
              ],
            },
            {
              key: "city",
              title: "Cities",
              links: cities.map((c) => ({ label: `${c.name}, ${c.state}`, href: `/locations/${c.stateSlug}/${c.citySlug}` })),
            },
          ].map((sec) => (
            <div className="mn-sec" key={sec.key}>
              <button
                type="button"
                className="mn-sec-btn"
                aria-expanded={!!mobileExpanded[sec.key]}
                aria-controls={`ma-${sec.key}`}
                onClick={() => setMobileExpanded((prev) => (prev[sec.key] ? {} : { [sec.key]: true }))}
              >
                {sec.title}
                <span className="mn-plus" aria-hidden="true" />
              </button>
              <ul className="mn-links" id={`ma-${sec.key}`} hidden={!mobileExpanded[sec.key]}>
                {sec.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} onClick={closeAll}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Talk to Justin */}
          <div className="mn-call">
            <Image src={justin.photo} alt="" width={80} height={80} className="mn-call-photo" />
            <span className="mn-call-t">
              <b>Talk to Justin</b>
              <span>Replies within an hour, business hours.</span>
            </span>
            <a className="mn-call-btn" href={justin.calendly} target="_blank" rel="noopener noreferrer" onClick={closeAll}>
              Book 15 min
            </a>
          </div>
        </div>

      </div>
      )}
    </>
  );
}
