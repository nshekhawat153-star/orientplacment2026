import React from "react";
import Image from "next/image";
import { people, trust } from "@/data";
import { Stars } from "./icons";

export function PersonCard({ pid, row = false }: { pid: "justin" | "jon"; row?: boolean }) {
  const p = people.find((x) => x.id === pid) || people[0];
  const isJustin = pid === "justin";

  const roleBadge = isJustin ? (
    <span className="person-badge badge-strategy">
      <span className="badge-dot" /> SEARCH BRIEFING &amp; STRATEGY
    </span>
  ) : (
    <span className="person-badge badge-screening">
      <span className="badge-dot" /> NATIONAL SCREENING &amp; VETTING
    </span>
  );

  const quote = isJustin
    ? "Direct founder accountability on every legal mandate. We scope your practice needs once and deliver only screened, top-tier counsel."
    : "Every attorney and paralegal is rigorously pre-screened for bar standing, real matter experience, compensation expectations, and firm fit.";

  const actionSection = isJustin ? (
    <div className="person-cta-wrap">
      <a
        className="person-cal-btn"
        href={p.calendly || trust.calendly}
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg
          className="cal-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        <span>Book 15 minutes with Justin</span>
        <span className="arr-icon">→</span>
      </a>
    </div>
  ) : (
    <div className="person-cta-wrap">
      <div className="person-review-pill">
        <Stars />
        <span className="review-text">
          Named in <b>{trust.jonNamed} of our {trust.reviews}</b> Google reviews
        </span>
      </div>
    </div>
  );

  const cleanPhone = p.phone.replace(/[^0-9+]/g, "");

  return (
    <article className={`person person-card person-${pid}${row ? " row" : ""}`}>
      <div className="person-top-bar">
        <div className="person-avatar-wrap">
          <div className="portrait-ring">
            <Image
              src={p.photo.startsWith("/") ? p.photo : `/${p.photo}`}
              alt={p.name}
              className="portrait-img"
              width={80}
              height={80}
            />
          </div>
          <span className="verified-badge" title="Verified Founding Partner">
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>
        <div className="person-identity">
          {roleBadge}
          <h3 className="person-name">{p.name}</h3>
          <p className="person-title">
            {p.title} <span className="co-name">· Orion Placement</span>
          </p>
        </div>
      </div>
      <div className="person-body">
        <p className="person-desc">{p.does || p.note}</p>
        <div className="person-quote-box">
          <svg className="quote-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <p className="quote-body">&ldquo;{quote}&rdquo;</p>
        </div>
        <div className="person-footer">
          <div className="person-contacts">
            <a href={`tel:${cleanPhone}`} className="contact-pill" title="Call directly">
              <svg
                className="contact-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>{p.phone}</span>
            </a>
            <a href={`mailto:${p.email}`} className="contact-pill" title="Email directly">
              <svg
                className="contact-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <span>{p.email}</span>
            </a>
          </div>
          {actionSection}
        </div>
      </div>
    </article>
  );
}

export function PeopleSection() {
  return (
    <div className="people">
      <PersonCard pid="justin" />
      <PersonCard pid="jon" />
    </div>
  );
}
