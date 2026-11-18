export interface Person {
  id: string;
  name: string;
  initials: string;
  title: string;
  phone?: string;
  email: string;
  note: string;
  does: string;
  photo: string;
  calendly?: string;
}

export interface Review {
  id: string;
  name: string;
  kind: "employer" | "candidate";
  quote: string;
}

export interface City {
  slug: string;
  name: string;
  state: string;
  stateName: string;
  stateSlug: string;
  citySlug: string;
  built?: boolean;
}

export interface Role {
  slug: string;
  name: string;
  short: string;
  kind: "attorney" | "paralegal" | "staff";
  built?: boolean;
}

export interface ExpBand {
  key: string;
  label: string;
  min: number;
  max: number;
}

export interface SalaryBand {
  b1: [number, number];
  b2: [number, number];
  b3: [number, number];
  median: number;
  typical: string;
}

export interface Candidate {
  id: string;
  role: string;
  headline: string;
  years: number;
  city: string;
  area: string;
  relocate: string[];
  bars: string[];
  firmType: string;
  firmSize: string;
  mix: [string, number][];
  pay: [number, number];
  availability: string;
  modes: ("on-site" | "hybrid")[];
  tags: string[];
  timeline: [string, string, string][];
  why: string;
  name?: string;
  initials?: string;
  school?: string;
  leaving?: string;
  office?: string;
  spoke?: string;
}

export interface Job {
  id: string;
  role: string;
  city: string;
  title: string;
  firmSize: string;
  firmType: string;
  mix: string;
  area: string;
  band: [number, number];
  mode: "on-site" | "hybrid";
  years: string;
  posted: string;
  urgentlyHiring?: boolean;
  easilyApply?: boolean;
}

export interface PlaceToPost {
  name: string;
  cost: string;
  reach: string;
  firstApplicant: string;
  bestFor: string;
}

export interface PlaceToHire {
  name: string;
  kind: string;
  contact: string;
  cycle: string;
}

export interface BestFirm {
  practice: string;
  desc: string;
  size: string;
  area: string;
  pay: string;
  mode: string;
  reviews: string;
}

export interface HiringKitQuestion {
  q: string;
  good: string;
  flag: string;
}

export interface HiringKitScorecardItem {
  k: string;
  hint: string;
  w: number;
}

export interface HiringKitData {
  template: Array<[string, string]>;
  questions: HiringKitQuestion[];
  scorecard: HiringKitScorecardItem[];
  offer: Array<[string, string]>;
}


