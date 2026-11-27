"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "@/app/jobs/jobs-redesign.css";
import "./upload-resume.css";
import { roles, cities, jobs, findRole, findCity, parseResume, matchJobs, Job } from "@/data";
import { JobListCard } from "@/app/jobs/components/JobListCard";
import { PkHero, PkSection, PkFaq, PkCallCard, PkCheck, PkArrow } from "@/components/PageKit";

type Mode = "any" | "on-site" | "hybrid";

const FAQ = [
  {
    q: "Who reads my resume?",
    a: "Justin, personally. It is never added to public databases, never indexed by search engines and never shared with a firm without your OK.",
  },
  {
    q: "Can my current firm find out?",
    a: "No. There is no public candidate directory, and Orion never contacts your current firm for references. Everything goes through your personal email or phone.",
  },
  {
    q: "Does it cost me anything?",
    a: "No. It is free for candidates. The hiring firm pays Orion, and nothing comes out of your salary or bonus.",
  },
  {
    q: "What happens when I like a seat?",
    a: "Justin calls you with the firm’s name, the partners, the culture, billable expectations and the full pay. Your profile goes to the firm only if you say yes.",
  },
];

const SHIELDED = ["Your name", "Current firm and past employers", "Law school and graduation year", "Phone, email and bar number"];
const VISIBLE = ["Years in practice", "Practice mix and case volume", "Pay range and notice period", "Office preference"];

