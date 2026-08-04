import { useState } from 'react'
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Graticule,
} from '@vnedyalk0v/react19-simple-maps'
import worldData from '../assets/countries-110m.json'
import './Map.css'

interface GeoFeature {
  rsmKey: string
  properties: Record<string, unknown>
}

const MIN_ZOOM = 1
const MAX_ZOOM = 8

// Warm sepia/parchment tones instead of gray-blue fog
const AGED_PALETTE = ['#c9a774', '#d4b483', '#bfa06a', '#cfa878']

function shadeFor(id: string) {
  let hash = 0
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) % AGED_PALETTE.length
  }
  return AGED_PALETTE[Math.abs(hash)]
}

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
    coordinates: [0, 0] as [number, number],
    zoom: 1.3,
  })

  function handleMoveEnd(pos: { coordinates: [number, number]; zoom: number }) {
    setPosition(pos)
  }

  return (
    <div className="map-page">
      <h1 className="map-page__title">Charting the Unknown</h1>

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
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      style={{
                        default: {
                          fill: shadeFor(geo.rsmKey),
                          stroke: '#4a3419',
                          strokeWidth: 0.5,
                          outline: 'none',
                          filter: 'url(#handDrawn)',
                        },
                        hover: {
                          fill: '#e0c294',
                          stroke: '#4a3419',
                          strokeWidth: 0.5,
                          outline: 'none',
                          filter: 'url(#handDrawn)',
                          cursor: 'pointer',
                        },
                        pressed: {
                          fill: '#a98851',
                          stroke: '#4a3419',
                          strokeWidth: 0.5,
                          outline: 'none',
                          filter: 'url(#handDrawn)',
                        },
                      }}
                    />
                  ))
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>

          

          <CompassRose className="map-page__compass map-page__compass--top-left" />
          <CompassRose className="map-page__compass map-page__compass--bottom-right" />
        </div>
      </div>
    </div>
  )
}