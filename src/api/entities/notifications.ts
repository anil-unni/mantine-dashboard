export interface Notification {
  id: string;
  title: string;
  receivedAt: string;
  type: string;
  sentBy: {
    avatarUrl?: string;
    displayName: string;
  };
}
