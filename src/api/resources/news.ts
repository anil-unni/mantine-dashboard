import { client } from '../axios';
import { 
  NewsArticle, 
  CreateNewsArticle, 
  UpdateNewsArticle, 
  NewsMetrics,
  NewsCategory 
} from '../entities';

export async function getNewsArticles(params?: {
  page?: number;
  limit?: number;
  category?: NewsCategory;
  search?: string;
  sort?: string;
}) {
  const response = await client.get('news', { params });
  return response.data;
}

export async function getNewsArticle(id: string) {
  const response = await client.get(`news/${id}`);
  return NewsArticle.parse(response.data);
}

export async function createNewsArticle(data: CreateNewsArticle) {
  const response = await client.post('news', data);
  return NewsArticle.parse(response.data);
}

export async function updateNewsArticle(id: string, data: UpdateNewsArticle) {
  const response = await client.put(`news/${id}`, data);
  return NewsArticle.parse(response.data);
}

export async function deleteNewsArticle(id: string) {
  const response = await client.delete(`news/${id}`);
  return response.data;
}

export async function publishNewsArticle(id: string) {
  const response = await client.patch(`news/${id}/publish`);
  return NewsArticle.parse(response.data);
}

export async function unpublishNewsArticle(id: string) {
  const response = await client.patch(`news/${id}/unpublish`);
  return NewsArticle.parse(response.data);
}

export async function getNewsMetrics() {
  const response = await client.get('news/metrics');
  return NewsMetrics.parse(response.data);
}

export async function incrementNewsViews(id: string) {
  const response = await client.patch(`news/${id}/views`);
  return response.data;
}
