import { Candidate, candidates as rawCandidates, roles, cities } from "@/data";

export interface EnrichedCandidate extends Candidate {
  fullName: string;
  initials: string;
  spokeDate: string;
  schoolText: string;
  leavingReason: string;
  officePref: string;
  firmNameSample: string;
  schoolNameSample: string;
}

export interface ParsedSeat {
  role: string | null;
  city: string | null;
  years: "any" | "1-3" | "3-6" | "6+";
  mode: "any" | "on-site" | "hybrid" | "remote";
  pay: number | null;
  must?: string[];
}

export const TERMS_DATA = {
  fee: "23%",
  feeLong: "23% of first-year base salary",
  guarantee: "90 days",
  payment: "Net 15 days from start",
  excl: "Zero",
};

// Known sample details for candidate identities
const CANDIDATE_METADATA: Record<
  string,
  {
    name: string;
    initials: string;
    spoke: string;
    school: string;
    leaving: string;
    office: string;
    firmSample: string;
    schoolSample: string;
  }
> = {
  "EP-TX-0412": {
    name: "Jordan Ellis",
    initials: "JE",
    spoke: "12 Nov",
    school: "Texas law school, J.D. 2021",
    leaving: "Wants a firm where she can build a practice; current boutique has no path to partner.",
    office: "4 days in office is fine; hybrid acceptable",
    firmSample: "Ellis, Morgan & Vance LLP",
    schoolSample: "University of Houston Law Center",
  },
  "EP-TX-0476": {
    name: "Sam Ortega",
    initials: "SO",
    spoke: "10 Nov",
    school: "Texas law school, J.D. 2022",
    leaving: "Lengthy commute across Houston; seeks firm in West Houston, Katy, or hybrid schedule.",
    office: "On-site or hybrid (3 days)",
    firmSample: "Ortega & Sterling Legal Group",
    schoolSample: "South Texas College of Law",
  },
  "EP-TX-0451": {
    name: "Riley Chen",
    initials: "RC",
    spoke: "7 Nov",
    school: "Texas law school, J.D. 2016; LL.M. Taxation",
    leaving: "Seeks clear equity partner track with direct origination credit for high-net-worth clients.",
    office: "Hybrid, 3 days in office",
    firmSample: "Chen, Bradford & Sterling LLP",
    schoolSample: "UT Austin School of Law",
  },
  "EP-TX-0503": {
    name: "Morgan Hale",
    initials: "MH",
    spoke: "13 Nov",
    school: "Texas law school, J.D. 2020",
    leaving: "Relocating from Austin to Houston for family; available for immediate start in January.",
    office: "On-site or hybrid from start",
    firmSample: "Hale & Montgomery Partners",
    schoolSample: "SMU Dedman School of Law",
  },
  "EP-TX-0467": {
    name: "Avery Brooks",
    initials: "AB",
    spoke: "14 Nov",
    school: "Texas law school, J.D. 2024",
    leaving: "Firm is consolidating operations and closing its regional office; available immediately.",
    office: "On-site preferred",
    firmSample: "Brooks & Holloway Attorneys",
    schoolSample: "Baylor University School of Law",
  },
  "EP-TX-0388": {
    name: "Elena Ramos",
    initials: "ER",
    spoke: "15 Nov",
    school: "Texas law school, J.D. 2023",
    leaving: "Seeking dedicated probate and trust litigation group with courtroom exposure.",
    office: "Hybrid or on-site",
    firmSample: "Ramos Law & Associates",
    schoolSample: "South Texas College of Law",
  },
  "PI-TX-0158": {
    name: "Casey Ward",
    initials: "CW",
    spoke: "11 Nov",
    school: "Texas law school, J.D. 2022",
    leaving: "Current firm caps second-chair trial opportunities; ready to handle heavy jury trials.",
    office: "On-site",
    firmSample: "Ward, Keller & Vance Trial Lawyers",
    schoolSample: "Texas A&M University School of Law",
  },
  "PL-TX-0611": {
    name: "Taylor Reed",
    initials: "TR",
    spoke: "12 Nov",
    school: "Certified Paralegal Certificate, NALA",
    leaving: "Wants hybrid flexibility and higher volume trust administration responsibilities.",
    office: "Hybrid preferred (2–3 days)",
    firmSample: "Reed & Mitchell Legal Services",
    schoolSample: "Houston Community College Paralegal Studies",
  },
};

