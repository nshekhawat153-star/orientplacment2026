 import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { TrustTicker, RatingBadge } from "@/components/Rating";
import { HomeReviews } from "@/components/HomeReviews";
import { HomeProcessTerms } from "@/components/HomeProcessTerms";
import { PeopleSection, FounderCta } from "@/components/PeopleSection";
import { HomeFaqTools } from "@/components/HomeFaqTools";
import { HomeStickyBar } from "@/components/HomeStickyBar";
import { ScrollRevealProvider } from "@/components/ScrollRevealProvider";
import { HomeFinalCta } from "@/components/HomeFinalCta";
import { HomeHeroSearch } from "@/components/HomeHeroSearch";

export const metadata: Metadata = {
  title: "Legal recruiters for small and mid-size law firms | Orion",
  description:
    "Screened attorneys and paralegals for small and mid-size law firms. See candidates for your seat today. No retainer, and no fee unless you hire.",
  alternates: {
    canonical: "https://www.orionplacement.com/",
  },
};

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.orionplacement.com/#org",
        name: "Orion Placement",
        url: "https://www.orionplacement.com/",
        foundingDate: "2022",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Fort Lauderdale",
          addressRegion: "FL",
          addressCountry: "US",
        },
      },
      {
        "@type": "EmploymentAgency",
        name: "Orion Placement",
        url: "https://www.orionplacement.com/",
        parentOrganization: {
          "@id": "https://www.orionplacement.com/#org",
        },
        areaServed: "US",
        description:
          "Contingency legal recruiting for small and mid-size law firms: attorneys, paralegals and legal assistants.",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.orionplacement.com/",
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ScrollRevealProvider />
      <HomeStickyBar />
        {/* 1. HERO: describe the seat, see who fits (HomeHeroSearch) */}
        <section className="hero-cinematic" aria-labelledby="h1">
          <div className="hero-content-wrap">
            <HomeHeroSearch />
          </div>

          {/* Static proof row: part of the hero, shares its background (same as hire-attorneys) */}
          <div className="trust-ticker-strip" aria-label="Orion verified numbers">
            <TrustTicker />
          </div>
        </section>

        {/* 3. Who we are — moved up so visitors meet Justin & Jon early */}
        <section className="block who-we-are-sec" id="who-we-are">
          <div className="wrap">
            <div className="who-head-split">
              {/* Left Column: Eyebrow, Heading, Google Review Badge */}
              <div className="who-head-col who-head-col-left">
                <div className="badge-capsule">
                  <span className="badge-dot" />
                  WHO WE ARE
                </div>
                <h2 className="sec-title-lg">
                  Two recruiters you can call{" "}
                  <span className="serif-accent">by name.</span>
                </h2>
                <div className="who-head-rating">
                  <RatingBadge size="lg" />
                </div>
              </div>

              {/* Subtle Vertical Divider between columns on desktop */}
              <div className="who-head-vdivider" aria-hidden="true" />

              {/* Right Column: one line on how the two founders split every search */}
              <div className="who-head-col who-head-col-right">
                <p className="who-lede" id="orion-line">
                  Every search is led by Orion&rsquo;s two founders. <strong>Justin</strong> takes your brief;{" "}
                  <strong>Jon</strong> screens every candidate before you see them.
                </p>
                <FounderCta className="is-left" />
              </div>
            </div>

            {/* Subtle horizontal fade divider between header and founders */}
            <div className="who-bottom-fade-divider" aria-hidden="true" />

            <PeopleSection showCta={false} />
          </div>
        </section>

        {/* 4. Google Reviews — shown before candidates so visitors trust the cards */}
        <HomeReviews />

        {/* 6. How it works + what it costs (one light section) */}
        <HomeProcessTerms />

        {/* Blue Section Divider — exactly at section boundary, no diamond, left-right blend */}
        <div className="section-divider-blue-container" aria-hidden="true">
          <div className="section-divider-blue-inner">
            <div className="section-divider-blue-line" />
          </div>
        </div>

        {/* 8. FAQ + free hiring tools (one section) */}
        <HomeFaqTools />

        {/* 11. Closing section: law firms and candidates (hero background, no video) */}
        <HomeFinalCta />
      <div className="mbar">
        <Link className="btn btn-primary" href="/find-candidates">
          See candidates for my seat
        </Link>
      </div>
    </>
  );
}
