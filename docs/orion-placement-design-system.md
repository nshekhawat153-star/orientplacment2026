# Orion Placement — Senior Product & UI Design System
**Version:** 2.0 (First-Principles Godmode Visual Architecture)  
**Author:** Principal Product & UI Design Lead  
**Client:** Orion Placement LLC (Justin Sofman & Jon Missirlian)  
**Date:** November 2026  
**Status:** Approved Master Specification & Live Prototype Blueprint

---

## 1. Executive Product Vision: "Savile Row Editorial & Executive Midnight"

### 1.1 Brand Identity & Ground Truth
Orion Placement is a nationwide, contingency-based legal and professional recruitment firm founded in 2022 by Justin Sofman (11 years experience) and Jon Missirlian (~20 years experience).
- **Core Mission:** "We're the recruiters who get the job done."
- **Primary Audience:** Managing Partners, Hiring Partners, and Executive Directors at law firms with 50–500 attorneys, specialized litigation/transactional boutiques, and AmLaw lateral partner groups.
- **Commercial Contract:** 23% standard contingency fee, non-exclusive agreement, invoiced on candidate's start date, due Net 15, zero upfront retainer, 90-day replacement guarantee.
- **Verified Scale:** 30+ hires/month (~1 hire every day), 200+ hires in the past 12 months, 100,000+ active legal candidate database pool, 28 repeat client accounts, 1-hour response SLA.
- **Contact Policy:** No public phone numbers on web UI to prevent candidate call volume inundation; all intake routes through Calendly 15-min discovery bookings, direct email, and structured candidate intake forms.

### 1.2 The Two-Atmosphere Architecture (Light vs. Dark Section Strategy)

Rather than a monotonous single-color website, Orion Placement utilizes a **strategic two-atmosphere alternation** that reflects the duality of elite legal recruiting:

```
┌────────────────────────────────────────────────────────────────────────┐
│  1. WARM EDITORIAL LIGHT ATMOSPHERE ("Legal Stationery Canvas")        │
│  - Palette: Warm Paper (#FAF9F5), Tinted Cream (#F4F0E6), Ink (#1A1917)│
│  - Mood: High Trust, Transparency, Warmth, Professional Stationery     │
│  - Use Cases: Social Proof, Google Reviews, Fee Structure, Intake     │
│  - Customer Emotion: "These recruiters are transparent, honest & proven"│
└────────────────────────────────────────────────────────────────────────┘
                                   ↕
┌────────────────────────────────────────────────────────────────────────┐
│  2. EXECUTIVE MIDNIGHT DARK ATMOSPHERE ("The Sourcing Engine Canvas")  │
│  - Palette: Boardroom Midnight (#081120 to #162F58), Starlight White   │
│  - Mood: Executive Dominance, Relentless Search, Lateral Placement     │
│  - Use Cases: Search Methodology, 100k+ Pool Engine, Hero, Final CTAs │
│  - Customer Emotion: "They have the candidate network other firms lack"│
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Definitive Color Palette System

All color tokens are derived directly from the official Orion Placement brand logo (`#001749` navy disc with ivory/white typography) and refined for contrast compliance (WCAG AAA).

### 2.1 Executive Midnight Dark Palette (Sourcing Engine)
| Token Name | Hex Code | Purpose & Application | Contrast / Feel |
| :--- | :--- | :--- | :--- |
| `--navy-obsidian` | `#060D18` | Deepest base canvas under dark sections | Absolute deep navy foundation |
| `--navy-boardroom`| `#0B1728` | Main dark section gradient stop | Rich executive twilight |
| `--navy-surface` | `#11233D` | Elevated dark card fill (`rgba(17,35,61,0.65)`) | Translucent frosted glass |
| `--navy-border` | `rgba(255,255,255,0.10)` | Hairline card borders on dark surfaces | 1px crisp separation |
| `--navy-border-hover`| `rgba(94,168,255,0.40)` | Interactive focus & hover state on dark | Luminous sapphire boundary |
| `--starlight-head` | `#FFFFFF` | Primary serif headlines on dark | 100% optical clarity |
| `--starlight-body` | `#CBD5E1` | Explanatory copy on dark surfaces | 80% contrast, easy on eyes |
| `--starlight-muted`| `#64748B` | Footers, metadata kickers, SLA tags | Subtle readable slate |
| `--sapphire-luminous`| `#60A5FA` | Italic accent words, text gradient stops | Modern executive pop |

