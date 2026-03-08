import { useFilterStore } from '../../store/filterStore';
import type { EscalationRisk } from '../../types/api';
import { Badge } from '../common/Badge';

const ESCALATION_RISKS: Array<{ value: EscalationRisk; label: string; color: string }> = [
  { value: 'low', label: 'Low', color: 'green' },
  { value: 'medium', label: 'Medium', color: 'yellow' },
  { value: 'high', label: 'High', color: 'orange' },
  { value: 'critical', label: 'Critical', color: 'red' },
];

export function EscalationRiskFilter() {
  const escalationRisk = useFilterStore((state) => state.escalationRisk);
  const setEscalationRisk = useFilterStore((state) => state.setEscalationRisk);

  const handleToggle = (risk: EscalationRisk) => {
    if (escalationRisk.includes(risk)) {
      setEscalationRisk(escalationRisk.filter((r) => r !== risk));
    } else {
      setEscalationRisk([...escalationRisk, risk]);
    }
  };

  const handleSelectAll = () => {
    if (escalationRisk.length === ESCALATION_RISKS.length) {
      setEscalationRisk([]);
    } else {
      setEscalationRisk(ESCALATION_RISKS.map((r) => r.value));
    }
  };

  const getBadgeVariant = (color: string) => {
    switch (color) {
      case 'green':
        return 'success';
      case 'yellow':
        return 'warning';
      case 'orange':
        return 'warning';
      case 'red':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-600">
          {escalationRisk.length} selected
        </span>
        <button
          onClick={handleSelectAll}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          {escalationRisk.length === ESCALATION_RISKS.length ? 'Clear All' : 'Select All'}
        </button>
      </div>

      <div className="space-y-2">
        {ESCALATION_RISKS.map((risk) => (
          <label
            key={risk.value}
            className="flex items-center gap-3 py-2 px-2 cursor-pointer hover:bg-gray-50 rounded"
          >
            <input
              type="checkbox"
              checked={escalationRisk.includes(risk.value)}
              onChange={() => handleToggle(risk.value)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <Badge variant={getBadgeVariant(risk.color)}>
              {risk.label}
            </Badge>
          </label>
        ))}
      </div>
    </div>
  );
}
