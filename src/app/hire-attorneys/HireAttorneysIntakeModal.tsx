"use client";

import React, { useState, useEffect, useCallback } from "react";
import { HeroLeadForm } from "./HeroLeadForm";

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
      // Only intercept on mobile screens (<= 768px)
      if (window.innerWidth > 768) return;

      const target = (e.target as HTMLElement).closest(
        'a[href="#intake-form"], a[href="#questionnaire"], .ha-trigger-intake-modal, [data-open-intake-modal]'
      );

      if (target) {
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
        .ha-modal-sheet {
          animation: haSlideUp 0.26s cubic-bezier(0.16, 1, 0.3, 1);
        }
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
        {/* Drag handle pill */}
        <div
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
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: 10.5,
                fontWeight: 700,
                color: "#1D4ED8",
                textTransform: "uppercase",
                letterSpacing: "0.10em",
                marginBottom: 4,
              }}
            >
              100% CONTINGENCY · TEXAS LAW FIRMS
            </div>
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
  );
}

