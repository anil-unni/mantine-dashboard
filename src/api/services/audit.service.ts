import { api } from '../axios';

export class AuditService {
  // Audit logs
  async getAuditLogs(): Promise<any> {
    const response = await api.get('/api/v1/audit/logs/');
    return response.data;
  }

  async getAuditLog(id: number): Promise<any> {
    const response = await api.get(`/api/v1/audit/logs/${id}/`);
    return response.data;
  }

  // Activity feed
  async getActivityFeed(): Promise<any> {
    const response = await api.get('/api/v1/audit/activity/');
    return response.data;
  }
}

export const auditService = new AuditService();
