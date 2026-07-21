import { useEffect, useRef, useState } from 'react'
import { bootLines } from '../content'
import { gsap } from '../lib/gsap'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const CMD = bootLines.find((l) => l.kind === 'cmd')!.text
const LOGS = bootLines.filter((l) => l.kind === 'log') as Extract<
  (typeof bootLines)[number],
  { kind: 'log' }
>[]

type Props = {
  /** Story should mount now (exit animation starting above it). */
  onReveal: () => void
  /** Overlay can unmount. */
  onDone: () => void
}

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))

export function Boot({ onReveal, onDone }: Props) {
  const reduced = usePrefersReducedMotion()
  const overlayRef = useRef<HTMLDivElement>(null)
  const termRef = useRef<HTMLDivElement>(null)
  const flashRef = useRef<HTMLDivElement>(null)
  const exiting = useRef(false)

  const [s, setS] = useState(() =>
    reduced
      ? { cmdChars: CMD.length, shown: LOGS.length, stamps: LOGS.length, ready: true }
      : { cmdChars: 0, shown: 0, stamps: 0, ready: false },
  )

  const coarse = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches

  // ------------------------------------------------------------- typing
  useEffect(() => {
    if (reduced) {
      setS({ cmdChars: CMD.length, shown: LOGS.length, stamps: LOGS.length, ready: true })
      return
    }
    let cancelled = false
    ;(async () => {
      await wait(450)
      for (let i = 1; i <= CMD.length; i++) {
        if (cancelled) return
        setS((p) => ({ ...p, cmdChars: i }))
        await wait(26 + Math.random() * 38)
      }
      await wait(320)
      for (let i = 0; i < LOGS.length; i++) {
        if (cancelled) return
        setS((p) => ({ ...p, shown: i + 1 }))
        // the £1B line gets a longer, deliberate beat before its stamp
        await wait(LOGS[i].text.includes('£1B') ? 520 : 140 + Math.random() * 140)
        if (cancelled) return
        setS((p) => ({ ...p, stamps: i + 1 }))
        await wait(90)
      }
      if (cancelled) return
      await wait(260)
      setS((p) => ({ ...p, ready: true }))
    })()
    return () => {
      cancelled = true
    }
  }, [reduced])

  // -------------------------------------------------------------- exit
  const exit = (instant: boolean) => {
    if (exiting.current) return
    exiting.current = true
    sessionStorage.setItem('sa:booted', '1')

    if (instant || reduced || !overlayRef.current) {
      onReveal()
      if (overlayRef.current && !reduced) {
        gsap.to(overlayRef.current, { autoAlpha: 0, duration: 0.2, onComplete: onDone })
      } else {
        onDone()
      }
      return
    }

    onReveal() // mount the story behind the still-opaque overlay
    const lines = termRef.current?.querySelectorAll('[data-line]') ?? []
    const tl = gsap.timeline({ onComplete: onDone })
    tl.to(lines, {
      autoAlpha: 0,
      y: -14,
      filter: 'blur(6px)',
      stagger: 0.03,
      duration: 0.35,
      ease: 'power2.in',
    })
      .fromTo(
        flashRef.current,
        { scaleX: 0, autoAlpha: 1 },
        { scaleX: 1, duration: 0.32, ease: 'power3.inOut' },
        '-=0.1',
      )
      .to(flashRef.current, { scaleY: 0.15, autoAlpha: 0, duration: 0.4, ease: 'power2.in' }, '+=0.08')
      .to(overlayRef.current, { autoAlpha: 0, duration: 0.55, ease: 'power2.inOut' }, '<')
  }

  // ------------------------------------------------------------- input
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const k = e.key
      if (k === 'Shift' || k === 'Tab' || k === 'CapsLock') return
      if (k === 's' || k === 'S' || k === 'Escape') {
        e.preventDefault()
        exit(true)
        return
      }
      if (k === 'Enter' || k === ' ' || k === 'ArrowDown' || k.length === 1) {
        e.preventDefault()
        exit(false)
      }
    }
    const onWheel = () => exit(true)
    window.addEventListener('keydown', onKey)
    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('touchmove', onWheel, { passive: true })
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchmove', onWheel)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced])

  // ------------------------------------------------------------ render
  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[80] bg-ink cursor-pointer"
      onClick={() => exit(false)}
      role="presentation"
    >
      <div className="scanlines" aria-hidden="true" />
      <div
        ref={flashRef}
        aria-hidden="true"
        className="absolute left-6 right-6 top-1/2 h-[2px] origin-center bg-accent opacity-0"
        style={{ boxShadow: '0 0 28px 3px rgba(232,163,61,0.7)' }}
      />

      <p className="sr-only" role="status">
        Terminal intro animation playing. Press Enter to begin, or use the Skip intro button to go
        straight to the content.
      </p>

      <button
        type="button"
        className="label-mono absolute right-5 top-5 z-10 border border-line px-3 py-2 transition-colors hover:border-accent hover:text-text"
        onClick={(e) => {
          e.stopPropagation()
          exit(true)
        }}
      >
        skip intro ⏎
      </button>

      <div
        ref={termRef}
        aria-hidden="true"
        className="flex h-full items-center justify-center px-5"
      >
        <div className="w-full max-w-2xl font-mono text-[13px] leading-[2.1] text-text sm:text-sm">
          <div data-line>
            <span className="text-faint">$ </span>
            <span>{CMD.slice(0, s.cmdChars)}</span>
            {s.cmdChars < CMD.length && <span className="cursor-block" />}
          </div>

          {LOGS.slice(0, s.shown).map((l, i) => (
            <div key={l.text} data-line className="flex items-baseline">
              <span className="text-faint">&gt;&nbsp;</span>
              <span className="whitespace-nowrap">{l.text}</span>
              <span className="mx-2 min-w-4 flex-1 border-b border-dotted border-faint/60" />
              <span className={i < s.stamps ? 'stamp-ok' : 'opacity-0'}>{l.status}</span>
              {l.note && i < s.stamps && (
                <span className="ml-3 hidden whitespace-nowrap text-faint md:inline">{l.note}</span>
              )}
            </div>
          ))}

          {s.ready && (
            <div data-line className="mt-2">
              <span className="text-faint">&gt; </span>
              <span>ready.</span>
              <span className="cursor-block" />
              <div className="mt-6 animate-pulse font-mono text-dim">
                {coarse ? (
                  <span>tap anywhere to begin</span>
                ) : (
                  <span>
                    press <span className="kbd">↵</span> to begin&nbsp;&nbsp;·&nbsp;&nbsp;
                    <span className="kbd">S</span> to skip
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
