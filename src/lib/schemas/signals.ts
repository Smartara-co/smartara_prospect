import { z } from 'zod'

export const SignalTypeSchema = z.enum(['growth', 'pain', 'trigger', 'budget', 'tech'])
export type SignalType = z.infer<typeof SignalTypeSchema>

export const SignalSchema = z.object({
  id: z.string(),
  type: SignalTypeSchema.catch('pain'),
  label: z.string(),
  detail: z.string(),
  strength: z.enum(['High', 'Medium', 'Low']).catch('Medium'),
})
export type Signal = z.infer<typeof SignalSchema>
