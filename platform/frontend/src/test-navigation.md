# Navigation Test Checklist

## Routes to Test

### Main Routes
- [x] `/` - HomePage
- [x] `/dashboard` - DashboardPage
- [x] `/heatmap` - HeatmapPage
- [x] `/leaderboards` - LeaderboardsPage
- [x] `/data-explorer` - DataExplorerPage
- [x] `/articles` - ArticlesPage

### Detail Routes
- [x] `/articles/:articleId` - ArticleDetailPage (e.g., `/articles/1`)
- [x] `/regions/:regionId` - RegionDetailPage (e.g., `/regions/india`)
- [x] `/incidents/:incidentId` - IncidentDetailPage (e.g., `/incidents/1`)
- [x] `/offenders/:offenderId` - OffenderProfilePage (e.g., `/offenders/1`)

### Leaderboard Sub-routes
- [x] `/leaderboards/content` - LeaderboardsPage (Content tab)
- [x] `/leaderboards/authors` - LeaderboardsPage (Authors tab)
- [x] `/leaderboards/publications` - LeaderboardsPage (Publications tab)

### New Routes
- [x] `/about` - AboutPage (Methodology)
- [x] `/alerts` - AlertsPage

### Error Handling
- [x] `/invalid-route` - NotFoundPage (404)

## Features to Test

### Lazy Loading
- [x] Pages load with Suspense fallback
- [x] Loading spinner displays during page load
- [x] No full page reloads on navigation

### Scroll Restoration
- [x] Page scrolls to top on navigation
- [x] Browser back/forward buttons work correctly

### Navigation UI
- [x] Active route is highlighted in navigation
- [x] All navigation links are clickable
- [x] Mobile menu works (if applicable)

## Test Results

All routes configured and accessible. Navigation works smoothly without full page reloads.
