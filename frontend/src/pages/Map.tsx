import { useState, useEffect, useMemo } from 'react'
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from '@vnedyalk0v/react19-simple-maps'
import worldData from '../assets/countries-110m.json'
import './Map.css'
import type { Longitude, Latitude } from '@vnedyalk0v/react19-simple-maps'
import { getContinent, CONTINENT_NAMES } from '../data/continents'
import { createVisit } from '../api'
import { useMapStore } from '../store/useMapStore'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'

interface GeoFeature {
  rsmKey: string
  properties: {name : string; [key: string]: unknown}
}

interface HoverInfo {
  name: string
  continent: string
  visited: boolean
  x: number
  y: number
}

const MIN_ZOOM = 1
const MAX_ZOOM = 8
const TOTAL_COUNTRIES = 177
const FOG_COLOR = '#81868f'
const CHARTED_COLOR = '#c9a24b'


function CompassRose({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="46" fill="none" stroke="#4a3419" strokeWidth="1" />
      <circle cx="50" cy="50" r="38" fill="none" stroke="#4a3419" strokeWidth="0.5" />
      {/* 8-point star */}
      <path d="M50 4 L55 45 L50 50 L45 45 Z" fill="#4a3419" />
      <path d="M50 96 L45 55 L50 50 L55 55 Z" fill="#8a6a2f" />
      <path d="M4 50 L45 45 L50 50 L45 55 Z" fill="#8a6a2f" />
      <path d="M96 50 L55 55 L50 50 L55 45 Z" fill="#8a6a2f" />
      <path d="M17 17 L47 42 L50 50 L42 47 Z" fill="#6b4f22" />
      <path d="M83 83 L53 58 L50 50 L58 53 Z" fill="#6b4f22" />
      <path d="M17 83 L42 53 L50 50 L47 58 Z" fill="#6b4f22" />
      <path d="M83 17 L58 47 L50 50 L53 42 Z" fill="#6b4f22" />
      <text x="50" y="16" textAnchor="middle" fontSize="7" fill="#3a2a14" fontFamily="serif">N</text>
    </svg>
  )
}

