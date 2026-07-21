import { useLayoutEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/gsap'

type Props = {
  id: string
  num: string
  title: string
  line: string
}

/** Full-viewport act title card: masked line reveal + slow parallax numeral. */
export function ActTitle({ id, num, title, line }: Props) {
  const ref = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-mask-inner]',
        { yPercent: 115 },
        {
          yPercent: 0,
          duration: 1.15,
          ease: 'power4.out',
          scrollTrigger: { trigger: el, start: 'top 72%', once: true },
        },
      )
      gsap.fromTo(
        '[data-fade]',
        { autoAlpha: 0, y: 22 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.15,
          delay: 0.35,
          scrollTrigger: { trigger: el, start: 'top 72%', once: true },
        },
      )
      gsap.fromTo(
        '[data-numeral]',
        { yPercent: -14 },
        {
          yPercent: 14,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      )
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={ref}
      id={id}
      className="relative flex min-h-[92svh] scroll-mt-16 items-center overflow-hidden"
    >
      <div
        data-numeral
        aria-hidden="true"
        className="display pointer-events-none absolute right-[-6vw] top-1/2 -translate-y-1/2 select-none text-[46vw] leading-none text-surface md:right-[2vw] md:text-[32vw]"
      >
        {num}
      </div>
      <div className="container-film relative">
        <p data-fade className="label-mono flex items-center gap-4">
          <span className="inline-block h-px w-10 bg-accent" aria-hidden="true" />
          act {num}
        </p>
        <h2 className="display mt-6 text-[clamp(3.2rem,9vw,7.5rem)]">
          <span className="block overflow-hidden pb-[0.12em]">
            <span data-mask-inner className="block">
              {title}
            </span>
          </span>
        </h2>
        <p data-fade className="display-i mt-5 max-w-xl text-xl text-dim sm:text-2xl">
          {line}
        </p>
      </div>
    </section>
  )
}
