import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { AuthGuard } from '@/guards/auth-guard';
import { GuestGuard } from '@/guards/guest-guard';
import { AuthLayout } from '@/layouts/auth';
import { DashboardLayout } from '@/layouts/dashboard';
import docsRoutes from '@/pages/docs/routes';
import { LazyPage } from './lazy-page';
import { paths } from './paths';

const router = createBrowserRouter([
  ...docsRoutes,
  {
    path: '/',
    element: <Navigate to={paths.dashboard.root} replace />,
  },
  {
    path: paths.auth.root,
    element: (
      <GuestGuard>
        <AuthLayout />
      </GuestGuard>
    ),
    children: [
      {
        index: true,
        path: paths.auth.root,
        element: <Navigate to={paths.auth.login} replace />,
      },
      {
        path: paths.auth.login,
        element: LazyPage(() => import('@/pages/auth/login')),
      },
      {
        path: paths.auth.register,
        element: LazyPage(() => import('@/pages/auth/register')),
      },
      {
        path: paths.auth.forgotPassword,
        element: LazyPage(() => import('@/pages/auth/forgot-password')),
      },
      // {
      //   path: routes.auth.resetPassword,
      //   element: LazyPage(() => import('@/pages/auth/reset-password')),
      // },
      {
        path: paths.auth.otp,
        element: LazyPage(() => import('@/pages/auth/otp')),
      },
      // {
      //   path: routes.auth.terms,
      //   element: LazyPage(() => import('@/pages/auth/terms')),
      // },
      // {
      //   path: routes.auth.privacy,
      //   element: LazyPage(() => import('@/pages/auth/privacy')),
      // },
    ],
  },
  {
    path: paths.dashboard.root,
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        index: true,
        path: paths.dashboard.root,
        element: <Navigate to={paths.dashboard.home} replace />,
      },
      {
        path: paths.dashboard.home,
        element: LazyPage(() => import('@/pages/dashboard/home')),
      },
    ],
  },
  {
    path: paths.app.root,
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        index: true,
        element: <Navigate to={paths.app.dashboard} replace />,
      },
      {
        path: paths.app.dashboard,
        element: LazyPage(() => import('@/pages/dashboard-page')),
      },
      {
        path: paths.app.rbac.root,
        element: LazyPage(() => import('@/modules/rbac/pages/rbac-dashboard-page').then(m => ({ default: m.RBACDashboardPage }))),
      },
      {
        path: paths.app.rbac.roles,
        element: LazyPage(() => import('@/modules/rbac/pages/roles-page').then(m => ({ default: m.RolesPage }))),
      },
      {
        path: paths.app.rbac.rolesCreate,
        element: LazyPage(() => import('@/modules/rbac/pages/roles-page').then(m => ({ default: m.RolesPage }))),
      },
      {
        path: paths.app.rbac.rolesEdit,
        element: LazyPage(() => import('@/modules/rbac/pages/roles-page').then(m => ({ default: m.RolesPage }))),
      },
      {
        path: paths.app.rbac.permissions,
        element: LazyPage(() => import('@/modules/rbac/pages/permissions-page').then(m => ({ default: m.PermissionsPage }))),
      },
      {
        path: paths.app.rbac.users,
        element: LazyPage(() => import('@/modules/rbac/pages/users-page').then(m => ({ default: m.UsersPage }))),
      },
      {
        path: paths.app.rbac.usersCreate,
        element: LazyPage(() => import('@/modules/rbac/pages/user-create-page').then(m => ({ default: m.UserCreatePage }))),
      },
      {
        path: paths.app.rbac.assignments,
        element: <div>Assignments Page</div>,
      },
      {
        path: paths.app.projects.root,
        element: LazyPage(() => import('@/modules/projects/pages/project-dashboard-page').then(m => ({ default: m.ProjectDashboardPage }))),
      },
      {
        path: paths.app.projects.create,
        element: LazyPage(() => import('@/modules/projects/pages/project-create-page').then(m => ({ default: m.ProjectCreatePage }))),
      },
      {
        path: paths.app.projects.detail,
        element: LazyPage(() => import('@/modules/projects/pages/project-detail-page').then(m => ({ default: m.ProjectDetailPage }))),
      },
      {
        path: paths.app.projects.edit,
        element: LazyPage(() => import('@/modules/projects/pages/project-edit-page').then(m => ({ default: m.ProjectEditPage }))),
      },
      {
        path: paths.app.projects.timeline,
        element: <div>Project Timeline Page</div>,
      },
      {
        path: paths.app.projects.reports,
        element: <div>Project Reports Page</div>,
      },
      {
        path: paths.app.tasks.root,
        element: <div>Tasks List Page</div>,
      },
      {
        path: paths.app.tasks.create,
        element: LazyPage(() => import('@/modules/tasks/pages/task-create-page').then(m => ({ default: m.TaskCreatePage }))),
      },
      {
        path: paths.app.tasks.detail,
        element: <div>Task Detail Page</div>,
      },
      {
        path: paths.app.tasks.edit,
        element: <div>Edit Task Page</div>,
      },
      {
        path: paths.app.workspace.root,
        element: LazyPage(() => import('@/modules/workspace/pages/workspace-dashboard-page').then(m => ({ default: m.WorkspaceDashboardPage }))),
      },
      {
        path: paths.app.workspace.tasks,
        element: <div>My Tasks Page</div>,
      },
      {
        path: paths.app.workspace.timelogs,
        element: <div>Time Logs Page</div>,
      },
      {
        path: paths.app.workspace.timelogsCreate,
        element: LazyPage(() => import('@/modules/workspace/pages/time-log-create-page').then(m => ({ default: m.TimeLogCreatePage }))),
      },
      {
        path: paths.app.workspace.calendar,
        element: <div>Calendar Page</div>,
      },
      {
        path: paths.app.workspace.timer,
        element: <div>Timer Page</div>,
      },
      {
        path: paths.app.workspace.settings,
        element: <div>Workspace Settings Page</div>,
      },
      {
        path: paths.app.reporting.root,
        element: LazyPage(() => import('@/modules/reporting/pages/reporting-dashboard-page').then(m => ({ default: m.ReportingDashboardPage }))),
      },
      {
        path: paths.app.reporting.employeeProductivity,
        element: <div>Employee Productivity Report</div>,
      },
      {
        path: paths.app.reporting.projectProgress,
        element: <div>Project Progress Report</div>,
      },
      {
        path: paths.app.reporting.timeTracking,
        element: <div>Time Tracking Report</div>,
      },
      {
        path: paths.app.reporting.custom,
        element: <div>Custom Reports Page</div>,
      },
      {
        path: paths.app.reporting.templates,
        element: <div>Report Templates Page</div>,
      },
      // Analytics
      {
        path: paths.app.analytics.dashboard,
        element: LazyPage(() => import('@/modules/analytics/pages/analytics-dashboard-page').then(m => ({ default: m.AnalyticsDashboardPage }))),
      },
      {
        path: paths.app.analytics.cards,
        element: LazyPage(() => import('@/modules/analytics/pages/dashboard-cards-page').then(m => ({ default: m.DashboardCardsPage }))),
      },
      {
        path: paths.app.analytics.cardsCreate,
        element: LazyPage(() => import('@/modules/analytics/pages/dashboard-card-create-page').then(m => ({ default: m.DashboardCardCreatePage }))),
      },
      {
        path: paths.app.analytics.metrics,
        element: LazyPage(() => import('@/modules/analytics/pages/metrics-page').then(m => ({ default: m.MetricsPage }))),
      },
      {
        path: paths.app.analytics.charts,
        element: LazyPage(() => import('@/modules/analytics/pages/charts-page').then(m => ({ default: m.ChartsPage }))),
      },
      // Audit
      {
        path: paths.app.audit.root,
        element: LazyPage(() => import('@/modules/audit/pages/audit-dashboard-page').then(m => ({ default: m.AuditDashboardPage }))),
      },
      {
        path: paths.app.audit.logs,
        element: LazyPage(() => import('@/modules/audit/pages/audit-logs-page').then(m => ({ default: m.AuditLogsPage }))),
      },
      {
        path: paths.app.audit.activity,
        element: LazyPage(() => import('@/modules/audit/pages/activity-feed-page').then(m => ({ default: m.ActivityFeedPage }))),
      },
      {
        path: paths.app.audit.settings,
        element: <div>Audit Settings Page</div>,
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
