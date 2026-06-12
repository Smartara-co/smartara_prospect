'use client'

import Link from 'next/link'
import { Logo } from '@/components/shared/Logo'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className="min-h-screen bg-navy grid-theme flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center space-y-6">
        <Logo className="justify-center" />
        <h1 className="font-display font-extrabold text-3xl text-cream">
          Something went wrong
        </h1>
        <p className="text-cream/50 font-sans text-sm">
          {error.message || 'An unexpected error occurred.'}
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={reset}
            className="px-6 py-2.5 rounded-xl bg-orange text-white text-sm font-sans font-medium hover:bg-orange/90 transition-colors"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-6 py-2.5 rounded-xl border border-white/15 text-cream/60 text-sm font-sans hover:text-cream hover:border-white/30 transition-colors"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  )
}
