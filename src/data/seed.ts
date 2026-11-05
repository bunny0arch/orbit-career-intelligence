import type { Achievement, CareerRole, Certification, OrbitState, Roadmap, Skill } from '../lib/types'

export const roles: CareerRole[] = [
  {
    id: 'frontend', name: 'Frontend Engineer', group: 'Product engineering', summary: 'Build accessible, resilient product interfaces from design to delivery.', source: 'MDN Web Docs · Front-end web developer', sourceUrl: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core', reviewed: '12 Oct 2026', salaryBand: 'Role template · not a compensation forecast',
    requirements: [{ skill: 'React', required: 4, mandatory: true }, { skill: 'JavaScript', required: 4, mandatory: true }, { skill: 'CSS', required: 3 }, { skill: 'Testing', required: 3 }, { skill: 'Communication', required: 3 }],
  },
  {
    id: 'fullstack', name: 'Full-stack Developer', group: 'Product engineering', summary: 'Connect product thinking, frontend craft, APIs, and reliable data systems.', source: 'roadmap.sh · Full Stack Developer', sourceUrl: 'https://roadmap.sh/full-stack', reviewed: '12 Oct 2026', salaryBand: 'Role template · not a compensation forecast',
    requirements: [{ skill: 'JavaScript', required: 4, mandatory: true }, { skill: 'React', required: 3 }, { skill: 'Python', required: 3 }, { skill: 'SQL', required: 3, mandatory: true }, { skill: 'Communication', required: 3 }],
  },
  {
    id: 'data', name: 'Data Analyst', group: 'Data & decisions', summary: 'Turn messy data into clear decisions, narratives, and measurable actions.', source: 'Microsoft Learn · Data Analyst', sourceUrl: 'https://learn.microsoft.com/en-us/training/career-paths/data-analyst', reviewed: '12 Oct 2026', salaryBand: 'Role template · not a compensation forecast',
    requirements: [{ skill: 'Python', required: 3, mandatory: true }, { skill: 'SQL', required: 4, mandatory: true }, { skill: 'Data Analysis', required: 4 }, { skill: 'Communication', required: 3 }, { skill: 'Problem Solving', required: 3 }],
  },
  {
    id: 'ml', name: 'ML Engineer', group: 'AI & data', summary: 'Ship machine-learning systems with disciplined evaluation and product context.', source: 'Google Cloud · ML Engineer', sourceUrl: 'https://cloud.google.com/learn/certification/machine-learning-engineer', reviewed: '12 Oct 2026', salaryBand: 'Role template · not a compensation forecast',
    requirements: [{ skill: 'Python', required: 4, mandatory: true }, { skill: 'Machine Learning', required: 4, mandatory: true }, { skill: 'SQL', required: 2 }, { skill: 'Statistics', required: 3 }, { skill: 'Communication', required: 3 }],
  },
  {
    id: 'cyber', name: 'Security Analyst', group: 'Trust & systems', summary: 'Monitor, investigate, and strengthen the controls that keep systems dependable.', source: 'NIST NICE Framework', sourceUrl: 'https://www.nist.gov/itl/applied-cybersecurity/nice', reviewed: '12 Oct 2026', salaryBand: 'Role template · not a compensation forecast',
    requirements: [{ skill: 'Networking', required: 3, mandatory: true }, { skill: 'Linux', required: 3 }, { skill: 'Cybersecurity', required: 4, mandatory: true }, { skill: 'Problem Solving', required: 3 }, { skill: 'Communication', required: 3 }],
  },
]

export const defaultSkills: Skill[] = [
  { id: 'react', name: 'React', category: 'Technical', level: 4, evidence: 'demonstrated', updated: 'Updated 2d ago', source: 'Portfolio project' },
  { id: 'javascript', name: 'JavaScript', category: 'Technical', level: 4, evidence: 'assessed', updated: 'Assessed 8d ago', source: 'Skill assessment' },
  { id: 'python', name: 'Python', category: 'Technical', level: 3, evidence: 'demonstrated', updated: 'Updated 14d ago', source: 'Campus automation project' },
  { id: 'css', name: 'CSS', category: 'Technical', level: 3, evidence: 'claimed', updated: 'Added 3w ago', source: 'Self-reported' },
  { id: 'sql', name: 'SQL', category: 'Technical', level: 2, evidence: 'claimed', updated: 'Added 3w ago', source: 'Self-reported' },
  { id: 'communication', name: 'Communication', category: 'Professional', level: 4, evidence: 'assessed', updated: 'Assessed 8d ago', source: 'Reflection rubric' },
  { id: 'problem-solving', name: 'Problem Solving', category: 'Professional', level: 3, evidence: 'demonstrated', updated: 'Updated 9d ago', source: 'Project retrospective' },
]

export const defaultRoadmap: Roadmap = {
  id: 'frontend-readiness', title: 'Frontend Engineer readiness', subtitle: 'A focused sequence built from your current evidence', progress: 42,
  tasks: [
    { id: 't1', title: 'Ship a tested data dashboard', detail: 'Add loading, empty, and error states to your existing dashboard project.', resource: 'React Testing Library · official docs', status: 'completed', minutes: 90 },
    { id: 't2', title: 'Close the CSS systems gap', detail: 'Build a responsive token sheet and document three layout decisions.', resource: 'web.dev · Learn CSS', status: 'in-progress', minutes: 75 },
    { id: 't3', title: 'Publish a case study', detail: 'Explain the problem, trade-offs, evidence, and measurable result.', resource: 'Orbit evidence guide', status: 'upcoming', minutes: 45 },
    { id: 't4', title: 'Run a fresh role assessment', detail: 'Recalculate coverage after the new evidence is submitted.', resource: 'Orbit assessment rubric', status: 'upcoming', minutes: 20 },
  ],
}

export const defaultCertifications: Certification[] = [
  { id: 'c1', name: 'Meta Front-End Developer', provider: 'Coursera', status: 'completed', completedOn: 'Aug 2026', proofStatus: 'declared', source: 'Provider catalogue' },
  { id: 'c2', name: 'AWS Cloud Practitioner', provider: 'Amazon Web Services', status: 'in-progress', proofStatus: 'pending review', source: 'Provider catalogue' },
  { id: 'c3', name: 'Google Data Analytics', provider: 'Google', status: 'planned', proofStatus: 'declared', source: 'Provider catalogue' },
]

export const defaultAchievements: Achievement[] = [
  { id: 'a1', title: 'First evidence submitted', description: 'Added your first project-backed proof point.', unlocked: true, date: '18 Aug 2026', accent: 'lime' },
  { id: 'a2', title: 'Assessment complete', description: 'Completed a baseline skill assessment.', unlocked: true, date: '24 Aug 2026', accent: 'gold' },
  { id: 'a3', title: 'Close the gap', description: 'Move a priority skill from claimed to demonstrated.', unlocked: false, accent: 'amber' },
]

export const createDefaultState = (username = 'Aarav') : OrbitState => ({
  profile: { username, fullName: username === 'Aarav' ? 'Aarav Sharma' : username, email: '', institution: 'VFSTR', program: 'B.Tech', branch: 'Computer Science & Engineering', graduationYear: '2027', targetRole: 'Frontend Engineer', profileComplete: username === 'Aarav' },
  skills: defaultSkills,
  selectedRoleId: 'frontend',
  certifications: defaultCertifications,
  roadmap: defaultRoadmap,
  achievements: defaultAchievements,
  lastAssessment: '8 days ago',
})

export const getSkillLevel = (skills: Skill[], name: string) => skills.find(skill => skill.name.toLowerCase() === name.toLowerCase())?.level ?? 0
