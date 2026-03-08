import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Incident } from '../../types/api';

// Fix for default marker icons in Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface IncidentMapProps {
  incidents: Incident[];
  height?: string;
  onIncidentClick?: (incident: Incident) => void;
}

export function IncidentMap({ incidents, height = '500px', onIncidentClick }: IncidentMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<L.CircleMarker[]>([]);

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current).setView([20, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);

    mapRef.current = map;

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Update markers when incidents change
  useEffect(() => {
    if (!mapRef.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => {
      mapRef.current?.removeLayer(marker);
    });
    markersRef.current = [];

    // Create markers
    const markers: L.CircleMarker[] = [];

    incidents.forEach((incident) => {
      const { lat, lng } = incident.location.coordinates;

      // Determine marker color based on severity
      const color = getSeverityColor(incident.severity);
      
      const marker = L.circleMarker([lat, lng], {
        radius: 8,
        fillColor: color,
        color: '#fff',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8,
      });

      // Create popup content
      const popupContent = `
        <div class="p-2 min-w-[200px]">
          <h3 class="font-semibold text-sm mb-1">${incident.title}</h3>
          <p class="text-xs text-gray-600 mb-2">${incident.location.city}, ${incident.location.state}, ${incident.location.country}</p>
          <div class="flex items-center gap-2 mb-2">
            <span class="text-xs font-medium px-2 py-0.5 rounded" style="background-color: ${color}20; color: ${color}">
              Severity: ${incident.severity}/10
            </span>
          </div>
          <p class="text-xs text-gray-700 line-clamp-2">${incident.description}</p>
          <p class="text-xs text-gray-500 mt-2">${new Date(incident.date).toLocaleDateString()}</p>
        </div>
      `;

      marker.bindPopup(popupContent);

      if (onIncidentClick) {
        marker.on('click', () => onIncidentClick(incident));
      }

      marker.addTo(mapRef.current!);
      markers.push(marker);
    });

    markersRef.current = markers;

    // Fit bounds to show all markers
    if (markers.length > 0) {
      const group = L.featureGroup(markers);
      mapRef.current.fitBounds(group.getBounds().pad(0.1));
    }
  }, [incidents, onIncidentClick]);

  return (
    <div className="relative">
      <div
        ref={mapContainerRef}
        style={{ height, width: '100%' }}
        className="rounded-lg overflow-hidden border border-gray-200"
      />
      {incidents.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-90 rounded-lg">
          <p className="text-gray-500">No incidents to display</p>
        </div>
      )}
    </div>
  );
}

function getSeverityColor(severity: number): string {
  if (severity <= 3) return '#10B981'; // Green
  if (severity <= 6) return '#F59E0B'; // Yellow
  if (severity <= 8) return '#F97316'; // Orange
  return '#EF4444'; // Red
}
