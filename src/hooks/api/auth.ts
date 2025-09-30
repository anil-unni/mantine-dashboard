import { useState } from 'react';
import { z } from 'zod';
import { notifications } from '@mantine/notifications';
import { removeClientAccessToken, removeClientRefreshToken, setClientAccessToken, setClientRefreshToken } from '@/api/axios';
import { LoginRequestSchema, LoginResponseSchema } from '@/api/dtos';
import { createPostMutationHook } from '@/api/helpers';
import { authService } from '@/api/services';
import { CustomTokenObtainPairRequest, TokenRefresh, User } from '@/types/api';

export const useLogin = createPostMutationHook({
  endpoint: 'auth/login',
  bodySchema: LoginRequestSchema,
  responseSchema: LoginResponseSchema,
  rMutationParams: {
    onSuccess: (data) => {
      // Legacy hook: map to new token structure if present
      if ((data as any)?.access) setClientAccessToken((data as any).access);
      if ((data as any)?.refresh) setClientRefreshToken((data as any).refresh);
      notifications.show({ title: 'Welcome back!', message: 'You have successfully logged in' });
    },
    onError: (error) => {
      notifications.show({ message: error.message, color: 'red' });
    },
  },
});

export const useLogout = createPostMutationHook({
  endpoint: 'auth/logout',
  bodySchema: z.null(),
  responseSchema: z.any(),
  rMutationParams: {
    onSuccess: () => {
      removeClientAccessToken();
      notifications.show({ title: 'Goodbye!', message: 'You have successfully logged out' });
    },
    onError: (error) => {
      notifications.show({ message: error.message, color: 'red' });
    },
  },
});

// New API-based auth hooks
export const useApiLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: CustomTokenObtainPairRequest) => {
    try {
      setIsLoading(true);
      setError(null);
      const tokens = await authService.login(credentials);
      // Ensure tokens are set even if service didn't catch wrapper
      if (tokens?.access) setClientAccessToken(tokens.access);
      if (tokens?.refresh) setClientRefreshToken(tokens.refresh);
      notifications.show({ title: 'Welcome back!', message: 'You have successfully logged in' });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
      notifications.show({ message: errorMessage, color: 'red' });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};

export const useApiLogout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const logout = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await authService.logout();
      removeClientAccessToken();
      removeClientRefreshToken();
      notifications.show({ title: 'Goodbye!', message: 'You have successfully logged out' });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Logout failed';
      setError(errorMessage);
      notifications.show({ message: errorMessage, color: 'red' });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { logout, isLoading, error };
};

export const useApiProfile = () => {
  const [profile, setProfile] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const userProfile = await authService.getProfile();
      setProfile(userProfile);
      return userProfile;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch profile';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (data: any) => {
    try {
      setIsLoading(true);
      setError(null);
      const updatedProfile = await authService.updateProfile(data);
      setProfile(updatedProfile);
      notifications.show({ title: 'Success', message: 'Profile updated successfully' });
      return updatedProfile;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update profile';
      setError(errorMessage);
      notifications.show({ message: errorMessage, color: 'red' });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { profile, fetchProfile, updateProfile, isLoading, error };
};
