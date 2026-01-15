import { useEffect, useRef } from 'react'
import { Project } from '../types/project'
import L from 'leaflet'
import { getMapPinColor } from '../lib/utils'

interface LocationMapProps {
  project: Project
}

export function LocationMap({ project }: LocationMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)

  useEffect(() => {
    if (!mapRef.current) return

    // Initialize map if not already created
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView([37.7749, -122.4194], 5)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapInstanceRef.current)
    }

    const map = mapInstanceRef.current

    // Clear existing markers
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer)
      }
    })

    // Add markers for each location
    const bounds: L.LatLngTuple[] = []

    project.locations.forEach(location => {
      const color = getMapPinColor(location.status)

      const icon = L.divIcon({
        className: 'custom-marker',
        html: `
          <div style="position: relative;">
            <div style="
              width: 32px;
              height: 32px;
              background-color: ${color};
              border: 3px solid white;
              border-radius: 50%;
              box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            "></div>
            <div style="
              position: absolute;
              top: 100%;
              left: 50%;
              transform: translateX(-50%);
              width: 0;
              height: 0;
              border-left: 6px solid transparent;
              border-right: 6px solid transparent;
              border-top: 8px solid ${color};
            "></div>
          </div>
        `,
        iconSize: [32, 40],
        iconAnchor: [16, 40],
      })

      L.marker([location.lat, location.lng], { icon })
        .bindPopup(`
          <div style="min-width: 200px;">
            <div style="font-weight: 600; margin-bottom: 8px; font-size: 14px;">${location.name}</div>
            <div style="font-size: 12px; color: #6b7280; margin-bottom: 4px;">${location.address}</div>
            <div style="font-size: 12px; margin-bottom: 4px;">
              <strong>Status:</strong> ${location.status}
            </div>
            <div style="font-size: 12px; margin-bottom: 4px;">
              <strong>Completion:</strong> ${location.completion}%
            </div>
            <div style="font-size: 11px; color: #9ca3af;">
              Last updated: ${new Date(location.lastUpdated).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </div>
          </div>
        `)
        .addTo(map)

      bounds.push([location.lat, location.lng] as L.LatLngTuple)
    })

    // Fit map to show all markers
    if (bounds.length > 0) {
      map.fitBounds(bounds, { padding: [50, 50] })
    }

    return () => {
      // Cleanup on unmount
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [project])

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-6 transition-colors">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Project Locations</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Interactive Map</p>
      </div>
      <div
        ref={mapRef}
        style={{ height: '400px', borderRadius: '8px' }}
        className="border border-gray-200"
      />
      <div className="mt-4 flex items-center gap-6 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-gray-600">Complete</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <span className="text-gray-600">In Progress</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gray-500"></div>
          <span className="text-gray-600">Not Started</span>
        </div>
      </div>
    </div>
  )
}
