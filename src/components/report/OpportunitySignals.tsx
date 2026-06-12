'use client'

import { motion } from 'framer-motion'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { SignalBadge } from '@/components/results/SignalBadge'
import { fadeUp, staggerContainer } from '@/lib/animations'
import { SIGNAL_TYPES } from '@/lib/constants'
import type { Signal } from '@/lib/schemas/signals'

interface OpportunitySignalsProps {
  signals: Signal[]
  painPoints: string[]
}

export function OpportunitySignals({ signals, painPoints }: OpportunitySignalsProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <motion.div variants={fadeUp}>
        <SectionLabel accent="orange" className="mb-6">
          Buying Signals
        </SectionLabel>
      </motion.div>

      {/* Signals grid */}
      <div className="grid gap-3 sm:grid-cols-2">
        {signals.map((signal) => {
          const type = SIGNAL_TYPES[signal.type]
          const isHigh = signal.strength === 'High'
          return (
            <motion.div
              key={signal.id}
              variants={fadeUp}
              className="rounded-xl border border-white/8 bg-mid/40 p-4 space-y-2.5"
            >
              <div className="flex items-start justify-between gap-2">
                <SignalBadge signal={signal} />
                <span
                  className={`text-[10px] font-sans font-medium px-2 py-0.5 rounded-full ${
                    isHigh
                      ? 'bg-orange/12 text-orange'
                      : signal.strength === 'Medium'
                      ? 'bg-teal/12 text-teal'
                      : 'bg-white/8 text-cream/40'
                  }`}
                >
                  {signal.strength}
                </span>
              </div>
              <p className="text-xs text-cream/60 font-sans leading-relaxed">
                {signal.detail}
              </p>
              <p className="text-[10px] text-cream/30 font-sans uppercase tracking-widest">
                {type.description}
              </p>
            </motion.div>
          )
        })}
      </div>

      {/* Pain Points */}
      {painPoints.length > 0 && (
        <motion.div variants={fadeUp} className="rounded-xl border border-white/8 bg-mid/40 p-5">
          <h3 className="text-sm font-display font-bold text-cream mb-3">Pain Points</h3>
          <ul className="space-y-2">
            {painPoints.map((p, i) => (
              <li key={i} className="flex items-start gap-3 text-sm font-sans text-cream/60">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-orange/60 flex-shrink-0" />
                {p}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.div>
  )
}

export default OpportunitySignals
