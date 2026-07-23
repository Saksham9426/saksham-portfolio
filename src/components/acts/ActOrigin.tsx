import { ActTitle } from '../ActTitle'
import { Reveal } from '../primitives/Reveal'
import { site } from '../../content'

export function ActOrigin() {
  return (
    <>
      <ActTitle id="act-1" num="I" title="Origin" line="Every system starts with a reason." />

      <section aria-label="Act I: Origin" className="container-film pb-28 md:pb-40">
        <div className="max-w-2xl space-y-7 text-[1.05rem] leading-relaxed text-dim">
          <Reveal>
            <p>
              <span className="text-text">I&rsquo;m Saksham.</span> I study Computer Science and
              Statistics at the University of Illinois Urbana-Champaign (GPA 3.96, class of 2028)
              as a James Scholar on the Dean&rsquo;s List, with minors in Econometrics and
              Mathematics. Two disciplines, one obsession:{' '}
              <span className="text-text">build the system, then prove it works.</span>
            </p>
          </Reveal>
          <Reveal>
            <p>
              It started with music. My cousin has ADHD, and I noticed something small: when I played
              guitar, she could focus. That observation refused to leave me alone, so it became a
              research question. <span className="text-text">What does music actually do to a body
              under stress?</span>
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          <Reveal className="rounded-lg border border-line bg-ink-2/60 p-6 sm:p-8">
            <p className="font-mono text-xs text-accent">$ open heartune --research</p>
            <h3 className="display mt-4 text-2xl sm:text-3xl">Heartune</h3>
            <p className="mt-1 font-mono text-xs text-faint">ai music therapy · published research</p>
            <p className="mt-4 text-sm leading-relaxed text-dim">
              With mentorship from an Oxford professor, I researched how music moves heart rate,
              blood pressure and stress in working adults, then built the findings into software:
              an AI music-therapy app for patients with Alzheimer&rsquo;s, dementia and other
              neurodegenerative conditions. It curates by BPM, tempo, era, language and genre to
              reach the neural pathways where nostalgia lives, and was deployed as a supplemental
              treatment in a hospital pilot.
            </p>
            <ul className="mt-5 space-y-1.5 font-mono text-xs text-dim">
              <li>
                <span className="text-faint">published: </span>
                <a className="nav-link" href={site.publicationPdf} target="_blank" rel="noreferrer">
                  IJHSS · Innosphere&rsquo;23 · Sigma Xi (2023) ↗
                </a>
              </li>
              <li>
                <span className="text-faint">coverage: </span>national press, The Times of India
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.12} className="rounded-lg border border-line bg-ink-2/60 p-6 sm:p-8">
            <p className="font-mono text-xs text-accent">$ run chilltrill --live</p>
            <h3 className="display mt-4 text-2xl sm:text-3xl">ChillTrill</h3>
            <p className="mt-1 font-mono text-xs text-faint">music that reads the room</p>
            <p className="mt-4 text-sm leading-relaxed text-dim">
              The sibling project: a real-time facial-expression classifier (OpenCV + CNN,{' '}
              <span className="text-text">F1&nbsp;0.81</span> across ~1,200 labeled clips at{' '}
              <span className="text-text">~55&nbsp;ms per frame</span>) that detects your emotion
              and re-curates the playlist until it detects your mood improving. Piloted at 3
              partner institutions.
            </p>
            <ul className="mt-5 space-y-1.5 font-mono text-xs text-dim">
              <li>
                <span className="text-faint">demo: </span>
                <a className="nav-link" href={site.chilltrill} target="_blank" rel="noreferrer">
                  chilltrill.streamlit.app ↗
                </a>
              </li>
              <li>
                <span className="text-faint">source: </span>
                <a className="nav-link" href={site.chilltrillRepo} target="_blank" rel="noreferrer">
                  github.com/Saksham9426/ChillTrill ↗
                </a>
              </li>
            </ul>
          </Reveal>
        </div>

        <Reveal className="mt-20">
          <p className="display-i mx-auto max-w-2xl text-center text-2xl leading-snug text-text sm:text-3xl">
            Technology matters when it changes what happens to a person.
            <span className="text-dim"> Everything since has been scaling that idea.</span>
          </p>
        </Reveal>
      </section>
    </>
  )
}
