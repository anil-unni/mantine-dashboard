import { client as api } from '../axios';
import type {
  News,
  NewsCreateRequest,
  NewsUpdateRequest,
  NewsStatusUpdateRequest,
  NewsPageUpdateRequest,
  NewsListResponse,
  NewsResponse,
  NewsPageResponse,
  NewsFilterParams,
} from '../entities/news';

// Dashboard API endpoints
export const newsApi = {
  // Get all news
  getAll: (): Promise<NewsListResponse> => api.get('/api/dashboard/news'),

  // Get filtered news list
  getFiltered: (params: NewsFilterParams = {}): Promise<NewsListResponse> => {
    return api.get('/api/dashboard/news/filtered', { params });
  },

  // Get news by ID
  getById: (id: string): Promise<NewsResponse> => 
    api.get(`/api/dashboard/news/edit/${id}`),

  // Create news
  create: (data: NewsCreateRequest): Promise<NewsResponse> => {
    const formData = new FormData();
    
    // Add text fields
    Object.keys(data).forEach(key => {
      const value = (data as any)[key];
      if (value !== undefined && value !== null) {
        if (key === 'sources' || key === 'tags' || key === 'seodetails') {
          // Convert objects/arrays to JSON strings
          formData.append(key, JSON.stringify(value));
        } else if (key === 'images' && Array.isArray(value)) {
          // Handle images array - add each file separately
          value.forEach((file, index) => {
            if (file instanceof File) {
              formData.append('images', file);
            } else if (typeof file === 'string') {
              formData.append(`images[${index}]`, file);
            }
          });
        } else if (key === 'banner_image' || key === 'mobile_banner_image' || key === 'thumbnail') {
          // Handle single file fields
          if (value instanceof File) {
            formData.append(key, value);
          } else if (typeof value === 'string') {
            formData.append(key, value);
          }
        } else {
          // Regular text fields
          formData.append(key, String(value));
        }
      }
    });
    
    return api.post('/api/dashboard/news/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // Update news
  update: (id: string, data: NewsUpdateRequest): Promise<NewsResponse> => {
    const formData = new FormData();
    
    // Add text fields
    Object.keys(data).forEach(key => {
      const value = (data as any)[key];
      if (value !== undefined && value !== null) {
        if (key === 'sources' || key === 'tags' || key === 'seodetails') {
          // Convert objects/arrays to JSON strings
          formData.append(key, JSON.stringify(value));
        } else if (key === 'images' && Array.isArray(value)) {
          // Handle images array - add each file separately
          value.forEach((file, index) => {
            if (file instanceof File) {
              formData.append('images', file);
            } else if (typeof file === 'string') {
              formData.append(`images[${index}]`, file);
            }
          });
        } else if (key === 'banner_image' || key === 'mobile_banner_image' || key === 'thumbnail') {
          // Handle single file fields
          if (value instanceof File) {
            formData.append(key, value);
          } else if (typeof value === 'string') {
            formData.append(key, value);
          }
        } else {
          // Regular text fields
          formData.append(key, String(value));
        }
      }
    });
    
    return api.put(`/api/dashboard/news/update/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // Delete news
  delete: (id: string): Promise<NewsResponse> => 
    api.delete(`/api/dashboard/news/delete/${id}`),

  // Update news status
  updateStatus: (id: string, data: NewsStatusUpdateRequest): Promise<NewsResponse> => 
    api.put(`/api/dashboard/news/status/${id}`, data),
};


// News page API endpoints
export const newsPageApi = {
  // Get news page configuration
  get: (): Promise<NewsPageResponse> => 
    api.get('/api/web/news-page'),

  // Update news page configuration (Dashboard)
  update: (data: NewsPageUpdateRequest): Promise<NewsPageResponse> => {
    const formData = new FormData();
    
    // Add text fields
    Object.keys(data).forEach(key => {
      const value = (data as any)[key];
      if (value !== undefined && value !== null) {
        if (key === 'seodetails') {
          // Convert objects to JSON strings
          formData.append(key, JSON.stringify(value));
        } else if (key === 'image' || key === 'mobileImg') {
          // Handle file fields
          if (value instanceof File) {
            formData.append(key, value);
          } else if (typeof value === 'string') {
            formData.append(key, value);
          }
        } else {
          // Regular text fields
          formData.append(key, String(value));
        }
      }
    });
    
    return api.post('/api/dashboard/news-page', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};
