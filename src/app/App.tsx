import { useEffect, useMemo, useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import {
  Activity, ArrowUpRight, Award, BarChart3, Bell, Brain, BriefcaseBusiness, Check, ChevronRight, CircleHelp, Compass,
  FileCheck2, Flag, GraduationCap, LayoutDashboard, LockKeyhole, Menu, Minus, Plus, RefreshCw, Search, Settings2,
  ShieldCheck, Sparkles, Target, TrendingUp, Trophy, UserRound, X, Zap,
} from 'lucide-react'
import { motion } from 'motion/react'
import { AnimatedList } from '../components/ui/AnimatedList'
import SpotlightCard from '../components/ui/spotlight-card/SpotlightCard'
import { OrbitMark } from '../components/ui/OrbitMark'
import { ProgressBar } from '../components/ui/ProgressBar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs'
import { createDefaultState, getSkillLevel, roles } from '../data/seed'
import { evidenceBackedCoverage, priorityGaps, scoreRole, strongestSkills } from '../lib/scoring'
import { clearSession, currentSession, hasSession, loadState, saveSession, saveState } from '../lib/storage'
import type { CareerRole, OrbitState, Skill } from '../lib/types'

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/skills', label: 'My Skills', icon: Activity },
  { path: '/career-paths', label: 'Career Paths', icon: Compass },
  { path: '/career-brain', label: 'Career Brain', icon: Brain },
  { path: '/roadmaps', label: 'Roadmaps', icon: Flag },
  { path: '/certifications', label: 'Certifications', icon: GraduationCap },
  { path: '/achievements', label: 'Achievements', icon: Trophy },
]

function formatPath(path: string) {
  return path === '/' ? 'Dashboard' : navItems.find(item => item.path === path)?.label || path.replace('/', '')
}

function useToast() {
  const [message, setMessage] = useState('')
  useEffect(() => { if (!message) return; const timer = window.setTimeout(() => setMessage(''), 2800); return () => window.clearTimeout(timer) }, [message])
  return { message, show: setMessage }
}

export function App() {
  const [session, setSession] = useState(hasSession())
  const [state, setState] = useState<OrbitState>(() => { const username = currentSession() || 'Aarav'; return loadState(createDefaultState(username), currentSession() || undefined) })
  const [path, setPath] = useState(window.location.pathname || '/')
  const [onboarding, setOnboarding] = useState(false)
  const toast = useToast()

  useEffect(() => saveState(state), [state])
  useEffect(() => {
    const onPop = () => setPath(window.location.pathname || '/')
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const navigate = (nextPath: string) => {
    window.history.pushState({}, '', nextPath)
    setPath(nextPath)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleAuth = (username: string, isNew: boolean) => {
    saveSession(username)
    setState(isNew ? createDefaultState(username) : loadState(createDefaultState(username), username))
    setSession(true)
    if (isNew) setOnboarding(true)
    toast.show(isNew ? 'Account created. Let’s map your starting point.' : `Session restored for ${username}.`)
  }

  const logout = () => { clearSession(); setSession(false); toast.show('You are signed out.') }
  const updateState = (patch: Partial<OrbitState>) => setState(current => ({ ...current, ...patch }))

  if (!session) return <AuthScreen onAuth={handleAuth} />
  if (onboarding) return <OnboardingScreen initial={state} onComplete={(profile) => { updateState({ profile: { ...state.profile, ...profile, profileComplete: true } }); setOnboarding(false); toast.show('Profile saved. Your orbit is ready.') }} />

  return (
    <div className="app-frame">
      <Sidebar path={path} navigate={navigate} profile={state.profile} onLogout={logout} />
      <main className="app-main">
        <header className="topbar">
          <div className="topbar-mobile-brand"><OrbitMark compact /><span>ORBIT</span></div>
          <div className="breadcrumb"><span>Workspace</span><ChevronRight size={13} /><strong>{formatPath(path)}</strong></div>
          <div className="topbar-actions">
            <button className="icon-button" type="button" title="Search" onClick={() => toast.show('Search is scoped to workspace records in the next integration.')}><Search size={17} /></button>
            <button className="icon-button notification-button" type="button" title="Notifications" onClick={() => toast.show('No new notifications. Evidence updates will appear here.')}><Bell size={17} /><span /></button>
            <button className="avatar-button" type="button" onClick={() => navigate('/profile')} title="Open profile">{state.profile.fullName.slice(0, 2).toUpperCase()}</button>
          </div>
        </header>
        <div className="mobile-nav-wrap"><MobileNav path={path} navigate={navigate} /></div>
        <motion.div className="page-container" key={path} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .24, ease: 'easeOut' }}>
          {path === '/' && <Dashboard state={state} updateState={updateState} navigate={navigate} toast={toast.show} />}
          {path === '/skills' && <SkillsPage state={state} updateState={updateState} toast={toast.show} />}
          {path === '/career-paths' && <CareerPathsPage state={state} updateState={updateState} navigate={navigate} toast={toast.show} />}
          {path === '/career-brain' && <CareerBrainPage state={state} navigate={navigate} />}
          {path === '/roadmaps' && <RoadmapsPage state={state} updateState={updateState} toast={toast.show} />}
          {path === '/certifications' && <CertificationsPage state={state} updateState={updateState} toast={toast.show} />}
          {path === '/achievements' && <AchievementsPage state={state} />}
          {path === '/profile' && <ProfilePage state={state} updateState={updateState} toast={toast.show} />}
          {path === '/settings' && <SettingsPage toast={toast.show} />}
        </motion.div>
      </main>
      {toast.message && <motion.div className="toast" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}><Check size={15} />{toast.message}</motion.div>}
    </div>
  )
}

