import { useQuery } from '@tanstack/react-query';
import { fetchStatistics, fetchWeeklyTrends, fetchCampaigns } from '../api/mockApi';

export function useStatistics() {
  return useQuery({
    queryKey: ['statistics'],
    queryFn: fetchStatistics,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useWeeklyTrends() {
  return useQuery({
    queryKey: ['weeklyTrends'],
    queryFn: fetchWeeklyTrends,
    staleTime: 60 * 60 * 1000, // 1 hour
  });
}

export function useCampaigns(status?: 'active' | 'resolved' | 'monitoring') {
  return useQuery({
    queryKey: ['campaigns', status],
    queryFn: () => fetchCampaigns(status),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}
