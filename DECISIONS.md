# DECISIONS

## Stack: Vite + React 18 + TypeScript + Tailwind v4 + GSAP (ScrollTrigger) + Lenis
- **Vite + React + TS** — fast static builds, first-class GitHub Pages story (`base` config +
  actions/deploy-pages), and the site itself is evidence of the React/TypeScript work on the resume.
- **GSAP ScrollTrigger** over Framer Motion for the film: scroll-scrubbed timelines, pinning, and
  `matchMedia` (breakpoint + reduced-motion variants) are exactly the animejs.com/wodniack.dev
  motion vocabulary. Only free GSAP plugins (ScrollTrigger, ScrollTo) — no Club plugins; SVG
  "draw-in" is hand-rolled with stroke-dashoffset.
- **Lenis** for smooth scroll (industry standard for scroll cinema; disabled under reduced motion
  and on touch devices where native scroll feels better).
- **Tailwind v4** via `@tailwindcss/vite` — tokens live in CSS `@theme`, no config file, tiny output.
- **No router** — one continuous film page + a static `resume.html`; hash links (`#act-2`) give
  deep-linking for free on Pages.
- **Astro rejected**: islands add nothing to a single fully-interactive page.
- **`cmdk` library rejected**: the palette is a headline feature tied to a resume achievement, so
  it's built from scratch (fuzzy match, keyboard nav, ARIA) — ~200 lines, no dependency risk.

## Design system
- **Dark, technical, cinematic.** Ink `#0A0A0F` base, warm off-white text, one accent:
  **amber phosphor `#E8A33D`** — ties the terminal boot to the narrative highlights. No gradients.
- **Type:** JetBrains Mono (terminal/code/labels) · Fraunces variable (narrative display headers —
  elegant, editorial, high contrast against the mono) · Inter variable (body). All self-hosted via
  Fontsource — no external requests, no FOUT flash of wrong font.

## Fonts/assets self-hosted
GitHub Pages + privacy + performance: no Google Fonts CDN, no analytics, no external calls.

## Boot UX
Typing runs ~3.5s. Any key begins the film; `S` and an always-visible "skip intro" button jump
straight in; scrolling also begins. Reduced-motion visitors see the completed terminal instantly
with a plain "begin" button. The intro never plays again in the same session (sessionStorage) —
returning to the tab mid-browse must not re-trap anyone.

## Fast path is a feature, not a fallback
`resume.html` is hand-authored static HTML (print-friendly, zero JS) so a recruiter can read
everything in 30 seconds; the palette and top nav jump anywhere; every claim exists as plain DOM
text regardless of animation state.

## CONFIDENTIALITY (public site — enforced, checked again in review)
- Respan content stays at public-resume level. **No client names** — only "an enterprise fintech
  client" / "enterprise clients". No security-bug specifics, no
  internal architecture, no proprietary detail beyond the resume's own bullets.
- **No phone number** anywhere. Contact = mailto + LinkedIn + GitHub.
- All metrics come verbatim from the resume/LinkedIn/STAR notes; nothing invented. GPA shown as
  3.96 (resume value; LinkedIn's 4.0 not used).

## Deployment
GitHub Actions (`actions/deploy-pages`) from `main`, `base: '/saksham-portfolio/'`. Public repo
`Saksham9426/saksham-portfolio` created via `gh`. Actions chosen over `gh-pages` branch: no build
artifacts in git, deploys on every push.