#### Dark Section Gradients
```css
/* Executive boardroom night gradient */
--grad-dark-section: radial-gradient(ellipse at 80% 20%, #162F58 0%, #0F1E38 50%, #081120 100%);

/* Translucent dark card with backdrop blur */
--grad-dark-card: linear-gradient(180deg, rgba(17, 35, 61, 0.7) 0%, rgba(11, 23, 40, 0.85) 100%);

/* Luminous italic serif headline accent */
--grad-luminous-text: linear-gradient(135deg, #FFFFFF 0%, #93C5FD 55%, #60A5FA 100%);
```

---

### 2.2 Warm Editorial Light Palette (Stationery & Trust)
The user explicitly praised the warm reviews background: *"hmare jo reviews section m color h bg ka wo acha h"*.

| Token Name | Hex Code | Purpose & Application | Contrast / Feel |
| :--- | :--- | :--- | :--- |
| `--paper-base` | `#FAF9F5` | Main page canvas background | High-grade warm cream paper |
| `--paper-tinted`| `#F4F0E6` | Alternate section background (Reviews, Proof) | Warm unbleached stationery |
| `--paper-card` | `#FFFFFF` | Elevated cards on light surfaces | Pure white with subtle warmth |
| `--paper-rule` | `#E5E0D5` | Section borders, table divider rules | 1px architectural hairline |
| `--ink-head` | `#1A1917` | Primary editorial serif headlines | Deepest legal ink |
| `--ink-body` | `#334155` | Primary body typography (inter) | Clear slate black |
| `--ink-muted` | `#64748B` | Secondary captions, dates, disclaimers | Refined neutral grey |
| `--navy-heritage`| `#1B3A6B` | Brand identity, primary trust elements | Savile Row heritage navy |
| `--sapphire-pop`| `#2F62B8` | Primary CTA buttons, link hovers, active pills | Electric legal sapphire |
| `--gold-rating` | `#C99738` | 5-Star rating badges, guarantee seals | Warm refined champagne gold |

#### Light Section Shadows
```css
--shadow-paper-card: 0 4px 20px -6px rgba(15, 23, 42, 0.05), 0 1px 3px rgba(15, 23, 42, 0.03);
--shadow-paper-hover: 0 14px 32px -8px rgba(27, 58, 107, 0.12), 0 2px 6px rgba(15, 23, 42, 0.04);
```

---

## 3. Typographic Hierarchy & Pairings

The website employs three distinct typeface families, each with a strict psychological purpose:

```
┌────────────────────────────────────────────────────────┐
│ 1. DM Serif Display  ── Editorial authority, legal    │
│                         gravitas, italic flair         │
├────────────────────────────────────────────────────────┤
│ 2. Inter             ── Functional clarity, high speed │
│                         readability, micro-copy        │
├────────────────────────────────────────────────────────┤
│ 3. DM Mono           ── Precision metadata, metrics,  │
│                         uppercase kicker badges        │
└────────────────────────────────────────────────────────┘
```

### 3.1 Typographic Scale