function AuthScreen({ onAuth }: { onAuth: (username: string, isNew: boolean) => void }) {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const submit = (event: FormEvent) => {
    event.preventDefault()
    const normalized = username.trim().toLowerCase()
    if (!/^[a-z0-9_]{3,20}$/.test(normalized)) return setError('Use 3–20 letters, numbers, or underscores.')
    if (password.length < 8) return setError('Use at least 8 characters for your password.')
    if (mode === 'register' && password !== confirm) return setError('Passwords do not match.')
    setError('')
    onAuth(normalized, mode === 'register')
  }
  return (
    <div className="auth-screen">
      <div className="auth-ambient auth-ambient-one" /><div className="auth-ambient auth-ambient-two" />
      <div className="auth-layout">
        <section className="auth-intro">
          <div className="brand-lockup"><OrbitMark /><span>ORBIT</span></div>
          <p className="eyebrow">Career intelligence / VFSTR & beyond</p>
          <h1>Make your next<br /><em>move legible.</em></h1>
          <p className="auth-lede">Orbit helps you turn learning into evidence, evidence into direction, and direction into a plan you can actually follow.</p>
          <div className="auth-principle"><span className="principle-line" /><span>Claims are a starting point.<br />Evidence moves you forward.</span></div>
        </section>
        <motion.section className="auth-panel" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .35 }}>
          <div className="panel-topline"><span>{mode === 'login' ? 'Welcome back' : 'Start your orbit'}</span><span className="secure-note"><LockKeyhole size={13} /> Session workspace</span></div>
          <h2>{mode === 'login' ? 'Sign in to your workspace' : 'Create your account'}</h2>
          <p className="panel-copy">{mode === 'login' ? 'Continue building an evidence-backed career profile.' : 'Only a username and password for now. You can complete your profile after.'}</p>
          <form onSubmit={submit} className="auth-form">
            <label>Username<input value={username} onChange={event => setUsername(event.target.value)} placeholder="e.g. aarav_27" autoComplete="username" /></label>
            <label>Password<div className="input-with-action"><input type={showPassword ? 'text' : 'password'} value={password} onChange={event => setPassword(event.target.value)} placeholder="At least 8 characters" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} /><button type="button" onClick={() => setShowPassword(value => !value)}>{showPassword ? 'Hide' : 'Show'}</button></div></label>
            {mode === 'register' && <label>Confirm password<input type="password" value={confirm} onChange={event => setConfirm(event.target.value)} placeholder="Repeat your password" autoComplete="new-password" /></label>}
            {error && <div className="form-error"><X size={14} />{error}</div>}
            <button className="primary-button auth-submit" type="submit">{mode === 'login' ? 'Enter Orbit' : 'Create account'}<ArrowUpRight size={16} /></button>
          </form>
          <div className="auth-switch">{mode === 'login' ? 'New to Orbit?' : 'Already have an account?'} <button type="button" onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError('') }}>{mode === 'login' ? 'Create an account' : 'Sign in instead'}</button></div>
          <p className="auth-disclaimer">Prototype workspace: the current session is stored locally for this preview. Production username-to-auth identity mapping is documented as the next secure integration.</p>
        </motion.section>
      </div>
      <div className="auth-footer"><span>ORBIT / 0.1</span><span>Career intelligence for the work in front of you</span></div>
    </div>
  )
}

function OnboardingScreen({ initial, onComplete }: { initial: OrbitState; onComplete: (profile: Partial<OrbitState['profile']>) => void }) {
  const [step, setStep] = useState(1)
  const [profile, setProfile] = useState(initial.profile)
  const next = () => setStep(value => Math.min(value + 1, 3))
  return (
    <div className="onboarding-screen"><div className="onboarding-card">
      <div className="onboarding-header"><div className="brand-lockup"><OrbitMark compact /><span>ORBIT</span></div><span className="step-label">Setup / 0{step} of 03</span></div>
      <div className="onboarding-progress"><span style={{ width: `${(step / 3) * 100}%` }} /></div>
      {step === 1 && <OnboardingStep title="Let’s start with you." copy="This is the context Orbit uses to make every next action more relevant." fields={<><label>Full name<input value={profile.fullName} onChange={e => setProfile({ ...profile, fullName: e.target.value })} /></label><label>Email address<input type="email" value={profile.email} onChange={e => setProfile({ ...profile, email: e.target.value })} placeholder="you@example.com" /></label></>} onNext={next} />}
      {step === 2 && <OnboardingStep title="Place your starting point." copy="VFSTR is a first-class choice, and Orbit stays open to every institution." fields={<><label>Institution<select value={profile.institution} onChange={e => setProfile({ ...profile, institution: e.target.value })}><option>VFSTR</option><option>Other institution</option></select></label><label>Program / degree<input value={profile.program} onChange={e => setProfile({ ...profile, program: e.target.value })} /></label><label>Branch / specialization<input value={profile.branch} onChange={e => setProfile({ ...profile, branch: e.target.value })} /></label></>} onNext={next} />}
      {step === 3 && <OnboardingStep title="Choose a direction, not a destiny." copy="This target shapes the first comparison. You can change it anytime." fields={<><label>Expected graduation year<input value={profile.graduationYear} onChange={e => setProfile({ ...profile, graduationYear: e.target.value })} /></label><label>Current target role<select value={profile.targetRole} onChange={e => setProfile({ ...profile, targetRole: e.target.value })}>{roles.map(role => <option key={role.id}>{role.name}</option>)}</select></label></>} onNext={() => onComplete(profile)} final />}
      <div className="onboarding-foot"><span>Nothing is permanent here.</span>{step > 1 && <button type="button" className="text-button" onClick={() => setStep(value => value - 1)}>Back</button>}</div>
    </div></div>
  )
}

