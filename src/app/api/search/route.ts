import { NextRequest, NextResponse } from 'next/server'
import { SearchInputSchema } from '@/lib/schemas'
import { runProspectDiscovery } from '@/lib/ai/orchestrator'
import { saveSearch } from '@/lib/storage'

export const dynamic = 'force-dynamic'
export const maxDuration = 300

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = SearchInputSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: parsed.error.issues[0]?.message ?? 'Invalid input',
          code: 'INVALID_INPUT',
        },
        { status: 422 }
      )
    }

    const search = await runProspectDiscovery(parsed.data)
    await saveSearch(search)

    return NextResponse.json({ success: true, searchId: search.id, search })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'

    if (message.includes('Discovery step failed') || message.includes('No companies')) {
      return NextResponse.json(
        { success: false, error: message, code: 'AI_FAILED' },
        { status: 503 }
      )
    }

    console.error('[/api/search] Error:', err)
    return NextResponse.json(
      { success: false, error: 'Something went wrong. Please try again.', code: 'UNKNOWN' },
      { status: 500 }
    )
  }
}
