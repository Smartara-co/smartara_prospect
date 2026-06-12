'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { getScoreColor } from '@/lib/utils'

interface ScoreBarProps {
  score: number
  label?: string
  className?: string
  showValue?: boolean
}

const barColors = {
  teal: 'bg-teal',
  orange: 'bg-orange',
  gray: 'bg-white/25',
}

export function ScoreBar({ score, label, className, showValue = true }: ScoreBarProps) {
  const color = getScoreColor(score)
  const pct = (score / 10) * 100

  return (
    <div className={cn('w-full', className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between mb-1.5">
          {label && (
            <span className="text-xs text-cream/50 font-sans uppercase tracking-widest">
              {label}
            </span>
          )}
          {showValue && (
            <span
              className={cn(
                'text-xs font-display font-bold',
                color === 'teal' ? 'text-teal' : color === 'orange' ? 'text-orange' : 'text-cream/40'
              )}
            >
              {score.toFixed(1)}
            </span>
          )}
        </div>
      )}
      <div className="relative h-1.5 w-full rounded-full bg-white/8 overflow-hidden">
        <motion.div
          className={cn('h-full rounded-full', barColors[color])}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  )
}

export default ScoreBar
