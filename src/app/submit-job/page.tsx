import type { Metadata } from "next";
import { SubmitJobClient } from "./SubmitJobClient";

export const metadata: Metadata = {
  title: "Submit a Legal Job | Orion Placement",
  description:
    "Send your open attorney or paralegal seat to Orion Placement. Free to post, non-exclusive, and you only pay if you hire. Screened, matched profiles the same day.",
  alternates: { canonical: "https://www.orionplacement.com/submit-job" },
};

export default function SubmitJobPage() {
  return <SubmitJobClient />;
}
