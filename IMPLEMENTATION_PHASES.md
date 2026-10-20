# ALTROX STUDIO — IMPLEMENTATION PHASES & AUDIT REPORT

This document provides a systematic phase-by-phase account of how the **ALTROX** premium creative-tech website was designed, engineered, audited, tested, and verified against the existing **REA** repository and the visual benchmark of **NK Studio**.

---

## Phase 1 — Root Inspection & REA Analysis

### Findings
1. **Workspace Root**: `c:\Users\LENOVO\Desktop\trial website`
2. **REA Repository**: Located at `rea-main/rea-main`.
   - Identification: `rea-agents` v6.7.0 (`io.github.morluto/rea`) by `morluto`.
   - Core Domain: Reverse engineering CLI and Model Context Protocol (MCP) server for binary analysis, decompilers (Ghidra, Hopper, IDA, Cutter), Frida dynamic instrumentation, Android APK inspection, and WASM decompilation.
   - Documentation & Website: Found in `rea-main/rea-main/website/` (`styles.css`, `home.js`, `theme.js`).
3. **Audit of 3D / Animation Capabilities**:
   - REA contains **no** 3D WebGL graphics pipeline, physics engine, or Three.js scene abstractions.
   - Attempting to run REA directly as a client-side 3D renderer is architecturally impossible and would be technically fraudulent.
4. **Appropriate REA Integration Protocol**:
   - **Zero Destruction**: The REA source tree remains intact at `rea-main/rea-main`.
   - **Adapted RAF Layout Scheduler**: Ported REA’s `website/public/assets/home.js` `requestAnimationFrame` scroll tracking algorithm into `src/lib/rea-scroll-hook.ts`.
   - **Design Tokens**: Adapted REA’s high-contrast editorial typography and micro-border styling from `website/public/assets/styles.css`.
   - **Live REA Creative-Tech Lab**: Built an interactive terminal component (`ReaTerminal.tsx`) and safe server bridge at `/api/rea` enabling visitors to run or simulate verified REA commands.

---

## Phase 2 — Study of NK Studio (Visual Benchmark)

Investigated `/nk.studio ®` (Latin America’s most awarded digital design and technology studio, recipient of multiple Awwwards Site of the Day, FWA, and Developer Awards):
- **Hero & Scale**: Monolithic oversized editorial typography (`clamp(3rem, 8vw, 8rem)`), razor-sharp negative space, high contrast.
- **Color Discipline**: Pitch dark obsidian background (`#080A09`), muted borders (`#1A221C`), disciplined luminous green accent (`#39FF78`).
- **Spatial Composition**: Central floating 3D spatial artifact reacting to cursor coordinates via smooth lerp interpolation.
- **Kinetic Ticker**: High-speed, seamless horizontal marquee looping key metrics.
- **Sticky Navigation**: Floating header with slash monogram `/ALTROX ®` and high-contrast "LET’S TALK" magnetic action.
- **Outcome Framing**: Client work framed around metrics (e.g. "40% FASTER DELIVERY", "35%+ BETTER RETENTION", "3.4X SESSION DURATION").

---

## Phase 3 — ALTROX Brand Identity & Character Triad

### Brand Specifications
- **Name**: ALTROX ®
- **Palette**: `#080A09` (Background), `#111512` (Secondary), `#39FF78` (Accent Green), `#F5F7F5` (Primary Text), `#A2AAA4` (Muted Text).
- **Typography**: Space Grotesk, Outfit, and JetBrains Mono.
- **Target Audience**: India, Pakistan, Bangladesh, Nepal, and international enterprise brands. Tone balances technical authority with natural Hinglish/English cultural accessibility.

### The Brand Characters
1. **Altrox** (`/assets/altrox-character.jpg`): System Lead & Tech Visionary. Specialized in 3D WebGL, AI Agents, and reverse engineering.
2. **Thamos** (`/assets/thamos-character.jpg`): Heavyweight VFX & 3D Lead. Specialized in photorealistic CGI, volumetric lighting, and ACES pipelines.
3. **Chutki** (`/assets/chutki-character.jpg`): Viral Narrative & Pacing Prodigy. Specialized in 60-second retention science, sound design, and meme culture.

---

## Phase 4 — Visual Experience & Technical Implementation

