# Orion Placement — Senior Product & UI Design System
**Version:** 1.0 (Godmode Visual Architecture)  
**Author:** Principal Product & UI Design Lead  
**Client:** Orion Placement LLC (Justin Sofman & Jon Missirlian)  
**Date:** November 2026  
**Status:** Approved Architectural Specification & Preview Blueprint

---

## 1. Executive Design Philosophy: "Celestial Editorial"

### 1.1 The Dual-Heritage Brand Tension
Orion Placement occupies a unique market position:
1. **The Legal Reality:** Conservative, risk-averse, highly credentialed managing partners and firm administrators who demand gravitas, discretion, and proof.
2. **The "Orion" Constellation Identity:** The hunter of the night sky, navigation, celestial precision, stellar coordinates (Mintaka, Alnilam, Alnitak, Rigel), relentless search, and high speed.
3. **The Commercial Truth:** Contingency-based (23%), zero upfront cost, Net 15 invoice, 90-day guarantee, 30+ hires/month, 100,000+ active legal candidate database.

Most legal recruiting websites make one of two fatal mistakes:
- **Mistake A:** Boring, generic "blue-suit corporate" with stock photos of gavels, empty boardrooms, and bland 1990s styling.
- **Mistake B:** Overly dark "SaaS AI / crypto" theme that feels alien and untrustworthy to a 58-year-old law firm managing partner.

### 1.2 The Solution: "The Two-Atmosphere Architecture"
Instead of forcing the entire website into all-light or all-dark, we execute a **rhythmic, editorial choreography of alternating light and dark atmospheres**:

```
┌────────────────────────────────────────────────────────┐
│  LIGHT ATMOSPHERE (The "Legal Stationery" Canvas)      │
│  - Warm paper (#FAF9F5) & Cream Tint (#F4F0E6)         │
│  - Deep ink typography (#111827) & Heritage Navy       │
│  - Used for: Social Proof, Reviews, Calculator, Intake │
│  - Emotion: Trust, Clarity, Fairness, Warmth           │
└────────────────────────────────────────────────────────┘
                           ▲
                           ▼
┌────────────────────────────────────────────────────────┐
│  DARK ATMOSPHERE (The "Orion Celestial" Canvas)        │
│  - Deep Obsidian Midnight (#050B14 to #0B1B33)         │
│  - Glowing Cyan-Ice Nodes & Starlight Gradients        │
│  - Constellation Stars: Mintaka · Alnilam · Alnitak    │
│  - Used for: Sourcing Method, Search Speed, Hero, CTAs │
│  - Emotion: Precision, High Caliber, Speed, Dominance  │
└────────────────────────────────────────────────────────┘
```

This alternating contrast creates visual rhythm, prevents reader fatigue, and reinforces that Orion operates with **cosmic precision** backed by **grounded legal integrity**.

---

## 2. Complete Color Palette System

### 2.1 The Orion Cosmic Dark Palette (Celestial Atmosphere)
Designed for high visual impact, focus, and tech-forward precision without looking like a gaming brand.

| Token Name | Hex Code | Role & Usage | Visual Property |
| :--- | :--- | :--- | :--- |
| `--cosmic-void` | `#03070E` | Base page/body background under dark sections | Absolute deepest black-navy |
| `--cosmic-bg` | `#050B14` | Section background base | Midnight obsidian blue |
| `--cosmic-deep` | `#071324` | Surface elevation 1 (cards, nested containers) | Rich night sky |
| `--cosmic-surface` | `#0D1F38` | Surface elevation 2 (hover states, modal backdrops) | Deep twilight |
| `--cosmic-border` | `rgba(255, 255, 255, 0.08)` | Hairline boundaries on dark surfaces | 1px clean separation |
| `--cosmic-border-glow`| `rgba(94, 168, 255, 0.35)` | Interactive hover & active border highlight | Luminous cyan boundary |
| `--starlight-pure` | `#FFFFFF` | Primary headlines (`h1`, `h2`), glowing nodes | 100% optical contrast |
| `--starlight-soft` | `#CBD5E1` | Body copy, explanatory paragraphs | 80% contrast, soft on eyes |
| `--starlight-dim` | `#64748B` | Footers, timeline labels, step metadata | Subtle readable slate |
| `--cyan-core` | `#5EA8FF` | Primary celestial brand highlight, eyebrows | Glowing electric cyan-blue |
| `--cyan-aura` | `rgba(94, 168, 255, 0.22)` | Radial glows behind headlines & timeline stars | Diffuse starburst aura |
| `--cyan-line` | `rgba(94, 168, 255, 0.55)` | Vertical timeline line gradient stop | Luminous navigation track |

