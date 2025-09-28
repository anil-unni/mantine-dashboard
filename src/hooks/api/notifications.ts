import { useQuery } from '@tanstack/react-query';
import { notificationsApi } from '@/api/resources/notifications';

export function useGetNotifications() {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: notificationsApi.getNotifications,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
