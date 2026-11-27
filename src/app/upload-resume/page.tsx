import type { Metadata } from "next";
import { UploadResumeClient } from "./UploadResumeClient";

export const metadata: Metadata = {
  title: "Upload Your Resume, Confidentially | Orion Placement",
  description:
    "Upload your resume and see lateral attorney and paralegal seats in Texas that fit, with the pay shown. Free for candidates. Your current firm never finds out.",
  alternates: { canonical: "https://www.orionplacement.com/upload-resume" },
};

export default function UploadResumePage() {
  return <UploadResumeClient />;
}
