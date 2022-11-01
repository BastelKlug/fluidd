import { PiniaState, PiniaStateTree } from '../piniaTypes'
import { NotificationsStore } from './index'

export interface AppNotification {
  id: string;
  type: AppNotificationType;
  title: string;
  description?: string;
  suffix?: string;
  suffixIcon?: string;
  to?: string;
  btnText?: string;
  icon?: string;
  timestamp: number;
  clear: boolean; // user can clear the notification.
  merge: boolean; // try to merge into an existing notification.
  noCount?: boolean; // if true, don't increment the count.
}

export interface AppPushNotification {
  id?: string;
  type: AppNotificationType;
  title: string;
  description?: string;
  suffix?: string;
  suffixIcon?: string;
  to?: string;
  btnText?: string;
  icon?: string;
  timestamp?: number;
  snackbar?: boolean;
  clear?: boolean;
  merge?: boolean;
  noCount?: boolean;
}

export type AppNotificationType = 'success' | 'info' | 'warning' | 'error' | 'announcement'

export interface NotificationsState extends PiniaStateTree {
  notifications: AppNotification[];
}

export const state : PiniaState<NotificationsStore> = () => ({
  notifications: []
})
