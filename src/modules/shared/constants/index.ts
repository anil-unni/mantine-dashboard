// Shared constants

export const MODULE_CONFIGS = {
  RBAC: {
    name: 'Role-Based Access Control',
    path: '/rbac',
    icon: 'IconShield',
    permissions: ['rbac.view'],
    isActive: true,
  },
  PROJECTS: {
    name: 'Project Management',
    path: '/projects',
    icon: 'IconFolder',
    permissions: ['projects.view'],
    isActive: true,
  },
  TASKS: {
    name: 'Task Management',
    path: '/tasks',
    icon: 'IconChecklist',
    permissions: ['tasks.view'],
    isActive: true,
  },
  WORKSPACE: {
    name: 'Employee Workspace',
    path: '/workspace',
    icon: 'IconUser',
    permissions: ['workspace.view'],
    isActive: true,
  },
  REPORTING: {
    name: 'Reports & Analytics',
    path: '/reporting',
    icon: 'IconChartBar',
    permissions: ['reports.view'],
    isActive: true,
  },
} as const;

export const PERMISSIONS = {
  // RBAC permissions
  RBAC: {
    VIEW: 'rbac.view',
    CREATE: 'rbac.create',
    UPDATE: 'rbac.update',
    DELETE: 'rbac.delete',
    ASSIGN: 'rbac.assign',
  },
  // Project permissions
  PROJECTS: {
    VIEW: 'projects.view',
    CREATE: 'projects.create',
    UPDATE: 'projects.update',
    DELETE: 'projects.delete',
    ASSIGN: 'projects.assign',
  },
  // Task permissions
  TASKS: {
    VIEW: 'tasks.view',
    CREATE: 'tasks.create',
    UPDATE: 'tasks.update',
    DELETE: 'tasks.delete',
    ASSIGN: 'tasks.assign',
  },
  // Workspace permissions
  WORKSPACE: {
    VIEW: 'workspace.view',
    TIME_LOG: 'workspace.time_log',
    DASHBOARD: 'workspace.dashboard',
  },
  // Reporting permissions
  REPORTS: {
    VIEW: 'reports.view',
    EXPORT: 'reports.export',
    CUSTOM: 'reports.custom',
  },
} as const;

export const PRIORITY_OPTIONS = [
  { value: 'low', label: 'Low', color: 'gray' },
  { value: 'medium', label: 'Medium', color: 'blue' },
  { value: 'high', label: 'High', color: 'orange' },
  { value: 'urgent', label: 'Urgent', color: 'red' },
] as const;

export const PROJECT_STATUS_OPTIONS = [
  { value: 'planning', label: 'Planning', color: 'gray' },
  { value: 'active', label: 'Active', color: 'green' },
  { value: 'on_hold', label: 'On Hold', color: 'yellow' },
  { value: 'completed', label: 'Completed', color: 'blue' },
  { value: 'cancelled', label: 'Cancelled', color: 'red' },
] as const;

export const TASK_STATUS_OPTIONS = [
  { value: 'pending', label: 'Pending', color: 'gray' },
  { value: 'in_progress', label: 'In Progress', color: 'blue' },
  { value: 'review', label: 'Review', color: 'yellow' },
  { value: 'completed', label: 'Completed', color: 'green' },
  { value: 'cancelled', label: 'Cancelled', color: 'red' },
] as const;

export const THEME_OPTIONS = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'auto', label: 'Auto' },
] as const;

export const TABLE_PAGE_SIZES = [10, 25, 50, 100] as const;

export const DEFAULT_PAGE_SIZE = 25;

