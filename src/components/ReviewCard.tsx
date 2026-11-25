"use client";

import React, { useState } from "react";
import { Review, reviews } from "@/data";
import { Stars, GMark } from "./icons";

export interface ReviewCardProps {
  review?: Review;
  reviewSlug?: string;
  compact?: boolean;
}

const HIGHLIGHT_MAP: Record<string, string[]> = {
  "travis-bowen": [
    "They have successfully placed 2 new team members with us and we will use them for all of our future staffing needs.",
    "experts in finding the talent we need.",
  ],
  "lainie-james": [
    "consistently delivering high-quality candidates.",
    "I know I can always rely on him to find top-tier talent.",
  ],
  "brett-zimmerman": [
    "Jon did and amazing job finding me a perfect candidate for my company.",
    "I will be using Orion Placement and Jon for all my future hires!",
  ],
  "lourdes-masson": [
    "consistently deliver great candidates.",
    "wouldn’t hesitate to recommend them to any law firm looking for a recruiting partner.",
  ],
  "daffner-law": [
    "Very attentive and does an excellent job - highly recommended!",
  ],
  "derek-letellier": [
    "Jon did a phenomenal job connecting me to a fantastic opportunity.",
    "helped me secure my next role.",
  ],
  "n-brown": [
    "delivered for me within less than a week.",
    "This is perhaps the best result I have ever had while working through a placement agency.",
  ],
  "vera-massey": [
    "genuinely cared about helping me.",
    "made the transition smooth and stress-free.",
  ],
  "rafael-jimenez": [
    "able to find me a perfect paralegal position within two weeks of us getting in touch.",
  ],
};

function renderQuoteWithHighlights(id: string, quote: string) {
  const highlights = HIGHLIGHT_MAP[id];
  if (!highlights || highlights.length === 0) {
    return quote;
  }

  const sorted = [...highlights].sort((a, b) => b.length - a.length);
  const regex = new RegExp(`(${sorted.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "g");
  const parts = quote.split(regex);

  return parts.map((part, idx) => {
    if (highlights.includes(part)) {
      return (
        <span key={idx} className="rv-quote-blue">
          {part}
        </span>
      );
    }
    return part;
  });
}

export function ReviewCard({
  review,
  reviewSlug,
  compact = false,
}: ReviewCardProps) {
  const [expanded, setExpanded] = useState(false);
  const r = review || reviews.find((x) => x.id === reviewSlug);
  if (!r) return null;

  const isLong = r.quote.length > 220;

  return (
    <figure
      className={`review review-${r.kind}${compact ? " compact" : ""}${
        expanded ? " open" : ""
      }`}
      data-review={r.id}
    >
      <div className="review-top">
        <Stars />
        <span className="src">
          <GMark /> Google review
        </span>
      </div>
      <blockquote>
        <p className={isLong && !expanded ? "clamp" : ""}>
          “{renderQuoteWithHighlights(r.id, r.quote)}”
        </p>
        {isLong && (
          <button
            type="button"
            className="rv-more"
            aria-expanded={expanded}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}
      </blockquote>
      <figcaption>
        <b>{r.name}</b>
        <span className="tag">
          {r.kind === "employer" ? "Law firm client" : "Candidate"}
        </span>
      </figcaption>
    </figure>
  );
}

export function ReviewsSection({
  kind = "mixed",
  limit = 3,
}: {
  kind?: "employer" | "candidate" | "mixed";
  limit?: number;
}) {
  let list: Review[] = [];

  if (kind === "employer") {
    list = reviews.filter((r: Review) => r.kind === "employer");
  } else if (kind === "candidate") {
    list = reviews.filter((r: Review) => r.kind === "candidate");
  } else {
    // Mixed: two employer + one candidate
    const emp = reviews.filter((r: Review) => r.kind === "employer");
    const cand = reviews.filter((r: Review) => r.kind === "candidate");
    list = [emp[0], emp[1], cand[0], emp[2], cand[1]].filter(Boolean);
  }

  return (
    <div className="reviews">
      {list.slice(0, limit).map((r: Review) => (
        <ReviewCard key={r.id} review={r} />
      ))}
    </div>
  );
}
