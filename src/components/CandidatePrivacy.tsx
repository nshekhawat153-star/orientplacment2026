import React from "react";
import "./candidate-privacy.css";
import { PkCheck } from "./PageKit";

/* What a firm sees before the candidate says yes. Used on /upload-resume and /candidates. */

const SHIELDED = ["Your name", "Current firm and past employers", "Law school and graduation year", "Phone, email and bar number"];
const VISIBLE = ["Years in practice", "Practice mix and case volume", "Pay range and notice period", "Office preference"];

export function CandidatePrivacy() {
  return (
    <div className="ur-privacy">
      <div className="ur-pv is-hidden">
        <span className="ur-pv-k">Hidden until you approve</span>
        <ul>
          {SHIELDED.map((s) => (
            <li key={s}>
              <span aria-hidden="true">×</span>
              {s}
            </li>
          ))}
        </ul>
      </div>
      <div className="ur-pv is-shown">
        <span className="ur-pv-k">What the firm sees</span>
        <ul>
          {VISIBLE.map((s) => (
            <li key={s}>
              <PkCheck />
              {s}
            </li>
          ))}
        </ul>
      </div>
      <div className="ur-pv-promises">
        <p>
          <b>Never your current firm.</b> No references, no calls, no directories.
        </p>
        <p>
          <b>Delete any time.</b> One email and your profile is removed.
        </p>
        <p>
          <b>Read by a person.</b> No automated rejections. Every profile is reviewed personally.
        </p>
      </div>
    </div>
  );
}
