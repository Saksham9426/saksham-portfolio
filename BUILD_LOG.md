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
