import React from "react";
import Link from "next/link";
import {
  roles,
  cities,
  bands,
  expBands,
  findCity,
  findRole,
  findBand,
  matchCandidates,
  fmt,
} from "@/data";
import { Mark } from "./Mark";

export function CityPayTable({ citySlug }: { citySlug: string }) {
  const c = findCity(citySlug);
  const cityBands = bands[citySlug] || {};

  const rows = roles
    .filter((r) => cityBands[r.slug])
    .map((r) => {
      const b = cityBands[r.slug];
      const n = matchCandidates({ role: r.slug, city: citySlug }).filter(
        (x) => x.inCity
      ).length;
      const range = `$${b.b1[0]}k–$${b.b3[1]}k`;

      return (
        <tr key={r.slug} className={r.built ? "here" : ""}>
          <td data-label="Role">
            <Link href={`/salaries/${r.slug}/${citySlug}`}>{r.name}</Link>
          </td>
          <td className="r" data-label="Base range">
            <Mark>{range}</Mark>
          </td>
          <td className="r sm-keep" data-label="Median" data-sm="median">
            <Mark>{fmt.k(b.median)}</Mark>
          </td>
          <td className="r" data-label="Typical experience">
            <Mark>{b.typical}</Mark>
          </td>
          <td className="r" data-label="Candidates now">
            <Mark>{String(n)}</Mark>
          </td>
          <td className="sm-cell">
            <Mark>{range}</Mark> base · <Mark>{b.typical}</Mark> · {n} candidate{n === 1 ? "" : "s"}
          </td>
        </tr>
      );
    });

  return (
    <div className="table-wrap">
      <table className="data stack-sm rows-sm">
        <caption className="sr">Base salary by role in {c?.name || citySlug}</caption>
        <thead>
          <tr>
            <th scope="col">Role</th>
            <th scope="col" className="r">
              Base range
            </th>
            <th scope="col" className="r">
              Median
            </th>
            <th scope="col" className="r">
              Typical experience
            </th>
            <th scope="col" className="r">
              Candidates now
            </th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}

export function RolePayTable({
  roleSlug,
  hereCitySlug,
}: {
  roleSlug: string;
  hereCitySlug?: string;
}) {
  const role = findRole(roleSlug);

  const rows = cities
    .filter((c) => findBand(c.slug, roleSlug))
    .map((c) => {
      const b = findBand(c.slug, roleSlug)!;
      return (
        <tr key={c.slug} className={c.slug === hereCitySlug ? "here" : ""}>
          <td data-label="City">
            <Link href={`/salaries/${roleSlug}/${c.slug}`}>
              {c.name}, {c.state}
            </Link>
          </td>
          {expBands.map((e) => (
            <td key={e.key} className="r" data-label={e.label}>
              <Mark>{fmt.range((b as any)[e.key])}</Mark>
            </td>
          ))}
          <td className="r" data-label="Median">
            <Mark>{fmt.k(b.median)}</Mark>
          </td>
        </tr>
      );
    });

  return (
    <div className="table-wrap">
      <table className="data stack-sm">
        <caption className="sr">{role?.name || roleSlug} base salary by city</caption>
        <thead>
          <tr>
            <th scope="col">City</th>
            {expBands.map((e) => (
              <th key={e.key} scope="col" className="r">
                {e.label}
              </th>
            ))}
            <th scope="col" className="r">
              Median
            </th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}

export function Neighbours({
  roleSlug,
  citySlug,
}: {
  roleSlug: string;
  citySlug: string;
}) {
  const c = findCity(citySlug);
  const r = findRole(roleSlug);
  const cityBands = bands[citySlug] || {};

  const left = roles
    .filter((x) => x.slug !== roleSlug && cityBands[x.slug])
    .map((x) => (
      <li key={x.slug}>
        <Link href={`/salaries/${x.slug}/${citySlug}`}>
          <span>{x.name}</span>
          <span className="v">median <Mark>{fmt.k(cityBands[x.slug].median)}</Mark></span>
        </Link>
      </li>
    ));

  const right = cities
    .filter((x) => x.slug !== citySlug && findBand(x.slug, roleSlug))
    .map((x) => {
      const b = findBand(x.slug, roleSlug)!;
      return (
        <li key={x.slug}>
          <Link href={`/salaries/${roleSlug}/${x.slug}`}>
            <span>
              {x.name}, {x.state}
            </span>
            <span className="v">median <Mark>{fmt.k(b.median)}</Mark></span>
          </Link>
        </li>
      );
    });

  return (
    <div className="neighbours">
      <div>
        <h3>Other roles in {c?.name || citySlug}</h3>
        <ul className="nlist">{left}</ul>
      </div>
      <div>
        <h3>{r?.name || roleSlug} pay in other cities</h3>
        <ul className="nlist">{right}</ul>
      </div>
    </div>
  );
}
