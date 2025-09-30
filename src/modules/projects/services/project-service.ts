import { api } from '../../../api/axios';
import { Project, User, Task, PaginatedResponse } from '../../../types/api';
import { ProjectFormData, ProjectFilters, ProjectStats, ProjectWithDetails } from '../types';

class ProjectService {
  // Project CRUD operations
  async getProjects(filters?: ProjectFilters): Promise<PaginatedResponse<Project>> {
    const response = await api.get('/api/v1/projects/', { params: filters });
    return response.data;
  }

  async getProject(id: number): Promise<Project> {
    const response = await api.get(`/api/v1/projects/${id}/`);
    return response.data;
  }

  async createProject(data: ProjectFormData): Promise<Project> {
    const response = await api.post('/api/v1/projects/', data);
    return response.data;
  }

  async updateProject(id: number, data: Partial<ProjectFormData>): Promise<Project> {
    const response = await api.patch(`/api/v1/projects/${id}/`, data);
    return response.data;
  }

  async deleteProject(id: number): Promise<void> {
    await api.delete(`/api/v1/projects/${id}/`);
  }

  // Project management operations
  async assignProjectManager(projectId: number, userId: number): Promise<void> {
    await api.patch(`/api/v1/projects/${projectId}/`, {
      project_manager: userId
    });
  }

  async addTeamMember(projectId: number, userId: number): Promise<void> {
    const project = await this.getProject(projectId);
    const currentMembers = project.team_members.map(member => member.id);
    
    if (!currentMembers.includes(userId)) {
      await api.patch(`/api/v1/projects/${projectId}/`, {
        team_members: [...currentMembers, userId]
      });
    }
  }

  async removeTeamMember(projectId: number, userId: number): Promise<void> {
    const project = await this.getProject(projectId);
    const currentMembers = project.team_members.map(member => member.id);
    const updatedMembers = currentMembers.filter(id => id !== userId);
    
    await api.patch(`/api/v1/projects/${projectId}/`, {
      team_members: updatedMembers
    });
  }

  async updateProjectStatus(projectId: number, status: string): Promise<void> {
    await api.patch(`/api/v1/projects/${projectId}/`, { status });
  }

  async updateProjectProgress(projectId: number, progress: number): Promise<void> {
    await api.patch(`/api/v1/projects/${projectId}/`, { progress });
  }

  // Project statistics
  async getProjectStats(): Promise<ProjectStats> {
    const response = await api.get('/api/v1/projects/stats/');
    return response.data;
  }

  // Project details with additional data
  async getProjectWithDetails(id: number): Promise<ProjectWithDetails> {
    const [project, tasksResponse] = await Promise.all([
      this.getProject(id),
      api.get(`/api/v1/projects/${id}/tasks/`)
    ]);

    const tasks = tasksResponse.data.results || [];
    const completedTasks = tasks.filter(task => task.status === 'completed').length;
    const totalTasks = tasks.length;
    const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    // Calculate budget information
    const budget = project.budget ? parseFloat(project.budget) : 0;
    const budgetUsed = 0; // This would need to be calculated from time logs
    const budgetRemaining = budget - budgetUsed;

    // Calculate days remaining
    const endDate = project.end_date ? new Date(project.end_date) : null;
    const today = new Date();
    const daysRemaining = endDate ? Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)) : 0;
    const isOverdue = endDate ? today > endDate : false;

    return {
      ...project,
      tasks,
      completed_tasks: completedTasks,
      total_tasks: totalTasks,
      progress_percentage: progressPercentage,
      team_member_count: project.team_members.length,
      budget_used: budgetUsed,
      budget_remaining: budgetRemaining,
      days_remaining: daysRemaining,
      is_overdue: isOverdue,
    };
  }

  // Project timeline
  async getProjectTimeline(projectId: number): Promise<any[]> {
    const response = await api.get(`/api/v1/projects/${projectId}/timeline/`);
    return response.data;
  }

  // Project Gantt data
  async getProjectGantt(projectId: number): Promise<any[]> {
    const response = await api.get(`/api/v1/projects/${projectId}/gantt/`);
    return response.data;
  }

  // Project templates
  async getProjectTemplates(): Promise<any[]> {
    const response = await api.get('/api/v1/projects/templates/');
    return response.data;
  }

  async createProjectFromTemplate(templateId: number, data: ProjectFormData): Promise<Project> {
    const response = await api.post(`/api/v1/projects/templates/${templateId}/create/`, data);
    return response.data;
  }

  // Project metrics
  async getProjectMetrics(projectId: number): Promise<any> {
    const response = await api.get(`/api/v1/projects/${projectId}/metrics/`);
    return response.data;
  }

  async updateProjectMetrics(projectId: number, metrics: any): Promise<void> {
    await api.patch(`/api/v1/projects/${projectId}/metrics/`, metrics);
  }

  // Search and filtering
  async searchProjects(query: string, filters?: ProjectFilters): Promise<Project[]> {
    const response = await api.get('/api/v1/projects/search/', {
      params: { q: query, ...filters }
    });
    return response.data.results;
  }

  // Bulk operations
  async bulkUpdateProjects(projectIds: number[], updates: Partial<ProjectFormData>): Promise<void> {
    await api.patch('/api/v1/projects/bulk/', {
      project_ids: projectIds,
      updates
    });
  }

  async bulkDeleteProjects(projectIds: number[]): Promise<void> {
    await api.delete('/api/v1/projects/bulk/', {
      data: { project_ids: projectIds }
    });
  }

  // Export operations
  async exportProjects(format: 'csv' | 'xlsx' | 'pdf', filters?: ProjectFilters): Promise<Blob> {
    const response = await api.get('/api/v1/projects/export/', {
      params: { format, ...filters },
      responseType: 'blob'
    });
    return response.data;
  }
}

export const projectService = new ProjectService();
