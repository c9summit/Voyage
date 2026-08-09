import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  token: string | null
  userId: string | null
  email: string | null
  displayName: string | null
  isAuthenticated: boolean
  login: (data: { token: string; userId: string; email: string; displayName: string }) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      userId: null,
      email: null,
      displayName: null,
      isAuthenticated: false,
      login: ({ token, userId, email, displayName }) =>
        set({ token, userId, email, displayName, isAuthenticated: true }),
      logout: () =>
        set({ token: null, userId: null, email: null, displayName: null, isAuthenticated: false }),
    }),
    { name: 'charted-lands-auth' } 
  )
)