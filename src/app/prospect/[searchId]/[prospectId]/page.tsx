import { notFound } from 'next/navigation'
import { getSearch } from '@/lib/storage'
import { ProspectReportClient } from '@/components/report/ProspectReportClient'

interface ProspectPageProps {
  params: { searchId: string; prospectId: string }
}

export default async function ProspectPage({ params }: ProspectPageProps) {
  const search = await getSearch(params.searchId)

  if (!search) notFound()

  const prospect = search.prospects.find((p) => p.id === params.prospectId)

  if (!prospect) notFound()

  return (
    <ProspectReportClient
      initialProspect={prospect}
      searchId={params.searchId}
    />
  )
}

export const dynamic = 'force-dynamic'
