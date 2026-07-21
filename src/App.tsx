import { useEffect, useState } from 'react'
import { Boot } from './components/Boot'
import { Story } from './components/Story'
import { TopNav } from './components/TopNav'
import { ProgressRail } from './components/ProgressRail'
import { Palette } from './components/Palette'
import { initSmoothScroll } from './lib/scroll'
import { ScrollTrigger } from './lib/gsap'

const SECTION_IDS = [
  'top',
  'act-1',
  'act-2',
  'act-3',
  'act-4',
  'contact',
  'jsw',
  'barclays',
  'beacons',
  'metafrazo',
]

const hashId = () => decodeURIComponent(window.location.hash.slice(1))

/** Skip the boot for same-session returns and known deep links (#act-N). */
const alreadyBooted = () =>
  sessionStorage.getItem('sa:booted') === '1' || SECTION_IDS.includes(hashId())

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
    const id = hashId()
    if (id) document.getElementById(id)?.scrollIntoView()
    // pins/triggers were measured with fallback fonts; re-measure after swap
    let stale = false
    document.fonts?.ready.then(() => {
      if (!stale) ScrollTrigger.refresh()
    })
    return () => {
      stale = true
    }
  }, [overlayGone])

  return (
    <>
      {revealed && (
        <>
          <TopNav />
          <ProgressRail />
          <Story />
        </>
      )}
      {!overlayGone && (
        <Boot onReveal={() => setRevealed(true)} onDone={() => setOverlayGone(true)} />
      )}
      <Palette enabled={overlayGone} />
      <div className="grain" aria-hidden="true" />
    </>
  )
}
