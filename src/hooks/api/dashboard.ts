import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '@/api/resources/dashboard';
import type { DateRangeParams } from '@/api/entities/dashboard';

// Query keys for dashboard data
export const dashboardQueryKeys = {
  all: ['dashboard'] as const,
  overview: () => [...dashboardQueryKeys.all, 'overview'] as const,
  dateRange: (params: DateRangeParams) => [...dashboardQueryKeys.all, 'dateRange', params] as const,
  realTime: () => [...dashboardQueryKeys.all, 'realTime'] as const,
};

// Hook to get dashboard overview
export const useDashboardOverview = () => {
  return useQuery({
    queryKey: dashboardQueryKeys.overview(),
    queryFn: dashboardApi.getOverview,
    staleTime: 5 * 60 * 1000, // 5 minutes (matches API cache)
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });
};

// Hook to get dashboard data by date range
export const useDashboardByDateRange = (params: DateRangeParams) => {
  return useQuery({
    queryKey: dashboardQueryKeys.dateRange(params),
    queryFn: () => dashboardApi.getByDateRange(params),
    enabled: !!params.startDate && !!params.endDate,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook to get real-time metrics
export const useRealTimeMetrics = () => {
  return useQuery({
    queryKey: dashboardQueryKeys.realTime(),
    queryFn: dashboardApi.getRealTimeMetrics,
    refetchInterval: 30 * 1000, // Refetch every 30 seconds for real-time data
    staleTime: 0, // Always consider real-time data stale
  });
};
