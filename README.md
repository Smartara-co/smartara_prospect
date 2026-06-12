# Smartara Prospect

AI-powered lead discovery and outreach tool. Describe your service and ideal customer — Smartara Prospect finds 12 qualified companies, scores each one for fit and urgency, writes a full intelligence brief, and generates personalised cold outreach in one click.

**Live:** [smartara.co](https://smartara.co) · **Email:** hello@smartara.co

---

## What It Does

1. **Describe your search** — enter your industry, target location, what you sell, and your ideal customer profile.
2. **AI runs discovery** — a five-step pipeline finds real-looking companies, enriches them with buying signals, and scores each for opportunity and urgency.
3. **Review your prospects** — a sortable grid of 12 companies with match scores, signal tags, and priority badges.
4. **Dig into any prospect** — click through for a full intelligence report: executive summary, pain points, stakeholder map, competitive context, risk flags.
5. **Send outreach** — cold email, LinkedIn message, follow-up sequence, and call script are generated on demand per prospect.
6. **Export** — download the full list as CSV or Excel.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3.4 + custom brand tokens |
| Animation | Framer Motion 11 (components) · GSAP + ScrollTrigger (scroll effects) |
| 3D | Three.js 0.170 · React Three Fiber 8 · Drei 9 |
| Smooth scroll | Lenis |
| AI | OpenRouter API (via OpenAI SDK 4.67) |
| Validation | Zod 3.23 |
| Storage | JSON files on disk (local: `data/` · Vercel: `/tmp/`) |
| Export | PapaParse (CSV) · ExcelJS (XLSX) |
| Package manager | pnpm |
| Deployment | Vercel |

---

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm (`npm install -g pnpm`)
- An [OpenRouter](https://openrouter.ai/keys) API key

### Installation

```bash
git clone https://github.com/SMARTARA_COMPANY/smartara_prospect.git
cd smartara_prospect
pnpm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
# Required — your OpenRouter API key
# Get one at https://openrouter.ai/keys
OPENROUTER_API_KEY=sk-or-v1-...

# Public site URL (used in OpenRouter request headers)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Running Locally

```bash
pnpm dev      # starts dev server at http://localhost:3000
pnpm build    # production build
pnpm start    # serve production build
pnpm lint     # ESLint
```

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx                  # Root layout — fonts, providers, anti-flash script
│   ├── page.tsx                    # Landing page (hero, how it works, features)
│   ├── error.tsx                   # Global error boundary
│   ├── not-found.tsx               # 404 page
│   ├── api/
│   │   ├── search/
│   │   │   └── route.ts            # POST — runs AI discovery pipeline
│   │   ├── prospect/
│   │   │   └── report/route.ts     # POST — generates report + outreach on demand
│   │   └── export/route.ts         # POST — exports prospects as CSV or XLSX
│   ├── search/[id]/
│   │   ├── page.tsx                # Results page (server-rendered)
│   │   └── loading.tsx             # Suspense fallback during page load
│   └── prospect/[searchId]/[prospectId]/
│       ├── page.tsx                # Prospect detail page (server-rendered)
│       └── loading.tsx             # Suspense fallback
│
├── components/
│   ├── landing/
│   │   ├── SearchForm.tsx          # 4-field search form with validation
│   │   └── SearchProgress.tsx      # Full-screen overlay showing AI step progress
│   ├── results/
│   │   ├── ResultsClient.tsx       # Results page client wrapper
│   │   ├── ResultsHeader.tsx       # Search summary (query, duration, count)
│   │   ├── ProspectGrid.tsx        # Sortable grid with filter controls
│   │   ├── ProspectCard.tsx        # Individual prospect card
│   │   └── SignalBadge.tsx         # Signal type badge (growth / pain / trigger / budget / tech)
│   ├── report/
│   │   ├── ProspectReportClient.tsx # Detail page wrapper — fetches report on demand
│   │   ├── ProspectHeader.tsx      # Name, domain, size, description, scores
│   │   ├── ResearchReport.tsx      # Full intelligence brief sections
│   │   ├── OpportunitySignals.tsx  # Signal & pain point display
│   │   └── OutreachPanel.tsx       # Email / LinkedIn / follow-up / call script tabs
│   ├── shared/
│   │   ├── Logo.tsx                # Smartara S-mark + wordmark (sm/md/lg sizes)
│   │   ├── GradientButton.tsx      # Primary CTA button
│   │   ├── SectionWrapper.tsx      # max-w-6xl section container
│   │   ├── SectionLabel.tsx        # Small accent label
│   │   ├── ScoreBar.tsx            # Horizontal 0–10 score bar
│   │   ├── ScoreGauge.tsx          # Circular gauge for scores
│   │   ├── ImpactBadge.tsx         # High / Medium / Low urgency badge
│   │   ├── CopyButton.tsx          # Clipboard copy with feedback
│   │   └── Skeleton.tsx            # Loading skeleton components
│   ├── three/
│   │   ├── HeroCanvasWrapper.tsx   # SSR-safe dynamic import gate
│   │   └── ProspectParticles.tsx   # Three.js particle animation (hero, desktop only)
│   └── layout/
│       ├── Nav.tsx
│       ├── Footer.tsx
│       └── SmoothScrollProvider.tsx  # Lenis + GSAP ticker integration
│
├── contexts/
│   ├── ThemeContext.tsx             # 3-way theme toggle (default/light/dark)
│   └── LanguageContext.tsx         # EN/FR i18n with all copy strings
│
├── hooks/
│   ├── useSearch.ts                # Manages search submission, step progress, navigation
│   ├── useMediaQuery.ts            # Responsive breakpoint detection
│   ├── useReducedMotion.ts         # Respects prefers-reduced-motion
│   └── useCopyToClipboard.ts       # Copy-to-clipboard with visual feedback
│
└── lib/
    ├── ai/
    │   ├── client.ts               # OpenRouter client + callAI() + parseJSON()
    │   ├── models.ts               # Model IDs per pipeline step
    │   ├── orchestrator.ts         # runProspectDiscovery() + runProspectReport()
    │   └── prompts/                # One prompt builder per pipeline step (step1–step5)
    ├── schemas/
    │   ├── search.ts               # SearchInput, SearchResult, SearchMeta
    │   ├── prospect.ts             # Prospect, ProspectScore, ProspectReport
    │   ├── signals.ts              # Signal, SignalType enum
    │   ├── outreach.ts             # OutreachPackage (email/LinkedIn/follow-up/call)
    │   └── export.ts               # ExportRow for CSV/XLSX
    ├── storage/
    │   └── local.ts                # saveSearch, getSearch, patchProspectReport
    ├── animations.ts               # Framer Motion variants (fadeUp, stagger, etc.)
    ├── constants.ts                # INDUSTRIES, SIGNAL_TYPES, PROSPECT_STEPS, SCORE_THRESHOLDS
    ├── gsap.ts                     # Registers ScrollTrigger once (client-only guard)
    └── utils.ts                    # cn(), generateId(), getScoreColor(), formatDate(), etc.
```

---

## AI Pipeline

Each search runs a five-step orchestration. Steps 1–3 run during the initial search. Steps 4–5 run on demand when a user opens a specific prospect.

```
Step 1 — Discovery       DeepSeek   Generates 12 companies matching the ICP
Step 2 — Signals         DeepSeek   Identifies buying signals per company (growth / pain / trigger / budget / tech)
Step 3 — Scoring         Qwen 2.5   Scores each company: overall fit (0–10), opportunity (0–10), urgency (High/Medium/Low)
Step 4 — Report          Qwen 2.5   Writes full intelligence brief (summary, challenges, stakeholders, risk flags, etc.)
Step 5 — Outreach        DeepSeek   Generates cold email, LinkedIn message, follow-up sequence, call script
```

Different models are used per step to balance quality and cost: DeepSeek handles creative/generative tasks; Qwen 2.5-72B handles analytical scoring and structured reporting. Temperatures are tuned per step (0.3 for scoring, 0.8 for discovery/outreach).

All AI responses are parsed with a robust JSON extractor that strips markdown code fences and handles malformed output gracefully, with Zod validation as the final safety layer.

---

## Data Storage

Searches are persisted as individual JSON files. There is no database.

| Environment | Location | Notes |
|---|---|---|
| Local development | `data/searches/{id}.json` | Persists across restarts |
| Vercel (production) | `/tmp/searches/{id}.json` | Ephemeral — cleared between deployments and cold starts |

For persistent production storage, replace `src/lib/storage/local.ts` with a key-value store (e.g. Vercel Blob, Redis, or a database). The interface is `saveSearch`, `getSearch`, and `patchProspectReport`.

---

## Routes

| Method | Path | Description |
|---|---|---|
| `GET` | `/` | Landing page |
| `POST` | `/api/search` | Run discovery pipeline; returns `{ searchId }` |
| `GET` | `/api/search/[id]` | Fetch a saved search result by ID |
| `GET` | `/search/[id]` | Results page — 12 prospects with scores |
| `GET` | `/prospect/[searchId]/[prospectId]` | Prospect detail — report + outreach |
| `POST` | `/api/prospect/report` | Generate report & outreach for one prospect |
| `POST` | `/api/export` | Export all prospects as CSV or XLSX |

---

## Brand & Design System

### Colors

```css
--orange:  #FF5C2E   /* Smart Orange — primary accent */
--teal:    #00C9A7   /* Data Teal — secondary */
--blue:    #1D4ED8   /* Signal Blue — tertiary */
--navy:    #0D1526   /* Dark surfaces */
--mid:     #182036   /* Cards */
--ink:     #07080F   /* Body text */
--cream:   #F9F8F5   /* Light backgrounds */
```

### Fonts

- **Display:** `Bricolage Grotesque` weight 800 — headings, wordmark, numbers
- **Body:** `DM Sans` weight 400/500 — paragraphs, labels, UI text

### Theme

Three modes toggle via the theme button in the nav: `default` (navy dark), `light` (cream), `dark` (explicit dark). The active mode is written to `<html>` via an inline script in `layout.tsx` to prevent flash on load. The `.light` Tailwind variant is registered as a plugin so `light:text-ink` etc. work across all components.

### 3D Canvas

The hero particle animation uses Three.js and is gated behind:
- `useMediaQuery('(min-width: 768px)')` — disabled on mobile
- Light mode check — disabled when theme is light
- A React error boundary with a CSS gradient fallback

Always import from `lib/gsap.ts` (not directly from `gsap`) so ScrollTrigger is registered exactly once.

---

## Internationalisation

All UI copy lives in `src/contexts/LanguageContext.tsx` inside a `translations` object with `en` and `fr` keys. Components access strings via `const { t } = useLanguage()`. Never hardcode user-visible strings inside components.

---

## Deployment

The project deploys to Vercel with zero configuration.

1. Push to GitHub and import the repo in the Vercel dashboard.
2. Add environment variables under **Settings → Environment Variables**:
   - `OPENROUTER_API_KEY`
   - `NEXT_PUBLIC_SITE_URL` (set to your production domain, e.g. `https://prospect.smartara.co`)
3. Deploy.

> **Note on storage:** Vercel's `/tmp` directory is ephemeral. Search results will not survive deployments or serverless cold starts. For persistent results, swap `src/lib/storage/local.ts` for a durable store before going to production.

---

## Scripts

```bash
pnpm dev      # Dev server with hot reload
pnpm build    # Type-check + production build
pnpm start    # Serve production build locally
pnpm lint     # ESLint via next lint
```

---

## Company

**Smartara** — We build smart solutions with AI and data.  
*From idea to impact.*

| | |
|---|---|
| Website | [smartara.co](https://smartara.co) |
| Email | hello@smartara.co |
| Founders | Muhammed John (AI & Data) · Rohey John (Software & Web) |
| Social | `@smartara` on LinkedIn · Instagram · Facebook · TikTok · Twitter/X · GitHub |
