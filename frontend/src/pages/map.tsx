import { useState } from 'react'
import { ComposableMap, Geographies, Geography, ZoomableGroup, Graticule } from '@vnedyalk0v/react19-simple-maps'
import worldData from '../assets/countries-110m.json'
import './Map.css'


interface GeoFeature {
  rsmKey: string
  properties: Record<string, unknown>
}

const MIN_ZOOM = 1
const MAX_ZOOM = 8

export default function MapPage() {
  const [position, setPosition] = useState({ coordinates: [0, 0] as [number, number], zoom: 1 })

  function handleMoveEnd(pos: { coordinates: [number, number]; zoom: number }) {
    setPosition(pos)
  }

  return (
    <div className="map-page">

      <div className="map-page__frame">
        <ComposableMap className="map-page__canvas" projectionConfig={{ scale: 147 }}>
          <defs>
    <filter id="handDrawn">
      <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" result="noise" />
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" />
    </filter>
  </defs>
          <Graticule stroke="#8a6a2f" strokeWidth={0.3} strokeOpacity={0.35} />


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
                    className="map-page__country"
                    style={{
                      default: { outline: 'none' , filter: 'url(#handDrawn)'},
                      hover: { outline: 'none' , filter: 'url(#handDrawn)'},
                      pressed: { outline: 'none' , filter: 'url(#handDrawn)'},
                    }}
                  />
                ))
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>

        <svg className="map-page__compass" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="46" fill="none" stroke="#d4af37" strokeWidth="1.5" />
    <circle cx="50" cy="50" r="38" fill="none" stroke="#d4af37" strokeWidth="0.5" />
    <path d="M50 6 L56 46 L50 50 L44 46 Z" fill="#d4af37" />
    <path d="M50 94 L44 54 L50 50 L56 54 Z" fill="#8a6a2f" />
    <path d="M6 50 L46 44 L50 50 L46 56 Z" fill="#8a6a2f" />
    <path d="M94 50 L54 56 L50 50 L54 44 Z" fill="#8a6a2f" />
    <text x="50" y="18" textAnchor="middle" fontSize="8" fill="#d4af37" fontFamily="serif">N</text>
  </svg>
      </div>
    </div>
  )
}