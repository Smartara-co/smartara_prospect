import type { SearchInput } from '@/lib/schemas'

interface RawCompany {
  id: string
  name: string
  industry: string
  description: string
}

export function buildSignalsPrompt(
  companies: RawCompany[],
  input: SearchInput
): { system: string; user: string } {
  return {
    system: `You are a sales intelligence analyst specialising in identifying buying signals for B2B services.

For each company, identify specific, believable signals that indicate they may need the seller's services RIGHT NOW. Be concrete and specific — reference the type of company, their likely stage, and what gaps companies like this typically have.

CRITICAL: Return ONLY a valid JSON array. No markdown, no explanation. Start with [ and end with ].`,

    user: `SERVICE BEING SOLD: ${input.serviceSold}
IDEAL CUSTOMER: ${input.icpDescription}

COMPANIES TO ANALYSE:
${JSON.stringify(companies, null, 2)}

For each company, return a signals object:
{
  "companyId": "p1",
  "signals": [
    {
      "id": "s1",
      "type": "growth",
      "label": "Short signal label (max 6 words)",
      "detail": "1-2 sentences explaining this signal and why it matters for this specific company.",
      "strength": "High"
    }
  ],
  "painPoints": ["3-5 specific pain points this type of company faces", "that make them a good candidate for the service"],
  "decisionMaker": "Likely job title of the person who would buy this service"
}

Signal types: "growth" (expanding/hiring), "pain" (operational challenge), "trigger" (buying event), "budget" (investment activity), "tech" (technology gap)
Strength values: "High", "Medium", "Low"
Generate 3-5 signals per company. Return JSON array of ${companies.length} objects. Nothing else.`,
  }
}
