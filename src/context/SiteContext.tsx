"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface SiteContextType {
  marksOn: boolean;
  toggleMarks: () => void;
  door: "employer" | "candidate";
  setDoor: (door: "employer" | "candidate") => void;
  unlocked: boolean;
  setUnlocked: (unlocked: boolean) => void;
  userEmail: string;
  setUserEmail: (email: string) => void;
}

const SiteContext = createContext<SiteContextType>({
  marksOn: false,
  toggleMarks: () => {},
  door: "employer",
  setDoor: () => {},
  unlocked: false,
  setUnlocked: () => {},
  userEmail: "",
  setUserEmail: () => {},
});

export const useSite = () => useContext(SiteContext);

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const [marksOn, setMarksOn] = useState<boolean>(false);
  const [door, setDoorState] = useState<"employer" | "candidate">("employer");
  const [unlocked, setUnlockedState] = useState<boolean>(false);
  const [userEmail, setUserEmailState] = useState<string>("");

  useEffect(() => {
    try {
      const storedMarks = localStorage.getItem("orion.marks");
      if (storedMarks != null) {
        setMarksOn(JSON.parse(storedMarks));
      }
      const storedDoor = localStorage.getItem("orion.door");
      if (storedDoor === "candidate" || storedDoor === "employer") {
        setDoorState(storedDoor);
      }
      const storedUnlock = localStorage.getItem("orion.unlocked");
      if (storedUnlock != null) {
        setUnlockedState(JSON.parse(storedUnlock));
      }
      const storedEmail = localStorage.getItem("orion.email");
      if (storedEmail) {
        setUserEmailState(storedEmail);
      }
    } catch {
      // ignore localStorage errors
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.classList.toggle("clean", !marksOn);
    }
  }, [marksOn]);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.setAttribute("data-door-active", door);
    }
  }, [door]);

  const toggleMarks = () => {
    setMarksOn((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("orion.marks", JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const setDoor = (d: "employer" | "candidate") => {
    setDoorState(d);
    try {
      localStorage.setItem("orion.door", d);
    } catch {}
  };

  const setUnlocked = (u: boolean) => {
    setUnlockedState(u);
    try {
      localStorage.setItem("orion.unlocked", JSON.stringify(u));
    } catch {}
  };

  const setUserEmail = (e: string) => {
    setUserEmailState(e);
    try {
      localStorage.setItem("orion.email", e);
    } catch {}
  };

  return (
    <SiteContext.Provider
      value={{
        marksOn,
        toggleMarks,
        door,
        setDoor,
        unlocked,
        setUnlocked,
        userEmail,
        setUserEmail,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
}