export const DATE_FORMATS = {
  DATE: 'YYYY-MM-DD',
  DATETIME: 'YYYY-MM-DD HH:mm:ss',
  TIME: 'HH:mm:ss',
  DISPLAY_DATE: 'MMM DD, YYYY',
  DISPLAY_DATETIME: 'MMM DD, YYYY HH:mm',
  DISPLAY_TIME: 'HH:mm',
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/v1/auth/login/',
    REGISTER: '/api/v1/auth/register/',
    REFRESH: '/api/v1/auth/token/refresh/',
    LOGOUT: '/api/v1/auth/logout/',
    PROFILE: '/api/v1/auth/profile/',
    CHANGE_PASSWORD: '/api/v1/auth/change-password/',
    DASHBOARD: '/api/v1/auth/dashboard/',
  },
  USERS: {
    LIST: '/api/v1/auth/organizations/{org_id}/users/',
    DETAIL: '/api/v1/auth/organizations/{org_id}/users/{id}/',
  },
  PROJECTS: {
    LIST: '/api/v1/projects/',
    DETAIL: '/api/v1/projects/{id}/',
  },
  TASKS: {
    LIST: '/api/v1/projects/{project_id}/tasks/',
    DETAIL: '/api/v1/projects/{project_id}/tasks/{id}/',
  },
  TIME_LOGS: {
    LIST: '/api/v1/projects/{project_id}/tasks/{task_id}/timelogs/',
    DETAIL: '/api/v1/projects/{project_id}/tasks/{task_id}/timelogs/{id}/',
  },
  WORKSPACE: {
    DASHBOARD: '/api/v1/workspace/dashboard/',
    TIME_LOGS: '/api/v1/workspace/timelogs/',
    MY_TASKS: '/api/v1/workspace/my-tasks/',
    CALENDAR: '/api/v1/workspace/calendar/',
  },
  REPORTS: {
    LIST: '/api/v1/reports/',
    EMPLOYEE_PRODUCTIVITY: '/api/v1/reports/employee-productivity/',
    PROJECT_PROGRESS: '/api/v1/reports/project-progress/',
    TIME_TRACKING: '/api/v1/reports/time-tracking/',
    CUSTOM: '/api/v1/reports/custom/',
  },
  AUDIT: {
    LOGS: '/api/v1/audit/logs/',
    ACTIVITY: '/api/v1/audit/activity/',
  },
} as const;

export const ROUTES = {
  HOME: '/',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  DASHBOARD: '/dashboard',
  RBAC: {
    ROLES: '/rbac/roles',
    PERMISSIONS: '/rbac/permissions',
    USERS: '/rbac/users',
  },
  PROJECTS: {
    LIST: '/projects',
    CREATE: '/projects/create',
    DETAIL: '/projects/:id',
    EDIT: '/projects/:id/edit',
  },
  TASKS: {
    LIST: '/tasks',
    CREATE: '/tasks/create',
    DETAIL: '/tasks/:id',
    EDIT: '/tasks/:id/edit',
  },
  WORKSPACE: {
    DASHBOARD: '/workspace',
    TIME_LOGS: '/workspace/timelogs',
    MY_TASKS: '/workspace/tasks',
    CALENDAR: '/workspace/calendar',
  },
  REPORTING: {
    DASHBOARD: '/reporting',
    EMPLOYEE_PRODUCTIVITY: '/reporting/employee-productivity',
    PROJECT_PROGRESS: '/reporting/project-progress',
    TIME_TRACKING: '/reporting/time-tracking',
    CUSTOM: '/reporting/custom',
  },
} as const;

export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
} as const;

export const MODAL_SIZES = {
  XS: 'xs',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
} as const;

export const DRAWER_POSITIONS = {
  LEFT: 'left',
  RIGHT: 'right',
  TOP: 'top',
  BOTTOM: 'bottom',
} as const;

export const CHART_TYPES = {
  LINE: 'line',
  BAR: 'bar',
  PIE: 'pie',
  AREA: 'area',
  SCATTER: 'scatter',
} as const;

export const EXPORT_FORMATS = {
  CSV: 'csv',
  EXCEL: 'xlsx',
  PDF: 'pdf',
  JSON: 'json',
} as const;

export const SORT_DIRECTIONS = {
  ASC: 'asc',
  DESC: 'desc',
} as const;

export const LOADING_STATES = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
} as const;

export const ERROR_MESSAGES = {
  REQUIRED_FIELD: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  PASSWORD_TOO_SHORT: 'Password must be at least 8 characters',
  PASSWORDS_DONT_MATCH: 'Passwords do not match',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action',
  NOT_FOUND: 'The requested resource was not found',
  SERVER_ERROR: 'An unexpected error occurred. Please try again.',
} as const;

export const SUCCESS_MESSAGES = {
  SAVED: 'Changes saved successfully',
  CREATED: 'Item created successfully',
  UPDATED: 'Item updated successfully',
  DELETED: 'Item deleted successfully',
  EXPORTED: 'Data exported successfully',
  IMPORTED: 'Data imported successfully',
} as const;

export const VALIDATION_RULES = {
  REQUIRED: (value: any) => !!value || ERROR_MESSAGES.REQUIRED_FIELD,
  EMAIL: (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) || ERROR_MESSAGES.INVALID_EMAIL;
  },
  MIN_LENGTH: (min: number) => (value: string) => 
    value.length >= min || `Must be at least ${min} characters`,
  PASSWORD_MATCH: (confirmValue: string) => (value: string) =>
    value === confirmValue || ERROR_MESSAGES.PASSWORDS_DONT_MATCH,
} as const;
