// Mock API Client for Hindu Hate Index Platform
// Simulates API calls with realistic delays and filtering

import type {
  Incident,
  Region,
  Leaderboards,
  Article,
  OffenderProfile,
  HeatmapData,
  Statistics,
  Alert,
  Campaign,
  FilterOptions,
  PaginationParams,
  PaginatedResponse,
} from '../types/api';

// Import mock data
import incidentsData from './mock/data/incidents.json';
import regionsData from './mock/data/regions.json';
import leaderboardsData from './mock/data/leaderboards.json';
import articlesData from './mock/data/articles.json';
import offendersData from './mock/data/offenders.json';
import heatmapData from './mock/data/heatmap.json';
import statisticsData from './mock/data/statistics.json';
import alertsData from './mock/data/alerts.json';
import campaignsData from './mock/data/campaigns.json';

// Get base URL for asset paths
const getAssetPath = (path: string): string => {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const baseUrl = import.meta.env.BASE_URL;
  return `${baseUrl}${cleanPath}`;
};

// Simulate network delay
const delay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

// Random delay between 200-500ms
const randomDelay = () => delay(Math.random() * 300 + 200);

// Helper function to filter incidents
function filterIncidents(incidents: Incident[], filters?: FilterOptions): Incident[] {
  if (!filters) return incidents;

  let filtered = [...incidents];

  // Date range filter
  if (filters.dateRange) {
    const start = new Date(filters.dateRange.start);
    const end = new Date(filters.dateRange.end);
    filtered = filtered.filter(inc => {
      const incDate = new Date(inc.date);
      return incDate >= start && incDate <= end;
    });
  }

  // Regions filter
  if (filters.regions && filters.regions.length > 0) {
    filtered = filtered.filter(inc =>
      filters.regions!.includes(inc.location.country) ||
      filters.regions!.includes(inc.location.state) ||
      filters.regions!.includes(inc.location.city)
    );
  }

  // Incident types filter
  if (filters.incidentTypes && filters.incidentTypes.length > 0) {
    filtered = filtered.filter(inc =>
      filters.incidentTypes!.includes(inc.incidentType)
    );
  }

  // Taxonomy categories filter
  if (filters.taxonomyCategories && filters.taxonomyCategories.length > 0) {
    filtered = filtered.filter(inc =>
      filters.taxonomyCategories!.includes(inc.taxonomyCategory)
    );
  }

  // Severity range filter
  if (filters.severityRange) {
    const [min, max] = filters.severityRange;
    filtered = filtered.filter(inc =>
      inc.severity >= min && inc.severity <= max
    );
  }

  // Verification status filter
  if (filters.verificationStatus && filters.verificationStatus.length > 0) {
    filtered = filtered.filter(inc =>
      filters.verificationStatus!.includes(inc.status)
    );
  }

  // Escalation risk filter
  if (filters.escalationRisk && filters.escalationRisk.length > 0) {
    filtered = filtered.filter(inc =>
      filters.escalationRisk!.includes(inc.impactAssessment.escalationRisk)
    );
  }

  // Search query filter
  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase();
    filtered = filtered.filter(inc =>
      inc.title.toLowerCase().includes(query) ||
      inc.description.toLowerCase().includes(query) ||
      inc.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }

  return filtered;
}

// Helper function to paginate results
function paginate<T>(items: T[], params: PaginationParams): PaginatedResponse<T> {
  const { page, pageSize } = params;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginatedItems = items.slice(start, end);

  return {
    data: paginatedItems,
    pagination: {
      page,
      pageSize,
      totalPages: Math.ceil(items.length / pageSize),
      totalItems: items.length,
    },
  };
}

// API Functions

export async function fetchIncidents(
  filters?: FilterOptions,
  pagination: PaginationParams = { page: 1, pageSize: 20 }
): Promise<PaginatedResponse<Incident>> {
  await randomDelay();
  
  const incidents = incidentsData.incidents as Incident[];
  const filtered = filterIncidents(incidents, filters);
  
  return paginate(filtered, pagination);
}

export async function fetchIncidentDetail(id: string): Promise<Incident | null> {
  await randomDelay();
  
  const incidents = incidentsData.incidents as Incident[];
  const incident = incidents.find(inc => inc.id === id);
  
  return incident || null;
}

export async function fetchRegions(): Promise<Region[]> {
  await randomDelay();
  
  return regionsData.regions as Region[];
}

export async function fetchRegionDetail(id: string): Promise<Region | null> {
  await randomDelay();
  
  const regions = regionsData.regions as Region[];
  const region = regions.find(reg => reg.id === id);
  
  return region || null;
}

export async function fetchLeaderboards(
  type: 'content' | 'authors' | 'publications',
  timeRange: '7d' | '30d' | '90d' | '1y' | 'all' = '30d'
): Promise<any[]> {
  await randomDelay();
  
  const leaderboards = leaderboardsData as Leaderboards;
  return leaderboards[type][timeRange] || [];
}

