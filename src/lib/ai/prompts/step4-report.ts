import type { SearchInput } from '@/lib/schemas'
import type { Prospect } from '@/lib/schemas/prospect'

export function buildReportPrompt(
  prospect: Prospect,
  input: SearchInput
): { system: string; user: string } {
  return {
    system: `You are a senior B2B research analyst writing a prospect intelligence brief. Write with authority and specificity. This brief will be used by a salesperson to prepare for outreach.

Write in plain English — no jargon, no bullet forests. Be specific about THIS company and THIS service, not generic observations.

CRITICAL: Return ONLY a valid JSON object. No markdown, no explanation. Start with { and end with }.`,

    user: `COMPANY: ${prospect.name}
DOMAIN: ${prospect.domain}
INDUSTRY: ${prospect.industry}
LOCATION: ${prospect.location}
SIZE: ${prospect.estimatedSize} employees
DESCRIPTION: ${prospect.description}

SERVICE BEING SOLD: ${input.serviceSold}
ICP: ${input.icpDescription}

KNOWN SIGNALS: ${JSON.stringify(prospect.signals, null, 2)}
PAIN POINTS: ${JSON.stringify(prospect.painPoints, null, 2)}
DECISION MAKER: ${prospect.decisionMaker ?? 'Unknown'}

Write a detailed prospect intelligence brief:
{
  "executiveSummary": "3-4 sentence summary of who they are and why they're a strong prospect for this specific service.",
  "companyBackground": "2-3 sentences on what they do, their market, and their customers.",
  "currentChallenges": [
    "3-5 specific operational or growth challenges this type of company faces",
    "that make them ready to buy the service being sold"
  ],
  "whyNow": "1-2 sentences explaining the specific timing — why is NOW the right moment to reach out?",
  "competitiveContext": "1-2 sentences on the competitive pressure they face and how that creates urgency.",
  "howServiceHelps": "2-3 sentences directly connecting the service to their challenges. Be specific.",
  "keyStakeholders": [
    {
      "title": "Managing Director",
      "concern": "What this person worries about at 2am",
      "messagingAngle": "How to frame the pitch specifically for this person"
    }
  ],
  "riskFlags": ["1-3 potential objections or reasons this might be a harder close"],
  "researchConfidence": "High"
}

Return JSON only. Be specific, not generic.`,
  }
}
