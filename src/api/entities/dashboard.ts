import { z } from 'zod';

// Base API Response Schema
export const BaseApiResponse = z.object({
  APIType: z.string(),
  APIVersion: z.number(),
  success: z.boolean(),
  errorCode: z.number(),
  message: z.string(),
});

// Summary Cards Schema
export const SummaryCard = z.object({
  value: z.number(),
  growth: z.number(),
});

export const SummaryCards = z.object({
  totalUsers: SummaryCard,
  totalOrders: SummaryCard,
  totalPackages: SummaryCard,
  totalQueries: SummaryCard,
  totalRevenue: SummaryCard,
  totalContactForms: SummaryCard,
  totalEnquiries: SummaryCard,
  totalNews: SummaryCard,
  totalBlogs: SummaryCard,
  totalTestimonials: SummaryCard,
});

// Charts Schema
export const ChartDataPoint = z.object({
  status: z.string().optional(),
  month: z.string().optional(),
  date: z.string().optional(),
  type: z.string().optional(),
  range: z.union([z.string(), z.number()]).optional(),
  count: z.number(),
  revenue: z.number().optional(),
});

export const Charts = z.object({
  ordersByStatus: z.array(ChartDataPoint),
  ordersByMonth: z.array(ChartDataPoint),
  usersByMonth: z.array(ChartDataPoint),
  queriesByMonth: z.array(ChartDataPoint),
  packagesByType: z.array(ChartDataPoint),
  revenueByMonth: z.array(ChartDataPoint),
  userGrowthDaily: z.array(ChartDataPoint),
  orderValueDistribution: z.array(ChartDataPoint),
  paymentStatusDistribution: z.array(ChartDataPoint),
});

// Table Data Schemas
export const RecentUser = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().optional(),
  phone: z.string(),
  createdAt: z.string().datetime(),
});

export const RecentOrder = z.object({
  id: z.string(),
  orderNo: z.string(),
  customer: z.string(),
  package: z.string(),
  amount: z.string(),
  paymentStatus: z.string(),
  bookingStatus: z.string(),
  createdAt: z.string().datetime(),
});

export const RecentQuery = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().optional(),
  phone: z.string(),
  message: z.string(),
  createdAt: z.string().datetime(),
});

export const RecentContactForm = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().optional(),
  phone: z.string(),
  message: z.string(),
  status: z.number(),
  createdAt: z.string().datetime(),
});

export const RecentNews = z.object({
  id: z.string(),
  title: z.string(),
  category: z.string(),
  featured: z.boolean(),
  breaking: z.boolean(),
  createdAt: z.string().datetime(),
});

export const RecentBlog = z.object({
  id: z.string(),
  title: z.string(),
  priority: z.number(),
  createdAt: z.string().datetime(),
});

export const Tables = z.object({
  recentUsers: z.array(RecentUser),
  recentOrders: z.array(RecentOrder),
  recentQueries: z.array(RecentQuery),
  recentContactForms: z.array(RecentContactForm),
  recentNews: z.array(RecentNews),
  recentBlogs: z.array(RecentBlog),
});

// Analytics Schema
export const TopPackage = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  orderCount: z.number(),
});

export const ContentStats = z.object({
  featuredNews: z.number(),
  breakingNews: z.number(),
  totalBlogs: z.number(),
  totalTestimonials: z.number(),
});

export const MonthlyStats = z.object({
  users: z.number(),
  orders: z.number(),
  queries: z.number(),
  contactForms: z.number(),
  revenue: z.number(),
});

export const Analytics = z.object({
  topPackages: z.array(TopPackage),
  contentStats: ContentStats,
  monthlyStats: MonthlyStats,
});

// Metadata Schema
export const DataRange = z.object({
  start: z.string().datetime(),
  end: z.string().datetime(),
});

export const Metadata = z.object({
  lastUpdated: z.string().datetime(),
  dataRange: DataRange,
  cacheExpiry: z.number(),
});

// Main Dashboard Response Schema
export const DashboardOverview = z.object({
  summaryCards: SummaryCards,
  charts: Charts,
  tables: Tables,
  analytics: Analytics,
  metadata: Metadata,
});

export const DashboardOverviewResponse = BaseApiResponse.extend({
  result: DashboardOverview,
});

// Date Range Query Parameters
export const DateRangeParams = z.object({
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

// Real-time Metrics Schema
export const RealTimeMetrics = z.object({
  last24Hours: z.object({
    users: z.number(),
    orders: z.number(),
    queries: z.number(),
  }),
  lastHour: z.object({
    users: z.number(),
    orders: z.number(),
    queries: z.number(),
  }),
  timestamp: z.string().datetime(),
});

export const RealTimeMetricsResponse = BaseApiResponse.extend({
  result: RealTimeMetrics,
});

// Type exports
export type BaseApiResponse = z.infer<typeof BaseApiResponse>;
export type SummaryCard = z.infer<typeof SummaryCard>;
export type SummaryCards = z.infer<typeof SummaryCards>;
export type ChartDataPoint = z.infer<typeof ChartDataPoint>;
export type Charts = z.infer<typeof Charts>;
export type RecentUser = z.infer<typeof RecentUser>;
export type RecentOrder = z.infer<typeof RecentOrder>;
export type RecentQuery = z.infer<typeof RecentQuery>;
export type RecentContactForm = z.infer<typeof RecentContactForm>;
export type RecentNews = z.infer<typeof RecentNews>;
export type RecentBlog = z.infer<typeof RecentBlog>;
export type Tables = z.infer<typeof Tables>;
export type TopPackage = z.infer<typeof TopPackage>;
export type ContentStats = z.infer<typeof ContentStats>;
export type MonthlyStats = z.infer<typeof MonthlyStats>;
export type Analytics = z.infer<typeof Analytics>;
export type DataRange = z.infer<typeof DataRange>;
export type Metadata = z.infer<typeof Metadata>;
export type DashboardOverview = z.infer<typeof DashboardOverview>;
export type DashboardOverviewResponse = z.infer<typeof DashboardOverviewResponse>;
export type DateRangeParams = z.infer<typeof DateRangeParams>;
export type RealTimeMetrics = z.infer<typeof RealTimeMetrics>;
export type RealTimeMetricsResponse = z.infer<typeof RealTimeMetricsResponse>;
