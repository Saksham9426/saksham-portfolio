import { useEffect, useState } from 'react'

/** Last section whose top has crossed the upper-middle of the viewport. */
export function useActiveSection(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null)
  const key = ids.join('|')

  useEffect(() => {
    const list = key.split('|').filter(Boolean)
    let raf = 0
    const calc = () => {
      raf = 0
      const mid = window.scrollY + window.innerHeight * 0.45
      let cur: string | null = null
      for (const id of list) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= mid) cur = id
      }
      setActive(cur)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(calc)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    calc()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [key])

  return active
}
