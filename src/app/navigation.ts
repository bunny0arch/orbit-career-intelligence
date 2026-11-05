import type { LucideIcon } from 'lucide-react'
import {
  Activity,
  Brain,
  Compass,
  Flag,
  GraduationCap,
  LayoutDashboard,
  Trophy,
} from 'lucide-react'

export type OrbitRoute = {
  path: string
  label: string
  icon: LucideIcon
}

export const navItems: OrbitRoute[] = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/skills', label: 'My Skills', icon: Activity },
  { path: '/career-paths', label: 'Career Paths', icon: Compass },
  { path: '/career-brain', label: 'Career Brain', icon: Brain },
  { path: '/roadmaps', label: 'Roadmaps', icon: Flag },
  { path: '/certifications', label: 'Certifications', icon: GraduationCap },
  { path: '/achievements', label: 'Achievements', icon: Trophy },
]

export const utilityRoutes: OrbitRoute[] = [
  { path: '/profile', label: 'Profile', icon: Activity },
  { path: '/settings', label: 'Settings', icon: Activity },
]

export function formatPath(path: string) {
  return path === '/' ? 'Dashboard' : [...navItems, ...utilityRoutes].find(item => item.path === path)?.label || path.replace('/', '')
}
