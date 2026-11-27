"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "./home-hero-search.css";
import "@/app/find-candidates/find-candidates.css";
import { WorkEmailGateModal } from "@/app/find-candidates/components/WorkEmailGateModal";
import { CandidateDossierCard, SampleDossierCard } from "./CandidateDossierCard";
import { roles, cities, trust, people } from "@/data";
import {
  ParsedSeat,
  EnrichedCandidate,
  parseSeatInput,
  matchEnrichedCandidates,
} from "@/app/find-candidates/candidateData";

/* ------------------------------------------------------------------
   Homepage hero: describe the seat in plain words, see who fits.
   Parsing and matching reuse the /find-candidates engine, so the
   preview here and the full list there always agree.
   ------------------------------------------------------------------ */

// Each example returns real screened profiles from the current pool.
// "label" is the short chip text, "q" is the full sentence that gets searched.
// "short" is what phones show, so the examples fit without scrolling.
const EXAMPLES = [
  { label: "Estate planning attorney · Houston", short: "Estate planning", q: "Estate planning attorney in Houston, 3–5 years, up to $145k" },
  { label: "Litigation associate · 4+ yrs", short: "Litigation", q: "Litigation associate in Houston, 4+ years, on-site" },
  { label: "Estate planning paralegal", short: "Paralegal", q: "Estate planning paralegal, Houston, on-site" },
  { label: "Real estate attorney · $150k", short: "Real estate", q: "Real estate attorney in Houston, up to $150k" },
];

const TYPE_LINES = [
  "Estate planning attorney in Houston, 3–5 years, up to $145k, on-site…",
  "Litigation associate in Dallas with 6+ years of trial experience…",
  "Lateral partner with a portable book, commercial litigation…",
  "Bilingual paralegal for our probate team, hybrid…",
];

const YEARS_LABEL: Record<ParsedSeat["years"], string> = {
  any: "",
  "1-3": "1–3 yrs",
  "3-6": "3–6 yrs",
  "6+": "6+ yrs",
};

const MODE_LABEL: Record<ParsedSeat["mode"], string> = {
  any: "",
  "on-site": "On-site",
  hybrid: "Hybrid",
  remote: "Remote",
};

type Phase = "idle" | "thinking" | "done";

interface SampleProfile {
  key: string;
  title: string;
  location: string;
  experience: string;
  base: string;
}

/* ---------------- helpers ---------------- */

function roleName(slug: string | null) {
  if (!slug) return null;
  return roles.find((r) => r.slug === slug)?.name || null;
}

function cityName(slug: string | null) {
  if (!slug || slug === "any") return null;
  const c = cities.find((x) => x.slug === slug);
  return c ? `${c.name}, ${c.state}` : null;
}

function pluralRole(name: string) {
  const lower = name.toLowerCase();
  return lower.endsWith("s") ? lower : `${lower}s`;
}

/** Best-effort role wording taken from the visitor's own sentence, for seats we have no public profile for. */
function extractRoleLabel(text: string) {
  let s = text.trim().replace(/^https?:\/\/\S+/i, "");
  s = s.replace(/^(we('| a)?re |i'?m |)(looking for|need|hiring|seeking|want)\s+(an?\s+)?/i, "");
  s = s.split(/,| in | for | with | - |\(|\n/i)[0].trim();
  if (!s) return "Your seat";
  s = s.charAt(0).toUpperCase() + s.slice(1);
  return s.length > 56 ? `${s.slice(0, 54).trim()}…` : s;
}

function extractCityLabel(text: string, seat: ParsedSeat) {
  const known = cityName(seat.city);
  if (known) return known;
  const m = text.match(/\bin\s+([A-Z][a-zA-Z.]+(?:\s+[A-Z][a-zA-Z.]+)?)/);
  return m ? m[1] : "Your market";
}

function sampleExperience(seat: ParsedSeat, text: string) {
  const n = text.match(/(\d{1,2})\s*\+?\s*(?:years|yrs|yr)/i);
  if (n) return `${n[1]}+ years`;
  if (seat.years === "1-3") return "2+ years";
  if (seat.years === "3-6") return "4+ years";
  if (seat.years === "6+") return "8+ years";
  return "Per your brief";
}

function buildSamples(text: string, seat: ParsedSeat, count: number): SampleProfile[] {
  const title = roleName(seat.role) || extractRoleLabel(text);
  const location = extractCityLabel(text, seat);
  const experience = sampleExperience(seat, text);
  const base = seat.pay ? `Up to $${seat.pay}k` : "Shared on request";
  const variants = [
    `${title}, screened for your practice mix`,
    `Senior ${title.charAt(0).toLowerCase()}${title.slice(1)}, open to a move`,
  ];
  return Array.from({ length: count }, (_, i) => ({
    key: `sample-${i}`,
    title: variants[i % variants.length],
    location,
    experience,
    base,
  }));
}

/* ---------------- typewriter placeholder ---------------- */

function useTypewriter(active: boolean) {
  const [value, setValue] = useState(TYPE_LINES[0]);

  useEffect(() => {
    if (!active) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    let line = 0;
    let i = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const full = TYPE_LINES[line];
      if (!deleting) {
        i += 1;
        setValue(full.slice(0, i));
        if (i >= full.length) {
          deleting = true;
          timer = setTimeout(tick, 1900);
          return;
        }
        timer = setTimeout(tick, 38);
      } else {
        i -= 2;
        setValue(full.slice(0, Math.max(i, 0)));
        if (i <= 0) {
          deleting = false;
          line = (line + 1) % TYPE_LINES.length;
          timer = setTimeout(tick, 320);
          return;
        }
        timer = setTimeout(tick, 16);
      }
    };
    timer = setTimeout(tick, 600);
    return () => clearTimeout(timer);
  }, [active]);

  return value;
}

/* ---------------- icons ---------------- */

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const CheckIcon = ({ size = 14 }: { size?: number }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="3.5 8.5 6.5 11.5 12.5 4.5" />
  </svg>
);

const SparkIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.3 6.3l2.5 2.5M15.2 15.2l2.5 2.5M6.3 17.7l2.5-2.5M15.2 8.8l2.5-2.5" />
  </svg>
);

const LockIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="4.5" y="10.5" width="15" height="10" rx="2" />
    <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
  </svg>
);

/* ---------------- cards ---------------- */

function RequestCard({
  seatLabel,
  inputRef,
}: {
  seatLabel: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
}) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Enter your work email so Justin can send the shortlist.");
      return;
    }
    setError("");
    setSent(true);
  };

  return (
    <article className="hhs-card is-request">
      <span className="hhs-lock" aria-hidden="true">
        <LockIcon />
      </span>
      <h3 className="hhs-req-title">Want a shortlist for this seat?</h3>
      <p className="hhs-req-copy">
        Justin searches {trust.activePool} legal professionals for <em>{seatLabel}</em>.
      </p>

      {sent ? (
        <div className="hhs-req-done" role="status">
          <CheckIcon size={16} />
          <span>Received. Justin replies within one business hour.</span>
        </div>
      ) : (
        <form className="hhs-req-form" onSubmit={submit} noValidate>
          <label htmlFor="hhs-req-email" className="hhs-sr">
            Work email
          </label>
          <input
            ref={inputRef}
            id="hhs-req-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@yourfirm.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={!!error}
            aria-describedby={error ? "hhs-req-err" : undefined}
          />
          <button type="submit">Request shortlist</button>
          {error && (
            <p id="hhs-req-err" className="hhs-req-err">
              {error}
            </p>
          )}
        </form>
      )}

      <p className="hhs-req-terms">No retainer · Pay only if you hire</p>
    </article>
  );
}

/* ---------------- main component ---------------- */

const founders = people.filter((p) => p.id === "justin" || p.id === "jon");

