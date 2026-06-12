'use client'

import { ResultsHeader } from './ResultsHeader'
import { ProspectGrid } from './ProspectGrid'
import type { SearchResult } from '@/lib/schemas'

interface ResultsClientProps {
  search: SearchResult
}

export function ResultsClient({ search }: ResultsClientProps) {
  return (
    <div className="min-h-screen bg-navy grid-theme">
      {/* Ambient glows */}
      <div
        className="fixed top-0 right-0 w-[600px] h-[400px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at top right, rgba(255,92,46,0.08) 0%, transparent 60%)',
        }}
      />
      <div
        className="fixed bottom-0 left-0 w-[400px] h-[300px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at bottom left, rgba(0,201,167,0.06) 0%, transparent 60%)',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 py-10">
        <ResultsHeader search={search} />
        <ProspectGrid prospects={search.prospects} searchId={search.id} />
      </div>
    </div>
  )
}

export default ResultsClient
