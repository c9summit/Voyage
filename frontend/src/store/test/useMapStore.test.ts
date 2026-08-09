import { describe, it, expect, beforeEach } from 'vitest'
import { useMapStore } from '../useMapStore'

describe('useMapStore', () => {
  beforeEach(() => {
    useMapStore.setState({
      visitedCountries: new Set(),
      allCountryNames: [],
    })
  })

  it('starts with no visited countries', () => {
    expect(useMapStore.getState().visitedCountries.size).toBe(0)
  })

  it('adds a country to the visited set', () => {
    useMapStore.getState().addVisitedCountry('France')
    expect(useMapStore.getState().visitedCountries.has('France')).toBe(true)
  })

  it('removes a country from the visited set', () => {
    useMapStore.getState().addVisitedCountry('France')
    useMapStore.getState().removeVisitedCountry('France')
    expect(useMapStore.getState().visitedCountries.has('France')).toBe(false)
  })

  it('replaces the entire set via setVisitedCountries', () => {
    useMapStore.getState().addVisitedCountry('France')
    useMapStore.getState().setVisitedCountries(['Japan', 'Brazil'])

    const state = useMapStore.getState()
    expect(state.visitedCountries.has('France')).toBe(false)
    expect(state.visitedCountries.has('Japan')).toBe(true)
    expect(state.visitedCountries.has('Brazil')).toBe(true)
  })
})