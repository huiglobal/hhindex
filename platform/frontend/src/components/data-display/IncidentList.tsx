import { useNavigate } from 'react-router-dom';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import type { Incident } from '../../types/api';
import { MapPin, Calendar, AlertTriangle } from 'lucide-react';

interface IncidentListProps {
  incidents: Incident[];
  onIncidentClick?: (incident: Incident) => void;
}

export function IncidentList({ incidents, onIncidentClick }: IncidentListProps) {
  const navigate = useNavigate();

  const handleClick = (incident: Incident) => {
    if (onIncidentClick) {
      onIncidentClick(incident);
    } else {
      navigate(`/incidents/${incident.id}`);
    }
  };

  const getSeverityVariant = (severity: number) => {
    if (severity <= 3) return 'success';
    if (severity <= 6) return 'warning';
    return 'error';
  };

  const getEscalationVariant = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'success';
      case 'medium':
        return 'warning';
      case 'high':
      case 'critical':
        return 'error';
      default:
        return 'default';
    }
  };

  if (incidents.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No incidents found matching your filters.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {incidents.map((incident) => (
        <Card
          key={incident.id}
          variant="outlined"
          padding="md"
          hoverable
          onClick={() => handleClick(incident)}
          className="cursor-pointer transition-all hover:shadow-lg"
        >
          <div className="flex flex-col gap-3">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {incident.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {incident.description}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <Badge variant={getSeverityVariant(incident.severity)}>
                  Severity: {incident.severity}/10
                </Badge>
                {incident.impactAssessment.escalationRisk !== 'low' && (
                  <Badge variant={getEscalationVariant(incident.impactAssessment.escalationRisk)}>
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    {incident.impactAssessment.escalationRisk.toUpperCase()}
                  </Badge>
                )}
              </div>
            </div>

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>
                  {incident.location.city}, {incident.location.state}, {incident.location.country}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(incident.date).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">{incident.taxonomyCategory}</Badge>
              {incident.isCoordinatedCampaign && (
                <Badge variant="warning">Coordinated Campaign</Badge>
              )}
              <Badge variant="default">{incident.status}</Badge>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
