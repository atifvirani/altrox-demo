# ALTROX STUDIO — PROJECT ARCHITECTURE & SYSTEM DESIGN

> **Mission**: Build an original, premium, immersive, production-ready website for **ALTROX** inspired by **NK Studio**’s visual sophistication and integrating the existing **REA** repository in the workspace.

---

## 1. Executive Summary & Brand Identity

ALTROX is an independent creative technology and visual production studio operating across New Delhi, Mumbai, Dhaka, and Kathmandu. Designed for high-growth tech unicorns, category-defining founders, and ambitious brands across South Asia and globally, ALTROX bridges three core creative disciplines:
1. **Mathematical Systems & 3D WebGL Architecture**: Sub-second, 60FPS spatial web applications.
2. **Hollywood-Standard CGI & Visual Effects**: Photorealistic 3D lighting, particle simulation, and post-production.
3. **High-Frequency Algorithmic Narrative**: Viral 60-second Reels and Shorts with 70%+ average audience retention.

### Core Design System & Palette
- **Primary Background**: `#080A09` (Deep obsidian black)
- **Secondary Background**: `#111512` (Muted dark slate)
- **Card / Container Background**: `#0E1310`
- **Elevated Surfaces**: `#151B17`
- **Vibrant Accent**: `#39FF78` (Electric Emerald)
- **Primary Typography**: `#F5F7F5` (High-contrast editorial white)
- **Secondary Typography**: `#A2AAA4` (Muted technical grey)
- **Borders & Dividers**: `#1A221C` / `#2E3B32`
- **Typography Tokens**: Space Grotesk (Editorial Headers, `clamp(2.75rem, 7vw, 6.5rem)`), Outfit (Display Accents), JetBrains Mono (Technical Badges, Tickers, Metrics)

---

## 2. REA Repository Audit & Integration Analysis

### Root Inspection Findings
- **Repository Location**: `c:\Users\LENOVO\Desktop\trial website\rea-main\rea-main`
- **Package Identity**: `rea-agents` (version `6.7.0`, license `MIT`, repository `https://github.com/morluto/rea`)
- **Author**: `morluto`
- **Description**: *"Reverse engineer anything from your terminal or agent with one CLI and MCP server."*
- **Source Code Structure**:
  - `src/` (45+ modules including Ghidra, Hopper, IDA, Frida, GDB, ADB, APKTool, Cutter, WASM, EVM, Electron, and CDP browser inspection)
  - `bridge/` (Python, Swift, Java bridges for decompiler interaction)
  - `website/` (Static documentation site for `rea.tools` with `styles.css`, `home.js`, `theme.js`)
  - `scripts/rea.mjs` (CLI entry point)
  - `server.json` (MCP tool contracts)

### Honest Technical Analysis: REA vs. Visual Effects
- **What REA Actually Is**:
  REA is an advanced reverse-engineering agent, command-line interface, and Model Context Protocol (MCP) server. It is purpose-built for binary analysis, dynamic runtime observation (Frida, CDP), and decompilation.
- **The Technical Blocker**:
  REA does **not** contain a 3D graphics pipeline, WebGL shaders, Three.js abstractions, or physics-based animation engines. Claiming that REA directly renders 3D meshes or camera movements would be factually incorrect.
- **How ALTROX Appropriately Integrates REA**:
  1. **Preserved REA Intact**: The original `rea-main/rea-main` directory remains completely unaltered and operational.
  2. **Adapted Smooth Scroll & Layout Scheduler**: REA’s website contains a lightweight, battle-tested `requestAnimationFrame` scroll-position and active-section tracking algorithm in `website/public/assets/home.js`. ALTROX ported this pattern into `src/lib/rea-scroll-hook.ts`, eliminating scroll jank and layout thrashing across all devices.
  3. **Editorial Token System**: REA’s clean typography scale, micro-borders, and theme state management in `website/public/assets/styles.css` informed ALTROX’s design tokens in `src/app/globals.css`.
  4. **Active REA Creative-Tech Lab (`ReaTerminal.tsx`)**: Because ALTROX offers AI Automation and Deep Tech services, we integrated a live interactive REA terminal directly into the homepage and services. Visitors can execute or simulate verified REA commands (`rea inspect-wasm-artifact`, `rea trace-javascript-semantics`, `rea list-architectures`, `rea search-bytes`, `rea instrument-with-frida`, `rea search-android-classes`).
  5. **Safe Server API Bridge**: Safe invocation route at `/api/rea` connecting to the local REA CLI.

