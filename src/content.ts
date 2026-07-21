/**
 * Single source of truth for links, structured data, and every metric on the
 * site. All values come verbatim from Saksham's resume / LinkedIn / notes —
 * nothing invented. Confidentiality: Respan content stays at public-resume
 * level (no client names, no internal detail); no phone number anywhere.
 */

export const site = {
  name: 'Saksham Aggarwal',
  tagline: 'Software engineer & AI builder',
  email: 'saksham.aggarwal@gmail.com',
  github: 'https://github.com/Saksham9426',
  linkedin: 'https://www.linkedin.com/in/saksham-aggarwal-sa9/',
  publicationPdf:
    'https://www.internationaljournalssrg.org/IJHSS/2023/Volume10-Issue4/IJHSS-V10I4P108.pdf',
  chilltrill: 'https://chilltrill.streamlit.app/',
  chilltrillRepo: 'https://github.com/Saksham9426/ChillTrill',
  repo: 'https://github.com/Saksham9426/saksham-portfolio',
} as const

export const acts = [
  { id: 'act-1', num: 'I', title: 'Origin' },
  { id: 'act-2', num: 'II', title: 'The Craft' },
  { id: 'act-3', num: 'III', title: 'The Frontier' },
  { id: 'act-4', num: 'IV', title: "What's Next" },
] as const

export type BootLine =
  | { kind: 'cmd'; text: string }
  | { kind: 'log'; text: string; status: string; note?: string }

export const bootLines: BootLine[] = [
  { kind: 'cmd', text: './saksham --init' },
  { kind: 'log', text: 'mounting /education', status: '[ok]', note: 'cs + statistics @ uiuc · gpa 3.96' },
  { kind: 'log', text: 'loading systems engineer', status: '[ok]' },
  { kind: 'log', text: 'loading ai researcher', status: '[ok]' },
  { kind: 'log', text: 'importing 5 internships', status: '[ok]' },
  { kind: 'log', text: 'importing 1 publication', status: '[ok]', note: "innosphere'23 · sigma xi" },
  { kind: 'log', text: 'locating ~£1B', status: '[found]' },
]

export type Stat = {
  value: number
  label: string
  prefix?: string
  suffix?: string
  decimals?: number
}

export type Delta = {
  title: string
  note?: string
  rows: readonly { label: string; before: number; after: number; unit: string; decimals?: number }[]
}

/** Act II — internships in chronological order: rising mastery. */
export const craftChapters: readonly {
  id: string
  index: string
  company: string
  role: string
  where: string
  when: string
  thread: string
  stats: readonly Stat[]
  delta: Delta
}[] = [
  {
    id: 'jsw',
    index: '01',
    company: 'JSW Group',
    role: 'Machine Learning Intern',
    where: 'Mumbai, India',
    when: 'Apr — Jun 2024',
    thread: 'Learn the machine.',
    stats: [
      { value: 60, label: 'weather stations' },
      { value: 15, label: 'years of station data' },
      { value: 30, prefix: '−', suffix: '%', label: 'data inconsistencies, via OpenRefine' },
    ],
    delta: {
      title: 'forecast error · walk-forward validation',
      note: 'lower is better',
      rows: [{ label: 'RMSE, indexed (seasonal-naive = 100)', before: 100, after: 82, unit: '' }],
    },
  },
  {
    id: 'barclays',
    index: '02',
    company: 'Barclays',
    role: 'Data & Decision Analyst · Analytics Center of Excellence',
    where: 'Noida, India & London, UK',
    when: 'May — Jul 2025',
    thread: 'Scale the question.',
    stats: [
      { value: 845, prefix: '£', suffix: 'M', label: 'cost-to-serve allocated' },
      { value: 20, suffix: 'M+', label: 'customers · 6 domains' },
      { value: 1, prefix: '~£', suffix: 'B', label: 'profit surfaced in the top decile' },
    ],
    delta: {
      title: 'productionized monthly pipeline · linux',
      note: 'lower is better',
      rows: [
        { label: 'batch runtime', before: 6.2, after: 3.9, unit: 'h', decimals: 1 },
        { label: 'reruns per month', before: 8, after: 3, unit: '' },
      ],
    },
  },
  {
    id: 'beacons',
    index: '03',
    company: 'Beacons AI',
    role: 'Software Product Manager · YC S19',
    where: 'Champaign, IL',
    when: 'Oct 2025 — Feb 2026',
    thread: 'Ship to humans.',
    stats: [
      { value: 200, suffix: '+', label: 'matches per week, sustained' },
      { value: 20, suffix: '+', label: 'creator interviews · 300K–1M followers' },
      { value: 28, prefix: '−', suffix: '%', label: 'median time-to-first-match' },
    ],
    delta: {
      title: 'ranking + funnel iteration',
      rows: [
        { label: 'match acceptance (higher is better)', before: 21, after: 27, unit: '%' },
        { label: 'time-to-first-match, days (lower is better)', before: 9.5, after: 6.8, unit: 'd', decimals: 1 },
      ],
    },
  },
  {
    id: 'metafrazo',
    index: '04',
    company: 'MetaFrazo',
    role: 'Software Engineer Intern (AI) · Phraze',
    where: 'Chicago, IL · Remote',
    when: 'Jan — May 2026',
    thread: 'Make AI measurable.',
    stats: [
      { value: 0.76, decimals: 2, label: "Cohen's κ agreement with human QA" },
      { value: 65, prefix: '−', suffix: '%', label: 'per-test token cost' },
      { value: 0, prefix: '≈', label: 'duplicate tests after fingerprinting' },
    ],
    delta: {
      title: 'hybrid scoring pipeline · batched',
      note: 'lower is better',
      rows: [{ label: 'token cost per test, indexed (before = 100)', before: 100, after: 35, unit: '' }],
    },
  },
]

/** Act III — Respan modules (public-resume level only; no client names). */
export const frontierModules = [
  {
    cmd: 'eval --production',
    title: 'LLM evaluation systems, shipped',
    body: 'Production evaluation systems for two enterprise clients: an enterprise fintech agent graded on 7 behavioral and safety criteria across 6 datasets and 7 LLM-judge pipelines, and a multi-tenant extraction pipeline with 30+ graders and per-customer scoring.',
  },
  {
    cmd: 'guard --runtime',
    title: 'Runtime permission layer',
    body: 'Every action the agent takes is validated against scope and safety policies before execution — blocking out-of-scope and destructive operations across 5,000+ daily LLM calls.',
  },
  {
    cmd: 'palette --cmd-k',
    title: 'The Cmd-K palette',
    body: 'Sub-100ms search over 6 resource types; 3+ clicks collapsed to one keystroke; 93% active-user adoption in 28 days. The palette on this site is its descendant — press ⌘K.',
  },
  {
    cmd: 'perf --n-plus-one',
    title: 'O(N) → O(1)',
    body: 'Eliminated an N+1 query pattern on the experiments endpoint by reusing the codebase’s bulk-resolution pattern instead of per-row lookups — shipped across React/TypeScript and Django/DRF.',
  },
  {
    cmd: 'bench --frontier',
    title: 'Frontier-model benchmarking',
    body: 'Benchmarked Opus 4.8, GPT-5.6 and Fable 5 across 250+ prompts on latency, cost, accuracy and inference configs before gateway onboarding — and built the platform’s gateway-setup CLI.',
  },
] as const

export const resumeHref = 'resume.html'
