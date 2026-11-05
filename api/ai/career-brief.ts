import { generateCareerBrief } from '../../../server/ai'
import { parseCareerBriefRequest } from '../../../server/request'

type Response = {
  status: (code: number) => { json: (body: unknown) => void }
}

type Request = {
  method?: string
  body?: unknown
}

export default async function handler(request: Request, response: Response) {
  if (request.method !== 'POST') {
    response.status(405).json({ error: 'Method not allowed' })
    return
  }

  const input = parseCareerBriefRequest(request.body)
  if (!input) {
    response.status(400).json({ error: 'name, targetRole, and roadmap are required' })
    return
  }

  try {
    response.status(200).json(await generateCareerBrief(input))
  } catch {
    response.status(502).json({ error: 'AI provider unavailable' })
  }
}
