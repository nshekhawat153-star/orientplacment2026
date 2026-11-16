# Orion Placement — Complete Pages & Routes Directory

> **Master inventory of all active pages, routes, components, and templates across the Orion Placement web application.**
> *Last updated: November 2026*

---

## 📊 Summary Overview

| Metric | Count | Details |
| :--- | :--- | :--- |
| **Total Pages / Routes** | **21** | 1 Homepage + 20 Subpages / Dynamic Templates |
| **Static Routes** | **14** | Homepage, About, Employers, Candidates, Jobs, Fees, etc. |
| **Dynamic [Param] Routes** | **7** | `[city]`, `[slug]`, `[role]`, `[role]/[city]`, `[state]/[city]` |
| **Core Conversion Funnels** | **2** | Employer Intake (Client) & Candidate Intake (Talent) |
| **Design Architecture** | **Modern Luxury** | Orion Midnight Navy (`#08142A`), Crisp White (`#FFFFFF`), Warm Paper (`#FAF9F5`), Electric Sapphire (`#1D4ED8`) |

---

## 🗺️ Master Route Table

| # | Route URL | File Path | Type | Primary Audience | Status |
| :-: | :--- | :--- | :-: | :--- | :-: |
| **01** | `/` | `src/app/page.tsx` | Static | All (Homepage) | ✅ **Redesigned & Live** |
| **02** | `/employers` | `src/app/employers/page.tsx` | Static | Law Firm Partners & Hiring Chairs | ✅ **Redesigned & Live** |
| **03** | `/hire-attorneys` | `src/app/hire-attorneys/page.tsx` | Static | Law Firm Decision Makers | ✅ **Redesigned & Live** |
| **04** | `/submit-job` | `src/app/submit-job/page.tsx` | Static | Law Firms (Direct Mandate Intake) | ✅ **Redesigned & Live** |
| **05** | `/find-candidates` | `src/app/find-candidates/page.tsx` | Static | Law Firms (Talent Discovery) | ✅ **Redesigned & Live** |
| **06** | `/fees` | `src/app/fees/page.tsx` | Static | Law Firms (Fee Schedule & Guarantee) | ✅ **Redesigned & Live** |
| **07** | `/candidates` | `src/app/candidates/page.tsx` | Static | Attorneys & Paralegals | ✅ **Redesigned & Live** |
| **08** | `/jobs` | `src/app/jobs/page.tsx` | Static | Active Job Seekers | ✅ **Redesigned & Live** |
| **09** | `/upload-resume` | `src/app/upload-resume/page.tsx` | Static | Candidates (Confidential Upload) | ✅ **Redesigned & Live** |
| **10** | `/candidate/[slug]` | `src/app/candidate/[slug]/page.tsx` | Dynamic | Law Firms & Candidates (Profile Dossier) | ✅ **Redesigned & Live** |
| **11** | `/jobs/[role]/[city]` | `src/app/jobs/[role]/[city]/page.tsx` | Dynamic | Targeted Practice Area Job Seekers | ✅ **Redesigned & Live** |
| **12** | `/salary-check` | `src/app/salary-check/page.tsx` | Static | Market Compensation Check Tool | ✅ **Redesigned & Live** |
| **13** | `/salaries/[role]/[city]` | `src/app/salaries/[role]/[city]/page.tsx` | Dynamic | Compensation Benchmarks by Role & City | ✅ **Redesigned & Live** |
| **14** | `/locations/[state]/[city]` | `src/app/locations/[state]/[city]/page.tsx` | Dynamic | Regional Legal Market Directory | ✅ **Redesigned & Live** |
| **15** | `/roles/[role]` | `src/app/roles/[role]/page.tsx` | Dynamic | Practice Area Career Directory | ✅ **Redesigned & Live** |
| **16** | `/best-law-firms/[city]` | `src/app/best-law-firms/[city]/page.tsx` | Dynamic | Editorial Guide (Top Boutique Firms) | ✅ **Redesigned & Live** |
| **17** | `/where-to-hire/[city]` | `src/app/where-to-hire/[city]/page.tsx` | Dynamic | Talent Source Guide (Law Schools/Bar) | ✅ **Redesigned & Live** |
| **18** | `/where-to-post/[city]` | `src/app/where-to-post/[city]/page.tsx` | Dynamic | Legal Job Posting Board Comparisons | ✅ **Redesigned & Live** |
| **19** | `/hiring-kit/[role]` | `src/app/hiring-kit/[role]/page.tsx` | Dynamic | Free Hiring Kit & Interview Templates | ✅ **Redesigned & Live** |
| **20** | `/about` | `src/app/about/page.tsx` | Static | General / Firm Credibility | ✅ **Redesigned & Live** |
| **21** | `/design-concept` | `src/app/design-concept/page.tsx` | Static | Internal UI Design Sandbox | ✅ **Design Tokens & Sandbox Active** |

