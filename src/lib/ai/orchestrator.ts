import { generateId } from '@/lib/utils'
import { callAI, parseJSON } from './client'
import { MODELS } from './models'
import { buildDiscoveryPrompt } from './prompts/step1-discovery'
import { buildSignalsPrompt } from './prompts/step2-signals'
import { buildScorePrompt } from './prompts/step3-score'
import { buildReportPrompt } from './prompts/step4-report'
import { buildOutreachPrompt } from './prompts/step5-outreach'
import {
  ProspectSchema,
  ProspectReportSchema,
} from '@/lib/schemas/prospect'
import { OutreachPackageSchema } from '@/lib/schemas/outreach'
import type { SearchInput, SearchResult } from '@/lib/schemas'
import type { Prospect, ProspectReport } from '@/lib/schemas/prospect'
import type { OutreachPackage } from '@/lib/schemas/outreach'

export async function runProspectDiscovery(
  input: SearchInput
): Promise<SearchResult> {
  const searchId = generateId()
  const createdAt = new Date().toISOString()

  // Step 1: Discover companies
  const discPrompt = buildDiscoveryPrompt(input)
  const discText = await callAI(
    [
      { role: 'system', content: discPrompt.system },
      { role: 'user', content: discPrompt.user },
    ],
    MODELS.discovery,
    { temperature: 0.8 }
  )

  let rawCompanies: Prospect[] = []
  try {
    const parsed = parseJSON<unknown[]>(discText)
    rawCompanies = parsed
      .map((c, i) => {
        const result = ProspectSchema.safeParse({ id: `p${i + 1}`, ...c as object })
        return result.success ? result.data : null
      })
      .filter(Boolean) as Prospect[]
  } catch (e) {
    console.error('[Discovery] Parse failed. Raw AI response (first 500 chars):', discText?.slice(0, 500))
    console.error('[Discovery] Parse error:', e)
    throw new Error('Discovery step failed to return valid company data.')
  }

  if (rawCompanies.length === 0) {
    throw new Error('No companies were discovered. Please try again.')
  }

  // Step 2: Enrich with signals
  const sigPrompt = buildSignalsPrompt(
    rawCompanies.map((c) => ({
      id: c.id,
      name: c.name,
      industry: c.industry,
      description: c.description,
    })),
    input
  )
  const sigText = await callAI(
    [
      { role: 'system', content: sigPrompt.system },
      { role: 'user', content: sigPrompt.user },
    ],
    MODELS.signals,
    { temperature: 0.7 }
  )

  try {
    const sigData = parseJSON<Array<{
      companyId: string
      signals: unknown[]
      painPoints: string[]
      decisionMaker?: string
    }>>(sigText)

    for (const s of sigData) {
      const company = rawCompanies.find((c) => c.id === s.companyId)
      if (!company) continue
      company.signals = (s.signals ?? []).map((sig, i) => ({
        id: `sig-${company.id}-${i}`,
        ...(sig as object),
      })) as Prospect['signals']
      company.painPoints = s.painPoints ?? []
      company.decisionMaker = s.decisionMaker ?? null
    }
  } catch {
    // signals failed — continue without enrichment
  }

  // Step 3: Score and rank
  const scorePrompt = buildScorePrompt(
    rawCompanies.map((c) => ({
      id: c.id,
      name: c.name,
      industry: c.industry,
      estimatedSize: c.estimatedSize,
      description: c.description,
      whyGoodFit: c.whyGoodFit,
      signals: c.signals.map((s) => ({
        type: s.type,
        label: s.label,
        strength: s.strength,
      })),
      painPoints: c.painPoints,
    })),
    input
  )
  const scoreText = await callAI(
    [
      { role: 'system', content: scorePrompt.system },
      { role: 'user', content: scorePrompt.user },
    ],
    MODELS.scoring,
    { temperature: 0.3 }
  )

  try {
    const scoreData = parseJSON<Array<{
      companyId: string
      overallScore: number
      fitScore: number
      opportunityScore: number
      scoreRationale: string
      urgency: string
      recommendedAction: string
    }>>(scoreText)

    for (const s of scoreData) {
      const company = rawCompanies.find((c) => c.id === s.companyId)
      if (!company) continue
      company.scores = {
        overallScore: s.overallScore ?? 5,
        fitScore: s.fitScore ?? 5,
        opportunityScore: s.opportunityScore ?? 5,
        scoreRationale: s.scoreRationale ?? '',
        urgency: (s.urgency as 'High' | 'Medium' | 'Low') ?? 'Medium',
        recommendedAction: s.recommendedAction ?? '',
      }
    }
  } catch {
    // scoring failed — assign default scores
    rawCompanies.forEach((c) => {
      if (!c.scores) {
        c.scores = {
          overallScore: 5,
          fitScore: 5,
          opportunityScore: 5,
          scoreRationale: '',
          urgency: 'Medium',
          recommendedAction: '',
        }
      }
    })
  }

  // Sort by overall score descending
  rawCompanies.sort(
    (a, b) => (b.scores?.overallScore ?? 0) - (a.scores?.overallScore ?? 0)
  )

  return {
    id: searchId,
    version: '1.0',
    createdAt,
    input,
    status: 'complete',
    prospects: rawCompanies,
  }
}

export async function runProspectReport(
  prospect: Prospect,
  input: SearchInput
): Promise<{ report: ProspectReport; outreach: OutreachPackage }> {
  // Step 4: Deep research report
  const reportPrompt = buildReportPrompt(prospect, input)
  const reportText = await callAI(
    [
      { role: 'system', content: reportPrompt.system },
      { role: 'user', content: reportPrompt.user },
    ],
    MODELS.report,
    { temperature: 0.6, maxTokens: 3000 }
  )

  let report: ProspectReport
  try {
    const raw = parseJSON<unknown>(reportText)
    const result = ProspectReportSchema.safeParse(raw)
    if (!result.success) throw new Error('Report validation failed')
    report = result.data
  } catch {
    throw new Error('Failed to generate research report.')
  }

  // Step 5: Outreach messages
  const outreachPrompt = buildOutreachPrompt(prospect, report, input)
  const outreachText = await callAI(
    [
      { role: 'system', content: outreachPrompt.system },
      { role: 'user', content: outreachPrompt.user },
    ],
    MODELS.outreach,
    { temperature: 0.8, maxTokens: 4096 }
  )

  let outreach: OutreachPackage
  try {
    const raw = parseJSON<unknown>(outreachText)
    const result = OutreachPackageSchema.safeParse(raw)
    if (!result.success) throw new Error('Outreach validation failed')
    outreach = result.data
  } catch {
    throw new Error('Failed to generate outreach messages.')
  }

  return { report, outreach }
}