function OnboardingStep({ title, copy, fields, onNext, final }: { title: string; copy: string; fields: ReactNode; onNext: () => void; final?: boolean }) {
  return <div className="onboarding-step"><p className="eyebrow">Profile context</p><h1>{title}</h1><p className="onboarding-copy">{copy}</p><div className="onboarding-fields">{fields}</div><button className="primary-button" type="button" onClick={onNext}>{final ? 'Save profile' : 'Continue'}<ArrowUpRight size={16} /></button></div>
}

function Sidebar({ path, navigate, profile, onLogout }: { path: string; navigate: (path: string) => void; profile: OrbitState['profile']; onLogout: () => void }) {
  return <aside className="sidebar"><div className="sidebar-brand"><OrbitMark compact /><span>ORBIT</span><small>Career intelligence</small></div><div className="sidebar-label">Workspace</div><nav>{navItems.map(item => <button type="button" key={item.path} className={path === item.path ? 'nav-item nav-item-active' : 'nav-item'} onClick={() => navigate(item.path)}><item.icon size={16} /><span>{item.label}</span>{item.path === '/career-brain' && <span className="nav-live">AI</span>}</button>)}</nav><div className="sidebar-spacer" /><button type="button" className={path === '/profile' ? 'nav-item nav-item-active' : 'nav-item'} onClick={() => navigate('/profile')}><UserRound size={16} /><span>Profile</span></button><button type="button" className={path === '/settings' ? 'nav-item nav-item-active' : 'nav-item'} onClick={() => navigate('/settings')}><Settings2 size={16} /><span>Settings</span></button><div className="sidebar-user"><div className="user-avatar">{profile.fullName.slice(0, 2).toUpperCase()}</div><div><strong>{profile.fullName}</strong><small>{profile.targetRole}</small></div><button type="button" onClick={onLogout} title="Sign out"><ArrowUpRight size={14} /></button></div></aside>
}

function MobileNav({ path, navigate }: { path: string; navigate: (path: string) => void }) {
  const [expanded, setExpanded] = useState(false)
  const items = expanded ? navItems : navItems.slice(0, 5)
  return <div className="mobile-nav"><button type="button" className="icon-button" aria-label="Show all navigation" onClick={() => setExpanded(value => !value)}><Menu size={18} /></button><div className="mobile-nav-scroll">{items.map(item => <button type="button" key={item.path} className={path === item.path ? 'mobile-nav-item active' : 'mobile-nav-item'} onClick={() => navigate(item.path)}>{item.label}</button>)}</div></div>
}

function PageHeader({ eyebrow, title, copy, action }: { eyebrow: string; title: string; copy: string; action?: ReactNode }) {
  return <div className="page-header"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="page-copy">{copy}</p></div>{action && <div className="page-header-action">{action}</div>}</div>
}

