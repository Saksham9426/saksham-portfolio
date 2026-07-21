import Lenis from 'lenis'
import { gsap, ScrollTrigger, prefersReducedMotion, isFinePointer } from './gsap'

let lenis: Lenis | null = null

function tick(time: number) {
  lenis?.raf(time * 1000)
}

/** Smooth scroll only where it helps: fine pointers, motion allowed. */
export function initSmoothScroll() {
  if (lenis || prefersReducedMotion() || !isFinePointer()) return
  lenis = new Lenis({ autoRaf: false, duration: 1.1 })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)
}

export function destroySmoothScroll() {
  if (!lenis) return
  gsap.ticker.remove(tick)
  lenis.destroy()
  lenis = null
}

export function lockScroll() {
  lenis?.stop()
  document.documentElement.style.overflow = 'hidden'
}

export function unlockScroll() {
  lenis?.start()
  document.documentElement.style.overflow = ''
}

export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  if (lenis) {
    lenis.scrollTo(el, { duration: 1.2 })
  } else {
    el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' })
  }
}
