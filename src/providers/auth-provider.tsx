import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';
import { loadAccessToken, loadRefreshToken } from '@/api/axios';
import { authService } from '@/api/services';

interface AuthContextValues {
  isAuthenticated: boolean;
  isInitialized: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export const AuthContext = createContext<AuthContextValues | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  // Debug mode: skip login screen
  const DEBUG_SKIP_LOGIN = false;

  const [isAuthenticated, setIsAuthenticated] = useState(DEBUG_SKIP_LOGIN);
  const [isInitialized, setIsInitialized] = useState(DEBUG_SKIP_LOGIN);

  useEffect(() => {
    if (DEBUG_SKIP_LOGIN) {
      // Skip authentication in debug mode
      setIsAuthenticated(true);
      setIsInitialized(true);
      return;
    }

    loadAccessToken();
    const refresh = loadRefreshToken();

    const init = async () => {
      try {
        // If we don't have access token but have refresh, attempt refresh
        if (!localStorage.getItem(import.meta.env.VITE_ACCESS_TOKEN_KEY || 'access_token') && refresh) {
          await authService.refreshToken({ refresh });
        }
        await authService.getProfile();
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      } finally {
        setIsInitialized(true);
      }
    };
    void init();
  }, [DEBUG_SKIP_LOGIN]);

  const value = useMemo(
    () => ({ isAuthenticated, isInitialized, setIsAuthenticated }),
    [isAuthenticated, isInitialized]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