// Generic fallback enrichment
export function enrichCandidate(c: Candidate): EnrichedCandidate {
  const meta = CANDIDATE_METADATA[c.id] || {
    name: "Alex Sterling",
    initials: c.id.slice(0, 2),
    spoke: "14 Nov",
    school: "Texas law school, J.D.",
    leaving: "Seeking career progression, collegiate culture, and compensation commensurate with performance.",
    office: c.modes.includes("hybrid") ? "Hybrid or on-site" : "On-site",
    firmSample: "Sterling & Associates LLP",
    schoolSample: "University of Houston Law Center",
  };

  return {
    ...c,
    fullName: meta.name,
    initials: meta.initials,
    spokeDate: meta.spoke,
    schoolText: meta.school,
    leavingReason: meta.leaving,
    officePref: meta.office,
    firmNameSample: meta.firmSample,
    schoolNameSample: meta.schoolSample,
  };
}

export const allEnrichedCandidates: EnrichedCandidate[] = rawCandidates.map(enrichCandidate);

// Natural Language Parser
export function parseSeatInput(text: string): ParsedSeat {
  const seat: ParsedSeat = {
    role: null,
    city: null,
    years: "any",
    mode: "any",
    pay: null,
  };

  const lower = text.toLowerCase();

  // Role detection
  if (/paralegal|legal assistant/i.test(lower)) {
    seat.role = "estate-planning-paralegal";
  } else if (/estate|trust|probate|wills?\b/i.test(lower)) {
    seat.role = "estate-planning-attorney";
  } else if (/personal injury|\bp\.?i\.?\b|plaintiff/i.test(lower)) {
    seat.role = "litigation-attorney";
  } else if (/litigat|trial/i.test(lower)) {
    seat.role = "litigation-attorney";
  } else if (/real estate|condo|property/i.test(lower)) {
    seat.role = "real-estate-attorney";
  } else {
    // Try matching any known role slug or name
    for (const r of roles) {
      if (lower.includes(r.name.toLowerCase()) || lower.includes(r.short.toLowerCase())) {
        seat.role = r.slug;
        break;
      }
    }
  }

  // City detection
  if (/houston|katy|sugar land|woodlands/i.test(lower)) {
    seat.city = "houston-tx";
  } else if (/dallas|fort worth|dfw|plano/i.test(lower)) {
    seat.city = "dallas-tx";
  } else if (/austin/i.test(lower)) {
    seat.city = "austin-tx";
  } else if (/san antonio/i.test(lower)) {
    seat.city = "san-antonio-tx";
  } else if (/remote|anywhere|texas|nationwide/i.test(lower)) {
    seat.city = "any";
  } else {
    for (const c of cities) {
      if (lower.includes(c.name.toLowerCase())) {
        seat.city = c.slug;
        break;
      }
    }
  }

  // Experience detection
  const rangeMatch = lower.match(/(\d{1,2})\s*(?:-|–|to)\s*(\d{1,2})\s*\+?\s*(?:years|yrs|yr)/i);
  let avgYears: number | null = null;
  if (rangeMatch) {
    avgYears = (Number(rangeMatch[1]) + Number(rangeMatch[2])) / 2;
  } else {
    const singleMatch = lower.match(/(\d{1,2})\s*\+?\s*(?:years|yrs|yr)/i);
    if (singleMatch) avgYears = Number(singleMatch[1]);
  }
  if (avgYears !== null) {
    seat.years = avgYears < 3 ? "1-3" : avgYears <= 6 ? "3-6" : "6+";
  }

  // Mode detection
  if (/hybrid/i.test(lower)) {
    seat.mode = "hybrid";
  } else if (/on-?site|in office|in-office/i.test(lower)) {
    seat.mode = "on-site";
  } else if (/remote/i.test(lower)) {
    seat.mode = "remote";
  }

  // Pay detection: e.g. "$145k", "$145,000", "145k"
  const payMatch =
    lower.match(/\$\s*(\d{2,3})(?:,\d{3}|k)?/i) || lower.match(/(\d{2,3})\s*k\b/i);
  if (payMatch) {
    seat.pay = Number(payMatch[1]);
  }

  return seat;
}

