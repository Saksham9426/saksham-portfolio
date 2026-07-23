import { useLayoutEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/gsap'
import { scrollToId } from '../lib/scroll'
import { replayBoot } from '../lib/boot'
import { MOD_LABEL } from '../lib/platform'
import { acts, resumeHref } from '../content'
import { useActiveSection } from '../hooks/useActiveSection'
import { openPalette } from './Palette'

const SECTION_IDS = ['top', 'act-1', 'act-2', 'act-3', 'act-4'] as const

/** Always-visible fast path: act jumps, resume, palette. */
export function TopNav() {
  const ref = useRef<HTMLElement>(null)
  const active = useActiveSection(SECTION_IDS)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(el, { yPercent: -100 }, { yPercent: 0, duration: 0.7, ease: 'power3.out', delay: 0.9 })
    })
    return () => ctx.revert()
  }, [])

  return (
    <header
      ref={ref}
      className="fixed inset-x-0 top-0 z-[70] border-b border-line/60 bg-ink/70 backdrop-blur-md"
    >
      <a
        href="#contact"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-10 focus:bg-accent focus:px-3 focus:py-1 focus:font-mono focus:text-xs focus:text-ink"
      >
        skip to contact
      </a>
      <div className="container-film flex h-14 items-center justify-between">
        <button
          type="button"
          onClick={() => scrollToId('top')}
          className="cursor-pointer font-mono text-sm font-medium text-text"
          aria-label="Back to top"
        >
          saksham
          <span className="cursor-block" style={{ width: '0.45em', height: '0.85em' }} aria-hidden="true" />
        </button>

        <nav aria-label="Sections" className="flex items-center gap-4 font-mono text-xs sm:gap-5">
          <button
            type="button"
            className="nav-link cursor-pointer"
            onClick={replayBoot}
            aria-label="Replay boot sequence"
          >
            replay
          </button>
          {acts.map((a) => (
            <button
              key={a.id}
              type="button"
              className="nav-link hidden cursor-pointer md:inline"
              data-active={active === a.id}
              onClick={() => scrollToId(a.id)}
              title={`Act ${a.num}: ${a.title}`}
              aria-label={`Act ${a.num}: ${a.title}`}
            >
              {a.num}
            </button>
          ))}
          <a className="nav-link" href={import.meta.env.BASE_URL + resumeHref}>
            resume
          </a>
          <button
            type="button"
            onClick={openPalette}
            className="group relative -my-2 cursor-pointer p-2 text-dim transition-colors hover:text-text focus-visible:text-text"
            aria-label={`Search (${MOD_LABEL})`}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.2" y2="16.2" />
            </svg>
            <span className="kbd pointer-events-none absolute right-0 top-full mt-2 hidden whitespace-nowrap group-hover:inline-block group-focus-visible:inline-block">
              Search {MOD_LABEL}
            </span>
          </button>
        </nav>
      </div>
    </header>
  )
}