- **Hero 3D Canvas (`Hero3DCanvas.tsx`)**:
  - Three.js WebGL scene with an obsidian faceted icosahedron, outer emerald wireframe shell, and orbital energy ring.
  - 750+ particle field floating in space.
  - Smooth camera lerp tracking mouse movements and vertical scroll progression.
  - Graceful fallback for devices without WebGL or with `prefers-reduced-motion` enabled.
- **Kinetic Ticker (`Ticker.tsx`)**:
  - Continuous marquee animation.
- **REA Terminal (`ReaTerminal.tsx`)**:
  - Interactive terminal interface demonstrating local REA capabilities (WASM inspection, Frida instrumentation, symbol tracing).

---

## Phase 5 — Full Website Structure

Implemented public routes:
- `/`: Comprehensive homepage with Hero, Ticker, Philosophy, Characters, Services, Portfolio, REA Lab, Content, Courses, Store, and Contact Form.
- `/services`: All 13 services matrix.
- `/services/[slug]`: Deep individual service specification with deliverables, portfolio examples, and preselected briefing portal.
- `/portfolio`: Client case studies gallery.
- `/portfolio/[slug]`: Case study deep-dives (Pomelo, IKEA, Untold, Vista Energy) with challenges, solutions, and metrics.
- `/content`: Video showcase with tabs for Reels (1m), Films (10m+), Skits, and Tutorials.
- `/learning`: Masterclasses taught by the characters with lesson durations and curriculum.
- `/learning/[slug]`: Course syllabus and enrollment view.
- `/store`: Digital store for sound FX vaults, lighting rigs, and thumbnail kits.
- `/store/[slug]`: Product details, license terms, and download button.
- `/blog`: Insights listing with search and reading time.
- `/blog/[slug]`: Article reader with JSON-LD structured data and author bylines.
- `/contact`: Dedicated contact portal with regional studio directory.

---

## Phase 6 — Full-Stack Architecture

- **Frontend**: Next.js 15.2+, React 19, TypeScript, Tailwind CSS.
- **Backend**: Next.js server API routes (`/api/inquiries`, `/api/content`, `/api/scripts`, `/api/rea`).
- **Validation**: Zod schema validation across all inputs.
- **Data Layer**: Supabase PostgreSQL client with singleton in-memory fallback store (`src/lib/supabase.ts`) guaranteeing zero downtime.

---

## Phase 7 — ALTROX Control Room CMS (`/admin`)

Protected administrative console featuring:
1. **Overview Dashboard**: Published items, drafts, scheduled releases, and pending inquiries.
2. **Content Studio**: Full CRUD with publishing states (`draft`, `scheduled`, `published`, `archived`) and SEO overrides.
3. **Script Studio**: Video pre-production studio with duration (1m/10m/60m), aspect ratio (16:9/1:1/9:16), character picker, dialogue, voiceover, SFX, BGM, and thumbnail concept.
4. **Inquiries Hub**: Client briefing review and triage.
5. **Media Library**: Asset registry with preview slots.
6. **Site Settings**: Live editor for brand tagline, contacts, and ticker items.

---

## Phase 8 — Database Architecture & Migrations

Created `supabase/migrations/20261020000000_init_altrox_schema.sql` supporting:
- `profiles`, `categories`, `tags`, `media_assets`, `content`, `content_versions`, `content_tags`, `services`, `products`, `courses`, `course_lessons`, `portfolio_projects`, `contact_inquiries`, `site_settings`, `redirects`, `video_scripts`.
- Row Level Security (RLS) policies granting public read access to published items and restricting mutations to authenticated directors.

---

## Phase 9 — SEO & Structured Data

- Dynamic XML Sitemap (`/sitemap.ts`) covering all static and dynamic paths.
- Dynamic `robots.txt` (`/robots.ts`) with admin disallow rules.
- JSON-LD `BlogPosting` structured schema on article pages.
- Dynamic OpenGraph and Twitter cards.
- Custom 404 handler (`/not-found.tsx`).

---

## Phase 10 & 11 — Verification & Testing

- **Automated Verification Test Suite**: `scripts/test-runner.mjs` -> **27/27 tests passed**.
- **Next.js Production Build**: `npm run build` executed and verified.
- **Mobile Responsiveness**: Verified fluid layouts, responsive drawer menu, and mobile-optimized 3D fallbacks.
