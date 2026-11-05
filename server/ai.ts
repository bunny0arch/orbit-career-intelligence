type Provider = 'Gemini' | 'OpenRouter' | 'Orbit fallback'

interface BriefInput {
  name: string
  targetRole: string
  strengths: string[]
  gaps: string[]
  roadmap: string
  question?: string
}

function extractText(body: any) {
  return body?.choices?.[0]?.message?.content?.trim() || ''
}

async function callProvider(url: string, apiKey: string, model: string, prompt: string) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({ model, messages: [{ role: 'system', content: 'You are Orbit Career Brain. Use only the supplied student context. Be concise, practical, and explicit about uncertainty. Never imply hiring or certification guarantees.' }, { role: 'user', content: prompt }], temperature: 0.2, max_tokens: 700 }),
  })
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`)
  const text = extractText(await response.json())
  if (!text) throw new Error('Provider returned no text')
  return text
}

export async function generateCareerBrief(input: BriefInput) {
  const prompt = `Student: ${input.name}\nTarget role: ${input.targetRole}\nEvidence-backed strengths: ${input.strengths.join(', ') || 'none recorded'}\nPriority gaps: ${input.gaps.join(', ') || 'none recorded'}\nActive roadmap: ${input.roadmap}\nQuestion: ${input.question || 'Give a concise next-step brief.'}\n\nAnswer the question in exactly three short paragraphs: current read, next move, and uncertainty note.`
  const geminiKey = process.env.GEMINI_API_KEY
  if (geminiKey) {
    try {
      return { provider: 'Gemini' as Provider, text: await callProvider('https://generativelanguage.googleapis.com/v1beta/openai/chat/completions', geminiKey, 'gemini-2.5-flash', prompt) }
    } catch { /* fall through to OpenRouter */ }
  }
  const openRouterKey = process.env.OPENROUTER_API_KEY
  if (openRouterKey) {
    try {
      return { provider: 'OpenRouter' as Provider, text: await callProvider('https://openrouter.ai/api/v1/chat/completions', openRouterKey, 'google/gemini-2.5-flash', prompt) }
    } catch { /* fall through to deterministic response */ }
  }
  return { provider: 'Orbit fallback' as Provider, text: `${input.name} has a credible base for ${input.targetRole}, with strongest evidence in ${input.strengths.slice(0, 2).join(' and ') || 'the recorded profile'}. The clearest next move is ${input.gaps[0] ? `to build evidence for ${input.gaps[0]}` : 'to submit one more project-backed proof point'}. This is a profile signal, not a hiring or certification guarantee; source quality and evidence freshness still matter.` }
}
