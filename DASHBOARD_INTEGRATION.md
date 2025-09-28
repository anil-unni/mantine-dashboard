# Dashboard API Integration

This document describes the integration of the Dashboard API into the Mantine dashboard project.

## Overview

The Dashboard API provides comprehensive data aggregation from all modules in the Switrus backend system, supporting scalable frontend development and efficient data visualization.

## Integration Components

### 1. API Layer
- **Entities**: TypeScript types and Zod schemas for API responses (`src/api/entities/dashboard.ts`)
- **Resources**: API client functions (`src/api/resources/dashboard.ts`)
- **Hooks**: React Query hooks for data fetching (`src/hooks/api/dashboard.ts`)

### 2. UI Components
- **SummaryCardsGrid**: Displays key metrics with growth indicators
- **ChartsSection**: Interactive charts using Recharts
- **RecentDataTables**: Recent activity tables for users, orders, queries, etc.
- **RealTimeMetrics**: Live metrics for the last 24 hours and last hour

### 3. Pages
- **Dashboard Overview**: Main dashboard page (`/dashboard/overview`) showcasing all metrics

## API Endpoints

### Base URL
```
/api/dashboard/
```

### Available Endpoints
1. **GET** `/overview` - Complete dashboard data
2. **GET** `/date-range?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD` - Filtered data by date range
3. **GET** `/real-time` - Real-time metrics

## Features

### Data Visualization
- **Summary Cards**: 10 key metrics with growth percentages
- **Charts**: Pie charts, bar charts, and line charts for various data
- **Tables**: Recent activity across all modules
- **Real-time Updates**: Live metrics with automatic refresh

### Performance Optimizations
- **Caching**: 5-minute cache for overview data
- **Parallel Queries**: Efficient data fetching
- **Real-time Refresh**: 30-second intervals for live data

### User Experience
- **Date Range Filtering**: Custom date range selection
- **Loading States**: Skeleton loaders during data fetch
- **Error Handling**: Comprehensive error states
- **Responsive Design**: Mobile-friendly layout

## Usage

### Basic Usage
```tsx
import { useDashboardOverview } from '@/hooks/api/dashboard';

function Dashboard() {
  const { data, isLoading, error } = useDashboardOverview();
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return <div>{/* Render dashboard */}</div>;
}
```

### Date Range Filtering
```tsx
import { useDashboardByDateRange } from '@/hooks/api/dashboard';

function DashboardWithDateRange() {
  const { data } = useDashboardByDateRange({
    startDate: '2024-01-01',
    endDate: '2024-01-31'
  });
  
  return <div>{/* Render filtered data */}</div>;
}
```

## Navigation

The dashboard overview page is accessible via:
- **URL**: `/dashboard/overview`
- **Navigation**: Sidebar → Overview → Dashboard

## Data Sources

The dashboard aggregates data from:
- Users
- Orders
- Packages
- Queries
- Contact Forms
- Enquiry Forms
- News
- Blogs
- Testimonials

## Configuration

### Environment Variables
```env
VITE_API_BASE_URL=http://localhost:8081
```

### API Configuration
The API client is configured in `src/api/axios.ts` with:
- Base URL from environment
- JSON content type
- Authentication headers

## Error Handling

The integration includes comprehensive error handling:
- Network errors
- API errors
- Validation errors
- Loading states

## Future Enhancements

Potential improvements:
- Real-time WebSocket updates
- Advanced filtering options
- Export functionality
- Custom dashboard layouts
- Alert notifications
- Performance monitoring

## Dependencies

- `@mantine/core` - UI components
- `@mantine/dates` - Date picker
- `@tanstack/react-query` - Data fetching
- `recharts` - Charts
- `dayjs` - Date manipulation
- `zod` - Schema validation
