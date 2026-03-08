# Hindu Hate Index - Web Application

A React-based web application for tracking, analyzing, and visualizing incidents of hate speech, discrimination, and violence targeting Hindu individuals and communities.

## Technology Stack

- **React 18** with TypeScript
- **Vite 5** - Build tool and dev server
- **React Router 6** - Client-side routing
- **TanStack Query 5** - Data fetching and caching
- **Zustand 4** - State management
- **Tailwind CSS 4** - Styling
- **Recharts 2** - Data visualization
- **Leaflet 1.9** - Interactive maps
- **Framer Motion 11** - Animations

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev

# The app will be available at http://localhost:5173
```

### Building

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Code Quality

```bash
# Run linter
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Check formatting
npm run format:check

# Type check
npm run type-check
```

### Testing

```bash
# Run unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui

# Run end-to-end tests
npm run test:e2e
```

## Project Structure

```
src/
├── pages/              # Page components
├── components/         # Reusable components
│   ├── layout/        # Layout components
│   ├── common/        # Common UI components
│   ├── data-display/  # Data display components
│   ├── visualizations/# Chart and map components
│   ├── filters/       # Filter components
│   └── articles/      # Article components
├── hooks/             # Custom React hooks
├── store/             # Zustand stores
├── api/               # API client and mock data
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
├── styles/            # Global styles
└── config/            # Configuration files
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_USE_MOCK_API=true
VITE_APP_NAME=Hindu Hate Index
```

## Features

- Interactive dashboard with map and timeline visualizations
- Geographic heatmap showing incident distribution
- Leaderboards for content, authors, and publications
- Data explorer with filtering and comparison tools
- Article integration with rich media support
- Detailed incident and region views
- Responsive design for all devices
- Accessibility compliant (WCAG 2.1 Level AA)

## License

Proprietary - All rights reserved
