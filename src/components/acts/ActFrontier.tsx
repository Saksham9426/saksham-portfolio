import { useLayoutEffect, useRef } from 'react'
import { ActTitle } from '../ActTitle'
import { Reveal } from '../primitives/Reveal'
import { gsap } from '../../lib/gsap'
import { frontierModules } from '../../content'

/**
 * The film's peak: the 41% → 89% evaluation tune-up.
 * Desktop scrubs the number while pinned; mobile counts up once on entry;
 * reduced motion renders the final state (which is also the initial markup).
 */
function EvalCenterpiece() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const numRef = useRef<HTMLSpanElement>(null)
  const barRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    const mm = gsap.matchMedia()
    const proxy = { v: 41 }
    const update = () => {
      if (numRef.current) numRef.current.textContent = `${Math.round(proxy.v)}%`
      if (barRef.current) barRef.current.style.transform = `scaleX(${proxy.v / 100})`
    }
    mm.add(
      {
        desktop: '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
        mobile: '(max-width: 767.98px) and (prefers-reduced-motion: no-preference)',
      },
      (ctx) => {
        const cond = ctx.conditions as { desktop: boolean; mobile: boolean }
        if (cond.desktop) {
          gsap.fromTo(proxy, { v: 41 }, {
            v: 89,
            ease: 'none',
            onUpdate: update,
            scrollTrigger: {
              trigger: wrap,
              start: 'top top',
              end: '+=120%',
              scrub: 0.5,
              pin: true,
            },
          })
        } else if (cond.mobile) {
          gsap.fromTo(proxy, { v: 41 }, {
            v: 89,
            duration: 2,
            ease: 'power2.out',
            onUpdate: update,
            scrollTrigger: { trigger: wrap, start: 'top 70%', once: true },
          })
        }
        // media change mid-tween: settle on the final state, not a stale frame
        return () => {
          proxy.v = 89
          update()
        }
      },
    )
    return () => mm.revert()
  }, [])

  return (
    <div ref={wrapRef} className="flex min-h-svh flex-col justify-center bg-ink-2/50">
      <div className="container-film py-16">
        <p className="label-mono">$ eval run --dataset golden</p>
        <div className="mt-8 flex flex-wrap items-end gap-x-6 gap-y-2">
          <span
            ref={numRef}
            className="font-mono text-[clamp(4.5rem,15vw,10.5rem)] font-bold leading-none text-text"
          >
            89%
          </span>
          <span className="mb-3 font-mono text-sm text-faint">agent evaluation score</span>
        </div>
        <div className="relative mt-8 h-2 w-full max-w-3xl overflow-hidden rounded-full bg-line">
          <div
            ref={barRef}
            className="h-full origin-left bg-accent"
            style={{ transform: 'scaleX(0.89)' }}
          />
          <div className="absolute left-[41%] top-0 h-full w-px bg-ink" aria-hidden="true" />
        </div>
        <p className="mt-3 font-mono text-xs text-faint">41% → 89% · the turning point</p>
        <p className="mt-8 max-w-2xl leading-relaxed text-dim">
          An enterprise fintech client&rsquo;s LLM agent was underperforming its own evaluations. I
          diagnosed and fixed a context-persistence bug, then tuned the agent against a golden
          dataset until the score held —{' '}
          <span className="text-text">89%, up from 41%.</span>
        </p>
      </div>
    </div>
  )
}

export function ActFrontier() {
  return (
    <>
      <ActTitle
        id="act-3"
        num="III"
        title="The Frontier"
        line="Where the system meets the unknown."
      />

      <section aria-label="Act III — The Frontier" className="pb-24 md:pb-36">
        <div className="container-film pb-16">
          <Reveal>
            <p className="max-w-2xl text-lg leading-relaxed text-dim">
              Summer 2026. <span className="text-text">Respan (Y Combinator W24)</span>, San
              Francisco — software engineering across full-stack and AI. The job, at its core:{' '}
              <span className="text-text">
                make AI systems provably good enough that enterprises can bet on them.
              </span>
            </p>
          </Reveal>
        </div>

        <EvalCenterpiece />

        <div className="container-film mt-20">
          <Reveal>
            <p className="label-mono">$ ls ~/respan/shipped</p>
          </Reveal>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {frontierModules.map((m, i) => (
              <Reveal
                key={m.cmd}
                delay={(i % 3) * 0.08}
                className="rounded-lg border border-line bg-ink-2/60 p-6 transition-colors duration-300 hover:border-accent/50"
              >
                <p className="font-mono text-xs text-accent">$ {m.cmd}</p>
                <h3 className="mt-3 text-lg font-medium text-text">{m.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-dim">{m.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