export default function MapPage() {
  const [position, setPosition] = useState({
    coordinates: [0, 0] as [Longitude, Latitude],
    zoom: 1.3,
  })
  const visitedCountries = useMapStore((state) => state.visitedCountries)
  const allCountryNames = useMapStore((state) => state.allCountryNames)
  const addVisitedCountry = useMapStore((state) => state.addVisitedCountry)
  const removeVisitedCountry = useMapStore((state) => state.removeVisitedCountry)
  const setAllCountryNames = useMapStore((state) => state.setAllCountryNames)
  const [hover, setHover] = useState<HoverInfo | null>(null)
  const navigate = useNavigate()
const logout = useAuthStore((state) => state.logout)

function handleLogout() {
  logout()
  navigate('/login')
}

  useEffect(() => {
  const names = (worldData as any).objects.countries.geometries.map(
    (g: any) => g.properties.name
  )
  setAllCountryNames(names)
}, [])

  async function handleCountryClick(countryName: string) {
    if (visitedCountries.has(countryName)) return

    addVisitedCountry(countryName)
    try {
      await createVisit(countryName)
    } catch (err) {
      console.error('Failed to save visit', err)
      removeVisitedCountry(countryName)
    }
  }

  function handleMoveEnd(pos: { coordinates: [Longitude, Latitude]; zoom: number }) {
    setPosition(pos)
  }

    const continentStats = useMemo(() => {
    const totals: Record<string, number> = {}
    const visited: Record<string, number> = {}
    for (const name of CONTINENT_NAMES) {
      totals[name] = 0
      visited[name] = 0
    }

    for (const countryName of allCountryNames) {
      const continent = getContinent(countryName)
      if (!(continent in totals)) continue
      totals[continent] += 1
      if (visitedCountries.has(countryName)) visited[continent] += 1
    }

    return CONTINENT_NAMES.map((name) => ({
      name,
      visited: visited[name],
      total: totals[name],
    }))
  }, [allCountryNames, visitedCountries])

  return (
    <div className="map-page">
      <div className="map-page__layout">
      <div className="map-page__frame">
        <div className="map-page__paper">
          <ComposableMap className="map-page__canvas" projectionConfig={{ scale: 147 }}>
            <defs>
              <filter id="handDrawn">
                <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" />
              </filter>
            </defs>


            <ZoomableGroup
              center={position.coordinates}
              zoom={position.zoom}
              minZoom={MIN_ZOOM}
              maxZoom={MAX_ZOOM}
              onMoveEnd={handleMoveEnd}
            >
              <Geographies geography={worldData}>
                {({ geographies }: { geographies: GeoFeature[] }) =>
                  geographies.map((geo) => {
                    const name = geo.properties.name
                    const isCharted = visitedCountries.has(geo.properties.name)
                    const fill = isCharted ? CHARTED_COLOR : FOG_COLOR

                    return (
                      <Geography
                        key={`${geo.rsmKey}-${isCharted}`}
                        geography={geo}
                        onClick={() => handleCountryClick(geo.properties.name)}
                        onMouseEnter={(evt: React.MouseEvent) =>
                          setHover({
                            name,
                            continent: getContinent(name),
                            visited: isCharted,
                            x: evt.clientX,
                            y: evt.clientY,
                          })
                        }
                        

                        onMouseLeave={() => setHover(null)}
                        style={{
                          default: {
                            fill,
                            stroke: '#4a3419',
                            strokeWidth: 0.5,
                            outline: 'none',
                            filter: 'url(#handDrawn)',
                          },
                          hover: {
                            fill: isCharted ? '#ddb95c' : '#a5afba',
                            stroke: '#4a3419',
                            strokeWidth: 0.5,
                            outline: 'none',
                            filter: 'url(#handDrawn)',
                            cursor: 'pointer',
                          },
                          pressed: {
                            fill: isCharted ? '#a98332' : '#6f7a89',
                            stroke: '#4a3419',
                            strokeWidth: 0.5,
                            outline: 'none',
                            filter: 'url(#handDrawn)',
                          },
                        }}
                      />
                    )
                  })
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>

          

          <CompassRose className="map-page__compass map-page__compass--top-left" />
          <CompassRose className="map-page__compass map-page__compass--bottom-right" />
        </div>
      </div>
      <aside className="map-page__sidebar">
          <button className="porthole-btn porthole-btn--logout" onClick={handleLogout} aria-label="Logout"><span className="porthole-btn__icon">⎋</span></button>
          <div className="map-page__progress-group">
          <h2 className="map-page__sidebar-title">Progress</h2>
          <p className="map-page__stat">
            {visitedCountries.size} / {TOTAL_COUNTRIES}
          </p>
          </div>
          <div className="map-page__continents">
            {continentStats.map((c) => (
              <div key={c.name} className="map-page__continent-row">
                <span className="map-page__continent-name">{c.name}</span>
                <span className="map-page__continent-count">
                  {c.visited}/{c.total}
                </span>
              </div>
            ))}
          </div>
            <Link to="/leaderboard" className="porthole-btn porthole-btn--leaderboard" aria-label="Leaderboard"><span className="porthole-btn__icon">⚑</span></Link>
        </aside>
        </div>
        
        {hover && (
        <div
          className="map-page__tooltip"
          style={{ left: hover.x + 16, top: hover.y + 16 }}
        >
          <p className="map-page__tooltip-name">{hover.name}</p>
          <p className="map-page__tooltip-continent">{hover.continent}</p>
          <p className={`map-page__tooltip-status ${hover.visited ? 'is-visited' : ''}`}>
            {hover.visited ? '✓ Charted' : 'Unexplored'}
          </p>
        </div>
      )}
    </div>
  )
}