export const app = {
  name: 'Dashboard',
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8081',
  baseFileUrl: import.meta.env.VITE_BASE_FILE_URL ?? 'http://localhost:8081',
  redirectQueryParamName: 'r',
  accessTokenStoreKey: 'access_token',
};  
