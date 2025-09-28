export const app = {
  name: 'Dashboard',
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  redirectQueryParamName: 'r',
  accessTokenStoreKey: 'access_token',
};  
