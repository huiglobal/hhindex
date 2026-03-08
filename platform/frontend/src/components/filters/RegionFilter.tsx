import { useState, useEffect } from 'react';
import { useFilterStore } from '../../store/filterStore';
import { fetchRegions } from '../../api/mockApi';
import type { Region } from '../../types/api';

export function RegionFilter() {
  const [regions, setRegions] = useState<Region[]>([]);
  const [loading, setLoading] = useState(true);
  const selectedRegions = useFilterStore((state) => state.selectedRegions);
  const setSelectedRegions = useFilterStore((state) => state.setSelectedRegions);

  useEffect(() => {
    fetchRegions()
      .then((data) => {
        setRegions(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to fetch regions:', error);
        setLoading(false);
      });
  }, []);

  const handleToggle = (regionId: string) => {
    if (selectedRegions.includes(regionId)) {
      setSelectedRegions(selectedRegions.filter((id) => id !== regionId));
    } else {
      setSelectedRegions([...selectedRegions, regionId]);
    }
  };

  const handleSelectAll = () => {
    if (selectedRegions.length === regions.length) {
      setSelectedRegions([]);
    } else {
      setSelectedRegions(regions.map((r) => r.id));
    }
  };

  if (loading) {
    return <div className="text-sm text-gray-500">Loading regions...</div>;
  }

  // Group regions by type
  const countries = regions.filter((r) => r.type === 'country');
  const states = regions.filter((r) => r.type === 'state');

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-600">
          {selectedRegions.length} selected
        </span>
        <button
          onClick={handleSelectAll}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          {selectedRegions.length === regions.length ? 'Clear All' : 'Select All'}
        </button>
      </div>

      <div className="max-h-64 overflow-y-auto space-y-2">
        {/* Countries */}
        {countries.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Countries</p>
            {countries.map((region) => (
              <label
                key={region.id}
                className="flex items-center gap-2 py-1 cursor-pointer hover:bg-gray-50 rounded px-2"
              >
                <input
                  type="checkbox"
                  checked={selectedRegions.includes(region.id)}
                  onChange={() => handleToggle(region.id)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{region.name}</span>
              </label>
            ))}
          </div>
        )}

        {/* States */}
        {states.length > 0 && (
          <div className="mt-3">
            <p className="text-xs font-semibold text-gray-500 uppercase mb-2">States/Provinces</p>
            {states.map((region) => (
              <label
                key={region.id}
                className="flex items-center gap-2 py-1 cursor-pointer hover:bg-gray-50 rounded px-2"
              >
                <input
                  type="checkbox"
                  checked={selectedRegions.includes(region.id)}
                  onChange={() => handleToggle(region.id)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{region.name}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
