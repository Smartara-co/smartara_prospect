import type { SearchInput } from '@/lib/schemas'

interface EnrichedCompany {
  id: string
  name: string
  industry: string
  estimatedSize: string
  description: string
  whyGoodFit: string
  signals: Array<{ type: string; label: string; strength: string }>
  painPoints: string[]
}

export function buildScorePrompt(
  companies: EnrichedCompany[],
  input: SearchInput
): { system: string; user: string } {
  return {
    system: `You are a lead scoring expert with 15 years of B2B sales experience. Score each prospect rigorously — not every lead is a 9/10. Differentiate meaningfully between companies.

CRITICAL: Return ONLY a valid JSON array. No markdown, no explanation. Start with [ and end with ].`,

    user: `SERVICE BEING SOLD: ${input.serviceSold}
IDEAL CUSTOMER: ${input.icpDescription}

ENRICHED PROSPECTS:
${JSON.stringify(companies, null, 2)}

Score each company on a 0-10 scale. Consider:
- ICP fit (size, industry, location, description match)
- Signal strength and quantity
- Timing/urgency indicators
- Likelihood to actually buy this specific service

Return a score object for each:
{
  "companyId": "p1",
  "overallScore": 8.4,
  "fitScore": 8.0,
  "opportunityScore": 8.8,
  "scoreRationale": "2-sentence explanation of this specific score.",
  "urgency": "High",
  "recommendedAction": "Specific first outreach action for this exact company (1 sentence)."
}

Urgency values: "High" (act this week), "Medium" (act this month), "Low" (nurture)
Distribute scores realistically — expect a range from 4 to 9.5.
Return JSON array of ${companies.length} objects, ordered by overallScore descending. Nothing else.`,
  }
}
