import { api } from '../axios';
import {
  DashboardCard,
  DashboardCardRequest,
  PaginatedDashboardCardList,
  FilterParams
} from '../../types/api';

export class AnalyticsService {
  // Dashboard cards
  async getDashboardCards(params?: FilterParams): Promise<PaginatedDashboardCardList> {
    const response = await api.get('/api/v1/analytics/cards/', { params });
    return response.data;
  }

  async createDashboardCard(data: DashboardCardRequest): Promise<DashboardCard> {
    const response = await api.post('/api/v1/analytics/cards/', data);
    return response.data;
  }

  async getDashboardCard(id: number): Promise<DashboardCard> {
    const response = await api.get(`/api/v1/analytics/cards/${id}/`);
    return response.data;
  }

  async updateDashboardCard(id: number, data: DashboardCardRequest): Promise<DashboardCard> {
    const response = await api.put(`/api/v1/analytics/cards/${id}/`, data);
    return response.data;
  }

  async partialUpdateDashboardCard(id: number, data: Partial<DashboardCardRequest>): Promise<DashboardCard> {
    const response = await api.patch(`/api/v1/analytics/cards/${id}/`, data);
    return response.data;
  }

  async deleteDashboardCard(id: number): Promise<void> {
    await api.delete(`/api/v1/analytics/cards/${id}/`);
  }

  // Analytics dashboard
  async getAnalyticsDashboard(): Promise<any> {
    const response = await api.get('/api/v1/analytics/dashboard/');
    return response.data;
  }

  // Charts data
  async getChartsData(): Promise<any> {
    const response = await api.get('/api/v1/analytics/charts/');
    return response.data;
  }

  // Metrics data
  async getMetricsData(): Promise<any> {
    const response = await api.get('/api/v1/analytics/metrics/');
    return response.data;
  }
}

export const analyticsService = new AnalyticsService();
