import { useEffect, useMemo, useState } from 'react';
import { notifications } from '@mantine/notifications';
import { authService } from '@/api/services';
import { User, UserProfileRequest } from '@/types/api';

export function useGetAccountInfo() {
  const [data, setData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refetch = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const profile = await authService.getProfile();
      setData(profile);
      return profile;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load profile';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refetch().catch(() => {});
  }, []);

  const ui = useMemo(() => {
    if (!data) return null;
    const displayName = [data.first_name, data.last_name].filter(Boolean).join(' ') || data.username;
    const avatarUrl = data.profile?.avatar ?? null;
    return { displayName, avatarUrl, email: data.email };
  }, [data]);

  return { data, ui, isLoading, error, refetch };
}

export function useUserSettings() {
  const { data, isLoading, error, refetch } = useGetAccountInfo();
  const settings = useMemo(() => data?.profile ?? null, [data]);

  const update = async (changes: Partial<UserProfileRequest>) => {
    try {
      const updated = await authService.partialUpdateProfile({ profile: { ...changes } } as any);
      notifications.show({ title: 'Settings updated', message: 'Your preferences were saved' });
      await refetch();
      return updated.profile;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update settings';
      notifications.show({ message, color: 'red' });
      throw err;
    }
  };

  return { settings, isLoading, error, update };
}
