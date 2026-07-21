import { useLayoutEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../../lib/gsap'

export type DeltaRow = {
  label: string
  before: number
  after: number
  unit: string
  decimals?: number
}

type Props = {
  title: string
  note?: string
  rows: readonly DeltaRow[]
  className?: string
}

/** Before/after bars that draw in on scroll. Values are always visible as text. */
export function DeltaBars({ title, note, rows, className }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-bar]',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.1,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        },
      )
    }, el)
    return () => ctx.revert()
  }, [])

  const fmt = (r: DeltaRow, v: number) =>
    v.toLocaleString('en-US', {
      minimumFractionDigits: r.decimals ?? 0,
      maximumFractionDigits: r.decimals ?? 0,
    }) + r.unit

  return (
    <figure ref={ref} className={className}>
      <figcaption className="flex flex-wrap items-baseline justify-between gap-2">
        <span className="label-mono">{title}</span>
        {note && <span className="font-mono text-[10px] text-faint">{note}</span>}
      </figcaption>
      <div className="mt-5 space-y-6">
        {rows.map((r) => {
          const max = Math.max(r.before, r.after)
          return (
            <div key={r.label}>
              <p className="font-mono text-xs text-dim">{r.label}</p>
              <div className="mt-2 space-y-1.5">
                {(['before', 'after'] as const).map((k) => (
                  <div key={k} className="flex items-center gap-3">
                    <div
                      data-bar
                      className="h-[6px] flex-none origin-left rounded-full"
                      style={{
                        width: `${(r[k] / max) * 72}%`,
                        background: k === 'after' ? 'var(--color-accent)' : 'var(--color-line)',
                      }}
                    />
                    <span
                      className={`whitespace-nowrap font-mono text-[11px] ${
                        k === 'after' ? 'text-text' : 'text-faint'
                      }`}
                    >
                      {fmt(r, r[k])}
                      {k === 'before' ? '  →' : ''}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </figure>
  )
}
