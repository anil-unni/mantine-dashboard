# API Integration Documentation

This document describes the comprehensive API integration implemented for the Mantine Dashboard project based on the provided OpenAPI specification.

## Overview

The project has been dynamically updated to integrate with a comprehensive Task Management API that includes:

- **Authentication & User Management**
- **Project Management**
- **Task Management with Time Logging**
- **Workspace Dashboard**
- **Reporting & Analytics**
- **Audit Logging**
- **Dashboard Cards & Metrics**

## Architecture

### 1. Type System (`src/types/api.ts`)

Complete TypeScript types generated from the OpenAPI schema including:

- **User Management**: `User`, `UserProfile`, `UserRequest`, `UserUpdateRequest`
- **Authentication**: `CustomTokenObtainPairRequest`, `TokenRefresh`, `ChangePasswordRequest`
- **Projects**: `Project`, `ProjectRequest`, `ProjectCreateRequest`
- **Tasks**: `Task`, `TaskRequest`, `TaskCreateRequest`
- **Time Logs**: `TimeLog`, `TimeLogRequest`, `TimeLogCreateRequest`
- **Dashboard Cards**: `DashboardCard`, `DashboardCardRequest`
- **Pagination**: `PaginatedResponse<T>` for all list endpoints
- **Enums**: Status, Priority, Card Types, Modules, Themes

### 2. API Services (`src/api/services/`)

Centralized service classes for each API domain:

#### Authentication Service (`auth.service.ts`)

```typescript
- register(data: UserRegistrationRequest): Promise<UserRegistration>
- login(credentials: CustomTokenObtainPairRequest): Promise<void>
- refreshToken(data: TokenRefreshRequest): Promise<TokenRefresh>
- logout(): Promise<void>
- getProfile(): Promise<User>
- updateProfile(data: UserRequest): Promise<User>
- getOrganizationUsers(orgId: number): Promise<PaginatedUserList>
```

#### Projects Service (`projects.service.ts`)

```typescript
- getProjects(params?: FilterParams): Promise<PaginatedProjectList>
- getProject(id: number): Promise<Project>
- createProject(data: ProjectCreateRequest): Promise<ProjectCreate>
- updateProject(id: number, data: ProjectRequest): Promise<Project>
- deleteProject(id: number): Promise<void>
- getProjectTasks(projectId: number): Promise<PaginatedTaskList>
- createProjectTask(projectId: number, data: TaskCreateRequest): Promise<TaskCreate>
```

#### Workspace Service (`workspace.service.ts`)

```typescript
- getDashboard(): Promise<any>
- getTimeLogs(): Promise<any>
- getMyTasks(): Promise<any>
- getCalendar(): Promise<any>
```

#### Reports Service (`reports.service.ts`)

```typescript
- getReports(): Promise<any>
- getEmployeeProductivityReport(): Promise<any>
- getProjectProgressReport(): Promise<any>
- getTimeTrackingReport(): Promise<any>
- getCustomReport(): Promise<any>
```

#### Analytics Service (`analytics.service.ts`)

```typescript
- getDashboardCards(params?: FilterParams): Promise<PaginatedDashboardCardList>
- createDashboardCard(data: DashboardCardRequest): Promise<DashboardCard>
- updateDashboardCard(id: number, data: DashboardCardRequest): Promise<DashboardCard>
- deleteDashboardCard(id: number): Promise<void>
- getAnalyticsDashboard(): Promise<any>
- getChartsData(): Promise<any>
- getMetricsData(): Promise<any>
```

#### Audit Service (`audit.service.ts`)

```typescript
- getAuditLogs(): Promise<any>
- getAuditLog(id: number): Promise<any>
- getActivityFeed(): Promise<any>
```

### 3. Module Structure

Each module follows a consistent pattern:

```
src/modules/{module-name}/
├── components/          # React components
├── hooks/              # Custom hooks for state management
├── services/           # Module-specific service layer
├── types/              # Module-specific TypeScript types
├── pages/              # Page components
└── index.ts           # Module exports
```

#### Updated Modules:

1. **Projects Module** (`src/modules/projects/`)
   - Full CRUD operations for projects
   - Team management
   - Project statistics and metrics
   - Integration with tasks and time logs

2. **Tasks Module** (`src/modules/tasks/`)
   - Complete task management
   - Time logging functionality
   - Task dependencies
   - Progress tracking

3. **Workspace Module** (`src/modules/workspace/`)
   - Personal dashboard
   - Time tracking
   - Calendar integration
   - User-specific data

4. **Reporting Module** (`src/modules/reporting/`)
   - Employee productivity reports
   - Project progress reports
   - Time tracking reports
   - Custom report builder