---

## 📂 Detailed Categorization & Breakdown

### Category 1: Law Firm / Employer Funnel (Clients)
Pages specifically engineered to convert law firm partners, managing partners, and hiring committees into submitting job mandates or requesting candidate interviews.

1. **`/employers`** — `src/app/employers/page.tsx`
   - **Headline:** *Hire attorneys and paralegals for your firm*
   - **Description:** Comprehensive overview of Orion's 23% contingency model, 90-day replacement warranty, candidate vetting standards, and direct access to founder Justin.
   - **Components Used:** `Header`, `Breadcrumb`, `TermsTiles`, `ProcessSteps`, `ResourceCards`, `ReviewCard`, `ResumeSheet`, `CtaBand`, `Footer`.

2. **`/hire-attorneys`** — `src/app/hire-attorneys/page.tsx`
   - **Headline:** *Hire Qualified Attorneys for Your Law Firm*
   - **Description:** High-converting landing page built around an interactive legal intake flow (`Questionnaire.tsx`) allowing partners to specify practice area, experience level, salary range, and timeline in under 2 minutes.

3. **`/submit-job`** — `src/app/submit-job/page.tsx`
   - **Headline:** *Paste your job posting, see who fits*
   - **Description:** Frictionless direct intake page where firm administrators can paste an existing job description or mandate details without upfront commitment.
   - **Components Used:** `GateForm`, `CandidateCard`, `SalaryBand`, `Rating`, `Breadcrumb`.

4. **`/find-candidates`** — `src/app/find-candidates/page.tsx`
   - **Headline:** *Find candidates for your open seat*
   - **Description:** Interactive searchable candidate gallery where employers can filter screened candidates by practice area, years of experience, and notice period, opening full dossiers.
   - **Components Used:** `CandidateCard`, `CandidateDetailPane`, `GateForm`, `TermsTiles`, `CtaBand`, `Rating`.

5. **`/fees`** — `src/app/fees/page.tsx`
   - **Headline:** *One fee, only if you hire*
   - **Description:** Full transparency fee schedule explaining the 23% contingency fee (due 15 days after first day), non-exclusive agreement, and 90-day free replacement policy.
   - **Components Used:** `GateForm`, `TermsTiles`, `Rating`, `Breadcrumb`, `CtaBand`.

---

### Category 2: Candidate / Talent Funnel (Job Seekers)
Pages dedicated to lateral attorneys, senior associates, paralegals, and legal assistants seeking confidential career transitions.

1. **`/candidates`** — `src/app/candidates/page.tsx`
   - **Headline:** *Confidential legal jobs with the pay shown*
   - **Description:** Core candidate value proposition: 100% free representation, salary & bonus disclosed before interview, absolute anonymity (no firm sees candidate name without prior consent).
   - **Components Used:** `Header`, `ProcessSteps`, `GateForm`, `ResumeSheet`, `ReviewCard`, `CtaBand`, `Footer`.

2. **`/jobs`** — `src/app/jobs/page.tsx`
   - **Headline:** *Legal Jobs Directory*
   - **Description:** Live job board featuring active boutique & mid-size firm openings across Texas and nationwide with filter pills by practice area (Estate Planning, Litigation, Corporate, Real Estate).

3. **`/upload-resume`** — `src/app/upload-resume/page.tsx`
   - **Headline:** *Upload your resume, see the roles that fit*
   - **Description:** Quick confidential resume upload portal paired with a practice area selector and target base compensation intake.
   - **Components Used:** `GateForm`, `JobCard`, `ResumeSheet`, `ReviewCard`, `Breadcrumb`.

4. **`/candidate/[slug]`** — `src/app/candidate/[slug]/page.tsx` (e.g. `/candidate/ep-tx-0412`)
   - **Headline:** *Confidential Candidate Profile Dossier*
   - **Description:** Dynamic redacted profile highlighting bar standing, lateral experience, practice distribution, and recruiter vetting notes, with a CTA for firms to request an introduction.
   - **Components Used:** `CandidateCard`, `ResumeSheet`, `SenderCard`, `GateForm`, `SalaryBand`, `TermsTiles`.

