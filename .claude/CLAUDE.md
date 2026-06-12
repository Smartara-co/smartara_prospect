# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Always Do First
- **Invoke the `frontend-design` skill** before writing any frontend code, every session, no exceptions.
- Check `brand_assets/` folder before designing — logos, colors, and brand files live there.

## Commands
```bash
pnpm dev        # start dev server (http://localhost:3000)
pnpm build      # production build
pnpm start      # serve production build
pnpm lint       # ESLint via next lint
```
No test suite is configured yet.

## Project
**Smartara** — We build smart solutions with AI and data.
**Tagline:** From idea to impact.
**Domain:** smartara.co · **Email:** hello@smartara.co
**Founders:** Muhammed John (AI & Data) · Rohey John (Software & Web)
**Audience:** Non-technical business owners worldwide — plain English, zero jargon.

## Brand Colors
```css
--orange: #FF5C2E;   /* Primary accent — Smart Orange */
--teal:   #00C9A7;   /* Secondary — Data Teal */
--blue:   #1D4ED8;   /* Tertiary — Signal Blue */
--navy:   #0D1526;   /* Dark surfaces */
--mid:    #182036;   /* Cards */
--ink:    #07080F;   /* Text */
--cream:  #F9F8F5;   /* Background */
```

## Brand Fonts
- **Display:** `Bricolage Grotesque` weight 800 — headings, wordmark
- **Body:** `DM Sans` weight 400/500 — paragraphs, UI

## Logo S-Mark (SVG)
```html
<svg viewBox="0 0 80 80" fill="none">
  <rect width="80" height="80" rx="20" fill="#182036"/>
  <path d="M22 30C22 25.6 25.6 22 30 22H50C54.4 22 58 25.6 58 30C58 34.4 54.4 38 50 38H30C25.6 38 22 41.6 22 46C22 50.4 25.6 54 30 54H50C54.4 54 58 50.4 58 46"
    stroke="white" stroke-width="5.5" stroke-linecap="round"/>
  <circle cx="22" cy="30" r="5" fill="#FF5C2E"/>
  <circle cx="58" cy="46" r="5" fill="#00C9A7"/>
</svg>
```

## Stack
```
Next.js 14 (App Router) · TypeScript · Tailwind CSS
Framer Motion — animations & transitions
Three.js + @react-three/fiber + drei — 3D (hero section)
GSAP + ScrollTrigger — scroll animations
Lenis — smooth scroll
shadcn/ui — components
pnpm — package manager
Vercel — deployment
```

## Source Layout
All application code lives under `src/`:
```
src/
  app/                  # Next.js App Router root
    layout.tsx          # root layout — fonts, providers, anti-flash script
    page.tsx            # single page: Nav + all sections + Footer
    globals.css         # CSS variables, base styles
    api/contact/        # POST handler — logs submission, wire up Resend here
  components/
    layout/             # Nav, Footer, SmoothScrollProvider
    sections/           # Hero, Services, Work, HowItWorks, About, FAQ, Contact
    shared/             # SectionWrapper, SectionLabel, GradientButton, cards
    three/              # HeroCanvasWrapper (SSR-safe gate), ParticleNetwork, ParticleField
  contexts/
    ThemeContext.tsx     # 3-way toggle: default → light → dark (stored in localStorage)
    LanguageContext.tsx  # EN/FR toggle + all copy (stored in localStorage)
  hooks/                # useMediaQuery, useReducedMotion, useScrollProgress
  lib/
    animations.ts       # Framer Motion variants (fadeUp, staggerContainer, VIEWPORT_ONCE…)
    constants.ts        # NAV_LINKS, SERVICES, WORK_PROJECTS, HOW_IT_WORKS data arrays
    gsap.ts             # registers ScrollTrigger once (client-only guard)
    utils.ts            # cn() (clsx + tailwind-merge)
```

## Key Patterns

**Theme system** — Three modes: `default` (navy/dark), `light` (cream), `dark` (explicit dark). Toggled via `useTheme()`. The `.light` variant is registered as a Tailwind plugin variant so `light:text-ink` etc. work. Theme class is written to `<html>` via an inline script in `layout.tsx` to prevent flash.

**Internationalisation** — All copy lives in `LanguageContext.tsx` inside a `translations` object (EN + FR). Components consume it via `const { t } = useLanguage()`. Never hardcode UI strings in components.

**Animation** — Framer Motion variants from `lib/animations.ts` + `VIEWPORT_ONCE` for scroll reveals. GSAP/ScrollTrigger is used for more complex scroll effects; always import from `lib/gsap.ts` (not directly from `gsap`) to ensure the plugin is registered. Lenis smooth scroll is connected to GSAP ticker in `SmoothScrollProvider`.

**3D** — `HeroCanvasWrapper` gates Three.js behind `useMediaQuery` and theme checks, then lazily imports `ParticleNetwork` with `dynamic(..., { ssr: false })` and wraps it in an error boundary with a CSS gradient fallback. The 3D canvas is hidden on mobile (< 768px) and in light mode.

**Section structure** — Every section uses `<SectionWrapper id="...">` (max-w-6xl, px-6 padding). Data-driven sections pull from `lib/constants.ts` so content never lives inside JSX.

**Contact API** — `src/app/api/contact/route.ts` currently only logs submissions. To send emails, add Resend (or similar) inside that `POST` handler.

## Pages & Sections
Single page app — all sections on `/`:
1. **Hero** — headline, CTA, 3D data particle scene
2. **Services** — AI & Automation · Data & Insights · Web & Apps · Consulting
3. **Our Work** — 6 project showcases
4. **How It Works** — 4 steps
5. **About** — company story + co-founder cards (Muhammed + Rohey)
6. **Contact** — form → hello@smartara.co

## 3D Rules
- Hero: always use Three.js particle network (orange + teal nodes, white connection lines)
- About: optional floating orb accent
- Disable on mobile < 768px — fallback to CSS gradients
- Always lazy load: `dynamic(() => import(...), { ssr: false })`
- Always dispose geometry + material on unmount

## Design Principles
- **Feel:** Premium, warm, globally trustworthy — not cold startup, not cheap agency
- **Dark sections:** `--navy` / `--mid` bg + radial orange/teal glows + subtle 40px grid texture
- **Light sections:** `--cream` bg, clean and spacious
- **Cards:** `border border-white/8 rounded-2xl` dark · `border border-border rounded-2xl` light
- **Motion:** Stagger reveals on scroll · spring easing · lift on card hover
- **No jargon in copy** — write for a bakery owner in Gambia AND a bank in France

## Copy Rules
✅ Use: "From idea to impact." · "Smart solutions with AI and data." · "No tech jargon. Just real results."
❌ Never: "cutting-edge" · "leverage" · "best-in-class" · unexplained acronyms

## Anti-Generic Rules
- Never default Tailwind blue/indigo — use brand colors only
- Never Inter, Roboto, or Arial — use Bricolage Grotesque + DM Sans
- Never purple gradients — orange + teal only
- Never `transition-all` — animate `transform` and `opacity` only
- Every interactive element needs hover + focus-visible + active states

## Social Handles
`@smartara` on LinkedIn · Instagram · Facebook · TikTok · Twitter/X · GitHub
