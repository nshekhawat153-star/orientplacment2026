"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import "@/app/jobs/jobs-redesign.css";
import "./role-city-jobs.css";
import { jobs, roles, cities, findCity, findRole, findBand, fmt, Job } from "@/data";
import { JobListCard } from "@/app/jobs/components/JobListCard";
import { JobSeatPane } from "@/app/jobs/components/JobSeatPane";
import { PkHero, PkSection, PkCallCard, PkArrow } from "@/components/PageKit";

/* /jobs/[role]/[city]: same cards and seat pane as /jobs, scoped to one role and city. */
export default function JobsClient({ roleParam, cityParam }: { roleParam: string; cityParam: string }) {
  const roleSlug = roleParam || "estate-planning-attorney";
  const citySlug = cityParam || "houston-tx";
  const role = findRole(roleSlug) || roles[0];
  const city = findCity(citySlug) || cities[0];

  const list = useMemo(
    () => jobs.filter((j) => j.role === roleSlug && j.city === citySlug).sort((a, b) => b.posted.localeCompare(a.posted)),
    [roleSlug, citySlug]
  );
  const [activeId, setActiveId] = useState<string | null>(null);
  const [sheet, setSheet] = useState(false);
  const active: Job | null = list.find((j) => j.id === activeId) || list[0] || null;
  const band = findBand(citySlug, roleSlug);

  useEffect(() => {
    if (!sheet) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSheet(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [sheet]);

  const select = (j: Job) => {
    setActiveId(j.id);
    if (window.innerWidth < 1024) setSheet(true);
  };

  const otherRoles = roles
    .filter((r) => r.slug !== roleSlug)
    .map((r) => ({ r, count: jobs.filter((j) => j.role === r.slug && j.city === citySlug).length }))
    .filter((x) => x.count > 0);
  const otherCities = cities
    .filter((c) => c.slug !== citySlug)
    .map((c) => ({ c, count: jobs.filter((j) => j.role === roleSlug && j.city === c.slug).length, b: findBand(c.slug, roleSlug) }))
    .filter((x) => x.count > 0 || x.b)
    .slice(0, 6);

  return (
    <div className="jb rc">
      <PkHero
        eyebrow={`${list.length} open ${list.length === 1 ? "seat" : "seats"} · pay shown on every one`}
        title={`${role.name} jobs`}
        accent={`in ${city.name}.`}
        lead={`Lateral seats at boutique and mid-size ${city.name} firms${band ? `. Market base for this role runs ${fmt.range(band.b1)} to ${fmt.range(band.b3)} by experience` : ""}. Your name stays private until you say yes.`}
        primary={{ label: "Upload resume", href: `/upload-resume#role=${roleSlug}&city=${citySlug}` }}
        secondary={{ label: "All legal jobs", href: "/jobs" }}
      />

      <section className="jb-results rc-results" aria-label="Open seats">
        <div className="jb-wrap">
          {list.length === 0 ? (
            <div className="jb-empty">
              <h3>No listed {role.name.toLowerCase()} seat in {city.name} today.</h3>
              <p>Many seats are filled before they’re posted. Upload your resume once and Justin will reach out when one fits.</p>
              <div className="jb-empty-actions">
                <Link href={`/upload-resume#role=${roleSlug}&city=${citySlug}`} className="jb-btn is-dark">
                  Upload resume
                </Link>
                <Link href="/jobs" className="jb-btn is-line">
                  See all seats
                </Link>
              </div>
            </div>
          ) : (
            <div className="jb-split">
              <div className="jb-list">
                {list.map((j) => (
                  <JobListCard key={j.id} job={j} selected={active?.id === j.id} onSelect={select} />
                ))}
                <div className="jb-listnote">
                  <p>
                    <b>Not the right seat?</b> Upload your resume and Justin will match you to unlisted {city.name} seats.
                  </p>
                  <Link href={`/upload-resume#role=${roleSlug}&city=${citySlug}`}>Upload resume for confidential matching →</Link>
                </div>
              </div>
              <div className="jb-pane">{active && <JobSeatPane key={active.id} job={active} />}</div>
            </div>
          )}
        </div>
      </section>

      <PkSection tone="dark" kicker="Related" title="More seats" accent="nearby.">
        <div className="rc-related">
          {otherRoles.length > 0 && (
            <div className="rc-list">
              <div className="rc-list-h">
                <b>Other roles in {city.name}</b>
                <span>Open</span>
              </div>
              {otherRoles.map(({ r, count }) => (
                <Link key={r.slug} href={`/jobs/${r.slug}/${citySlug}`}>
                  <span>{r.name}</span>
                  <b>{count}</b>
                </Link>
              ))}
            </div>
          )}
          <div className="rc-list">
            <div className="rc-list-h">
              <b>{role.name} in other cities</b>
              <span>Open</span>
            </div>
            {otherCities.map(({ c, count }) => (
              <Link key={c.slug} href={`/jobs/${roleSlug}/${c.slug}`}>
                <span>
                  {c.name}, {c.state}
                </span>
                <b>{count}</b>
              </Link>
            ))}
          </div>
        </div>
        {band && (
          <p className="rc-guide">
            <Link href={`/salaries/${roleSlug}/${citySlug}`}>
              {city.name} {role.name.toLowerCase()} salary guide <PkArrow size={14} />
            </Link>
          </p>
        )}
      </PkSection>

      <PkSection tone="light">
        <PkCallCard
          title="Want seats that never"
          accentWords="get posted?"
          text="Fifteen private minutes with Justin. Your current firm never knows you’re looking."
          secondary={{ label: "Check your pay", href: "/salary-check" }}
        />
      </PkSection>

      {sheet && active && (
        <div className="jb-sheet" role="dialog" aria-modal="true" aria-label={active.title}>
          <JobSeatPane key={active.id} job={active} onClose={() => setSheet(false)} />
        </div>
      )}
    </div>
  );
}
