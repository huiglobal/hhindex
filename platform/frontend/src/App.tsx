import { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PageLayout } from './components/layout';
import { routes } from './config/routes';
import { queryClient } from './config/queryClient';
import {
  HomePage,
  DashboardPage,
  HeatmapPage,
  LeaderboardsPage,
  DataExplorerPage,
  ArticlesPage,
  ArticleDetailPage,
  RegionDetailPage,
  IncidentDetailPage,
  OffenderProfilePage,
  AboutPage,
  AlertsPage,
} from './routes';
import LoadingFallback from './components/common/LoadingFallback';
import NotFoundPage from './pages/NotFoundPage';

// Scroll restoration component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router basename="/hhindex">
        <ScrollToTop />
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* Home */}
            <Route
              path={routes.home}
              element={
                <PageLayout noPadding>
                  <HomePage />
                </PageLayout>
              }
            />

            {/* Dashboard */}
            <Route
              path={routes.dashboard}
              element={
                <PageLayout>
                  <DashboardPage />
                </PageLayout>
              }
            />

            {/* Heatmap */}
            <Route
              path={routes.heatmap}
              element={
                <PageLayout fullHeight noFooter>
                  <HeatmapPage />
                </PageLayout>
              }
            />

            {/* Leaderboards */}
            <Route
              path={routes.leaderboards.root}
              element={
                <PageLayout>
                  <LeaderboardsPage />
                </PageLayout>
              }
            />
            <Route
              path={routes.leaderboards.content}
              element={
                <PageLayout>
                  <LeaderboardsPage />
                </PageLayout>
              }
            />
            <Route
              path={routes.leaderboards.authors}
              element={
                <PageLayout>
                  <LeaderboardsPage />
                </PageLayout>
              }
            />
            <Route
              path={routes.leaderboards.publications}
              element={
                <PageLayout>
                  <LeaderboardsPage />
                </PageLayout>
              }
            />

            {/* Data Explorer */}
            <Route
              path={routes.dataExplorer}
              element={
                <PageLayout>
                  <DataExplorerPage />
                </PageLayout>
              }
            />

            {/* Articles */}
            <Route
              path={routes.articles.root}
              element={
                <PageLayout>
                  <ArticlesPage />
                </PageLayout>
              }
            />
            <Route
              path={routes.articles.detail}
              element={
                <PageLayout>
                  <ArticleDetailPage />
                </PageLayout>
              }
            />

            {/* Regions */}
            <Route
              path={routes.regions.detail}
              element={
                <PageLayout>
                  <RegionDetailPage />
                </PageLayout>
              }
            />

            {/* Incidents */}
            <Route
              path={routes.incidents.detail}
              element={
                <PageLayout>
                  <IncidentDetailPage />
                </PageLayout>
              }
            />

            {/* Offenders */}
            <Route
              path={routes.offenders.profile}
              element={
                <PageLayout>
                  <OffenderProfilePage />
                </PageLayout>
              }
            />

            {/* About/Methodology */}
            <Route
              path={routes.about}
              element={
                <PageLayout>
                  <Suspense fallback={<LoadingFallback />}>
                    <AboutPage />
                  </Suspense>
                </PageLayout>
              }
            />

            {/* Alerts */}
            <Route
              path={routes.alerts}
              element={
                <PageLayout>
                  <Suspense fallback={<LoadingFallback />}>
                    <AlertsPage />
                  </Suspense>
                </PageLayout>
              }
            />

            {/* 404 Not Found */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </Router>
      {/* React Query DevTools - only in development */}
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}

export default App;
