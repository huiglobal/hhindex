import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import HeatmapPage from '../HeatmapPage';

// Setup window mock before imports
beforeAll(() => {
  global.window = global.window || ({} as any);
});

// Mock leaflet.heat
vi.mock('leaflet.heat', () => ({}));

// Mock Leaflet
vi.mock('leaflet', () => ({
  default: {
    heatLayer: vi.fn(() => ({
      addTo: vi.fn(),
      remove: vi.fn(),
    })),
    marker: vi.fn(() => ({
      addTo: vi.fn(),
      bindPopup: vi.fn(),
    })),
    circle: vi.fn(() => ({
      addTo: vi.fn(),
      bindPopup: vi.fn(),
    })),
    divIcon: vi.fn(() => ({})),
  },
  heatLayer: vi.fn(() => ({
    addTo: vi.fn(),
    remove: vi.fn(),
  })),
}));

// Mock react-leaflet
vi.mock('react-leaflet', () => ({
  MapContainer: ({ children }: any) => <div data-testid="map-container">{children}</div>,
  TileLayer: () => <div data-testid="tile-layer" />,
  useMap: () => ({
    addLayer: vi.fn(),
    removeLayer: vi.fn(),
    zoomIn: vi.fn(),
    zoomOut: vi.fn(),
  }),
}));

// Mock API
vi.mock('../../api/mockApi', () => ({
  fetchHeatmapData: vi.fn(() =>
    Promise.resolve({
      dataPoints: [
        {
          lat: 20,
          lng: 0,
          intensity: 0.8,
          metadata: {
            regionId: 'REG-TEST',
            incidentCount: 10,
            averageSeverity: 7.5,
            primaryTypes: ['hate_speech'],
            timePeriod: '2024-01-01_2024-03-08',
          },
        },
      ],
      timePeriods: {
        '7d': [],
        '30d': [],
        '90d': [],
        '1y': [],
        all: [],
      },
      layers: {
        origin: [
          {
            lat: 20,
            lng: 0,
            intensity: 0.8,
            metadata: {
              regionId: 'REG-TEST',
              incidentCount: 10,
              averageSeverity: 7.5,
              primaryTypes: ['hate_speech'],
              timePeriod: '2024-01-01_2024-03-08',
            },
          },
        ],
        target: [],
      },
    })
  ),
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{component}</BrowserRouter>
    </QueryClientProvider>
  );
};

describe('HeatmapPage', () => {
  it('renders heatmap page with controls', async () => {
    renderWithProviders(<HeatmapPage />);

    await waitFor(() => {
      expect(screen.getByText('Geographic Heatmap')).toBeInTheDocument();
    });

    // Check for time range selector
    expect(screen.getByRole('combobox')).toBeInTheDocument();

    // Check for layer toggle button
    expect(screen.getByText('Origin Location')).toBeInTheDocument();

    // Check for color scheme toggle
    expect(screen.getByText('Default Colors')).toBeInTheDocument();
  });

  it('displays legend with intensity levels', async () => {
    renderWithProviders(<HeatmapPage />);

    await waitFor(() => {
      expect(screen.getByText('Intensity Legend')).toBeInTheDocument();
    });

    expect(screen.getByText('Low (0-25%)')).toBeInTheDocument();
    expect(screen.getByText('Medium (25-50%)')).toBeInTheDocument();
    expect(screen.getByText('High (50-75%)')).toBeInTheDocument();
    expect(screen.getByText('Extreme (75-100%)')).toBeInTheDocument();
  });

  it('displays info panel with heatmap information', async () => {
    renderWithProviders(<HeatmapPage />);

    await waitFor(() => {
      expect(screen.getByText('Heatmap Information')).toBeInTheDocument();
    });

    expect(screen.getByText(/Time Range:/)).toBeInTheDocument();
    expect(screen.getByText(/Layer:/)).toBeInTheDocument();
    expect(screen.getByText(/Data Points:/)).toBeInTheDocument();
  });

  it('shows export buttons', async () => {
    renderWithProviders(<HeatmapPage />);

    await waitFor(() => {
      expect(screen.getByText('Export GeoJSON')).toBeInTheDocument();
    });
  });
});
