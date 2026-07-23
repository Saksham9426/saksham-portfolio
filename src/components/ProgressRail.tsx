import { acts } from '../content'
import { scrollToId } from '../lib/scroll'
import { useActiveSection } from '../hooks/useActiveSection'

const IDS = acts.map((a) => a.id)

/** Desktop act progress rail: always-visible orientation + jumps. */
export function ProgressRail() {
  const active = useActiveSection(IDS)

  return (
    <nav
      aria-label="Act progress"
      className="fixed left-5 top-1/2 z-[65] hidden -translate-y-1/2 flex-col gap-5 lg:flex"
    >
      {acts.map((a) => {
        const isActive = active === a.id
        return (
          <button
            key={a.id}
            type="button"
            onClick={() => scrollToId(a.id)}
            className="group flex cursor-pointer items-center gap-3"
            aria-label={`Act ${a.num}: ${a.title}`}
            aria-current={isActive ? 'true' : undefined}
          >
            <span
              aria-hidden="true"
              className={`h-px transition-all duration-300 ${
                isActive ? 'w-8 bg-accent' : 'w-4 bg-line group-hover:bg-dim'
              }`}
            />
            <span
              className={`font-mono text-[10px] transition-colors duration-300 ${
                isActive ? 'text-accent' : 'text-faint group-hover:text-dim'
              }`}
            >
              {a.num}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