// Matching logic with fit evaluations
export interface CandidateMatchResult {
  candidate: EnrichedCandidate;
  notes: string[];
  warn: boolean;
}

export function matchEnrichedCandidates(seat: ParsedSeat): CandidateMatchResult[] {
  return allEnrichedCandidates
    .filter((c) => {
      // Role match
      if (seat.role && c.role !== seat.role) {
        // Also permit general litigation fallback
        if (
          !(seat.role.includes("litigation") && c.role.includes("litigation"))
        ) {
          return false;
        }
      }
      // City match
      if (seat.city && seat.city !== "any") {
        const matchesCity = c.city === seat.city || c.relocate.includes(seat.city);
        if (!matchesCity) return false;
      }
      return true;
    })
    .map((c) => {
      const notes: string[] = [];
      let warn = false;

      // Experience check
      if (seat.years !== "any") {
        if (seat.years === "1-3") {
          if (c.years <= 3) notes.push(`${c.years} yrs, matches your range`);
          else {
            notes.push(`${c.years} yrs, senior for target`);
            warn = true;
          }
        } else if (seat.years === "3-6") {
          if (c.years >= 3 && c.years <= 6) notes.push(`${c.years} yrs, exact match`);
          else {
            notes.push(`${c.years} yrs, outside 3–6 yr target`);
            warn = true;
          }
        } else if (seat.years === "6+") {
          if (c.years >= 6) notes.push(`${c.years} yrs, meets senior target`);
          else {
            notes.push(`${c.years} yrs, junior for 6+ yr target`);
            warn = true;
          }
        }
      }

      // Pay check
      if (seat.pay) {
        if (c.pay[0] <= seat.pay) {
          notes.push(`Asks $${c.pay[0]}k–$${c.pay[1]}k, within your $${seat.pay}k cap`);
        } else {
          notes.push(`Asks $${c.pay[0]}k+, above your $${seat.pay}k budget`);
          warn = true;
        }
      }

      // Mode check
      if (seat.mode !== "any" && seat.mode !== "remote") {
        if (c.modes.includes(seat.mode as "on-site" | "hybrid")) {
          notes.push(`Prefers ${c.modes.join(" / ")}`);
        } else {
          notes.push(`Open only to ${c.modes.join(" / ")}`);
          warn = true;
        }
      }

      return { candidate: c, notes, warn };
    })
    .sort((a, b) => Number(a.warn) - Number(b.warn));
}

// Q&A simulated answer patterns
export const RECRUITER_QA_PATTERNS: Array<[RegExp, string]> = [
  [
    /firm|where|who|boutique|background/i,
    "The candidate is currently practicing at a high-reputation Texas boutique firm with an active docket. I can share the unredacted firm name the moment you both agree to interview.",
  ],
  [
    /pay|salary|base|bonus|money|\$|\d+\s?k\b/i,
    "Their base floor is confirmed. A discretionary origination bonus or clear performance tier would get them very excited to make a move.",
  ],
  [
    /office|remote|hybrid|days|schedule/i,
    "3 to 4 days in the office is completely fine. They are local to the metro area and have an easy commute.",
  ],
  [
    /bar|licen|disciplin|standing/i,
    "State Bar of Texas admitted, active and in good standing with zero grievance history. I personally verified their bar record.",
  ],
  [
    /notice|start|when|available/i,
    "Standard 2 to 4 weeks' notice. They have prepared their case transition files and can begin shortly after an offer.",
  ],
];

// Helper to generate upcoming interview dates
export function generateSlotDates(): string[] {
  const slots: string[] = [];
  const base = new Date();
  base.setDate(base.getDate() + 1);

  let addedDays = 0;
  while (addedDays < 3) {
    const day = base.getDay();
    if (day !== 0 && day !== 6) {
      // Mon-Fri
      const dateStr = base.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
      slots.push(`${dateStr}, 10:00 AM CT`);
      slots.push(`${dateStr}, 1:30 PM CT`);
      slots.push(`${dateStr}, 4:00 PM CT`);
      addedDays++;
    }
    base.setDate(base.getDate() + 1);
  }
  return slots;
}

