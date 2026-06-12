import { z } from 'zod'
import { SignalSchema } from './signals'
import { OutreachPackageSchema } from './outreach'

export const ProspectScoreSchema = z.object({
  overallScore: z.number().min(0).max(10),
  fitScore: z.number().min(0).max(10),
  opportunityScore: z.number().min(0).max(10),
  scoreRationale: z.string(),
  urgency: z.enum(['High', 'Medium', 'Low']).catch('Medium'),
  recommendedAction: z.string(),
})
export type ProspectScore = z.infer<typeof ProspectScoreSchema>

export const KeyStakeholderSchema = z.object({
  title: z.string(),
  concern: z.string(),
  messagingAngle: z.string(),
})

export const ProspectReportSchema = z.object({
  executiveSummary: z.string(),
  companyBackground: z.string(),
  currentChallenges: z.array(z.string()),
  whyNow: z.string(),
  competitiveContext: z.string(),
  howServiceHelps: z.string(),
  keyStakeholders: z.array(KeyStakeholderSchema),
  riskFlags: z.array(z.string()),
  researchConfidence: z.enum(['High', 'Medium', 'Low']).catch('Medium'),
})
export type ProspectReport = z.infer<typeof ProspectReportSchema>

export const ProspectSchema = z.object({
  id: z.string(),
  name: z.string(),
  domain: z.string(),
  industry: z.string(),
  location: z.string(),
  estimatedSize: z
    .enum(['1-10', '11-50', '51-200', '201-500', '500+'])
    .catch('11-50'),
  description: z.string(),
  whyGoodFit: z.string(),
  signals: z.array(SignalSchema).default([]),
  painPoints: z.array(z.string()).default([]),
  decisionMaker: z.string().nullable().optional(),
  scores: ProspectScoreSchema.nullable().optional(),
  report: ProspectReportSchema.nullable().optional(),
  outreach: OutreachPackageSchema.nullable().optional(),
})
export type Prospect = z.infer<typeof ProspectSchema>
