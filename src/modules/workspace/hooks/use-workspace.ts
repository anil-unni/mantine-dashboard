import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { workspaceService } from '../services/workspace-service';
import { WorkspaceDashboard, TimeLog, TimeLogFormData, TimeLogFilters, CalendarEvent, WorkspaceSettings, TimeTrackingStats } from '../types';

export function useWorkspace() {
  const queryClient = useQueryClient();

  // Dashboard data
  const {
    data: dashboard,
    isLoading: dashboardLoading,
    error: dashboardError,
    refetch: refetchDashboard,
  } = useQuery({
    queryKey: ['workspace', 'dashboard'],
    queryFn: workspaceService.getDashboard,
  });

  // Assigned tasks
  const {
    data: assignedTasks = [],
    isLoading: tasksLoading,
    error: tasksError,
    refetch: refetchTasks,
  } = useQuery({
    queryKey: ['workspace', 'tasks'],
    queryFn: workspaceService.getAssignedTasks,
  });

  // Time logs
  const {
    data: timelogs = [],
    isLoading: timelogsLoading,
    error: timelogsError,
    refetch: refetchTimelogs,
  } = useQuery({
    queryKey: ['workspace', 'timelogs'],
    queryFn: () => workspaceService.getTimelogs(),
  });

  // Calendar events
  const {
    data: calendarEvents = [],
    isLoading: calendarLoading,
    error: calendarError,
    refetch: refetchCalendar,
  } = useQuery({
    queryKey: ['workspace', 'calendar'],
    queryFn: () => workspaceService.getCalendarEvents(new Date().toISOString(), new Date().toISOString()),
  });

  // Settings
  const {
    data: settings,
    isLoading: settingsLoading,
    error: settingsError,
    refetch: refetchSettings,
  } = useQuery({
    queryKey: ['workspace', 'settings'],
    queryFn: workspaceService.getSettings,
  });

  // Statistics
  const {
    data: stats,
    isLoading: statsLoading,
    error: statsError,
    refetch: refetchStats,
  } = useQuery({
    queryKey: ['workspace', 'stats'],
    queryFn: () => workspaceService.getTimeTrackingStats('month'),
  });

  // Time log mutations
  const createTimelogMutation = useMutation({
    mutationFn: workspaceService.createTimelog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspace', 'timelogs'] });
      queryClient.invalidateQueries({ queryKey: ['workspace', 'stats'] });
      queryClient.invalidateQueries({ queryKey: ['workspace', 'dashboard'] });
    },
  });

  const updateTimelogMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<TimeLogFormData> }) =>
      workspaceService.updateTimelog(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspace', 'timelogs'] });
      queryClient.invalidateQueries({ queryKey: ['workspace', 'stats'] });
      queryClient.invalidateQueries({ queryKey: ['workspace', 'dashboard'] });
    },
  });

  const deleteTimelogMutation = useMutation({
    mutationFn: workspaceService.deleteTimelog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspace', 'timelogs'] });
      queryClient.invalidateQueries({ queryKey: ['workspace', 'stats'] });
      queryClient.invalidateQueries({ queryKey: ['workspace', 'dashboard'] });
    },
  });

  // Task mutations
  const updateTaskStatusMutation = useMutation({
    mutationFn: ({ taskId, status }: { taskId: number; status: string }) =>
      workspaceService.updateTaskStatus(taskId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspace', 'tasks'] });
      queryClient.invalidateQueries({ queryKey: ['workspace', 'dashboard'] });
    },
  });

  const updateTaskProgressMutation = useMutation({
    mutationFn: ({ taskId, progress }: { taskId: number; progress: number }) =>
      workspaceService.updateTaskProgress(taskId, progress),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspace', 'tasks'] });
      queryClient.invalidateQueries({ queryKey: ['workspace', 'dashboard'] });
    },
  });

  // Timer mutations
  const startTimerMutation = useMutation({
    mutationFn: workspaceService.startTimer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspace', 'timelogs'] });
      queryClient.invalidateQueries({ queryKey: ['workspace', 'dashboard'] });
    },
  });

  const stopTimerMutation = useMutation({
    mutationFn: workspaceService.stopTimer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspace', 'timelogs'] });
      queryClient.invalidateQueries({ queryKey: ['workspace', 'dashboard'] });
    },
  });

  const pauseTimerMutation = useMutation({
    mutationFn: workspaceService.pauseTimer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspace', 'timelogs'] });
      queryClient.invalidateQueries({ queryKey: ['workspace', 'dashboard'] });
    },
  });

  const resumeTimerMutation = useMutation({
    mutationFn: workspaceService.resumeTimer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspace', 'timelogs'] });
      queryClient.invalidateQueries({ queryKey: ['workspace', 'dashboard'] });
    },
  });

  // Settings mutation
  const updateSettingsMutation = useMutation({
    mutationFn: workspaceService.updateSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspace', 'settings'] });
    },
  });

  // Utility functions
  const getTodayTasks = () => {
    const today = new Date().toISOString().split('T')[0];
    return assignedTasks.filter(task => 
      task.due_date && task.due_date.startsWith(today)
    );
  };

  const getOverdueTasks = () => {
    const today = new Date();
    return assignedTasks.filter(task => 
      task.due_date && new Date(task.due_date) < today && task.status !== 'completed'
    );
  };

  const getUpcomingTasks = (days: number) => {
    const today = new Date();
    const futureDate = new Date(today.getTime() + (days * 24 * 60 * 60 * 1000));
    
    return assignedTasks.filter(task => 
      task.due_date && 
      new Date(task.due_date) >= today && 
      new Date(task.due_date) <= futureDate &&
      task.status !== 'completed'
    );
  };

  const getActiveTimers = () => {
    return timelogs.filter(log => 
      log.start_time && !log.end_time
    );
  };

  const getTotalHoursToday = () => {
    const today = new Date().toISOString().split('T')[0];
    return timelogs
      .filter(log => log.start_time.startsWith(today))
      .reduce((total, log) => {
        if (log.end_time) {
          const start = new Date(log.start_time);
          const end = new Date(log.end_time);
          return total + (end.getTime() - start.getTime()) / (1000 * 60 * 60);
        }
        return total;
      }, 0);
  };

  const getTotalHoursThisWeek = () => {
    const today = new Date();
    const weekStart = new Date(today.getTime() - (today.getDay() * 24 * 60 * 60 * 1000));
    
    return timelogs
      .filter(log => new Date(log.start_time) >= weekStart)
      .reduce((total, log) => {
        if (log.end_time) {
          const start = new Date(log.start_time);
          const end = new Date(log.end_time);
          return total + (end.getTime() - start.getTime()) / (1000 * 60 * 60);
        }
        return total;
      }, 0);
  };

  const getTotalHoursThisMonth = () => {
    const today = new Date();
    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    
    return timelogs
      .filter(log => new Date(log.start_time) >= monthStart)
      .reduce((total, log) => {
        if (log.end_time) {
          const start = new Date(log.start_time);
          const end = new Date(log.end_time);
          return total + (end.getTime() - start.getTime()) / (1000 * 60 * 60);
        }
        return total;
      }, 0);
  };

  return {
    // Data
    dashboard,
    assignedTasks,
    timelogs,
    calendarEvents,
    settings,
    stats,

    // Loading states
    loading: {
      dashboard: dashboardLoading,
      tasks: tasksLoading,
      timelogs: timelogsLoading,
      calendar: calendarLoading,
      settings: settingsLoading,
      stats: statsLoading,
    },

    // Error states
    error: {
      dashboard: dashboardError,
      tasks: tasksError,
      timelogs: timelogsError,
      calendar: calendarError,
      settings: settingsError,
      stats: statsError,
    },

    // Time log mutations
    createTimelog: createTimelogMutation.mutateAsync,
    updateTimelog: updateTimelogMutation.mutateAsync,
    deleteTimelog: deleteTimelogMutation.mutateAsync,
    isCreatingTimelog: createTimelogMutation.isPending,
    isUpdatingTimelog: updateTimelogMutation.isPending,
    isDeletingTimelog: deleteTimelogMutation.isPending,

    // Task mutations
    updateTaskStatus: updateTaskStatusMutation.mutateAsync,
    updateTaskProgress: updateTaskProgressMutation.mutateAsync,
    isUpdatingTaskStatus: updateTaskStatusMutation.isPending,
    isUpdatingTaskProgress: updateTaskProgressMutation.isPending,

    // Timer mutations
    startTimer: startTimerMutation.mutateAsync,
    stopTimer: stopTimerMutation.mutateAsync,
    pauseTimer: pauseTimerMutation.mutateAsync,
    resumeTimer: resumeTimerMutation.mutateAsync,
    isStartingTimer: startTimerMutation.isPending,
    isStoppingTimer: stopTimerMutation.isPending,
    isPausingTimer: pauseTimerMutation.isPending,
    isResumingTimer: resumeTimerMutation.isPending,

    // Settings mutations
    updateSettings: updateSettingsMutation.mutateAsync,
    isUpdatingSettings: updateSettingsMutation.isPending,

    // Refetch functions
    refetchDashboard,
    refetchTasks,
    refetchTimelogs,
    refetchCalendar,
    refetchSettings,
    refetchStats,

    // Utility functions
    getTodayTasks,
    getOverdueTasks,
    getUpcomingTasks,
    getActiveTimers,
    getTotalHoursToday,
    getTotalHoursThisWeek,
    getTotalHoursThisMonth,
  };
}
