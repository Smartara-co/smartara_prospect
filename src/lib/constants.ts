export const INDUSTRIES = [
  'Recruitment Agency',
  'Marketing Agency',
  'Digital Agency',
  'SEO Agency',
  'Branding Agency',
  'AI / Automation Agency',
  'Software Development Agency',
  'Consulting Firm',
  'Law Firm',
  'Accounting Firm',
  'SaaS / Tech',
  'E-commerce',
  'Healthcare',
  'Real Estate',
  'Financial Services',
  'Construction',
  'Logistics',
  'Education',
  'Other',
]

export const SIGNAL_TYPES = {
  growth: {
    label: 'Growth Signal',
    color: 'teal' as const,
    description: 'Company expanding, hiring, or scaling',
  },
  pain: {
    label: 'Pain Point',
    color: 'orange' as const,
    description: 'Clear operational challenge detected',
  },
  trigger: {
    label: 'Buying Trigger',
    color: 'signal-blue' as const,
    description: 'Recent event indicates purchase intent',
  },
  budget: {
    label: 'Budget Signal',
    color: 'teal' as const,
    description: 'Investment or funding activity',
  },
  tech: {
    label: 'Tech Gap',
    color: 'orange' as const,
    description: 'Missing technology or outdated tooling',
  },
}

export const PROSPECT_STEPS = {
  1: { label: 'Finding companies…', duration: 12000 },
  2: { label: 'Analysing buying signals…', duration: 15000 },
  3: { label: 'Scoring opportunity fit…', duration: 10000 },
  4: { label: 'Ranking your prospects…', duration: 8000 },
} as const

export const URGENCY_STYLES = {
  High: { label: 'High Priority', bg: 'bg-orange/15', text: 'text-orange', dot: 'bg-orange' },
  Medium: { label: 'Medium Priority', bg: 'bg-teal/15', text: 'text-teal', dot: 'bg-teal' },
  Low: { label: 'Low Priority', bg: 'bg-white/10', text: 'text-white/60', dot: 'bg-white/40' },
}

export const SCORE_THRESHOLDS = {
  excellent: 8.0,
  strong: 7.0,
  good: 5.0,
  moderate: 3.0,
} as const

export const NAV_LINKS = [
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#features', label: 'Features' },
]
