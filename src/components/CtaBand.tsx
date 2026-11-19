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
      ? "Direct lateral opportunities at leading law firms. Free for candidates. No firm sees your name until you say yes."
      : "Screened attorneys and paralegals across the US. No retainer, and zero fee unless you hire.");
  const defaultButton =
    button || (isCand ? "Upload your resume" : "See candidates for my seat");
  const eyebrow = isCand
    ? "CONFIDENTIAL CANDIDATE SEARCH · 100% FREE"
    : "ORION PLACEMENT GUARANTEE · ZERO RISK";

  // Split title to apply luxury italic serif accent to the last word
  const renderTitle = (titleStr: string) => {
    const words = titleStr.split(" ");
    if (words.length > 1) {
      const lastWord = words.pop();
      return (
        <>
          {words.join(" ")}{" "}
          <span className="serif-accent">{lastWord}</span>
        </>
      );
    }
    return titleStr;
  };

  const perks = isCand ? (
    <div className="cta-perks">
      <span className="cta-perk">
        <span className="cta-perk-check" aria-hidden="true">✓</span>
        <span>100% confidential</span>
      </span>
      <span className="cta-perk">
        <span className="cta-perk-check" aria-hidden="true">✓</span>
        <span>Free for candidates</span>
      </span>
      <span className="cta-perk">
        <span className="cta-perk-check" aria-hidden="true">✓</span>
        <span>Direct partner access</span>
      </span>
    </div>
  ) : (
    <div className="cta-perks">
      <span className="cta-perk">
        <span className="cta-perk-check" aria-hidden="true">✓</span>
        <span>No retainer</span>
      </span>
      <span className="cta-perk">
        <span className="cta-perk-check" aria-hidden="true">✓</span>
        <span>Zero fee unless you hire</span>
      </span>
      <span className="cta-perk">
        <span className="cta-perk-check" aria-hidden="true">✓</span>
        <span>90-day replacement guarantee</span>
      </span>
    </div>
  );

  return (
    <section className="cta-band">
      {/* Faded Background Graphic Backdrop */}
      <div className="cta-bg-backdrop" aria-hidden="true">
        <div className="cta-bg-image" />
        <div className="cta-bg-overlay" />
      </div>

      <div className="wrap">
        <div className="cta-card-shell cta-card-compact">
          <div className="cta-col-main cta-copy">
            <div className="cta-eyebrow">
              <span className="cta-pulse" aria-hidden="true" />
              <span>{eyebrow}</span>
            </div>
            <h2 className="cta-title">{renderTitle(defaultTitle)}</h2>
            {perks}
          </div>
          <div className="cta-col-action cta-act">
            <p className="cta-lede">{defaultText}</p>
            <div className="cta-actions-row">
              <Link className="btn btn-cta-primary" href={defaultHref}>
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
            <div className="cta-trust-badge">
              <Stars />
              <span className="cta-trust-text">
                <b>{trust.rating} on Google</b> ·{" "}
                {isCand
                  ? "free for candidates, 100% confidential"
                  : "no fee unless you hire"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

