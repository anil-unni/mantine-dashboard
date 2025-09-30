import { useState, useEffect, useCallback } from 'react';
import { auditService } from '../services/audit-service';
import { AuditLog, ActivityFeed, AuditFilters, ActivityFilters, AuditStats, AuditState, AuditActions } from '../types';

export function useAudit() {
  const [state, setState] = useState<AuditState>({
    logs: [],
    activities: [],
    stats: null,
    filters: {},
    activityFilters: {},
    loading: {
      logs: false,
      activities: false,
      stats: false,
    },
    error: {},
    pagination: {
      page: 1,
      pageSize: 10,
      total: 0,
    },
  });

  // Audit logs operations
  const fetchLogs = useCallback(async (filters?: AuditFilters): Promise<void> => {
    try {
      setState(prev => ({ ...prev, loading: { ...prev.loading, logs: true } }));
      const logs = await auditService.getLogs(filters || state.filters);
      setState(prev => ({
        ...prev,
        logs,
        loading: { ...prev.loading, logs: false },
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: { ...prev.error, logs: error instanceof Error ? error.message : 'Failed to fetch logs' },
        loading: { ...prev.loading, logs: false },
      }));
    }
  }, [state.filters]);

  const getLog = useCallback(async (id: number): Promise<AuditLog> => {
    try {
      return await auditService.getLog(id);
    } catch (error) {
      throw error;
    }
  }, []);

  const exportLogs = useCallback(async (filters?: AuditFilters, format: 'csv' | 'xlsx' | 'pdf' = 'csv'): Promise<Blob> => {
    try {
      return await auditService.exportLogs(filters || state.filters, format);
    } catch (error) {
      throw error;
    }
  }, [state.filters]);

  // Activity feed operations
  const fetchActivities = useCallback(async (filters?: ActivityFilters): Promise<void> => {
    try {
      setState(prev => ({ ...prev, loading: { ...prev.loading, activities: true } }));
      const activities = await auditService.getActivities(filters || state.activityFilters);
      setState(prev => ({
        ...prev,
        activities,
        loading: { ...prev.loading, activities: false },
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: { ...prev.error, activities: error instanceof Error ? error.message : 'Failed to fetch activities' },
        loading: { ...prev.loading, activities: false },
      }));
    }
  }, [state.activityFilters]);

  const getActivity = useCallback(async (id: number): Promise<ActivityFeed> => {
    try {
      const activity = state.activities.find(a => a.id === id);
      if (activity) return activity;
      throw new Error('Activity not found');
    } catch (error) {
      throw error;
    }
  }, [state.activities]);

  // Statistics operations
  const fetchStats = useCallback(async (): Promise<void> => {
    try {
      setState(prev => ({ ...prev, loading: { ...prev.loading, stats: true } }));
      const stats = await auditService.getStats();
      setState(prev => ({
        ...prev,
        stats,
        loading: { ...prev.loading, stats: false },
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: { ...prev.error, stats: error instanceof Error ? error.message : 'Failed to fetch stats' },
        loading: { ...prev.loading, stats: false },
      }));
    }
  }, []);

  const refreshStats = useCallback(async (): Promise<void> => {
    await fetchStats();
  }, [fetchStats]);

  // Filter management
  const setFilters = useCallback((filters: AuditFilters) => {
    setState(prev => ({ ...prev, filters }));
  }, []);

  const setActivityFilters = useCallback((filters: ActivityFilters) => {
    setState(prev => ({ ...prev, activityFilters: filters }));
  }, []);

  // Pagination
  const setPage = useCallback((page: number) => {
    setState(prev => ({ ...prev, pagination: { ...prev.pagination, page } }));
  }, []);

  const setPageSize = useCallback((pageSize: number) => {
    setState(prev => ({ ...prev, pagination: { ...prev.pagination, pageSize, page: 1 } }));
  }, []);

  // Utility functions
  const getLogsByUser = useCallback((userId: number): AuditLog[] => {
    return state.logs.filter(log => log.user.id === userId);
  }, [state.logs]);

  const getLogsByAction = useCallback((action: string): AuditLog[] => {
    return state.logs.filter(log => log.action === action);
  }, [state.logs]);

  const getLogsByResource = useCallback((resourceType: string, resourceId: number): AuditLog[] => {
    return state.logs.filter(log => log.resource_type === resourceType && log.resource_id === resourceId);
  }, [state.logs]);

  const getRecentLogs = useCallback((hours: number = 24): AuditLog[] => {
    const cutoffTime = new Date(Date.now() - (hours * 60 * 60 * 1000));
    return state.logs.filter(log => new Date(log.timestamp) >= cutoffTime);
  }, [state.logs]);

  // Load data on mount
  useEffect(() => {
    fetchLogs();
    fetchActivities();
    fetchStats();
  }, [fetchLogs, fetchActivities, fetchStats]);

  const actions: AuditActions = {
    fetchLogs,
    getLog,
    exportLogs,
    fetchActivities,
    getActivity,
    fetchStats,
    refreshStats,
    setFilters,
    setActivityFilters,
    setPage,
    setPageSize,
    getLogsByUser,
    getLogsByAction,
    getLogsByResource,
    getRecentLogs,
  };

  return {
    ...state,
    actions,
  };
}
