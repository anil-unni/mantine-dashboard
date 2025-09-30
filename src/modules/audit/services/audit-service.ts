import { auditService as apiAuditService } from '../../../api/services';
import { AuditLog, ActivityFeed, AuditFilters, ActivityFilters, AuditStats } from '../types';

class AuditService {
  // Audit logs
  async getLogs(filters?: AuditFilters): Promise<AuditLog[]> {
    return apiAuditService.getAuditLogs();
  }

  async getLog(id: number): Promise<AuditLog> {
    return apiAuditService.getAuditLog(id);
  }

  // Activity feed
  async getActivities(filters?: ActivityFilters): Promise<ActivityFeed[]> {
    return apiAuditService.getActivityFeed();
  }

  // Statistics
  async getStats(): Promise<AuditStats> {
    // This would need to be implemented based on your backend API
    return {
      total_logs: 0,
      logs_today: 0,
      logs_this_week: 0,
      logs_this_month: 0,
      unique_users: 0,
      most_common_actions: [],
      most_active_users: [],
      resource_activity: [],
    };
  }

  // Export functionality
  async exportLogs(filters?: AuditFilters, format: 'csv' | 'xlsx' | 'pdf' = 'csv'): Promise<Blob> {
    // This would need to be implemented based on your backend API
    throw new Error('Export logs functionality not implemented');
  }

  // Search functionality
  async searchLogs(query: string, filters?: AuditFilters): Promise<AuditLog[]> {
    // This would need to be implemented based on your backend API
    const allLogs = await this.getLogs(filters);
    return allLogs.filter(log => 
      log.action.toLowerCase().includes(query.toLowerCase()) ||
      log.resource_type.toLowerCase().includes(query.toLowerCase()) ||
      log.user.username.toLowerCase().includes(query.toLowerCase())
    );
  }

  async searchActivities(query: string, filters?: ActivityFilters): Promise<ActivityFeed[]> {
    // This would need to be implemented based on your backend API
    const allActivities = await this.getActivities(filters);
    return allActivities.filter(activity => 
      activity.action.toLowerCase().includes(query.toLowerCase()) ||
      activity.description.toLowerCase().includes(query.toLowerCase()) ||
      activity.resource_type.toLowerCase().includes(query.toLowerCase()) ||
      activity.user.username.toLowerCase().includes(query.toLowerCase())
    );
  }

  // Utility methods
  async getLogsByUser(userId: number): Promise<AuditLog[]> {
    const allLogs = await this.getLogs();
    return allLogs.filter(log => log.user.id === userId);
  }

  async getLogsByAction(action: string): Promise<AuditLog[]> {
    const allLogs = await this.getLogs();
    return allLogs.filter(log => log.action === action);
  }

  async getLogsByResource(resourceType: string, resourceId: number): Promise<AuditLog[]> {
    const allLogs = await this.getLogs();
    return allLogs.filter(log => log.resource_type === resourceType && log.resource_id === resourceId);
  }

  async getRecentLogs(hours: number = 24): Promise<AuditLog[]> {
    const allLogs = await this.getLogs();
    const cutoffTime = new Date(Date.now() - (hours * 60 * 60 * 1000));
    return allLogs.filter(log => new Date(log.timestamp) >= cutoffTime);
  }

  // Bulk operations
  async bulkDeleteLogs(logIds: number[]): Promise<void> {
    // This would need to be implemented based on your backend API
    throw new Error('Bulk delete logs functionality not implemented');
  }

  async archiveOldLogs(olderThanDays: number): Promise<void> {
    // This would need to be implemented based on your backend API
    throw new Error('Archive old logs functionality not implemented');
  }
}

export const auditService = new AuditService();
