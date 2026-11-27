"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, notFound } from "next/navigation";
import "@/app/jobs/jobs-redesign.css";
import "@/app/where-to-hire/[city]/where-to-hire.css";
import "./best-firms.css";
import { DATA } from "@/data";
import { JobListCard } from "@/app/jobs/components/JobListCard";
import { PkHero, PkSection, PkCallCard, PkArrow } from "@/components/PageKit";

export function BestFirmsClient({ cityParam }: { cityParam: string }) {
  const router = useRouter();
  const city = DATA.cities.find((c) => c.slug === cityParam);
  const [practice, setPractice] = useState("All");
  if (!city) notFound();

  const firms = DATA.bestFirms[city.slug] || [];
  const criteria = DATA.bestFirmsCriteria || [];
  const practices = ["All", ...Array.from(new Set(firms.map((f) => f.practice)))];
  const shown = firms
    .filter((f) => practice === "All" || f.practice === practice)
    .sort((a, b) => {
      const d = practices.indexOf(a.practice) - practices.indexOf(b.practice);
      return d !== 0 ? d : (parseFloat(b.reviews) || 0) - (parseFloat(a.reviews) || 0);
    });
  const cityJobs = DATA.jobs.filter((j) => j.city === city.slug).slice(0, 3);

  return (
    <div className="wh">
      <PkHero
        eyebrow={`Firm guide · ${city.name}, ${city.state}`}
        title="Best small law firms to work for"
        accent={`in ${city.name}.`}
        lead={`Boutique and mid-size ${city.name} firms that pass five tests on focus, pay and reviews. No firm can pay to be listed.`}
        primary={{ label: "Upload resume for confidential matching", href: "/upload-resume" }}
        secondary={{ label: "See the firms", href: "#firms" }}
        trustItems={["No sponsored listings", "Pay published for every firm", "Firm names shared privately"]}
      />

      <PkSection tone="light" id="criteria" kicker="How firms are chosen" title="Five tests every listed firm" accent="must pass.">
        <ol className="bf-tests">
          {criteria.map(([k, v], i) => (
            <li key={k}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <h3>{k}</h3>
              <p>{v}</p>
            </li>
          ))}
        </ol>
      </PkSection>

      <PkSection
        tone="dark"
        id="firms"
        kicker="The list"
        title={`${city.name} firms that`}
        accent="meet all five."
        lead="Firm names are shared on a private call, once you want to talk to one."
      >
        <div className="wh-bar">
          <div className="wh-tabs bf-tabs" role="tablist" aria-label="Practice area">
            {practices.map((p) => (
              <button key={p} type="button" role="tab" aria-selected={practice === p} className={practice === p ? "is-on" : ""} onClick={() => setPractice(p)}>
                {p}
              </button>
            ))}
          </div>
        </div>
        <div className="wh-table bf-table">
          <div className="wh-tr wh-th">
            <span>Firm</span>
            <span>Size · area</span>
            <span>Base pay</span>
            <span>Works</span>
            <span>Reviews</span>
          </div>
          {shown.map((f, i) => (
            <div key={`${f.desc}-${i}`} className="wh-tr">
              <span>
                <span className="wh-name">{f.desc}</span>
                <small className="bf-prac">{f.practice}</small>
              </span>
              <span data-l="Size">
                {f.size} · {f.area}
              </span>
              <span data-l="Base pay" className="bf-pay">
                {f.pay}
              </span>
              <span data-l="Works">{f.mode}</span>
              <span data-l="Reviews" className="bf-rev">
                <b aria-hidden="true">★</b> {f.reviews}
              </span>
            </div>
          ))}
        </div>
      </PkSection>

      <PkSection
        tone="light"
        id="seats"
        kicker="Open now"
        title={`Lateral seats at`}
        accent={`${city.name} firms.`}
        lead="Confirmed openings with the pay shown. Your name stays private until you say yes."
      >
        <div className="bf-seats">
          {cityJobs.map((j) => (
            <JobListCard key={j.id} job={j} selected={false} onSelect={(x) => router.push(`/jobs?job=${encodeURIComponent(x.id)}`)} />
          ))}
        </div>
        <Link href={`/jobs?l=${encodeURIComponent(city.name)}`} className="wh-all">
          All {city.name} seats <PkArrow size={14} />
        </Link>
        <div className="wh-call">
          <PkCallCard
            title="Want an intro to"
            accentWords="one of these firms?"
            text="Tell Justin which firm interests you. He’ll share the name, the partners and the pay, privately."
            secondary={{ label: "Upload your resume", href: "/upload-resume" }}
          />
        </div>
      </PkSection>
    </div>
  );
}
