import { Input } from '../common/Input';
import { useFilterStore } from '../../store/filterStore';

export function DateRangeFilter() {
  const dateRange = useFilterStore((state) => state.dateRange);
  const setDateRange = useFilterStore((state) => state.setDateRange);

  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const start = e.target.value;
    setDateRange(
      start || dateRange?.end
        ? { start: start || '', end: dateRange?.end || '' }
        : null
    );
  };

  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const end = e.target.value;
    setDateRange(
      dateRange?.start || end
        ? { start: dateRange?.start || '', end: end || '' }
        : null
    );
  };

  return (
    <div className="space-y-3">
      <div>
        <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 mb-1">
          Start Date
        </label>
        <Input
          id="start-date"
          type="date"
          value={dateRange?.start || ''}
          onChange={handleStartChange}
          max={dateRange?.end || undefined}
        />
      </div>
      <div>
        <label htmlFor="end-date" className="block text-sm font-medium text-gray-700 mb-1">
          End Date
        </label>
        <Input
          id="end-date"
          type="date"
          value={dateRange?.end || ''}
          onChange={handleEndChange}
          min={dateRange?.start || undefined}
        />
      </div>
    </div>
  );
}
