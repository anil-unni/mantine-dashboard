import docs from '@/pages/docs/paths';

export const paths = {
  docs,
  auth: {
    root: '/auth',
    login: '/auth/login',
    register: '/auth/register',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
    otp: '/auth/otp',
    terms: '/auth/terms',
    privacy: '/auth/privacy',
  },

  dashboard: {
    root: '/dashboard',
    home: '/dashboard/home',
  },

  app: {
    root: '/app',
    dashboard: '/app/dashboard',
    
    rbac: {
      root: '/app/rbac',
      users: '/app/rbac/users',
      usersCreate: '/app/rbac/users/create',
      roles: '/app/rbac/roles',
      rolesCreate: '/app/rbac/roles/create',
      rolesEdit: '/app/rbac/roles/:id/edit',
      permissions: '/app/rbac/permissions',
      assignments: '/app/rbac/assignments',
    },

    projects: {
      root: '/app/projects',
      create: '/app/projects/create',
      detail: '/app/projects/:id',
      edit: '/app/projects/:id/edit',
      timeline: '/app/projects/timeline',
      reports: '/app/projects/reports',
    },

    tasks: {
      root: '/app/tasks',
      create: '/app/tasks/create',
      detail: '/app/tasks/:id',
      edit: '/app/tasks/:id/edit',
    },

    workspace: {
      root: '/app/workspace',
      tasks: '/app/workspace/tasks',
      timelogs: '/app/workspace/timelogs',
      timelogsCreate: '/app/workspace/timelogs/create',
      calendar: '/app/workspace/calendar',
      timer: '/app/workspace/timer',
      settings: '/app/workspace/settings',
    },

    reporting: {
      root: '/app/reporting',
      employeeProductivity: '/app/reporting/employee-productivity',
      projectProgress: '/app/reporting/project-progress',
      timeTracking: '/app/reporting/time-tracking',
      custom: '/app/reporting/custom',
      templates: '/app/reporting/templates',
    },

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
