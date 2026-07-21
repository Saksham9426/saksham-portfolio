# PLAN — saksham-portfolio

**Concept:** *a system that boots into a story.* The site opens as a live terminal (dark screen,
self-typing boot sequence). On keypress it transforms cinematically into a four-act scrollytelling
narrative that plays like one continuous film. A Cmd-K palette and an always-visible nav guarantee
a 30-second fast path for hurried recruiters.

**Live target:** public GitHub repo `Saksham9426/saksham-portfolio` → GitHub Pages at
`https://saksham9426.github.io/saksham-portfolio/`.

---

## Structure

```
boot overlay (terminal)  →  cinematic hand-off  →  continuous scroll film
                                                    ├─ Act I   — Origin
                                                    ├─ Act II  — The Craft
                                                    ├─ Act III — The Frontier
                                                    └─ Act IV  — What's Next (+ contact)
persistent: top nav (acts + resume + ⌘K hint) · act progress rail · Cmd-K palette
fast path:  /resume.html (plain, printable) · skip-intro affordance · all copy is real DOM text
```

## Section-by-section content map (real material only)

### Boot sequence (adapted from brief)
```
$ ./saksham --init
> mounting /education ................ [ok]   cs + statistics @ uiuc · gpa 3.96
> loading systems engineer ........... [ok]
> loading ai researcher .............. [ok]
> importing 5 internships ............ [ok]
> importing 1 publication ............ [ok]
> locating ~£1B ...................... [found]
> ready.   press ↵ to begin — S to skip
```

### Act I — Origin
- Who: Saksham Aggarwal — CS + Statistics @ UIUC (GPA 3.96, May 2028), James Scholar, Dean's List,
  minors in Econometrics & Mathematics.
- The dual pursuit: systems that run + statistics that explain — building at the intersection.
- The spark: **Heartune** — AI music therapy for dementia/Alzheimer's patients; independent research
  under an Oxford professor on music & stress biomarkers; published (IJHSS), presented at
  Innosphere'23 & Sigma Xi (Sep 2023); national coverage in the Times of India; deployed as a
  supplemental treatment pilot.
- Sibling project: **ChillTrill** — real-time facial-expression classifier (F1 0.81 on ~1,200 clips,
  ~55 ms/frame) that curates music by detected emotion; piloted at 3 partner institutions.

### Act II — The Craft (internships as rising mastery; data-viz treatment)
1. **JSW Group** (ML Intern, Apr–Jun 2024, Mumbai) — end-to-end rainfall forecasting in Python with
   walk-forward validation; **−18% RMSE** vs seasonal-naive across **60 stations / 15 years**;
   OpenRefine cleaning cut inconsistencies 30%.
2. **Barclays, Analytics Center of Excellence** (Data & Decision Analyst, May–Jul 2025,
   Noida + London) — cost-to-serve allocation engine in Python + SQL over **£845M across 20M+
   customers** and 6 domains; surfaced a top decile worth **~£1B in profit**; productionized a
   monthly Linux batch pipeline (**6.2h → 3.9h**, reruns **8 → 3**/month); adopted by Channels
   Analytics, used by 10+ stakeholders.
3. **Beacons AI (YC S19)** (Software PM, Oct 2025–Feb 2026) — AI deal-recommendation workflow:
   **200+ matches/week**, acceptance **21% → 27%**, median time-to-first-match **9.5 → 6.8 days
   (−28%)**; 20+ creator interviews (300K–1M followers) → KPI/research framework supporting the
   launch of Beam.
4. **MetaFrazo (Phraze)** (SWE Intern — AI, Jan–May 2026, remote) — versioned reproducible
   test-generation (FastAPI/Node/MongoDB, deterministic seeding + n-gram fingerprints → near-zero
   duplicates); hybrid scoring (deterministic + BERTScore/COMET + LLM rubric) at **0.76 Cohen's κ**
   with human QA; **−65%** per-test token cost via batching.
   Viz: count-up numbers, scroll-drawn charts (runtime bars, acceptance funnel, RMSE delta).