#### Cosmic Dark Gradients
```css
/* Deep celestial section background with subtle nebula aura */
--grad-cosmic-section: radial-gradient(circle at 85% 20%, #10264c 0%, #060e1d 55%, #040812 100%);

/* Secondary dark card elevation gradient */
--grad-cosmic-card: linear-gradient(180deg, rgba(13, 31, 56, 0.6) 0%, rgba(7, 19, 36, 0.9) 100%);

/* Luminous text accent gradient (for italic serif words like "run for speed") */
--grad-celestial-text: linear-gradient(135deg, #FFFFFF 0%, #93C5FD 50%, #60A5FA 100%);

/* Timeline star connector line */
--grad-timeline-line: linear-gradient(to bottom, #5EA8FF 0%, rgba(94, 168, 255, 0.4) 65%, rgba(255, 255, 255, 0.1) 100%);
```

---

### 2.2 The Legal Editorial Light Palette (Stationery Atmosphere)
The user explicitly praised the warm reviews background: *"hmare jo reviews section m color h bg ka wo acha h"*. We enshrine and elevate this warm paper palette.

| Token Name | Hex Code | Role & Usage | Visual Property |
| :--- | :--- | :--- | :--- |
| `--paper-base` | `#FAF9F5` | Main page canvas background | High-grade warm cream paper |
| `--paper-tinted`| `#F4F0E6` | Alternating section background (Reviews, Proof) | Warm unbleached stationery |
| `--paper-card` | `#FFFFFF` | Elevated cards on light surfaces | Pure white with subtle warmth |
| `--paper-rule` | `#E5E0D5` | Section borders, table divider rules | 1px architectural hairline |
| `--ink-head` | `#0F172A` | Primary editorial serif headlines | Deepest legal ink |
| `--ink-body` | `#334155` | Primary body typography (inter) | Clear slate black |
| `--ink-muted` | `#64748B` | Secondary captions, dates, disclaimers | Refined neutral grey |
| `--navy-primary`| `#1B3A6B` | Brand identity, prominent buttons, badges | Savile Row heritage navy |
| `--sapphire-pop`| `#2F62B8` | Primary CTA buttons, link hovers, active pills | Electric legal sapphire |
| `--gold-accent` | `#C99738` | Star ratings, Google review icons, guarantee seal| Warm refined champagne gold |

#### Light Atmosphere Gradients & Shadows
```css
/* Warm tinted card background with subtle gradient */
--grad-paper-card: linear-gradient(180deg, #FFFFFF 0%, #FAF8F2 100%);

/* Architectural card shadow for light surfaces */
--shadow-paper-card: 0 4px 20px -6px rgba(15, 23, 42, 0.06), 0 1px 3px rgba(15, 23, 42, 0.04);
--shadow-paper-hover: 0 12px 32px -8px rgba(27, 58, 107, 0.12), 0 2px 6px rgba(15, 23, 42, 0.04);
```

---

## 3. Typography Hierarchy & Font Pairings

The website employs three distinct typeface families, each with a strict psychological purpose:

```
┌────────────────────────────────────────────────────────┐
│ 1. DM Serif Display  ── Editorial authority, legal    │
│                         gravitas, italic flair         │
├────────────────────────────────────────────────────────┤
│ 2. Inter             ── Functional clarity, high speed │
│                         readability, micro-copy        │
├────────────────────────────────────────────────────────┤
│ 3. DM Mono           ── Precision metadata, astronomical│
│                         coordinates, kicker badges     │
└────────────────────────────────────────────────────────┘
```

### 3.1 Typographic Scale

| Level | Font Family | Size (Desktop / Mobile) | Weight / Style | Line Height | Letter Spacing | Usage |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Display H1** | `DM Serif Display` | `56px` / `38px` | `400` / Normal | `1.10` | `-0.025em` | Main hero titles |
| **Italic Accent** | `DM Serif Display` | Matches parent | `400` / Italic | `1.10` | `-0.01em` | Highlighted words (`run for speed`, `your firm`) |
| **Section H2** | `DM Serif Display` | `42px` / `30px` | `400` / Normal | `1.15` | `-0.02em` | Main section headings |
| **Card H3** | `DM Serif Display` | `24px` / `20px` | `400` / Normal | `1.25` | `-0.01em` | Review quotes, step titles |
| **Eyebrow / Kicker** | `DM Mono` | `11.5px` / `10.5px`| `500` / Uppercase | `1.0` | `+0.16em` | Astronomical steps, category tags |
| **Lead Paragraph** | `Inter` | `18px` / `16px` | `400` / Normal | `1.65` | `-0.01em` | Subtitles under H1 and H2 |
| **Body Standard** | `Inter` | `15px` / `14.5px` | `400` / Normal | `1.60` | `0` | Card copy, recruiter narrative |
| **UI Button / Pill** | `Inter` | `15px` / `14px` | `600` / Normal | `1.0` | `0` | Primary buttons, action triggers |
| **Micro Caption** | `DM Mono` or `Inter`| `12px` / `11px` | `500` / Normal | `1.4` | `+0.04em` | SLA times, disclosure notes |

