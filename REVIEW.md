# REVIEW

Multi-agent review, 2026-07-21. Five independent review lenses (confidentiality, truthfulness,
code correctness, accessibility, performance/responsiveness) fanned out over the repo; every
finding was then adversarially verified by an independent agent instructed to refute it.
30 agents total. Verdict: 25 findings raised → 19 confirmed, 5 refuted, 1 duplicate.
Separately, a live Playwright smoke test (desktop / mobile / reduced-motion / resume page)
ran with zero console or page errors, and 19 screenshots were reviewed visually.

## Confidentiality lens — clean

No client names, no phone number, no keys/tokens, Respan content at public-resume level across
all files **and all git history** (history was rewritten during Phase 5 when the decision doc
itself was found quoting the banned names; verified clean via `git grep` across `rev-list --all`).

## Confirmed and fixed

| # | Severity | Finding | Fix |
|---|---|---|---|
| 1 | major | `document.querySelector(location.hash)` throws on invalid-selector hashes (e.g. `#_=_` from OAuth redirects) → blank page, no error boundary | `getElementById(decodeURIComponent(...))`; boot-skip now only for known section ids |
| 2 | major | Palette results list can't be wheel-scrolled: `lenis.stop()` preventDefaults wheel events while the palette is open | `data-lenis-prevent` on the palette panel |
| 3 | major | Escape closed the palette only while the input had focus; focus could escape the aria-modal dialog via chrome clicks | Window-level Escape handler while open + panel `onMouseDown` keeps focus on the input |
| 4 | major | Palette listbox violated aria-required-children (bare `li` wrappers, `p` group headers, message `li`; options nested in buttons) | Options are now `li[role=option]` owned directly by the listbox; headers `role=presentation`; empty-state moved outside; `aria-autocomplete=list` added |
| 5 | major | `--color-faint` #5C5A66 = 2.92:1 on ink — AA failure on real content (stat labels, dates, before-values) | Brightened to #817F8C (≈5:1 on ink, ≥4.5:1 on all surfaces) |
| 6 | major | resume.html links #A56F1D = 4.11:1 on paper + distinguishable only by color | Darkened to #8A5C10 (≈5.6:1) + always underlined |
| 7 | major | DeltaBars "before" bars #232330 ≈ 1.27:1 — effectively invisible non-text content | Bar fill #6D6B78 (≈3.8:1) |
| 8 | major | ScrollTrigger positions measured before webfonts swap in (Fraunces display sizes shift layout; pins/triggers drift) | `document.fonts.ready.then(ScrollTrigger.refresh)` after reveal |
| 9 | minor | Boot typing loop kept appending unfaded lines during the exit animation | Typing loop halts the moment exit starts |
| 10 | minor | Scroll cue + boot "ready" pulse animated infinitely under `prefers-reduced-motion` | `motion-reduce:animate-none` on both |
| 11 | minor | Top-nav act buttons announced as bare numerals ("I", "II") to screen readers | `aria-label="Act N — Title"` |
| 12 | minor | Toast `role=status` mounted with its content — announcements unreliable | Persistent always-mounted live region; boot's static sr-only text no longer claims `role=status` |
| 13 | minor | Toggling OS reduced-motion mid-scrub stranded the 41→89 counter at an intermediate value | `matchMedia` cleanup resets to the final 89% state |
| 14 | minor | JSON-LD claimed `alumniOf` UIUC (reads as completed degree) | `affiliation` + "B.S. candidate, May 2028" description |
| 15 | minor | ScrollToPlugin registered but never used (dead bytes) | Removed |
| 16 | minor | `.grain` overlay was 4× viewport (`inset: -50%`) with nothing animating it | `inset: 0` |
| 17 | minor | ChillTrill copy "until your mood actually lifts" overstated vs. source ("can detect that your mood has improved") | Reworded to "until it detects your mood improving" |

## Flags adjudicated as false positives (kept, with source)

Review agents were given resume-only facts; three flags are supported by the fuller source
material (LinkedIn + interview notes) the site draws from:

- **Beacons "weekly execution reviews with the CEO/CTO" + "prioritized backlog"** — verbatim from
  the LinkedIn Beacons entry.
- **Heartune "other neurodegenerative conditions"** — the source notes list "Alzheimer's, dementia,
  amnesia, and other neurodegenerative conditions".
- **"~£1B cost-to-serve finding" phrasing** — refuted by the verifier itself: the site consistently
  distinguishes £845M allocated from ~£1B top-decile profit surfaced.

## Refuted (no change needed)

- Boot-exit blur perf collision with Story mount (timing analysis showed no overlap).
- Mobile touch-target sizes (WCAG 2.5.8 spacing exception applies).
- Awards "not in source facts" (they are on the resume).
- Two others merged/duplicated with confirmed items above.

## Post-fix verification

`npm run build` type-checks and builds clean; Playwright smoke re-run after fixes: boot, film,
palette (open/search/navigate/wheel-scroll), mobile, and reduced-motion — zero console errors.
