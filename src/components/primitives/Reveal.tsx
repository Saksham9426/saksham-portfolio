import { useLayoutEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { gsap, prefersReducedMotion } from '../../lib/gsap'

type Props = {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}

/** Fades content up on scroll entry. Content is always real DOM text. */
export function Reveal({ children, className, delay = 0, y = 36 }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          delay,
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        },
      )
    })
    return () => ctx.revert()
  }, [delay, y])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