function Dashboard({ state, updateState, navigate, toast }: { state: OrbitState; updateState: (patch: Partial<OrbitState>) => void; navigate: (path: string) => void; toast: (message: string) => void }) {
  const role = roles.find(item => item.id === state.selectedRoleId) || roles[0]
  const roleScore = scoreRole(role, state.skills)
  const backed = evidenceBackedCoverage(state.skills)
  const strong = strongestSkills(state.skills)
  const gaps = priorityGaps(role, state.skills)
  const [brief, setBrief] = useState('')
  const [provider, setProvider] = useState('')
  const [loading, setLoading] = useState(false)
  const runBrief = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/ai/career-brief', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: state.profile.fullName, targetRole: role.name, strengths: strong.map(skill => skill.name), gaps: gaps.map(gap => gap.skill), roadmap: state.roadmap.title }) })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error)
      setBrief(data.text); setProvider(data.provider)
    } catch { toast('Career Brain could not connect. The core workspace is still available.') } finally { setLoading(false) }
  }
  const completeTask = () => {
    const nextTask = state.roadmap.tasks.find(task => task.status !== 'completed')
    if (!nextTask) return toast('Your roadmap is already complete.')
    const tasks = state.roadmap.tasks.map(task => task.id === nextTask.id ? { ...task, status: 'completed' as const } : task)
    const progress = Math.round((tasks.filter(task => task.status === 'completed').length / tasks.length) * 100)
    const achievements = progress === 100 ? state.achievements.map(achievement => achievement.id === 'a3' ? { ...achievement, unlocked: true, date: 'Just now' } : achievement) : state.achievements
    updateState({ roadmap: { ...state.roadmap, tasks, progress }, achievements })
    toast('Roadmap progress updated and saved locally.')
  }
  return <>
    <PageHeader eyebrow="Thursday / 05 November 2026" title={`Good morning, ${state.profile.fullName.split(' ')[0]}.`} copy={`You’re building toward ${role.name}. Here’s the signal from your profile today.`} action={<button className="secondary-button" type="button" onClick={() => navigate('/profile')}><UserRound size={15} /> View profile</button>} />
    <section className="signal-strip"><div className="signal-intro"><span className="signal-dot" /><div><strong>Next best move</strong><span>Close one evidence gap before adding another skill.</span></div></div><button type="button" className="signal-action" onClick={() => navigate('/roadmaps')}>Continue roadmap <ArrowUpRight size={15} /></button></section>
    <div className="dashboard-grid">
      <SpotlightCard className="panel hero-panel" spotlightColor="rgba(200,241,105,.65)" intensity={.12} spotlightSize={270} softness={.78} borderGlow={.3} proximity={80} ambient={false} flare={false}><div className="panel-heading"><div><p className="eyebrow">Career readiness / {role.name}</p><h2>{roleScore.coverage}% <span>coverage</span></h2></div><div className="score-orbit"><span>{backed}%</span><small>evidence-backed</small></div></div><ProgressBar value={roleScore.coverage} tone="lime" /><div className="coverage-foot"><span><i className="legend-dot lime" />{roleScore.strong} strong matches</span><span><i className="legend-dot amber" />{roleScore.partial} partial</span><span><i className="legend-dot muted" />{roleScore.missing} missing</span></div><div className="panel-divider" /><div className="role-meta"><span>Last assessed {state.lastAssessment}</span><button className="text-button" type="button" onClick={() => navigate('/career-paths')}>Inspect role fit <ArrowUpRight size={14} /></button></div></SpotlightCard>
      <section className="panel overview-panel"><div className="panel-heading compact"><div><p className="eyebrow">Your current signal</p><h3>Skill profile</h3></div><button className="icon-button" type="button" onClick={() => navigate('/skills')}><ArrowUpRight size={16} /></button></div><div className="overview-metrics"><Metric value={state.skills.length} label="Total skills" /><Metric value={state.skills.filter(skill => skill.category === 'Technical').length} label="Technical" /><Metric value={state.skills.filter(skill => skill.evidence === 'demonstrated').length} label="Demonstrated" /></div><div className="overview-note"><ShieldCheck size={15} /><span>Your strongest records are backed by project evidence, not self-report alone.</span></div></section>
      <SpotlightCard className="panel genome-panel" spotlightColor="rgba(200,241,105,.45)" intensity={.09} spotlightSize={220} softness={.84} borderGlow={.2} proximity={70} ambient={false} flare={false}><div className="panel-heading compact"><div><p className="eyebrow">Digital Skill Genome</p><h3>Where your signal is strongest</h3></div><button className="text-button" type="button" onClick={() => navigate('/skills')}>Open genome <ArrowUpRight size={14} /></button></div><div className="skill-bars">{strong.map(skill => <div className="skill-bar-row" key={skill.id}><div><span>{skill.name}</span><small>{skill.evidence}</small></div><div className="skill-bar"><span style={{ width: `${skill.level * 20}%` }} /></div><strong>{skill.level}/5</strong></div>)}</div><div className="genome-callout"><Target size={15} /><span>Priority gap: <strong>{gaps[0]?.skill || 'Add a target role'}</strong></span><button type="button" onClick={() => navigate('/career-paths')}><ArrowUpRight size={14} /></button></div></SpotlightCard>
      <section className="panel brain-panel"><div className="panel-heading compact"><div><p className="eyebrow">Career Brain / {provider || 'ready'}</p><h3>A sharper read on your profile</h3></div><Sparkles size={17} className="accent-icon" /></div>{brief ? <div className="ai-brief"><p>{brief}</p><span>Generated from your recorded profile · confirm important decisions against source material.</span></div> : <><p className="panel-copy">Use your profile, evidence, and target role to get a concise next-step brief. Gemini is preferred; OpenRouter is the fallback.</p><button className="primary-button" type="button" onClick={runBrief} disabled={loading}>{loading ? <><RefreshCw size={15} className="spin" /> Reading your profile</> : <><Sparkles size={15} /> Generate profile brief</>}</button></>}</section>
      <section className="panel roadmap-panel"><div className="panel-heading compact"><div><p className="eyebrow">Active roadmap</p><h3>{state.roadmap.title}</h3><p className="panel-subtitle">{state.roadmap.subtitle}</p></div><button className="icon-button" type="button" onClick={() => navigate('/roadmaps')}><ArrowUpRight size={16} /></button></div><ProgressBar value={state.roadmap.progress} label="Overall progress" /><div className="roadmap-next"><div className="task-status"><span className="task-marker in-progress" /><span>Next up</span></div><strong>{state.roadmap.tasks.find(task => task.status !== 'completed')?.title || 'All tasks complete'}</strong><button type="button" className="secondary-button" onClick={completeTask}><Check size={15} /> Mark done</button></div></section>
      <section className="panel activity-panel"><div className="panel-heading compact"><div><p className="eyebrow">Evidence ledger</p><h3>Signals on record</h3></div><Activity size={17} className="muted-icon" /></div>{state.skills.length ? <AnimatedList items={state.skills.slice(0, 4).map(skill => ({ id: skill.id, icon: <FileCheck2 size={15} />, title: skill.name, description: `${skill.evidence} · ${skill.category} · level ${skill.level}/5`, meta: skill.updated }))} /> : <p className="ledger-empty">No skill signals recorded yet. Add a skill to begin your evidence ledger.</p>}</section>
    </div>
  </>
}

