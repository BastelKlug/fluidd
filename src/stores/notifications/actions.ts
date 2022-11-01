import { PiniaActions, PiniaActionTree } from '../piniaTypes'
import { NotificationsStore } from './index'
import { AppNotification, AppPushNotification } from './state'
import { v4 as uuidv4 } from 'uuid'
import { EventBus, FlashMessageTypes } from '@/eventBus'
import { announcements } from '../announcements'
import Vue from 'vue'

export interface NotificationsActions extends PiniaActionTree {
  reset (): Promise<void>;
  pushNotification (payload: AppPushNotification): Promise<void>;
  clearNotification (notification: AppNotification | string): Promise<void>;
  clearAll (): Promise<void>;
}

export const actions: PiniaActions<NotificationsStore> = {
  async reset () {
    this.$reset()
  },
  async pushNotification (payload: AppPushNotification) {
    // When adding;
    // 1. Define if it should be merged with the same type if re-adding.
    // 2. Define if it should also provide a popover.
    // This needs two commits. One for a merge, one for not.
    // Then we can emit the toast if it was a merge or not.

    // Define the base notification.
    const n: AppNotification = {
      ...{
        // snackbar: true,
        id: uuidv4(),
        type: 'info',
        timestamp: new Date().getTime() / 1000,
        clear: true,
        merge: false
      },
      ...payload
    }
    // Sanity check...
    if (n.title && n.title !== '?' && n.id) {
      const i = this.notifications.findIndex((n: { title: string }) => n.title === payload.title)
      if (n.merge && i >= 0) {
        Vue.set(this.notifications, i, n)
      } else {
        this.notifications.push(n)
      }

      if (payload.snackbar) {
        // Emit if snackbar is true.
        EventBus.$emit(n.title, { type: FlashMessageTypes.error })
      }
    }
  },

  /**
   * Clear a notification.
   */
  async clearNotification (notification: AppNotification | string) {
    if (typeof notification === 'object' && notification.type === 'announcement') {
      const store = announcements()
      store.dismiss({ entry_id: notification.id })
      return
    }
    let i = -1
    if (typeof notification === 'string') {
      i = this.notifications.findIndex((n: { id: string }) => n.id === notification)
    } else {
      i = this.notifications.findIndex((n: AppNotification | string) => n === notification)
    }
    if (i >= 0) {
      this.notifications.splice(i, 1)
    }
  },

  /**
   * Clear all notifications.
   */
  async clearAll () {
    Vue.set(this, 'notifications', [...this.notifications.filter((n: { clear: boolean }) => !n.clear)])

    const store = announcements()
    store.dismissAll()
  }
}
