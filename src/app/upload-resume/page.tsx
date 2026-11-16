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
    setFileName(name || (src === "sample" ? "Sample resume loaded (Texas Estate Planning)." : "Text parsed successfully."));

    // Smooth scroll to profile
    setTimeout(() => {
      const el = document.getElementById("profile");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
  }

  function handleFileUpload(file: File) {
    if (!file) return;
    setFileName(`Processing ${file.name}…`);
    if (/\.txt$/i.test(file.name) || file.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = () => {
        handleProcessText(String(reader.result), "file", file.name);
      };
      reader.readAsText(file);
    } else {
      // Prototype fallback parsing
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

  return (
    <div className="ur-page">
      {/* 1. LUXURY HERO WITH VIDEO & UPLOAD DROPZONE */}
      <section className="emp-luxury-hero-sec ur-luxury-hero-sec" aria-labelledby="ur-hero-title">
        <div className="emp-hero-video-wrap" aria-hidden="true">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="emp-hero-video"
          >
            <source src="/media/splash.mp4" type="video/mp4" />
          </video>
          <div className="emp-hero-overlay" />
          <div className="emp-hero-glow" />
        </div>

        <div className="wrap emp-hero-content" style={{ maxWidth: 860 }}>
          <div className="emp-hero-badge-wrap">
            <div className="badge-capsule">
              <span className="badge-dot" />
              <span>CANDIDATE PORTAL · 100% CONFIDENTIAL &amp; FREE</span>
            </div>
          </div>

          <h1 id="ur-hero-title" className="emp-hero-h1">
            Upload your resume, see <span className="serif-accent">the roles that fit</span>
          </h1>

          <p className="emp-hero-lead">
            We parse your credentials into an anonymous candidate profile you control, then instantly match you against active lateral openings with verified compensation. No firm ever sees your identity without your explicit consent.
          </p>

          <div className="emp-reassurance-row" style={{ marginBottom: 32 }}>
            <div className="emp-reassurance-item">
              <span className="check" aria-hidden="true">✓</span>
              <span>No firm sees your name until you say yes</span>
            </div>
            <div className="emp-reassurance-item">
              <span className="check" aria-hidden="true">✓</span>
              <span>Zero contact with your current firm</span>
            </div>
            <div className="emp-reassurance-item">
              <span className="check" aria-hidden="true">✓</span>
              <span>Always 100% free for candidates</span>
            </div>
          </div>

          {/* Elevated Upload Card */}
          <div className="ur-drop-card" id="upload">
            <div
              className="ur-drop-zone"
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
              <div className="ur-drop-icon-disc" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  width="26"
                  height="26"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 16V5M7.5 9.5L12 5l4.5 4.5" />
                  <path d="M5 15v4h14v-4" />
                </svg>
              </div>

              <div className="ur-drop-h">Drag and drop your resume here</div>
              <p className="ur-drop-sub">
                Accepted formats: PDF, Word (.docx) or plain text. Your resume is never uploaded to public boards or shared without prior written permission.
              </p>

              <input
                type="file"
                id="file"
                accept=".pdf,.doc,.docx,.txt,.rtf"
                onChange={(e) => {
                  if (e.target.files?.[0]) handleFileUpload(e.target.files[0]);
                }}
                style={{ display: "none" }}
              />

              <div className="ur-drop-actions">
                <label className="btn-emp-primary" htmlFor="file" style={{ cursor: "pointer" }}>
                  <span>Select file to upload</span>
                  <svg aria-hidden="true" viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
                    <path d="M10.3 3.3a1 1 0 0 1 1.4 0l6 6a1 1 0 0 1 0 1.4l-6 6a1 1 0 1 1-1.4-1.4l4.3-4.3H3a1 1 0 1 1 0-2h11.6l-4.3-4.3a1 1 0 0 1 0-1.4Z" />
                  </svg>
                </label>
                <button
                  type="button"
                  className="ur-sample-btn"
                  onClick={() => handleProcessText(sampleResume, "sample")}
                >
                  Load sample resume (Texas Estate Planning)
                </button>
              </div>

              {fileName && (
                <div className="ur-file-badge" aria-live="polite">
                  <span aria-hidden="true">✓</span>
                  <span>{fileName}</span>
                </div>
              )}
            </div>

            <details className="ur-paste-toggle">
              <summary style={{ fontWeight: 600, color: "#1D4ED8", cursor: "pointer" }}>
                Prefer to paste resume text directly?
              </summary>
              <textarea
                className="ur-paste-textarea"
                aria-label="Resume text"
                placeholder="Paste your legal CV or resume text here (experience, bar admission, practice highlights)..."
                value={pasteText}
                onChange={(e) => setPasteText(e.target.value)}
                rows={4}
              />
              <div style={{ marginTop: 10, textAlign: "right" }}>
                <button
                  type="button"
                  className="btn-emp-primary"
                  style={{ padding: "8px 18px", fontSize: 13 }}
                  onClick={() => {
                    if (pasteText.trim()) handleProcessText(pasteText, "text");
                  }}
                >
                  Parse pasted text
                </button>
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* 2. BEFORE UPLOAD: ACTIVE LATERAL ROLES IN TEXAS */}
      {!profile && (
        <section className="emp-process-sec" id="open">
          <div className="wrap">
            <div className="sec-head" style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 48px" }}>
              <span className="eyebrow" style={{ color: "#1D4ED8", fontWeight: 700 }}>VERIFIED LATERAL OPENINGS</span>
              <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(28px, 3.6vw, 42px)", color: "#08142A", margin: "12px 0 14px" }}>
                Active boutique &amp; mid-size roles open now
              </h2>
              <p style={{ color: "#64748B", fontSize: 16 }}>
                Every position features disclosed base compensation and verified bonus history. Upload your resume above to see your customized fit.
              </p>
            </div>

            <div className="cards">
              {initialOpenJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>

            <div style={{ textAlign: "center", marginTop: 40 }}>
              <a href="#upload" className="btn-emp-primary">
                <span>Upload resume to match these roles</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </section>
      )}

      {/* 3. AFTER UPLOAD: PARSED PROFILE & LIVE MATCH STUDIO */}
      {profile && (
        <section className="emp-process-sec" id="profile" style={{ background: "#FAF9F5", padding: "80px 0 100px" }}>
          <div className="wrap">
            <div className="sec-head" style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 36px" }}>
              <span className="eyebrow" style={{ color: "#1D4ED8", fontWeight: 700 }}>REAL-TIME MATCH ENGINE</span>
              <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(28px, 3.6vw, 42px)", color: "#08142A", margin: "10px 0 14px" }}>
                Your candidate profile &amp; matching seats
              </h2>
              <p style={{ color: "#64748B", fontSize: 16 }}>
                Review and refine how our parser interpreted your background. Every modification updates your matching opportunities immediately.
              </p>
            </div>

            <div className="ur-parsed-studio">
              {/* Studio Left: Profile Form Card */}
              <div className="ur-studio-form-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderBottom: "1px solid #E2E8F0", paddingBottom: 14 }}>
                  <h3 style={{ fontFamily: "var(--display)", fontSize: 20, color: "#08142A", margin: 0 }}>
                    Parsed Profile
                  </h3>
                  <button
                    type="button"
                    onClick={handleRestart}
                    style={{ background: "none", border: "none", color: "#64748B", fontSize: 12.5, fontWeight: 600, cursor: "pointer", textDecoration: "underline" }}
                  >
                    Reset &amp; Upload New
                  </button>
                </div>

                <p style={{ fontSize: 12, color: "#059669", background: "#ECFDF5", padding: "6px 12px", borderRadius: 6, margin: 0 }}>
                  {profile.src === "sample"
                    ? "Parsed from Texas Estate Planning sample."
                    : profile.src === "text"
                    ? "Parsed from custom pasted text."
                    : `Parsed from your file: ${fileName}`}
                </p>

                <div className="field">
                  <label htmlFor="p-role" style={{ fontSize: 13, fontWeight: 600, color: "#08142A", marginBottom: 6, display: "block" }}>
                    Primary Practice Area
                  </label>
                  <select
                    id="p-role"
                    value={profile.role || ""}
                    onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                    style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1.5px solid #CBD5E1", fontSize: 14 }}
                  >
                    {roles.map((r) => (
                      <option key={r.slug} value={r.slug}>
                        {r.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="field">
                  <label htmlFor="p-city" style={{ fontSize: 13, fontWeight: 600, color: "#08142A", marginBottom: 6, display: "block" }}>
                    Target Metro Market
                  </label>
                  <select
                    id="p-city"
                    value={profile.city || ""}
                    onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                    style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1.5px solid #CBD5E1", fontSize: 14 }}
                  >
                    {cities.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.name}, {c.state}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="field">
                  <label htmlFor="p-years" style={{ fontSize: 13, fontWeight: 600, color: "#08142A", marginBottom: 6, display: "block" }}>
                    Years of Practice Post-Bar
                  </label>
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
                    style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1.5px solid #CBD5E1", fontSize: 14 }}
                  />
                </div>

                <div className="field">
                  <label htmlFor="p-mode" style={{ fontSize: 13, fontWeight: 600, color: "#08142A", marginBottom: 6, display: "block" }}>
                    Work Arrangement Preference
                  </label>
                  <select
                    id="p-mode"
                    value={profile.mode}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        mode: e.target.value as "any" | "on-site" | "hybrid",
                      })
                    }
                    style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1.5px solid #CBD5E1", fontSize: 14 }}
                  >
                    <option value="any">On-site or Hybrid (Flexible)</option>
                    <option value="on-site">On-site Dedicated</option>
                    <option value="hybrid">Hybrid Only</option>
                  </select>
                </div>

                <div className="field">
                  <label htmlFor="p-min" style={{ fontSize: 13, fontWeight: 600, color: "#08142A", marginBottom: 6, display: "block" }}>
                    Minimum Target Base Compensation ($/year)
                  </label>
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
                    style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1.5px solid #CBD5E1", fontSize: 14 }}
                  />
                </div>

                <div className="field">
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#08142A", marginBottom: 6, display: "block" }}>
                    Detected Skills &amp; Focus Areas <span style={{ fontWeight: 400, color: "#64748B" }}>(tap to toggle)</span>
                  </label>
                  <div className="ur-chips-grid">
                    {availableTags.map((tag) => {
                      const active = profile.tags.includes(tag);
                      return (
                        <button
                          key={tag}
                          type="button"
                          className={`ur-chip-btn${active ? " active" : ""}`}
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
                </div>
              </div>

              {/* Studio Right: Live Matches & Confidential Application Form */}
              <div className="ur-matches-container">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <div>
                    <h3 style={{ fontFamily: "var(--display)", fontSize: 24, color: "#08142A", margin: "0 0 4px" }}>
                      {matches.length ? (
                        <>
                          <Mark>{String(matches.length)}</Mark> {matches.length === 1 ? "Role Fits" : "Roles Fit"} Your Credentials
                        </>
                      ) : (
                        `No Listed ${roleObj?.short || "Matching"} Roles in ${cityObj?.name || "Your Area"} Today`
                      )}
                    </h3>
                    <p style={{ fontSize: 14, color: "#64748B", margin: 0 }}>
                      Sorted by algorithmic match relevance. Ranked by practice focus and compensation compatibility.
                    </p>
                  </div>
                </div>

                {matches.length > 0 ? (
                  <div className="cards" style={{ display: "grid", gap: 20 }}>
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
                  <div style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 14, padding: "36px 28px", textAlign: "center" }}>
                    <p style={{ fontSize: 15, color: "#334155", margin: "0 0 16px" }}>
                      <b>Many premier lateral seats are filled before public posting.</b> Submit your confidential profile and founder Justin will directly match you to unlisted opportunities as they open.
                    </p>
                  </div>
                )}

                {/* Confidential Application / Alerts Gate Form */}
                <div id="alerts" style={{ marginTop: 28 }}>
                  <GateForm
                    eyebrow={applyToJobId ? "CONFIDENTIAL APPLICATION" : "CONFIDENTIAL MATCH ALERTS"}
                    title={
                      applyToJobId
                        ? `Apply confidentially to Role ${applyToJobId}`
                        : matches.length === 1
                        ? "Email me this role and new matches"
                        : matches.length
                        ? `Email me these ${matches.length} matching roles`
                        : "Email me unlisted confidential matches"
                    }
                    audience="candidate"
                    button={applyToJobId ? "Submit confidential application" : "Receive match updates"}
                    reviewSlug="n-brown"
                    fine="Always use a personal email address, never your firm account. No employer sees your name without your express authorization."
                    steps={[
                      [
                        "Step 1: Protected Profile Created",
                        `Your dossier is cataloged as C-${cityObj?.state || "TX"}-${Math.floor(1000 + Math.random() * 9000)}. Zero employers can see your identity.`,
                        true,
                      ],
                      [
                        "Step 2: Director Level Evaluation",
                        applyToJobId
                          ? `Justin reviews the role details, confirms full pay and bonus package, and contacts you directly before proceeding.`
                          : `Justin identifies matching law firms, confirms true salary bands and billable expectations, and shares opportunities.`,
                      ],
                      [
                        "Step 3: Explicit Permission Required",
                        "No resume or identifying detail is ever presented to any firm until you give written approval for that specific firm.",
                      ],
                      [
                        "Step 4: Unsubscribe Anytime",
                        "One-click unsubscribe or immediate data purge guarantee upon request.",
                      ],
                    ]}
                  />
                </div>

                {matches.length > 2 && (
                  <div style={{ marginTop: 36 }}>
                    <h3 style={{ fontFamily: "var(--display)", fontSize: 20, color: "#08142A", marginBottom: 16 }}>
                      Additional Matching Openings
                    </h3>
                    <div className="cards" style={{ display: "grid", gap: 20 }}>
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

      {/* 4. WHAT HAPPENS TO YOUR RESUME — 4 SECURITY PILLARS */}
      <section className="emp-process-sec" style={{ background: "#FFFFFF", padding: "96px 0 108px", borderTop: "1px solid #E2E8F0" }}>
        <div className="wrap">
          <div className="sec-head" style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 48px" }}>
            <span className="eyebrow" style={{ color: "#1D4ED8", fontWeight: 700 }}>THE CANDIDATE GUARANTEE</span>
            <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(28px, 3.6vw, 42px)", color: "#08142A", margin: "10px 0 14px" }}>
              What happens to your resume at Orion
            </h2>
            <p style={{ color: "#64748B", fontSize: 16 }}>
              Legal recruiting is built on discretion. We hold our candidate privacy protocols to bar-admitted attorney standards.
            </p>
          </div>

          <div className="ur-security-grid">
            <div className="ur-security-card">
              <div className="ur-security-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div className="ur-security-title">Anonymous ID Only</div>
              <p className="ur-security-desc">
                Your resume is cataloged under a redacted identifier (e.g. C-TX-0412). Your actual name, firm name, and law school graduation dates remain shielded.
              </p>
            </div>

            <div className="ur-security-card">
              <div className="ur-security-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ur-security-title">Zero Blind Submissions</div>
              <p className="ur-security-desc">
                We never submit your credentials to any law firm without your explicit affirmative consent. You will know the exact firm, partners, and pay beforehand.
              </p>
            </div>

            <div className="ur-security-card">
              <div className="ur-security-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18.36 6.64a9 9 0 1 1-12.73 0M12 2v10" />
                </svg>
              </div>
              <div className="ur-security-title">Zero Firm Contact</div>
              <p className="ur-security-desc">
                We never contact your current employer or request references from colleagues at your firm. Your job search is kept 100% confidential.
              </p>
            </div>

            <div className="ur-security-card">
              <div className="ur-security-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <div className="ur-security-title">Same-Day Purge</div>
              <p className="ur-security-desc">
                Request deletion at any time via a single email. Your resume and candidate dossier are permanently expunged from our database the same day.
              </p>
            </div>
          </div>

          {/* Dossier Preview Visualizer */}
          <div style={{ marginTop: 56, background: "#FAF9F5", border: "1.5px solid #E2E8F0", borderRadius: 16, padding: "36px 32px" }}>
            <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center", marginBottom: 28 }}>
              <span style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#1D4ED8" }}>
                TRANSPARENCY PREVIEW
              </span>
              <h3 style={{ fontFamily: "var(--display)", fontSize: 24, color: "#08142A", margin: "8px 0" }}>
                What a law firm sees before your written approval
              </h3>
              <p style={{ fontSize: 14, color: "#64748B", margin: 0 }}>
                This redacted dossier is the only information a managing partner sees until you grant permission.
              </p>
            </div>
            <div style={{ maxWidth: 540, margin: "0 auto" }}>
              <ResumeSheet candidateId="EP-TX-0412" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. CROSS-FUNNEL VALUE BAND */}
      <section className="emp-process-sec" style={{ background: "#FAF9F5", padding: "64px 0", borderTop: "1px solid #E2E8F0", borderBottom: "1px solid #E2E8F0" }}>
        <div className="wrap" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
          <div>
            <span className="eyebrow" style={{ color: "#1D4ED8", fontWeight: 700 }}>PREFER TO BENCHMARK ANONYMOUSLY?</span>
            <h3 style={{ fontFamily: "var(--display)", fontSize: 26, color: "#08142A", margin: "6px 0 8px" }}>
              Check your current legal salary first
            </h3>
            <p style={{ color: "#64748B", fontSize: 15, margin: 0 }}>
              Compare your base compensation against 25th, 50th, and 75th percentiles in your city. 100% private in your browser.
            </p>
          </div>
          <Link className="btn-emp-ghost" href="/salary-check" style={{ color: "#08142A !important", borderColor: "#CBD5E1", background: "#FFFFFF" }}>
            <span>Run salary check</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* 6. CANDIDATE FAQ ACCORDION */}
      <section className="emp-process-sec" style={{ background: "#FFFFFF", padding: "96px 0 108px" }}>
        <div className="wrap split">
          <div className="sec-head">
            <span className="eyebrow" style={{ color: "#1D4ED8", fontWeight: 700 }}>CANDIDATE PRIVACY FAQ</span>
            <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(28px, 3.6vw, 40px)", color: "#08142A", margin: "10px 0 14px" }}>
              Questions before uploading
            </h2>
            <p style={{ color: "#64748B", fontSize: 15 }}>
              Prefer to speak directly with founder Justin before submitting?{" "}
              <Link href="/about" style={{ color: "#1D4ED8", textDecoration: "underline" }}>
                Schedule a confidential introductory call
              </Link>.
            </p>
          </div>

          <div className="faq" style={{ display: "grid", gap: 14 }}>
            <details style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 12, padding: "18px 22px" }}>
              <summary style={{ fontWeight: 600, color: "#08142A", cursor: "pointer", fontSize: 16 }}>
                Who reviews my uploaded resume?
              </summary>
              <p style={{ marginTop: 12, color: "#475569", lineHeight: 1.6, fontSize: 14.5 }}>
                Your resume is evaluated exclusively by Orion founder Justin. It is never parsed into third-party databases, never indexed on search engines, and never accessed by automated bot scrapers.
              </p>
            </details>

            <details style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 12, padding: "18px 22px" }}>
              <summary style={{ fontWeight: 600, color: "#08142A", cursor: "pointer", fontSize: 16 }}>
                Can my current law firm find out I uploaded a resume?
              </summary>
              <p style={{ marginTop: 12, color: "#475569", lineHeight: 1.6, fontSize: 14.5 }}>
                Under no circumstances. We do not publish candidate directories, and we never contact your current firm for references or background checks. All outreach takes place via your personal email or cell.
              </p>
            </details>

            <details style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 12, padding: "18px 22px" }}>
              <summary style={{ fontWeight: 600, color: "#08142A", cursor: "pointer", fontSize: 16 }}>
                Does using Orion cost the candidate anything?
              </summary>
              <p style={{ marginTop: 12, color: "#475569", lineHeight: 1.6, fontSize: 14.5 }}>
                No. Our representation is 100% free for candidates. Orion is compensated solely by the hiring law firm on a 23% contingency basis upon placement. Your job offer compensation is never docked to pay our placement fee.
              </p>
            </details>

            <details style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 12, padding: "18px 22px" }}>
              <summary style={{ fontWeight: 600, color: "#08142A", cursor: "pointer", fontSize: 16 }}>
                What happens when I express interest in an open seat?
              </summary>
              <p style={{ marginTop: 12, color: "#475569", lineHeight: 1.6, fontSize: 14.5 }}>
                Justin will contact you personally to share the firm name, managing partner background, culture notes, and full compensation structure. Only if you agree will we send your redacted or complete profile to that firm.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* 7. BOTTOM MIDNIGHT NAVY CTA */}
      <section className="emp-terms-dark-sec" style={{ background: "#08142A", padding: "100px 0 108px", textAlign: "center" }}>
        <div className="wrap" style={{ maxWidth: 760, margin: "0 auto" }}>
          <div className="badge-capsule" style={{ marginBottom: 18 }}>
            <span className="badge-dot" />
            <span>CONFIDENTIAL LATERAL ADVANCEMENT</span>
          </div>
          <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(32px, 4.2vw, 48px)", color: "#FFFFFF", margin: "0 0 16px" }}>
            See the roles that fit your credentials, <span className="serif-accent" style={{ color: "#60A5FA" }}>with the pay disclosed.</span>
          </h2>
          <p style={{ color: "#CBD5E1", fontSize: 17, lineHeight: 1.6, marginBottom: 32 }}>
            Join hundreds of Texas attorneys who explored confidential lateral career moves without their current firms ever knowing.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            <a href="#upload" className="btn-emp-primary" style={{ padding: "14px 34px", fontSize: 16 }}>
              <span>Upload your resume</span>
              <span aria-hidden="true">↑</span>
            </a>
            <Link href="/salary-check" className="btn-emp-ghost" style={{ padding: "14px 34px", fontSize: 16 }}>
              <span>Check your pay first</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
