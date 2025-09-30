import { useState, useCallback } from 'react';
import { workspaceService } from '../services/workspace-service';
import { TimeLogFormData } from '../types';

export function useWorkspace() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createTimeLog = useCallback(async (data: TimeLogFormData) => {
    try {
      setLoading(true);
      setError(null);
      const timeLog = await workspaceService.createTimelog(data);
      return timeLog;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create time log';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const actions = {
    createTimeLog,
  };

  return {
    loading,
    error,
    actions,
  };
}