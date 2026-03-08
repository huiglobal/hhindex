import { useState, useMemo } from 'react';
import { StatCard } from '../components/data-display/StatCard';
import { FilterPanel } from '../components/filters/FilterPanel';
import { IncidentMap } from '../components/visualizations/IncidentMap';
import { TimelineChart } from '../components/visualizations/TimelineChart';
import { IncidentList } from '../components/data-display/IncidentList';
import { Pagination } from '../components/common/Pagination';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { useFilterStore } from '../store/filterStore';
import { useIncidents } from '../hooks/useIncidents';
import { useStatistics, useWeeklyTrends, useCampaigns } from '../hooks/useStatistics';
import {
  Filter,
  TrendingUp,
  AlertTriangle,
  Target,
  Activity,
  Users,
} from 'lucide-react';

export default function DashboardPage() {
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;

  // Get filters from store
  const filterState = useFilterStore((state) => ({
    dateRange: state.dateRange,
    regions: state.selectedRegions,
    incidentTypes: state.selectedIncidentTypes,
    taxonomyCategories: state.selectedTaxonomyCategories,
    severityRange: state.severityRange,
    verificationStatus: state.verificationStatus,
    escalationRisk: state.escalationRisk,
    searchQuery: state.searchQuery,
  }));

  // Convert to FilterOptions format
  const filters = useMemo(() => ({
    dateRange: filterState.dateRange || undefined,
    regions: filterState.regions.length > 0 ? filterState.regions : undefined,
    incidentTypes: filterState.incidentTypes.length > 0 ? filterState.incidentTypes : undefined,
    taxonomyCategories: filterState.taxonomyCategories.length > 0 ? filterState.taxonomyCategories : undefined,
    severityRange: filterState.severityRange,
    verificationStatus: filterState.verificationStatus.length > 0 ? filterState.verificationStatus : undefined,
    escalationRisk: filterState.escalationRisk.length > 0 ? filterState.escalationRisk : undefined,
    searchQuery: filterState.searchQuery || undefined,
  }), [filterState]);

  // Fetch data
  const { data: incidentsData, isLoading: incidentsLoading } = useIncidents(
    filters,
    { page: currentPage, pageSize }
  );
  const { data: statistics, isLoading: statsLoading } = useStatistics();
  const { data: weeklyTrends, isLoading: trendsLoading } = useWeeklyTrends();
  const { data: campaigns, isLoading: campaignsLoading } = useCampaigns('active');

  // Process timeline data
  const timelineData = useMemo(() => {
    if (!statistics?.trends.monthly) return [];
    
    return statistics.trends.monthly.map((item) => ({
      date: item.month,
      incidents: item.incidents,
      averageSeverity: item.averageSeverity,
    }));
  }, [statistics]);

  const incidents = incidentsData?.data || [];
  const pagination = incidentsData?.pagination;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Page Header */}
      <div className="mb-6">
        <nav className="text-sm text-gray-600 mb-2">
          <a href="/" className="hover:text-gray-900">Home</a>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Dashboard</span>
        </nav>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      </div>

      <div className="flex gap-6">
        {/* Filter Panel */}
        <FilterPanel
          isOpen={filterPanelOpen}
          onClose={() => setFilterPanelOpen(false)}
        />

        {/* Main Content */}
        <div className="flex-1 space-y-6">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden">
            <Button
              variant="outline"
              onClick={() => setFilterPanelOpen(true)}
              icon={<Filter className="w-4 h-4" />}
            >
              Filters
            </Button>
          </div>

          {/* Summary Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Incidents"
              value={statistics?.global.totalIncidents || 0}
              icon={Activity}
              trend={
                statistics?.trends.monthly.length
                  ? {
                      value: statistics.trends.monthly[statistics.trends.monthly.length - 1].change,
                      direction: statistics.trends.monthly[statistics.trends.monthly.length - 1].change > 0 ? 'up' : 'down',
                    }
                  : undefined
              }
            />
            <StatCard
              title="Average Severity"
              value={(statistics?.global.averageSeverity || 0).toFixed(1)}
              subtitle="Out of 10"
              icon={AlertTriangle}
              variant="warning"
            />
            <StatCard
              title="Global Index Score"
              value={(statistics?.indexScores.global || 0).toFixed(1)}
              icon={TrendingUp}
              variant="primary"
            />
            <StatCard
              title="Active Campaigns"
              value={campaigns?.length || 0}
              icon={Target}
              variant="danger"
            />
          </div>

          {/* Index Score Panel */}
          {!statsLoading && statistics && (
            <Card variant="outlined" padding="md">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Index Scores by Region
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Object.entries(statistics.indexScores.byRegion)
                  .slice(0, 8)
                  .map(([region, score]) => (
                    <div key={region} className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {score.toFixed(1)}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">{region}</div>
                    </div>
                  ))}
              </div>
            </Card>
          )}

          {/* Weekly Trends Summary */}
          {!trendsLoading && weeklyTrends && (
            <Card variant="outlined" padding="md">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Weekly Trend Summary
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Emerging Narratives
                  </h3>
                  <ul className="space-y-2">
                    {weeklyTrends.emergingNarratives.map((narrative: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>{narrative}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    High-Risk Sources
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {weeklyTrends.highRiskSources.map((source: any, index: number) => (
                      <Badge key={index} variant="warning">
                        {source.name} ({source.incidentCount} incidents, avg severity: {source.averageSeverity})
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Coordinated Campaign Detection */}
          {!campaignsLoading && campaigns && campaigns.length > 0 && (
            <Card variant="outlined" padding="md">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Active Coordinated Campaigns
              </h2>
              <div className="space-y-3">
                {campaigns.slice(0, 3).map((campaign: any) => (
                  <div
                    key={campaign.id}
                    className="p-3 bg-red-50 border border-red-200 rounded-lg"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{campaign.name}</h3>
                      <Badge variant="error">{campaign.status}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{campaign.description}</p>
                    <div className="flex flex-wrap gap-2 text-xs text-gray-600">
                      <span>
                        <Users className="w-3 h-3 inline mr-1" />
                        {campaign.sourceCount} sources
                      </span>
                      <span>
                        <Activity className="w-3 h-3 inline mr-1" />
                        {campaign.incidentCount} incidents
                      </span>
                      <span>Avg Severity: {campaign.severityAverage.toFixed(1)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Source Monitoring Activity */}
          {!statsLoading && statistics?.sourceMonitoring && (
            <Card variant="outlined" padding="md">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Source Monitoring Activity
              </h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {statistics.sourceMonitoring.sourcesTracked}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">Sources Tracked</div>
                </div>
                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">
                    {statistics.sourceMonitoring.alertsGenerated}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">Alerts Generated</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {statistics.sourceMonitoring.activeMonitoring}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">Active Monitoring</div>
                </div>
              </div>
            </Card>
          )}

          {/* Escalation Risk Indicators */}
          <Card variant="outlined" padding="md">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Escalation Risk Distribution
            </h2>
            <div className="grid grid-cols-4 gap-4">
              {['low', 'medium', 'high', 'critical'].map((risk) => {
                const count = incidents.filter(
                  (inc) => inc.impactAssessment.escalationRisk === risk
                ).length;
                const variant =
                  risk === 'low'
                    ? 'success'
                    : risk === 'medium'
                    ? 'warning'
                    : 'error';
                return (
                  <div key={risk} className="text-center">
                    <Badge variant={variant} className="mb-2">
                      {risk.toUpperCase()}
                    </Badge>
                    <div className="text-2xl font-bold text-gray-900">{count}</div>
                    <div className="text-xs text-gray-600">incidents</div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Map */}
          <Card variant="outlined" padding="md">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Incident Map
            </h2>
            {incidentsLoading ? (
              <div className="h-[500px] flex items-center justify-center bg-gray-50 rounded-lg">
                <p className="text-gray-500">Loading map...</p>
              </div>
            ) : (
              <IncidentMap incidents={incidents} height="500px" />
            )}
          </Card>

          {/* Timeline Chart */}
          <Card variant="outlined" padding="md">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Temporal Trends
            </h2>
            {statsLoading ? (
              <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-lg">
                <p className="text-gray-500">Loading chart...</p>
              </div>
            ) : (
              <TimelineChart data={timelineData} height={300} />
            )}
          </Card>

          {/* Incident List */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Incident List ({pagination?.totalItems || 0} total)
            </h2>
            {incidentsLoading ? (
              <div className="py-12 text-center">
                <p className="text-gray-500">Loading incidents...</p>
              </div>
            ) : (
              <>
                <IncidentList incidents={incidents} />
                {pagination && (
                  <div className="mt-6">
                    <Pagination
                      currentPage={pagination.page}
                      totalPages={pagination.totalPages}
                      totalItems={pagination.totalItems}
                      pageSize={pagination.pageSize}
                      onPageChange={setCurrentPage}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
