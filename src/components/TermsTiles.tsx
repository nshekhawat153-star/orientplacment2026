import React from "react";
import { terms } from "@/data";
import { Mark } from "./Mark";
import { Icon } from "./icons";

export function TermsTiles() {
  const tiles = [
    {
      icon: "percent",
      label: "Fee",
      val: <Mark>On hire</Mark>,
      desc: "One contingency fee, only if you hire someone we introduced",
    },
    {
      icon: "shield",
      label: "Guarantee",
      val: <Mark>{terms.guaranteeDays} days</Mark>,
      desc: "If the hire leaves in that time, we replace them at no charge",
    },
    {
      icon: "wallet",
      label: "Upfront",
      val: "$0",
      desc: "No retainer and no exclusivity. Keep your other recruiters",
    },
    {
      icon: "invoice",
      label: "When you pay",
      val: <Mark>Start date</Mark>,
      desc: (
        <>
          Invoice when the hire starts, <Mark>due in 15 days</Mark>
        </>
      ),
    },
  ];

  return (
    <div className="tiles4">
      {tiles.map((t, idx) => (
        <div key={idx} className="tt">
          <Icon name={t.icon} />
          <span className="tt-k">{t.label}</span>
          <b className="tt-v">{t.val}</b>
          <p>{t.desc}</p>
        </div>
      ))}
    </div>
  );
}
