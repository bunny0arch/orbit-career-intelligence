export interface CareerBriefRequest {
  name: string
  targetRole: string
  strengths: string[]
  gaps: string[]
  roadmap: string
  question?: string
}

const text = (value: unknown, max: number) => typeof value === 'string' ? value.trim().slice(0, max) : ''
const list = (value: unknown) => Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string').map(item => item.trim().slice(0, 120)).filter(Boolean).slice(0, 20) : []

export function parseCareerBriefRequest(body: unknown): CareerBriefRequest | null {
  if (!body || typeof body !== 'object') return null
  const input = body as Record<string, unknown>
  const parsed = {
    name: text(input.name, 120),
    targetRole: text(input.targetRole, 160),
    strengths: list(input.strengths),
    gaps: list(input.gaps),
    roadmap: text(input.roadmap, 240),
    question: text(input.question, 600),
  }
  return parsed.name && parsed.targetRole && parsed.roadmap ? parsed : null
}
