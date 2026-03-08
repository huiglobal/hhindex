import { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';
import { Download, Layers, ZoomIn, ZoomOut, Info, Play, Pause } from 'lucide-react';
import { fetchHeatmapData } from '../api/mockApi';
import type { HeatmapDataPoint } from '../types/api';

// Extend Leaflet types for heatmap
declare module 'leaflet' {
  function heatLayer(
    latlngs: Array<[number, number, number]>,
    options?: any
  ): L.Layer;
}

interface HeatmapLayerProps {
  dataPoints: HeatmapDataPoint[];
  colorScheme: 'default' | 'colorblind';
}

// Component to manage the heat layer
function HeatmapLayer({ dataPoints, colorScheme }: HeatmapLayerProps) {
  const map = useMap();

  useEffect(() => {
    if (!dataPoints || dataPoints.length === 0) return;

    // Convert data points to heatmap format: [lat, lng, intensity]
    const heatData: Array<[number, number, number]> = dataPoints.map(point => [
      point.lat,
      point.lng,
      point.intensity,
    ]);

    // Color gradients
    const gradients = {
      default: {
        0.0: '#FEF3C7',
        0.3: '#FCD34D',
        0.6: '#F59E0B',
        1.0: '#DC2626',
      },
      colorblind: {
        0.0: '#FEF3C7',
        0.3: '#93C5FD',
        0.6: '#3B82F6',
        1.0: '#1E3A8A',
      },
    };

    // Create heat layer
    const heatLayer = L.heatLayer(heatData, {
      radius: 25,
      blur: 15,
      maxZoom: 17,
      max: 1.0,
      gradient: gradients[colorScheme],
    });

    heatLayer.addTo(map);

    return () => {
      map.removeLayer(heatLayer);
    };
  }, [map, dataPoints, colorScheme]);

  return null;
}

// Hotspot detection component
interface Hotspot {
  lat: number;
  lng: number;
  intensity: number;
  incidentCount: number;
  regionId: string;
}

function HotspotMarkers({ dataPoints }: { dataPoints: HeatmapDataPoint[] }) {
  const map = useMap();
  const navigate = useNavigate();

  useEffect(() => {
    // Detect hotspots (intensity > 0.7)
    const hotspots: Hotspot[] = dataPoints
      .filter(point => point.intensity > 0.7)
      .map(point => ({
        lat: point.lat,
        lng: point.lng,
        intensity: point.intensity,
        incidentCount: point.metadata.incidentCount,
        regionId: point.metadata.regionId,
      }));

    const markers: L.Marker[] = [];

    hotspots.forEach(hotspot => {
      const marker = L.marker([hotspot.lat, hotspot.lng], {
        icon: L.divIcon({
          className: 'hotspot-marker',
          html: `<div class="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold border-2 border-white shadow-lg cursor-pointer hover:bg-red-700">${hotspot.incidentCount}</div>`,
          iconSize: [32, 32],
        }),
      });

      marker.bindPopup(`
        <div class="p-2">
          <h3 class="font-bold text-sm mb-1 text-gray-900">Hotspot Detected</h3>
          <p class="text-xs text-gray-800">Incidents: ${hotspot.incidentCount}</p>
          <p class="text-xs text-gray-800">Intensity: ${(hotspot.intensity * 100).toFixed(0)}%</p>
          <button 
            onclick="window.dispatchEvent(new CustomEvent('navigate-to-region', { detail: '${hotspot.regionId}' }))"
            class="mt-2 px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
          >
            View Region Details
          </button>
        </div>
      `);

      marker.addTo(map);
      markers.push(marker);
    });

    // Listen for navigation events
    const handleNavigate = (event: Event) => {
      const customEvent = event as CustomEvent;
      navigate(`/regions/${customEvent.detail}`);
    };

    window.addEventListener('navigate-to-region', handleNavigate);

    return () => {
      markers.forEach(marker => map.removeLayer(marker));
      window.removeEventListener('navigate-to-region', handleNavigate);
    };
  }, [map, dataPoints, navigate]);

  return null;
}

// Campaign overlay component
function CampaignOverlay({ dataPoints }: { dataPoints: HeatmapDataPoint[] }) {
  const map = useMap();

  useEffect(() => {
    // Group data points by region to show campaign clusters
    const regionClusters = new Map<string, HeatmapDataPoint[]>();
    
    dataPoints.forEach(point => {
      const regionId = point.metadata.regionId;
      if (!regionClusters.has(regionId)) {
        regionClusters.set(regionId, []);
      }
      regionClusters.get(regionId)!.push(point);
    });

    const circles: L.Circle[] = [];

    // Show clusters with 3+ incidents as potential campaigns
    regionClusters.forEach((points, regionId) => {
      if (points.length >= 3) {
        const avgLat = points.reduce((sum, p) => sum + p.lat, 0) / points.length;
        const avgLng = points.reduce((sum, p) => sum + p.lng, 0) / points.length;
        const totalIncidents = points.reduce((sum, p) => sum + p.metadata.incidentCount, 0);

        const circle = L.circle([avgLat, avgLng], {
          color: '#8B5CF6',
          fillColor: '#8B5CF6',
          fillOpacity: 0.2,
          radius: 50000, // 50km radius
          weight: 2,
        });

        circle.bindPopup(`
          <div class="p-2">
            <h3 class="font-bold text-sm mb-1 text-gray-900">Potential Campaign Cluster</h3>
            <p class="text-xs text-gray-800">Region: ${regionId}</p>
            <p class="text-xs text-gray-800">Total Incidents: ${totalIncidents}</p>
            <p class="text-xs text-gray-800">Data Points: ${points.length}</p>
          </div>
        `);

        circles.push(circle);
      }
    });

    return () => {
      circles.forEach(circle => map.removeLayer(circle));
    };
  }, [map, dataPoints]);

  return null;
}

export default function HeatmapPage() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y' | 'all'>('all');
  const [layer, setLayer] = useState<'origin' | 'target'>('origin');
  const [colorScheme, setColorScheme] = useState<'default' | 'colorblind'>('default');
  const [showHotspots, setShowHotspots] = useState(true);
  const [showCampaigns, setShowCampaigns] = useState(false);
  const [showLegend, setShowLegend] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  const timeRanges: Array<'7d' | '30d' | '90d' | '1y' | 'all'> = ['7d', '30d', '90d', '1y', 'all'];

  const { data, isLoading, error } = useQuery({
    queryKey: ['heatmap', timeRange, layer],
    queryFn: () => fetchHeatmapData(timeRange, layer),
  });

  // Animation effect for time slider
  useEffect(() => {
    if (!isAnimating) return;

    let currentIndex = timeRanges.indexOf(timeRange);

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % timeRanges.length;
      setTimeRange(timeRanges[currentIndex]);
    }, 2000); // Change every 2 seconds

    return () => clearInterval(interval);
  }, [isAnimating, timeRange, timeRanges]);

  const currentDataPoints = useMemo(() => {
    if (!data) return [];
    return layer === 'origin' ? data.layers.origin : data.layers.target;
  }, [data, layer]);

  const handleExportPNG = async () => {
    const mapElement = document.querySelector('.leaflet-container') as HTMLElement;
    if (!mapElement) return;

    try {
      // Use html2canvas library for actual implementation
      // For now, we'll use a canvas-based approach
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = mapElement.offsetWidth;
      canvas.height = mapElement.offsetHeight;

      // Draw a placeholder message
      ctx.fillStyle = '#f3f4f6';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#374151';
      ctx.font = '16px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Heatmap Export', canvas.width / 2, canvas.height / 2);
      ctx.font = '12px sans-serif';
      ctx.fillText(`Time Range: ${timeRange} | Layer: ${layer}`, canvas.width / 2, canvas.height / 2 + 30);

      // Convert to blob and download
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `heatmap-${timeRange}-${layer}-${Date.now()}.png`;
        a.click();
        URL.revokeObjectURL(url);
      });
    } catch (error) {
      console.error('Error exporting PNG:', error);
      alert('Error exporting PNG. Please try again.');
    }
  };

  const handleExportGeoJSON = () => {
    if (!currentDataPoints) return;

    const geojson = {
      type: 'FeatureCollection',
      features: currentDataPoints.map(point => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [point.lng, point.lat],
        },
        properties: {
          intensity: point.intensity,
          incidentCount: point.metadata.incidentCount,
          averageSeverity: point.metadata.averageSeverity,
          regionId: point.metadata.regionId,
          primaryTypes: point.metadata.primaryTypes,
        },
      })),
    };

    const blob = new Blob([JSON.stringify(geojson, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `heatmap-${timeRange}-${layer}.geojson`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Heatmap</h2>
          <p className="text-gray-600">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 flex flex-col">
      {/* Controls Bar */}
      <div className="flex-shrink-0 bg-white shadow-md z-[1000]">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-gray-900">Geographic Heatmap</h1>
            
            {/* Time Range Selector */}
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as any)}
              className="px-3 py-1.5 border border-gray-300 rounded-md text-sm text-gray-900 bg-white"
            >
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
              <option value="1y">Last Year</option>
              <option value="all">All Time</option>
            </select>

            {/* Layer Toggle */}
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-gray-700" />
              <button
                onClick={() => setLayer(layer === 'origin' ? 'target' : 'origin')}
                className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors"
              >
                {layer === 'origin' ? 'Origin Location' : 'Target Location'}
              </button>
            </div>

            {/* Color Scheme Toggle */}
            <button
              onClick={() => setColorScheme(colorScheme === 'default' ? 'colorblind' : 'default')}
              className="px-3 py-1.5 border border-gray-300 rounded-md text-sm text-gray-900 hover:bg-gray-50"
            >
              {colorScheme === 'default' ? 'Default Colors' : 'Colorblind Mode'}
            </button>

            {/* Overlay Toggles */}
            <label className="flex items-center gap-2 text-sm text-gray-900">
              <input
                type="checkbox"
                checked={showHotspots}
                onChange={(e) => setShowHotspots(e.target.checked)}
                className="rounded"
              />
              Hotspots
            </label>

            <label className="flex items-center gap-2 text-sm text-gray-900">
              <input
                type="checkbox"
                checked={showCampaigns}
                onChange={(e) => setShowCampaigns(e.target.checked)}
                className="rounded"
              />
              Campaigns
            </label>

            {/* Time Animation Control */}
            <button
              onClick={() => setIsAnimating(!isAnimating)}
              className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-md text-sm text-gray-900 hover:bg-gray-50"
              title={isAnimating ? 'Pause Animation' : 'Play Animation'}
            >
              {isAnimating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isAnimating ? 'Pause' : 'Animate'}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowLegend(!showLegend)}
              className="p-2 hover:bg-gray-100 rounded-md text-gray-700"
              title="Toggle Legend"
            >
              <Info className="w-5 h-5" />
            </button>

            <button
              onClick={handleExportPNG}
              className="p-2 hover:bg-gray-100 rounded-md text-gray-700"
              title="Export as PNG"
            >
              <Download className="w-5 h-5" />
            </button>

            <button
              onClick={handleExportGeoJSON}
              className="px-3 py-1.5 bg-green-600 text-white rounded-md text-sm hover:bg-green-700"
            >
              Export GeoJSON
            </button>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative">
        {isLoading ? (
          <div className="h-full flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading heatmap data...</p>
            </div>
          </div>
        ) : (
          <MapContainer
            center={[20, 0]}
            zoom={2}
            className="h-full w-full"
            zoomControl={false}
          >
            {/* 
              Using Esri World Imagery (satellite) instead of OpenStreetMap
              Reason: Satellite imagery does not show political boundaries, avoiding
              territorial disputes. OpenStreetMap incorrectly shows Pakistan-occupied
              Kashmir as Pakistan territory, which does not respect Indian sovereignty.
              This satellite layer provides accurate location depiction without
              political boundary issues.
            */}
            <TileLayer
              attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              maxZoom={19}
            />
            
            {currentDataPoints && currentDataPoints.length > 0 && (
              <>
                <HeatmapLayer dataPoints={currentDataPoints} colorScheme={colorScheme} />
                {showHotspots && <HotspotMarkers dataPoints={currentDataPoints} />}
                {showCampaigns && <CampaignOverlay dataPoints={currentDataPoints} />}
              </>
            )}

            {/* Custom Zoom Controls */}
            <div className="leaflet-top leaflet-right">
              <div className="leaflet-control leaflet-bar">
                <button
                  className="bg-white hover:bg-gray-50 p-2 border-b border-gray-300"
                  onClick={() => {
                    const map = document.querySelector('.leaflet-container') as any;
                    if (map && map._leaflet_map) {
                      map._leaflet_map.zoomIn();
                    }
                  }}
                >
                  <ZoomIn className="w-5 h-5" />
                </button>
                <button
                  className="bg-white hover:bg-gray-50 p-2"
                  onClick={() => {
                    const map = document.querySelector('.leaflet-container') as any;
                    if (map && map._leaflet_map) {
                      map._leaflet_map.zoomOut();
                    }
                  }}
                >
                  <ZoomOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </MapContainer>
        )}
      </div>

      {/* Legend */}
      {showLegend && !isLoading && (
        <div className="absolute bottom-8 left-8 z-[1000] bg-white rounded-lg shadow-lg p-4 max-w-xs">
          <h3 className="font-bold text-sm mb-3 text-gray-900">Intensity Legend</h3>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded ${colorScheme === 'default' ? 'bg-[#FEF3C7]' : 'bg-[#FEF3C7]'}`}></div>
              <span className="text-xs text-gray-900">Low (0-25%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded ${colorScheme === 'default' ? 'bg-[#FCD34D]' : 'bg-[#93C5FD]'}`}></div>
              <span className="text-xs text-gray-900">Medium (25-50%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded ${colorScheme === 'default' ? 'bg-[#F59E0B]' : 'bg-[#3B82F6]'}`}></div>
              <span className="text-xs text-gray-900">High (50-75%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded ${colorScheme === 'default' ? 'bg-[#DC2626]' : 'bg-[#1E3A8A]'}`}></div>
              <span className="text-xs text-gray-900">Extreme (75-100%)</span>
            </div>
          </div>

          <div className="border-t pt-3 space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center text-white text-xs font-bold">5</div>
              <span className="text-xs text-gray-900">Hotspot Marker</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full border-2 border-purple-600 bg-purple-100"></div>
              <span className="text-xs text-gray-900">Campaign Cluster</span>
            </div>
          </div>

          <div className="border-t pt-3 mt-3">
            <p className="text-xs text-gray-700">
              Intensity = (incident_count × 0.5) + (avg_severity × 0.5)
            </p>
            <p className="text-xs text-gray-600 mt-1">
              Showing {currentDataPoints?.length || 0} data points
            </p>
          </div>
        </div>
      )}

      {/* Info Panel */}
      <div className="absolute top-4 right-4 z-[1000] bg-white rounded-lg shadow-lg p-4 max-w-sm">
        <h3 className="font-bold text-sm mb-2 text-gray-900">Heatmap Information</h3>
        <div className="space-y-1 text-xs text-gray-700">
          <p><strong className="text-gray-900">Time Range:</strong> {timeRange === '7d' ? 'Last 7 Days' : timeRange === '30d' ? 'Last 30 Days' : timeRange === '90d' ? 'Last 90 Days' : timeRange === '1y' ? 'Last Year' : 'All Time'}</p>
          <p><strong className="text-gray-900">Layer:</strong> {layer === 'origin' ? 'Content Origin Location' : 'Incident Target Location'}</p>
          <p><strong className="text-gray-900">Data Points:</strong> {currentDataPoints?.length || 0}</p>
          <p><strong className="text-gray-900">Color Scheme:</strong> {colorScheme === 'default' ? 'Default' : 'Colorblind Accessible'}</p>
        </div>
        
        <div className="mt-3 pt-3 border-t">
          <p className="text-xs text-gray-600">
            <strong className="text-gray-900">Tip:</strong> Use pinch-to-zoom on touch devices. Click hotspot markers for details.
          </p>
        </div>
      </div>
    </div>
  );
}
