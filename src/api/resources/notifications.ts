import { client } from '../axios';
import { Notification } from '../entities/notifications';

export const notificationsApi = {
  getNotifications: (): Promise<Notification[]> => {
    return client.get('/notifications').then((response) => response.data);
  },
};
