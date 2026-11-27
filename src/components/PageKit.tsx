import React from "react";
import Link from "next/link";
import Image from "next/image";
import "./page-kit.css";
import { people, trust } from "@/data";

/* ------------------------------------------------------------------
   Shared building blocks for inner pages, in the homepage style:
   dark hero, alternating dark / light sections, serif headings with
   an italic accent, one FAQ style, one steps style, one call card.
   All classes are prefixed pk- so nothing else on the site changes.
   ------------------------------------------------------------------ */

export const PkCheck = ({ size = 14 }: { size?: number }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="3.5 8.5 6.5 11.5 12.5 4.5" />
  </svg>
);

export const PkArrow = ({ size = 16 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

type Cta = { label: string; href: string; external?: boolean };

function CtaLink({ cta, kind }: { cta: Cta; kind: "primary" | "ghost" | "line" | "dark" }) {
  const cls = `pk-btn is-${kind}`;
  if (cta.external || cta.href.startsWith("http")) {
    return (
      <a href={cta.href} className={cls} target="_blank" rel="noopener noreferrer">
        {cta.label}
        {kind === "primary" && <PkArrow />}
      </a>
    );
  }
  return (
    <Link href={cta.href} className={cls}>
      {cta.label}
      {kind === "primary" && <PkArrow />}
    </Link>
  );
}

/* ---------------- HERO ---------------- */
export function PkHero({
  eyebrow,
  title,
  accent,
  lead,
  primary,
  secondary,
  trustItems,
  align = "center",
  children,
  side,
}: {
  eyebrow: string;
  title: React.ReactNode;
  accent?: React.ReactNode;
  lead?: React.ReactNode;
  primary?: Cta;
  secondary?: Cta;
  trustItems?: string[];
  align?: "center" | "left";
  children?: React.ReactNode;
  /** right-hand column (forms, cards). Makes the hero two columns on desktop. */
  side?: React.ReactNode;
}) {
  return (
    <section className={`pk-hero${side ? " has-side" : ""} is-${side ? "left" : align}`}>
      <div className="pk-hero-wrap">
        <div className="pk-hero-copy">
          <p className="pk-eyebrow">
            <span aria-hidden="true" />
            {eyebrow}
          </p>
          <h1 className="pk-h1">
            {title}
            {accent && <em>{accent}</em>}
          </h1>
          {lead && <p className="pk-lead">{lead}</p>}
          {(primary || secondary) && (
            <div className="pk-actions">
              {primary && <CtaLink cta={primary} kind="primary" />}
              {secondary && <CtaLink cta={secondary} kind="ghost" />}
            </div>
          )}
          {children}
          {trustItems && trustItems.length > 0 && (
            <ul className="pk-trust">
              {trustItems.map((t) => (
                <li key={t}>
                  <PkCheck /> {t}
                </li>
              ))}
            </ul>
          )}
        </div>
        {side && <div className="pk-hero-side">{side}</div>}
      </div>
    </section>
  );
}

/* ---------------- SECTION ---------------- */
export function PkSection({
  tone = "light",
  id,
  kicker,
  title,
  accent,
  lead,
  center,
  children,
  narrow,
  className = "",
}: {
  tone?: "light" | "white" | "dark";
  id?: string;
  kicker?: string;
  title?: React.ReactNode;
  accent?: React.ReactNode;
  lead?: React.ReactNode;
  center?: boolean;
  narrow?: boolean;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`pk-sec is-${tone}${className ? ` ${className}` : ""}`}>
      <div className={`pk-wrap${narrow ? " is-narrow" : ""}`}>
        {(kicker || title) && (
          <div className={`pk-head${center ? " is-center" : ""}`}>
            {kicker && (
              <span className="pk-kicker">
                <span aria-hidden="true" />
                {kicker}
              </span>
            )}
            {title && (
              <h2 className="pk-h2">
                {title}
                {accent && (
                  <>
                    {" "}
                    <em>{accent}</em>
                  </>
                )}
              </h2>
            )}
            {lead && <p className="pk-sec-lead">{lead}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

/* ---------------- STEPS ---------------- */
export function PkSteps({ steps }: { steps: Array<{ t: string; d: string; tag?: string }> }) {
  return (
    <ol className={`pk-steps is-${steps.length}`}>
      {steps.map((s, i) => (
        <li key={s.t} className="pk-step">
          <span className="pk-step-n">{String(i + 1).padStart(2, "0")}</span>
          <h3>{s.t}</h3>
          <p>{s.d}</p>
          {s.tag && <span className="pk-step-tag">{s.tag}</span>}
        </li>
      ))}
    </ol>
  );
}

/* ---------------- TERMS STRIP ---------------- */
export function PkTerms({ items, link }: { items: Array<{ k: string; v: string }>; link?: Cta }) {
  return (
    <div className="pk-terms">
      <ul>
        {items.map((t) => (
          <li key={t.k}>
            <strong>{t.k}</strong>
            <span>{t.v}</span>
          </li>
        ))}
      </ul>
      {link && (
        <Link href={link.href} className="pk-terms-link">
          {link.label} <PkArrow />
        </Link>
      )}
    </div>
  );
}

/* ---------------- FAQ ---------------- */
export function PkFaq({ items }: { items: Array<{ q: string; a: React.ReactNode }> }) {
  return (
    <div className="pk-faq">
      {items.map((f, i) => (
        <details key={f.q} className="pk-faq-item" open={i === 0}>
          <summary>
            {f.q}
            <span className="pk-faq-ico" aria-hidden="true" />
          </summary>
          <div className="pk-faq-a">{f.a}</div>
        </details>
      ))}
    </div>
  );
}

/* ---------------- CARDS ---------------- */
export function PkCards({
  items,
  cols = 3,
}: {
  items: Array<{ title: string; text: React.ReactNode; href?: string; meta?: string; icon?: React.ReactNode }>;
  cols?: 2 | 3 | 4;
}) {
  return (
    <div className={`pk-cards is-${cols}`}>
      {items.map((c) => {
        const inner = (
          <>
            {c.icon && <span className="pk-card-ico">{c.icon}</span>}
            {c.meta && <span className="pk-card-meta">{c.meta}</span>}
            <h3>{c.title}</h3>
            <p>{c.text}</p>
            {c.href && (
              <span className="pk-card-go">
                Open <PkArrow size={14} />
              </span>
            )}
          </>
        );
        return c.href ? (
          <Link key={c.title} href={c.href} className="pk-card is-link">
            {inner}
          </Link>
        ) : (
          <div key={c.title} className="pk-card">
            {inner}
          </div>
        );
      })}
    </div>
  );
}

/* ---------------- CALL CARD (Justin) ---------------- */
export function PkCallCard({
  title = "Rather talk it through first?",
  accentWords,
  text = "Fifteen minutes with Justin. He’ll tell you what’s realistic for the seat and the pay.",
  secondary,
}: {
  title?: string;
  accentWords?: string;
  text?: string;
  secondary?: Cta;
}) {
  const justin = people.find((p) => p.id === "justin") || people[0];
  return (
    <div className="pk-call">
      <div className="pk-call-person">
        <Image src={justin.photo} alt={justin.name} width={80} height={80} className="pk-call-photo" />
        <div>
          <strong>{justin.name}</strong>
          <span>{justin.title}</span>
          <span className="pk-call-rating">
            <span aria-hidden="true">★</span> {trust.rating} · {trust.reviews} Google reviews
          </span>
        </div>
      </div>
      <div className="pk-call-copy">
        <h2>
          {title}
          {accentWords && (
            <>
              {" "}
              <em>{accentWords}</em>
            </>
          )}
        </h2>
        <p>{text}</p>
      </div>
      <div className="pk-call-actions">
        <a href={trust.calendly} target="_blank" rel="noopener noreferrer" className="pk-btn is-primary">
          Book 15 min with Justin <PkArrow />
        </a>
        {secondary && <CtaLink cta={secondary} kind="line" />}
      </div>
    </div>
  );
}