| Level | Font Family | Size (Desktop / Mobile) | Weight / Style | Line Height | Letter Spacing | Usage |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Display H1** | `DM Serif Display` | `56px` / `38px` | `400` / Normal | `1.10` | `-0.025em` | Hero titles |
| **Italic Accent** | `DM Serif Display` | Matches parent | `400` / Italic | `1.10` | `-0.010em` | Highlighted phrases |
| **Section H2** | `DM Serif Display` | `42px` / `30px` | `400` / Normal | `1.15` | `-0.020em` | Main section headings |
| **Card H3** | `DM Serif Display` | `22px` / `19px` | `400` / Normal | `1.25` | `-0.010em` | Review quotes, step titles |
| **Eyebrow / Kicker** | `DM Mono` | `12px` / `11px` | `600` / Uppercase | `1.0` | `+0.160em` | Section badges, step tags |
| **Lead Paragraph** | `Inter` | `18px` / `16px` | `400` / Normal | `1.65` | `-0.010em` | Subtitles under H1 and H2 |
| **Body Standard** | `Inter` | `15px` / `14.5px` | `400` / Normal | `1.60` | `0` | Card copy, recruiter narrative |
| **UI Button / Pill** | `Inter` | `15px` / `14px` | `600` / Normal | `1.0` | `0` | Primary buttons, action triggers |
| **Micro Caption** | `DM Mono` or `Inter`| `12px` / `11px` | `500` / Normal | `1.4` | `+0.040em` | SLA times, disclosure notes |

---

## 4. UI Geometry: Borders, Radii & Depth

- **Interactive Pills & Badges:** `999px` (Full capsule). Used for kicker badges, SLA tags, Google review pills.
- **Action Buttons:** `8px`. Gives buttons crisp, tailored architectural presence suitable for law firms.
- **Feature Cards & Content Blocks:** `12px`. Clean rounded corners with subtle 1px hairline boundary.
- **Form Inputs & Choice Tiles:** `10px`. Comfortable tap target and clean alignment.
- **Hairlines:** Always `1px` with controlled opacity:
  - On Light surfaces: `border: 1px solid #E5E0D5;`
  - On Dark surfaces: `border: 1px solid rgba(255, 255, 255, 0.10);`

---

## 5. Outline Symbols & Iconography System (1.5px Hairline)

All iconography utilizes **1.5px hairline geometric outlines** to match elite legal stationery:
1. **Scales of Justice (`balance`):** Legal practice specialization, candidate credential evaluation.
2. **Search Radar / Reticle (`radar`):** Sourcing active and passive attorneys across 100,000+ talent pool.
3. **Shield Guarantee (`shield-check`):** Standard 90-day replacement guarantee.
4. **Calendar & Clock (`calendar-clock`):** 1-hour response SLA and 15-min discovery scheduling.
5. **Contract / Handshake (`handshake`):** 23% non-exclusive contingency terms, zero upfront cost.

---

## 6. Orion's 3-Pillar Contingency Search Engine

Instead of arbitrary names, the process sections reflect **Orion's exact proven legal recruiting engine**:

```
[01]  PRECISION INTAKE & MARKET MAPPING
      We analyze your firm's specific practice group, billing expectations, partner track,
      and compensation parameters before reaching out to the market.

[02]  RELENTLESS PROACTIVE SOURCING (100K+ TALENT POOL)
      Direct, multi-channel outreach across active candidates and passive top-tier attorneys
      who are not publicly on job boards.

[03]  VETTED DOSSIERS & 90-DAY GUARANTEE
      Screened candidates sent to your inbox. You interview who you choose.
      23% fee is invoiced on start date, due in 15 days, protected by our 90-day replacement guarantee.
```

---

## 7. Interactive Live Prototype Route

Review live without touching any production pages:
- **Local URL:** `http://localhost:3000/design-concept`
- **Page File:** [`src/app/design-concept/page.tsx`](file:///Users/nikhilshekhawat/Desktop/orientplacement/src/app/design-concept/page.tsx)
- **Style File:** [`src/app/design-concept/design-concept.css`](file:///Users/nikhilshekhawat/Desktop/orientplacement/src/app/design-concept/design-concept.css)
