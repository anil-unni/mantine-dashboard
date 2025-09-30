// Audit module types
import { User } from '../../../types/api';

export interface AuditLog {
  id: number;
  user: User;
  action: string;
  resource_type: string;
  resource_id: number;
  old_values: Record<string, any>;
  new_values: Record<string, any>;
  ip_address: string;
  user_agent: string;
  timestamp: string;
  organization_id: number;
}

export interface ActivityFeed {
  id: number;
  user: User;
  action: string;
  description: string;
  resource_type: string;
  resource_id: number;
  resource_name: string;
  timestamp: string;
  metadata: Record<string, any>;
}

export interface AuditFilters {
  search?: string;
  user?: number;
  action?: string;
  resource_type?: string;
  date_from?: string;
  date_to?: string;
  ip_address?: string;
}

export interface ActivityFilters {
  search?: string;
  user?: number;
  action?: string;
  resource_type?: string;
  date_from?: string;
  date_to?: string;
}

export interface AuditStats {
  total_logs: number;
  logs_today: number;
  logs_this_week: number;
  logs_this_month: number;
  unique_users: number;
  most_common_actions: Array<{ action: string; count: number }>;
  most_active_users: Array<{ user: User; count: number }>;
  resource_activity: Array<{ resource_type: string; count: number }>;
}

export interface AuditState {
  logs: AuditLog[];
  activities: ActivityFeed[];
  stats: AuditStats | null;
  filters: AuditFilters;
  activityFilters: ActivityFilters;
  loading: {
    logs: boolean;
    activities: boolean;
    stats: boolean;
  };
  error: {
    logs?: string;
    activities?: string;
    stats?: string;
  };
  pagination: {
    page: number;
    pageSize: number;
    total: number;
  };
}

export interface AuditActions {
  // Audit logs
  fetchLogs: (filters?: AuditFilters) => Promise<void>;
  getLog: (id: number) => Promise<AuditLog>;
  exportLogs: (filters?: AuditFilters, format?: 'csv' | 'xlsx' | 'pdf') => Promise<Blob>;
  
  // Activity feed
  fetchActivities: (filters?: ActivityFilters) => Promise<void>;
  getActivity: (id: number) => Promise<ActivityFeed>;
  
  // Statistics
  fetchStats: () => Promise<void>;
  refreshStats: () => Promise<void>;
  
  // Filter management
  setFilters: (filters: AuditFilters) => void;
  setActivityFilters: (filters: ActivityFilters) => void;
  
  // Pagination
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  
  // Utility functions
  getLogsByUser: (userId: number) => AuditLog[];
  getLogsByAction: (action: string) => AuditLog[];
  getLogsByResource: (resourceType: string, resourceId: number) => AuditLog[];
  getRecentLogs: (hours: number) => AuditLog[];
}
