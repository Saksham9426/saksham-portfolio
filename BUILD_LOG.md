# BUILD LOG

## 2026-07-21 — Phase 0: planning
- Environment verified: Node v24.18.0, npm 11.16.0, git 2.55, `gh` authenticated as Saksham9426.
- Wrote PLAN.md (concept, content map, animation plan, phases) and DECISIONS.md (stack + rationale,
  confidentiality rules, deployment strategy).
- Decisions taken without asking (autonomy mandate): Tailwind v4, Lenis smooth scroll, custom-built
  Cmd-K (no `cmdk` dep), static hand-authored `resume.html` as the fast path, amber `#E8A33D` as the
  single accent, Fraunces/Inter/JetBrains Mono self-hosted via Fontsource.
- GPA discrepancy noted (resume 3.96 vs LinkedIn 4.0) → using resume value 3.96 per brief.

## 2026-07-21 — Phase 1: scaffold + design system
- Hand-rolled Vite 8 + React 19 + TS + Tailwind v4 scaffold (no interactive CLI); build passes.
- Design tokens in `@theme`: ink #0A0A0F, text #E9E7E2, single accent #E8A33D; JetBrains Mono +
  Fraunces (opsz variable) + Inter, all self-hosted via Fontsource.
- Primitives: `.display`, `.label-mono`, `.container-film`, `.cursor-block` (the motif that survives
  the boot), grain + scanline overlays, Reveal + Counter components, Lenis singleton (`lib/scroll`),
  GSAP registration (`lib/gsap`), content.ts as single source of truth for all metrics/links.

## 2026-07-21 — Phase 2: terminal boot + cinematic hand-off
- Boot.tsx: self-typing `./saksham --init` (char jitter), dot-leader log lines with delayed [ok]
  stamps (the ~£1B line gets a longer dramatic beat), scanlines, blinking cursor, ready prompt.
- Exits: Enter/any key/click = cinematic (lines blur upward → amber CRT flash line → overlay
  dissolve over the mounting story); S/Esc/scroll/skip-button = instant; reduced-motion = completed
  terminal + plain begin, simple fade. sessionStorage + #hash deep links skip the boot entirely.
- Hero (frame one) carries the fast path: resume/github/linkedin/email links + ⌘K hint, all as
  plain text; entrance staggers in as the overlay dissolves for a continuous hand-off.

## 2026-07-21 — Phase 3: the four acts
- ActTitle: full-viewport title cards (masked line reveal, parallax roman numeral, italic logline).
- Act I: origin narrative + Heartune/ChillTrill terminal cards + closing thesis line.
- Act II: four chapters (JSW → Barclays → Beacons → MetaFrazo) with sticky meta columns, count-up
  stats, and DeltaBars before/after draw-in charts (RMSE index, pipeline runtime/reruns,
  acceptance/time-to-match, token cost).
- Act III: Respan setup line, pinned scroll-scrubbed 41%→89% eval centerpiece (count-up on mobile,
  static on reduced motion), five "shipped modules" cards at public-resume level.
- Act IV: Quant Research Copilot card, leadership cards, contact CTA (mailto/LinkedIn/GitHub/
  resume/publication), footer with replay-boot.

## 2026-07-21 — Phase 4: Cmd-K palette + fast path
- Palette.tsx: custom-built (no cmdk dep) — subsequence fuzzy scoring, grouped results
  (navigate / open / commands), full keyboard nav, ARIA combobox/listbox semantics, focus
  return, scroll lock, toast output for playful commands (sudo hire-saksham, whoami,
  boot --replay, copy email). Summonable via ⌘K / Ctrl+K, nav button, or mobile "menu".
- TopNav: fixed translucent bar — act numerals with active tracking, resume link, ⌘K button,
  sr-only "skip to contact" link. ProgressRail: desktop act rail with accent active state.
- public/resume.html: hand-authored static print-friendly resume (light paper theme, print CSS,
  no phone number) — the 30-second fast path; linked from hero, nav, palette, contact.

## 2026-07-21 — Phase 5: content, responsiveness, a11y, smoke test
- Live Playwright smoke test (Edge headless): desktop boot→film→acts→palette, mobile 390px,
  reduced-motion context, resume page — zero console/page errors. 19 screenshots reviewed visually.
- Fixes from review: hero cursor scaled to proper terminal proportions (was a giant block),
  counter pacing 1.2s, skip-intro label "→".
- Confidentiality sweep: grep for client names + phone across src/public/docs → the only hit was
  DECISIONS.md quoting the rule itself; scrubbed and rewrote git history (filter-branch + purged
  backup refs/reflog; verified `git grep` across rev-list --all is clean).
- Added OG image (hero frame at 1200×630), JSON-LD Person schema, twitter card meta.

## 2026-07-21 — Phase 6: multi-agent review, fixes, deploy prep
- Ran a 30-agent review workflow: 5 lenses (confidentiality/truthfulness/code/a11y/perf), every
  finding adversarially verified. 19 confirmed → all fixed; 3 truthfulness flags adjudicated as
  false positives against the fuller LinkedIn/STAR sources; details in REVIEW.md.
- Headline fixes: invalid-hash crash (querySelector → getElementById), palette wheel-scroll under
  Lenis (data-lenis-prevent), palette Escape/focus containment, listbox ARIA restructure, three
  WCAG contrast fixes (faint text, resume links, before-bars), fonts.ready ScrollTrigger refresh,
  reduced-motion gaps, JSON-LD alumniOf→affiliation.
- Post-fix build clean; targeted Playwright smoke verified all behavioral fixes live.
- README.md + .github/workflows/deploy.yml written.
