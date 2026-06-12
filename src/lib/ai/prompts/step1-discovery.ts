import type { SearchInput } from '@/lib/schemas'

export function buildDiscoveryPrompt(input: SearchInput): {
  system: string
  user: string
} {
  return {
    system: `You are a senior B2B market researcher with deep knowledge of business landscapes across the UK, Europe, and North America.

Generate realistic prospect companies based on the user's targeting criteria. These companies should be plausible — real-sounding names, realistic sizes, accurate industries. You are working from your training knowledge, not live data.

CRITICAL: Return ONLY a valid JSON array. No markdown, no explanation, no code blocks. Start your response with [ and end with ].`,

    user: `Find 12 prospect companies matching these criteria:

INDUSTRY TARGET: ${input.industry}
LOCATION: ${input.location}
SERVICE BEING SOLD: ${input.serviceSold}
IDEAL CUSTOMER DESCRIPTION: ${input.icpDescription}

Generate exactly 12 companies. For each, return:
{
  "id": "p1",
  "name": "Company Name Ltd",
  "domain": "companyname.co.uk",
  "industry": "Specific sub-industry (e.g. 'Executive Search Firm')",
  "location": "City, Country",
  "estimatedSize": "11-50",
  "description": "2-sentence description of what they do and their market position.",
  "whyGoodFit": "1 specific sentence explaining why this company fits the ICP."
}

Valid sizes: "1-10", "11-50", "51-200", "201-500", "500+"
Return JSON array of 12 objects. Nothing else.`,
  }
}
