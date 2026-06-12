'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ScoreBar } from '@/components/shared/ScoreBar'
import { ImpactBadge } from '@/components/shared/ImpactBadge'
import { SignalBadge } from './SignalBadge'
import { fadeUp } from '@/lib/animations'
import { cn } from '@/lib/utils'
import type { Prospect } from '@/lib/schemas/prospect'

interface ProspectCardProps {
  prospect: Prospect
  searchId: string
  rank: number
}

export function ProspectCard({ prospect, searchId, rank }: ProspectCardProps) {
  const score = prospect.scores?.overallScore ?? 0
  const urgency = prospect.scores?.urgency ?? 'Medium'
  const visibleSignals = prospect.signals.slice(0, 3)
  const extraSignals = prospect.signals.length - 3

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="group rounded-2xl border border-white/8 bg-mid/70 backdrop-blur-sm p-5 flex flex-col gap-4 hover:border-white/15 transition-colors duration-200 shadow-card"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span
              className={cn(
                'text-xs font-display font-bold px-1.5 py-0.5 rounded-md',
                rank <= 3
                  ? 'bg-teal/15 text-teal'
                  : 'bg-white/8 text-cream/40'
              )}
            >
              #{String(rank).padStart(2, '0')}
            </span>
          </div>
          <h3 className="font-display font-bold text-lg text-cream leading-tight truncate">
            {prospect.name}
          </h3>
          <a
            href={`https://${prospect.domain}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-teal/70 text-xs font-sans hover:text-teal transition-colors duration-150 flex items-center gap-1 mt-0.5"
          >
            {prospect.domain}
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
            </svg>
          </a>
        </div>
        <ImpactBadge urgency={urgency} className="flex-shrink-0" />
      </div>

      {/* Location + size */}
      <div className="flex items-center gap-3 text-xs text-cream/40 font-sans">
        <span className="flex items-center gap-1">
          <PinIcon />
          {prospect.location}
        </span>
        <span>·</span>
        <span>{prospect.estimatedSize} employees</span>
      </div>

      {/* Score bar */}
      <ScoreBar score={score} label="Match Score" />

      {/* Signals */}
      {visibleSignals.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {visibleSignals.map((s) => (
            <SignalBadge key={s.id} signal={s} />
          ))}
          {extraSignals > 0 && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-sans bg-white/6 text-cream/40">
              +{extraSignals} more
            </span>
          )}
        </div>
      )}

      {/* Why good fit */}
      <p className="text-xs text-cream/50 font-sans italic leading-relaxed line-clamp-2">
        {prospect.whyGoodFit}
      </p>

      {/* CTA */}
      <Link
        href={`/prospect/${searchId}/${prospect.id}`}
        className={cn(
          'mt-auto w-full py-2.5 rounded-xl text-sm font-sans font-medium text-center',
          'border border-white/10 text-cream/60',
          'group-hover:border-orange/40 group-hover:text-orange group-hover:bg-orange/5',
          'transition-all duration-200',
          'flex items-center justify-center gap-1.5'
        )}
      >
        View Full Report
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </Link>
    </motion.div>
  )
}

function PinIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

export default ProspectCard
