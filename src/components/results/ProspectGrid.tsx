'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ProspectCard } from './ProspectCard'
import { staggerContainer } from '@/lib/animations'
import type { Prospect } from '@/lib/schemas/prospect'

type SortKey = 'overall' | 'fit' | 'opportunity' | 'urgency'

interface ProspectGridProps {
  prospects: Prospect[]
  searchId: string
}

const urgencyOrder = { High: 0, Medium: 1, Low: 2 }

export function ProspectGrid({ prospects, searchId }: ProspectGridProps) {
  const [sort, setSort] = useState<SortKey>('overall')

  const sorted = [...prospects].sort((a, b) => {
    if (sort === 'overall') return (b.scores?.overallScore ?? 0) - (a.scores?.overallScore ?? 0)
    if (sort === 'fit') return (b.scores?.fitScore ?? 0) - (a.scores?.fitScore ?? 0)
    if (sort === 'opportunity') return (b.scores?.opportunityScore ?? 0) - (a.scores?.opportunityScore ?? 0)
    if (sort === 'urgency')
      return (urgencyOrder[a.scores?.urgency ?? 'Low']) - (urgencyOrder[b.scores?.urgency ?? 'Low'])
    return 0
  })

  return (
    <div>
      {/* Sort controls */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        <span className="text-xs text-cream/40 font-sans uppercase tracking-widest">Sort by</span>
        {(
          [
            { key: 'overall', label: 'Overall Score' },
            { key: 'fit', label: 'Fit Score' },
            { key: 'opportunity', label: 'Opportunity' },
            { key: 'urgency', label: 'Urgency' },
          ] as { key: SortKey; label: string }[]
        ).map((opt) => (
          <button
            key={opt.key}
            onClick={() => setSort(opt.key)}
            className={`px-3 py-1 rounded-full text-xs font-sans transition-colors duration-150 ${
              sort === opt.key
                ? 'bg-orange text-white'
                : 'bg-white/8 text-cream/50 hover:text-cream hover:bg-white/12'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {sorted.map((p, i) => (
          <ProspectCard
            key={p.id}
            prospect={p}
            searchId={searchId}
            rank={i + 1}
          />
        ))}
      </motion.div>
    </div>
  )
}

export default ProspectGrid
