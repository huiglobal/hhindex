import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type {
  IncidentType,
  TaxonomyCategory,
  VerificationStatus,
  EscalationRisk,
} from '../types/api';

interface TimeRange {
  start: string;
  end: string;
}

export interface FilterState {
  // Filter values
  dateRange: TimeRange | null;
  selectedRegions: string[];
  selectedIncidentTypes: IncidentType[];
  selectedTaxonomyCategories: TaxonomyCategory[];
  severityRange: [number, number];
  verificationStatus: VerificationStatus[];
  escalationRisk: EscalationRisk[];
  searchQuery: string;

  // Actions
  setDateRange: (range: TimeRange | null) => void;
  setSelectedRegions: (regions: string[]) => void;
  setSelectedIncidentTypes: (types: IncidentType[]) => void;
  setSelectedTaxonomyCategories: (categories: TaxonomyCategory[]) => void;
  setSeverityRange: (range: [number, number]) => void;
  setVerificationStatus: (statuses: VerificationStatus[]) => void;
  setEscalationRisk: (risks: EscalationRisk[]) => void;
  setSearchQuery: (query: string) => void;
  resetFilters: () => void;
}

const initialState = {
  dateRange: null,
  selectedRegions: [],
  selectedIncidentTypes: [],
  selectedTaxonomyCategories: [],
  severityRange: [1, 10] as [number, number],
  verificationStatus: [],
  escalationRisk: [],
  searchQuery: '',
};

export const useFilterStore = create<FilterState>()(
  devtools(
    (set) => ({
      ...initialState,

      setDateRange: (range) =>
        set({ dateRange: range }, false, 'setDateRange'),

      setSelectedRegions: (regions) =>
        set({ selectedRegions: regions }, false, 'setSelectedRegions'),

      setSelectedIncidentTypes: (types) =>
        set({ selectedIncidentTypes: types }, false, 'setSelectedIncidentTypes'),

      setSelectedTaxonomyCategories: (categories) =>
        set(
          { selectedTaxonomyCategories: categories },
          false,
          'setSelectedTaxonomyCategories'
        ),

      setSeverityRange: (range) =>
        set({ severityRange: range }, false, 'setSeverityRange'),

      setVerificationStatus: (statuses) =>
        set({ verificationStatus: statuses }, false, 'setVerificationStatus'),

      setEscalationRisk: (risks) =>
        set({ escalationRisk: risks }, false, 'setEscalationRisk'),

      setSearchQuery: (query) =>
        set({ searchQuery: query }, false, 'setSearchQuery'),

      resetFilters: () => set(initialState, false, 'resetFilters'),
    }),
    {
      name: 'filter-store',
      enabled: import.meta.env.DEV,
    }
  )
);
