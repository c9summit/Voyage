import { describe, it, expect, beforeEach } from 'vitest'
import { useAuthStore } from '../useAuthStore'

describe('useAuthStore', () => {
  beforeEach(() => {
    useAuthStore.setState({
      token: null,
      userId: null,
      email: null,
      displayName: null,
      isAuthenticated: false,
    })
  })

  it('starts logged out', () => {
    expect(useAuthStore.getState().isAuthenticated).toBe(false)
  })

  it('sets all fields and isAuthenticated on login', () => {
    useAuthStore.getState().login({
      token: 'abc123',
      userId: 'user-1',
      email: 'test@example.com',
      displayName: 'Test User',
    })

    const state = useAuthStore.getState()
    expect(state.isAuthenticated).toBe(true)
    expect(state.token).toBe('abc123')
    expect(state.displayName).toBe('Test User')
  })

  it('clears all fields on logout', () => {
    useAuthStore.getState().login({
      token: 'abc123',
      userId: 'user-1',
      email: 'test@example.com',
      displayName: 'Test User',
    })

    useAuthStore.getState().logout()

    const state = useAuthStore.getState()
    expect(state.isAuthenticated).toBe(false)
    expect(state.token).toBeNull()
    expect(state.displayName).toBeNull()
  })
})