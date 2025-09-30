import { api } from '../../../api/axios';
import { projectsService } from '../../../api/services';
import { Project, ProjectCreate, PaginatedResponse, StatusEnum } from '../../../types/api';
import { ProjectFormData, ProjectFilters, ProjectStats, ProjectWithDetails } from '../types';

class ProjectService {
  // Project CRUD operations
  async getProjects(filters?: ProjectFilters): Promise<PaginatedResponse<Project>> {
    return projectsService.getProjects(filters);
  }

  async getProject(id: number): Promise<Project> {
    return projectsService.getProject(id);
  }

  async createProject(data: ProjectFormData): Promise<ProjectCreate> {
    return projectsService.createProject(data);
  }

  async updateProject(id: number, data: Partial<ProjectFormData>): Promise<Project> {
    // Map form data to API request shape (ProjectRequest)
    const request: any = {
      name: data.name,
      description: data.description,
      status: data.status,
      priority: data.priority,
      start_date: data.start_date,
      end_date: data.end_date,
      budget: data.budget,
      tags: data.tags,
      settings: data.settings,
      is_active: (data as any).is_active,
    };
    return projectsService.partialUpdateProject(id, request);
  }

  async deleteProject(id: number): Promise<void> {
    return projectsService.deleteProject(id);
  }

  // Project management operations supported by API
  async updateProjectStatus(projectId: number, status: StatusEnum): Promise<void> {
    await projectsService.partialUpdateProject(projectId, { status });
  }

  async updateProjectProgress(projectId: number, progress: number): Promise<void> {
    await projectsService.partialUpdateProject(projectId, { progress } as any);
  }

  async assignProjectManager(projectId: number, userId: number): Promise<void> {
    await projectsService.partialUpdateProject(projectId, { project_manager: userId } as any);
  }

  async addTeamMember(projectId: number, userId: number): Promise<void> {
    const project = await this.getProject(projectId);
    const memberIds = (project.team_members || []).map((u: any) => u.id);
    if (!memberIds.includes(userId)) memberIds.push(userId);
    await projectsService.partialUpdateProject(projectId, { team_members: memberIds } as any);
  }

  async removeTeamMember(projectId: number, userId: number): Promise<void> {
    const project = await this.getProject(projectId);
    const memberIds = (project.team_members || []).map((u: any) => u.id).filter((id: number) => id !== userId);
    await projectsService.partialUpdateProject(projectId, { team_members: memberIds } as any);
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
      projectsService.getProjectTasks(id)
    ]);

    const tasks: any[] = tasksResponse.results || [];
    const completedTasks = tasks.filter((task: any) => task.status === 'completed').length;
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
