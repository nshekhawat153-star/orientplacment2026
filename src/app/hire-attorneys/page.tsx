import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Questionnaire } from "./Questionnaire";
import { people, reviews, trust } from "@/data";

export const metadata: Metadata = {
  title: "Hire Qualified Attorneys for Your Law Firm | Orion Placement",
  description:
    "Get screened attorney candidates sent straight to your law firm. Pay only if you hire. Sign one simple agreement with zero upfront cost and a 90-day replacement guarantee.",
  alternates: {
    canonical: "https://www.orionplacement.com/hire-attorneys",
  },
};

export default function HireAttorneysLandingPage() {
  const justin = people.find((p) => p.id === "justin") || people[0];
  const jon = people.find((p) => p.id === "jon") || people[1];

  const clientReviews = reviews.filter((r) => r.kind === "employer").slice(0, 3);

  return (
    <div className="landing-theme min-h-screen text-[#0a1a33] bg-[#faf8f3]" id="top">
      {/* 1. STICKY DEDICATED MINIMALIST HEADER */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050e1f]/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="#top" className="flex items-center gap-2.5 font-serif text-lg font-semibold text-white">
            <span
              aria-hidden="true"
              className="grid size-8 place-items-center rounded-lg bg-[#e0bd66] font-serif text-[#050e1f] font-bold"
            >
              §
            </span>
            <span className="tracking-tight text-white">Orion Placement</span>
          </Link>

          <div className="flex items-center gap-4">
            <a
              href="tel:2015729538"
              className="hidden lg:inline-flex items-center gap-1.5 text-sm text-[#ecd496] hover:text-white transition font-medium"
            >
              <span>Call (201) 572-9538</span>
            </a>

            <a
              href="#questionnaire"
              className="rounded-lg border border-[#e0bd66]/70 px-4 py-2 text-sm font-medium text-[#ecd496] transition hover:bg-[#e0bd66] hover:text-[#050e1f]"
            >
              Check availability
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* 2. HERO SECTION */}
        <section className="relative overflow-hidden bg-[#0a1a33] text-white">
          {/* Subtle Ambient Radial Glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(60rem_30rem_at_80%_-10%,rgba(224,189,102,0.14),transparent),radial-gradient(40rem_30rem_at_-10%_110%,rgba(27,58,102,0.7),transparent)]"
          />

          <div className="relative mx-auto max-w-4xl px-4 pt-16 pb-20 text-center sm:px-6 sm:pt-24 sm:pb-28">
            <span className="inline-block rounded-full border border-[#e0bd66]/40 bg-[#e0bd66]/10 px-4 py-1.5 text-[11px] font-semibold tracking-[0.18em] text-[#ecd496] sm:text-xs">
              ONLY FOR LAW FIRMS HIRING ATTORNEYS
            </span>

            <h1 className="mt-6 font-serif text-4xl leading-[1.15] font-semibold text-balance sm:text-6xl text-white">
              Get qualified attorney candidates sent straight to your firm.
            </h1>

            <p className="mt-6 font-serif text-2xl text-[#e0bd66] italic sm:text-3xl">
              You only pay if you hire.
            </p>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-pretty text-white/80 leading-relaxed">
              Sign one simple agreement. We send attorneys who match your practice area, level, and timeline. If you don&apos;t hire, you don&apos;t pay. No upfront cost.
            </p>

            <div className="mt-10 flex flex-col items-center gap-3">
              <a
                href="#questionnaire"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-[#e0bd66] px-8 py-4 text-center text-lg font-bold text-[#050e1f] shadow-[0_10px_30px_-10px_rgba(224,189,102,0.7)] transition hover:bg-[#ecd496] active:scale-[0.98] w-full sm:w-auto"
              >
                <span>Check candidate availability</span>
                <svg aria-hidden="true" viewBox="0 0 20 20" className="size-5 fill-current">
                  <path d="M10.3 3.3a1 1 0 0 1 1.4 0l6 6a1 1 0 0 1 0 1.4l-6 6a1 1 0 1 1-1.4-1.4l4.3-4.3H3a1 1 0 1 1 0-2h11.6l-4.3-4.3a1 1 0 0 1 0-1.4Z" />
                </svg>
              </a>

              <p className="text-sm text-white/60">
                Takes about 2 minutes · No upfront cost · 90-day replacement guarantee
              </p>
            </div>
          </div>
        </section>

        {/* 3. CLIENT RESULTS / SOCIAL PROOF */}
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
          <div className="text-center">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#a8843a]">
              Client results
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-balance sm:text-4xl text-[#0a1a33]">
              Firms we&apos;ve helped hire
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {clientReviews.map((rev) => (
              <figure
                key={rev.id}
                className="flex flex-col rounded-2xl border border-[#e6ebf3] bg-white p-6 shadow-[0_1px_2px_rgba(10,26,51,0.04),0_12px_32px_-16px_rgba(10,26,51,0.18)]"
              >
                <div className="flex items-center justify-between">
                  <span aria-hidden="true" className="font-serif text-5xl leading-none text-[#e0bd66]">
                    “
                  </span>
                  <span className="text-xs font-bold text-[#e0bd66] bg-[#fff8d9] px-2 py-0.5 rounded border border-[#d9a400]/40">
                    5.0 ★ Google Review
                  </span>
                </div>

                <p className="mt-4 font-serif text-xl leading-snug font-semibold text-[#0a1a33]">
                  {rev.name === "Travis Bowen"
                    ? "Placed 2 attorneys with fast turnaround"
                    : rev.name === "Lainie James"
                    ? "Consistent delivery of top-tier talent"
                    : "Found the perfect candidate for our firm"}
                </p>

                <blockquote className="mt-3 flex-1 leading-relaxed text-[#5b6577] text-sm">
                  &ldquo;{rev.quote}&rdquo;
                </blockquote>

                <figcaption className="mt-6 flex items-center gap-3 border-t border-[#e6ebf3] pt-4 text-sm">
                  <span
                    aria-hidden="true"
                    className="grid size-9 shrink-0 place-items-center rounded-full bg-[#e6ebf3] text-[#1b3a66] font-bold"
                  >
                    ⚖
                  </span>
                  <div>
                    <span className="font-semibold text-[#0a1a33] block">{rev.name}</span>
                    <span className="text-xs text-[#5b6577]">Law Firm Managing Partner / Administrator</span>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* 4. HOW IT WORKS */}
        <section className="bg-white py-20 sm:py-24 border-y border-[#e6ebf3]">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#a8843a]">
                How it works
              </p>
              <h2 className="mt-3 font-serif text-3xl font-semibold text-balance sm:text-5xl text-[#0a1a33]">
                You only pay if you hire.
              </h2>
              <p className="mt-4 text-lg text-[#5b6577]">
                Sign a simple agreement. We send candidates. You interview the ones you like. A fee is due only if you hire one of them.
              </p>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl bg-[#faf8f3] p-7 ring-1 ring-[#e6ebf3]">
                <span className="font-serif text-3xl font-semibold text-[#c9a24a]">01</span>
                <h3 className="mt-3 text-xl font-semibold text-[#0a1a33]">No upfront cost</h3>
                <p className="mt-2 leading-relaxed text-[#5b6577]">
                  No retainer and nothing to pay to get started. You see candidates and inspect dossiers before you spend a single dollar.
                </p>
              </div>

              <div className="rounded-2xl bg-[#faf8f3] p-7 ring-1 ring-[#e6ebf3]">
                <span className="font-serif text-3xl font-semibold text-[#c9a24a]">02</span>
                <h3 className="mt-3 text-xl font-semibold text-[#0a1a33]">Candidates who fit</h3>
                <p className="mt-2 leading-relaxed text-[#5b6577]">
                  We pre-screen attorneys for your exact practice mix, local bar admissions, billable expectations, and compensation band.
                </p>
              </div>

              <div className="rounded-2xl bg-[#faf8f3] p-7 ring-1 ring-[#e6ebf3]">
                <span className="font-serif text-3xl font-semibold text-[#c9a24a]">03</span>
                <h3 className="mt-3 text-xl font-semibold text-[#0a1a33]">90-day guarantee</h3>
                <p className="mt-2 leading-relaxed text-[#5b6577]">
                  You stay in full control. If a placed attorney leaves or is let go within 90 days, we conduct a replacement search at zero extra fee.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. MEET YOUR RECRUITER */}
        <section className="overflow-x-clip bg-[#faf8f3]">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
            <div className="grid items-center gap-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
              {/* Photo Box */}
              <div className="relative mx-auto w-full max-w-sm">
                <div aria-hidden="true" className="absolute -inset-3 -rotate-2 rounded-3xl bg-[#e0bd66]/25" />
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border-2 border-[#d9a400] bg-white shadow-xl">
                  <Image
                    src={justin.photo || "/images/founders/justin-sofman.png"}
                    alt="Justin Sofman - Co-Founder of Orion Placement"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 400px"
                    priority
                  />
                </div>
              </div>

              {/* Bio Content */}
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#a8843a]">
                  Meet your recruiter
                </p>
                <h2 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl text-[#0a1a33]">
                  Hi, I&apos;m Justin Sofman.
                </h2>
                <p className="mt-2 font-medium text-[#a8843a]">
                  Co-Founder &amp; Managing Partner, Orion Placement
                </p>

                <div className="mt-6 space-y-4 text-base leading-relaxed text-[#5b6577]">
                  <p>
                    I co-founded Orion Placement alongside Jon Missirlian to solve the biggest frustration law firms face: paying huge upfront retainers for resume spammers who have never even spoken to the attorney they&apos;re submitting.
                  </p>
                  <p>
                    Since 2022, we have placed over <b>500+ attorneys and paralegals</b> with <b>200+ small and mid-size law firms</b> across Texas and the United States. Jon conducts in-depth screening calls on every single candidate before you ever see a profile.
                  </p>
                  <p>
                    We specialize in Estate Planning &amp; Wealth Transfer, Commercial Litigation, Real Estate, Corporate M&amp;A, Family Law, and Employment.
                  </p>
                </div>

                <div className="mt-8 border-l-4 border-[#e0bd66] pl-4 font-serif text-xl italic text-[#0a1a33]">
                  &ldquo;I only get paid when you find the right attorney, so I&apos;m 100% invested in sending people actually worth your time.&rdquo;
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-[#0a1a33]">
                  <span className="font-semibold">Direct phone:</span>
                  <a href="tel:2015729538" className="text-[#1b3a6b] font-bold hover:underline">
                    (201) 572-9538
                  </a>
                  <span className="text-[#bbb]">·</span>
                  <span className="font-semibold">Email:</span>
                  <a href="mailto:justin@orionplacement.com" className="text-[#1b3a6b] font-bold hover:underline">
                    justin@orionplacement.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. INTERACTIVE MULTI-STEP QUESTIONNAIRE */}
        <section id="questionnaire" className="bg-[#0a1a33] px-4 py-20 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-2xl">
            <div className="mb-8 text-center text-white">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#e0bd66]">
                Check candidate availability
              </p>
              <h2 className="mt-3 font-serif text-3xl font-semibold text-balance sm:text-4xl text-white">
                Tell us who you&apos;re looking for
              </h2>
              <p className="mt-3 text-white/70">
                A few quick questions. You only pay if you hire.
              </p>
            </div>

            <React.Suspense fallback={<div className="q-card-box text-center py-12 text-[#5b6577]">Loading questionnaire...</div>}>
              <Questionnaire />
            </React.Suspense>
          </div>
        </section>

        {/* 7. BOTTOM CALL TO ACTION */}
        <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 sm:py-24">
          <h2 className="font-serif text-3xl font-semibold text-balance sm:text-5xl text-[#0a1a33]">
            Ready to see who&apos;s available?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-[#5b6577]">
            One simple agreement. Candidates sent to your inbox. No upfront cost, and you{" "}
            <strong className="font-semibold text-[#0a1a33]">only pay if you hire</strong>.
          </p>

          <div className="mt-9">
            <a
              href="#questionnaire"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-[#e0bd66] px-8 py-4 text-center text-lg font-bold text-[#050e1f] shadow-[0_10px_30px_-10px_rgba(224,189,102,0.7)] transition hover:bg-[#ecd496] active:scale-[0.98] w-full sm:w-auto"
            >
              <span>Check candidate availability</span>
              <svg aria-hidden="true" viewBox="0 0 20 20" className="size-5 fill-current">
                <path d="M10.3 3.3a1 1 0 0 1 1.4 0l6 6a1 1 0 0 1 0 1.4l-6 6a1 1 0 1 1-1.4-1.4l4.3-4.3H3a1 1 0 1 1 0-2h11.6l-4.3-4.3a1 1 0 0 1 0-1.4Z" />
              </svg>
            </a>
          </div>
        </section>
      </main>

      {/* 8. MINIMALIST FOOTER */}
      <footer className="bg-[#050e1f] text-white/60 border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <p className="font-serif text-base font-semibold text-white">
              Orion Placement
            </p>
            <p className="mt-1 text-xs text-white/50">
              Contingency Legal Recruiting for Small &amp; Mid-Size Law Firms
            </p>
          </div>

          <div className="flex flex-col gap-1 sm:items-end text-xs text-white/50">
            <div className="flex items-center gap-3">
              <Link href="/about" className="underline-offset-4 hover:text-white hover:underline">
                About Orion
              </Link>
              <span>·</span>
              <Link href="/fees" className="underline-offset-4 hover:text-white hover:underline">
                Fee Structure
              </Link>
              <span>·</span>
              <a href="tel:2015729538" className="underline-offset-4 hover:text-white hover:underline">
                (201) 572-9538
              </a>
            </div>
            <p className="mt-1">
              © 2026 Orion Placement LLC. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

