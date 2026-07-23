import { ActTitle } from '../ActTitle'
import { Reveal } from '../primitives/Reveal'
import { site, resumeHref } from '../../content'
import { replayBoot } from '../../lib/boot'

const copilotStack = ['Python', 'FastAPI', 'Claude API', 'FAISS', 'SEC EDGAR', 'RAG'] as const

export function ActNext() {
  const base = import.meta.env.BASE_URL

  return (
    <>
      <ActTitle id="act-4" num="IV" title="What’s Next" line="The next system is already booting." />

      <section aria-label="Act IV: What's Next" className="container-film pb-10">
        <Reveal className="rounded-lg border border-line bg-ink-2/60 p-6 sm:p-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-mono text-xs text-accent">$ git clone quant-research-copilot</p>
            <p className="label-mono border border-accent/40 px-2 py-1 text-accent">current build</p>
          </div>
          <h3 className="display mt-5 text-3xl sm:text-4xl">Quant Research Copilot</h3>
          <p className="mt-4 max-w-2xl leading-relaxed text-dim">
            An AI research agent that pulls a company&rsquo;s latest 10-K straight from SEC EDGAR,
            chunks and indexes the filing, and answers analyst questions with{' '}
            <span className="text-text">citations pinned to the exact source text</span>. By
            design, it refuses when the filing doesn&rsquo;t support an answer. On its 40-question
            eval harness it scores <span className="text-text">98% faithfulness</span> and 80%
            retrieval accuracy, with 15/15 correct refusals on unanswerable questions at a 12%
            false-refusal rate. Evaluation-first, like everything I ship.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Stack">
            {copilotStack.map((t) => (
              <li key={t} className="border border-line px-3 py-1 font-mono text-xs text-dim">
                {t}
              </li>
            ))}
          </ul>
          <p className="mt-5 font-mono text-xs text-dim">
            <span className="text-faint">source: </span>
            <a className="nav-link" href={site.quantCopilot} target="_blank" rel="noreferrer">
              github.com/Saksham9426/quant-research-copilot ↗
            </a>
          </p>
        </Reveal>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <Reveal className="rounded-lg border border-line bg-ink-2/60 p-6 sm:p-8">
            <p className="font-mono text-xs text-accent">$ lead product-space --client banti</p>
            <h3 className="mt-3 text-lg font-medium text-text">Project Lead · Product Space @ UIUC</h3>
            <p className="mt-3 text-sm leading-relaxed text-dim">
              Selected into a ~6%-acceptance product fellowship; co-leading a 7-person team through
              client discovery and go-to-market.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="rounded-lg border border-line bg-ink-2/60 p-6 sm:p-8">
            <p className="font-mono text-xs text-accent">$ lead megabyte --members 100</p>
            <h3 className="mt-3 text-lg font-medium text-text">President · Megabyte Society</h3>
            <p className="mt-3 text-sm leading-relaxed text-dim">
              Led a 100-member community through 12+ workshops and hackathons with 300+
              participants, including a CS literacy program for underprivileged students at a
              nearby NGO.
            </p>
          </Reveal>
        </div>
      </section>

      <section id="contact" className="container-film scroll-mt-16 py-28 text-center md:py-40">
        <Reveal>
          <p className="label-mono">final frame · contact</p>
          <h2 className="display mt-8 text-[clamp(3rem,10vw,7.5rem)]">
            Let&rsquo;s build<span className="text-accent">.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-md leading-relaxed text-dim">
            Recruiting, collaborating, or just curious: my inbox is open.
          </p>
          <div className="mt-10 flex flex-col items-center gap-5">
            <a
              href={`mailto:${site.email}`}
              className="inline-block border border-accent bg-accent px-7 py-3.5 font-mono text-sm font-medium text-ink transition-colors duration-300 hover:bg-transparent hover:text-accent"
            >
              {site.email}
            </a>
            <nav aria-label="Profiles" className="flex flex-wrap justify-center gap-x-7 gap-y-3 font-mono text-sm">
              <a className="nav-link" href={site.github} target="_blank" rel="noreferrer">
                github ↗
              </a>
              <a className="nav-link" href={site.linkedin} target="_blank" rel="noreferrer">
                linkedin ↗
              </a>
              <a className="nav-link" href={base + resumeHref}>
                resume
              </a>
              <a className="nav-link" href={site.publicationPdf} target="_blank" rel="noreferrer">
                publication ↗
              </a>
            </nav>
          </div>
        </Reveal>

        <footer className="mt-28 border-t border-line pt-8">
          <p className="font-mono text-xs leading-relaxed text-faint">
            © 2026 Saksham Aggarwal · a system that boots into a story ·{' '}
            <a className="nav-link" href={site.repo} target="_blank" rel="noreferrer">
              view source
            </a>{' '}
            ·{' '}
            <button type="button" className="nav-link cursor-pointer" onClick={replayBoot}>
              replay boot sequence
            </button>
          </p>
        </footer>
      </section>
    </>
  )
}
