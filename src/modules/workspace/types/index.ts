// Workspace and time tracking types
import { User, Task, TimeLog, Project } from '../../../types/api';

export interface WorkspaceDashboard {
  user: User;
  assigned_tasks: Task[];
  recent_timelogs: TimeLog[];
  today_hours: number;
  week_hours: number;
  month_hours: number;
  total_hours: number;
  productivity_score: number;
  upcoming_deadlines: Task[];
  recent_activities: Activity[];
}

export interface Activity {
  id: number;
  type: 'task_created' | 'task_completed' | 'time_logged' | 'project_updated' | 'comment_added';
  title: string;
  description: string;
  timestamp: string;
  user: User;
  metadata?: Record<string, any>;
}

export interface TimeLogFormData {
  task: number;
  start_time: string;
  end_time?: string;
  description?: string;
  is_billable: boolean;
}

export interface TimeLogFilters {
  date_from?: string;
  date_to?: string;
  project?: number;
  task?: number;
  is_billable?: boolean;
  is_approved?: boolean;
}

export interface TimeTrackingStats {
  total_hours: number;
  today_hours: number;
  week_hours: number;
  month_hours: number;
  billable_hours: number;
  non_billable_hours: number;
  average_daily_hours: number;
  productivity_trend: number;
  top_projects: ProjectHours[];
  daily_breakdown: DailyHours[];
}

export interface ProjectHours {
  project: Project;
  hours: number;
  percentage: number;
}

export interface DailyHours {
  date: string;
  hours: number;
  billable_hours: number;
  non_billable_hours: number;
}

export interface TaskAssignment {
  id: number;
  task: Task;
  assigned_at: string;
  due_date?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in_progress' | 'review' | 'completed' | 'cancelled';
  progress: number;
  estimated_hours?: number;
  actual_hours: number;
  is_overdue: boolean;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  color: string;
  type: 'task' | 'meeting' | 'deadline' | 'time_log';
  task_id?: number;
  project_id?: number;
  description?: string;
}

export interface WorkspaceSettings {
  timezone: string;
  working_hours: {
    start: string;
    end: string;
    days: number[];
  };
  notifications: {
    email: boolean;
    push: boolean;
    task_reminders: boolean;
    deadline_alerts: boolean;
  };
  theme: 'light' | 'dark' | 'auto';
  language: string;
  date_format: string;
  time_format: '12h' | '24h';
}

export interface ProductivityMetrics {
  user_id: number;
  period: 'day' | 'week' | 'month' | 'year';
  start_date: string;
  end_date: string;
  total_hours: number;
  productive_hours: number;
  efficiency_score: number;
  task_completion_rate: number;
  average_task_duration: number;
  focus_time: number;
  break_time: number;
  overtime_hours: number;
}

export interface WorkspaceState {
  dashboard: WorkspaceDashboard | null;
  assignedTasks: TaskAssignment[];
  timelogs: TimeLog[];
  calendarEvents: CalendarEvent[];
  settings: WorkspaceSettings;
  stats: TimeTrackingStats | null;
  loading: {
    dashboard: boolean;
    tasks: boolean;
    timelogs: boolean;
    calendar: boolean;
    settings: boolean;
    stats: boolean;
  };
  error: {
    dashboard?: string;
    tasks?: string;
    timelogs?: string;
    calendar?: string;
    settings?: string;
    stats?: string;
  };
}

export interface WorkspaceActions {
  // Dashboard
  fetchDashboard: () => Promise<void>;
  refreshDashboard: () => Promise<void>;
  
  // Tasks
  fetchAssignedTasks: () => Promise<void>;
  updateTaskStatus: (taskId: number, status: string) => Promise<void>;
  updateTaskProgress: (taskId: number, progress: number) => Promise<void>;
  addTaskComment: (taskId: number, comment: string) => Promise<void>;
  
  // Time tracking
  fetchTimelogs: (filters?: TimeLogFilters) => Promise<void>;
  createTimelog: (data: TimeLogFormData) => Promise<TimeLog>;
  updateTimelog: (id: number, data: Partial<TimeLogFormData>) => Promise<TimeLog>;
  deleteTimelog: (id: number) => Promise<void>;
  startTimer: (taskId: number) => Promise<void>;
  stopTimer: (taskId: number) => Promise<void>;
  pauseTimer: (taskId: number) => Promise<void>;
  resumeTimer: (taskId: number) => Promise<void>;
  
  // Calendar
  fetchCalendarEvents: (startDate: string, endDate: string) => Promise<void>;
  createCalendarEvent: (event: Omit<CalendarEvent, 'id'>) => Promise<CalendarEvent>;
  updateCalendarEvent: (id: string, event: Partial<CalendarEvent>) => Promise<CalendarEvent>;
  deleteCalendarEvent: (id: string) => Promise<void>;
  
  // Settings
  fetchSettings: () => Promise<void>;
  updateSettings: (settings: Partial<WorkspaceSettings>) => Promise<void>;
  
  // Statistics
  fetchStats: (period: string) => Promise<void>;
  fetchProductivityMetrics: (period: string) => Promise<ProductivityMetrics>;
  
  // Utility functions
  getTodayTasks: () => TaskAssignment[];
  getOverdueTasks: () => TaskAssignment[];
  getUpcomingTasks: (days: number) => TaskAssignment[];
  getActiveTimers: () => TimeLog[];
  getTotalHoursToday: () => number;
  getTotalHoursThisWeek: () => number;
  getTotalHoursThisMonth: () => number;
}
