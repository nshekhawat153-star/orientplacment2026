"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { orionLine, sendingDomains, cities, roles } from "@/data";
import { useSite } from "@/context/SiteContext";
import { RatingBadge, CalendlyLink } from "./Rating";
import { Mark } from "./Mark";

const UNBUILT_MSG = "Prototype: only Houston × estate planning attorney is built.";

export function Footer({ minimal = false }: { minimal?: boolean }) {
  const pathname = usePathname();
  const { marksOn, toggleMarks } = useSite();
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

  const marksBtn = (
    <button
      type="button"
      data-marks-toggle
      aria-pressed={marksOn}
      onClick={toggleMarks}
    >
      {marksOn ? "Hide sample marks" : "Show sample marks"}
    </button>
  );

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
            <p className="small">Prototype. {marksBtn}</p>
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
            <p>{orionLine}</p>
            <RatingBadge size="sm" dark />
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
            <p>
              © 2026 Orion Placement LLC · 510 Southeast 5th Avenue, Unit 1513, Fort Lauderdale, FL 33301. All rights reserved.
            </p>
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
