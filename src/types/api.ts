// Generated types from API.yaml schema

// Enums
export type PriorityEnum = 'low' | 'medium' | 'high' | 'urgent';

export type ProjectStatusEnum = 'planning' | 'active' | 'on_hold' | 'completed' | 'cancelled';

export type TaskStatusEnum = 'pending' | 'in_progress' | 'review' | 'completed' | 'cancelled';

export type ThemeEnum = 'light' | 'dark' | 'auto';

// Base interfaces
export interface BaseEntity {
  id: number;
  created_at: string;
  updated_at: string;
  created_by?: number;
  updated_by?: number;
  is_active: boolean;
}

// User related types
export interface UserProfile {
  phone?: string;
  avatar?: string;
  bio?: string;
  timezone: string;
  language: string;
  job_title?: string;
  department?: string;
  employee_id?: string;
  email_notifications: boolean;
  sms_notifications: boolean;
  theme: ThemeEnum;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  date_joined: string;
  last_login?: string;
  profile: UserProfile;
  organizations: string;
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

export interface UserRequest {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
}

export interface PatchedUserRequest {
  username?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  is_active?: boolean;
}

export interface UserUpdateRequest {
  email: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  profile: UserProfileRequest;
}

export interface PatchedUserUpdateRequest {
  email?: string;
  first_name?: string;
  last_name?: string;
  is_active?: boolean;
  profile?: UserProfileRequest;
}

export interface UserUpdate {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  profile: UserProfile;
}

export interface UserProfileRequest {
  phone?: string;
  avatar?: string;
  bio?: string;
  timezone: string;
  language: string;
  job_title?: string;
  department?: string;
  employee_id?: string;
  email_notifications: boolean;
  sms_notifications: boolean;
  theme: ThemeEnum;
}

// Auth related types
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

// Project related types
export interface Project extends BaseEntity {
  name: string;
  description?: string;
  status: ProjectStatusEnum;
  priority: PriorityEnum;
  start_date?: string;
  end_date?: string;
  project_manager: User;
  team_members: User[];
  budget?: string;
  progress: number;
  tags: Record<string, any>;
  settings: Record<string, any>;
}

export interface ProjectCreateRequest {
  name: string;
  description?: string;
  status?: ProjectStatusEnum;
  priority?: PriorityEnum;
  start_date?: string;
  end_date?: string;
  project_manager?: number;
  team_members?: number[];
  budget?: string;
  tags?: Record<string, any>;
  settings?: Record<string, any>;
}

export interface ProjectCreate {
  name: string;
  description?: string;
  status?: ProjectStatusEnum;
  priority?: PriorityEnum;
  start_date?: string;
  end_date?: string;
  project_manager?: number;
  team_members?: number[];
  budget?: string;
  tags?: Record<string, any>;
  settings?: Record<string, any>;
}

export interface ProjectRequest {
  name: string;
  description?: string;
  status?: ProjectStatusEnum;
  priority?: PriorityEnum;
  start_date?: string;
  end_date?: string;
  budget?: string;
  tags?: Record<string, any>;
  settings?: Record<string, any>;
  is_active?: boolean;
}

export interface PatchedProjectRequest {
  name?: string;
  description?: string;
  status?: ProjectStatusEnum;
  priority?: PriorityEnum;
  start_date?: string;
  end_date?: string;
  budget?: string;
  tags?: Record<string, any>;
  settings?: Record<string, any>;
  is_active?: boolean;
}

// Task related types
export interface Task extends BaseEntity {
  project: number;
  title: string;
  description?: string;
  status: TaskStatusEnum;
  priority: PriorityEnum;
  assigned_to: User;
  created_by: User;
  updated_by: User;
  start_date?: string;
  due_date?: string;
  estimated_hours?: string;
  actual_hours: string;
  progress: number;
  tags: Record<string, any>;
  attachments: Record<string, any>;
  comments: Record<string, any>;
  depends_on: number[];
}

export interface TaskCreateRequest {
  project: number;
  title: string;
  description?: string;
  status?: TaskStatusEnum;
  priority?: PriorityEnum;
  assigned_to?: number;
  start_date?: string;
  due_date?: string;
  estimated_hours?: string;
  tags?: Record<string, any>;
  attachments?: Record<string, any>;
  comments?: Record<string, any>;
  depends_on?: number[];
}

export interface TaskCreate {
  project: number;
  title: string;
  description?: string;
  status?: TaskStatusEnum;
  priority?: PriorityEnum;
  assigned_to?: number;
  start_date?: string;
  due_date?: string;
  estimated_hours?: string;
  tags?: Record<string, any>;
  attachments?: Record<string, any>;
  comments?: Record<string, any>;
  depends_on?: number[];
}

export interface TaskRequest {
  project: number;
  title: string;
  description?: string;
  status?: TaskStatusEnum;
  priority?: PriorityEnum;
  start_date?: string;
  due_date?: string;
  estimated_hours?: string;
  tags?: Record<string, any>;
  attachments?: Record<string, any>;
  comments?: Record<string, any>;
  depends_on?: number[];
  is_active?: boolean;
}

export interface PatchedTaskRequest {
  project?: number;
  title?: string;
  description?: string;
  status?: TaskStatusEnum;
  priority?: PriorityEnum;
  start_date?: string;
  due_date?: string;
  estimated_hours?: string;
  tags?: Record<string, any>;
  attachments?: Record<string, any>;
  comments?: Record<string, any>;
  depends_on?: number[];
  is_active?: boolean;
}

// TimeLog related types
export interface TimeLog extends BaseEntity {
  user: User;
  task: number;
  start_time: string;
  end_time?: string;
  duration?: string;
  description?: string;
  is_billable: boolean;
  is_approved: boolean;
  approved_by?: number;
}

export interface TimeLogCreateRequest {
  task: number;
  start_time: string;
  end_time?: string;
  description?: string;
  is_billable: boolean;
}

export interface TimeLogCreate {
  task: number;
  start_time: string;
  end_time?: string;
  description?: string;
  is_billable: boolean;
}

export interface TimeLogRequest {
  task: number;
  start_time: string;
  end_time?: string;
  description?: string;
  is_billable: boolean;
  is_approved: boolean;
  approved_by?: number;
  is_active: boolean;
}

export interface PatchedTimeLogRequest {
  task?: number;
  start_time?: string;
  end_time?: string;
  description?: string;
  is_billable?: boolean;
  is_approved?: boolean;
  approved_by?: number;
  is_active?: boolean;
}

// Pagination types
export interface PaginatedResponse<T> {
  count: number;
  next?: string;
  previous?: string;
  results: T[];
}

export type PaginatedProjectList = PaginatedResponse<Project>;
export type PaginatedTaskList = PaginatedResponse<Task>;
export type PaginatedTimeLogList = PaginatedResponse<TimeLog>;
export type PaginatedUserList = PaginatedResponse<User>;

// API Response types
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  status: number;
}

