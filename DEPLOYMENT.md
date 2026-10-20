# ALTROX STUDIO — PRODUCTION DEPLOYMENT GUIDE

This document provides step-by-step instructions for deploying the **ALTROX** application to **Render**, connecting the **Supabase** database, and running local development.

---

## 1. Local Development Commands

### Prerequisites
- Node.js v22.0.0 or higher
- npm v10.0.0 or higher

### Installation & Launch
```sh
# Clone or navigate to the workspace root
cd "c:/Users/LENOVO/Desktop/trial website"

# Install root dependencies
npm install

# Run automated verification tests
npm test

# Run Next.js production build test
npm run build

# Start local development server (runs on port 3000)
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.
Control Room CMS is located at [http://localhost:3000/admin](http://localhost:3000/admin) (Default Passkey: `altrox2026`).

### Running REA CLI Commands
The existing REA repository is preserved at `rea-main/rea-main`. You can execute its CLI directly through the root package scripts:
```sh
# Print REA help menu
npm run rea:help

# Or invoke the CLI directly
node rea-main/rea-main/scripts/rea.mjs --help
```

---

## 2. Render Deployment (Web Service)

ALTROX is optimized for deployment as a standard Node.js Web Service on [Render](https://render.com).

### Step-by-Step Render Configuration
1. Push this repository to your GitHub account.
2. In the Render Dashboard, click **New +** -> **Web Service**.
3. Select your GitHub repository.
4. Configure the service settings:
   - **Name**: `altrox-studio`
   - **Region**: Singapore (`singapore`) or Frankfurt (`frankfurt`) for lowest latency to South Asia and Europe.
   - **Branch**: `main`
   - **Root Directory**: `.` (leave blank / root)
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Standard or Starter ($7/mo)

### Environment Variables on Render
Under **Environment Variables** in Render, configure the following:

| Variable | Recommended Value | Note |
|---|---|---|
| `NODE_VERSION` | `22.13.0` | Ensures Node 22 runtime |
| `NEXT_PUBLIC_SITE_URL` | `https://altrox.onrender.com` | Your live custom domain or Render URL |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://<your-project>.supabase.co` | Your Supabase Project API URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `<your-supabase-anon-key>` | Public client anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | `<your-service-role-key>` | Server-only secret key |
| `ADMIN_PASSKEY` | `altrox2026` | Passkey for `/admin` Control Room |

*Note: If Supabase credentials are not provided initially, the application automatically runs on the built-in resilient in-memory seed store, ensuring the site is 100% functional upon first deployment.*

---

## 3. Supabase Database & Migration Setup

### Step 1: Create a Supabase Project
1. Log in to [Supabase](https://supabase.com) and click **New Project**.
2. Name your project `altrox-production`.
3. Select a region near your primary audience (e.g. `ap-south-1` Mumbai or `ap-southeast-1` Singapore).

### Step 2: Apply Database Schema Migration
1. In your Supabase Dashboard, navigate to the **SQL Editor** tab on the left menu.
2. Open the migration file:
   `supabase/migrations/20261020000000_init_altrox_schema.sql`
3. Copy the entire SQL content and paste it into the Supabase SQL Editor.
4. Click **Run**.
5. All 16 tables, indexes, and Row Level Security (RLS) policies will be created instantly:
   - `profiles`
   - `categories`
   - `tags`
   - `media_assets`
   - `content` & `content_versions`
   - `services`
   - `products`
   - `courses` & `course_lessons`
   - `portfolio_projects`
   - `contact_inquiries`
   - `site_settings`
   - `video_scripts` (Script Studio)
   - `redirects`

### Step 3: Copy API Keys
1. In Supabase, navigate to **Project Settings** -> **API**.
2. Copy the **Project URL** -> paste into `NEXT_PUBLIC_SUPABASE_URL`.
3. Copy the **anon public key** -> paste into `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

---

## 4. Production Health Check & Verification

Once deployed, verify the following endpoints:
- **Homepage**: `GET /` -> HTTP 200, Three.js 3D Monolith renders, Ticker animates.
- **Services Matrix**: `GET /services` -> HTTP 200, all 13 services accessible.
- **Sitemap**: `GET /sitemap.xml` -> HTTP 200, valid XML document listing 43+ routes.
- **Robots**: `GET /robots.txt` -> HTTP 200, disallows `/admin` and `/api/`.
- **Inquiry Submission**: Submit brief via `/contact` -> saves to database and returns 201.
- **Control Room CMS**: `GET /admin` -> authenticate with passkey and verify Content and Script Studio.
