import { analyticsService as apiAnalyticsService } from '../../../api/services';
import { DashboardCard, PaginatedDashboardCardList, FilterParams } from '../../../types/api';
import { DashboardCardFormData, DashboardCardFilters, AnalyticsDashboard, AnalyticsMetrics, ChartData } from '../types';

class AnalyticsService {
  // Dashboard cards
  async getCards(filters?: DashboardCardFilters): Promise<PaginatedDashboardCardList> {
    const params: FilterParams = {};
    if (filters?.search) params.search = filters.search;
    if (filters?.module) params.module = filters.module.join(',');
    if (filters?.card_type) params.card_type = filters.card_type.join(',');
    if (filters?.is_active !== undefined) params.is_active = filters.is_active;
    if (filters?.show_in_dashboard !== undefined) params.show_in_dashboard = filters.show_in_dashboard;
    if (filters?.show_in_sidebar !== undefined) params.show_in_sidebar = filters.show_in_sidebar;

    return apiAnalyticsService.getDashboardCards(params);
  }

  async createCard(data: DashboardCardFormData): Promise<DashboardCard> {
    return apiAnalyticsService.createDashboardCard(data);
  }

  async getCard(id: number): Promise<DashboardCard> {
    return apiAnalyticsService.getDashboardCard(id);
  }

  async updateCard(id: number, data: Partial<DashboardCardFormData>): Promise<DashboardCard> {
    return apiAnalyticsService.partialUpdateDashboardCard(id, data);
  }

  async deleteCard(id: number): Promise<void> {
    return apiAnalyticsService.deleteDashboardCard(id);
  }

  // Analytics dashboard
  async getDashboard(): Promise<AnalyticsDashboard> {
    const dashboardData = await apiAnalyticsService.getAnalyticsDashboard();
    return dashboardData;
  }

  // Metrics
  async getMetrics(): Promise<AnalyticsMetrics> {
    const metricsData = await apiAnalyticsService.getMetricsData();
    return metricsData;
  }

  // Charts
  async getCharts(): Promise<ChartData[]> {
    const chartsData = await apiAnalyticsService.getChartsData();
    return chartsData;
  }

  // Additional utility methods
  async reorderCards(cardIds: number[]): Promise<void> {
    // This would need to be implemented based on your backend API
    for (let i = 0; i < cardIds.length; i++) {
      await this.updateCard(cardIds[i], { order: i });
    }
  }

  async duplicateCard(cardId: number): Promise<DashboardCard> {
    const card = await this.getCard(cardId);
    const duplicateData: DashboardCardFormData = {
      name: `${card.name} (Copy)`,
      title: `${card.title} (Copy)`,
      description: card.description,
      module: card.module,
      card_type: card.card_type,
      icon: card.icon,
      color: card.color,
      order: card.order + 1,
      required_permissions: card.required_permissions,
      visible_to_roles: card.visible_to_roles,
      data_source: card.data_source,
      refresh_interval: card.refresh_interval,
      is_active: false,
      show_in_dashboard: card.show_in_dashboard,
      show_in_sidebar: card.show_in_sidebar,
    };
    return this.createCard(duplicateData);
  }

  async exportCards(format: 'csv' | 'xlsx' | 'pdf'): Promise<Blob> {
    // This would need to be implemented based on your backend API
    throw new Error('Export cards functionality not implemented');
  }

  async importCards(file: File): Promise<DashboardCard[]> {
    // This would need to be implemented based on your backend API
    throw new Error('Import cards functionality not implemented');
  }
}

export const analyticsService = new AnalyticsService();
