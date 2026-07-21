import { useLayoutEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../../lib/gsap'

type Props = {
  to: number
  decimals?: number
  prefix?: string
  suffix?: string
  duration?: number
  className?: string
}

/**
 * Number that counts up when scrolled into view. Renders the final value as
 * real text immediately (fast path / reduced motion / no-JS-after-hydration),
 * then animates from 0 only when motion is allowed.
 */
export function Counter({ to, decimals = 0, prefix = '', suffix = '', duration = 1.2, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null)

  const fmt = (n: number) =>
    prefix +
    n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) +
    suffix

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    const proxy = { v: 0 }
    const ctx = gsap.context(() => {
      gsap.to(proxy, {
        v: to,
        duration,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        onUpdate: () => {
          el.textContent = fmt(proxy.v)
        },
        onComplete: () => {
          el.textContent = fmt(to)
        },
      })
    })
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [to, decimals, prefix, suffix, duration])

  return (
    <span ref={ref} className={className}>
      {fmt(to)}
    </span>
  )
}
