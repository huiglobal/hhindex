import { useState, useEffect } from 'react';
import { useFilterStore } from '../../store/filterStore';

export function SeverityFilter() {
  const severityRange = useFilterStore((state) => state.severityRange);
  const setSeverityRange = useFilterStore((state) => state.setSeverityRange);
  
  const [localMin, setLocalMin] = useState(severityRange[0]);
  const [localMax, setLocalMax] = useState(severityRange[1]);

  useEffect(() => {
    setLocalMin(severityRange[0]);
    setLocalMax(severityRange[1]);
  }, [severityRange]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setLocalMin(value);
    if (value <= localMax) {
      setSeverityRange([value, localMax]);
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setLocalMax(value);
    if (value >= localMin) {
      setSeverityRange([localMin, value]);
    }
  };

  const getSeverityLabel = (value: number): string => {
    if (value <= 3) return 'Low';
    if (value <= 6) return 'Medium';
    if (value <= 8) return 'High';
    return 'Critical';
  };

  const getSeverityColor = (value: number): string => {
    if (value <= 3) return 'text-green-600';
    if (value <= 6) return 'text-yellow-600';
    if (value <= 8) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-center">
          <div className={`text-2xl font-bold ${getSeverityColor(localMin)}`}>
            {localMin}
          </div>
          <div className="text-xs text-gray-500">{getSeverityLabel(localMin)}</div>
        </div>
        <div className="text-gray-400">—</div>
        <div className="text-center">
          <div className={`text-2xl font-bold ${getSeverityColor(localMax)}`}>
            {localMax}
          </div>
          <div className="text-xs text-gray-500">{getSeverityLabel(localMax)}</div>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <label htmlFor="severity-min" className="block text-sm font-medium text-gray-700 mb-2">
            Minimum Severity
          </label>
          <input
            id="severity-min"
            type="range"
            min="1"
            max="10"
            value={localMin}
            onChange={handleMinChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>

        <div>
          <label htmlFor="severity-max" className="block text-sm font-medium text-gray-700 mb-2">
            Maximum Severity
          </label>
          <input
            id="severity-max"
            type="range"
            min="1"
            max="10"
            value={localMax}
            onChange={handleMaxChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>
      </div>

      <div className="pt-2 border-t border-gray-200">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>1 (Low)</span>
          <span>10 (Critical)</span>
        </div>
      </div>
    </div>
  );
}