export function UploadResumeClient() {
  const router = useRouter();

  const [fileName, setFileName] = useState("");
  const [pasteOpen, setPasteOpen] = useState(false);
  const [pasteText, setPasteText] = useState("");
  const [ready, setReady] = useState(false); // something was uploaded or pasted

  const [role, setRole] = useState("");
  const [city, setCity] = useState("");
  const [years, setYears] = useState("");
  const [minPay, setMinPay] = useState("");
  const [mode, setMode] = useState<Mode>("any");
  const [jobFrom, setJobFrom] = useState<Job | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);

  // Links from job cards arrive as /upload-resume#role=...&city=...&job=...
  useEffect(() => {
    const apply = () => {
      const h = new URLSearchParams(window.location.hash.replace(/^#/, ""));
      const r = h.get("role");
      const c = h.get("city");
      const j = h.get("job");
      if (r && findRole(r)) setRole(r);
      if (c && findCity(c)) setCity(c);
      if (j) setJobFrom(jobs.find((x) => x.id === j) || null);
    };
    const t = window.setTimeout(apply, 0);
    return () => window.clearTimeout(t);
  }, []);

  const fillFrom = (text: string) => {
    const p = parseResume(text);
    if (p.role) setRole(p.role);
    if (p.city) setCity(p.city);
    if (p.years != null) setYears(String(p.years));
    if (p.min) setMinPay(String(Math.round(p.min)));
    if (p.mode) setMode(p.mode);
  };

  const scrollToProfile = () =>
    window.setTimeout(() => document.getElementById("profile")?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);

  const onFile = (file?: File) => {
    if (!file) return;
    setFileName(file.name);
    setReady(true);
    if (/\.txt$/i.test(file.name) || file.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = () => fillFrom(String(reader.result || ""));
      reader.readAsText(file);
    }
    scrollToProfile();
  };

  const onPaste = () => {
    if (!pasteText.trim()) return;
    fillFrom(pasteText);
    setReady(true);
    scrollToProfile();
  };

  // Matches: role picked → matching seats; otherwise the newest seats
  const matches = useMemo(() => {
    if (!role) return [...jobs].sort((a, b) => b.posted.localeCompare(a.posted)).slice(0, 4);
    return matchJobs({
      role,
      city: city || null,
      years: years ? Number(years) : null,
      mode,
      min: minPay ? Number(minPay) : null,
      tags: [],
    }).map((m) => m.j);
  }, [role, city, years, minPay, mode]);

  const roleObj = findRole(role);
  const cityObj = findCity(city);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !name.trim()) return;
    setSent(true);
  };

  const uploadCard = (
    <div className="pk-form ur-up">
      <span className="pk-form-k">Free · Private · Takes a minute</span>
      <h2 className="pk-form-h">{ready ? "Resume added" : "Add your resume"}</h2>

      {ready ? (
        <div className="ur-file">
          <span className="ur-file-ico" aria-hidden="true">
            <PkCheck size={16} />
          </span>
          <div>
            <b>{fileName || "Pasted resume text"}</b>
            <span>Now check the basics below so we can match you.</span>
          </div>
          <a href="#profile" className="ur-file-go">
            Continue <PkArrow size={14} />
          </a>
        </div>
      ) : (
        <div className="ur-drop">
          <input type="file" accept=".pdf,.doc,.docx,.txt" onChange={(e) => onFile(e.target.files?.[0])} aria-label="Upload resume" />
          <span className="ur-drop-ico" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="12" y1="18" x2="12" y2="12" />
              <polyline points="9 15 12 12 15 15" />
            </svg>
          </span>
          <b>Drop your resume here, or browse</b>
          <span>PDF, Word or text · never posted anywhere</span>
        </div>
      )}

      {!ready &&
        (pasteOpen ? (
          <div className="ur-paste">
            <label className="pk-field is-wide">
              <span>Paste resume text</span>
              <textarea value={pasteText} onChange={(e) => setPasteText(e.target.value)} rows={4} placeholder="Paste the text of your resume" />
            </label>
            <button type="button" className="pk-btn is-dark" onClick={onPaste} disabled={!pasteText.trim()}>
              Use this text
            </button>
          </div>
        ) : (
          <div className="ur-alt">
            <button type="button" onClick={() => setPasteOpen(true)}>
              Paste text instead
            </button>
            <span aria-hidden="true">·</span>
            <a href="#profile">Skip, just set my basics</a>
          </div>
        ))}

      <p className="pk-form-fine">
        <PkCheck size={12} /> No firm sees your name until you say yes.
      </p>
    </div>
  );

  return (
    <div className="ur">
      <PkHero
        eyebrow="For candidates · Free and confidential"
        title="Upload your resume."
        accent="See the seats that fit."
        lead="Justin matches you to lateral seats at boutique and mid-size Texas firms, with the pay shown. Your current firm never finds out."
        trustItems={["Free for candidates", "Name hidden until you say yes", "Current firm never contacted"]}
        side={uploadCard}
      >
        <p className="ur-hero-alt">
          Not ready to share it? <Link href="/salary-check">Check your pay first →</Link>
        </p>
      </PkHero>

      {/* PROFILE + MATCHES */}
      <PkSection
        tone="light"
        id="profile"
        kicker={role ? "Your matches" : "Open seats"}
        title={role ? `${matches.length} ${matches.length === 1 ? "seat fits" : "seats fit"}` : "Set your basics,"}
        accent={role ? "your background." : "see what fits."}
        lead={
          jobFrom
            ? `You came from “${jobFrom.title}”. Send your profile and Justin will talk to you about it first.`
            : "Change anything below and the seats update. Nothing is shared until you send it."
        }
        className="ur-match-sec"
      >
        <div className="ur-grid">
          <div className="ur-left">
            <div className="ur-card">
              <h3>Your basics</h3>
              <div className="pk-fields">
                <label className="pk-field is-wide">
                  <span>Practice area</span>
                  <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="">Select practice area</option>
                    {roles.map((r) => (
                      <option key={r.slug} value={r.slug}>
                        {r.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="pk-field">
                  <span>City</span>
                  <select value={city} onChange={(e) => setCity(e.target.value)}>
                    <option value="">Any city</option>
                    {cities.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.name}, {c.state}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="pk-field">
                  <span>Years in practice</span>
                  <input inputMode="numeric" value={years} onChange={(e) => setYears(e.target.value.replace(/\D/g, "").slice(0, 2))} placeholder="e.g. 5" />
                </label>
                <label className="pk-field">
                  <span>
                    Minimum base <em>$k</em>
                  </span>
                  <input inputMode="numeric" value={minPay} onChange={(e) => setMinPay(e.target.value.replace(/\D/g, "").slice(0, 3))} placeholder="e.g. 120" />
                </label>
                <label className="pk-field">
                  <span>Office</span>
                  <select value={mode} onChange={(e) => setMode(e.target.value as Mode)}>
                    <option value="any">On-site or hybrid</option>
                    <option value="on-site">On-site</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="ur-card is-send" id="send">
              {sent ? (
                <div className="pk-form-done" role="status">
                  <span className="pk-form-done-ico" aria-hidden="true">
                    <PkCheck size={28} />
                  </span>
                  <h3>Profile sent, privately.</h3>
                  <p>
                    Justin will reach you at <b>{email}</b> within one business day to talk about the seats that fit.
                  </p>
                </div>
              ) : (
                <form onSubmit={send}>
                  <h3>Send it to Justin</h3>
                  <p className="ur-send-sub">
                    {roleObj
                      ? `He’ll talk you through ${matches.length ? "these seats" : "unlisted seats"} for ${roleObj.name.toLowerCase()}s${cityObj ? ` in ${cityObj.name}` : ""}.`
                      : "He’ll call you about seats that fit, including ones that never get posted."}
                  </p>
                  <div className="pk-fields">
                    <label className="pk-field is-wide">
                      <span>Full name</span>
                      <input type="text" required value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" placeholder="Full name" />
                    </label>
                    <label className="pk-field">
                      <span>Personal email</span>
                      <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" placeholder="you@gmail.com" />
                    </label>
                    <label className="pk-field">
                      <span>
                        Mobile <em>optional</em>
                      </span>
                      <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" placeholder="(713) 555-0142" />
                    </label>
                  </div>
                  <button type="submit" className="pk-btn is-primary ur-send-btn" disabled={!name.trim() || !email.trim()}>
                    Send my profile confidentially <PkArrow />
                  </button>
                  <p className="pk-form-fine">Not your work email. Nothing goes to a firm without your yes.</p>
                </form>
              )}
            </div>
          </div>

          <div className="ur-right">
            {role && matches.length === 0 ? (
              <div className="ur-none">
                <h3>No listed seat fits that yet.</h3>
                <p>Many seats are filled before they’re ever posted. Send your profile and Justin will bring you the unlisted ones.</p>
                <a href="#send" className="pk-btn is-dark">
                  Send my profile
                </a>
              </div>
            ) : (
              <>
                {!role && <p className="ur-right-note">Newest seats. Pick a practice area to see your matches.</p>}
                <div className="ur-jobs">
                  {matches.slice(0, 4).map((j) => (
                    <JobListCard key={j.id} job={j} selected={false} onSelect={(x) => router.push(`/jobs?job=${encodeURIComponent(x.id)}`)} />
                  ))}
                </div>
                <Link href="/jobs" className="ur-all">
                  See all open seats <PkArrow size={14} />
                </Link>
              </>
            )}
          </div>
        </div>
      </PkSection>

      {/* WHAT A FIRM SEES */}
      <PkSection
        tone="dark"
        kicker="Your privacy"
        title="What a firm sees"
        accent="before you say yes."
        lead="Firms see an anonymous summary. Your identity stays with Justin until you approve a specific firm."
      >
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
              <b>Read by a person.</b> No automated rejections. Justin reviews every profile.
            </p>
          </div>
        </div>
      </PkSection>

      {/* FAQ + CALL */}
      <PkSection tone="light">
        <div className="pk-split">
          <div className="pk-head">
            <span className="pk-kicker">
              <span aria-hidden="true" />
              Questions
            </span>
            <h2 className="pk-h2">
              Before you <em>upload.</em>
            </h2>
            <p className="pk-sec-lead">
              Want to know your number first? <Link href="/salary-check">Run the free salary check</Link>.
            </p>
          </div>
          <PkFaq items={FAQ} />
        </div>
        <div className="ur-call">
          <PkCallCard
            title="Rather talk"
            accentWords="before you share?"
            text="Fifteen private minutes with Justin. He’ll tell you what the market looks like for you right now."
          />
        </div>
      </PkSection>
    </div>
  );
}
