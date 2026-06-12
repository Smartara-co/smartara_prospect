import { z } from 'zod'

export const ExportRowSchema = z.object({
  rank: z.number(),
  name: z.string(),
  domain: z.string(),
  industry: z.string(),
  location: z.string(),
  size: z.string(),
  overallScore: z.number(),
  fitScore: z.number(),
  opportunityScore: z.number(),
  urgency: z.string(),
  signals: z.string(),
  painPoints: z.string(),
  decisionMaker: z.string(),
  recommendedAction: z.string(),
  whyGoodFit: z.string(),
})
export type ExportRow = z.infer<typeof ExportRowSchema>
