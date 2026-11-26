import { Job, findRole, findCity } from "@/data";

/** "estate-planning-attorney" -> "Estate planning" (role name without the job noun). */
export function practiceLabel(roleSlug: string): string {
  const r = findRole(roleSlug);
  const name = r ? r.name : roleSlug.replace(/-/g, " ");
  const short = name.replace(/\s+(attorney|lawyer)$/i, "");
  return short.charAt(0).toUpperCase() + short.slice(1);
}

export function modeLabel(mode: Job["mode"]): string {
  return mode === "on-site" ? "On-site" : "Hybrid";
}

/** Smallest number of years the seat asks for: "4–7 years" -> 4, "3+ years" -> 3. */
export function minYears(years: string): number {
  const m = years.match(/\d+/);
  return m ? Number(m[0]) : 0;
}

export type ExpFilter = "any" | "early" | "mid" | "senior";

export const EXP_FILTERS: Array<{ id: ExpFilter; label: string }> = [
  { id: "any", label: "Any experience" },
  { id: "early", label: "2+ years" },
  { id: "mid", label: "3–4 years" },
  { id: "senior", label: "5+ years" },
];

export function matchesExp(j: Job, f: ExpFilter): boolean {
  if (f === "any") return true;
  const y = minYears(j.years);
  if (f === "early") return y <= 2;
  if (f === "mid") return y >= 3 && y <= 4;
  return y >= 5;
}

/** Free-text match on title, practice, role and firm type. */
export function matchesQuery(j: Job, q: string): boolean {
  const s = q.toLowerCase().trim();
  if (!s) return true;
  const role = findRole(j.role);
  const hay = [j.title, j.mix, j.role.replace(/-/g, " "), role?.name || "", j.firmType].join(" ").toLowerCase();
  if (hay.includes(s)) return true;
  // every word present (e.g. "estate attorney")
  const words = s.split(/\s+/).filter((w) => w.length > 1);
  return words.length > 1 && words.every((w) => hay.includes(w));
}

/** Location match on city name, slug or neighbourhood. "remote" keeps hybrid seats (as before). */
export function matchesLocation(j: Job, l: string): boolean {
  const s = l.toLowerCase().trim();
  if (!s) return true;
  const city = findCity(j.city);
  const cityName = city ? city.name.toLowerCase() : "";
  const cityOnly = s.replace(/,?\s*(tx|texas)$/i, "").trim();
  if (s === "texas" || s === "tx") return true;
  return (
    (cityOnly && cityName.includes(cityOnly)) ||
    j.city.toLowerCase().includes(cityOnly || s) ||
    j.area.toLowerCase().includes(s) ||
    (s.includes("remote") && j.mode === "hybrid")
  );
}
