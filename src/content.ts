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
  | { kind: 'ready'; text: string }

export const bootLines: BootLine[] = [
  { kind: 'cmd', text: './saksham --init' },
  { kind: 'log', text: 'mounting /education', status: '[ok]', note: 'cs + statistics @ uiuc · gpa 3.96' },
  { kind: 'log', text: 'loading systems engineer', status: '[ok]' },
  { kind: 'log', text: 'loading ai researcher', status: '[ok]' },
  { kind: 'log', text: 'importing 5 internships', status: '[ok]' },
  { kind: 'log', text: 'importing 1 publication', status: '[ok]', note: "innosphere'23 · sigma xi" },
  { kind: 'log', text: 'locating ~£1B', status: '[found]' },
  { kind: 'ready', text: 'ready.' },
]

/** Act II — internships in chronological order: rising mastery. */
export const craftChapters = [
  {
    id: 'jsw',
    company: 'JSW Group',
    role: 'Machine Learning Intern',
    where: 'Mumbai, India',
    when: 'Apr — Jun 2024',
    thread: 'Learn the machine.',
    stats: [
      { value: 60, label: 'weather stations', format: '' },
      { value: 15, label: 'years of data', format: '' },
      { value: 18, label: 'RMSE reduction vs seasonal-naive', format: '-%' },
    ],
  },
  {
    id: 'barclays',
    company: 'Barclays',
    role: 'Data & Decision Analyst · Analytics Center of Excellence',
    where: 'Noida, India & London, UK',
    when: 'May — Jul 2025',
    thread: 'Scale the question.',
    stats: [
      { value: 845, label: 'allocated across the book', format: '£M' },
      { value: 20, label: 'customers, six domains', format: 'M+' },
      { value: 1, label: 'profit surfaced in the top decile', format: '~£B' },
    ],
  },
  {
    id: 'beacons',
    company: 'Beacons AI',
    role: 'Software Product Manager · YC S19',
    where: 'Champaign, IL',
    when: 'Oct 2025 — Feb 2026',
    thread: 'Ship to humans.',
    stats: [
      { value: 200, label: 'matches per week, sustained', format: '+' },
      { value: 27, label: 'match acceptance, up from 21%', format: '%' },
      { value: 28, label: 'median time-to-first-match', format: '-%' },
    ],
  },
  {
    id: 'metafrazo',
    company: 'MetaFrazo',
    role: 'Software Engineer Intern (AI) · Phraze',
    where: 'Chicago, IL · Remote',
    when: 'Jan — May 2026',
    thread: 'Make AI measurable.',
    stats: [
      { value: 0.76, label: "Cohen's κ vs human QA", format: 'k' },
      { value: 65, label: 'per-test token cost', format: '-%' },
      { value: 0, label: 'duplicate tests, from deterministic seeding', format: '~' },
    ],
  },
] as const

/** Act III — Respan modules (public-resume level only). */
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