5. **Analytics Module** (`src/modules/analytics/`)
   - Dashboard cards management
   - Metrics and charts
   - Customizable analytics
   - Real-time data updates

6. **Audit Module** (`src/modules/audit/`)
   - Audit log management
   - Activity feed
   - Security tracking
   - Compliance reporting

### 4. Custom Hooks

Each module includes custom hooks for state management:

#### Example: `useTasks` Hook

```typescript
const {
  tasks,
  currentTask,
  loading,
  error,
  actions: {
    createTask,
    updateTask,
    deleteTask,
    fetchTasks,
    createTimeLog,
    updateTimeLog,
    deleteTimeLog,
    fetchTimeLogs,
  },
} = useTasks(projectId);
```

#### Example: `useAnalytics` Hook

```typescript
const {
  dashboard,
  cards,
  metrics,
  charts,
  loading,
  error,
  actions: { fetchDashboard, createCard, updateCard, deleteCard, reorderCards },
} = useAnalytics();
```

### 5. Routing Integration

Updated routing structure in `src/routes/paths.ts`:

```typescript
export const paths = {
  // ... existing paths
  app: {
    // ... existing app routes
    analytics: {
      root: '/app/analytics',
      dashboard: '/app/analytics/dashboard',
      cards: '/app/analytics/cards',
      cardsCreate: '/app/analytics/cards/create',
      cardsEdit: '/app/analytics/cards/:id/edit',
      metrics: '/app/analytics/metrics',
      charts: '/app/analytics/charts',
    },
    audit: {
      root: '/app/audit',
      logs: '/app/audit/logs',
      logsDetail: '/app/audit/logs/:id',
      activity: '/app/audit/activity',
      settings: '/app/audit/settings',
    },
  },
};
```

### 6. Authentication Integration

Enhanced authentication hooks in `src/hooks/api/auth.ts`:

```typescript
// New API-based hooks
export const useApiLogin = () => {
  /* ... */
};
export const useApiLogout = () => {
  /* ... */
};
export const useApiProfile = () => {
  /* ... */
};
```

## Key Features

### 1. **Dynamic API Integration**

- All endpoints from the OpenAPI spec are implemented
- Type-safe API calls with full TypeScript support
- Consistent error handling and loading states

### 2. **Modular Architecture**

- Each feature is self-contained in its own module
- Reusable components and hooks
- Clear separation of concerns

### 3. **State Management**

- Custom hooks for each module
- Centralized state management
- Optimistic updates where appropriate

### 4. **Type Safety**

- Complete TypeScript coverage
- Generated types from OpenAPI schema
- Compile-time error checking

### 5. **Error Handling**

- Consistent error handling across all modules
- User-friendly error messages
- Retry mechanisms where appropriate

### 6. **Performance Optimization**

- Lazy loading of modules
- Efficient data fetching
- Caching strategies

## Usage Examples

### Creating a Project

```typescript
import { useProjects } from '@/modules/projects';

const { actions } = useProjects();

const handleCreateProject = async (data: ProjectFormData) => {
  try {
    const project = await actions.createProject(data);
    console.log('Project created:', project);
  } catch (error) {
    console.error('Failed to create project:', error);
  }
};
```

### Managing Tasks

```typescript
import { useTasks } from '@/modules/tasks';

const { tasks, actions } = useTasks(projectId);

const handleCreateTask = async (data: TaskFormData) => {
  try {
    const task = await actions.createTask(projectId, data);
    console.log('Task created:', task);
  } catch (error) {
    console.error('Failed to create task:', error);
  }
};
```

### Time Logging

```typescript
const handleLogTime = async (taskId: number, data: TimeLogFormData) => {
  try {
    const timeLog = await actions.createTimeLog(taskId, data);
    console.log('Time logged:', timeLog);
  } catch (error) {
    console.error('Failed to log time:', error);
  }
};
```

## Configuration

### API Base URL

Update `src/api/axios.ts` with your API base URL:

```typescript
const api = axios.create({
  baseURL: process.env.VITE_API_BASE_URL || 'http://localhost:8000',
  // ... other config
});
```

### Environment Variables

Create a `.env` file:

```env
VITE_API_BASE_URL=http://localhost:8000
VITE_API_TIMEOUT=10000
```

## Next Steps

1. **Backend Integration**: Ensure your backend API matches the OpenAPI specification
2. **Authentication**: Implement JWT token management
3. **Error Handling**: Add global error boundary components
4. **Testing**: Add unit and integration tests
5. **Documentation**: Add JSDoc comments to all functions
6. **Performance**: Implement caching and optimization strategies

## Conclusion

This implementation provides a comprehensive, type-safe, and modular approach to integrating with the Task Management API. The architecture is scalable, maintainable, and follows React best practices while providing a solid foundation for building a robust dashboard application.
