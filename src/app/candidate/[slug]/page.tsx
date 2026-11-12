import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  candidates,
  findCandidate,
  findCity,
  findRole,
  salaryPosition,
  fmt,
  matchCandidates,
  asOf,
} from "@/data";
import { Breadcrumb } from "@/components/Breadcrumb";
import { TrustLine, CalendlyLink } from "@/components/Rating";
import { SenderCard } from "@/components/SenderCard";
import { ResumeSheet } from "@/components/ResumeSheet";
import { SalaryBandBar } from "@/components/SalaryBand";
import { TermsTiles } from "@/components/TermsTiles";
import { ReviewCard } from "@/components/ReviewCard";
import { CandidateCard } from "@/components/CandidateCard";
import { GateForm } from "@/components/GateForm";
import { Mark } from "@/components/Mark";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return candidates.map((c) => ({
    slug: c.id.toLowerCase(),
  }));
}

export default async function CandidateProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const c = findCandidate(slug.toUpperCase()) || candidates.find((item) => item.id.toLowerCase() === slug.toLowerCase());

  if (!c) {
    notFound();
  }

  const role = findRole(c.role);
  const city = findCity(c.city);
  const mid = (c.pay[0] + c.pay[1]) / 2;
  const pos = salaryPosition(c.city, c.role, "b2", mid);

  const firmArticle = /^[aeiou]/i.test(c.firmType) ? "an" : "a";

  const fitRows: Array<[string, React.ReactNode]> = [
    ["Practice", c.mix.map((x) => x[0]).join(", ")],
    [
      "Experience",
      `${c.years} years, now at ${firmArticle} ${c.firmType.toLowerCase()} of ${c.firmSize}`,
    ],
    ["Bar", `${c.bars.join(", ")} (active)`],
    ["Location", `${c.area}; ${fmt.modes(c.modes).toLowerCase()}`],
    [
      "Pay",
      `${fmt.range(c.pay)} base, ${pos.where === "in" ? "inside" : pos.where} the ${city?.name || "local"} band`,
    ],
    ["Available", c.availability],
  ];

  // Similar candidates
  const similar = matchCandidates({
    role: c.role,
    city: c.city,
    years: "b2",
  })
    .filter((r) => r.c.id !== c.id)
    .slice(0, 3);

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Find candidates", href: "/find-candidates" },
          { label: c.id },
        ]}
      />

      {/* 1. Hero */}
      <section className="phero profile-hero">
        <div className="wrap">
          <div>
            <span className="eyebrow">
              Confidential candidate <Mark>{c.id}</Mark>
            </span>
            <h1>
              {role?.name || "Attorney"},{" "}
              <Mark>{c.years} years</Mark>,{" "}
              <Mark>{c.bars.join(", ")}</Mark> licence, open to{" "}
              <Mark>{city?.name || "local"}</Mark> seats
            </h1>
            <p className="from-line only-sm">
              <TrustLine />
            </p>
            <ul className="fit" id="fit" aria-label="How this candidate fits your seat">
              {fitRows.map(([label, val], idx) => (
                <li key={idx}>
                  <b>{label}</b>
                  <span>
                    <Mark>{val}</Mark>
                  </span>
                </li>
              ))}
            </ul>
            <div className="hero-act">
              <a className="btn btn-primary btn-lg" href="#request">
                Request the full profile
              </a>
            </div>
            <div className="hide-sm">
              <TrustLine />
            </div>
          </div>

          <aside aria-label="Who sent this">
            <p className="small muted aside-label">Sent to you by</p>
            <SenderCard personId="justin" withDomains full />
          </aside>
        </div>
      </section>

      {/* 2. Redacted resume preview */}
      <section className="block alt">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Resume preview</span>
            <h2>What the full profile shows</h2>
            <p>
              The real resume with names, schools and firms hidden. Highlighted lines are the parts most firms ask about first.
            </p>
          </div>
          <div className="split sheet-split">
            <ResumeSheet candidateId={c.id} />
            <div className="hide-sm">
              <h3 className="mini-h">Comes with the full profile</h3>
              <ul className="ticks">
                <li>Every role, with firm type, size and what they ran</li>
                <li>Bar admission and standing</li>
                <li>Pay expectation and notice period in their words</li>
                <li>References after a first interview</li>
              </ul>
              <p style={{ marginTop: 20 }}>
                <CalendlyLink
                  label="Questions first? Book 15 minutes with Justin"
                  className="link-arrow"
                />
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Pay expectation against the city band */}
      <section className="block">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Pay</span>
            <h2>
              Expects <span id="pay"><Mark>{fmt.range(c.pay)}</Mark></span> base
            </h2>
            <p id="pay-verdict">
              That sits {pos.where === "in" ? "inside" : pos.where} the usual {city?.name || ""} range for 4–7 years (
              <Mark>{pos.range ? fmt.range(pos.range) : ""}</Mark>). The brass line marks the middle of what they expect.
            </p>
          </div>
          <SalaryBandBar
            city={c.city}
            role={c.role}
            highlight="b2"
            marker={mid}
          />
          <p className="source">
            {city?.name || "Local"} band from{" "}
            <Link href={`/salaries/${c.role}/${c.city}`}>
              the {role?.short || "attorney"} salary guide
            </Link>
            , {asOf}.
          </p>
        </div>
      </section>

      {/* 4. Terms tiles */}
      <section className="block alt">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">What it costs</span>
            <h2>Free to see. Pay only if you hire</h2>
          </div>
          <TermsTiles />
          <div className="ask">
            <h3 className="mini-h">What you can ask before you sign</h3>
            <ul className="ticks cols">
              <li>Which firms, by name, once the candidate agrees</li>
              <li>Exact base and whether a bonus changes it</li>
              <li>Bar admission number and standing</li>
              <li className="hide-sm">Notice period and earliest start date</li>
              <li className="hide-sm">In-office days they accept</li>
              <li className="hide-sm">Why they are leaving their current firm</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Gate + what happens after you ask */}
      <section className="block" id="request">
        <div className="wrap split">
          <div id="gate">
            <GateForm
              eyebrow="Request the full profile"
              title={`Send me the full profile for ${c.id}`}
              bullets={[
                "The redacted resume, by email within the hour",
                "Firm names once the candidate agrees",
                "Our one-page terms. No agreement to see it",
              ]}
              button="Send me the full profile"
              preset="profile"
              candidateIds={[c.id]}
              role={c.role}
              city={c.city}
            />
          </div>
          <div>
            <h3 className="mini-h">What happens after you ask</h3>
            <ol className="timeline">
              <li className="done">
                <span className="when">Now</span>
                <p>Your request goes to Justin. Nothing is shared with the candidate's current firm.</p>
              </li>
              <li>
                <span className="when">
                  <Mark>Within one business hour</Mark>
                </span>
                <p>The full redacted resume and our one-page terms, by email.</p>
              </li>
              <li>
                <span className="when">
                  <Mark>Within one business day</Mark>
                </span>
                <p>Justin books an interview at a time that suits you.</p>
              </li>
              <li>
                <span className="when">Before the interview</span>
                <p>A one-page agreement. You pay only if you hire.</p>
              </li>
            </ol>
            <div className="side-review" style={{ marginTop: 20 }}>
              <ReviewCard reviewSlug="brett-zimmerman" compact />
            </div>
          </div>
        </div>
      </section>

      {/* 6. Similar candidates */}
      {similar.length > 0 && (
        <section className="block alt" id="similar">
          <div className="wrap">
            <div className="sec-head row">
              <div>
                <span className="eyebrow">Similar candidates</span>
                <h2>Others open to {city?.name || "local"} seats</h2>
              </div>
              <Link
                className="more link-arrow hide-sm"
                href={`/find-candidates#role=${c.role}&city=${c.city}`}
              >
                Describe your seat for more
              </Link>
            </div>
            <div className="cards">
              {similar.map((r) => (
                <CandidateCard
                  key={r.c.id}
                  candidate={r.c}
                  result={r}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. CTA band */}
      <div className="wrap">
        <div className="cta-band">
          <div className="wrap row">
            <div>
              <h2>Ready to meet this candidate?</h2>
              <p>The full redacted resume comes within one business hour. No fee unless you hire.</p>
            </div>
            <a className="btn btn-primary btn-lg" href="#request">
              Request the full profile
            </a>
          </div>
        </div>
      </div>

      <div className="mbar">
        <a className="btn btn-primary" href="#request" id="mbar-cta">
          Request the full profile
        </a>
      </div>
    </>
  );
}
