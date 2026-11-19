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
import { JobCard } from "@/components/JobCard";
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
    <div className="ur-page" style={{ background: "#FAF9F5", color: "#08142A" }}>
      <style>{`
        .ur-pillar-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 14px;
          padding: 26px 22px;
          box-shadow: 0 2px 10px rgba(8, 20, 42, 0.03);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .ur-pillar-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(8, 20, 42, 0.06);
        }
        .ur-dossier-grid {
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 48px;
          align-items: center;
        }
        .ur-faq-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: start;
        }
        @media (max-width: 960px) {
          .ur-dossier-grid { grid-template-columns: 1fr !important; }
          .ur-faq-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
      {/* 1. LUXURY HERO WITH VIDEO & 2-COLUMN DROPZONE */}
      <section
        className="emp-luxury-hero-sec ur-luxury-hero-sec"
        aria-labelledby="ur-hero-title"
        style={{
          position: "relative",
          background: "#08142A",
          color: "#FFFFFF",
          padding: "124px 0 76px",
          overflow: "hidden",
        }}
      >
        <div className="emp-hero-video-wrap" aria-hidden="true">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="emp-hero-video"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.22,
            }}
          >
            <source src="/media/splash.mp4" type="video/mp4" />
          </video>
          <div
            className="emp-hero-overlay"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(180deg, rgba(8,20,42,0.85) 0%, rgba(8,20,42,0.96) 100%)",
            }}
          />
        </div>

        <div className="wrap" style={{ position: "relative", zIndex: 2, maxWidth: 880, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <div className="emp-hero-badge-wrap" style={{ marginBottom: 16 }}>
            <div
              className="hero-eyebrow-capsule badge-capsule"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 999,
                padding: "6px 16px",
                fontFamily: "var(--mono)",
                fontSize: 11,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#93C5FD",
              }}
            >
              <span className="hero-eyebrow-dot badge-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#60A5FA" }} />
              <span>CANDIDATE PRIVACY PROTOCOL<span className="eyebrow-sep"> · </span><br className="eyebrow-break" />100% CONFIDENTIAL &amp; FREE</span>
            </div>
          </div>

          <h1
            id="ur-hero-title"
            className="emp-hero-h1"
            style={{
              fontFamily: "var(--display)",
              fontSize: "clamp(34px, 4.4vw, 52px)",
              lineHeight: 1.12,
              fontWeight: 500,
              color: "#FFFFFF",
              margin: "0 0 18px",
            }}
          >
            Upload your resume, see{" "}
            <span className="serif-accent" style={{ color: "#60A5FA", fontStyle: "italic" }}>
              the roles that fit.
            </span>
          </h1>

          <p
            className="emp-hero-lead"
            style={{
              fontSize: 17,
              lineHeight: 1.6,
              color: "#CBD5E1",
              maxWidth: 680,
              margin: "0 auto 28px",
            }}
          >
            We parse your credentials into an anonymous candidate profile you control, then instantly match you against active Texas lateral openings with verified compensation. No firm ever sees your identity without your express written consent.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap", marginBottom: 32 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, color: "#E2E8F0" }}>
              <span style={{ color: "#60A5FA", fontWeight: 700 }}>✓</span>
              <span>No law firm sees your name until you say yes</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, color: "#E2E8F0" }}>
              <span style={{ color: "#60A5FA", fontWeight: 700 }}>✓</span>
              <span>Zero contact with your current firm or colleagues</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, color: "#E2E8F0" }}>
              <span style={{ color: "#60A5FA", fontWeight: 700 }}>✓</span>
              <span>Always 100% free for candidates</span>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 14, marginBottom: 28 }}>
            <a
              href="#upload"
              className="btn-emp-primary"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#1D4ED8",
                color: "#FFFFFF",
                fontWeight: 600,
                fontSize: 15,
                padding: "13px 28px",
                borderRadius: 7,
                textDecoration: "none",
                boxShadow: "0 4px 16px rgba(29, 78, 216, 0.4)",
              }}
            >
              <span>Upload Resume Below</span>
              <span aria-hidden="true">↓</span>
            </a>
            <Link
              href="/salary-check"
              className="btn-emp-ghost"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.18)",
                color: "#FFFFFF",
                fontWeight: 600,
                fontSize: 15,
                padding: "13px 24px",
                borderRadius: 7,
                textDecoration: "none",
              }}
            >
              <span>Check your pay first</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.12)", paddingTop: 18, maxWidth: 640, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: 12.5, color: "#94A3B8" }}>
              <span style={{ color: "#FBBF24" }}>★★★★★</span>
              <span style={{ fontWeight: 600, color: "#FFFFFF" }}>4.9/5 Candidate Trust</span>
              <span>·</span>
              <span>Texas Bar Discretion Standard</span>
              <span>·</span>
              <span>Zero Public Indexing</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CONFIDENTIAL RESUME INTAKE SECTION */}
      <section
        id="upload"
        style={{
          background: "#FAF9F5",
          padding: "76px 0 88px",
          borderBottom: "1px solid #EAE7DC",
        }}
      >
        <div className="wrap" style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div
              className="badge-capsule"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(29, 78, 216, 0.08)",
                border: "1px solid rgba(29, 78, 216, 0.2)",
                borderRadius: 999,
                padding: "5px 14px",
                fontFamily: "var(--mono)",
                fontSize: 11,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#1D4ED8",
                marginBottom: 12,
              }}
            >
              <span className="badge-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#1D4ED8" }} />
              <span>STEP 01 · CONFIDENTIAL PARSER</span>
            </div>
            <h2
              style={{
                fontFamily: "var(--display)",
                fontSize: "clamp(26px, 3.2vw, 36px)",
                color: "#08142A",
                margin: "0 0 10px",
                fontWeight: 500,
              }}
            >
              Drop your resume, see matching <span className="serif-accent" style={{ color: "#1D4ED8", fontStyle: "italic" }}>Texas roles.</span>
            </h2>
            <p style={{ color: "#64748B", fontSize: 15, margin: 0, lineHeight: 1.5 }}>
              Your file is processed in memory. No firm ever sees your identity until you explicitly authorize an interview.
            </p>
          </div>

          <div
            className="ur-drop-card"
            style={{
              background: "#FFFFFF",
              border: "1.5px solid #E2E8F0",
              borderRadius: 14,
              padding: "32px 28px",
              boxShadow: "0 12px 36px -8px rgba(0, 0, 0, 0.08)",
              color: "#08142A",
              textAlign: "center",
            }}
          >
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
              style={{
                border: "2px dashed #93C5FD",
                borderRadius: 12,
                padding: "36px 20px",
                background: "#F8FAFC",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: "50%",
                  background: "#EFF6FF",
                  color: "#1D4ED8",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                  border: "1px solid #BFDBFE",
                }}
                aria-hidden="true"
              >
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

              <div style={{ fontFamily: "var(--display)", fontSize: 20, color: "#08142A", fontWeight: 600, marginBottom: 6 }}>
                Drag &amp; drop your resume here
              </div>
              <p style={{ fontSize: 13, color: "#64748B", maxWidth: 360, margin: "0 auto 20px", lineHeight: 1.5 }}>
                PDF, Word (.docx), or plain text. Your resume is never uploaded to public boards or shared without prior written consent.
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

              <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "center" }}>
                <label
                  htmlFor="file"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: "#1D4ED8",
                    color: "#FFFFFF",
                    fontWeight: 600,
                    fontSize: 14,
                    padding: "12px 24px",
                    borderRadius: 7,
                    cursor: "pointer",
                  }}
                >
                  <span>Select file to upload</span>
                  <span aria-hidden="true">→</span>
                </label>
                <button
                  type="button"
                  onClick={() => handleProcessText(sampleResume, "sample")}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#1D4ED8",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                    textDecoration: "underline",
                    padding: "4px 8px",
                  }}
                >
                  Or load sample resume (Texas Estate Planning)
                </button>
              </div>

              {fileName && (
                <div
                  style={{
                    marginTop: 18,
                    background: "#ECFDF5",
                    border: "1px solid #A7F3D0",
                    borderRadius: 6,
                    padding: "8px 14px",
                    color: "#059669",
                    fontSize: 13,
                    fontWeight: 600,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <span aria-hidden="true">✓</span>
                  <span>{fileName}</span>
                </div>
              )}
            </div>

            <details style={{ marginTop: 18, textAlign: "left" }}>
              <summary style={{ fontWeight: 600, color: "#1D4ED8", cursor: "pointer", fontSize: 13.5 }}>
                Prefer to paste resume text directly?
              </summary>
              <div style={{ marginTop: 12 }}>
                <textarea
                  aria-label="Resume text"
                  placeholder="Paste your legal CV or resume text here (experience, bar admission, practice highlights)..."
                  value={pasteText}
                  onChange={(e) => setPasteText(e.target.value)}
                  rows={4}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: 8,
                    border: "1.5px solid #CBD5E1",
                    fontSize: 13,
                    fontFamily: "inherit",
                    resize: "vertical",
                  }}
                />
                <div style={{ marginTop: 8, textAlign: "right" }}>
                  <button
                    type="button"
                    onClick={() => {
                      if (pasteText.trim()) handleProcessText(pasteText, "text");
                    }}
                    style={{
                      background: "#1D4ED8",
                      color: "#FFFFFF",
                      border: "none",
                      borderRadius: 7,
                      padding: "8px 18px",
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Parse pasted text
                  </button>
                </div>
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* 2. BEFORE UPLOAD: ACTIVE LATERAL ROLES IN TEXAS */}
      {!profile && (
        <section className="emp-process-sec" id="open" style={{ background: "#FAF9F5", padding: "88px 0 96px", borderBottom: "1px solid #EAE7DC" }}>
          <div className="wrap" style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
            <div className="sec-head" style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 44px" }}>
              <span
                className="eyebrow"
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 12,
                  color: "#1D4ED8",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: 8,
                }}
              >
                VERIFIED LATERAL OPENINGS
              </span>
              <h2
                style={{
                  fontFamily: "var(--display)",
                  fontSize: "clamp(28px, 3.6vw, 42px)",
                  color: "#08142A",
                  margin: "0 0 14px",
                  fontWeight: 500,
                }}
              >
                Active boutique &amp; mid-size roles open <span className="serif-accent" style={{ fontStyle: "italic" }}>now</span>
              </h2>
              <p style={{ color: "#64748B", fontSize: 16, lineHeight: 1.6, margin: 0 }}>
                Every position features disclosed base compensation and verified bonus norms. Upload your resume above to see your customized algorithmic fit.
              </p>
            </div>

            <div className="cards" style={{ display: "grid", gap: 20 }}>
              {initialOpenJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>

            <div style={{ textAlign: "center", marginTop: 36 }}>
              <a
                href="#upload"
                className="btn-emp-primary"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#1D4ED8",
                  color: "#FFFFFF",
                  fontWeight: 600,
                  fontSize: 15,
                  padding: "13px 28px",
                  borderRadius: 7,
                  textDecoration: "none",
                }}
              >
                <span>Upload resume to match these roles</span>
                <span aria-hidden="true">↑</span>
              </a>
            </div>
          </div>
        </section>
      )}

      {/* 3. AFTER UPLOAD: PARSED PROFILE & LIVE MATCH STUDIO */}
      {profile && (
        <section className="emp-process-sec" id="profile" style={{ background: "#FAF9F5", padding: "88px 0 96px", borderBottom: "1px solid #EAE7DC" }}>
          <div className="wrap" style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
            <div className="sec-head" style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 40px" }}>
              <span
                className="eyebrow"
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 12,
                  color: "#1D4ED8",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: 8,
                }}
              >
                REAL-TIME MATCH ENGINE
              </span>
              <h2
                style={{
                  fontFamily: "var(--display)",
                  fontSize: "clamp(28px, 3.6vw, 42px)",
                  color: "#08142A",
                  margin: "0 0 14px",
                  fontWeight: 500,
                }}
              >
                Your candidate profile &amp; matching <span className="serif-accent" style={{ fontStyle: "italic" }}>seats</span>
              </h2>
              <p style={{ color: "#64748B", fontSize: 16, lineHeight: 1.6, margin: 0 }}>
                Review and refine how our parser interpreted your background. Every modification updates your matching opportunities immediately.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 36, alignItems: "start" }}>
              {/* Studio Left: Profile Form Card */}
              <div
                style={{
                  background: "#FFFFFF",
                  border: "1.5px solid #E2E8F0",
                  borderRadius: 14,
                  padding: "28px 24px",
                  boxShadow: "0 4px 16px rgba(15,23,42,0.04)",
                  position: "sticky",
                  top: 96,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderBottom: "1.5px solid #E2E8F0", paddingBottom: 14, marginBottom: 16 }}>
                  <h3 style={{ fontFamily: "var(--display)", fontSize: 20, color: "#08142A", margin: 0, fontWeight: 500 }}>
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

                <p style={{ fontSize: 12, color: "#059669", background: "#ECFDF5", padding: "6px 12px", borderRadius: 6, margin: "0 0 16px", border: "1px solid #A7F3D0" }}>
                  {profile.src === "sample"
                    ? "Parsed from Texas Estate Planning sample."
                    : profile.src === "text"
                      ? "Parsed from custom pasted text."
                      : `Parsed from your file: ${fileName}`}
                </p>

                <div className="field" style={{ marginBottom: 14 }}>
                  <label htmlFor="p-role" style={{ fontSize: 11.5, fontFamily: "var(--mono)", fontWeight: 700, textTransform: "uppercase", color: "#08142A", marginBottom: 5, display: "block" }}>
                    Primary Practice Area
                  </label>
                  <select
                    id="p-role"
                    value={profile.role || ""}
                    onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: 7, border: "1.5px solid #CBD5E1", fontSize: 13.5, background: "#FFFFFF", color: "#08142A" }}
                  >
                    {roles.map((r) => (
                      <option key={r.slug} value={r.slug}>
                        {r.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="field" style={{ marginBottom: 14 }}>
                  <label htmlFor="p-city" style={{ fontSize: 11.5, fontFamily: "var(--mono)", fontWeight: 700, textTransform: "uppercase", color: "#08142A", marginBottom: 5, display: "block" }}>
                    Target Metro Market
                  </label>
                  <select
                    id="p-city"
                    value={profile.city || ""}
                    onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: 7, border: "1.5px solid #CBD5E1", fontSize: 13.5, background: "#FFFFFF", color: "#08142A" }}
                  >
                    {cities.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.name}, {c.state}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="field" style={{ marginBottom: 14 }}>
                  <label htmlFor="p-years" style={{ fontSize: 11.5, fontFamily: "var(--mono)", fontWeight: 700, textTransform: "uppercase", color: "#08142A", marginBottom: 5, display: "block" }}>
                    Years Post-Bar
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
                    style={{ width: "100%", padding: "9px 12px", borderRadius: 7, border: "1.5px solid #CBD5E1", fontSize: 13.5, background: "#FFFFFF", color: "#08142A" }}
                  />
                </div>

                <div className="field" style={{ marginBottom: 14 }}>
                  <label htmlFor="p-mode" style={{ fontSize: 11.5, fontFamily: "var(--mono)", fontWeight: 700, textTransform: "uppercase", color: "#08142A", marginBottom: 5, display: "block" }}>
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
                    style={{ width: "100%", padding: "9px 12px", borderRadius: 7, border: "1.5px solid #CBD5E1", fontSize: 13.5, background: "#FFFFFF", color: "#08142A" }}
                  >
                    <option value="any">On-site or Hybrid (Flexible)</option>
                    <option value="on-site">On-site Dedicated</option>
                    <option value="hybrid">Hybrid Only</option>
                  </select>
                </div>

                <div className="field" style={{ marginBottom: 16 }}>
                  <label htmlFor="p-min" style={{ fontSize: 11.5, fontFamily: "var(--mono)", fontWeight: 700, textTransform: "uppercase", color: "#08142A", marginBottom: 5, display: "block" }}>
                    Minimum Target Base Pay ($/year)
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
                    style={{ width: "100%", padding: "9px 12px", borderRadius: 7, border: "1.5px solid #CBD5E1", fontSize: 13.5, background: "#FFFFFF", color: "#08142A" }}
                  />
                </div>

                <div className="field">
                  <label style={{ fontSize: 11.5, fontFamily: "var(--mono)", fontWeight: 700, textTransform: "uppercase", color: "#08142A", marginBottom: 8, display: "block" }}>
                    Detected Skills &amp; Focus <span style={{ fontWeight: 400, color: "#64748B" }}>(tap to toggle)</span>
                  </label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {availableTags.map((tag) => {
                      const active = profile.tags.includes(tag);
                      return (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => {
                            const newTags = active
                              ? profile.tags.filter((t) => t !== tag)
                              : [...profile.tags, tag];
                            setProfile({ ...profile, tags: newTags });
                          }}
                          style={{
                            padding: "6px 12px",
                            borderRadius: 6,
                            fontSize: 12,
                            fontWeight: 600,
                            cursor: "pointer",
                            transition: "all 0.15s ease",
                            background: active ? "#1D4ED8" : "#F1F5F9",
                            color: active ? "#FFFFFF" : "#334155",
                            border: `1px solid ${active ? "#1D4ED8" : "#E2E8F0"}`,
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
              <div>
                <div style={{ marginBottom: 20 }}>
                  <h3 style={{ fontFamily: "var(--display)", fontSize: 24, color: "#08142A", margin: "0 0 4px", fontWeight: 500 }}>
                    {matches.length ? (
                      <>
                        <Mark>{String(matches.length)}</Mark> {matches.length === 1 ? "Role Fits" : "Roles Fit"} Your Credentials
                      </>
                    ) : (
                      `No Listed ${roleObj?.short || "Matching"} Roles in ${cityObj?.name || "Your Area"} Today`
                    )}
                  </h3>
                  <p style={{ fontSize: 14, color: "#64748B", margin: 0 }}>
                    Sorted by algorithmic match score. Filtered by practice area, city, and minimum compensation compatibility.
                  </p>
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
                      <b>Many premier lateral seats are filled before public posting.</b> Submit your confidential profile below and founder Justin will directly match you to unlisted opportunities as they open.
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
      <section className="emp-process-sec" style={{ background: "#FFFFFF", padding: "88px 0 96px", borderBottom: "1px solid #E2E8F0" }}>
        <div className="wrap" style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
          <div className="sec-head" style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 44px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(29, 78, 216, 0.08)",
                border: "1px solid rgba(29, 78, 216, 0.2)",
                borderRadius: 100,
                padding: "5px 14px",
                fontSize: "0.78rem",
                fontWeight: 700,
                color: "#1D4ED8",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              THE CANDIDATE GUARANTEE · 4 PRIVACY PILLARS
            </div>
            <h2
              style={{
                fontFamily: "var(--font-serif, Georgia, serif)",
                fontSize: "clamp(2rem, 3.2vw, 2.6rem)",
                color: "#08142A",
                margin: "0 0 14px",
                fontWeight: 700,
                lineHeight: 1.2,
              }}
            >
              What happens to your resume at{" "}
              <span className="serif-accent" style={{ color: "#1D4ED8", fontStyle: "italic" }}>
                Orion
              </span>
            </h2>
            <p style={{ color: "#64748B", fontSize: "1.05rem", lineHeight: 1.6, margin: 0 }}>
              Legal recruiting is built on discretion. We hold our candidate privacy protocols to bar-admitted attorney standards. Zero current firm contact, zero blind submissions.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20, marginBottom: 52 }}>
            <div className="ur-pillar-card">
              <div style={{ fontFamily: "monospace", fontSize: "0.8rem", color: "#1D4ED8", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>
                PILLAR 01 · IDENTITY
              </div>
              <h3 style={{ fontSize: "1.15rem", color: "#08142A", fontWeight: 500, fontFamily: "var(--display)", margin: "0 0 8px" }}>
                Anonymous ID Only
              </h3>
              <p style={{ fontSize: "0.88rem", lineHeight: 1.6, color: "#475569", margin: 0 }}>
                Your resume is cataloged under a redacted identifier (e.g. C-TX-0412). Your actual name, current law firm, and graduation years remain shielded.
              </p>
            </div>

            <div className="ur-pillar-card">
              <div style={{ fontFamily: "monospace", fontSize: "0.8rem", color: "#1D4ED8", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>
                PILLAR 02 · PERMISSION
              </div>
              <h3 style={{ fontSize: "1.15rem", color: "#08142A", fontWeight: 500, fontFamily: "var(--display)", margin: "0 0 8px" }}>
                Zero Blind Submissions
              </h3>
              <p style={{ fontSize: "0.88rem", lineHeight: 1.6, color: "#475569", margin: 0 }}>
                We never submit your credentials to any law firm without your explicit affirmative consent. You will know the exact firm, partners, and pay beforehand.
              </p>
            </div>

            <div className="ur-pillar-card">
              <div style={{ fontFamily: "monospace", fontSize: "0.8rem", color: "#1D4ED8", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>
                PILLAR 03 · DISCRETION
              </div>
              <h3 style={{ fontSize: "1.15rem", color: "#08142A", fontWeight: 500, fontFamily: "var(--display)", margin: "0 0 8px" }}>
                Zero Current Firm Contact
              </h3>
              <p style={{ fontSize: "0.88rem", lineHeight: 1.6, color: "#475569", margin: 0 }}>
                We never contact your current employer or request references from colleagues at your firm. Your job search is kept 100% confidential.
              </p>
            </div>

            <div className="ur-pillar-card">
              <div style={{ fontFamily: "monospace", fontSize: "0.8rem", color: "#1D4ED8", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>
                PILLAR 04 · CONTROL
              </div>
              <h3 style={{ fontSize: "1.15rem", color: "#08142A", fontWeight: 500, fontFamily: "var(--display)", margin: "0 0 8px" }}>
                Same-Day Purge Guarantee
              </h3>
              <p style={{ fontSize: "0.88rem", lineHeight: 1.6, color: "#475569", margin: 0 }}>
                Request deletion at any time via a single email. Your resume and candidate dossier are permanently expunged from our database the same day.
              </p>
            </div>
          </div>

          {/* Dossier Preview Visualizer: Full-Width Executive Card */}
          <div
            style={{
              background: "#FFFFFF",
              border: "1px solid #E2E8F0",
              borderRadius: 16,
              padding: "40px",
              boxShadow: "0 4px 24px rgba(8, 20, 42, 0.04)",
            }}
          >
            <div className="ur-dossier-grid">
              {/* Left Column: Explanatory Breakdown */}
              <div>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: "rgba(29, 78, 216, 0.08)",
                    border: "1px solid rgba(29, 78, 216, 0.2)",
                    borderRadius: 100,
                    padding: "5px 14px",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    color: "#1D4ED8",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    marginBottom: 12,
                  }}
                >
                  TRANSPARENCY PREVIEW · ZERO BLIND SUBMISSIONS
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-serif, Georgia, serif)",
                    fontSize: "clamp(1.8rem, 2.8vw, 2.3rem)",
                    color: "#08142A",
                    margin: "0 0 12px",
                    fontWeight: 700,
                    lineHeight: 1.25,
                  }}
                >
                  What a law firm sees{" "}
                  <span className="serif-accent" style={{ color: "#1D4ED8", fontStyle: "italic" }}>
                    before your written approval
                  </span>
                </h3>
                <p style={{ fontSize: "1rem", color: "#475569", lineHeight: 1.65, margin: "0 0 24px" }}>
                  This redacted dossier is the only document an interested managing partner or recruiting chair evaluates until you review the opportunity and grant prior written authorization.
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
                  <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 10, padding: "16px 18px" }}>
                    <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#DC2626", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
                      <span>✕</span> Shielded Until Consent
                    </div>
                    <ul style={{ margin: 0, paddingLeft: 16, fontSize: "0.85rem", color: "#7F1D1D", lineHeight: 1.6 }}>
                      <li>Full candidate legal name</li>
                      <li>Current law firm &amp; employers</li>
                      <li>Law school &amp; graduation dates</li>
                      <li>Contact details &amp; bar number</li>
                    </ul>
                  </div>

                  <div style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 10, padding: "16px 18px" }}>
                    <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#16A34A", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
                      <span>✓</span> Visible to Partner
                    </div>
                    <ul style={{ margin: 0, paddingLeft: 16, fontSize: "0.85rem", color: "#14532D", lineHeight: 1.6 }}>
                      <li>Anonymous Orion ID (e.g. EP-TX-0412)</li>
                      <li>Substantive case &amp; drafting mix</li>
                      <li>Years in practice &amp; seniority</li>
                      <li>Published base compensation range</li>
                    </ul>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: "0.88rem", color: "#059669", background: "rgba(5, 150, 105, 0.08)", border: "1px solid rgba(5, 150, 105, 0.2)", borderRadius: 8, padding: "10px 14px" }}>
                  <span style={{ fontWeight: 700 }}>●</span>
                  <span>Active Blind Submission Protection: Zero firm ever discovers your identity prematurely.</span>
                </div>
              </div>

              {/* Right Column: Redacted Dossier Visualizer */}
              <div style={{ width: "100%", maxWidth: "560px", margin: "0 auto" }}>
                <div style={{ background: "#FAF9F5", border: "1.5px solid #E2E8F0", borderRadius: 14, padding: "20px", boxShadow: "0 8px 30px rgba(8, 20, 42, 0.06)" }}>
                  <ResumeSheet candidateId="EP-TX-0412" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CROSS-FUNNEL VALUE BAND (DARK SECTION) */}
      <section
        style={{
          background: "radial-gradient(ellipse 90% 80% at 50% -20%, rgba(29, 78, 216, 0.28) 0%, rgba(8, 20, 42, 0.98) 75%, #08142A 100%)",
          color: "#FFFFFF",
          padding: "72px 0",
          borderTop: "1px solid rgba(255, 255, 255, 0.12)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
        }}
      >
        <div
          style={{
            maxWidth: 1240,
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 24,
          }}
        >
          <div style={{ maxWidth: 720 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(29, 78, 216, 0.25)",
                border: "1px solid rgba(96, 165, 250, 0.35)",
                borderRadius: 100,
                padding: "5px 14px",
                fontSize: "0.78rem",
                fontWeight: 700,
                color: "#93C5FD",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              PREFER TO BENCHMARK ANONYMOUSLY?
            </div>
            <h3
              style={{
                fontFamily: "var(--font-serif, Georgia, serif)",
                fontSize: "clamp(24px, 3vw, 32px)",
                color: "#FFFFFF",
                margin: "0 0 10px",
                fontWeight: 700,
                lineHeight: 1.25,
              }}
            >
              Check your current legal salary{" "}
              <span className="serif-accent" style={{ color: "#60A5FA", fontStyle: "italic" }}>
                first
              </span>
            </h3>
            <p style={{ color: "#CBD5E1", fontSize: "1.02rem", lineHeight: 1.6, margin: 0 }}>
              Compare your base compensation against 25th, 50th, and 75th percentiles in your Texas market. Runs 100% private in your client browser.
            </p>
          </div>
          <div>
            <Link
              href="/salary-check"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                borderRadius: 7,
                fontWeight: 600,
                padding: "14px 28px",
                color: "#FFFFFF",
                textDecoration: "none",
                fontSize: "0.95rem",
                background: "#1D4ED8",
                boxShadow: "0 4px 16px rgba(29, 78, 216, 0.4)",
                transition: "all 0.2s ease",
              }}
            >
              <span>Run Free Salary Check</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. CANDIDATE FAQ ACCORDION */}
      <section style={{ background: "#FAF9F5", padding: "88px 0 96px", borderBottom: "1px solid #E2E8F0" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }} className="ur-faq-grid">
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(29, 78, 216, 0.08)",
                border: "1px solid rgba(29, 78, 216, 0.2)",
                borderRadius: 100,
                padding: "5px 14px",
                fontSize: "0.78rem",
                fontWeight: 700,
                color: "#1D4ED8",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              CANDIDATE PRIVACY FAQ · 100% DISCREET
            </div>
            <h2
              style={{
                fontFamily: "var(--font-serif, Georgia, serif)",
                fontSize: "clamp(2rem, 3.2vw, 2.6rem)",
                color: "#08142A",
                margin: "0 0 14px",
                fontWeight: 700,
                lineHeight: 1.2,
              }}
            >
              Questions before{" "}
              <span className="serif-accent" style={{ color: "#1D4ED8", fontStyle: "italic" }}>
                uploading
              </span>
            </h2>
            <p style={{ color: "#475569", fontSize: "1.05rem", lineHeight: 1.65, margin: "0 0 16px" }}>
              Every attorney resume received by Orion is treated under strict attorney-client style confidentiality. We work exclusively with verified candidates seeking strategic career advancement without risking their current position.
            </p>
            <p style={{ color: "#64748B", fontSize: "0.95rem", lineHeight: 1.6, margin: "0 0 24px" }}>
              Have specific questions about our non-exclusive representation, partner compensation benchmarks, or our same-day data purge guarantee? Justin reviews every submission personally.
            </p>

            <div style={{ display: "grid", gap: 12, marginBottom: 28 }}>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ color: "#1D4ED8", fontWeight: 700, marginTop: 1 }}>✓</span>
                <span style={{ fontSize: "0.92rem", color: "#334155" }}>
                  <strong>Zero Automated Rejections:</strong> Every profile is reviewed by founder Justin personally.
                </span>
              </div>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ color: "#1D4ED8", fontWeight: 700, marginTop: 1 }}>✓</span>
                <span style={{ fontSize: "0.92rem", color: "#334155" }}>
                  <strong>100% Free for Candidates:</strong> Hiring law firms pay all placement fees without docking your salary.
                </span>
              </div>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ color: "#1D4ED8", fontWeight: 700, marginTop: 1 }}>✓</span>
                <span style={{ fontSize: "0.92rem", color: "#334155" }}>
                  <strong>Zero Employer Contact:</strong> Your managing partners or firm colleagues will never know you reached out.
                </span>
              </div>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
              <a
                href="https://calendly.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#1D4ED8",
                  color: "#FFFFFF",
                  padding: "12px 22px",
                  borderRadius: 7,
                  fontWeight: 600,
                  fontSize: "0.92rem",
                  textDecoration: "none",
                  boxShadow: "0 4px 14px rgba(29, 78, 216, 0.35)",
                }}
              >
                <span>Book 15 Min Call with Justin</span>
                <span aria-hidden="true">→</span>
              </a>
              <Link
                href="/about"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  background: "#FFFFFF",
                  border: "1.5px solid #CBD5E1",
                  color: "#08142A",
                  padding: "11px 18px",
                  borderRadius: 7,
                  fontWeight: 600,
                  fontSize: "0.92rem",
                  textDecoration: "none",
                }}
              >
                <span>Learn About Orion</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <div style={{ display: "grid", gap: 14 }}>
            <details style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 12, padding: "20px 22px", boxShadow: "0 2px 10px rgba(8, 20, 42, 0.02)" }} open>
              <summary style={{ fontWeight: 700, color: "#08142A", cursor: "pointer", fontSize: "0.98rem", display: "flex", justifyContent: "space-between", alignItems: "center", listStyle: "none" }}>
                <span>Who reviews my uploaded resume?</span>
                <span style={{ color: "#1D4ED8", fontSize: "1.2rem", fontWeight: 700 }}>+</span>
              </summary>
              <p style={{ marginTop: 12, color: "#475569", lineHeight: 1.65, fontSize: "0.92rem", margin: "12px 0 0" }}>
                Your resume is evaluated exclusively by Orion founder Justin. It is never parsed into public third-party databases, never indexed on search engines, and never accessed by automated bot scrapers.
              </p>
            </details>

            <details style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 12, padding: "20px 22px", boxShadow: "0 2px 10px rgba(8, 20, 42, 0.02)" }}>
              <summary style={{ fontWeight: 700, color: "#08142A", cursor: "pointer", fontSize: "0.98rem", display: "flex", justifyContent: "space-between", alignItems: "center", listStyle: "none" }}>
                <span>Can my current law firm find out I uploaded a resume?</span>
                <span style={{ color: "#1D4ED8", fontSize: "1.2rem", fontWeight: 700 }}>+</span>
              </summary>
              <p style={{ marginTop: 12, color: "#475569", lineHeight: 1.65, fontSize: "0.92rem", margin: "12px 0 0" }}>
                Under no circumstances. We do not publish candidate directories, and we never contact your current firm for references or background checks. All communication takes place discreetly via your personal email or cell.
              </p>
            </details>

            <details style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 12, padding: "20px 22px", boxShadow: "0 2px 10px rgba(8, 20, 42, 0.02)" }}>
              <summary style={{ fontWeight: 700, color: "#08142A", cursor: "pointer", fontSize: "0.98rem", display: "flex", justifyContent: "space-between", alignItems: "center", listStyle: "none" }}>
                <span>Does using Orion cost the candidate anything?</span>
                <span style={{ color: "#1D4ED8", fontSize: "1.2rem", fontWeight: 700 }}>+</span>
              </summary>
              <p style={{ marginTop: 12, color: "#475569", lineHeight: 1.65, fontSize: "0.92rem", margin: "12px 0 0" }}>
                No. Our candidate representation is 100% free. Orion is compensated solely by the hiring law firm on a contingency basis upon placement. Your negotiated salary and bonus are never docked to pay our fee.
              </p>
            </details>

            <details style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 12, padding: "20px 22px", boxShadow: "0 2px 10px rgba(8, 20, 42, 0.02)" }}>
              <summary style={{ fontWeight: 700, color: "#08142A", cursor: "pointer", fontSize: "0.98rem", display: "flex", justifyContent: "space-between", alignItems: "center", listStyle: "none" }}>
                <span>What happens when I express interest in an open seat?</span>
                <span style={{ color: "#1D4ED8", fontSize: "1.2rem", fontWeight: 700 }}>+</span>
              </summary>
              <p style={{ marginTop: 12, color: "#475569", lineHeight: 1.65, fontSize: "0.92rem", margin: "12px 0 0" }}>
                Justin will contact you personally to share the law firm name, managing partner background, culture dynamics, billable expectations, and full compensation structure. Only if you agree will we send your redacted or complete profile to that firm.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* 7. BOTTOM MIDNIGHT NAVY CTA BAND */}
      <section className="emp-terms-dark-sec" style={{ background: "#08142A", padding: "96px 0 108px", textAlign: "center" }}>
        <div className="wrap" style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px" }}>
          <div
            className="badge-capsule"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 999,
              padding: "6px 14px",
              fontFamily: "var(--mono)",
              fontSize: 11,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#93C5FD",
              marginBottom: 18,
            }}
          >
            <span className="badge-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#60A5FA" }} />
            <span>CONFIDENTIAL LATERAL ADVANCEMENT</span>
          </div>

          <h2
            style={{
              fontFamily: "var(--display)",
              fontSize: "clamp(32px, 4.2vw, 48px)",
              color: "#FFFFFF",
              margin: "0 0 16px",
              fontWeight: 500,
              lineHeight: 1.15,
            }}
          >
            See the roles that fit your credentials,{" "}
            <span className="serif-accent" style={{ color: "#60A5FA", fontStyle: "italic" }}>
              with the pay disclosed.
            </span>
          </h2>

          <p style={{ color: "#CBD5E1", fontSize: 17, lineHeight: 1.6, marginBottom: 34, maxWidth: 640, margin: "0 auto 34px" }}>
            Join hundreds of Texas attorneys who explored confidential lateral career moves without their current firms ever knowing.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            <a
              href="#upload"
              className="btn-emp-primary"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#1D4ED8",
                color: "#FFFFFF",
                fontWeight: 600,
                fontSize: 16,
                padding: "14px 34px",
                borderRadius: 7,
                textDecoration: "none",
              }}
            >
              <span>Upload your resume</span>
              <span aria-hidden="true">↑</span>
            </a>
            <Link
              href="/salary-check"
              className="btn-emp-ghost"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.18)",
                color: "#FFFFFF",
                fontWeight: 600,
                fontSize: 16,
                padding: "14px 34px",
                borderRadius: 7,
                textDecoration: "none",
              }}
            >
              <span>Check your pay first</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
