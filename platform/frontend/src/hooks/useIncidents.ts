import { useQuery } from '@tanstack/react-query';
import { fetchIncidents, fetchIncidentDetail } from '../api/mockApi';
import type { FilterOptions, PaginationParams } from '../types/api';

export function useIncidents(filters?: FilterOptions, pagination?: PaginationParams) {
  return useQuery({
    queryKey: ['incidents', filters, pagination],
    queryFn: () => fetchIncidents(filters, pagination),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useIncidentDetail(id: string) {
  return useQuery({
    queryKey: ['incident', id],
    queryFn: () => fetchIncidentDetail(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}
