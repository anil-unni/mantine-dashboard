import axios from 'axios';
import { app } from '@/config';
import { authService } from './services';

export const client = axios.create({
  baseURL: app.apiBaseUrl,
  withCredentials: true,
  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json',
  },
});

// Export as 'api' for backward compatibility
export const api = client; 

export function setClientAccessToken(token: string) {
  localStorage.setItem(app.accessTokenStoreKey, token);
  client.defaults.headers.common.authorization = `Bearer ${token}`;
}

export function removeClientAccessToken() {
  localStorage.removeItem(app.accessTokenStoreKey);
  delete client.defaults.headers.common.authorization;
}

export function loadAccessToken() {
  const token = localStorage.getItem(app.accessTokenStoreKey);
  if (token) {
    setClientAccessToken(token);
  } else {
    delete client.defaults.headers.common.authorization;
  }
}

export function setClientRefreshToken(token: string) {
  localStorage.setItem(app.refreshTokenStoreKey, token);
}

export function loadRefreshToken(): string | null {
  return localStorage.getItem(app.refreshTokenStoreKey);
}

export function removeClientRefreshToken() {
  localStorage.removeItem(app.refreshTokenStoreKey);
}

// Axios response interceptor to auto-refresh access token on 401
client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const isUnauthorized = error?.response?.status === 401;
    const hasNotRetried = !originalRequest._retry;

    if (isUnauthorized && hasNotRetried) {
      originalRequest._retry = true;
      try {
        const refresh = loadRefreshToken();
        if (!refresh) throw new Error('Missing refresh token');
        const refreshed = await authService.refreshToken({ refresh });
        if (refreshed?.access) {
          setClientAccessToken(refreshed.access);
        }
        if (refreshed?.refresh) {
          setClientRefreshToken(refreshed.refresh);
        }
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.authorization = `Bearer ${refreshed.access}`;
        return client(originalRequest);
      } catch (refreshError) {
        removeClientAccessToken();
        removeClientRefreshToken();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
