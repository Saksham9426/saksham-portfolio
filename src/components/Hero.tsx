import { useLayoutEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/gsap'
import { site, resumeHref } from '../content'

/** Opening frame — plays its entrance as the boot overlay dissolves. */
export function Hero() {
  const ref = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-rise]',
        { autoAlpha: 0, y: 42 },
        { autoAlpha: 1, y: 0, duration: 1.1, ease: 'power3.out', stagger: 0.09, delay: 0.45 },
      )
    }, el)
    return () => ctx.revert()
  }, [])

  const base = import.meta.env.BASE_URL

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-svh flex-col justify-center overflow-hidden"
    >
      <div className="container-film">
        <p data-rise className="label-mono">
          boot complete · a story in four acts
        </p>
        <h1 data-rise className="display mt-7 text-[clamp(3.4rem,11vw,9rem)]">
          Saksham
          <br />
          Aggarwal
          <span
            className="cursor-block"
            style={{ width: '0.28em', height: '0.7em', marginLeft: '0.08em' }}
            aria-hidden="true"
          />
        </h1>
        <p data-rise className="mt-8 max-w-xl text-base leading-relaxed text-dim sm:text-lg">
          Software engineer &amp; AI builder. Computer Science + Statistics at UIUC. I build systems
          that ship — and the evaluations that prove they work.
        </p>

        {/* fast path: everything a hurried reader needs, in frame one */}
        <nav data-rise aria-label="Quick links" className="mt-10 flex flex-wrap gap-x-7 gap-y-3 font-mono text-sm">
          <a className="nav-link" href={base + resumeHref}>
            resume
          </a>
          <a className="nav-link" href={site.github} target="_blank" rel="noreferrer">
            github
          </a>
          <a className="nav-link" href={site.linkedin} target="_blank" rel="noreferrer">
            linkedin
          </a>
          <a className="nav-link" href={`mailto:${site.email}`}>
            email
          </a>
          <span className="hidden text-faint md:inline">
            <span className="kbd">⌘K</span> to go anywhere
          </span>
        </nav>
      </div>

      <div data-rise className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
        <p className="label-mono">scroll to roll film</p>
        <div className="mx-auto mt-3 h-10 w-px overflow-hidden bg-line">
          <div className="h-1/2 w-px animate-[scrollcue_1.8s_ease-in-out_infinite] bg-accent motion-reduce:animate-none" />
        </div>
      </div>
    </section>
  )
}