### Act III — The Frontier (climax)
- **Respan (YC W24)** — SWE Intern (Full-Stack / AI), May 2026–present, San Francisco.
  HIGH-LEVEL ONLY (see CONFIDENTIALITY in DECISIONS.md):
  - LLM evaluation systems shipped to production for **2 enterprise clients** — an agent graded on 7
    behavioral & safety criteria (6 datasets, 7 LLM-judge pipelines); a multi-tenant extraction
    pipeline with 30+ graders and per-customer scoring.
  - Diagnosed & fixed a context-persistence bug in an enterprise client's LLM agent; tuned against a
    golden dataset — evaluation score **41% → 89%** (the act's centerpiece counter).
  - Runtime permission layer validating every agent action against scope & safety policy across
    **5,000+ daily LLM calls**.
  - Cmd-K command palette (93% active-user adoption in 28 days, sub-100ms search over 6 resource
    types) — the earned detail behind this site's own palette.
  - Killed an N+1 query pattern on the experiments endpoint (**O(N) → O(1)**).
  - Benchmarked frontier models (Opus 4.8, GPT-5.6, Fable 5) across 250+ prompts; built the
    platform's gateway-setup CLI.

### Act IV — What's Next
- **Quant Research Copilot** — AI agent that pulls a company's latest 10-K from SEC EDGAR, chunks &
  indexes it, answers analyst questions with citations to exact filing text, and refuses when the
  source doesn't support an answer.
- Leadership: Project Lead @ Product Space UIUC (client: Banti, 7-person team, discovery + GTM);
  President, Megabyte Society (100 members, 12+ workshops & hackathons, 300+ participants, CS
  literacy program for underprivileged kids).
- CTA / contact: email (mailto), LinkedIn, GitHub. **No phone number.**

## Animation plan
- **Boot:** character-by-character self-typing with variable cadence, blinking block cursor, `[ok]`
  stamps; any key/click/scroll begins; `S` or "skip intro" button skips straight to the story;
  reduced-motion gets a static, instantly-complete terminal.
- **Hand-off:** on begin — terminal lines de-rez (blur + scatter up), a CRT-style horizontal flash
  collapses the overlay, background morphs from pure black to the story's ink tone, Act I title
  materializes from the same cursor glyph. One continuous camera feeling, no hard cut.
- **Scroll film (GSAP ScrollTrigger + Lenis smooth scroll):**
  - Act titles: pinned full-viewport title cards with per-line mask reveals and slow parallax drift.
  - Act II: numbers count up on entry; SVG charts draw via stroke-dashoffset scrubbed to scroll;
    internship "chapters" alternate rhythm to feel like rising mastery.
  - Act III: darker, tighter treatment; the 41→89 counter scrubs with scroll as the film's peak;
    terminal motifs return (the system is now *his* system).
  - Act IV: momentum outward — lighter spacing, forward easing, contact CTA.
- **Easing:** custom cubic-beziers (expo/power3-out family), no bounce; motion serves story.
- **Degradation:** `gsap.matchMedia` — mobile gets no pinning and cheaper reveals;
  `prefers-reduced-motion` disables Lenis, pinning, typing & counters (values render final).

## Fast path (non-negotiable)
1. Cmd-K palette: jump anywhere, links, resume, playful commands.
2. Always-visible top nav (act links + "Resume") + left progress rail; "skip intro" during boot.
3. Every claim is real DOM text, visible without animation; `/resume.html` is a plain, printable
   one-pager; reduced-motion renders the whole story statically.

## Phases (commit after each)
0. PLAN.md + DECISIONS.md + BUILD_LOG.md, git init.
1. Scaffold: Vite + React + TS + Tailwind v4 + GSAP + Lenis; fonts, tokens, layout primitives.
2. Terminal boot + cinematic hand-off.
3. Four acts with scroll animation; data-viz for Act II.
4. Cmd-K palette + fast-path nav (top nav, progress rail, resume page).
5. Content pass (confidentiality-checked), responsive, perf, a11y/reduced-motion.
6. Multi-agent review (REVIEW.md), README, deploy to GitHub Pages via gh CLI.
7. STATUS.md.
