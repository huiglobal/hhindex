// Route configuration
export const routes = {
  home: '/',
  dashboard: '/dashboard',
  heatmap: '/heatmap',
  leaderboards: {
    root: '/leaderboards',
    content: '/leaderboards/content',
    authors: '/leaderboards/authors',
    publications: '/leaderboards/publications',
  },
  dataExplorer: '/data-explorer',
  articles: {
    root: '/articles',
    detail: '/articles/:articleId',
  },
  regions: {
    detail: '/regions/:regionId',
  },
  incidents: {
    detail: '/incidents/:incidentId',
  },
  offenders: {
    profile: '/offenders/:offenderId',
  },
  about: '/about',
  alerts: '/alerts',
};
