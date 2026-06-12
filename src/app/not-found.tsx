import Link from 'next/link'
import { Logo } from '@/components/shared/Logo'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-navy grid-theme flex flex-col overflow-hidden">
      {/* Header */}
      <header className="px-6 py-5 flex-shrink-0">
        <Logo />
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-20 relative">
        {/* Ambient glows */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(255,92,46,0.06) 0%, rgba(0,201,167,0.04) 40%, transparent 70%)',
          }}
        />

        {/* Radar rings + S-mark */}
        <div className="relative flex items-center justify-center w-48 h-48 mb-2">
          {/* Three staggered rings */}
          <div
            className="absolute w-36 h-36 rounded-full border border-orange/35 animate-radarPing"
            style={{ animationDelay: '0s' }}
          />
          <div
            className="absolute w-36 h-36 rounded-full border border-teal/25 animate-radarPing"
            style={{ animationDelay: '0.8s' }}
          />
          <div
            className="absolute w-36 h-36 rounded-full border border-orange/15 animate-radarPing"
            style={{ animationDelay: '1.6s' }}
          />

          {/* S-mark */}
          <div className="relative z-10 animate-float">
            <svg width="64" height="64" viewBox="0 0 80 80" fill="none">
              <rect width="80" height="80" rx="20" fill="#182036" />
              <path
                d="M22 30C22 25.6 25.6 22 30 22H50C54.4 22 58 25.6 58 30C58 34.4 54.4 38 50 38H30C25.6 38 22 41.6 22 46C22 50.4 25.6 54 30 54H50C54.4 54 58 50.4 58 46"
                stroke="white"
                strokeWidth="5.5"
                strokeLinecap="round"
              />
              <circle cx="22" cy="30" r="5" fill="#FF5C2E">
                <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="58" cy="46" r="5" fill="#00C9A7">
                <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>
        </div>

        {/* 404 */}
        <p
          className="font-display font-extrabold leading-none tracking-tight mb-5 select-none"
          style={{
            fontSize: 'clamp(80px, 18vw, 160px)',
            background: 'linear-gradient(135deg, #FF5C2E 0%, #00C9A7 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          404
        </p>

        {/* Headline + body */}
        <div className="text-center space-y-3 mb-10 max-w-sm">
          <h1 className="font-display font-bold text-2xl text-cream">
            Signal lost.
          </h1>
          <p className="text-cream/45 font-sans text-sm leading-relaxed">
            This page isn&apos;t on our radar. The search may have expired,
            or the link is wrong.
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-orange text-white text-sm font-sans font-medium hover:bg-orange/90 hover:shadow-glow-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange/50 transition-all duration-200 active:scale-95"
          >
            Run a new search
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-cream/50 text-sm font-sans hover:text-cream hover:border-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 transition-all duration-200"
          >
            Go home
          </Link>
        </div>

        {/* Scan line across the whole page */}
        <div
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal/15 to-transparent animate-scanLine pointer-events-none"
          style={{ top: '50%' }}
        />
      </main>
    </div>
  )
}
