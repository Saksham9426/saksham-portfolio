import { useLayoutEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/gsap'
import { scrollToId } from '../lib/scroll'
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
          {acts.map((a) => (
            <button
              key={a.id}
              type="button"
              className="nav-link hidden cursor-pointer md:inline"
              data-active={active === a.id}
              onClick={() => scrollToId(a.id)}
              title={`Act ${a.num} — ${a.title}`}
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
            className="kbd cursor-pointer transition-colors hover:border-accent hover:text-text"
            aria-label="Open command palette"
          >
            <span className="md:hidden">menu</span>
            <span className="hidden md:inline">⌘K</span>
          </button>
        </nav>
      </div>
    </header>
  )
}
