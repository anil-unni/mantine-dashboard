import { useState, useEffect, useCallback } from 'react';
import { analyticsService } from '../services/analytics-service';
import { DashboardCard, ModuleEnum, CardTypeEnum } from '../../../types/api';
import { AnalyticsState, AnalyticsActions, DashboardCardFormData, DashboardCardFilters, AnalyticsDashboard, AnalyticsMetrics, ChartData } from '../types';

export function useAnalytics() {
  const [state, setState] = useState<AnalyticsState>({
    dashboard: null,
    cards: [],
    metrics: null,
    charts: [],
    loading: {
      dashboard: false,
      cards: false,
      metrics: false,
      charts: false,
    },
    error: {},
  });

  // Dashboard operations
  const fetchDashboard = useCallback(async (): Promise<void> => {
    try {
      setState(prev => ({ ...prev, loading: { ...prev.loading, dashboard: true } }));
      const dashboard = await analyticsService.getDashboard();
      setState(prev => ({
        ...prev,
        dashboard,
        loading: { ...prev.loading, dashboard: false },
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: { ...prev.error, dashboard: error instanceof Error ? error.message : 'Failed to fetch dashboard' },
        loading: { ...prev.loading, dashboard: false },
      }));
    }
  }, []);

  const refreshDashboard = useCallback(async (): Promise<void> => {
    await fetchDashboard();
  }, [fetchDashboard]);

  // Cards operations
  const fetchCards = useCallback(async (filters?: DashboardCardFilters): Promise<void> => {
    try {
      setState(prev => ({ ...prev, loading: { ...prev.loading, cards: true } }));
      const response = await analyticsService.getCards(filters);
      setState(prev => ({
        ...prev,
        cards: response.results,
        loading: { ...prev.loading, cards: false },
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: { ...prev.error, cards: error instanceof Error ? error.message : 'Failed to fetch cards' },
        loading: { ...prev.loading, cards: false },
      }));
    }
  }, []);

  const createCard = useCallback(async (data: DashboardCardFormData): Promise<DashboardCard> => {
    try {
      setState(prev => ({ ...prev, loading: { ...prev.loading, cards: true } }));
      const card = await analyticsService.createCard(data);
      setState(prev => ({
        ...prev,
        cards: [card, ...prev.cards],
        loading: { ...prev.loading, cards: false },
      }));
      return card;
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: { ...prev.error, cards: error instanceof Error ? error.message : 'Failed to create card' },
        loading: { ...prev.loading, cards: false },
      }));
      throw error;
    }
  }, []);

  const updateCard = useCallback(async (id: number, data: Partial<DashboardCardFormData>): Promise<DashboardCard> => {
    try {
      setState(prev => ({ ...prev, loading: { ...prev.loading, cards: true } }));
      const card = await analyticsService.updateCard(id, data);
      setState(prev => ({
        ...prev,
        cards: prev.cards.map(c => c.id === id ? card : c),
        loading: { ...prev.loading, cards: false },
      }));
      return card;
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: { ...prev.error, cards: error instanceof Error ? error.message : 'Failed to update card' },
        loading: { ...prev.loading, cards: false },
      }));
      throw error;
    }
  }, []);

  const deleteCard = useCallback(async (id: number): Promise<void> => {
    try {
      setState(prev => ({ ...prev, loading: { ...prev.loading, cards: true } }));
      await analyticsService.deleteCard(id);
      setState(prev => ({
        ...prev,
        cards: prev.cards.filter(c => c.id !== id),
        loading: { ...prev.loading, cards: false },
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: { ...prev.error, cards: error instanceof Error ? error.message : 'Failed to delete card' },
        loading: { ...prev.loading, cards: false },
      }));
      throw error;
    }
  }, []);

  const reorderCards = useCallback(async (cardIds: number[]): Promise<void> => {
    try {
      setState(prev => ({ ...prev, loading: { ...prev.loading, cards: true } }));
      await analyticsService.reorderCards(cardIds);
      setState(prev => ({
        ...prev,
        loading: { ...prev.loading, cards: false },
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: { ...prev.error, cards: error instanceof Error ? error.message : 'Failed to reorder cards' },
        loading: { ...prev.loading, cards: false },
      }));
      throw error;
    }
  }, []);

  // Metrics operations
  const fetchMetrics = useCallback(async (): Promise<void> => {
    try {
      setState(prev => ({ ...prev, loading: { ...prev.loading, metrics: true } }));
      const metrics = await analyticsService.getMetrics();
      setState(prev => ({
        ...prev,
        metrics,
        loading: { ...prev.loading, metrics: false },
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: { ...prev.error, metrics: error instanceof Error ? error.message : 'Failed to fetch metrics' },
        loading: { ...prev.loading, metrics: false },
      }));
    }
  }, []);

  const refreshMetrics = useCallback(async (): Promise<void> => {
    await fetchMetrics();
  }, [fetchMetrics]);

  // Charts operations
  const fetchCharts = useCallback(async (): Promise<void> => {
    try {
      setState(prev => ({ ...prev, loading: { ...prev.loading, charts: true } }));
      const charts = await analyticsService.getCharts();
      setState(prev => ({
        ...prev,
        charts,
        loading: { ...prev.loading, charts: false },
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: { ...prev.error, charts: error instanceof Error ? error.message : 'Failed to fetch charts' },
        loading: { ...prev.loading, charts: false },
      }));
    }
  }, []);

  const refreshCharts = useCallback(async (): Promise<void> => {
    await fetchCharts();
  }, [fetchCharts]);

  // Utility functions
  const getCardsByModule = useCallback((module: ModuleEnum): DashboardCard[] => {
    return state.cards.filter(card => card.module === module);
  }, [state.cards]);

  const getCardsByType = useCallback((type: CardTypeEnum): DashboardCard[] => {
    return state.cards.filter(card => card.card_type === type);
  }, [state.cards]);

  const getActiveCards = useCallback((): DashboardCard[] => {
    return state.cards.filter(card => card.is_active);
  }, [state.cards]);

  // Load data on mount
  useEffect(() => {
    fetchDashboard();
    fetchCards();
    fetchMetrics();
    fetchCharts();
  }, [fetchDashboard, fetchCards, fetchMetrics, fetchCharts]);

  const actions: AnalyticsActions = {
    fetchDashboard,
    refreshDashboard,
    fetchCards,
    createCard,
    updateCard,
    deleteCard,
    reorderCards,
    fetchMetrics,
    refreshMetrics,
    fetchCharts,
    refreshCharts,
    getCardsByModule,
    getCardsByType,
    getActiveCards,
  };

  return {
    ...state,
    actions,
  };
}
