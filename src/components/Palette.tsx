import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { fuzzyScore } from '../lib/fuzzy'
import { scrollToId, lockScroll, unlockScroll } from '../lib/scroll'
import { gsap, prefersReducedMotion } from '../lib/gsap'
import { site, acts, resumeHref } from '../content'

/** Any component can summon the palette (e.g. the nav button). */
export function openPalette() {
  window.dispatchEvent(new CustomEvent('sa:palette'))
}

type Item = {
  id: string
  group: string
  label: string
  hint?: string
  keywords?: string
  run: () => void
}

export function Palette({ enabled }: { enabled: boolean }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [sel, setSel] = useState(0)
  const [toast, setToast] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const prevFocus = useRef<HTMLElement | null>(null)

  const base = import.meta.env.BASE_URL

  const items = useMemo<Item[]>(() => {
    const nav = (id: string) => () => scrollToId(id)
    const ext = (url: string) => () => window.open(url, '_blank', 'noopener,noreferrer')
    return [
      { id: 'top', group: 'navigate', label: 'Title frame — Saksham Aggarwal', hint: 'home', run: nav('top') },
      ...acts.map((a) => ({
        id: a.id,
        group: 'navigate',
        label: `Act ${a.num} — ${a.title}`,
        hint: a.id.replace('-', ' '),
        keywords:
          a.id === 'act-2'
            ? 'internships jsw barclays beacons metafrazo craft experience'
            : a.id === 'act-3'
              ? 'respan llm eval frontier ai'
              : a.id === 'act-1'
                ? 'origin heartune chilltrill research uiuc'
                : 'next quant copilot projects leadership',
        run: nav(a.id),
      })),
      { id: 'contact', group: 'navigate', label: 'Contact — final frame', hint: 'contact', keywords: 'email hire', run: nav('contact') },
      { id: 'resume', group: 'open', label: 'View resume (plain text, printable)', hint: '30s read', keywords: 'cv facts fast', run: () => { window.location.href = base + resumeHref } },
      { id: 'github', group: 'open', label: 'GitHub — Saksham9426', hint: '↗', run: ext(site.github) },
      { id: 'linkedin', group: 'open', label: 'LinkedIn', hint: '↗', run: ext(site.linkedin) },
      { id: 'publication', group: 'open', label: 'Publication — IJHSS (music & stress biomarkers)', hint: '↗', keywords: 'research paper heartune sigma xi', run: ext(site.publicationPdf) },
      { id: 'chilltrill', group: 'open', label: 'ChillTrill — live demo', hint: '↗', keywords: 'emotion music app', run: ext(site.chilltrill) },
      { id: 'email', group: 'open', label: `Email — ${site.email}`, hint: 'mailto', run: () => { window.location.href = `mailto:${site.email}` } },
      {
        id: 'copy-email',
        group: 'commands',
        label: 'copy email address',
        hint: '$',
        run: () => {
          void navigator.clipboard?.writeText(site.email)
          setToast(`copied ${site.email}`)
        },
      },
      {
        id: 'hire',
        group: 'commands',
        label: 'sudo hire-saksham',
        hint: '$',
        keywords: 'recruit job',
        run: () => {
          setToast('permission granted. opening mail client…')
          window.location.href = `mailto:${site.email}?subject=${encodeURIComponent("Let's talk")}`
        },
      },
      {
        id: 'whoami',
        group: 'commands',
        label: 'whoami',
        hint: '$',
        run: () => setToast('guest — curious visitor with excellent taste'),
      },
      {
        id: 'reboot',
        group: 'commands',
        label: 'boot --replay',
        hint: '$',
        keywords: 'intro terminal restart replay',
        run: () => {
          sessionStorage.removeItem('sa:booted')
          window.history.replaceState(null, '', window.location.pathname)
          window.location.reload()
        },
      },
    ]
  }, [base])

  const results = useMemo(() => {
    if (!query.trim()) return items
    return items
      .map((it) => ({ it, s: fuzzyScore(query, `${it.label} ${it.keywords ?? ''}`) }))
      .filter((r): r is { it: Item; s: number } => r.s !== null)
      .sort((a, b) => b.s - a.s)
      .map((r) => r.it)
  }, [items, query])

  // ------------------------------------------------------------ open/close
  const close = () => {
    setOpen(false)
    unlockScroll()
    prevFocus.current?.focus?.()
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        if (!enabled) return
        e.preventDefault()
        setOpen((o) => {
          if (o) {
            unlockScroll()
            prevFocus.current?.focus?.()
            return false
          }
          return true
        })
      }
    }
    const onSummon = () => enabled && setOpen(true)
    window.addEventListener('keydown', onKey)
    window.addEventListener('sa:palette', onSummon)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('sa:palette', onSummon)
    }
  }, [enabled])

  useLayoutEffect(() => {
    if (!open) return
    prevFocus.current = document.activeElement as HTMLElement
    setQuery('')
    setSel(0)
    lockScroll()
    inputRef.current?.focus()
    if (panelRef.current && !prefersReducedMotion()) {
      gsap.fromTo(
        panelRef.current,
        { autoAlpha: 0, y: 10, scale: 0.985 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.22, ease: 'power2.out' },
      )
    }
  }, [open])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 2600)
    return () => clearTimeout(t)
  }, [toast])

  useEffect(() => {
    setSel(0)
  }, [query])

  useEffect(() => {
    listRef.current
      ?.querySelector('[aria-selected="true"]')
      ?.scrollIntoView({ block: 'nearest' })
  }, [sel, results])

  const runItem = (it: Item) => {
    close()
    it.run()
  }

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSel((s) => Math.min(s + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSel((s) => Math.max(s - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (results[sel]) runItem(results[sel])
    } else if (e.key === 'Escape') {
      e.preventDefault()
      close()
    } else if (e.key === 'Tab') {
      e.preventDefault()
    }
  }

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-[90] flex items-start justify-center bg-ink/70 px-4 backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close()
          }}
        >
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="mt-[12vh] w-full max-w-xl overflow-hidden rounded-lg border border-line bg-ink-2 shadow-[0_24px_80px_rgba(0,0,0,0.6)]"
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <span aria-hidden="true" className="font-mono text-sm text-accent">
                ❯
              </span>
              <input
                ref={inputRef}
                role="combobox"
                aria-expanded="true"
                aria-controls="palette-list"
                aria-activedescendant={results[sel] ? `pal-opt-${results[sel].id}` : undefined}
                aria-label="Search commands"
                className="w-full bg-transparent py-3.5 font-mono text-sm text-text placeholder-faint outline-none"
                placeholder="jump to an act, open a link, run a command…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKey}
                autoComplete="off"
                spellCheck={false}
              />
              <span className="kbd shrink-0">esc</span>
            </div>

            <ul
              id="palette-list"
              ref={listRef}
              role="listbox"
              aria-label="Results"
              className="max-h-[46vh] overflow-y-auto py-2"
            >
              {results.length === 0 && (
                <li className="px-4 py-6 font-mono text-sm text-faint">
                  no matches — command not found
                </li>
              )}
              {results.map((it, i) => {
                const header = !query.trim() && (i === 0 || results[i - 1].group !== it.group)
                return (
                  <li key={it.id}>
                    {header && <p className="label-mono px-4 pb-1 pt-3 text-faint">{it.group}</p>}
                    <button
                      id={`pal-opt-${it.id}`}
                      role="option"
                      aria-selected={i === sel}
                      className={`flex w-full items-center justify-between gap-4 px-4 py-2.5 text-left font-mono text-sm ${
                        i === sel
                          ? 'border-l-2 border-accent bg-surface text-text'
                          : 'border-l-2 border-transparent text-dim'
                      }`}
                      onMouseEnter={() => setSel(i)}
                      onClick={() => runItem(it)}
                    >
                      <span className="truncate">{it.label}</span>
                      {it.hint && <span className="shrink-0 text-xs text-faint">{it.hint}</span>}
                    </button>
                  </li>
                )
              })}
            </ul>

            <div className="flex items-center gap-4 border-t border-line px-4 py-2.5 font-mono text-[10px] text-faint">
              <span>↑↓ navigate</span>
              <span>↵ select</span>
              <span>esc close</span>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <p
          role="status"
          className="fixed bottom-6 left-6 z-[95] border border-line bg-ink-2 px-4 py-2.5 font-mono text-xs text-text shadow-lg"
        >
          <span className="text-accent">$ </span>
          {toast}
        </p>
      )}
    </>
  )
}
