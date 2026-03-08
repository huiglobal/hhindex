import type { FilterOptions, PaginationParams } from '../types/api';

/**
 * Query key factory for consistent cache key generation
 * Following TanStack Query best practices for hierarchical keys
 */
export const queryKeys = {
  // Incidents
  incidents: {
    all: ['incidents'] as const,
    lists: () => [...queryKeys.incidents.all, 'list'] as const,
    list: (filters?: FilterOptions, pagination?: PaginationParams) =>
      [...queryKeys.incidents.lists(), { filters, pagination }] as const,
    details: () => [...queryKeys.incidents.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.incidents.details(), id] as const,
  },

  // Regions
  regions: {
    all: ['regions'] as const,
    lists: () => [...queryKeys.regions.all, 'list'] as const,
    list: (filters?: FilterOptions) =>
      [...queryKeys.regions.lists(), { filters }] as const,
    details: () => [...queryKeys.regions.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.regions.details(), id] as const,
  },

  // Leaderboards
  leaderboards: {
    all: ['leaderboards'] as const,
    content: (timeRange: string, filters?: FilterOptions) =>
      [...queryKeys.leaderboards.all, 'content', timeRange, { filters }] as const,
    authors: (timeRange: string, filters?: FilterOptions) =>
      [...queryKeys.leaderboards.all, 'authors', timeRange, { filters }] as const,
    publications: (timeRange: string, filters?: FilterOptions) =>
      [...queryKeys.leaderboards.all, 'publications', timeRange, { filters }] as const,
  },

  // Articles
  articles: {
    all: ['articles'] as const,
    lists: () => [...queryKeys.articles.all, 'list'] as const,
    list: (filters?: FilterOptions, pagination?: PaginationParams) =>
      [...queryKeys.articles.lists(), { filters, pagination }] as const,
    details: () => [...queryKeys.articles.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.articles.details(), id] as const,
    featured: () => [...queryKeys.articles.all, 'featured'] as const,
  },

  // Offenders
  offenders: {
    all: ['offenders'] as const,
    details: () => [...queryKeys.offenders.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.offenders.details(), id] as const,
  },

  // Heatmap
  heatmap: {
    all: ['heatmap'] as const,
    data: (filters?: FilterOptions) =>
      [...queryKeys.heatmap.all, 'data', { filters }] as const,
  },

  // Statistics
  statistics: {
    all: ['statistics'] as const,
    global: (filters?: FilterOptions) =>
      [...queryKeys.statistics.all, 'global', { filters }] as const,
    trends: (filters?: FilterOptions) =>
      [...queryKeys.statistics.all, 'trends', { filters }] as const,
  },

  // Alerts
  alerts: {
    all: ['alerts'] as const,
    lists: () => [...queryKeys.alerts.all, 'list'] as const,
    list: (filters?: FilterOptions) =>
      [...queryKeys.alerts.lists(), { filters }] as const,
  },

  // Campaigns
  campaigns: {
    all: ['campaigns'] as const,
    lists: () => [...queryKeys.campaigns.all, 'list'] as const,
    list: (filters?: FilterOptions) =>
      [...queryKeys.campaigns.lists(), { filters }] as const,
    details: () => [...queryKeys.campaigns.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.campaigns.details(), id] as const,
  },

  // Weekly Trends
  weeklyTrends: {
    all: ['weeklyTrends'] as const,
    latest: () => [...queryKeys.weeklyTrends.all, 'latest'] as const,
  },
} as const;

/**
 * Helper function to invalidate all queries for a specific resource
 * Usage: queryClient.invalidateQueries({ queryKey: queryKeys.incidents.all })
 */
export type QueryKeys = typeof queryKeys;
