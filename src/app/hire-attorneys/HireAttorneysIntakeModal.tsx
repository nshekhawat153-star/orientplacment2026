"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { HeroLeadForm } from "./HeroLeadForm";
import { GMark } from "@/components/icons";

export function HireAttorneysIntakeModal() {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  // Listen for global custom event and click interception on mobile
  useEffect(() => {
    const handleCustomOpen = () => {
      setIsOpen(true);
    };

    const handleGlobalClick = (e: MouseEvent) => {
      const el = e.target as HTMLElement;

      // Every request CTA (explicit trigger or a link to the form) opens the popup on every screen size
      const explicit = el.closest(
        '.ha-trigger-intake-modal, [data-open-intake-modal], a[href="#intake-form"], a[href="#questionnaire"]'
      );
      const anchor = null;

      if (explicit || anchor) {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(true);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("open-hire-modal", handleCustomOpen);
    document.addEventListener("click", handleGlobalClick, true);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("open-hire-modal", handleCustomOpen);
      document.removeEventListener("click", handleGlobalClick, true);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Lock body scroll while modal is active
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="ha-modal-heading"
      className="ha-mobile-modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "rgba(5, 11, 23, 0.78)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        padding: 0,
        animation: "haFadeIn 0.2s ease-out",
      }}
    >
      <style>{`
        @keyframes haFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes haSlideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        @keyframes haPopIn {
          from { opacity: 0; transform: translateY(14px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .ha-modal-sheet {
          animation: haSlideUp 0.26s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .ha-modal-left { display: none; }
        @media (max-width: 768px) {
          .ha-mobile-modal-overlay {
            align-items: center !important;
            padding: 16px !important;
          }
          .ha-modal-sheet {
            height: 80svh !important;
            height: 80svh !important;
            max-height: 80svh !important;
            max-width: 560px !important;
            border-radius: 22px !important;
            padding: 22px 20px 24px !important;
            box-shadow: 0 24px 60px rgba(0, 0, 0, 0.5) !important;
            animation: haPopIn 0.24s cubic-bezier(0.16, 1, 0.3, 1) !important;
          }
          .ha-modal-handle { display: none !important; }
          .ha-modal-sheet {
            display: flex !important;
            flex-direction: column !important;
          }
          .ha-modal-right { flex: 1 0 auto; display: flex; flex-direction: column; }
        }
        @media (min-width: 769px) {
          .ha-mobile-modal-overlay {
            align-items: center !important;
            padding: 24px !important;
          }
          .ha-modal-sheet {
            display: grid !important;
            grid-template-columns: 5fr 7fr;
            max-width: 940px !important;
            max-height: 90vh !important;
            padding: 0 !important;
            overflow: hidden !important;
            border-radius: 24px !important;
            box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5) !important;
            animation: haPopIn 0.24s cubic-bezier(0.16, 1, 0.3, 1) !important;
          }
          .ha-modal-handle {
            display: none !important;
          }
          .ha-modal-right {
            padding: 30px 34px 28px;
            overflow-y: auto;
            max-height: 90vh;
            min-width: 0;
          }
          .ha-modal-left {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            gap: 24px;
            padding: 30px 28px;
            color: #FFFFFF;
            overflow: hidden;
            background:
              linear-gradient(180deg, rgba(8, 20, 42, 0.78) 0%, rgba(8, 20, 42, 0.62) 38%, rgba(5, 11, 23, 0.94) 100%),
              url("/images/hero-executive-boardroom.jpg") 58% center / cover no-repeat;
          }
          .ha-modal-left::after {
            content: "";
            position: absolute;
            inset: 0;
            background: radial-gradient(ellipse 90% 60% at 0% 0%, rgba(29, 78, 216, 0.35) 0%, transparent 70%);
            pointer-events: none;
          }
          .ha-modal-left > * { position: relative; z-index: 1; }
        }
        .ha-ml-brand {
          display: flex;
          align-items: center;
        }
        .ha-ml-logo {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          object-fit: cover;
          box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.18), 0 4px 14px rgba(0, 0, 0, 0.4);
        }
        .ha-ml-h {
          font-family: var(--display);
          font-size: 29px;
          line-height: 1.16;
          font-weight: 500;
          letter-spacing: -0.015em;
          color: #FFFFFF;
          margin: 0 0 16px;
        }
        .ha-ml-h em { font-style: italic; color: #60A5FA; }
        .ha-ml-trust { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 14px; }
        .ha-ml-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(8, 20, 42, 0.78);
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: 999px;
          padding: 6px 12px;
          font-size: 12px;
          font-weight: 600;
          color: #FFFFFF;
        }
        .ha-ml-chip span { color: #60A5FA; font-weight: 700; }
        .ha-ml-google { display: flex; align-items: center; gap: 9px; font-size: 13px; color: #CBD5E1; }
        .ha-ml-google .gmark { width: 20px; height: 20px; }
        .ha-ml-google b { color: #FFFFFF; font-weight: 600; }
        .ha-ml-google .ha-ml-gs { color: #FBBF24; letter-spacing: 1.5px; font-size: 13px; }
      `}</style>

      <div
        className="ha-modal-sheet"
        style={{
          width: "100%",
          maxWidth: 540,
          maxHeight: "92vh",
          overflowY: "auto",
          WebkitOverflowScrolling: "touch",
          background: "#FFFFFF",
          borderRadius: "22px 22px 0 0",
          boxShadow: "0 -12px 40px rgba(0, 0, 0, 0.35)",
          position: "relative",
          padding: "16px 20px 32px",
          color: "#08142A",
        }}
      >
        {/* Desktop-only left panel (design + trust) */}
        <aside className="ha-modal-left" aria-hidden="true">
          <div className="ha-ml-brand">
            <Image src="/images/orion-logo.png" alt="Orion Placement" width={56} height={56} className="ha-ml-logo" />
          </div>

          <div>
            <h3 className="ha-ml-h">
              Your next attorney hire, <em>screened before you meet them.</em>
            </h3>
            <div className="ha-ml-google">
              <GMark />
              <span className="ha-ml-gs">★★★★★</span>
              <span>
                <b>5.0 Google Rating</b> · 60+ reviews
              </span>
            </div>
          </div>
        </aside>

        <div className="ha-modal-right">
        {/* Drag handle pill */}
        <div
          className="ha-modal-handle"
          style={{
            width: 44,
            height: 4.5,
            borderRadius: 999,
            background: "#CBD5E1",
            margin: "0 auto 14px",
          }}
          aria-hidden="true"
        />

        {/* Modal Header Row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 14,
            paddingBottom: 12,
            borderBottom: "1px solid #F1F5F9",
          }}
        >
          <div>
            <h2
              id="ha-modal-heading"
              style={{
                fontFamily: "var(--display)",
                fontSize: 21,
                fontWeight: 600,
                color: "#08142A",
                margin: 0,
                lineHeight: 1.25,
              }}
            >
              Request Candidate Dossiers
            </h2>
          </div>

          <button
            type="button"
            onClick={closeModal}
            aria-label="Close intake modal"
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              border: "1.5px solid #E2E8F0",
              background: "#F8FAFC",
              color: "#334155",
              display: "grid",
              placeItems: "center",
              cursor: "pointer",
              fontSize: 15,
              fontWeight: 700,
              flexShrink: 0,
              marginLeft: 12,
              transition: "background-color 0.15s ease",
            }}
          >
            ✕
          </button>
        </div>

        {/* Form Body */}
        <HeroLeadForm isModal onClose={closeModal} />
        </div>
      </div>
    </div>
  );
}

