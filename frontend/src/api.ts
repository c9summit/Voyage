const API_BASE = import.meta.env.VITE_API_BASE_URL

const AUTH_BASE = `${API_BASE}/api/auth`
const VISITS_BASE = `${API_BASE}/api/visits`
const LEADERBOARD_BASE = `${API_BASE}/api/leaderboard`
import { useAuthStore } from './store/useAuthStore'

interface AuthResponse {
  userId: string
  email: string
  displayName: string
  token: string
}

export interface Visit {
  id: string
  countryName: string
  visitedOn: string
  note?: string
}

function authHeaders(): HeadersInit {
  const token = useAuthStore.getState().token
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${AUTH_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function register(
  email: string,
  password: string,
  displayName: string
): Promise<AuthResponse> {
  const res = await fetch(`${AUTH_BASE}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, displayName }),
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function getVisits(): Promise<Visit[]> {
  const res = await fetch(VISITS_BASE, { headers: authHeaders() })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function createVisit(countryName: string): Promise<Visit> {
  const res = await fetch(VISITS_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify({
      countryName,
      visitedOn: new Date().toISOString().split('T')[0], // today, as YYYY-MM-DD
    }),
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}


export interface LeaderboardEntry {
  displayName: string
  countriesVisited: number
}

export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  const res = await fetch(LEADERBOARD_BASE, { headers: authHeaders() })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}