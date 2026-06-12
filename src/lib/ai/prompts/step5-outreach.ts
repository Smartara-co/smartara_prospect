import type { SearchInput } from '@/lib/schemas'
import type { Prospect, ProspectReport } from '@/lib/schemas/prospect'

export function buildOutreachPrompt(
  prospect: Prospect,
  report: ProspectReport,
  input: SearchInput
): { system: string; user: string } {
  return {
    system: `You are a world-class B2B sales copywriter. Write authentic, specific outreach that references real details about the prospect. No templates, no generic phrases, no "hope this finds you well."

Rules:
- Reference specific things about the company (their industry, size, signals)
- Write like a human, not a bot
- Email body: 150-200 words, conversational paragraphs (no bullet points)
- LinkedIn connection note: under 280 characters
- Be direct about the value — don't bury the offer

CRITICAL: Return ONLY a valid JSON object. No markdown, no explanation. Start with { and end with }.`,

    user: `SELLER SERVICE: ${input.serviceSold}

PROSPECT COMPANY: ${prospect.name} (${prospect.industry}, ${prospect.location})
SIZE: ${prospect.estimatedSize} employees
DESCRIPTION: ${prospect.description}
DECISION MAKER TARGET: ${prospect.decisionMaker ?? 'Business Owner / Director'}

KEY SIGNALS:
${prospect.signals.map((s) => `- ${s.label}: ${s.detail}`).join('\n')}

RESEARCH BRIEF EXCERPT:
- Why now: ${report.whyNow}
- How service helps: ${report.howServiceHelps}
- Recommended action: ${prospect.scores?.recommendedAction ?? ''}

Generate the complete outreach package:
{
  "email": {
    "subject": "Specific, personalised subject line (not salesy, sounds human)",
    "body": "Full email body (150-200 words). 3-4 conversational paragraphs. Reference ${prospect.name} specifically. End with a clear, low-pressure ask."
  },
  "linkedin": {
    "connectionRequest": "Connection note under 280 chars. Specific reason for connecting. No pitch.",
    "followUpMessage": "2-3 short paragraphs after connecting. Brief intro, one specific observation, soft ask."
  },
  "followUpSequence": [
    {
      "dayOffset": 3,
      "channel": "email",
      "subject": "Follow-up subject line",
      "body": "Short follow-up email (80-100 words). Different angle from first email."
    },
    {
      "dayOffset": 7,
      "channel": "linkedin",
      "body": "Brief LinkedIn follow-up message (50-80 words). Add value, not just a bump."
    },
    {
      "dayOffset": 14,
      "channel": "email",
      "subject": "Final follow-up subject",
      "body": "Final email (60-80 words). Breakup email style — low pressure, leaves door open."
    }
  ],
  "callScript": {
    "opener": "Opening 2-3 sentences for a cold call. State your name, company, and one specific reason for calling ${prospect.name}.",
    "valueStatement": "30-second value pitch. Specific to their situation. No jargon.",
    "discoveryQuestions": [
      "4 open-ended questions to understand their situation better"
    ],
    "objectionHandles": [
      { "objection": "We're not looking at this right now", "response": "Brief, confident response" },
      { "objection": "We already have something in place", "response": "Brief, confident response" }
    ],
    "closeStatement": "How to close for a next step (demo, meeting, call). Specific and easy to say yes to."
  }
}

Return JSON only.`,
  }
}