function Metric({ value, label }: { value: number; label: string }) { return <div className="metric"><strong>{value}</strong><span>{label}</span></div> }

function SkillsPage({ state, updateState, toast }: { state: OrbitState; updateState: (patch: Partial<OrbitState>) => void; toast: (message: string) => void }) {
  const [newSkill, setNewSkill] = useState('')
  const [category, setCategory] = useState<Skill['category']>('Technical')
  const [filter, setFilter] = useState<'All' | Skill['category']>('All')
  const visibleSkills = filter === 'All' ? state.skills : state.skills.filter(skill => skill.category === filter)
  const addSkill = () => { if (!newSkill.trim()) return; const skill: Skill = { id: `skill-${Date.now()}`, name: newSkill.trim(), category, level: 1, evidence: 'claimed', updated: 'Added just now', source: 'Self-reported' }; updateState({ skills: [...state.skills, skill] }); setNewSkill(''); toast(`${skill.name} added as a claimed skill.`) }
  const updateLevel = (id: string, level: number) => updateState({ skills: state.skills.map(skill => skill.id === id ? { ...skill, level, updated: 'Updated just now' } : skill) })
  return <><PageHeader eyebrow="Capability records" title="My skills" copy="A skill only becomes useful when Orbit can show how you know it." action={<button className="primary-button" type="button" onClick={() => document.getElementById('add-skill')?.focus()}><Plus size={15} /> Add skill</button>} /><div className="skills-layout"><section className="panel skills-panel"><div className="section-toolbar"><div><p className="eyebrow">{state.skills.length} records / two categories</p><h3>Skill inventory</h3></div><div className="filter-pills"><button type="button" className={filter === 'All' ? 'filter-pill active' : 'filter-pill'} onClick={() => setFilter('All')}>All</button><button type="button" className={filter === 'Technical' ? 'filter-pill active' : 'filter-pill'} onClick={() => setFilter('Technical')}>Technical</button><button type="button" className={filter === 'Professional' ? 'filter-pill active' : 'filter-pill'} onClick={() => setFilter('Professional')}>Professional</button></div></div><div className="skills-table">{visibleSkills.map(skill => <div className="skill-row" key={skill.id}><div className="skill-name"><span className="skill-icon">{skill.category === 'Technical' ? '</>' : '↗'}</span><div><strong>{skill.name}</strong><small>{skill.category} · {skill.source}</small></div></div><div className="level-control"><button type="button" onClick={() => updateLevel(skill.id, Math.max(1, skill.level - 1))}><Minus size={13} /></button><div className="level-dots">{[1, 2, 3, 4, 5].map(level => <span key={level} className={level <= skill.level ? 'level-dot filled' : 'level-dot'} />)}</div><button type="button" onClick={() => updateLevel(skill.id, Math.min(5, skill.level + 1))}><Plus size={13} /></button></div><span className={`evidence-badge evidence-${skill.evidence}`}>{skill.evidence}</span><span className="row-updated">{skill.updated}</span></div>)}</div></section><aside className="skills-aside"><section className="panel add-skill-panel"><p className="eyebrow">New record</p><h3>Add a skill</h3><p className="panel-copy">New skills enter as claimed until an assessment or evidence moves them forward.</p><label>Skill name<input id="add-skill" value={newSkill} onChange={e => setNewSkill(e.target.value)} onKeyDown={e => e.key === 'Enter' && addSkill()} placeholder="e.g. TypeScript" /></label><label>Category<select value={category} onChange={e => setCategory(e.target.value as Skill['category'])}><option>Technical</option><option>Professional</option></select></label><button className="primary-button full-width" type="button" onClick={addSkill}><Plus size={15} /> Add claimed skill</button></section><section className="panel evidence-key"><p className="eyebrow">Evidence ladder</p><h3>What each label means</h3>{[['claimed', 'You reported it'], ['assessed', 'You completed a rubric'], ['demonstrated', 'A project shows it'], ['validated', 'An authorized reviewer confirmed it']].map(([key, value]) => <div className="key-row" key={key}><span className={`evidence-badge evidence-${key}`}>{key}</span><small>{value}</small></div>)}</section></aside></div></>
}

