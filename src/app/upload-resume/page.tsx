"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  roles,
  cities,
  sampleResume,
  parseResume,
  tagsForRole,
  matchJobs,
  jobs,
  findCity,
  findRole,
  toK,
  ParsedResume,
  MatchedJobResult,
} from "@/data";
import { TrustLine } from "@/components/Rating";
import { Breadcrumb } from "@/components/Breadcrumb";
import { JobCard } from "@/components/JobCard";
import { ReviewCard } from "@/components/ReviewCard";
import { ResumeSheet } from "@/components/ResumeSheet";
import { GateForm } from "@/components/GateForm";
import { Mark } from "@/components/Mark";

export default function UploadResumePage() {
  const [profile, setProfile] = useState<ParsedResume | null>(null);
  const [fileName, setFileName] = useState("");
  const [pasteText, setPasteText] = useState("");
  const [applyToJobId, setApplyToJobId] = useState<string | null>(null);

  // Initial open jobs in Houston
  const initialOpenJobs = useMemo(() => {
    return jobs.filter((j) => j.city === "houston-tx").slice(0, 3);
  }, []);

  function handleProcessText(text: string, src: string, name?: string) {
    const parsed = parseResume(text);
    parsed.role = parsed.role || "estate-planning-attorney";
    parsed.city = parsed.city || "houston-tx";
    if (parsed.years == null) parsed.years = 3;
    parsed.src = src;
    setProfile(parsed);
    setFileName(name || (src === "sample" ? "Sample resume loaded." : "Text loaded."));

    // Smooth scroll to profile
    setTimeout(() => {
      const el = document.getElementById("profile");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }

  function handleFileUpload(file: File) {
    if (!file) return;
    setFileName(`Reading ${file.name}…`);
    if (/\.txt$/i.test(file.name) || file.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = () => {
        handleProcessText(String(reader.result), "file", file.name);
      };
      reader.readAsText(file);
    } else {
      // Prototype fallback
      handleProcessText(sampleResume, "file", file.name);
    }
  }

  const roleObj = profile ? findRole(profile.role || "") : null;
  const cityObj = profile ? findCity(profile.city || "") : null;

  const availableTags = useMemo(() => {
    if (!profile?.role) return [];
    const list = tagsForRole(profile.role);
    (profile.tags || []).forEach((t) => {
      if (!list.includes(t)) list.push(t);
    });
    return list;
  }, [profile?.role, profile?.tags]);

  const matches = useMemo<MatchedJobResult[]>(() => {
    if (!profile || !profile.role) return [];
    return matchJobs({
      role: profile.role,
      city: profile.city,
      years: profile.years,
      mode: profile.mode,
      min: profile.min,
      tags: profile.tags,
    });
  }, [profile]);

  function handleRestart() {
    setProfile(null);
    setFileName("");
    setApplyToJobId(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const isApplied = !!applyToJobId;
  const targetJob = isApplied ? jobs.find((j) => j.id === applyToJobId) : null;

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Candidates", href: "/candidates" },
          { label: "Upload resume" },
        ]}
      />

      {/* 1. Hero with drop zone */}
      <section className="phero up-hero">
        <div className="wrap">
          <div>
            <span className="eyebrow">Free · confidential</span>
            <h1>Upload your resume, see the roles that fit</h1>
            <p className="lede">
              We read it into a short profile you can correct, then match it to open roles with their base pay.
            </p>
            <ul className="ticks hide-sm" style={{ marginTop: 22 }}>
              <li>No firm sees your name until you say yes</li>
              <li>We never contact your current firm</li>
              <li>Free for candidates. The hiring firm pays</li>
            </ul>
          </div>

          <div
            className="dropzone"
            id="upload"
            onDragOver={(e) => {
              e.preventDefault();
              e.currentTarget.classList.add("over");
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              e.currentTarget.classList.remove("over");
            }}
            onDrop={(e) => {
              e.preventDefault();
              e.currentTarget.classList.remove("over");
              if (e.dataTransfer.files?.[0]) {
                handleFileUpload(e.dataTransfer.files[0]);
              }
            }}
          >
            <svg
              className="dz-ico"
              viewBox="0 0 24 24"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 16V5M7.5 9.5L12 5l4.5 4.5" />
              <path d="M5 15v4h14v-4" />
            </svg>
            <b>Drop your resume here</b>
            <span className="small muted">
              PDF, Word or text. It stays with Orion. No firm sees your name until you say yes.
            </span>
            <input
              type="file"
              id="file"
              accept=".pdf,.doc,.docx,.txt,.rtf"
              onChange={(e) => {
                if (e.target.files?.[0]) handleFileUpload(e.target.files[0]);
              }}
              style={{ display: "none" }}
            />
            <div className="hero-act">
              <label className="btn btn-primary btn-lg" htmlFor="file" id="choose" style={{ cursor: "pointer" }}>
                Upload your resume
              </label>
              <button
                type="button"
                className="text-link"
                id="use-sample"
                onClick={() => handleProcessText(sampleResume, "sample")}
              >
                Use a sample resume
              </button>
            </div>
            <TrustLine kind="candidate" />
            {fileName && (
              <span className="file-name" id="file-name" aria-live="polite">
                {fileName}
              </span>
            )}
            <details id="paste-box" style={{ marginTop: 12 }}>
              <summary>Or paste the text</summary>
              <textarea
                id="paste"
                aria-label="Resume text"
                placeholder="Paste your resume text here"
                value={pasteText}
                onChange={(e) => setPasteText(e.target.value)}
                rows={4}
              />
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                id="read-paste"
                style={{ marginTop: 8 }}
                onClick={() => {
                  if (pasteText.trim()) handleProcessText(pasteText, "text");
                }}
              >
                Read this text
              </button>
            </details>
          </div>

          <div className="hero-review">
            <ReviewCard reviewSlug="n-brown" compact />
          </div>
        </div>
      </section>

      {/* 2. Before upload: Open now */}
      {!profile && (
        <section className="block alt" id="open">
          <div className="wrap">
            <div className="sec-head row">
              <div>
                <span className="eyebrow">Open now</span>
                <h2 id="open-title">3 roles open now in Houston</h2>
                <p>Employers stay confidential. Upload to see how you fit each one.</p>
              </div>
            </div>
            <div id="open-list">
              <div className="cards">
                {initialOpenJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. After upload: Parsed profile & matches */}
      {profile && (
        <section className="block alt" id="profile">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">Your matches</span>
              <h2>Your profile and the roles that fit</h2>
              <p>Fix anything we read wrong. The list updates as you go.</p>
            </div>

            <div className="tool">
              <form className="tool-form" id="pf" aria-label="Your profile" style={{ position: "static" }} onSubmit={(e) => e.preventDefault()}>
                <h2 style={{ fontSize: "1.2rem" }}>Your profile, as we read it</h2>
                <p className="small muted" id="pf-src" style={{ marginTop: -8 }}>
                  {profile.src === "sample"
                    ? "Read from the sample resume."
                    : profile.src === "text"
                    ? "Read from the text you pasted."
                    : `Read from your file (${fileName}).`}
                </p>

                <div className="field">
                  <label htmlFor="p-role">Role</label>
                  <select
                    id="p-role"
                    value={profile.role || ""}
                    onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                  >
                    {roles.map((r) => (
                      <option key={r.slug} value={r.slug}>
                        {r.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="field">
                  <label htmlFor="p-city">City</label>
                  <select
                    id="p-city"
                    value={profile.city || ""}
                    onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                  >
                    {cities.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.name}, {c.state}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="field">
                  <label htmlFor="p-years">Years of practice</label>
                  <input
                    id="p-years"
                    type="number"
                    inputMode="numeric"
                    min="0"
                    max="45"
                    value={profile.years ?? ""}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        years: e.target.value === "" ? null : +e.target.value,
                      })
                    }
                  />
                </div>

                <div className="field">
                  <label htmlFor="p-mode">Work arrangement</label>
                  <select
                    id="p-mode"
                    value={profile.mode}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        mode: e.target.value as "any" | "on-site" | "hybrid",
                      })
                    }
                  >
                    <option value="any">On-site or hybrid</option>
                    <option value="on-site">On-site</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>

                <div className="field">
                  <label htmlFor="p-min">
                    Lowest base you would move for <span className="hint">($ per year)</span>
                  </label>
                  <div className="money">
                    <input
                      id="p-min"
                      type="number"
                      inputMode="numeric"
                      min="30000"
                      step="5000"
                      placeholder="120000"
                      value={profile.min ? Math.round(profile.min * 1000) : ""}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          min: toK(e.target.value),
                        })
                      }
                    />
                  </div>
                </div>

                <fieldset className="field" style={{ border: 0 }}>
                  <legend className="label" style={{ marginBottom: 6 }}>
                    Skills we found <span className="hint">(tap to fix)</span>
                  </legend>
                  <div className="chips" id="p-tags">
                    {availableTags.map((tag) => {
                      const active = profile.tags.includes(tag);
                      return (
                        <button
                          key={tag}
                          type="button"
                          className="chip"
                          aria-pressed={active}
                          onClick={() => {
                            const newTags = active
                              ? profile.tags.filter((t) => t !== tag)
                              : [...profile.tags, tag];
                            setProfile({ ...profile, tags: newTags });
                          }}
                        >
                          {tag}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  id="restart"
                  onClick={handleRestart}
                >
                  Start over
                </button>
              </form>

              <div className="tool-results">
                <div className="results-head" aria-live="polite">
                  <b id="r-count">
                    {matches.length ? (
                      <>
                        <Mark>{String(matches.length)}</Mark>{" "}
                        {matches.length === 1 ? "role fits" : "roles fit"} your profile
                      </>
                    ) : (
                      `No listed ${roleObj?.short || "matching"} roles in ${cityObj?.stateName || "your area"} today`
                    )}
                  </b>
                  <span className="small muted" id="r-sub">
                    {matches.length
                      ? "Best fit first. Change anything on the left and the list updates."
                      : ""}
                  </span>
                </div>

                <div id="r-list">
                  {matches.length > 0 ? (
                    <div className="cards">
                      {matches.slice(0, 2).map((r) => (
                        <div key={r.j.id} style={{ display: "contents" }}>
                          <JobCard
                            job={r.j}
                            why={r.why}
                            onApply={(jobId: string) => {
                              setApplyToJobId(jobId);
                              const alertsEl = document.getElementById("alerts");
                              if (alertsEl) alertsEl.scrollIntoView({ behavior: "smooth", block: "center" });
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="empty-state">
                      <p>
                        <b>Many roles are filled before they are posted.</b> Send your profile and Jon matches you to new {roleObj?.short} roles in {cityObj?.name} as they open.
                      </p>
                    </div>
                  )}
                </div>

                <div id="alerts" style={{ marginTop: 24 }}>
                  <GateForm
                    eyebrow={applyToJobId ? "Apply confidentially" : "Matches by email"}
                    title={
                      applyToJobId
                        ? `Apply confidentially to ${applyToJobId}`
                        : matches.length === 1
                        ? "Email me this role and new matches"
                        : matches.length
                        ? `Email me these ${matches.length} roles and new matches`
                        : "Email me new matches"
                    }
                    audience="candidate"
                    button={applyToJobId ? "Apply confidentially" : "Email me these roles"}
                    reviewSlug="n-brown"
                    fine="Use a personal email, not your work one. No firm sees your name until you say yes."
                    steps={[
                      [
                        "Now",
                        `Your profile is saved as C-${cityObj?.state || "TX"}-${Math.floor(1000 + Math.random() * 9000)}. No employer has seen it.`,
                        true,
                      ],
                      [
                        "Within one business day",
                        applyToJobId
                          ? `Jon tells you which firm is behind ${applyToJobId}, who you would work for and the full pay, then asks if you want an introduction.`
                          : `Jon replies with ${
                              matches.length === 1
                                ? "whether this role is worth a call, and its full pay and bonus."
                                : "which of these roles are worth a call, and the full pay and bonus for each."
                            }`,
                      ],
                      [
                        "Before any introduction",
                        "You say yes to one firm. Only that firm sees your name and resume.",
                      ],
                      [
                        "Each week",
                        `New ${roleObj?.short || "attorney"} roles in ${cityObj?.name || "Houston"} that fit your profile. Unsubscribe in one click.`,
                      ],
                    ]}
                  />
                </div>

                {matches.length > 2 && (
                  <div id="r-more" style={{ marginTop: 28 }}>
                    <h3 className="mini-h">More roles that fit</h3>
                    <div className="cards">
                      {matches.slice(2).map((r) => (
                        <div key={r.j.id} style={{ display: "contents" }}>
                          <JobCard
                            job={r.j}
                            why={r.why}
                            onApply={(jobId: string) => {
                              setApplyToJobId(jobId);
                              const alertsEl = document.getElementById("alerts");
                              if (alertsEl) alertsEl.scrollIntoView({ behavior: "smooth", block: "center" });
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. What happens to your resume */}
      <section className="block">
        <div className="wrap split">
          <div>
            <div className="sec-head">
              <span className="eyebrow">Your resume</span>
              <h2>What happens to your resume</h2>
              <p>It is read by one person, Jon, and kept under an ID.</p>
            </div>
            <ul className="ticks">
              <li>It is kept under an ID, not your name, and read only by Jon.</li>
              <li>It goes to no employer without your yes for that specific role.</li>
              <li>We never contact your current firm or ask for references there.</li>
              <li>Ask us to delete it at any time and we do it the same day.</li>
            </ul>
          </div>
          <div>
            <p className="mini-h">What a firm sees before your yes</p>
            <ResumeSheet candidateId="EP-TX-0412" />
          </div>
        </div>
      </section>

      {/* 5. Check pay first band */}
      <section className="block flush">
        <div className="wrap">
          <div className="cand-band">
            <div>
              <span className="eyebrow">Not ready to send it?</span>
              <h2>Check your pay first</h2>
              <ul className="ticks">
                <li>Your base against your city's band</li>
                <li>Roles that pay more</li>
                <li>Nothing is saved</li>
              </ul>
            </div>
            <Link className="btn btn-ghost" href="/salary-check">
              Check my pay
            </Link>
          </div>
        </div>
      </section>

      {/* 6. FAQ */}
      <section className="block alt">
        <div className="wrap split">
          <div className="sec-head">
            <span className="eyebrow">Questions</span>
            <h2>Before you upload</h2>
            <p>
              Rather talk first? <Link href="/about#contact">Reach Jon directly</Link>.
            </p>
          </div>
          <div className="faq">
            <details>
              <summary>Who reads my resume?</summary>
              <p>
                Jon, who screens every candidate. It is stored under an ID, not your name, and is never posted anywhere.
              </p>
            </details>
            <details>
              <summary>Will a firm see it if I apply?</summary>
              <p>
                Not until you say yes to that firm. Applying sends your resume to Jon only. He tells you who the firm is first.
              </p>
            </details>
            <details>
              <summary>Which file types work?</summary>
              <p>
                PDF, Word and plain text. You can also paste the text. Anything we read wrong can be fixed before you send it.
              </p>
            </details>
            <details>
              <summary>Does it cost me anything?</summary>
              <p>
                No. The hiring firm pays Orion's fee when you start, and your offer is not reduced to cover it.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* 7. CTA band */}
      <div className="wrap">
        <div className="cta-band">
          <div className="wrap row">
            <div>
              <h2>See the roles that fit you, with the pay</h2>
              <p>Jon screens every role and gives you the firm name before any intro.</p>
            </div>
            <a className="btn btn-primary btn-lg" href="#upload">
              Upload your resume
            </a>
          </div>
        </div>
      </div>

      <div className="mbar">
        <a className="btn btn-primary" href="#upload" id="mbar-cta">
          Upload your resume
        </a>
      </div>
    </>
  );
}
