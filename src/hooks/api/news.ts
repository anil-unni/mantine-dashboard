import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import { newsApi, newsPageApi } from '@/api/resources/news';
import type {
  NewsCreateRequest,
  NewsUpdateRequest,
  NewsStatusUpdateRequest,
  NewsPageUpdateRequest,
  NewsFilterParams,
} from '@/api/entities/news';

// Query keys
export const newsKeys = {
  all: ['news'] as const,
  lists: () => [...newsKeys.all, 'list'] as const,
  list: (params: NewsFilterParams) => [...newsKeys.lists(), params] as const,
  details: () => [...newsKeys.all, 'detail'] as const,
  detail: (id: string) => [...newsKeys.details(), id] as const,
  page: () => [...newsKeys.all, 'page'] as const,
};

// Dashboard hooks
export function useNewsList(params: NewsFilterParams = {}) {
  return useQuery({
    queryKey: newsKeys.list(params),
    queryFn: () => newsApi.getFiltered(params),
    select: (response: any) => response.data?.result,
  });
}

export function useNewsDetail(id: string) {
  return useQuery({
    queryKey: newsKeys.detail(id),
    queryFn: () => newsApi.getById(id),
    select: (response: any) => response.data?.result,
    enabled: !!id,
  });
}

export function useCreateNews() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: NewsCreateRequest) => newsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: newsKeys.lists() });
      notifications.show({
        title: 'Success',
        message: 'News created successfully',
        color: 'green',
      });
    },
    onError: (error: unknown) => {
      const errorMessage = error && typeof error === 'object' && 'response' in error 
        ? (error as any).response?.data?.error_message || 'Failed to create news'
        : 'Failed to create news';
      notifications.show({
        title: 'Error',
        message: errorMessage,
        color: 'red',
      });
    },
  });
}

export function useUpdateNews() {
  const queryClient = useQueryClient();

  return useMutation<any, Error, { id: string; data: NewsUpdateRequest }>({
    mutationFn: ({ id, data }: { id: string; data: NewsUpdateRequest }) => 
      newsApi.update(id, data),
    onSuccess: (_: any, { id }: { id: string }) => {
      queryClient.invalidateQueries({ queryKey: newsKeys.lists() });
      queryClient.invalidateQueries({ queryKey: newsKeys.detail(id) });
      notifications.show({
        title: 'Success',
        message: 'News updated successfully',
        color: 'green',
      });
    },
    onError: (error: unknown) => {
      const errorMessage = error && typeof error === 'object' && 'response' in error 
        ? (error as any).response?.data?.error_message || 'Failed to update news'
        : 'Failed to update news';
      notifications.show({
        title: 'Error',
        message: errorMessage,
        color: 'red',
      });
    },
  });
}

export function useDeleteNews() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => newsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: newsKeys.lists() });
      notifications.show({
        title: 'Success',
        message: 'News deleted successfully',
        color: 'green',
      });
    },
    onError: (error: unknown) => {
      const errorMessage = error && typeof error === 'object' && 'response' in error 
        ? (error as any).response?.data?.error_message || 'Failed to delete news'
        : 'Failed to delete news';
      notifications.show({
        title: 'Error',
        message: errorMessage,
        color: 'red',
      });
    },
  });
}

export function useUpdateNewsStatus() {
  const queryClient = useQueryClient();

  return useMutation<any, Error, { id: string; data: NewsStatusUpdateRequest }>({
    mutationFn: ({ id, data }: { id: string; data: NewsStatusUpdateRequest }) => 
      newsApi.updateStatus(id, data),
    onSuccess: (_: any, { id }: { id: string }) => {
      queryClient.invalidateQueries({ queryKey: newsKeys.lists() });
      queryClient.invalidateQueries({ queryKey: newsKeys.detail(id) });
      notifications.show({
        title: 'Success',
        message: 'News status updated successfully',
        color: 'green',
      });
    },
    onError: (error: unknown) => {
      const errorMessage = error && typeof error === 'object' && 'response' in error 
        ? (error as any).response?.data?.error_message || 'Failed to update news status'
        : 'Failed to update news status';
      notifications.show({
        title: 'Error',
        message: errorMessage,
        color: 'red',
      });
    },
  });
}


// News page hooks
export function useNewsPage() {
  return useQuery({
    queryKey: newsKeys.page(),
    queryFn: () => newsPageApi.get(),
    select: (response: any) => response.data?.result,
  });
}

export function useUpdateNewsPage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: NewsPageUpdateRequest) => newsPageApi.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: newsKeys.page() });
      notifications.show({
        title: 'Success',
        message: 'News page updated successfully',
        color: 'green',
      });
    },
    onError: (error: unknown) => {
      const errorMessage = error && typeof error === 'object' && 'response' in error 
        ? (error as any).response?.data?.error_message || 'Failed to update news page'
        : 'Failed to update news page';
      notifications.show({
        title: 'Error',
        message: errorMessage,
        color: 'red',
      });
    },
  });
}
