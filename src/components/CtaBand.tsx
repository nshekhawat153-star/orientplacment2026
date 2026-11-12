import React from "react";
import Link from "next/link";
import { trust } from "@/data";
import { Stars, BtnArrow } from "./icons";

export interface CtaBandProps {
  title?: string;
  text?: string;
  button?: string;
  href?: string;
  kind?: "employer" | "candidate";
  cal?: boolean;
}

export function CtaBand({
  title,
  text,
  button,
  href,
  kind = "employer",
  cal = true,
}: CtaBandProps) {
  const isCand = kind === "candidate";
  const defaultHref = href || (isCand ? "/upload-resume" : "/find-candidates");
  const defaultTitle =
    title ||
    (isCand
      ? "See roles that pay what you are worth"
      : "See candidates for your seat today");
  const defaultText =
    text ||
    (isCand
      ? "Free for candidates. No firm sees your name until you say yes."
      : "Screened attorneys and paralegals, no retainer, and no fee unless you hire.");
  const defaultButton =
    button || (isCand ? "Upload your resume" : "See candidates for my seat");
  const eyebrow = isCand
    ? "CONFIDENTIAL CANDIDATE SEARCH"
    : "ORION PLACEMENT GUARANTEE";

  const perks = isCand ? (
    <div className="cta-perks">
      <span className="cta-perk">
        <svg
          viewBox="0 0 16 16"
          width="13"
          height="13"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M3 8.5l3.5 3.5L13 4" />
        </svg>{" "}
        100% confidential
      </span>
      <span className="cta-perk">
        <svg
          viewBox="0 0 16 16"
          width="13"
          height="13"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M3 8.5l3.5 3.5L13 4" />
        </svg>{" "}
        Free for candidates
      </span>
      <span className="cta-perk">
        <svg
          viewBox="0 0 16 16"
          width="13"
          height="13"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M3 8.5l3.5 3.5L13 4" />
        </svg>{" "}
        Direct partner access
      </span>
    </div>
  ) : (
    <div className="cta-perks">
      <span className="cta-perk">
        <svg
          viewBox="0 0 16 16"
          width="13"
          height="13"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M3 8.5l3.5 3.5L13 4" />
        </svg>{" "}
        No retainer
      </span>
      <span className="cta-perk">
        <svg
          viewBox="0 0 16 16"
          width="13"
          height="13"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M3 8.5l3.5 3.5L13 4" />
        </svg>{" "}
        Zero fee unless you hire
      </span>
      <span className="cta-perk">
        <svg
          viewBox="0 0 16 16"
          width="13"
          height="13"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M3 8.5l3.5 3.5L13 4" />
        </svg>{" "}
        2-year guarantee
      </span>
    </div>
  );

  return (
    <section className="cta-band">
      <div className="wrap">
        <div className="cta-card-shell cta-card-compact">
          <div className="cta-col-main cta-copy">
            <div className="cta-eyebrow">
              <span className="cta-pulse" aria-hidden="true" />
              <span>{eyebrow}</span>
            </div>
            <h2>{defaultTitle}</h2>
            {perks}
          </div>
          <div className="cta-col-action cta-act">
            <p>{defaultText}</p>
            <div className="cta-actions-row">
              <Link className="btn btn-cta-primary btn-light" href={defaultHref}>
                <span>{defaultButton}</span>
                <BtnArrow />
              </Link>
              {cal && !isCand && (
                <a
                  className="btn btn-cta-cal"
                  href={trust.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <span>Book 15 min with Justin</span>
                </a>
              )}
            </div>
            <div className="cta-trust-badge trust-line">
              <Stars />
              <span className="cta-trust-text">
                <b>{trust.rating} on Google</b> ·{" "}
                {isCand
                  ? "free for candidates, confidential"
                  : "no fee unless you hire"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