export function HomeHeroSearch() {
  const [text, setText] = useState("");
  const [focused, setFocused] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [step, setStep] = useState(0);
  const [query, setQuery] = useState("");
  const router = useRouter();
  // Same popup as the cards on /find-candidates: work email first, then the full resume
  const [gateFor, setGateFor] = useState<EnrichedCandidate | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const requestInputRef = useRef<HTMLInputElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const typed = useTypewriter(text.length === 0);
  const resultsRef = useRef<HTMLElement>(null);
  const [scrollTick, setScrollTick] = useState(0);

  // Bring the results into view once they have rendered (layout shifts as the hero grows)
  useEffect(() => {
    if (!scrollTick) return;
    const raf = requestAnimationFrame(() => {
      const el = resultsRef.current;
      if (!el) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const top = el.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top: Math.max(top, 0), behavior: reduce ? "auto" : "smooth" });
    });
    return () => cancelAnimationFrame(raf);
  }, [scrollTick]);

  // Live understanding of what is being typed
  const live = useMemo(() => parseSeatInput(text), [text]);
  const liveChips = useMemo(() => {
    const out: Array<{ k: string; v: string | null }> = [
      { k: "Role", v: roleName(live.role) },
      { k: "Market", v: cityName(live.city) || (live.city === "any" ? "Any market" : null) },
      { k: "Experience", v: YEARS_LABEL[live.years] || null },
      { k: "Budget", v: live.pay ? `≤ $${live.pay}k` : null },
      { k: "Office", v: MODE_LABEL[live.mode] || null },
    ];
    return out;
  }, [live]);
  const detectedCount = liveChips.filter((c) => c.v).length;

  // Autosize textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 168)}px`;
  }, [text]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  // Results for the submitted query
  const result = useMemo(() => {
    if (!query) return null;
    const parsed = parseSeatInput(query);
    // Same defaults as /find-candidates: no city means Houston
    const seat: ParsedSeat = { ...parsed, city: parsed.city || "houston-tx" };
    const matches = parsed.role ? matchEnrichedCandidates(seat) : [];
    const real = matches.slice(0, 2);
    const samples = buildSamples(query, parsed, Math.max(0, 2 - real.length));
    const roleLabel = roleName(parsed.role);
    const cityLabel = cityName(seat.city);
    const seatLabel = roleLabel
      ? `${roleLabel.toLowerCase()}${cityLabel ? ` in ${cityLabel}` : ""}`
      : extractRoleLabel(query);
    return { parsed, seat, matches, real, samples, roleLabel, cityLabel, seatLabel };
  }, [query]);

  const findHref = (id?: string) => {
    const params = new URLSearchParams({ q: query });
    if (id) params.set("c", id);
    return `/find-candidates?${params.toString()}`;
  };

  const run = (raw: string) => {
    const q = raw.trim();
    if (!q || phase === "thinking") return;
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setText(q);
    setPhase("thinking");
    setStep(0);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const d = reduce ? 0 : 1;
    timers.current.push(setTimeout(() => setStep(1), 420 * d));
    timers.current.push(setTimeout(() => setStep(2), 860 * d));
    timers.current.push(
      setTimeout(() => {
        setQuery(q);
        setPhase("done");
        setScrollTick((t) => t + 1);
      }, 1250 * d)
    );
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    run(text);
  };

  const focusRequest = () => {
    requestInputRef.current?.focus({ preventScroll: false });
  };

  const steps = [
    "Reading your seat",
    "Matching the screened pool",
    "Preparing dossiers",
  ];

  return (
    <div className={`hhs${phase === "done" ? " has-results" : ""}`}>
      <div className="hhs-head">
        <div className="hero-eyebrow-capsule">
          <span className="hero-eyebrow-dot" aria-hidden="true" />
          <span>ATTORNEY &amp; PARALEGAL RECRUITING</span>
        </div>

        <h1 id="h1" className="hhs-h1">
          Describe your open seat.{" "}
          <span className="hhs-h1-accent">Meet screened candidates today.</span>
        </h1>

        <p className="hhs-lead">
          No retainer.<span className="hhs-lead-extra"> No exclusivity.</span>{" "}
          <b className="hl-strip">You pay only if you hire.</b>
        </p>
      </div>

      {/* Prompt box */}
      <div className={`hhs-box-wrap${focused ? " is-focused" : ""}${phase === "thinking" ? " is-thinking" : ""}`}>
        <div className="hhs-glow" aria-hidden="true" />
        <div className="hhs-ring" aria-hidden="true" />
        <form className="hhs-box" onSubmit={onSubmit} role="search" aria-label="Describe the seat you are hiring for">
          <label htmlFor="hhs-q" className="hhs-sr">
            Describe the seat you are hiring for
          </label>
          <textarea
            ref={textareaRef}
            id="hhs-q"
            className="hhs-input"
            rows={2}
            value={text}
            placeholder={typed}
            onChange={(e) => setText(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                run(text);
              }
            }}
          />

          <div className="hhs-box-foot">
            <div className={`hhs-chips${text.trim() ? " has-chips" : ""}`} aria-live="polite">
              {text.trim().length === 0 ? (
                <span className="hhs-hint">
                  <SparkIcon />
                  <span>
                    <span className="hide-sm">Role, market, years, budget and office. </span>One sentence is enough.
                  </span>
                </span>
              ) : (
                liveChips.map((c) => (
                  <span key={c.k} className={`hhs-chip${c.v ? " is-on" : ""}`}>
                    <span className="hhs-chip-k">{c.k}</span>
                    {c.v && <span className="hhs-chip-v">{c.v}</span>}
                  </span>
                ))
              )}
            </div>
            <div className="hhs-actions">
              <span className="hhs-kbd hide-sm" aria-hidden="true">
                {detectedCount > 0 ? "Enter ↵" : ""}
              </span>
              <button
                type="submit"
                className="hhs-submit"
                disabled={!text.trim() || phase === "thinking"}
                aria-label="Find candidates"
              >
                {phase === "thinking" ? <span className="hhs-spin" aria-hidden="true" /> : <ArrowIcon />}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Examples or thinking state */}
      <div className="hhs-under" aria-live="polite">
        {phase === "thinking" ? (
          <ol className="hhs-steps" role="status">
            {steps.map((s, i) => (
              <li key={s} className={i < step ? "is-done" : i === step ? "is-active" : ""}>
                <span className="hhs-step-dot" aria-hidden="true">
                  {i < step ? <CheckIcon size={11} /> : null}
                </span>
                {s}
              </li>
            ))}
          </ol>
        ) : phase === "done" ? null : (
          <>
            <div className="hhs-examples" aria-label="Example searches">
              <span className="hhs-try">Try</span>
              <div className="hhs-ex-list">
                {EXAMPLES.map((ex) => (
                  <button key={ex.label} type="button" className="hhs-ex" onClick={() => run(ex.q)} title={ex.q} aria-label={`Search: ${ex.q}`}>
                    <span className="hhs-ex-full">{ex.label}</span>
                    <span className="hhs-ex-short" aria-hidden="true">
                      {ex.short}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="hhs-proof">
              <span className="hhs-avatars" aria-hidden="true">
                {founders.map((p) => (
                  <Image key={p.id} src={p.photo} alt="" width={64} height={64} className="hhs-avatar" />
                ))}
              </span>
              <span className="hhs-proof-text">
                Every brief is read by <strong>Justin</strong> or <strong>Jon</strong>.{" "}
                <span className="hhs-proof-muted">Replies within one business hour.</span>
              </span>
            </div>
          </>
        )}
      </div>

      {/* Results preview */}
      {phase === "done" && result && (
        <section className="hhs-results" aria-labelledby="hhs-results-h" ref={resultsRef}>
          <div className="hhs-results-head">
            <div>
              <p className="hhs-results-kicker">
                {result.matches.length > 0 ? "Screened and available" : "Sourced on request"}
              </p>
              <h2 id="hhs-results-h" className="hhs-results-h">
                {result.matches.length > 0 && result.roleLabel ? (
                  <>
                    {result.matches.length} screened{" "}
                    {result.matches.length === 1 ? result.roleLabel.toLowerCase() : pluralRole(result.roleLabel)}
                    {result.cityLabel ? ` open to ${result.cityLabel.split(",")[0]} seats` : ""}
                  </>
                ) : (
                  <>Here is what a shortlist for this seat looks like</>
                )}
              </h2>
            </div>
            {result.matches.length > 0 ? (
              <Link className="hhs-see-all" href={findHref()}>
                {result.matches.length === 1 ? "Open full dossier" : `See all ${result.matches.length} dossiers`} <ArrowIcon />
              </Link>
            ) : (
              <button type="button" className="hhs-see-all" onClick={focusRequest}>
                Request a live search <ArrowIcon />
              </button>
            )}
          </div>

          <div className="hhs-layout">
            <div className="hhs-grid">
              {result.real.map((m) => (
                <CandidateDossierCard
                  key={m.candidate.id}
                  c={m.candidate}
                  notes={m.notes}
                  warn={m.warn}
                  actionLabel="Show full resume"
                  action={{ onClick: () => setGateFor(m.candidate) }}
                />
              ))}
              {result.samples.map((s) => (
                <SampleDossierCard
                  key={s.key}
                  title={s.title}
                  location={s.location}
                  pay={s.base}
                  facts={s.experience === "Per your brief" ? "Matched to your brief" : `${s.experience} · matched to your brief`}
                  onRequest={focusRequest}
                />
              ))}
            </div>
            <RequestCard seatLabel={result.seatLabel} inputRef={requestInputRef} />
          </div>
          {gateFor && (
            <WorkEmailGateModal
              candidate={gateFor}
              onClose={() => setGateFor(null)}
              onSuccess={(info) => {
                try {
                  window.sessionStorage.setItem("orion-lead", JSON.stringify(info));
                } catch {
                  /* storage unavailable */
                }
                const id = gateFor.id;
                setGateFor(null);
                router.push(`${findHref(id)}&u=1`);
              }}
            />
          )}

          <p className="hhs-results-foot">
            Profiles stay anonymous until you ask for an introduction. Sample profiles are labelled.
          </p>
        </section>
      )}
    </div>
  );
}
