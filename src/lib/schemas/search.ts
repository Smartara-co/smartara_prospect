import { z } from 'zod'
import { ProspectSchema } from './prospect'

export const SearchInputSchema = z.object({
  industry: z.string().min(2, 'Please specify an industry'),
  location: z.string().min(2, 'Please specify a location'),
  serviceSold: z
    .string()
    .min(10, 'Please describe your service in a bit more detail'),
  icpDescription: z
    .string()
    .min(20, 'Please describe your ideal customer in a bit more detail'),
})
export type SearchInput = z.infer<typeof SearchInputSchema>

export const SearchStatusSchema = z.enum([
  'pending',
  'discovering',
  'enriching',
  'scoring',
  'complete',
  'error',
])
export type SearchStatus = z.infer<typeof SearchStatusSchema>

export const SearchResultSchema = z.object({
  id: z.string(),
  version: z.literal('1.0'),
  createdAt: z.string(),
  input: SearchInputSchema,
  status: SearchStatusSchema,
  prospects: z.array(ProspectSchema),
  error: z.string().optional(),
})
export type SearchResult = z.infer<typeof SearchResultSchema>

export const SearchMetaSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  industry: z.string(),
  location: z.string(),
  prospectCount: z.number(),
})
export type SearchMeta = z.infer<typeof SearchMetaSchema>
