import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getSearch, patchProspectReport } from '@/lib/storage'
import { runProspectReport } from '@/lib/ai/orchestrator'

export const dynamic = 'force-dynamic'
export const maxDuration = 300

const RequestSchema = z.object({
  searchId: z.string().min(1),
  prospectId: z.string().min(1),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = RequestSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: 'Invalid request', code: 'INVALID_INPUT' },
        { status: 422 }
      )
    }

    const { searchId, prospectId } = parsed.data
    const search = await getSearch(searchId)

    if (!search) {
      return NextResponse.json(
        { success: false, error: 'Search not found', code: 'NOT_FOUND' },
        { status: 404 }
      )
    }

    const prospect = search.prospects.find((p) => p.id === prospectId)

    if (!prospect) {
      return NextResponse.json(
        { success: false, error: 'Prospect not found', code: 'NOT_FOUND' },
        { status: 404 }
      )
    }

    // Return cached report if already generated
    if (prospect.report && prospect.outreach) {
      return NextResponse.json({ success: true, prospect })
    }

    const { report, outreach } = await runProspectReport(prospect, search.input)
    const updated = await patchProspectReport(searchId, prospectId, report, outreach)

    const updatedProspect = updated?.prospects.find((p) => p.id === prospectId)

    return NextResponse.json({ success: true, prospect: updatedProspect })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('[/api/prospect/report] Error:', err)
    return NextResponse.json(
      { success: false, error: message, code: 'AI_FAILED' },
      { status: 503 }
    )
  }
}
