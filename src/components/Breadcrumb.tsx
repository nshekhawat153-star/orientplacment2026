import React from "react";
import Link from "next/link";

export interface BreadcrumbItem {
  name?: string;
  label?: string;
  href?: string;
  current?: boolean;
}

export interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  crumbs?: BreadcrumbItem[];
}

export function Breadcrumb({ items, crumbs }: BreadcrumbProps) {
  const list = items || crumbs || [];
  return (
    <nav className="crumbs wrap" aria-label="Breadcrumb">
      <ol>
        {list.map((item, idx) => {
          const isLast = idx === list.length - 1;
          const text = item.name || item.label || "";
          if (isLast || !item.href) {
            return (
              <li key={idx} aria-current="page">
                {text}
              </li>
            );
          }
          return (
            <li key={idx}>
              <Link href={item.href}>{text}</Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
