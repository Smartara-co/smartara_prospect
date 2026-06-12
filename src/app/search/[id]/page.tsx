import { notFound } from 'next/navigation'
import { getSearch } from '@/lib/storage'
import { ResultsClient } from '@/components/results/ResultsClient'

interface SearchPageProps {
  params: { id: string }
}

export default async function SearchPage({ params }: SearchPageProps) {
  const search = await getSearch(params.id)

  if (!search) {
    notFound()
  }

  return <ResultsClient search={search} />
}

export const dynamic = 'force-dynamic'
