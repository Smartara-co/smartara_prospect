import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getSearch } from '@/lib/storage'
import Papa from 'papaparse'
import type { ExportRow } from '@/lib/schemas/export'

export const dynamic = 'force-dynamic'

const RequestSchema = z.object({
  searchId: z.string().min(1),
  format: z.enum(['csv', 'excel']),
})

function buildRows(search: Awaited<ReturnType<typeof getSearch>>): ExportRow[] {
  if (!search) return []
  return search.prospects.map((p, i) => ({
    rank: i + 1,
    name: p.name,
    domain: p.domain,
    industry: p.industry,
    location: p.location,
    size: p.estimatedSize,
    overallScore: p.scores?.overallScore ?? 0,
    fitScore: p.scores?.fitScore ?? 0,
    opportunityScore: p.scores?.opportunityScore ?? 0,
    urgency: p.scores?.urgency ?? 'Unknown',
    signals: p.signals.map((s) => s.label).join(', '),
    painPoints: p.painPoints.join(', '),
    decisionMaker: p.decisionMaker ?? '',
    recommendedAction: p.scores?.recommendedAction ?? '',
    whyGoodFit: p.whyGoodFit,
  }))
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const parsed = RequestSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 422 })
  }

  const { searchId, format } = parsed.data
  const search = await getSearch(searchId)

  if (!search) {
    return NextResponse.json({ error: 'Search not found' }, { status: 404 })
  }

  const rows = buildRows(search)
  const filename = `smartara-prospects-${searchId.slice(0, 8)}`

  if (format === 'csv') {
    const csv = Papa.unparse(rows)
    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="${filename}.csv"`,
      },
    })
  }

  // Excel
  const ExcelJS = (await import('exceljs')).default
  const workbook = new ExcelJS.Workbook()
  const sheet = workbook.addWorksheet('Prospects')

  sheet.columns = [
    { header: 'Rank', key: 'rank', width: 6 },
    { header: 'Company', key: 'name', width: 28 },
    { header: 'Domain', key: 'domain', width: 24 },
    { header: 'Industry', key: 'industry', width: 24 },
    { header: 'Location', key: 'location', width: 22 },
    { header: 'Size', key: 'size', width: 12 },
    { header: 'Overall Score', key: 'overallScore', width: 14 },
    { header: 'Fit Score', key: 'fitScore', width: 12 },
    { header: 'Opportunity', key: 'opportunityScore', width: 14 },
    { header: 'Urgency', key: 'urgency', width: 12 },
    { header: 'Signals', key: 'signals', width: 40 },
    { header: 'Pain Points', key: 'painPoints', width: 40 },
    { header: 'Decision Maker', key: 'decisionMaker', width: 24 },
    { header: 'Recommended Action', key: 'recommendedAction', width: 40 },
    { header: 'Why Good Fit', key: 'whyGoodFit', width: 40 },
  ]

  const headerRow = sheet.getRow(1)
  headerRow.eachCell((cell) => {
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF0D1526' },
    }
    cell.font = { color: { argb: 'FFFF5C2E' }, bold: true }
    cell.alignment = { vertical: 'middle' }
  })
  headerRow.height = 22

  rows.forEach((row) => {
    const r = sheet.addRow(row)
    r.alignment = { wrapText: true, vertical: 'top' }

    const urgencyCell = r.getCell('urgency')
    if (row.urgency === 'High') urgencyCell.font = { color: { argb: 'FFFF5C2E' } }
    if (row.urgency === 'Medium') urgencyCell.font = { color: { argb: 'FF00C9A7' } }
  })

  const buffer = await workbook.xlsx.writeBuffer()

  return new NextResponse(buffer, {
    headers: {
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="${filename}.xlsx"`,
    },
  })
}
