'use client'

import { motion } from 'framer-motion'
import { ScoreGauge } from '@/components/shared/ScoreGauge'
import { ImpactBadge } from '@/components/shared/ImpactBadge'
import { SignalBadge } from '@/components/results/SignalBadge'
import { fadeUp } from '@/lib/animations'
import type { Prospect } from '@/lib/schemas/prospect'

interface ProspectHeaderProps {
  prospect: Prospect
}

export function ProspectHeader({ prospect }: ProspectHeaderProps) {
  const score = prospect.scores?.overallScore ?? 0
  const urgency = prospect.scores?.urgency ?? 'Medium'

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="show"
      className="rounded-2xl border border-white/8 bg-mid/60 backdrop-blur-sm p-8 mb-8"
    >
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Company info */}
        <div className="flex-1 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="font-display font-extrabold text-3xl text-cream leading-tight mb-1">
                {prospect.name}
              </h1>
              <div className="flex items-center gap-3 text-sm text-cream/50 font-sans">
                <a
                  href={`https://${prospect.domain}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal hover:text-teal/80 flex items-center gap-1 transition-colors"
                >
                  {prospect.domain}
                  <ExternalIcon />
                </a>
                <span>·</span>
                <span>{prospect.industry}</span>
                <span>·</span>
                <span>{prospect.location}</span>
                <span>·</span>
                <span>{prospect.estimatedSize} employees</span>
              </div>
            </div>
            <ImpactBadge urgency={urgency} />
          </div>

          <p className="text-cream/60 font-sans text-sm leading-relaxed max-w-2xl">
            {prospect.description}
          </p>

          {/* Signals strip */}
          {prospect.signals.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {prospect.signals.map((s) => (
                <SignalBadge key={s.id} signal={s} />
              ))}
            </div>
          )}

          {/* Recommended action */}
          {prospect.scores?.recommendedAction && (
            <div className="flex items-start gap-3 rounded-xl bg-orange/8 border border-orange/15 px-4 py-3">
              <span className="text-orange mt-0.5 flex-shrink-0">
                <LightningIcon />
              </span>
              <div>
                <p className="text-xs text-orange/70 font-sans uppercase tracking-widest mb-0.5">
                  Recommended first action
                </p>
                <p className="text-sm text-cream/80 font-sans">
                  {prospect.scores.recommendedAction}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Score gauges */}
        <div className="flex items-center justify-center lg:justify-end gap-6 flex-shrink-0">
          <div className="text-center">
            <ScoreGauge score={score} size="lg" />
            <p className="text-xs text-cream/40 font-sans mt-2 uppercase tracking-widest">
              Match Score
            </p>
          </div>
          {prospect.scores && (
            <div className="flex flex-col gap-3">
              <ScoreGauge score={prospect.scores.fitScore} size="sm" label="Fit" />
              <ScoreGauge score={prospect.scores.opportunityScore} size="sm" label="Opportunity" />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

function ExternalIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
    </svg>
  )
}

function LightningIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  )
}

export default ProspectHeader
