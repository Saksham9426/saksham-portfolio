import { useEffect, useState } from 'react'
import { Boot } from './components/Boot'
import { Story } from './components/Story'
import { initSmoothScroll } from './lib/scroll'
import { ScrollTrigger } from './lib/gsap'

/** Skip the boot for same-session returns and deep links (#act-N). */
const alreadyBooted = () =>
  sessionStorage.getItem('sa:booted') === '1' || window.location.hash.length > 1

export default function App() {
  const [revealed, setRevealed] = useState(alreadyBooted)
  const [overlayGone, setOverlayGone] = useState(revealed)

  // scroll is locked while the boot overlay is up
  useEffect(() => {
    if (overlayGone) return
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [overlayGone])

  useEffect(() => {
    if (!overlayGone) return
    initSmoothScroll()
    ScrollTrigger.refresh()
    if (window.location.hash.length > 1) {
      document.querySelector(window.location.hash)?.scrollIntoView()
    }
  }, [overlayGone])

  return (
    <>
      {revealed && <Story />}
      {!overlayGone && (
        <Boot onReveal={() => setRevealed(true)} onDone={() => setOverlayGone(true)} />
      )}
      <div className="grain" aria-hidden="true" />
    </>
  )
}
