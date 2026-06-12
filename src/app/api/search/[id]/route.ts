import { NextRequest, NextResponse } from 'next/server'
import { getSearch } from '@/lib/storage'

export const dynamic = 'force-dynamic'

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const search = await getSearch(params.id)

  if (!search) {
    return NextResponse.json({ error: 'Search not found' }, { status: 404 })
  }

  return NextResponse.json(search)
}
