// API Types generated from OpenAPI schema

// Base types
export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// Enums
export type StatusEnum = 'planning' | 'active' | 'on_hold' | 'completed' | 'cancelled';
export type TaskStatusEnum = 'pending' | 'in_progress' | 'review' | 'completed' | 'cancelled';
export type PriorityEnum = 'low' | 'medium' | 'high' | 'urgent';
export type CardTypeEnum = 'summary' | 'chart' | 'list' | 'metric' | 'progress';
export type ModuleEnum = 'users' | 'projects' | 'tasks' | 'reports' | 'audit' | 'workspace';
export type ThemeEnum = 'light' | 'dark' | 'auto';

// User types
export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  date_joined: string;
  last_login: string | null;
  profile: UserProfile;
  organizations: string;
}

export interface UserProfile {
  phone: string | null;
  avatar: string | null;
  bio: string | null;
  timezone: string;
  language: string;
  job_title: string | null;
  department: string | null;
  employee_id: string | null;
  email_notifications: boolean;
  sms_notifications: boolean;
  theme: ThemeEnum;
  created_at: string;
  updated_at: string;
}

export interface UserRequest {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
}

export interface UserUpdateRequest {
  email: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  profile: UserProfileRequest;
}

export interface UserProfileRequest {
  phone?: string | null;
  avatar?: File | null;
  bio?: string | null;
  timezone: string;
  language: string;
  job_title?: string | null;
  department?: string | null;
  employee_id?: string | null;
  email_notifications: boolean;
  sms_notifications: boolean;
  theme: ThemeEnum;
}

export interface UserRegistrationRequest {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  password_confirm: string;
}

