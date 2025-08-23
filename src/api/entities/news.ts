import { z } from 'zod';

export const NewsCategory = z.enum(['technology', 'business', 'politics', 'sports', 'entertainment', 'health', 'science']);

export const NewsArticle = z.object({
  id: z.string().cuid2(),
  title: z.string().min(1),
  content: z.string().min(1),
  excerpt: z.string().min(1),
  author: z.string().min(1),
  category: NewsCategory,
  imageUrl: z.string().url().nullable(),
  publishedAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  isPublished: z.boolean(),
  tags: z.array(z.string()).default([]),
  readTime: z.number().int().positive(),
  views: z.number().int().min(0).default(0),
});

export const CreateNewsArticle = NewsArticle.omit({
  id: true,
  publishedAt: true,
  updatedAt: true,
  views: true,
});

export const UpdateNewsArticle = CreateNewsArticle.partial();

export const NewsMetrics = z.object({
  totalArticles: z.number().int().min(0),
  publishedArticles: z.number().int().min(0),
  draftArticles: z.number().int().min(0),
  totalViews: z.number().int().min(0),
  averageReadTime: z.number().positive(),
  topCategories: z.array(z.object({
    category: NewsCategory,
    count: z.number().int().min(0),
  })),
});

export type NewsArticle = z.infer<typeof NewsArticle>;
export type CreateNewsArticle = z.infer<typeof CreateNewsArticle>;
export type UpdateNewsArticle = z.infer<typeof UpdateNewsArticle>;
export type NewsCategory = z.infer<typeof NewsCategory>;
export type NewsMetrics = z.infer<typeof NewsMetrics>; 
