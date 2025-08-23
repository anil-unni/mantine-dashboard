import { z } from 'zod';
import { 
  NewsArticle, 
  NewsMetrics, 
  CreateNewsArticle, 
  UpdateNewsArticle,
  NewsCategory 
} from '@/api/entities';
import { 
  createGetQueryHook, 
  createPaginationQueryHook, 
  createPostMutationHook,
  createPutMutationHook,
  createDeleteMutationHook,
  SortableQueryParams 
} from '@/api/helpers';

const QUERY_KEY = 'news';
const BASE_ENDPOINT = 'news';

// Get paginated news articles
export const useGetNewsArticles = createPaginationQueryHook<
  typeof NewsArticle,
  SortableQueryParams & { 
    category?: NewsCategory; 
    search?: string;
  }
>({
  endpoint: BASE_ENDPOINT,
  dataSchema: NewsArticle,
  rQueryParams: { queryKey: [QUERY_KEY] },
});

// Get single news article
export const useGetNewsArticle = createGetQueryHook<
  typeof NewsArticle,
  { id: string }
>({
  endpoint: `${BASE_ENDPOINT}/:id`,
  responseSchema: NewsArticle,
  rQueryParams: { queryKey: [QUERY_KEY, { resource: 'article' }] },
});

// Get news metrics
export const useGetNewsMetrics = createGetQueryHook({
  endpoint: `${BASE_ENDPOINT}/metrics`,
  responseSchema: NewsMetrics,
  rQueryParams: { queryKey: [QUERY_KEY, { resource: 'metrics' }] },
});

// Create news article
export const useCreateNewsArticle = createPostMutationHook<
  typeof CreateNewsArticle,
  typeof NewsArticle
>({
  endpoint: BASE_ENDPOINT,
  bodySchema: CreateNewsArticle,
  responseSchema: NewsArticle,
  rMutationParams: {
    onSuccess: (_, __, ___, queryClient) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, { resource: 'metrics' }] });
    },
  },
});

// Update news article
export const useUpdateNewsArticle = createPutMutationHook<
  typeof UpdateNewsArticle,
  typeof NewsArticle,
  { id: string }
>({
  endpoint: `${BASE_ENDPOINT}/:id`,
  bodySchema: UpdateNewsArticle,
  responseSchema: NewsArticle,
  rMutationParams: {
    onSuccess: (_, __, ___, queryClient) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'article'] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, { resource: 'metrics' }] });
    },
  },
});

// Delete news article
export const useDeleteNewsArticle = createDeleteMutationHook<
  typeof NewsArticle,
  { id: string }
>({
  endpoint: `${BASE_ENDPOINT}/:id`,
  rMutationParams: {
    onSuccess: (_, __, ___, queryClient) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, { resource: 'metrics' }] });
    },
  },
});

// Publish news article
export const usePublishNewsArticle = createPostMutationHook<
  z.ZodVoid,
  typeof NewsArticle,
  { id: string }
>({
  endpoint: `${BASE_ENDPOINT}/:id/publish`,
  bodySchema: z.void(),
  responseSchema: NewsArticle,
  rMutationParams: {
    onSuccess: (_, __, ___, queryClient) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'article'] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, { resource: 'metrics' }] });
    },
  },
});

// Unpublish news article
export const useUnpublishNewsArticle = createPostMutationHook<
  z.ZodVoid,
  typeof NewsArticle,
  { id: string }
>({
  endpoint: `${BASE_ENDPOINT}/:id/unpublish`,
  bodySchema: z.void(),
  responseSchema: NewsArticle,
  rMutationParams: {
    onSuccess: (_, __, ___, queryClient) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'article'] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, { resource: 'metrics' }] });
    },
  },
});

// Increment views
export const useIncrementNewsViews = createPostMutationHook<
  z.ZodVoid,
  z.ZodVoid,
  { id: string }
>({
  endpoint: `${BASE_ENDPOINT}/:id/views`,
  bodySchema: z.void(),
  responseSchema: z.void(),
  rMutationParams: {
    onSuccess: (_, __, ___, queryClient) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'article'] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, { resource: 'metrics' }] });
    },
  },
});