export interface UserRegistration {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

// Auth types
export interface CustomTokenObtainPairRequest {
  username: string;
  password: string;
}

export interface TokenRefreshRequest {
  refresh: string;
}

export interface TokenRefresh {
  access: string;
  refresh: string;
}

export interface ChangePasswordRequest {
  old_password: string;
  new_password: string;
  new_password_confirm: string;
}

export interface ChangePassword {
  old_password: string;
  new_password: string;
  new_password_confirm: string;
}

// Project types
export interface Project {
  id: number;
  name: string;
  description: string | null;
  status: StatusEnum;
  priority: PriorityEnum;
  start_date: string | null;
  end_date: string | null;
  project_manager: User;
  team_members: User[];
  budget: string | null;
  progress: number;
  tags: Record<string, any>;
  settings: Record<string, any>;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

export interface ProjectRequest {
  name: string;
  description?: string | null;
  status?: StatusEnum;
  priority?: PriorityEnum;
  start_date?: string | null;
  end_date?: string | null;
  budget?: string | null;
  tags?: Record<string, any>;
  settings?: Record<string, any>;
  is_active?: boolean;
}

export interface ProjectCreateRequest {
  name: string;
  description?: string | null;
  status?: StatusEnum;
  priority?: PriorityEnum;
  start_date?: string | null;
  end_date?: string | null;
  project_manager?: number | null;
  team_members?: number[];
  budget?: string | null;
  tags?: Record<string, any>;
  settings?: Record<string, any>;
}

export interface ProjectCreate {
  name: string;
  description: string | null;
  status: StatusEnum;
  priority: PriorityEnum;
  start_date: string | null;
  end_date: string | null;
  project_manager: number | null;
  team_members: number[];
  budget: string | null;
  tags: Record<string, any>;
  settings: Record<string, any>;
}

// Task types
export interface Task {
  id: number;
  project: number;
  title: string;
  description: string | null;
  status: TaskStatusEnum;
  priority: PriorityEnum;
  assigned_to: User;
  created_by: User;
  updated_by: User;
  start_date: string | null;
  due_date: string | null;
  estimated_hours: string | null;
  actual_hours: string;
  progress: number;
  tags: Record<string, any>;
  attachments: Record<string, any>;
  comments: Record<string, any>;
  depends_on: number[];
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

export interface TaskRequest {
  project: number;
  title: string;
  description?: string | null;
  status?: TaskStatusEnum;
  priority?: PriorityEnum;
  start_date?: string | null;
  due_date?: string | null;
  estimated_hours?: string | null;
  tags?: Record<string, any>;
  attachments?: Record<string, any>;
  comments?: Record<string, any>;
  depends_on?: number[];
  is_active?: boolean;
}

export interface TaskCreateRequest {
  project: number;
  title: string;
  description?: string | null;
  status?: TaskStatusEnum;
  priority?: PriorityEnum;
  assigned_to?: number | null;
  start_date?: string | null;
  due_date?: string | null;
  estimated_hours?: string | null;
  tags?: Record<string, any>;
  attachments?: Record<string, any>;
  comments?: Record<string, any>;
  depends_on?: number[];
}

export interface TaskCreate {
  project: number;
  title: string;
  description: string | null;
  status: TaskStatusEnum;
  priority: PriorityEnum;
  assigned_to: number | null;
  start_date: string | null;
  due_date: string | null;
  estimated_hours: string | null;
  tags: Record<string, any>;
  attachments: Record<string, any>;
  comments: Record<string, any>;
  depends_on: number[];
}

// TimeLog types
export interface TimeLog {
  id: number;
  user: User;
  task: number;
  start_time: string;
  end_time: string | null;
  duration: string | null;
  description: string | null;
  is_billable: boolean;
  is_approved: boolean;
  approved_by: number | null;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

export interface TimeLogRequest {
  task: number;
  start_time: string;
  end_time?: string | null;
  description?: string | null;
  is_billable?: boolean;
  is_approved?: boolean;
  approved_by?: number | null;
  is_active?: boolean;
}

export interface TimeLogCreateRequest {
  task: number;
  start_time: string;
  end_time?: string | null;
  description?: string | null;
  is_billable?: boolean;
}

export interface TimeLogCreate {
  task: number;
  start_time: string;
  end_time: string | null;
  description: string | null;
  is_billable: boolean;
}

// Dashboard Card types
export interface DashboardCard {
  id: number;
  name: string;
  title: string;
  description: string | null;
  module: ModuleEnum;
  card_type: CardTypeEnum;
  icon: string | null;
  color: string;
  order: number;
  required_permissions: Record<string, any>;
  visible_to_roles: Record<string, any>;
  data_source: string;
  refresh_interval: number;
  is_active: boolean;
  show_in_dashboard: boolean;
  show_in_sidebar: boolean;
  created_at: string;
  updated_at: string;
}

export interface DashboardCardRequest {
  name: string;
  title: string;
  description?: string | null;
  module: ModuleEnum;
  card_type: CardTypeEnum;
  icon?: string | null;
  color: string;
  order?: number;
  required_permissions?: Record<string, any>;
  visible_to_roles?: Record<string, any>;
  data_source: string;
  refresh_interval?: number;
  is_active?: boolean;
  show_in_dashboard?: boolean;
  show_in_sidebar?: boolean;
}

// Paginated response types
export interface PaginatedUserList extends PaginatedResponse<User> {}
export interface PaginatedProjectList extends PaginatedResponse<Project> {}
export interface PaginatedTaskList extends PaginatedResponse<Task> {}
export interface PaginatedTimeLogList extends PaginatedResponse<TimeLog> {}
export interface PaginatedDashboardCardList extends PaginatedResponse<DashboardCard> {}

// RBAC types (align with API.yaml)
export interface Permission {
  id: number;
  codename: string;
  name: string;
  description: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Role {
  id: number;
  name: string;
  description: string | null;
  is_active: boolean;
  permissions: number[] | Permission[];
  created_at: string;
  updated_at: string;
}

export interface UserRole {
  id: number;
  user: number | User;
  role: number | Role;
}

export interface UserRoleFormData {
  user: number;
  role: number;
}

// API Response types
export interface ApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
}

export interface ApiError {
  message: string;
  status: number;
  details?: any;
}

// Common query parameters
export interface PaginationParams {
  page?: number;
  page_size?: number;
}

export interface SearchParams {
  search?: string;
  ordering?: string;
}

export interface FilterParams extends PaginationParams, SearchParams {
  [key: string]: any;
}