---

## 4. UI Geometry: Borders, Radii & Depth

### 4.1 Corner Radii (`border-radius`)
We maintain geometric discipline across both light and dark systems:

- **Interactive Pills & Badges:** `999px` (Full capsule). Used for `What we do →`, kicker badges, SLA tags, Google review pills.
- **Action Buttons:** `8px` or `999px`. 
  - Standard action buttons: `8px` with clean crisp corners.
  - Dark mode ghost buttons: `999px` capsule with hairline outline.
- **Feature Cards & Content Blocks:** `12px` or `16px`. Gives cards a polished, premium feel without looking child-like.
- **Form Inputs & Choice Tiles:** `10px`. Optimal for finger tap target and crisp desktop alignment.

### 4.2 Hairline Borders & Glassmorphism
- **Light Surface Border:** `1px solid var(--paper-rule)` (`#E5E0D5`) or `1px solid rgba(27, 58, 107, 0.10)`.
- **Dark Surface Border:** `1px solid rgba(255, 255, 255, 0.08)`.
- **Dark Surface Glass Backdrop:** `backdrop-filter: blur(12px); background: rgba(13, 31, 56, 0.55);`.
- **Hover Transition:** `transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);`.

---

## 5. Outline Symbols & Iconography System

All symbols follow a **1.5px hairline outline aesthetic** (no bulky solid emoji icons).

### 5.1 Celestial & Process Symbols
1. **The Orion Star Node (Timeline):**
   - Pure white circular core (`8px`) surrounded by a concentric `16px` glowing ring (`box-shadow: 0 0 16px 4px #5EA8FF`).
2. **The Compass / Navigation Reticle:**
   - 4-point hairline compass representing targeted sourcing.
3. **The Scale of Justice:**
   - Ultra-thin 1.5px outline scales representing legal candidate evaluation.
4. **The Radar / Telescope:**
   - Concentric outline circles with a 45-degree ray for passive candidate market sweep.
5. **The Shield / Seal:**
   - Fine outline shield with central checkmark for the 90-day replacement guarantee.

---

## 6. The Orion Constellation 4-Step Process

Directly derived from the user's uploaded reference image (`media_1794558424250_e496d12e.jpg`), the process uses the celestial names of the Orion constellation:

```
[●]  01 · MINTAKA     ── In-Depth Consultation
     Understand culture, practice area specifics, partner track, and compensation.

[●]  02 · ALNILAM     ── Proactive Talent Search
     Direct outreach into active + passive legal pool of 100,000+ attorneys.

[●]  03 · ALNITAK     ── Streamlined Selection
     Rigorous pre-screening, verified credentials, compensation alignment check.

[●]  04 · RIGEL       ── Hiring Assistance to the Finish
     Offer facilitation, onboarding smooth landing, and 90-day guarantee.
```

---

## 7. Interactive Preview Slug Blueprint (`/design-concept`)

To allow the user to review and interact with this system live without touching any production pages, we provide a dedicated route:

**URL:** `http://localhost:3000/design-concept`

### Page Architecture:
1. **Sticky Design System Bar:**
   - Mode Indicator, Live Token Switcher, Quick Navigation Jump Links (`#dark-section`, `#light-section`, `#specimen-board`).
2. **The Dark Atmosphere Showcase:**
   - Asymmetric 2-column layout: Sticky left headline + CTA, Right glowing vertical constellation timeline (`01 Mintaka`, `02 Alnilam`, `03 Alnitak`, `04 Rigel`).
3. **The Light Atmosphere Showcase:**
   - Warm paper (`#FAF9F5`) and cream tint (`#F4F0E6`), high-trust Google review cards, client proof metrics (`200+ hires`, `30+/mo`, `23% Net 15`), and founder spotlight.
4. **The Design Token & Component Specimen Board:**
   - Click-to-copy color swatches.
   - Typography ladder with live editable preview.
   - Button styles (Primary Sapphire, Starlight Ghost Capsule, Gold Accent).
   - Outline symbol icon gallery.

---

*End of Specification — Reference for engineering implementation on `/design-concept`.*
