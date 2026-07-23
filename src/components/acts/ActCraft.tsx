import type { ReactNode } from 'react'
import { ActTitle } from '../ActTitle'
import { Reveal } from '../primitives/Reveal'
import { Counter } from '../primitives/Counter'
import { DeltaBars } from '../viz/DeltaBars'
import { craftChapters } from '../../content'

/** Narrative copy per chapter: every number here is from the resume. */
const narratives: Record<string, ReactNode> = {
  jsw: (
    <>
      <p>
        JSW&rsquo;s steel operations in Bellary (home to Asia&rsquo;s largest steel plant) live
        with the monsoon: heavy rain stresses the drainage around the plant, and overflow puts
        roads, property and people at risk. The task:{' '}
        <span className="text-text">make the rain predictable.</span>
      </p>
      <p>
        I built the forecasting workflow end-to-end in Python: cleaned 15 years of station data in
        OpenRefine, then trained and validated with walk-forward splits so the model was only ever
        judged on rain it hadn&rsquo;t seen. Result:{' '}
        <span className="text-text">18% lower RMSE than the seasonal-naive baseline</span>, across
        60 stations.
      </p>
    </>
  ),
  barclays: (
    <>
      <p>
        Twenty million customers. £845 million in cost-to-serve. Nobody could say precisely where it
        went. <span className="text-text">I built the allocation engine that could</span>: Python +
        SQL with CTEs and window functions, parameterized for scenario analysis, across six cost
        domains.
      </p>
      <p>
        The answer was worth finding: the top decile of customers surfaced{' '}
        <span className="text-text">roughly £1 billion in profit</span> against a £6 per
        customer-month baseline, evidence that informed branch-to-digital targeting. Then I made it
        production: a monthly Linux batch pipeline with automated data-quality checks, adopted by
        Channels Analytics and used by 10+ stakeholders.
      </p>
    </>
  ),
  beacons: (
    <>
      <p>
        At Beacons (YC S19) I took the product seat: weekly execution reviews with the CEO and CTO,
        and 20+ interviews with creators between 300K and 1M followers, distilled into a KPI
        framework (activation, conversion, retention) and a prioritized backlog.
      </p>
      <p>
        Then we shipped: an AI-assisted deal-recommendation workflow, built with ML and engineering,
        sustaining <span className="text-text">200+ matches a week</span>. Ranking and funnel
        iteration moved the numbers that matter: acceptance{' '}
        <span className="text-text">21% → 27%</span>, median time-to-first-match{' '}
        <span className="text-text">9.5 → 6.8 days</span>. The research also provided evidence
        supporting the launch of Beam, the company&rsquo;s AI teammate.
      </p>
    </>
  ),
  metafrazo: (
    <>
      <p>
        At MetaFrazo I worked the hard problem underneath AI products:{' '}
        <span className="text-text">trusting the output.</span> I built a versioned, reproducible
        test-generation system for a translation-assessment platform (FastAPI, Node/Express,
        MongoDB), where deterministic seeding plus hash and n-gram fingerprinting drove duplicate
        tests to near zero.
      </p>
      <p>
        Then a hybrid scoring pipeline: deterministic checks, automated metrics (BERTScore, COMET)
        and an LLM rubric. It agreed with human QA at{' '}
        <span className="text-text">0.76 Cohen&rsquo;s κ</span>, while batching amortized the system
        prompt and cut per-test token cost 65%.
      </p>
    </>
  ),
}

export function ActCraft() {
  return (
    <>
      <ActTitle
        id="act-2"
        num="II"
        title="The Craft"
        line="Four apprenticeships, rising stakes: ship it, then prove it."
      />

      <section aria-label="Act II: The Craft" className="container-film pb-24 md:pb-36">
        {craftChapters.map((c) => (
          <article key={c.id} id={c.id} className="border-t border-line py-14 md:py-20">
            <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.9fr)]">
              <Reveal className="self-start md:sticky md:top-24">
                <p className="font-mono text-xs text-faint">{c.index} / 04</p>
                <p className="display-i mt-3 text-xl text-accent">{c.thread}</p>
                <h3 className="display mt-3 text-3xl md:text-4xl">{c.company}</h3>
                <p className="mt-3 font-mono text-xs leading-relaxed text-dim">{c.role}</p>
                <p className="mt-1 font-mono text-xs text-faint">
                  {c.where} · {c.when}
                </p>
              </Reveal>

              <div>
                <Reveal className="space-y-5 leading-relaxed text-dim">{narratives[c.id]}</Reveal>

                <Reveal className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3" delay={0.1}>
                  {c.stats.map((st) => (
                    <div key={st.label}>
                      <p className="font-mono text-3xl text-text md:text-4xl">
                        <Counter
                          to={st.value}
                          prefix={st.prefix}
                          suffix={st.suffix}
                          decimals={st.decimals}
                        />
                      </p>
                      <p className="mt-2 text-xs leading-snug text-faint">{st.label}</p>
                    </div>
                  ))}
                </Reveal>

                <DeltaBars
                  className="mt-12 max-w-xl"
                  title={c.delta.title}
                  note={c.delta.note}
                  rows={c.delta.rows}
                />
              </div>
            </div>
          </article>
        ))}
      </section>
    </>
  )
}
