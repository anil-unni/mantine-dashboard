// Reporting and analytics types
import { User, Project, Task, TimeLog } from '../../../types/api';

export interface ReportConfig {
  id: string;
  name: string;
  description?: string;
  type: 'employee_productivity' | 'project_progress' | 'time_tracking' | 'custom';
  parameters: ReportParameters;
  filters: ReportFilters;
  chart_config: ChartConfig;
  created_at: string;
  updated_at: string;
  created_by: User;
  is_public: boolean;
  is_scheduled: boolean;
  schedule_config?: ScheduleConfig;
}

export interface ReportParameters {
  date_range: {
    start: string;
    end: string;
  };
  group_by?: 'day' | 'week' | 'month' | 'quarter' | 'year';
  metrics: string[];
  dimensions: string[];
  aggregation: 'sum' | 'avg' | 'count' | 'min' | 'max';
}

export interface ReportFilters {
  users?: number[];
  projects?: number[];
  tasks?: number[];
  departments?: string[];
  status?: string[];
  priority?: string[];
  tags?: string[];
}

export interface ChartConfig {
  type: 'line' | 'bar' | 'pie' | 'area' | 'scatter' | 'table';
  title: string;
  x_axis: string;
  y_axis: string;
  colors?: string[];
  show_legend: boolean;
  show_grid: boolean;
  show_tooltips: boolean;
  height: number;
  width?: number;
}

export interface ScheduleConfig {
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  day_of_week?: number;
  day_of_month?: number;
  time: string;
  recipients: string[];
  format: 'pdf' | 'excel' | 'csv';
}

export interface ReportData {
  id: string;
  report_id: string;
  data: any[];
  metadata: ReportMetadata;
  generated_at: string;
  generated_by: User;
  file_path?: string;
  file_size?: number;
}

export interface ReportMetadata {
  total_records: number;
  generation_time: number;
  filters_applied: ReportFilters;
  parameters_used: ReportParameters;
  data_sources: string[];
}

export interface EmployeeProductivityReport {
  user: User;
  total_hours: number;
  billable_hours: number;
  non_billable_hours: number;
  tasks_completed: number;
  tasks_assigned: number;
  completion_rate: number;
  average_task_duration: number;
  productivity_score: number;
  overtime_hours: number;
  projects_worked: number;
  daily_breakdown: DailyProductivity[];
  project_breakdown: ProjectProductivity[];
}

export interface DailyProductivity {
  date: string;
  hours_worked: number;
  tasks_completed: number;
  productivity_score: number;
  focus_time: number;
  break_time: number;
}

export interface ProjectProductivity {
  project: Project;
  hours_worked: number;
  tasks_completed: number;
  completion_rate: number;
  efficiency_score: number;
}

export interface ProjectProgressReport {
  project: Project;
  total_tasks: number;
  completed_tasks: number;
  in_progress_tasks: number;
  pending_tasks: number;
  completion_percentage: number;
  budget_used: number;
  budget_remaining: number;
  budget_variance: number;
  schedule_variance: number;
  team_utilization: number;
  risk_level: 'low' | 'medium' | 'high';
  milestones: MilestoneProgress[];
  team_performance: TeamPerformance[];
}

export interface MilestoneProgress {
  id: number;
  name: string;
  planned_date: string;
  actual_date?: string;
  status: 'not_started' | 'in_progress' | 'completed' | 'delayed';
  completion_percentage: number;
  tasks: number;
  completed_tasks: number;
}

export interface TeamPerformance {
  user: User;
  hours_allocated: number;
  hours_worked: number;
  tasks_assigned: number;
  tasks_completed: number;
  efficiency_score: number;
  quality_score: number;
}

export interface TimeTrackingReport {
  period: string;
  total_hours: number;
  billable_hours: number;
  non_billable_hours: number;
  average_daily_hours: number;
  overtime_hours: number;
  utilization_rate: number;
  top_projects: ProjectTimeBreakdown[];
  top_users: UserTimeBreakdown[];
  daily_breakdown: DailyTimeBreakdown[];
  hourly_distribution: HourlyDistribution[];
}

export interface ProjectTimeBreakdown {
  project: Project;
  hours: number;
  percentage: number;
  billable_hours: number;
  non_billable_hours: number;
  team_members: number;
}

