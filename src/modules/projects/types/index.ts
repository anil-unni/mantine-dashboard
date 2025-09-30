// Project management types
import { Project, User, Task, PaginatedResponse } from '../../../types/api';

export interface ProjectFormData {
  name: string;
  description?: string;
  status: 'planning' | 'active' | 'on_hold' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  start_date?: string;
  end_date?: string;
  project_manager?: number;
  team_members: number[];
  budget?: string;
  tags?: Record<string, any>;
  settings?: Record<string, any>;
}

export interface ProjectFilters {
  search?: string;
  status?: string[];
  priority?: string[];
  project_manager?: number;
  team_member?: number;
  start_date_from?: string;
  start_date_to?: string;
  end_date_from?: string;
  end_date_to?: string;
}

export interface ProjectStats {
  total_projects: number;
  active_projects: number;
  completed_projects: number;
  on_hold_projects: number;
  cancelled_projects: number;
  total_budget: number;
  average_duration: number;
  team_utilization: number;
}

export interface ProjectWithDetails extends Project {
  tasks: Task[];
  completed_tasks: number;
  total_tasks: number;
  progress_percentage: number;
  team_member_count: number;
  budget_used: number;
  budget_remaining: number;
  days_remaining: number;
  is_overdue: boolean;
}

export interface ProjectTimeline {
  id: string;
  title: string;
  start: string;
  end: string;
  color: string;
  type: 'project' | 'milestone' | 'task';
  project_id?: number;
  task_id?: number;
}

export interface ProjectGanttData {
  id: number;
  name: string;
  start: string;
  end: string;
  progress: number;
  dependencies: number[];
  color: string;
  type: 'project' | 'phase' | 'task';
}

export interface ProjectPhase {
  id: number;
  name: string;
  description?: string;
  start_date: string;
  end_date: string;
  status: 'not_started' | 'in_progress' | 'completed' | 'cancelled';
  progress: number;
  tasks: Task[];
  dependencies: number[];
}

export interface ProjectTemplate {
  id: number;
  name: string;
  description?: string;
  phases: ProjectPhase[];
  estimated_duration: number;
  default_team_size: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProjectMetrics {
  project_id: number;
  completion_rate: number;
  budget_variance: number;
  schedule_variance: number;
  team_productivity: number;
  quality_score: number;
  risk_level: 'low' | 'medium' | 'high';
  last_updated: string;
}

export interface ProjectState {
  projects: Project[];
  currentProject: ProjectWithDetails | null;
  filters: ProjectFilters;
  loading: {
    projects: boolean;
    currentProject: boolean;
    stats: boolean;
  };
  error: {
    projects?: string;
    currentProject?: string;
    stats?: string;
  };
  pagination: {
    page: number;
    pageSize: number;
    total: number;
  };
}

export interface ProjectActions {
  // Project CRUD
  createProject: (data: ProjectFormData) => Promise<Project>;
  updateProject: (id: number, data: Partial<ProjectFormData>) => Promise<Project>;
  deleteProject: (id: number) => Promise<void>;
  getProject: (id: number) => Promise<ProjectWithDetails>;
  
  // Project management
  assignProjectManager: (projectId: number, userId: number) => Promise<void>;
  addTeamMember: (projectId: number, userId: number) => Promise<void>;
  removeTeamMember: (projectId: number, userId: number) => Promise<void>;
  updateProjectStatus: (projectId: number, status: string) => Promise<void>;
  updateProjectProgress: (projectId: number, progress: number) => Promise<void>;
  
  // Project data
  fetchProjects: (filters?: ProjectFilters) => Promise<void>;
  fetchProjectStats: () => Promise<ProjectStats>;
  fetchProjectTimeline: (projectId: number) => Promise<ProjectTimeline[]>;
  fetchProjectGantt: (projectId: number) => Promise<ProjectGanttData[]>;
  
  // Project templates
  createProjectFromTemplate: (templateId: number, data: ProjectFormData) => Promise<Project>;
  getProjectTemplates: () => Promise<ProjectTemplate[]>;
  
  // Project metrics
  getProjectMetrics: (projectId: number) => Promise<ProjectMetrics>;
  updateProjectMetrics: (projectId: number, metrics: Partial<ProjectMetrics>) => Promise<void>;
  
  // Utility functions
  getProjectsByStatus: (status: string) => Project[];
  getProjectsByManager: (managerId: number) => Project[];
  getProjectsByTeamMember: (memberId: number) => Project[];
  getOverdueProjects: () => Project[];
  getUpcomingDeadlines: (days: number) => Project[];
}
