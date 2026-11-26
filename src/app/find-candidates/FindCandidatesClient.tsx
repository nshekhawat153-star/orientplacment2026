"use client";

import React, { useState, useMemo, useEffect, useRef, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import "./find-candidates.css";

import {
  EnrichedCandidate,
  ParsedSeat,
  allEnrichedCandidates,
  parseSeatInput,
  matchEnrichedCandidates,
} from "./candidateData";

import { HeroLuxuryAskSection } from "./components/HeroLuxuryAskSection";
import { ScreenResults } from "./components/ScreenResults";
import { ScreenProfile } from "./components/ScreenProfile";
import { FcProcess } from "./components/FcProcess";
import { WorkEmailGateModal } from "./components/WorkEmailGateModal";
import { TermsSignatureModal } from "./components/TermsSignatureModal";
import { ToastNotification } from "./components/ToastNotification";

// Reads the deep link from the homepage hero search (/find-candidates?q=<seat>&c=<candidate id>).
// Kept in its own Suspense boundary so the rest of the page still prerenders as static HTML.
function DeepLinkRunner({ onQuery }: { onQuery: (q: string, c: string | null) => void }) {
  const searchParams = useSearchParams();
  const done = useRef(false);
  useEffect(() => {
    if (done.current) return;
    const q = searchParams.get("q")?.trim();
    if (!q) return;
    done.current = true;
    onQuery(q, searchParams.get("c")?.trim() || null);
  }, [searchParams, onQuery]);
  return null;
}

export function FindCandidatesClient() {
  // Candidate to open straight away when arriving from a homepage preview card
  const pendingOpenId = useRef<string | null>(null);
  // Remounts the hero ask box so it shows the query that came in through the URL
  const [heroKey, setHeroKey] = useState(0);

  // Current view mode: "stream" (browsing candidate list) | "profile" (inspecting one candidate dossier)
  const [viewMode, setViewMode] = useState<"stream" | "profile">("stream");

  // Prompt & seat criteria
  const [promptText, setPromptText] = useState("");
  const [isFromPosting, setIsFromPosting] = useState(false);
  const [isReading, setIsReading] = useState(false);

  // Default seat initialized to match original page
  const [seat, setSeat] = useState<ParsedSeat>({
    role: "estate-planning-attorney",
    city: "houston-tx",
    years: "any",
    mode: "any",
    pay: null,
  });

  // Unlocked candidate IDs & active profile ID
  const [unlockedIds, setUnlockedIds] = useState<string[]>([]);
  const [activeCandidateId, setActiveCandidateId] = useState<string | null>(null);
  const [signedCandidateId, setSignedCandidateId] = useState<string | null>(null);

  // Employer lead details
  const [lead, setLead] = useState<{
    name: string;
    title: string;
    firm: string;
    email: string;
  } | null>(null);

  // Modals state
  const [gateCandidate, setGateCandidate] = useState<EnrichedCandidate | null>(null);
  const [termsModal, setTermsModal] = useState<{
    open: boolean;
    candidate: EnrichedCandidate | null;
    readOnly?: boolean;
  }>({
    open: false,
    candidate: null,
    readOnly: false,
  });

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Handle prompt submit from Hero ask box
  const handleSubmitPrompt = (text: string) => {
    setPromptText(text);
    const isUrl = /^https?:\/\//i.test(text.trim());
    setIsFromPosting(isUrl);
    setIsReading(true);

    setTimeout(() => {
      setIsReading(false);
      if (isUrl) {
        setSeat({
          role: "estate-planning-attorney",
          city: "houston-tx",
          years: "3-6",
          mode: "on-site",
          pay: 145,
        });
      } else {
        const parsed = parseSeatInput(text);
        setSeat((prev) => ({
          ...prev,
          ...parsed,
          // Keep role/city if not specified in prompt
          role: parsed.role || prev.role,
          city: parsed.city || prev.city,
        }));
      }
      setViewMode("stream");

      // Opened from a homepage preview card: go straight to that dossier
      if (pendingOpenId.current) {
        const openId = pendingOpenId.current;
        pendingOpenId.current = null;
        if (allEnrichedCandidates.some((c) => c.id === openId)) {
          setActiveCandidateId(openId);
          setViewMode("profile");
        }
      }

      const resultsEl = document.getElementById("results");
      if (resultsEl) {
        resultsEl.scrollIntoView({ behavior: "smooth" });
      }
    }, isUrl ? 1100 : 650);
  };

  const handleDeepLink = useCallback((q: string, c: string | null) => {
    pendingOpenId.current = c;
    setHeroKey((k) => k + 1);
    handleSubmitPrompt(q);
  }, []);

  // Match results
  const matchResults = useMemo(() => {
    return matchEnrichedCandidates(seat);
  }, [seat]);

  // Active candidate object
  const activeCandidate = useMemo(() => {
    if (!activeCandidateId) {
      return matchResults[0]?.candidate || allEnrichedCandidates[0];
    }
    return (
      allEnrichedCandidates.find((c) => c.id === activeCandidateId) ||
      matchResults[0]?.candidate ||
      allEnrichedCandidates[0]
    );
  }, [activeCandidateId, matchResults]);

  // Open profile view
  const handleOpenCandidateProfile = (c: EnrichedCandidate) => {
    setActiveCandidateId(c.id);
    setViewMode("profile");
    const resultsEl = document.getElementById("results");
    if (resultsEl) {
      resultsEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Gate modal unlock
  const handleGateSuccess = (info: { email: string; firm: string; guessName: string }) => {
    if (gateCandidate) {
      setUnlockedIds((prev) => Array.from(new Set([...prev, gateCandidate.id])));
      setLead({
        name: info.guessName,
        title: "Partner",
        firm: info.firm,
        email: info.email,
      });
      setActiveCandidateId(gateCandidate.id);
      setGateCandidate(null);
      setViewMode("profile");
      setToastMessage(`Full resume unlocked. A copy has been dispatched to ${info.email}`);
      const resultsEl = document.getElementById("results");
      if (resultsEl) {
        resultsEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Terms sign success
  const handleTermsSign = (signedInfo: { name: string; title: string; firm: string }) => {
    if (termsModal.candidate) {
      setSignedCandidateId(termsModal.candidate.id);
      setUnlockedIds((prev) => Array.from(new Set([...prev, termsModal.candidate!.id])));
      setLead((prev) => ({
        name: signedInfo.name,
        title: signedInfo.title,
        firm: signedInfo.firm,
        email: prev?.email || "counsel@firm.com",
      }));
      setTermsModal({ open: false, candidate: null });
      setViewMode("profile");
      setToastMessage(`Terms executed for ${signedInfo.firm}. Candidate identity unlocked.`);
      const resultsEl = document.getElementById("results");
      if (resultsEl) {
        resultsEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div style={{ background: "#08142A", minHeight: "100vh", color: "#08142A" }}>
      {/* 1. LUXURY HERO WITH VIDEO BACKGROUND & THE SMART ASK BOX */}
      <Suspense fallback={null}>
        <DeepLinkRunner onQuery={handleDeepLink} />
      </Suspense>

      <HeroLuxuryAskSection
        key={heroKey}
        initialText={promptText}
        isReading={isReading}
        onSubmitPrompt={handleSubmitPrompt}
      />

      {/* 3. MAIN CANDIDATES STREAM OR FULL PROFILE DOSSIER */}
      <div id="results" style={{ background: "#FAF9F5", borderBottom: "1px solid #E2E8F0", position: "relative", zIndex: 1 }}>
        {viewMode === "stream" ? (
          <ScreenResults
            seat={seat}
            promptText={promptText}
            isFromPosting={isFromPosting}
            results={matchResults}
            unlockedIds={unlockedIds}
            activeCandidateId={activeCandidateId}
            onUpdateSeat={(updated) => setSeat((prev) => ({ ...prev, ...updated }))}
            onSubmitPrompt={handleSubmitPrompt}
            onSelectCandidate={handleOpenCandidateProfile}
            onOpenGateModal={(cand) => setGateCandidate(cand)}
            onOpenTermsModal={(cand, readOnly) =>
              setTermsModal({ open: true, candidate: cand, readOnly })
            }
          />
        ) : (
          activeCandidate && (
            <ScreenProfile
              candidate={activeCandidate}
              seat={seat}
              isUnlocked={unlockedIds.includes(activeCandidate.id)}
              isSigned={signedCandidateId === activeCandidate.id}
              lead={lead}
              onBackToResults={() => setViewMode("stream")}
              onOpenGateModal={(cand) => setGateCandidate(cand)}
              onOpenTermsModal={(cand) =>
                setTermsModal({ open: true, candidate: cand, readOnly: false })
              }
              onSelectOtherCandidate={handleOpenCandidateProfile}
            />
          )
        )}
      </div>

      {/* 4. HOW IT WORKS + TERMS (DARK) AND CLOSING CALL CARD (LIGHT) */}
      <FcProcess />

      {/* 5. POPUP MODAL 1: WORK EMAIL GATE MODAL */}
      {gateCandidate && (
        <WorkEmailGateModal
          candidate={gateCandidate}
          onClose={() => setGateCandidate(null)}
          onSuccess={handleGateSuccess}
        />
      )}

      {/* 6. POPUP MODAL 2: ONE-PAGE TERMS & LIVE E-SIGNATURE MODAL */}
      {termsModal.open && (
        <TermsSignatureModal
          candidate={termsModal.candidate || activeCandidate}
          readOnly={termsModal.readOnly}
          initialLead={lead}
          onClose={() => setTermsModal({ open: false, candidate: null })}
          onSign={handleTermsSign}
        />
      )}

      {/* 7. FLOATING TOAST NOTIFICATION */}
      {toastMessage && (
        <ToastNotification
          message={toastMessage}
          onClear={() => setToastMessage(null)}
        />
      )}
    </div>
  );
}
