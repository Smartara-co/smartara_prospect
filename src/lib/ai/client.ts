import OpenAI from 'openai'

export const openRouterClient = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY ?? '',
  defaultHeaders: {
    'HTTP-Referer':
      process.env.NEXT_PUBLIC_SITE_URL ?? 'https://prospect.smartara.co',
    'X-Title': 'Smartara Prospect',
  },
})

export function parseJSON<T>(text: string): T {
  const cleaned = text
    .replace(/```(?:json)?\s*/g, '')
    .replace(/```\s*/g, '')
    .trim()

  // Find the outermost JSON structure: prefer array [ if it comes before object {
  const arrayStart = cleaned.indexOf('[')
  const objectStart = cleaned.indexOf('{')

  let start: number
  if (arrayStart !== -1 && (objectStart === -1 || arrayStart < objectStart)) {
    start = arrayStart
  } else if (objectStart !== -1) {
    start = objectStart
  } else {
    throw new Error('No JSON found in response')
  }

  // Match the correct closing bracket for the starting character
  const isArray = cleaned[start] === '['
  const end = isArray ? cleaned.lastIndexOf(']') : cleaned.lastIndexOf('}')

  if (end === -1 || end < start) throw new Error('Malformed JSON in response')

  return JSON.parse(cleaned.slice(start, end + 1)) as T
}

export async function callAI(
  messages: OpenAI.Chat.ChatCompletionMessageParam[],
  model: string,
  options?: { temperature?: number; maxTokens?: number }
): Promise<string> {
  const response = await openRouterClient.chat.completions.create({
    model,
    messages,
    temperature: options?.temperature ?? 0.7,
    max_tokens: options?.maxTokens ?? 4096,
  })

  return response.choices[0]?.message?.content ?? ''
}