export async function fetchArticles(
  filters?: { category?: string; featured?: boolean; searchQuery?: string },
  pagination: PaginationParams = { page: 1, pageSize: 12 }
): Promise<PaginatedResponse<Article>> {
  await randomDelay();
  
  let articles = articlesData.articles as Article[];
  
  // Transform image paths to include base URL
  articles = articles.map(article => ({
    ...article,
    featuredImage: article.featuredImage ? getAssetPath(article.featuredImage) : undefined,
    author: {
      ...article.author,
      avatar: article.author.avatar ? getAssetPath(article.author.avatar) : undefined,
    },
  }));
  
  // Apply filters
  if (filters?.category) {
    articles = articles.filter(art => art.category === filters.category);
  }
  
  if (filters?.featured !== undefined) {
    articles = articles.filter(art => art.featured === filters.featured);
  }
  
  if (filters?.searchQuery) {
    const query = filters.searchQuery.toLowerCase();
    articles = articles.filter(art =>
      art.title.toLowerCase().includes(query) ||
      art.excerpt.toLowerCase().includes(query) ||
      art.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }
  
  return paginate(articles, pagination);
}

export async function fetchArticleDetail(id: string): Promise<Article | null> {
  await randomDelay();
  
  const articles = articlesData.articles as Article[];
  const article = articles.find(art => art.id === id);
  
  if (!article) return null;
  
  // Transform image paths to include base URL
  return {
    ...article,
    featuredImage: article.featuredImage ? getAssetPath(article.featuredImage) : undefined,
    author: {
      ...article.author,
      avatar: article.author.avatar ? getAssetPath(article.author.avatar) : undefined,
    },
  };
}

export async function fetchOffenderProfile(id: string): Promise<OffenderProfile | null> {
  await randomDelay();
  
  const offenders = offendersData.offenders as OffenderProfile[];
  const offender = offenders.find(off => off.id === id);
  
  return offender || null;
}

export async function fetchHeatmapData(
  timeRange: '7d' | '30d' | '90d' | '1y' | 'all' = 'all',
  _layer: 'origin' | 'target' = 'origin'
): Promise<HeatmapData> {
  await randomDelay();
  
  const data = heatmapData as HeatmapData;
  
  return {
    dataPoints: data.timePeriods[timeRange] || data.dataPoints,
    timePeriods: data.timePeriods,
    layers: data.layers,
  };
}

export async function fetchStatistics(): Promise<Statistics> {
  await randomDelay();
  
  return statisticsData as Statistics;
}

export async function fetchAlerts(
  filters?: {
    timeRange?: '7d' | '30d' | 'all';
    severity?: Array<'info' | 'warning' | 'critical'>;
    type?: Array<'geographic_hotspot' | 'escalation_risk' | 'coordinated_campaign' | 'source_reactivation'>;
  }
): Promise<Alert[]> {
  await randomDelay();
  
  let alerts = alertsData.alerts as Alert[];
  
  // Apply filters
  if (filters?.severity && filters.severity.length > 0) {
    alerts = alerts.filter(alert => filters.severity!.includes(alert.severity));
  }
  
  if (filters?.type && filters.type.length > 0) {
    alerts = alerts.filter(alert => filters.type!.includes(alert.type));
  }
  
  if (filters?.timeRange) {
    const now = new Date();
    const daysAgo = filters.timeRange === '7d' ? 7 : filters.timeRange === '30d' ? 30 : 365;
    const cutoff = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
    
    alerts = alerts.filter(alert => new Date(alert.createdAt) >= cutoff);
  }
  
  return alerts;
}

export async function fetchCampaigns(
  status?: 'active' | 'resolved' | 'monitoring'
): Promise<Campaign[]> {
  await randomDelay();
  
  let campaigns = campaignsData.campaigns as Campaign[];
  
  if (status) {
    campaigns = campaigns.filter(camp => camp.status === status);
  }
  
  return campaigns;
}

export async function fetchWeeklyTrends(): Promise<any> {
  await randomDelay();
  
  // Generate weekly trend report from statistics
  const stats = statisticsData as Statistics;
  
  return {
    weekEnding: new Date().toISOString().split('T')[0],
    emergingNarratives: [
      "Increased digital warfare campaigns targeting Hindu cultural practices",
      "Rise in political weaponization rhetoric in Western media",
      "Coordinated social media campaigns detected across multiple platforms"
    ],
    highRiskSources: [
      { name: "Source A", incidentCount: 12, averageSeverity: 7.8 },
      { name: "Source B", incidentCount: 9, averageSeverity: 8.2 },
      { name: "Source C", incidentCount: 7, averageSeverity: 7.5 }
    ],
    topRegions: Object.entries(stats.byRegion)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([region, count]) => ({ region, count })),
    severityTrend: "increasing",
    campaignActivity: stats.campaigns
  };
}
