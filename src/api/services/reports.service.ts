import { api } from '../axios';

export class ReportsService {
  // Reports list
  async getReports(): Promise<any> {
    const response = await api.get('/api/v1/reports/');
    return response.data;
  }

  // Employee productivity report
  async getEmployeeProductivityReport(): Promise<any> {
    const response = await api.get('/api/v1/reports/employee-productivity/');
    return response.data;
  }

  // Project progress report
  async getProjectProgressReport(): Promise<any> {
    const response = await api.get('/api/v1/reports/project-progress/');
    return response.data;
  }

  // Time tracking report
  async getTimeTrackingReport(): Promise<any> {
    const response = await api.get('/api/v1/reports/time-tracking/');
    return response.data;
  }

  // Custom report builder
  async getCustomReport(): Promise<any> {
    const response = await api.get('/api/v1/reports/custom/');
    return response.data;
  }
}

export const reportsService = new ReportsService();
