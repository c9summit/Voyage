import { create } from 'zustand'

interface MapState {
  visitedCountries: Set<string>
  allCountryNames: string[]
  setVisitedCountries: (names: string[]) => void
  addVisitedCountry: (name: string) => void
  removeVisitedCountry: (name: string) => void
  setAllCountryNames: (names: string[]) => void
}

export const useMapStore = create<MapState>((set) => ({
  visitedCountries: new Set(),
  allCountryNames: [],

  setVisitedCountries: (names) => set({ visitedCountries: new Set(names) }),

  addVisitedCountry: (name) =>
    set((state) => ({ visitedCountries: new Set(state.visitedCountries).add(name) })),

  removeVisitedCountry: (name) =>
    set((state) => {
      const next = new Set(state.visitedCountries)
      next.delete(name)
      return { visitedCountries: next }
    }),

  setAllCountryNames: (names) => set({ allCountryNames: names }),
}))