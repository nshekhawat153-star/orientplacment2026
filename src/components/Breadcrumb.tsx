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
  return null;
}
