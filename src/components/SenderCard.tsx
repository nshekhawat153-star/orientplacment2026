import React from "react";
import Image from "next/image";
import { findPerson, sendingDomains } from "@/data";
import { RatingBadge, CalendlyLink } from "./Rating";
import { Mark } from "./Mark";

export function SenderCard({
  personId = "justin",
  withDomains = true,
  full = true,
}: {
  personId?: string;
  withDomains?: boolean;
  full?: boolean;
}) {
  const p = findPerson(personId);
  if (!p) return null;

  return (
    <div className="sender">
      <div className="portrait sm">
        {p.photo ? (
          <Image
            src={p.photo.startsWith("/") ? p.photo : `/${p.photo}`}
            alt={p.name}
            width={56}
            height={56}
            className="portrait-img"
          />
        ) : (
          <span className="sil" />
        )}
      </div>
      <div className="who">
        <b>{p.name}</b>, {p.title} at Orion Placement
        <p>{p.note}</p>
        <p>
          Direct line: <Mark>{p.phone}</Mark> · <Mark>{p.email}</Mark>
        </p>
        {withDomains && (
          <p className="keep">
            Orion emails come only from{" "}
            {sendingDomains.map((d, i) => (
              <React.Fragment key={d}>
                {i > 0 && " and "}
                <Mark>{d}</Mark>
              </React.Fragment>
            ))}
            .
          </p>
        )}
        {full && (
          <div className="sender-trust">
            <RatingBadge size="sm" />
            {p.id === "justin" && (
              <CalendlyLink label="Book 15 minutes with Justin" className="link-arrow" />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