5. **`/jobs/[role]/[city]`** — `src/app/jobs/[role]/[city]/page.tsx`
   - **Headline:** Programmatic practice-area & city job search index (e.g., Estate Planning in Austin, Civil Litigation in Dallas).

---

### Category 3: Salary & Compensation Intelligence
High-traffic organic discovery tools that establish Orion as the market benchmark authority.

1. **`/salary-check`** — `src/app/salary-check/page.tsx`
   - **Headline:** *Is your salary in line with the market?*
   - **Description:** Interactive self-assessment tool comparing attorney or paralegal compensation against current 25th, 50th (median), and 75th percentile market rates.
   - **Components Used:** `GateForm`, `SalaryBand`, `JobCard`, `Rating`, `Breadcrumb`.

2. **`/salaries/[role]/[city]`** — `src/app/salaries/[role]/[city]/page.tsx`
   - **Headline:** *{Role} Salary in {City}* (e.g., `/salaries/estate-planning-attorney/houston-tx`)
   - **Description:** Deep programmatic salary guide with tiered year-of-practice pay bands, bonus structures, and cost-of-living adjustments.

---

### Category 4: Programmatic SEO & Resource Directories
Long-tail SEO pages driving qualified organic traffic from law firms and candidates searching for localized legal intelligence.

1. **`/locations/[state]/[city]`** — `src/app/locations/[state]/[city]/page.tsx`
   - Programmatic legal recruiter hub for cities like Houston, Austin, Dallas, San Antonio, Fort Worth.
   - Displays city snapshot, active candidates, local salary tables, and local hiring trends.

2. **`/roles/[role]`** — `src/app/roles/[role]/page.tsx`
   - Practice area authority pages (Estate Planning Attorney, Commercial Litigation Associate, Family Law Attorney, Paralegal, Legal Assistant).

3. **`/best-law-firms/[city]`** — `src/app/best-law-firms/[city]/page.tsx`
   - Curated directory of top-rated boutique and mid-size law firms by city based on culture, focus, and transparency.

4. **`/where-to-hire/[city]`** — `src/app/where-to-hire/[city]/page.tsx`
   - Employer talent sourcing playbook detailing local law schools, paralegal institutes, and bar associations.

5. **`/where-to-post/[city]`** — `src/app/where-to-post/[city]/page.tsx`
   - Objective comparison of regional job boards (State Bar of Texas vs LinkedIn vs Indeed vs Orion).

6. **`/hiring-kit/[role]`** — `src/app/hiring-kit/[role]/page.tsx`
   - Complete legal hiring kit including job descriptions, scorecard templates, interview questions, and offer letters.

---

### Category 5: Company & Brand Identity

1. **`/about`** — `src/app/about/page.tsx`
   - **Headline:** *A small legal recruiting team you can call*
   - **Description:** Story of Orion Placement, direct accountability of founders Justin Missirlian and Jon Missirlian, Fort Lauderdale origins, and boutique law firm specialization.
   - **Components Used:** `PeopleSection`, `ReviewCard`, `CtaBand`, `Breadcrumb`, `Rating`.

2. **`/design-concept`** — `src/app/design-concept/page.tsx`
   - Sandbox prototype illustrating Orion's luxury palette, typography hierarchy, and interactive design tokens.

---

## 🛠️ Reusable Component Architecture (`src/components/`)

- **Global Navigation & Layout:** `Header.tsx`, `Footer.tsx`, `Breadcrumb.tsx`
- **Candidate Display:** `CandidateCard.tsx`, `CandidateDetailPane.tsx`, `InteractiveCandidateShowcase.tsx`, `ResumeSheet.tsx`, `ShortlistDeck.tsx`
- **Job Display:** `JobCard.tsx`, `JobDetailPane.tsx`, `IndeedTopSearchBar.tsx`, `FilterChipsBar.tsx`
- **Trust & Proof:** `Rating.tsx` (Google 5.0, TrustBar, TrustTicker, CalendlyLink), `ReviewCard.tsx`, `PeopleSection.tsx`
- **Conversion & Intake:** `GateForm.tsx`, `CtaBand.tsx`, `TermsTiles.tsx`, `ProcessSteps.tsx`
- **Market Data:** `SalaryBand.tsx`, `PayTables.tsx`, `DirectoryTiles.tsx`, `ResourceCards.tsx`, `CitySnapshot.tsx`
- **Primitives & Visuals:** `Mark.tsx`, `icons.tsx`

