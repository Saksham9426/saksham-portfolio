# STATUS — 2026-07-21

## Live

**https://saksham9426.github.io/saksham-portfolio/** — deployed via GitHub Actions from the public
repo **https://github.com/Saksham9426/saksham-portfolio** (every push to `main` redeploys, ~35s).

Verified in production with a headless-browser pass: boot → cinematic hand-off → all four acts →
palette → resume page, on desktop + mobile + reduced-motion, **zero console errors**.

## Done

- **Terminal boot intro** — self-typing `./saksham --init` with [ok] stamps and a dramatic beat on
  the ~£1B line; Enter (or any key/tap) triggers the cinematic hand-off (lines de-rez → amber CRT
  flash → overlay dissolves into the film). Skippable four ways (button, `S`, `Esc`, scroll); never
  replays in-session; deep links (`#act-3`) bypass it.
- **Four-act scroll film** — masked title cards with parallax act numerals; Act I origin story +
  Heartune/ChillTrill cards; Act II four internship chapters with count-up stats and scroll-drawn
  before/after bars; Act III pinned scroll-scrubbed 41%→89% eval centerpiece + five Respan module
  cards; Act IV Quant Research Copilot, leadership, contact CTA.
- **Cmd-K palette** — built from scratch: fuzzy search, grouped commands, keyboard nav, ARIA
  combobox/listbox, playful commands (`sudo hire-saksham`, `whoami`, `boot --replay`).
- **Fast path** — static printable `resume.html`, always-visible nav + progress rail, every claim
  as plain DOM text.
- **Accessibility** — full `prefers-reduced-motion` coverage, WCAG AA contrast (fixed three
  failures found in review), keyboard operability, screen-reader semantics.
- **Quality gates** — 30-agent adversarial review (REVIEW.md): 19 confirmed findings, all fixed,
  including an invalid-hash crash and a palette/Lenis scroll conflict. Two live smoke-test passes.
- **Confidentiality** — no client names, no phone number, Respan at public-resume level; verified
  across the working tree **and rewritten git history**.
- **Docs** — PLAN.md, DECISIONS.md, BUILD_LOG.md, REVIEW.md, README.md.

## Needs Saksham's taste pass

1. **Copy voice** — all narrative text is in `src/components/acts/*.tsx` (data in
   `src/content.ts`). It's written punchy-cinematic; tune anything that doesn't sound like you.
2. **Boot sequence lines** — `bootLines` in `src/content.ts`; easy to reword.
3. **Beacons line** — "weekly execution reviews with the CEO and CTO" is from your LinkedIn; the
   review flagged it as strong — confirm you're comfortable with it publicly.
4. **Accent color** — amber `#E8A33D` (`--color-accent` in `src/styles/global.css`); one-line swap.
5. **OG/social image** — `public/og.png` is a hero screenshot; replace if you want something custom.
6. **GPA** — shown as 3.96 (resume value). LinkedIn says 4.0; update `content.ts`, `ActOrigin.tsx`,
   `resume.html`, and `index.html` if you'd rather match LinkedIn.
7. **Repo description/topics** on GitHub, and a custom domain if you ever want one
   (`saksham.dev` etc. — set CNAME + change `base` to `/`).
8. **Act pacing** — scrub length of the Act III pin (`end: '+=120%'` in `ActFrontier.tsx`) and
   reveal timings are all tunable constants.

## Known trade-offs (intentional, documented in DECISIONS.md)

- Lenis smooth scroll runs only on fine-pointer, motion-allowed devices.
- The boot intro shows the desktop "press ↵" prompt in coarse-pointer-less emulators; real phones
  get "tap anywhere to begin".
- Resume page order is start-date descending (Respan → MetaFrazo → Beacons → Barclays → JSW),
  which differs from the LaTeX resume's ordering.
