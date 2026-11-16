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
import { Breadcrumb } from "@/components/Breadcrumb";
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

        <div className="wrap" style={{ position: "relative", zIndex: 2, maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
          {/* Breadcrumb Navigation */}
          <div style={{ marginBottom: 20 }}>
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Candidates", href: "/candidates" },
                { label: "Upload Resume", current: true },
              ]}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 40, alignItems: "center" }}>
            {/* Left Column: Heading & Executive Value */}
            <div>
              <div className="emp-hero-badge-wrap" style={{ marginBottom: 16 }}>
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
                  }}
                >
                  <span className="badge-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#60A5FA" }} />
                  <span>CANDIDATE PRIVACY PROTOCOL · 100% CONFIDENTIAL &amp; FREE</span>
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
                  the roles that fit
                </span>
              </h1>

              <p
                className="emp-hero-lead"
                style={{
                  fontSize: 17,
                  lineHeight: 1.6,
                  color: "#CBD5E1",
                  maxWidth: 580,
                  margin: "0 0 28px",
                }}
              >
                We parse your credentials into an anonymous candidate profile you control, then instantly match you against active Texas lateral openings with verified compensation. No firm ever sees your identity without your express written consent.
              </p>

              <div style={{ display: "grid", gap: 10, marginBottom: 28 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "#E2E8F0" }}>
                  <span style={{ color: "#60A5FA", fontWeight: 700 }}>✓</span>
                  <span>No law firm sees your name or firm until you say yes</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "#E2E8F0" }}>
                  <span style={{ color: "#60A5FA", fontWeight: 700 }}>✓</span>
                  <span>Zero contact with your current firm, partners, or colleagues</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "#E2E8F0" }}>
                  <span style={{ color: "#60A5FA", fontWeight: 700 }}>✓</span>
                  <span>Always 100% free for candidate attorneys and paralegals</span>
                </div>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
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
                    padding: "13px 26px",
                    borderRadius: 7,
                    textDecoration: "none",
                  }}
                >
                  <span>Drop your resume below</span>
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
            </div>

            {/* Right Column: Elevated Luxury Upload Drop Card */}
            <div>
              <div
                className="ur-drop-card"
                id="upload"
                style={{
                  background: "#FFFFFF",
                  border: "1.5px solid #E2E8F0",
                  borderRadius: 14,
                  padding: "28px 24px",
                  boxShadow: "0 24px 60px -12px rgba(0, 0, 0, 0.55)",
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
                  <h3 style={{ fontFamily: "var(--display)", fontSize: 20, color: "#08142A", margin: 0, fontWeight: 600 }}>
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
                  <h3 style={{ fontFamily: "var(--display)", fontSize: 24, color: "#08142A", margin: "0 0 4px", fontWeight: 600 }}>
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
              THE CANDIDATE GUARANTEE
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
              What happens to your resume at <span className="serif-accent" style={{ fontStyle: "italic" }}>Orion</span>
            </h2>
            <p style={{ color: "#64748B", fontSize: 16, lineHeight: 1.6, margin: 0 }}>
              Legal recruiting is built on discretion. We hold our candidate privacy protocols to bar-admitted attorney standards.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20, marginBottom: 52 }}>
            <div style={{ background: "#FAF9F5", border: "1.5px solid #EAE7DC", borderRadius: 12, padding: "26px 22px" }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "#1D4ED8", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>
                PILLAR 01 · IDENTITY
              </div>
              <div style={{ fontFamily: "var(--display)", fontSize: 20, color: "#08142A", fontWeight: 600, marginBottom: 8 }}>
                Anonymous ID Only
              </div>
              <p style={{ fontSize: 13.5, lineHeight: 1.55, color: "#475569", margin: 0 }}>
                Your resume is cataloged under a redacted identifier (e.g. C-TX-0412). Your actual name, current law firm, and graduation years remain shielded.
              </p>
            </div>

            <div style={{ background: "#FAF9F5", border: "1.5px solid #EAE7DC", borderRadius: 12, padding: "26px 22px" }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "#1D4ED8", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>
                PILLAR 02 · PERMISSION
              </div>
              <div style={{ fontFamily: "var(--display)", fontSize: 20, color: "#08142A", fontWeight: 600, marginBottom: 8 }}>
                Zero Blind Submissions
              </div>
              <p style={{ fontSize: 13.5, lineHeight: 1.55, color: "#475569", margin: 0 }}>
                We never submit your credentials to any law firm without your explicit affirmative consent. You will know the exact firm, partners, and pay beforehand.
              </p>
            </div>

            <div style={{ background: "#FAF9F5", border: "1.5px solid #EAE7DC", borderRadius: 12, padding: "26px 22px" }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "#1D4ED8", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>
                PILLAR 03 · DISCRETION
              </div>
              <div style={{ fontFamily: "var(--display)", fontSize: 20, color: "#08142A", fontWeight: 600, marginBottom: 8 }}>
                Zero Current Firm Contact
              </div>
              <p style={{ fontSize: 13.5, lineHeight: 1.55, color: "#475569", margin: 0 }}>
                We never contact your current employer or request references from colleagues at your firm. Your job search is kept 100% confidential.
              </p>
            </div>

            <div style={{ background: "#FAF9F5", border: "1.5px solid #EAE7DC", borderRadius: 12, padding: "26px 22px" }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "#1D4ED8", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>
                PILLAR 04 · CONTROL
              </div>
              <div style={{ fontFamily: "var(--display)", fontSize: 20, color: "#08142A", fontWeight: 600, marginBottom: 8 }}>
                Same-Day Purge Guarantee
              </div>
              <p style={{ fontSize: 13.5, lineHeight: 1.55, color: "#475569", margin: 0 }}>
                Request deletion at any time via a single email. Your resume and candidate dossier are permanently expunged from our database the same day.
              </p>
            </div>
          </div>

          {/* Dossier Preview Visualizer */}
          <div style={{ background: "#FAF9F5", border: "1.5px solid #EAE7DC", borderRadius: 16, padding: "36px 32px" }}>
            <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center", marginBottom: 28 }}>
              <span style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#1D4ED8", display: "block", marginBottom: 6 }}>
                TRANSPARENCY PREVIEW
              </span>
              <h3 style={{ fontFamily: "var(--display)", fontSize: 24, color: "#08142A", margin: "0 0 8px", fontWeight: 600 }}>
                What a law firm sees before your written approval
              </h3>
              <p style={{ fontSize: 14, color: "#64748B", margin: 0 }}>
                This redacted dossier is the only information a managing partner sees until you grant explicit approval.
              </p>
            </div>
            <div style={{ maxWidth: 540, margin: "0 auto" }}>
              <ResumeSheet candidateId="EP-TX-0412" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. CROSS-FUNNEL VALUE BAND */}
      <section className="emp-process-sec" style={{ background: "#FAF9F5", padding: "64px 0", borderBottom: "1px solid #EAE7DC" }}>
        <div className="wrap" style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
          <div>
            <span
              className="eyebrow"
              style={{
                fontFamily: "var(--mono)",
                fontSize: 11.5,
                color: "#1D4ED8",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: 6,
              }}
            >
              PREFER TO BENCHMARK ANONYMOUSLY?
            </span>
            <h3 style={{ fontFamily: "var(--display)", fontSize: 26, color: "#08142A", margin: "0 0 6px", fontWeight: 600 }}>
              Check your current legal salary first
            </h3>
            <p style={{ color: "#64748B", fontSize: 15, margin: 0 }}>
              Compare your base compensation against 25th, 50th, and 75th percentiles in your city. 100% private in your browser.
            </p>
          </div>
          <Link
            className="btn btn-outline"
            href="/salary-check"
            style={{
              borderRadius: 7,
              fontWeight: 600,
              padding: "12px 24px",
              border: "1.5px solid #CBD5E1",
              color: "#08142A",
              textDecoration: "none",
              fontSize: 14,
              background: "#FFFFFF",
            }}
          >
            <span>Run salary check →</span>
          </Link>
        </div>
      </section>

      {/* 6. CANDIDATE FAQ ACCORDION */}
      <section className="emp-process-sec" style={{ background: "#FFFFFF", padding: "88px 0 96px" }}>
        <div className="wrap split" style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 48, alignItems: "start" }}>
          <div className="sec-head">
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
              CANDIDATE PRIVACY FAQ
            </span>
            <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(28px, 3.6vw, 40px)", color: "#08142A", margin: "0 0 14px", fontWeight: 500 }}>
              Questions before <span className="serif-accent" style={{ fontStyle: "italic" }}>uploading</span>
            </h2>
            <p style={{ color: "#64748B", fontSize: 15, lineHeight: 1.6 }}>
              Prefer to speak directly with founder Justin before submitting?{" "}
              <Link href="/about" style={{ color: "#1D4ED8", textDecoration: "underline", fontWeight: 600 }}>
                Schedule a confidential introductory call
              </Link>.
            </p>
          </div>

          <div className="faq" style={{ display: "grid", gap: 14 }}>
            <details style={{ background: "#FAF9F5", border: "1px solid #EAE7DC", borderRadius: 10, padding: "18px 22px" }}>
              <summary style={{ fontWeight: 600, color: "#08142A", cursor: "pointer", fontSize: 15 }}>
                Who reviews my uploaded resume?
              </summary>
              <p style={{ marginTop: 12, color: "#475569", lineHeight: 1.6, fontSize: 14, margin: "12px 0 0" }}>
                Your resume is evaluated exclusively by Orion founder Justin. It is never parsed into third-party databases, never indexed on search engines, and never accessed by automated bot scrapers.
              </p>
            </details>

            <details style={{ background: "#FAF9F5", border: "1px solid #EAE7DC", borderRadius: 10, padding: "18px 22px" }}>
              <summary style={{ fontWeight: 600, color: "#08142A", cursor: "pointer", fontSize: 15 }}>
                Can my current law firm find out I uploaded a resume?
              </summary>
              <p style={{ marginTop: 12, color: "#475569", lineHeight: 1.6, fontSize: 14, margin: "12px 0 0" }}>
                Under no circumstances. We do not publish candidate directories, and we never contact your current firm for references or background checks. All outreach takes place via your personal email or cell.
              </p>
            </details>

            <details style={{ background: "#FAF9F5", border: "1px solid #EAE7DC", borderRadius: 10, padding: "18px 22px" }}>
              <summary style={{ fontWeight: 600, color: "#08142A", cursor: "pointer", fontSize: 15 }}>
                Does using Orion cost the candidate anything?
              </summary>
              <p style={{ marginTop: 12, color: "#475569", lineHeight: 1.6, fontSize: 14, margin: "12px 0 0" }}>
                No. Our representation is 100% free for candidates. Orion is compensated solely by the hiring law firm on a 23% contingency basis upon placement. Your job offer compensation is never docked to pay our placement fee.
              </p>
            </details>

            <details style={{ background: "#FAF9F5", border: "1px solid #EAE7DC", borderRadius: 10, padding: "18px 22px" }}>
              <summary style={{ fontWeight: 600, color: "#08142A", cursor: "pointer", fontSize: 15 }}>
                What happens when I express interest in an open seat?
              </summary>
              <p style={{ marginTop: 12, color: "#475569", lineHeight: 1.6, fontSize: 14, margin: "12px 0 0" }}>
                Justin will contact you personally to share the firm name, managing partner background, culture notes, and full compensation structure. Only if you agree will we send your redacted or complete profile to that firm.
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
