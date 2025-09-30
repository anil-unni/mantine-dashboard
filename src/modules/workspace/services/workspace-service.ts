import { api } from '../../../api/axios';
import { WorkspaceDashboard, TimeLog, TimeLogFormData, TimeLogFilters, CalendarEvent, WorkspaceSettings, TimeTrackingStats } from '../types';

class WorkspaceService {
  // Dashboard
  async getDashboard(): Promise<WorkspaceDashboard> {
    const response = await api.get('/api/v1/workspace/dashboard/');
    return response.data;
  }

  // Tasks
  async getAssignedTasks(): Promise<any[]> {
    const response = await api.get('/api/v1/workspace/my-tasks/');
    return response.data.results || [];
  }

  async updateTaskStatus(taskId: number, status: string): Promise<void> {
    await api.patch(`/api/v1/workspace/tasks/${taskId}/`, { status });
  }

  async updateTaskProgress(taskId: number, progress: number): Promise<void> {
    await api.patch(`/api/v1/workspace/tasks/${taskId}/`, { progress });
  }

  async addTaskComment(taskId: number, comment: string): Promise<void> {
    await api.post(`/api/v1/workspace/tasks/${taskId}/comments/`, { comment });
  }

  // Time logs
  async getTimelogs(filters?: TimeLogFilters): Promise<TimeLog[]> {
    const response = await api.get('/api/v1/workspace/timelogs/', { params: filters });
    return response.data.results || [];
  }

  async createTimelog(data: TimeLogFormData): Promise<TimeLog> {
    const response = await api.post('/api/v1/workspace/timelogs/', data);
    return response.data;
  }

  async updateTimelog(id: number, data: Partial<TimeLogFormData>): Promise<TimeLog> {
    const response = await api.patch(`/api/v1/workspace/timelogs/${id}/`, data);
    return response.data;
  }

  async deleteTimelog(id: number): Promise<void> {
    await api.delete(`/api/v1/workspace/timelogs/${id}/`);
  }

  // Timer functions
  async startTimer(taskId: number): Promise<TimeLog> {
    const response = await api.post('/api/v1/workspace/timer/start/', { task_id: taskId });
    return response.data;
  }

  async stopTimer(taskId: number): Promise<TimeLog> {
    const response = await api.post('/api/v1/workspace/timer/stop/', { task_id: taskId });
    return response.data;
  }

  async pauseTimer(taskId: number): Promise<TimeLog> {
    const response = await api.post('/api/v1/workspace/timer/pause/', { task_id: taskId });
    return response.data;
  }

  async resumeTimer(taskId: number): Promise<TimeLog> {
    const response = await api.post('/api/v1/workspace/timer/resume/', { task_id: taskId });
    return response.data;
  }

  async getActiveTimers(): Promise<TimeLog[]> {
    const response = await api.get('/api/v1/workspace/timer/active/');
    return response.data.results || [];
  }

  // Calendar
  async getCalendarEvents(startDate: string, endDate: string): Promise<CalendarEvent[]> {
    const response = await api.get('/api/v1/workspace/calendar/', {
      params: { start_date: startDate, end_date: endDate }
    });
    return response.data.results || [];
  }

  async createCalendarEvent(event: Omit<CalendarEvent, 'id'>): Promise<CalendarEvent> {
    const response = await api.post('/api/v1/workspace/calendar/', event);
    return response.data;
  }

  async updateCalendarEvent(id: string, event: Partial<CalendarEvent>): Promise<CalendarEvent> {
    const response = await api.patch(`/api/v1/workspace/calendar/${id}/`, event);
    return response.data;
  }

  async deleteCalendarEvent(id: string): Promise<void> {
    await api.delete(`/api/v1/workspace/calendar/${id}/`);
  }

  // Settings
  async getSettings(): Promise<WorkspaceSettings> {
    const response = await api.get('/api/v1/workspace/settings/');
    return response.data;
  }

  async updateSettings(settings: Partial<WorkspaceSettings>): Promise<WorkspaceSettings> {
    const response = await api.patch('/api/v1/workspace/settings/', settings);
    return response.data;
  }

  // Statistics
  async getTimeTrackingStats(period: string): Promise<TimeTrackingStats> {
    const response = await api.get('/api/v1/workspace/stats/', { params: { period } });
    return response.data;
  }

  async getProductivityMetrics(period: string): Promise<any> {
    const response = await api.get('/api/v1/workspace/productivity/', { params: { period } });
    return response.data;
  }

  // Reports
  async generateTimeReport(filters: TimeLogFilters): Promise<Blob> {
    const response = await api.get('/api/v1/workspace/reports/time/', {
      params: filters,
      responseType: 'blob'
    });
    return response.data;
  }

  async generateProductivityReport(period: string): Promise<Blob> {
    const response = await api.get('/api/v1/workspace/reports/productivity/', {
      params: { period },
      responseType: 'blob'
    });
    return response.data;
  }

  // Notifications
  async getNotifications(): Promise<any[]> {
    const response = await api.get('/api/v1/workspace/notifications/');
    return response.data.results || [];
  }

  async markNotificationAsRead(notificationId: number): Promise<void> {
    await api.patch(`/api/v1/workspace/notifications/${notificationId}/`, { read: true });
  }

  async markAllNotificationsAsRead(): Promise<void> {
    await api.patch('/api/v1/workspace/notifications/mark-all-read/');
  }

  // Quick actions
  async quickLogTime(taskId: number, hours: number, description?: string): Promise<TimeLog> {
    const now = new Date();
    const startTime = new Date(now.getTime() - (hours * 60 * 60 * 1000));
    
    return this.createTimelog({
      task: taskId,
      start_time: startTime.toISOString(),
      end_time: now.toISOString(),
      description,
      is_billable: true,
    });
  }

  async duplicateTimelog(timelogId: number): Promise<TimeLog> {
    const response = await api.post(`/api/v1/workspace/timelogs/${timelogId}/duplicate/`);
    return response.data;
  }

  // Bulk operations
  async bulkCreateTimelogs(timelogs: TimeLogFormData[]): Promise<TimeLog[]> {
    const response = await api.post('/api/v1/workspace/timelogs/bulk/', { timelogs });
    return response.data;
  }

  async bulkUpdateTimelogs(updates: { id: number; data: Partial<TimeLogFormData> }[]): Promise<TimeLog[]> {
    const response = await api.patch('/api/v1/workspace/timelogs/bulk/', { updates });
    return response.data;
  }

  async bulkDeleteTimelogs(timelogIds: number[]): Promise<void> {
    await api.delete('/api/v1/workspace/timelogs/bulk/', {
      data: { timelog_ids: timelogIds }
    });
  }
}

export const workspaceService = new WorkspaceService();
