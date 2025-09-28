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
    overview: '/dashboard/overview',
    news: {
      root: '/dashboard/news',
      list: '/dashboard/news',
      create: '/dashboard/news/create',
      edit: '/dashboard/news/edit',
      view: '/dashboard/news/view',
      page: '/dashboard/news/page',
    },
  },
};