export interface ApiError {
  message: string;
  status: number;
  details?: Record<string, any>;
}

// Query parameters
export interface PaginationParams {
  page?: number;
  ordering?: string;
  search?: string;
}

export interface ProjectListParams extends PaginationParams {}

export interface TaskListParams extends PaginationParams {
  project_id: number;
}

export interface TimeLogListParams extends PaginationParams {
  project_id: number;
  task_id: number;
}

export interface UserListParams extends PaginationParams {
  org_id: number;
}

// Dashboard and workspace types
export interface DashboardData {
  total_projects: number;
  active_projects: number;
  total_tasks: number;
  completed_tasks: number;
  total_hours_logged: number;
  recent_activities: Activity[];
}

export interface Activity {
  id: number;
  type: 'project_created' | 'task_created' | 'task_updated' | 'time_logged' | 'user_joined';
  description: string;
  user: User;
  timestamp: string;
  metadata?: Record<string, any>;
}

// Report types
export interface ReportData {
  id: string;
  name: string;
  type: 'employee_productivity' | 'project_progress' | 'time_tracking' | 'custom';
  data: Record<string, any>;
  generated_at: string;
  generated_by: User;
}

// Audit types
export interface AuditLog {
  id: number;
  action: 'create' | 'update' | 'delete';
  entity_type: 'project' | 'task' | 'user' | 'timelog';
  entity_id: number;
  user: User;
  timestamp: string;
  changes?: Record<string, any>;
  ip_address?: string;
  user_agent?: string;
}

// Role and Permission types (for RBAC)
export interface Role {
  id: number;
  name: string;
  description?: string;
  permissions: Permission[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Permission {
  id: number;
  name: string;
  resource: string;
  action: 'create' | 'read' | 'update' | 'delete' | 'assign';
  description?: string;
}

export interface UserRole {
  id: number;
  user: User;
  role: Role;
  assigned_at: string;
  assigned_by: User;
  is_active: boolean;
}
