import React from "react";
import { findCandidate, fmt } from "@/data";
import { Mark } from "./Mark";
import { Icon } from "./icons";

export function ResumeSheet({ candidateId = "EP-TX-0412" }: { candidateId?: string }) {
  const c = findCandidate(candidateId) || findCandidate("EP-TX-0412")!;

  return (
    <div
      className="sheet"
      role="img"
      aria-label={`Redacted resume preview for ${c.id}: name, firms and school hidden`}
    >
      <div className="sheet-head">
        <div>
          <span className="blur w50 tall" />
          <span className="blur w35" />
        </div>
        <span className="sheet-tag">
          <Icon name="lock" /> Redacted · <Mark>{c.id}</Mark>
        </span>
      </div>

      <h4>Experience</h4>
      {c.timeline.map((t, idx) => (
        <div key={idx} className="sx">
          <span className="sx-when">
            <Mark>{t[0]}</Mark>
          </span>
          <div>
            <b>
              <Mark>{t[1]}</Mark>
            </b>{" "}
            <span className="blur w30" />
            <p className={idx === 0 ? "hl" : ""}>
              <Mark>{t[2]}</Mark>
            </p>
            {idx > 0 && <span className="blur w80" />}
          </div>
        </div>
      ))}

      <h4>Bar admissions</h4>
      <p className="hl">
        <Mark>{c.bars.join(", ")} (active)</Mark> <span className="blur w20" />
      </p>

      <div className="sm-drop">
        <h4>Practice mix</h4>
        <div className="mix-detail">
          <div className="mixbar" aria-hidden="true">
            {c.mix.map((x, idx) => (
              <i key={idx} style={{ width: `${x[1]}%` }} />
            ))}
          </div>
          <p className="mix-legend">
            {c.mix.map((x) => `${x[0]} ${x[1]}%`).join(" · ")}
          </p>
        </div>
      </div>

      <h4>Pay and availability</h4>
      <p className="hl">
        <Mark>
          {fmt.range(c.pay)} base · {c.availability}
        </Mark>
      </p>

      <div className="sm-drop">
        <h4>Education</h4>
        <p>
          <span className="blur w60" />
        </p>
      </div>

      <div className="sheet-foot">
        Names, schools and firms come with the full profile
      </div>
    </div>
  );
}
