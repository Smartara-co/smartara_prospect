'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Logo } from '@/components/shared/Logo'
import { ProspectHeader } from './ProspectHeader'
import { ResearchReport } from './ResearchReport'
import { OpportunitySignals } from './OpportunitySignals'
import { OutreachPanel } from './OutreachPanel'
import { ProspectCardSkeleton } from '@/components/shared/Skeleton'
import type { Prospect } from '@/lib/schemas/prospect'

interface ProspectReportClientProps {
  initialProspect: Prospect
  searchId: string
}

export function ProspectReportClient({ initialProspect, searchId }: ProspectReportClientProps) {
  const [prospect, setProspect] = useState<Prospect>(initialProspect)
  const [generating, setGenerating] = useState(!initialProspect.report)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (prospect.report && prospect.outreach) return

    async function generate() {
      setGenerating(true)
      try {
        const res = await fetch('/api/prospect/report', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ searchId, prospectId: prospect.id }),
        })
        const data = await res.json()
        if (data.success && data.prospect) {
          setProspect(data.prospect)
        } else {
          setError(data.error ?? 'Failed to generate report. Please try again.')
        }
      } catch {
        setError('Network error while generating report.')
      } finally {
        setGenerating(false)
      }
    }

    generate()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="min-h-screen bg-navy grid-theme">
      {/* Ambient glows */}
      <div
        className="fixed top-0 right-0 w-[700px] h-[500px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at top right, rgba(255,92,46,0.07) 0%, transparent 60%)',
        }}
      />
      <div
        className="fixed bottom-0 left-0 w-[500px] h-[400px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at bottom left, rgba(0,201,167,0.05) 0%, transparent 60%)',
        }}
      />

      <div className="relative max-w-5xl mx-auto px-6 py-10">
        {/* Top nav */}
        <div className="flex items-center justify-between mb-8">
          <Logo size="sm" />
          <Link
            href={`/search/${searchId}`}
            className="text-xs text-cream/40 hover:text-cream/70 font-sans flex items-center gap-1.5 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to results
          </Link>
        </div>

        {/* Prospect header */}
        <ProspectHeader prospect={prospect} />

        {generating ? (
          <GeneratingState />
        ) : error ? (
          <ErrorState message={error} onRetry={() => window.location.reload()} />
        ) : prospect.report && prospect.outreach ? (
          <div className="grid gap-8">
            <ResearchReport report={prospect.report} />
            <OpportunitySignals
              signals={prospect.signals}
              painPoints={prospect.painPoints}
            />
            <OutreachPanel outreach={prospect.outreach} />
          </div>
        ) : null}
      </div>
    </div>
  )
}

function GeneratingState() {
  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-white/8 bg-mid/60 p-8 text-center space-y-4">
        <div className="flex justify-center">
          <div className="relative">
            <svg width="48" height="48" viewBox="0 0 80 80" fill="none" className="animate-float">
              <rect width="80" height="80" rx="20" fill="#182036" />
              <path
                d="M22 30C22 25.6 25.6 22 30 22H50C54.4 22 58 25.6 58 30C58 34.4 54.4 38 50 38H30C25.6 38 22 41.6 22 46C22 50.4 25.6 54 30 54H50C54.4 54 58 50.4 58 46"
                stroke="white"
                strokeWidth="5.5"
                strokeLinecap="round"
              />
              <circle cx="22" cy="30" r="5" fill="#FF5C2E" />
              <circle cx="58" cy="46" r="5" fill="#00C9A7" />
            </svg>
          </div>
        </div>
        <div>
          <p className="font-display font-bold text-xl text-cream">
            Generating intelligence brief…
          </p>
          <p className="text-cream/40 text-sm font-sans mt-1">
            AI is researching this company and writing personalised outreach. Takes about 30 seconds.
          </p>
        </div>
        <div className="w-full max-w-xs mx-auto h-1 rounded-full bg-white/10 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-orange to-teal rounded-full animate-shimmer bg-[length:200%_100%]" />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <ProspectCardSkeleton />
        <ProspectCardSkeleton />
      </div>
    </div>
  )
}

function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="rounded-2xl border border-orange/20 bg-orange/5 p-8 text-center space-y-4">
      <p className="font-display font-bold text-xl text-cream">Report generation failed</p>
      <p className="text-cream/50 text-sm font-sans">{message}</p>
      <button
        onClick={onRetry}
        className="px-6 py-2.5 rounded-xl bg-orange text-white text-sm font-sans font-medium hover:bg-orange/90 transition-colors"
      >
        Try again
      </button>
    </div>
  )
}

export default ProspectReportClient
