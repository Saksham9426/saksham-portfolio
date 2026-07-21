# saksham-portfolio

> **a system that boots into a story.**

Personal portfolio of **Saksham Aggarwal** — CS & Statistics @ UIUC, software engineer & AI
builder. Live at **https://saksham9426.github.io/saksham-portfolio/**

## The concept

The site opens as a live terminal: a dark screen, a blinking cursor, and a self-typing boot
sequence (`$ ./saksham --init`). On your keypress it hands off cinematically — lines de-rez, an
amber CRT flash, the overlay dissolves — into a four-act scrollytelling film:

| Act | | |
|---|---|---|
| **I — Origin** | who I am and why | UIUC CS + Statistics · the Heartune music-therapy research (IJHSS · Innosphere'23 · Sigma Xi · Times of India) · ChillTrill |
| **II — The Craft** | four apprenticeships, rising stakes | JSW (ML forecasting) · Barclays (a ~£1B cost-to-serve finding) · Beacons (product + ranking) · MetaFrazo (LLM scoring) |
| **III — The Frontier** | the climax | Respan (YC W24): LLM evaluation systems, a 41% → 89% agent tune-up, a runtime permission layer, frontier-model benchmarking |
| **IV — What's Next** | forward momentum | Quant Research Copilot · leadership · contact |

**⌘K / Ctrl-K** summons a command palette from anywhere — jump to any act, open links, view the
resume, or run a few playful commands (`sudo hire-saksham`, `boot --replay`). I built a Cmd-K
palette professionally at Respan (93% active-user adoption in 28 days); this one is its descendant,
built from scratch — fuzzy matcher, keyboard nav, ARIA combobox semantics, ~300 lines, zero
dependencies.

### The fast path (for readers with 30 seconds)

The cinema never takes hostages:

- **[`resume.html`](public/resume.html)** — a plain, printable, zero-JS resume page.
- The boot intro is skippable four ways (skip button, `S`, `Esc`, or just scrolling) and never
  replays within a session; deep links (`#act-3`) bypass it entirely.
- An always-visible top nav + act progress rail; every claim on the site is real DOM text, never
  locked inside an animation.
- `prefers-reduced-motion` renders the entire story statically — completed terminal, final values,
  no pinning, no smooth-scroll hijack.

## Stack

- **Vite 8 + React 19 + TypeScript** — static build, typed content model ([src/content.ts](src/content.ts)
  is the single source of truth for every metric and link).
- **Tailwind v4** — design tokens in CSS `@theme`; one accent (amber phosphor `#E8A33D`), ink dark,
  no gradients.
- **GSAP ScrollTrigger** (free plugins only) — masked title reveals, parallax act numerals,
  count-up stats, scroll-drawn before/after bars, and the pinned scroll-scrubbed 41→89 centerpiece.
- **Lenis** smooth scroll — desktop fine-pointer only; disabled for touch and reduced-motion.
- **Fonts** — JetBrains Mono (terminal), Fraunces (narrative display), Inter (body), all
  self-hosted via Fontsource. No external requests of any kind, no analytics.

Full rationale in [DECISIONS.md](DECISIONS.md); build journal in [BUILD_LOG.md](BUILD_LOG.md);
review record in [REVIEW.md](REVIEW.md).

## Run it

```bash
npm ci
npm run dev        # http://localhost:5173/saksham-portfolio/
npm run build      # type-check + static build to dist/
npm run preview    # serve the production build
```

## Deploy

Pushes to `main` deploy automatically to GitHub Pages via
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) (build → `actions/deploy-pages`).
The Vite `base` is `/saksham-portfolio/`; fork under a different repo name → change `base` in
[vite.config.ts](vite.config.ts) and the OG/JSON-LD URLs in [index.html](index.html).

## Content sourcing & confidentiality

All facts, metrics, and dates come from Saksham's resume, LinkedIn, and interview notes — nothing
is invented. Because this site is public: employer client work is described only at
public-resume level (no client names, no internal details), and contact is email/LinkedIn/GitHub
only. See the confidentiality section of [DECISIONS.md](DECISIONS.md).