function CareerPathsPage({ state, updateState, navigate, toast }: { state: OrbitState; updateState: (patch: Partial<OrbitState>) => void; navigate: (path: string) => void; toast: (message: string) => void }) {
  const selected = roles.find(role => role.id === state.selectedRoleId) || roles[0]
  const score = scoreRole(selected, state.skills)
  return <><PageHeader eyebrow="Direction finder" title="Career paths" copy="Compare your current evidence against role templates. The score is a coverage estimate, never a promise." action={<button className="secondary-button" type="button" onClick={() => navigate('/career-brain')}><Brain size={15} /> Ask Career Brain</button>} /><div className="career-layout"><section className="role-list">{roles.map(role => { const roleScore = scoreRole(role, state.skills); return <button type="button" key={role.id} className={role.id === selected.id ? 'role-card selected' : 'role-card'} onClick={() => updateState({ selectedRoleId: role.id })}><div className="role-card-top"><span className="role-group">{role.group}</span><span className="role-score">{roleScore.coverage}%</span></div><h3>{role.name}</h3><p>{role.summary}</p><div className="mini-progress"><span style={{ width: `${roleScore.coverage}%` }} /></div><div className="role-card-foot"><span>{roleScore.missing} gaps</span><ChevronRight size={15} /></div></button> })}</section><section className="panel role-detail"><div className="role-detail-top"><div><p className="eyebrow">Selected role / {selected.group}</p><h2>{selected.name}</h2><p className="panel-copy">{selected.summary}</p></div><div className="large-score"><strong>{score.coverage}%</strong><span>current coverage</span></div></div><div className="source-line"><ShieldCheck size={14} /> Template source: <a href={selected.sourceUrl} target="_blank" rel="noreferrer">{selected.source}</a> · Reviewed {selected.reviewed}</div><div className="match-summary"><div><span className="summary-number lime-text">{score.strong}</span><small>Strong matches</small></div><div><span className="summary-number amber-text">{score.partial}</span><small>Partial matches</small></div><div><span className="summary-number muted-text">{score.missing}</span><small>Priority gaps</small></div></div><div className="requirements-list"><div className="requirements-heading"><span>Requirement</span><span>Your signal</span></div>{score.gaps.map(gap => <div className="requirement-row" key={gap.skill}><div><strong>{gap.skill}</strong>{gap.mandatory && <span className="mandatory-label">Mandatory</span>}</div><div className="requirement-signal"><div className="tiny-dots">{[1, 2, 3, 4, 5].map(level => <span key={level} className={level <= gap.current ? 'level-dot filled' : 'level-dot'} />)}</div><span>{gap.current}/{gap.required}</span></div></div>)}</div><div className="eligibility-note"><CircleHelp size={16} /><div><strong>Eligibility is separate from skill coverage.</strong><span>Orbit will show unknown or missing degree, branch, deadline, and authorization requirements rather than converting them into a score.</span></div></div><button className="primary-button" type="button" onClick={() => { updateState({ lastAssessment: 'just now' }); toast(`Assessment refreshed for ${selected.name}.`) }}><RefreshCw size={15} /> Recalculate readiness</button></section></div></>
}

function CareerBrainPage({ state, navigate }: { state: OrbitState; navigate: (path: string) => void }) {
  const [question, setQuestion] = useState('What should I do next to become more credible for my target role?')
  const [answer, setAnswer] = useState('')
  const [provider, setProvider] = useState('')
  const [loading, setLoading] = useState(false)
  const role = roles.find(item => item.id === state.selectedRoleId) || roles[0]
  const run = async () => { setLoading(true); try { const response = await fetch('/api/ai/career-brief', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: state.profile.fullName, targetRole: role.name, strengths: strongestSkills(state.skills).map(skill => skill.name), gaps: priorityGaps(role, state.skills).map(gap => gap.skill), roadmap: state.roadmap.title, question }) }); const data = await response.json(); if (!response.ok) throw new Error(data.error || 'Provider unavailable'); setAnswer(data.text); setProvider(data.provider) } catch { setAnswer('The provider could not respond. Keep the question and retry when the connection is restored.'); setProvider('Unavailable') } finally { setLoading(false) } }
  return <><PageHeader eyebrow="Contextual intelligence" title="Career Brain" copy="A focused assistant for your recorded profile, current evidence, and selected direction." action={<button className="secondary-button" type="button" onClick={() => navigate('/career-paths')}><BriefcaseBusiness size={15} /> Change target role</button>} /><div className="brain-layout"><section className="panel brain-query"><div className="brain-symbol"><Brain size={20} /></div><p className="eyebrow">Ask against your context</p><h2>What would make the next step more credible?</h2><textarea value={question} onChange={e => setQuestion(e.target.value)} /><button className="primary-button" type="button" onClick={run} disabled={loading}>{loading ? <><RefreshCw size={15} className="spin" /> Thinking with your profile</> : <><Sparkles size={15} /> Run Career Brain</>}</button><p className="micro-note">Gemini is preferred. OpenRouter is the fallback. Orbit never treats generated advice as official eligibility or a hiring guarantee.</p></section><section className="panel brain-response"><div className="panel-heading compact"><div><p className="eyebrow">Response / {provider || 'not run'}</p><h3>{answer ? 'A grounded next step' : 'Your response will appear here'}</h3></div><span className="provider-status"><span className={answer ? 'status-dot online' : 'status-dot'} />{answer ? (provider || 'Provider response') : 'Ready'}</span></div>{answer ? <div className="response-copy"><p>{answer}</p><div className="response-sources"><strong>Context used</strong><span>{state.skills.length} skill records</span><span>{role.name} requirements</span><span>{state.roadmap.title}</span></div></div> : <div className="empty-brain"><Sparkles size={22} /><p>Ask a role-specific question to connect your profile to a practical move.</p></div>}</section></div></>
}

