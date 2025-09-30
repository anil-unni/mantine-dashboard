const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
if (!apiBaseUrl) {
  alert('Error: API base URL is not defined!');
}

export const app = {
  name: 'Dashboard',
  apiBaseUrl,
  redirectQueryParamName: 'r',
  accessTokenStoreKey: 'access_token',
};  
