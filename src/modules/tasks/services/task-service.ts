import { projectsService } from '../../../api/services';
import { Task, TimeLog, PaginatedResponse } from '../../../types/api';
import { TaskFormData, TaskFilters, TaskStats, TaskWithDetails, TimeLogFormData, TimeLogFilters, TimeLogStats } from '../types';

class TaskService {
  // Task CRUD operations
  async getTasks(projectId: number, filters?: TaskFilters): Promise<PaginatedResponse<Task>> {
    return projectsService.getProjectTasks(projectId, filters);
  }

  async getTask(projectId: number, taskId: number): Promise<Task> {
    return projectsService.getProjectTask(projectId, taskId);
  }

  async createTask(projectId: number, data: TaskFormData): Promise<Task> {
    return projectsService.createProjectTask(projectId, data);
  }

  async updateTask(projectId: number, taskId: number, data: Partial<TaskFormData>): Promise<Task> {
    return projectsService.partialUpdateProjectTask(projectId, taskId, data);
  }

  async deleteTask(projectId: number, taskId: number): Promise<void> {
    return projectsService.deleteProjectTask(projectId, taskId);
  }

  // Task management operations
  async assignTask(projectId: number, taskId: number, userId: number): Promise<void> {
    await this.updateTask(projectId, taskId, { assigned_to: userId });
  }

  async updateTaskStatus(projectId: number, taskId: number, status: string): Promise<void> {
    await this.updateTask(projectId, taskId, { status: status as any });
  }

  async updateTaskProgress(projectId: number, taskId: number, progress: number): Promise<void> {
    await this.updateTask(projectId, taskId, { progress });
  }

  // Time logging operations
  async getTimeLogs(projectId: number, taskId: number, filters?: TimeLogFilters): Promise<PaginatedResponse<TimeLog>> {
    return projectsService.getProjectTaskTimeLogs(projectId, taskId, filters);
  }

  async createTimeLog(projectId: number, taskId: number, data: TimeLogFormData): Promise<TimeLog> {
    return projectsService.createProjectTaskTimeLog(projectId, taskId, data);
  }

  async getTimeLog(projectId: number, taskId: number, timeLogId: number): Promise<TimeLog> {
    return projectsService.getProjectTaskTimeLog(projectId, taskId, timeLogId);
  }

  async updateTimeLog(projectId: number, taskId: number, timeLogId: number, data: Partial<TimeLogFormData>): Promise<TimeLog> {
    return projectsService.partialUpdateProjectTaskTimeLog(projectId, taskId, timeLogId, data);
  }

  async deleteTimeLog(projectId: number, taskId: number, timeLogId: number): Promise<void> {
    return projectsService.deleteProjectTaskTimeLog(projectId, taskId, timeLogId);
  }

  // Task details with additional data
  async getTaskWithDetails(projectId: number, taskId: number): Promise<TaskWithDetails> {
    const [task, timeLogsResponse] = await Promise.all([
      this.getTask(projectId, taskId),
      this.getTimeLogs(projectId, taskId)
    ]);

    const timeLogs = timeLogsResponse.results || [];
    const totalTimeLogged = timeLogs.reduce((total, log) => {
      if (log.duration) {
        // Parse duration string (e.g., "2:30:00") to hours
        const [hours, minutes, seconds] = log.duration.split(':').map(Number);
        return total + hours + (minutes / 60) + (seconds / 3600);
      }
      return total;
    }, 0);

    const estimatedHours = task.estimated_hours ? parseFloat(task.estimated_hours) : 0;
    const completionPercentage = estimatedHours > 0 ? Math.min((totalTimeLogged / estimatedHours) * 100, 100) : 0;

    // Calculate if task is overdue
    const dueDate = task.due_date ? new Date(task.due_date) : null;
    const today = new Date();
    const isOverdue = dueDate ? today > dueDate && task.status !== 'completed' : false;
    const daysRemaining = dueDate ? Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)) : 0;

    return {
      ...task,
      project_name: '', // This would need to be fetched from project data
      project_status: '', // This would need to be fetched from project data
      assigned_to_name: task.assigned_to ? `${task.assigned_to.first_name} ${task.assigned_to.last_name}` : 'Unassigned',
      created_by_name: `${task.created_by.first_name} ${task.created_by.last_name}`,
      updated_by_name: `${task.updated_by.first_name} ${task.updated_by.last_name}`,
      time_logs: timeLogs,
      total_time_logged: totalTimeLogged,
      completion_percentage: completionPercentage,
      is_overdue: isOverdue,
      days_remaining: daysRemaining,
      dependencies: [], // This would need to be fetched separately
      dependents: [], // This would need to be fetched separately
    };
  }

  // Task statistics
  async getTaskStats(projectId?: number): Promise<TaskStats> {
    // This would need to be implemented based on your backend API
    // For now, returning mock data structure
    return {
      total_tasks: 0,
      pending_tasks: 0,
      in_progress_tasks: 0,
      review_tasks: 0,
      completed_tasks: 0,
      cancelled_tasks: 0,
      overdue_tasks: 0,
      due_today: 0,
      due_this_week: 0,
      average_completion_time: 0,
      total_estimated_hours: 0,
      total_actual_hours: 0,
    };
  }

  // Time log statistics
  async getTimeLogStats(projectId?: number, taskId?: number): Promise<TimeLogStats> {
    // This would need to be implemented based on your backend API
    // For now, returning mock data structure
    return {
      total_time_logged: 0,
      billable_time: 0,
      non_billable_time: 0,
      approved_time: 0,
      pending_approval_time: 0,
      average_session_duration: 0,
      most_productive_hour: 0,
      total_sessions: 0,
    };
  }

  // Search and filtering
  async searchTasks(projectId: number, query: string, filters?: TaskFilters): Promise<Task[]> {
    const response = await this.getTasks(projectId, { ...filters, search: query });
    return response.results;
  }

  // Bulk operations
  async bulkUpdateTasks(projectId: number, taskIds: number[], updates: Partial<TaskFormData>): Promise<void> {
    // This would need to be implemented based on your backend API
    for (const taskId of taskIds) {
      await this.updateTask(projectId, taskId, updates);
    }
  }

  async bulkDeleteTasks(projectId: number, taskIds: number[]): Promise<void> {
    // This would need to be implemented based on your backend API
    for (const taskId of taskIds) {
      await this.deleteTask(projectId, taskId);
    }
  }

  // Export operations
  async exportTasks(projectId: number, format: 'csv' | 'xlsx' | 'pdf', filters?: TaskFilters): Promise<Blob> {
    // This would need to be implemented based on your backend API
    throw new Error('Export functionality not implemented');
  }
}

export const taskService = new TaskService();