export interface UserTimeBreakdown {
  user: User;
  hours: number;
  percentage: number;
  billable_hours: number;
  non_billable_hours: number;
  projects_worked: number;
  efficiency_score: number;
}

export interface DailyTimeBreakdown {
  date: string;
  total_hours: number;
  billable_hours: number;
  non_billable_hours: number;
  users_active: number;
  projects_active: number;
}

export interface HourlyDistribution {
  hour: number;
  hours_logged: number;
  users_active: number;
  peak_hour: boolean;
}

export interface CustomReport {
  id: string;
  name: string;
  description?: string;
  query: string;
  parameters: Record<string, any>;
  visualization: ChartConfig;
  filters: ReportFilters;
  created_at: string;
  updated_at: string;
  created_by: User;
  is_public: boolean;
  last_run?: string;
  run_count: number;
}

export interface ReportTemplate {
  id: string;
  name: string;
  description?: string;
  type: string;
  category: string;
  config: ReportConfig;
  is_system: boolean;
  created_at: string;
  updated_at: string;
  created_by: User;
  usage_count: number;
}

export interface ReportDashboard {
  total_reports: number;
  scheduled_reports: number;
  recent_reports: ReportData[];
  popular_reports: ReportConfig[];
  system_health: SystemHealthMetrics;
  data_quality: DataQualityMetrics;
}

export interface SystemHealthMetrics {
  data_freshness: number;
  report_generation_time: number;
  error_rate: number;
  uptime: number;
  last_backup: string;
}

export interface DataQualityMetrics {
  completeness: number;
  accuracy: number;
  consistency: number;
  timeliness: number;
  validity: number;
}

export interface ReportState {
  reports: ReportConfig[];
  reportData: ReportData[];
  templates: ReportTemplate[];
  dashboard: ReportDashboard | null;
  currentReport: ReportConfig | null;
  loading: {
    reports: boolean;
    reportData: boolean;
    templates: boolean;
    dashboard: boolean;
    currentReport: boolean;
  };
  error: {
    reports?: string;
    reportData?: string;
    templates?: string;
    dashboard?: string;
    currentReport?: string;
  };
}

export interface ReportActions {
  // Report management
  createReport: (config: Omit<ReportConfig, 'id' | 'created_at' | 'updated_at'>) => Promise<ReportConfig>;
  updateReport: (id: string, config: Partial<ReportConfig>) => Promise<ReportConfig>;
  deleteReport: (id: string) => Promise<void>;
  duplicateReport: (id: string) => Promise<ReportConfig>;
  
  // Report execution
  generateReport: (reportId: string, parameters?: Partial<ReportParameters>) => Promise<ReportData>;
  scheduleReport: (reportId: string, schedule: ScheduleConfig) => Promise<void>;
  unscheduleReport: (reportId: string) => Promise<void>;
  
  // Report data
  fetchReports: () => Promise<void>;
  fetchReportData: (reportId: string) => Promise<void>;
  fetchReportHistory: (reportId: string) => Promise<void>;
  
  // Templates
  createTemplate: (template: Omit<ReportTemplate, 'id' | 'created_at' | 'updated_at'>) => Promise<ReportTemplate>;
  updateTemplate: (id: string, template: Partial<ReportTemplate>) => Promise<ReportTemplate>;
  deleteTemplate: (id: string) => Promise<void>;
  useTemplate: (templateId: string) => Promise<ReportConfig>;
  
  // Export
  exportReport: (reportId: string, format: 'pdf' | 'excel' | 'csv') => Promise<Blob>;
  exportReportData: (dataId: string, format: 'pdf' | 'excel' | 'csv') => Promise<Blob>;
  
  // Dashboard
  fetchDashboard: () => Promise<void>;
  refreshDashboard: () => Promise<void>;
  
  // Utility functions
  getReportById: (id: string) => ReportConfig | undefined;
  getReportDataById: (id: string) => ReportData | undefined;
  getTemplateById: (id: string) => ReportTemplate | undefined;
  getReportsByType: (type: string) => ReportConfig[];
  getPublicReports: () => ReportConfig[];
  getMyReports: () => ReportConfig[];
  getScheduledReports: () => ReportConfig[];
}
