import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getContinent, CONTINENT_NAMES } from '../continents'

describe('getContinent', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('returns the correct continent for a known country', () => {
    expect(getContinent('France')).toBe('Europe')
    expect(getContinent('Japan')).toBe('Asia')
    expect(getContinent('Brazil')).toBe('South America')
  })

  it('returns "Unknown" for an unmapped country', () => {
    expect(getContinent('Not A Real Country')).toBe('Unknown')
  })

  it('logs a warning only once per unmapped country', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

    getContinent('Fakelandia')
    getContinent('Fakelandia')
    getContinent('Fakelandia')

    expect(warnSpy).toHaveBeenCalledTimes(1)
  })

  it('exposes exactly six continent groups', () => {
    expect(CONTINENT_NAMES).toHaveLength(6)
  })
})