---

## 3. Visual Experience Inspired by NK Studio

Inspired by Latin America's most awarded digital design studio, **/nk.studio ®**, ALTROX captures the same benchmark of sophistication without copying proprietary assets:
1. **Interactive 3D WebGL Canvas (`Hero3DCanvas.tsx`)**:
   - Custom Three.js scene featuring an obsidian faceted monolith with an emerald green `#39FF78` wireframe cage and glowing internal light core.
   - Dynamic 750+ particle field orbiting in space.
   - Mouse and touch parallax tracking: Camera tilts with cursor displacement using smooth lerp interpolation.
   - Scroll-linked rotation: Vertical scroll advances axial rotation.
   - Mobile and accessibility fallback: Seamless high-resolution fallback when WebGL is unsupported or `prefers-reduced-motion` is enabled.
2. **Kinetic Editorial Ticker (`Ticker.tsx`)**:
   - Continuous marquee ticker displaying verified performance indicators (`40% FASTER DELIVERY · 35%+ BETTER RETENTION · WEEKS, NOT MONTHS · 240+ AWARDS · 3X LONGER USER SESSIONS · 1,500+ DELIVERABLES PER YEAR · REA INTELLIGENCE`).
3. **The Brand Characters Triad**:
   - **Altrox**: System Lead & Tech Visionary (3D WebGL, Systems Architecture, AI Agents).
   - **Thamos**: 3D & VFX Powerhouse (Photorealistic CGI, Lighting, Octane/ACES).
   - **Chutki**: Viral Spark & Meme Prodigy (Short-form Retention, Hook Science, CapCut/Premiere).
   - Dedicated bespoke 3D character avatars rendered and served from `/public/assets/`.

---

## 4. Full-Stack Architecture

```mermaid
graph TD
    Client[Browser / Mobile / Desktop] --> NextApp[Next.js 15 App Router Frontend]
    NextApp --> ThreeCanvas[Three.js WebGL 3D Canvas]
    NextApp --> PublicPages[Public SSR Pages: /, /services, /portfolio, /content, /learning, /store, /blog, /contact]
    NextApp --> AdminCMS[Altrox Control Room CMS /admin]
    NextApp --> ReaTerminal[REA Interactive Lab]
    
    AdminCMS --> ApiRoutes[Next.js API Routes: /api/content, /api/scripts, /api/inquiries]
    ReaTerminal --> ReaApi[/api/rea Execution Bridge]
    ReaApi --> ReaCli[Local REA Engine rea-main/rea-main/scripts/rea.mjs]
    
    ApiRoutes --> DataLayer[Data Layer: Supabase PostgreSQL / In-Memory Resilient Store]
    DataLayer --> Migrations[Versioned SQL Migrations supabase/migrations/]
```

### Technology Stack
- **Framework**: Next.js 15.2+ (App Router, Server-Side Rendering, Dynamic Metadata)
- **Runtime**: Node.js v22.23+
- **Styling**: Tailwind CSS 3.4+ & Custom Design Tokens
- **3D Graphics**: Three.js 0.174+ WebGL Canvas
- **Icons**: Lucide React
- **Validation**: Zod 3.24+
- **Database / Auth**: Supabase PostgreSQL, Row Level Security (RLS), Supabase Auth & Storage
- **Reverse Engineering**: `rea-agents` v6.7.0 (MCP Server & CLI)

---

## 5. Public Website Structure (All 13 Services & Pages)

