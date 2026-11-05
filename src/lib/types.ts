export type EvidenceStatus = 'claimed' | 'assessed' | 'demonstrated' | 'validated' | 'pending'
export type SkillCategory = 'Technical' | 'Professional'

export interface Skill {
  id: string
  name: string
  category: SkillCategory
  level: number
  evidence: EvidenceStatus
  updated: string
  source?: string
}

export interface Profile {
  username: string
  fullName: string
  email: string
  institution: string
  program: string
  branch: string
  graduationYear: string
  targetRole: string
  profileComplete: boolean
}

export interface RoleRequirement {
  skill: string
  required: number
  mandatory?: boolean
}

export interface CareerRole {
  id: string
  name: string
  group: string
  summary: string
  source: string
  sourceUrl: string
  reviewed: string
  requirements: RoleRequirement[]
  salaryBand: string
}

export interface RoadmapTask {
  id: string
  title: string
  detail: string
  resource: string
  status: 'completed' | 'in-progress' | 'upcoming'
  minutes: number
}

export interface Roadmap {
  id: string
  title: string
  subtitle: string
  progress: number
  tasks: RoadmapTask[]
}

export interface Certification {
  id: string
  name: string
  provider: string
  status: 'completed' | 'in-progress' | 'planned'
  completedOn?: string
  proofStatus: 'declared' | 'pending review' | 'verified'
  source: string
}

export interface Achievement {
  id: string
  title: string
  description: string
  unlocked: boolean
  date?: string
  accent: 'lime' | 'gold' | 'amber'
}

export interface OrbitState {
  profile: Profile
  skills: Skill[]
  selectedRoleId: string
  certifications: Certification[]
  roadmap: Roadmap
  achievements: Achievement[]
  lastAssessment: string
}
