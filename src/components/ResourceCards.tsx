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
    { href: string; icon: string; title: string; desc: string; get: string }
  > = {
    leaf: {
      href: "/salaries/estate-planning-attorney/houston-tx",
      icon: "chart",
      title: "Salary guides",
      desc: "What firms pay by role, city and years of practice.",
      get: "Bands, the median and the source, free",
    },
    kit: {
      href: "/hiring-kit/estate-planning-attorney",
      icon: "doc",
      title: "Hiring kit",
      desc: "Everything to run the hire yourself, ready to copy.",
      get: "Posting, interview questions, scorecard",
    },
    post: {
      href: "/where-to-post/houston-tx",
      icon: "post",
      title: "Where to post a job",
      desc: "Job boards compared on cost and speed.",
      get: "Cost and time to the first applicant",
    },
    hire: {
      href: "/where-to-hire/houston-tx",
      icon: "school",
      title: "Where to hire from",
      desc: "Law schools, programmes and bar groups.",
      get: "Who to contact and when they hire",
    },
    fees: {
      href: "/fees",
      icon: "percent",
      title: "Fee calculator",
      desc: "The fee on your salary, and what the guarantee covers.",
      get: "Your number in ten seconds",
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
            <Icon name={r.icon} />
            <h3>{r.title}</h3>
            <p>{r.desc}</p>
            <p className="rget">
              <b>You get</b> {r.get}
            </p>
            <span className="rgo">
              Open <Icon name="arrow" />
            </span>
          </Link>
        </div>
      ))}
    </div>
  );
}