1. **Homepage (`/`)**:
   - Hero with interactive Three.js 3D Monolith & oversized typography.
   - Kinetic marquee ticker.
   - Studio philosophy & impact statistics.
   - The Collective (3D character profiles for Altrox, Thamos, Chutki).
   - Featured services matrix.
   - Selected portfolio showcase.
   - The REA Creative-Tech Lab.
   - Video & Reels showcase.
   - Masterclasses & Digital Store preview.
   - Interactive client briefing form.
2. **Services (`/services` and `/services/[slug]`)**:
   - Full support for all 13 services:
     1. Poster Design
     2. Social Media Post Design
     3. Banner Design
     4. Logo Design
     5. Thumbnail Design
     6. Reel Editing
     7. Shorts Editing
     8. YouTube Video Editing
     9. VFX and CGI
     10. AI Video Generation
     11. Meta Advertising
     12. AI Automation
     13. Web Development
   - Detailed specification pages with key deliverables, case studies, tier pricing, and direct inquiry briefing.
3. **Portfolio (`/portfolio` and `/portfolio/[slug]`)**:
   - Case studies for Pomelo Fintech, IKEA Red de Deseos, Untold Global Launch, and Vista Energy.
   - Challenge, solution, visual gallery, and verified metrics.
4. **Content (`/content`)**:
   - Video filter matrix: Reels/Shorts (1 min), Longform films (10 min+), Character skits, and Tutorials/BTS.
5. **Learning (`/learning` and `/learning/[slug]`)**:
   - Masterclasses taught by the characters (Chutki: Viral Video Engineering, Thamos: Cinematic VFX, Altrox: 3D Web Development).
   - Module breakdown, lesson durations, free preview indicators, and enrollment CTA.
6. **Digital Store (`/store` and `/store/[slug]`)**:
   - Pro-grade assets: Cyberpunk Sound FX Vault (500+ WAVs), Cinema 4D & Blender Lighting Rigs, Thumbnail Design Kits.
7. **Blog / Insights (`/blog` and `/blog/[slug]`)**:
   - Technical dispatches with reading time, author byline, tags, and JSON-LD structured data.
8. **Contact (`/contact`)**:
   - Direct contact lines, regional studio directory, and client briefing portal.

---

## 6. ALTROX Control Room CMS (`/admin`)

A protected admin dashboard enabling full content and production management without touching code:
- **Overview Dashboard**: Real-time metrics for Published items, Drafts, Scheduled releases, and Incoming client inquiries.
- **Content Studio**: Full CRUD for blog posts, reels, videos, and tutorials with live publishing states (`draft`, `scheduled`, `published`, `archived`) and SEO field overrides.
- **Script Studio**: Specialized pre-production pipeline for video scripts with duration (1m/10m/60m), aspect ratio (16:9/1:1/9:16), character casting (Altrox, Thamos, Chutki, Ensemble), dialogue, voiceover, SFX, BGM, and thumbnail concept.
- **Inquiries Hub**: Review, status triage (`new`, `in_review`, `responded`, `archived`), and spam defense.
- **Media Library**: Asset registry and upload slot previews.
- **Site Settings**: Live editor for brand tagline, primary email/phone, office hubs, and ticker items.

---

## 7. Database Architecture & Migrations

All tables, relationships, indexes, and RLS policies are versioned in `supabase/migrations/20261020000000_init_altrox_schema.sql`:
- `profiles`: Team roles and authentication.
- `categories` & `tags`: Taxonomy management.
- `media_assets`: Image & video assets metadata.
- `content` & `content_versions`: Articles, videos, and reels with historical version tracking.
- `services`: Dynamic service pricing and features.
- `products`: Digital store downloadable products.
- `courses` & `course_lessons`: Educational curriculum.
- `portfolio_projects`: Client case studies and visual galleries.
- `contact_inquiries`: Client briefing submissions with spam detection.
- `site_settings`: Global key-value studio settings.
- `video_scripts`: Script Studio production records.
- `redirects`: URL redirect management.