function RoadmapsPage({ state, updateState, toast }: { state: OrbitState; updateState: (patch: Partial<OrbitState>) => void; toast: (message: string) => void }) {
  const toggleTask = (id: string) => { const tasks = state.roadmap.tasks.map(task => task.id === id ? { ...task, status: task.status === 'completed' ? 'upcoming' as const : 'completed' as const } : task); const complete = tasks.filter(task => task.status === 'completed').length; updateState({ roadmap: { ...state.roadmap, tasks, progress: Math.round((complete / tasks.length) * 100) } }); toast('Roadmap task state saved.') }
  const generateRoadmap = () => { const task = { id: `generated-${Date.now()}`, title: `Publish ${state.profile.targetRole} evidence`, detail: 'Turn your strongest current skill into a clear, reviewable project record.', resource: 'Orbit evidence guide', status: 'upcoming' as const, minutes: 60 }; updateState({ roadmap: { ...state.roadmap, title: `${state.profile.targetRole} evidence sprint`, subtitle: 'Generated from your current profile signal', tasks: [...state.roadmap.tasks, task] } }); toast('A new evidence task was added to your roadmap.') }
  return <><PageHeader eyebrow="Ordered learning" title="Roadmaps" copy="A sequence of small, measurable actions. Complete the work, then submit the evidence." action={<button className="primary-button" type="button" onClick={generateRoadmap}><Sparkles size={15} /> Generate roadmap</button>} /><section className="panel roadmap-detail-panel"><div className="roadmap-detail-head"><div><p className="eyebrow">Active objective</p><h2>{state.roadmap.title}</h2><p>{state.roadmap.subtitle}</p></div><div className="roadmap-progress"><strong>{state.roadmap.progress}%</strong><span>complete</span></div></div><ProgressBar value={state.roadmap.progress} /><div className="roadmap-timeline">{state.roadmap.tasks.map((task, index) => <div className={`roadmap-task ${task.status}`} key={task.id}><div className="timeline-marker">{task.status === 'completed' ? <Check size={14} /> : <span>{String(index + 1).padStart(2, '0')}</span>}</div><div className="task-content"><div className="task-top"><div><span className="task-state">{task.status === 'in-progress' ? 'In progress' : task.status}</span><h3>{task.title}</h3></div><span className="task-time">{task.minutes} min</span></div><p>{task.detail}</p><div className="task-bottom"><span><ArrowUpRight size={13} />{task.resource}</span><button type="button" className={task.status === 'completed' ? 'secondary-button' : 'primary-button'} onClick={() => toggleTask(task.id)}>{task.status === 'completed' ? 'Reopen task' : 'Mark complete'}<Check size={14} /></button></div></div></div>)}</div></section></>
}

