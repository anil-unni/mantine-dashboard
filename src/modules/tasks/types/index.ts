// Task management types
import { Task, TimeLog, User, PaginatedResponse } from '../../../types/api';

export interface TaskFormData {
  project: number;
  title: string;
  description?: string;
  status: 'pending' | 'in_progress' | 'review' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assigned_to?: number | null;
  start_date?: string | null;
  due_date?: string | null;
  estimated_hours?: string | null;
  tags?: Record<string, any>;
  attachments?: Record<string, any>;
  comments?: Record<string, any>;
  depends_on?: number[];
}

export interface TaskFilters {
  search?: string;
  status?: string[];
  priority?: string[];
  assigned_to?: number;
  project?: number;
  created_by?: number;
  start_date_from?: string;
  start_date_to?: string;
  due_date_from?: string;
  due_date_to?: string;
  tags?: string[];
}

export interface TaskStats {
  total_tasks: number;
  pending_tasks: number;
  in_progress_tasks: number;
  review_tasks: number;
  completed_tasks: number;
  cancelled_tasks: number;
  overdue_tasks: number;
  due_today: number;
  due_this_week: number;
  average_completion_time: number;
  total_estimated_hours: number;
  total_actual_hours: number;
}

export interface TaskWithDetails extends Task {
  project_name: string;
  project_status: string;
  assigned_to_name: string;
  created_by_name: string;
  updated_by_name: string;
  time_logs: TimeLog[];
  total_time_logged: number;
  completion_percentage: number;
  is_overdue: boolean;
  days_remaining: number;
  dependencies: Task[];
  dependents: Task[];
}

export interface TimeLogFormData {
  task: number;
  start_time: string;
  end_time?: string | null;
  description?: string | null;
  is_billable?: boolean;
}

export interface TimeLogFilters {
  search?: string;
  task?: number;
  user?: number;
  project?: number;
  start_date_from?: string;
  start_date_to?: string;
  is_billable?: boolean;
  is_approved?: boolean;
}

export interface TimeLogStats {
  total_time_logged: number;
  billable_time: number;
  non_billable_time: number;
  approved_time: number;
  pending_approval_time: number;
  average_session_duration: number;
  most_productive_hour: number;
  total_sessions: number;
}

export interface TaskTimeline {
  id: string;
  title: string;
  start: string;
  end: string;
  color: string;
  type: 'task' | 'milestone' | 'deadline';
  task_id: number;
  project_id: number;
  status: string;
  priority: string;
}

export interface TaskDependency {
  id: number;
  task_id: number;
  depends_on_task_id: number;
  dependency_type: 'finish_to_start' | 'start_to_start' | 'finish_to_finish' | 'start_to_finish';
  lag_days: number;
  created_at: string;
}

export interface TaskComment {
  id: number;
  task_id: number;
  user: User;
  content: string;
  created_at: string;
  updated_at: string;
  is_edited: boolean;
}

export interface TaskAttachment {
  id: number;
  task_id: number;
  file_name: string;
  file_size: number;
  file_type: string;
  file_url: string;
  uploaded_by: User;
  created_at: string;
}

export interface TaskTemplate {
  id: number;
  name: string;
  description?: string;
  tasks: Partial<TaskFormData>[];
  estimated_duration: number;
  default_assignee?: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface TaskMetrics {
  task_id: number;
  completion_rate: number;
  time_variance: number;
  quality_score: number;
  productivity_score: number;
  collaboration_score: number;
  last_updated: string;
}

export interface TaskState {
  tasks: Task[];
  currentTask: TaskWithDetails | null;
  filters: TaskFilters;
  timeLogs: TimeLog[];
  timeLogFilters: TimeLogFilters;
  loading: {
    tasks: boolean;
    currentTask: boolean;
    timeLogs: boolean;
    stats: boolean;
  };
  error: {
    tasks?: string;
    currentTask?: string;
    timeLogs?: string;
    stats?: string;
  };
  pagination: {
    page: number;
    pageSize: number;
    total: number;
  };
}

export interface TaskActions {
  // Task CRUD
  createTask: (data: TaskFormData) => Promise<Task>;
  updateTask: (id: number, data: Partial<TaskFormData>) => Promise<Task>;
  deleteTask: (id: number) => Promise<void>;
  getTask: (id: number) => Promise<TaskWithDetails>;
  
  // Task management
  assignTask: (taskId: number, userId: number) => Promise<void>;
  updateTaskStatus: (taskId: number, status: string) => Promise<void>;
  updateTaskProgress: (taskId: number, progress: number) => Promise<void>;
  addTaskDependency: (taskId: number, dependsOnTaskId: number, type: string) => Promise<void>;
  removeTaskDependency: (taskId: number, dependsOnTaskId: number) => Promise<void>;
  
  // Task data
  fetchTasks: (filters?: TaskFilters) => Promise<void>;
  fetchTaskStats: () => Promise<TaskStats>;
  fetchTaskTimeline: (projectId?: number) => Promise<TaskTimeline[]>;
  
  // Time logging
  createTimeLog: (data: TimeLogFormData) => Promise<TimeLog>;
  updateTimeLog: (id: number, data: Partial<TimeLogFormData>) => Promise<TimeLog>;
  deleteTimeLog: (id: number) => Promise<void>;
  fetchTimeLogs: (filters?: TimeLogFilters) => Promise<void>;
  fetchTimeLogStats: () => Promise<TimeLogStats>;
  
  // Task comments
  addTaskComment: (taskId: number, content: string) => Promise<TaskComment>;
  updateTaskComment: (commentId: number, content: string) => Promise<TaskComment>;
  deleteTaskComment: (commentId: number) => Promise<void>;
  
  // Task attachments
  uploadTaskAttachment: (taskId: number, file: File) => Promise<TaskAttachment>;
  deleteTaskAttachment: (attachmentId: number) => Promise<void>;
  
  // Task templates
  createTaskFromTemplate: (templateId: number, data: TaskFormData) => Promise<Task>;
  getTaskTemplates: () => Promise<TaskTemplate[]>;
  
  // Task metrics
  getTaskMetrics: (taskId: number) => Promise<TaskMetrics>;
  
  // Utility functions
  getTasksByStatus: (status: string) => Task[];
  getTasksByAssignee: (assigneeId: number) => Task[];
  getTasksByProject: (projectId: number) => Task[];
  getOverdueTasks: () => Task[];
  getDueTodayTasks: () => Task[];
  getDueThisWeekTasks: () => Task[];
}
