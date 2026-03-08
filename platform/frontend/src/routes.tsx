import { lazy } from 'react';

// Lazy load pages for better performance
export const HomePage = lazy(() => import('@/pages/HomePage'));
export const DashboardPage = lazy(() => import('@/pages/DashboardPageTest'));
export const HeatmapPage = lazy(() => import('@/pages/HeatmapPage'));
export const LeaderboardsPage = lazy(() => import('@/pages/LeaderboardsPage'));
export const DataExplorerPage = lazy(() => import('@/pages/DataExplorerPage'));
export const ArticlesPage = lazy(() => import('@/pages/ArticlesPage'));
export const ArticleDetailPage = lazy(() => import('@/pages/ArticleDetailPage'));
export const RegionDetailPage = lazy(() => import('@/pages/RegionDetailPage'));
export const IncidentDetailPage = lazy(() => import('@/pages/IncidentDetailPage'));
export const OffenderProfilePage = lazy(() => import('@/pages/OffenderProfilePage'));
export const AboutPage = lazy(() => import('@/pages/AboutPage'));
export const AlertsPage = lazy(() => import('@/pages/AlertsPage'));
