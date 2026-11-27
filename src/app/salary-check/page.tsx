import type { Metadata } from "next";
import { SalaryCheckClient } from "./SalaryCheckClient";

export const metadata: Metadata = {
  title: "Legal Salary Check: Is Your Pay In Line? | Orion Placement",
  description:
    "Check your attorney or paralegal base salary against real lateral offers in your city and experience level. Free, private, and nothing is saved.",
  alternates: { canonical: "https://www.orionplacement.com/salary-check" },
};

export default function SalaryCheckPage() {
  return <SalaryCheckClient />;
}
