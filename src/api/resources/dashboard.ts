import { client as api } from '../axios';
import type {
  DashboardOverviewResponse,
  RealTimeMetricsResponse,
  DateRangeParams,
} from '../entities/dashboard';

// Dashboard API endpoints
export const dashboardApi = {
  // Get dashboard overview with all metrics
  getOverview: async (): Promise<DashboardOverviewResponse> => {
    const response = await api.get('/api/dashboard/overview');
    return response.data;
  },

  // Get dashboard data by date range
  getByDateRange: async (params: DateRangeParams): Promise<DashboardOverviewResponse> => {
    const response = await api.get('/api/dashboard/date-range', { params });
    return response.data;
  },

  // Get real-time metrics
  getRealTimeMetrics: async (): Promise<RealTimeMetricsResponse> => {
    const response = await api.get('/api/dashboard/real-time');
    return response.data;
  },
};
