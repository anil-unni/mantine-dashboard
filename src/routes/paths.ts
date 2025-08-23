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
    management: {
      root: '/dashboard/management',
      customers: {
        root: '/dashboard/management/customers',
        list: '/dashboard/management/customers/list',
        view: (customerId: string) => `/dashboard/management/customers/${customerId}`,
      },
      news: {
        root: '/dashboard/management/news',
        list: '/dashboard/management/news/list',
        create: '/dashboard/management/news/create',
      },
    },
    apps: {
      root: '/dashboard/apps',
      kanban: '/dashboard/apps/kanban',
    },
    widgets: {
      root: '/dashboard/widgets',
      metrics: '/dashboard/widgets/metrics',
      charts: '/dashboard/widgets/charts',
      tables: '/dashboard/widgets/tables',
      news: '/dashboard/widgets/news',
    },
  },
};
