import { useState, useEffect, useCallback } from 'react';
import { taskService } from '../services/task-service';
import { Task, TimeLog } from '../../../types/api';
import { TaskFormData, TaskFilters, TaskStats, TaskWithDetails, TimeLogFormData, TimeLogFilters, TimeLogStats, TaskState, TaskActions } from '../types';

export function useTasks(projectId: number) {
  const [state, setState] = useState<TaskState>({
    tasks: [],
    currentTask: null,
    filters: {},
    timeLogs: [],
    timeLogFilters: {},
    loading: {
      tasks: false,
      currentTask: false,
      timeLogs: false,
      stats: false,
    },
    error: {},
    pagination: {
      page: 1,
      pageSize: 10,
      total: 0,
    },
  });

  // Task CRUD operations
  const createTask = useCallback(async (data: TaskFormData): Promise<Task> => {
    try {
      setState(prev => ({ ...prev, loading: { ...prev.loading, tasks: true } }));
      const task = await taskService.createTask(projectId, data);
      setState(prev => ({
        ...prev,
        tasks: [task, ...prev.tasks],
        loading: { ...prev.loading, tasks: false },
      }));
      return task;
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: { ...prev.error, tasks: error instanceof Error ? error.message : 'Failed to create task' },
        loading: { ...prev.loading, tasks: false },
      }));
      throw error;
    }
  }, [projectId]);

  const updateTask = useCallback(async (taskId: number, data: Partial<TaskFormData>): Promise<Task> => {
    try {
      setState(prev => ({ ...prev, loading: { ...prev.loading, tasks: true } }));
      const task = await taskService.updateTask(projectId, taskId, data);
      setState(prev => ({
        ...prev,
        tasks: prev.tasks.map(t => t.id === taskId ? task : t),
        currentTask: prev.currentTask?.id === taskId ? { ...prev.currentTask, ...task } : prev.currentTask,
        loading: { ...prev.loading, tasks: false },
      }));
      return task;
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: { ...prev.error, tasks: error instanceof Error ? error.message : 'Failed to update task' },
        loading: { ...prev.loading, tasks: false },
      }));
      throw error;
    }
  }, [projectId]);

  const deleteTask = useCallback(async (taskId: number): Promise<void> => {
    try {
      setState(prev => ({ ...prev, loading: { ...prev.loading, tasks: true } }));
      await taskService.deleteTask(projectId, taskId);
      setState(prev => ({
        ...prev,
        tasks: prev.tasks.filter(t => t.id !== taskId),
        currentTask: prev.currentTask?.id === taskId ? null : prev.currentTask,
        loading: { ...prev.loading, tasks: false },
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: { ...prev.error, tasks: error instanceof Error ? error.message : 'Failed to delete task' },
        loading: { ...prev.loading, tasks: false },
      }));
      throw error;
    }
  }, [projectId]);

  const getTask = useCallback(async (taskId: number): Promise<TaskWithDetails> => {
    try {
      setState(prev => ({ ...prev, loading: { ...prev.loading, currentTask: true } }));
      const task = await taskService.getTaskWithDetails(projectId, taskId);
      setState(prev => ({
        ...prev,
        currentTask: task,
        loading: { ...prev.loading, currentTask: false },
      }));
      return task;
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: { ...prev.error, currentTask: error instanceof Error ? error.message : 'Failed to fetch task' },
        loading: { ...prev.loading, currentTask: false },
      }));
      throw error;
    }
  }, [projectId]);

  // Task management operations
  const assignTask = useCallback(async (taskId: number, userId: number): Promise<void> => {
    await taskService.assignTask(projectId, taskId, userId);
    await fetchTasks();
  }, [projectId]);

  const updateTaskStatus = useCallback(async (taskId: number, status: string): Promise<void> => {
    await taskService.updateTaskStatus(projectId, taskId, status);
    await fetchTasks();
  }, [projectId]);

  const updateTaskProgress = useCallback(async (taskId: number, progress: number): Promise<void> => {
    await taskService.updateTaskProgress(projectId, taskId, progress);
    await fetchTasks();
  }, [projectId]);

  // Task data fetching
  const fetchTasks = useCallback(async (filters?: TaskFilters): Promise<void> => {
    try {
      setState(prev => ({ ...prev, loading: { ...prev.loading, tasks: true } }));
      const response = await taskService.getTasks(projectId, filters || state.filters);
      setState(prev => ({
        ...prev,
        tasks: response.results,
        pagination: {
          ...prev.pagination,
          total: response.count,
        },
        loading: { ...prev.loading, tasks: false },
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: { ...prev.error, tasks: error instanceof Error ? error.message : 'Failed to fetch tasks' },
        loading: { ...prev.loading, tasks: false },
      }));
    }
  }, [projectId, state.filters]);

  const fetchTaskStats = useCallback(async (): Promise<TaskStats> => {
    try {
      setState(prev => ({ ...prev, loading: { ...prev.loading, stats: true } }));
      const stats = await taskService.getTaskStats(projectId);
      setState(prev => ({ ...prev, loading: { ...prev.loading, stats: false } }));
      return stats;
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: { ...prev.error, stats: error instanceof Error ? error.message : 'Failed to fetch task stats' },
        loading: { ...prev.loading, stats: false },
      }));
      throw error;
    }
  }, [projectId]);

  // Time logging operations
  const createTimeLog = useCallback(async (taskId: number, data: TimeLogFormData): Promise<TimeLog> => {
    try {
      setState(prev => ({ ...prev, loading: { ...prev.loading, timeLogs: true } }));
      const timeLog = await taskService.createTimeLog(projectId, taskId, data);
      setState(prev => ({
        ...prev,
        timeLogs: [timeLog, ...prev.timeLogs],
        loading: { ...prev.loading, timeLogs: false },
      }));
      return timeLog;
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: { ...prev.error, timeLogs: error instanceof Error ? error.message : 'Failed to create time log' },
        loading: { ...prev.loading, timeLogs: false },
      }));
      throw error;
    }
  }, [projectId]);

  const updateTimeLog = useCallback(async (taskId: number, timeLogId: number, data: Partial<TimeLogFormData>): Promise<TimeLog> => {
    try {
      setState(prev => ({ ...prev, loading: { ...prev.loading, timeLogs: true } }));
      const timeLog = await taskService.updateTimeLog(projectId, taskId, timeLogId, data);
      setState(prev => ({
        ...prev,
        timeLogs: prev.timeLogs.map(tl => tl.id === timeLogId ? timeLog : tl),
        loading: { ...prev.loading, timeLogs: false },
      }));
      return timeLog;
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: { ...prev.error, timeLogs: error instanceof Error ? error.message : 'Failed to update time log' },
        loading: { ...prev.loading, timeLogs: false },
      }));
      throw error;
    }
  }, [projectId]);

  const deleteTimeLog = useCallback(async (taskId: number, timeLogId: number): Promise<void> => {
    try {
      setState(prev => ({ ...prev, loading: { ...prev.loading, timeLogs: true } }));
      await taskService.deleteTimeLog(projectId, taskId, timeLogId);
      setState(prev => ({
        ...prev,
        timeLogs: prev.timeLogs.filter(tl => tl.id !== timeLogId),
        loading: { ...prev.loading, timeLogs: false },
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: { ...prev.error, timeLogs: error instanceof Error ? error.message : 'Failed to delete time log' },
        loading: { ...prev.loading, timeLogs: false },
      }));
      throw error;
    }
  }, [projectId]);

  const fetchTimeLogs = useCallback(async (taskId: number, filters?: TimeLogFilters): Promise<void> => {
    try {
      setState(prev => ({ ...prev, loading: { ...prev.loading, timeLogs: true } }));
      const response = await taskService.getTimeLogs(projectId, taskId, filters || state.timeLogFilters);
      setState(prev => ({
        ...prev,
        timeLogs: response.results,
        loading: { ...prev.loading, timeLogs: false },
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: { ...prev.error, timeLogs: error instanceof Error ? error.message : 'Failed to fetch time logs' },
        loading: { ...prev.loading, timeLogs: false },
      }));
    }
  }, [projectId, state.timeLogFilters]);

  const fetchTimeLogStats = useCallback(async (): Promise<TimeLogStats> => {
    try {
      setState(prev => ({ ...prev, loading: { ...prev.loading, stats: true } }));
      const stats = await taskService.getTimeLogStats(projectId);
      setState(prev => ({ ...prev, loading: { ...prev.loading, stats: false } }));
      return stats;
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: { ...prev.error, stats: error instanceof Error ? error.message : 'Failed to fetch time log stats' },
        loading: { ...prev.loading, stats: false },
      }));
      throw error;
    }
  }, [projectId]);

  // Filter management
  const setTaskFilters = useCallback((filters: TaskFilters) => {
    setState(prev => ({ ...prev, filters }));
  }, []);

  const setTimeLogFilters = useCallback((filters: TimeLogFilters) => {
    setState(prev => ({ ...prev, timeLogFilters: filters }));
  }, []);

  // Pagination
  const setPage = useCallback((page: number) => {
    setState(prev => ({ ...prev, pagination: { ...prev.pagination, page } }));
  }, []);

  const setPageSize = useCallback((pageSize: number) => {
    setState(prev => ({ ...prev, pagination: { ...prev.pagination, pageSize, page: 1 } }));
  }, []);

  // Load tasks on mount and when filters change
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const actions: TaskActions = {
    createTask,
    updateTask,
    deleteTask,
    getTask,
    assignTask,
    updateTaskStatus,
    updateTaskProgress,
    fetchTasks,
    fetchTaskStats,
    createTimeLog,
    updateTimeLog,
    deleteTimeLog,
    fetchTimeLogs,
    fetchTimeLogStats,
    // Additional methods would be implemented here
    addTaskDependency: async () => {},
    removeTaskDependency: async () => {},
    fetchTaskTimeline: async () => [],
    addTaskComment: async () => ({} as any),
    updateTaskComment: async () => ({} as any),
    deleteTaskComment: async () => {},
    uploadTaskAttachment: async () => ({} as any),
    deleteTaskAttachment: async () => {},
    createTaskFromTemplate: async () => ({} as any),
    getTaskTemplates: async () => [],
    getTaskMetrics: async () => ({} as any),
    getTasksByStatus: () => [],
    getTasksByAssignee: () => [],
    getTasksByProject: () => [],
    getOverdueTasks: () => [],
    getDueTodayTasks: () => [],
    getDueThisWeekTasks: () => [],
  };

  return {
    ...state,
    actions,
    setTaskFilters,
    setTimeLogFilters,
    setPage,
    setPageSize,
  };
}
