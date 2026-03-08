import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { FilterOptions } from '../types/api';

type ChartType = 'line' | 'bar' | 'area';
type ColorScheme = 'default' | 'colorblind';

interface SavedView {
  id: string;
  name: string;
  description?: string;
  filters: FilterOptions;
  createdAt: string;
  updatedAt: string;
}

interface ChartPreferences {
  defaultChartType: ChartType;
  colorScheme: ColorScheme;
}

export interface UserPreferencesState {
  // Saved views
  savedViews: SavedView[];
  favoriteRegions: string[];
  chartPreferences: ChartPreferences;

  // Actions
  addSavedView: (view: Omit<SavedView, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateSavedView: (id: string, updates: Partial<Omit<SavedView, 'id'>>) => void;
  removeSavedView: (viewId: string) => void;
  getSavedView: (viewId: string) => SavedView | undefined;
  addFavoriteRegion: (regionId: string) => void;
  removeFavoriteRegion: (regionId: string) => void;
  updateChartPreferences: (prefs: Partial<ChartPreferences>) => void;
  clearAllPreferences: () => void;
}

const initialState = {
  savedViews: [],
  favoriteRegions: [],
  chartPreferences: {
    defaultChartType: 'line' as ChartType,
    colorScheme: 'default' as ColorScheme,
  },
};

export const useUserPreferencesStore = create<UserPreferencesState>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        addSavedView: (view) =>
          set(
            (state) => ({
              savedViews: [
                ...state.savedViews,
                {
                  ...view,
                  id: crypto.randomUUID(),
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                },
              ],
            }),
            false,
            'addSavedView'
          ),

        updateSavedView: (id, updates) =>
          set(
            (state) => ({
              savedViews: state.savedViews.map((view) =>
                view.id === id
                  ? { ...view, ...updates, updatedAt: new Date().toISOString() }
                  : view
              ),
            }),
            false,
            'updateSavedView'
          ),

        removeSavedView: (viewId) =>
          set(
            (state) => ({
              savedViews: state.savedViews.filter((view) => view.id !== viewId),
            }),
            false,
            'removeSavedView'
          ),

        getSavedView: (viewId) => {
          return get().savedViews.find((view) => view.id === viewId);
        },

        addFavoriteRegion: (regionId) =>
          set(
            (state) => ({
              favoriteRegions: state.favoriteRegions.includes(regionId)
                ? state.favoriteRegions
                : [...state.favoriteRegions, regionId],
            }),
            false,
            'addFavoriteRegion'
          ),

        removeFavoriteRegion: (regionId) =>
          set(
            (state) => ({
              favoriteRegions: state.favoriteRegions.filter((id) => id !== regionId),
            }),
            false,
            'removeFavoriteRegion'
          ),

        updateChartPreferences: (prefs) =>
          set(
            (state) => ({
              chartPreferences: { ...state.chartPreferences, ...prefs },
            }),
            false,
            'updateChartPreferences'
          ),

        clearAllPreferences: () => set(initialState, false, 'clearAllPreferences'),
      }),
      {
        name: 'user-preferences-storage',
        version: 1,
      }
    ),
    {
      name: 'user-preferences-store',
      enabled: import.meta.env.DEV,
    }
  )
);
