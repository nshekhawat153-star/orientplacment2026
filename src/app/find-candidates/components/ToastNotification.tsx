"use client";

import React, { useEffect } from "react";

interface ToastNotificationProps {
  message: string;
  onClear: () => void;
}

export function ToastNotification({
  message,
  onClear,
}: ToastNotificationProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClear();
    }, 3200);
    return () => clearTimeout(timer);
  }, [message, onClear]);

  return (
    <div className="fc-toast" role="status" aria-live="polite">
      <span style={{ color: "#60A5FA" }}>✓</span>
      <span>{message}</span>
    </div>
  );
}