function CertificationsPage({ state, updateState, toast }: { state: OrbitState; updateState: (patch: Partial<OrbitState>) => void; toast: (message: string) => void }) {
  const updateStatus = (id: string) => updateState({ certifications: state.certifications.map(cert => cert.id === id ? { ...cert, status: cert.status === 'completed' ? 'in-progress' : 'completed', completedOn: cert.status === 'completed' ? undefined : 'Nov 2026', proofStatus: cert.status === 'completed' ? cert.proofStatus : 'declared' } : cert) })
  const addCertification = () => { const cert = { id: `cert-${Date.now()}`, name: 'New certification record', provider: 'Student entry', status: 'planned' as const, proofStatus: 'declared' as const, source: 'User added' }; updateState({ certifications: [...state.certifications, cert] }); toast('A planned certification record was added.') }
  const addProof = (id: string) => { updateState({ certifications: state.certifications.map(cert => cert.id === id && cert.proofStatus !== 'verified' ? { ...cert, proofStatus: 'pending review' as const } : cert) }); toast('Proof marked as pending review. Upload storage is the next production boundary.') }
  return <><PageHeader eyebrow="Credential records" title="Certifications" copy="Track what you have completed, what is in motion, and what still needs proof." action={<button className="primary-button" type="button" onClick={addCertification}><Plus size={15} /> Add certification</button>} /><div className="cert-grid">{state.certifications.map(cert => <section className="panel cert-card" key={cert.id}><div className="cert-card-top"><div className="cert-logo"><GraduationCap size={19} /></div><span className={`status-pill status-${cert.status}`}>{cert.status}</span></div><p className="eyebrow">{cert.provider}</p><h3>{cert.name}</h3><div className="cert-meta"><span><FileCheck2 size={13} />{cert.proofStatus}</span>{cert.completedOn && <span><Check size={13} />{cert.completedOn}</span>}</div><div className="cert-card-actions"><button className="secondary-button" type="button" onClick={() => addProof(cert.id)}><ShieldCheck size={14} /> {cert.proofStatus === 'verified' ? 'Verified' : cert.proofStatus === 'pending review' ? 'Pending review' : 'Add proof'}</button><button className="text-button" type="button" onClick={() => updateStatus(cert.id)}>{cert.status === 'completed' ? 'Move to progress' : 'Mark complete'} <ArrowUpRight size={13} /></button></div></section>)}</div><div className="source-disclaimer"><ShieldCheck size={14} /> Catalogue records are user-declared unless explicitly marked verified. Provider links and proof review belong to the production integration layer.</div></>
}
function AchievementsPage({ state }: { state: OrbitState }) { return <><PageHeader eyebrow="Milestones" title="Achievements" copy="Motivation is useful when it reflects a real change in your evidence or progress." /><div className="achievement-grid">{state.achievements.map(achievement => <section className={`panel achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}`} key={achievement.id}><div className={`achievement-icon achievement-${achievement.accent}`}>{achievement.unlocked ? <Trophy size={21} /> : <LockKeyhole size={19} />}</div><div><span className="eyebrow">{achievement.unlocked ? 'Unlocked' : 'Next milestone'}</span><h3>{achievement.title}</h3><p>{achievement.description}</p>{achievement.date && <small>{achievement.date}</small>}</div></section>)}</div><section className="panel achievement-note"><Zap size={17} /><div><strong>Badges are deterministic.</strong><span>Orbit only unlocks achievements after the underlying record changes. XP and badges are motivation, not proof of competence.</span></div></section></> }

function ProfilePage({ state, updateState, toast }: { state: OrbitState; updateState: (patch: Partial<OrbitState>) => void; toast: (message: string) => void }) { const [profile, setProfile] = useState(state.profile); const save = () => { updateState({ profile }); toast('Profile changes saved.') }; return <><PageHeader eyebrow="Your context" title="Profile" copy="Keep the context behind your recommendations current." action={<button className="primary-button" type="button" onClick={save}><Check size={15} /> Save changes</button>} /><div className="profile-layout"><section className="panel profile-form"><div className="profile-identity"><div className="profile-avatar-large">{profile.fullName.slice(0, 2).toUpperCase()}</div><div><p className="eyebrow">{profile.username}</p><h3>{profile.fullName}</h3><span>{profile.targetRole}</span></div></div><div className="form-grid"><label>Full name<input value={profile.fullName} onChange={e => setProfile({ ...profile, fullName: e.target.value })} /></label><label>Email address<input value={profile.email} onChange={e => setProfile({ ...profile, email: e.target.value })} /></label><label>Institution<input value={profile.institution} onChange={e => setProfile({ ...profile, institution: e.target.value })} /></label><label>Program<input value={profile.program} onChange={e => setProfile({ ...profile, program: e.target.value })} /></label><label>Branch / specialization<input value={profile.branch} onChange={e => setProfile({ ...profile, branch: e.target.value })} /></label><label>Graduation year<input value={profile.graduationYear} onChange={e => setProfile({ ...profile, graduationYear: e.target.value })} /></label></div></section><aside className="panel profile-side"><p className="eyebrow">Profile completion</p><h3>{profile.profileComplete ? 'Context is ready' : 'Finish your context'}</h3><ProgressBar value={profile.profileComplete ? 100 : 70} /><div className="profile-check"><Check size={14} /> Personal information</div><div className="profile-check"><Check size={14} /> Education context</div><div className="profile-check"><Check size={14} /> Target role selected</div><p className="micro-note">Email and phone verification will be required before production account recovery is enabled.</p></aside></div></> }

function SettingsPage({ toast }: { toast: (message: string) => void }) { return <><PageHeader eyebrow="Workspace controls" title="Settings" copy="Keep the system quiet, clear, and aligned with your consent." /><div className="settings-list"><section className="panel settings-row"><div><h3>AI provider routing</h3><p>Gemini is preferred. OpenRouter is the fallback. Provider failures never block your core records.</p></div><span className="setting-state"><span className="status-dot online" /> Fail-safe on</span></section><section className="panel settings-row"><div><h3>Reduced motion</h3><p>Orbit respects your device preference and keeps transitions informational.</p></div><button className="secondary-button" type="button" onClick={() => toast('Motion preference follows your device settings.')}>Device setting</button></section><section className="panel settings-row"><div><h3>Data boundary</h3><p>This preview stores demo-safe state locally. Production database, RLS, and private storage contracts are documented for the next integration.</p></div><button className="text-button" type="button" onClick={() => toast('Security notes are included in the project docs.')}>View notes <ArrowUpRight size={14} /></button></section></div></> }
