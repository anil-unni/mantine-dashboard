import { api } from '../axios';
import {
  Project,
  ProjectRequest,
  ProjectCreateRequest,
  ProjectCreate,
  PaginatedProjectList,
  FilterParams
} from '../../types/api';

export class ProjectsService {
  // Project CRUD operations
  async getProjects(params?: FilterParams): Promise<PaginatedProjectList> {
    const response = await api.get('/api/v1/projects/', { params });
    return response.data;
  }

  async getProject(id: number): Promise<Project> {
    const response = await api.get(`/api/v1/projects/${id}/`);
    return response.data;
  }

  async createProject(data: ProjectCreateRequest): Promise<ProjectCreate> {
    const response = await api.post('/api/v1/projects/', data);
    return response.data;
  }

  async updateProject(id: number, data: ProjectRequest): Promise<Project> {
    const response = await api.put(`/api/v1/projects/${id}/`, data);
    return response.data;
  }

  async partialUpdateProject(id: number, data: Partial<ProjectRequest>): Promise<Project> {
    const response = await api.patch(`/api/v1/projects/${id}/`, data);
    return response.data;
  }

  async deleteProject(id: number): Promise<void> {
    await api.delete(`/api/v1/projects/${id}/`);
  }

  // Project task management
  async getProjectTasks(projectId: number, params?: FilterParams): Promise<any> {
    const response = await api.get(`/api/v1/projects/${projectId}/tasks/`, { params });
    return response.data;
  }

  async createProjectTask(projectId: number, data: any): Promise<any> {
    const response = await api.post(`/api/v1/projects/${projectId}/tasks/`, data);
    return response.data;
  }

  async getProjectTask(projectId: number, taskId: number): Promise<any> {
    const response = await api.get(`/api/v1/projects/${projectId}/tasks/${taskId}/`);
    return response.data;
  }

  async updateProjectTask(projectId: number, taskId: number, data: any): Promise<any> {
    const response = await api.put(`/api/v1/projects/${projectId}/tasks/${taskId}/`, data);
    return response.data;
  }

  async partialUpdateProjectTask(projectId: number, taskId: number, data: any): Promise<any> {
    const response = await api.patch(`/api/v1/projects/${projectId}/tasks/${taskId}/`, data);
    return response.data;
  }

  async deleteProjectTask(projectId: number, taskId: number): Promise<void> {
    await api.delete(`/api/v1/projects/${projectId}/tasks/${taskId}/`);
  }

  // Project time logs
  async getProjectTaskTimeLogs(projectId: number, taskId: number, params?: FilterParams): Promise<any> {
    const response = await api.get(`/api/v1/projects/${projectId}/tasks/${taskId}/timelogs/`, { params });
    return response.data;
  }

  async createProjectTaskTimeLog(projectId: number, taskId: number, data: any): Promise<any> {
    const response = await api.post(`/api/v1/projects/${projectId}/tasks/${taskId}/timelogs/`, data);
    return response.data;
  }

  async getProjectTaskTimeLog(projectId: number, taskId: number, timeLogId: number): Promise<any> {
    const response = await api.get(`/api/v1/projects/${projectId}/tasks/${taskId}/timelogs/${timeLogId}/`);
    return response.data;
  }

  async updateProjectTaskTimeLog(projectId: number, taskId: number, timeLogId: number, data: any): Promise<any> {
    const response = await api.put(`/api/v1/projects/${projectId}/tasks/${taskId}/timelogs/${timeLogId}/`, data);
    return response.data;
  }

  async partialUpdateProjectTaskTimeLog(projectId: number, taskId: number, timeLogId: number, data: any): Promise<any> {
    const response = await api.patch(`/api/v1/projects/${projectId}/tasks/${taskId}/timelogs/${timeLogId}/`, data);
    return response.data;
  }

  async deleteProjectTaskTimeLog(projectId: number, taskId: number, timeLogId: number): Promise<void> {
    await api.delete(`/api/v1/projects/${projectId}/tasks/${taskId}/timelogs/${timeLogId}/`);
  }
}

export const projectsService = new ProjectsService();
