'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Logo } from '@/components/shared/Logo'
import type { SearchResult } from '@/lib/schemas'

interface ResultsHeaderProps {
  search: SearchResult
}

export function ResultsHeader({ search }: ResultsHeaderProps) {
  const [exporting, setExporting] = useState<'csv' | 'excel' | null>(null)

  async function handleExport(format: 'csv' | 'excel') {
    setExporting(format)
    try {
      const res = await fetch('/api/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ searchId: search.id, format }),
      })
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `smartara-prospects-${search.id.slice(0, 8)}.${format === 'csv' ? 'csv' : 'xlsx'}`
      a.click()
      URL.revokeObjectURL(url)
    } finally {
      setExporting(null)
    }
  }

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
      <div className="flex items-center gap-4">
        <Logo size="sm" />
        <div className="h-5 w-px bg-white/15" />
        <div>
          <p className="text-xs text-cream/40 font-sans uppercase tracking-widest mb-1">
            Results
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <Chip>{search.input.industry}</Chip>
            <Chip>{search.input.location}</Chip>
            <span className="text-cream/30 text-xs font-sans">
              {search.prospects.length} prospects
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={() => handleExport('csv')}
          disabled={!!exporting}
          className="px-4 py-2 rounded-xl text-xs font-sans font-medium bg-white/8 text-cream/60 hover:text-cream hover:bg-white/12 transition-colors duration-150 disabled:opacity-50 flex items-center gap-1.5"
        >
          <DownloadIcon />
          {exporting === 'csv' ? 'Exporting…' : 'CSV'}
        </button>
        <button
          onClick={() => handleExport('excel')}
          disabled={!!exporting}
          className="px-4 py-2 rounded-xl text-xs font-sans font-medium bg-teal/10 text-teal hover:bg-teal/15 transition-colors duration-150 disabled:opacity-50 flex items-center gap-1.5"
        >
          <DownloadIcon />
          {exporting === 'excel' ? 'Exporting…' : 'Excel'}
        </button>
        <Link
          href="/"
          className="px-4 py-2 rounded-xl text-xs font-sans font-medium bg-white/6 text-cream/40 hover:text-cream/70 hover:bg-white/10 transition-colors duration-150"
        >
          ← New search
        </Link>
      </div>
    </div>
  )
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-sans bg-white/8 text-cream/70">
      {children}
    </span>
  )
}

function DownloadIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
    </svg>
  )
}

export default ResultsHeader
