import dynamic from 'next/dynamic'
import { Logo } from '@/components/shared/Logo'
import { SearchForm } from '@/components/landing/SearchForm'
import { SectionLabel } from '@/components/shared/SectionLabel'

const HeroCanvasWrapper = dynamic(
  () => import('@/components/three/HeroCanvasWrapper'),
  { ssr: false }
)

const HOW_IT_WORKS = [
  {
    n: '01',
    title: 'Define your target',
    desc: 'Tell us the industry you sell to, where they are, what you offer, and your ideal client profile.',
    color: 'text-orange',
  },
  {
    n: '02',
    title: 'AI discovers companies',
    desc: 'We find 12 qualified prospect companies that match your ICP — no manual searching required.',
    color: 'text-teal',
  },
  {
    n: '03',
    title: 'Signals are detected',
    desc: 'Each company is analysed for buying signals — growth, tech gaps, pain points, and timing triggers.',
    color: 'text-orange',
  },
  {
    n: '04',
    title: 'Prospects are scored',
    desc: 'Every company gets a fit score, opportunity score, and urgency rating so you know where to focus.',
    color: 'text-teal',
  },
  {
    n: '05',
    title: 'Outreach is written',
    desc: 'Personalised cold email, LinkedIn message, follow-up sequence, and call script — ready to send.',
    color: 'text-orange',
  },
]

const FEATURES = [
  {
    icon: '◎',
    title: 'Buying Signal Detection',
    desc: 'Growth signals, technology gaps, hiring patterns, and trigger events — all analysed automatically.',
    accent: 'border-orange/20',
  },
  {
    icon: '◈',
    title: 'Opportunity Scores',
    desc: 'Every prospect gets a 0–10 score for ICP fit and buying opportunity. Focus on the best ones first.',
    accent: 'border-teal/20',
  },
  {
    icon: '◉',
    title: 'Personalised Outreach',
    desc: 'AI generates cold email, LinkedIn, follow-up sequence, and call script specific to each company.',
    accent: 'border-orange/20',
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-navy">
      {/* Grid background */}
      <div className="fixed inset-0 grid-theme opacity-60 pointer-events-none" />

      {/* Ambient glows */}
      <div
        className="fixed top-0 right-0 w-[800px] h-[600px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at top right, rgba(255,92,46,0.10) 0%, transparent 60%)',
        }}
      />
      <div
        className="fixed bottom-0 left-0 w-[600px] h-[500px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at bottom left, rgba(0,201,167,0.08) 0%, transparent 60%)',
        }}
      />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 max-w-6xl mx-auto">
        <Logo />
        <div className="flex items-center gap-6">
          <a
            href="#how-it-works"
            className="text-sm text-cream/50 hover:text-cream font-sans transition-colors duration-150 hidden sm:block"
          >
            How It Works
          </a>
          <a
            href="#features"
            className="text-sm text-cream/50 hover:text-cream font-sans transition-colors duration-150 hidden sm:block"
          >
            Features
          </a>
          <a
            href="#search"
            className="px-4 py-2 rounded-xl bg-orange text-white text-sm font-sans font-medium hover:bg-orange/90 transition-colors duration-150"
          >
            Get started
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-[92vh] flex items-center">
        {/* 3D Canvas — right half only */}
        <div className="absolute inset-y-0 right-0 w-1/2 hidden lg:block pointer-events-none">
          <HeroCanvasWrapper />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left — headline + stats */}
            <div>
              <SectionLabel className="mb-6">AI-Powered Prospect Discovery</SectionLabel>

              <h1 className="font-display font-extrabold text-5xl md:text-6xl lg:text-7xl text-cream leading-[1.0] tracking-tight mb-6">
                Find the companies
                <br />
                that{' '}
                <span className="text-orange">need you</span>
                <br />
                most.
              </h1>

              <p className="text-cream/60 font-sans text-lg leading-relaxed mb-10 max-w-md">
                Stop searching. Start prospecting. AI discovers your ideal clients,
                scores their buying intent, and writes your first message — in minutes.
              </p>

              <div className="flex items-center gap-6">
                <Stat value="12" label="prospects per search" />
                <div className="h-8 w-px bg-white/10" />
                <Stat value="5 min" label="average time" accent="teal" />
                <div className="h-8 w-px bg-white/10" />
                <Stat value="100%" label="personalised" />
              </div>
            </div>

            {/* Right — search form */}
            <div id="search">
              <SearchForm />
            </div>

          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <SectionLabel accent="teal" className="justify-center mb-4">
              The Process
            </SectionLabel>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl text-cream tracking-tight">
              From search to outreach
              <br />
              <span className="text-teal">in minutes.</span>
            </h2>
          </div>

          <div className="relative">
            {/* Connector line */}
            <div className="absolute left-6 top-8 bottom-8 w-px bg-gradient-to-b from-orange via-teal to-orange opacity-20 hidden md:block" style={{ left: 'calc(2.5rem + 1px)' }} />

            <div className="space-y-6">
              {HOW_IT_WORKS.map((step) => (
                <div
                  key={step.n}
                  className="flex gap-6 items-start"
                >
                  <div
                    className={`relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-mid border border-white/10 flex items-center justify-center text-xs font-display font-bold ${step.color}`}
                  >
                    {step.n}
                  </div>
                  <div className="rounded-2xl border border-white/8 bg-mid/40 px-6 py-5 flex-1">
                    <h3 className="font-display font-bold text-lg text-cream mb-1">
                      {step.title}
                    </h3>
                    <p className="text-cream/55 font-sans text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative py-24 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <SectionLabel className="justify-center mb-4">
              What You Get
            </SectionLabel>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl text-cream tracking-tight">
              Quality over quantity.
              <br />
              <span className="text-orange">Always.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className={`rounded-2xl border ${f.accent} bg-mid/50 p-7 space-y-4`}
              >
                <span className="text-3xl">{f.icon}</span>
                <h3 className="font-display font-bold text-xl text-cream">
                  {f.title}
                </h3>
                <p className="text-cream/55 font-sans text-sm leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 px-6 border-t border-white/5">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <SectionLabel className="justify-center">Start now</SectionLabel>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-cream tracking-tight">
            Find your next client
            <br />
            <span className="text-orange">before they find you.</span>
          </h2>
          <p className="text-cream/50 font-sans">
            No login required. No credit card. Fill in the form above and get 12 qualified
            prospects with personalised outreach in under 5 minutes.
          </p>
          <a
            href="#search"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-orange text-white font-display font-bold text-base hover:bg-orange/90 hover:shadow-glow-orange transition-all duration-200"
          >
            Find my prospects
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/5 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <Logo size="sm" />
          <p className="text-xs text-cream/30 font-sans">
            © {new Date().getFullYear()} Smartara. From idea to impact.
          </p>
          <div className="flex items-center gap-4">
            <a href="mailto:hello@smartara.co" className="text-xs text-cream/30 hover:text-cream/60 font-sans transition-colors">
              hello@smartara.co
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

function Stat({ value, label, accent }: { value: string; label: string; accent?: string }) {
  return (
    <div>
      <p className={`font-display font-extrabold text-2xl ${accent === 'teal' ? 'text-teal' : 'text-orange'}`}>
        {value}
      </p>
      <p className="text-xs text-cream/40 font-sans mt-0.5">{label}</p>
    </div>
  )
}
