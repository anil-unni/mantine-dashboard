// Analytics module types
import { DashboardCard, ModuleEnum, CardTypeEnum } from '../../../types/api';

export interface AnalyticsDashboard {
  cards: DashboardCard[];
  metrics: AnalyticsMetrics;
  charts: ChartData[];
  last_updated: string;
}

export interface AnalyticsMetrics {
  total_users: number;
  active_users: number;
  total_projects: number;
  active_projects: number;
  total_tasks: number;
  completed_tasks: number;
  total_time_logged: number;
  billable_time: number;
  revenue: number;
  productivity_score: number;
}

export interface ChartData {
  id: string;
  type: 'line' | 'bar' | 'pie' | 'doughnut' | 'area' | 'scatter';
  title: string;
  data: any;
  options: any;
  module: ModuleEnum;
  refresh_interval: number;
}

export interface DashboardCardFormData {
  name: string;
  title: string;
  description?: string;
  module: ModuleEnum;
  card_type: CardTypeEnum;
  icon?: string;
  color: string;
  order?: number;
  required_permissions?: Record<string, any>;
  visible_to_roles?: Record<string, any>;
  data_source: string;
  refresh_interval?: number;
  is_active?: boolean;
  show_in_dashboard?: boolean;
  show_in_sidebar?: boolean;
}

export interface DashboardCardFilters {
  search?: string;
  module?: ModuleEnum[];
  card_type?: CardTypeEnum[];
  is_active?: boolean;
  show_in_dashboard?: boolean;
  show_in_sidebar?: boolean;
}

export interface AnalyticsState {
  dashboard: AnalyticsDashboard | null;
  cards: DashboardCard[];
  metrics: AnalyticsMetrics | null;
  charts: ChartData[];
  loading: {
    dashboard: boolean;
    cards: boolean;
    metrics: boolean;
    charts: boolean;
  };
  error: {
    dashboard?: string;
    cards?: string;
    metrics?: string;
    charts?: string;
  };
}

export interface AnalyticsActions {
  // Dashboard
  fetchDashboard: () => Promise<void>;
  refreshDashboard: () => Promise<void>;
  
  // Cards
  fetchCards: (filters?: DashboardCardFilters) => Promise<void>;
  createCard: (data: DashboardCardFormData) => Promise<DashboardCard>;
  updateCard: (id: number, data: Partial<DashboardCardFormData>) => Promise<DashboardCard>;
  deleteCard: (id: number) => Promise<void>;
  reorderCards: (cardIds: number[]) => Promise<void>;
  
  // Metrics
  fetchMetrics: () => Promise<void>;
  refreshMetrics: () => Promise<void>;
  
  // Charts
  fetchCharts: () => Promise<void>;
  refreshCharts: () => Promise<void>;
  
  // Utility
  getCardsByModule: (module: ModuleEnum) => DashboardCard[];
  getCardsByType: (type: CardTypeEnum) => DashboardCard[];
  getActiveCards: () => DashboardCard[];
}
