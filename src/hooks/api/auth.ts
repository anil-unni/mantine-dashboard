import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import { removeClientAccessToken, setClientAccessToken } from '@/api/axios';
import { LoginRequestSchema, LoginResponseSchema } from '@/api/dtos';
import { createPostMutationHook } from '@/api/helpers';

// Mock authentication function
function mockLogin(credentials: { email: string; password: string }) {
  const { email, password } = credentials;
  
  // Check if credentials match the hardcoded values
  if (email === 'switrusAdmin' && password === '123Admin@!') {
    // Generate a random access token
    const randomToken = 'mock_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    
    // Return mock response
    return Promise.resolve({
      type: 'bearer' as const,
      token: randomToken,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
    });
  } else {
    // Return error for invalid credentials
    return Promise.reject(new Error('Invalid username or password'));
  }
}

// Custom mock login hook
export const useLogin = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: async (variables: { email: string; password: string; remember?: boolean }) => {
      return await mockLogin(variables);
    },
    onSuccess: (data) => {
      setClientAccessToken(data.token);
      notifications.show({ title: 'Welcome back!', message: 'You have successfully logged in' });
    },
    onError: (error) => {
      notifications.show({ message: error.message, color: 'red' });
    },
  });

  return { mutate, isPending, error };
};

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
