"use client";

import React, { useEffect, useRef } from "react";

// Background video that only starts downloading when its section nears the viewport.
// Same markup/classes as a plain autoplay muted loop video, so styling is unchanged.
export function LazyVideo({
  className,
  sources,
}: {
  className?: string;
  sources: { src: string; type: string }[];
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const start = () => {
      video.preload = "auto";
      video.play().catch(() => {});
    };

    if (typeof IntersectionObserver === "undefined") {
      start();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          start();
          io.disconnect();
        }
      },
      { rootMargin: "600px 0px" }
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <video ref={ref} loop muted playsInline preload="none" className={className}>
      {sources.map((s) => (
        <source key={s.src} src={s.src} type={s.type} />
      ))}
    </video>
  );
}
