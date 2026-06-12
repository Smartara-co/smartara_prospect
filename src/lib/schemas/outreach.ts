import { z } from 'zod'

export const OutreachPackageSchema = z.object({
  email: z.object({
    subject: z.string(),
    body: z.string(),
  }),
  linkedin: z.object({
    connectionRequest: z.string(),
    followUpMessage: z.string(),
  }),
  followUpSequence: z.array(
    z.object({
      dayOffset: z.number(),
      channel: z.enum(['email', 'linkedin']),
      subject: z.string().optional(),
      body: z.string(),
    })
  ),
  callScript: z.object({
    opener: z.string(),
    valueStatement: z.string(),
    discoveryQuestions: z.array(z.string()),
    objectionHandles: z.array(
      z.object({
        objection: z.string(),
        response: z.string(),
      })
    ),
    closeStatement: z.string(),
  }),
})
export type OutreachPackage = z.infer<typeof OutreachPackageSchema>
