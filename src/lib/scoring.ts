import type { CareerRole, Skill } from './types'
import { getSkillLevel } from '../data/seed'

const evidenceWeight: Record<Skill['evidence'], number> = { claimed: 0.2, assessed: 0.55, demonstrated: 0.75, validated: 1, pending: 0.4 }

export interface RoleScore {
  coverage: number
  strong: number
  partial: number
  missing: number
  blockers: string[]
  gaps: { skill: string; required: number; current: number; mandatory?: boolean }[]
}

export function scoreRole(role: CareerRole, skills: Skill[]): RoleScore {
  const gaps = role.requirements.map(requirement => {
    const skill = skills.find(item => item.name.toLowerCase() === requirement.skill.toLowerCase())
    return { ...requirement, current: skill?.level ?? 0 }
  })
  const coverage = Math.round((gaps.reduce((sum, item) => sum + Math.min(item.current / item.required, 1), 0) / gaps.length) * 100)
  const strong = gaps.filter(item => item.current >= item.required).length
  const partial = gaps.filter(item => item.current > 0 && item.current < item.required).length
  const missing = gaps.filter(item => item.current === 0).length
  const blockers = gaps.filter(item => item.mandatory && item.current === 0).map(item => `${item.skill} is a mandatory gap`)
  return { coverage, strong, partial, missing, blockers, gaps }
}

export function evidenceBackedCoverage(skills: Skill[]) {
  if (!skills.length) return 0
  const total = skills.reduce((sum, skill) => sum + skill.level * evidenceWeight[skill.evidence], 0)
  return Math.round((total / (skills.length * 5)) * 100)
}

export function strongestSkills(skills: Skill[]) {
  return [...skills].sort((a, b) => b.level - a.level || evidenceWeight[b.evidence] - evidenceWeight[a.evidence]).slice(0, 3)
}

export function priorityGaps(role: CareerRole, skills: Skill[]) {
  return role.requirements.filter(requirement => getSkillLevel(skills, requirement.skill) < requirement.required).sort((a, b) => Number(Boolean(b.mandatory)) - Number(Boolean(a.mandatory))).slice(0, 3)
}
