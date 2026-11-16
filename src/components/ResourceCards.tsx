import React from "react";
import Link from "next/link";
import { Icon } from "./icons";

export interface ResourceCardsProps {
  set?: "home" | "employer" | "city";
  setType?: "home" | "employer" | "city";
  city?: string;
}

export function ResourceCards({
  set: passedSet,
  setType,
  city,
}: ResourceCardsProps) {
  const set = setType || passedSet || "home";
  const all: Record<
    string,
    { href: string; icon: string; tag: string; title: string; desc: string; get: string }
  > = {
    leaf: {
      href: "/salaries/estate-planning-attorney/houston-tx",
      icon: "chart",
      tag: "COMPENSATION",
      title: "Salary guides",
      desc: "Verified law firm compensation bands by practice area, city, and years of experience.",
      get: "Market bands, median base pay, and bonus structures",
    },
    kit: {
      href: "/hiring-kit/estate-planning-attorney",
      icon: "doc",
      tag: "INTERVIEW KIT",
      title: "Hiring kits",
      desc: "Complete attorney and paralegal interview kits, scoring rubrics, and job descriptions.",
      get: "Job posting template, screening questions, rubric",
    },
    post: {
      href: "/where-to-post/houston-tx",
      icon: "post",
      tag: "JOB BOARDS",
      title: "Where to post a job",
      desc: "Legal job boards compared on candidate quality, cost-per-applicant, and fill speed.",
      get: "Board cost comparisons & time-to-first-applicant",
    },
    hire: {
      href: "/where-to-hire/houston-tx",
      icon: "school",
      tag: "TALENT POOLS",
      title: "Where to hire from",
      desc: "Accredited law schools, clerkship programmes, and regional legal bar associations.",
      get: "Direct placement contacts & recruitment calendar",
    },
    fees: {
      href: "/fees",
      icon: "percent",
      tag: "CONTINGENCY",
      title: "Fee calculator",
      desc: "Transparent contingency calculation for your target salary and 90-day replacement terms.",
      get: "Instant fee estimate & guarantee breakdown",
    },
  };

  let keys: string[] = ["leaf", "kit", "post", "hire"];
  if (set === "city") {
    keys = ["post", "hire", "kit"];
  } else if (set === "employer") {
    keys = ["leaf", "kit", "post", "fees"];
  }

  const list = keys.map((k) => {
    const item = { ...all[k] };
    if (set === "city") {
      if (k === "post") item.title = "Where to post in Houston";
      if (k === "hire") item.title = "Where Houston hires come from";
      if (k === "kit") item.title = "Hiring kits";
    }
    return item;
  });

  return (
    <div className="rcards">
      {list.map((r, idx) => (
        <div key={idx}>
          <Link href={r.href} className="rcard">
            <div className="rcard-top-row">
              <div className="rcard-icon-wrap">
                <Icon name={r.icon} />
              </div>
              <span className="rcard-tag">{r.tag}</span>
            </div>
            <h3>{r.title}</h3>
            <p>{r.desc}</p>
            <div className="rget">
              <b>You get</b>
              <span className="rget-text">{r.get}</span>
            </div>
            <div className="rgo">
              <span>Access resource</span>
              <span className="rgo-arrow-wrap" aria-hidden="true">→</span>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
