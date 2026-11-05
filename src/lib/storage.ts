import type { OrbitState } from './types'

const STATE_KEY = 'orbit_state_v1'
const SESSION_KEY = 'orbit_session_v1'
const stateKey = (username: string) => `${STATE_KEY}:${username.toLowerCase()}`

export function loadState(fallback: OrbitState, username?: string) {
  try {
    const key = username ? stateKey(username) : fallback.profile.username ? stateKey(fallback.profile.username) : STATE_KEY
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as OrbitState) : fallback
  } catch {
    return fallback
  }
}

export function saveState(state: OrbitState) {
  try { localStorage.setItem(stateKey(state.profile.username), JSON.stringify(state)) } catch { /* storage is optional in embedded previews */ }
}

export function hasSession() {
  try { return Boolean(localStorage.getItem(SESSION_KEY)) } catch { return false }
}

export function currentSession() {
  try { return localStorage.getItem(SESSION_KEY) || '' } catch { return '' }
}

export function saveSession(username: string) {
  try { localStorage.setItem(SESSION_KEY, username) } catch { /* no-op */ }
}

export function clearSession() {
  try { localStorage.removeItem(SESSION_KEY) } catch { /* no-op */ }
}
