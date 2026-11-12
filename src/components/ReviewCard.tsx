"use client";

import React, { useState } from "react";
import { Review, reviews } from "@/data";
import { Stars, GMark } from "./icons";

export interface ReviewCardProps {
  review?: Review;
  reviewSlug?: string;
  compact?: boolean;
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
          “{r.quote}”
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
  const { reviews } = require("@/data");
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
