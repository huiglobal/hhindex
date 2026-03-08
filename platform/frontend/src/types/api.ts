// API Response Types for Hindu Hate Index Platform

export interface Location {
  country: string;
  state: string;
  city: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export type IncidentType =
  | 'religious_persecution'
  | 'civilizational_attacks'
  | 'cultural_suppression'
  | 'indigenous_knowledge_dismissal'
  | 'political_weaponization'
  | 'anti_india_proxy'
  | 'digital_ideological_warfare'
  | 'cultural_appropriation';

export type TaxonomyCategory =
  | 'Religious Persecution'
  | 'Civilizational Attacks'
  | 'Cultural Suppression'
  | 'Indigenous Knowledge Dismissal'
  | 'Political Weaponization'
  | 'Anti-India as Anti-Hindu Proxy'
  | 'Digital and Ideological Warfare'
  | 'Cultural Appropriation';

export type VerificationStatus = 'verified' | 'pending' | 'flagged';

export type EscalationRisk = 'low' | 'medium' | 'high' | 'critical';

export interface Source {
  id: string;
  name: string;
  url: string;
  credibilityScore: number;
  type: 'news' | 'social_media' | 'official_report' | 'community';
}

export interface Evidence {
  type: 'image' | 'document' | 'video';
  url: string;
  description: string;
}

export interface ClassificationDetail {
  category: string;
  severity: number;
  reasoning: string;
}

export interface Classification {
  verificationScore: number;
  confidence: number;
  details: ClassificationDetail[];
}

export interface ImpactAssessment {
  social: string;
  psychological: string;
  safety: string;
  escalationRisk: EscalationRisk;
  escalationReasoning: string;
  patterns: string[];
  geographicSpread: string;
  relatedIncidents: string[];
}

export interface Incident {
  id: string;
  title: string;
  description: string;
  date: string;
  location: Location;
  incidentType: IncidentType;
  taxonomyCategory: TaxonomyCategory;
  severity: number;
  status: VerificationStatus;
  classification: Classification;
  impactAssessment: ImpactAssessment;
  sources: Source[];
  evidence: Evidence[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  verifiedBy: string | null;
  verifiedAt: string | null;
  isCoordinatedCampaign: boolean;
  campaignId: string | null;
  detectedBy: string;
  detectionTimestamp: string;
}

export interface RegionStatistics {
  totalIncidents: number;
  knownAccused: number;
  unknownAccused: number;
  casesFiled: number;
  averageSeverity: number;
  timePeriod: {
    start: string;
    end: string;
  };
  trendIndicator: 'increasing' | 'decreasing' | 'stable';
  percentageChange: number;
  incidentsByType?: Record<string, number>;
}

export interface Region {
  id: string;
  name: string;
  type: 'country' | 'state' | 'city';
  parentRegionId: string | null;
  coordinates: {
    lat: number;
    lng: number;
  };
  bounds?: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
  statistics: RegionStatistics;
}

export interface LeaderboardEntry {
  rank: number;
  id: string;
  totalIncidents: number;
  averageSeverity: number;
  trendIndicator: 'up' | 'down' | 'stable';
  rankChange: number;
  metadata: Record<string, any>;
}

export interface ContentLeaderboardEntry extends LeaderboardEntry {
  title: string;
  severity: number;
  impactSummary: string;
  verificationStatus: VerificationStatus;
  incidentId: string;
}

export interface AuthorLeaderboardEntry extends LeaderboardEntry {
  name: string;
  postingFrequency: number;
  escalationPattern: string;
  recidivismScore: number;
}

export interface PublicationLeaderboardEntry extends LeaderboardEntry {
  name: string;
  publicationFrequency: number;
  credibilityRating: number;
  website: string;
  socialMedia: {
    twitter?: string;
    facebook?: string;
  };
}

export interface Leaderboards {
  content: Record<string, ContentLeaderboardEntry[]>;
  authors: Record<string, AuthorLeaderboardEntry[]>;
  publications: Record<string, PublicationLeaderboardEntry[]>;
}

export interface Author {
  id: string;
  name: string;
  credentials: string;
  bio: string;
  avatar?: string;
}

export interface Article {
  id: string;
  title: string;
  subtitle?: string;
  content: string;
  excerpt: string;
  author: Author;
  publishedAt: string;
  updatedAt: string;
  readingTime: number;
  featuredImage?: string;
  tags: string[];
  category: string;
  featured: boolean;
  relatedIncidents: string[];
  relatedArticles: string[];
  views: number;
  shares: number;
}

export interface OffenderProfile {
  id: string;
  type: 'author' | 'publication';
  name: string;
  totalIncidents: number;
  averageSeverity: number;
  firstIncident: string;
  lastIncident: string;
  activityHistory: Array<{
    month: string;
    incidents: number;
    averageSeverity: number;
  }>;
  incidentTimeline: Array<{
    incidentId: string;
    date: string;
    severity: number;
    type: string;
  }>;
  patternAnalysis: {
    primaryTypes: string[];
    targetRegions: string[];
    postingFrequency: string;
    escalationTrend: string;
  };
  historicalRankings: Array<{
    date: string;
    rank: number;
    leaderboardType: string;
  }>;
  recidivismScore: number;
  platforms: string[];
}

export interface HeatmapDataPoint {
  lat: number;
  lng: number;
  intensity: number;
  metadata: {
    regionId: string;
    incidentCount: number;
    averageSeverity: number;
    primaryTypes: string[];
    timePeriod: string;
  };
}

export interface HeatmapData {
  dataPoints: HeatmapDataPoint[];
  timePeriods: Record<string, HeatmapDataPoint[]>;
  layers: {
    origin: HeatmapDataPoint[];
    target: HeatmapDataPoint[];
  };
}

export interface Statistics {
  global: {
    totalIncidents: number;
    totalRegions: number;
    averageSeverity: number;
    verifiedIncidents: number;
    pendingIncidents: number;
    flaggedIncidents: number;
    timePeriod: {
      start: string;
      end: string;
    };
  };
  trends: {
    monthly: Array<{
      month: string;
      incidents: number;
      averageSeverity: number;
      change: number;
    }>;
    yearly: Array<{
      year: string;
      incidents: number;
      averageSeverity: number;
      change: number;
    }>;
  };
  byType: Record<string, number>;
  byRegion: Record<string, number>;
  indexScores: {
    global: number;
    byRegion: Record<string, number>;
    byTimePeriod: Record<string, number>;
  };
  campaigns?: {
    activeCampaigns: number;
    totalDetected: number;
    incidentsInCampaigns: number;
  };
  sourceMonitoring?: {
    sourcesTracked: number;
    alertsGenerated: number;
    activeMonitoring: number;
  };
}

export interface Alert {
  id: string;
  type: 'geographic_hotspot' | 'escalation_risk' | 'coordinated_campaign' | 'source_reactivation';
  severity: 'info' | 'warning' | 'critical';
  title: string;
  description: string;
  createdAt: string;
  regionId?: string;
  campaignId?: string;
  sourceId?: string;
  relatedIncidents: string[];
  acknowledged: boolean;
  metadata: Record<string, any>;
}

export interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'resolved' | 'monitoring';
  detectedAt: string;
  category: string;
  description: string;
  sourceCount: number;
  incidentCount: number;
  relatedIncidents: string[];
  relatedSources: string[];
  regions: string[];
  themes: string[];
  severityAverage: number;
  escalationTrend: string;
  timeline: Array<{
    date: string;
    incidentCount: number;
    description: string;
  }>;
}

// Filter and Pagination Types
export interface FilterOptions {
  dateRange?: {
    start: string;
    end: string;
  };
  regions?: string[];
  incidentTypes?: IncidentType[];
  taxonomyCategories?: TaxonomyCategory[];
  severityRange?: [number, number];
  verificationStatus?: VerificationStatus[];
  escalationRisk?: EscalationRisk[];
  searchQuery?: string;
}

export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
  };
}
