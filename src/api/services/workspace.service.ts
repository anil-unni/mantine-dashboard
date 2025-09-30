import { api } from '../axios';

export class WorkspaceService {
  // Workspace dashboard
  async getDashboard(): Promise<any> {
    const response = await api.get('/api/v1/workspace/dashboard/');
    return response.data;
  }

  // Time logs
  async getTimeLogs(): Promise<any> {
    const response = await api.get('/api/v1/workspace/timelogs/');
    return response.data;
  }

  async getTimeLog(id: number): Promise<any> {
    const response = await api.get(`/api/v1/workspace/timelogs/${id}/`);
    return response.data;
  }

  // My tasks
  async getMyTasks(): Promise<any> {
    const response = await api.get('/api/v1/workspace/my-tasks/');
    return response.data;
  }

  // Calendar
  async getCalendar(): Promise<any> {
    const response = await api.get('/api/v1/workspace/calendar/');
    return response.data;
  }
}

export const workspaceService = new WorkspaceService();
